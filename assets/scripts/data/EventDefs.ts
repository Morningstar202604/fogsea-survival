import type { ItemStack } from './ItemDefs';

export type StatKey = 'hp' | 'hunger' | 'thirst' | 'sanity';
export type EventType = 'daily' | 'crisis' | 'explore' | 'night' | 'story';
export const STAT_KEYS: StatKey[] = ['hp', 'hunger', 'thirst', 'sanity'];

export interface StatCond { op: '>=' | '<='; value: number; }

export interface EffectPayload {
    hp?: number;
    hunger?: number;
    thirst?: number;
    sanity?: number;
    gainItems?: ItemStack[];
    loseItems?: ItemStack[];
    addStatus?: string[];
    removeStatus?: string[];
    setFlags?: string[];
    nextEvent?: string;
    endingId?: string;
    unlockLocation?: string;
    companionJoin?: boolean;                   // 随从入队（老K线）
    chatInject?: string;         // 触发世界频道插播指定池
}

export interface ResultBranch extends EffectPayload {
    weight: number;
    text: string;
}

export interface EventOption {
    text: string;
    requires?: {
        items?: ItemStack[];
        talent?: string;                       // 天赋专属选项
        stats?: Partial<Record<StatKey, StatCond>>;
    };
    results: ResultBranch[];
}

export interface EventConditions {
    dayMin?: number;
    dayMax?: number;
    flags?: string[];
    notFlags?: string[];
    stats?: Partial<Record<StatKey, StatCond>>;
    items?: ItemStack[];
    weathers?: string[];
    disasterActive?: string;                   // 仅在天灾期间
    statuses?: string[];                       // 必须带有的状态
    notStatuses?: string[];                    // 不能带有的状态
}

export interface EventDef {
    id: string;
    title: string;
    text: string;
    type: EventType;
    pool?: string[];                           // explore 类挂地点 id
    weight: number;
    once?: boolean;
    cooldownDays?: number;
    conditions?: EventConditions;
    options: EventOption[];
}

// ===== 配方 =====
export interface RecipeDef {
    id: string;
    name: string;
    costItems: ItemStack[];
    outputKind: 'item' | 'facility' | 'shelterUpgrade';
    outputId: string;                          // 物品id / 设施id / 庇护所等级目标
    unlockDay?: number;
    needsFacility?: string;                    // 需要火堆等前置设施
    desc: string;
}

// ===== 地点 =====
export interface LocationDef {
    id: string;
    name: string;
    unlockDay: number;
    cooldownDays: number;                      // 探索后冷却
    initialStock: number;                      // 本局可搜刮总量（枯竭机制）
    riskRate: number;                          // 触发事件池概率(0~1)
    baseYields: ItemStack[];                   // 保底产出（每次抽1-2组）
    chestChance: number;                       // 追加宝箱概率
    requiresTool?: string;                     // 浓雾深处需火把
    dangerLevel: 1 | 2 | 3 | 4;                // 第六感/T10 提示阈值参考
}

// ===== 宝箱掉落 =====
export interface LootEntry { itemId: string; min: number; max: number; weight: number; }
export interface LootTable { tier: 'wood' | 'copper' | 'silver' | 'gold'; entries: LootEntry[]; }

// ===== 天灾 =====
export interface DisasterDef {
    id: string;                                // cold_snap / acid_rain / beast_tide
    name: string;
    dueDay: number;                            // 固定触发日
    durationDays: number;                      // 持续天数（夜数）
    blockExplore?: boolean;                    // 酸雨：白天禁出
    nightCheck?: {                             // 夜间达标判定
        passIfAnyOf: string[];                 // 满足任一设施/条件 id 即达标
        failHpLoss: number;
        failSanityLoss: number;
        passHpLoss?: number;                   // 达标也有代价（顶住门的撞伤）
    };
    chatPoolId: string;                        // 联动文案池
}

// ===== 结局 =====
export interface EndingDef {
    id: string;                                // E01~
    name: string;
    kind: 'good' | 'hidden' | 'death';
    desc: string;                              // 结算页展示文本模板
}
