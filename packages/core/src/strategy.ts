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

// ============================================================
// 一、策略类型定义
// ============================================================

/** 策略流派 */
export enum StrategyArchetype {
  FARMING = 'farming',
  COMBAT = 'combat',
  STRATEGY = 'strategy',
  EXPLORATION = 'exploration',
  SURVIVAL = 'survival',
  SOCIAL = 'social',
  MYSTICAL = 'mystical',
  BALANCED = 'balanced',
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

// ============================================================
// 二、策略引擎核心类
// ============================================================

export class StrategyEngine {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(_seed: number) {
  }

  /**
   * 分析玩家当前策略
   */
  analyzeStrategy(state: GameState): StrategyAnalysis {
    const scores = this.calculateStrategyScores(state);
    const dominantStrategy = this.determineDominantStrategy(scores);
    const weaknesses = this.identifyWeaknesses(scores);
    const strengths = this.identifyStrengths(scores);
    const recommendations = this.generateRecommendations(scores, weaknesses, state);

    return {
      scores,
      dominantStrategy,
      weaknesses,
      strengths,
      recommendations,
      overallEfficiency: this.calculateOverallEfficiency(scores),
    };
  }

  /**
   * 计算策略评分
   */
  private calculateStrategyScores(state: GameState): StrategyScore[] {
    const scores: StrategyScore[] = [];

    for (const archetype of Object.values(StrategyArchetype)) {
      const score = this.calculateSpecificScore(archetype, state);
      scores.push(score);
    }

    return scores;
  }

  /**
   * 计算特定策略评分
   */
  private calculateSpecificScore(archetype: StrategyArchetype, state: GameState): StrategyScore {
    let score = 0;
    const bonuses: StrategyBonus[] = [];
    const penalties: StrategyPenalty[] = [];

    switch (archetype) {
      case StrategyArchetype.FARMING:
        score += state.resources.food.current * 0.5;
        score += state.resources.water.current * 0.5;
        score += (state.flags['shelter_reinforced'] ? 50 : 0);
        score += (state.flags['farm_established'] ? 100 : 0);
        bonuses.push({ type: 'resource', description: '资源收集效率提升', multiplier: 1.5 });
        if (state.resources.food.current < 30) {
          penalties.push({ type: 'resource', description: '食物短缺', multiplier: 0.5 });
        }
        break;

      case StrategyArchetype.COMBAT:
        score += state.attributes.strength * 5;
        score += state.combatKills * 10;
        score += (state.flags['killed_boss'] ? 100 : 0);
        bonuses.push({ type: 'combat', description: '战斗伤害提升', multiplier: 1.5 });
        if (state.attributes.strength < 15) {
          penalties.push({ type: 'combat', description: '力量不足', multiplier: 0.7 });
        }
        break;

      case StrategyArchetype.STRATEGY:
        score += state.attributes.intelligence * 5;
        score += state.reputation.overall * 2;
        score += (state.flags['diplomatic_relations'] ? 80 : 0);
        bonuses.push({ type: 'social', description: '社交成功率提升', multiplier: 1.5 });
        if (state.attributes.intelligence < 15) {
          penalties.push({ type: 'social', description: '智谋不足', multiplier: 0.7 });
        }
        break;

      case StrategyArchetype.EXPLORATION:
        score += state.attributes.agility * 3;
        score += state.attributes.intelligence * 3;
        score += (state.flags['explored_anomaly'] ? 60 : 0);
        score += (state.flags['decoded_runes'] ? 80 : 0);
        bonuses.push({ type: 'exploration', description: '探索成功率提升', multiplier: 1.5 });
        if (state.attributes.agility < 12) {
          penalties.push({ type: 'exploration', description: '敏捷不足', multiplier: 0.7 });
        }
        break;

      case StrategyArchetype.SURVIVAL:
        score += state.resources.health.current * 0.8;
        score += state.resources.sanity.current * 0.8;
        score += (state.flags['survived_disaster'] ? 50 : 0);
        score += (state.flags['endured_storm'] ? 30 : 0);
        bonuses.push({ type: 'resource', description: '生存能力提升', multiplier: 1.3 });
        if (state.resources.health.current < 50) {
          penalties.push({ type: 'resource', description: '生命值过低', multiplier: 0.6 });
        }
        break;

      case StrategyArchetype.SOCIAL:
        score += state.reputation.amongSurvivors * 3;
        score += state.reputation.amongFactions * 3;
        score += (state.flags['joined_caravan'] ? 40 : 0);
        score += (state.flags['helped_survivor'] ? 30 : 0);
        bonuses.push({ type: 'social', description: '社交收益提升', multiplier: 1.5 });
        if (state.reputation.overall < 0) {
          penalties.push({ type: 'social', description: '声望不佳', multiplier: 0.6 });
        }
        break;

      case StrategyArchetype.MYSTICAL:
        score += state.resources.sanity.current * 0.3;
        score += (state.flags['absorbed_storm_power'] ? 80 : 0);
        score += (state.flags['blessed_by_tree'] ? 60 : 0);
        score += (state.flags['learned_world_truth'] ? 100 : 0);
        bonuses.push({ type: 'combat', description: '神秘力量加成', multiplier: 1.4 });
        if (state.resources.sanity.current < 30) {
          penalties.push({ type: 'resource', description: '理智不足', multiplier: 0.5 });
        }
        break;

      case StrategyArchetype.BALANCED:
        const allScores = [
          state.resources.food.current,
          state.resources.water.current,
          state.resources.health.current,
          state.resources.sanity.current,
          state.attributes.strength,
          state.attributes.agility,
          state.attributes.intelligence,
          state.attributes.luck,
        ];
        score = allScores.reduce((a, b) => a + b, 0) / allScores.length;
        bonuses.push({ type: 'resource', description: '全面发展', multiplier: 1.2 });
        break;
    }

    return { archetype, score, bonuses, penalties };
  }

