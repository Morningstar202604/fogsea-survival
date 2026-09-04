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
  attack?: number; // 武器攻击力（equipment类）
  defense?: number; // 防具防御力（equipment类）
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

  // 结晶线材料（结晶线剧情核心物品）
  purple_crystal: {
    id: 'purple_crystal',
    name: '紫色结晶',
    description: '蕴含灵力的紫色晶体，可引导融合',
    category: 'material',
    basePrice: 80,
    stackable: true,
    maxStack: 50,
  },
  red_crystal: {
    id: 'red_crystal',
    name: '赤红结晶',
    description: '灼热的赤色晶体，能量暴烈',
    category: 'material',
    basePrice: 120,
    stackable: true,
    maxStack: 50,
  },
  blue_crystal: {
    id: 'blue_crystal',
    name: '湛蓝结晶',
    description: '冰凉的蓝色晶体，能安抚心神',
    category: 'material',
    basePrice: 100,
    stackable: true,
    maxStack: 50,
  },
  golden_crystal: {
    id: 'golden_crystal',
    name: '鎏金结晶',
    description: '稀有的金色晶体，结晶融合的钥匙',
    category: 'special',
    basePrice: 300,
    stackable: true,
    maxStack: 10,
  },
  mutant_core: {
    id: 'mutant_core',
    name: '变异核心',
    description: '进化怪物体内的能量核心',
    category: 'material',
    basePrice: 60,
    stackable: true,
    maxStack: 50,
  },

  // 剧情任务物品
  research_data: {
    id: 'research_data',
    name: '研究资料',
    description: '研究所遗留的实验记录',
    category: 'special',
    basePrice: 40,
    stackable: true,
    maxStack: 20,
  },
  alliance_badge: {
    id: 'alliance_badge',
    name: '联盟徽章',
    description: '幸存者联盟的信物',
    category: 'special',
    basePrice: 150,
    stackable: true,
    maxStack: 5,
  },
  ancient_scroll: {
    id: 'ancient_scroll',
    name: '上古卷轴',
    description: '记载迷雾世界真相的古旧文书',
    category: 'special',
    basePrice: 250,
    stackable: true,
    maxStack: 10,
  },

  // 装备类
  wooden_spear: {
    id: 'wooden_spear',
    name: '木矛',
    description: '简易武器，攻击力+10',
    category: 'equipment',
    basePrice: 40,
    stackable: false,
    attack: 10,
  },
  iron_sword: {
    id: 'iron_sword',
    name: '铁剑',
    description: '精制武器，攻击力+25',
    category: 'equipment',
    basePrice: 120,
    stackable: false,
    attack: 25,
  },
  // 剧情关键物品
  radio_parts: {
    id: 'radio_parts',
    name: '无线电零件',
    description: '从废墟中找到的电子元件，集齐3个可修理无线电',
    category: 'material',
    basePrice: 25,
    stackable: true,
    maxStack: 20,
  },
  signal_flare: {
    id: 'signal_flare',
    name: '信号弹',
    description: '关键时刻可发射求救信号，撕裂浓雾',
    category: 'special',
    basePrice: 100,
    stackable: true,
    maxStack: 5,
  },
  gunpowder: {
    id: 'gunpowder',
    name: '火药',
    description: '从废墟中找到的火药，可制作信号弹或武器',
    category: 'material',
    basePrice: 30,
    stackable: true,
    maxStack: 50,
  },
  herb: {
    id: 'herb',
    name: '草药',
    description: '迷雾中生长的草药，有治疗效果',
    category: 'consumable',
    basePrice: 15,
    stackable: true,
    maxStack: 50,
  },
  bandage: {
    id: 'bandage',
    name: '绷带',
    description: '简易医疗用品，可恢复生命值',
    category: 'consumable',
    basePrice: 20,
    stackable: true,
    maxStack: 30,
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

  // 计算价格（商人收购价打折；物品熟练度等级提升交易价值）
  const marketPrice = state.economy.marketPrices[itemId]?.currentPrice ?? item.basePrice;
  const itemLevel = state.itemLevels?.[itemId]?.level ?? 1;
  // 鼠王同伴：谈判力让出售价 +10%
  const ratBonus = state.flags?.['companion_rat'] ? 1.1 : 1;
  const unitPrice = Math.floor(marketPrice * merchant.buyMultiplier * (1 + 0.1 * (itemLevel - 1)) * ratBonus);
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

// ============================================================
// 四阶段经济演进系统
// ============================================================

/** 经济阶段枚举 */
export enum EconomicPhase {
  BARTER = 'barter',       // 阶段1: 以物易物 (Day 1-10)
  CREDIT = 'credit',       // 阶段2: 商城积分 (Day 11-30)
  MARKET = 'market',       // 阶段3: 玩家市场 (Day 31-50)
  CURRENCY = 'currency'    // 阶段4: 货币发行 (Day 51+)
}

/** 交易比例 (阶段1: 以物易物) */
export const BARTER_RATIOS: Record<string, number> = {
  wood: 2,      // 木材 ↔ 食物: 2:1
  stone: 3,     // 石材 ↔ 工具: 3:1
  metal: 1,     // 金属 ↔ 武器: 视等级而定
  food: 1,
  water: 1,
};

/** 商城积分物价表 (阶段2) */
export const CREDIT_PRICES: Record<string, number> = {
  // 常用物资价格 (迷雾币)
  purifiedWater: 1,
  blackBread: 0.5,
  rareCrystal: 100,
  advancedBlueprint: 500,
  
  // 收购价格 (系统自动回购)
  wood: 10,
  stone: 15,
  food: 8,
  water: 12,
};

/** 声望状态 */
export enum ReputationStatus {
  FRIENDLY = 'friendly',     // 声望 ≥ 50: 特殊交易解锁
  RESPECTED = 'respected',   // 声望 ≥ 100: 商会邀请
  NEUTRAL = 'neutral',       // -50 < 声望 < 50
  HOSTILE = 'hostile',       // 声望 ≤ -50: 羁绊敌对，定期袭击
  EXILED = 'exiled',         // 声望 ≤ -100: permanent enemy
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
}

/** 声望变化记录 */
export interface ReputationChange {
  source: string; // 交易伙伴ID
  change: number; // 声望变化值
  reason: string; // 变化原因
  timestamp: number;
}

/** 商人 NPC 类型 */
export enum MerchantType {
  ORDINARY = 'ordinary',     // 固定库存, 固定价格
  RARE = 'rare',             // 随机库存, 议价空间
  HOSTILE = 'hostile'        // 高价低质, 可能诈骗
}

/** 经济系统状态扩展 */
export interface EconomyStateExtended extends EconomyState {
  currentPhase: EconomicPhase;
  playerReputation: number; // 玩家总声望
  reputationChanges: ReputationChange[];
  unlockedMerchants: string[];
}

/** 创建扩展经济状态 */
export function createInitialEconomyExtended(): EconomyStateExtended {
  return {
    ...createInitialEconomy(),
    currentPhase: EconomicPhase.BARTER,
    playerReputation: 0,
    reputationChanges: [],
  };
}

/** 检查阶段转换 */
export function checkPhaseTransition(state: GameState): EconomicPhase | null {
  const day = state.day;
  const economy = state.economy as EconomyStateExtended;
  
  // 阶段1 → 阶段2: 达到第11天
  if (day >= 11 && economy.currentPhase === EconomicPhase.BARTER) {
    return EconomicPhase.CREDIT;
  }
  
  // 阶段2 → 阶段3: 达到第31天
  if (day >= 31 && economy.currentPhase === EconomicPhase.CREDIT) {
    return EconomicPhase.MARKET;
  }
  
  // 阶段3 → 阶段4: 达到第51天
  if (day >= 51 && economy.currentPhase === EconomicPhase.MARKET) {
    return EconomicPhase.CURRENCY;
  }
  
  return null;
}

/** 处理交易（根据当前阶段） */
export function processTrade(
  state: GameState & { economy: EconomyStateExtended },
  itemId: string,
  quantity: number,
  isPlayerTrade: boolean = false,
): { success: boolean; message: string; reputationChange: number } {
  const { currentPhase } = state.economy;
  let reputationChange = 0;
  
  // 根据当前阶段处理交易
  switch (currentPhase) {
    case EconomicPhase.BARTER:
      // 以物易物模式
      const ratio = BARTER_RATIOS[itemId] || 1;
      const equivalentQuantity = Math.floor(quantity * ratio);
      state.inventory[itemId] = (state.inventory[itemId] ?? 0) + equivalentQuantity;
      break;
      
    case EconomicPhase.CREDIT:
      // 商城积分模式
      const price = CREDIT_PRICES[itemId] || 0;
      const totalCost = price * quantity;
      state.economy.currency -= totalCost;
      break;
      
    case EconomicPhase.MARKET:
      // 玩家市场模式
      if (isPlayerTrade) {
        reputationChange = calculateReputationImpact(ReputationStatus.POSITIVE, state.economy.playerReputation);
        state.economy.playerReputation += reputationChange;
      }
      break;
      
    case EconomicPhase.CURRENCY:
      // 货币发行模式
      break;
  }
  
  const message = getTradeMessage(currentPhase, itemId, quantity, reputationChange);
  
  return {
    success: true,
    message,
    reputationChange,
  };
}

/** 获取交易消息 */
function getTradeMessage(
  phase: EconomicPhase,
  itemId: string,
  quantity: number,
  reputationChange: number,
): string {
  const phaseNames: Record<EconomicPhase, string> = {
    [EconomicPhase.BARTER]: '以物易物',
    [EconomicPhase.CREDIT]: '商城积分',
    [EconomicPhase.MARKET]: '玩家市场',
    [EconomicPhase.CURRENCY]: '自定义货币',
  };
  
  let reputationInfo = '';
  if (reputationChange !== 0) {
    const sign = reputationChange > 0 ? '+' : '';
    reputationInfo = ` (声望${sign}${reputationChange})`;
  }
  
  return `交易完成: ${phaseNames[phase]} - ${itemId} × ${quantity}${reputationInfo}`;
}

/** 计算声望影响 */
function calculateReputationImpact(review: string, currentRep: number): number {
  if (review === ReputationStatus.POSITIVE) {
    return Math.min(5, 100 - currentRep); // 最多 +5，上限 100
  } else if (review === ReputationStatus.NEGATIVE) {
    return Math.max(-5, -100 - currentRep); // 最多 -5，下限 -100
  }
  return 0;
}
