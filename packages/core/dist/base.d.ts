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
/** 基地类型枚举 */
export declare enum BaseType {
    HUT = "hut",// 茅草屋
    WOODEN_HOUSE = "wooden_house",// 木屋
    STONE_HOUSE = "stone_house",// 石屋
    FORTRESS = "fortress",// 堡垒
    VALLEY_BASE = "valley_base"
}
/** 建筑类型枚举 */
export declare enum StructureType {
    FARM = "farm",// 农田
    WORKSHOP = "workshop",// 工坊
    MINE = "mine",// 矿场
    LOGGING_CAMP = "logging_camp",// 伐木场
    WOODEN_SPIKE = "wooden_spike",// 木刺陷阱
    FENCE = "fence",// 栅栏
    BALLISTA_TOWER = "ballista_tower",// 连弩塔楼
    WALL = "wall",// 城墙
    WATCHTOWER = "watchtower",// 预警塔
    STORAGE = "storage",// 仓库
    WELL = "well",// 水井
    FIRE_PIT = "fire_pit",// 火堆
    MEDICAL_TENT = "medical_tent"
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
    position: {
        x: number;
        y: number;
    };
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
export declare const BASE_LEVEL_CONFIG: Record<number, {
    type: BaseType;
    name: string;
    maxStructures: number;
    maxStorage: number;
    maxDefense: number;
    cost: Record<string, number>;
    unlocks: string[];
}>;
/** 建筑定义库 */
export declare const STRUCTURE_DEFS: Record<string, StructureDef>;
/**
 * 创建初始基地
 */
export declare function createInitialBase(): BaseInfo;
/**
 * 升级基地
 */
export declare function upgradeBase(state: GameState & {
    base: BaseInfo;
}): UpgradeResult;
/**
 * 建造建筑
 */
export declare function buildStructure(state: GameState & {
    base: BaseInfo;
}, structureId: string, position: {
    x: number;
    y: number;
}): BuildResult;
/**
 * 处理每日生产
 */
export declare function processDailyProduction(state: GameState & {
    base: BaseInfo;
}): ProductionResult;
/**
 * 重新计算基地总防御力（导出供天灾结算等模块使用）
 */
export declare function recalcBaseDefense(base: BaseInfo): void;
/**
 * 处理兽潮攻击
 */
export declare function handleBeastWave(state: GameState & {
    base: BaseInfo;
}, wavePower: number): {
    success: boolean;
    damage: number;
    messages: string[];
};
/**
 * 获取可建造的建筑列表（基于当前基地等级和资源）
 */
export declare function getAvailableStructures(state: GameState & {
    base: BaseInfo;
}): Array<{
    def: StructureDef;
    canBuild: boolean;
    reason?: string;
}>;
//# sourceMappingURL=base.d.ts.map