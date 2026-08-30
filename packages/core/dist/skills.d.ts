/**
 * 技能树系统
 *
 * 三分支设计：
 * - 科技系（Technology）: 武器制作、建筑升级、自动化生产
 * - 修仙系（Cultivation）: 符箓制作、灵力修炼、法术战斗
 * - 通用系（General）: 探索加速、交易精通、生存专家
 */
import type { GameState } from './types.js';
/** 技能分支枚举 */
export declare enum SkillBranch {
    TECHNOLOGY = "technology",
    CULTIVATION = "cultivation",
    GENERAL = "general"
}
/** 技能定义 */
export interface SkillDef {
    id: string;
    name: string;
    description: string;
    branch: SkillBranch;
    /** 最大等级 */
    maxLevel: number;
    /** 每级效果 */
    effects: SkillEffect[];
    /** 解锁所需技能点 */
    cost: number;
    /** 前置技能ID */
    prerequisites?: string[];
    /** 专精要求（选择该专精后才能学习） */
    requiresSpecialization?: boolean;
}
/** 技能效果 */
export interface SkillEffect {
    level: number;
    bonuses: Record<string, number | boolean | string>;
    description: string;
}
/** 技能状态 */
export interface SkillState {
    id: string;
    level: number;
    unlocked: boolean;
}
/** 技能树状态 */
export interface SkillTreeState {
    points: number;
    totalPoints: number;
    skills: Record<string, SkillState>;
    specialization?: SkillBranch;
    canChooseSpecialization: boolean;
}
/** 专精选择结果 */
export interface SpecializationResult {
    success: boolean;
    message: string;
    branch?: SkillBranch;
}
/** 技能解锁结果 */
export interface SkillUnlockResult {
    success: boolean;
    message: string;
    skill?: SkillDef;
    newLevel?: number;
}
/** 技能加成计算结果 */
export interface SkillBonuses {
    combat: {
        damageMultiplier: number;
        defenseBonus: number;
        critChance: number;
    };
    survival: {
        resourceConsumptionReduction: number;
        recoveryBonus: number;
        explorationSpeed: number;
    };
    economy: {
        tradeDiscount: number;
        productionBonus: number;
        craftingSpeed: number;
    };
    special: Record<string, any>;
}
/** 科技系技能定义 */
export declare const TECHNOLOGY_SKILLS: SkillDef[];
/** 修仙系技能定义 */
export declare const CULTIVATION_SKILLS: SkillDef[];
/** 通用系技能定义 */
export declare const GENERAL_SKILLS: SkillDef[];
/** 所有技能定义 */
export declare const ALL_SKILLS: SkillDef[];
/** 技能定义映射表 */
export declare const SKILL_DEF_MAP: Record<string, SkillDef>;
/**
 * 创建初始技能树状态
 */
export declare function createInitialSkillTree(): SkillTreeState;
/**
 * 获得技能点（通过升级、完成任务等）
 */
export declare function gainSkillPoints(state: GameState & {
    skills: SkillTreeState;
}, amount: number): void;
/**
 * 选择专精
 */
export declare function chooseSpecialization(state: GameState & {
    skills: SkillTreeState;
}, branch: SkillBranch): SpecializationResult;
/**
 * 解锁/升级技能
 */
export declare function unlockSkill(state: GameState & {
    skills: SkillTreeState;
}, skillId: string): SkillUnlockResult;
/**
 * 计算技能加成
 */
export declare function calculateSkillBonuses(state: GameState & {
    skills: SkillTreeState;
}): SkillBonuses;
/**
 * 获取可学习的技能列表
 */
export declare function getAvailableSkills(state: GameState & {
    skills: SkillTreeState;
}): Array<{
    skill: SkillDef;
    canUnlock: boolean;
    reason?: string;
}>;
//# sourceMappingURL=skills.d.ts.map