/**
 * 故事推进机制系统
 *
 * 核心设计理念：通过强制事件、世界升级、资源枯竭等机制，
 * 确保游戏始终向前推进，避免玩家原地踏步。
 */
import { gainSkillPoints } from './skills.js';
import { ITEM_DATABASE } from './economy.js';
import { recalcBaseDefense } from './base.js';
import { getCompanionDefense } from './companions.js';
/** 默认世界等级配置（基于小说设定） */
export const DEFAULT_WORLD_TIERS = [
    {
        triggerDay: 1,
        name: '迷雾初现',
        description: '世界被迷雾笼罩，你从一个小木屋开始求生之旅。',
        difficultyMultiplier: 1.0,
        unlocks: ['basic_exploration', 'simple_crafting'],
    },
    {
        triggerDay: 7,
        name: '迷雾加深',
        description: '迷雾变得更加浓重，怪物开始进化，危险等级提升。',
        difficultyMultiplier: 1.5,
        unlocks: ['advanced_monsters', 'rare_resources', 'skill_tree_unlock'],
        forcedEvent: 'first_beast_wave_warning',
    },
    {
        triggerDay: 15,
        name: '兽潮前夕',
        description: '远处传来野兽的咆哮声，大规模兽潮即将来临。',
        difficultyMultiplier: 2.0,
        unlocks: ['defense_structures', 'alliance_system', 'trade_market'],
        forcedEvent: 'beast_wave_preparation',
    },
    {
        triggerDay: 30,
        name: '力量觉醒',
        description: '迷雾中蕴含的神秘力量开始显现，你可以选择科技或修仙之路。',
        difficultyMultiplier: 3.0,
        unlocks: ['specialization_choice', 'magic_items', 'advanced_crafting'],
        forcedEvent: 'power_awakening',
    },
    {
        triggerDay: 50,
        name: '真相浮现',
        description: '古老的遗迹被发现，迷雾世界的真相逐渐揭开。',
        difficultyMultiplier: 4.0,
        unlocks: ['ancient_ruins', 'truth_quests', 'ending_paths'],
        forcedEvent: 'ancient_ruins_discovery',
    },
    {
        triggerDay: 80,
        name: '终极考验',
        description: '迷雾之主即将苏醒，最后的决战即将到来。',
        difficultyMultiplier: 5.0,
        unlocks: ['final_battle', 'true_endings'],
        forcedEvent: 'final_countdown',
    },
];
/** 天灾事件池 */
export const CATASTROPHE_EVENTS = [
    {
        id: 'beast_wave_tier1',
        triggerDay: 10,
        warningDays: 3,
        name: '初级兽潮',
        description: '成群的野兽从迷雾中涌出，袭击所有幸存者基地。',
        type: 'beast_wave',
        duration: 1,
        severity: 3,
        requirements: {
            minBaseLevel: 2,
            minDefense: 50,
        },
        successRewards: {
            xp: 200,
            items: { beast_core: 3, rare_material: 2 },
            unlock: 'beast_hunting_technique',
        },
        failurePenalties: {
            resourceLoss: { food: 50, wood: 30 },
            structureDamage: 30,
            healthDamage: 20,
        },
    },
    {
        id: 'extreme_cold',
        triggerDay: 20,
        warningDays: 5,
        name: '极寒来袭',
        description: '气温骤降，温暖度消耗加倍，露天活动变得极其危险。',
        type: 'extreme_weather',
        duration: 5,
        severity: 5,
        requirements: {
            minBaseLevel: 3,
            requiredResources: { fuel: 100, warm_clothing: 2 },
        },
        successRewards: {
            xp: 300,
            unlock: 'cold_resistance',
        },
        failurePenalties: {
            healthDamage: 50,
            resourceLoss: { fuel: 80 },
        },
    },
    {
        id: 'beast_wave_tier2',
        triggerDay: 35,
        warningDays: 5,
        name: '中级兽潮',
        description: '进化的野兽群出现，拥有特殊能力，普通防御难以抵挡。',
        type: 'beast_wave',
        duration: 2,
        severity: 6,
        requirements: {
            minBaseLevel: 4,
            minDefense: 150,
        },
        successRewards: {
            xp: 500,
            items: { evolved_beast_core: 5, magic_crystal: 3 },
            unlock: 'advanced_defense_blueprints',
        },
        failurePenalties: {
            resourceLoss: { food: 100, stone: 50, metal: 30 },
            structureDamage: 60,
            healthDamage: 40,
        },
    },
    {
        id: 'fog_expansion',
        triggerDay: 45,
        warningDays: 7,
        name: '迷雾扩张',
        description: '迷雾范围扩大，已探索区域重新被覆盖，需要重新驱散。',
        type: 'fog_expansion',
        duration: 3,
        severity: 7,
        requirements: {
            minBaseLevel: 4,
        },
        successRewards: {
            xp: 400,
            unlock: 'fog_compass',
        },
        failurePenalties: {
        // 迷雾扩张无法完全抵御，只能减轻影响
        },
    },
    {
        id: 'beast_wave_tier3',
        triggerDay: 60,
        warningDays: 7,
        name: '高级兽潮',
        description: '兽王率领的精英兽群来袭，这是生死存亡的关键一战。',
        type: 'beast_wave',
        duration: 3,
        severity: 9,
        requirements: {
            minBaseLevel: 5,
            minDefense: 300,
        },
        successRewards: {
            xp: 1000,
            items: { beast_king_core: 1, legendary_material: 5 },
            unlock: 'beast_taming',
        },
        failurePenalties: {
            resourceLoss: { food: 200, wood: 100, stone: 100, metal: 50 },
            structureDamage: 100,
            healthDamage: 80,
        },
    },
];
/** 剧情触发器池 */
export const STORY_TRIGGERS = [
    {
        id: 'mysterious_signal',
        condition: {
            minDay: 10,
            maxDay: 20,
        },
        questId: 'rescue_line',
        onceOnly: true,
        priority: 10,
    },
    {
        id: 'alliance_invitation',
        condition: {
            minBaseLevel: 3,
            minDay: 15,
        },
        questId: 'alliance_line',
        onceOnly: true,
        priority: 9,
    },
    {
        id: 'crystal_discovery',
        condition: {
            minDay: 20,
            flags: ['explored_deep_forest'],
        },
        questId: 'crystal_line',
        onceOnly: true,
        priority: 8,
    },
    {
        id: 'survivor_encounter',
        condition: {
            minDay: 5,
            maxDay: 15,
            notFlags: ['met_other_survivors'],
        },
        questId: 'survivor_story',
        onceOnly: true,
        priority: 7,
    },
    {
        id: 'ancient_ruins_hint',
        condition: {
            minDay: 30,
            minBaseLevel: 4,
            completedTriggers: ['crystal_discovery'],
        },
        questId: 'ruins_exploration',
        onceOnly: true,
        priority: 6,
    },
];
/**
 * 创建初始推进状态
 */
