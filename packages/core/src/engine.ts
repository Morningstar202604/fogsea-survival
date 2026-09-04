import type {
  ContentPack,
  GameState,
  SceneNode,
  Choice,
  ChoiceEffect,
  RandomEventDef,
  Outcome,
  Condition,
  ResourceKey,
  AttributeKey,
  EndingDef,
} from './types.js';
import { createResources, applyIncome, applyStarvation, applyDailyConsumption, deltaResource } from './resources.js';
import { rollD100 } from './dice.js';
import { Rng } from './rng.js';

// v2.0 新增系统导入
import { createInitialBase, processDailyProduction } from './base.js';
import { createInitialSkillTree, gainSkillPoints } from './skills.js';
import { createInitialProgressionState, checkProgression, evaluateCatastrophe, resolveCatastrophe, enterStoryLine } from './progression.js';
import { createInitialEconomy, ITEM_DATABASE, updateMarketPrices } from './economy.js';
import { applyTalent } from './talents.js';
import { applyCompanionDaily } from './companions.js';
import { rankMessage } from './ranking.js';
import { processSignin } from './signin.js';
import { maybeStartEncounter, initiateCombat, getAvailableMonsters } from './combat.js';
import { checkAchievements } from './achievements.js';
// v3.0 新增：统一配置与公式
import {
  getPhaseByDay, calculateExpRequired,
  TITLES, BASE_CONFIG, CAUSAL_RELATIONS, PHASE_STORY,
  calculateDailyWeather, calculateMistDensity, calculateDangerLevel,
  getMajorEventByDay, assessMajorEventDifficulty,
  getUnlockedZones, calculateBaseDefense,
} from './gameConfig.js';

// v4.0 新增系统导入：叙事引擎、AI事件、策略系统
import { NarrativeEngine } from './narrative.js';
import { AIEventGenerator } from './aiEvents.js';
import { StrategyEngine, StrategyArchetype } from './strategy.js';

/** 创建新一局状态 v2.1：集成所有新系统；talentId 提供则落地开局天赋 */
export function createInitialState(
  content: ContentPack,
  meta?: GameState['meta'],
  talentId?: string,
): GameState {
  const initial = content.storyline.initialScene;
  const state: GameState = {
    version: content.version,
    day: 1,
    resources: createResources(content.startingResources),
    flags: {},
    inventory: {},
    currentScene: initial,
    visitedScenes: [initial],
    pendingEvents: [],
    triggeredEvents: [],
    eventStack: [],
    outcome: null,
    runStats: { survivalDays: 0, eventsTriggered: 0, kills: 0, signinStreak: 0, resources: {} },
    meta: { runs: 0, unlockedEndings: [], bestDays: 0, unlockedAchievements: [], ...meta },

    // v2.0 新增系统初始化
    base: createInitialBase(),
    skills: createInitialSkillTree(),
    progression: createInitialProgressionState(),
    economy: createInitialEconomy(),
    itemLevels: {},
    ap: 3,
    equipment: {},
    attributes: {
      strength: 10,
      agility: 10,
      intelligence: 10,
      luck: 10,
    },
    // v3.0 新增：等级/经验/属性点/称号系统
    level: 1,
    exp: 0,
    expToNext: calculateExpRequired(1),
    attributePoints: 0,
    skillPoints: 0,
    titles: [],
    activeTitle: null,
    combatKills: 0,
    currentPhase: 1,
    mistPoints: 0,

    // v0.5.0 新增系统初始化
    dailyPanel: {
      weather: 'foggy',
      mistDensity: 'normal',
      dangerLevel: 'low',
      specialHint: null,
      dayOfPhase: 1,
    },
    npcRelations: {},
    causalTracker: {
      triggeredCauses: [],
      pendingEffects: [],
      consequenceLog: [],
    },
    growthPath: {
      primary: null,
      scores: {},
      lastAssessmentDay: 0,
    },
    majorEvents: {},
    buildings: {},
    awakening: {
      isAwakened: false,
      abilityType: null,
      abilityLevel: 0,
      awakeningProgress: 0,
    },
    reputation: {
      overall: 0,
      amongSurvivors: 0,
      amongFactions: 0,
      fame: 0,
      infamy: 0,
    },
    unlockedZones: ['safe_house', 'nearby_ruins'],
    gameVersion: '2.0.2',
  };
  if (talentId) applyTalent(state, talentId);
  return state;
}

/** 跨主线 + 支线解析场景节点（currentScene 可能在某条线内）。 */
export function resolveScene(content: ContentPack, sceneId: string): SceneNode | null {
  if (content.storyline.scenes[sceneId]) return content.storyline.scenes[sceneId];
  for (const line of content.lines ?? []) if (line.scenes[sceneId]) return line.scenes[sceneId];
  return null;
}

/** 跨主线 + 支线查找结局定义。 */
export function findEnding(content: ContentPack, id: string): EndingDef | null {
  if (content.storyline.endings[id]) return content.storyline.endings[id];
  for (const line of content.lines ?? []) if (line.endings?.[id]) return line.endings[id];
  return null;
}

/** 按 id 取随机事件定义。 */
export function resolveEvent(content: ContentPack, id: string): RandomEventDef | null {
  return content.randomEvents.find((e) => e.id === id) ?? null;
}

/** 条件判定：requires 为空则恒真；flags/items/resources 全部满足才通过。 */
export function conditionMet(cond: Condition | undefined, state: GameState): boolean {
  if (!cond) return true;
  if (cond.flags) for (const f of cond.flags) if (!state.flags[f]) return false;
  if (cond.items) {
    for (const [id, min] of Object.entries(cond.items)) {
      if ((state.inventory[id] ?? 0) < min) return false;
    }
  }
  if (cond.resources) {
    for (const [k, min] of Object.entries(cond.resources) as [ResourceKey, number][]) {
      if (state.resources[k].current < min) return false;
    }
  }
  if (cond.attributes) {
    for (const [k, min] of Object.entries(cond.attributes) as [AttributeKey, number][]) {
      if ((state.attributes[k] ?? 0) < min) return false;
    }
  }
  return true;
}

/** 过滤出当前可显示的选项（requires 满足）。 */
export function availableChoices(choices: Choice[], state: GameState): Choice[] {
  return choices.filter((c) => conditionMet(c.requires, state));
}

/** 应用单个非跳转类效果到状态；返回产生的系统播报（物品升级等）。 */
function applyEffect(state: GameState, eff: ChoiceEffect): string[] {
  const system: string[] = [];
  switch (eff.kind) {
    case 'resource':
      if (eff.resource) deltaResource(state.resources[eff.resource], eff.delta ?? 0);
      break;
    case 'flag':
      state.flags[eff.flag ?? ''] = eff.flagValue ?? true;
      break;
    case 'item': {
      const id = eff.item ?? '';
      const cur = state.inventory[id] ?? 0;
      state.inventory[id] = Math.max(0, cur + (eff.amount ?? 0));
      if ((eff.amount ?? 0) < 0) trackItemUsage(state, id, system);
      break;
    }
    default:
      break; // roll / jump 由 applyChoice 统一处理
  }
  return system;
}

/** 处理 combat 效果：开启战斗会话（已在战斗中则跳过）；返回系统播报。 */
function startCombatFromEffect(state: GameState, eff: ChoiceEffect, rng: Rng): string | null {
  if (state.combat) return null;
  const monsterId = eff.monster ?? pickEncounterMonster(state, rng);
  if (!monsterId) return null;
  state.combat = initiateCombat(state, monsterId);
  return '【遭遇】雾的深处传来低吼——战斗开始！';
}

