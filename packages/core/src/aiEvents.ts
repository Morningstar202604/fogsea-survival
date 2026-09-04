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
import { Rng } from './rng.js';

// ============================================================
// 一、事件类型定义
// ============================================================

/** 事件类别 */
export enum EventCategory {
  SURVIVAL = 'survival',
  SOCIAL = 'social',
  EXPLORATION = 'exploration',
  COMBAT = 'combat',
  ECONOMIC = 'economic',
  ENVIRONMENTAL = 'environmental',
  MYSTERIOUS = 'mysterious',
  DISASTER = 'disaster',
  OPPORTUNITY = 'opportunity',
  NARRATIVE = 'narrative',
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

// ============================================================
// 二、AI事件生成器核心类
// ============================================================

export class AIEventGenerator {
  private rng: Rng;
  private eventHistory: Map<string, number> = new Map();
  private lastEventDay: Map<string, number> = new Map();
  private worldState: WorldState;
  private eventTemplates: EventTemplate[];

  constructor(seed: number) {
    this.rng = new Rng(seed);
    this.worldState = this.initializeWorldState();
    this.eventTemplates = this.initializeEventTemplates();
  }

  /**
   * 生成随机事件
   */
  generateEvent(state: GameState, day: number): GameEvent | null {
    this.updateWorldState(state, day);
    const availableEvents = this.getAvailableEvents(state, day);

    if (availableEvents.length === 0) {
      return this.generateDynamicEvent(state, day);
    }

    const selectedEvent = this.selectEvent(availableEvents, state, day);
    this.recordEventTrigger(selectedEvent.id, day);
    return selectedEvent;
  }

  /**
   * 获取可用事件
   */
  private getAvailableEvents(state: GameState, day: number): GameEvent[] {
    const available: GameEvent[] = [];

    for (const event of this.eventTemplates) {
      if (this.isEventAvailable(event, state, day)) {
        available.push(event);
      }
    }

    return available;
  }

  /**
   * 检查事件是否可用
   */
  private isEventAvailable(event: GameEvent, state: GameState, day: number): boolean {
    if (day < event.minDay) return false;
    if (event.maxDay > 0 && day > event.maxDay) return false;

    const triggerCount = this.eventHistory.get(event.id) ?? 0;
    if (triggerCount >= event.maxTriggers) return false;

    const lastTriggerDay = this.lastEventDay.get(event.id) ?? -Infinity;
    if (day - lastTriggerDay < (event.cooldownDays ?? 0)) return false;

    for (const trigger of event.triggers) {
      if (!this.isTriggerMet(trigger, state, day)) {
        return false;
      }
    }

    return true;
  }

  /**
   * 检查触发条件是否满足
   */
  private isTriggerMet(trigger: EventTrigger, state: GameState, day: number): boolean {
    switch (trigger.type) {
      case 'time':
        if (trigger.day !== undefined && day !== trigger.day) return false;
        return true;

      case 'resource':
        if (trigger.resource) {
          const current = state.resources[trigger.resource].current;
          if (trigger.minAmount !== undefined && current < trigger.minAmount) return false;
          if (trigger.maxAmount !== undefined && current > trigger.maxAmount) return false;
        }
        return true;

      case 'flag':
        if (trigger.flag) {
          const flagValue = state.flags[trigger.flag];
          if (trigger.flagValue !== undefined && flagValue !== trigger.flagValue) return false;
          if (trigger.flagValue === undefined && !flagValue) return false;
        }
        return true;

      case 'attribute':
        if (trigger.attribute) {
          const value = state.attributes[trigger.attribute as keyof typeof state.attributes] ?? 0;
          if (trigger.minValue !== undefined && value < trigger.minValue) return false;
        }
        return true;

      case 'level':
        if (trigger.minLevel !== undefined && state.level < trigger.minLevel) return false;
        return true;

      case 'random':
        if (trigger.probability !== undefined) {
          return this.rng.next() < trigger.probability;
        }
        return true;

      case 'chain':
        if (trigger.chainEventId) {
          const lastTrigger = this.lastEventDay.get(trigger.chainEventId);
          if (lastTrigger === undefined) return false;
          if (trigger.cooldownDays !== undefined && day - lastTrigger < trigger.cooldownDays) return false;
        }
        return true;

      default:
        return true;
    }
  }

