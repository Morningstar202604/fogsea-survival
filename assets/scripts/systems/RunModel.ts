// 单局运行时模型 + 游戏上下文（systems 共享的句柄）
import type { AllConfigs } from '../core/ConfigSchema';
import type { RNG } from '../core/RNG';
import type { RunState } from '../data/SaveSchema';
import type { TalentRuntime } from './TalentSystem';

export interface GameCtx {
    cfg: AllConfigs;
    run: RunState;
    rng: RNG;
    talent: TalentRuntime;
}

export function createRunState(seed: number, talentId: string): RunState {
    return {
        version: 2,
        seed,
        day: 1,
        phase: 'morning',
        apLeft: 3,
        talentId,
        stats: { hp: 80, hunger: 80, thirst: 80, sanity: 80 },
        statMax: { hp: 100, hunger: 100, thirst: 100, sanity: 100 },
        statuses: [],
        inventory: [],
        bagCap: 14,
        shelterLevel: 1,
        facilities: [],
        fireFuel: 0,
        unlockedLocations: ['fog_edge'],
        locationCooldowns: {},
        locationStock: {},
        flags: [],
        firedEvents: [],
        weather: 'fog_thick',
        weatherTomorrow: null,
        disasterNext: null,
        chatCursors: {},
        sanZeroStreak: 0,
        endingId: null,
        counters: {},
        companion: null,
        tradesToday: [],
        tradesAccepted: [],
    };
}

/** 全局档案 */
export function createGlobalProfile() {
    return {
        version: 1,
        totalRuns: 0,
        bestDaysSurvived: 0,
        endingsUnlocked: [],
        achievements: [],
        totalChestsOpened: 0,
    };
}