/** 按当前天数从可用怪物池随机取一只（主动狩猎用）。 */
function pickEncounterMonster(state: GameState, rng: Rng): string | null {
  const pool = getAvailableMonsters(state.day ?? 1).filter((m) => !!m);
  if (!pool.length) return null;
  return pool[rng.int(0, pool.length - 1)].id;
}

/**
 * 自动进食/喝水：生存资源低于警戒线时，自动消耗背包里的食物/水物品补给。
 * 打通"物品→资源"转换（签到/商人/基地产出物的库存意义），也是支线日程中断粮的兜底。
 */
function autoProvision(state: GameState): string[] {
  const messages: string[] = [];
  const provision = (key: 'food' | 'water', itemId: string, restore: number, verb: string) => {
    if (state.resources[key].current < 30 && (state.inventory[itemId] ?? 0) > 0) {
      state.inventory[itemId] -= 1;
      deltaResource(state.resources[key], restore);
      messages.push(`【系统】你从背包里拿出${ITEM_DATABASE[itemId]?.name ?? itemId}${verb}了下来（+${restore}）。`);
    }
  };
  provision('food', 'food', 30, '吃');
  provision('water', 'water', 30, '喝');
  return messages;
}

/** 物品自动升级（致敬《全民求生：我的物品能自动升级》）：使用累积熟练度，每 10 点升 1 级。 */
function trackItemUsage(state: GameState, itemId: string, out: string[]): void {
  if (!itemId) return;
  const rec = state.itemLevels[itemId] ?? { uses: 0, level: 1 };
  rec.uses += state.flags['talent_item_xp_boost'] ? 2 : 1;
  let need = rec.level * 10;
  while (rec.uses >= need) {
    rec.uses -= need;
    rec.level += 1;
    need = rec.level * 10;
    const name = ITEM_DATABASE[itemId]?.name ?? itemId;
    out.push(`【系统】叮！「${name}」熟练度突破了，升到 Lv.${rec.level}！（交易价值提升）`);
  }
  state.itemLevels[itemId] = rec;
}

export interface ChoiceResult {
  state: GameState;
  /** 结果旁白（选项自带叙事文本） */
  resultText?: string;
  /** 若跳转到结局则给出结算结果 */
  outcome?: Outcome;
  next?: string;
  /** 系统播报（物品升级等 meta 反馈，UI 以系统口吻展示） */
  systemMessages?: string[];
}

/**
 * 应用一个选项（场景或事件通用）：
 * - 遍历 effects：roll 做 d100 检定决定 onSuccess/onFail 跳转与附加效果；
 *   jump 直接改写跳转目标；其余效果即时落地。
 * - 跳转目标若是结局 id → 写入 state.outcome 并解锁图鉴；
 *   若是 "__return__" → 从场景栈弹出返回上级场景；否则更新 currentScene。
 * 注：进入支线由 scheduleLine 显式压栈，本函数对普通场景跳转不压栈（保证线内游走不出栈）。
 */
export function applyChoice(content: ContentPack, state: GameState, choice: Choice, rng: Rng): ChoiceResult {
  let next = choice.next;
  const resultText = choice.result;
  const systemMessages: string[] = [];
  if (choice.apCost) state.ap = Math.max(0, state.ap - choice.apCost);
  for (const eff of choice.effects) {
    if (eff.kind === 'roll') {
      const res = rollD100(rng.next.bind(rng), eff.difficulty ?? 50);
      if (res.success) {
        next = eff.onSuccess ?? next;
        if (eff.successEffects) {
          for (const se of eff.successEffects) {
            if (se.kind === 'combat') {
              const msg = startCombatFromEffect(state, se, rng);
              if (msg) systemMessages.push(msg);
            } else {
              systemMessages.push(...applyEffect(state, se));
            }
          }
        }
      } else {
        next = eff.onFail ?? next;
        if (eff.lethal && res.tier === 'crit_fail') state.resources.health.current = 0;
        if (eff.failEffects) {
          for (const fe of eff.failEffects) {
            systemMessages.push(...applyEffect(state, fe));
          }
        }
      }
    } else if (eff.kind === 'jump') {
      next = eff.target ?? next;
    } else if (eff.kind === 'combat') {
      const msg = startCombatFromEffect(state, eff, rng);
      if (msg) systemMessages.push(msg);
    } else {
      systemMessages.push(...applyEffect(state, eff));
    }
  }
  let outcome: Outcome | undefined;
  if (next && findEnding(content, next)) {
    const ed = findEnding(content, next)!;
    outcome = { type: 'ending', id: ed.id, title: ed.title, desc: ed.desc };
    state.outcome = outcome;
    state.meta.unlockedEndings = Array.from(new Set([...state.meta.unlockedEndings, ed.id]));
  } else if (next === '__return__' && state.eventStack.length) {
    state.currentScene = state.eventStack.pop()!;
  } else if (next && next !== '__return__') {
    state.currentScene = next;
    if (!state.visitedScenes.includes(next)) state.visitedScenes.push(next);
  }
  // v1.0.0: 记录玩家选择的因果关系
  recordChoiceCausality(state, choice);
  return { state, resultText, outcome, next, systemMessages };
}

/** 应用事件选项：处理完后从 pendingEvents 弹出并记入 triggeredEvents。 */
export function applyEventChoice(content: ContentPack, state: GameState, choice: Choice, rng: Rng): ChoiceResult {
  const sceneBefore = state.currentScene;
  const stackBefore = state.eventStack.slice();
  const r = applyChoice(content, state, choice, rng);
  // 事件的 __return__ 只表示事件结束，不应把进行中的支线场景从栈里弹掉
  if (choice.next === '__return__' && !r.outcome) {
    state.currentScene = sceneBefore;
    state.eventStack = stackBefore;
  }
  const evId = state.pendingEvents.shift();
  if (evId) state.triggeredEvents.push(evId);
  return r;
}

/** 每日抽取一个随机事件（按 weight 加权；受 minDay / maxTriggers 约束；weight<=0 不抽）。 */
export function drawDailyEvent(content: ContentPack, state: GameState, rng: Rng): RandomEventDef | null {
  const pool = content.randomEvents.filter((e) => {
    if (e.weight <= 0) return false;
    if (state.day < e.minDay) return false;
    if (e.maxTriggers < 0) return true;
    const triggered = state.triggeredEvents.filter((id) => id === e.id).length;
    return triggered < e.maxTriggers;
  });
  if (!pool.length) return null;
  return rng.weighted(pool, (e) => e.weight);
}

/**
 * 触发式支线调度：当前不在任何线/事件内时，按声明顺序找到首个满足 trigger 且未完成的支线，
 * 将其入口压栈切为当前场景（一次性，靠 line_done_<id> 标记防重复触发）。
 */
export function scheduleLine(content: ContentPack, state: GameState): void {
  if (state.eventStack.length) return;
  for (const line of content.lines ?? []) {
    if (state.flags[`line_done_${line.id}`]) continue;
    const t = line.trigger;
    if (t.dayMin && state.day < t.dayMin) continue;
    if (t.flags && !t.flags.every((f) => state.flags[f])) continue;
    if (t.notFlags && t.notFlags.some((f) => state.flags[f])) continue;
    // 双轨合并：统一走 enterStoryLine 写入 line_done_<id>（与 STORY_TRIGGERS 共用判定）
    if (enterStoryLine(state, content, line.id)) break;
  }
}

