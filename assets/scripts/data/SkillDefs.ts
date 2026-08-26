// 技能树定义：5线×3分支=15节点，跨线前置条件形成交错成长
export type SkillCategory = 'survival' | 'combat' | 'craft' | 'knowledge' | 'social';
export const SKILL_CATEGORIES: SkillCategory[] = ['survival', 'combat', 'craft', 'knowledge', 'social'];

export const SKILL_NAMES: Record<SkillCategory, string> = {
    survival: '🏕 生存', combat: '⚔ 战斗', craft: '🔧 制作',
    knowledge: '📖 知识', social: '🤝 社交',
};

export const BRANCH_NAMES: Record<string, string> = {
    forager: '采集者', pathfinder: '探路者', endurer: '耐力者',
    hunter: '猎手', brawler: '格斗家', tactician: '战术家',
    builder: '建造者', cook: '烹饪师', inventor: '发明家',
    scout精英: '侦察兵', scholar: '学者', mystic: '灵媒',
    merchant: '商人', diplomat: '外交官', leader: '领袖',
};

/** 单个分支节点 */
export interface SkillBranch {
    id: string;                          // 如 'forager'
    category: SkillCategory;             // 所属线
    name: string;                        // 显示名
    /** 升级前置：其他分支的最低等级（跨线交错） */
    prereq?: { branch: string; branchId?: string; level: number }[];
    /** 该分支每级解锁的特性 id 列表 */
    unlocksByLevel: string[][];          // unlocksByLevel[0]=Lv1解锁, [1]=Lv2解锁...
}

/** 特性解锁定义 */
export interface FeatureUnlock {
    id: string;                          // 如 'cook_quality'
    name: string;                        // 显示名
    desc: string;                        // 说明
    type: 'action' | 'passive' | 'recipe' | 'option' | 'ui';
    /** 具体挂接的机制标识（由各系统读取） */
    hook: string;                        // 如 'daily.cookFeast.tier2'
}

