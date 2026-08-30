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
//# sourceMappingURL=economy.d.ts.map