/**
 * 阶段剧情调度：按 PHASE_STORY 时序把主线剧情链入口接管为当前场景（一次性）。
 * 与 scheduleLine 不同：不压事件栈——剧情链的选项以 next: start / __return__ 收尾，
 * 直接落回主枢纽；事件栈保持干净，不影响支线调度。
 * 入口场景必须在当前内容包中存在（demoContent 等精简包自动跳过）。
 */
export function schedulePhaseStory(content: ContentPack, state: GameState): string | null {
  if (state.eventStack.length || state.pendingEvents.length) return null;
  for (const beat of PHASE_STORY) {
    if (state.day < beat.dayMin) continue;
    if (state.flags[beat.onceFlag]) continue;
    if (!content.storyline.scenes[beat.entryScene]) continue;
    state.flags[beat.onceFlag] = true;
    state.currentScene = beat.entryScene;
    return `【剧情】${beat.title}`;
  }
  return null;
}

/**
 * 推进一天 v2.0：集成基地生产、技能成长、推进机制
 */
// ============================================================
// v0.5.0 每日系统、大事件检验、因果追踪
// ============================================================

/** 刷新每日面板（天气、迷雾浓度、危险等级、隐藏提示） */
export function refreshDailyPanel(state: GameState, rng: Rng): string[] {
  const messages: string[] = [];
  const day = state.day;

  // 计算天气
  const weather = calculateDailyWeather(day, () => rng.next());
  const mistDensity = calculateMistDensity(day, weather);
  const dangerLevel = calculateDangerLevel(day, mistDensity, weather);

  // 计算当前阶段的第几天
  const phase = getPhaseByDay(day);
  const dayOfPhase = day - phase.dayRange[0] + 1;

  // 生成隐藏提示（金手指，有概率触发）
  let specialHint: string | null = null;
  if (rng.next() < 0.3) {
    const hints = [
      '附近废墟中有物资',
      '今天适合外出探索',
      '注意保存体力',
      '水源地附近有野兽出没',
      '迷雾浓度正在上升',
      '庇护所的防御需要加固',
      '今天可能会遇到幸存者',
      '深处的废墟有稀有物品',
    ];
    specialHint = hints[Math.floor(rng.next() * hints.length)];
  }

  // 更新面板
  state.dailyPanel = {
    weather,
    mistDensity,
    dangerLevel,
    specialHint,
    dayOfPhase,
  };

  // 生成消息
  const weatherNames: Record<string, string> = {
    clear: '晴朗', foggy: '浓雾', rainy: '阴雨', stormy: '暴风',
    bloody_moon: '血月', mist_tide: '迷雾潮汐',
  };
  const densityNames: Record<string, string> = {
    thin: '稀薄', normal: '正常', thick: '浓厚', impenetrable: '伸手不见五指',
  };
  const dangerNames: Record<string, string> = {
    safe: '安全', low: '低', moderate: '中等', high: '高', extreme: '极高',
  };

  messages.push(`【第${day}天】天气：${weatherNames[weather] || weather}，迷雾浓度：${densityNames[mistDensity] || mistDensity}，危险等级：${dangerNames[dangerLevel] || dangerLevel}`);

  if (specialHint) {
    messages.push(`【隐藏提示】${specialHint}`);
  }

  // 特殊天气警告
  if (weather === 'bloody_moon') {
    messages.push('【警告】血月降临！迷雾中的生物变得异常狂暴，今晚极度危险！');
  }
  if (weather === 'stormy') {
    messages.push('【警告】暴风天气！户外行动极其危险，建议待在庇护所。');
  }
  if (mistDensity === 'impenetrable') {
    messages.push('【警告】迷雾浓度极高！能见度不足两米，外出可能迷失方向。');
  }

  return messages;
}

/** 检查并触发大事件 */
export function checkAndTriggerMajorEvent(state: GameState): {
  triggered: boolean;
  event?: any;
  assessment?: any;
  messages: string[];
} {
  const messages: string[] = [];
  const majorEvent = getMajorEventByDay(state.day);

  if (!majorEvent) {
    return { triggered: false, messages };
  }

  // 检查是否已经完成
  if (state.majorEvents[majorEvent.name]?.completed) {
    return { triggered: false, messages };
  }

  // 评估难度
  const assessment = assessMajorEventDifficulty(majorEvent, {
    attributes: state.attributes,
    resources: state.resources as any,
    inventory: state.inventory,
    baseLevel: state.base?.level ?? 0,
    allyCount: Object.keys(state.npcRelations).filter(id => state.npcRelations[id].isAlive && state.npcRelations[id].affection > 30).length,
    level: state.level,
  });

  messages.push(`【大事件】${majorEvent.name}！`);
  messages.push(majorEvent.description);
  messages.push(`【难度评估】${assessment.difficulty}（存活概率：${Math.round(assessment.survivalChance * 100)}%）`);

  // 显示评估依据
  if (assessment.assessedFactors.length > 0) {
    const factorText = assessment.assessedFactors.map(f =>
      `${f.factor}:${f.value}${f.pass ? '✓' : '✗'}`
    ).join(', ');
    messages.push(`【评估依据】${factorText}`);
  }

  return {
    triggered: true,
    event: majorEvent,
    assessment,
    messages,
  };
}

/** 更新已解锁区域 */
export function updateUnlockedZones(state: GameState): string[] {
  const unlocked = getUnlockedZones(state.day);
  const newZones = unlocked.filter(z => !state.unlockedZones.includes(z.id));
  for (const zone of newZones) {
    state.unlockedZones.push(zone.id);
  }
  return newZones.map(z => z.name);
}

/** 处理待生效的因果效果 */
export function processPendingCausalEffects(state: GameState): string[] {
  const messages: string[] = [];
  const toTrigger = state.causalTracker.pendingEffects.filter(
    e => e.triggerDay <= state.day
  );

  for (const effect of toTrigger) {
    if (Math.random() < effect.probability) {
      messages.push(`【因果报应】${effect.effectDescription}`);
      state.causalTracker.consequenceLog.push({
        day: state.day,
        cause: effect.causalId,
        effect: effect.effectDescription,
      });
    }
  }

  // 移除已处理的效果
  state.causalTracker.pendingEffects = state.causalTracker.pendingEffects.filter(
    e => e.triggerDay > state.day
  );

  return messages;
}

/** 记录因果关系 */
export function recordCausalRelation(state: GameState, causeId: string, effectDescription: string, delayDays: number = 0, probability: number = 1): void {
  if (!state.causalTracker.triggeredCauses.includes(causeId)) {
    state.causalTracker.triggeredCauses.push(causeId);
  }
  if (delayDays > 0 || probability < 1) {
    state.causalTracker.pendingEffects.push({
      causalId: causeId,
      effectDescription,
      triggerDay: state.day + delayDays,
      probability,
    });
  }
}

