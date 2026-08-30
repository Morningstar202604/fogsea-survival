/**
 * v1.1 队友招募与联盟协防（GDD v3.5 前置落地）
 *
 * 羁绊达到"信赖"(30)即可招募为同伴；同伴提供：
 * - 每日被动（作用见 daily）
 * - 兽潮协防力（计入天灾判定的防御值）
 * - 排行榜声望加成（队伍即势力）
 * - 鼠王额外谈判力（出售价 +10%）
 */
import type { GameState } from './types.js';
export interface CompanionDef {
    id: string;
    name: string;
    /** 招募所需好感 */
    recruitFavor: number;
    /** 兽潮协防力 */
    defense: number;
    /** 排行榜声望加成 */
    rankBonus: number;
    /** 招募播报 */
    joinText: string;
    /** 每日被动（返回播报） */
    daily?: (state: GameState) => string | undefined;
}
export declare const COMPANION_DEFS: CompanionDef[];
export declare function isRecruited(state: GameState, companionId: string): boolean;
/** 当前同伴的防御协防总值（计入天灾判定） */
export declare function getCompanionDefense(state: GameState): number;
/** 当前同伴的排行榜声望加成 */
export declare function getCompanionRankBonus(state: GameState): number;
/** 招募同伴：好感达标后写入 companion_* 标记，返回招募播报。 */
export declare function recruitCompanion(state: GameState, companionId: string, currentFavor: number): string | null;
/** 每日同伴被动（runDaily 调用） */
export declare function applyCompanionDaily(state: GameState): string[];
//# sourceMappingURL=companions.d.ts.map