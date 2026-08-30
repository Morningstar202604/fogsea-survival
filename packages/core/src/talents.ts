/**
 * v2.1 开局天赋系统
 *
 * 品类标配（全民求生流小说通用开局）：新局随机三选一天赋，按 S/A/B 分级。
 * 天赋在 createInitialState 落地：一次性加成直接写入状态，持续型被动以
 * talent_* flag 形式存在，由引擎各挂点（每日消耗/物品升级等）读取生效。
 */
import type { GameState } from './types.js';

export interface TalentDef {
  id: string;
  name: string;
  tier: 'S' | 'A' | 'B';
  description: string;
  /** 创建新局时落地天赋（直接改状态，返回系统播报文案） */
  apply: (state: GameState) => string[];
}

export const TALENTS: TalentDef[] = [
  {
    id: 'scavenge_master',
    name: '搜刮大师',
    tier: 'S',
    description: '你对物资的嗅觉近乎超自然：开局食物+40、水+30，幸运+5。',
    apply: (s) => {
      s.resources.food.current = Math.min(s.resources.food.max, s.resources.food.current + 40);
      s.resources.water.current = Math.min(s.resources.water.max, s.resources.water.current + 30);
      s.attributes.luck += 5;
      return ['搜刮大师生效：开局物资与幸运大幅提升。'];
    },
  },
  {
    id: 'item_boost',
    name: '强化万物',
    tier: 'S',
    description: '你触碰过的物品都在悄悄变强：物品熟练度获取速度翻倍。',
    apply: (s) => {
      s.flags['talent_item_xp_boost'] = true;
      return ['强化万物生效：物品每次使用获得双倍熟练度。'];
    },
  },
  {
    id: 'fog_prophet',
    name: '雾中先知',
    tier: 'S',
    description: '雾对你低语真相：智力+4，开局获得研究资料与神秘结晶各1。',
    apply: (s) => {
      s.attributes.intelligence += 4;
      s.inventory['research_data'] = (s.inventory['research_data'] ?? 0) + 1;
      s.inventory['mysterious_crystal'] = (s.inventory['mysterious_crystal'] ?? 0) + 1;
      return ['雾中先知生效：智力提升，背包多了两件来历不明的东西。'];
    },
  },
  {
    id: 'iron_stomach',
    name: '铁胃',
    tier: 'A',
    description: '你吃什么都顶饱：食物与水的每日消耗降低15%。',
    apply: (s) => {
      s.flags['talent_iron_stomach'] = true;
      return ['铁胃生效：每日食物与水消耗降低15%。'];
    },
  },
  {
    id: 'calm_mind',
    name: '心如止水',
    tier: 'A',
    description: '恐惧无法撼动你：理智每日消耗降低30%，开局理智+10。',
    apply: (s) => {
      s.flags['talent_calm_mind'] = true;
      s.resources.sanity.current = Math.min(s.resources.sanity.max, s.resources.sanity.current + 10);
      return ['心如止水生效：理智更耐消耗。'];
    },
  },
  {
    id: 'craftsman',
    name: '工匠之手',
    tier: 'A',
    description: '你是天生的 builder：开局获得木矛×1、木材×25、石材×10。',
    apply: (s) => {
      s.inventory['wooden_spear'] = (s.inventory['wooden_spear'] ?? 0) + 1;
      s.inventory['wood'] = (s.inventory['wood'] ?? 0) + 25;
      s.inventory['stone'] = (s.inventory['stone'] ?? 0) + 10;
      return ['工匠之手生效：开局自带一套基础工具和建材。'];
    },
  },
  {
    id: 'strong_body',
    name: '强健体魄',
    tier: 'A',
    description: '末日磨不掉你的筋骨：生命上限+20，力量+3。',
    apply: (s) => {
      s.resources.health.max += 20;
      s.resources.health.current += 20;
      s.attributes.strength += 3;
      return ['强健体魄生效：生命上限提升至' + s.resources.health.max + '。'];
    },
  },
  {
    id: 'lucky_star',
    name: '幸运星',
    tier: 'B',
    description: '命运偶尔偏心：幸运+5。',
    apply: (s) => {
      s.attributes.luck += 5;
      return ['幸运星生效：幸运+5。'];
    },
  },
  {
    id: 'night_runner',
    name: '夜行者',
    tier: 'B',
    description: '你在黑暗中如鱼得水：体力每日消耗降低25%。',
    apply: (s) => {
      s.flags['talent_night_runner'] = true;
      return ['夜行者生效：每日体力消耗降低25%。'];
    },
  },
];

export type TalentRng = { next(): number };

/** 按稀有度加权随机抽取 3 个不重复天赋（S 权重1 / A 权重2 / B 权重3）。 */
export function drawTalentChoices(rng: TalentRng): TalentDef[] {
  const pool = [...TALENTS];
  const picked: TalentDef[] = [];
  while (picked.length < 3 && pool.length > 0) {
    const weights = pool.map((t) => (t.tier === 'S' ? 1 : t.tier === 'A' ? 2 : 3));
    const total = weights.reduce((a, b) => a + b, 0);
    let roll = rng.next() * total;
    let idx = 0;
    for (; idx < pool.length; idx++) {
      roll -= weights[idx];
      if (roll <= 0) break;
    }
    if (idx >= pool.length) idx = pool.length - 1;
    picked.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return picked;
}

/** 将选中的天赋写入状态（幂等：重复调用只生效一次）。 */
export function applyTalent(state: GameState, talentId: string): string[] {
  if (state.flags['talent_chosen']) return [];
  const talent = TALENTS.find((t) => t.id === talentId);
  if (!talent) return [];
  state.flags['talent_chosen'] = true;
  const messages = talent.apply(state);
  return [`【天赋觉醒·${talent.tier}级】${talent.name}：${talent.description}`, ...messages];
}