  /**
   * 选择事件
   */
  private selectEvent(events: GameEvent[], state: GameState, _day: number): GameEvent {
    const weightedEvents = events.map(event => {
      let weight = event.weight;
      weight = this.adjustWeightByState(weight, event, state);
      weight = this.adjustWeightByHistory(weight, event);
      return { event, weight };
    });

    const totalWeight = weightedEvents.reduce((sum, e) => sum + e.weight, 0);
    let random = this.rng.int(1, totalWeight);

    for (const { event, weight } of weightedEvents) {
      random -= weight;
      if (random <= 0) {
        return event;
      }
    }

    return events[0];
  }

  /**
   * 根据玩家状态调整权重
   */
  private adjustWeightByState(weight: number, event: GameEvent, state: GameState): number {
    if (state.resources.health.current < 30) {
      if (event.category === EventCategory.SURVIVAL) weight *= 2;
      if (event.category === EventCategory.DISASTER) weight *= 1.5;
    }

    if (state.resources.sanity.current < 30) {
      if (event.category === EventCategory.MYSTERIOUS) weight *= 2;
      if (event.category === EventCategory.NARRATIVE) weight *= 1.5;
    }

    if (state.resources.food.current < 20 || state.resources.water.current < 20) {
      if (event.category === EventCategory.ECONOMIC) weight *= 2;
      if (event.category === EventCategory.SURVIVAL) weight *= 1.5;
    }

    if (state.attributes.strength > 15) {
      if (event.category === EventCategory.COMBAT) weight *= 1.5;
    }

    if (state.attributes.intelligence > 15) {
      if (event.category === EventCategory.EXPLORATION) weight *= 1.5;
      if (event.category === EventCategory.SOCIAL) weight *= 1.5;
    }

    return weight;
  }

  /**
   * 根据历史调整权重（避免重复）
   */
  private adjustWeightByHistory(weight: number, event: GameEvent): number {
    const triggerCount = this.eventHistory.get(event.id) ?? 0;
    
    if (triggerCount > 0) {
      weight *= Math.max(0.1, 1 - triggerCount * 0.1);
    }

    return weight;
  }

  /**
   * 生成动态事件
   */
  private generateDynamicEvent(state: GameState, day: number): GameEvent {
    const eventType = this.selectDynamicEventType(state);
    return this.createDynamicEvent(eventType, state, day);
  }

  /**
   * 选择动态事件类型
   */
  private selectDynamicEventType(state: GameState): EventCategory {
    const weights: Record<EventCategory, number> = {
      [EventCategory.SURVIVAL]: 20,
      [EventCategory.SOCIAL]: 15,
      [EventCategory.EXPLORATION]: 20,
      [EventCategory.COMBAT]: 10,
      [EventCategory.ECONOMIC]: 15,
      [EventCategory.ENVIRONMENTAL]: 10,
      [EventCategory.MYSTERIOUS]: 5,
      [EventCategory.DISASTER]: 5,
      [EventCategory.OPPORTUNITY]: 10,
      [EventCategory.NARRATIVE]: 5,
    };

    if (state.resources.health.current < 30) weights[EventCategory.SURVIVAL] += 20;
    if (state.resources.sanity.current < 30) weights[EventCategory.MYSTERIOUS] += 15;
    if (state.attributes.strength > 15) weights[EventCategory.COMBAT] += 10;
    if (state.attributes.intelligence > 15) weights[EventCategory.EXPLORATION] += 10;

    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    let random = this.rng.int(1, totalWeight);

    for (const [category, weight] of Object.entries(weights)) {
      random -= weight;
      if (random <= 0) {
        return category as EventCategory;
      }
    }

    return EventCategory.SURVIVAL;
  }