export function createInitialProgressionState() {
    return {
        currentWorldTier: 1,
        triggeredTiers: [1],
        upcomingCatastrophes: [],
        occurredCatastrophes: [],
        triggeredStories: [],
        resourceDepletion: {},
        daysToNextTier: 6, // 第7天升级，所以还有6天
        daysToNextCatastrophe: 7, // 第一个天灾在第10天，警告在第7天
    };
}
/**
 * 检查并应用推进机制
 * 每天调用一次，在 runDaily 之后执行
 */
export function checkProgression(state, content) {
    const check = { messages: [] };
    const { progression } = state;
    // 1. 检查世界等级升级
    const tierUpgrade = checkWorldTierUpgrade(state);
    if (tierUpgrade) {
        check.tierUpgrade = tierUpgrade;
        check.messages.push(`【世界升级】${tierUpgrade.tierInfo.name}！${tierUpgrade.tierInfo.description}`);
        // 如果有强制事件且内容包里定义了该事件，加入待触发队列
        if (tierUpgrade.tierInfo.forcedEvent &&
            content.randomEvents.some((e) => e.id === tierUpgrade.tierInfo.forcedEvent)) {
            state.pendingEvents.push(tierUpgrade.tierInfo.forcedEvent);
        }
    }
    // 2. 检查天灾预警和触发
    const catastropheCheck = checkCatastrophes(state);
    if (catastropheCheck.warning) {
        check.catastropheWarning = catastropheCheck.warning;
        check.messages.push(`【天灾预警】${catastropheCheck.warning.name}将在${catastropheCheck.warning.warningDays}天后降临！`);
    }
    if (catastropheCheck.trigger) {
        check.catastropheTrigger = catastropheCheck.trigger;
        check.messages.push(`【天灾降临】${catastropheCheck.trigger.name}！${catastropheCheck.trigger.description}`);
        // 天灾作为特殊事件处理
        state.pendingEvents.push(`catastrophe_${catastropheCheck.trigger.id}`);
    }
    // 3. 检查剧情触发器
    const storyTrigger = checkStoryTriggers(state);
    if (storyTrigger) {
        check.storyTrigger = storyTrigger;
        // 双轨合并：与 content.lines[].trigger（engine.scheduleLine）共用 enterStoryLine，
        // 统一以 line_done_<id> 判定是否已开启，避免重复触发；无对应支线时不压栈（杜绝假死锁）。
        if (enterStoryLine(state, content, storyTrigger.questId)) {
            check.messages.push(`【剧情触发】新的任务线已开启！`);
        }
    }
    // 4. 检查资源枯竭
    const depletion = checkResourceDepletion(state);
    if (depletion) {
        check.resourceDepletion = depletion;
        check.messages.push(depletion.message);
    }
    // 更新倒计时
    updateCountdowns(progression);
    return check;
}
/**
 * 检查世界等级升级
 */
