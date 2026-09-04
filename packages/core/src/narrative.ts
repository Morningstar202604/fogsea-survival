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
import { Rng } from './rng.js';

// ============================================================
// 一、叙事场景类型定义
// ============================================================

/** 叙事场景类型 */
export enum NarrativeSceneType {
  DIALOGUE = 'dialogue',
  EXPLORATION = 'exploration',
  COMBAT = 'combat',
  NEGOTIATION = 'negotiation',
  DILEMMA = 'dilemma',
  DISCOVERY = 'discovery',
  DISASTER = 'disaster',
  TRADE = 'trade',
  TRAINING = 'training',
  STORY = 'story',
}

/** 叙事选择类型 */
export enum NarrativeChoiceType {
  ACTION = 'action',
  DIALOGUE = 'dialogue',
  COMBAT = 'combat',
  NEGOTIATION = 'negotiation',
  ITEM_USE = 'item_use',
  SKILL_USE = 'skill_use',
  FLEE = 'flee',
  OBSERVE = 'observe',
  WAIT = 'wait',
  GIVE_UP = 'give_up',
}

/** 叙事结果类型 */
export enum NarrativeOutcomeType {
  SUCCESS = 'success',
  FAILURE = 'failure',
  PARTIAL_SUCCESS = 'partial_success',
  CATASTROPHIC_FAILURE = 'catastrophic_failure',
  UNEXPECTED_GAIN = 'unexpected_gain',
  NEUTRAL = 'neutral',
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

// ============================================================
// 二、叙事引擎核心类
// ============================================================

export class NarrativeEngine {
  private rng: Rng;
  private sceneHistory: string[] = [];

  constructor(seed: number) {
    this.rng = new Rng(seed);
  }

  /**
   * 生成叙事场景
   */
  generateScene(state: GameState, _context?: NarrativeContext): NarrativeScene | null {
    const specialEvent = this.checkSpecialTriggers(state);
    if (specialEvent) return specialEvent;

    const sceneType = this.determineSceneType(state);
    return this.createScene(sceneType, state);
  }

  /**
   * 处理玩家选择
   */
  processChoice(
    state: GameState,
    scene: NarrativeScene,
    choice: NarrativeChoice
  ): NarrativeResult {
    const result: NarrativeResult = {
      success: false,
      outcome: NarrativeOutcomeType.NEUTRAL,
      text: '',
      consequences: [],
      systemMessages: [],
    };

    if (!this.canAffordChoice(state, choice)) {
      result.text = '你没有足够的资源来执行这个选择。';
      result.outcome = NarrativeOutcomeType.FAILURE;
      return result;
    }

    this.applyCosts(state, choice);

    const roll = this.rng.int(1, 100);
    const successChance = this.calculateSuccessChance(state, choice);
    const success = roll <= successChance;

    if (success) {
      result.success = true;
      result.outcome = NarrativeOutcomeType.SUCCESS;
      result.text = this.generateSuccessText(choice);
      this.applyConsequences(state, choice.successRewards, result);
    } else {
      result.outcome = this.determineFailureOutcome(roll, successChance);
      result.text = this.generateFailureText(choice, result.outcome);
      this.applyConsequences(state, choice.failureConsequences, result);
    }

    if (choice.emotionalImpact) {
      this.applyEmotionalImpact(state, choice.emotionalImpact);
    }

    this.sceneHistory.push(scene.id);
    return result;
  }

  /**
   * 检查特殊触发器
   */
  private checkSpecialTriggers(state: GameState): NarrativeScene | null {
    if (state.resources.health.current < 20) {
      return this.createSurvivalScene(state);
    }

    if (state.resources.sanity.current < 20) {
      return this.createHallucinationScene(state);
    }

    if (state.resources.food.current < 10 && state.resources.water.current < 10) {
      return this.createDesperationScene(state);
    }

    if (this.rng.next() < 0.1) {
      return this.createRandomSpecialEvent(state);
    }

    return null;
  }

