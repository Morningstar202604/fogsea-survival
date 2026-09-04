/**
 * 叙事引擎系统 v1.0
 *
 * 核心设计原则：
 * 1. 沉浸式体验 - 模拟小说般的情景
 * 2. 策略驱动 - 玩家选择决定生死存亡
 * 3. 多样化玩法 - 支持任何流派
 * 4. 因果逻辑 - 所有选择都有后果
 * 5. 动态叙事 - 根据玩家状态生成内容
 */
import type { GameState, ResourceKey } from './types.js';
/** 叙事场景类型 */
export declare enum NarrativeSceneType {
    DIALOGUE = "dialogue",
    EXPLORATION = "exploration",
    COMBAT = "combat",
    NEGOTIATION = "negotiation",
    DILEMMA = "dilemma",
    DISCOVERY = "discovery",
    DISASTER = "disaster",
    TRADE = "trade",
    TRAINING = "training",
    STORY = "story"
}
/** 叙事选择类型 */
export declare enum NarrativeChoiceType {
    ACTION = "action",
    DIALOGUE = "dialogue",
    COMBAT = "combat",
    NEGOTIATION = "negotiation",
    ITEM_USE = "item_use",
    SKILL_USE = "skill_use",
    FLEE = "flee",
    OBSERVE = "observe",
    WAIT = "wait",
    GIVE_UP = "give_up"
}
/** 叙事结果类型 */
export declare enum NarrativeOutcomeType {
    SUCCESS = "success",
    FAILURE = "failure",
    PARTIAL_SUCCESS = "partial_success",
    CATASTROPHIC_FAILURE = "catastrophic_failure",
    UNEXPECTED_GAIN = "unexpected_gain",
    NEUTRAL = "neutral"
}
/** 叙事选择定义 */
export interface NarrativeChoice {
    id: string;
    text: string;
    description: string;
    type: NarrativeChoiceType;
    successChance: number;
    failureConsequences: NarrativeConsequence[];
    successRewards: NarrativeConsequence[];
    costs: NarrativeCost[];
    requirements?: NarrativeRequirement[];
    skillBonuses?: Record<string, number>;
    attributeBonuses?: Record<string, number>;
    emotionalImpact?: {
        fear?: number;
        anger?: number;
        hope?: number;
        despair?: number;
    };
}
/** 叙事后果定义 */
export interface NarrativeConsequence {
    type: 'resource' | 'item' | 'flag' | 'status' | 'reputation' | 'relationship' | 'death' | 'narrative' | 'attribute';
    resource?: ResourceKey;
    amount?: number;
    itemId?: string;
    flag?: string;
    flagValue?: boolean;
    status?: string;
    reputationChange?: number;
    npcId?: string;
    relationshipChange?: number;
    narrativeText?: string;
    attribute?: string;
    probability?: number;
    condition?: (state: GameState) => boolean;
}
/** 叙事消耗定义 */
export interface NarrativeCost {
    type: 'resource' | 'item' | 'ap' | 'health' | 'sanity' | 'energy';
    resource?: ResourceKey;
    itemId?: string;
    amount: number;
}
/** 叙事需求定义 */
export interface NarrativeRequirement {
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
/** 叙事场景定义 */
export interface NarrativeScene {
    id: string;
    type: NarrativeSceneType;
    title: string;
    text: string;
    choices: NarrativeChoice[];
    environment?: string;
    npcs?: NarrativeNPC[];
    discoveries?: NarrativeDiscovery[];
    timeLimit?: number;
    repeatable?: boolean;
    requirements?: NarrativeRequirement[];
    triggers?: NarrativeTrigger[];
}
/** 叙事NPC定义 */
export interface NarrativeNPC {
    id: string;
    name: string;
    type: 'ally' | 'neutral' | 'hostile' | 'merchant' | 'quest_giver';
    disposition: number;
    dialogue?: string[];
    inventory?: Record<string, number>;
}
/** 叙事发现定义 */
export interface NarrativeDiscovery {
    type: 'item' | 'info' | 'location' | 'npc' | 'secret';
    itemId?: string;
    amount?: number;
    infoText?: string;
    locationId?: string;
    npcId?: string;
    secretText?: string;
    probability: number;
}
/** 叙事触发器定义 */
export interface NarrativeTrigger {
    type: 'flag' | 'resource' | 'item' | 'attribute' | 'level' | 'time' | 'random';
    flag?: string;
    resource?: ResourceKey;
    minAmount?: number;
    itemId?: string;
    attribute?: string;
    minLevel?: number;
    day?: number;
    probability?: number;
}
export declare class NarrativeEngine {
    private rng;
    private sceneHistory;
    constructor(seed: number);
    /**
     * 生成叙事场景
     */
    generateScene(state: GameState, _context?: NarrativeContext): NarrativeScene | null;
    /**
     * 处理玩家选择
     */
    processChoice(state: GameState, scene: NarrativeScene, choice: NarrativeChoice): NarrativeResult;
    /**
     * 检查特殊触发器
     */
    private checkSpecialTriggers;
    /**
     * 确定场景类型
     */
    private determineSceneType;
    /**
     * 计算成功概率
     */
    private calculateSuccessChance;
    /**
     * 生成成功文本
     */
    private generateSuccessText;
    /**
     * 生成失败文本
     */
    private generateFailureText;
    /**
     * 应用后果
     */
    private applyConsequences;
    /**
     * 检查是否能承担选择
     */
    private canAffordChoice;
    /**
     * 应用消耗
     */
    private applyCosts;
    /**
     * 应用情绪影响
     */
    private applyEmotionalImpact;
    /**
     * 确定失败结果类型
     */
    private determineFailureOutcome;
    /**
     * 创建求生场景
     */
    private createSurvivalScene;
    /**
     * 创建幻觉场景
     */
    private createHallucinationScene;
    /**
     * 创建绝境场景
     */
    private createDesperationScene;
    /**
     * 创建随机特殊事件
     */
    private createRandomSpecialEvent;
    private createScene;
    private generateSceneTitle;
    private generateSceneText;
    private generateChoices;
    private generateEnvironment;
}
/** 叙事上下文 */
export interface NarrativeContext {
    currentLocation?: string;
    timeOfDay?: 'dawn' | 'morning' | 'noon' | 'afternoon' | 'dusk' | 'night';
    weather?: string;
    nearbyNPCs?: string[];
    recentEvents?: string[];
    playerMood?: 'calm' | 'nervous' | 'fearful' | 'angry' | 'hopeful' | 'desperate';
}
/** 叙事结果 */
export interface NarrativeResult {
    success: boolean;
    outcome: NarrativeOutcomeType;
    text: string;
    consequences: NarrativeConsequence[];
    systemMessages: string[];
    nextScene?: string;
    isEnding?: boolean;
    endingId?: string;
}
//# sourceMappingURL=narrative.d.ts.map