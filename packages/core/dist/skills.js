/**
 * 技能树系统
 *
 * 三分支设计：
 * - 科技系（Technology）: 武器制作、建筑升级、自动化生产
 * - 修仙系（Cultivation）: 符箓制作、灵力修炼、法术战斗
 * - 通用系（General）: 探索加速、交易精通、生存专家
 */
/** 技能分支枚举 */
export var SkillBranch;
(function (SkillBranch) {
    SkillBranch["TECHNOLOGY"] = "technology";
    SkillBranch["CULTIVATION"] = "cultivation";
    SkillBranch["GENERAL"] = "general";
})(SkillBranch || (SkillBranch = {}));
/** 科技系技能定义 */
export const TECHNOLOGY_SKILLS = [
    {
        id: 'weapon_master',
        name: '武器大师',
        description: '精通各类武器制作和使用',
        branch: SkillBranch.TECHNOLOGY,
        maxLevel: 3,
        cost: 1,
        effects: [
            {
                level: 1,
                bonuses: { combat_damage: 0.1 },
                description: '武器伤害 +10%',
            },
            {
                level: 2,
                bonuses: { combat_damage: 0.2, unlock_blueprints: true },
                description: '武器伤害 +20%，解锁高级武器图纸',
            },
            {
                level: 3,
                bonuses: { combat_damage: 0.3, durability_reduction: 0.5 },
                description: '武器伤害 +30%，耐久消耗 -50%',
            },
        ],
    },
    {
        id: 'building_expert',
        name: '建筑专家',
        description: '提升建筑效率和质量',
        branch: SkillBranch.TECHNOLOGY,
        maxLevel: 3,
        cost: 1,
        prerequisites: ['weapon_master'],
        effects: [
            {
                level: 1,
                bonuses: { building_cost_reduction: 0.1 },
                description: '建筑成本 -10%',
            },
            {
                level: 2,
                bonuses: { building_cost_reduction: 0.2, automation_unlock: true },
                description: '建筑成本 -20%，解锁自动化生产',
            },
            {
                level: 3,
                bonuses: { building_cost_reduction: 0.3, building_speed: 1.0 },
                description: '建筑成本 -30%，建筑速度 +100%',
            },
        ],
    },
    {
        id: 'trade_magnate',
        name: '交易大亨',
        description: '掌控市场，垄断贸易',
        branch: SkillBranch.TECHNOLOGY,
        maxLevel: 3,
        cost: 2,
        prerequisites: ['building_expert'],
        requiresSpecialization: true,
        effects: [
            {
                level: 1,
                bonuses: { trade_fee_reduction: 0.2 },
                description: '交易手续费 -20%',
            },
            {
                level: 2,
                bonuses: { trade_fee_reduction: 0.4, market_pricing: true },
                description: '交易手续费 -40%，解锁市场定价权',
            },
            {
                level: 3,
                bonuses: { trade_fee_reduction: 0.6, custom_currency: true },
                description: '交易手续费 -60%，可发行自定义货币',
            },
        ],
    },
    {
        id: 'automation_engineer',
        name: '自动化工程师',
        description: '实现全自动生产链',
        branch: SkillBranch.TECHNOLOGY,
        maxLevel: 3,
        cost: 2,
        prerequisites: ['building_expert'],
        effects: [
            {
                level: 1,
                bonuses: { auto_production: 0.2 },
                description: '自动生产效率 +20%',
            },
            {
                level: 2,
                bonuses: { auto_production: 0.5, multi_thread: true },
                description: '自动生产效率 +50%，支持多线程生产',
            },
            {
                level: 3,
                bonuses: { auto_production: 1.0, ai_optimization: true },
                description: '自动生产效率 +100%，AI优化资源配置',
            },
        ],
    },
];
/** 修仙系技能定义 */
export const CULTIVATION_SKILLS = [
    {
        id: 'talisman_maker',
        name: '符箓师',
        description: '制作各种增益符箓',
        branch: SkillBranch.CULTIVATION,
        maxLevel: 3,
        cost: 1,
        effects: [
            {
                level: 1,
                bonuses: { talisman_unlock: 'basic', talisman_effectiveness: 1.2 },
                description: '解锁基础符箓制作，效果+20%',
            },
            {
                level: 2,
                bonuses: { talisman_effectiveness: 1.5, advanced_talismans: true },
                description: '符箓效果 +50%，解锁高级符箓',
            },
            {
                level: 3,
                bonuses: { talisman_effectiveness: 2.0, legendary_talismans: true },
                description: '符箓效果 +100%，解锁传说符箓',
            },
        ],
    },
    {
        id: 'spirit_cultivation',
        name: '灵力修炼',
        description: '提升灵力上限和恢复速度',
        branch: SkillBranch.CULTIVATION,
        maxLevel: 3,
        cost: 1,
        prerequisites: ['talisman_maker'],
        effects: [
            {
                level: 1,
                bonuses: { max_spirit: 100, spirit_recovery: 1.2 },
                description: '最大灵力 +100，恢复速度 +20%',
            },
            {
                level: 2,
                bonuses: { max_spirit: 200, spirit_recovery: 1.5 },
                description: '最大灵力 +200，恢复速度 +50%',
            },
            {
                level: 3,
                bonuses: { max_spirit: 500, spirit_recovery: 2.0, spell_combat: true },
                description: '最大灵力 +500，恢复速度 +100%，解锁法术战斗',
            },
        ],
    },
    {
        id: 'artifact_forger',
        name: '炼器师',
        description: '强化和附魔装备',
        branch: SkillBranch.CULTIVATION,
        maxLevel: 3,
        cost: 2,
        prerequisites: ['spirit_cultivation'],
        requiresSpecialization: true,
        effects: [
            {
                level: 1,
                bonuses: { enchant_success_rate: 0.2 },
                description: '装备强化成功率 +20%',
            },
            {
                level: 2,
                bonuses: { enchant_success_rate: 0.4, enchant_slots: 2 },
                description: '装备强化成功率 +40%，附魔槽位+2',
            },
            {
                level: 3,
                bonuses: { enchant_success_rate: 0.7, enchant_slots: 3, auto_upgrade: true },
                description: '装备强化成功率 +70%，附魔槽位+3，装备品质自动提升',
            },
        ],
    },
    {
        id: 'formation_master',
        name: '阵法大师',
        description: '布置各种阵法增强基地',
        branch: SkillBranch.CULTIVATION,
        maxLevel: 3,
        cost: 2,
        prerequisites: ['spirit_cultivation'],
        effects: [
            {
                level: 1,
                bonuses: { formation_defense: 1.2 },
                description: '阵法防御力 +20%',
            },
            {
                level: 2,
                bonuses: { formation_defense: 1.5, formation_types: 3 },
                description: '阵法防御力 +50%，解锁3种新阵法',
            },
            {
                level: 3,
                bonuses: { formation_defense: 2.0, formation_types: 6, auto_activate: true },
                description: '阵法防御力 +100%，解锁6种阵法，自动激活',
            },
        ],
    },
];
/** 通用系技能定义 */
export const GENERAL_SKILLS = [
    {
        id: 'explorer',
        name: '探索者',
        description: '提升探索效率和发现能力',
        branch: SkillBranch.GENERAL,
        maxLevel: 3,
        cost: 1,
        effects: [
            {
                level: 1,
                bonuses: { fog_disperse_range: 2, movement_speed: 0.2 },
                description: '迷雾驱散范围 +2米，移动速度 +20%',
            },
            {
                level: 2,
                bonuses: { fog_disperse_range: 4, movement_speed: 0.4, hidden_chest_chance: 0.05 },
                description: '迷雾驱散范围 +4米，移动速度 +40%，发现隐藏宝箱概率 +5%',
            },
            {
                level: 3,
                bonuses: { fog_disperse_range: 6, movement_speed: 0.6, hidden_chest_chance: 0.1, map_reveal: true },
                description: '迷雾驱散范围 +6米，移动速度 +60%，发现隐藏宝箱概率 +10%，可透视小地图',
            },
        ],
    },
    {
        id: 'survival_expert',
        name: '生存专家',
        description: '降低资源消耗，提升自然恢复',
        branch: SkillBranch.GENERAL,
        maxLevel: 3,
        cost: 1,
        effects: [
            {
                level: 1,
                bonuses: { resource_consumption: 0.9 },
                description: '资源消耗 -10%',
            },
            {
                level: 2,
                bonuses: { resource_consumption: 0.8, natural_recovery: 1.3 },
                description: '资源消耗 -20%，自然恢复速度 +30%',
            },
            {
                level: 3,
                bonuses: { resource_consumption: 0.7, natural_recovery: 1.5, immunity_to_debuffs: true },
                description: '资源消耗 -30%，自然恢复速度 +50%，免疫负面环境影响',
            },
        ],
    },
    {
        id: 'lucky_one',
        name: '幸运儿',
        description: '提升幸运值，增加稀有掉落',
        branch: SkillBranch.GENERAL,
        maxLevel: 3,
        cost: 1,
        effects: [
            {
                level: 1,
                bonuses: { luck: 5, crit_chance: 0.1 },
                description: '幸运值 +5，暴击率 +10%',
            },
            {
                level: 2,
                bonuses: { luck: 10, crit_chance: 0.2, rare_drop_bonus: 0.1 },
                description: '幸运值 +10，暴击率 +20%，稀有掉落概率 +10%',
            },
            {
                level: 3,
                bonuses: { luck: 20, crit_chance: 0.3, rare_drop_bonus: 0.15, legendary_drop: true },
                description: '幸运值 +20，暴击率 +30%，稀有掉落概率 +15%，有几率获得传说物品',
            },
        ],
    },
    {
        id: 'diplomat',
        name: '外交官',
        description: '改善与其他幸存者的关系',
        branch: SkillBranch.GENERAL,
        maxLevel: 3,
        cost: 2,
        effects: [
            {
                level: 1,
                bonuses: { npc_favor_gain: 1.2 },
                description: 'NPC好感度获取 +20%',
            },
            {
                level: 2,
                bonuses: { npc_favor_gain: 1.5, alliance_discount: 0.1 },
                description: 'NPC好感度获取 +50%，联盟交易折扣 -10%',
            },
            {
                level: 3,
                bonuses: { npc_favor_gain: 2.0, alliance_discount: 0.2, recruit_bonus: true },
                description: 'NPC好感度获取 +100%，联盟交易折扣 -20%，招募成功率提升',
            },
        ],
    },
];
/** 所有技能定义 */
export const ALL_SKILLS = [
    ...TECHNOLOGY_SKILLS,
    ...CULTIVATION_SKILLS,
    ...GENERAL_SKILLS,
];
/** 技能定义映射表 */
export const SKILL_DEF_MAP = Object.fromEntries(ALL_SKILLS.map((skill) => [skill.id, skill]));
/**
 * 创建初始技能树状态
 */
