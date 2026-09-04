import { deltaResource } from './resources.js';
export const COMPANION_DEFS = [
    {
        id: 'duoduo',
        name: '朵朵',
        recruitFavor: 30,
        defense: 10,
        rankBonus: 5,
        joinText: '朵朵把她的布娃娃摆在了窗台上——这里现在是「我们家」了。',
        daily: (s) => {
            deltaResource(s.resources.sanity, 2);
            return '朵朵给你讲了便利店时代的冷笑话（理智+2）';
        },
    },
    {
        id: 'laok',
        name: '老K',
        recruitFavor: 30,
        defense: 30,
        rankBonus: 5,
        joinText: '老K检查了一遍你的木刺，没说话，但把他的备用匕首留在了桌上。',
        daily: (s) => {
            deltaResource(s.resources.energy, 3);
            return '老K包揽了后半夜的守夜（体力+3）';
        },
    },
    {
        id: 'doc',
        name: '林医生',
        recruitFavor: 30,
        defense: 5,
        rankBonus: 5,
        joinText: '林医生把药箱锁进了木屋的柜子：「以后换药按时来。」',
        daily: (s) => {
            deltaResource(s.resources.health, 3);
            return '林医生查了房，处理了你的旧伤（生命+3）';
        },
    },
    {
        id: 'rat',
        name: '鼠王',
        recruitFavor: 30,
        defense: 0,
        rankBonus: 10,
        joinText: '鼠王收起了他的王冠（一个瓶盖），把下水道的门钥匙留给了你。',
        // 谈判力：出售价 +10%（economy.sellToMerchant 读取 companion_rat flag）
    },
    {
        id: 'rescue',
        name: '救援队',
        recruitFavor: 30,
        defense: 20,
        rankBonus: 15,
        joinText: '7号避难所的三个人扛着器械住了进来。电台里，你的呼号变成了「前哨站」。',
    },
    {
        id: 'crystal',
        name: '结晶之声',
        recruitFavor: 30,
        defense: 15,
        rankBonus: 5,
        joinText: '结晶悬浮在你枕边，像一盏不灭的灯。雾从此绕着你的木屋走。',
        daily: (s) => {
            deltaResource(s.resources.sanity, 3);
            return '结晶之夜：低哼的频率抚平了你的梦（理智+3）';
        },
    },
];
export function isRecruited(state, companionId) {
    return !!state.flags[`companion_${companionId}`];
}
/** 当前同伴的防御协防总值（计入天灾判定） */
export function getCompanionDefense(state) {
    return COMPANION_DEFS.filter((c) => isRecruited(state, c.id)).reduce((sum, c) => sum + c.defense, 0);
}
/** 当前同伴的排行榜声望加成 */
export function getCompanionRankBonus(state) {
    return COMPANION_DEFS.filter((c) => isRecruited(state, c.id)).reduce((sum, c) => sum + c.rankBonus, 0);
}
/** 招募同伴：好感达标后写入 companion_* 标记，返回招募播报。 */
export function recruitCompanion(state, companionId, currentFavor) {
    const def = COMPANION_DEFS.find((c) => c.id === companionId);
    if (!def)
        return null;
    if (isRecruited(state, companionId))
        return null;
    if (currentFavor < def.recruitFavor)
        return null;
    state.flags[`companion_${companionId}`] = true;
    return `【同伴】${def.joinText}`;
}
/** 每日同伴被动（runDaily 调用） */
export function applyCompanionDaily(state) {
    const messages = [];
    for (const c of COMPANION_DEFS) {
        if (!isRecruited(state, c.id) || !c.daily)
            continue;
        const msg = c.daily(state);
        if (msg)
            messages.push(`【同伴】${msg}`);
    }
    return messages;
}
// ============================================================
// 支线任务和好感度系统
// ============================================================
/** 好感度等级 */
export var AffectionLevel;
(function (AffectionLevel) {
    AffectionLevel["LOW"] = "low";
    AffectionLevel["MEDIUM"] = "medium";
    AffectionLevel["HIGH"] = "high";
    AffectionLevel["VERY_HIGH"] = "veryHigh"; // 81-100：专属结局条件
})(AffectionLevel || (AffectionLevel = {}));
/** 同伴状态 */
export var CompanionStatus;
(function (CompanionStatus) {
    CompanionStatus["FRIEND"] = "friend";
    CompanionStatus["ALLY"] = "ally";
    CompanionStatus["LOVER"] = "lover";
    CompanionStatus["BETRAYED"] = "betrayed";
    CompanionStatus["LEFT"] = "left"; // 已离开
})(CompanionStatus || (CompanionStatus = {}));
/** 同伴支线任务定义 */
export const COMPANION_QUESTS = {
    duoduo: [
        {
            id: 'duoduo_main',
            name: '朵朵的过去',
            description: '了解朵朵的过去，帮助她找到家人',
            type: 'main',
            minAffection: 20,
            completionReward: {
                affectionChange: 15,
                items: { mysterious_crystal: 1 },
                flags: { quest_duoduo_main_completed: true },
            },
        },
        {
            id: 'duoduo_special',
            name: '朵朵的礼物',
            description: '为朵朵准备一份特别的礼物',
            type: 'special',
            minAffection: 50,
            completionReward: {
                affectionChange: 20,
                items: { research_data: 1 },
                flags: { quest_duoduo_special_completed: true },
            },
        },
        {
            id: 'duoduo_relationship',
            name: '朵朵的信任',
            description: '加深与朵朵的感情，建立深厚信任',
            type: 'relationship',
            minAffection: 80,
            completionReward: {
                affectionChange: 25,
                flags: { quest_duoduo_relationship_completed: true },
            },
        },
    ],
    laok: [
        {
            id: 'laok_main',
            name: '老K的情报',
            description: '协助老K收集情报，建立情报网络',
            type: 'main',
            minAffection: 20,
            completionReward: {
                affectionChange: 10,
                items: { radio_parts: 1 },
                flags: { quest_laok_main_completed: true },
            },
        },
        {
            id: 'laok_special',
            name: '老K的过去',
            description: '了解老K的过去，建立更深的信任',
            type: 'special',
            minAffection: 50,
            completionReward: {
                affectionChange: 15,
                items: { gunpowder: 5 },
                flags: { quest_laok_special_completed: true },
            },
        },
        {
            id: 'laok_relationship',
            name: '老K的忠诚',
            description: '与老K建立深厚的战斗友谊',
            type: 'relationship',
            minAffection: 80,
            completionReward: {
                affectionChange: 20,
                flags: { quest_laok_relationship_completed: true },
            },
        },
    ],
    doc: [
        {
            id: 'doc_main',
            name: '林医生的使命',
            description: '协助林医生治疗病患，建立医疗系统',
            type: 'main',
            minAffection: 20,
            completionReward: {
                affectionChange: 15,
                items: { herb: 10 },
                flags: { quest_doc_main_completed: true },
            },
        },
        {
            id: 'doc_special',
            name: '林医生的过去',
            description: '了解林医生的过去，建立更深的信任',
            type: 'special',
            minAffection: 50,
            completionReward: {
                affectionChange: 20,
                items: { bandage: 5 },
                flags: { quest_doc_special_completed: true },
            },
        },
        {
            id: 'doc_relationship',
            name: '林医生的承诺',
            description: '与林医生建立深厚的信任关系',
            type: 'relationship',
            minAffection: 80,
            completionReward: {
                affectionChange: 25,
                flags: { quest_doc_relationship_completed: true },
            },
        },
    ],
    rat: [
        {
            id: 'rat_main',
            name: '鼠王的交易',
            description: '与鼠王建立交易关系，获得地下情报',
            type: 'main',
            minAffection: 20,
            completionReward: {
                affectionChange: 10,
                items: { mutant_core: 2 },
                flags: { quest_rat_main_completed: true },
            },
        },
        {
            id: 'rat_special',
            name: '鼠王的过去',
            description: '了解鼠王的过去，建立更深的信任',
            type: 'special',
            minAffection: 50,
            completionReward: {
                affectionChange: 15,
                items: { rat_tail: 3 },
                flags: { quest_rat_special_completed: true },
            },
        },
        {
            id: 'rat_relationship',
            name: '鼠王的忠诚',
            description: '与鼠王建立深厚的联盟关系',
            type: 'relationship',
            minAffection: 80,
            completionReward: {
                affectionChange: 20,
                flags: { quest_rat_relationship_completed: true },
            },
        },
    ],
    rescue: [
        {
            id: 'rescue_main',
            name: '救援队的任务',
            description: '配合救援队的登陆作战，建立外部联系',
            type: 'main',
            minAffection: 20,
            completionReward: {
                affectionChange: 15,
                items: { signal_flare: 1 },
                flags: { quest_rescue_main_completed: true },
            },
        },
        {
            id: 'rescue_special',
            name: '救援队的过去',
            description: '了解救援队的过去，建立更深的信任',
            type: 'special',
            minAffection: 50,
            completionReward: {
                affectionChange: 20,
                items: { alliance_badge: 1 },
                flags: { quest_rescue_special_completed: true },
            },
        },
        {
            id: 'rescue_relationship',
            name: '救援队的承诺',
            description: '与救援队建立深厚的同盟关系',
            type: 'relationship',
            minAffection: 80,
            completionReward: {
                affectionChange: 25,
                flags: { quest_rescue_relationship_completed: true },
            },
        },
    ],
    crystal: [
        {
            id: 'crystal_main',
            name: '结晶之声的秘密',
            description: '解码结晶之声的秘密，获得古老知识',
            type: 'main',
            minAffection: 20,
            completionReward: {
                affectionChange: 15,
                items: { mysterious_crystal: 2 },
                flags: { quest_crystal_main_completed: true },
            },
        },
        {
            id: 'crystal_special',
            name: '结晶共鸣',
            description: '与结晶建立更深的联系，获得特殊能力',
            type: 'special',
            minAffection: 50,
            completionReward: {
                affectionChange: 20,
                items: { ancient_scroll: 1 },
                flags: { quest_crystal_special_completed: true },
            },
        },
        {
            id: 'crystal_relationship',
            name: '结晶融合',
            description: '与结晶完全融合，获得超凡力量',
            type: 'relationship',
            minAffection: 80,
            completionReward: {
                affectionChange: 25,
                flags: { quest_crystal_relationship_completed: true },
            },
        },
    ],
};
/** 初始化同伴数据 */
export function initCompanionData() {
    const data = {};
    for (const companion of COMPANION_DEFS) {
        data[companion.id] = {
            id: companion.id,
            name: companion.name,
            affection: 0,
            status: CompanionStatus.FRIEND,
            affectionLevel: AffectionLevel.LOW,
            completedQuests: [],
            triggeredEvents: [],
        };
    }
    return data;
}
/** 获取好感度等级 */
export function getAffectionLevel(affection) {
    if (affection >= 81)
        return AffectionLevel.VERY_HIGH;
    if (affection >= 61)
        return AffectionLevel.HIGH;
    if (affection >= 31)
        return AffectionLevel.MEDIUM;
    return AffectionLevel.LOW;
}
/** 计算好感度变化 */
export function calculateAffectionChange(action, companionId, currentAffection, playerChoiceQuality = 'good') {
    const baseChanges = {
        duoduo: { help: 10, gift: 5, conflict: -5, ignore: 0, rescue: 15 },
        laok: { help: 5, gift: 3, conflict: -3, ignore: 0, rescue: 8 },
        doc: { help: 12, gift: 8, conflict: -8, ignore: 0, rescue: 20 },
        rat: { help: 3, gift: -3, conflict: 5, ignore: 0, rescue: 10 },
        rescue: { help: 7, gift: 5, conflict: -5, ignore: 0, rescue: 15 },
        crystal: { help: 5, gift: 3, conflict: -5, ignore: 0, rescue: 8 },
    };
    const actionChanges = baseChanges[companionId]?.[action] ?? 0;
    let modifier = 1;
    // 根据好感度质量修正
    if (playerChoiceQuality === 'excellent') {
        modifier = 1.5;
    }
    else if (playerChoiceQuality === 'poor') {
        modifier = 0.5;
    }
    const change = Math.round(actionChanges * modifier);
    const newAffection = Math.max(0, Math.min(100, currentAffection + change));
    return {
        change,
        newAffection,
        newLevel: getAffectionLevel(newAffection),
    };
}
/** 触发同伴支线任务 */
export function triggerCompanionQuest(companionId, currentAffection, questType) {
    const quests = COMPANION_QUESTS[companionId];
    if (!quests) {
        return {
            success: false,
            questId: '',
            affectionChange: 0,
            message: '同伴不存在',
        };
    }
    const quest = quests.find(q => q.type === questType && q.minAffection <= currentAffection);
    if (!quest) {
        return {
            success: false,
            questId: '',
            affectionChange: 0,
            message: '没有可用的支线任务',
        };
    }
    return {
        success: true,
        questId: quest.id,
        affectionChange: quest.completionReward.affectionChange,
        message: `触发支线任务: ${quest.name} - ${quest.description}`,
    };
}
/** 处理同伴背叛/离开 */
export function handleCompanionDeparture(companionId, currentAffection, currentStatus) {
    const companion = COMPANION_DEFS.find(c => c.id === companionId);
    const name = companion?.name ?? companionId;
    // 如果好感度很低（≤20）或发生严重冲突
    let newStatus;
    let affectionChange;
    let message;
    if (currentAffection <= 20 && currentStatus === CompanionStatus.FRIEND) {
        // 低好感度自动离开
        newStatus = CompanionStatus.LEFT;
        affectionChange = -currentAffection;
        message = `${name}意识到我们的目标不再一致，决定离开。`;
    }
    else if (currentAffection >= 80 && currentStatus === CompanionStatus.LOVER) {
        // 最高好感度可能转为永久盟友
        newStatus = CompanionStatus.ALLY;
        affectionChange = 0;
        message = `${name}承诺永远站在你身边，无论发生什么。`;
    }
    else if (currentAffection >= 50 && currentStatus === CompanionStatus.ALLY) {
        // 中等高好感度保持盟友
        newStatus = CompanionStatus.ALLY;
        affectionChange = 0;
        message = `${name}作为你的盟友，将继续提供支持。`;
    }
    else {
        // 中等好感度可能背叛或离开
        const betrayalChance = 0.3;
        if (Math.random() < betrayalChance) {
            newStatus = CompanionStatus.BETRAYED;
            affectionChange = -Math.floor(currentAffection / 2);
            message = `${name}背叛了你，转而效力于敌对势力。`;
        }
        else {
            newStatus = CompanionStatus.LEFT;
            affectionChange = -Math.floor(currentAffection * 0.5);
            message = `${name}意识到无法继续，决定离开。`;
        }
    }
    return {
        newStatus,
        affectionChange,
        message,
    };
}
//# sourceMappingURL=companions.js.map