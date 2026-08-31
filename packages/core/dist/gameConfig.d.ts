/**
 * 游戏统一配置与公式模块 v0.5.0
 * 集中管理所有游戏参数、数学公式、阶段划分、系统规则
 * 所有系统都应引用此模块的配置，避免硬编码和重复
 *
 * 设计原则：
 * 1. 灵活但严谨 — 所有事件有因果逻辑，不随便乱搞
 * 2. 动态变化 — NPC、事件、环境随游戏进程不断变化
 * 3. 系统化 — 每个事物都有完整规则，经得起深究
 * 4. 可扩展 — 配置驱动，新增内容只需添加配置
 */
export interface GamePhase {
    id: number;
    name: string;
    dayRange: [number, number];
    scale: string;
    theme: string;
    description: string;
    coreGoal: string;
    resourceConsumptionMultiplier: number;
    monsterStrengthMultiplier: number;
    eventRateMultiplier: number;
    npcInteractionRate: number;
    unlocks: string[];
    majorEvent: {
        day: number;
        name: string;
        description: string;
        difficultyThresholds: DifficultyThreshold[];
    };
    transitionCondition: {
        type: 'survive' | 'quest' | 'combat' | 'diplomacy' | 'special';
        description: string;
    };
}
export interface DifficultyThreshold {
    level: 'easy' | 'normal' | 'hard' | 'deadly';
    name: string;
    description: string;
    conditions: {
        minStrength?: number;
        minAgility?: number;
        minIntelligence?: number;
        minLuck?: number;
        hasWeapon?: boolean;
        hasArmor?: boolean;
        baseLevel?: number;
        allyCount?: number;
        resourceStockpile?: number;
        specialItem?: string;
    };
    outcome: {
        survivalChance: number;
        rewardMultiplier: number;
        penaltyDescription: string;
    };
}
export declare const GAME_PHASES: GamePhase[];
/** 根据天数获取当前阶段 */
export declare function getPhaseByDay(day: number): GamePhase;
/** 获取阶段的大事件 */
export declare function getMajorEventByDay(day: number): GamePhase['majorEvent'] | null;
export interface DailyPanel {
    day: number;
    weather: WeatherType;
    mistDensity: MistDensity;
    dangerLevel: DangerLevel;
    specialHint: string | null;
    timeOfDay: 'morning' | 'noon' | 'evening' | 'night' | 'witching_hour';
}
export type WeatherType = 'clear' | 'foggy' | 'rainy' | 'stormy' | 'bloody_moon' | 'mist_tide';
export type MistDensity = 'thin' | 'normal' | 'thick' | 'impenetrable';
export type DangerLevel = 'safe' | 'low' | 'moderate' | 'high' | 'extreme';
export declare const WEATHER_CONFIG: Record<WeatherType, {
    name: string;
    description: string;
    visibilityMultiplier: number;
    monsterActivityMultiplier: number;
    resourceGatherMultiplier: number;
    sanityDrainMultiplier: number;
}>;
export declare const MIST_DENSITY_CONFIG: Record<MistDensity, {
    name: string;
    visibility: number;
    sanityDrainPerHour: number;
    monsterSpawnRate: number;
    specialEventChance: number;
}>;
/** 根据天数和阶段计算每日天气 */
export declare function calculateDailyWeather(day: number, rng: () => number): WeatherType;
/** 根据天数和天气计算迷雾浓度 */
export declare function calculateMistDensity(day: number, weather: WeatherType): MistDensity;
/** 计算危险等级 */
export declare function calculateDangerLevel(day: number, mistDensity: MistDensity, weather: WeatherType): DangerLevel;
export interface MistZone {
    id: string;
    name: string;
    type: 'safe' | 'normal' | 'dangerous' | 'resource' | 'anomaly' | 'altar' | 'ruins';
    description: string;
    unlockDay: number;
    effects: {
        sanityDrainMultiplier: number;
        monsterSpawnRate: number;
        resourceGatherMultiplier: number;
        specialEventChance: number;
    };
    lootTable: string[];
    dangerLevel: DangerLevel;
}
export declare const MIST_ZONES: MistZone[];
/** 根据天数获取已解锁的区域 */
export declare function getUnlockedZones(day: number): MistZone[];
export interface NpcFullProfile {
    id: string;
    name: string;
    age: number;
    gender: 'male' | 'female' | 'unknown';
    appearance: string;
    background: string;
    personality: PersonalityTraits;
    baseAttributes: {
        strength: number;
        agility: number;
        intelligence: number;
        luck: number;
    };
    skills: string[];
    behaviorPatterns: BehaviorPattern[];
    relationshipTypes: string[];
    personalQuest: {
        id: string;
        name: string;
        description: string;
        stages: NpcQuestStage[];
    };
    unlockCondition: {
        minDay: number;
        minPhase: number;
        specialRequirement?: string;
    };
    mortality: {
        canDie: boolean;
        deathConditions: string[];
    };
}
export interface PersonalityTraits {
    bravery: number;
    selfishness: number;
    calmness: number;
    trust: number;
    ambition: number;
    kindness: number;
}
export interface BehaviorPattern {
    condition: string;
    action: string;
    priority: number;
}
export interface NpcQuestStage {
    stage: number;
    name: string;
    description: string;
    triggerCondition: string;
    choices: NpcQuestChoice[];
}
export interface NpcQuestChoice {
    text: string;
    requirement?: string;
    outcome: {
        relationshipChange: number;
        consequence: string;
        unlocks?: string[];
    };
}
export declare const NPC_DEFS: NpcFullProfile[];
/** 根据天数和阶段获取可遇到的NPC */
export declare function getAvailableNpcs(day: number, phase: number): NpcFullProfile[];
export interface CausalRelation {
    id: string;
    cause: {
        type: 'action' | 'choice' | 'event' | 'state' | 'npc_action';
        description: string;
        parameters?: Record<string, any>;
    };
    effect: {
        type: 'state_change' | 'event_trigger' | 'npc_relation' | 'unlock' | 'resource_change' | 'attribute_change';
        description: string;
        delay?: number;
        probability?: number;
        parameters?: Record<string, any>;
    };
    chain?: string[];
}
export declare const CAUSAL_RELATIONS: CausalRelation[];
/** 检查因果关系是否触发 */
export declare function checkCausalRelations(causeType: string, description: string): CausalRelation[];
export interface GrowthPath {
    id: string;
    name: string;
    description: string;
    coreActions: string[];
    primaryAttributes: string[];
    advantages: string[];
    disadvantages: string[];
    majorEventBonus: Record<string, number>;
    uniqueUnlocks: string[];
}
export declare const GROWTH_PATHS: GrowthPath[];
/** 计算玩家的成长方向倾向 */
export declare function calculateGrowthPath(state: any): {
    path: GrowthPath;
    score: number;
}[];
export interface AttributeFormula {
    strengthDamageMultiplier: number;
    weaponDamageMultiplier: number;
    maxDodgeChance: number;
    dodgePerAgility: number;
    baseHitChance: number;
    hitPerAgility: number;
    checkPerIntelligence: number;
    baseCritChance: number;
    critPerLuck: number;
    dropPerLuck: number;
    sanityDrainPerIntelligence: number;
    healthPerStrength: number;
    energyPerAgility: number;
}
export declare const ATTRIBUTE_FORMULA: AttributeFormula;
export declare function calculateMeleeDamage(strength: number, weaponAttack: number, skillMultiplier?: number): number;
export declare function calculateDodgeChance(agility: number): number;
export declare function calculateHitChance(agility: number, targetAgility: number): number;
export declare function calculateCheckBonus(intelligence: number): number;
export declare function calculateCritChance(luck: number, skillBonus?: number): number;
export declare function calculateDropMultiplier(luck: number): number;
/** 计算理智流失（智力越高越慢） */
export declare function calculateSanityDrain(baseDrain: number, intelligence: number): number;
/** 计算生命上限 */
export declare function calculateHealthMax(strength: number, level: number): number;
/** 计算体力上限 */
export declare function calculateEnergyMax(agility: number, level: number): number;
export interface LevelConfig {
    baseExp: number;
    expGrowth: number;
    maxLevel: number;
    healthPerLevel: number;
    attributePointsPerLevel: number;
    skillPointsPerLevel: number;
}
export declare const LEVEL_CONFIG: LevelConfig;
export declare function calculateExpRequired(level: number): number;
export declare function calculateCombatExp(enemyLevel: number, victory: boolean): number;
export declare function calculateExploreExp(day: number): number;
export interface CurrencyConfig {
    combatRewardBase: number;
    combatRewardPerLevel: number;
    exploreRewardBase: number;
    questRewardBase: number;
    buyMultiplier: number;
    sellMultiplier: number;
    baseUpgradeCostMultiplier: number;
    crystalDropChance: number;
    crystalValueBase: number;
}
export declare const CURRENCY_CONFIG: CurrencyConfig;
export declare function calculateCombatPoints(enemyLevel: number, luck: number): number;
/** 计算晶核价值 */
export declare function calculateCrystalValue(crystalLevel: number): number;
export interface BaseConfig {
    maxLevel: number;
    upgradeResourceBase: Record<string, number>;
    upgradeGrowth: number;
    restHealthPerLevel: number;
    restEnergyPerLevel: number;
    storagePerLevel: number;
    defensePerLevel: number;
    productionPerLevel: number;
    buildings: BuildingDef[];
}
export interface BuildingDef {
    id: string;
    name: string;
    description: string;
    maxLevel: number;
    cost: Record<string, number>;
    effects: Record<string, number>;
    unlockPhase: number;
}
export declare const BASE_CONFIG: BaseConfig;
export declare function calculateBaseUpgradeCost(currentLevel: number): Record<string, number>;
export declare function calculateBaseRest(baseLevel: number): {
    health: number;
    energy: number;
    sanity: number;
};
/** 计算基地总防御力（含建筑） */
export declare function calculateBaseDefense(baseLevel: number, buildings: Record<string, number>): number;
export type ItemQuality = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';
export interface QualityConfig {
    name: string;
    color: string;
    damageMultiplier: number;
    durabilityMultiplier: number;
    upgradeCostMultiplier: number;
    dropChance: number;
}
export declare const QUALITY_CONFIG: Record<ItemQuality, QualityConfig>;
export declare function calculateWeaponDamage(baseAttack: number, quality: ItemQuality, enhanceLevel?: number): number;
/** 随机获取装备品质（受幸运影响） */
export declare function rollItemQuality(luck: number, rng: () => number): ItemQuality;
export interface TitleDef {
    id: string;
    name: string;
    description: string;
    unlockCondition: {
        type: 'achievement' | 'day' | 'combat' | 'explore' | 'special' | 'npc' | 'phase';
        value: number | string;
    };
    bonuses: {
        strength?: number;
        agility?: number;
        intelligence?: number;
        luck?: number;
        health?: number;
        damageMultiplier?: number;
        defenseMultiplier?: number;
        sanityRegen?: number;
    };
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
}
export declare const TITLES: TitleDef[];
export interface ResourceConsumption {
    food: number;
    water: number;
    sanity: number;
    energy: number;
    warmth: number;
}
export declare function calculateDailyConsumption(day: number, baseConsumption: ResourceConsumption, weather?: WeatherType): ResourceConsumption;
export declare function calculateEventRate(day: number, mistDensity?: MistDensity): number;
export declare function calculateMonsterStrength(day: number, mistDensity?: MistDensity): number;
export interface MajorEventAssessment {
    eventName: string;
    difficulty: 'easy' | 'normal' | 'hard' | 'deadly';
    survivalChance: number;
    rewardMultiplier: number;
    penaltyDescription: string;
    assessedFactors: {
        factor: string;
        value: number;
        pass: boolean;
    }[];
}
/** 评估玩家在大事件中的难度等级 */
export declare function assessMajorEventDifficulty(event: GamePhase['majorEvent'], playerState: {
    attributes: {
        strength: number;
        agility: number;
        intelligence: number;
        luck: number;
    };
    resources: Record<string, number>;
    inventory: Record<string, number>;
    baseLevel: number;
    allyCount: number;
    level: number;
}): MajorEventAssessment;
export interface EndingDetail {
    id: string;
    name: string;
    type: 'good' | 'neutral' | 'bad' | 'hidden' | 'special';
    description: string;
    triggerCondition: {
        type: 'day' | 'quest' | 'choice' | 'state' | 'special' | 'item' | 'combat';
        value: number | string;
        parameters?: Record<string, any>;
    };
    epilogue: string;
}
export declare const ENDINGS: EndingDetail[];
export declare const GAME_VERSION = "0.5.0";
export declare const GAME_VERSION_NAME = "\u4F53\u7CFB\u5316\u67B6\u6784\u7248";
export declare const GAME_VERSION_DESCRIPTION = "\u5341\u9636\u6BB5\u4F53\u7CFB\u3001\u6BCF\u65E5\u7CFB\u7EDF\u3001\u8FF7\u96FE\u89C4\u5219\u3001NPC\u52A8\u6001\u3001\u56E0\u679C\u7CFB\u7EDF\u3001\u6210\u957F\u65B9\u5411\u3001\u5927\u4E8B\u4EF6\u68C0\u9A8C\u3001\u591A\u7ED3\u5C40";
//# sourceMappingURL=gameConfig.d.ts.map