export function createInitialSkillTree() {
    return {
        points: 0,
        totalPoints: 0,
        skills: {},
        canChooseSpecialization: false,
    };
}
/**
 * 获得技能点（通过升级、完成任务等）
 */
export function gainSkillPoints(state, amount) {
    state.skills.points += amount;
    state.skills.totalPoints += amount;
    // 达到30级时可以选择专精
    if (state.skills.totalPoints >= 30 && !state.skills.specialization) {
        state.skills.canChooseSpecialization = true;
    }
}
/**
 * 选择专精
 */
export function chooseSpecialization(state, branch) {
    if (!state.skills.canChooseSpecialization) {
        return {
            success: false,
            message: '还未达到选择专精的条件（需要累计30技能点）',
        };
    }
    if (state.skills.specialization) {
        return {
            success: false,
            message: `已经选择了${getBranchName(state.skills.specialization)}专精，无法更改`,
        };
    }
    state.skills.specialization = branch;
    state.skills.canChooseSpecialization = false;
    return {
        success: true,
        message: `成功选择${getBranchName(branch)}专精！现在可以学习该分支的专属技能。`,
        branch,
    };
}
/**
 * 解锁/升级技能
 */
export function unlockSkill(state, skillId) {
    const skillDef = SKILL_DEF_MAP[skillId];
    if (!skillDef) {
        return { success: false, message: '未知的技能' };
    }
    const currentSkill = state.skills.skills[skillId];
    const currentLevel = currentSkill?.level ?? 0;
    // 检查是否已达最高级
    if (currentLevel >= skillDef.maxLevel) {
        return { success: false, message: `${skillDef.name}已达到最高等级` };
    }
    // 检查技能点
    if (state.skills.points < skillDef.cost) {
        return {
            success: false,
            message: `技能点不足！需要${skillDef.cost}点，当前只有${state.skills.points}点`,
        };
    }
    // 检查前置技能
    if (skillDef.prerequisites) {
        for (const prereq of skillDef.prerequisites) {
            const prereqSkill = state.skills.skills[prereq];
            if (!prereqSkill || prereqSkill.level === 0) {
                return {
                    success: false,
                    message: `需要先解锁${SKILL_DEF_MAP[prereq]?.name || prereq}`,
                };
            }
        }
    }
    // 检查专精要求
    if (skillDef.requiresSpecialization) {
        if (!state.skills.specialization) {
            return {
                success: false,
                message: '需要先选择专精才能学习此技能',
            };
        }
        if (skillDef.branch !== state.skills.specialization) {
            return {
                success: false,
                message: `这是${getBranchName(skillDef.branch)}专精的技能，你选择的是${getBranchName(state.skills.specialization)}`,
            };
        }
    }
    // 扣除技能点并升级
    state.skills.points -= skillDef.cost;
    if (!currentSkill) {
        // 首次解锁
        state.skills.skills[skillId] = {
            id: skillId,
            level: 1,
            unlocked: true,
        };
    }
    else {
        // 升级
        currentSkill.level += 1;
    }
    const newLevel = state.skills.skills[skillId].level;
    const effect = skillDef.effects.find((e) => e.level === newLevel);
    return {
        success: true,
        message: `${skillDef.name} ${currentLevel === 0 ? '解锁' : '升级'}至 Lv.${newLevel}！${effect?.description || ''}`,
        skill: skillDef,
        newLevel,
    };
}
/**
 * 计算技能加成
 */
