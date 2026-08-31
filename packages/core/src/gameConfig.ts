/**
 * 游戏统一配置与公式模块
 * 集中管理所有游戏参数、数学公式、阶段划分
 * 所有系统都应引用此模块的配置，避免硬编码和重复
 */

// ============================================================
// 一、游戏阶段划分（五阶段体系）
// ============================================================

export interface GamePhase {
  id: number;
  name: string;
  dayRange: [number, number];
  theme: string;
  description: string;
  // 阶段加成/惩罚
  resourceConsumptionMultiplier: number;
  monsterStrengthMultiplier: number;
  eventRateMultiplier: number;
  // 解锁内容
  unlocks: string[];
}

export const GAME_PHASES: GamePhase[] = [
  {
    id: 1,
    name: '迷雾初临',
    dayRange: [1, 7],
    theme: '茫然、恐惧、基础生存',
    description: '你刚来到这个迷雾世界，一切都是未知。找到食物、水和庇护所是当务之急。',
    resourceConsumptionMultiplier: 1.0,
    monsterStrengthMultiplier: 0.8,
    eventRateMultiplier: 0.7,
    unlocks: ['基础行动', '基础物品', '序章剧情'],
  },
  {
    id: 2,
    name: '幸存者',
    dayRange: [8, 14],
    theme: '警惕、试探、建立关系',
    description: '你开始遇到其他幸存者。信任还是背叛？合作还是独行？每一个选择都影响你的命运。',
    resourceConsumptionMultiplier: 1.1,
    monsterStrengthMultiplier: 1.0,
    eventRateMultiplier: 1.0,
    unlocks: ['战斗系统', '同伴系统', '交易系统', '老K线', '朵朵线', '医生线'],
  },
  {
    id: 3,
    name: '基地建设',
    dayRange: [15, 21],
    theme: '紧张、准备、压力',
    description: '兽潮将至，你必须建设基地、升级装备、学习技能。这是生存与灭亡的较量。',
    resourceConsumptionMultiplier: 1.2,
    monsterStrengthMultiplier: 1.2,
    eventRateMultiplier: 1.2,
    unlocks: ['基地升级', '技能树', '装备强化', '称号系统', '结晶线', '第一次兽潮'],
  },
  {
    id: 4,
    name: '真相浮现',
    dayRange: [22, 28],
    theme: '神秘、危险、抉择',
    description: '迷雾的真相开始浮现。结晶、无线电、古老遗迹——你离真相越近，危险就越大。',
    resourceConsumptionMultiplier: 1.3,
    monsterStrengthMultiplier: 1.5,
    eventRateMultiplier: 1.5,
    unlocks: ['深入迷雾', '结晶系统', '真相分支', '救援线后续'],
  },
  {
    id: 5,
    name: '最终抉择',
    dayRange: [29, 40],
    theme: '绝望、希望、最终抉择',
    description: '最终兽潮降临，救援信号响起。坚守还是逃离？牺牲还是共存？你的选择决定一切。',
    resourceConsumptionMultiplier: 1.5,
    monsterStrengthMultiplier: 2.0,
    eventRateMultiplier: 2.0,
    unlocks: ['最终兽潮', '救援到来', '真相揭晓', '所有结局'],
  },
];

/** 根据天数获取当前阶段 */
export function getPhaseByDay(day: number): GamePhase {
  for (const phase of GAME_PHASES) {
    if (day >= phase.dayRange[0] && day <= phase.dayRange[1]) return phase;
  }
  return GAME_PHASES[GAME_PHASES.length - 1]; // 超过最大天数，返回最后阶段
}

// ============================================================
// 二、属性系统公式
// ============================================================

