// 成就与图鉴：跨局全局档案。判定在单局结束时统一跑一遍谓词表
import { EventBus, GameEvents } from '../core/EventBus';
import type { RunState, GlobalProfile } from '../data/SaveSchema';

export interface AchievementDef {
    id: string;
    name: string;
    desc: string;
    /** 单局结束时的全局+本局快照判定 */
    check: (g: GlobalProfile, lastRun: RunSnapshot) => boolean;
}

/** 结算时从 RunState 提炼的只读快照 */
export interface RunSnapshot {
    daysSurvived: number;
    endingId: string;
    talentId: string;
    chestsOpened: number;
    dirtyWaterDrunk: number;
    disastersAllPassed: boolean;
    cookedMeals: number;
}

const DEFS: AchievementDef[] = [
    { id: 'first_run', name: '初来乍到', desc: '完成一局', check: g => g.totalRuns >= 1 },
    { id: 'week_alive', name: '活过一周', desc: '存活至第7天',
      check: (_g, r) => r.daysSurvived >= 7 },
    { id: 'chest_lover', name: '开箱快乐', desc: '累计开箱20次', check: g => g.totalChestsOpened >= 20 },
    { id: 'no_dirty_water', name: '戒急用忍', desc: '全程不喝脏水通关',
      check: (_g, r) => r.dirtyWaterDrunk === 0 && isGoodEnding(r.endingId) },
    { id: 'disaster_master', name: '天灾无伤', desc: '三场天灾均达标应对',
      check: (_g, r) => r.disastersAllPassed },
    { id: 'collector', name: '图鉴大师', desc: '解锁全部12个结局',
      check: g => g.endingsUnlocked.length >= 12 },
];

function isGoodEnding(id: string): boolean {
    return ['E01', 'E02', 'E03', 'E05', 'E06'].includes(id);
}

export class AchievementSystem {
    /** 单局结束调用：更新全局档案 + 解锁新成就，返回本次新解锁 */
    static settle(g: GlobalProfile, snap: RunSnapshot): string[] {
        g.totalRuns += 1;
        g.bestDaysSurvived = Math.max(g.bestDaysSurvived, snap.daysSurvived);
        if (!g.endingsUnlocked.includes(snap.endingId)) g.endingsUnlocked.push(snap.endingId);

        const newly: string[] = [];
        for (const def of DEFS) {
            if (!g.achievements.includes(def.id) && def.check(g, snap)) {
                g.achievements.push(def.id);
                newly.push(def.id);
            }
        }
        EventBus.emit(GameEvents.RunEnd, { endingId: snap.endingId, newAchievements: newly });
        return newly;
    }
}