  /**
   * 确定主导策略
   */
  private determineDominantStrategy(scores: StrategyScore[]): StrategyArchetype {
    let maxScore = -Infinity;
    let dominant = StrategyArchetype.BALANCED;

    for (const score of scores) {
      if (score.score > maxScore) {
        maxScore = score.score;
        dominant = score.archetype;
      }
    }

    return dominant;
  }

  /**
   * 识别弱点
   */
  private identifyWeaknesses(scores: StrategyScore[]): StrategyWeakness[] {
    const weaknesses: StrategyWeakness[] = [];

    for (const score of scores) {
      if (score.penalties.length > 0) {
        weaknesses.push({
          archetype: score.archetype,
          penalties: score.penalties,
          severity: this.calculateWeaknessSeverity(score),
        });
      }
    }

    return weaknesses.sort((a, b) => b.severity - a.severity);
  }

  /**
   * 计算弱点严重程度
   */
  private calculateWeaknessSeverity(score: StrategyScore): number {
    let severity = 0;
    for (const penalty of score.penalties) {
      severity += (1 - penalty.multiplier) * 100;
    }
    return severity;
  }

  /**
   * 识别优势
   */
  private identifyStrengths(scores: StrategyScore[]): StrategyStrength[] {
    const strengths: StrategyStrength[] = [];

    for (const score of scores) {
      if (score.bonuses.length > 0 && score.score > 50) {
        strengths.push({
          archetype: score.archetype,
          bonuses: score.bonuses,
          score: score.score,
        });
      }
    }

    return strengths.sort((a, b) => b.score - a.score);
  }

  /**
   * 生成建议
   */
  private generateRecommendations(
    _scores: StrategyScore[],
    weaknesses: StrategyWeakness[],
    state: GameState
  ): StrategyRecommendation[] {
    const recommendations: StrategyRecommendation[] = [];

    for (const weakness of weaknesses.slice(0, 3)) {
      recommendations.push(this.generateRecommendationForWeakness(weakness));
    }

    if (state.resources.health.current < 30) {
      recommendations.push({
        type: 'immediate',
        text: '立即寻找食物和水源，你的生命值过低！',
        priority: 'high',
        actions: ['寻找食物', '寻找水源', '使用急救包'],
      });
    }

    if (state.resources.sanity.current < 30) {
      recommendations.push({
        type: 'immediate',
        text: '你需要恢复理智，否则可能会出现幻觉！',
        priority: 'high',
        actions: ['休息', '寻找安全地点', '与人交谈'],
      });
    }

    if (state.day < 10) {
      recommendations.push({
        type: 'strategic',
        text: '早期应该专注于建立庇护所和收集资源。',
        priority: 'medium',
        actions: ['建立庇护所', '收集食物', '探索周围'],
      });
    } else if (state.day < 30) {
      recommendations.push({
        type: 'strategic',
        text: '中期应该发展技能和建立关系。',
        priority: 'medium',
        actions: ['训练技能', '与NPC交流', '建立基地'],
      });
    } else {
      recommendations.push({
        type: 'strategic',
        text: '后期应该准备应对更大的挑战。',
        priority: 'medium',
        actions: ['强化装备', '建立联盟', '探索高级区域'],
      });
    }

    return recommendations;
  }

