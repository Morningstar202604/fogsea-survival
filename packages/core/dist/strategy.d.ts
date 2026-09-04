/**
 * 策略驱动系统 v1.0
 *
 * 核心理念：
 * 1. 玩家选择决定生死存亡
 * 2. 好策略 = 资源丰富 = 游戏轻松
 * 3. 坏策略 = 资源匮乏 = 游戏困难/死亡
 * 4. 没有"正确"答案 - 多种有效玩法
 * 5. 支持任何流派：种田、战斗、策略、探索等
 */
import type { GameState, ResourceKey } from './types.js';
/** 策略流派 */
export declare enum StrategyArchetype {
    FARMING = "farming",
    COMBAT = "combat",
    STRATEGY = "strategy",
    EXPLORATION = "exploration",
    SURVIVAL = "survival",
    SOCIAL = "social",
    MYSTICAL = "mystical",
    BALANCED = "balanced"
}
/** 策略评分 */
export interface StrategyScore {
    archetype: StrategyArchetype;
    score: number;
    bonuses: StrategyBonus[];
    penalties: StrategyPenalty[];
}
/** 策略加成 */
export interface StrategyBonus {
    type: 'resource' | 'combat' | 'social' | 'exploration' | 'crafting' | 'trade';
    description: string;
    multiplier: number;
}
/** 策略惩罚 */
export interface StrategyPenalty {
    type: 'resource' | 'combat' | 'social' | 'exploration' | 'crafting' | 'trade';
    description: string;
    multiplier: number;
}
/** 策略决策 */
export interface StrategicDecision {
    id: string;
    description: string;
    options: StrategicOption[];
    impact: StrategicImpact[];
}
/** 策略选项 */
export interface StrategicOption {
    id: string;
    text: string;
    description: string;
    successChance: number;
    impacts: StrategicImpact[];
    costs: StrategicCost[];
    requirements?: StrategicRequirement[];
}
/** 策略影响 */
export interface StrategicImpact {
    type: 'resource' | 'item' | 'flag' | 'status' | 'reputation' | 'relationship' | 'attribute' | 'skill';
    resource?: ResourceKey;
    amount?: number;
    itemId?: string;
    itemCount?: number;
    flag?: string;
    flagValue?: boolean;
    status?: string;
    npcId?: string;
    relationshipChange?: number;
    reputationChange?: number;
    attribute?: string;
    attributeChange?: number;
    skill?: string;
    skillChange?: number;
}
/** 策略消耗 */
export interface StrategicCost {
    type: 'resource' | 'item' | 'ap' | 'health' | 'sanity' | 'energy';
    resource?: ResourceKey;
    itemId?: string;
    amount: number;
}
/** 策略需求 */
export interface StrategicRequirement {
    type: 'resource' | 'item' | 'flag' | 'attribute' | 'level' | 'title' | 'reputation' | 'strategy';
    resource?: ResourceKey;
    itemId?: string;
    flag?: string;
    attribute?: string;
    level?: number;
    title?: string;
    reputation?: number;
    strategy?: StrategyArchetype;
    minScore?: number;
}
export declare class StrategyEngine {
    constructor(_seed: number);
    /**
     * 分析玩家当前策略
     */
    analyzeStrategy(state: GameState): StrategyAnalysis;
    /**
     * 计算策略评分
     */
    private calculateStrategyScores;
    /**
     * 计算特定策略评分
     */
    private calculateSpecificScore;
    /**
     * 确定主导策略
     */
    private determineDominantStrategy;
    /**
     * 识别弱点
     */
    private identifyWeaknesses;
    /**
     * 计算弱点严重程度
     */
    private calculateWeaknessSeverity;
    /**
     * 识别优势
     */
    private identifyStrengths;
    /**
     * 生成建议
     */
    private generateRecommendations;
    /**
     * 为弱点生成建议
     */
    private generateRecommendationForWeakness;
    /**
     * 计算整体效率
     */
    private calculateOverallEfficiency;
    /**
     * 应用策略影响
     */
    applyStrategyImpact(state: GameState, impact: StrategicImpact): string[];
    /**
     * 评估决策影响
     */
    evaluateDecision(state: GameState, decision: StrategicDecision): DecisionEvaluation;
    /**
     * 生成策略建议
     */
    generateStrategyAdvice(state: GameState): StrategyAdvice;
    /**
     * 确定游戏阶段
     */
    private determineGamePhase;
    /**
     * 生成阶段建议
     */
    private generatePhaseAdvice;
    /**
     * 建议下一步行动
     */
    private suggestNextActions;
}
/** 策略分析结果 */
export interface StrategyAnalysis {
    scores: StrategyScore[];
    dominantStrategy: StrategyArchetype;
    weaknesses: StrategyWeakness[];
    strengths: StrategyStrength[];
    recommendations: StrategyRecommendation[];
    overallEfficiency: number;
}
/** 策略弱点 */
export interface StrategyWeakness {
    archetype: StrategyArchetype;
    penalties: StrategyPenalty[];
    severity: number;
}
/** 策略优势 */
export interface StrategyStrength {
    archetype: StrategyArchetype;
    bonuses: StrategyBonus[];
    score: number;
}
/** 策略建议 */
export interface StrategyRecommendation {
    type: 'immediate' | 'strategic' | 'long_term';
    text: string;
    priority: 'high' | 'medium' | 'low';
    actions: string[];
}
/** 决策评估 */
export interface DecisionEvaluation {
    messages: string[];
    strategyChange: {
        before: StrategyArchetype;
        after: StrategyArchetype;
        efficiencyChange: number;
    };
    recommendations: StrategyRecommendation[];
}
/** 策略阶段（游戏生命周期） */
export declare enum StrategyPhase {
    EARLY = "early",
    MID = "mid",
    LATE = "late",
    ENDGAME = "endgame"
}
/** 策略建议 */
export interface StrategyAdvice {
    analysis: StrategyAnalysis;
    currentPhase: StrategyPhase;
    advice: string[];
    nextActions: string[];
}
//# sourceMappingURL=strategy.d.ts.map