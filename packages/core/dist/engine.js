import { createResources, applyIncome, applyStarvation, applyDailyConsumption, deltaResource } from './resources.js';
import { rollD100 } from './dice.js';
// v2.0 新增系统导入
import { createInitialBase, processDailyProduction } from './base.js';
import { createInitialSkillTree, gainSkillPoints } from './skills.js';
import { createInitialProgressionState, checkProgression, evaluateCatastrophe, resolveCatastrophe } from './progression.js';
import { createInitialEconomy, ITEM_DATABASE, updateMarketPrices } from './economy.js';
import { applyTalent } from './talents.js';
import { applyCompanionDaily } from './companions.js';
import { rankMessage } from './ranking.js';
import { processSignin } from './signin.js';
import { maybeStartEncounter, initiateCombat, getAvailableMonsters } from './combat.js';
import { checkAchievements } from './achievements.js';
// v3.0 新增：统一配置与公式
import { getPhaseByDay, calculateExpRequired, TITLES, calculateDailyWeather, calculateMistDensity, calculateDangerLevel, getMajorEventByDay, assessMajorEventDifficulty, getUnlockedZones, } from './gameConfig.js';
/** 创建新一局状态 v2.1：集成所有新系统；talentId 提供则落地开局天赋 */
export function createInitialState(content, meta, talentId) {
    const initial = content.storyline.initialScene;
    const state = {
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
        gameVersion: '0.5.0',
    };
    if (talentId)
        applyTalent(state, talentId);
    return state;
}
/** 跨主线 + 支线解析场景节点（currentScene 可能在某条线内）。 */
export function resolveScene(content, sceneId) {
    if (content.storyline.scenes[sceneId])
        return content.storyline.scenes[sceneId];
    for (const line of content.lines ?? [])
        if (line.scenes[sceneId])
            return line.scenes[sceneId];
    return null;
}
/** 跨主线 + 支线查找结局定义。 */
export function findEnding(content, id) {
    if (content.storyline.endings[id])
        return content.storyline.endings[id];
    for (const line of content.lines ?? [])
        if (line.endings?.[id])
            return line.endings[id];
    return null;
}
/** 按 id 取随机事件定义。 */
export function resolveEvent(content, id) {
    return content.randomEvents.find((e) => e.id === id) ?? null;
}
/** 条件判定：requires 为空则恒真；flags/items/resources 全部满足才通过。 */
export function conditionMet(cond, state) {
    if (!cond)
        return true;
    if (cond.flags)
        for (const f of cond.flags)
            if (!state.flags[f])
                return false;
    if (cond.items) {
        for (const [id, min] of Object.entries(cond.items)) {
            if ((state.inventory[id] ?? 0) < min)
                return false;
        }
    }
    if (cond.resources) {
        for (const [k, min] of Object.entries(cond.resources)) {
            if (state.resources[k].current < min)
                return false;
        }
    }
    if (cond.attributes) {
        for (const [k, min] of Object.entries(cond.attributes)) {
            if ((state.attributes[k] ?? 0) < min)
                return false;
        }
    }
    return true;
}
/** 过滤出当前可显示的选项（requires 满足）。 */
export function availableChoices(choices, state) {
    return choices.filter((c) => conditionMet(c.requires, state));
}
/** 应用单个非跳转类效果到状态；返回产生的系统播报（物品升级等）。 */
function applyEffect(state, eff) {
    const system = [];
    switch (eff.kind) {
        case 'resource':
            if (eff.resource)
                deltaResource(state.resources[eff.resource], eff.delta ?? 0);
            break;
        case 'flag':
            state.flags[eff.flag ?? ''] = eff.flagValue ?? true;
            break;
        case 'item': {
            const id = eff.item ?? '';
            const cur = state.inventory[id] ?? 0;
            state.inventory[id] = Math.max(0, cur + (eff.amount ?? 0));
            if ((eff.amount ?? 0) < 0)
                trackItemUsage(state, id, system);
            break;
        }
        default:
            break; // roll / jump 由 applyChoice 统一处理
    }
    return system;
}
/** 处理 combat 效果：开启战斗会话（已在战斗中则跳过）；返回系统播报。 */
function startCombatFromEffect(state, eff, rng) {
    if (state.combat)
        return null;
    const monsterId = eff.monster ?? pickEncounterMonster(state, rng);
    if (!monsterId)
        return null;
    state.combat = initiateCombat(state, monsterId);
    return '【遭遇】雾的深处传来低吼——战斗开始！';
}
/** 按当前天数从可用怪物池随机取一只（主动狩猎用）。 */
function pickEncounterMonster(state, rng) {
    const pool = getAvailableMonsters(state.day ?? 1).filter((m) => !!m);
    if (!pool.length)
        return null;
    return pool[rng.int(0, pool.length - 1)].id;
}
/**
 * 自动进食/喝水：生存资源低于警戒线时，自动消耗背包里的食物/水物品补给。
 * 打通"物品→资源"转换（签到/商人/基地产出物的库存意义），也是支线日程中断粮的兜底。
 */
