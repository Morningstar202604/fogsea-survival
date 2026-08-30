/**
 * 基地建设系统
 *
 * 核心功能：
 * - 避难所升级（茅草屋 → 木屋 → 石屋 → 堡垒 → 山谷基地）
 * - 建筑放置和管理
 * - 防御设施建设
 * - 生产链系统
 */

import type { GameState } from './types.js';
import { RESOURCE_KEYS, deltaResource } from './resources.js';

/** 基地类型枚举 */
export enum BaseType {
  HUT = 'hut',           // 茅草屋
  WOODEN_HOUSE = 'wooden_house',  // 木屋
  STONE_HOUSE = 'stone_house',    // 石屋
  FORTRESS = 'fortress',          // 堡垒
  VALLEY_BASE = 'valley_base',    // 山谷基地
}

/** 建筑类型枚举 */
export enum StructureType {
  // 生产类
  FARM = 'farm',              // 农田
  WORKSHOP = 'workshop',      // 工坊
  MINE = 'mine',              // 矿场
  LOGGING_CAMP = 'logging_camp', // 伐木场

  // 防御类
  WOODEN_SPIKE = 'wooden_spike',   // 木刺陷阱
  FENCE = 'fence',                 // 栅栏
  BALLISTA_TOWER = 'ballista_tower', // 连弩塔楼
  WALL = 'wall',                   // 城墙
  WATCHTOWER = 'watchtower',       // 预警塔

  // 功能类
  STORAGE = 'storage',             // 仓库
  WELL = 'well',                   // 水井
  FIRE_PIT = 'fire_pit',           // 火堆
  MEDICAL_TENT = 'medical_tent',   // 医疗帐篷
}

/** 建筑结构定义 */
export interface StructureDef {
  id: string;
  name: string;
  description: string;
  type: StructureType;
  /** 建造成本 */
  cost: Record<string, number>;
  /** 占用空间（格数） */
  space: number;
  /** 前置建筑 */
  prerequisites?: string[];
  /** 最低基地等级要求 */
  minBaseLevel: number;
  /** 效果 */
  effects: StructureEffect[];
  /** 每日维护成本 */
  maintenanceCost?: Record<string, number>;
}

/** 建筑效果 */
export interface StructureEffect {
  type: 'production' | 'defense' | 'capacity' | 'buff' | 'unlock';
  /** 影响的资源或属性 */
  target?: string;
  /** 数值 */
  value: number;
  /** 描述 */
  description: string;
}

/** 建筑实例 */
export interface StructureInstance {
  id: string;
  structureId: string;
  level: number;
  position: { x: number; y: number };
  hp: number;
  maxHp: number;
  lastProductionDay: number;
}

/** 基地信息 */
export interface BaseInfo {
  level: number;
  type: BaseType;
  structures: StructureInstance[];
  defenses: DefenseInfo[];
  storage: Record<string, number>;
  capacity: {
    maxStructures: number;
    maxStorage: number;
    maxPopulation: number;
  };
  totalDefense: number;
}

/** 防御设施信息 */
export interface DefenseInfo {
  id: string;
  type: string;
  defensePower: number;
  durability: number;
  maxDurability: number;
}

/** 升级结果 */
export interface UpgradeResult {
  success: boolean;
  message: string;
  oldLevel?: number;
  newLevel?: number;
  cost?: Record<string, number>;
}

/** 建造结果 */
export interface BuildResult {
  success: boolean;
  message: string;
  structure?: StructureInstance;
}

/** 生产结果 */
export interface ProductionResult {
  produced: Record<string, number>;
  messages: string[];
}