export interface AttributeFormula {
  // 近战伤害 = 力量 * 力量系数 + 武器攻击 * (1 + 力量/20)
  strengthDamageMultiplier: number;
  weaponDamageMultiplier: number;
  // 闪避率上限
  maxDodgeChance: number;
  dodgePerAgility: number; // 每点敏捷增加的闪避率
  // 命中基础
  baseHitChance: number;
  hitPerAgility: number;
  // 检定加成
  checkPerIntelligence: number; // 每点智力增加的检定成功率
  // 暴击
  baseCritChance: number;
  critPerLuck: number;
  // 掉落
  dropPerLuck: number; // 每点幸运增加的掉落率
}

export const ATTRIBUTE_FORMULA: AttributeFormula = {
  strengthDamageMultiplier: 1.5,
  weaponDamageMultiplier: 1.0,
  maxDodgeChance: 0.5,
  dodgePerAgility: 0.02,
  baseHitChance: 0.7,
  hitPerAgility: 0.01,
  checkPerIntelligence: 0.005,
  baseCritChance: 0.05,
  critPerLuck: 0.01,
  dropPerLuck: 0.02,
};

/** 计算近战伤害 */
export function calculateMeleeDamage(strength: number, weaponAttack: number, skillMultiplier: number = 1): number {
  const base = strength * ATTRIBUTE_FORMULA.strengthDamageMultiplier;
  const weapon = weaponAttack * (1 + strength / 20);
  return Math.floor((base + weapon) * skillMultiplier);
}

/** 计算闪避率 */
export function calculateDodgeChance(agility: number): number {
  return Math.min(ATTRIBUTE_FORMULA.maxDodgeChance, agility * ATTRIBUTE_FORMULA.dodgePerAgility);
}

/** 计算命中率 */
export function calculateHitChance(agility: number, targetAgility: number): number {
  return Math.min(0.95, Math.max(0.3, 
    ATTRIBUTE_FORMULA.baseHitChance + 
    agility * ATTRIBUTE_FORMULA.hitPerAgility - 
    targetAgility * ATTRIBUTE_FORMULA.hitPerAgility
  ));
}

/** 计算检定成功率加成 */
export function calculateCheckBonus(intelligence: number): number {
  return intelligence * ATTRIBUTE_FORMULA.checkPerIntelligence * 100; // 转为百分比
}

/** 计算暴击率 */
export function calculateCritChance(luck: number, skillBonus: number = 0): number {
  return Math.min(0.5, ATTRIBUTE_FORMULA.baseCritChance + luck * ATTRIBUTE_FORMULA.critPerLuck + skillBonus);
}

/** 计算掉落倍率 */
export function calculateDropMultiplier(luck: number): number {
  return 1 + luck * ATTRIBUTE_FORMULA.dropPerLuck;
}

// ============================================================
// 三、等级与经验系统
// ============================================================

export interface LevelConfig {
  baseExp: number; // 升级所需基础经验
  expGrowth: number; // 经验成长系数
  maxLevel: number;
  // 升级奖励
  healthPerLevel: number;
  attributePointsPerLevel: number;
  skillPointsPerLevel: number;
}

export const LEVEL_CONFIG: LevelConfig = {
  baseExp: 100,
  expGrowth: 1.5,
  maxLevel: 30,
  healthPerLevel: 10,
  attributePointsPerLevel: 1,
  skillPointsPerLevel: 1,
};

/** 计算升级所需经验 */
export function calculateExpRequired(level: number): number {
  return Math.floor(LEVEL_CONFIG.baseExp * Math.pow(level, LEVEL_CONFIG.expGrowth));
}

/** 计算战斗经验奖励 */
export function calculateCombatExp(enemyLevel: number, victory: boolean): number {
  if (!victory) return Math.floor(enemyLevel * 5);
  return Math.floor(enemyLevel * 20 + 10);
}

/** 计算探索经验奖励 */
export function calculateExploreExp(day: number): number {
  return Math.floor(5 + day * 0.5);
}

// ============================================================
// 四、货币与积分系统
// ============================================================

