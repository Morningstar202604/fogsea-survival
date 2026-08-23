import type { ActiveStatus } from './StatusDefs';
import type { ItemStack } from './ItemDefs';
import type { StatKey } from './EventDefs';

export const SAVE_VERSION = 2;
export const RUN_KEY = 'qs_run';
export const GLOBAL_KEY = 'qs_global';

export type Phase = 'morning' | 'daytime' | 'dusk' | 'night';

/** 随从（老K）实体 */
export interface Companion {
    hp: number;
    daysUnfed: number;      // 连续未进食天数
    exploredToday: boolean; // 今日是否已派出
}

/** 世界频道隔空交易报价 */
export interface TradeOffer {
    id: string;
    nick: string;
    give: { itemId: string; count: number };   // 我方付出
    get: { itemId: string; count: number };    // 我方获得
}

export interface RunState {
    version: number;
    seed: number;
    day: number;                       // 1 起
    phase: Phase;
    apLeft: number;
    talentId: string;
    stats: Record<StatKey, number>;
    statMax: Record<StatKey, number>;
    statuses: ActiveStatus[];
    inventory: ItemStack[];
    bagCap: number;
    shelterLevel: number;              // 1~3
    facilities: string[];              // campfire / water_filter / trap / signal_pile / radio ...
    fireFuel: number;                  // 火堆剩余燃料(夜数)
    unlockedLocations: string[];
    locationCooldowns: Record<string, number>;   // 地点id → 剩余冷却天数
    locationStock: Record<string, number>;       // 地点剩余可搜刮量（v2）
    flags: string[];
    firedEvents: { id: string; lastDay: number }[];  // once + 冷却记录
    weather: string;                   // sunny / fog_thick / rain / cold_front / acid_rain
    weatherTomorrow: string | null;    // 收音机预报用（v2）
    disasterNext: { id: string; dueDay: number; activeToday: boolean } | null;
    chatCursors: Record<string, number>;
    sanZeroStreak: number;
    endingId: string | null;           // 被事件直设时非空
    /** 局内统计计数：chestsOpened / dirtyWaterDrunk / cookedMeals ... */
    counters: Record<string, number>;
    companion: Companion | null;       // 随从（v2）
    tradesToday: TradeOffer[];         // 今日交易报价（v2）
    tradesAccepted: string[];          // 今日已接受报价 id（v2）
}

export interface GlobalProfile {
    version: number;
    totalRuns: number;
    bestDaysSurvived: number;
    endingsUnlocked: string[];
    achievements: string[];
    totalChestsOpened: number;
}