/** 基地等级配置 */
export const BASE_LEVEL_CONFIG: Record<number, {
  type: BaseType;
  name: string;
  maxStructures: number;
  maxStorage: number;
  maxDefense: number;
  cost: Record<string, number>;
  unlocks: string[];
}> = {
  1: {
    type: BaseType.HUT,
    name: '茅草屋',
    maxStructures: 3,
    maxStorage: 50,
    maxDefense: 0,
    cost: {},
    unlocks: ['basic_shelter'],
  },
  2: {
    type: BaseType.WOODEN_HOUSE,
    name: '木屋',
    maxStructures: 6,
    maxStorage: 100,
    maxDefense: 50,
    cost: { wood: 200, stone: 50 },
    unlocks: ['wooden_spike', 'simple_fence', 'fire_pit'],
  },
  3: {
    type: BaseType.STONE_HOUSE,
    name: '石屋',
    maxStructures: 10,
    maxStorage: 200,
    maxDefense: 150,
    cost: { stone: 500, metal: 100, wood: 300 },
    unlocks: ['ballista_tower', 'watchtower', 'well', 'storage'],
  },
  4: {
    type: BaseType.FORTRESS,
    name: '堡垒',
    maxStructures: 15,
    maxStorage: 500,
    maxDefense: 300,
    cost: { stone: 600, metal: 150, wood: 500 }, // 原 blueprint×5 为不可获得物品，升级链断裂，改为可达成材料
    unlocks: ['wall', 'farm', 'workshop', 'mine'],
  },
  5: {
    type: BaseType.VALLEY_BASE,
    name: '山谷基地',
    maxStructures: 999,
    maxStorage: 9999,
    maxDefense: 999,
    cost: { stone: 2000, metal: 800, wood: 1500 }, // 同上：移除不可获得物品
    unlocks: ['all_structures', 'automation', 'trade_center'],
  },
};

/** 建筑定义库 */
export const STRUCTURE_DEFS: Record<string, StructureDef> = {
  // 生产类
  farm: {
    id: 'farm',
    name: '农田',
    description: '种植作物，每日自动生产食物',
    type: StructureType.FARM,
    cost: { wood: 50, stone: 20 },
    space: 2,
    minBaseLevel: 4,
    effects: [
      { type: 'production', target: 'food', value: 20, description: '每日生产20食物' },
    ],
    maintenanceCost: { water: 5 },
  },
  workshop: {
    id: 'workshop',
    name: '工坊',
    description: '制作工具和武器',
    type: StructureType.WORKSHOP,
    cost: { wood: 100, stone: 50, metal: 30 },
    space: 2,
    minBaseLevel: 4,
    effects: [
      { type: 'unlock', target: 'crafting_tier2', value: 1, description: '解锁二级制作配方' },
      { type: 'buff', target: 'crafting_speed', value: 0.5, description: '制作速度+50%' },
    ],
  },
  mine: {
    id: 'mine',
    name: '矿场',
    description: '开采矿石和石材',
    type: StructureType.MINE,
    cost: { wood: 80, stone: 30 },
    space: 2,
    minBaseLevel: 4,
    effects: [
      { type: 'production', target: 'stone', value: 15, description: '每日生产15石材' },
      { type: 'production', target: 'metal', value: 5, description: '每日生产5金属' },
    ],
  },
  logging_camp: {
    id: 'logging_camp',
    name: '伐木场',
    description: '自动采集木材',
    type: StructureType.LOGGING_CAMP,
    cost: { wood: 60 },
    space: 1,
    minBaseLevel: 3,
    effects: [
      { type: 'production', target: 'wood', value: 25, description: '每日生产25木材' },
    ],
  },

  // 防御类
  wooden_spike: {
    id: 'wooden_spike',
    name: '木刺陷阱',
    description: '对入侵的野兽造成伤害',
    type: StructureType.WOODEN_SPIKE,
    cost: { wood: 30 },
    space: 1,
    minBaseLevel: 2,
    effects: [
      { type: 'defense', target: 'trap_damage', value: 10, description: '提供10点防御力' },
    ],
  },
  fence: {
    id: 'fence',
    name: '简易栅栏',
    description: '阻挡小型野兽',
    type: StructureType.FENCE,
    cost: { wood: 50 },
    space: 1,
    minBaseLevel: 2,
    effects: [
      { type: 'defense', target: 'barrier', value: 15, description: '提供15点防御力' },
    ],
  },
  ballista_tower: {
    id: 'ballista_tower',
    name: '连弩塔楼',
    description: '远程攻击来袭的野兽',
    type: StructureType.BALLISTA_TOWER,
    cost: { wood: 100, metal: 30, stone: 50 },
    space: 2,
    minBaseLevel: 3,
    effects: [
      { type: 'defense', target: 'ranged_damage', value: 30, description: '提供30点远程防御力' },
    ],
  },
  wall: {
    id: 'wall',
    name: '城墙',
    description: '坚固的防御工事',
    type: StructureType.WALL,
    cost: { stone: 200, metal: 50 },
    space: 3,
    minBaseLevel: 4,
    effects: [
      { type: 'defense', target: 'wall_defense', value: 50, description: '提供50点防御力' },
    ],
  },
  watchtower: {
    id: 'watchtower',
    name: '预警塔',
    description: '提前发现危险',
    type: StructureType.WATCHTOWER,
    cost: { wood: 80, stone: 30 },
    space: 1,
    minBaseLevel: 3,
    effects: [
      { type: 'buff', target: 'warning_range', value: 2, description: '预警范围+2格' },
    ],
  },

  // 功能类
  storage: {
    id: 'storage',
    name: '仓库',
    description: '增加存储空间',
    type: StructureType.STORAGE,
    cost: { wood: 100, stone: 50 },
    space: 2,
    minBaseLevel: 3,
    effects: [
      { type: 'capacity', target: 'storage', value: 100, description: '存储空间+100' },
    ],
  },
  well: {
    id: 'well',
    name: '水井',
    description: '提供稳定的水源',
    type: StructureType.WELL,
    cost: { stone: 80, wood: 30 },
    space: 1,
    minBaseLevel: 3,
    effects: [
      { type: 'production', target: 'water', value: 30, description: '每日生产30水' },
    ],
  },
  fire_pit: {
    id: 'fire_pit',
    name: '火堆',
    description: '提供温暖和照明',
    type: StructureType.FIRE_PIT,
    cost: { wood: 20, stone: 10 },
    space: 1,
    minBaseLevel: 2,
    effects: [
      { type: 'buff', target: 'warmth_recovery', value: 10, description: '温暖度恢复+10/天' },
      { type: 'buff', target: 'sanity_protection', value: 5, description: '理智值保护+5' },
    ],
  },
  medical_tent: {
    id: 'medical_tent',
    name: '医疗帐篷',
    description: '加速生命恢复',
    type: StructureType.MEDICAL_TENT,
    cost: { wood: 60, cloth: 20 },
    space: 1,
    minBaseLevel: 3,
    effects: [
      { type: 'buff', target: 'health_recovery', value: 5, description: '生命值恢复+5/天' },
    ],
  },
};