function checkWorldTierUpgrade(state) {
    const { progression, day } = state;
    for (const tier of DEFAULT_WORLD_TIERS) {
        if (day >= tier.triggerDay && !progression.triggeredTiers.includes(tier.triggerDay)) {
            const oldTier = progression.currentWorldTier;
            const newTierIndex = DEFAULT_WORLD_TIERS.indexOf(tier) + 1;
            progression.currentWorldTier = newTierIndex;
            progression.triggeredTiers.push(tier.triggerDay);
            return {
                oldTier,
                newTier: newTierIndex,
                tierInfo: tier,
            };
        }
    }
    return null;
}
/**
 * 检查天灾事件
 */
function checkCatastrophes(state) {
    const { progression, day } = state;
    const result = {};
    for (const event of CATASTROPHE_EVENTS) {
        // 检查是否已发生
        if (progression.occurredCatastrophes.includes(event.id))
            continue;
        // 检查预警
        const warningDay = event.triggerDay - event.warningDays;
        if (day === warningDay) {
            result.warning = event;
            progression.upcomingCatastrophes.push(event);
        }
        // 检查触发
        if (day === event.triggerDay) {
            result.trigger = event;
            progression.occurredCatastrophes.push(event.id);
            // 从即将到来的列表中移除
            progression.upcomingCatastrophes = progression.upcomingCatastrophes.filter((e) => e.id !== event.id);
        }
    }
    return result;
}
/**
 * 双轨合并入口：STORY_TRIGGERS 与 content.lines[].trigger（engine.scheduleLine）共用同一套
 * 开启判定 —— 统一写 line_done_<id> 旗标，杜绝两轨各自记录导致重复/漏触发。
 * 成功切入支线返回 true；线不存在 / 已开启 / 事件栈占用 / 缺少当前场景时返回 false。
 */