  /**
   * 确定场景类型
   */
  private determineSceneType(state: GameState): NarrativeSceneType {
    const weights: Record<NarrativeSceneType, number> = {
      [NarrativeSceneType.DIALOGUE]: 15,
      [NarrativeSceneType.EXPLORATION]: 20,
      [NarrativeSceneType.COMBAT]: 10,
      [NarrativeSceneType.NEGOTIATION]: 10,
      [NarrativeSceneType.DILEMMA]: 15,
      [NarrativeSceneType.DISCOVERY]: 15,
      [NarrativeSceneType.DISASTER]: 5,
      [NarrativeSceneType.TRADE]: 10,
      [NarrativeSceneType.TRAINING]: 5,
      [NarrativeSceneType.STORY]: 5,
    };

    if (state.attributes.strength > 15) weights[NarrativeSceneType.COMBAT] += 10;
    if (state.attributes.intelligence > 15) weights[NarrativeSceneType.NEGOTIATION] += 10;
    if (state.attributes.agility > 15) weights[NarrativeSceneType.EXPLORATION] += 10;

    if (state.resources.health.current < 50) weights[NarrativeSceneType.DISASTER] += 15;
    if (state.resources.sanity.current < 50) weights[NarrativeSceneType.DILEMMA] += 10;

    if (state.day > 30) weights[NarrativeSceneType.COMBAT] += 5;
    if (state.day > 60) weights[NarrativeSceneType.NEGOTIATION] += 5;

    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    let random = this.rng.int(1, totalWeight);
    
    for (const [type, weight] of Object.entries(weights)) {
      random -= weight;
      if (random <= 0) {
        return type as NarrativeSceneType;
      }
    }

    return NarrativeSceneType.EXPLORATION;
  }

  /**
   * 计算成功概率
   */
  private calculateSuccessChance(state: GameState, choice: NarrativeChoice): number {
    let chance = choice.successChance;

    if (choice.attributeBonuses) {
      for (const [attr, bonus] of Object.entries(choice.attributeBonuses)) {
        const attrValue = state.attributes[attr as keyof typeof state.attributes] ?? 10;
        chance += (attrValue - 10) * bonus;
      }
    }

    return Math.max(5, Math.min(95, chance));
  }

  /**
   * 生成成功文本
   */
  private generateSuccessText(choice: NarrativeChoice): string {
    const templates = [
      `你成功完成了「${choice.text}」。`,
      `经过一番努力，你顺利达成了目标。`,
      `你的行动取得了成功。`,
      `一切按计划进行，你完成了任务。`,
    ];
    return templates[this.rng.int(0, templates.length - 1)];
  }

  /**
   * 生成失败文本
   */
  private generateFailureText(
    _choice: NarrativeChoice,
    outcome: NarrativeOutcomeType
  ): string {
    const failureTemplates: Record<NarrativeOutcomeType, string[]> = {
      [NarrativeOutcomeType.FAILURE]: [
        `你的行动失败了。`,
        `事情没有按计划进行。`,
        `你未能达成目标。`,
      ],
      [NarrativeOutcomeType.CATASTROPHIC_FAILURE]: [
        `灾难性的失败！后果不堪设想。`,
        `你的行动导致了严重的后果。`,
        `一切都搞砸了，情况变得非常糟糕。`,
      ],
      [NarrativeOutcomeType.PARTIAL_SUCCESS]: [
        `你取得了一些进展，但付出了代价。`,
        `部分成功，但情况并不理想。`,
      ],
      [NarrativeOutcomeType.SUCCESS]: [],
      [NarrativeOutcomeType.UNEXPECTED_GAIN]: [],
      [NarrativeOutcomeType.NEUTRAL]: [
        `结果平平，没有特别的事情发生。`,
      ],
    };

    const templates = failureTemplates[outcome];
    return templates[this.rng.int(0, templates.length - 1)];
  }

