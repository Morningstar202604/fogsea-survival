/**
 * v2.1 开局天赋系统 + 深精机制
 *
 * 品类标配（全民求生流小说通用开局）：新局随机三选一天赋，按 S/A/B 分级。
 * 天赋在 createInitialState 落地：一次性加成直接写入状态，持续型被动以
 * talent_* flag 形式存在，由引擎各挂点（每日消耗/物品升级等）读取生效。
 *
 * 深精系统：允许玩家在同一天赋上投入更多点数来增强效果
 */
import type { GameState } from './types.js';
export interface TalentDef {
    id: string;
    name: string;
    tier: 'S' | 'A' | 'B';
    description: string;
    /** 创建新局时落地天赋（直接改状态，返回系统播报文案）*/
    apply: (state: GameState) => string[];
    /** 深精效果（可选，每级效果） */
    deepEffects?: {
        description: string;
        apply: (state: GameState) => string[];
    }[];
    /** 深精最大等级 */
    maxDeepLevel?: number;
}
/** 天赋深精状态 */
export interface TalentDeepState {
    /** 天赋ID */
    talentId: string;
    /** 深精等级 */
    deepLevel: number;
    /** 已投入的深精点数 */
    pointsInvested: number;
    /** 深精通效果是否激活 */
    isActive: boolean;
}
export declare const TALENTS: TalentDef[];
export type TalentRng = {
    next(): number;
};
/** 按稀有度加权随机抽取 3 个不重复天赋（S 权重1 / A 权重2 / B 权重3）。 */
export declare function drawTalentChoices(rng: TalentRng): TalentDef[];
/** 将选中的天赋写入状态（幂等：重复调用只生效一次）。 */
export declare function applyTalent(state: GameState, talentId: string): string[];
/** 初始化天赋深精状态 */
export declare function initTalentDeepState(): Record<string, TalentDeepState>;
/** 获取天赋深精等级 */
export declare function getTalentDeepLevel(state: GameState, talentId: string): number;
/** 检查天赋是否可以深精 */
export declare function canDeepTalent(state: GameState, talentId: string): boolean;
/** 计算深精成本（指数级增加） */
export declare function calculateDeepCost(talentId: string, currentLevel: number): number;
/** 执行天赋深精 */
export declare function deepTalent(state: GameState, talentId: string): string[];
/** 重置天赋深精（返回一半的深精点数） */
export declare function resetTalentDeep(state: GameState, talentId: string): string[];
//# sourceMappingURL=talents.d.ts.map