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
  basePrice: number; // 基础价格（积分）
  stackable: boolean;
  maxStack?: number;
}

/** 市场价格记录 */
export interface MarketPrice {
  itemId: string;
  currentPrice: number;
  basePrice: number;
  demand: number; // 需求指数 (0-2)
  supply: number; // 供应指数 (0-2)
  lastUpdated: number; // 最后更新时间（天数）
  priceHistory: number[]; // 最近7天价格历史
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
  trader?: string; // 交易对象（NPC名或玩家ID）
}

/** 商人NPC */
export interface MerchantNPC {
  id: string;
  name: string;
  location: string;
  inventory: Record<string, number>;
  buyMultiplier: number; // 收购价格倍率 (0.5-0.8)
  sellMultiplier: number; // 出售价格倍率 (1.2-1.5)
  refreshDays: number; // 库存刷新周期
  lastRefresh: number;
}

/** 经济状态 */
export interface EconomyState {
  currency: number; // 主货币（积分）
  customCurrency?: string; // 自定义货币名称
  customAmount: number; // 自定义货币数量
  tradeHistory: TradeRecord[];
  marketPrices: Record<string, MarketPrice>;
  unlockedMerchants: string[]; // 已解锁的商人
}

/** 物品数据库 */
export const ITEM_DATABASE: Record<string, ItemDef> = {
  // 资源类
  wood: {
    id: 'wood',
    name: '木材',
    description: '基础建筑材料',
    category: 'resource',
    basePrice: 5,
    stackable: true,
    maxStack: 999,
  },
  stone: {
    id: 'stone',
    name: '石材',
    description: '坚固的建筑石料',
    category: 'resource',
    basePrice: 8,
    stackable: true,
    maxStack: 999,
  },
  metal: {
    id: 'metal',
    name: '金属',
    description: '用于制作工具和武器',
    category: 'resource',
    basePrice: 15,
    stackable: true,
    maxStack: 999,
  },
  food: {
    id: 'food',
    name: '食物',
    description: '维持生存必需品',
    category: 'consumable',
    basePrice: 10,
    stackable: true,
    maxStack: 500,
  },
  water: {
    id: 'water',
    name: '水',
    description: '生命之源',
    category: 'consumable',
    basePrice: 8,
    stackable: true,
    maxStack: 500,
  },

  // 材料类
  mutant_fang: {
    id: 'mutant_fang',
    name: '变异獠牙',
    description: '可用于制作高级武器',
    category: 'material',
    basePrice: 30,
    stackable: true,
    maxStack: 100,
  },
  beast_core: {
    id: 'beast_core',
    name: '野兽核心',
    description: '蕴含能量的晶体',
    category: 'material',
    basePrice: 50,
    stackable: true,
    maxStack: 50,
  },
  mysterious_crystal: {
    id: 'mysterious_crystal',
    name: '神秘结晶',
    description: '未知的紫色晶体，散发能量波动',
    category: 'special',
    basePrice: 200,
    stackable: true,
    maxStack: 20,
  },

  // 装备类
  wooden_spear: {
    id: 'wooden_spear',
    name: '木矛',
    description: '简易武器，攻击力+10',
    category: 'equipment',
    basePrice: 40,
    stackable: false,
  },
  iron_sword: {
    id: 'iron_sword',
    name: '铁剑',
    description: '精制武器，攻击力+25',
    category: 'equipment',
    basePrice: 120,
    stackable: false,
  },
};