  /**
   * 应用后果
   */
  private applyConsequences(
    state: GameState,
    consequences: NarrativeConsequence[],
    result: NarrativeResult
  ): void {
    for (const consequence of consequences) {
      if (consequence.probability !== undefined && this.rng.next() > consequence.probability) {
        continue;
      }

      if (consequence.condition && !consequence.condition(state)) {
        continue;
      }

      switch (consequence.type) {
        case 'resource':
          if (consequence.resource) {
            const current = state.resources[consequence.resource].current;
            const max = state.resources[consequence.resource].max;
            state.resources[consequence.resource].current = Math.max(
              0,
              Math.min(max, current + (consequence.amount ?? 0))
            );
            result.systemMessages.push(
              `${consequence.resource === 'health' ? '生命' :
                consequence.resource === 'sanity' ? '精神' :
                consequence.resource === 'food' ? '食物' :
                consequence.resource === 'water' ? '水源' :
                consequence.resource === 'energy' ? '体力' :
                consequence.resource === 'warmth' ? '温度' : consequence.resource}${(consequence.amount ?? 0) > 0 ? '增加' : '减少'}了${Math.abs(consequence.amount ?? 0)}`
            );
          }
          break;

        case 'item':
          if (consequence.itemId) {
            const current = state.inventory[consequence.itemId] ?? 0;
            state.inventory[consequence.itemId] = current + (consequence.amount ?? 0);
            result.systemMessages.push(
              `获得物品: ${consequence.itemId} x${consequence.amount ?? 1}`
            );
          }
          break;

        case 'flag':
          if (consequence.flag) {
            state.flags[consequence.flag] = consequence.flagValue ?? true;
          }
          break;

        case 'death':
          state.resources.health.current = 0;
          result.text += '\n\n【死亡】你死了。';
          break;

        case 'narrative':
          if (consequence.narrativeText) {
            result.text += '\n\n' + consequence.narrativeText;
          }
          break;
      }
    }
  }

  /**
   * 检查是否能承担选择
   */
  private canAffordChoice(state: GameState, choice: NarrativeChoice): boolean {
    for (const cost of choice.costs) {
      switch (cost.type) {
        case 'resource':
          if (cost.resource && state.resources[cost.resource].current < cost.amount) {
            return false;
          }
          break;

        case 'item':
          if (cost.itemId && (state.inventory[cost.itemId] ?? 0) < cost.amount) {
            return false;
          }
          break;

        case 'ap':
          if (state.ap < cost.amount) {
            return false;
          }
          break;

        case 'health':
          if (state.resources.health.current < cost.amount) {
            return false;
          }
          break;

        case 'sanity':
          if (state.resources.sanity.current < cost.amount) {
            return false;
          }
          break;

        case 'energy':
          if (state.resources.energy.current < cost.amount) {
            return false;
          }
          break;
      }
    }
    return true;
  }

  /**
   * 应用消耗
   */
  private applyCosts(state: GameState, choice: NarrativeChoice): void {
    for (const cost of choice.costs) {
      switch (cost.type) {
        case 'resource':
          if (cost.resource) {
            state.resources[cost.resource].current = Math.max(
              0,
              state.resources[cost.resource].current - cost.amount
            );
          }
          break;

        case 'item':
          if (cost.itemId) {
            state.inventory[cost.itemId] = Math.max(
              0,
              (state.inventory[cost.itemId] ?? 0) - cost.amount
            );
          }
          break;

        case 'ap':
          state.ap = Math.max(0, state.ap - cost.amount);
          break;

        case 'health':
          state.resources.health.current = Math.max(
            0,
            state.resources.health.current - cost.amount
          );
          break;

        case 'sanity':
          state.resources.sanity.current = Math.max(
            0,
            state.resources.sanity.current - cost.amount
          );
          break;

        case 'energy':
          state.resources.energy.current = Math.max(
            0,
            state.resources.energy.current - cost.amount
          );
          break;
      }
    }
  }

  /**
   * 应用情绪影响
   */
  private applyEmotionalImpact(
    state: GameState,
    impact: { fear?: number; anger?: number; hope?: number; despair?: number }
  ): void {
    if (impact.fear) {
      state.resources.sanity.current = Math.max(
        0,
        Math.min(100, state.resources.sanity.current - impact.fear)
      );
    }
    if (impact.hope) {
      state.resources.sanity.current = Math.max(
        0,
        Math.min(100, state.resources.sanity.current + impact.hope)
      );
    }
    if (impact.despair) {
      state.resources.sanity.current = Math.max(
        0,
        Math.min(100, state.resources.sanity.current - impact.despair)
      );
    }
  }

