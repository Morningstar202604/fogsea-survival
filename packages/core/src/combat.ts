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
import { rollD100 } from './dice.js';
import { Rng } from './rng.js';
import { calculateSkillBonuses } from './skills.js';

/** 怪物定义 */
export interface MonsterDef {
  id: string;
  name: string;
  description: string;
  level: number;
  hp: number;
  attack: number;
  defense: number;
  agility: number; // 闪避率基础值
  lootTable: LootEntry[];
  xpReward: number;
  specialAbilities?: string[];
}

/** 战利品条目 */
export interface LootEntry {
  itemId: string;
  minCount: number;
  maxCount: number;
  dropChance: number; // 0-1
  isRare?: boolean;
}

/** 战斗动作 */
export type CombatAction = 'attack' | 'defend' | 'use_item' | 'flee';

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
export const MONSTER_DATABASE: Record<string, MonsterDef> = {
  // 低级怪物（第1-7天）
  wild_dog: {
    id: 'wild_dog',
    name: '野狗',
    description: '被迷雾感染的变异野狗，眼中闪烁着红光',
    level: 1,
    hp: 30,
    attack: 15,
    defense: 5,
    agility: 20,
    lootTable: [
      { itemId: 'mutant_fang', minCount: 1, maxCount: 2, dropChance: 0.6 },
      { itemId: 'dog_meat', minCount: 1, maxCount: 3, dropChance: 0.8 },
      { itemId: 'fur', minCount: 1, maxCount: 2, dropChance: 0.5 },
    ],
    xpReward: 20,
  },
  mutated_rat: {
    id: 'mutated_rat',
    name: '变异鼠',
    description: '体型如猫般大小的老鼠，携带致命病菌',
    level: 1,
    hp: 20,
    attack: 10,
    defense: 3,
    agility: 30,
    lootTable: [
      { itemId: 'rat_tail', minCount: 1, maxCount: 1, dropChance: 0.7 },
      { itemId: 'herb', minCount: 1, maxCount: 2, dropChance: 0.4 },
    ],
    xpReward: 15,
  },
  
  // 中级怪物（第8-20天）
  shadow_wolf: {
    id: 'shadow_wolf',
    name: '影狼',
    description: '能在迷雾中隐身的狼型怪物，行动迅捷',
    level: 3,
    hp: 60,
    attack: 25,
    defense: 12,
    agility: 35,
    lootTable: [
      { itemId: 'shadow_claw', minCount: 1, maxCount: 2, dropChance: 0.5, isRare: true },
      { itemId: 'wolf_pelt', minCount: 1, maxCount: 2, dropChance: 0.7 },
      { itemId: 'meat', minCount: 2, maxCount: 4, dropChance: 0.9 },
    ],
    xpReward: 50,
    specialAbilities: ['stealth_attack'],
  },
  rock_golem: {
    id: 'rock_golem',
    name: '岩石傀儡',
    description: '由岩石和迷雾凝聚而成的元素生物',
    level: 4,
    hp: 120,
    attack: 30,
    defense: 25,
    agility: 5,
    lootTable: [
      { itemId: 'stone_core', minCount: 1, maxCount: 1, dropChance: 0.4, isRare: true },
      { itemId: 'stone', minCount: 10, maxCount: 20, dropChance: 1.0 },
      { itemId: 'metal', minCount: 3, maxCount: 8, dropChance: 0.6 },
    ],
    xpReward: 80,
  },
  
  // 高级怪物（第21-40天）
  fog_stalker: {
    id: 'fog_stalker',
    name: '迷雾追踪者',
    description: '迷雾中的顶级掠食者，拥有智慧',
    level: 6,
    hp: 150,
    attack: 45,
    defense: 20,
    agility: 40,
    lootTable: [
      { itemId: 'fog_essence', minCount: 1, maxCount: 2, dropChance: 0.3, isRare: true },
      { itemId: 'crystal_shard', minCount: 1, maxCount: 3, dropChance: 0.5 },
      { itemId: 'advanced_blueprint', minCount: 1, maxCount: 1, dropChance: 0.2, isRare: true },
    ],
    xpReward: 150,
    specialAbilities: ['fog_manipulation', 'pack_tactics'],
  },
  
  // BOSS级怪物
  beast_king: {
    id: 'beast_king',
    name: '兽王',
    description: '统领所有变异野兽的王者，体型如山',
    level: 10,
    hp: 500,
    attack: 80,
    defense: 40,
    agility: 25,
    lootTable: [
      { itemId: 'beast_king_core', minCount: 1, maxCount: 1, dropChance: 1.0, isRare: true },
      { itemId: 'legendary_material', minCount: 3, maxCount: 5, dropChance: 0.8 },
      { itemId: 'ancient_blueprint', minCount: 1, maxCount: 1, dropChance: 0.5, isRare: true },
    ],
    xpReward: 500,
    specialAbilities: ['roar', 'charge', 'summon_minions'],
  },
};