export function enterStoryLine(state, content, lineId) {
    if (state.eventStack.length)
        return false;
    if (state.flags[`line_done_${lineId}`])
        return false;
    const line = (content.lines ?? []).find((l) => l.id === lineId);
    if (!line || !line.initialScene || !state.currentScene)
        return false;
    state.flags[`line_done_${lineId}`] = true;
    state.eventStack.push(state.currentScene);
    state.currentScene = line.initialScene;
    return true;
}
/**
 * 检查剧情触发器
 */
function checkStoryTriggers(state) {
    const { progression } = state;
    // 按优先级排序
    const sortedTriggers = [...STORY_TRIGGERS].sort((a, b) => b.priority - a.priority);
    for (const trigger of sortedTriggers) {
        // 如果是一次性触发且已触发过，跳过
        if (trigger.onceOnly && progression.triggeredStories.includes(trigger.id))
            continue;
        // 检查条件
        if (isTriggerConditionMet(trigger.condition, state)) {
            progression.triggeredStories.push(trigger.id);
            return trigger;
        }
    }
    return null;
}
/**
 * 检查触发条件是否满足
 */
function isTriggerConditionMet(condition, state) {
    if (condition.minDay && state.day < condition.minDay)
        return false;
    if (condition.maxDay && state.day > condition.maxDay)
        return false;
    if (condition.flags && !condition.flags.every((f) => state.flags[f]))
        return false;
    if (condition.notFlags && condition.notFlags.some((f) => state.flags[f]))
        return false;
    // 检查基地等级（需要从state.base获取）
    if (condition.minBaseLevel) {
        const baseLevel = state.base?.level ?? 1;
        if (baseLevel < condition.minBaseLevel)
            return false;
    }
    // 检查技能等级
    if (condition.minSkillLevel) {
        const skills = state.skills;
        if (!skills)
            return false;
        for (const [skillId, minLevel] of Object.entries(condition.minSkillLevel)) {
            if ((skills.levels?.[skillId] ?? 0) < minLevel)
                return false;
        }
    }
    // 检查前置触发器
    if (condition.completedTriggers) {
        const { progression } = state;
        if (!condition.completedTriggers.every((t) => progression.triggeredStories.includes(t))) {
            return false;
        }
    }
    return true;
}
/**
 * 检查资源枯竭
 */
function checkResourceDepletion(state) {
    // 简化版本：当某个区域探索次数过多时标记为枯竭
    // 实际实现需要根据探索系统来定
    const currentArea = state.exploration?.currentArea ?? 'starter_area';
    if (!state.progression.resourceDepletion[currentArea]) {
        // 计算该区域的探索次数
        const explorationCount = state.visitedScenes.filter((s) => s.startsWith(currentArea)).length;
        // 如果探索超过阈值，标记为枯竭
        if (explorationCount > 20) {
            state.progression.resourceDepletion[currentArea] = true;
            return {
                areaId: currentArea,
                message: `【资源枯竭】${currentArea}的资源已经耗尽，你需要前往更远的区域探索。`,
            };
        }
    }
    return null;
}
/**
 * 更新倒计时
 */
function updateCountdowns(progression) {
    // 计算到下次世界升级的天数
    const nextTier = DEFAULT_WORLD_TIERS.find((t) => t.triggerDay > progression.triggeredTiers[progression.triggeredTiers.length - 1]);
    progression.daysToNextTier = nextTier ? nextTier.triggerDay - progression.triggeredTiers.at(-1) : 0;
    // 计算到下次天灾的天数
    const nextCatastrophe = CATASTROPHE_EVENTS.find((e) => !progression.occurredCatastrophes.includes(e.id));
    progression.daysToNextCatastrophe = nextCatastrophe ? nextCatastrophe.triggerDay - (progression.triggeredTiers.at(-1) || 1) : 0;
}
/**
 * 处理天灾结果
 */