// ===== 15 个分支节点 =====
export const SKILL_BRANCHES: SkillBranch[] = [
    // ── 生存线 ──
    { id: 'forager', category: 'survival', name: '采集者',
      unlocksByLevel: [
          ['herb_quality_1'],           // Lv1: 草药品质+1
          ['herb暴击'],                 // Lv2: 采药25%暴击(+1额外)
          ['forage_locations'],         // Lv3: 解锁隐藏采集点
      ]},
    { id: 'pathfinder', category: 'survival', name: '探路者',
      prereq: [{ branch: 'forager', level: 1 }],
      unlocksByLevel: [
          ['explore_cooldown_minus'],   // Lv1: 探索冷却-1天
          ['fog_navigation'],           // Lv2: 雾中辨向(迷雾区安全)
          ['hidden_paths'],             // Lv3: 发现隐藏通道
      ]},
    { id: 'endurer', category: 'survival', name: '耐力者',
      prereq: [{ branch: 'pathfinder', level: 1 }],
      unlocksByLevel: [
          ['cold_resist_1'],            // Lv1: 抗寒+1
          ['disease_recovery'],         // Lv2: 病愈速度翻倍
          ['iron_will'],                // Lv3: SAN≤20时不崩溃(每场1次)
      ]},

    // ── 战斗线 ──
    { id: 'hunter', category: 'combat', name: '猎手',
      unlocksByLevel: [
          ['bow_damage_plus'],          // Lv1: 猎弓伤害+15%
          ['trap_mastery'],             // Lv2: 陷阱成功率+20%
          ['track_prey'],               // Lv3: 追踪猎物(打猎+1产出)
      ]},
    { id: 'brawler', category: 'combat', name: '格斗家',
      prereq: [{ branch: 'hunter', level: 1 }],
      unlocksByLevel: [
          ['melee_option'],             // Lv1: 夜战近战选项解锁
          ['damage_reduce'],            // Lv2: 受伤减免15%
          ['counter_attack'],           // Lv3: 反击(战斗事件额外收益)
      ]},
    { id: 'tactician', category: 'combat', name: '战术家',
      prereq: [{ branch: 'brawler', level: 1 }, { branch: 'knowledge', branchId: 'scout精英', level: 1 }],
      unlocksByLevel: [
          ['night_intel'],              // Lv1: 夜战前侦察(降低夜战概率)
          ['beast_tide_plan'],          // Lv2: 兽潮防御工事+30%
          ['ambush'],                   // Lv3: 反伏击(探索遇敌先手)
      ]},

    // ── 制作线 ──
    { id: 'builder', category: 'craft', name: '建造者',
      unlocksByLevel: [
          ['build_cost_minus'],         // Lv1: 建造材料-15%
          ['facility_upgrade'],         // Lv2: 设施升级选项
          ['fortification'],            // Lv3: 防御工事(兽潮减伤)
      ]},
    { id: 'cook', category: 'craft', name: '烹饪师',
      prereq: [{ branch: 'forager', level: 1 }],
      unlocksByLevel: [
          ['cook_quality_2'],           // Lv1: 精致料理(1AP, 品质提升)
          ['cook_feast_plus'],          // Lv2: 盛宴升级(全属性大buff)
          ['cook_recipe_discover'],     // Lv3: 食谱发现(日记/读书触发)
      ]},
    { id: 'inventor', category: 'craft', name: '发明家',
      prereq: [{ branch: 'builder', level: 1 }, { branch: 'knowledge', branchId: 'scholar', level: 1 }],
      unlocksByLevel: [
          ['tool_upgrade'],             // Lv1: 工具升级配方
          ['rare_craft'],               // Lv2: 稀有制作(信号枪/电池)
          ['auto_craft'],               // Lv3: 自动制作(被动产出资源)
      ]},

    // ── 知识线 ──
    { id: 'scout精英', category: 'knowledge', name: '侦察兵',
      unlocksByLevel: [
          ['scout_range_plus'],         // Lv1: 侦察范围+(更多情报)
          ['map_reveal'],               // Lv2: 地图揭示(隐藏地点)
          ['threat_predict'],           // Lv3: 威胁预判(灾前3天预警)
      ]},
    { id: 'scholar', category: 'knowledge', name: '学者',
      prereq: [{ branch: 'scout精英', level: 1 }],
      unlocksByLevel: [
          ['radio_decrypt'],            // Lv1: 广播解密(情报质量+)
          ['lore_knowledge'],           // Lv2: 世界观知识(隐藏事件线索)
          ['rescue_boost'],             // Lv3: 救援进度加速(每天+2)
      ]},
    { id: 'mystic', category: 'knowledge', name: '灵媒',
      prereq: [{ branch: 'scholar', level: 1 }],
      unlocksByLevel: [
          ['sanity_shield'],            // Lv1: SAN衰减-2
          ['dream_events'],             // Lv2: 梦境事件(特殊剧情)
          ['foresight'],                // Lv3: 预知(查看下一天事件)
      ]},

    // ── 社交线 ──
    { id: 'merchant', category: 'social', name: '商人',
      unlocksByLevel: [
          ['trade_discount_5'],         // Lv1: 交易折扣5%
          ['trade_rare_goods'],         // Lv2: 稀有货物出现
          ['trade_bulk'],               // Lv3: 批量交易(买2送1)
      ]},
    { id: 'diplomat', category: 'social', name: '外交官',
      prereq: [{ branch: 'merchant', level: 1 }],
      unlocksByLevel: [
          ['rel_bonus_50'],             // Lv1: 好感获取+50%
          ['npc_special_dialog'],       // Lv2: NPC特殊对话
          ['companion_mastery'],        // Lv3: 随从精通(老K全属性+)
      ]},
    { id: 'leader', category: 'social', name: '领袖',
      prereq: [{ branch: 'diplomat', level: 1 }, { branch: 'knowledge', branchId: 'scholar', level: 1 }],
      unlocksByLevel: [
          ['rescue_progress_plus'],     // Lv1: 救援进度+
          ['morale_buff'],              // Lv2: 士气buff(全属性+3)
          ['rally'],                    // Lv3: 集结(所有NPC协助)
      ]},
];

