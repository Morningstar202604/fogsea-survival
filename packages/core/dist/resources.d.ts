import type { GameState, IncomeRule, Resource, ResourceKey, Resources } from './types.js';
/** 资源键全集 */
export declare const RESOURCE_KEYS: ResourceKey[];
/** 各资源上限默认值 */
export declare const RESOURCE_DEFAULTS: Record<ResourceKey, number>;
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
//# sourceMappingURL=resources.d.ts.map