export function runDaily(
  content: ContentPack,
  state: GameState,
  rng: Rng,
): { dead: boolean; messages: string[]; event: RandomEventDef | null; progression?: any } {
  const messages: string[] = [];

  // v0.5.0: 每日面板刷新（天气、迷雾浓度、危险等级）
  messages.push(...refreshDailyPanel(state, rng));

  // v0.5.0: 处理待生效的因果效果
  messages.push(...processPendingCausalEffects(state));
  
  // v1.0.0: 自动检查并触发因果关系
  messages.push(...autoCheckCausalRelations(state, content));

  // v0.5.0: 更新已解锁区域
  const newZones = updateUnlockedZones(state);
  if (newZones.length > 0) {
    messages.push(`【新区域解锁】${newZones.join('、')}`);
  }

  // 0. 每日签到（连签递进奖励）
  messages.push(processSignin(state));

  // 1. 基地每日生产
  const production = processDailyProduction(state as any);
  messages.push(...production.messages.map(m => `[生产] ${m}`));
  
  // 1a. 基地建筑每日效果
  messages.push(...applyBuildingDailyEffects(state));
  
  // 1a. 自动进食：背包食物/水在低存量时转化为生存资源
  messages.push(...autoProvision(state));

  // 1a++. 同伴每日被动
  messages.push(...applyCompanionDaily(state));

  // 1a+. 剧情间隙觅食：支线期间无法回中枢行动，保底收入防止"剧情链饿死"
  if (state.eventStack.length > 0) {
    deltaResource(state.resources.food, 8);
    deltaResource(state.resources.water, 6);
    messages.push('【间隙】日子再难也要过——你趁着剧情的空当搜刮了一圈（食物+8、水+6）。');
  }

  // 1b. 每日自动消耗（食物、水、理智、体力）
  const daily = applyDailyConsumption(state);
  messages.push(...daily.map(m => `[每日消耗] ${m}`));
  
  // 2. 应用每日结算（income + 饥饿惩罚）
  const inc = applyIncome(state, content.income);
  messages.push(...inc.messages);
  if (inc.dead) {
    // 判断死因
    let cause = 'health';
    if (state.resources.water.current <= 0) cause = 'thirst';
    else if (state.resources.food.current <= 0) cause = 'hunger';
    finalizeDeath(state, content, cause);
    return { dead: true, messages, event: null };
  }
  
  // 3. 检查生存状态
  const starv = applyStarvation(state);
  messages.push(...starv);
  // 3a. 理智归零：精神崩溃，持续流失生命
  if (state.resources.sanity.current <= 0) {
    deltaResource(state.resources.health, -8);
    messages.push('理智彻底耗尽——迷雾中的低语钻进了你的骨头，你开始分不清现实和幻觉（生命-8）。');
  }
  if (state.resources.health.current <= 0) {
    let cause = 'health';
    if (state.resources.sanity.current <= 0) cause = 'sanity';
    else if (state.resources.food.current <= 0) cause = 'hunger';
    else if (state.resources.water.current <= 0) cause = 'thirst';
    finalizeDeath(state, content, cause);
    return { dead: true, messages, event: null };
  }
  
  // 4. 天数递增 + 晨间刷新行动点
  state.day += 1;
  state.ap = 3;
  state.runStats.survivalDays = state.day;
  
  // 5. 获得经验值（每天+1，用于技能点）
  gainSkillPoints(state as any, 1);
  
  // 6. 调度触发式支线
  scheduleLine(content, state);

  // 6b. 调度阶段剧情链（一次性剧情场景接管，链尾经 next: start 回到枢纽）
  if (!state.eventStack.length) {
    const storyMsg = schedulePhaseStory(content, state);
    if (storyMsg) messages.push(storyMsg);
  }
  
  // 7. 野兽遭遇战检定（战斗为覆盖层：剧情进行中同样可能遇袭）
  if (!state.combat) {
    const encounter = maybeStartEncounter(state, rng);
    if (encounter) messages.push(encounter);
  }

  // 8. 抽取随机事件
  let event: RandomEventDef | null = null;
  if (!state.eventStack.length) {
    event = drawDailyEvent(content, state, rng);
    if (event) {
      state.pendingEvents.push(event.id);
      state.runStats.eventsTriggered += 1;
    }
  }
  
  // 8. 检查推进机制（世界等级、天灾预警、剧情触发）
  //    checkProgression 内部已生成 messages，此处不再重复推送
  const progressionCheck = checkProgression(state as any, content);
  messages.push(...progressionCheck.messages);

  // 9b. 天灾结算：核对准备情况，发放奖励或施加惩罚
  if (progressionCheck.catastropheTrigger) {
    const event = progressionCheck.catastropheTrigger;
    const verdict = evaluateCatastrophe(state as any, event);
    const settled = resolveCatastrophe(state as any, event, verdict.success);
    messages.push(...verdict.messages, ...settled.messages);
  }

  // 10. 幸存者排行榜播报（每 3 天）
  const rank = rankMessage(state);
  if (rank) messages.push(rank);

  // 11. 成就检查（跨周目持久）
  for (const a of checkAchievements(state)) {
    messages.push(`【成就达成】${a.name}：${a.desc}`);
  }

  // 11a. 更新当前游戏阶段
  const oldPhase = state.currentPhase;
  updateCurrentPhase(state);
  if (state.currentPhase !== oldPhase) {
    const phase = getPhaseByDay(state.day);
    messages.push(`【阶段进入】${phase.name}：${phase.description}`);
  }

  // 11b. 称号检查
  const newTitles = checkTitles(state);
  for (const t of newTitles) {
    messages.push(`【称号解锁】${t}`);
  }

  // 12. 每日市场价格更新（经济系统接入）
  updateMarketPrices(state as any, state.day);

  // 13. 好结局/隐藏结局触发检查
  const goodEnding = checkGoodEndings(state, content);
  if (goodEnding) {
    messages.push(`【结局达成】${goodEnding.title}`);
    return { dead: true, messages, event: null };
  }

  // ============ v4.0 新增系统集成 ============

  // 14. 策略分析系统（每日分析玩家策略）
  const strategyEngine = new StrategyEngine(state.day);
  const strategyAdvice = strategyEngine.generateStrategyAdvice(state);
  if (state.day % 5 === 0) { // 每5天推送一次策略建议
    messages.push(`【策略分析】当前策略：${strategyAdvice.analysis.dominantStrategy}`);
    messages.push(`整体效率：${Math.round(strategyAdvice.analysis.overallEfficiency)}%`);
    if (strategyAdvice.advice.length > 0) {
      messages.push(`建议：${strategyAdvice.advice[0]}`);
    }
  }

  // 15. AI事件生成器（动态生成随机事件）
  const aiEventGenerator = new AIEventGenerator(state.day);
  const aiEvent = aiEventGenerator.generateEvent(state, state.day); // 每天生成1个AI事件
  if (aiEvent && !state.eventStack.length) {
    messages.push(`【AI事件】${aiEvent.description}`);
    // 应用AI事件影响（使用成功影响）
    for (const option of aiEvent.options) {
      for (const impact of option.successImpacts) {
        if (impact.type === 'resource' && impact.resource) {
          const resourceKey = impact.resource as keyof typeof state.resources;
          if (state.resources[resourceKey]) {
            deltaResource(state.resources[resourceKey], impact.amount ?? 0);
          }
        } else if (impact.type === 'flag' && impact.flag) {
          state.flags[impact.flag] = impact.flagValue ?? true;
        }
      }
    }
  }

  // 16. 叙事引擎（检查叙事触发条件）
  const narrativeEngine = new NarrativeEngine(state.day);
  const narrativeScene = narrativeEngine.generateScene(state);
  if (narrativeScene && state.day % 3 === 0) { // 每3天可能触发叙事场景
    messages.push(`【叙事事件】${narrativeScene.title}`);
    messages.push(narrativeScene.text);
    // 应用叙事场景的影响（通过场景类型判断）
    const sceneType = narrativeScene.type;
    if (sceneType === 'disaster' || sceneType === 'dilemma') {
      // 灾难/困境场景消耗资源
      deltaResource(state.resources.sanity, -5);
    }
  }

  // 17. 策略影响应用（根据主导策略给予加成/惩罚）
  const dominantStrategy = strategyAdvice.analysis.dominantStrategy;
  switch (dominantStrategy) {
    case StrategyArchetype.FARMING:
      if (state.resources.food.current > 50) {
        deltaResource(state.resources.food, 5);
        messages.push('【种田流加成】你的农场产出提升（食物+5）');
      }
      break;
    case StrategyArchetype.COMBAT:
      if (state.combatKills > 5) {
        state.attributes.strength += 1;
        messages.push('【战斗流加成】战斗经验提升（力量+1）');
      }
      break;
    case StrategyArchetype.STRATEGY:
      if (state.attributes.intelligence > 15) {
        deltaResource(state.resources.water, 3);
        deltaResource(state.resources.food, 3);
        messages.push('【策略流加成】智谋优势（食物+3、水+3）');
      }
      break;
    case StrategyArchetype.EXPLORATION:
      if (state.attributes.agility > 12) {
        state.flags['exploration_bonus'] = true;
        messages.push('【探索流加成】探索效率提升');
      }
      break;
    case StrategyArchetype.SOCIAL:
      if (state.reputation.overall > 0) {
        state.reputation.overall += 1;
        messages.push('【社交流加成】声望提升（+1）');
      }
      break;
    case StrategyArchetype.MYSTICAL:
      if (state.flags['absorbed_storm_power'] || state.flags['blessed_by_tree']) {
        state.resources.sanity.current = Math.min(
          state.resources.sanity.max,
          state.resources.sanity.current + 5
        );
        messages.push('【神秘流加成】理智恢复（+5）');
      }
      break;
    default:
      break;
  }

  return {
    dead: false,
    messages,
    event,
    progression: progressionCheck,
  };
}

