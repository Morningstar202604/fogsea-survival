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
//# sourceMappingURL=companions.js.map