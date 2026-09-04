/**
 * 战斗系统 v2.0
 *
 * 核心功能：
 * - 回合制战斗
 * - 怪物AI行为树
 * - 战利品掉落表
 * - 装备耐久度
 */
import type { GameState, CombatSession } from './types.js';
import { Rng } from './rng.js';
/** 怪物定义 */
export interface MonsterDef {
    id: string;
    name: string;
    description: string;
    level: number;
    hp: number;
    attack: number;
    defense: number;
    agility: number;
    lootTable: LootEntry[];
    xpReward: number;
    specialAbilities?: string[];
}
/** 战利品条目 */
export interface LootEntry {
    itemId: string;
    minCount: number;
    maxCount: number;
    dropChance: number;
    isRare?: boolean;
}
/** 战斗动作 */
export type CombatAction = 'attack' | 'defend' | 'use_item' | 'flee';
/** 战斗中使用的道具定义 */
export interface CombatItemEffect {
    healHp?: number;
    restoreResource?: {
        key: 'food' | 'water' | 'sanity' | 'energy' | 'warmth';
        amount: number;
    };
    buffAttack?: number;
    buffDefense?: number;
    buffAgility?: number;
}
/** 战斗可用品道具表 */
export declare const COMBAT_ITEM_EFFECTS: Record<string, CombatItemEffect>;
/** 战斗结果 */
export interface CombatResult {
    victory: boolean;
    playerHpRemaining: number;
    damageDealt: number;
    damageTaken: number;
    loot: Record<string, number>;
    xpGained: number;
    log: string[];
}
/** 怪物库 */
export declare const MONSTER_DATABASE: Record<string, MonsterDef>;
/**
 * 发起战斗
 */
export declare function initiateCombat(_state: GameState, monsterId: string): CombatSession;
/**
 * 执行战斗回合
 */
export declare function executeCombatRound(state: GameState, session: CombatSession, playerAction: CombatAction, rng: Rng): {
    session: CombatSession;
    ended: boolean;
    result?: CombatResult;
};
/**
 * 生成战利品
 */
export declare function generateLoot(monster: MonsterDef, playerLuck: number, rng: Rng): Record<string, number>;
/**
 * 获取可用怪物列表（基于当前天数/难度）
 */
export declare function getAvailableMonsters(day: number): MonsterDef[];
/**
 * 每日遭遇检定（v1.0 战斗接入主循环）：
 * 无事件日从第 3 天起按 15% + 世界等级×5% 概率遭遇野兽。
 * 命中则写入 state.combat 并返回遭遇播报；未命中返回 null。
 */
export declare function maybeStartEncounter(state: GameState, rng: Rng): string | null;
//# sourceMappingURL=combat.d.ts.map