  /**
   * 为弱点生成建议
   */
  private generateRecommendationForWeakness(weakness: StrategyWeakness): StrategyRecommendation {
    const recommendations: Record<string, StrategyRecommendation> = {
      [StrategyArchetype.FARMING]: {
        type: 'strategic',
        text: '你的资源积累不足，应该专注于收集食物和水源。',
        priority: 'medium',
        actions: ['建立农场', '收集资源', '学习种植'],
      },
      [StrategyArchetype.COMBAT]: {
        type: 'strategic',
        text: '你的战斗能力不足，应该提升力量和战斗技能。',
        priority: 'medium',
        actions: ['训练战斗', '寻找武器', '挑战怪物'],
      },
      [StrategyArchetype.STRATEGY]: {
        type: 'strategic',
        text: '你的智谋不足，应该提升智力和外交能力。',
        priority: 'medium',
        actions: ['学习知识', '与NPC交流', '制定计划'],
      },
      [StrategyArchetype.EXPLORATION]: {
        type: 'strategic',
        text: '你的探索能力不足，应该提升敏捷和智力。',
        priority: 'medium',
        actions: ['探索区域', '寻找线索', '研究知识'],
      },
      [StrategyArchetype.SURVIVAL]: {
        type: 'strategic',
        text: '你的生存能力不足，应该提升适应能力。',
        priority: 'medium',
        actions: ['学习生存技巧', '收集急救用品', '建立安全点'],
      },
      [StrategyArchetype.SOCIAL]: {
        type: 'strategic',
        text: '你的社交能力不足，应该建立更多关系。',
        priority: 'medium',
        actions: ['帮助他人', '加入群体', '建立信任'],
      },
      [StrategyArchetype.MYSTICAL]: {
        type: 'strategic',
        text: '你的神秘力量不足，应该探索神秘现象。',
        priority: 'medium',
        actions: ['研究符文', '探索异常', '吸收力量'],
      },
      [StrategyArchetype.BALANCED]: {
        type: 'strategic',
        text: '你的能力发展不均衡，应该平衡发展。',
        priority: 'medium',
        actions: ['全面提升', '弥补短板', '保持平衡'],
      },
    };

    return recommendations[weakness.archetype] ?? recommendations[StrategyArchetype.BALANCED];
  }

  /**
   * 计算整体效率
   */
  private calculateOverallEfficiency(scores: StrategyScore[]): number {
    const totalScore = scores.reduce((sum, s) => sum + s.score, 0);
    const maxPossibleScore = scores.length * 100;
    return (totalScore / maxPossibleScore) * 100;
  }

  /**
   * 应用策略影响
   */
  applyStrategyImpact(state: GameState, impact: StrategicImpact): string[] {
    const messages: string[] = [];

    switch (impact.type) {
      case 'resource':
        if (impact.resource) {
          const current = state.resources[impact.resource].current;
          const max = state.resources[impact.resource].max;
          state.resources[impact.resource].current = Math.max(
            0,
            Math.min(max, current + (impact.amount ?? 0))
          );
          messages.push(
            `${impact.resource}${(impact.amount ?? 0) > 0 ? '增加' : '减少'}了${Math.abs(impact.amount ?? 0)}`
          );
        }
        break;

      case 'item':
        if (impact.itemId) {
          const current = state.inventory[impact.itemId] ?? 0;
          state.inventory[impact.itemId] = current + (impact.itemCount ?? 1);
          messages.push(`获得物品: ${impact.itemId} x${impact.itemCount ?? 1}`);
        }
        break;

      case 'flag':
        if (impact.flag) {
          state.flags[impact.flag] = impact.flagValue ?? true;
        }
        break;

      case 'reputation':
        if (impact.reputationChange) {
          state.reputation.overall += impact.reputationChange;
          messages.push(`声望${impact.reputationChange > 0 ? '提升' : '下降'}了${Math.abs(impact.reputationChange)}`);
        }
        break;

      case 'attribute':
        if (impact.attribute && impact.attributeChange) {
          const attr = impact.attribute as keyof typeof state.attributes;
          if (state.attributes[attr] !== undefined) {
            state.attributes[attr] += impact.attributeChange;
            messages.push(`${impact.attribute}${impact.attributeChange > 0 ? '提升' : '下降'}了${Math.abs(impact.attributeChange)}`);
          }
        }
        break;
    }

    return messages;
  }

