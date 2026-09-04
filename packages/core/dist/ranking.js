import { getCompanionRankBonus } from './companions.js';
export const RANK_TOTAL = 162;
/** 虚拟竞争者名单：播报相邻排名的对手，增强"有人在与你赛跑"的实感 */
const RIVAL_NAMES = [
    '隔壁老王', '雾都小白', '独狼阿杰', '囤货狂魔', '种田老陈',
    '夜猫子琳', '铁壁大叔', '捡漏达人', '山间隐士', '渔夫老赵',
    '修道者云', '枪械师凯', '医生苏', '鼠王之影', '机械师诺',
    '拾荒少女', '猎人老周', '诗人阿盲',
];
/** 当前排名：1 最好。开局约 #81，竞争者每日追赶，玩家的成长对冲下滑。 */
export function computeRank(state) {
    const day = Math.max(0, state.day - 1);
    const drift = Math.floor(day * 0.6); // 世界在进步，别人也在变强（放缓：满配玩家 D80 可入前三）
    const lead = (state.base?.level ?? 1) * 10 +
        Math.max(0, (state.progression?.currentWorldTier ?? 1) - 1) * 15 +
        Math.floor((state.attributes?.luck ?? 0) / 2) +
        Math.min(15, Object.keys(state.inventory ?? {}).length) +
        getCompanionRankBonus(state);
    const rank = 81 - lead + drift;
    return Math.min(RANK_TOTAL, Math.max(1, rank));
}
/** 每 3 天的排行榜播报；无播报日返回 null。 */
export function rankMessage(state) {
    if (state.day % 3 !== 0)
        return null;
    const rank = computeRank(state);
    const aboveIdx = rank - 2;
    const rival = RIVAL_NAMES[Math.abs(aboveIdx) % RIVAL_NAMES.length];
    if (rank <= 3) {
        return `【排行榜】你已杀入前三！当前排名 #${rank} / ${RANK_TOTAL}。雾海之上，所有人都在看你的直播。`;
    }
    return `【排行榜】当前排名 #${rank} / ${RANK_TOTAL}。你前面是「${rival}」，他昨天刚升了 2 级基地。`;
}
// ============================================================
// 不进则退机制
// ============================================================
/** 排位等级 */
export var RankingTier;
(function (RankingTier) {
    RankingTier["S"] = "S";
    RankingTier["A"] = "A";
    RankingTier["B"] = "B";
    RankingTier["C"] = "C";
    RankingTier["D"] = "D"; // 榜单第21-162名
})(RankingTier || (RankingTier = {}));
/** 默认排名积分系统 */
export const defaultRankingSystem = {
    decayRate: 0.1,
    minimumProtectionDays: 7,
    scoringComponents: {
        survivalDays: (days) => Math.min(30, days / 5),
        baseLevel: (level) => level * 2,
        resources: (total) => Math.min(20, total / 100),
        companions: (count) => Math.min(15, count * 2),
        achievements: (count) => Math.min(10, count),
    },
};
/** 计算总分 */
export function calculateTotalScore(entry, system) {
    const { scoringComponents } = system;
    return (scoringComponents.survivalDays(entry.survivalDays) +
        scoringComponents.baseLevel(entry.baseLevel) +
        scoringComponents.resources(entry.totalResources) +
        scoringComponents.companions(entry.companionCount) +
        scoringComponents.achievements(entry.achievementCount));
}
/** 确定排位 tier */
export function determineTier(totalScore) {
    if (totalScore >= 85)
        return RankingTier.S;
    if (totalScore >= 70)
        return RankingTier.A;
    if (totalScore >= 55)
        return RankingTier.B;
    if (totalScore >= 40)
        return RankingTier.C;
    return RankingTier.D;
}
/** 应用不进则退机制 */
export function applyDecay(entry, system, _currentDay) {
    if (entry.daysSinceLastLogin < system.minimumProtectionDays) {
        return entry;
    }
    const decayDays = entry.daysSinceLastLogin - system.minimumProtectionDays;
    const decayFactor = 1 - system.decayRate * decayDays;
    const newTotalScore = Math.max(0, entry.totalScore * decayFactor);
    return {
        ...entry,
        totalScore: newTotalScore,
        tier: determineTier(newTotalScore),
    };
}
/** 更新排行榜 */
export function updateRanking(newEntry, currentState, system) {
    const updatedEntries = [...currentState.entries, newEntry];
    updatedEntries.sort((a, b) => b.totalScore - a.totalScore);
    const maxPlayers = 162;
    if (updatedEntries.length > maxPlayers) {
        updatedEntries.pop();
    }
    return {
        entries: updatedEntries,
        totalPlayers: Math.min(maxPlayers, updatedEntries.length),
        lastUpdated: Date.now(),
        protectionPeriodActive: newEntry.daysSinceLastLogin < system.minimumProtectionDays,
    };
}
export function distributeSettlementAward(tier, state) {
    const baseRewards = {
        tier,
        survivalDays: state.day,
        baseLevel: state.base?.level ?? 1,
        resources: Object.values(state.inventory).reduce((a, b) => a + b, 0),
        companions: Object.keys(state.flags).filter(f => f.startsWith('companion_')).length,
        achievements: state.meta?.unlockedAchievements?.length ?? 0,
        tierBonus: [],
        mainReward: '',
    };
    switch (tier) {
        case RankingTier.S:
            baseRewards.tierBonus = ['专属称号', '稀有皮肤', '游戏内永久Buff'];
            baseRewards.mainReward = '传说级物资箱';
            break;
        case RankingTier.A:
            baseRewards.tierBonus = ['游戏内货币', '高级物资包', '独特建筑蓝图'];
            baseRewards.mainReward = '高级物资箱';
            break;
        case RankingTier.B:
            baseRewards.tierBonus = ['基础物资包', '普通建筑蓝图', '经验加成'];
            baseRewards.mainReward = '中级物资箱';
            break;
        case RankingTier.C:
            baseRewards.tierBonus = ['基础物资包', '基础蓝图', '少量经验'];
            baseRewards.mainReward = '基础物资箱';
            break;
        case RankingTier.D:
            baseRewards.tierBonus = ['最低通关奖励', '基础经验'];
            baseRewards.mainReward = '生存奖励包';
            break;
    }
    return baseRewards;
}
//# sourceMappingURL=ranking.js.map