export interface CurrencyConfig {
  // 迷雾积分（通用货币）
  combatRewardBase: number;
  combatRewardPerLevel: number;
  exploreRewardBase: number;
  questRewardBase: number;
  // 交易
  buyMultiplier: number; // 购买价格倍率
  sellMultiplier: number; // 出售价格倍率
  // 基地升级费用
  baseUpgradeCostMultiplier: number;
}

export const CURRENCY_CONFIG: CurrencyConfig = {
  combatRewardBase: 10,
  combatRewardPerLevel: 5,
  exploreRewardBase: 3,
  questRewardBase: 50,
  buyMultiplier: 1.3,
  sellMultiplier: 0.6,
  baseUpgradeCostMultiplier: 2.0,
};

/** 计算战斗积分奖励 */
export function calculateCombatPoints(enemyLevel: number, luck: number): number {
  const base = CURRENCY_CONFIG.combatRewardBase + enemyLevel * CURRENCY_CONFIG.combatRewardPerLevel;
  return Math.floor(base * calculateDropMultiplier(luck));
}

// ============================================================
// 五、基地/木屋系统
// ============================================================

export interface BaseConfig {
  maxLevel: number;
  // 每级升级所需资源
  upgradeResourceBase: Record<string, number>;
  upgradeGrowth: number;
  // 建筑效果
  restHealthPerLevel: number;
  restEnergyPerLevel: number;
  storagePerLevel: number;
  defensePerLevel: number;
  productionPerLevel: number;
}

export const BASE_CONFIG: BaseConfig = {
  maxLevel: 5,
  upgradeResourceBase: { wood: 20, stone: 10, metal: 5 },
  upgradeGrowth: 2.0,
  restHealthPerLevel: 2,
  restEnergyPerLevel: 3,
  storagePerLevel: 50,
  defensePerLevel: 10,
  productionPerLevel: 5,
};

/** 计算基地升级所需资源 */
export function calculateBaseUpgradeCost(currentLevel: number): Record<string, number> {
  const cost: Record<string, number> = {};
  const multiplier = Math.pow(BASE_CONFIG.upgradeGrowth, currentLevel);
  for (const [item, base] of Object.entries(BASE_CONFIG.upgradeResourceBase)) {
    cost[item] = Math.floor(base * multiplier);
  }
  return cost;
}

/** 计算基地休息恢复量 */
export function calculateBaseRest(baseLevel: number): { health: number; energy: number; sanity: number } {
  return {
    health: 5 + baseLevel * BASE_CONFIG.restHealthPerLevel,
    energy: 10 + baseLevel * BASE_CONFIG.restEnergyPerLevel,
    sanity: 3 + baseLevel,
  };
}

// ============================================================
// 六、武器与装备系统
// ============================================================

export type ItemQuality = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface QualityConfig {
  name: string;
  color: string;
  damageMultiplier: number;
  durabilityMultiplier: number;
  upgradeCostMultiplier: number;
}

export const QUALITY_CONFIG: Record<ItemQuality, QualityConfig> = {
  common: { name: '普通', color: '#9ca3af', damageMultiplier: 1.0, durabilityMultiplier: 1.0, upgradeCostMultiplier: 1.0 },
  uncommon: { name: '精良', color: '#22c55e', damageMultiplier: 1.3, durabilityMultiplier: 1.2, upgradeCostMultiplier: 1.5 },
  rare: { name: '稀有', color: '#3b82f6', damageMultiplier: 1.6, durabilityMultiplier: 1.5, upgradeCostMultiplier: 2.0 },
  epic: { name: '史诗', color: '#a855f7', damageMultiplier: 2.0, durabilityMultiplier: 2.0, upgradeCostMultiplier: 3.0 },
  legendary: { name: '传说', color: '#f59e0b', damageMultiplier: 2.5, durabilityMultiplier: 3.0, upgradeCostMultiplier: 5.0 },
};