function autoProvision(state) {
    const messages = [];
    const provision = (key, itemId, restore, verb) => {
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
function trackItemUsage(state, itemId, out) {
    if (!itemId)
        return;
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
/**
 * 应用一个选项（场景或事件通用）：
 * - 遍历 effects：roll 做 d100 检定决定 onSuccess/onFail 跳转与附加效果；
 *   jump 直接改写跳转目标；其余效果即时落地。
 * - 跳转目标若是结局 id → 写入 state.outcome 并解锁图鉴；
 *   若是 "__return__" → 从场景栈弹出返回上级场景；否则更新 currentScene。
 * 注：进入支线由 scheduleLine 显式压栈，本函数对普通场景跳转不压栈（保证线内游走不出栈）。
 */
export function applyChoice(content, state, choice, rng) {
    let next = choice.next;
    const resultText = choice.result;
    const systemMessages = [];
    if (choice.apCost)
        state.ap = Math.max(0, state.ap - choice.apCost);
    for (const eff of choice.effects) {
        if (eff.kind === 'roll') {
            const res = rollD100(rng.next.bind(rng), eff.difficulty ?? 50);
            if (res.success) {
                next = eff.onSuccess ?? next;
                if (eff.successEffects) {
                    for (const se of eff.successEffects) {
                        if (se.kind === 'combat') {
                            const msg = startCombatFromEffect(state, se, rng);
                            if (msg)
                                systemMessages.push(msg);
                        }
                        else {
                            systemMessages.push(...applyEffect(state, se));
                        }
                    }
                }
            }
            else {
                next = eff.onFail ?? next;
                if (eff.lethal && res.tier === 'crit_fail')
                    state.resources.health.current = 0;
                if (eff.failEffects) {
                    for (const fe of eff.failEffects) {
                        systemMessages.push(...applyEffect(state, fe));
                    }
                }
            }
        }
        else if (eff.kind === 'jump') {
            next = eff.target ?? next;
        }
        else if (eff.kind === 'combat') {
            const msg = startCombatFromEffect(state, eff, rng);
            if (msg)
                systemMessages.push(msg);
        }
        else {
            systemMessages.push(...applyEffect(state, eff));
        }
    }
    let outcome;
    if (next && findEnding(content, next)) {
        const ed = findEnding(content, next);
        outcome = { type: 'ending', id: ed.id, title: ed.title, desc: ed.desc };
        state.outcome = outcome;
        state.meta.unlockedEndings = Array.from(new Set([...state.meta.unlockedEndings, ed.id]));
    }
    else if (next === '__return__' && state.eventStack.length) {
        state.currentScene = state.eventStack.pop();
    }
    else if (next && next !== '__return__') {
        state.currentScene = next;
        if (!state.visitedScenes.includes(next))
            state.visitedScenes.push(next);
    }
    return { state, resultText, outcome, next, systemMessages };
}
/** 应用事件选项：处理完后从 pendingEvents 弹出并记入 triggeredEvents。 */
export function applyEventChoice(content, state, choice, rng) {
    const sceneBefore = state.currentScene;
    const stackBefore = state.eventStack.slice();
    const r = applyChoice(content, state, choice, rng);
    // 事件的 __return__ 只表示事件结束，不应把进行中的支线场景从栈里弹掉
    if (choice.next === '__return__' && !r.outcome) {
        state.currentScene = sceneBefore;
        state.eventStack = stackBefore;
    }
    const evId = state.pendingEvents.shift();
    if (evId)
        state.triggeredEvents.push(evId);
    return r;
}
/** 每日抽取一个随机事件（按 weight 加权；受 minDay / maxTriggers 约束；weight<=0 不抽）。 */
export function drawDailyEvent(content, state, rng) {
    const pool = content.randomEvents.filter((e) => {
        if (e.weight <= 0)
            return false;
        if (state.day < e.minDay)
            return false;
        if (e.maxTriggers < 0)
            return true;
        const triggered = state.triggeredEvents.filter((id) => id === e.id).length;
        return triggered < e.maxTriggers;
    });
    if (!pool.length)
        return null;
    return rng.weighted(pool, (e) => e.weight);
}
/**
 * 触发式支线调度：当前不在任何线/事件内时，按声明顺序找到首个满足 trigger 且未完成的支线，
 * 将其入口压栈切为当前场景（一次性，靠 line_done_<id> 标记防重复触发）。
 */
export function scheduleLine(content, state) {
    if (state.eventStack.length)
        return;
    for (const line of content.lines ?? []) {
        if (state.flags[`line_done_${line.id}`])
            continue;
        const t = line.trigger;
        if (t.dayMin && state.day < t.dayMin)
            continue;
        if (t.flags && !t.flags.every((f) => state.flags[f]))
            continue;
        if (t.notFlags && t.notFlags.some((f) => state.flags[f]))
            continue;
        state.eventStack.push(state.currentScene);
        state.currentScene = line.initialScene;
        state.flags[`line_done_${line.id}`] = true;
        break;
    }
}
/**
 * 推进一天 v2.0：集成基地生产、技能成长、推进机制
 */
// ============================================================
// v0.5.0 每日系统、大事件检验、因果追踪
// ============================================================
/** 刷新每日面板（天气、迷雾浓度、危险等级、隐藏提示） */
export function refreshDailyPanel(state, rng) {
    const messages = [];
    const day = state.day;
    // 计算天气
    const weather = calculateDailyWeather(day, () => rng.next());
    const mistDensity = calculateMistDensity(day, weather);
    const dangerLevel = calculateDangerLevel(day, mistDensity, weather);
    // 计算当前阶段的第几天
    const phase = getPhaseByDay(day);
    const dayOfPhase = day - phase.dayRange[0] + 1;
    // 生成隐藏提示（金手指，有概率触发）
    let specialHint = null;
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
    const weatherNames = {
        clear: '晴朗', foggy: '浓雾', rainy: '阴雨', stormy: '暴风',
        bloody_moon: '血月', mist_tide: '迷雾潮汐',
    };
    const densityNames = {
        thin: '稀薄', normal: '正常', thick: '浓厚', impenetrable: '伸手不见五指',
    };
    const dangerNames = {
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
export function checkAndTriggerMajorEvent(state) {
    const messages = [];
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
        resources: state.resources,
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
        const factorText = assessment.assessedFactors.map(f => `${f.factor}:${f.value}${f.pass ? '✓' : '✗'}`).join(', ');
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
export function updateUnlockedZones(state) {
    const unlocked = getUnlockedZones(state.day);
    const newZones = unlocked.filter(z => !state.unlockedZones.includes(z.id));
    for (const zone of newZones) {
        state.unlockedZones.push(zone.id);
    }
    return newZones.map(z => z.name);
}
/** 处理待生效的因果效果 */
export function processPendingCausalEffects(state) {
    const messages = [];
    const toTrigger = state.causalTracker.pendingEffects.filter(e => e.triggerDay <= state.day);
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
    state.causalTracker.pendingEffects = state.causalTracker.pendingEffects.filter(e => e.triggerDay > state.day);
    return messages;
}
/** 记录因果关系 */
export function recordCausalRelation(state, causeId, effectDescription, delayDays = 0, probability = 1) {
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
export function runDaily(content, state, rng) {
    const messages = [];
    // v0.5.0: 每日面板刷新（天气、迷雾浓度、危险等级）
    messages.push(...refreshDailyPanel(state, rng));
    // v0.5.0: 处理待生效的因果效果
    messages.push(...processPendingCausalEffects(state));
    // v0.5.0: 更新已解锁区域
    const newZones = updateUnlockedZones(state);
    if (newZones.length > 0) {
        messages.push(`【新区域解锁】${newZones.join('、')}`);
    }
    // 0. 每日签到（连签递进奖励）
    messages.push(processSignin(state));
    // 1. 基地每日生产
    const production = processDailyProduction(state);
    messages.push(...production.messages.map(m => `[生产] ${m}`));
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
        if (state.resources.water.current <= 0)
            cause = 'thirst';
        else if (state.resources.food.current <= 0)
            cause = 'hunger';
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
        if (state.resources.sanity.current <= 0)
            cause = 'sanity';
        else if (state.resources.food.current <= 0)
            cause = 'hunger';
        else if (state.resources.water.current <= 0)
            cause = 'thirst';
        finalizeDeath(state, content, cause);
        return { dead: true, messages, event: null };
    }
    // 4. 天数递增 + 晨间刷新行动点
    state.day += 1;
    state.ap = 3;
    state.runStats.survivalDays = state.day;
    // 5. 获得经验值（每天+1，用于技能点）
    gainSkillPoints(state, 1);
    // 6. 调度触发式支线
    scheduleLine(content, state);
    // 7. 野兽遭遇战检定（战斗为覆盖层：剧情进行中同样可能遇袭）
    if (!state.combat) {
        const encounter = maybeStartEncounter(state, rng);
        if (encounter)
            messages.push(encounter);
    }
    // 8. 抽取随机事件
    let event = null;
    if (!state.eventStack.length) {
        event = drawDailyEvent(content, state, rng);
        if (event) {
            state.pendingEvents.push(event.id);
            state.runStats.eventsTriggered += 1;
        }
    }
    // 8. 检查推进机制（世界等级、天灾预警、剧情触发）
    //    checkProgression 内部已生成 messages，此处不再重复推送
    const progressionCheck = checkProgression(state, content);
    messages.push(...progressionCheck.messages);
    // 9b. 天灾结算：核对准备情况，发放奖励或施加惩罚
    if (progressionCheck.catastropheTrigger) {
        const event = progressionCheck.catastropheTrigger;
        const verdict = evaluateCatastrophe(state, event);
        const settled = resolveCatastrophe(state, event, verdict.success);
        messages.push(...verdict.messages, ...settled.messages);
    }
    // 10. 幸存者排行榜播报（每 3 天）
    const rank = rankMessage(state);
    if (rank)
        messages.push(rank);
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
    updateMarketPrices(state, state.day);
    // 13. 好结局/隐藏结局触发检查
    const goodEnding = checkGoodEndings(state, content);
    if (goodEnding) {
        messages.push(`【结局达成】${goodEnding.title}`);
        return { dead: true, messages, event: null };
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
export function gainExp(state, amount) {
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
export function allocateAttribute(state, attr) {
    if (state.attributePoints <= 0)
        return false;
    state.attributes[attr] += 1;
    state.attributePoints -= 1;
    return true;
}
/** 获得迷雾积分 */
export function gainMistPoints(state, amount) {
    state.mistPoints += amount;
}
/** 检查并解锁称号 */
export function checkTitles(state) {
    const newlyUnlocked = [];
    for (const title of TITLES) {
        if (state.titles.includes(title.id))
            continue;
        let unlocked = false;
        switch (title.unlockCondition.type) {
            case 'day':
                unlocked = state.day >= title.unlockCondition.value;
                break;
            case 'combat':
                unlocked = state.combatKills >= title.unlockCondition.value;
                break;
            case 'explore':
                unlocked = state.visitedScenes.length >= title.unlockCondition.value;
                break;
            case 'special':
                unlocked = !!state.flags[title.unlockCondition.value];
                break;
        }
        if (unlocked) {
            state.titles.push(title.id);
            newlyUnlocked.push(title.name);
            // 自动装备第一个解锁的称号
            if (!state.activeTitle)
                state.activeTitle = title.id;
        }
    }
    return newlyUnlocked;
}
/** 获取当前称号的属性加成 */
export function getActiveTitleBonuses(state) {
    if (!state.activeTitle)
        return {};
    const title = TITLES.find(t => t.id === state.activeTitle);
    if (!title)
        return {};
    return title.bonuses;
}
/** 更新当前游戏阶段 */
export function updateCurrentPhase(state) {
    const phase = getPhaseByDay(state.day);
    if (phase.id !== state.currentPhase) {
        state.currentPhase = phase.id;
    }
}
/** 生命归零时结算死亡结局（根据死因选择对应结局）。 */
function finalizeDeath(state, content, cause) {
    const deathEndings = Object.values(content.storyline.endings).filter((e) => e.category === 'death');
    // 默认死亡结局：E10 病榻（生命归零的通用结局）
    let death = deathEndings.find(e => e.id === 'E10') ?? deathEndings[0] ??
        { id: 'death', title: '死亡', desc: '你在迷雾中倒下。', category: 'death' };
    // 根据死因选择对应结局
    if (cause === 'sanity') {
        death = deathEndings.find(e => e.id === 'E07') ?? death; // 走进雾里
    }
    else if (cause === 'thirst') {
        death = deathEndings.find(e => e.id === 'E08') ?? death; // 干渴
    }
    else if (cause === 'hunger') {
        death = deathEndings.find(e => e.id === 'E09') ?? death; // 饥饿
    }
    else if (cause === 'combat') {
        death = deathEndings.find(e => e.id === 'E11') ?? death; // 夜访者
    }
    else if (cause === 'beast_wave') {
        death = deathEndings.find(e => e.id === 'E12') ?? death; // 兽潮之夜
    }
    const outcome = { type: 'death', id: death.id, title: death.title, desc: death.desc };
    state.outcome = outcome;
    state.meta.bestDays = Math.max(state.meta.bestDays, state.day);
}
/**
 * 检查好结局/隐藏结局触发条件。
 * 在每日结算后调用，满足条件则触发对应结局。
 */
function checkGoodEndings(state, content) {
    const day = state.day;
    const flags = state.flags;
    const inv = state.inventory;
    // 好结局均在第30天以后触发（保证游戏有足够长度）
    if (day < 30)
        return null;
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
    // E04 平凡的等待：无特殊条件（最基础的好结局）
    return triggerEnding(content, state, 'E04');
}
/** 触发指定结局并写入状态。 */
function triggerEnding(content, state, endingId) {
    const ed = findEnding(content, endingId);
    if (!ed)
        return null;
    const outcome = { type: 'ending', id: ed.id, title: ed.title, desc: ed.desc };
    state.outcome = outcome;
    state.meta.unlockedEndings = Array.from(new Set([...state.meta.unlockedEndings, ed.id]));
    state.meta.bestDays = Math.max(state.meta.bestDays, state.day);
    return outcome;
}
//# sourceMappingURL=engine.js.map