/**
 * 发起战斗
 */
export function initiateCombat(
  state: GameState,
  monsterId: string,
): CombatSession {
  const monster = MONSTER_DATABASE[monsterId];
  if (!monster) {
    throw new Error(`Unknown monster: ${monsterId}`);
  }

  return {
    enemyId: monsterId,
    enemyHp: monster.hp,
    enemyMaxHp: monster.hp,
    round: 1,
    log: [`遭遇${monster.name}！战斗开始！`],
  };
}

/**
 * 执行战斗回合
 */
export function executeCombatRound(
  state: GameState,
  session: CombatSession,
  playerAction: CombatAction,
  rng: Rng,
): { session: CombatSession; ended: boolean; result?: CombatResult } {
  const monster = MONSTER_DATABASE[session.enemyId];
  const log: string[] = [];
  
  // 计算玩家属性（含技能加成）
  const skillBonuses = calculateSkillBonuses(state as any);
  const playerAttack = state.attributes.strength * (1 + skillBonuses.combat.damageMultiplier - 1);
  const playerDefense = state.attributes.agility * 0.5;
  const playerCritChance = skillBonuses.combat.critChance;
  
  let playerDamageThisRound = 0;
  let monsterDamageThisRound = 0;
  
  // === 玩家回合 ===
  switch (playerAction) {
    case 'attack': {
      // 命中检定
      const hitRoll = rollD100(() => rng.next(), 50 + state.attributes.agility - monster.agility);
      
      if (hitRoll.success) {
        // 暴击检定
        const isCrit = rng.next() < playerCritChance;
        const critMultiplier = isCrit ? 2.0 : 1.0;
        
        // 计算伤害
        const baseDamage = playerAttack * critMultiplier;
        const actualDamage = Math.max(1, Math.floor(baseDamage - monster.defense * 0.5));
        
        session.enemyHp -= actualDamage;
        playerDamageThisRound = actualDamage;
        
        log.push(`你攻击了${monster.name}，造成${actualDamage}点伤害${isCrit ? '（暴击！）' : ''}`);
      } else {
        log.push(`你的攻击被${monster.name}闪避了！`);
      }
      break;
    }
    
    case 'defend': {
      // 防御姿态：本回合受到伤害减半
      log.push('你采取防御姿态，准备抵挡攻击');
      break;
    }
    
    case 'flee': {
      // 逃跑检定
      const fleeRoll = rollD100(() => rng.next(), 40 + state.attributes.agility);
      if (fleeRoll.success) {
        log.push('你成功逃脱了！');
        return {
          session,
          ended: true,
          result: {
            victory: false,
            playerHpRemaining: state.resources.health.current,
            damageDealt: 0,
            damageTaken: 0,
            loot: {},
            xpGained: 0,
            log,
          },
        };
      } else {
        log.push('逃跑失败！');
      }
      break;
    }
    
    case 'use_item': {
      // TODO: 使用道具逻辑
      log.push('使用了道具（待实现）');
      break;
    }
  }
  
  // 检查怪物是否死亡
  if (session.enemyHp <= 0) {
    // 胜利！
    const loot = generateLoot(monster, state.attributes.luck + skillBonuses.special.luck || 0, rng);
    const xpGained = monster.xpReward;
    
    // 给予奖励
    for (const [itemId, count] of Object.entries(loot)) {
      state.inventory[itemId] = (state.inventory[itemId] ?? 0) + count;
    }
    
    // 获得技能点（每100XP给1点）
    const skillPoints = Math.floor(xpGained / 100);
    if (skillPoints > 0) {
      // 通过 gainSkillPoints 添加
    }
    
    log.push(`击败了${monster.name}！获得${xpGained}XP`);
    for (const [itemId, count] of Object.entries(loot)) {
      log.push(`获得 ${itemId} x${count}`);
    }
    
    state.combat = undefined;
    
    return {
      session,
      ended: true,
      result: {
        victory: true,
        playerHpRemaining: state.resources.health.current,
        damageDealt: playerDamageThisRound,
        damageTaken: monsterDamageThisRound,
        loot,
        xpGained,
        log,
      },
    };
  }
  
  // === 怪物回合 ===
  // 怪物AI：简单行为树
  const monsterAction = chooseMonsterAction(monster, session, rng);
  
  switch (monsterAction) {
    case 'attack': {
      const hitRoll = rollD100(() => rng.next(), 50 + monster.agility - state.attributes.agility);
      
      if (hitRoll.success) {
        let damage = Math.max(1, Math.floor(monster.attack - playerDefense));
        
        // 如果玩家在防御，伤害减半
        if (playerAction === 'defend') {
          damage = Math.floor(damage * 0.5);
        }
        
        state.resources.health.current -= damage;
        monsterDamageThisRound = damage;
        
        log.push(`${monster.name}攻击了你，造成${damage}点伤害${playerAction === 'defend' ? '（已格挡部分）' : ''}`);
      } else {
        log.push(`${monster.name}的攻击被你闪避了！`);
      }
      break;
    }
    
    case 'special': {
      // 特殊能力（如果有）
      if (monster.specialAbilities && monster.specialAbilities.length > 0) {
        const ability = monster.specialAbilities[rng.nextInt(0, monster.specialAbilities.length - 1)];
        log.push(`${monster.name}使用了特殊能力：${ability}！（效果待实现）`);
      }
      break;
    }
  }
  
  // 检查玩家是否死亡
  if (state.resources.health.current <= 0) {
    log.push('你被击败了...');
    state.combat = undefined;
    
    return {
      session,
      ended: true,
      result: {
        victory: false,
        playerHpRemaining: 0,
        damageDealt: playerDamageThisRound,
        damageTaken: monsterDamageThisRound,
        loot: {},
        xpGained: 0,
        log,
      },
    };
  }
  
  // 继续下一回合
  session.round += 1;
  session.log.push(...log);
  
  return { session, ended: false };
}