  /**
   * 创建动态事件
   */
  private createDynamicEvent(type: EventCategory, state: GameState, day: number): GameEvent {
    const eventId = `dynamic_${type}_${day}_${this.rng.int(1, 1000)}`;

    switch (type) {
      case EventCategory.SURVIVAL:
        return this.createSurvivalEvent(eventId, state);
      case EventCategory.SOCIAL:
        return this.createSocialEvent(eventId, state);
      case EventCategory.EXPLORATION:
        return this.createExplorationEvent(eventId, state);
      case EventCategory.COMBAT:
        return this.createCombatEvent(eventId, state);
      case EventCategory.ECONOMIC:
        return this.createEconomicEvent(eventId, state);
      case EventCategory.ENVIRONMENTAL:
        return this.createEnvironmentalEvent(eventId, state);
      case EventCategory.MYSTERIOUS:
        return this.createMysteriousEvent(eventId, state);
      case EventCategory.DISASTER:
        return this.createDisasterEvent(eventId, state);
      case EventCategory.OPPORTUNITY:
        return this.createOpportunityEvent(eventId, state);
      case EventCategory.NARRATIVE:
        return this.createNarrativeEvent(eventId, state);
      default:
        return this.createSurvivalEvent(eventId, state);
    }
  }

  // ============================================================
  // 三、事件创建器
  // ============================================================

  private createSurvivalEvent(id: string, state: GameState): GameEvent {
    const scenarios = [
      {
        title: '食物短缺',
        description: '你的食物储备即将耗尽，必须想办法找到新的食物来源。',
        options: [
          {
            id: 'hunt',
            text: '狩猎',
            description: '尝试捕捉迷雾中的小动物。',
            successChance: 40 + state.attributes.agility * 2,
            successImpacts: [
              { type: 'resource' as const, resource: 'food' as ResourceKey, amount: 15 },
            ],
            failureImpacts: [
              { type: 'resource' as const, resource: 'energy' as ResourceKey, amount: -10 },
            ],
            costs: [{ type: 'energy' as const, amount: 15 }],
            attributeBonuses: { agility: 2, intelligence: 0, luck: 0 } as Record<string, number>,
          },
          {
            id: 'forage',
            text: '采集',
            description: '在周围寻找可食用的植物。',
            successChance: 50 + state.attributes.intelligence * 2,
            successImpacts: [
              { type: 'resource' as const, resource: 'food' as ResourceKey, amount: 10 },
            ],
            failureImpacts: [
              { type: 'resource' as const, resource: 'health' as ResourceKey, amount: -5 },
            ],
            costs: [{ type: 'energy' as const, amount: 10 }],
            attributeBonuses: { intelligence: 2, agility: 0, luck: 0 } as Record<string, number>,
          },
          {
            id: 'scavenge',
            text: '搜寻废墟',
            description: '在附近的废墟中寻找食物。',
            successChance: 35 + state.attributes.luck * 2,
            successImpacts: [
              { type: 'resource' as const, resource: 'food' as ResourceKey, amount: 20 },
              { type: 'item' as const, itemId: 'canned_food', amount: 2 },
            ],
            failureImpacts: [
              { type: 'resource' as const, resource: 'energy' as ResourceKey, amount: -15 },
              { type: 'resource' as const, resource: 'health' as ResourceKey, amount: -5 },
            ],
            costs: [{ type: 'energy' as const, amount: 20 }],
            attributeBonuses: { agility: 1, intelligence: 1, luck: 0 } as Record<string, number>,
          },
        ],
      },
      {
        title: '水源危机',
        description: '你的水源枯竭了，脱水的威胁迫在眉睫。',
        options: [
          {
            id: 'find_water',
            text: '寻找水源',
            description: '在迷雾中寻找干净的水源。',
            successChance: 45 + state.attributes.agility * 2,
            successImpacts: [
              { type: 'resource' as const, resource: 'water' as ResourceKey, amount: 25 },
            ],
            failureImpacts: [
              { type: 'resource' as const, resource: 'energy' as ResourceKey, amount: -10 },
              { type: 'resource' as const, resource: 'health' as ResourceKey, amount: -5 },
            ],
            costs: [{ type: 'energy' as const, amount: 15 }],
            attributeBonuses: { agility: 2, intelligence: 0, luck: 0 } as Record<string, number>,
          },
          {
            id: 'collect_dew',
            text: '收集露水',
            description: '清晨收集植物上的露水。',
            successChance: 60 + state.attributes.intelligence * 2,
            successImpacts: [
              { type: 'resource' as const, resource: 'water' as ResourceKey, amount: 10 },
            ],
            failureImpacts: [
              { type: 'resource' as const, resource: 'energy' as ResourceKey, amount: -5 },
            ],
            costs: [{ type: 'energy' as const, amount: 8 }],
            attributeBonuses: { intelligence: 1, agility: 0, luck: 0 } as Record<string, number>,
          },
          {
            id: 'purify_water',
            text: '净化水源',
            description: '尝试净化可疑的水源。',
            successChance: 55 + state.attributes.intelligence * 2,
            successImpacts: [
              { type: 'resource' as const, resource: 'water' as ResourceKey, amount: 20 },
            ],
            failureImpacts: [
              { type: 'resource' as const, resource: 'health' as ResourceKey, amount: -15 },
              { type: 'status' as const, status: 'poisoned' },
            ],
            costs: [{ type: 'energy' as const, amount: 12 }],
            attributeBonuses: { intelligence: 3, agility: 0, luck: 0 } as Record<string, number>,
          },
        ],
      },
    ];

    const scenario = scenarios[this.rng.int(0, scenarios.length - 1)];

    return {
      id,
      category: EventCategory.SURVIVAL,
      title: scenario.title,
      description: scenario.description,
      triggers: [],
      options: scenario.options,
      background: '迷雾中的生存从来都不容易。',
      priority: 10,
      weight: 20,
      minDay: 1,
      maxDay: 0,
      maxTriggers: 5,
      repeatable: true,
      cooldownDays: 2,
    };
  }