/** 15个分支的完整特性注册表 */
export const FEATURE_REGISTRY: FeatureUnlock[] = [
    // ── 生存线 ──
    { id: 'herb_quality_1', name: '草药精选', desc: '采药+1品质', type: 'passive', hook: 'daily.herbs.quality1' },
    { id: 'herb暴击', name: '草药暴击', desc: '采药25%概率+1额外', type: 'passive', hook: 'daily.herbs.crit' },
    { id: 'forage_locations', name: '隐藏采集点', desc: '解锁隐藏草药采集点', type: 'ui', hook: 'explore.forage_spot' },
    { id: 'explore_cooldown_minus', name: '轻装上阵', desc: '探索冷却-1天', type: 'passive', hook: 'explore.cooldown' },
    { id: 'fog_navigation', name: '雾中辨向', desc: '迷雾深处探索安全+1', type: 'passive', hook: 'explore.fog_safe' },
    { id: 'hidden_paths', name: '隐藏通道', desc: '发现新探索路线', type: 'ui', hook: 'explore.hidden' },
    { id: 'cold_resist_1', name: '抗寒体质', desc: '寒冷伤害-1', type: 'passive', hook: 'night.cold Resist' },
    { id: 'disease_recovery', name: '自愈力', desc: '病愈速度翻倍', type: 'passive', hook: 'status.recovery' },
    { id: 'iron_will', name: '钢铁意志', desc: 'SAN≤20时不崩溃(每场1次)', type: 'passive', hook: 'night.ironWill' },

    // ── 战斗线 ──
    { id: 'bow_damage_plus', name: '精准射击', desc: '猎弓伤害+15%', type: 'passive', hook: 'daily.hunt.damage' },
    { id: 'trap_mastery', name: '陷阱精通', desc: '陷阱成功率+20%', type: 'passive', hook: 'daily.trap.bonus' },
    { id: 'track_prey', name: '追踪术', desc: '打猎+1产出', type: 'passive', hook: 'daily.hunt.extra' },
    { id: 'melee_option', name: '近战解锁', desc: '夜战近战选项', type: 'option', hook: 'night.melee' },
    { id: 'damage_reduce', name: '伤害减免', desc: '受伤减免15%', type: 'passive', hook: 'combat.reduce' },
    { id: 'counter_attack', name: '反击', desc: '战斗事件额外收益', type: 'passive', hook: 'combat.counter' },
    { id: 'night_intel', name: '夜战侦察', desc: '夜战前侦察(降低概率)', type: 'passive', hook: 'night.intel' },
    { id: 'beast_tide_plan', name: '兽潮防御', desc: '防御工事+30%', type: 'passive', hook: 'disaster.beast' },
    { id: 'ambush', name: '反伏击', desc: '探索遇敌先手', type: 'passive', hook: 'explore.ambush' },

    // ── 制作线 ──
    { id: 'build_cost_minus', name: '材料节约', desc: '建造材料-15%', type: 'passive', hook: 'craft.cost' },
    { id: 'facility_upgrade', name: '设施升级', desc: '设施升级选项', type: 'recipe', hook: 'craft.facilityUp' },
    { id: 'fortification', name: '防御工事', desc: '兽潮减伤', type: 'passive', hook: 'disaster.fort' },
    { id: 'cook_quality_2', name: '精致料理', desc: '1AP精致烹饪(品质提升)', type: 'action', hook: 'daily.cookFeast.tier2' },
    { id: 'cook_feast_plus', name: '盛宴升级', desc: '盛宴全属性大buff', type: 'action', hook: 'daily.cookFeast.tier3' },
    { id: 'cook_recipe_discover', name: '食谱发现', desc: '日记/读书触发食谱发现', type: 'passive', hook: 'craft.recipeFind' },
    { id: 'tool_upgrade', name: '工具升级', desc: '工具升级配方', type: 'recipe', hook: 'craft.toolUp' },
    { id: 'rare_craft', name: '稀有制作', desc: '信号枪/电池配方', type: 'recipe', hook: 'craft.rare' },
    { id: 'auto_craft', name: '自动制作', desc: '被动产出资源', type: 'passive', hook: 'craft.auto' },

    // ── 知识线 ──
    { id: 'scout_range_plus', name: '广域侦察', desc: '侦察范围+，情报更多', type: 'passive', hook: 'daily.scout.range' },
    { id: 'map_reveal', name: '地图揭示', desc: '发现隐藏地点', type: 'ui', hook: 'explore.mapReveal' },
    { id: 'threat_predict', name: '威胁预判', desc: '灾前3天预警', type: 'passive', hook: 'disaster.predict' },
    { id: 'radio_decrypt', name: '广播解密', desc: '广播情报质量+', type: 'passive', hook: 'daily.radio.quality' },
    { id: 'lore_knowledge', name: '世界观知识', desc: '隐藏事件线索', type: 'passive', hook: 'event.lore' },
    { id: 'rescue_boost', name: '救援加速', desc: '救援进度每天+2', type: 'passive', hook: 'daily.radio.rescue' },
    { id: 'sanity_shield', name: '心灵护盾', desc: 'SAN衰减-2', type: 'passive', hook: 'night.sanShield' },
    { id: 'dream_events', name: '梦境事件', desc: '触发特殊剧情', type: 'passive', hook: 'night.dream' },
    { id: 'foresight', name: '预知', desc: '查看下一天事件', type: 'ui', hook: 'morning.foresight' },

    // ── 社交线 ──
    { id: 'trade_discount_5', name: '交易折扣', desc: '交易价格-5%', type: 'passive', hook: 'trade.discount' },
    { id: 'trade_rare_goods', name: '稀有货物', desc: '稀有物品出现概率+', type: 'passive', hook: 'trade.rare' },
    { id: 'trade_bulk', name: '批量交易', desc: '批量交易(买2送1)', type: 'passive', hook: 'trade.bulk' },
    { id: 'rel_bonus_50', name: '亲和力', desc: '好感获取+50%', type: 'passive', hook: 'rel.bonus' },
    { id: 'npc_special_dialog', name: '特殊对话', desc: 'NPC特殊剧情对话', type: 'option', hook: 'rel.specialDialog' },
    { id: 'companion_mastery', name: '随从精通', desc: '老K全属性+', type: 'passive', hook: 'companion.mastery' },
    { id: 'rescue_progress_plus', name: '救援推进', desc: '救援进度+', type: 'passive', hook: 'rescue.progress' },
    { id: 'morale_buff', name: '士气鼓舞', desc: '全属性+3', type: 'passive', hook: 'morale.buff' },
    { id: 'rally', name: '集结号', desc: '所有NPC协助', type: 'passive', hook: 'rescue.rally' },
];