/**
 * 怪物AI选择行动
 */
function chooseMonsterAction(
  monster: MonsterDef,
  session: CombatSession,
  rng: Rng,
): 'attack' | 'special' {
  // 简单AI：血量低时有几率使用特殊能力
  const hpPercent = session.enemyHp / session.enemyMaxHp;
  
  if (hpPercent < 0.3 && monster.specialAbilities && rng.next() < 0.4) {
    return 'special';
  }
  
  return 'attack';
}

/**
 * 生成战利品
 */
export function generateLoot(
  monster: MonsterDef,
  playerLuck: number,
  rng: Rng,
): Record<string, number> {
  const loot: Record<string, number> = {};
  
  for (const entry of monster.lootTable) {
    // 幸运值影响掉落率
    const adjustedChance = Math.min(1.0, entry.dropChance * (1 + playerLuck * 0.05));
    
    if (rng.next() < adjustedChance) {
      const count = rng.int(entry.minCount, entry.maxCount);
      loot[entry.itemId] = (loot[entry.itemId] ?? 0) + count;
    }
  }
  
  return loot;
}

/**
 * 获取可用怪物列表（基于当前天数/难度）
 */
export function getAvailableMonsters(day: number): MonsterDef[] {
  if (day <= 7) {
    return [MONSTER_DATABASE.wild_dog, MONSTER_DATABASE.mutated_rat];
  } else if (day <= 20) {
    return [MONSTER_DATABASE.shadow_wolf, MONSTER_DATABASE.rock_golem];
  } else if (day <= 40) {
    return [MONSTER_DATABASE.fog_stalker];
  } else {
    return [MONSTER_DATABASE.beast_king];
  }
}
