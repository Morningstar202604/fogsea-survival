/**
 * v2.1 开局天赋系统 + 深精机制
 *
 * 品类标配（全民求生流小说通用开局）：新局随机三选一天赋，按 S/A/B 分级。
 * 天赋在 createInitialState 落地：一次性加成直接写入状态，持续型被动以
 * talent_* flag 形式存在，由引擎各挂点（每日消耗/物品升级等）读取生效。
 *
 * 深精系统：允许玩家在同一天赋上投入更多点数来增强效果
 */
import type { GameState } from './types.js';

export interface TalentDef {
  id: string;
  name: string;
  tier: 'S' | 'A' | 'B';
  description: string;
  /** 创建新局时落地天赋（直接改状态，返回系统播报文案）*/
  apply: (state: GameState) => string[];
  /** 深精效果（可选，每级效果） */
  deepEffects?: { description: string; apply: (state: GameState) => string[] }[];
  /** 深精最大等级 */
  maxDeepLevel?: number;
}

/** 天赋深精状态 */
export interface TalentDeepState {
  /** 天赋ID */
  talentId: string;
  /** 深精等级 */
  deepLevel: number;
  /** 已投入的深精点数 */
  pointsInvested: number;
  /** 深精通效果是否激活 */
  isActive: boolean;
}