  /**
   * 确定失败结果类型
   */
  private determineFailureOutcome(roll: number, successChance: number): NarrativeOutcomeType {
    const failureMargin = successChance - roll;
    
    if (failureMargin < -80) {
      return NarrativeOutcomeType.CATASTROPHIC_FAILURE;
    } else if (failureMargin < -50) {
      return NarrativeOutcomeType.FAILURE;
    } else {
      return NarrativeOutcomeType.PARTIAL_SUCCESS;
    }
  }

  // ============================================================
  // 三、场景生成器
  // ============================================================

  /**
   * 创建求生场景
   */
  private createSurvivalScene(_state: GameState): NarrativeScene {
    return {
      id: `survival_${this.rng.int(1, 1000)}`,
      type: NarrativeSceneType.DILEMMA,
      title: '生死一线',
      text: `你的伤势严重，生命垂危。眼前的景象开始模糊，你知道如果再不采取行动，你就会死在这里。`,
      choices: [
        {
          id: 'use_medicine',
          text: '使用急救包',
          description: '如果你还有急救包的话，这可能是唯一的希望。',
          type: NarrativeChoiceType.ITEM_USE,
          successChance: 80,
          costs: [{ type: 'item', itemId: 'medkit', amount: 1 }],
          successRewards: [
            { type: 'resource', resource: 'health', amount: 30 },
          ],
          failureConsequences: [
            { type: 'resource', resource: 'health', amount: -10 },
          ],
        },
        {
          id: 'crawl_to_shelter',
          text: '爬向庇护所',
          description: '你的庇护所就在不远处，但以你现在的情况，这段距离可能就是生与死的距离。',
          type: NarrativeChoiceType.ACTION,
          successChance: 40,
          costs: [{ type: 'energy', amount: 20 }],
          successRewards: [
            { type: 'resource', resource: 'health', amount: 5 },
            { type: 'flag', flag: 'survived_critically' },
          ],
          failureConsequences: [
            { type: 'resource', resource: 'health', amount: -20 },
            { type: 'death' },
          ],
          attributeBonuses: { agility: 2, strength: 1 },
        },
        {
          id: 'eat_emergency_food',
          text: '吃下所有能找到的食物',
          description: '也许吃饱了就能恢复一些体力...',
          type: NarrativeChoiceType.ITEM_USE,
          successChance: 60,
          costs: [{ type: 'item', itemId: 'food', amount: 3 }],
          successRewards: [
            { type: 'resource', resource: 'health', amount: 15 },
            { type: 'resource', resource: 'energy', amount: 20 },
          ],
          failureConsequences: [
            { type: 'resource', resource: 'sanity', amount: -10 },
          ],
        },
        {
          id: 'pray',
          text: '闭上眼睛祈祷',
          description: '在绝望中，你只能把希望寄托于虚无缥缈的神明。',
          type: NarrativeChoiceType.WAIT,
          successChance: 10,
          costs: [],
          successRewards: [
            { type: 'resource', resource: 'health', amount: 50 },
            { type: 'flag', flag: 'miracle_survival' },
          ],
          failureConsequences: [
            { type: 'death' },
          ],
        },
      ],
      environment: '你躺在冰冷的地面上，鲜血浸透了你的衣物。迷雾在你周围缭绕，仿佛在等待你咽下最后一口气。',
      timeLimit: 3,
    };
  }