  private createSocialEvent(id: string, _state: GameState): GameEvent {
    return {
      id,
      category: EventCategory.SOCIAL,
      title: '幸存者相遇',
      description: '你在迷雾中遇到了另一个幸存者。',
      triggers: [],
      options: [
        {
          id: 'help',
          text: '帮助他',
          description: '分享你的资源帮助他。',
          successChance: 80,
          successImpacts: [
            { type: 'flag' as const, flag: 'helped_survivor', flagValue: true },
            { type: 'reputation' as const, reputationChange: 10 },
          ],
          failureImpacts: [
            { type: 'resource' as const, resource: 'food' as ResourceKey, amount: -10 },
          ],
          costs: [{ type: 'resource' as const, resource: 'food' as ResourceKey, amount: 5 }],
        },
        {
          id: 'trade',
          text: '交易',
          description: '与他交换资源。',
          successChance: 70,
          successImpacts: [
            { type: 'resource' as const, resource: 'food' as ResourceKey, amount: 10 },
            { type: 'item' as const, itemId: 'random_item', amount: 1 },
          ],
          failureImpacts: [
            { type: 'resource' as const, resource: 'food' as ResourceKey, amount: -5 },
          ],
          costs: [{ type: 'resource' as const, resource: 'food' as ResourceKey, amount: 3 }],
        },
        {
          id: 'ignore',
          text: '无视他',
          description: '继续你的旅程。',
          successChance: 100,
          successImpacts: [],
          failureImpacts: [],
          costs: [],
        },
      ],
      background: '在绝望的世界里，人与人之间的相遇充满了可能性。',
      priority: 8,
      weight: 15,
      minDay: 3,
      maxDay: 0,
      maxTriggers: 4,
      repeatable: true,
      cooldownDays: 3,
    };
  }

