// mulberry32 可种子化随机器：小、快、可复现
export class RNG {
    private s: number;

    constructor(seed: number) {
        this.s = seed >>> 0;
    }

    next(): number {
        this.s = (this.s + 0x6d2b79f5) >>> 0;
        let t = this.s;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }

    int(min: number, max: number): number {
        if (max < min) [min, max] = [max, min];
        return min + Math.floor(this.next() * (max - min + 1));
    }

    chance(pct: number): boolean {
        return this.next() * 100 < pct;
    }

    pick<T>(arr: T[]): T {
        return arr[this.int(0, arr.length - 1)];
    }

    shuffle<T>(arr: T[]): T[] {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = this.int(0, i);
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    /** 加权随机抽取；权重和无需归一化 */
    static weightedPick<T extends { weight: number }>(arr: T[]): T {
        let total = 0;
        for (const it of arr) total += Math.max(0, it.weight);
        if (total <= 0) throw new Error('weightedPick: 总权重必须 > 0');
        let roll = Math.random() * total;   // 注意：分布验证用；复现场景请用实例方法
        for (const it of arr) {
            roll -= Math.max(0, it.weight);
            if (roll < 0) return it;
        }
        return arr[arr.length - 1];
    }
}

/** 可注入 RNG 的加权抽取（供模拟器/单测使用同一序列） */
export function weightedPickWith<T extends { weight: number }>(rng: RNG, arr: T[]): T {
    let total = 0;
    for (const it of arr) total += Math.max(0, it.weight);
    if (total <= 0) throw new Error('weightedPick: 总权重必须 > 0');
    let roll = rng.next() * total;
    for (const it of arr) {
        roll -= Math.max(0, it.weight);
        if (roll < 0) return it;
    }
    return arr[arr.length - 1];
}

export function clamp(v: number, min: number, max: number): number {
    return v < min ? min : v > max ? max : v;
}