/** 商人NPC数据库 */
export const MERCHANT_DATABASE: Record<string, MerchantNPC> = {
  wandering_trader: {
    id: 'wandering_trader',
    name: '流浪商人',
    location: '随机出现',
    inventory: {
      food: 50,
      water: 50,
      wooden_spear: 3,
    },
    buyMultiplier: 0.6,
    sellMultiplier: 1.3,
    refreshDays: 3,
    lastRefresh: 0,
  },
  weaponsmith: {
    id: 'weaponsmith',
    name: '铁匠老王',
    location: '联盟集市',
    inventory: {
      iron_sword: 2,
      metal: 100,
    },
    buyMultiplier: 0.7,
    sellMultiplier: 1.4,
    refreshDays: 5,
    lastRefresh: 0,
  },
  alchemist: {
    id: 'alchemist',
    name: '炼金术士',
    location: '迷雾边缘',
    inventory: {
      mysterious_crystal: 5,
      beast_core: 10,
    },
    buyMultiplier: 0.5,
    sellMultiplier: 1.5,
    refreshDays: 7,
    lastRefresh: 0,
  },
};

/**
 * 创建初始经济状态
 */
export function createInitialEconomy(): EconomyState {
  return {
    currency: 0,
    customAmount: 0,
    tradeHistory: [],
    marketPrices: {},
    unlockedMerchants: ['wandering_trader'],
  };
}

/**
 * 计算动态价格（基于供需关系）
 */
export function calculateDynamicPrice(
  item: ItemDef,
  demand: number,
  supply: number,
): number {
  // 基础价格 × 需求系数 / 供应系数
  const demandFactor = 0.5 + demand * 0.5; // 0.5-1.5
  const supplyFactor = 1.5 - supply * 0.5; // 1.5-0.5
  
  return Math.floor(item.basePrice * demandFactor * supplyFactor);
}

/**
 * 更新市场价格（每天调用）
 */
export function updateMarketPrices(
  state: GameState & { economy: EconomyState },
  day: number,
): void {
  for (const [itemId, item] of Object.entries(ITEM_DATABASE)) {
    // 模拟供需波动（实际应该基于玩家行为）
    const demand = 0.8 + Math.random() * 0.4; // 0.8-1.2
    const supply = 0.8 + Math.random() * 0.4;
    
    const newPrice = calculateDynamicPrice(item, demand, supply);
    
    if (!state.economy.marketPrices[itemId]) {
      state.economy.marketPrices[itemId] = {
        itemId,
        currentPrice: newPrice,
        basePrice: item.basePrice,
        demand,
        supply,
        lastUpdated: day,
        priceHistory: [newPrice],
      };
    } else {
      const priceRecord = state.economy.marketPrices[itemId];
      priceRecord.currentPrice = newPrice;
      priceRecord.demand = demand;
      priceRecord.supply = supply;
      priceRecord.lastUpdated = day;
      
      // 保留最近7天的价格历史
      priceRecord.priceHistory.push(newPrice);
      if (priceRecord.priceHistory.length > 7) {
        priceRecord.priceHistory.shift();
      }
    }
  }
}

/**
 * 从商人处购买物品
 */
export function buyFromMerchant(
  state: GameState & { economy: EconomyState },
  merchantId: string,
  itemId: string,
  quantity: number,
): { success: boolean; message: string; cost?: number } {
  const merchant = MERCHANT_DATABASE[merchantId];
  if (!merchant) {
    return { success: false, message: '商人不存在' };
  }

  const item = ITEM_DATABASE[itemId];
  if (!item) {
    return { success: false, message: '物品不存在' };
  }

  // 检查商人库存
  const availableStock = merchant.inventory[itemId] ?? 0;
  if (availableStock < quantity) {
    return { success: false, message: `库存不足！只有${availableStock}个` };
  }

  // 计算价格（含商人加价）
  const marketPrice = state.economy.marketPrices[itemId]?.currentPrice ?? item.basePrice;
  const unitPrice = Math.floor(marketPrice * merchant.sellMultiplier);
  const totalCost = unitPrice * quantity;

  // 检查玩家金钱
  if (state.economy.currency < totalCost) {
    return { success: false, message: `积分不足！需要${totalCost}，当前只有${state.economy.currency}` };
  }

  // 执行交易
  state.economy.currency -= totalCost;
  merchant.inventory[itemId] -= quantity;
  state.inventory[itemId] = (state.inventory[itemId] ?? 0) + quantity;

  // 记录交易
  const trade: TradeRecord = {
    id: `trade_${Date.now()}`,
    day: state.day,
    type: 'buy',
    itemId,
    quantity,
    unitPrice,
    totalPrice: totalCost,
    trader: merchant.name,
  };
  state.economy.tradeHistory.push(trade);

  return {
    success: true,
    message: `成功购买 ${item.name} x${quantity}，花费${totalCost}积分`,
    cost: totalCost,
  };
}

