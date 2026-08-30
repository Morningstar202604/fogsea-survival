/**
 * 故事推进机制系统
 *
 * 核心设计理念：通过强制事件、世界升级、资源枯竭等机制，
 * 确保游戏始终向前推进，避免玩家原地踏步。
 */
import type { GameState, ContentPack } from './types.js';
/** 世界等级配置 */
export interface WorldTier {
    /** 触发天数 */
    triggerDay: number;
    /** 等级名称 */
    name: string;
    /** 等级描述 */
    description: string;
    /** 难度倍率（影响怪物强度、资源消耗等） */
    difficultyMultiplier: number;
    /** 解锁的新内容 */
    unlocks: string[];
    /** 强制触发的全局事件ID */
    forcedEvent?: string;
}
/** 天灾事件定义 */
export interface CatastropheEvent {
    id: string;
    /** 触发天数 */
    triggerDay: number;
    /** 提前警告天数 */
    warningDays: number;
    /** 事件名称 */
    name: string;
    /** 事件描述 */
    description: string;
    /** 事件类型 */
    type: 'beast_wave' | 'extreme_weather' | 'plague' | 'earthquake' | 'fog_expansion';
    /** 持续时间（天） */
    duration: number;
    /** 难度等级（1-10） */
    severity: number;
    /** 应对要求 */
    requirements: {
        /** 最低基地等级 */
        minBaseLevel?: number;
        /** 最低防御值 */
        minDefense?: number;
        /** 必需物资 */
        requiredResources?: Record<string, number>;
    };
    /** 成功抵御的奖励 */
    successRewards: {
        xp?: number;
        items?: Record<string, number>;
        unlock?: string;
    };
    /** 失败的惩罚 */
    failurePenalties: {
        resourceLoss?: Record<string, number>;
        structureDamage?: number;
        healthDamage?: number;
    };
}
/** 剧情触发器 */
export interface StoryTrigger {
    id: string;
    /** 触发条件 */
    condition: {
        /** 最小天数 */
        minDay?: number;
        /** 最大天数 */
        maxDay?: number;
        /** 需要的标志 */
        flags?: string[];
        /** 不能有的标志 */
        notFlags?: string[];
        /** 最低基地等级 */
        minBaseLevel?: number;
        /** 最低技能等级 */
        minSkillLevel?: Record<string, number>;
        /** 已完成的前置触发器 */
        completedTriggers?: string[];
    };
    /** 触发的支线ID */
    questId: string;
    /** 是否只触发一次 */
    onceOnly: boolean;
    /** 优先级（越高越先触发） */
    priority: number;
}
/** 推进机制状态 */
export interface ProgressionState {
    /** 当前世界等级 */
    currentWorldTier: number;
    /** 已触发的世界升级 */
    triggeredTiers: number[];
    /** 即将到来的天灾 */
    upcomingCatastrophes: CatastropheEvent[];
    /** 已发生的天灾 */
    occurredCatastrophes: string[];
    /** 已触发的剧情触发器 */
    triggeredStories: string[];
    /** 资源枯竭标记（区域ID -> 是否枯竭） */
    resourceDepletion: Record<string, boolean>;
    /** 距离下次世界升级的天数 */
    daysToNextTier: number;
    /** 距离下次天灾的天数 */
    daysToNextCatastrophe: number;
}
/** 推进检查结果 */
export interface ProgressionCheck {
    /** 是否有世界升级 */
    tierUpgrade?: {
        oldTier: number;
        newTier: number;
        tierInfo: WorldTier;
    };
    /** 是否有天灾预警 */
    catastropheWarning?: CatastropheEvent;
    /** 是否有天灾触发 */
    catastropheTrigger?: CatastropheEvent;
    /** 是否有剧情触发 */
    storyTrigger?: StoryTrigger;
    /** 是否有资源枯竭 */
    resourceDepletion?: {
        areaId: string;
        message: string;
    };
    /** 系统消息列表 */
    messages: string[];
}
/** 默认世界等级配置（基于小说设定） */
export declare const DEFAULT_WORLD_TIERS: WorldTier[];
/** 天灾事件池 */
export declare const CATASTROPHE_EVENTS: CatastropheEvent[];
/** 剧情触发器池 */
export declare const STORY_TRIGGERS: StoryTrigger[];
/**
 * 创建初始推进状态
 */
export declare function createInitialProgressionState(): ProgressionState;
/**
 * 检查并应用推进机制
 * 每天调用一次，在 runDaily 之后执行
 */
export declare function checkProgression(state: GameState & {
    progression: ProgressionState;
}, content: ContentPack): ProgressionCheck;
/**
 * 处理天灾结果
 */
/** 天灾结算前置评估：核对基地等级/防御/储备物资，返回是否守住及原因播报。 */
export declare function evaluateCatastrophe(state: GameState & {
    progression: ProgressionState;
}, event: CatastropheEvent): {
    success: boolean;
    messages: string[];
};
export declare function resolveCatastrophe(state: GameState & {
    progression: ProgressionState;
}, event: CatastropheEvent, success: boolean): {
    messages: string[];
};
//# sourceMappingURL=progression.d.ts.map