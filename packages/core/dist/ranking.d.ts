/**
 * v2.1 幸存者排行榜
 *
 * 品类标配压力装置（全民求生流的"全网排名/直播围观"）：
 * 162 名幸存者的排位随天数自然下滑（他人在成长），基地等级、世界等级、
 * 幸运与物资积累会拉高排名。每 3 天播报一次，制造"不进则退"的竞争焦虑。
 * 设计为确定性函数（不依赖 Rng），便于测试与复现。
 */
import type { GameState } from './types.js';
export declare const RANK_TOTAL = 162;
/** 当前排名：1 最好。开局约 #81，竞争者每日追赶，玩家的成长对冲下滑。 */
export declare function computeRank(state: GameState): number;
/** 每 3 天的排行榜播报；无播报日返回 null。 */
export declare function rankMessage(state: GameState): string | null;
/** 排位等级 */
export declare enum RankingTier {
    S = "S",// 榜一
    A = "A",// 榜一榜单前三
    B = "B",// 榜单第4-10名
    C = "C",// 榜单第11-20名
    D = "D"
}
/** 排位积分系统 */
export interface RankingPointSystem {
    decayRate: number;
    minimumProtectionDays: number;
    scoringComponents: {
        survivalDays: (days: number) => number;
        baseLevel: (level: number) => number;
        resources: (total: number) => number;
        companions: (companionCount: number) => number;
        achievements: (achievementCount: number) => number;
    };
}
/** 默认排名积分系统 */
export declare const defaultRankingSystem: RankingPointSystem;
/** 排位数据 */
export interface RankingEntry {
    playerId: string;
    playerName: string;
    survivalDays: number;
    baseLevel: number;
    totalResources: number;
    companionCount: number;
    achievementCount: number;
    totalScore: number;
    tier: RankingTier;
    lastLogin: number;
    daysSinceLastLogin: number;
}
/** 排行榜状态 */
export interface RankingState {
    entries: RankingEntry[];
    totalPlayers: number;
    lastUpdated: number;
    protectionPeriodActive: boolean;
}
/** 计算总分 */
export declare function calculateTotalScore(entry: RankingEntry, system: RankingPointSystem): number;
/** 确定排位 tier */
export declare function determineTier(totalScore: number): RankingTier;
/** 应用不进则退机制 */
export declare function applyDecay(entry: RankingEntry, system: RankingPointSystem, _currentDay: number): RankingEntry;
/** 更新排行榜 */
export declare function updateRanking(newEntry: RankingEntry, currentState: RankingState, system: RankingPointSystem): RankingState;
/** 结算奖励发放 */
export interface SettlementAward {
    tier: RankingTier;
    survivalDays: number;
    baseLevel: number;
    resources: number;
    companions: number;
    achievements: number;
    tierBonus: string[];
    mainReward: string;
}
export declare function distributeSettlementAward(tier: RankingTier, state: GameState): SettlementAward;
//# sourceMappingURL=ranking.d.ts.map