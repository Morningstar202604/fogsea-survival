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
import { Rng } from './rng.js';
// ============================================================
// 一、事件类型定义
// ============================================================
/** 事件类别 */
export var EventCategory;
(function (EventCategory) {
    EventCategory["SURVIVAL"] = "survival";
    EventCategory["SOCIAL"] = "social";
    EventCategory["EXPLORATION"] = "exploration";
    EventCategory["COMBAT"] = "combat";
    EventCategory["ECONOMIC"] = "economic";
    EventCategory["ENVIRONMENTAL"] = "environmental";
    EventCategory["MYSTERIOUS"] = "mysterious";
    EventCategory["DISASTER"] = "disaster";
    EventCategory["OPPORTUNITY"] = "opportunity";
    EventCategory["NARRATIVE"] = "narrative";
})(EventCategory || (EventCategory = {}));
// ============================================================
// 二、AI事件生成器核心类
// ============================================================
export class AIEventGenerator {
    rng;
    eventHistory = new Map();
    lastEventDay = new Map();
    worldState;
    eventTemplates;
    constructor(seed) {
        this.rng = new Rng(seed);
        this.worldState = this.initializeWorldState();
        this.eventTemplates = this.initializeEventTemplates();
    }
    /**
     * 生成随机事件
     */
    generateEvent(state, day) {
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
    getAvailableEvents(state, day) {
        const available = [];
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
    isEventAvailable(event, state, day) {
        if (day < event.minDay)
            return false;
        if (event.maxDay > 0 && day > event.maxDay)
            return false;
        const triggerCount = this.eventHistory.get(event.id) ?? 0;
        if (triggerCount >= event.maxTriggers)
            return false;
        const lastTriggerDay = this.lastEventDay.get(event.id) ?? -Infinity;
        if (day - lastTriggerDay < (event.cooldownDays ?? 0))
            return false;
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
    isTriggerMet(trigger, state, day) {
        switch (trigger.type) {
            case 'time':
                if (trigger.day !== undefined && day !== trigger.day)
                    return false;
                return true;
            case 'resource':
                if (trigger.resource) {
                    const current = state.resources[trigger.resource].current;
                    if (trigger.minAmount !== undefined && current < trigger.minAmount)
                        return false;
                    if (trigger.maxAmount !== undefined && current > trigger.maxAmount)
                        return false;
                }
                return true;
            case 'flag':
                if (trigger.flag) {
                    const flagValue = state.flags[trigger.flag];
                    if (trigger.flagValue !== undefined && flagValue !== trigger.flagValue)
                        return false;
                    if (trigger.flagValue === undefined && !flagValue)
                        return false;
                }
                return true;
            case 'attribute':
                if (trigger.attribute) {
                    const value = state.attributes[trigger.attribute] ?? 0;
                    if (trigger.minValue !== undefined && value < trigger.minValue)
                        return false;
                }
                return true;
            case 'level':
                if (trigger.minLevel !== undefined && state.level < trigger.minLevel)
                    return false;
                return true;
            case 'random':
                if (trigger.probability !== undefined) {
                    return this.rng.next() < trigger.probability;
                }
                return true;
            case 'chain':
                if (trigger.chainEventId) {
                    const lastTrigger = this.lastEventDay.get(trigger.chainEventId);
                    if (lastTrigger === undefined)
                        return false;
                    if (trigger.cooldownDays !== undefined && day - lastTrigger < trigger.cooldownDays)
                        return false;
                }
                return true;
            default:
                return true;
        }
    }
    /**
     * 选择事件
     */
    selectEvent(events, state, _day) {
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
    adjustWeightByState(weight, event, state) {
        if (state.resources.health.current < 30) {
            if (event.category === EventCategory.SURVIVAL)
                weight *= 2;
            if (event.category === EventCategory.DISASTER)
                weight *= 1.5;
        }
        if (state.resources.sanity.current < 30) {
            if (event.category === EventCategory.MYSTERIOUS)
                weight *= 2;
            if (event.category === EventCategory.NARRATIVE)
                weight *= 1.5;
        }
        if (state.resources.food.current < 20 || state.resources.water.current < 20) {
            if (event.category === EventCategory.ECONOMIC)
                weight *= 2;
            if (event.category === EventCategory.SURVIVAL)
                weight *= 1.5;
        }
        if (state.attributes.strength > 15) {
            if (event.category === EventCategory.COMBAT)
                weight *= 1.5;
        }
        if (state.attributes.intelligence > 15) {
            if (event.category === EventCategory.EXPLORATION)
                weight *= 1.5;
            if (event.category === EventCategory.SOCIAL)
                weight *= 1.5;
        }
        return weight;
    }
    /**
     * 根据历史调整权重（避免重复）
     */
    adjustWeightByHistory(weight, event) {
        const triggerCount = this.eventHistory.get(event.id) ?? 0;
        if (triggerCount > 0) {
            weight *= Math.max(0.1, 1 - triggerCount * 0.1);
        }
        return weight;
    }
    /**
     * 生成动态事件
     */
    generateDynamicEvent(state, day) {
        const eventType = this.selectDynamicEventType(state);
        return this.createDynamicEvent(eventType, state, day);
    }
    /**
     * 选择动态事件类型
     */
    selectDynamicEventType(state) {
        const weights = {
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
        if (state.resources.health.current < 30)
            weights[EventCategory.SURVIVAL] += 20;
        if (state.resources.sanity.current < 30)
            weights[EventCategory.MYSTERIOUS] += 15;
        if (state.attributes.strength > 15)
            weights[EventCategory.COMBAT] += 10;
        if (state.attributes.intelligence > 15)
            weights[EventCategory.EXPLORATION] += 10;
        const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
        let random = this.rng.int(1, totalWeight);
        for (const [category, weight] of Object.entries(weights)) {
            random -= weight;
            if (random <= 0) {
                return category;
            }
        }
        return EventCategory.SURVIVAL;
    }
    /**
     * 创建动态事件
     */
    createDynamicEvent(type, state, day) {
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
    createSurvivalEvent(id, state) {
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
                            { type: 'resource', resource: 'food', amount: 15 },
                        ],
                        failureImpacts: [
                            { type: 'resource', resource: 'energy', amount: -10 },
                        ],
                        costs: [{ type: 'energy', amount: 15 }],
                        attributeBonuses: { agility: 2, intelligence: 0, luck: 0 },
                    },
                    {
                        id: 'forage',
                        text: '采集',
                        description: '在周围寻找可食用的植物。',
                        successChance: 50 + state.attributes.intelligence * 2,
                        successImpacts: [
                            { type: 'resource', resource: 'food', amount: 10 },
                        ],
                        failureImpacts: [
                            { type: 'resource', resource: 'health', amount: -5 },
                        ],
                        costs: [{ type: 'energy', amount: 10 }],
                        attributeBonuses: { intelligence: 2, agility: 0, luck: 0 },
                    },
                    {
                        id: 'scavenge',
                        text: '搜寻废墟',
                        description: '在附近的废墟中寻找食物。',
                        successChance: 35 + state.attributes.luck * 2,
                        successImpacts: [
                            { type: 'resource', resource: 'food', amount: 20 },
                            { type: 'item', itemId: 'canned_food', amount: 2 },
                        ],
                        failureImpacts: [
                            { type: 'resource', resource: 'energy', amount: -15 },
                            { type: 'resource', resource: 'health', amount: -5 },
                        ],
                        costs: [{ type: 'energy', amount: 20 }],
                        attributeBonuses: { agility: 1, intelligence: 1, luck: 0 },
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
                            { type: 'resource', resource: 'water', amount: 25 },
                        ],
                        failureImpacts: [
                            { type: 'resource', resource: 'energy', amount: -10 },
                            { type: 'resource', resource: 'health', amount: -5 },
                        ],
                        costs: [{ type: 'energy', amount: 15 }],
                        attributeBonuses: { agility: 2, intelligence: 0, luck: 0 },
                    },
                    {
                        id: 'collect_dew',
                        text: '收集露水',
                        description: '清晨收集植物上的露水。',
                        successChance: 60 + state.attributes.intelligence * 2,
                        successImpacts: [
                            { type: 'resource', resource: 'water', amount: 10 },
                        ],
                        failureImpacts: [
                            { type: 'resource', resource: 'energy', amount: -5 },
                        ],
                        costs: [{ type: 'energy', amount: 8 }],
                        attributeBonuses: { intelligence: 1, agility: 0, luck: 0 },
                    },
                    {
                        id: 'purify_water',
                        text: '净化水源',
                        description: '尝试净化可疑的水源。',
                        successChance: 55 + state.attributes.intelligence * 2,
                        successImpacts: [
                            { type: 'resource', resource: 'water', amount: 20 },
                        ],
                        failureImpacts: [
                            { type: 'resource', resource: 'health', amount: -15 },
                            { type: 'status', status: 'poisoned' },
                        ],
                        costs: [{ type: 'energy', amount: 12 }],
                        attributeBonuses: { intelligence: 3, agility: 0, luck: 0 },
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
    createSocialEvent(id, _state) {
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
                        { type: 'flag', flag: 'helped_survivor', flagValue: true },
                        { type: 'reputation', reputationChange: 10 },
                    ],
                    failureImpacts: [
                        { type: 'resource', resource: 'food', amount: -10 },
                    ],
                    costs: [{ type: 'resource', resource: 'food', amount: 5 }],
                },
                {
                    id: 'trade',
                    text: '交易',
                    description: '与他交换资源。',
                    successChance: 70,
                    successImpacts: [
                        { type: 'resource', resource: 'food', amount: 10 },
                        { type: 'item', itemId: 'random_item', amount: 1 },
                    ],
                    failureImpacts: [
                        { type: 'resource', resource: 'food', amount: -5 },
                    ],
                    costs: [{ type: 'resource', resource: 'food', amount: 3 }],
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
    createExplorationEvent(id, _state) {
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
                        { type: 'item', itemId: 'iron_sword', amount: 1 },
                        { type: 'resource', resource: 'food', amount: 15 },
                    ],
                    failureImpacts: [
                        { type: 'resource', resource: 'health', amount: -15 },
                    ],
                    costs: [{ type: 'energy', amount: 20 }],
                    attributeBonuses: { agility: 2, intelligence: 0, luck: 1 },
                },
                {
                    id: 'scout_outside',
                    text: '外部侦察',
                    description: '先观察建筑外部。',
                    successChance: 70,
                    successImpacts: [
                        { type: 'flag', flag: 'scouted_building', flagValue: true },
                        { type: 'resource', resource: 'food', amount: 5 },
                    ],
                    failureImpacts: [],
                    costs: [{ type: 'energy', amount: 10 }],
                    attributeBonuses: { intelligence: 2, agility: 0, luck: 0 },
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
    createCombatEvent(id, state) {
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
                        { type: 'resource', resource: 'food', amount: 15 },
                        { type: 'item', itemId: 'monster_part', amount: 2 },
                        { type: 'flag', flag: `killed_${monster}`, flagValue: true },
                    ],
                    failureImpacts: [
                        { type: 'resource', resource: 'health', amount: -25 },
                    ],
                    costs: [{ type: 'energy', amount: 20 }],
                    attributeBonuses: { strength: 3, agility: 2, intelligence: 0, luck: 0 },
                },
                {
                    id: 'flee',
                    text: '逃跑',
                    description: '尝试逃脱战斗。',
                    successChance: 50 + state.attributes.agility * 3,
                    successImpacts: [
                        { type: 'resource', resource: 'energy', amount: -10 },
                    ],
                    failureImpacts: [
                        { type: 'resource', resource: 'health', amount: -15 },
                    ],
                    costs: [{ type: 'energy', amount: 15 }],
                    attributeBonuses: { agility: 3, intelligence: 0, luck: 0 },
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
    createEconomicEvent(id, _state) {
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
                        { type: 'resource', resource: 'food', amount: 30 },
                    ],
                    failureImpacts: [
                        { type: 'resource', resource: 'food', amount: -10 },
                    ],
                    costs: [{ type: 'item', itemId: 'scrap_metal', amount: 5 }],
                    attributeBonuses: { intelligence: 2, agility: 0, luck: 0 },
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
    createEnvironmentalEvent(id, _state) {
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
                        { type: 'resource', resource: 'sanity', amount: 10 },
                    ],
                    failureImpacts: [
                        { type: 'resource', resource: 'health', amount: -10 },
                    ],
                    costs: [{ type: 'energy', amount: 15 }],
                    attributeBonuses: { agility: 2, intelligence: 0, luck: 0 },
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
    createMysteriousEvent(id, _state) {
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
                        { type: 'flag', flag: 'solved_mystery', flagValue: true },
                        { type: 'item', itemId: 'ancient_artifact', amount: 1 },
                        { type: 'resource', resource: 'sanity', amount: 20 },
                    ],
                    failureImpacts: [
                        { type: 'resource', resource: 'sanity', amount: -25 },
                    ],
                    costs: [{ type: 'sanity', amount: 15 }],
                    attributeBonuses: { intelligence: 4, agility: 0, luck: 0 },
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
    createDisasterEvent(id, _state) {
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
                        { type: 'resource', resource: 'health', amount: -10 },
                        { type: 'flag', flag: 'survived_disaster', flagValue: true },
                    ],
                    failureImpacts: [
                        { type: 'resource', resource: 'health', amount: -30 },
                        { type: 'resource', resource: 'sanity', amount: -20 },
                    ],
                    costs: [{ type: 'energy', amount: 25 }],
                    attributeBonuses: { strength: 2, intelligence: 2, agility: 0, luck: 0 },
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
    createOpportunityEvent(id, _state) {
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
                        { type: 'resource', resource: 'food', amount: 30 },
                        { type: 'resource', resource: 'water', amount: 25 },
                        { type: 'flag', flag: 'seized_opportunity', flagValue: true },
                    ],
                    failureImpacts: [
                        { type: 'resource', resource: 'energy', amount: -20 },
                        { type: 'resource', resource: 'health', amount: -10 },
                    ],
                    costs: [{ type: 'energy', amount: 20 }],
                    attributeBonuses: { luck: 2, intelligence: 1, agility: 0 },
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
    createNarrativeEvent(id, _state) {
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
                        { type: 'flag', flag: 'new_story_started', flagValue: true },
                        { type: 'resource', resource: 'sanity', amount: 15 },
                    ],
                    failureImpacts: [
                        { type: 'resource', resource: 'sanity', amount: -10 },
                    ],
                    costs: [{ type: 'energy', amount: 10 }],
                    attributeBonuses: { intelligence: 2, agility: 0, luck: 0 },
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
    initializeWorldState() {
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
    updateWorldState(_state, day) {
        this.worldState.dangerLevel = Math.min(10, 1 + day * 0.1);
        this.worldState.resourceAvailability = Math.max(0.3, 1 - day * 0.01);
        this.worldState.anomalyCount = Math.floor(day / 10);
    }
    recordEventTrigger(eventId, day) {
        const count = this.eventHistory.get(eventId) ?? 0;
        this.eventHistory.set(eventId, count + 1);
        this.lastEventDay.set(eventId, day);
    }
    // ============================================================
    // 五、事件模板初始化
    // ============================================================
    initializeEventTemplates() {
        return [];
    }
}
//# sourceMappingURL=aiEvents.js.map