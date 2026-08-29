/**
 * 随机数工具：支持注入种子，保证测试可复现。
 */
export class Rng {
    state;
    constructor(seed) {
        // mulberry32 伪随机（可注入种子复现）
        this.state = seed ?? ((Math.random() * 2 ** 32) >>> 0);
    }
    /** 返回 [0,1) 均匀随机数 */
    next() {
        let t = (this.state += 0x6d2b79f5);
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    /** 返回 [min,max] 闭区间整数 */
    int(min, max) {
        return Math.floor(this.next() * (max - min + 1)) + min;
    }
    /** 按权重数组返回索引 */
    weighted(items, weightOf) {
        if (items.length === 0)
            return null;
        const total = items.reduce((s, it) => s + Math.max(0, weightOf(it)), 0);
        if (total <= 0)
            return null;
        let r = this.next() * total;
        for (const it of items) {
            r -= Math.max(0, weightOf(it));
            if (r <= 0)
                return it;
        }
        return items[items.length - 1];
    }
}
//# sourceMappingURL=rng.js.map