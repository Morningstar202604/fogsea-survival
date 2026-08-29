import { createResources, applyIncome, applyStarvation, deltaResource } from './resources.js';
import { rollD100 } from './dice.js';
/** 创建新一局状态：从 ContentPack 的初始资源与入口场景起步。 */
export function createInitialState(content, meta) {
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
    };
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
    return true;
}
/** 过滤出当前可显示的选项（requires 满足）。 */
export function availableChoices(choices, state) {
    return choices.filter((c) => conditionMet(c.requires, state));
}
/** 应用单个非跳转类效果到状态。 */
function applyEffect(state, eff) {
    switch (eff.kind) {
        case 'resource':
            if (eff.resource)
                deltaResource(state.resources[eff.resource], eff.delta ?? 0);
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
    for (const eff of choice.effects) {
        if (eff.kind === 'roll') {
            const res = rollD100(rng.next.bind(rng), eff.difficulty ?? 50);
            if (res.success) {
                next = eff.onSuccess ?? next;
                if (eff.successEffects)
                    for (const se of eff.successEffects)
                        applyEffect(state, se);
            }
            else {
                next = eff.onFail ?? next;
                if (eff.lethal && res.tier === 'crit_fail')
                    state.resources.health.current = 0;
            }
        }
        else if (eff.kind === 'jump') {
            next = eff.target ?? next;
        }
        else {
            applyEffect(state, eff);
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
    return { state, resultText, outcome, next };
}
/** 应用事件选项：处理完后从 pendingEvents 弹出并记入 triggeredEvents。 */
export function applyEventChoice(content, state, choice, rng) {
    const r = applyChoice(content, state, choice, rng);
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
 * 推进一天：应用每日结算（income + 饥饿惩罚）→ 若死亡则结算死亡结局；
 * 否则 day+1，调度触发式支线；若未进入支线则抽取当日随机事件放入 pendingEvents。
 */
export function runDaily(content, state, rng) {
    const messages = [];
    const inc = applyIncome(state, content.income);
    messages.push(...inc.messages);
    if (inc.dead) {
        finalizeDeath(state, content);
        return { dead: true, messages, event: null };
    }
    const starv = applyStarvation(state);
    messages.push(...starv);
    if (state.resources.health.current <= 0) {
        finalizeDeath(state, content);
        return { dead: true, messages, event: null };
    }
    state.day += 1;
    state.runStats.survivalDays = state.day;
    scheduleLine(content, state);
    let event = null;
    if (!state.eventStack.length) {
        event = drawDailyEvent(content, state, rng);
        if (event) {
            state.pendingEvents.push(event.id);
            state.runStats.eventsTriggered += 1;
        }
    }
    return { dead: false, messages, event };
}
/** 生命归零时结算死亡结局（优先取 category=death 的结局定义）。 */
function finalizeDeath(state, content) {
    const death = Object.values(content.storyline.endings).find((e) => e.category === 'death') ??
        { id: 'death', title: '死亡', desc: '你在迷雾中倒下。', category: 'death' };
    const outcome = { type: 'death', id: death.id, title: death.title, desc: death.desc };
    state.outcome = outcome;
    state.meta.bestDays = Math.max(state.meta.bestDays, state.day);
}
//# sourceMappingURL=engine.js.map