  /**
   * 创建幻觉场景
   */
  private createHallucinationScene(_state: GameState): NarrativeScene {
    return {
      id: `hallucination_${this.rng.int(1, 1000)}`,
      type: NarrativeSceneType.STORY,
      title: '幻觉：过去的回忆',
      text: `你的眼前出现了熟悉的面孔。那是你的家人，他们在呼唤你回家。温暖的灯光，熟悉的饭菜香味，一切都那么真实...`,
      choices: [
        {
          id: 'follow_family',
          text: '跟随他们',
          description: '他们看起来那么真实，也许是救援队？',
          type: NarrativeChoiceType.ACTION,
          successChance: 30,
          costs: [{ type: 'sanity', amount: 20 }],
          successRewards: [
            { type: 'resource', resource: 'sanity', amount: 30 },
            { type: 'flag', flag: 'hallucination_family' },
          ],
          failureConsequences: [
            { type: 'resource', resource: 'sanity', amount: -30 },
            { type: 'resource', resource: 'health', amount: -20 },
          ],
        },
        {
          id: 'resist_hallucination',
          text: '抵抗幻觉',
          description: '你知道这是幻觉，必须保持清醒。',
          type: NarrativeChoiceType.ACTION,
          successChance: 60,
          costs: [{ type: 'energy', amount: 15 }],
          successRewards: [
            { type: 'resource', resource: 'sanity', amount: 10 },
            { type: 'flag', flag: 'resisted_hallucination' },
          ],
          failureConsequences: [
            { type: 'resource', resource: 'sanity', amount: -15 },
          ],
          attributeBonuses: { intelligence: 2 },
        },
        {
          id: 'embrace_madness',
          text: '拥抱疯狂',
          description: '也许疯狂才是解脱...',
          type: NarrativeChoiceType.GIVE_UP,
          successChance: 100,
          costs: [{ type: 'sanity', amount: 50 }],
          successRewards: [
            { type: 'flag', flag: 'embraced_madness' },
          ],
          failureConsequences: [],
        },
      ],
      environment: '你的意识开始模糊，现实与幻觉的界限变得模糊不清。',
    };
  }

  /**
   * 创建绝境场景
   */
  private createDesperationScene(_state: GameState): NarrativeScene {
    return {
      id: `desperation_${this.rng.int(1, 1000)}`,
      type: NarrativeSceneType.DILEMMA,
      title: '绝境',
      text: `你已经好几天没有吃东西了，嘴巴干得像沙漠。你的身体在告诉你，如果再不找到食物和水，你就会死。`,
      choices: [
        {
          id: 'scavenge_ruins',
          text: '搜寻废墟',
          description: '也许废墟里还有些残羹剩饭。',
          type: NarrativeChoiceType.ACTION,
          successChance: 50,
          costs: [{ type: 'energy', amount: 25 }],
          successRewards: [
            { type: 'resource', resource: 'food', amount: 15 },
            { type: 'resource', resource: 'water', amount: 10 },
          ],
          failureConsequences: [
            { type: 'resource', resource: 'energy', amount: -15 },
            { type: 'resource', resource: 'health', amount: -10 },
          ],
          attributeBonuses: { agility: 1, intelligence: 1 },
        },
        {
          id: 'hunt_monster',
          text: '狩猎怪物',
          description: '怪物的肉也许能吃...也许。',
          type: NarrativeChoiceType.COMBAT,
          successChance: 35,
          costs: [{ type: 'energy', amount: 30 }],
          successRewards: [
            { type: 'resource', resource: 'food', amount: 25 },
            { type: 'flag', flag: 'hunted_monster_meat' },
          ],
          failureConsequences: [
            { type: 'resource', resource: 'health', amount: -25 },
          ],
          attributeBonuses: { strength: 2 },
        },
        {
          id: 'drink_mist_water',
          text: '喝迷雾中的水',
          description: '迷雾中似乎有水声，但谁知道那是什么...',
          type: NarrativeChoiceType.ACTION,
          successChance: 40,
          costs: [],
          successRewards: [
            { type: 'resource', resource: 'water', amount: 30 },
            { type: 'flag', flag: 'drank_mist_water' },
          ],
          failureConsequences: [
            { type: 'resource', resource: 'health', amount: -20 },
            { type: 'resource', resource: 'sanity', amount: -15 },
            { type: 'status', status: 'poisoned' },
          ],
        },
        {
          id: 'eat_plants',
          text: '寻找可食用的植物',
          description: '你需要辨别哪些植物是安全的...',
          type: NarrativeChoiceType.ACTION,
          successChance: 60,
          costs: [{ type: 'energy', amount: 15 }],
          successRewards: [
            { type: 'resource', resource: 'food', amount: 10 },
          ],
          failureConsequences: [
            { type: 'resource', resource: 'health', amount: -15 },
            { type: 'status', status: 'poisoned' },
          ],
          attributeBonuses: { intelligence: 2 },
        },
        {
          id: 'desperate_trade',
          text: '与陌生人交易',
          description: '远处有个人影，也许他愿意交换些食物...',
          type: NarrativeChoiceType.NEGOTIATION,
          successChance: 45,
          costs: [{ type: 'item', itemId: 'scrap_metal', amount: 3 }],
          successRewards: [
            { type: 'resource', resource: 'food', amount: 20 },
            { type: 'resource', resource: 'water', amount: 15 },
          ],
          failureConsequences: [
            { type: 'item', itemId: 'scrap_metal', amount: -3 },
            { type: 'resource', resource: 'health', amount: -10 },
          ],
        },
      ],
      environment: '你的胃在痉挛，嘴唇干裂出血。你感到头晕目眩，知道自己的时间不多了。',
    };
  }