export const TALENTS: TalentDef[] = [
  {
    id: 'scavenge_master',
    name: '搜刮大师',
    tier: 'S',
    description: '你对物资的嗅觉近乎超自然：开局食物+40、水+30，幸运+5。',
    apply: (s: GameState) => {
      s.resources.food.current = Math.min(s.resources.food.max, s.resources.food.current + 40);
      s.resources.water.current = Math.min(s.resources.water.max, s.resources.water.current + 30);
      s.attributes.luck += 5;
      return ['搜刮大师生效：开局物资与幸运大幅提升。'];
    },
    deepEffects: [
      { description: '物资嗅觉增强：食物+20，水+15', apply: (s: GameState) => {
        s.resources.food.current = Math.min(s.resources.food.max, s.resources.food.current + 20);
        s.resources.water.current = Math.min(s.resources.water.max, s.resources.water.current + 15);
        return ['物资嗅觉增强：开局额外获得食物+20，水+15'];
      }},
      { description: '幸运直觉：幸运+3', apply: (s: GameState) => {
        s.attributes.luck += 3;
        return ['幸运直觉：幸运+3'];
      }},
      { description: '搜刮范围扩大：解锁高级搜刮区域', apply: (s: GameState) => {
        s.flags['talent_scavenge_master_advanced'] = true;
        return ['搜刮范围扩大：解锁高级搜刮区域'];
      }},
      { description: '物资保鲜：食物消耗降低20%', apply: (s: GameState) => {
        s.flags['talent_scavenge_master_preserve'] = true;
        return ['物资保鲜：每日食物消耗降低20%'];
      }},
      { description: '幸运光环：所有资源获取+10%', apply: (s: GameState) => {
        s.flags['talent_scavenge_master_aura'] = true;
        return ['幸运光环：所有资源获取+10%'];
      }},
    ],
    maxDeepLevel: 5,
  },
  {
    id: 'item_boost',
    name: '强化万物',
    tier: 'S',
    description: '你触碰过的物品都在悄悄变强：物品熟练度获取速度翻倍。',
    apply: (s: GameState) => {
      s.flags['talent_item_xp_boost'] = true;
      return ['强化万物生效：物品每次使用获得双倍熟练度。'];
    },
    deepEffects: [
      { description: '强化精通：熟练度获取+50%', apply: (s: GameState) => {
        s.flags['talent_item_xp_boost_plus'] = true;
        return ['强化精通：物品熟练度获取额外+50%'];
      }},
      { description: '装备共鸣：装备效果+15%', apply: (s: GameState) => {
        s.flags['talent_item_boost_resonance'] = true;
        return ['装备共鸣：所有装备效果+15%'];
      }},
      { description: '物品进化：有几率使物品升级', apply: (s: GameState) => {
        s.flags['talent_item_evolution'] = true;
        return ['物品进化：使用物品时有几率使其升级'];
      }},
      { description: '大师境界：解锁物品特殊效果', apply: (s: GameState) => {
        s.flags['talent_item_master'] = true;
        return ['大师境界：解锁物品特殊效果'];
      }},
      { description: '万物有灵：物品耐久度消耗降低50%', apply: (s: GameState) => {
        s.flags['talent_item_durability'] = true;
        return ['万物有灵：物品耐久度消耗降低50%'];
      }},
    ],
    maxDeepLevel: 5,
  },
  {
    id: 'fog_prophet',
    name: '雾中先知',
    tier: 'S',
    description: '雾对你低语真相：智力+4，开局获得研究资料与神秘结晶各1。',
    apply: (s: GameState) => {
      s.attributes.intelligence += 4;
      s.inventory['research_data'] = (s.inventory['research_data'] ?? 0) + 1;
      s.inventory['mysterious_crystal'] = (s.inventory['mysterious_crystal'] ?? 0) + 1;
      return ['雾中先知生效：智力提升，背包多了两件来历不明的东西。'];
    },
    deepEffects: [
      { description: '雾语精通：智力+2', apply: (s: GameState) => {
        s.attributes.intelligence += 2;
        return ['雾语精通：智力+2'];
      }},
      { description: '预言直觉：解锁隐藏事件', apply: (s: GameState) => {
        s.flags['talent_fog_prophet_intuition'] = true;
        return ['预言直觉：解锁隐藏事件'];
      }},
      { description: '结晶共鸣：神秘结晶效果+50%', apply: (s: GameState) => {
        s.flags['talent_fog_prophet_crystal'] = true;
        return ['结晶共鸣：神秘结晶效果+50%'];
      }},
      { description: '知识传承：技能学习速度+30%', apply: (s: GameState) => {
        s.flags['talent_fog_prophet_knowledge'] = true;
        return ['知识传承：技能学习速度+30%'];
      }},
      { description: '先知之眼：每日获得一条提示', apply: (s: GameState) => {
        s.flags['talent_fog_prophet_eye'] = true;
        return ['先知之眼：每日获得一条提示'];
      }},
    ],
    maxDeepLevel: 5,
  },
  {
    id: 'iron_stomach',
    name: '铁胃',
    tier: 'A',
    description: '你吃什么都顶饱：食物与水的每日消耗降低15%。',
    apply: (s: GameState) => {
      s.flags['talent_iron_stomach'] = true;
      return ['铁胃生效：每日食物与水消耗降低15%。'];
    },
    deepEffects: [
      { description: '消化强化：消耗降低+10%', apply: (s: GameState) => {
        s.flags['talent_iron_stomach_plus'] = true;
        return ['消化强化：每日食物与水消耗额外降低10%'];
      }},
      { description: '营养吸收：食物回复量+20%', apply: (s: GameState) => {
        s.flags['talent_iron_stomach_absorb'] = true;
        return ['营养吸收：食物回复量+20%'];
      }},
      { description: '毒物免疫：毒素伤害降低50%', apply: (s: GameState) => {
        s.flags['talent_iron_stomach_immune'] = true;
        return ['毒物免疫：毒素伤害降低50%'];
      }},
      { description: '铁壁肠胃：消化不良概率降低', apply: (s: GameState) => {
        s.flags['talent_iron_stomach_wall'] = true;
        return ['铁壁肠胃：消化不良概率降低'];
      }},
      { description: '饕餮之力：可以食用特殊食物', apply: (s: GameState) => {
        s.flags['talent_iron_stomach_greedy'] = true;
        return ['饕餮之力：可以食用特殊食物'];
      }},
    ],
    maxDeepLevel: 5,
  },
  {
    id: 'calm_mind',
    name: '心如止水',
    tier: 'A',
    description: '恐惧无法撼动你：理智每日消耗降低30%，开局理智+10。',
    apply: (s: GameState) => {
      s.flags['talent_calm_mind'] = true;
      s.resources.sanity.current = Math.min(s.resources.sanity.max, s.resources.sanity.current + 10);
      return ['心如止水生效：理智更耐消耗。'];
    },
    deepEffects: [
      { description: '精神强化：理智消耗降低+15%', apply: (s: GameState) => {
        s.flags['talent_calm_mind_plus'] = true;
        return ['精神强化：理智消耗额外降低15%'];
      }},
      { description: '心灵屏障：理智回复+25%', apply: (s: GameState) => {
        s.flags['talent_calm_mind_barrier'] = true;
        return ['心灵屏障：理智回复+25%'];
      }},
      { description: '恐惧抗性：恐惧效果降低50%', apply: (s: GameState) => {
        s.flags['talent_calm_mind_resist'] = true;
        return ['恐惧抗性：恐惧效果降低50%'];
      }},
      { description: '精神洞察：解锁隐藏剧情', apply: (s: GameState) => {
        s.flags['talent_calm_mind_insight'] = true;
        return ['精神洞察：解锁隐藏剧情'];
      }},
      { description: '心灵感应：NPC互动成功率+20%', apply: (s: GameState) => {
        s.flags['talent_calm_mind_telepathy'] = true;
        return ['心灵感应：NPC互动成功率+20%'];
      }},
    ],
    maxDeepLevel: 5,
  },
  {
    id: 'craftsman',
    name: '工匠之手',
    tier: 'A',
    description: '你是天生的 builder：开局获得木矛×1、木材×25、石材×10。',
    apply: (s: GameState) => {
      s.inventory['wooden_spear'] = (s.inventory['wooden_spear'] ?? 0) + 1;
      s.inventory['wood'] = (s.inventory['wood'] ?? 0) + 25;
      s.inventory['stone'] = (s.inventory['stone'] ?? 0) + 10;
      return ['工匠之手生效：开局自带一套基础工具和建材。'];
    },
    deepEffects: [
      { description: '材料精通：制作消耗降低20%', apply: (s: GameState) => {
        s.flags['talent_craftsman_expert'] = true;
        return ['材料精通：制作消耗降低20%'];
      }},
      { description: '工匠直觉：制作成功率+15%', apply: (s: GameState) => {
        s.flags['talent_craftsman_intuition'] = true;
        return ['工匠直觉：制作成功率+15%'];
      }},
      { description: '创新思维：解锁特殊配方', apply: (s: GameState) => {
        s.flags['talent_craftsman_innovation'] = true;
        return ['创新思维：解锁特殊配方'];
      }},
      { description: '大师之作：制作物品品质提升', apply: (s: GameState) => {
        s.flags['talent_craftsman_masterwork'] = true;
        return ['大师之作：制作物品品质提升'];
      }},
      { description: '工匠传承：制作经验+50%', apply: (s: GameState) => {
        s.flags['talent_craftsman_legacy'] = true;
        return ['工匠传承：制作经验+50%'];
      }},
    ],
    maxDeepLevel: 5,
  },
  {
    id: 'strong_body',
    name: '强健体魄',
    tier: 'A',
    description: '末日磨不掉你的筋骨：生命上限+20，力量+3。',
    apply: (s: GameState) => {
      s.resources.health.max += 20;
      s.resources.health.current += 20;
      s.attributes.strength += 3;
      return ['强健体魄生效：生命上限提升至' + s.resources.health.max + '。'];
    },
    deepEffects: [
      { description: '体魄强化：生命上限+15', apply: (s: GameState) => {
        s.resources.health.max += 15;
        s.resources.health.current += 15;
        return ['体魄强化：生命上限+15'];
      }},
      { description: '力量精通：力量+2', apply: (s: GameState) => {
        s.attributes.strength += 2;
        return ['力量精通：力量+2'];
      }},
      { description: '生命回复：每日生命回复+5', apply: (s: GameState) => {
        s.flags['talent_strong_body_regen'] = true;
        return ['生命回复：每日生命回复+5'];
      }},
      { description: '伤害抗性：受到伤害降低15%', apply: (s: GameState) => {
        s.flags['talent_strong_body_resist'] = true;
        return ['伤害抗性：受到伤害降低15%'];
      }},
      { description: '不屈意志：濒死时获得护盾', apply: (s: GameState) => {
        s.flags['talent_strong_body_will'] = true;
        return ['不屈意志：濒死时获得护盾'];
      }},
    ],
    maxDeepLevel: 5,
  },
  {
    id: 'lucky_star',
    name: '幸运星',
    tier: 'B',
    description: '命运偶尔偏心：幸运+5。',
    apply: (s: GameState) => {
      s.attributes.luck += 5;
      return ['幸运星生效：幸运+5。'];
    },
    deepEffects: [
      { description: '幸运强化：幸运+3', apply: (s: GameState) => {
        s.attributes.luck += 3;
        return ['幸运强化：幸运+3'];
      }},
      { description: '幸运直觉：暴击率+5%', apply: (s: GameState) => {
        s.flags['talent_lucky_star_crit'] = true;
        return ['幸运直觉：暴击率+5%'];
      }},
      { description: '幸运眷顾：稀有物品掉落率+10%', apply: (s: GameState) => {
        s.flags['talent_lucky_star眷顾'] = true;
        return ['幸运眷顾：稀有物品掉落率+10%'];
      }},
      { description: '幸运守护：死亡时有几率复活', apply: (s: GameState) => {
        s.flags['talent_lucky_star_guard'] = true;
        return ['幸运守护：死亡时有几率复活'];
      }},
      { description: '幸运光环：队友幸运+5', apply: (s: GameState) => {
        s.flags['talent_lucky_star_aura'] = true;
        return ['幸运光环：队友幸运+5'];
      }},
    ],
    maxDeepLevel: 5,
  },
  {
    id: 'night_runner',
    name: '夜行者',
    tier: 'B',
    description: '你在黑暗中如鱼得水：体力每日消耗降低25%。',
    apply: (s: GameState) => {
      s.flags['talent_night_runner'] = true;
      return ['夜行者生效：每日体力消耗降低25%。'];
    },
    deepEffects: [
      { description: '夜视能力：夜间视野+50%', apply: (s: GameState) => {
        s.flags['talent_night_runner_vision'] = true;
        return ['夜视能力：夜间视野+50%'];
      }},
      { description: '潜行精通：夜间隐蔽性+30%', apply: (s: GameState) => {
        s.flags['talent_night_runner_stealth'] = true;
        return ['潜行精通：夜间隐蔽性+30%'];
      }},
      { description: '夜行生物：夜间移动速度+20%', apply: (s: GameState) => {
        s.flags['talent_night_runner_speed'] = true;
        return ['夜行生物：夜间移动速度+20%'];
      }},
      { description: '黑暗感知：夜间发现隐藏物品几率+15%', apply: (s: GameState) => {
        s.flags['talent_night_runner_perception'] = true;
        return ['黑暗感知：夜间发现隐藏物品几率+15%'];
      }},
      { description: '夜之主宰：夜间所有属性+10%', apply: (s: GameState) => {
        s.flags['talent_night_runner_master'] = true;
        return ['夜之主宰：夜间所有属性+10%'];
      }},
    ],
    maxDeepLevel: 5,
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

// ============================================================
// 深精系统
// ============================================================

/** 初始化天赋深精状态 */
export function initTalentDeepState(): Record<string, TalentDeepState> {
  return {};
}

/** 获取天赋深精等级 */
export function getTalentDeepLevel(state: GameState, talentId: string): number {
  const deepState = state.talentDeepState?.[talentId];
  return deepState?.deepLevel ?? 0;
}

/** 检查天赋是否可以深精 */
export function canDeepTalent(state: GameState, talentId: string): boolean {
  const talent = TALENTS.find((t) => t.id === talentId);
  if (!talent) return false;
  if (!talent.deepEffects) return false;
  
  const currentLevel = getTalentDeepLevel(state, talentId);
  const maxLevel = talent.maxDeepLevel ?? 5;
  
  return currentLevel < maxLevel;
}

/** 计算深精成本（指数级增加） */
export function calculateDeepCost(talentId: string, currentLevel: number): number {
  const talent = TALENTS.find((t) => t.id === talentId);
  if (!talent) return 0;
  
  const baseCost = talent.tier === 'S' ? 100 : talent.tier === 'A' ? 75 : 50;
  return Math.floor(baseCost * Math.pow(1.5, currentLevel));
}

/** 执行天赋深精 */
export function deepTalent(state: GameState, talentId: string): string[] {
  if (!canDeepTalent(state, talentId)) {
    return ['无法进行深精：条件不满足或已达最大等级'];
  }
  
  const talent = TALENTS.find((t) => t.id === talentId);
  if (!talent || !talent.deepEffects) return [];
  
  const currentLevel = getTalentDeepLevel(state, talentId);
  const cost = calculateDeepCost(talentId, currentLevel);
  
  // 检查是否有足够的技能点
  if (state.skillPoints < cost) {
    return [`深精点数不足：需要${cost}点，当前${state.skillPoints}点`];
  }
  
  // 扣除技能点
  state.skillPoints -= cost;
  
  // 更新深精状态
  if (!state.talentDeepState) {
    state.talentDeepState = initTalentDeepState();
  }
  
  const newState: TalentDeepState = {
    talentId,
    deepLevel: currentLevel + 1,
    pointsInvested: (state.talentDeepState[talentId]?.pointsInvested ?? 0) + cost,
    isActive: true,
  };
  
  state.talentDeepState[talentId] = newState;
  
  // 应用深精效果
  const effects = talent.deepEffects;
  if (effects) {
    const deepEffect = effects[currentLevel];
    if (deepEffect) {
      const messages = deepEffect.apply(state);
      return [
        `【天赋深精·${talent.name} Lv.${currentLevel + 1}】${deepEffect.description}`,
        ...messages,
      ];
    }
  }
  
  return [`【天赋深精·${talent.name} Lv.${currentLevel + 1}】深精成功`];
}

/** 重置天赋深精（返回一半的深精点数） */
export function resetTalentDeep(state: GameState, talentId: string): string[] {
  const deepState = state.talentDeepState?.[talentId];
  if (!deepState || deepState.deepLevel === 0) {
    return ['无法重置：该天赋未进行深精'];
  }
  
  // 返还一半的深精点数
  const refundPoints = Math.floor(deepState.pointsInvested / 2);
  state.skillPoints += refundPoints;
  
  // 清除深精状态
  delete state.talentDeepState?.[talentId];
  
  return [`【天赋重置】${talentId} 深精已重置，返还 ${refundPoints} 点深精点数`];
}