  /**
   * 评估决策影响
   */
  evaluateDecision(state: GameState, decision: StrategicDecision): DecisionEvaluation {
    const strategyBefore = this.analyzeStrategy(state);
    
    const messages: string[] = [];
    for (const impact of decision.impact) {
      messages.push(...this.applyStrategyImpact(state, impact));
    }

    const strategyAfter = this.analyzeStrategy(state);
    
    return {
      messages,
      strategyChange: {
        before: strategyBefore.dominantStrategy,
        after: strategyAfter.dominantStrategy,
        efficiencyChange: strategyAfter.overallEfficiency - strategyBefore.overallEfficiency,
      },
      recommendations: strategyAfter.recommendations.slice(0, 2),
    };
  }

  /**
   * 生成策略建议
   */
  generateStrategyAdvice(state: GameState): StrategyAdvice {
    const analysis = this.analyzeStrategy(state);
    const currentPhase = this.determineGamePhase(state);
    const advice = this.generatePhaseAdvice(currentPhase, analysis);

    return {
      analysis,
      currentPhase,
      advice,
      nextActions: this.suggestNextActions(analysis, state),
    };
  }

  /**
   * 确定游戏阶段
   */
  private determineGamePhase(state: GameState): StrategyPhase {
    if (state.day < 10) return StrategyPhase.EARLY;
    if (state.day < 30) return StrategyPhase.MID;
    if (state.day < 60) return StrategyPhase.LATE;
    return StrategyPhase.ENDGAME;
  }

  /**
   * 生成阶段建议
   */
  private generatePhaseAdvice(
    phase: StrategyPhase,
    analysis: StrategyAnalysis
  ): string[] {
    const advice: string[] = [];

    switch (phase) {
      case StrategyPhase.EARLY:
        advice.push('早期阶段，专注于建立庇护所和收集基本资源。');
        advice.push('探索周围环境，寻找安全的资源点。');
        if (analysis.dominantStrategy === StrategyArchetype.COMBAT) {
          advice.push('虽然你喜欢战斗，但早期应该以生存为主。');
        }
        break;

      case StrategyPhase.MID:
        advice.push('中期阶段，开始发展你的主要策略方向。');
        advice.push('建立与NPC的关系，为后期做准备。');
        if (analysis.weaknesses.length > 0) {
          advice.push(`注意你的弱点：${analysis.weaknesses[0].archetype}`);
        }
        break;

      case StrategyPhase.LATE:
        advice.push('后期阶段，强化你的优势，准备应对挑战。');
        advice.push('建立联盟，准备应对大型事件。');
        if (analysis.overallEfficiency < 50) {
          advice.push('你的整体效率较低，需要紧急改进。');
        }
        break;

      case StrategyPhase.ENDGAME:
        advice.push('终局阶段，所有准备都将接受考验。');
        advice.push('确保你的资源充足，装备精良。');
        if (analysis.dominantStrategy === StrategyArchetype.BALANCED) {
          advice.push('平衡发展是好事，但可能缺乏决定性优势。');
        }
        break;
    }

    return advice;
  }

  /**
   * 建议下一步行动
   */
  private suggestNextActions(analysis: StrategyAnalysis, state: GameState): string[] {
    const actions: string[] = [];

    if (analysis.weaknesses.length > 0) {
      const weakness = analysis.weaknesses[0];
      switch (weakness.archetype) {
        case StrategyArchetype.FARMING:
          actions.push('收集食物和水源');
          actions.push('建立储存设施');
          break;
        case StrategyArchetype.COMBAT:
          actions.push('训练战斗技能');
          actions.push('寻找更好的武器');
          break;
        case StrategyArchetype.STRATEGY:
          actions.push('与NPC交流获取信息');
          actions.push('制定长期计划');
          break;
        case StrategyArchetype.EXPLORATION:
          actions.push('探索未发现的区域');
          actions.push('研究神秘现象');
          break;
      }
    }

    if (state.resources.health.current < 50) {
      actions.push('寻找医疗用品');
    }
    if (state.resources.food.current < 30) {
      actions.push('寻找食物来源');
    }
    if (state.resources.sanity.current < 30) {
      actions.push('寻找安全地点休息');
    }

    return actions.slice(0, 3);
  }
}

// ============================================================
// 三、辅助类型
// ============================================================

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
export enum StrategyPhase {
  EARLY = 'early',
  MID = 'mid',
  LATE = 'late',
  ENDGAME = 'endgame',
}

/** 策略建议 */
export interface StrategyAdvice {
  analysis: StrategyAnalysis;
  currentPhase: StrategyPhase;
  advice: string[];
  nextActions: string[];
}