export function calculateSkillBonuses(state) {
    const bonuses = {
        combat: {
            damageMultiplier: 1.0,
            defenseBonus: 0,
            critChance: 0,
        },
        survival: {
            resourceConsumptionReduction: 0,
            recoveryBonus: 0,
            explorationSpeed: 0,
        },
        economy: {
            tradeDiscount: 0,
            productionBonus: 0,
            craftingSpeed: 0,
        },
        special: {},
    };
    // 遍历所有已解锁的技能
    for (const [skillId, skillState] of Object.entries(state.skills.skills)) {
        if (!skillState.unlocked || skillState.level === 0)
            continue;
        const skillDef = SKILL_DEF_MAP[skillId];
        if (!skillDef)
            continue;
        const effect = skillDef.effects.find((e) => e.level === skillState.level);
        if (!effect)
            continue;
        // 应用加成
        for (const [key, value] of Object.entries(effect.bonuses)) {
            applyBonus(bonuses, key, value);
        }
    }
    return bonuses;
}
/**
 * 应用单个加成
 */
function applyBonus(bonuses, key, value) {
    switch (key) {
        // 战斗类
        case 'combat_damage':
            bonuses.combat.damageMultiplier += value;
            break;
        case 'crit_chance':
            bonuses.combat.critChance += value;
            break;
        // 生存类
        case 'resource_consumption':
            bonuses.survival.resourceConsumptionReduction += (1 - value);
            break;
        case 'natural_recovery':
            bonuses.survival.recoveryBonus += value - 1;
            break;
        case 'fog_disperse_range':
        case 'movement_speed':
            bonuses.survival.explorationSpeed += value;
            break;
        // 经济类
        case 'trade_fee_reduction':
            bonuses.economy.tradeDiscount += value;
            break;
        case 'auto_production':
        case 'building_speed':
            bonuses.economy.productionBonus += value;
            break;
        // 特殊加成存入special
        default:
            bonuses.special[key] = value;
            break;
    }
}
/**
 * 获取分支中文名
 */
