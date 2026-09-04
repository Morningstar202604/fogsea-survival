/**
 * AI驱动的随机事件生成器 v1.0
 *
 * 核心特性：
 * 1. 逻辑性 - 所有事件都基于玩家状态和游戏世界逻辑
 * 2. 多样性 - 事件类型丰富，不会重复
 * 3. 因果性 - 事件之间有关联，选择会影响后续事件
 * 4. 动态性 - 根据玩家行为调整事件生成
 * 5. 叙事性 - 每个事件都有完整的故事背景
 */
import type { GameState, ResourceKey } from './types.js';
/** 事件类别 */
export declare enum EventCategory {
    SURVIVAL = "survival",
    SOCIAL = "social",
    EXPLORATION = "exploration",
    COMBAT = "combat",
    ECONOMIC = "economic",
    ENVIRONMENTAL = "environmental",
    MYSTERIOUS = "mysterious",
    DISASTER = "disaster",
    OPPORTUNITY = "opportunity",
    NARRATIVE = "narrative"
}
/** 事件触发条件 */
export interface EventTrigger {
    type: 'time' | 'resource' | 'flag' | 'attribute' | 'level' | 'random' | 'chain';
    day?: number;
    timeOfDay?: string;
    resource?: ResourceKey;
    minAmount?: number;
    maxAmount?: number;
    flag?: string;
    flagValue?: boolean;
    attribute?: string;
    minValue?: number;
    minLevel?: number;
    probability?: number;
    chainEventId?: string;
    cooldownDays?: number;
}
/** 事件影响 */
export interface EventImpact {
    type: 'resource' | 'item' | 'flag' | 'status' | 'reputation' | 'relationship' | 'narrative' | 'chain';
    resource?: ResourceKey;
    amount?: number;
    itemId?: string;
    itemCount?: number;
    flag?: string;
    flagValue?: boolean;
    status?: string;
    statusDuration?: number;
    npcId?: string;
    relationshipChange?: number;
    reputationChange?: number;
    narrativeText?: string;
    chainEventId?: string;
}
/** 事件选项 */
export interface EventOption {
    id: string;
    text: string;
    description: string;
    successChance: number;
    successImpacts: EventImpact[];
    failureImpacts: EventImpact[];
    costs: EventCost[];
    requirements?: EventRequirement[];
    skillBonuses?: Record<string, number>;
    attributeBonuses?: Record<string, number>;
    emotionalImpact?: {
        fear?: number;
        anger?: number;
        hope?: number;
        despair?: number;
    };
    followUpEvents?: string[];
}
/** 事件消耗 */
export interface EventCost {
    type: 'resource' | 'item' | 'ap' | 'health' | 'sanity' | 'energy';
    resource?: ResourceKey;
    itemId?: string;
    amount: number;
}
/** 事件需求 */
export interface EventRequirement {
    type: 'resource' | 'item' | 'flag' | 'attribute' | 'level' | 'title' | 'reputation';
    resource?: ResourceKey;
    itemId?: string;
    flag?: string;
    attribute?: string;
    level?: number;
    title?: string;
    reputation?: number;
    minAmount?: number;
}
/** 完整事件定义 */
export interface GameEvent {
    id: string;
    category: EventCategory;
    title: string;
    description: string;
    triggers: EventTrigger[];
    options: EventOption[];
    background?: string;
    consequenceDescription?: string;
    repeatable?: boolean;
    cooldownDays?: number;
    priority: number;
    weight: number;
    minDay: number;
    maxDay: number;
    maxTriggers: number;
}
export declare class AIEventGenerator {
    private rng;
    private eventHistory;
    private lastEventDay;
    private worldState;
    private eventTemplates;
    constructor(seed: number);
    /**
     * 生成随机事件
     */
    generateEvent(state: GameState, day: number): GameEvent | null;
    /**
     * 获取可用事件
     */
    private getAvailableEvents;
    /**
     * 检查事件是否可用
     */
    private isEventAvailable;
    /**
     * 检查触发条件是否满足
     */
    private isTriggerMet;
    /**
     * 选择事件
     */
    private selectEvent;
    /**
     * 根据玩家状态调整权重
     */
    private adjustWeightByState;
    /**
     * 根据历史调整权重（避免重复）
     */
    private adjustWeightByHistory;
    /**
     * 生成动态事件
     */
    private generateDynamicEvent;
    /**
     * 选择动态事件类型
     */
    private selectDynamicEventType;
    /**
     * 创建动态事件
     */
    private createDynamicEvent;
    private createSurvivalEvent;
    private createSocialEvent;
    private createExplorationEvent;
    private createCombatEvent;
    private createEconomicEvent;
    private createEnvironmentalEvent;
    private createMysteriousEvent;
    private createDisasterEvent;
    private createOpportunityEvent;
    private createNarrativeEvent;
    private initializeWorldState;
    private updateWorldState;
    private recordEventTrigger;
    private initializeEventTemplates;
}
//# sourceMappingURL=aiEvents.d.ts.map