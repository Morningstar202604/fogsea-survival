/**
 * 随机数工具：支持注入种子，保证测试可复现。
 */
export declare class Rng {
    private state;
    constructor(seed?: number);
    /** 返回 [0,1) 均匀随机数 */
    next(): number;
    /** 返回 [min,max] 闭区间整数 */
    int(min: number, max: number): number;
    /** 按权重数组返回索引 */
    weighted<T>(items: T[], weightOf: (item: T) => number): T | null;
}
//# sourceMappingURL=rng.d.ts.map