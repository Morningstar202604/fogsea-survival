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
/** 好感度等级 */
export declare enum AffectionLevel {
    LOW = "low",// 0-30：互动有限
    MEDIUM = "medium",// 31-60：定期任务
    HIGH = "high",// 61-80：专属支线开启
    VERY_HIGH = "veryHigh"
}
/** 同伴状态 */
export declare enum CompanionStatus {
    FRIEND = "friend",// 普通友谊
    ALLY = "ally",// 盟友（好感度 ≥ 50）
    LOVER = "lover",// 爱人（好感度 ≥ 80）
    BETRAYED = "betrayed",// 已背叛
    LEFT = "left"
}
/** 支线任务类型 */
export interface CompanionQuest {
    id: string;
    name: string;
    description: string;
    type: 'main' | 'special' | 'relationship';
    minAffection: number;
    completionReward: {
        affectionChange: number;
        items?: Record<string, number>;
        flags?: Record<string, boolean>;
    };
}
/** 同伴数据结构扩展 */
export interface CompanionDataExtended {
    id: string;
    name: string;
    affection: number;
    status: CompanionStatus;
    affectionLevel: AffectionLevel;
    completedQuests: string[];
    triggeredEvents: string[];
    finalCondition?: {
        met: boolean;
        requirements: string[];
    };
}
/** 同伴支线任务定义 */
export declare const COMPANION_QUESTS: Record<string, CompanionQuest[]>;
/** 初始化同伴数据 */
export declare function initCompanionData(): Record<string, CompanionDataExtended>;
/** 获取好感度等级 */
export declare function getAffectionLevel(affection: number): AffectionLevel;
/** 计算好感度变化 */
export declare function calculateAffectionChange(action: 'help' | 'gift' | 'conflict' | 'ignore' | 'rescue', companionId: string, currentAffection: number, playerChoiceQuality?: 'excellent' | 'good' | 'poor'): {
    change: number;
    newAffection: number;
    newLevel: AffectionLevel;
};
/** 触发同伴支线任务 */
export declare function triggerCompanionQuest(companionId: string, currentAffection: number, questType: 'main' | 'special' | 'relationship'): {
    success: boolean;
    questId: string;
    affectionChange: number;
    message: string;
};
/** 处理同伴背叛/离开 */
export declare function handleCompanionDeparture(companionId: string, currentAffection: number, currentStatus: CompanionStatus): {
    newStatus: CompanionStatus;
    affectionChange: number;
    message: string;
};
//# sourceMappingURL=companions.d.ts.map