/**
 * 创建初始基地
 */
export function createInitialBase(): BaseInfo {
  return {
    level: 1,
    type: BaseType.HUT,
    structures: [],
    defenses: [],
    storage: {},
    capacity: {
      maxStructures: 3,
      maxStorage: 50,
      maxPopulation: 1,
    },
    totalDefense: 0,
  };
}

/**
 * 升级基地
 */
export function upgradeBase(
  state: GameState & { base: BaseInfo },
): UpgradeResult {
  const currentLevel = state.base.level;
  const nextLevel = currentLevel + 1;

  // 检查是否已达最高级
  if (!BASE_LEVEL_CONFIG[nextLevel]) {
    return {
      success: false,
      message: '基地已达到最高等级！',
    };
  }

  const config = BASE_LEVEL_CONFIG[nextLevel];

  // 检查资源是否足够
  for (const [resource, amount] of Object.entries(config.cost)) {
    const invAmount = state.inventory[resource] ?? 0;
    if (invAmount < amount) {
      return {
        success: false,
        message: `资源不足！需要 ${resource} x${amount}，当前只有 x${invAmount}`,
      };
    }
  }

  // 扣除资源
  for (const [resource, amount] of Object.entries(config.cost)) {
    state.inventory[resource] -= amount;
  }

  // 升级基地
  state.base.level = nextLevel;
  state.base.type = config.type;
  state.base.capacity.maxStructures = config.maxStructures;
  state.base.capacity.maxStorage = config.maxStorage;

  return {
    success: true,
    message: `基地升级为${config.name}！解锁新建筑和功能。`,
    oldLevel: currentLevel,
    newLevel: nextLevel,
    cost: config.cost,
  };
}

