import type { GameState, IncomeRule, Resource, ResourceKey, Resources } from './types.js';
/** 资源键全集（游戏内实际结算的 5 类资源，warmth 由基地/装备系统处理） */
export declare const RESOURCE_KEYS: ResourceKey[];
/** 各资源上限默认值 */
export declare const RESOURCE_DEFAULTS: Record<Exclude<ResourceKey, 'warmth'>, number>;
/** 资源中文名 */
export declare const RESOURCE_LABELS: Record<ResourceKey, string>;
/** 创建默认资源表 */
export declare function createResources(starting?: Partial<Record<ResourceKey, {
    current: number;
    max: number;
}>>): Resources;
export declare function clamp(v: number, min: number, max: number): number;
/** 修改资源：可正可负，负时扣除；返回实际扣减到 0 时是否触发“资源告急” */
export declare function deltaResource(res: Resource, delta: number): void;
/**
 * 每日结算：应用收入规则。
 * 规则中 delta 为负表示消耗；健康/理智的每日调整在收入规则中定义。
 * 返回结算后是否因生命归零而死亡。
 */
export interface IncomeResult {
    dead: boolean;
    messages: string[];
}
export declare function applyIncome(state: GameState, income: IncomeRule[]): IncomeResult;
/** 食物/水不足时对生命的惩罚（可在每日结算前调用） */
export declare function applyStarvation(state: GameState): string[];
/** 状态快照校验：全部资源应在 [0,max] */
export declare function assertResourcesValid(state: GameState): boolean;
/** 每日自动消耗的资源键（health 不在此扣除，由 applyStarvation 处理） */
type DailyConsumptionKey = 'food' | 'water' | 'sanity' | 'energy';
/** 每日自动消耗速率基准（单位/天，第一世界Tier）
 * 根据《全民公路求生》等硬核生存作品的经验，数值需兼顾游戏节奏与生存压力 */
export declare const DAILY_CONSUMPTION_BASE: Record<DailyConsumptionKey, number>;
/** 根据世界等级修正的每日消耗速率 */
export declare function getDailyConsumptionRate(tier: number): Record<DailyConsumptionKey, number>;
/** 校验 daily consumption 是否在合理范围 */
export declare function isValidDailyConsumption(rate: Record<DailyConsumptionKey, number>): boolean;
/** 每日结算：按世界等级压力自动消耗食物/水/理智/体力（天赋被动在此生效） */
export declare function applyDailyConsumption(state: GameState): string[];
export {};
//# sourceMappingURL=resources.d.ts.map