/** 天灾结算前置评估：核对基地等级/防御/储备物资，返回是否守住及原因播报。 */
export function evaluateCatastrophe(state, event) {
    const messages = [];
    let success = true;
    const req = event.requirements ?? {};
    if (req.minBaseLevel && state.base.level < req.minBaseLevel) {
        success = false;
        messages.push(`基地等级不足（需要 ${req.minBaseLevel} 级）`);
    }
    // 防御值 = 工事 + 同伴协防（联盟雏形：有人和你并肩守夜）
    const totalDefense = (state.base.totalDefense ?? 0) + getCompanionDefense(state);
    if (req.minDefense != null && totalDefense < req.minDefense) {
        success = false;
        messages.push(`防御工事不足（需要 ${req.minDefense}，当前 ${totalDefense}）`);
    }
    for (const [itemId, need] of Object.entries(req.requiredResources ?? {})) {
        // 内容包引用了不存在的物品（如燃料/御寒衣物）时视为自动满足，避免无解天灾
        if (!ITEM_DATABASE[itemId])
            continue;
        if ((state.inventory[itemId] ?? 0) < need) {
            success = false;
            messages.push(`缺少 ${ITEM_DATABASE[itemId].name}×${need}`);
        }
    }
    if (success)
        messages.push('你做足了准备——工事的轮廓在雾里沉默地站着。');
    return { success, messages };
}
export function resolveCatastrophe(state, event, success) {
    const messages = [];
    if (success) {
        messages.push(`你成功抵御了${event.name}！`);
        // 发放奖励
        if (event.successRewards.xp) {
            const pts = Math.floor(event.successRewards.xp / 100);
            if (pts > 0)
                gainSkillPoints(state, pts);
            messages.push(`获得 ${event.successRewards.xp} 点经验值${pts > 0 ? `（转化为 ${pts} 技能点）` : ''}`);
        }
        if (event.successRewards.items) {
            for (const [item, amount] of Object.entries(event.successRewards.items)) {
                state.inventory[item] = (state.inventory[item] ?? 0) + amount;
                messages.push(`获得 ${item} x${amount}`);
            }
        }
        if (event.successRewards.unlock) {
            state.flags[`unlocked_${event.successRewards.unlock}`] = true;
            messages.push(`解锁新内容：${event.successRewards.unlock}`);
        }
    }
    else {
        messages.push(`你未能完全抵御${event.name}，遭受了损失...`);
        // 应用惩罚
        if (event.failurePenalties.resourceLoss) {
            for (const [key, amount] of Object.entries(event.failurePenalties.resourceLoss)) {
                const resKey = key;
                if (state.resources[resKey]) {
                    state.resources[resKey].current = Math.max(0, state.resources[resKey].current - amount);
                    messages.push(`${key} 损失 ${amount}`);
                }
                else if (ITEM_DATABASE[key]) {
                    // 物品类损失（木材/石材/金属等）
                    state.inventory[key] = Math.max(0, (state.inventory[key] ?? 0) - amount);
                    messages.push(`${ITEM_DATABASE[key].name} 损失 ${amount}`);
                }
            }
        }
        if (event.failurePenalties.healthDamage) {
            state.resources.health.current = Math.max(0, state.resources.health.current - event.failurePenalties.healthDamage);
            messages.push(`生命值损失 ${event.failurePenalties.healthDamage}`);
        }
        if (event.failurePenalties.structureDamage) {
            for (const st of state.base.structures) {
                st.hp = Math.max(0, st.hp - event.failurePenalties.structureDamage);
            }
            const before = state.base.structures.length;
            state.base.structures = state.base.structures.filter((st) => st.hp > 0);
            recalcBaseDefense(state.base);
            const destroyed = before - state.base.structures.length;
            messages.push(destroyed > 0 ? `建筑受损，${destroyed} 座设施被摧毁` : `建筑受损（设施硬撑了下来）`);
        }
    }
    return { messages };
}
//# sourceMappingURL=progression.js.map