  /**
   * 创建随机特殊事件
   */
  private createRandomSpecialEvent(_state: GameState): NarrativeScene {
    return {
      id: `special_${this.rng.int(1, 1000)}`,
      type: NarrativeSceneType.DISCOVERY,
      title: '神秘发现',
      text: `你在迷雾中发现了一些不寻常的东西...`,
      choices: [
        {
          id: 'investigate',
          text: '调查',
          description: '仔细研究这个发现。',
          type: NarrativeChoiceType.OBSERVE,
          successChance: 60,
          costs: [{ type: 'energy', amount: 10 }],
          successRewards: [
            { type: 'flag', flag: 'investigated_mystery' },
            { type: 'resource', resource: 'sanity', amount: 10 },
          ],
          failureConsequences: [
            { type: 'resource', resource: 'sanity', amount: -10 },
          ],
          attributeBonuses: { intelligence: 2 },
        },
        {
          id: 'ignore',
          text: '忽略',
          description: '继续你的旅程。',
          type: NarrativeChoiceType.FLEE,
          successChance: 100,
          costs: [],
          successRewards: [],
          failureConsequences: [],
        },
      ],
      environment: '周围的空气似乎变得更加浓密，你感到一股无形的压力。',
    };
  }

  // ============================================================
  // 四、辅助方法
  // ============================================================

  private createScene(type: NarrativeSceneType, state: GameState): NarrativeScene {
    const sceneId = `${type}_${this.rng.int(1, 1000)}`;
    
    return {
      id: sceneId,
      type,
      title: this.generateSceneTitle(type),
      text: this.generateSceneText(type, state),
      choices: this.generateChoices(type, state),
      environment: this.generateEnvironment(type, state),
    };
  }

  private generateSceneTitle(type: NarrativeSceneType): string {
    const titles: Record<string, string[]> = {
      [NarrativeSceneType.DIALOGUE]: ['对话', '交流', '谈判'],
      [NarrativeSceneType.EXPLORATION]: ['探索', '发现', '搜寻'],
      [NarrativeSceneType.COMBAT]: ['战斗', '对决', '冲突'],
      [NarrativeSceneType.NEGOTIATION]: ['谈判', '交易', '协商'],
      [NarrativeSceneType.DILEMMA]: ['困境', '抉择', '两难'],
      [NarrativeSceneType.DISCOVERY]: ['发现', '秘密', '真相'],
      [NarrativeSceneType.DISASTER]: ['灾难', '危机', '考验'],
      [NarrativeSceneType.TRADE]: ['交易', '买卖', '交换'],
      [NarrativeSceneType.TRAINING]: ['训练', '学习', '提升'],
      [NarrativeSceneType.STORY]: ['故事', '剧情', '发展'],
    };
    const options = titles[type] ?? ['事件'];
    return options[this.rng.int(0, options.length - 1)];
  }

  private generateSceneText(_type: NarrativeSceneType, _state: GameState): string {
    return `你面临一个新的情况...`;
  }

  private generateChoices(_type: NarrativeSceneType, _state: GameState): NarrativeChoice[] {
    return [];
  }

  private generateEnvironment(_type: NarrativeSceneType, _state: GameState): string {
    return '周围的环境描述...';
  }
}

// ============================================================
// 五、辅助类型和接口
// ============================================================

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
