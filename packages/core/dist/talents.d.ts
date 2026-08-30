/**
 * v2.1 开局天赋系统
 *
 * 品类标配（全民求生流小说通用开局）：新局随机三选一天赋，按 S/A/B 分级。
 * 天赋在 createInitialState 落地：一次性加成直接写入状态，持续型被动以
 * talent_* flag 形式存在，由引擎各挂点（每日消耗/物品升级等）读取生效。
 */
import type { GameState } from './types.js';
export interface TalentDef {
    id: string;
    name: string;
    tier: 'S' | 'A' | 'B';
    description: string;
    /** 创建新局时落地天赋（直接改状态，返回系统播报文案） */
    apply: (state: GameState) => string[];
}
export declare const TALENTS: TalentDef[];
export type TalentRng = {
    next(): number;
};
/** 按稀有度加权随机抽取 3 个不重复天赋（S 权重1 / A 权重2 / B 权重3）。 */
export declare function drawTalentChoices(rng: TalentRng): TalentDef[];
/** 将选中的天赋写入状态（幂等：重复调用只生效一次）。 */
export declare function applyTalent(state: GameState, talentId: string): string[];
//# sourceMappingURL=talents.d.ts.map