// ============================================================
// v3.0 等级/经验/属性点/称号系统
// ============================================================

/** 获得经验值，自动检查升级 */
export function gainExp(state: GameState, amount: number): { leveledUp: boolean; newLevel: number } {
  state.exp += amount;
  let leveledUp = false;
  while (state.exp >= state.expToNext && state.level < 30) {
    state.exp -= state.expToNext;
    state.level += 1;
    state.expToNext = calculateExpRequired(state.level);
    // 升级奖励
    state.attributePoints += 1;
    state.skillPoints += 1;
    state.resources.health.max += 10;
    state.resources.health.current = Math.min(state.resources.health.max, state.resources.health.current + 10);
    leveledUp = true;
  }
  return { leveledUp, newLevel: state.level };
}

/** 分配属性点 */
export function allocateAttribute(state: GameState, attr: 'strength' | 'agility' | 'intelligence' | 'luck'): boolean {
  if (state.attributePoints <= 0) return false;
  state.attributes[attr] += 1;
  state.attributePoints -= 1;
  return true;
}

/** 获得迷雾积分 */
export function gainMistPoints(state: GameState, amount: number): void {
  state.mistPoints += amount;
}

/** 检查并解锁称号 */
export function checkTitles(state: GameState): string[] {
  const newlyUnlocked: string[] = [];
  for (const title of TITLES) {
    if (state.titles.includes(title.id)) continue;
    let unlocked = false;
    switch (title.unlockCondition.type) {
      case 'day':
        unlocked = state.day >= (title.unlockCondition.value as number);
        break;
      case 'combat':
        unlocked = state.combatKills >= (title.unlockCondition.value as number);
        break;
      case 'explore':
        unlocked = state.visitedScenes.length >= (title.unlockCondition.value as number);
        break;
      case 'special':
        unlocked = !!state.flags[title.unlockCondition.value as string];
        break;
      case 'npc':
        // 拥有指定数量以上的NPC同伴（好感度>30且存活）
        const npcCount = Object.keys(state.npcRelations).filter(
          id => state.npcRelations[id].isAlive && state.npcRelations[id].affection >= (title.unlockCondition.value as number)
        ).length;
        unlocked = npcCount >= (title.unlockCondition.value as number);
        break;
      case 'phase':
        // 达到指定游戏阶段
        unlocked = state.currentPhase >= (title.unlockCondition.value as number);
        break;
      case 'achievement':
        // 达成指定成就
        unlocked = (state.meta.unlockedAchievements ?? []).includes(title.unlockCondition.value as string);
        break;
    }
    if (unlocked) {
      state.titles.push(title.id);
      newlyUnlocked.push(title.name);
      // 自动装备第一个解锁的称号
      if (!state.activeTitle) state.activeTitle = title.id;
    }
  }
  return newlyUnlocked;
}

/** 获取当前称号的属性加成 */
export function getActiveTitleBonuses(state: GameState): Record<string, number> {
  if (!state.activeTitle) return {};
  const title = TITLES.find(t => t.id === state.activeTitle);
  if (!title) return {};
  return title.bonuses as Record<string, number>;
}

/** 更新当前游戏阶段 */
export function updateCurrentPhase(state: GameState): void {
  const phase = getPhaseByDay(state.day);
  if (phase.id !== state.currentPhase) {
    state.currentPhase = phase.id;
  }
}

/** 生命归零时结算死亡结局（根据死因选择对应结局）。 */
function finalizeDeath(state: GameState, content: ContentPack, cause?: string): void {
  const deathEndings = Object.values(content.storyline.endings).filter((e) => e.category === 'death');
  // 默认死亡结局：E10 病榻（生命归零的通用结局）
  let death = deathEndings.find(e => e.id === 'E10') ?? deathEndings[0] ?? 
    { id: 'death', title: '死亡', desc: '你在迷雾中倒下。', category: 'death' };
  
  // 根据死因选择对应结局
  if (cause === 'sanity') {
    death = deathEndings.find(e => e.id === 'E07') ?? death; // 走进雾里
  } else if (cause === 'thirst') {
    death = deathEndings.find(e => e.id === 'E08') ?? death; // 干渴
  } else if (cause === 'hunger') {
    death = deathEndings.find(e => e.id === 'E09') ?? death; // 饥饿
  } else if (cause === 'combat') {
    death = deathEndings.find(e => e.id === 'E11') ?? death; // 夜访者
  } else if (cause === 'beast_wave') {
    death = deathEndings.find(e => e.id === 'E12') ?? death; // 兽潮之夜
  }
  
  const outcome: Outcome = { type: 'death', id: death.id, title: death.title, desc: death.desc };
  state.outcome = outcome;
  state.meta.bestDays = Math.max(state.meta.bestDays, state.day);
}

/**
 * 检查好结局/隐藏结局触发条件。
 * 在每日结算后调用，满足条件则触发对应结局。
 * 注意：不满足任何结局条件时返回 null，继续游戏，不强制触发结局。
 */
