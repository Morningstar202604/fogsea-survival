export function rollD100(rng, difficulty, bonus = 0) {
    const raw = Math.floor(rng() * 100) + 1; // 1..100
    const roll = Math.max(1, Math.min(100, raw + bonus));
    const threshold = 100 - difficulty; // difficulty=30 → 70 及以上成功
    const success = roll >= threshold;
    let tier;
    if (success) {
        tier = roll >= 95 ? 'crit_success' : 'success';
    }
    else {
        tier = roll <= 10 ? 'crit_fail' : 'fail';
    }
    return { roll, tier, success };
}
/** 命中判定用于生成检定结果文本 */
export function tierLabel(tier) {
    switch (tier) {
        case 'crit_success':
            return '大成功';
        case 'success':
            return '成功';
        case 'fail':
            return '失败';
        case 'crit_fail':
            return '大失败';
    }
}
//# sourceMappingURL=dice.js.map