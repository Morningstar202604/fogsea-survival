import type { GameState, IncomeRule, Resource, ResourceKey, Resources } from './types.js';
import { DEFAULT_WORLD_TIERS } from './progression.js';
import { calculateSkillBonuses } from './skills.js';

/** 资源键全集（游戏内实际结算的 5 类资源，warmth 由基地/装备系统处理） */
export const RESOURCE_KEYS: ResourceKey[] = ['food', 'water', 'health', 'sanity', 'energy'];

/** 各资源上限默认值 */
export const RESOURCE_DEFAULTS: Record<Exclude<ResourceKey, 'warmth'>, number> = {
  food: 100,
  water: 100,
  health: 100,
  sanity: 100,
  energy: 100,
};

/** 资源中文名 */
export const RESOURCE_LABELS: Record<ResourceKey, string> = {
  food: '食物',
  water: '水',
  health: '生命',
  sanity: '理智',
  energy: '体力',
  warmth: '温暖',
};

/** 创建默认资源表 */
export function createResources(
  starting?: Partial<Record<ResourceKey, { current: number; max: number }>>,
): Resources {
  const res = {} as Resources;
  for (const key of RESOURCE_KEYS) {
    const s = starting?.[key];
    const max = s?.max ?? RESOURCE_DEFAULTS[key as Exclude<ResourceKey, 'warmth'>];
    res[key] = {
      current: clamp(s?.current ?? max, 0, max),
      accumulated: 0,
      max,
    };
  }
  return res;
}

export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

/** 修改资源：可正可负，负时扣除；返回实际扣减到 0 时是否触发“资源告急” */
export function deltaResource(res: Resource, delta: number): void {
  if (delta > 0) {
    res.current = clamp(res.current + delta, 0, res.max);
    res.accumulated += delta;
  } else {
    res.current = clamp(res.current + delta, 0, res.max);
  }
}

/**
 * 每日结算：应用收入规则。
 * 规则中 delta 为负表示消耗；健康/理智的每日调整在收入规则中定义。
 * 返回结算后是否因生命归零而死亡。
 */
export interface IncomeResult {
  dead: boolean;
  messages: string[];
}

export function applyIncome(state: GameState, income: IncomeRule[]): IncomeResult {
  const messages: string[] = [];
  let dead = false;
  for (const rule of income) {
    const res = state.resources[rule.resource];
    deltaResource(res, rule.delta);
    if (res.current <= 0) {
      if (rule.resource === 'health') {
        dead = true;
        messages.push('生命耗尽，你倒在了迷雾之中。');
      } else {
        messages.push(`${RESOURCE_LABELS[rule.resource]}耗尽了。`);
      }
    }
  }
  return { dead, messages };
}

/** 食物/水不足时对生命的惩罚（可在每日结算前调用） */
export function applyStarvation(state: GameState): string[] {
  const messages: string[] = [];
  const food = state.resources.food;
  const water = state.resources.water;
  if (food.current <= 0) {
    deltaResource(state.resources.health, -5);
    messages.push('没有食物，饥饿侵蚀着你的身体（生命-5）。');
  }
  if (water.current <= 0) {
    deltaResource(state.resources.health, -8);
    messages.push('没有水，干渴让你痛苦不堪（生命-8）。');
  }
  return messages;
}

/** 状态快照校验：全部资源应在 [0,max] */
export function assertResourcesValid(state: GameState): boolean {
  for (const key of RESOURCE_KEYS) {
    const r = state.resources[key];
    if (r.current < 0 || r.current > r.max || r.accumulated < 0) return false;
  }
  return true;
}

// ==================== 每日自动消耗 ====================

/** 每日自动消耗的资源键（health 不在此扣除，由 applyStarvation 处理） */
type DailyConsumptionKey = 'food' | 'water' | 'sanity' | 'energy';

/** 每日自动消耗速率基准（单位/天，第一世界Tier）
 * 根据《全民公路求生》等硬核生存作品的经验，数值需兼顾游戏节奏与生存压力 */
export const DAILY_CONSUMPTION_BASE: Record<DailyConsumptionKey, number> = {
  food: 10,
  water: 8,
  sanity: 5,
  energy: 3,
};

/** 根据世界等级修正的每日消耗速率 */
export function getDailyConsumptionRate(tier: number): Record<DailyConsumptionKey, number> {
  const multiplier = Math.pow(1.1, tier - 1); // 每个世界级别提升 10% 的消耗压力
  return {
    food: DAILY_CONSUMPTION_BASE.food * multiplier,
    water: DAILY_CONSUMPTION_BASE.water * multiplier,
    sanity: DAILY_CONSUMPTION_BASE.sanity * multiplier,
    energy: DAILY_CONSUMPTION_BASE.energy * multiplier,
  };
}

/** 校验 daily consumption 是否在合理范围 */
export function isValidDailyConsumption(rate: Record<DailyConsumptionKey, number>): boolean {
  return (
    !isNaN(rate.food) &&
    !isNaN(rate.water) &&
    !isNaN(rate.sanity) &&
    !isNaN(rate.energy)
  );
}

/** 每日结算：按世界等级压力自动消耗食物/水/理智/体力（天赋被动在此生效） */
export function applyDailyConsumption(state: GameState): string[] {
  const messages: string[] = [];

  const tier = state.progression?.currentWorldTier ?? 1;
  const rate = getDailyConsumptionRate(tier);
  const tierName = DEFAULT_WORLD_TIERS[tier - 1]?.name ?? `T${tier}`;

  // 技能系"生存专家"类减免（此前为死数据）
  const reduction = state.skills
    ? Math.min(0.5, Math.max(0, calculateSkillBonuses(state as any).survival.resourceConsumptionReduction))
    : 0;

  // 天赋被动修正
  const modifiers: Record<DailyConsumptionKey, number> = {
    food: state.flags['talent_iron_stomach'] ? 0.85 : 1,
    water: state.flags['talent_iron_stomach'] ? 0.85 : 1,
    sanity: state.flags['talent_calm_mind'] ? 0.7 : 1,
    energy: state.flags['talent_night_runner'] ? 0.75 : 1,
  };

  const consume = (key: DailyConsumptionKey) => {
    const delta = rate[key] * modifiers[key] * (1 - reduction);
    deltaResource(state.resources[key], -delta);
    messages.push(`${RESOURCE_LABELS[key]}-${Math.round(delta)}（${tierName}级压力）`);
  };
  consume('food');
  consume('water');
  consume('sanity');
  consume('energy');

  return messages;
}
