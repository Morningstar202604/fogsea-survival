/**
 * AI引擎系统 - 模拟智能NPC
 *
 * 核心功能：
 * - NPC行为树
 * - 动态决策
 * - 学习与适应
 * - 情感模拟
 */
import { Rng } from './rng.js';
/** NPC类型 */
export var NPCType;
(function (NPCType) {
    NPCType["ALLY"] = "ally";
    NPCType["NEUTRAL"] = "neutral";
    NPCType["HOSTILE"] = "hostile";
    NPCType["MERCHANT"] = "merchant";
    NPCType["QUEST_GIVER"] = "quest_giver";
})(NPCType || (NPCType = {}));
/** NPC状态 */
export var NPCState;
(function (NPCState) {
    NPCState["IDLE"] = "idle";
    NPCState["TRADING"] = "trading";
    NPCState["FIGHTING"] = "fighting";
    NPCState["FLEEING"] = "fleeing";
    NPCState["HELPING"] = "helping";
    NPCState["PATROLLING"] = "patrolling";
})(NPCState || (NPCState = {}));
/** AI引擎 */
export class AIEngine {
    npcs;
    rng;
    constructor(seed) {
        this.npcs = new Map();
        this.rng = new Rng(seed);
    }
    createNPC(id, name, type, level = 1) {
        const personality = {
            aggressiveness: Math.floor(this.rng.next() * 100),
            friendliness: Math.floor(this.rng.next() * 100),
            intelligence: Math.floor(this.rng.next() * 100),
            courage: Math.floor(this.rng.next() * 100),
            greed: Math.floor(this.rng.next() * 100),
        };
        const npc = {
            id, name, type,
            state: NPCState.IDLE,
            level,
            health: 50 + level * 10,
            maxHealth: 50 + level * 10,
            attack: 10 + level * 2,
            defense: 5 + level,
            personality,
            memory: { lastInteractionDay: 0, trust: 0, fear: 0, gratitude: 0, anger: 0, events: [] },
            behaviorTree: this.generateBehaviorTree(type),
            inventory: {},
            gold: 100 * level,
            quests: [],
            relationships: {},
        };
        this.npcs.set(id, npc);
        return npc;
    }
    generateBehaviorTree(type) {
        const root = { type: 'selector', name: 'Root', children: [] };
        switch (type) {
            case NPCType.HOSTILE:
                root.children = this.generateHostileBehaviorTree();
                break;
            case NPCType.ALLY:
                root.children = this.generateAllyBehaviorTree();
                break;
            case NPCType.MERCHANT:
                root.children = this.generateMerchantBehaviorTree();
                break;
            default:
                root.children = this.generateNeutralBehaviorTree();
        }
        return root;
    }
    generateHostileBehaviorTree() {
        return [
            {
                type: 'sequence',
                name: '检测玩家威胁',
                children: [
                    {
                        type: 'condition',
                        name: '玩家是否在攻击范围内',
                        evaluate: (_npc, _state) => true,
                    },
                    {
                        type: 'action',
                        name: '攻击玩家',
                        execute: (npc, _state) => [`${npc.name} 向你发起了攻击！`],
                    },
                ],
            },
            {
                type: 'sequence',
                name: '逃跑',
                children: [
                    {
                        type: 'condition',
                        name: '生命值低于30%',
                        evaluate: (npc, _state) => npc.health < npc.maxHealth * 0.3,
                    },
                    {
                        type: 'action',
                        name: '逃跑',
                        execute: (npc, _state) => {
                            npc.state = NPCState.FLEEING;
                            return [`${npc.name} 因为生命值过低而逃跑！`];
                        },
                    },
                ],
            },
        ];
    }
    generateAllyBehaviorTree() {
        return [
            {
                type: 'sequence',
                name: '帮助玩家',
                children: [
                    {
                        type: 'condition',
                        name: '玩家需要帮助',
                        evaluate: (_npc, state) => state.resources.health.current < state.resources.health.max * 0.5,
                    },
                    {
                        type: 'action',
                        name: '治疗玩家',
                        execute: (npc, _state) => {
                            npc.state = NPCState.HELPING;
                            return [`${npc.name} 为你提供了治疗！`];
                        },
                    },
                ],
            },
            {
                type: 'sequence',
                name: '巡逻',
                children: [
                    {
                        type: 'condition',
                        name: '没有战斗',
                        evaluate: (_npc, state) => !state.combat,
                    },
                    {
                        type: 'action',
                        name: '巡逻基地',
                        execute: (npc, _state) => {
                            npc.state = NPCState.PATROLLING;
                            return [`${npc.name} 在基地周围巡逻。`];
                        },
                    },
                ],
            },
        ];
    }
    generateMerchantBehaviorTree() {
        return [
            {
                type: 'sequence',
                name: '等待顾客',
                children: [
                    {
                        type: 'condition',
                        name: '有顾客',
                        evaluate: (_npc, _state) => true,
                    },
                    {
                        type: 'action',
                        name: '展示商品',
                        execute: (npc, _state) => {
                            npc.state = NPCState.TRADING;
                            return [`${npc.name} 展示了他的商品。`];
                        },
                    },
                ],
            },
        ];
    }
    generateNeutralBehaviorTree() {
        return [
            {
                type: 'action',
                name: '闲逛',
                execute: (npc, _state) => [`${npc.name} 在周围闲逛。`],
            },
        ];
    }
    updateNPC(npcId, state) {
        const npc = this.npcs.get(npcId);
        if (!npc)
            return [];
        const messages = [];
        const day = state.day;
        if (day > npc.memory.lastInteractionDay) {
            npc.memory.lastInteractionDay = day;
        }
        const behaviorMessages = this.executeBehaviorTree(npc.behaviorTree, npc, state);
        messages.push(...behaviorMessages);
        if (npc.personality.aggressiveness > 70 && npc.type === NPCType.HOSTILE) {
            messages.push(`${npc.name} 变得更加具有攻击性！`);
        }
        if (npc.personality.friendliness > 70 && npc.type === NPCType.ALLY) {
            messages.push(`${npc.name} 友好地向你打招呼。`);
        }
        return messages;
    }
    executeBehaviorTree(node, npc, state) {
        const messages = [];
        switch (node.type) {
            case 'selector':
                for (const child of node.children ?? []) {
                    const childMessages = this.executeBehaviorTree(child, npc, state);
                    if (childMessages.length > 0) {
                        messages.push(...childMessages);
                        break;
                    }
                }
                break;
            case 'sequence':
                for (const child of node.children ?? []) {
                    const childMessages = this.executeBehaviorTree(child, npc, state);
                    if (childMessages.length === 0)
                        break;
                    messages.push(...childMessages);
                }
                break;
            case 'condition':
                if (node.evaluate && node.evaluate(npc, state)) {
                    messages.push(`条件满足: ${node.name}`);
                }
                break;
            case 'action':
                if (node.execute) {
                    const actionMessages = node.execute(npc, state);
                    messages.push(...actionMessages);
                }
                break;
        }
        return messages;
    }
    interactNPC(npcId, action) {
        const npc = this.npcs.get(npcId);
        if (!npc) {
            return { success: false, messages: ['NPC不存在'] };
        }
        const messages = [];
        let success = true;
        switch (action) {
            case 'talk':
                messages.push(`${npc.name}: "你好，幸存者。"`);
                npc.memory.trust += 5;
                break;
            case 'trade':
                if (npc.type === NPCType.MERCHANT) {
                    messages.push(`${npc.name}: "看看我的货物吧！"`);
                    npc.state = NPCState.TRADING;
                }
                else {
                    messages.push(`${npc.name}: "我不做生意。"`);
                    success = false;
                }
                break;
            case 'attack':
                messages.push(`你向 ${npc.name} 发起了攻击！`);
                npc.memory.anger += 20;
                npc.state = NPCState.FIGHTING;
                break;
            case 'help':
                if (npc.health < npc.maxHealth) {
                    npc.health = Math.min(npc.maxHealth, npc.health + 20);
                    messages.push(`你帮助了 ${npc.name}，恢复了20点生命值。`);
                    npc.memory.gratitude += 15;
                }
                else {
                    messages.push(`${npc.name}: "谢谢，我不需要帮助。"`);
                }
                break;
        }
        return { success, messages };
    }
    getAllNPCs() {
        return Array.from(this.npcs.values());
    }
    getNPC(npcId) {
        return this.npcs.get(npcId);
    }
}
//# sourceMappingURL=ai.js.map