/**
 * 向商人出售物品
 */
export function sellToMerchant(
  state: GameState & { economy: EconomyState },
  merchantId: string,
  itemId: string,
  quantity: number,
): { success: boolean; message: string; earnings?: number } {
  const merchant = MERCHANT_DATABASE[merchantId];
  if (!merchant) {
    return { success: false, message: '商人不存在' };
  }

  const item = ITEM_DATABASE[itemId];
  if (!item) {
    return { success: false, message: '物品不存在' };
  }

  // 检查玩家库存
  const playerStock = state.inventory[itemId] ?? 0;
  if (playerStock < quantity) {
    return { success: false, message: `库存不足！只有${playerStock}个` };
  }

  // 计算价格（商人收购价打折）
  const marketPrice = state.economy.marketPrices[itemId]?.currentPrice ?? item.basePrice;
  const unitPrice = Math.floor(marketPrice * merchant.buyMultiplier);
  const totalEarnings = unitPrice * quantity;

  // 执行交易
  state.economy.currency += totalEarnings;
  state.inventory[itemId] -= quantity;
  merchant.inventory[itemId] = (merchant.inventory[itemId] ?? 0) + quantity;

  // 记录交易
  const trade: TradeRecord = {
    id: `trade_${Date.now()}`,
    day: state.day,
    type: 'sell',
    itemId,
    quantity,
    unitPrice,
    totalPrice: totalEarnings,
    trader: merchant.name,
  };
  state.economy.tradeHistory.push(trade);

  return {
    success: true,
    message: `成功出售 ${item.name} x${quantity}，获得${totalEarnings}积分`,
    earnings: totalEarnings,
  };
}

/**
 * 发行自定义货币（后期功能）
 */
export function issueCustomCurrency(
  state: GameState & { economy: EconomyState },
  currencyName: string,
  amount: number,
): { success: boolean; message: string } {
  // 需要达到一定条件才能发行货币
  if (state.base.level < 4) {
    return { success: false, message: '需要基地等级4以上才能发行货币' };
  }

  if (state.economy.customCurrency && state.economy.customCurrency !== currencyName) {
    return { success: false, message: `已经发行了${state.economy.customCurrency}，不能重复发行` };
  }

  state.economy.customCurrency = currencyName;
  state.economy.customAmount += amount;

  return {
    success: true,
    message: `成功发行${amount}个${currencyName}！现在可以用它在联盟内进行交易。`,
  };
}

/**
 * 获取可交易的物品列表
 */
export function getTradeableItems(): ItemDef[] {
  return Object.values(ITEM_DATABASE);
}

/**
 * 获取已解锁的商人列表
 */
export function getUnlockedMerchants(
  state: GameState & { economy: EconomyState },
): MerchantNPC[] {
  return state.economy.unlockedMerchants
    .map(id => MERCHANT_DATABASE[id])
    .filter(Boolean);
}

/**
 * 刷新商人库存
 */
export function refreshMerchantInventory(
  merchant: MerchantNPC,
  day: number,
): void {
  if (day - merchant.lastRefresh >= merchant.refreshDays) {
    // 恢复部分库存（简化版）
    for (const itemId in merchant.inventory) {
      merchant.inventory[itemId] = Math.floor(merchant.inventory[itemId] * 1.5);
    }
    merchant.lastRefresh = day;
  }
}