function checkGoodEndings(state: GameState, content: ContentPack): Outcome | null {
  const day = state.day;
  const flags = state.flags;
  const inv = state.inventory;
  
  // === 后期结局（第150天以后触发）===
  // flag 名与 phase10 决战链内容的产出对齐（ending_* 系列）
  if (day >= 150) {
    // E18 人类末日：最终决战走向灭亡
    if (flags['ending_humanity_end']) {
      return triggerEnding(content, state, 'E18');
    }
    // E15 文明重生：带领人类重建文明，迷雾消散
    if (flags['ending_civilization_reborn'] && flags['mist_dispelled']) {
      return triggerEnding(content, state, 'E15');
    }
    // E16 迷雾之主：继承先知的力量
    if (flags['ending_mist_lord']) {
      return triggerEnding(content, state, 'E16');
    }
    // E17 独裁者：用铁腕建立独裁政权
    if (flags['ending_dictator']) {
      return triggerEnding(content, state, 'E17');
    }
    // 隐藏结局：爱的进化（与先知和解）
    if (flags['love_evolution_ending']) {
      return triggerEnding(content, state, 'E05');
    }
  }
  
  // === 中期结局（第60-149天触发）===
  if (day >= 60 && day < 150) {
    // E04 平凡的等待：迷雾自然消散（需要特定flag）
    if (flags['mist_naturally_dispelled']) {
      return triggerEnding(content, state, 'E04');
    }
  }
  
  // === 早期结局（第30-59天触发）===
  // 好结局均在第30天以后触发（保证游戏有足够长度）
  if (day >= 30 && day < 60) {
    // E05 迷雾之眼：收集3块结晶
    if ((inv['purple_crystal'] ?? 0) >= 1 && (inv['red_crystal'] ?? 0) >= 1 && (inv['blue_crystal'] ?? 0) >= 1) {
      return triggerEnding(content, state, 'E05');
    }
    
    // E01 直升机的轰鸣：修好无线电
    if (flags['radio_fixed']) {
      return triggerEnding(content, state, 'E01');
    }
    
    // E02 冲天信号弹：获得信号弹
    if ((inv['signal_flare'] ?? 0) > 0) {
      return triggerEnding(content, state, 'E02');
    }
    
    // E06 同行者：老K同行
    if (flags['laok_ally'] && flags['laok_trust']) {
      return triggerEnding(content, state, 'E06');
    }
    
    // E14 不散的篝火：朵朵存活
    if (flags['kid_saved']) {
      return triggerEnding(content, state, 'E14');
    }
    
    // E13 守望者的日记：探索次数多
    if (state.visitedScenes.length >= 15) {
      return triggerEnding(content, state, 'E13');
    }
    
    // E03 篝火长明：温暖度保持良好
    if (state.resources.warmth.current >= 50) {
      return triggerEnding(content, state, 'E03');
    }
    
    // E04 平凡的等待：无特殊条件（最基础的好结局，仅在第50-59天触发）
    if (day >= 50) {
      return triggerEnding(content, state, 'E04');
    }
  }
  
  // 不满足任何结局条件，继续游戏
  return null;
}

/** 触发指定结局并写入状态。 */
function triggerEnding(content: ContentPack, state: GameState, endingId: string): Outcome | null {
  const ed = findEnding(content, endingId);
  if (!ed) return null;
  const outcome: Outcome = { type: 'ending', id: ed.id, title: ed.title, desc: ed.desc };
  state.outcome = outcome;
  state.meta.unlockedEndings = Array.from(new Set([...state.meta.unlockedEndings, ed.id]));
  state.meta.bestDays = Math.max(state.meta.bestDays, state.day);
  return outcome;
}

// ============================================================
// 基地建筑系统（建造/升级/效果应用）
// ============================================================

/** 检查是否可以建造指定建筑 */
export function canBuildBuilding(state: GameState, buildingId: string): { canBuild: boolean; reason?: string; cost?: Record<string, number> } {
  const building = BASE_CONFIG.buildings.find(b => b.id === buildingId);
  if (!building) return { canBuild: false, reason: '建筑不存在' };

  // 检查阶段解锁
  const phase = getPhaseByDay(state.day);
  if (phase.id < building.unlockPhase) {
    return { canBuild: false, reason: `需要第${building.unlockPhase}阶段才能建造` };
  }

  // 检查是否已达到最高等级
  const currentLevel = state.buildings[buildingId] ?? 0;
  if (currentLevel >= building.maxLevel) {
    return { canBuild: false, reason: '已达到最高等级' };
  }

  // 计算建造成本（每级递增）
  const cost: Record<string, number> = {};
  const levelMultiplier = Math.pow(1.5, currentLevel);
  for (const [item, baseCost] of Object.entries(building.cost)) {
    cost[item] = Math.floor(baseCost * levelMultiplier);
  }

  // 检查实际物资库存
  for (const [item, amount] of Object.entries(cost)) {
    const available = state.inventory[item] ?? 0;
    if (available < amount) {
      return { canBuild: false, reason: `物资不足！需要 ${item} x${amount}，当前 ${available}` };
    }
  }

  return { canBuild: true, cost };
}

/** 建造或升级建筑 */
export function buildOrUpgradeBuilding(state: GameState, buildingId: string): { success: boolean; message: string } {
  const check = canBuildBuilding(state, buildingId);
  if (!check.canBuild) {
    return { success: false, message: check.reason ?? '无法建造' };
  }

  const building = BASE_CONFIG.buildings.find(b => b.id === buildingId)!;
  const currentLevel = state.buildings[buildingId] ?? 0;

  // 扣除实际物资
  if (check.cost) {
    for (const [item, amount] of Object.entries(check.cost)) {
      state.inventory[item] = (state.inventory[item] ?? 0) - amount;
      if (state.inventory[item] <= 0) delete state.inventory[item];
    }
  }
  
  // 升级建筑
  state.buildings[buildingId] = currentLevel + 1;
  
  const action = currentLevel === 0 ? '建造' : '升级';
  return { 
    success: true, 
    message: `${action}${building.name}成功！当前等级：${currentLevel + 1}/${building.maxLevel}` 
  };
}

/** 获取所有建筑的总效果 */
export function getBuildingEffects(state: GameState): Record<string, number> {
  const effects: Record<string, number> = {};
  for (const [buildingId, level] of Object.entries(state.buildings)) {
    if (level <= 0) continue;
    const building = BASE_CONFIG.buildings.find(b => b.id === buildingId);
    if (!building) continue;
    for (const [effectKey, effectValue] of Object.entries(building.effects)) {
      effects[effectKey] = (effects[effectKey] ?? 0) + effectValue * level;
    }
  }
  return effects;
}

