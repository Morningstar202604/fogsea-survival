/**
 * 经济交易系统 v2.0
 *
 * 核心功能：
 * - 市场交易（玩家与系统商人）
 * - 动态定价（供需关系影响价格）
 * - 货币发行（后期可自定义货币）
 * - 贸易记录
 */
import type { GameState } from './types.js';
/** 物品定义 */
export interface ItemDef {
    id: string;
    name: string;
    description: string;
    category: 'resource' | 'equipment' | 'consumable' | 'material' | 'special';
    basePrice: number;
    stackable: boolean;
    maxStack?: number;
    attack?: number;
    defense?: number;
}
/** 市场价格记录 */
export interface MarketPrice {
    itemId: string;
    currentPrice: number;
    basePrice: number;
    demand: number;
    supply: number;
    lastUpdated: number;
    priceHistory: number[];
}
/** 交易记录 */
export interface TradeRecord {
    id: string;
    day: number;
    type: 'buy' | 'sell';
    itemId: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    trader?: string;
}
/** 商人NPC */
export interface MerchantNPC {
    id: string;
    name: string;
    location: string;
    inventory: Record<string, number>;
    buyMultiplier: number;
    sellMultiplier: number;
    refreshDays: number;
    lastRefresh: number;
}
/** 经济状态 */
export interface EconomyState {
    currency: number;
    customCurrency?: string;
    customAmount: number;
    tradeHistory: TradeRecord[];
    marketPrices: Record<string, MarketPrice>;
    unlockedMerchants: string[];
}
/** 物品数据库 */
export declare const ITEM_DATABASE: Record<string, ItemDef>;
/** 商人NPC数据库 */
export declare const MERCHANT_DATABASE: Record<string, MerchantNPC>;
/**
 * 创建初始经济状态
 */
export declare function createInitialEconomy(): EconomyState;
/**
 * 计算动态价格（基于供需关系）
 */
export declare function calculateDynamicPrice(item: ItemDef, demand: number, supply: number): number;
/**
 * 更新市场价格（每天调用）
 */
export declare function updateMarketPrices(state: GameState & {
    economy: EconomyState;
}, day: number): void;
/**
 * 从商人处购买物品
 */
export declare function buyFromMerchant(state: GameState & {
    economy: EconomyState;
}, merchantId: string, itemId: string, quantity: number): {
    success: boolean;
    message: string;
    cost?: number;
};
/**
 * 向商人出售物品
 */
export declare function sellToMerchant(state: GameState & {
    economy: EconomyState;
}, merchantId: string, itemId: string, quantity: number): {
    success: boolean;
    message: string;
    earnings?: number;
};
/**
 * 发行自定义货币（后期功能）
 */
export declare function issueCustomCurrency(state: GameState & {
    economy: EconomyState;
}, currencyName: string, amount: number): {
    success: boolean;
    message: string;
};
/**
 * 获取可交易的物品列表
 */
export declare function getTradeableItems(): ItemDef[];
/**
 * 获取已解锁的商人列表
 */
export declare function getUnlockedMerchants(state: GameState & {
    economy: EconomyState;
}): MerchantNPC[];
/**
 * 刷新商人库存
 */
export declare function refreshMerchantInventory(merchant: MerchantNPC, day: number): void;
/** 经济阶段枚举 */
export declare enum EconomicPhase {
    BARTER = "barter",// 阶段1: 以物易物 (Day 1-10)
    CREDIT = "credit",// 阶段2: 商城积分 (Day 11-30)
    MARKET = "market",// 阶段3: 玩家市场 (Day 31-50)
    CURRENCY = "currency"
}
/** 交易比例 (阶段1: 以物易物) */
export declare const BARTER_RATIOS: Record<string, number>;
/** 商城积分物价表 (阶段2) */
export declare const CREDIT_PRICES: Record<string, number>;
/** 声望状态 */
export declare enum ReputationStatus {
    FRIENDLY = "friendly",// 声望 ≥ 50: 特殊交易解锁
    RESPECTED = "respected",// 声望 ≥ 100: 商会邀请
    NEUTRAL = "neutral",// -50 < 声望 < 50
    HOSTILE = "hostile",// 声望 ≤ -50: 羁绊敌对，定期袭击
    EXILED = "exiled",// 声望 ≤ -100: permanent enemy
    POSITIVE = "positive",
    NEGATIVE = "negative"
}
/** 声望变化记录 */
export interface ReputationChange {
    source: string;
    change: number;
    reason: string;
    timestamp: number;
}
/** 商人 NPC 类型 */
export declare enum MerchantType {
    ORDINARY = "ordinary",// 固定库存, 固定价格
    RARE = "rare",// 随机库存, 议价空间
    HOSTILE = "hostile"
}
/** 经济系统状态扩展 */
export interface EconomyStateExtended extends EconomyState {
    currentPhase: EconomicPhase;
    playerReputation: number;
    reputationChanges: ReputationChange[];
    unlockedMerchants: string[];
}
/** 创建扩展经济状态 */
export declare function createInitialEconomyExtended(): EconomyStateExtended;
/** 检查阶段转换 */
export declare function checkPhaseTransition(state: GameState): EconomicPhase | null;
/** 处理交易（根据当前阶段） */
export declare function processTrade(state: GameState & {
    economy: EconomyStateExtended;
}, itemId: string, quantity: number, isPlayerTrade?: boolean): {
    success: boolean;
    message: string;
    reputationChange: number;
};
//# sourceMappingURL=economy.d.ts.map