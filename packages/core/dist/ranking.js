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
//# sourceMappingURL=ranking.js.map