/** 每日应用建筑效果（在 runDaily 中调用） */
export function applyBuildingDailyEffects(state: GameState): string[] {
  const messages: string[] = [];
  const effects = getBuildingEffects(state);
  
  // 农田：每日食物产出
  if (effects.food_production && effects.food_production > 0) {
    const foodGain = effects.food_production;
    deltaResource(state.resources.food, foodGain);
    messages.push(`【农田产出】收获了${foodGain}单位食物`);
  }
  
  // 医疗室：每日健康恢复
  if (effects.healing && effects.healing > 0) {
    const healthGain = effects.healing;
    if (state.resources.health.current < state.resources.health.max) {
      deltaResource(state.resources.health, healthGain);
      messages.push(`【医疗室】恢复了${healthGain}点生命值`);
    }
  }
  
  // 工坊：每日制作加成（简化为增加迷雾积分）
  if (effects.crafting && effects.crafting > 0) {
    const pointsGain = effects.crafting * 2;
    state.mistPoints += pointsGain;
    messages.push(`【工坊产出】制作了物品，获得${pointsGain}迷雾积分`);
  }
  
  // 瞭望塔：提前发现危险（简化为增加理智）
  if (effects.detection && effects.detection > 0) {
    const sanityGain = effects.detection;
    deltaResource(state.resources.sanity, sanityGain);
    messages.push(`【瞭望塔】提前发现危险，减少了恐慌（理智+${sanityGain}）`);
  }
  
  // 图书室：每日研究加成（简化为增加经验）
  if (effects.research && effects.research > 0) {
    const expGain = effects.research * 3;
    gainExp(state, expGain);
    messages.push(`【图书室】研究获得了${expGain}点经验`);
  }
  
  // 兵营：每日训练加成（简化为增加战斗击杀数的效率）
  if (effects.training && effects.training > 0) {
    // 训练效果在战斗中体现，这里只记录
    messages.push(`【兵营】战士们进行了日常训练`);
  }
  
  // 迷雾祭坛室：每日神秘研究（简化为增加觉醒进度）
  if (effects.mystic_research && effects.mystic_research > 0 && !state.awakening.isAwakened) {
    const progressGain = effects.mystic_research * 2;
    state.awakening.awakeningProgress = Math.min(100, state.awakening.awakeningProgress + progressGain);
    messages.push(`【迷雾祭坛室】研究迷雾，觉醒进度+${progressGain}（当前：${state.awakening.awakeningProgress}%）`);
    
    // 觉醒进度达到100%时触发觉醒
    if (state.awakening.awakeningProgress >= 100 && !state.awakening.isAwakened) {
      state.awakening.isAwakened = true;
      state.awakening.abilityLevel = 1;
      // 随机选择一种超能力
      const abilities = ['strength', 'speed', 'energy', 'perception', 'regeneration'];
      state.awakening.abilityType = abilities[Math.floor(Math.random() * abilities.length)];
      messages.push(`【觉醒！】你感受到了迷雾的力量，觉醒了超能力：${state.awakening.abilityType}！`);
      state.flags['awakened'] = true;
    }
  }
  
  // 围墙：增加基地防御力（在防御事件中体现）
  if (effects.defense && effects.defense > 0) {
    // 防御力在兽潮等事件中体现，这里只记录
    const totalDefense = calculateBaseDefense(state.base?.level ?? 1, state.buildings);
    messages.push(`【基地防御】当前防御力：${totalDefense}`);
  }
  
  return messages;
}

// ============================================================
// 因果系统自动触发逻辑
// ============================================================

/**
 * 自动检查并触发因果关系
 * 根据玩家当前状态和行为，匹配因果关系并触发效果
 */
export function autoCheckCausalRelations(state: GameState, content: ContentPack): string[] {
  const messages: string[] = [];
  const triggeredToday: string[] = [];
  
  for (const causal of CAUSAL_RELATIONS) {
    // 跳过已经触发过的因果关系（一次性的）
    if (state.causalTracker.triggeredCauses.includes(causal.id) && causal.effect.delay === 0 && causal.effect.probability === 1) {
      continue;
    }
    
    let shouldTrigger = false;
    
    // 根据因果类型检查触发条件
    switch (causal.cause.type) {
      case 'state':
        shouldTrigger = checkStateCausalCondition(state, causal.cause.description);
        break;
      case 'action':
      case 'choice':
        shouldTrigger = checkChoiceCausalCondition(state, causal.cause.description);
        break;
      case 'npc_action':
        shouldTrigger = checkNpcCausalCondition(state, causal.cause.description);
        break;
      default:
        break;
    }
    
    if (shouldTrigger && !triggeredToday.includes(causal.id)) {
      // 检查概率
      const probability = causal.effect.probability ?? 1;
      if (Math.random() < probability) {
        // 触发因果效果
        const effectMessage = applyCausalEffect(state, causal, content);
        if (effectMessage) {
          messages.push(effectMessage);
          triggeredToday.push(causal.id);
        }
      }
    }
  }
  
  return messages;
}

/** 检查状态类因果条件 */
function checkStateCausalCondition(state: GameState, description: string): boolean {
  // 食物不足
  if (description.includes('食物') && description.includes('不足')) {
    return state.resources.food.current < 20;
  }
  // 水不足
  if (description.includes('水') && description.includes('不足')) {
    return state.resources.water.current < 20;
  }
  // 体力耗尽
  if (description.includes('体力耗尽')) {
    return state.resources.energy.current <= 0;
  }
  // 受伤
  if (description.includes('受伤')) {
    return state.resources.health.current < 50;
  }
  // 理智低
  if (description.includes('理智') && (description.includes('低') || description.includes('低于'))) {
    return state.resources.sanity.current < 30;
  }
  // 浓厚迷雾暴露
  if (description.includes('浓厚迷雾')) {
    return state.dailyPanel.mistDensity === 'thick' || state.dailyPanel.mistDensity === 'impenetrable';
  }
  // 基地防御
  if (description.includes('基地防御')) {
    const defense = calculateBaseDefense(state.base?.level ?? 1, state.buildings);
    if (description.includes('高')) return defense > 30;
    if (description.includes('低')) return defense < 10;
  }
  // 资源匮乏
  if (description.includes('资源匮乏') || description.includes('资源短缺')) {
    const totalResources = state.resources.food.current + state.resources.water.current;
    return totalResources < 50;
  }
  // 长期不维护基地
  if (description.includes('不维护基地')) {
    const buildingCount = Object.keys(state.buildings).length;
    return buildingCount > 0 && state.day > 30 && !state.flags['base_maintained'];
  }
  // 食物充足
  if (description.includes('食物充足') || description.includes('食物和水的充足')) {
    return state.resources.food.current > 50 && state.resources.water.current > 50;
  }
  // 积累大量积分
  if (description.includes('大量迷雾积分') || description.includes('积累大量')) {
    return state.mistPoints > 500;
  }
  // 积分不足
  if (description.includes('积分不足') || description.includes('资源匮乏')) {
    return state.mistPoints < 50;
  }
  // NPC好感度低
  if (description.includes('NPC好感度低于')) {
    const lowAffectionNpcs = Object.values(state.npcRelations).filter(n => n.affection < 20);
    return lowAffectionNpcs.length > 0;
  }
  // NPC好感度高
  if (description.includes('NPC好感度高于')) {
    const highAffectionNpcs = Object.values(state.npcRelations).filter(n => n.affection > 80);
    return highAffectionNpcs.length > 0;
  }
  return false;
}

