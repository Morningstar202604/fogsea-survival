import { computeRank } from './ranking.js';
export const ACHIEVEMENTS = [
    { id: 'first_talent', name: '天赋觉醒', desc: '完成第一次开局天赋选择', check: (s) => !!s.flags['talent_chosen'] },
    { id: 'survivor_7', name: '迷雾七日', desc: '存活到第 7 天', check: (s) => s.day >= 7 },
    { id: 'survivor_30', name: '雾海一月', desc: '存活到第 30 天', check: (s) => s.day >= 30 },
    { id: 'survivor_60', name: '雾海老兵', desc: '存活到第 60 天', check: (s) => s.day >= 60 },
    { id: 'base_3', name: '山谷堡垒', desc: '基地达到 3 级', check: (s) => (s.base?.level ?? 0) >= 3 },
    { id: 'spec_first', name: '专精之路', desc: '完成技能专精选择', check: (s) => !!s.skills?.specialization },
    { id: 'item_lv3', name: '大师之作', desc: '任一物品熟练度达到 Lv.3', check: (s) => Object.values(s.itemLevels ?? {}).some((r) => r.level >= 3) },
    { id: 'first_kill', name: '初次见血', desc: '击杀第一只迷雾野兽', check: (s) => (s.runStats?.kills ?? 0) >= 1 },
    { id: 'kills_20', name: '雾海猎王', desc: '累计击杀 20 只野兽', check: (s) => (s.runStats?.kills ?? 0) >= 20 },
    { id: 'rank_10', name: '崭露头角', desc: '幸存者排行榜进入前十', check: (s) => computeRank(s) <= 10 },
    { id: 'first_ending', name: '结局收藏家', desc: '解锁第一个结局', check: (s) => (s.meta?.unlockedEndings?.length ?? 0) >= 1 },
    { id: 'truth_seeker', name: '真相窥视者', desc: '抄录古代石碑的碑文', check: (s) => !!s.flags['ruins_truth_1'] },
];
/** 检查并解锁新成就；返回新达成的成就列表（已去重，直接写 meta）。 */
export function checkAchievements(state) {
    if (!state.meta.unlockedAchievements)
        state.meta.unlockedAchievements = [];
    const owned = new Set(state.meta.unlockedAchievements);
    const newly = [];
    for (const a of ACHIEVEMENTS) {
        if (owned.has(a.id))
            continue;
        if (a.check(state)) {
            state.meta.unlockedAchievements.push(a.id);
            newly.push(a);
        }
    }
    return newly;
}
//# sourceMappingURL=achievements.js.map