/** 每级所需 XP */
export const XP_PER_LEVEL = 100;
export const MAX_SKILL_LEVEL = 10;

/** 行动→XP映射：[survival, combat, craft, knowledge, social] */
export const ACTION_XP: Record<string, [number, number, number, number, number]> = {
    explore:         [15, 5, 0, 3, 0],
    fish:            [12, 0, 2, 0, 0],
    hunt:            [5, 15, 0, 0, 0],
    gatherHerbs:     [8, 0, 0, 3, 0],
    craft:           [0, 0, 15, 0, 0],
    weaveRope:       [0, 0, 8, 0, 0],
    cookFeast:       [5, 0, 20, 0, 0],
    cookFine:        [3, 0, 18, 5, 0],   // 精致料理
    stokeFire:       [5, 0, 3, 0, 0],
    scout:           [0, 0, 0, 15, 0],
    listenRadio:     [0, 0, 0, 12, 0],
    journal:         [0, 0, 0, 10, 0],
    exercise:        [0, 10, 0, 0, 0],
    meditate:        [8, 0, 0, 3, 0],
    trade:           [0, 0, 0, 0, 15],
    playChess:       [0, 0, 0, 0, 10],
    leaveFood:       [0, 0, 0, 0, 12],
    checkTrap:       [3, 5, 0, 0, 0],
    sleep:           [3, 0, 0, 0, 0],
};