  private createExplorationEvent(id: string, _state: GameState): GameEvent {
    return {
      id,
      category: EventCategory.EXPLORATION,
      title: '废弃建筑',
      description: '你发现了一座废弃的建筑，里面可能有有用的物资。',
      triggers: [],
      options: [
        {
          id: 'explore_inside',
          text: '进入探索',
          description: '小心地进入建筑内部。',
          successChance: 50,
          successImpacts: [
            { type: 'item' as const, itemId: 'iron_sword', amount: 1 },
            { type: 'resource' as const, resource: 'food' as ResourceKey, amount: 15 },
          ],
          failureImpacts: [
            { type: 'resource' as const, resource: 'health' as ResourceKey, amount: -15 },
          ],
          costs: [{ type: 'energy' as const, amount: 20 }],
          attributeBonuses: { agility: 2, intelligence: 0, luck: 1 } as Record<string, number>,
        },
        {
          id: 'scout_outside',
          text: '外部侦察',
          description: '先观察建筑外部。',
          successChance: 70,
          successImpacts: [
            { type: 'flag' as const, flag: 'scouted_building', flagValue: true },
            { type: 'resource' as const, resource: 'food' as ResourceKey, amount: 5 },
          ],
          failureImpacts: [],
          costs: [{ type: 'energy' as const, amount: 10 }],
          attributeBonuses: { intelligence: 2, agility: 0, luck: 0 } as Record<string, number>,
        },
      ],
      background: '迷雾中隐藏着无数的秘密。',
      priority: 7,
      weight: 20,
      minDay: 2,
      maxDay: 0,
      maxTriggers: 6,
      repeatable: true,
      cooldownDays: 1,
    };
  }

  private createCombatEvent(id: string, state: GameState): GameEvent {
    const monsterTypes = ['野狼', '变异犬', '迷雾兽', '影子狼', '水晶魔像'];
    const monster = monsterTypes[this.rng.int(0, monsterTypes.length - 1)];

    return {
      id,
      category: EventCategory.COMBAT,
      title: `遭遇${monster}`,
      description: `一只${monster}从迷雾中冲出，向你发起攻击！`,
      triggers: [],
      options: [
        {
          id: 'fight',
          text: '战斗',
          description: '与怪物正面对决。',
          successChance: 40 + state.attributes.strength * 2 + state.attributes.agility,
          successImpacts: [
            { type: 'resource' as const, resource: 'food' as ResourceKey, amount: 15 },
            { type: 'item' as const, itemId: 'monster_part', amount: 2 },
            { type: 'flag' as const, flag: `killed_${monster}`, flagValue: true },
          ],
          failureImpacts: [
            { type: 'resource' as const, resource: 'health' as ResourceKey, amount: -25 },
          ],
          costs: [{ type: 'energy' as const, amount: 20 }],
          attributeBonuses: { strength: 3, agility: 2, intelligence: 0, luck: 0 } as Record<string, number>,
        },
        {
          id: 'flee',
          text: '逃跑',
          description: '尝试逃脱战斗。',
          successChance: 50 + state.attributes.agility * 3,
          successImpacts: [
            { type: 'resource' as const, resource: 'energy' as ResourceKey, amount: -10 },
          ],
          failureImpacts: [
            { type: 'resource' as const, resource: 'health' as ResourceKey, amount: -15 },
          ],
          costs: [{ type: 'energy' as const, amount: 15 }],
          attributeBonuses: { agility: 3, intelligence: 0, luck: 0 } as Record<string, number>,
        },
      ],
      background: '迷雾中的生物充满了攻击性。',
      priority: 9,
      weight: 15,
      minDay: 1,
      maxDay: 0,
      maxTriggers: 8,
      repeatable: true,
      cooldownDays: 1,
    };
  }