function getBranchName(branch) {
    const names = {
        [SkillBranch.TECHNOLOGY]: '科技',
        [SkillBranch.CULTIVATION]: '修仙',
        [SkillBranch.GENERAL]: '通用',
    };
    return names[branch];
}
/**
 * 获取可学习的技能列表
 */
export function getAvailableSkills(state) {
    const result = [];
    for (const skill of ALL_SKILLS) {
        let canUnlock = true;
        let reason = '';
        const currentSkill = state.skills.skills[skill.id];
        const currentLevel = currentSkill?.level ?? 0;
        // 检查是否已满级
        if (currentLevel >= skill.maxLevel) {
            canUnlock = false;
            reason = '已满级';
        }
        // 检查技能点
        if (canUnlock && state.skills.points < skill.cost) {
            canUnlock = false;
            reason = `需要${skill.cost}技能点`;
        }
        // 检查前置技能
        if (canUnlock && skill.prerequisites) {
            for (const prereq of skill.prerequisites) {
                const prereqSkill = state.skills.skills[prereq];
                if (!prereqSkill || prereqSkill.level === 0) {
                    canUnlock = false;
                    reason = `需要先学习${SKILL_DEF_MAP[prereq]?.name}`;
                    break;
                }
            }
        }
        // 检查专精要求
        if (canUnlock && skill.requiresSpecialization) {
            if (!state.skills.specialization) {
                canUnlock = false;
                reason = '需要先选择专精';
            }
            else if (skill.branch !== state.skills.specialization) {
                canUnlock = false;
                reason = `需要${getBranchName(skill.branch)}专精`;
            }
        }
        result.push({ skill, canUnlock, reason });
    }
    return result;
}
//# sourceMappingURL=skills.js.map