/** 检查选择类因果条件 */
function checkChoiceCausalCondition(state: GameState, description: string): boolean {
  // 通过flag判断玩家是否做过某个选择
  const flagMap: Record<string, string> = {
    '救了朵朵': 'kid_saved',
    '抛弃了朵朵': 'kid_abandoned',
    '救了老K': 'laok_saved',
    '帮助老K复仇': 'laok_revenge_helped',
    '背叛了老K': 'laok_betrayed',
    '帮助了商人老张': 'zhang_helped',
    '欺骗了商人老张': 'zhang_cheated',
    '善待陈静医生': 'doctor_trusted',
    '忽视陈静医生': 'doctor_ignored',
    '支持小杨的发明': 'yang_supported',
    '救了林小雨': 'xiaoyu_saved',
    '尊重赵明': 'zhao_respected',
    '轻视赵明': 'zhao_disrespected',
    '与铁山建立兄弟关系': 'tieshan_brother',
    '与林鹰建立深度联盟': 'linying_allied',
    '信任老狐狸': 'laohuli_trusted',
    '感化黑鸦': 'blackcrow_converted',
    '杀死黑鸦': 'blackcrow_killed',
    '与先知谈判': 'prophet_negotiated',
    '消灭先知': 'prophet_destroyed',
    '继承先知': 'prophet_inherited',
    '无私帮助陌生幸存者': 'helped_stranger',
    '抢劫或伤害无辜幸存者': 'robbed_stranger',
    '分享食物给同伴': 'shared_food',
    '囤积食物': 'hoarded_food',
    '信守承诺': 'kept_promise',
    '违背承诺': 'broke_promise',
    '放过投降的敌人': 'spared_enemy',
    '处决投降的敌人': 'executed_enemy',
    '建造并升级农田': 'farm_built',
    '建造并升级医疗室': 'infirmary_built',
    '建造并升级工坊': 'workshop_built',
    '建造并升级围墙': 'wall_built',
    '建造并升级图书室': 'library_built',
    '建造并升级兵营': 'barracks_built',
    '建造迷雾祭坛室': 'altar_built',
  };
  
  for (const [keyword, flag] of Object.entries(flagMap)) {
    if (description.includes(keyword)) {
      return !!state.flags[flag];
    }
  }
  return false;
}

/** 检查NPC类因果条件 */
function checkNpcCausalCondition(state: GameState, description: string): boolean {
  // 检查特定NPC的状态
  if (description.includes('玩家处于致命危险')) {
    return state.resources.health.current < 20;
  }
  return false;
}

/** 应用因果效果 */
function applyCausalEffect(state: GameState, causal: any, content: ContentPack): string | null {
  const effect = causal.effect;
  let message = `【因果报应】${effect.description}`;
  
  // 记录因果关系
  if (!state.causalTracker.triggeredCauses.includes(causal.id)) {
    state.causalTracker.triggeredCauses.push(causal.id);
  }
  state.causalTracker.consequenceLog.push({
    day: state.day,
    cause: causal.cause.description,
    effect: effect.description,
  });
  
  // 根据效果类型应用具体效果
  switch (effect.type) {
    case 'attribute_change':
      if (effect.parameters) {
        if (effect.parameters.strength) state.attributes.strength += effect.parameters.strength;
        if (effect.parameters.agility) state.attributes.agility += effect.parameters.agility;
        if (effect.parameters.intelligence) state.attributes.intelligence += effect.parameters.intelligence;
        if (effect.parameters.luck) state.attributes.luck += effect.parameters.luck;
      }
      break;
    case 'resource_change':
      if (effect.parameters) {
        if (effect.parameters.health) deltaResource(state.resources.health, effect.parameters.health);
        if (effect.parameters.sanity) deltaResource(state.resources.sanity, effect.parameters.sanity);
        if (effect.parameters.energy) deltaResource(state.resources.energy, effect.parameters.energy);
        if (effect.parameters.food) deltaResource(state.resources.food, effect.parameters.food);
        if (effect.parameters.water) deltaResource(state.resources.water, effect.parameters.water);
      }
      break;
    case 'state_change':
      if (effect.parameters) {
        // 设置状态flag
        if (effect.parameters.status) state.flags[effect.parameters.status] = true;
        if (effect.parameters.mist_dispersal) state.flags['mist_dispelled'] = true;
        if (effect.parameters.awakening) state.flags['awakened'] = true;
        if (effect.parameters.hallucination) state.flags['hallucinating'] = true;
      }
      break;
    case 'npc_relation':
      if (effect.parameters) {
        // 提升所有NPC好感度
        if (effect.parameters.npc_affection) {
          for (const npcId of Object.keys(state.npcRelations)) {
            state.npcRelations[npcId].affection = Math.min(100, state.npcRelations[npcId].affection + effect.parameters.npc_affection);
          }
        }
        // 声望变化
        if (effect.parameters.reputation) {
          state.reputation.overall += effect.parameters.reputation;
          if (effect.parameters.reputation > 0) {
            state.reputation.fame += effect.parameters.reputation;
          } else {
            state.reputation.infamy += Math.abs(effect.parameters.reputation);
          }
        }
      }
      break;
    case 'unlock':
      if (effect.parameters) {
        // 解锁内容
        if (effect.parameters.tech_unlock) state.flags['tech_unlocked'] = true;
        if (effect.parameters.crafting_unlock) state.flags['crafting_unlocked'] = true;
        if (effect.parameters.hidden_ending) state.flags[effect.parameters.hidden_ending] = true;
        if (effect.parameters.ending) state.flags[`ending_${effect.parameters.ending}`] = true;
        if (effect.parameters.special_item) state.inventory[effect.parameters.special_item] = 1;
      }
      break;
    case 'event_trigger':
      if (effect.parameters && effect.parameters.event) {
        // 只入队内容包里真实存在的事件，防止悬空引用卡死主循环
        if (resolveEvent(content, effect.parameters.event)) {
          state.pendingEvents.push(effect.parameters.event);
          message += `（触发事件：${effect.parameters.event}）`;
        } else {
          message += `（事件 ${effect.parameters.event} 未收录，已跳过）`;
        }
      }
      break;
    default:
      break;
  }
  
  return message;
}

/**
 * 记录玩家的选择因果（在applyChoice中调用）
 * 根据玩家选择的flag，自动记录相关因果关系
 */
export function recordChoiceCausality(state: GameState, choice: Choice): void {
  // 检查选择的effects中是否有flag设置
  for (const eff of choice.effects) {
    if (eff.kind === 'flag' && eff.flag) {
      // 根据flag匹配因果关系
      for (const causal of CAUSAL_RELATIONS) {
        if ((causal.cause.type === 'choice' || causal.cause.type === 'action') && 
            !state.causalTracker.triggeredCauses.includes(causal.id)) {
          // 检查描述中是否包含与flag相关的关键词
          const flagKeywords: Record<string, string[]> = {
            'kid_saved': ['救了朵朵', '救了女孩'],
            'laok_saved': ['救了老K', '帮助老K'],
            'zhang_helped': ['帮助了商人老张', '帮助老张'],
            'doctor_trusted': ['善待陈静医生', '信任医生'],
            'yang_supported': ['支持小杨的发明', '支持小杨'],
            'helped_stranger': ['无私帮助陌生幸存者', '帮助陌生人'],
            'shared_food': ['分享食物给同伴', '分享食物'],
            'kept_promise': ['信守承诺', '遵守承诺'],
            'spared_enemy': ['放过投降的敌人', '放过敌人'],
            'farm_built': ['建造并升级农田', '建造农田'],
            'infirmary_built': ['建造并升级医疗室', '建造医疗室'],
          };
          
          for (const [flag, keywords] of Object.entries(flagKeywords)) {
            if (eff.flag === flag) {
              for (const keyword of keywords) {
                if (causal.cause.description.includes(keyword)) {
                  // 记录因果关系，如果有延迟则加入待生效队列
                  if (causal.effect.delay && causal.effect.delay > 0) {
                    recordCausalRelation(state, causal.id, causal.effect.description, causal.effect.delay, causal.effect.probability ?? 1);
                  } else {
                    // 立即触发
                    state.causalTracker.triggeredCauses.push(causal.id);
                  }
                  break;
                }
              }
            }
          }
        }
      }
    }
  }
}