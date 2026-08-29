/** 资源键全集 */
export const RESOURCE_KEYS = ['food', 'water', 'health', 'sanity', 'energy'];
/** 各资源上限默认值 */
export const RESOURCE_DEFAULTS = {
    food: 100,
    water: 100,
    health: 100,
    sanity: 100,
    energy: 100,
};
/** 资源中文名 */
export const RESOURCE_LABELS = {
    food: '食物',
    water: '水',
    health: '生命',
    sanity: '理智',
    energy: '体力',
};
/** 创建默认资源表 */
export function createResources(starting) {
    const res = {};
    for (const key of RESOURCE_KEYS) {
        const s = starting?.[key];
        const max = s?.max ?? RESOURCE_DEFAULTS[key];
        res[key] = {
            current: clamp(s?.current ?? max, 0, max),
            accumulated: 0,
            max,
        };
    }
    return res;
}
export function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
}
/** 修改资源：可正可负，负时扣除；返回实际扣减到 0 时是否触发“资源告急” */
export function deltaResource(res, delta) {
    if (delta > 0) {
        res.current = clamp(res.current + delta, 0, res.max);
        res.accumulated += delta;
    }
    else {
        res.current = clamp(res.current + delta, 0, res.max);
    }
}
export function applyIncome(state, income) {
    const messages = [];
    let dead = false;
    for (const rule of income) {
        const res = state.resources[rule.resource];
        deltaResource(res, rule.delta);
        if (res.current <= 0) {
            if (rule.resource === 'health') {
                dead = true;
                messages.push('生命耗尽，你倒在了迷雾之中。');
            }
            else {
                messages.push(`${RESOURCE_LABELS[rule.resource]}耗尽了。`);
            }
        }
    }
    return { dead, messages };
}
/** 食物/水不足时对生命的惩罚（可在每日结算前调用） */
export function applyStarvation(state) {
    const messages = [];
    const food = state.resources.food;
    const water = state.resources.water;
    if (food.current <= 0) {
        deltaResource(state.resources.health, -5);
        messages.push('没有食物，饥饿侵蚀着你的身体（生命-5）。');
    }
    if (water.current <= 0) {
        deltaResource(state.resources.health, -8);
        messages.push('没有水，干渴让你痛苦不堪（生命-8）。');
    }
    return messages;
}
/** 状态快照校验：全部资源应在 [0,max] */
export function assertResourcesValid(state) {
    for (const key of RESOURCE_KEYS) {
        const r = state.resources[key];
        if (r.current < 0 || r.current > r.max || r.accumulated < 0)
            return false;
    }
    return true;
}
//# sourceMappingURL=resources.js.map