/** 计算武器实际伤害（含品质和强化） */
export function calculateWeaponDamage(baseAttack: number, quality: ItemQuality, enhanceLevel: number = 0): number {
  const qualityMult = QUALITY_CONFIG[quality].damageMultiplier;
  const enhanceBonus = enhanceLevel * 2; // 每级强化+2攻击
  return Math.floor(baseAttack * qualityMult + enhanceBonus);
}

// ============================================================
// 七、称号系统
// ============================================================

export interface TitleDef {
  id: string;
  name: string;
  description: string;
  // 解锁条件
  unlockCondition: {
    type: 'achievement' | 'day' | 'combat' | 'explore' | 'special';
    value: number | string;
  };
  // 属性加成
  bonuses: {
    strength?: number;
    agility?: number;
    intelligence?: number;
    luck?: number;
    health?: number;
    damageMultiplier?: number;
    defenseMultiplier?: number;
  };
}

export const TITLES: TitleDef[] = [
  {
    id: 'first_blood',
    name: '初次见血',
    description: '击杀第一只迷雾野兽',
    unlockCondition: { type: 'combat', value: 1 },
    bonuses: { strength: 1, damageMultiplier: 0.05 },
  },
  {
    id: 'fog_seven_days',
    name: '迷雾七日',
    description: '存活到第7天',
    unlockCondition: { type: 'day', value: 7 },
    bonuses: { all: 1 } as any,
  },
  {
    id: 'beast_slayer',
    name: '屠兽者',
    description: '累计击杀10只野兽',
    unlockCondition: { type: 'combat', value: 10 },
    bonuses: { strength: 3, damageMultiplier: 0.1 },
  },
  {
    id: 'explorer',
    name: '探索者',
    description: '访问10个不同场景',
    unlockCondition: { type: 'explore', value: 10 },
    bonuses: { agility: 2, luck: 2 },
  },
  {
    id: 'fog_thirty_days',
    name: '雾海一月',
    description: '存活到第30天',
    unlockCondition: { type: 'day', value: 30 },
    bonuses: { health: 20, damageMultiplier: 0.15, defenseMultiplier: 0.15 },
  },
  {
    id: 'beast_wave_survivor',
    name: '兽潮征服者',
    description: '成功防御第一次兽潮',
    unlockCondition: { type: 'special', value: 'beast_wave_1' },
    bonuses: { defenseMultiplier: 0.2, health: 15 },
  },
  {
    id: 'truth_seeker',
    name: '真相追寻者',
    description: '发现迷雾真相',
    unlockCondition: { type: 'special', value: 'truth_seen' },
    bonuses: { intelligence: 5, luck: 3 },
  },
];

// ============================================================
// 八、资源消耗公式（分阶段）
// ============================================================

export interface ResourceConsumption {
  food: number;
  water: number;
  sanity: number;
  energy: number;
  warmth: number;
}

/** 计算每日资源消耗（含阶段加成） */
export function calculateDailyConsumption(day: number, baseConsumption: ResourceConsumption): ResourceConsumption {
  const phase = getPhaseByDay(day);
  const mult = phase.resourceConsumptionMultiplier;
  return {
    food: Math.floor(baseConsumption.food * mult),
    water: Math.floor(baseConsumption.water * mult),
    sanity: Math.floor(baseConsumption.sanity * mult),
    energy: Math.floor(baseConsumption.energy * mult),
    warmth: Math.floor(baseConsumption.warmth * mult),
  };
}

// ============================================================
// 九、随机事件触发率（分阶段）
// ============================================================

/** 计算每日随机事件触发率 */
export function calculateEventRate(day: number): number {
  const phase = getPhaseByDay(day);
  const baseRate = 0.3; // 基础30%
  return Math.min(0.8, baseRate * phase.eventRateMultiplier);
}

// ============================================================
// 十、怪物强度（分阶段）
// ============================================================

/** 计算怪物强度倍率 */
export function calculateMonsterStrength(day: number): number {
  const phase = getPhaseByDay(day);
  return phase.monsterStrengthMultiplier;
}
