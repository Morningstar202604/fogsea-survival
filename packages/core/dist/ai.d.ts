/**
 * AI引擎系统 - 模拟智能NPC
 *
 * 核心功能：
 * - NPC行为树
 * - 动态决策
 * - 学习与适应
 * - 情感模拟
 */
import type { GameState } from './types.js';
/** NPC类型 */
export declare enum NPCType {
    ALLY = "ally",
    NEUTRAL = "neutral",
    HOSTILE = "hostile",
    MERCHANT = "merchant",
    QUEST_GIVER = "quest_giver"
}
/** NPC状态 */
export declare enum NPCState {
    IDLE = "idle",
    TRADING = "trading",
    FIGHTING = "fighting",
    FLEEING = "fleeing",
    HELPING = "helping",
    PATROLLING = "patrolling"
}
/** NPC记忆 */
export interface NPCMemory {
    lastInteractionDay: number;
    trust: number;
    fear: number;
    gratitude: number;
    anger: number;
    events: string[];
}
/** NPC行为树节点 */
export interface BehaviorNode {
    type: 'condition' | 'action' | 'sequence' | 'selector' | 'decorator';
    name: string;
    evaluate?: (npc: SmartNPC, state: GameState) => boolean;
    execute?: (npc: SmartNPC, state: GameState) => string[];
    children?: BehaviorNode[];
}
/** 智能NPC */
export interface SmartNPC {
    id: string;
    name: string;
    type: NPCType;
    state: NPCState;
    level: number;
    health: number;
    maxHealth: number;
    attack: number;
    defense: number;
    personality: {
        aggressiveness: number;
        friendliness: number;
        intelligence: number;
        courage: number;
        greed: number;
    };
    memory: NPCMemory;
    behaviorTree: BehaviorNode;
    inventory: Record<string, number>;
    gold: number;
    quests: string[];
    relationships: Record<string, number>;
}
/** AI引擎 */
export declare class AIEngine {
    private npcs;
    private rng;
    constructor(seed: number);
    createNPC(id: string, name: string, type: NPCType, level?: number): SmartNPC;
    private generateBehaviorTree;
    private generateHostileBehaviorTree;
    private generateAllyBehaviorTree;
    private generateMerchantBehaviorTree;
    private generateNeutralBehaviorTree;
    updateNPC(npcId: string, state: GameState): string[];
    private executeBehaviorTree;
    interactNPC(npcId: string, action: 'talk' | 'trade' | 'attack' | 'help'): {
        success: boolean;
        messages: string[];
    };
    getAllNPCs(): SmartNPC[];
    getNPC(npcId: string): SmartNPC | undefined;
}
//# sourceMappingURL=ai.d.ts.map