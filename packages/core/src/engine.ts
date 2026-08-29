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
  EndingDef,
} from './types.js';
import { createResources, applyIncome, applyStarvation, deltaResource } from './resources.js';
import { rollD100 } from './dice.js';
import { Rng } from './rng.js';

// v2.0 新增系统导入
import { createInitialBase, processDailyProduction } from './base.js';
import { createInitialSkillTree, gainSkillPoints } from './skills.js';
import { createInitialProgressionState, checkProgression } from './progression.js';

/** 创建新一局状态 v2.0：集成所有新系统 */
export function createInitialState(content: ContentPack, meta?: GameState['meta']): GameState {
  const initial = content.storyline.initialScene;
  return {
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
    runStats: { survivalDays: 0, eventsTriggered: 0, resources: {} },
    meta: meta ?? { runs: 0, unlockedEndings: [], bestDays: 0 },
    
    // v2.0 新增系统初始化
    base: createInitialBase(),
    skills: createInitialSkillTree(),
    progression: createInitialProgressionState(),
    equipment: {},
    attributes: {
      strength: 10,
      agility: 10,
      intelligence: 10,
      luck: 10,
    },
  };
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
  return true;
}

/** 过滤出当前可显示的选项（requires 满足）。 */
export function availableChoices(choices: Choice[], state: GameState): Choice[] {
  return choices.filter((c) => conditionMet(c.requires, state));
}

/** 应用单个非跳转类效果到状态。 */
function applyEffect(state: GameState, eff: ChoiceEffect): void {
  switch (eff.kind) {
    case 'resource':
      if (eff.resource) deltaResource(state.resources[eff.resource], eff.delta ?? 0);
      break;
    case 'flag':
      state.flags[eff.flag ?? ''] = eff.flagValue ?? true;
      break;
    case 'item': {
      const cur = state.inventory[eff.item ?? ''] ?? 0;
      state.inventory[eff.item ?? ''] = Math.max(0, cur + (eff.amount ?? 0));
      break;
    }
    default:
      break; // roll / jump 由 applyChoice 统一处理
  }
}

export interface ChoiceResult {
  state: GameState;
  /** 结果旁白（选项自带叙事文本） */
  resultText?: string;
  /** 若跳转到结局则给出结算结果 */
  outcome?: Outcome;
  next?: string;
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
  for (const eff of choice.effects) {
    if (eff.kind === 'roll') {
      const res = rollD100(rng.next.bind(rng), eff.difficulty ?? 50);
      if (res.success) {
        next = eff.onSuccess ?? next;
        if (eff.successEffects) for (const se of eff.successEffects) applyEffect(state, se);
      } else {
        next = eff.onFail ?? next;
        if (eff.lethal && res.tier === 'crit_fail') state.resources.health.current = 0;
      }
    } else if (eff.kind === 'jump') {
      next = eff.target ?? next;
    } else {
      applyEffect(state, eff);
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
  return { state, resultText, outcome, next };
}

/** 应用事件选项：处理完后从 pendingEvents 弹出并记入 triggeredEvents。 */
export function applyEventChoice(content: ContentPack, state: GameState, choice: Choice, rng: Rng): ChoiceResult {
  const r = applyChoice(content, state, choice, rng);
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
    state.eventStack.push(state.currentScene);
    state.currentScene = line.initialScene;
    state.flags[`line_done_${line.id}`] = true;
    break;
  }
}

/**
 * 推进一天 v2.0：集成基地生产、技能成长、推进机制
 */
export function runDaily(
  content: ContentPack,
  state: GameState,
  rng: Rng,
): { dead: boolean; messages: string[]; event: RandomEventDef | null; progression?: any } {
  const messages: string[] = [];
  
  // 1. 基地每日生产
  const production = processDailyProduction(state as any);
  messages.push(...production.messages.map(m => `[生产] ${m}`));
  
  // 2. 应用每日结算（income + 饥饿惩罚）
  const inc = applyIncome(state, content.income);
  messages.push(...inc.messages);
  if (inc.dead) {
    finalizeDeath(state, content);
    return { dead: true, messages, event: null };
  }
  
  // 3. 检查生存状态
  const starv = applyStarvation(state);
  messages.push(...starv);
  if (state.resources.health.current <= 0) {
    finalizeDeath(state, content);
    return { dead: true, messages, event: null };
  }
  
  // 4. 天数递增
  state.day += 1;
  state.runStats.survivalDays = state.day;
  
  // 5. 获得经验值（每天+1，用于技能点）
  gainSkillPoints(state as any, 1);
  
  // 6. 调度触发式支线
  scheduleLine(content, state);
  
  // 7. 抽取随机事件
  let event: RandomEventDef | null = null;
  if (!state.eventStack.length) {
    event = drawDailyEvent(content, state, rng);
    if (event) {
      state.pendingEvents.push(event.id);
      state.runStats.eventsTriggered += 1;
    }
  }
  
  // 8. 【v2.0核心】检查推进机制
  const progressionCheck = checkProgression(state as any, content);
  messages.push(...progressionCheck.messages);
  
  return { 
    dead: false, 
    messages, 
    event,
    progression: progressionCheck
  };
}

/** 生命归零时结算死亡结局（优先取 category=death 的结局定义）。 */
function finalizeDeath(state: GameState, content: ContentPack): void {
  const death =
    Object.values(content.storyline.endings).find((e) => e.category === 'death') ??
    { id: 'death', title: '死亡', desc: '你在迷雾中倒下。', category: 'death' };
  const outcome: Outcome = { type: 'death', id: death.id, title: death.title, desc: death.desc };
  state.outcome = outcome;
  state.meta.bestDays = Math.max(state.meta.bestDays, state.day);
}