/**
 * 建造建筑
 */
export function buildStructure(
  state: GameState & { base: BaseInfo },
  structureId: string,
  position: { x: number; y: number },
): BuildResult {
  const def = STRUCTURE_DEFS[structureId];
  if (!def) {
    return { success: false, message: '未知的建筑类型' };
  }

  // 检查基地等级
  if (state.base.level < def.minBaseLevel) {
    return {
      success: false,
      message: `基地等级不足！需要${def.minBaseLevel}级`,
    };
  }

  // 检查前置建筑
  if (def.prerequisites) {
    for (const prereq of def.prerequisites) {
      const hasPrereq = state.base.structures.some((s) => s.structureId === prereq);
      if (!hasPrereq) {
        return {
          success: false,
          message: `需要先建造${STRUCTURE_DEFS[prereq]?.name || prereq}`,
        };
      }
    }
  }

  // 检查空间是否足够
  const usedSpace = state.base.structures.reduce((sum, s) => {
    const sDef = STRUCTURE_DEFS[s.structureId];
    return sum + (sDef?.space ?? 1);
  }, 0);

  if (usedSpace + def.space > state.base.capacity.maxStructures) {
    return {
      success: false,
      message: '空间不足！无法放置更多建筑',
    };
  }

  // 检查资源
  for (const [resource, amount] of Object.entries(def.cost)) {
    const invAmount = state.inventory[resource] ?? 0;
    if (invAmount < amount) {
      return {
        success: false,
        message: `资源不足！需要 ${resource} x${amount}`,
      };
    }
  }

  // 扣除资源
  for (const [resource, amount] of Object.entries(def.cost)) {
    state.inventory[resource] -= amount;
  }

  // 创建建筑实例
  const structure: StructureInstance = {
    id: `struct_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    structureId,
    level: 1,
    position,
    hp: 100,
    maxHp: 100,
    lastProductionDay: state.day,
  };

  state.base.structures.push(structure);

  // 重新计算总防御力
  recalculateDefense(state.base);

  return {
    success: true,
    message: `成功建造${def.name}！`,
    structure,
  };
}

/**
 * 处理每日生产
 */
export function processDailyProduction(
  state: GameState & { base: BaseInfo },
): ProductionResult {
  const produced: Record<string, number> = {};
  const messages: string[] = [];

  for (const structure of state.base.structures) {
    const def = STRUCTURE_DEFS[structure.structureId];
    if (!def) continue;

    // 只处理生产类建筑
    const productionEffects = def.effects.filter((e) => e.type === 'production');

    for (const effect of productionEffects) {
      if (effect.target && effect.value > 0) {
        // 生存资源（食物/水等）直接入资源条；其余（木材/石材等）入背包
        if ((RESOURCE_KEYS as string[]).includes(effect.target) && state.resources[effect.target as keyof typeof state.resources]) {
          deltaResource(state.resources[effect.target as keyof typeof state.resources], effect.value);
        } else {
          state.inventory[effect.target] = (state.inventory[effect.target] ?? 0) + effect.value;
        }
        produced[effect.target] = (produced[effect.target] ?? 0) + effect.value;

        // 更新最后生产时间
        structure.lastProductionDay = state.day;
      }
    }
  }

  // 生成消息
  for (const [resource, amount] of Object.entries(produced)) {
    messages.push(`${resource} +${amount}`);
  }

  return { produced, messages };
}

/**
 * 重新计算基地总防御力（导出供天灾结算等模块使用）
 */
export function recalcBaseDefense(base: BaseInfo): void {
  recalculateDefense(base);
}

/**
 * 重新计算基地总防御力
 */
function recalculateDefense(base: BaseInfo): void {
  let totalDefense = 0;

  for (const structure of base.structures) {
    const def = STRUCTURE_DEFS[structure.structureId];
    if (!def) continue;

    const defenseEffects = def.effects.filter((e) => e.type === 'defense');
    for (const effect of defenseEffects) {
      totalDefense += effect.value;
    }
  }

  base.totalDefense = totalDefense;
}

/**
 * 处理兽潮攻击
 */
export function handleBeastWave(
  state: GameState & { base: BaseInfo },
  wavePower: number,
): { success: boolean; damage: number; messages: string[] } {
  const messages: string[] = [];
  const defense = state.base.totalDefense;

  messages.push(`兽潮来袭！防御力: ${defense}, 兽潮强度: ${wavePower}`);

  if (defense >= wavePower) {
    // 成功抵御
    messages.push('成功抵御兽潮！基地完好无损。');
    return { success: true, damage: 0, messages };
  } else {
    // 部分受损
    const damage = wavePower - defense;
    messages.push(`防御被突破！受到 ${damage} 点伤害。`);

    // 损坏建筑
    const damagedStructures = damageBaseStructures(state.base, damage);
    if (damagedStructures > 0) {
      messages.push(`${damagedStructures} 个建筑受损`);
    }

    return { success: false, damage, messages };
  }
}

/**
 * 损坏基地建筑
 */
function damageBaseStructures(base: BaseInfo, damage: number): number {
  let damagedCount = 0;

  // 按防御值从低到高损坏
  const sortedStructures = [...base.structures].sort((a, b) => {
    const aDef = STRUCTURE_DEFS[a.structureId];
    const bDef = STRUCTURE_DEFS[b.structureId];
    const aDefense = aDef?.effects.find((e) => e.type === 'defense')?.value ?? 0;
    const bDefense = bDef?.effects.find((e) => e.type === 'defense')?.value ?? 0;
    return aDefense - bDefense;
  });

  let remainingDamage = damage;

  for (const structure of sortedStructures) {
    if (remainingDamage <= 0) break;

    const structureHp = structure.hp;
    const damageToThis = Math.min(remainingDamage, structureHp);

    structure.hp -= damageToThis;
    remainingDamage -= damageToThis;

    if (structure.hp <= 0) {
      // 建筑被摧毁
      base.structures = base.structures.filter((s) => s.id !== structure.id);
      damagedCount++;
    }
  }

  // 重新计算防御
  recalculateDefense(base);

  return damagedCount;
}

/**
 * 获取可建造的建筑列表（基于当前基地等级和资源）
 */
export function getAvailableStructures(
  state: GameState & { base: BaseInfo },
): Array<{ def: StructureDef; canBuild: boolean; reason?: string }> {
  const result: Array<{ def: StructureDef; canBuild: boolean; reason?: string }> = [];

  for (const def of Object.values(STRUCTURE_DEFS)) {
    let canBuild = true;
    let reason = '';

    // 检查基地等级
    if (state.base.level < def.minBaseLevel) {
      canBuild = false;
      reason = `需要基地${def.minBaseLevel}级`;
    }

    // 检查前置建筑
    if (canBuild && def.prerequisites) {
      for (const prereq of def.prerequisites) {
        const hasPrereq = state.base.structures.some((s) => s.structureId === prereq);
        if (!hasPrereq) {
          canBuild = false;
          reason = `需要先建造${STRUCTURE_DEFS[prereq]?.name || prereq}`;
          break;
        }
      }
    }

    // 检查空间
    if (canBuild) {
      const usedSpace = state.base.structures.reduce((sum, s) => {
        const sDef = STRUCTURE_DEFS[s.structureId];
        return sum + (sDef?.space ?? 1);
      }, 0);

      if (usedSpace + def.space > state.base.capacity.maxStructures) {
        canBuild = false;
        reason = '空间不足';
      }
    }

    // 检查资源
    if (canBuild) {
      for (const [resource, amount] of Object.entries(def.cost)) {
        const invAmount = state.inventory[resource] ?? 0;
        if (invAmount < amount) {
          canBuild = false;
          reason = `缺少${resource} x${amount - invAmount}`;
          break;
        }
      }
    }

    result.push({ def, canBuild, reason });
  }

  return result;
}