  private createEconomicEvent(id: string, _state: GameState): GameEvent {
    return {
      id,
      category: EventCategory.ECONOMIC,
      title: '贸易机会',
      description: '你发现了一个贸易机会。',
      triggers: [],
      options: [
        {
          id: 'buy_low',
          text: '低价买入',
          description: '以低价购买资源。',
          successChance: 70,
          successImpacts: [
            { type: 'resource' as const, resource: 'food' as ResourceKey, amount: 30 },
          ],
          failureImpacts: [
            { type: 'resource' as const, resource: 'food' as ResourceKey, amount: -10 },
          ],
          costs: [{ type: 'item' as const, itemId: 'scrap_metal', amount: 5 }],
          attributeBonuses: { intelligence: 2, agility: 0, luck: 0 } as Record<string, number>,
        },
      ],
      background: '在末世中，贸易是生存的重要手段。',
      priority: 6,
      weight: 15,
      minDay: 5,
      maxDay: 0,
      maxTriggers: 4,
      repeatable: true,
      cooldownDays: 2,
    };
  }

  private createEnvironmentalEvent(id: string, _state: GameState): GameEvent {
    return {
      id,
      category: EventCategory.ENVIRONMENTAL,
      title: '天气变化',
      description: '天气突然发生了变化。',
      triggers: [],
      options: [
        {
          id: 'find_shelter',
          text: '寻找庇护',
          description: '找到一个安全的地方躲避。',
          successChance: 60,
          successImpacts: [
            { type: 'resource' as const, resource: 'sanity' as ResourceKey, amount: 10 },
          ],
          failureImpacts: [
            { type: 'resource' as const, resource: 'health' as ResourceKey, amount: -10 },
          ],
          costs: [{ type: 'energy' as const, amount: 15 }],
          attributeBonuses: { agility: 2, intelligence: 0, luck: 0 } as Record<string, number>,
        },
      ],
      background: '迷雾中的天气变化无常。',
      priority: 5,
      weight: 10,
      minDay: 1,
      maxDay: 0,
      maxTriggers: 6,
      repeatable: true,
      cooldownDays: 1,
    };
  }

  private createMysteriousEvent(id: string, _state: GameState): GameEvent {
    return {
      id,
      category: EventCategory.MYSTERIOUS,
      title: '神秘现象',
      description: '你遇到了一个无法解释的现象。',
      triggers: [],
      options: [
        {
          id: 'investigate',
          text: '调查',
          description: '仔细研究这个现象。',
          successChance: 40,
          successImpacts: [
            { type: 'flag' as const, flag: 'solved_mystery', flagValue: true },
            { type: 'item' as const, itemId: 'ancient_artifact', amount: 1 },
            { type: 'resource' as const, resource: 'sanity' as ResourceKey, amount: 20 },
          ],
          failureImpacts: [
            { type: 'resource' as const, resource: 'sanity' as ResourceKey, amount: -25 },
          ],
          costs: [{ type: 'sanity' as const, amount: 15 }],
          attributeBonuses: { intelligence: 4, agility: 0, luck: 0 } as Record<string, number>,
        },
      ],
      background: '迷雾中充满了未知的神秘力量。',
      priority: 4,
      weight: 8,
      minDay: 10,
      maxDay: 0,
      maxTriggers: 3,
      repeatable: true,
      cooldownDays: 5,
    };
  }

  private createDisasterEvent(id: string, _state: GameState): GameEvent {
    return {
      id,
      category: EventCategory.DISASTER,
      title: '灾难降临',
      description: '一场灾难即将降临！',
      triggers: [],
      options: [
        {
          id: 'prepare',
          text: '准备应对',
          description: '尽你所能准备应对灾难。',
          successChance: 50,
          successImpacts: [
            { type: 'resource' as const, resource: 'health' as ResourceKey, amount: -10 },
            { type: 'flag' as const, flag: 'survived_disaster', flagValue: true },
          ],
          failureImpacts: [
            { type: 'resource' as const, resource: 'health' as ResourceKey, amount: -30 },
            { type: 'resource' as const, resource: 'sanity' as ResourceKey, amount: -20 },
          ],
          costs: [{ type: 'energy' as const, amount: 25 }],
          attributeBonuses: { strength: 2, intelligence: 2, agility: 0, luck: 0 } as Record<string, number>,
        },
      ],
      background: '迷雾中的灾难往往来得突然。',
      priority: 10,
      weight: 5,
      minDay: 7,
      maxDay: 0,
      maxTriggers: 2,
      repeatable: true,
      cooldownDays: 10,
    };
  }

  private createOpportunityEvent(id: string, _state: GameState): GameEvent {
    return {
      id,
      category: EventCategory.OPPORTUNITY,
      title: '难得的机会',
      description: '你遇到了一个难得的机会。',
      triggers: [],
      options: [
        {
          id: 'seize_opportunity',
          text: '抓住机会',
          description: '全力以赴抓住这个机会。',
          successChance: 50,
          successImpacts: [
            { type: 'resource' as const, resource: 'food' as ResourceKey, amount: 30 },
            { type: 'resource' as const, resource: 'water' as ResourceKey, amount: 25 },
            { type: 'flag' as const, flag: 'seized_opportunity', flagValue: true },
          ],
          failureImpacts: [
            { type: 'resource' as const, resource: 'energy' as ResourceKey, amount: -20 },
            { type: 'resource' as const, resource: 'health' as ResourceKey, amount: -10 },
          ],
          costs: [{ type: 'energy' as const, amount: 20 }],
          attributeBonuses: { luck: 2, intelligence: 1, agility: 0 } as Record<string, number>,
        },
      ],
      background: '机会总是留给有准备的人。',
      priority: 6,
      weight: 10,
      minDay: 5,
      maxDay: 0,
      maxTriggers: 3,
      repeatable: true,
      cooldownDays: 7,
    };
  }

  private createNarrativeEvent(id: string, _state: GameState): GameEvent {
    return {
      id,
      category: EventCategory.NARRATIVE,
      title: '故事发展',
      description: '一个新的故事线展开了。',
      triggers: [],
      options: [
        {
          id: 'engage_story',
          text: '参与故事',
          description: '投入这个新的故事。',
          successChance: 70,
          successImpacts: [
            { type: 'flag' as const, flag: 'new_story_started', flagValue: true },
            { type: 'resource' as const, resource: 'sanity' as ResourceKey, amount: 15 },
          ],
          failureImpacts: [
            { type: 'resource' as const, resource: 'sanity' as ResourceKey, amount: -10 },
          ],
          costs: [{ type: 'energy' as const, amount: 10 }],
          attributeBonuses: { intelligence: 2, agility: 0, luck: 0 } as Record<string, number>,
        },
      ],
      background: '每个人的故事都在继续。',
      priority: 3,
      weight: 5,
      minDay: 1,
      maxDay: 0,
      maxTriggers: 5,
      repeatable: true,
      cooldownDays: 3,
    };
  }

  // ============================================================
  // 四、世界状态管理
  // ============================================================

  private initializeWorldState(): WorldState {
    return {
      temperature: 20,
      humidity: 60,
      dangerLevel: 1,
      resourceAvailability: 1,
      npcPresence: 0.5,
      anomalyCount: 0,
      dayPhase: 'morning',
    };
  }

  private updateWorldState(_state: GameState, day: number): void {
    this.worldState.dangerLevel = Math.min(10, 1 + day * 0.1);
    this.worldState.resourceAvailability = Math.max(0.3, 1 - day * 0.01);
    this.worldState.anomalyCount = Math.floor(day / 10);
  }

  private recordEventTrigger(eventId: string, day: number): void {
    const count = this.eventHistory.get(eventId) ?? 0;
    this.eventHistory.set(eventId, count + 1);
    this.lastEventDay.set(eventId, day);
  }

  // ============================================================
  // 五、事件模板初始化
  // ============================================================

  private initializeEventTemplates(): EventTemplate[] {
    return [];
  }
}

// ============================================================
// 六、辅助类型
// ============================================================

interface WorldState {
  temperature: number;
  humidity: number;
  dangerLevel: number;
  resourceAvailability: number;
  npcPresence: number;
  anomalyCount: number;
  dayPhase: string;
}

interface EventTemplate {
  id: string;
  category: EventCategory;
  title: string;
  description: string;
  triggers: EventTrigger[];
  options: EventOption[];
  priority: number;
  weight: number;
  minDay: number;
  maxDay: number;
  maxTriggers: number;
}
