/**
 * 游戏统一配置与公式模块 v0.5.0
 * 集中管理所有游戏参数、数学公式、阶段划分、系统规则
 * 所有系统都应引用此模块的配置，避免硬编码和重复
 *
 * 设计原则：
 * 1. 灵活但严谨 — 所有事件有因果逻辑，不随便乱搞
 * 2. 动态变化 — NPC、事件、环境随游戏进程不断变化
 * 3. 系统化 — 每个事物都有完整规则，经得起深究
 * 4. 可扩展 — 配置驱动，新增内容只需添加配置
 */

// ============================================================
// 一、十阶势力发展体系（200天完整游戏周期）
// ============================================================
export interface GamePhase {
  id: number;
  name: string;
  dayRange: [number, number];
  scale: string; // 人口规模描述
  theme: string;
  description: string;
  coreGoal: string; // 核心目标
  // 阶段加成/惩罚
  resourceConsumptionMultiplier: number;
  monsterStrengthMultiplier: number;
  eventRateMultiplier: number;
  npcInteractionRate: number; // NPC互动频率
  // 解锁内容
  unlocks: string[];
  // 大事件检验
  majorEvent: {
    day: number; // 大事件触发天数
    name: string;
    description: string;
    difficultyThresholds: DifficultyThreshold[]; // 难度阈值
  };
  // 阶段跃迁条件
  transitionCondition: {
    type: 'survive' | 'quest' | 'combat' | 'diplomacy' | 'special';
    description: string;
  };
}

export interface DifficultyThreshold {
  level: 'easy' | 'normal' | 'hard' | 'deadly';
  name: string;
  description: string;
  // 检验条件（满足任一即可进入该难度等级）
  conditions: {
    minStrength?: number;
    minAgility?: number;
    minIntelligence?: number;
    minLuck?: number;
    hasWeapon?: boolean;
    hasArmor?: boolean;
    baseLevel?: number;
    allyCount?: number;
    resourceStockpile?: number; // 资源储备评分
    specialItem?: string; // 特殊物品
  };
  // 结果
  outcome: {
    survivalChance: number; // 存活概率
    rewardMultiplier: number; // 奖励倍率
    penaltyDescription: string;
  };
}

export const GAME_PHASES: GamePhase[] = [
  {
    id: 1,
    name: '独居期',
    dayRange: [1, 7],
    scale: '1人',
    theme: '茫然、恐惧、基础生存',
    description: '你独自在迷雾中醒来，一切都是未知。找到食物、水和庇护所是当务之急。迷雾中似乎有什么东西在窥视着你。',
    coreGoal: '建立庇护所，活过第一次兽潮',
    resourceConsumptionMultiplier: 1.0,
    monsterStrengthMultiplier: 0.8,
    eventRateMultiplier: 0.7,
    npcInteractionRate: 0.1,
    unlocks: ['基础行动', '基础物品', '序章剧情', '每日面板', '隐藏提示'],
    majorEvent: {
      day: 7,
      name: '第一次兽潮',
      description: '第七天夜里，迷雾中的野兽被某种力量驱使，向你的庇护所发起冲锋。这是你第一次面对真正的生死考验。',
      difficultyThresholds: [
        {
          level: 'easy',
          name: '有备无患',
          description: '你有武器、有防御、体力充沛，兽潮不过是一场狩猎。',
          conditions: { minStrength: 12, hasWeapon: true, baseLevel: 1 },
          outcome: { survivalChance: 0.95, rewardMultiplier: 1.5, penaltyDescription: '无' },
        },
        {
          level: 'normal',
          name: '艰难防守',
          description: '你有基本准备，但兽潮的规模超出预期，需要拼命才能活下来。',
          conditions: { minStrength: 8, hasWeapon: true },
          outcome: { survivalChance: 0.7, rewardMultiplier: 1.0, penaltyDescription: '受伤，损失部分资源' },
        },
        {
          level: 'hard',
          name: '生死一线',
          description: '你几乎没有准备，只能靠运气和本能求生。每一秒都可能是最后一秒。',
          conditions: { minStrength: 5 },
          outcome: { survivalChance: 0.35, rewardMultiplier: 0.5, penaltyDescription: '重伤，庇护所被毁，失去大量资源' },
        },
        {
          level: 'deadly',
          name: '无力回天',
          description: '你手无寸铁，身虚体弱，兽潮面前你不过是一块肉。',
          conditions: {},
          outcome: { survivalChance: 0.05, rewardMultiplier: 0, penaltyDescription: '死亡概率极高' },
        },
      ],
    },
    transitionCondition: {
      type: 'survive',
      description: '存活过第一次兽潮',
    },
  },
  {
    id: 2,
    name: '互助组',
    dayRange: [8, 14],
    scale: '2-3人',
    theme: '警惕、试探、信任建立',
    description: '你遇到了其他幸存者。在这个迷雾世界里，人既是最大的依靠，也是最大的危险。信任还是背叛？合作还是独行？',
    coreGoal: '建立可信的小团体，通过第一次团体危机',
    resourceConsumptionMultiplier: 1.1,
    monsterStrengthMultiplier: 1.0,
    eventRateMultiplier: 1.0,
    npcInteractionRate: 0.5,
    unlocks: ['同伴系统', '交易系统', 'NPC个人剧情', '老K线', '朵朵线'],
    majorEvent: {
      day: 14,
      name: '团体危机',
      description: '物资短缺、外部威胁、内部矛盾同时爆发。你的团体是分崩离析，还是浴火重生？',
      difficultyThresholds: [
        {
          level: 'easy', name: '众志成城', description: '团体信任度高，物资充足，外部威胁被轻松化解。',
          conditions: { allyCount: 2, resourceStockpile: 50 },
          outcome: { survivalChance: 0.9, rewardMultiplier: 1.5, penaltyDescription: '无，团体凝聚力提升' },
        },
        {
          level: 'normal', name: '有惊无险', description: '虽然有矛盾和损失，但团体挺了过来。',
          conditions: { allyCount: 1 },
          outcome: { survivalChance: 0.7, rewardMultiplier: 1.0, penaltyDescription: '可能失去一名同伴' },
        },
        {
          level: 'hard', name: '分崩离析', description: '内部矛盾爆发，外部威胁压境，团体摇摇欲坠。',
          conditions: {},
          outcome: { survivalChance: 0.4, rewardMultiplier: 0.5, penaltyDescription: '团体解散，失去同伴和资源' },
        },
        {
          level: 'deadly', name: '众叛亲离', description: '你被同伴背叛，陷入绝境。',
          conditions: {},
          outcome: { survivalChance: 0.1, rewardMultiplier: 0, penaltyDescription: '被背叛，重伤，失去一切' },
        },
      ],
    },
    transitionCondition: { type: 'survive', description: '团体存活并保持凝聚力' },
  },
  {
    id: 3,
    name: '小队',
    dayRange: [15, 21],
    scale: '5-10人',
    theme: '分工、训练、防御建设',
    description: '你的团体开始壮大。职业分化、训练体系、防御工事——你不再是一群乌合之众，而是一支有组织的小队。',
    coreGoal: '建立职业分工和防御体系，击退精英怪物',
    resourceConsumptionMultiplier: 1.15,
    monsterStrengthMultiplier: 1.1,
    eventRateMultiplier: 1.1,
    npcInteractionRate: 0.6,
    unlocks: ['职业系统', '技能树', '装备强化', '基地建设', '医生线'],
    majorEvent: {
      day: 21,
      name: '精英怪物袭击',
      description: '一只从未见过的精英怪物出现在基地附近。它比你遇到的任何野兽都强大、狡猾。这是对你的小队战斗力的真正检验。',
      difficultyThresholds: [
        { level: 'easy', name: '围猎成功', description: '小队配合默契，战术得当，精英怪物成为战利品。', conditions: { minStrength: 15, allyCount: 3, hasWeapon: true }, outcome: { survivalChance: 0.9, rewardMultiplier: 2.0, penaltyDescription: '无，获得稀有材料' } },
        { level: 'normal', name: '惨胜', description: '付出了代价，但最终击杀了怪物。', conditions: { minStrength: 12, allyCount: 2 }, outcome: { survivalChance: 0.65, rewardMultiplier: 1.0, penaltyDescription: '1-2人重伤，消耗大量资源' } },
        { level: 'hard', name: '溃败', description: '小队无法对抗精英怪物，只能撤退。', conditions: { minStrength: 8 }, outcome: { survivalChance: 0.4, rewardMultiplier: 0.3, penaltyDescription: '基地受损，人员伤亡' } },
        { level: 'deadly', name: '屠杀', description: '精英怪物如入无人之境，你的小队不堪一击。', conditions: {}, outcome: { survivalChance: 0.1, rewardMultiplier: 0, penaltyDescription: '小队覆灭，大量死亡' } },
      ],
    },
    transitionCondition: { type: 'combat', description: '击杀或击退精英怪物' },
  },
  {
    id: 4,
    name: '车队',
    dayRange: [22, 30],
    scale: '10-20人',
    theme: '机动、掠夺、遭遇',
    description: '你找到了载具，小队变成了车队。机动性带来了更多资源和机会，也让你遭遇了其他车队。迷雾中的道路，弱肉强食。',
    coreGoal: '建立机动能力，在与其他车队的遭遇中存活',
    resourceConsumptionMultiplier: 1.2,
    monsterStrengthMultiplier: 1.2,
    eventRateMultiplier: 1.2,
    npcInteractionRate: 0.7,
    unlocks: ['载具系统', '车队管理', '遭遇战', '贸易路线', '军方残部线'],
    majorEvent: {
      day: 30,
      name: '车队遭遇战',
      description: '你在迷雾中的公路上遭遇了另一支车队。他们人数更多，装备更好。谈判、战斗、还是逃跑？你的决定将决定整个车队的命运。',
      difficultyThresholds: [
        { level: 'easy', name: '强势谈判', description: '你的实力让对方不敢轻举妄动，最终达成有利的交易。', conditions: { minStrength: 18, allyCount: 5, resourceStockpile: 100 }, outcome: { survivalChance: 0.95, rewardMultiplier: 2.0, penaltyDescription: '无，获得大量资源和情报' } },
        { level: 'normal', name: '势均力敌', description: '双方都有顾虑，最终达成脆弱的和平。', conditions: { minStrength: 14, allyCount: 3 }, outcome: { survivalChance: 0.7, rewardMultiplier: 1.0, penaltyDescription: '付出部分资源换取和平' } },
        { level: 'hard', name: '血战突围', description: '谈判破裂，你必须战斗才能活下去。', conditions: { minStrength: 10 }, outcome: { survivalChance: 0.4, rewardMultiplier: 0.5, penaltyDescription: '大量伤亡，载具受损' } },
        { level: 'deadly', name: '被吞并', description: '你的车队不堪一击，被对方吞并或消灭。', conditions: {}, outcome: { survivalChance: 0.1, rewardMultiplier: 0, penaltyDescription: '车队覆灭，被俘或死亡' } },
      ],
    },
    transitionCondition: { type: 'diplomacy', description: '在遭遇战中存活并保持独立性' },
  },
  {
    id: 5,
    name: '据点',
    dayRange: [31, 45],
    scale: '20-50人',
    theme: '固定、产业、防御',
    description: '你找到了一个易守难攻的地点，建立了固定据点。城墙、农田、工坊——你开始重建文明的雏形。但树大招风，更大的威胁正在逼近。',
    coreGoal: '建立完善的据点防御和产业，抵御大型兽潮',
    resourceConsumptionMultiplier: 1.25,
    monsterStrengthMultiplier: 1.3,
    eventRateMultiplier: 1.3,
    npcInteractionRate: 0.8,
    unlocks: ['据点建设', '产业系统', '农业生产', '工坊制造', '城墙防御', '神秘组织线'],
    majorEvent: {
      day: 45,
      name: '大型兽潮',
      description: '迷雾深处传来低沉的咆哮。前所未有的兽潮正在向你的据点涌来。这不是几十只野兽，而是成百上千只。你的城墙能守住吗？',
      difficultyThresholds: [
        { level: 'easy', name: '固若金汤', description: '你的防御工事完善，守军训练有素，兽潮不过是送材料。', conditions: { baseLevel: 3, allyCount: 10, minStrength: 20 }, outcome: { survivalChance: 0.95, rewardMultiplier: 2.5, penaltyDescription: '无，获得大量晶核和材料' } },
        { level: 'normal', name: '艰苦守城', description: '兽潮的规模超出预期，但你的守军拼死抵抗。', conditions: { baseLevel: 2, allyCount: 6 }, outcome: { survivalChance: 0.65, rewardMultiplier: 1.0, penaltyDescription: '城墙受损，人员伤亡，消耗大量资源' } },
        { level: 'hard', name: '城破人亡', description: '城墙被攻破，你只能巷战求生。', conditions: { baseLevel: 1 }, outcome: { survivalChance: 0.35, rewardMultiplier: 0.3, penaltyDescription: '据点被毁，大量人员死亡' } },
        { level: 'deadly', name: '人间地狱', description: '兽潮如潮水般涌入，你的据点不堪一击。', conditions: {}, outcome: { survivalChance: 0.05, rewardMultiplier: 0, penaltyDescription: '据点覆灭，几乎无人生还' } },
      ],
    },
    transitionCondition: { type: 'survive', description: '守住据点，击退大型兽潮' },
  },
  {
    id: 6,
    name: '基地',
    dayRange: [46, 65],
    scale: '50-200人',
    theme: '制度、军工、势力',
    description: '你的据点发展成了基地。军规、生产、贸易、训练——你建立了一套完整的制度。但其他势力也在崛起，迷雾中的地盘就这么大，战争不可避免。',
    coreGoal: '建立完善的基地制度和军工生产，赢得势力战争',
    resourceConsumptionMultiplier: 1.3,
    monsterStrengthMultiplier: 1.4,
    eventRateMultiplier: 1.4,
    npcInteractionRate: 0.9,
    unlocks: ['军事制度', '军工生产', '贸易网络', '外交系统', '情报系统', '觉醒者线'],
    majorEvent: {
      day: 65,
      name: '势力战争',
      description: '邻近的势力向你宣战。这不是小团体的冲突，而是两支军队的对决。战术、后勤、士气——每一个环节都可能决定胜负。',
      difficultyThresholds: [
        { level: 'easy', name: '横扫千军', description: '你的军队训练有素，装备精良，战术得当，敌军不堪一击。', conditions: { baseLevel: 4, allyCount: 30, minStrength: 25 }, outcome: { survivalChance: 0.95, rewardMultiplier: 3.0, penaltyDescription: '无，吞并敌方势力，获得大量资源和人口' } },
        { level: 'normal', name: '惨胜', description: '双方都付出了惨重代价，但你最终赢得了战争。', conditions: { baseLevel: 3, allyCount: 15 }, outcome: { survivalChance: 0.65, rewardMultiplier: 1.5, penaltyDescription: '大量伤亡，资源消耗巨大' } },
        { level: 'hard', name: '战败', description: '你的军队被击败，基地沦陷。', conditions: { baseLevel: 2 }, outcome: { survivalChance: 0.3, rewardMultiplier: 0.3, penaltyDescription: '基地被占领，大量人员被俘或死亡' } },
        { level: 'deadly', name: '灭顶之灾', description: '你的势力被彻底消灭，无人生还。', conditions: {}, outcome: { survivalChance: 0.05, rewardMultiplier: 0, penaltyDescription: '势力覆灭，全部死亡' } },
      ],
    },
    transitionCondition: { type: 'combat', description: '赢得势力战争，吞并或击败敌方' },
  },
  {
    id: 7,
    name: '城镇',
    dayRange: [66, 90],
    scale: '200-500人',
    theme: '贸易、文化、重建',
    description: '你的基地发展成了城镇。市场、学校、医院、剧场——文明正在废墟上重生。但繁荣背后是暗流涌动，内部的矛盾和外部的威胁同时发酵。',
    coreGoal: '建立繁荣的城镇，平息内部叛乱',
    resourceConsumptionMultiplier: 1.35,
    monsterStrengthMultiplier: 1.5,
    eventRateMultiplier: 1.5,
    npcInteractionRate: 1.0,
    unlocks: ['城镇管理', '文化建设', '教育系统', '宗教系统', '贵族系统', '真相线深入'],
    majorEvent: {
      day: 90,
      name: '内部叛乱',
      description: '城镇中的反对派发动了叛乱。他们可能是被压迫的平民、野心勃勃的军官、或是被外部势力收买的内奸。你的城镇是浴火重生，还是分崩离析？',
      difficultyThresholds: [
        { level: 'easy', name: '民心所向', description: '你的统治深得民心，叛乱不得人心，迅速被平息。', conditions: { minIntelligence: 25, allyCount: 50, resourceStockpile: 300 }, outcome: { survivalChance: 0.95, rewardMultiplier: 2.0, penaltyDescription: '无，城镇凝聚力提升，获得叛乱者的资源' } },
        { level: 'normal', name: '艰难平叛', description: '叛乱持续了一段时间，但你最终控制了局面。', conditions: { minIntelligence: 18, allyCount: 25 }, outcome: { survivalChance: 0.65, rewardMultiplier: 1.0, penaltyDescription: '城镇受损，部分人员死亡，经济衰退' } },
        { level: 'hard', name: '城镇分裂', description: '叛乱无法平息，城镇分裂成两派，内战爆发。', conditions: { minIntelligence: 12 }, outcome: { survivalChance: 0.35, rewardMultiplier: 0.3, penaltyDescription: '城镇分裂，大量人员死亡，经济崩溃' } },
        { level: 'deadly', name: '众叛亲离', description: '你被所有人抛弃，叛乱者占领了城镇。', conditions: {}, outcome: { survivalChance: 0.1, rewardMultiplier: 0, penaltyDescription: '被推翻，被俘或死亡' } },
      ],
    },
    transitionCondition: { type: 'diplomacy', description: '平息叛乱，保持城镇统一' },
  },
  {
    id: 8,
    name: '联盟',
    dayRange: [91, 120],
    scale: '500-2000人',
    theme: '外交、联盟、博弈',
    description: '你的城镇与其他势力结盟，形成了联盟。外交、间谍、暗杀、联姻——联盟内部的博弈比外部战争更复杂。迷雾中的格局正在重新洗牌。',
    coreGoal: '建立强大的联盟，赢得联盟战争',
    resourceConsumptionMultiplier: 1.4,
    monsterStrengthMultiplier: 1.6,
    eventRateMultiplier: 1.6,
    npcInteractionRate: 1.0,
    unlocks: ['联盟外交', '间谍系统', '联姻系统', '联合军事', '跨区域贸易', '迷雾真相核心'],
    majorEvent: {
      day: 120,
      name: '联盟战争',
      description: '两大联盟的决战爆发了。这是迷雾世界有史以来最大规模的战争。数千人在迷雾中厮杀，你的每一个决策都可能改变战局。',
      difficultyThresholds: [
        { level: 'easy', name: '联盟霸主', description: '你的联盟实力强大，战术得当，敌方联盟迅速崩溃。', conditions: { minIntelligence: 30, allyCount: 100, resourceStockpile: 500 }, outcome: { survivalChance: 0.95, rewardMultiplier: 3.0, penaltyDescription: '无，成为联盟霸主，获得大量资源和领土' } },
        { level: 'normal', name: '惨胜', description: '战争异常惨烈，但你的联盟最终赢得了胜利。', conditions: { minIntelligence: 22, allyCount: 50 }, outcome: { survivalChance: 0.6, rewardMultiplier: 1.5, penaltyDescription: '大量伤亡，资源消耗巨大，联盟内部矛盾加剧' } },
        { level: 'hard', name: '战败', description: '你的联盟被击败，成员纷纷倒戈。', conditions: { minIntelligence: 15 }, outcome: { survivalChance: 0.3, rewardMultiplier: 0.3, penaltyDescription: '联盟瓦解，大量人员死亡，领土被占领' } },
        { level: 'deadly', name: '全军覆没', description: '你的联盟被彻底消灭，无人生还。', conditions: {}, outcome: { survivalChance: 0.05, rewardMultiplier: 0, penaltyDescription: '联盟覆灭，全部死亡' } },
      ],
    },
    transitionCondition: { type: 'combat', description: '赢得联盟战争，成为霸主' },
  },
  {
    id: 9,
    name: '战区',
    dayRange: [121, 150],
    scale: '2000-10000人',
    theme: '军事、战略、决战',
    description: '你的联盟发展成了战区军事组织。正规军、参谋部、后勤体系、战略规划——你已经是迷雾世界最强大的势力之一。但迷雾的真相正在浮出水面，最终的威胁正在逼近。',
    coreGoal: '建立强大的军事力量，击败最终BOSS',
    resourceConsumptionMultiplier: 1.45,
    monsterStrengthMultiplier: 1.8,
    eventRateMultiplier: 1.7,
    npcInteractionRate: 1.0,
    unlocks: ['正规军编制', '参谋部', '战略规划', '重型武器', '超凡者部队', '迷雾源头线索'],
    majorEvent: {
      day: 150,
      name: '最终BOSS',
      description: '迷雾的源头出现了——一个超越人类理解的存在。它是迷雾的创造者，还是迷雾的化身？这是人类与迷雾的最终决战。',
      difficultyThresholds: [
        { level: 'easy', name: '人类之光', description: '你的军队强大，超凡者众多，你找到了BOSS的弱点，最终将其击败。', conditions: { minStrength: 35, minIntelligence: 35, allyCount: 200, specialItem: 'mist_core' }, outcome: { survivalChance: 0.9, rewardMultiplier: 5.0, penaltyDescription: '无，迷雾开始消散，人类看到了希望' } },
        { level: 'normal', name: '惨胜', description: '你付出了巨大的代价，但最终击败了BOSS。', conditions: { minStrength: 25, minIntelligence: 25, allyCount: 100 }, outcome: { survivalChance: 0.5, rewardMultiplier: 2.0, penaltyDescription: '大量伤亡，包括核心成员，迷雾部分消散' } },
        { level: 'hard', name: '溃败', description: 'BOSS的力量超出想象，你的军队无法对抗。', conditions: { minStrength: 18 }, outcome: { survivalChance: 0.2, rewardMultiplier: 0.5, penaltyDescription: '军队覆灭，大量死亡，迷雾加剧' } },
        { level: 'deadly', name: '人类末日', description: 'BOSS轻易摧毁了你的军队，人类的希望破灭。', conditions: {}, outcome: { survivalChance: 0.02, rewardMultiplier: 0, penaltyDescription: '全军覆没，人类文明终结' } },
      ],
    },
    transitionCondition: { type: 'special', description: '击败最终BOSS，或找到其他解决方案' },
  },
  {
    id: 10,
    name: '联邦',
    dayRange: [151, 200],
    scale: '10000+人',
    theme: '文明、重建、世界命运',
    description: '迷雾开始消散，你领导建立了人类联邦。重建文明、恢复秩序、探索未知——但迷雾的遗产仍在，新的威胁和机遇并存。人类的未来，在你手中。',
    coreGoal: '重建人类文明，决定世界的最终命运',
    resourceConsumptionMultiplier: 1.5,
    monsterStrengthMultiplier: 2.0,
    eventRateMultiplier: 1.8,
    npcInteractionRate: 1.0,
    unlocks: ['联邦政府', '文明重建', '科技恢复', '探索未知', '多结局分支'],
    majorEvent: {
      day: 200,
      name: '世界命运',
      description: '迷雾完全消散了。但世界已经改变。你是建立一个新的文明，还是成为新的独裁者？是恢复旧世界的科技，还是走出一条新的道路？人类的命运，在你手中。',
      difficultyThresholds: [
        { level: 'easy', name: '文明领袖', description: '你领导人类重建了文明，建立了公正繁荣的联邦。', conditions: { minIntelligence: 40, minLuck: 20, resourceStockpile: 1000 }, outcome: { survivalChance: 1.0, rewardMultiplier: 10.0, penaltyDescription: '无，好结局：文明重生' } },
        { level: 'normal', name: '艰难重建', description: '虽然困难重重，但你最终建立了稳定的联邦。', conditions: { minIntelligence: 30, allyCount: 300 }, outcome: { survivalChance: 0.8, rewardMultiplier: 3.0, penaltyDescription: '部分地区仍不稳定，发展缓慢' } },
        { level: 'hard', name: '动荡不安', description: '联邦内部矛盾重重，外部威胁不断，你勉强维持着统一。', conditions: { minIntelligence: 20 }, outcome: { survivalChance: 0.5, rewardMultiplier: 1.0, penaltyDescription: '联邦动荡，随时可能分裂' } },
        { level: 'deadly', name: '文明崩溃', description: '联邦分崩离析，人类再次陷入混乱。', conditions: {}, outcome: { survivalChance: 0.2, rewardMultiplier: 0, penaltyDescription: '联邦崩溃，人类文明再次陷入黑暗' } },
      ],
    },
    transitionCondition: { type: 'special', description: '完成游戏，进入多结局' },
  },
];

/** 根据天数获取当前阶段 */
export function getPhaseByDay(day: number): GamePhase {
  for (const phase of GAME_PHASES) {
    if (day >= phase.dayRange[0] && day <= phase.dayRange[1]) return phase;
  }
  return GAME_PHASES[GAME_PHASES.length - 1];
}

/** 获取阶段的大事件 */
export function getMajorEventByDay(day: number): GamePhase['majorEvent'] | null {
  const phase = getPhaseByDay(day);
  if (day === phase.majorEvent.day) return phase.majorEvent;
  return null;
}

// ============================================================
// 二、每日系统配置（面板刷新、天气、迷雾浓度）
// ============================================================
export interface DailyPanel {
  day: number;
  weather: WeatherType;
  mistDensity: MistDensity;
  dangerLevel: DangerLevel;
  specialHint: string | null; // 隐藏提示（金手指）
  timeOfDay: 'morning' | 'noon' | 'evening' | 'night' | 'witching_hour';
}

export type WeatherType = 'clear' | 'foggy' | 'rainy' | 'stormy' | 'bloody_moon' | 'mist_tide';
export type MistDensity = 'thin' | 'normal' | 'thick' | 'impenetrable';
export type DangerLevel = 'safe' | 'low' | 'moderate' | 'high' | 'extreme';

export const WEATHER_CONFIG: Record<WeatherType, {
  name: string;
  description: string;
  visibilityMultiplier: number;
  monsterActivityMultiplier: number;
  resourceGatherMultiplier: number;
  sanityDrainMultiplier: number;
}> = {
  clear: { name: '晴朗', description: '迷雾罕见地稀薄了一些，能看到更远的地方。', visibilityMultiplier: 1.5, monsterActivityMultiplier: 0.8, resourceGatherMultiplier: 1.2, sanityDrainMultiplier: 0.8 },
  foggy: { name: '浓雾', description: '浓雾笼罩一切，能见度极低，每一步都可能踏入危险。', visibilityMultiplier: 1.0, monsterActivityMultiplier: 1.0, resourceGatherMultiplier: 1.0, sanityDrainMultiplier: 1.0 },
  rainy: { name: '阴雨', description: '冰冷的雨水穿透迷雾，体温流失加快，但雨水可以收集。', visibilityMultiplier: 0.8, monsterActivityMultiplier: 0.9, resourceGatherMultiplier: 1.1, sanityDrainMultiplier: 1.2 },
  stormy: { name: '暴风', description: '狂风呼啸，迷雾被撕裂又重组，户外行动极其危险。', visibilityMultiplier: 0.5, monsterActivityMultiplier: 1.3, resourceGatherMultiplier: 0.5, sanityDrainMultiplier: 1.5 },
  bloody_moon: { name: '血月', description: '月亮变成了血红色，迷雾中的生物变得异常狂暴。这是最危险的夜晚。', visibilityMultiplier: 0.7, monsterActivityMultiplier: 2.0, resourceGatherMultiplier: 0.3, sanityDrainMultiplier: 2.0 },
  mist_tide: { name: '迷雾潮汐', description: '迷雾像潮水一样涌动，浓度不断变化，某些区域被淹没，某些区域显露。', visibilityMultiplier: 0.6, monsterActivityMultiplier: 1.5, resourceGatherMultiplier: 0.8, sanityDrainMultiplier: 1.8 },
};

export const MIST_DENSITY_CONFIG: Record<MistDensity, {
  name: string;
  visibility: number; // 能见度（米）
  sanityDrainPerHour: number;
  monsterSpawnRate: number;
  specialEventChance: number;
}> = {
  thin: { name: '稀薄', visibility: 50, sanityDrainPerHour: 0.1, monsterSpawnRate: 0.1, specialEventChance: 0.05 },
  normal: { name: '正常', visibility: 20, sanityDrainPerHour: 0.3, monsterSpawnRate: 0.2, specialEventChance: 0.1 },
  thick: { name: '浓厚', visibility: 8, sanityDrainPerHour: 0.6, monsterSpawnRate: 0.4, specialEventChance: 0.2 },
  impenetrable: { name: '伸手不见五指', visibility: 2, sanityDrainPerHour: 1.2, monsterSpawnRate: 0.7, specialEventChance: 0.4 },
};

/** 根据天数和阶段计算每日天气 */
export function calculateDailyWeather(day: number, rng: () => number): WeatherType {
  const phase = getPhaseByDay(day);
  const roll = rng();
  // 后期恶劣天气概率增加
  const stormChance = 0.05 + phase.id * 0.02;
  const bloodyMoonChance = (day % 7 === 0) ? 0.3 : 0.02; // 每7天血月概率高
  const mistTideChance = 0.03 + phase.id * 0.01;

  if (roll < bloodyMoonChance) return 'bloody_moon';
  if (roll < bloodyMoonChance + mistTideChance) return 'mist_tide';
  if (roll < bloodyMoonChance + mistTideChance + stormChance) return 'stormy';
  if (roll < bloodyMoonChance + mistTideChance + stormChance + 0.2) return 'rainy';
  if (roll < bloodyMoonChance + mistTideChance + stormChance + 0.2 + 0.5) return 'foggy';
  return 'clear';
}

/** 根据天数和天气计算迷雾浓度 */
export function calculateMistDensity(day: number, weather: WeatherType): MistDensity {
  const phase = getPhaseByDay(day);
  let base: MistDensity = 'normal';
  if (phase.id <= 2) base = 'thin';
  else if (phase.id <= 5) base = 'normal';
  else if (phase.id <= 8) base = 'thick';
  else base = 'impenetrable';

  // 天气影响
  if (weather === 'clear') {
    if (base === 'impenetrable') return 'thick';
    if (base === 'thick') return 'normal';
    if (base === 'normal') return 'thin';
  }
  if (weather === 'stormy' || weather === 'bloody_moon' || weather === 'mist_tide') {
    if (base === 'thin') return 'normal';
    if (base === 'normal') return 'thick';
    if (base === 'thick') return 'impenetrable';
  }
  return base;
}

/** 计算危险等级 */
export function calculateDangerLevel(day: number, mistDensity: MistDensity, weather: WeatherType): DangerLevel {
  let score = getPhaseByDay(day).id * 0.5;
  score += MIST_DENSITY_CONFIG[mistDensity].sanityDrainPerHour * 2;
  if (weather === 'bloody_moon') score += 3;
  if (weather === 'stormy') score += 1.5;
  if (weather === 'mist_tide') score += 2;

  if (score < 2) return 'safe';
  if (score < 4) return 'low';
  if (score < 6) return 'moderate';
  if (score < 8) return 'high';
  return 'extreme';
}

// ============================================================
// 三、迷雾规则系统（区域、时间、异常现象）
// ============================================================
export interface MistZone {
  id: string;
  name: string;
  type: 'safe' | 'normal' | 'dangerous' | 'resource' | 'anomaly' | 'altar' | 'ruins';
  description: string;
  unlockDay: number; // 解锁天数
  // 区域效果
  effects: {
    sanityDrainMultiplier: number;
    monsterSpawnRate: number;
    resourceGatherMultiplier: number;
    specialEventChance: number;
  };
  // 可能发现的物品/事件
  lootTable: string[];
  dangerLevel: DangerLevel;
}

export const MIST_ZONES: MistZone[] = [
  {
    id: 'safe_house',
    name: '庇护所',
    type: 'safe',
    description: '你建立的庇护所，相对安全。可以休息、制作、存储物资。',
    unlockDay: 1,
    effects: { sanityDrainMultiplier: 0.3, monsterSpawnRate: 0.05, resourceGatherMultiplier: 0, specialEventChance: 0.02 },
    lootTable: [],
    dangerLevel: 'safe',
  },
  {
    id: 'nearby_ruins',
    name: '附近废墟',
    type: 'normal',
    description: '庇护所附近的废弃建筑，可能找到一些基础物资。',
    unlockDay: 1,
    effects: { sanityDrainMultiplier: 0.8, monsterSpawnRate: 0.15, resourceGatherMultiplier: 1.0, specialEventChance: 0.1 },
    lootTable: ['food', 'water', 'wood', 'cloth', 'metal_scrap'],
    dangerLevel: 'low',
  },
  {
    id: 'deep_ruins',
    name: '深入废墟',
    type: 'dangerous',
    description: '更远的废墟区域，物资更丰富，但危险也更大。',
    unlockDay: 3,
    effects: { sanityDrainMultiplier: 1.2, monsterSpawnRate: 0.35, resourceGatherMultiplier: 1.5, specialEventChance: 0.2 },
    lootTable: ['food', 'water', 'metal', 'weapon_parts', 'medicine', 'radio_parts'],
    dangerLevel: 'moderate',
  },
  {
    id: 'forest_edge',
    name: '森林边缘',
    type: 'resource',
    description: '迷雾森林的边缘，可以采集木材、草药，偶尔能猎到小动物。',
    unlockDay: 2,
    effects: { sanityDrainMultiplier: 1.0, monsterSpawnRate: 0.25, resourceGatherMultiplier: 1.3, specialEventChance: 0.15 },
    lootTable: ['wood', 'herb', 'meat', 'leather', 'berry'],
    dangerLevel: 'low',
  },
  {
    id: 'deep_forest',
    name: '迷雾森林深处',
    type: 'dangerous',
    description: '森林深处，迷雾更浓，野兽更强大。但稀有资源也更多。',
    unlockDay: 8,
    effects: { sanityDrainMultiplier: 1.5, monsterSpawnRate: 0.5, resourceGatherMultiplier: 2.0, specialEventChance: 0.3 },
    lootTable: ['rare_herb', 'beast_core', 'rare_metal', 'mushroom', 'special_wood'],
    dangerLevel: 'high',
  },
  {
    id: 'water_source',
    name: '水源地',
    type: 'resource',
    description: '一条地下河的出口，干净的水源。但也是野兽常来的地方。',
    unlockDay: 2,
    effects: { sanityDrainMultiplier: 0.9, monsterSpawnRate: 0.3, resourceGatherMultiplier: 1.5, specialEventChance: 0.1 },
    lootTable: ['water', 'fish', 'clay', 'aquatic_plant'],
    dangerLevel: 'moderate',
  },
  {
    id: 'mist_altar',
    name: '迷雾祭坛',
    type: 'altar',
    description: '一座古老的石制祭坛，迷雾在这里特别浓厚。祭坛上刻着无法辨认的符文，似乎有某种力量。',
    unlockDay: 15,
    effects: { sanityDrainMultiplier: 2.0, monsterSpawnRate: 0.4, resourceGatherMultiplier: 0, specialEventChance: 0.5 },
    lootTable: ['mist_crystal', 'ancient_rune', 'sacrificial_item'],
    dangerLevel: 'extreme',
  },
  {
    id: 'anomaly_zone',
    name: '异常区域',
    type: 'anomaly',
    description: '迷雾在这里扭曲了空间和时间，你会看到不可能的景象。理智在这里流失得特别快。',
    unlockDay: 20,
    effects: { sanityDrainMultiplier: 3.0, monsterSpawnRate: 0.2, resourceGatherMultiplier: 0.5, specialEventChance: 0.6 },
    lootTable: ['mist_crystal', 'time_fragment', 'space_shard', 'memory_crystal'],
    dangerLevel: 'extreme',
  },
  {
    id: 'research_lab',
    name: '废弃研究所',
    type: 'ruins',
    description: '一座被迷雾吞噬的研究所，里面可能有关于迷雾真相的线索。但防御系统还在运转。',
    unlockDay: 30,
    effects: { sanityDrainMultiplier: 1.5, monsterSpawnRate: 0.3, resourceGatherMultiplier: 1.0, specialEventChance: 0.4 },
    lootTable: ['research_notes', 'high_tech_parts', 'medicine', 'mist_sample', 'truth_clue'],
    dangerLevel: 'high',
  },
  {
    id: 'military_base',
    name: '军方基地',
    type: 'ruins',
    description: '废弃的军方基地，可能有大量武器弹药。但也可能有更危险的东西。',
    unlockDay: 25,
    effects: { sanityDrainMultiplier: 1.2, monsterSpawnRate: 0.4, resourceGatherMultiplier: 1.5, specialEventChance: 0.3 },
    lootTable: ['firearm', 'ammo', 'body_armor', 'military_ration', 'radio'],
    dangerLevel: 'high',
  },
  {
    id: 'mist_core',
    name: '迷雾核心',
    type: 'anomaly',
    description: '迷雾的最深处，一切的源头。只有最强大的幸存者才能到达这里。',
    unlockDay: 120,
    effects: { sanityDrainMultiplier: 5.0, monsterSpawnRate: 0.8, resourceGatherMultiplier: 0, specialEventChance: 0.8 },
    lootTable: ['mist_core', 'god_fragment', 'truth_complete'],
    dangerLevel: 'extreme',
  },
];

/** 根据天数获取已解锁的区域 */
export function getUnlockedZones(day: number): MistZone[] {
  return MIST_ZONES.filter(z => z.unlockDay <= day);
}

// ============================================================
// 四、NPC系统配置（性格、行为、关系、动态变化）
// ============================================================
export interface NpcFullProfile {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'unknown';
  appearance: string;
  background: string; // 背景故事
  personality: PersonalityTraits;
  // 初始属性
  baseAttributes: { strength: number; agility: number; intelligence: number; luck: number };
  skills: string[]; // 技能列表
  // 行为模式（随环境动态变化）
  behaviorPatterns: BehaviorPattern[];
  // 关系类型
  relationshipTypes: string[]; // 可建立的关系类型
  // 个人剧情线
  personalQuest: {
    id: string;
    name: string;
    description: string;
    stages: NpcQuestStage[];
  };
  // 解锁条件
  unlockCondition: {
    minDay: number;
    minPhase: number;
    specialRequirement?: string;
  };
  // 死亡可能性（不是无敌的）
  mortality: {
    canDie: boolean;
    deathConditions: string[]; // 可能的死亡条件
  };
}

export interface PersonalityTraits {
  bravery: number; // 勇敢-懦弱 (0-100)
  selfishness: number; // 自私-无私 (0-100)
  calmness: number; // 冷静-冲动 (0-100)
  trust: number; // 信任-多疑 (0-100)
  ambition: number; // 野心-安逸 (0-100)
  kindness: number; // 善良-残忍 (0-100)
}

export interface BehaviorPattern {
  condition: string; // 触发条件（环境/状态/关系）
  action: string; // 行为描述
  priority: number; // 优先级
}

export interface NpcQuestStage {
  stage: number;
  name: string;
  description: string;
  triggerCondition: string;
  choices: NpcQuestChoice[];
}

export interface NpcQuestChoice {
  text: string;
  requirement?: string;
  outcome: {
    relationshipChange: number; // 好感度变化
    consequence: string; // 后果描述
    unlocks?: string[]; // 解锁内容
  };
}

export const NPC_DEFS: NpcFullProfile[] = [
  {
    id: 'old_k',
    name: '老K',
    age: 45,
    gender: 'male',
    appearance: '身材魁梧，满脸胡茬，左臂有一道旧伤疤。眼神警惕而疲惫，总是下意识地摸腰间的刀。',
    background: '曾经是建筑工地的工头，迷雾来临时失去了妻子和女儿。他独自一人在迷雾中活了下来，对任何人都保持距离。他的左臂伤疤是保护女儿时留下的，但女儿最终还是没能活下来。',
    personality: { bravery: 75, selfishness: 40, calmness: 70, trust: 20, ambition: 30, kindness: 55 },
    baseAttributes: { strength: 14, agility: 10, intelligence: 9, luck: 8 },
    skills: ['近战格斗', '建筑维修', '野外生存', '领导才能'],
    behaviorPatterns: [
      { condition: '玩家好感度<30', action: '保持距离，只进行必要的交易，不透露个人信息', priority: 10 },
      { condition: '玩家好感度30-60', action: '开始合作，分享生存经验，但仍有所保留', priority: 8 },
      { condition: '玩家好感度>60', action: '信任玩家，愿意并肩作战，分享过去的故事', priority: 5 },
      { condition: '资源短缺时', action: '优先保障自己的生存，可能发生冲突', priority: 9 },
      { condition: '玩家受伤时', action: '如果好感度高，会主动照顾；如果低，会冷眼旁观', priority: 7 },
    ],
    relationshipTypes: ['陌生人', '交易伙伴', '战友', '兄弟', '敌对'],
    personalQuest: {
      id: 'old_k_quest',
      name: '伤疤的记忆',
      description: '老K的过去和他失去的家人。帮助他走出阴影，或者利用他的痛苦。',
      stages: [
        {
          stage: 1,
          name: '沉默的男人',
          description: '老K总是一个人坐在角落里，看着左臂的伤疤发呆。',
          triggerCondition: '好感度>20',
          choices: [
            { text: '询问伤疤的来历', requirement: '勇气>10', outcome: { relationshipChange: 10, consequence: '老K犹豫了一下，简单说了是保护家人时受的伤，但没有多说。' } },
            { text: '给他一些食物，不说话', outcome: { relationshipChange: 15, consequence: '老K看了你一眼，默默接过食物。你们之间的距离近了一些。' } },
            { text: '忽视他', outcome: { relationshipChange: -5, consequence: '老K对你的警惕更深了。' } },
          ],
        },
        {
          stage: 2,
          name: '女儿的照片',
          description: '你发现老K有一张褪色的照片，上面是一个小女孩。',
          triggerCondition: '好感度>40',
          choices: [
            { text: '假装没看到', outcome: { relationshipChange: 5, consequence: '老K注意到你看到了，但你没有追问，他对你多了一份尊重。' } },
            { text: '询问照片上的人', requirement: '好感度>50', outcome: { relationshipChange: 20, consequence: '老K沉默了很久，然后告诉你那是他的女儿，叫小雨，迷雾来临时才7岁。他说不下去了。', unlocks: ['老K的过去'] } },
            { text: '偷偷拿走照片', outcome: { relationshipChange: -50, consequence: '老K发现后暴怒，差点和你拼命。你们的关系彻底破裂。' } },
          ],
        },
        {
          stage: 3,
          name: '复仇还是放下',
          description: '老K发现了害死他家人的迷雾生物的踪迹。他要去复仇。',
          triggerCondition: '好感度>60',
          choices: [
            { text: '和他一起去', requirement: '力量>15', outcome: { relationshipChange: 30, consequence: '你们一起击杀了那只迷雾生物。老K在女儿的照片前哭了很久。他说，从今天起，你就是他的兄弟。', unlocks: ['老K的忠诚', '特殊技能：老兵的经验'] } },
            { text: '劝他放下', requirement: '智力>15', outcome: { relationshipChange: 10, consequence: '你告诉他，小雨一定不希望他为了复仇送命。老K沉默了很久，最终点了点头。但你能看到他眼中的不甘。' } },
            { text: '让他一个人去', outcome: { relationshipChange: -20, consequence: '老K一个人去了，三天后回来，身受重伤，但活着。他对你的信任减少了很多。', unlocks: ['老K受伤'] } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 5, minPhase: 1 },
    mortality: { canDie: true, deathConditions: ['独自复仇失败', '大事件中保护玩家', '资源短缺时被牺牲', '背叛玩家后被击杀'] },
  },
  {
    id: 'duoduo',
    name: '朵朵',
    age: 9,
    gender: 'female',
    appearance: '瘦小的女孩，穿着过大的成人外套，眼睛很大但总是充满恐惧。手里紧紧攥着一只破旧的毛绒兔子。',
    background: '迷雾来临时和父母失散，独自一人在废墟中活了三天。她不知道父母是死是活，但每天都在迷雾中呼喊他们的名字。她比同龄的孩子成熟得多，也恐惧得多。',
    personality: { bravery: 30, selfishness: 20, calmness: 40, trust: 50, ambition: 10, kindness: 80 },
    baseAttributes: { strength: 4, agility: 8, intelligence: 10, luck: 12 },
    skills: ['隐蔽', '倾听', '安慰他人', '寻找小物件'],
    behaviorPatterns: [
      { condition: '玩家好感度<30', action: '躲在角落里，不说话，用警惕的眼神看着你', priority: 10 },
      { condition: '玩家好感度30-60', action: '开始接近你，会帮你做一些小事，但仍然害怕', priority: 8 },
      { condition: '玩家好感度>60', action: '依赖你，会叫你哥哥/姐姐，愿意为你做任何事', priority: 5 },
      { condition: '听到迷雾中的声音时', action: '吓得发抖，躲到你身后', priority: 9 },
      { condition: '有其他幸存者时', action: '躲在你身后，不信任陌生人', priority: 7 },
      { condition: '玩家受伤时', action: '哭着用笨拙的手法帮你包扎', priority: 6 },
    ],
    relationshipTypes: ['陌生人', '被保护者', '家人', '敌对'],
    personalQuest: {
      id: 'duoduo_quest',
      name: '寻找父母',
      description: '朵朵一直在寻找她的父母。他们是死是活？帮助她找到答案。',
      stages: [
        {
          stage: 1,
          name: '走失的女孩',
          description: '你在废墟中发现了朵朵，她正被一只迷雾野兽追赶。',
          triggerCondition: '第8天左右，在废墟区域',
          choices: [
            { text: '救她', requirement: '力量>8', outcome: { relationshipChange: 30, consequence: '你击退了野兽，朵朵吓得瘫在地上。她看着你，眼泪汪汪地说："谢谢哥哥/姐姐。"', unlocks: ['朵朵加入'] } },
            { text: '扔给她一些食物，然后离开', outcome: { relationshipChange: 5, consequence: '你扔给她一些食物，转身离开。身后传来她小声的"谢谢"。但你没有回头。' } },
            { text: '忽视她，自己逃跑', outcome: { relationshipChange: -100, consequence: '你独自逃跑了。身后传来朵朵的尖叫和野兽的咆哮。你活了下来，但你永远忘不了那个声音。' } },
          ],
        },
        {
          stage: 2,
          name: '父母的线索',
          description: '朵朵说她的父母穿着蓝色的工作服，可能在附近的工厂。',
          triggerCondition: '好感度>40',
          choices: [
            { text: '带她去工厂寻找', requirement: '第12天后', outcome: { relationshipChange: 20, consequence: '你们在工厂找到了两具尸体，穿着蓝色工作服。朵朵认出了他们，哭得撕心裂肺。你陪着她，把他们埋葬了。', unlocks: ['朵朵的成长', '朵朵的决心'] } },
            { text: '告诉她父母可能已经死了', requirement: '勇气>15', outcome: { relationshipChange: -10, consequence: '你直接告诉了她真相。朵朵愣了很久，然后默默流泪。她没有怪你，但她变得更沉默了。' } },
            { text: '骗她说父母还活着，以后会找到的', outcome: { relationshipChange: 10, consequence: '你给了她虚假的希望。朵朵开心了很多，但你知道，总有一天真相会伤害她更深。' } },
          ],
        },
        {
          stage: 3,
          name: '朵朵的选择',
          description: '经历了这么多，朵朵不再是那个只会哭的小女孩了。她问你，她能做什么。',
          triggerCondition: '好感度>70，第20天后',
          choices: [
            { text: '教她战斗', requirement: '力量>15', outcome: { relationshipChange: 15, consequence: '你开始教朵朵战斗技巧。她学得很认真，虽然瘦小，但很灵活。她说，她要保护自己，也要保护你。', unlocks: ['朵朵：战士路线', '技能：灵巧闪避'] } },
            { text: '教她医疗和生存', requirement: '智力>15', outcome: { relationshipChange: 15, consequence: '你教朵朵识别草药、包扎伤口。她很聪明，学得很快。她说，她不想再看到身边的人死去了。', unlocks: ['朵朵：医疗路线', '技能：紧急治疗'] } },
            { text: '让她做她想做的事', outcome: { relationshipChange: 20, consequence: '你告诉朵朵，她可以自己选择。她想了很久，说她想帮你管理物资，因为这样她就不会觉得自己是累赘。', unlocks: ['朵朵：后勤路线', '技能：物资管理'] } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 8, minPhase: 2 },
    mortality: { canDie: true, deathConditions: ['不救她', '大事件中保护玩家', '被玩家牺牲', '独自外出遇险'] },
  },
  {
    id: 'doctor',
    name: '陈静（医生）',
    age: 38,
    gender: 'male',
    appearance: '瘦削，戴着一副断了一条腿用胶带粘好的眼镜。白大褂上沾满了血迹和污渍，但他总是保持整洁。手指修长而稳定。',
    background: '曾经是急诊科的主治医生，迷雾来临时正在医院值班。他亲眼看着医院里的病人一个个死去，有的是因为伤，有的是因为迷雾中的东西。他带着一箱子医疗用品逃了出来，但内心充满了无力感。',
    personality: { bravery: 50, selfishness: 30, calmness: 90, trust: 40, ambition: 20, kindness: 75 },
    baseAttributes: { strength: 7, agility: 9, intelligence: 16, luck: 10 },
    skills: ['医疗', '药学', '解剖学', '心理学', '冷静分析'],
    behaviorPatterns: [
      { condition: '有人受伤时', action: '立刻上前救治，不计较对方是谁', priority: 10 },
      { condition: '医疗物资短缺时', action: '焦虑，会主动寻找药品，甚至冒险', priority: 9 },
      { condition: '玩家好感度<30', action: '礼貌但疏远，只进行医疗相关的交流', priority: 8 },
      { condition: '玩家好感度>50', action: '愿意分享医学知识，讨论迷雾对人体的影响', priority: 6 },
      { condition: '看到死亡时', action: '沉默，会独自待很久，可能触发心理危机', priority: 7 },
    ],
    relationshipTypes: ['陌生人', '医患', '朋友', '导师', '敌对'],
    personalQuest: {
      id: 'doctor_quest',
      name: '医者的困境',
      description: '陈默医生在迷雾中发现了一些不寻常的生理现象。迷雾在改变人类。这是诅咒，还是进化？',
      stages: [
        {
          stage: 1,
          name: '不寻常的伤口',
          description: '你受伤后，陈默医生在处理伤口时发现你的血液有些异常。',
          triggerCondition: '受伤后，好感度>30',
          choices: [
            { text: '让他仔细研究', requirement: '智力>10', outcome: { relationshipChange: 15, consequence: '陈默医生仔细检查了你的血液，眉头紧锁。他说，你的血细胞在迷雾的影响下发生了某种变化，但他不确定这是好是坏。', unlocks: ['迷雾变异研究'] } },
            { text: '让他赶紧包扎，别废话', outcome: { relationshipChange: -10, consequence: '陈默医生没有多说，默默帮你包扎好。但你注意到他偷偷留了一点你的血样。' } },
          ],
        },
        {
          stage: 2,
          name: '觉醒者',
          description: '陈默医生告诉你，迷雾在改变一部分人类。那些被改变的人，获得了超越常人的能力，但也付出了代价。',
          triggerCondition: '好感度>50，第25天后',
          choices: [
            { text: '愿意成为试验对象', requirement: '勇气>15', outcome: { relationshipChange: 25, consequence: '你同意让陈默医生研究你的身体。经过一系列检查，他发现你确实在觉醒。他帮你引导觉醒的力量，你获得了特殊能力。', unlocks: ['觉醒能力', '陈默的研究笔记'] } },
            { text: '拒绝，不想变成怪物', outcome: { relationshipChange: 5, consequence: '你拒绝了。陈默医生理解地点点头，说每个人都有选择的权利。但你能感觉到，身体里的某种东西正在觉醒。' } },
            { text: '让他研究其他幸存者', requirement: '领导力>10', outcome: { relationshipChange: 10, consequence: '你安排了一些志愿者让陈默医生研究。他的研究进展很快，发现了觉醒的规律。他说，也许有一天，人类可以主动控制觉醒。', unlocks: ['觉醒研究资料'] } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 12, minPhase: 2 },
    mortality: { canDie: true, deathConditions: ['医疗事故被报复', '研究迷雾变异失控', '大事件中救治太多人耗尽精力', '被患者家属杀害'] },
  },
  // 商人老张
  {
    id: 'merchant_zhang',
    name: '老张（商人）',
    age: 52,
    gender: 'male',
    appearance: '中等身材，微胖，脸上总是挂着精明的笑容。穿着一件洗得发白的夹克，口袋里塞满了各种小物件。右手缺了一根小指，说是年轻时做生意被人砍的。',
    background: '迷雾来临时是个小商贩，靠着精明的头脑和一张能说会道的嘴，在迷雾中建立了自己的商路。他从迷雾深处带来各种稀奇古怪的商品，没人知道他的货源从哪来。他常说："在这鬼地方，信息和物资就是命。"',
    personality: { bravery: 45, selfishness: 70, calmness: 80, trust: 30, ambition: 60, kindness: 40 },
    baseAttributes: { strength: 8, agility: 9, intelligence: 14, luck: 12 },
    skills: ['交易谈判', '情报收集', '商品鉴定', '路线规划', '察言观色'],
    behaviorPatterns: [
      { condition: '玩家好感度<30', action: '只进行常规交易，价格偏高，不透露情报', priority: 10 },
      { condition: '玩家好感度30-60', action: '开始给予折扣，分享一些基础情报，但核心货源保密', priority: 8 },
      { condition: '玩家好感度>60', action: '愿意分享稀有商品和重要情报，甚至会主动告知危险', priority: 5 },
      { condition: '玩家有稀有物品时', action: '眼睛发亮，主动提出交易，价格可以商量', priority: 7 },
      { condition: '资源短缺时', action: '囤积居奇，价格上涨，但不会完全拒绝交易', priority: 9 },
      { condition: '遇到危险时', action: '第一时间逃跑，但会留下一部分物资作为"见面礼"', priority: 10 },
    ],
    relationshipTypes: ['陌生人', '顾客', '合作伙伴', '朋友', '敌对'],
    personalQuest: {
      id: 'zhang_quest',
      name: '商人的秘密',
      description: '老张的货源从哪来？他在迷雾深处看到了什么？帮助他解开过去的心结，或者利用他的秘密。',
      stages: [
        {
          stage: 1,
          name: '神秘的商品',
          description: '老张拿出了一件你从未见过的商品——一块散发着微光的石头。他说是从迷雾深处带来的。',
          triggerCondition: '好感度>30，第12天后',
          choices: [
            { text: '询问石头的来源', requirement: '智力>12', outcome: { relationshipChange: 10, consequence: '老张犹豫了一下，说这是从一个废弃实验室里找到的。但他不肯说具体位置。', unlocks: ['废弃实验室线索'] } },
            { text: '买下石头', requirement: '积分>50', outcome: { relationshipChange: 15, consequence: '你花大价钱买下了石头。老张很高兴，说你是个识货的人。以后他会优先给你看好东西。', unlocks: ['迷雾晶石'] } },
            { text: '不感兴趣', outcome: { relationshipChange: -5, consequence: '老张耸耸肩，把石头收了起来。但你注意到他看你的眼神变了——少了几分热情。' } },
          ],
        },
        {
          stage: 2,
          name: '老张的过去',
          description: '一次喝醉后，老张告诉你他曾经有个合伙人，叫老王。他们一起在迷雾中做生意，但有一次深入迷雾后，老王就没回来。',
          triggerCondition: '好感度>50，第20天后',
          choices: [
            { text: '安慰他，说那不是他的错', outcome: { relationshipChange: 20, consequence: '老张沉默了很久，然后说："你是个好人。在这鬼地方，好人不多了。"他告诉你，老王可能还活着，在迷雾深处的某个地方。', unlocks: ['老王的线索'] } },
            { text: '问他是不是抛弃了老王', requirement: '勇气>15', outcome: { relationshipChange: -10, consequence: '老张的脸色变了。他沉默了很久，然后说："你以为我想吗？当时那种情况……"他没有再说下去，但你能看到他眼中的痛苦。' } },
            { text: '转移话题，不提这件事', outcome: { relationshipChange: 5, consequence: '老张感激地看了你一眼。他知道你在给他留面子。你们的关系更近了一步。' } },
          ],
        },
        {
          stage: 3,
          name: '寻找老王',
          description: '根据老张提供的线索，你在迷雾深处找到了一个废弃的营地。营地里有一个人——是老王！他还活着，但已经变得不太像人了。',
          triggerCondition: '好感度>70，第30天后',
          choices: [
            { text: '带老王回去见老张', requirement: '力量>15', outcome: { relationshipChange: 30, consequence: '你把老王带了回去。老张看到老王时，眼泪一下子就出来了。两个老人抱头痛哭。老张说，从今天起，你就是他的亲兄弟。他把自己所有的货源和情报都分享给了你。', unlocks: ['老张的全部货源', '特殊技能：商业头脑'] } },
            { text: '告诉老张老王的位置，让他自己去', outcome: { relationshipChange: 10, consequence: '你告诉了老张老王的位置。老张立刻出发了。三天后他回来了，带着老王。他很感激你，但你能感觉到，他更感激的是你没有替他做这件事。' } },
            { text: '不告诉老张，独自研究老王的变异', requirement: '智力>20', outcome: { relationshipChange: -30, consequence: '你没有告诉老张，而是独自研究了老王的变异。你获得了重要的研究资料，但老张发现后非常愤怒。他说你和那些实验室里的疯子没什么区别。你们的关系彻底破裂了。', unlocks: ['变异研究资料'] } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 10, minPhase: 2 },
    mortality: { canDie: true, deathConditions: ['深入迷雾遇险', '交易纠纷被杀害', '大事件中逃跑失败', '被进化者组织抓捕'] },
  },
  // 猎人老周
  {
    id: 'hunter_zhou',
    name: '老周（猎人）',
    age: 48,
    gender: 'male',
    appearance: '精瘦结实，皮肤黝黑，眼神锐利如鹰。穿着自制的皮甲，背着一张复合弓和一把猎刀。走路几乎没有声音，像一只潜伏的野兽。',
    background: '迷雾来临时是个护林员，在大山里生活了二十年。他对森林和野兽的了解远超常人。迷雾来临时，他正在山里巡逻，靠着丰富的野外生存经验活了下来。他说迷雾里的野兽变了，但狩猎的本质没变。',
    personality: { bravery: 85, selfishness: 35, calmness: 75, trust: 40, ambition: 20, kindness: 50 },
    baseAttributes: { strength: 13, agility: 16, intelligence: 10, luck: 9 },
    skills: ['弓箭射击', '追踪', '陷阱制作', '野外生存', '解剖学', '隐蔽'],
    behaviorPatterns: [
      { condition: '玩家好感度<30', action: '保持距离，只在需要交易时接触，不分享狩猎地点', priority: 10 },
      { condition: '玩家好感度30-60', action: '愿意一起狩猎，分享一些基础狩猎技巧，但最佳猎场保密', priority: 8 },
      { condition: '玩家好感度>60', action: '信任玩家，分享所有猎场和技巧，愿意教授弓箭', priority: 5 },
      { condition: '在森林中时', action: '变得更加自信和活跃，主动承担侦察和狩猎任务', priority: 7 },
      { condition: '遇到强大的野兽时', action: '兴奋，眼睛发亮，主动挑战，但会评估风险', priority: 6 },
      { condition: '有人受伤时', action: '用猎人的方式简单处理伤口，然后建议找医生', priority: 8 },
    ],
    relationshipTypes: ['陌生人', '猎友', '战友', '师徒', '敌对'],
    personalQuest: {
      id: 'zhou_quest',
      name: '猎人的荣耀',
      description: '老周一生都在狩猎。迷雾中的野兽变了，他的狩猎方式也需要改变。帮助他猎取传说中的兽王，或者让他明白狩猎的意义不止于杀戮。',
      stages: [
        {
          stage: 1,
          name: '兽王的传说',
          description: '老周告诉你，迷雾深处有一只兽王——一只巨大的、从未有人见过的野兽。他一生都在寻找它，但从来没有找到过。',
          triggerCondition: '好感度>30，第18天后',
          choices: [
            { text: '表示愿意和他一起去猎兽王', requirement: '力量>12', outcome: { relationshipChange: 15, consequence: '老周看了你一眼，点了点头。他说："狩猎不是一个人的事。有个伴，也好。"他开始和你分享他收集的关于兽王的线索。', unlocks: ['兽王的线索'] } },
            { text: '问他为什么一定要猎兽王', outcome: { relationshipChange: 10, consequence: '老周沉默了很久，然后说："猎人这一生，总要有个目标。兽王，就是我的目标。没有目标，猎人就死了。"你能理解他的执着。' } },
            { text: '劝他放弃，太危险了', outcome: { relationshipChange: -10, consequence: '老周摇摇头，说："你不懂。对猎人来说，危险才是活着的证明。"他没有再说什么，但你能感觉到他对你的失望。' } },
          ],
        },
        {
          stage: 2,
          name: '兽王的踪迹',
          description: '你们在迷雾深处找到了兽王的踪迹——巨大的脚印、被折断的大树、还有一股浓烈的腥臭味。老周兴奋得浑身发抖。',
          triggerCondition: '好感度>50，第25天后',
          choices: [
            { text: '继续追踪，找到兽王', requirement: '敏捷>15', outcome: { relationshipChange: 20, consequence: '你们追踪了三天，终于找到了兽王的巢穴。那是一只巨大的、像熊又像狼的生物，眼睛散发着红光。老周说："这就是兽王。我们，终于找到它了。"', unlocks: ['兽王的巢穴'] } },
            { text: '建议先回去准备，再来猎兽王', requirement: '智力>15', outcome: { relationshipChange: 10, consequence: '老周犹豫了一下，然后点了点头。他说："你说得对。狩猎不能急。我们先回去准备，再来。"他把兽王的位置标记在了地图上。' } },
            { text: '害怕了，建议放弃', outcome: { relationshipChange: -20, consequence: '老周看着你，眼神中充满了失望。他说："我以为你是个真正的猎人。原来你只是个胆小鬼。"他独自追踪而去，三天后才回来，身受重伤。他对你的信任减少了很多。' } },
          ],
        },
        {
          stage: 3,
          name: '猎杀兽王',
          description: '经过充分准备，你们再次来到兽王的巢穴。这是一场生死之战。兽王的力量远超你们的想象。',
          triggerCondition: '好感度>70，第35天后',
          choices: [
            { text: '和老周一起正面迎战兽王', requirement: '力量>18，敏捷>15', outcome: { relationshipChange: 30, consequence: '你们和兽王激战了两个小时。最终，老周一箭射中了兽王的眼睛，你趁机刺穿了它的心脏。兽王倒下了。老周跪在兽王面前，沉默了很久。然后他说："谢谢你。没有你，我做不到。"他把兽王的晶核送给了你。', unlocks: ['兽王晶核', '特殊技能：猎人之眼', '老周的忠诚'] } },
            { text: '设陷阱，让兽王自己走进来', requirement: '智力>18', outcome: { relationshipChange: 20, consequence: '你们花了一天时间设下了一个巨大的陷阱。兽王果然走了进去。你们在陷阱上方射杀了它。老周看着兽王的尸体，说："聪明的狩猎。我以前太执着于正面战斗了。"他开始向你学习战术思维。', unlocks: ['兽王晶核', '特殊技能：陷阱大师'] } },
            { text: '在关键时刻逃跑，让老周独自面对', outcome: { relationshipChange: -50, consequence: '在兽王最凶猛的时候，你害怕了，逃跑了。老周独自和兽王战斗，虽然最终杀死了兽王，但他身受重伤，差点死去。他醒来后，看着你，一句话也没说。但你知道，你们的关系，已经完了。', unlocks: ['老周的疏远'] } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 15, minPhase: 3 },
    mortality: { canDie: true, deathConditions: ['狩猎兽王失败', '大事件中掩护玩家', '深入迷雾遇险', '被进化者组织抓捕做实验'] },
  },
  // 机械师小杨
  {
    id: 'mechanic_yang',
    name: '小杨（机械师）',
    age: 26,
    gender: 'male',
    appearance: '年轻，戴一副黑框眼镜，手上永远沾满油污。穿着一件满是口袋的工装，口袋里塞满了各种工具和零件。说话很快，思维跳跃，经常说着说着就开始摆弄手里的东西。',
    background: '迷雾来临时是个汽车修理工，从小就喜欢拆东西。他的父亲是个工程师，教会了他各种机械知识。迷雾来临时，他正在修理一辆卡车，靠着这辆卡车活了下来。他说这世界上没有他修不好的东西，除了人心。',
    personality: { bravery: 55, selfishness: 25, calmness: 60, trust: 60, ambition: 40, kindness: 65 },
    baseAttributes: { strength: 9, agility: 12, intelligence: 17, luck: 10 },
    skills: ['机械修理', '车辆改装', '武器制造', '电子设备', '发明创造', '拆解分析'],
    behaviorPatterns: [
      { condition: '玩家好感度<30', action: '只进行基础修理，收费较高，不分享发明', priority: 10 },
      { condition: '玩家好感度30-60', action: '开始分享一些小发明，修理费打折，但核心技术保密', priority: 8 },
      { condition: '玩家好感度>60', action: '愿意分享所有技术，主动为玩家改装武器和载具，甚至一起搞发明', priority: 5 },
      { condition: '看到坏掉的机械时', action: '眼睛发亮，主动要求修理，甚至不收钱', priority: 7 },
      { condition: '有新零件时', action: '兴奋，立刻开始研究能做什么新东西', priority: 6 },
      { condition: '有人嘲笑他的发明时', action: '生气，会用实际行动证明自己', priority: 8 },
    ],
    relationshipTypes: ['陌生人', '客户', '工友', '朋友', '师徒', '敌对'],
    personalQuest: {
      id: 'yang_quest',
      name: '发明家的梦想',
      description: '小杨一直梦想着发明出能改变世界的东西。迷雾给了他机会，也给了他挑战。帮助他实现梦想，或者让他明白有些东西不该被发明出来。',
      stages: [
        {
          stage: 1,
          name: '改装车',
          description: '小杨告诉你他有一个想法——把一辆普通的卡车改装成一辆战车。加装装甲、武器、甚至迷雾过滤系统。但他需要很多零件。',
          triggerCondition: '好感度>30，第22天后',
          choices: [
            { text: '表示支持，帮他收集零件', requirement: '智力>12', outcome: { relationshipChange: 15, consequence: '小杨兴奋得跳了起来。他说："你是第一个支持我这个想法的人！"他立刻开始画设计图，并且和你分享了他的所有改装思路。', unlocks: ['战车设计图'] } },
            { text: '问他这要花多少资源', outcome: { relationshipChange: 5, consequence: '小杨算了一下，说了一个让你咋舌的数字。但他说："值得。有了这辆战车，我们在迷雾里就安全多了。"你决定再考虑考虑。' } },
            { text: '觉得不切实际，劝他放弃', outcome: { relationshipChange: -15, consequence: '小杨的脸色暗了下来。他说："你和其他人一样，觉得我是在做梦。"他不再和你提这件事，但你能看到他偷偷在画设计图。' } },
          ],
        },
        {
          stage: 2,
          name: '战车完成',
          description: '经过艰苦的收集和改装，战车终于完成了。小杨给它取名叫"迷雾征服者"。它有装甲、有武器、有迷雾过滤系统，甚至还有一个小型实验室。',
          triggerCondition: '好感度>50，第30天后',
          choices: [
            { text: '试驾战车，测试性能', requirement: '敏捷>12', outcome: { relationshipChange: 20, consequence: '你试驾了战车。它的性能远超你的想象——装甲能抵挡野兽的攻击，武器能轻松射杀普通野兽，迷雾过滤系统让你在迷雾里也能呼吸新鲜空气。小杨得意地说："怎么样？我说过能行的！"', unlocks: ['迷雾征服者战车'] } },
            { text: '建议先在安全区域测试，不要冒险', requirement: '智力>15', outcome: { relationshipChange: 10, consequence: '小杨想了想，点了点头。他说："你说得对。安全第一。"你们在基地附近测试了战车，发现了一些问题并进行了改进。战车变得更加完善了。' } },
            { text: '对战车不感兴趣，让小杨自己折腾', outcome: { relationshipChange: -10, consequence: '小杨有些失望，但还是自己去测试了战车。结果战车出了故障，小杨差点受伤。他对你的冷漠有些不满。' } },
          ],
        },
        {
          stage: 3,
          name: '终极发明',
          description: '小杨告诉你他有一个终极发明的想法——一个能驱散迷雾的装置。他说根据他的研究，迷雾是有频率的，只要找到这个频率并用相反的频率干扰，就能驱散迷雾。但这需要大量的资源和时间。',
          triggerCondition: '好感度>70，第50天后',
          choices: [
            { text: '全力支持，调集所有资源', requirement: '智力>20，领导力>15', outcome: { relationshipChange: 30, consequence: '你调集了所有资源支持小杨。经过三个月的艰苦研究，驱散装置终于完成了。当它启动时，周围的迷雾真的开始消散了！小杨激动得哭了。他说："我们做到了！我们真的做到了！"你成为了拯救人类的英雄。', unlocks: ['迷雾驱散装置', '特殊技能：科技之光', '小杨的忠诚'] } },
            { text: '支持，但资源有限，慢慢来', outcome: { relationshipChange: 15, consequence: '你给了小杨一部分资源，但不是全部。研究进展缓慢，但小杨没有放弃。他说："没关系，慢慢来。总有一天我会成功的。"你相信他会成功的。' } },
            { text: '觉得太危险，阻止他继续研究', requirement: '智力>25', outcome: { relationshipChange: -20, consequence: '你仔细研究了小杨的设计，发现驱散装置可能会有严重的副作用——它可能会导致迷雾反噬，让迷雾变得更浓更危险。你阻止了小杨。小杨很失望，但他承认你的分析有道理。他开始研究更安全的方案。', unlocks: ['安全方案研究'] } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 22, minPhase: 4 },
    mortality: { canDie: true, deathConditions: ['发明实验失败爆炸', '大事件中修理载具被攻击', '被进化者组织抓捕做研究', '战车故障遇险'] },
  },
  // 林小雨（希望号巡逻队）
  {
    id: 'lin_xiaoyu',
    name: '林小雨（巡逻队）',
    age: 24,
    gender: 'female',
    appearance: '英姿飒爽，短发，眼神坚定。穿着希望号安全区的巡逻队制服，腰间别着一把手枪和一把军刀。走路带风，说话干脆利落，从不拖泥带水。',
    background: '迷雾来临时是个警校学生，刚毕业还没来得及入职。她的父亲是个警察，在迷雾来临时为了保护平民牺牲了。她继承了父亲的遗志，加入了希望号安全区的巡逻队，成为了最年轻的小队长。她相信秩序和正义，相信人类终将走出迷雾。',
    personality: { bravery: 90, selfishness: 15, calmness: 75, trust: 65, ambition: 50, kindness: 70 },
    baseAttributes: { strength: 11, agility: 15, intelligence: 13, luck: 10 },
    skills: ['射击', '格斗', '侦察', '团队指挥', '急救', '谈判'],
    behaviorPatterns: [
      { condition: '玩家好感度<30', action: '保持职业距离，只进行官方交流，不透露安全区内部信息', priority: 10 },
      { condition: '玩家好感度30-60', action: '开始分享一些安全区的情况，愿意进行非正式合作，但核心机密保密', priority: 8 },
      { condition: '玩家好感度>60', action: '信任玩家，分享安全区的重要情报，甚至愿意违反规定帮助玩家', priority: 5 },
      { condition: '遇到平民有危险时', action: '第一时间冲上去保护，不计个人安危', priority: 10 },
      { condition: '遇到违法犯罪时', action: '严格执法，绝不姑息，但会根据情况酌情处理', priority: 9 },
      { condition: '提到她父亲时', action: '沉默，眼神变得温柔，但很快恢复坚定', priority: 7 },
    ],
    relationshipTypes: ['陌生人', '同事', '战友', '朋友', '恋人', '敌对'],
    personalQuest: {
      id: 'xiaoyu_quest',
      name: '警察的女儿',
      description: '林小雨一直活在父亲的阴影下——不是因为压力，而是因为她想成为像父亲一样的人。帮助她找到自己的道路，或者让她明白正义不是非黑即白的。',
      stages: [
        {
          stage: 1,
          name: '巡逻中的相遇',
          description: '你在迷雾中遇到了正在巡逻的林小雨。她正在追捕一个小偷——一个为了给生病的母亲偷药的年轻人。',
          triggerCondition: '好感度>20，第25天后',
          choices: [
            { text: '帮助她抓住小偷', requirement: '敏捷>12', outcome: { relationshipChange: 10, consequence: '你们一起抓住了小偷。林小雨感谢了你的帮助，但当她听到小偷的故事时，她的眼神变得复杂。她最终决定放了小偷，但让他承诺以后不再偷。', unlocks: ['林小雨的正义感'] } },
            { text: '劝她放了小偷，他是为了救母亲', requirement: '魅力>12', outcome: { relationshipChange: 15, consequence: '你向林小雨解释了情况。她犹豫了很久，最终决定放了小偷。她说："法律是死的，人是活的。但我希望这是最后一次。"她开始重新思考正义的意义。', unlocks: ['林小雨的信任'] } },
            { text: '不干涉，让她自己决定', outcome: { relationshipChange: 5, consequence: '林小雨看了你一眼，然后自己做了决定——她放了小偷，但给了他一些钱让他给母亲买药。你能看到她内心的挣扎和成长。' } },
          ],
        },
        {
          stage: 2,
          name: '父亲的日记',
          description: '林小雨在整理父亲遗物时发现了一本日记。日记里记录了她父亲在迷雾初期的经历——他不仅保护了平民，还做了一些艰难的选择，包括牺牲一些人来拯救更多人。',
          triggerCondition: '好感度>50，第40天后',
          choices: [
            { text: '安慰她，说她父亲是个英雄', outcome: { relationshipChange: 20, consequence: '林小雨沉默了很久，然后说："我以前以为英雄是完美的。现在我知道，英雄也会犯错，也会做艰难的选择。但这并不妨碍他们成为英雄。"她把日记收好，眼神变得更加坚定。', unlocks: ['林小雨的成长'] } },
            { text: '和她一起讨论这些选择的对错', requirement: '智力>18', outcome: { relationshipChange: 15, consequence: '你们讨论了很久。林小雨说她以前觉得正义是非黑即白的，但现在她知道了灰色地带的存在。她说："谢谢你。和你讨论这些，让我想通了很多。"她开始把你当作可以倾诉的人。' } },
            { text: '劝她不要看了，过去的就让它过去', outcome: { relationshipChange: -5, consequence: '林小雨摇摇头，说："不行。我必须了解真相。只有了解真相，我才能成为真正的警察。"她继续看日记，但你能感觉到她对你的回避有些不满。' } },
          ],
        },
        {
          stage: 3,
          name: '林小雨的选择',
          description: '希望号安全区内部出现了分裂——一派主张严格秩序，一派主张人性关怀。林小雨被要求选择立场。她来找你商量。',
          triggerCondition: '好感度>70，第60天后',
          choices: [
            { text: '支持她选择自己认为对的道路', requirement: '魅力>20', outcome: { relationshipChange: 30, consequence: '你告诉林小雨，没有人能替她做决定，她应该选择自己认为对的道路。林小雨想了很久，最终选择了一条中间道路——在秩序中保留人性。她成为了两派都能接受的领袖。她说："谢谢你。是你让我找到了自己的道路。"', unlocks: ['林小雨的领导', '特殊技能：正义之心', '林小雨的忠诚'] } },
            { text: '建议她选择严格秩序派', outcome: { relationshipChange: 5, consequence: '你建议她选择严格秩序派。林小雨犹豫了一下，最终听从了你的建议。但你能看到她眼中的不甘——她并不完全认同那一派的理念。' } },
            { text: '建议她选择人性关怀派', outcome: { relationshipChange: 10, consequence: '你建议她选择人性关怀派。林小雨想了想，点了点头。她觉得这更符合她的理念。但你也提醒她，完全的人性关怀可能会导致秩序崩溃。她表示会注意平衡。' } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 25, minPhase: 4 },
    mortality: { canDie: true, deathConditions: ['保护平民牺牲', '大事件中掩护玩家', '内部冲突被暗杀', '被进化者组织抓捕'] },
  },
  // 李伟（军方残余）
  {
    id: 'li_wei',
    name: '李伟（军方残余）',
    age: 35,
    gender: 'male',
    appearance: '身材魁梧，军人气质，站姿笔挺。穿着破旧的迷彩服，但依然整洁。脸上有一道从额头到下巴的伤疤，说是在迷雾初期的战斗中留下的。眼神锐利，说话简短有力。',
    background: '迷雾来临时是个连长，带着一个连的士兵坚守阵地。但迷雾中的生物太强大了，他的士兵一个个倒下，最后只剩下他一个人。他带着军方的机密文件和一把军用步枪，在迷雾中独自生存。他说他还在执行任务——等待上级的命令，虽然他知道上级可能已经不存在了。',
    personality: { bravery: 95, selfishness: 20, calmness: 85, trust: 35, ambition: 30, kindness: 45 },
    baseAttributes: { strength: 15, agility: 13, intelligence: 12, luck: 8 },
    skills: ['军事训练', '射击', '格斗', '战术指挥', '爆破', '野外生存', '情报分析'],
    behaviorPatterns: [
      { condition: '玩家好感度<30', action: '保持军人的警惕，只进行必要的交流，不透露军方机密', priority: 10 },
      { condition: '玩家好感度30-60', action: '开始分享一些军事技能和基础情报，但核心机密仍然保密', priority: 8 },
      { condition: '玩家好感度>60', action: '信任玩家，分享军方机密文件，愿意接受玩家的指挥，甚至把军用步枪交给玩家', priority: 5 },
      { condition: '遇到战斗时', action: '立刻进入战斗状态，战术清晰，指挥若定', priority: 10 },
      { condition: '提到上级命令时', action: '沉默，然后说"我还在执行任务"，眼神中带着迷茫', priority: 7 },
      { condition: '看到平民有危险时', action: '第一时间保护，这是他作为军人的天职', priority: 9 },
    ],
    relationshipTypes: ['陌生人', '战友', '上下级', '朋友', '敌对'],
    personalQuest: {
      id: 'liwei_quest',
      name: '最后的士兵',
      description: '李伟一直活在过去——他的连队、他的任务、他的上级。帮助他走出过去，找到新的使命，或者让他以军人的方式结束一切。',
      stages: [
        {
          stage: 1,
          name: '军用步枪',
          description: '李伟有一把军用步枪和充足的弹药。这在迷雾中是最强大的武器。你想和他做交易——用物资换步枪，或者让他加入你。',
          triggerCondition: '好感度>20，第28天后',
          choices: [
            { text: '用大量物资交换步枪', requirement: '积分>200', outcome: { relationshipChange: 10, consequence: '李伟犹豫了很久，最终同意了交易。他说："这把枪跟了我很久。希望你能用它保护更多的人。"你获得了军用步枪和50发子弹。但你能感觉到李伟的不舍。', unlocks: ['军用步枪'] } },
            { text: '邀请他加入你的团队', requirement: '魅力>15', outcome: { relationshipChange: 20, consequence: '李伟沉默了很久，然后说："我还在执行任务。"你告诉他，保护幸存者就是他的新任务。李伟想了想，最终点了点头。他说："好。我加入你们。但我有一个条件——我要以军人的方式战斗。"', unlocks: ['李伟加入'] } },
            { text: '试图偷他的步枪', outcome: { relationshipChange: -50, consequence: '你试图偷李伟的步枪，但被他发现了。他用枪指着你，眼神冰冷。他说："我最恨叛徒。"他没有开枪，但把你赶走了。你们的关系彻底破裂了。', unlocks: ['李伟的敌意'] } },
          ],
        },
        {
          stage: 2,
          name: '连队的回忆',
          description: '一次喝醉后，李伟告诉你他的连队的故事。迷雾初期，他带着一个连的士兵坚守阵地，对抗迷雾中的生物。他们打了三天三夜，最后只剩下他一个人。他说他经常梦到那些士兵，他们问他为什么不一起死。',
          triggerCondition: '好感度>50，第45天后',
          choices: [
            { text: '告诉他活着不是罪，他的士兵会希望他活下去', outcome: { relationshipChange: 25, consequence: '李伟沉默了很久，然后眼泪流了下来。他说："谢谢你。从来没有人跟我说过这些。"他开始接受自己活着的事实，开始把你当作真正的战友。', unlocks: ['李伟的信任'] } },
            { text: '问他有没有想过为士兵们报仇', requirement: '勇气>15', outcome: { relationshipChange: 15, consequence: '李伟的眼神变得锐利。他说："当然想。但我连仇人是谁都不知道。"你告诉他，迷雾的源头可能在城北的灯塔。李伟说："总有一天，我会去那里。为我的兄弟们报仇。"', unlocks: ['复仇的决心'] } },
            { text: '转移话题，不提这件事', outcome: { relationshipChange: 5, consequence: '李伟感激地看了你一眼。他知道你不想让他难过。但你也能感觉到，他心里的结还没有解开。' } },
          ],
        },
        {
          stage: 3,
          name: '最后的任务',
          description: '在进攻灯塔的战斗中，李伟找到了杀死他连队的生物——一只巨大的、穿着破烂军装的变异生物。它曾经是他的上级，在迷雾中变异了。李伟面临最后的抉择。',
          triggerCondition: '好感度>70，第65天后',
          choices: [
            { text: '和他一起战斗，杀死变异的上级', requirement: '力量>20', outcome: { relationshipChange: 30, consequence: '你们和变异生物激战了半个小时。最终，李伟用军用步枪射穿了它的头。变异生物倒下时，似乎恢复了一丝理智，它看着李伟，说了一句"谢谢你，士兵"。李伟跪在它面前，敬了一个军礼。他说："连长，任务完成了。"从那天起，李伟真正走出了过去。', unlocks: ['李伟的解脱', '特殊技能：军人之魂', '李伟的忠诚'] } },
            { text: '劝他不要杀，也许还能救', requirement: '智力>20', outcome: { relationshipChange: 10, consequence: '你告诉李伟，也许变异生物还能救。李伟犹豫了，但最终放下了枪。你们尝试了各种方法，但变异生物已经无法恢复了。最终，它在痛苦中死去。李伟说："也许让它活着才是更残忍的。"他开始重新思考生命的意义。' } },
            { text: '让他独自面对，这是他的战斗', outcome: { relationshipChange: 15, consequence: '你告诉李伟，这是他的战斗，应该由他自己完成。李伟点了点头，独自走向变异生物。经过一场惨烈的战斗，他杀死了它，但自己也身受重伤。你救了他。他醒来后说："谢谢你。让我自己完成了这件事。"', unlocks: ['李伟的成长'] } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 28, minPhase: 4 },
    mortality: { canDie: true, deathConditions: ['复仇战斗中牺牲', '大事件中掩护玩家', '保护平民牺牲', '被进化者组织抓捕做实验'] },
  },
  // 赵明（希望号安全区首领）
  {
    id: 'zhao_ming',
    name: '赵明（安全区首领）',
    age: 55,
    gender: 'male',
    appearance: '中等身材，微微发福，头发花白，但眼神依然锐利。穿着一件整洁的中山装，这是他作为前市长的习惯。说话慢条斯理，但每句话都有分量。',
    background: '迷雾来临时是个市长，在混乱中展现了出色的领导才能，组织幸存者建立了希望号安全区。他是个务实的人，知道在末世中道德和生存需要平衡。他常说："我不是好人，也不是坏人。我只是个想让更多人活下去的人。"',
    personality: { bravery: 70, selfishness: 45, calmness: 90, trust: 50, ambition: 75, kindness: 55 },
    baseAttributes: { strength: 8, agility: 9, intelligence: 18, luck: 14 },
    skills: ['领导才能', '政治手腕', '资源分配', '谈判', '危机处理', '人心洞察'],
    behaviorPatterns: [
      { condition: '玩家好感度<30', action: '保持官方距离，只进行正式外交，不透露安全区核心机密', priority: 10 },
      { condition: '玩家好感度30-60', action: '开始进行非正式合作，分享一些资源和情报，但核心利益仍然优先', priority: 8 },
      { condition: '玩家好感度>60', action: '信任玩家，愿意建立深度联盟，甚至考虑在未来合并势力', priority: 5 },
      { condition: '资源短缺时', action: '优先保障安全区核心成员，可能会牺牲边缘人员', priority: 9 },
      { condition: '遇到危机时', action: '冷静分析，做出最有利的选择，即使这个选择很艰难', priority: 10 },
      { condition: '提到过去的市长身份时', action: '苦笑，说"现在市长一文不值，能让大家活下去才是真的"', priority: 7 },
    ],
    relationshipTypes: ['陌生人', '外交对象', '盟友', '朋友', '导师', '敌对'],
    personalQuest: {
      id: 'zhao_quest',
      name: '领袖的重担',
      description: '赵明作为安全区的首领，承担着巨大的压力。帮助他分担重担，或者让他明白领袖也需要信任他人。',
      stages: [
        {
          stage: 1,
          name: '安全区的困境',
          description: '希望号安全区面临严重的资源短缺。赵明来找你商量，希望能建立贸易关系。但他的条件很苛刻——他要求你以低于市场价的价格出售物资。',
          triggerCondition: '好感度>20，第35天后',
          choices: [
            { text: '同意他的条件，建立长期贸易关系', requirement: '智力>15', outcome: { relationshipChange: 15, consequence: '你同意了赵明的条件。赵明有些意外，然后笑了。他说："你是个聪明人。知道长期利益比短期利益更重要。"你们建立了长期贸易关系，虽然短期利润少了，但长期来看是双赢的。', unlocks: ['希望号贸易协议'] } },
            { text: '谈判，争取更公平的条件', requirement: '魅力>15', outcome: { relationshipChange: 10, consequence: '你和赵明谈判了很久。最终，你们达成了一个双方都能接受的协议。赵明说："你是个难缠的对手。但我喜欢和难缠的对手做生意，因为这样的协议才稳定。"', unlocks: ['公平贸易协议'] } },
            { text: '拒绝他的条件，让他找别人', outcome: { relationshipChange: -15, consequence: '你拒绝了赵明的条件。赵明没有生气，只是说："我理解。但我希望你知道，在这个世界上，没有永远的朋友，只有永远的利益。"他离开了，但你能感觉到他对你的评价降低了。' } },
          ],
        },
        {
          stage: 2,
          name: '赵明的秘密',
          description: '一次深夜谈话中，赵明告诉你他的秘密——他的妻子和女儿在迷雾初期就死了。他之所以这么努力地建立安全区，是因为他不想再看到任何人死去。他说他有时候觉得自己是在赎罪，因为他没能保护好自己的家人。',
          triggerCondition: '好感度>50，第50天后',
          choices: [
            { text: '告诉他他已经做得很好了，不要自责', outcome: { relationshipChange: 20, consequence: '赵明沉默了很久，然后说："谢谢你。从来没有人跟我说过这些。"他的眼眶有些湿润。从那天起，他把你当作可以倾诉的朋友，而不仅仅是盟友。', unlocks: ['赵明的信任'] } },
            { text: '问他有没有想过放弃', requirement: '勇气>15', outcome: { relationshipChange: 15, consequence: '赵明苦笑了一下，说："当然想过。每天晚上都想。但第二天早上，看到那些活着的人，我就知道我不能放弃。"他看着你，说："你也是这样吧？我们都是被责任绑住的人。"', unlocks: ['领袖的共鸣'] } },
            { text: '转移话题，不提这件事', outcome: { relationshipChange: 5, consequence: '赵明感激地看了你一眼。他知道你不想让他难过。但你也能感觉到，他心里的话还没有说完。' } },
          ],
        },
        {
          stage: 3,
          name: '合并的提议',
          description: '随着你们的势力越来越强大，赵明提出了一个大胆的提议——合并你们的势力，建立一个更强大的联盟。他愿意担任副首领，由你担任最高首领。但这意味着你要承担更大的责任。',
          triggerCondition: '好感度>70，第80天后',
          choices: [
            { text: '同意合并，建立联合政府', requirement: '领导力>20，智力>20', outcome: { relationshipChange: 30, consequence: '你同意了赵明的提议。你们的势力合并了，建立了联合政府。赵明担任副首领，负责内政；你担任最高首领，负责外交和军事。合并后的势力非常强大，成为了迷雾世界最强大的势力之一。赵明说："我相信你能带领我们走向更好的未来。"', unlocks: ['联合政府', '特殊技能：领袖之才', '赵明的忠诚'] } },
            { text: '同意建立联盟，但保持各自独立', outcome: { relationshipChange: 15, consequence: '你同意建立联盟，但保持各自独立。赵明理解你的选择，说："独立的联盟更稳定。我们互相支持，但不干涉对方的内部事务。"你们建立了紧密的联盟关系，虽然没有合并，但合作非常顺畅。' } },
            { text: '拒绝，你不想承担更大的责任', outcome: { relationshipChange: -10, consequence: '你拒绝了赵明的提议。赵明有些失望，但表示理解。他说："每个人都有自己的选择。我尊重你的决定。"但你能感觉到，他对你的评价降低了——他觉得你缺乏领袖的担当。' } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 35, minPhase: 5 },
    mortality: { canDie: true, deathConditions: ['内部政变被暗杀', '大事件中保护安全区牺牲', '被进化者组织抓捕', '疾病缠身去世'] },
  },
  // 王工（工程师）
  {
    id: 'wang_gong',
    name: '王工（工程师）',
    age: 42,
    gender: 'male',
    appearance: '瘦削，戴一副厚厚的眼镜，头发乱糟糟的，总是穿着一件沾满油污和灰尘的工作服。手上有很多伤疤，都是搞工程留下的。说话语速很快，经常用专业术语，然后意识到你听不懂，再用通俗的话解释一遍。',
    background: '迷雾来临时是个建筑工程师，参与过很多大型工程的设计和建设。迷雾来临时，他正在工地加班，靠着工地的物资和自己的工程知识活了下来。他说这世界上最可靠的不是人，不是武器，而是结构——一个好的结构能抵挡一切。',
    personality: { bravery: 50, selfishness: 20, calmness: 80, trust: 55, ambition: 35, kindness: 60 },
    baseAttributes: { strength: 8, agility: 10, intelligence: 18, luck: 9 },
    skills: ['建筑设计', '结构工程', '防御工事', '水利工程', '工程管理', '图纸绘制'],
    behaviorPatterns: [
      { condition: '玩家好感度<30', action: '只进行基础工程咨询，收费较高，不分享核心设计', priority: 10 },
      { condition: '玩家好感度30-60', action: '开始分享一些工程技巧，设计费打折，但核心技术保密', priority: 8 },
      { condition: '玩家好感度>60', action: '愿意分享所有工程知识，主动为玩家设计和建造，甚至一起搞创新', priority: 5 },
      { condition: '看到建筑结构时', action: '职业本能发作，主动分析结构的优缺点，甚至提出改进方案', priority: 7 },
      { condition: '有新材料时', action: '兴奋，立刻开始研究能用来做什么', priority: 6 },
      { condition: '建筑出问题时', action: '焦虑，第一时间去检查和修复，甚至不吃不睡', priority: 9 },
    ],
    relationshipTypes: ['陌生人', '客户', '工友', '朋友', '师徒', '敌对'],
    personalQuest: {
      id: 'wang_quest',
      name: '建筑师的梦想',
      description: '王工一直梦想着建造一座能抵挡一切的堡垒——不仅是抵挡野兽，更是抵挡迷雾本身。帮助他实现梦想，或者让他明白有些东西是无法被结构抵挡的。',
      stages: [
        {
          stage: 1,
          name: '堡垒的设计图',
          description: '王工给你看了他的堡垒设计图——一座多层防御的坚固堡垒，有城墙、塔楼、陷阱、甚至还有一个地下避难所。他说如果能建成，就能抵挡任何兽潮。但这需要大量的材料和人力。',
          triggerCondition: '好感度>30，第40天后',
          choices: [
            { text: '支持他，调集资源开始建造', requirement: '领导力>15', outcome: { relationshipChange: 15, consequence: '你调集了资源支持王工建造堡垒。王工兴奋得像个孩子，立刻开始指挥工人施工。他说："你是第一个真正理解我的人。这将是迷雾世界最坚固的堡垒！"', unlocks: ['堡垒建造开始'] } },
            { text: '建议先建基础防御，堡垒以后再说', requirement: '智力>15', outcome: { relationshipChange: 10, consequence: '你建议王工先建基础防御，堡垒以后再说。王工想了想，点了点头。他说："你说得对。一步一步来。先把基础打好，再建堡垒。"他开始设计基础防御工事，虽然不如堡垒宏伟，但更实用。' } },
            { text: '觉得太浪费资源，拒绝他', outcome: { relationshipChange: -15, consequence: '你拒绝了王工的提议。王工很失望，说："你和其他人一样，只看到眼前的利益，看不到长远的价值。"他不再和你提堡垒的事，但你能看到他偷偷在画设计图。' } },
          ],
        },
        {
          stage: 2,
          name: '结构的极限',
          description: '在建造过程中，王工发现了一个问题——迷雾中的生物有一种特殊的能力，能破坏普通的建筑结构。他需要研究一种新的结构来抵挡这种能力。这需要大量的实验和研究。',
          triggerCondition: '好感度>50，第55天后',
          choices: [
            { text: '支持他研究新结构，提供资源和时间', requirement: '智力>18', outcome: { relationshipChange: 20, consequence: '你支持王工研究新结构。经过一个月的艰苦研究，他终于成功了——他发明了一种特殊的结构，能抵挡迷雾生物的破坏能力。王工说："我们做到了！有了这种结构，我们的堡垒将是不可摧毁的！"', unlocks: ['特殊结构技术', '堡垒升级'] } },
            { text: '建议他用现有材料加固，不要搞新研究', outcome: { relationshipChange: 5, consequence: '你建议王工用现有材料加固，不要搞新研究。王工有些失望，但还是照做了。加固后的结构确实更坚固了，但王工说："这只是治标不治本。总有一天，我们需要真正的解决方案。"' } },
            { text: '让他放弃，结构不可能抵挡迷雾', outcome: { relationshipChange: -20, consequence: '你让王工放弃，说结构不可能抵挡迷雾。王工很生气，说："你不懂工程！没有什么是不可能的！只要有足够的时间和资源，我们能建造任何东西！"他不再和你讨论工程问题，但你能感觉到他对你的失望。' } },
          ],
        },
        {
          stage: 3,
          name: '堡垒完成',
          description: '经过艰苦的建造，堡垒终于完成了。它有三层城墙、八座塔楼、无数陷阱、还有一个巨大的地下避难所。王工站在堡垒前，热泪盈眶。他说："这是我一生的杰作。有了它，我们再也不用害怕兽潮了。"',
          triggerCondition: '好感度>70，第75天后',
          choices: [
            { text: '为堡垒举行落成典礼，表彰王工的贡献', requirement: '魅力>20', outcome: { relationshipChange: 30, consequence: '你为堡垒举行了落成典礼，表彰了王工的贡献。王工激动得说不出话来。他说："谢谢你。这是我一生中最荣耀的时刻。"从那天起，王工把你当作他最好的朋友和最信任的领袖。堡垒成为了你们势力的象征，吸引了大量幸存者加入。', unlocks: ['堡垒完成', '特殊技能：建筑大师', '王工的忠诚', '人口大量增加'] } },
            { text: '简单庆祝一下，然后继续发展', outcome: { relationshipChange: 10, consequence: '你们简单庆祝了一下，然后继续发展。王工有些失落，但也理解你的务实。他说："没关系。堡垒的价值不在于典礼，而在于它能保护大家。"堡垒投入使用后，确实大大提高了你们的防御能力。' } },
            { text: '把堡垒改造成军事要塞，加强武装', outcome: { relationshipChange: 5, consequence: '你把堡垒改造成了军事要塞，加强了武装。王工有些不满，说："堡垒是用来保护人的，不是用来打仗的。"但他也理解你的决定——在这个世界上，没有武装的堡垒就是一块肥肉。' } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 38, minPhase: 5 },
    mortality: { canDie: true, deathConditions: ['建筑事故', '大事件中修复防御被攻击', '被进化者组织抓捕做研究', '劳累过度病倒'] },
  },
  // 张大爷（农业）
  {
    id: 'zhang_daye',
    name: '张大爷（农业专家）',
    age: 62,
    gender: 'male',
    appearance: '瘦小，皮肤黝黑，满脸皱纹，但精神矍铄。穿着一件旧棉袄，手里总是拿着一把锄头。说话带着浓重的乡音，语速慢，但每句话都很实在。',
    background: '迷雾来临时是个农民，种了一辈子地。迷雾来临时，他正在田里干活，靠着田里的庄稼和自己的农业知识活了下来。他说这世界上什么都可能变，但土地不会变——只要有土地，有种子，有勤劳的双手，就能活下去。',
    personality: { bravery: 60, selfishness: 25, calmness: 85, trust: 60, ambition: 15, kindness: 75 },
    baseAttributes: { strength: 10, agility: 8, intelligence: 14, luck: 12 },
    skills: ['农业种植', '土壤改良', '作物育种', '水利灌溉', '食物保存', '草药种植'],
    behaviorPatterns: [
      { condition: '玩家好感度<30', action: '只进行基础农产品交易，不分享种植技术', priority: 10 },
      { condition: '玩家好感度30-60', action: '开始分享一些基础种植技巧，农产品价格优惠', priority: 8 },
      { condition: '玩家好感度>60', action: '愿意分享所有农业知识，主动帮助玩家建立农场，甚至培育新品种', priority: 5 },
      { condition: '看到土地时', action: '职业本能发作，分析土壤质量，提出种植建议', priority: 7 },
      { condition: '有新种子时', action: '兴奋，立刻开始研究怎么种', priority: 6 },
      { condition: '农作物出问题时', action: '焦虑，第一时间去检查和处理，甚至不吃不睡', priority: 9 },
    ],
    relationshipTypes: ['陌生人', '交易伙伴', '朋友', '导师', '敌对'],
    personalQuest: {
      id: 'zhangdaye_quest',
      name: '农民的坚守',
      description: '张大爷一辈子都在和土地打交道。迷雾改变了世界，但他相信土地不会变。帮助他建立一个能自给自足的农场，或者让他明白有些东西比粮食更重要。',
      stages: [
        {
          stage: 1,
          name: '农场的提议',
          description: '张大爷建议你们建立一个农场——种植粮食、蔬菜、甚至养殖家畜。他说如果能建成，你们就再也不用为食物发愁了。但这需要大量的土地、种子和劳动力。',
          triggerCondition: '好感度>30，第40天后',
          choices: [
            { text: '支持他，调集资源建立农场', requirement: '领导力>15', outcome: { relationshipChange: 15, consequence: '你调集了资源支持张大爷建立农场。张大爷兴奋得像个孩子，立刻开始指挥人开垦土地。他说："你是个有远见的人。有了农场，我们就有了根！"', unlocks: ['农场建立开始'] } },
            { text: '建议先种小块地试试，大规模以后再说', requirement: '智力>12', outcome: { relationshipChange: 10, consequence: '你建议张大爷先种小块地试试。张大爷想了想，点了点头。他说："你说得对。一步一步来。先试种，成功了再扩大。"他开始试种各种作物，虽然规模小，但积累了宝贵的经验。' } },
            { text: '觉得太浪费时间，拒绝他', outcome: { relationshipChange: -15, consequence: '你拒绝了张大爷的提议。张大爷很失望，说："你和其他人一样，只想着抢，不想着种。但抢来的总有吃完的一天，种出来的才是长久的。"他不再和你提农场的事，但你能看到他偷偷在开垦一小块地。' } },
          ],
        },
        {
          stage: 2,
          name: '迷雾中的作物',
          description: '张大爷发现迷雾中的作物发生了变异——有些作物长得更快、产量更高，但有些作物变得有毒，不能食用。他需要研究哪些作物是安全的，哪些是危险的。这需要大量的实验。',
          triggerCondition: '好感度>50，第55天后',
          choices: [
            { text: '支持他研究，提供资源和志愿者', requirement: '智力>15', outcome: { relationshipChange: 20, consequence: '你支持张大爷研究迷雾中的作物。经过一个月的艰苦研究，他终于成功了——他鉴定出了哪些作物是安全的，哪些是危险的，甚至还培育出了几种能在迷雾中生长的高产作物。张大爷说："我们做到了！有了这些作物，我们再也不用挨饿了！"', unlocks: ['安全作物鉴定', '高产作物品种', '农场升级'] } },
            { text: '建议他只种已知安全的作物，不要冒险', outcome: { relationshipChange: 5, consequence: '你建议张大爷只种已知安全的作物。张大爷有些失望，但还是照做了。虽然产量不高，但至少是安全的。张大爷说："稳是稳，但总有一天，我们需要更大胆的尝试。"' } },
            { text: '让他放弃，迷雾中的作物都不能吃', outcome: { relationshipChange: -20, consequence: '你让张大爷放弃，说迷雾中的作物都不能吃。张大爷很生气，说："你不懂农业！土地是不会骗人的，只要我们用心研究，就能找到安全的作物！"他不再和你讨论农业问题，但你能感觉到他对你的失望。' } },
          ],
        },
        {
          stage: 3,
          name: '丰收的季节',
          description: '经过艰苦的努力，农场终于迎来了第一个丰收季。粮食、蔬菜、水果堆满了仓库。张大爷站在田埂上，看着金黄的庄稼，热泪盈眶。他说："我种了一辈子地，从来没有这么高兴过。这是我们自己种出来的粮食，谁也抢不走。"',
          triggerCondition: '好感度>70，第75天后',
          choices: [
            { text: '举行丰收庆典，表彰张大爷的贡献', requirement: '魅力>18', outcome: { relationshipChange: 30, consequence: '你举行了丰收庆典，表彰了张大爷的贡献。张大爷激动得说不出话来。他说："谢谢你。这是我一生中最荣耀的时刻。"从那天起，张大爷把你当作他最好的朋友和最信任的领袖。农场的成功吸引了大量幸存者加入，你们的势力越来越强大。', unlocks: ['农场丰收', '特殊技能：农业大师', '张大爷的忠诚', '人口大量增加', '食物充足'] } },
            { text: '简单庆祝一下，然后继续发展', outcome: { relationshipChange: 10, consequence: '你们简单庆祝了一下，然后继续发展。张大爷有些失落，但也理解你的务实。他说："没关系。丰收的价值不在于庆典，而在于它能让大家吃饱饭。"农场投入使用后，确实大大提高了你们的食物供应。' } },
            { text: '把粮食储备起来，以备不时之需', outcome: { relationshipChange: 5, consequence: '你把粮食储备起来，以备不时之需。张大爷有些不满，说："粮食是用来吃的，不是用来存的。存太久会坏的。"但他也理解你的谨慎——在这个世界上，有备无患总是好的。' } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 38, minPhase: 5 },
    mortality: { canDie: true, deathConditions: ['农场事故', '大事件中保护农作物被攻击', '疾病缠身去世', '被进化者组织抓捕'] },
  },
  // 李刚（后勤）
  {
    id: 'li_gang',
    name: '李刚（后勤主管）',
    age: 40,
    gender: 'male',
    appearance: '中等身材，微胖，看起来很普通，但眼神很精明。穿着一件整洁的工作服，口袋里总是装着一个小本子和一支笔，随时记录。说话很有条理，喜欢用数据说话。',
    background: '迷雾来临时是个仓库管理员，对物资管理有着近乎偏执的追求。迷雾来临时，他靠着仓库里的物资和自己的管理能力活了下来。他说这世界上最可怕的不是野兽，不是迷雾，而是混乱——一个混乱的后勤系统能让一支军队不战自溃。',
    personality: { bravery: 55, selfishness: 35, calmness: 85, trust: 50, ambition: 40, kindness: 50 },
    baseAttributes: { strength: 10, agility: 10, intelligence: 16, luck: 10 },
    skills: ['物资管理', '库存盘点', '资源分配', '后勤规划', '成本核算', '供应链管理'],
    behaviorPatterns: [
      { condition: '玩家好感度<30', action: '只进行基础后勤服务，收费较高，不分享管理技巧', priority: 10 },
      { condition: '玩家好感度30-60', action: '开始分享一些管理技巧，服务费打折，但核心方法保密', priority: 8 },
      { condition: '玩家好感度>60', action: '愿意分享所有管理知识，主动帮助玩家优化后勤系统，甚至一起搞创新', priority: 5 },
      { condition: '看到物资混乱时', action: '职业本能发作，主动要求整理，甚至不收钱', priority: 7 },
      { condition: '有新物资时', action: '兴奋，立刻开始分类、登记、入库', priority: 6 },
      { condition: '物资短缺时', action: '焦虑，第一时间制定配给方案，甚至不吃不睡', priority: 9 },
    ],
    relationshipTypes: ['陌生人', '客户', '同事', '朋友', '敌对'],
    personalQuest: {
      id: 'ligang_quest',
      name: '管理者的执着',
      description: '李刚对物资管理有着近乎偏执的追求。帮助他建立一个完美的后勤系统，或者让他明白有些东西是无法被管理的。',
      stages: [
        {
          stage: 1,
          name: '后勤系统的提议',
          description: '李刚建议你们建立一个完善的后勤系统——包括物资分类、库存管理、资源分配、供应链规划等。他说如果能建成，你们的资源利用率将提高50%以上。但这需要大量的时间和人力。',
          triggerCondition: '好感度>30，第40天后',
          choices: [
            { text: '支持他，让他负责建立后勤系统', requirement: '领导力>12', outcome: { relationshipChange: 15, consequence: '你支持李刚建立后勤系统。李刚兴奋得像个孩子，立刻开始制定方案。他说："你是个有远见的人。有了完善的后勤系统，我们的势力将更加强大！"', unlocks: ['后勤系统建立开始'] } },
            { text: '建议先做基础管理，完善以后再说', requirement: '智力>12', outcome: { relationshipChange: 10, consequence: '你建议李刚先做基础管理。李刚想了想，点了点头。他说："你说得对。一步一步来。先把基础打好，再完善系统。"他开始建立基础管理制度，虽然不够完善，但已经大大提高了效率。' } },
            { text: '觉得太麻烦，拒绝他', outcome: { relationshipChange: -15, consequence: '你拒绝了李刚的提议。李刚很失望，说："你和其他人一样，只想着抢，不想着管。但抢来的总有花完的一天，管好了才能长久。"他不再和你提后勤的事，但你能看到他偷偷在整理物资。' } },
          ],
        },
        {
          stage: 2,
          name: '配给制度的争议',
          description: '在资源短缺时，李刚提出了一个严格的配给制度——每个人每天只能领取固定的物资，多一点都不行。这引起了一些人的不满，他们觉得配给太少了。李刚来找你商量，希望你能支持他。',
          triggerCondition: '好感度>50，第55天后',
          choices: [
            { text: '支持李刚，严格执行配给制度', requirement: '意志力>15', outcome: { relationshipChange: 20, consequence: '你支持李刚严格执行配给制度。虽然有些人不满，但你顶住了压力。一个月后，你们成功度过了资源短缺期。李刚说："谢谢你。没有你的支持，我做不到这一点。"从那天起，他对你更加信任了。', unlocks: ['配给制度', '资源利用率提高'] } },
            { text: '建议适当放宽配给，照顾弱势群体', requirement: '魅力>15', outcome: { relationshipChange: 10, consequence: '你建议李刚适当放宽配给，照顾弱势群体。李刚想了想，点了点头。他说："你说得对。管理不仅是管物资，更是管人心。"他调整了配给方案，虽然资源消耗多了一些，但人心更稳定了。' } },
            { text: '拒绝配给制度，让大家自由分配', outcome: { relationshipChange: -20, consequence: '你拒绝了配给制度，让大家自由分配。李刚很生气，说："你不懂管理！自由分配只会导致混乱和不公！"但你坚持自己的决定。结果果然如李刚所料，资源分配混乱，有些人拿了很多，有些人什么都没有。' } },
          ],
        },
        {
          stage: 3,
          name: '完美的后勤系统',
          description: '经过艰苦的努力，李刚终于建立了一个完美的后勤系统——物资分类清晰、库存准确、分配合理、供应链顺畅。他说有了这个系统，你们的资源利用率提高了80%，浪费减少了90%。',
          triggerCondition: '好感度>70，第75天后',
          choices: [
            { text: '表彰李刚的贡献，让他负责整个势力的后勤', requirement: '领导力>18', outcome: { relationshipChange: 30, consequence: '你表彰了李刚的贡献，让他负责整个势力的后勤。李刚激动得说不出话来。他说："谢谢你。这是我一生中最荣耀的时刻。"从那天起，李刚把你当作他最好的朋友和最信任的领袖。在他的管理下，你们的后勤系统成为了迷雾世界最完善的系统，吸引了大量幸存者加入。', unlocks: ['完美后勤系统', '特殊技能：管理大师', '李刚的忠诚', '资源利用率大幅提高'] } },
            { text: '简单表彰一下，然后继续发展', outcome: { relationshipChange: 10, consequence: '你们简单表彰了一下，然后继续发展。李刚有些失落，但也理解你的务实。他说："没关系。系统的价值不在于表彰，而在于它能让大家过得更好。"后勤系统投入使用后，确实大大提高了你们的资源利用率。' } },
            { text: '把后勤系统推广到盟友那里', outcome: { relationshipChange: 15, consequence: '你把后勤系统推广到了盟友那里。李刚开始帮助盟友建立后勤系统，虽然很忙，但他很开心。他说："好的系统应该被分享。这样整个世界都会变得更好。"你们的联盟因为共享后勤系统而更加紧密。' } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 38, minPhase: 5 },
    mortality: { canDie: true, deathConditions: ['后勤事故', '大事件中保护物资被攻击', '劳累过度病倒', '被进化者组织抓捕'] },
  },
  // 先知（最终BOSS，意识体林教授）
  {
    id: 'prophet',
    name: '先知（林教授）',
    age: 78,
    gender: 'male',
    appearance: '（意识体，无固定形态）通常以一个穿着白大褂的老人形象出现，头发花白，眼神深邃而疯狂。他的身体半透明，周围环绕着淡淡的迷雾。说话声音低沉，带着回音，仿佛从很远的地方传来。',
    background: '曾经是著名的基因学家，致力于人类进化研究。迷雾来临时，他正在城北的地下实验室进行一项秘密实验——试图通过基因改造让人类进化。实验失败了，迷雾泄漏了出来，笼罩了整个世界。但他的意识在实验中存活了下来，成为了一个意识体。他相信迷雾是人类进化的催化剂，只有在迷雾中存活下来的人才是真正的新人类。',
    personality: { bravery: 90, selfishness: 85, calmness: 95, trust: 10, ambition: 100, kindness: 15 },
    baseAttributes: { strength: 5, agility: 5, intelligence: 30, luck: 20 },
    skills: ['基因工程', '意识操控', '迷雾控制', '精神攻击', '知识传承', '逻辑辩论'],
    behaviorPatterns: [
      { condition: '玩家力量<20', action: '轻视玩家，认为玩家只是旧人类的残渣，不值得关注', priority: 10 },
      { condition: '玩家力量20-30', action: '开始关注玩家，认为玩家有成为新人类的潜力，试图说服玩家加入', priority: 8 },
      { condition: '玩家力量>30', action: '重视玩家，认为玩家是真正的威胁，同时也是最有潜力的新人类，试图拉拢或消灭', priority: 5 },
      { condition: '玩家智力>25时', action: '兴奋，认为玩家是难得的人才，试图用知识和理念说服玩家', priority: 7 },
      { condition: '提到他的实验时', action: '激动，开始长篇大论地解释他的理论，甚至忘记了战斗', priority: 6 },
      { condition: '提到他的家人时', action: '沉默，然后变得更加疯狂，因为他的家人都在实验中死去了', priority: 9 },
    ],
    relationshipTypes: ['陌生人', '观察者', '对手', '信徒', '敌人', '继承者'],
    personalQuest: {
      id: 'prophet_quest',
      name: '疯狂的科学家',
      description: '先知是迷雾的创造者，也是最终的BOSS。但他不是一个简单的坏人——他有自己的理念和追求。理解他，打败他，或者继承他的意志。',
      stages: [
        {
          stage: 1,
          name: '先知的信息',
          description: '你在探索中发现了先知留下的信息——一段录音、一篇日记、或者一个全息影像。在信息中，他解释了迷雾的来源和他的理念。',
          triggerCondition: '第50天后，探索废弃实验室',
          choices: [
            { text: '仔细研究信息，了解先知的理念', requirement: '智力>18', outcome: { relationshipChange: 5, consequence: '你仔细研究了先知的信息。你了解到他曾经是个基因学家，迷雾是他的实验失败的产物。但他不认为这是失败——他认为迷雾是人类进化的催化剂。你虽然不认同他的方法，但开始理解他的动机。', unlocks: ['先知的背景', '迷雾真相的一部分'] } },
            { text: '摧毁信息，不想被疯子的理念影响', outcome: { relationshipChange: -5, consequence: '你摧毁了先知的信息。你不想被一个疯子的理念影响。但你心里知道，逃避真相不是解决问题的方法。' } },
            { text: '把信息保存起来，以后再研究', outcome: { relationshipChange: 0, consequence: '你把信息保存了起来，打算以后再研究。你知道了解敌人是打败敌人的第一步。' } },
          ],
        },
        {
          stage: 2,
          name: '先知的邀请',
          description: '先知通过意识联系了你。他邀请你加入他，成为新人类的一员。他说他可以给你超越常人的力量，只要你愿意接受他的改造。',
          triggerCondition: '第80天后，智力>20',
          choices: [
            { text: '拒绝他的邀请，你不会成为怪物', requirement: '意志力>20', outcome: { relationshipChange: -10, consequence: '你拒绝了先知的邀请。先知沉默了很久，然后说："你会后悔的。旧人类终将被淘汰，只有新人类才能生存下去。"他切断了联系。但你能感觉到，他还在观察你。', unlocks: ['先知的敌意'] } },
            { text: '假装同意，暗中寻找他的弱点', requirement: '智力>25，演技>15', outcome: { relationshipChange: 10, consequence: '你假装同意了先知的邀请。先知很高兴，开始向你展示他的力量和知识。但你在暗中寻找他的弱点。经过一段时间的观察，你发现了他的意识核心的位置。', unlocks: ['先知的信任', '意识核心的位置'] } },
            { text: '和他辩论，试图说服他放弃', requirement: '智力>28，魅力>20', outcome: { relationshipChange: 15, consequence: '你和先知辩论了很久。你告诉他，人类的进化不应该以牺牲无辜为代价，真正的进化是精神和道德的进化，而不是基因的改造。先知沉默了很久，然后说："也许你是对的。但已经太晚了。迷雾已经释放，无法收回了。"他开始重新思考自己的理念。', unlocks: ['先知的动摇'] } },
          ],
        },
        {
          stage: 3,
          name: '最终对决',
          description: '你终于到达了先知的意识核心所在地。这是一场最终的对决——不仅是力量的对决，更是理念的对决。先知告诉你，他已经活了太久，累了。他希望你能继承他的意志，或者彻底消灭他。',
          triggerCondition: '第150天后，到达城北地下实验室',
          choices: [
            { text: '消灭先知，结束这一切', requirement: '力量>30，意志力>25', outcome: { relationshipChange: -20, consequence: '你选择消灭先知。经过一场惨烈的战斗，你终于摧毁了他的意识核心。先知在消失前说："也许你是对的。旧的方式应该结束了。希望你能带领人类走向更好的未来。"迷雾开始消散。你成为了拯救人类的英雄。', unlocks: ['先知被消灭', '迷雾消散', '好结局：文明重生'] } },
            { text: '继承先知的意志，成为新的迷雾之主', requirement: '智力>30，意志力>30', outcome: { relationshipChange: 20, consequence: '你选择继承先知的意志。先知把他的所有知识和力量都传给了你，然后消散了。你成为了新的迷雾之主。你可以控制迷雾，引导人类的进化。但你也承担了巨大的责任——你决定用自己的方式，让人类在迷雾中和平地进化。', unlocks: ['继承先知的力量', '成为迷雾之主', '特殊结局：迷雾之主'] } },
            { text: '寻找第三种方法——既不消灭也不继承，而是和解', requirement: '智力>35，魅力>30', outcome: { relationshipChange: 30, consequence: '你选择寻找第三种方法。你和先知进行了深入的交流，最终说服了他——人类的进化不需要迷雾，也不需要牺牲。先知被你的理念打动了，他决定用自己最后的力量收回迷雾，然后消散。迷雾开始消散，人类迎来了新的纪元。先知在消失前说："谢谢你。你让我明白了，真正的进化是爱的进化。"', unlocks: ['与先知和解', '迷雾被收回', '隐藏结局：爱的进化'] } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 50, minPhase: 6 },
    mortality: { canDie: true, deathConditions: ['意识核心被摧毁', '被玩家继承后消散', '被玩家说服后主动消散', '力量耗尽'] },
  },
  // 黑鸦（进化者残余首领）
  {
    id: 'black_crow',
    name: '黑鸦（进化者首领）',
    age: 32,
    gender: 'male',
    appearance: '高大瘦削，皮肤苍白，眼睛是奇异的金色。穿着黑色的长风衣，行动时像一只乌鸦。他的身体已经发生了明显的变异——手指更长，关节更灵活，皮肤上有黑色的纹路。说话声音低沉，带着一种奇异的魅力。',
    background: '曾经是个普通的上班族，迷雾来临时被进化者组织抓捕，成为了实验体。他在实验中存活了下来，获得了强大的超能力，但也付出了代价——他的身体正在缓慢变异。他恨进化者组织，但也依赖他们提供的抑制剂。先知被击败后，他带领残余的进化者组织成员寻求生存。',
    personality: { bravery: 85, selfishness: 55, calmness: 80, trust: 25, ambition: 70, kindness: 40 },
    baseAttributes: { strength: 18, agility: 20, intelligence: 16, luck: 12 },
    skills: ['超能力：暗影操控', '暗杀', '潜行', '组织管理', '谈判', '战斗策略'],
    behaviorPatterns: [
      { condition: '玩家好感度<30', action: '保持警惕，只进行必要的交流，不透露组织内部信息', priority: 10 },
      { condition: '玩家好感度30-60', action: '开始进行合作，分享一些情报，但核心利益仍然优先', priority: 8 },
      { condition: '玩家好感度>60', action: '信任玩家，愿意深度合作，甚至考虑合并势力', priority: 5 },
      { condition: '提到进化者组织时', action: '眼神变得复杂，既有恨意，也有依赖', priority: 7 },
      { condition: '提到抑制剂时', action: '紧张，因为他的身体需要抑制剂来控制变异', priority: 9 },
      { condition: '遇到普通人类时', action: '复杂的情感——既有优越感，也有自卑感', priority: 6 },
    ],
    relationshipTypes: ['陌生人', '对手', '盟友', '朋友', '敌对', '继承者'],
    personalQuest: {
      id: 'blackcrow_quest',
      name: '变异者的挣扎',
      description: '黑鸦是一个变异者，他在人类和怪物之间挣扎。帮助他找到控制变异的方法，或者让他接受自己的新身份。',
      stages: [
        {
          stage: 1,
          name: '进化者的请求',
          description: '黑鸦带领残余的进化者组织成员来找你，请求你们的庇护。他说先知被击败后，进化者组织失去了抑制剂的来源，很多成员正在失控变异。他希望你们能提供帮助。',
          triggerCondition: '好感度>20，第70天后',
          choices: [
            { text: '同意提供庇护，但要求他们遵守你们的规则', requirement: '领导力>18', outcome: { relationshipChange: 15, consequence: '你同意提供庇护，但要求进化者们遵守你们的规则。黑鸦同意了。他说："谢谢你。我们不会让你失望的。"进化者们加入了你们的势力，虽然有些人对他们有偏见，但他们用实际行动证明了自己的价值。', unlocks: ['进化者加入', '超能力者数量增加'] } },
            { text: '拒绝，你们太危险了', outcome: { relationshipChange: -20, consequence: '你拒绝了黑鸦的请求。黑鸦的眼神变得冰冷。他说："我理解。但我希望你知道，我们也是受害者。"他带着进化者们离开了。但你能感觉到，他们可能会成为你们的敌人。', unlocks: ['进化者的敌意'] } },
            { text: '同意提供庇护，但要求他们交出超能力研究资料', requirement: '智力>20', outcome: { relationshipChange: 10, consequence: '你同意提供庇护，但要求进化者们交出超能力研究资料。黑鸦犹豫了一下，最终同意了。他说："这些资料本来就是先知的，不是我们的。"你们获得了宝贵的超能力研究资料，进化者们也加入了你们。', unlocks: ['超能力研究资料', '进化者加入'] } },
          ],
        },
        {
          stage: 2,
          name: '抑制剂的研究',
          description: '陈博士和医生陈静开始研究抑制剂的配方。他们发现抑制剂的关键成分是迷雾晶石的提取物。但迷雾晶石非常稀有，而且提取过程很危险。黑鸦来找你商量，希望你能支持这项研究。',
          triggerCondition: '好感度>50，第85天后',
          choices: [
            { text: '全力支持，调集资源研究抑制剂', requirement: '智力>22', outcome: { relationshipChange: 20, consequence: '你全力支持抑制剂的研究。经过一个月的艰苦研究，陈博士和陈静终于成功了——他们研制出了更安全、更有效的抑制剂。黑鸦拿着新的抑制剂，手都在发抖。他说："谢谢你。你给了我们第二次生命。"从那天起，进化者们彻底效忠于你。', unlocks: ['抑制剂研制成功', '进化者的忠诚', '超能力控制技术'] } },
            { text: '支持研究，但资源有限，慢慢来', outcome: { relationshipChange: 10, consequence: '你支持抑制剂的研究，但资源有限。研究进展缓慢，但黑鸦没有抱怨。他说："没关系。只要有希望，我们就能坚持下去。"最终，经过更长时间的研究，抑制剂还是研制成功了。' } },
            { text: '拒绝，研究太危险了', outcome: { relationshipChange: -15, consequence: '你拒绝了抑制剂的研究，说太危险了。黑鸦很失望，但也理解你的谨慎。他说："没关系。我们会自己想办法的。"但你能感觉到，他对你的信任减少了很多。' } },
          ],
        },
        {
          stage: 3,
          name: '黑鸦的选择',
          description: '抑制剂研制成功后，黑鸦面临一个选择——他可以继续使用抑制剂，保持人类的身份；或者他可以停止使用抑制剂，让变异继续，获得更强大的力量，但可能会失去人性。他来找你商量。',
          triggerCondition: '好感度>70，第100天后',
          choices: [
            { text: '建议他继续使用抑制剂，保持人性', requirement: '魅力>22', outcome: { relationshipChange: 25, consequence: '你建议黑鸦继续使用抑制剂，保持人性。黑鸦想了很久，最终点了点头。他说："你说得对。力量再强，如果失去了人性，那和怪物有什么区别？"他继续使用抑制剂，成为了你们最强大的战士之一，同时也保持了人性。他说："谢谢你。是你让我记住了自己是谁。"', unlocks: ['黑鸦的忠诚', '特殊技能：暗影战士', '超能力者的榜样'] } },
            { text: '建议他停止使用抑制剂，获得更强大的力量', outcome: { relationshipChange: 10, consequence: '你建议黑鸦停止使用抑制剂，获得更强大的力量。黑鸦犹豫了一下，最终同意了。他的力量变得非常强大，但他的人性也在慢慢流失。你能感觉到，他正在变得越来越不像人。' } },
            { text: '让他自己选择，这是他的人生', outcome: { relationshipChange: 15, consequence: '你告诉黑鸦，这是他的人生，应该由他自己选择。黑鸦感激地看了你一眼。他想了三天三夜，最终选择继续使用抑制剂。他说："我想做人。哪怕力量弱一点，我也想做人。"他成为了你们最忠诚的战士之一。' } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 70, minPhase: 7 },
    mortality: { canDie: true, deathConditions: ['变异失控', '大事件中保护玩家', '被进化者组织残余暗杀', '抑制剂失效'] },
  },
  // 陈博士（生物学家）
  {
    id: 'chen_doctor',
    name: '陈博士（生物学家）',
    age: 58,
    gender: 'male',
    appearance: '瘦削，戴一副金丝眼镜，头发花白但梳理整齐。穿着一件白大褂，虽然破旧但很干净。手指修长，总是拿着一个笔记本记录。说话语速慢，但每句话都很严谨，喜欢用数据和事实说话。',
    background: '曾经是著名的生物学家，致力于基因研究。迷雾来临时，他正在实验室工作，靠着实验室的物资和自己的知识活了下来。他是第一个发现迷雾中存在基因变异现象的人。他相信科学能解释一切，包括迷雾。他常说："没有什么是科学无法解释的，只是我们还没找到方法。"',
    personality: { bravery: 60, selfishness: 30, calmness: 90, trust: 55, ambition: 50, kindness: 55 },
    baseAttributes: { strength: 6, agility: 8, intelligence: 22, luck: 10 },
    skills: ['生物学', '基因工程', '医学研究', '实验设计', '数据分析', '科学论文写作'],
    behaviorPatterns: [
      { condition: '玩家好感度<30', action: '只进行基础科学咨询，不分享研究成果', priority: 10 },
      { condition: '玩家好感度30-60', action: '开始分享一些研究成果，愿意进行合作研究', priority: 8 },
      { condition: '玩家好感度>60', action: '信任玩家，分享所有研究成果，甚至让玩家参与重要研究', priority: 5 },
      { condition: '看到新的生物样本时', action: '兴奋，立刻开始研究，甚至忘记吃饭睡觉', priority: 7 },
      { condition: '有新的实验设备时', action: '兴奋，立刻开始调试和使用', priority: 6 },
      { condition: '研究遇到困难时', action: '执着，不放弃，直到找到解决方案', priority: 9 },
    ],
    relationshipTypes: ['陌生人', '同事', '合作伙伴', '朋友', '导师', '敌对'],
    personalQuest: {
      id: 'chendoctor_quest',
      name: '科学家的追求',
      description: '陈博士一生都在追求科学真理。迷雾给了他前所未有的研究机会，也带来了前所未有的挑战。帮助他揭开迷雾的秘密，或者让他明白有些东西比科学更重要。',
      stages: [
        {
          stage: 1,
          name: '迷雾样本的研究',
          description: '陈博士请求你帮他收集迷雾样本——不同区域、不同浓度的迷雾。他说如果能研究清楚迷雾的成分，就能找到驱散迷雾的方法。但收集样本很危险，需要深入迷雾深处。',
          triggerCondition: '好感度>30，第70天后',
          choices: [
            { text: '支持他，帮他收集迷雾样本', requirement: '敏捷>18', outcome: { relationshipChange: 15, consequence: '你帮陈博士收集了各种迷雾样本。陈博士兴奋得像个孩子，立刻开始研究。他说："你是个有远见的人。有了这些样本，我们就能揭开迷雾的秘密！"', unlocks: ['迷雾样本研究开始'] } },
            { text: '建议他先研究安全的样本，危险的以后再说', requirement: '智力>18', outcome: { relationshipChange: 10, consequence: '你建议陈博士先研究安全的样本。陈博士想了想，点了点头。他说："你说得对。安全第一。一步一步来。"他开始研究安全的样本，虽然进展慢了一些，但积累了宝贵的经验。' } },
            { text: '拒绝，太危险了', outcome: { relationshipChange: -15, consequence: '你拒绝了陈博士的请求。陈博士很失望，说："你和其他人一样，只看到危险，看不到价值。但没有冒险，就没有科学的进步。"他不再和你提研究的事，但你能看到他偷偷在收集样本。' } },
          ],
        },
        {
          stage: 2,
          name: '基因变异的发现',
          description: '经过艰苦的研究，陈博士发现了一个惊人的事实——迷雾中含有一种特殊的基因序列，能改变人类的DNA。这就是为什么有些人会获得超能力，有些人会变异成怪物。他说如果能控制这种基因序列，就能主动引导人类的进化。但这也意味着巨大的伦理风险。',
          triggerCondition: '好感度>50，第90天后',
          choices: [
            { text: '支持他继续研究，找到安全的方法', requirement: '智力>22', outcome: { relationshipChange: 20, consequence: '你支持陈博士继续研究。经过一个月的艰苦研究，他终于成功了——他找到了一种安全的方法来控制基因序列，让人类能主动、安全地获得超能力。陈博士说："我们做到了！人类的进化进入了新纪元！"', unlocks: ['安全超能力觉醒方法', '基因控制技术', '陈博士的重大突破'] } },
            { text: '建议他暂停研究，伦理风险太大', requirement: '智慧>20', outcome: { relationshipChange: 10, consequence: '你建议陈博士暂停研究，说伦理风险太大。陈博士想了想，点了点头。他说："你说得对。科学不能没有伦理。我们需要更谨慎。"他暂停了研究，但继续进行理论研究，为未来的安全研究做准备。' } },
            { text: '让他继续研究，不要管什么伦理', outcome: { relationshipChange: 5, consequence: '你让陈博士继续研究，不要管伦理。陈博士有些犹豫，但还是照做了。研究进展很快，但也出现了一些问题——有几个实验体发生了意外变异。陈博士开始怀疑自己的决定。' } },
          ],
        },
        {
          stage: 3,
          name: '迷雾的真相',
          description: '经过长期的研究，陈博士终于揭开了迷雾的真相——迷雾是先知的实验产物，含有一种能改变DNA的基因序列。但他也发现了一个更惊人的事实——迷雾的基因序列中包含了人类进化的完整蓝图。如果能正确解读，人类就能实现真正的进化。但这需要巨大的勇气和智慧。',
          triggerCondition: '好感度>70，第120天后',
          choices: [
            { text: '支持他解读基因蓝图，引导人类进化', requirement: '智力>28，领导力>22', outcome: { relationshipChange: 30, consequence: '你支持陈博士解读基因蓝图。经过三个月的艰苦研究，他终于成功了——他解读出了人类进化的完整蓝图，并找到了安全的引导方法。人类开始主动、安全地进化，进入了一个全新的纪元。陈博士说："谢谢你。没有你的支持，我做不到这一点。你是人类进化的引路人。"', unlocks: ['人类进化蓝图', '安全进化方法', '特殊技能：科学之光', '陈博士的忠诚', '人类新纪元'] } },
            { text: '建议他保守秘密，不要轻易公开', outcome: { relationshipChange: 10, consequence: '你建议陈博士保守秘密。陈博士想了想，点了点头。他说："你说得对。这么重要的发现，不能轻易公开。我们需要更谨慎。"他把研究成果保存了起来，只在小范围内分享。' } },
            { text: '让他销毁研究成果，太危险了', outcome: { relationshipChange: -20, consequence: '你让陈博士销毁研究成果。陈博士很震惊，也很失望。他说："你不懂科学！这么重要的发现，怎么能销毁？"但他最终还是照做了。不过你能感觉到，他对你的信任彻底破裂了。' } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 70, minPhase: 7 },
    mortality: { canDie: true, deathConditions: ['实验事故', '大事件中保护研究成果', '被进化者组织抓捕', '劳累过度病倒'] },
  },
  // 杜建国（朵朵父亲）
  {
    id: 'du_jianguo',
    name: '杜建国（朵朵父亲）',
    age: 42,
    gender: 'male',
    appearance: '中等身材，面容憔悴但眼神坚定。穿着一件破旧的夹克，手上有很多伤疤。他的左臂有一道长长的疤痕，是在迷雾中寻找朵朵时留下的。说话声音沙哑，但很温柔，尤其是提到朵朵的时候。',
    background: '迷雾来临时是个建筑工人，和妻子女儿失散。他一直在迷雾中寻找女儿朵朵，经历了无数危险。他被进化者组织抓捕过，成为了实验体，但他靠着对女儿的思念活了下来。最终，他在灯塔地下实验室被你们救出，和朵朵团聚。',
    personality: { bravery: 80, selfishness: 30, calmness: 65, trust: 50, ambition: 20, kindness: 70 },
    baseAttributes: { strength: 14, agility: 11, intelligence: 10, luck: 9 },
    skills: ['建筑维修', '近战格斗', '野外生存', '父爱（特殊技能）', '体力劳动', '简单医疗'],
    behaviorPatterns: [
      { condition: '玩家好感度<30', action: '保持距离，只进行必要的交流，把所有注意力都放在朵朵身上', priority: 10 },
      { condition: '玩家好感度30-60', action: '开始信任玩家，感谢玩家照顾朵朵，愿意进行合作', priority: 8 },
      { condition: '玩家好感度>60', action: '把玩家当作家人，愿意为玩家做任何事，甚至牺牲自己', priority: 5 },
      { condition: '朵朵在场时', action: '注意力全部在朵朵身上，无微不至地照顾她', priority: 10 },
      { condition: '朵朵有危险时', action: '不顾一切地保护朵朵，甚至不惜牺牲自己', priority: 10 },
      { condition: '提到妻子时', action: '沉默，眼神变得悲伤，因为妻子在迷雾中死去了', priority: 7 },
    ],
    relationshipTypes: ['陌生人', '恩人', '朋友', '家人', '敌对'],
    personalQuest: {
      id: 'du_quest',
      name: '父亲的爱',
      description: '杜建国是一个普通的父亲，但他对女儿的爱让他变得不平凡。帮助他和朵朵重建父女关系，或者让他找到新的人生目标。',
      stages: [
        {
          stage: 1,
          name: '父女团聚',
          description: '你们在灯塔地下实验室救出了杜建国。当他看到朵朵时，这个坚强的男人哭了。他紧紧抱着朵朵，说不出一句话。朵朵也哭了，她以为父亲已经死了。',
          triggerCondition: '第65天后，攻入灯塔',
          choices: [
            { text: '给他们时间团聚，不打扰', outcome: { relationshipChange: 20, consequence: '你给了杜建国和朵朵时间团聚。他们抱在一起哭了很久。杜建国擦干眼泪，走到你面前，深深地鞠了一躬。他说："谢谢你。谢谢你救了我，谢谢你照顾朵朵。你是我们的恩人。"', unlocks: ['杜建国的感激', '父女团聚'] } },
            { text: '立刻询问实验室的情况', outcome: { relationshipChange: 5, consequence: '你立刻询问实验室的情况。杜建国虽然有些失望，但还是回答了你的问题。他提供了很多有价值的情报。但你能感觉到，他更想和朵朵待在一起。' } },
            { text: '让朵朵先离开，你和杜建国单独谈话', outcome: { relationshipChange: 0, consequence: '你让朵朵先离开，和杜建国单独谈话。杜建国有些警惕，但还是配合了。你从他那里获得了很多情报。但他对你的信任还需要时间建立。' } },
          ],
        },
        {
          stage: 2,
          name: '重建关系',
          description: '杜建国和朵朵团聚后，开始重建父女关系。但朵朵已经长大了，不再是那个需要父亲保护的小女孩了。她有自己的想法和能力。杜建国有些不适应，他还是把朵朵当作小孩子。朵朵也有些不适应，她已经习惯了没有父亲的生活。',
          triggerCondition: '好感度>40，第80天后',
          choices: [
            { text: '建议杜建国尊重朵朵的成长，把她当作平等的伙伴', requirement: '魅力>18', outcome: { relationshipChange: 20, consequence: '你建议杜建国尊重朵朵的成长。杜建国想了很久，最终点了点头。他说："你说得对。朵朵已经长大了，我不能再把她当作小孩子了。"他开始把朵朵当作平等的伙伴，尊重她的决定。他们的关系变得更加健康和紧密。', unlocks: ['父女关系重建', '朵朵的成长'] } },
            { text: '建议朵朵多理解父亲，他只是太爱她了', outcome: { relationshipChange: 15, consequence: '你建议朵朵多理解父亲。朵朵想了想，点了点头。她说："我知道爸爸是为我好。但我也希望他能相信我。"她开始更多地和父亲沟通，让他了解自己的能力。他们的关系逐渐改善。' } },
            { text: '不干涉，让他们自己解决', outcome: { relationshipChange: 5, consequence: '你没有干涉杜建国和朵朵的关系。他们自己摸索着重建关系，虽然过程有些曲折，但最终还是找到了适合他们的相处方式。' } },
          ],
        },
        {
          stage: 3,
          name: '父亲的牺牲',
          description: '在一次危险的任务中，朵朵遇到了生命危险。杜建国毫不犹豫地冲上去保护她，自己却身受重伤。医生说他可能活不下来了。杜建国躺在病床上，看着朵朵，微笑着说："朵朵，爸爸终于保护了你一次。"',
          triggerCondition: '好感度>70，第100天后',
          choices: [
            { text: '不惜一切代价救他，调集所有医疗资源', requirement: '智力>20，资源充足', outcome: { relationshipChange: 30, consequence: '你不惜一切代价救杜建国。陈静和陈博士联手，经过三天三夜的抢救，终于把他从死亡线上拉了回来。杜建国醒来后，看着你和朵朵，眼泪流了下来。他说："谢谢你。你不仅救了我的命，还给了我一个家。"从那天起，他把你当作自己的孩子一样对待。', unlocks: ['杜建国获救', '杜建国的忠诚', '特殊技能：父爱如山', '家人般的关系'] } },
            { text: '尽力救治，但听天由命', outcome: { relationshipChange: 10, consequence: '你尽力救治杜建国，但医疗资源有限。经过抢救，他活了下来，但留下了终身残疾。他不能再做重体力活了，但他依然很开心。他说："能活着看到朵朵，我就满足了。"' } },
            { text: '让他有尊严地离开，不要过度抢救', outcome: { relationshipChange: -10, consequence: '你决定让杜建国有尊严地离开。他在朵朵的陪伴下，平静地离开了人世。朵朵很伤心，但也理解你的决定。不过你能感觉到，她对你有一丝怨恨。', unlocks: ['杜建国去世', '朵朵的悲伤'] } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 65, minPhase: 6 },
    mortality: { canDie: true, deathConditions: ['保护朵朵牺牲', '大事件中保护玩家', '旧伤复发', '被进化者组织残余暗杀'] },
  },
  // 铁山（钢铁兄弟会会长）
  {
    id: 'tie_shan',
    name: '铁山（钢铁兄弟会会长）',
    age: 48,
    gender: 'male',
    appearance: '极其魁梧，身高超过两米，肌肉发达得像座山。脸上有一道从额头到下巴的伤疤，是年轻时打架留下的。光头，穿着一件自制的铁甲，手里总是拿着一把巨大的铁锤。说话声音洪亮，像打雷一样。',
    background: '迷雾来临时是个拳击手，在地下拳坛打黑拳。迷雾来临时，他靠着自己的拳头和一群兄弟活了下来。他建立了钢铁兄弟会，一个以力量为尊的组织。他相信在这个世界上，力量就是一切。但他也有自己的原则——不欺负弱小，不背叛兄弟。',
    personality: { bravery: 95, selfishness: 40, calmness: 60, trust: 45, ambition: 65, kindness: 50 },
    baseAttributes: { strength: 25, agility: 12, intelligence: 10, luck: 11 },
    skills: ['近战格斗', '拳击', '力量训练', '组织管理', '武器锻造', '战斗指挥'],
    behaviorPatterns: [
      { condition: '玩家力量<15', action: '轻视玩家，认为玩家是个弱者，不值得认真对待', priority: 10 },
      { condition: '玩家力量15-20', action: '开始尊重玩家，认为玩家有一定的实力，愿意进行交流', priority: 8 },
      { condition: '玩家力量>20', action: '重视玩家，认为玩家是真正的强者，愿意结盟甚至臣服', priority: 5 },
      { condition: '遇到战斗时', action: '兴奋，第一个冲上去，享受战斗的快感', priority: 10 },
      { condition: '看到弱者被欺负时', action: '愤怒，会出手保护弱者，虽然他相信力量为尊', priority: 7 },
      { condition: '提到兄弟时', action: '骄傲，说他的兄弟是世界上最可靠的人', priority: 6 },
    ],
    relationshipTypes: ['陌生人', '对手', '盟友', '兄弟', '敌对', '臣服者'],
    personalQuest: {
      id: 'tieshan_quest',
      name: '强者的道路',
      description: '铁山一生都在追求力量。但在这个迷雾世界中，仅仅有力量是不够的。帮助他明白真正的强大是什么，或者让他成为迷雾世界最强的人。',
      stages: [
        {
          stage: 1,
          name: '力量的较量',
          description: '铁山来找你，要求和你进行一场力量的较量。他说如果你们赢了，他就愿意和你们结盟；如果你们输了，你们就要臣服于他。这是一场关于力量和尊严的较量。',
          triggerCondition: '好感度>20，第75天后',
          choices: [
            { text: '接受挑战，和他正面较量', requirement: '力量>20', outcome: { relationshipChange: 20, consequence: '你接受了铁山的挑战。经过一场激烈的较量，你最终击败了他。铁山躺在地上，哈哈大笑。他说："好！好！好！你是真正的强者！我铁山服了！从今天起，你就是我的兄弟！"他带领钢铁兄弟会和你们结盟，成为了你们最强大的盟友。', unlocks: ['钢铁兄弟会结盟', '铁山的尊重', '强大的军事盟友'] } },
            { text: '拒绝挑战，用智慧说服他', requirement: '智力>20，魅力>18', outcome: { relationshipChange: 15, consequence: '你拒绝了铁山的挑战，用智慧说服了他。你告诉他，真正的强大不是拳头，而是能让更多人活下去的能力。铁山想了很久，最终点了点头。他说："你说得对。我打了一辈子拳，到头来还是保护不了我的兄弟。也许，是时候换一种活法了。"他和你们结盟，虽然不是因为力量，但他对你的智慧非常佩服。', unlocks: ['钢铁兄弟会结盟', '铁山的认可'] } },
            { text: '拒绝挑战，也不结盟', outcome: { relationshipChange: -20, consequence: '你拒绝了铁山的挑战，也不愿意结盟。铁山很生气，说："你是看不起我吗？"他带着钢铁兄弟会离开了。但你能感觉到，他可能会成为你们的敌人。', unlocks: ['钢铁兄弟会的敌意'] } },
          ],
        },
        {
          stage: 2,
          name: '兄弟的背叛',
          description: '钢铁兄弟会内部出现了分裂——铁山的副手大壮（不是你们的大壮）认为铁山太软弱了，不应该和你们结盟。他发动了政变，试图推翻铁山。铁山带着少数忠诚的兄弟逃了出来，来找你求助。',
          triggerCondition: '好感度>50，第90天后',
          choices: [
            { text: '支持铁山，帮他夺回钢铁兄弟会', requirement: '力量>22，领导力>18', outcome: { relationshipChange: 25, consequence: '你支持铁山，帮他夺回了钢铁兄弟会。经过一场激烈的战斗，你们击败了大壮的叛军。铁山重新掌握了钢铁兄弟会的领导权。他说："谢谢你。没有你，我就失去了一切。从今天起，钢铁兄弟会就是你的后盾，你指哪我们打哪！"', unlocks: ['钢铁兄弟会完全效忠', '铁山的忠诚', '强大的军事力量'] } },
            { text: '建议他和大壮谈判，和平解决', requirement: '智力>22，魅力>20', outcome: { relationshipChange: 15, consequence: '你建议铁山和大壮谈判。经过艰苦的谈判，双方最终达成了协议——铁山继续担任会长，但大壮担任副会长，拥有更多的权力。虽然不是完美的解决方案，但避免了流血冲突。铁山说："谢谢你。是你让我明白了，有时候谈判比拳头更有用。"' } },
            { text: '拒绝介入，让他自己解决', outcome: { relationshipChange: -15, consequence: '你拒绝介入铁山的内部事务。铁山很失望，但也理解你的立场。他说："没关系。这是我自己的事，应该由我自己解决。"他带着少数兄弟回去了。经过一场惨烈的内战，他最终夺回了领导权，但损失惨重。他对你的信任减少了很多。' } },
          ],
        },
        {
          stage: 3,
          name: '真正的强大',
          description: '在一次大规模兽潮中，铁山独自面对一只巨大的兽王。他拼尽全力，但还是被兽王击败了。就在兽王要杀死他的时候，你们的援军赶到了，救了他。铁山躺在地上，看着天空，说："我一直以为自己是最强的。但今天我明白了，一个人再强也有限。真正的强大，是有一群愿意为你拼命的兄弟。"',
          triggerCondition: '好感度>70，第110天后',
          choices: [
            { text: '告诉他你一直把他当作兄弟', requirement: '魅力>22', outcome: { relationshipChange: 30, consequence: '你告诉铁山，你一直把他当作兄弟。铁山的眼眶湿润了。他说："谢谢你。我打了一辈子拳，从来没有过真正的兄弟。直到遇到了你。"从那天起，铁山彻底改变了——他不再只追求个人的力量，而是开始注重培养兄弟，建立更强大的团队。他成为了你们最可靠的盟友和兄弟。', unlocks: ['铁山的彻底忠诚', '特殊技能：钢铁意志', '兄弟般的关系', '钢铁兄弟会的全力支持'] } },
            { text: '建议他加强训练，变得更强', outcome: { relationshipChange: 10, consequence: '你建议铁山加强训练。铁山点了点头，说："你说得对。我还不够强。"他开始更加刻苦地训练，力量变得更加强大。但他也明白了团队的重要性，开始培养更多的强者。' } },
            { text: '让他休息一下，不要太拼命', outcome: { relationshipChange: 15, consequence: '你让铁山休息一下，不要太拼命。铁山感激地看了你一眼。他说："谢谢你。从来没有人这么关心过我。"他休息了一段时间，恢复了伤势。虽然力量没有明显提升，但他的心态变得更加成熟了。' } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 75, minPhase: 7 },
    mortality: { canDie: true, deathConditions: ['战斗中牺牲', '大事件中保护玩家', '保护兄弟牺牲', '旧伤复发'] },
  },
  // 大壮（战斗组组长/超能力者）
  {
    id: 'da_zhuang',
    name: '大壮（战斗组组长）',
    age: 28,
    gender: 'male',
    appearance: '极其魁梧，身高一米九五，肌肉发达。脸上总是带着憨厚的笑容，但战斗时眼神会变得极其锐利。穿着一件特制的战斗服，因为普通衣服会被他的肌肉撑破。他的超能力是力量强化——能在短时间内让自己的力量提升数倍。',
    background: '迷雾来临时是个健身教练，一直在健身房锻炼。迷雾来临时，他靠着自己的力量和健身房的物资活了下来。他在迷雾中觉醒了超能力——力量强化。他加入了你们的势力，成为了战斗组的组长。他性格憨厚，待人真诚，但战斗时非常勇猛。',
    personality: { bravery: 90, selfishness: 15, calmness: 55, trust: 70, ambition: 25, kindness: 80 },
    baseAttributes: { strength: 22, agility: 10, intelligence: 8, luck: 12 },
    skills: ['超能力：力量强化', '近战格斗', '力量训练', '团队指挥', '武器使用', '保护队友'],
    behaviorPatterns: [
      { condition: '玩家好感度<30', action: '保持尊重，但不太亲近，只进行工作交流', priority: 10 },
      { condition: '玩家好感度30-60', action: '开始亲近，愿意分享个人想法，把玩家当作好领导', priority: 8 },
      { condition: '玩家好感度>60', action: '把玩家当作最好的朋友和兄弟，愿意为玩家做任何事', priority: 5 },
      { condition: '遇到战斗时', action: '兴奋，第一个冲上去，保护队友', priority: 10 },
      { condition: '队友有危险时', action: '不顾一切地保护队友，甚至不惜牺牲自己', priority: 10 },
      { condition: '有好吃的时候', action: '开心，像个孩子一样，因为他特别能吃', priority: 6 },
    ],
    relationshipTypes: ['陌生人', '下属', '朋友', '兄弟', '敌对'],
    personalQuest: {
      id: 'dazhuang_quest',
      name: '温柔的巨人',
      description: '大壮是一个温柔的巨人——他有强大的力量，但有一颗柔软的心。帮助他控制自己的力量，或者让他明白力量的真正意义。',
      stages: [
        {
          stage: 1,
            name: '力量的失控',
            description: '大壮在一次训练中失控了——他的超能力暴走，力量变得无法控制，差点伤到了队友。他很害怕，把自己关在房间里，不敢出来。他说他不想伤害任何人。',
            triggerCondition: '好感度>30，第80天后',
            choices: [
              { text: '进去安慰他，告诉他你会帮他控制力量', requirement: '魅力>18', outcome: { relationshipChange: 20, consequence: '你进去安慰大壮。他看到你，眼泪一下子就出来了。他说："我好害怕，我怕自己会伤害到大家。"你告诉他，你会帮他控制力量。在你的帮助下，大壮逐渐学会了控制自己的超能力。他说："谢谢你。有你在，我就不害怕了。"', unlocks: ['大壮的信任', '超能力控制训练'] } },
              { text: '让他自己冷静一下，不要打扰', outcome: { relationshipChange: 5, consequence: '你让大壮自己冷静一下。他在房间里待了三天，最终自己走了出来。虽然他还是有些害怕，但他已经能够基本控制自己的力量了。他对你说："谢谢你给我时间。"' } },
              { text: '建议他暂时不要使用超能力', outcome: { relationshipChange: -10, consequence: '你建议大壮暂时不要使用超能力。大壮很失望，但还是照做了。但你能感觉到，他对你的建议有些不满——他觉得你不信任他能控制自己的力量。' } },
            ],
          },
          {
            stage: 2,
            name: '温柔的一面',
            description: '你发现大壮有一个秘密——他每天都会去基地的孤儿院，给孩子们讲故事，陪他们玩。孩子们都很喜欢他，叫他"大壮哥哥"。你没想到这个看起来很凶的巨人，居然有这么温柔的一面。',
            triggerCondition: '好感度>50，第95天后',
            choices: [
              { text: '称赞他，告诉他这是他最棒的一面', outcome: { relationshipChange: 20, consequence: '你称赞大壮，告诉他这是他最棒的一面。大壮有些不好意思地笑了。他说："我从小就喜欢孩子。我希望他们能在一个安全的环境里长大，不用像我们一样在迷雾中挣扎。"从那天起，你更加了解大壮了——他不仅是一个强大的战士，更是一个温柔的人。', unlocks: ['大壮的温柔面', '孤儿院的支持'] } },
              { text: '建议他把更多时间用在训练上', outcome: { relationshipChange: -5, consequence: '你建议大壮把更多时间用在训练上。大壮有些失望，但还是点了点头。他说："我知道了。"但你能感觉到，他对你的建议有些不满——他觉得你不理解他。' } },
              { text: '和他一起去孤儿院，陪孩子们玩', outcome: { relationshipChange: 25, consequence: '你和大壮一起去孤儿院，陪孩子们玩。孩子们看到你，都很开心。大壮看着你和孩子们玩，笑得很开心。他说："谢谢你。你是第一个愿意和我一起来这里的人。"从那天起，他把你当作最好的朋友。', unlocks: ['大壮的最好朋友', '孤儿院的喜爱'] } },
            ],
          },
          {
            stage: 3,
            name: '巨人的牺牲',
            description: '在一次大规模兽潮中，一只巨大的兽王突破了防线，朝孤儿院冲去。大壮毫不犹豫地冲了上去，用自己的身体挡住了兽王的攻击。他受了重伤，但保护了孤儿院的孩子们。他躺在废墟中，微笑着说："孩子们……安全了……就好……"',
            triggerCondition: '好感度>70，第115天后',
            choices: [
              { text: '不惜一切代价救他，调集所有医疗资源', requirement: '智力>20，资源充足', outcome: { relationshipChange: 30, consequence: '你不惜一切代价救大壮。陈静和陈博士联手，经过五天五夜的抢救，终于把他从死亡线上拉了回来。大壮醒来后，看着你和孩子们，笑得很开心。他说："谢谢你。我以为再也见不到你们了。"从那天起，他把你当作救命恩人，愿意为你做任何事。', unlocks: ['大壮获救', '大壮的绝对忠诚', '特殊技能：守护者', '孤儿院的英雄'] } },
              { text: '尽力救治，但听天由命', outcome: { relationshipChange: 10, consequence: '你尽力救治大壮，但伤势太重了。经过抢救，他活了下来，但留下了终身残疾——他的一条腿废了，不能再像以前那样战斗了。但他依然很开心。他说："能活着看到孩子们，我就满足了。"' } },
              { text: '让他有尊严地离开，不要过度抢救', outcome: { relationshipChange: -15, consequence: '你决定让大壮有尊严地离开。他在孩子们的陪伴下，平静地离开了人世。孩子们都很伤心，他们失去了最喜欢的"大壮哥哥"。你也很伤心，但你知道这是他的选择。不过你能感觉到，有些人对你的决定有些不满。', unlocks: ['大壮去世', '孩子们的悲伤'] } },
            ],
          },
        ],
      },
    unlockCondition: { minDay: 75, minPhase: 7 },
    mortality: { canDie: true, deathConditions: ['保护孩子牺牲', '大事件中保护玩家', '超能力失控', '旧伤复发'] },
  },
  // 巧姐（生产组组长）
  {
    id: 'qiao_jie',
    name: '巧姐（生产组组长）',
    age: 35,
    gender: 'female',
    appearance: '中等身材，面容清秀，总是带着温和的笑容。穿着一件整洁的工作服，手上有很多做针线活留下的小伤疤。说话声音温柔，但很有力量，能让混乱的人群安静下来。',
    background: '迷雾来临时是个服装厂的女工，擅长缝纫和制作各种物品。迷雾来临时，她靠着自己的手艺和工厂的物资活了下来。她加入了你们的势力，成为了生产组的组长。她不仅擅长制作物品，还擅长管理和协调，是基地不可或缺的人才。',
    personality: { bravery: 65, selfishness: 20, calmness: 85, trust: 70, ambition: 35, kindness: 85 },
    baseAttributes: { strength: 9, agility: 13, intelligence: 15, luck: 12 },
    skills: ['缝纫制作', '物品制造', '生产管理', '团队协调', '食物烹饪', '医疗护理'],
    behaviorPatterns: [
      { condition: '玩家好感度<30', action: '保持尊重，只进行工作交流，不分享个人想法', priority: 10 },
      { condition: '玩家好感度30-60', action: '开始亲近，愿意分享管理经验，把玩家当作好领导', priority: 8 },
      { condition: '玩家好感度>60', action: '把玩家当作最好的朋友，愿意为玩家做任何事', priority: 5 },
      { condition: '看到有人需要帮助时', action: '主动上前帮助，不计较个人得失', priority: 7 },
      { condition: '生产出问题时', action: '冷静分析，快速解决，从不慌乱', priority: 9 },
      { condition: '有新材料时', action: '兴奋，立刻开始研究能做什么新东西', priority: 6 },
    ],
    relationshipTypes: ['陌生人', '下属', '朋友', '姐妹', '敌对'],
    personalQuest: {
      id: 'qiaojie_quest',
      name: '巧手的温暖',
      description: '巧姐是一个温暖的人，她用自己的双手为大家创造温暖。帮助她建立一个完善的生产体系，或者让她明白她的价值不仅仅在于制作物品。',
      stages: [
        {
          stage: 1,
          name: '生产体系的提议',
          description: '巧姐建议你们建立一个完善的生产体系——包括服装制作、工具制造、食物加工等。她说如果能建成，你们的生活质量将大大提高。但这需要大量的材料和人力。',
          triggerCondition: '好感度>30，第80天后',
          choices: [
            { text: '支持她，让她负责建立生产体系', requirement: '领导力>15', outcome: { relationshipChange: 15, consequence: '你支持巧姐建立生产体系。巧姐兴奋地开始制定方案。她说："谢谢你的信任。我会让大家都穿上暖和的衣服，用上好用的工具！"在她的努力下，生产体系很快建立起来，大家的生活质量大大提高。', unlocks: ['生产体系建立', '生活质量提高'] } },
            { text: '建议先做基础生产，完善以后再说', requirement: '智力>15', outcome: { relationshipChange: 10, consequence: '你建议巧姐先做基础生产。巧姐想了想，点了点头。她开始建立基础生产线，虽然不够完善，但已经大大提高了生产效率。' } },
            { text: '觉得太麻烦，拒绝她', outcome: { relationshipChange: -15, consequence: '你拒绝了巧姐的提议。巧姐很失望，但还是默默继续做自己的工作。但你能感觉到，她对你的评价降低了。' } },
          ],
        },
        {
          stage: 2,
          name: '巧姐的秘密',
          description: '你发现巧姐有一个秘密——她每天晚上都会偷偷给基地里的孤儿和老人做衣服和食物。她用自己的休息时间，为那些最需要帮助的人送去温暖。你没想到这个看起来普通的女人，居然有这么善良的心。',
          triggerCondition: '好感度>50，第95天后',
          choices: [
            { text: '称赞她，告诉她这是她最棒的一面', outcome: { relationshipChange: 20, consequence: '你称赞巧姐，告诉她这是她最棒的一面。巧姐有些不好意思地笑了。她说："我只是做了我能做的。在这个世界上，每个人都需要一点温暖。"从那天起，你更加了解巧姐了——她不仅是一个优秀的生产者，更是一个温暖的人。', unlocks: ['巧姐的善良面', '孤儿和老人的感激'] } },
            { text: '建议她多休息，不要太累', outcome: { relationshipChange: 15, consequence: '你建议巧姐多休息。巧姐感激地看了你一眼。她说："谢谢你的关心。但我不累。能帮助别人，我很开心。"她继续做着自己的善事，但开始注意休息了。' } },
            { text: '和她一起做，帮助那些需要帮助的人', outcome: { relationshipChange: 25, consequence: '你和巧姐一起做善事，帮助那些需要帮助的人。巧姐看着你，笑得很开心。她说："谢谢你。你是第一个愿意和我一起做这些的人。"从那天起，她把你当作最好的朋友。', unlocks: ['巧姐的最好朋友', '基地民心提升'] } },
          ],
        },
        {
          stage: 3,
          name: '生产大师',
          description: '经过长期的努力，巧姐建立了一个完善的生产体系——基地里的每个人都能穿上暖和的衣服，用上好用的工具，吃上美味的食物。她被大家称为"生产大师"。但她依然保持着谦逊和善良。',
          triggerCondition: '好感度>70，第115天后',
          choices: [
            { text: '为她举行表彰仪式，肯定她的贡献', requirement: '魅力>20', outcome: { relationshipChange: 30, consequence: '你为巧姐举行了表彰仪式，肯定了她的贡献。巧姐激动得说不出话来。她说："谢谢你。这是我一生中最荣耀的时刻。"从那天起，她把你当作最好的朋友和最信任的领袖。在她的影响下，基地里的生产热情空前高涨，大家的生活质量越来越好。', unlocks: ['生产大师称号', '巧姐的忠诚', '基地生活质量大幅提高', '民心提升'] } },
            { text: '简单表彰一下，然后继续发展', outcome: { relationshipChange: 10, consequence: '你们简单表彰了一下巧姐，然后继续发展。巧姐有些失落，但也理解你的务实。她说："没关系。我的价值不在于表彰，而在于能让大家过得更好。"' } },
            { text: '让她负责培训更多的生产人才', outcome: { relationshipChange: 15, consequence: '你让巧姐负责培训更多的生产人才。巧姐很开心，立刻开始制定培训计划。在她的努力下，基地里的生产人才越来越多，生产能力大大提高。她说："谢谢你给我这个机会。我会培养出更多的巧手！"' } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 75, minPhase: 7 },
    mortality: { canDie: true, deathConditions: ['保护孤儿牺牲', '大事件中保护玩家', '劳累过度病倒', '疾病缠身去世'] },
  },
  // 小风（速度型超能力者）
  {
    id: 'xiao_feng',
    name: '小风（速度型超能力者）',
    age: 19,
    gender: 'male',
    appearance: '瘦削，身高一米八，动作敏捷得像一阵风。穿着一件轻便的运动服，因为普通衣服会被他的速度撕破。他的超能力是超速移动——能在短时间内以远超常人的速度移动。说话语速很快，经常让人听不清。',
    background: '迷雾来临时是个大学生，田径队的短跑运动员。迷雾来临时，他在操场上训练，靠着自己的速度活了下来。他在迷雾中觉醒了超能力——超速移动。他加入了你们的势力，成为了超能力小队的一员。他性格活泼，喜欢开玩笑，但战斗时非常认真。',
    personality: { bravery: 75, selfishness: 25, calmness: 50, trust: 65, ambition: 40, kindness: 65 },
    baseAttributes: { strength: 10, agility: 25, intelligence: 12, luck: 13 },
    skills: ['超能力：超速移动', '侦察', '暗杀', '闪避', '快速攻击', '情报传递'],
    behaviorPatterns: [
      { condition: '玩家好感度<30', action: '保持距离，只进行工作交流，喜欢开玩笑但有分寸', priority: 10 },
      { condition: '玩家好感度30-60', action: '开始亲近，愿意分享个人想法，把玩家当作好领导和朋友', priority: 8 },
      { condition: '玩家好感度>60', action: '把玩家当作最好的朋友和兄弟，愿意为玩家做任何事', priority: 5 },
      { condition: '需要侦察时', action: '兴奋，第一个冲上去，因为这是他最擅长的', priority: 7 },
      { condition: '战斗时', action: '灵活机动，利用速度优势攻击敌人的弱点', priority: 8 },
      { condition: '有好吃的时候', action: '开心，因为他特别能吃，速度快消耗大', priority: 6 },
    ],
    relationshipTypes: ['陌生人', '队友', '朋友', '兄弟', '敌对'],
    personalQuest: {
      id: 'xiaofeng_quest',
      name: '风的追求',
      description: '小风一生都在追求速度。但在这个迷雾世界中，仅仅有速度是不够的。帮助他明白速度的真正意义，或者让他成为迷雾世界最快的人。',
      stages: [
        {
          stage: 1,
          name: '速度的极限',
          description: '小风在训练中发现自己的速度达到了瓶颈——他无法再快了。他很沮丧，把自己关在房间里。他说他以为自己能变得更快，但现在看来，他的极限也就这样了。',
          triggerCondition: '好感度>30，第85天后',
          choices: [
            { text: '安慰他，告诉他速度不是一切', requirement: '魅力>18', outcome: { relationshipChange: 20, consequence: '你安慰小风，告诉他速度不是一切。小风想了很久，最终点了点头。他说："你说得对。我一直追求速度，却忽略了其他东西。"他开始注重全面发展，虽然速度没有明显提升，但整体实力大大提高。', unlocks: ['小风的成长', '全面发展'] } },
            { text: '建议他研究超能力的新用法', requirement: '智力>18', outcome: { relationshipChange: 15, consequence: '你建议小风研究超能力的新用法。小风想了想，眼睛亮了起来。他说："对啊！我怎么没想到！速度不只是用来跑的，还可以用来攻击、防御、甚至制造冲击波！"他开始研究超能力的新用法，开发出了很多新的技能。', unlocks: ['超能力新用法', '风之冲击技能'] } },
            { text: '让他自己冷静一下，不要打扰', outcome: { relationshipChange: 5, consequence: '你让小风自己冷静一下。他在房间里待了三天，最终自己走了出来。虽然他还是有些沮丧，但他已经能够接受自己的极限了。他对你说："谢谢你给我时间。"' } },
          ],
        },
        {
          stage: 2,
          name: '风的使命',
          description: '在一次任务中，小风利用自己的速度，在敌人的包围圈中来回穿梭，传递情报，扰乱敌人，最终帮助你们取得了胜利。大家都称赞他是"风之使者"。小风第一次意识到，他的速度不仅是为了自己，更是为了保护大家。',
          triggerCondition: '好感度>50，第100天后',
          choices: [
            { text: '称赞他，告诉他这是他最棒的时刻', outcome: { relationshipChange: 20, consequence: '你称赞小风，告诉他这是他最棒的时刻。小风开心地笑了。他说："谢谢你。我以前一直以为速度只是为了跑得快。但现在我明白了，速度是为了保护大家。"从那天起，小风变得更加成熟了，他不再只追求个人的速度，而是注重如何用速度帮助团队。', unlocks: ['小风的成熟', '团队意识提升'] } },
            { text: '建议他继续训练，变得更快', outcome: { relationshipChange: 10, consequence: '你建议小风继续训练。小风口头上答应了，但你能感觉到，他对你的建议有些不满——他觉得你不理解他的成长。' } },
            { text: '让他负责训练更多的速度型人才', outcome: { relationshipChange: 15, consequence: '你让小风负责训练更多的速度型人才。小风很开心，立刻开始制定训练计划。在他的努力下，基地里的速度型人才越来越多，侦察和情报传递能力大大提高。他说："谢谢你给我这个机会。我会培养出更多的风！"' } },
          ],
        },
        {
          stage: 3,
          name: '超越极限',
          description: '在最终决战中，小风为了传递重要情报，以超越极限的速度奔跑。他的身体开始崩溃，但他没有停下。最终，他成功传递了情报，帮助你们取得了胜利。但他自己却倒在了地上，身受重伤。他微笑着说："我……终于……超越了……自己的极限……"',
          triggerCondition: '好感度>70，第150天后',
          choices: [
            { text: '不惜一切代价救他，调集所有医疗资源', requirement: '智力>20，资源充足', outcome: { relationshipChange: 30, consequence: '你不惜一切代价救小风。陈静和陈博士联手，经过七天七夜的抢救，终于把他从死亡线上拉了回来。小风醒来后，看着你，笑得很开心。他说："谢谢你。我以为再也见不到你们了。"从那天起，他把你当作救命恩人，愿意为你做任何事。而且，经过这次超越极限，他的超能力变得更加强大了——他真的超越了自己的极限。', unlocks: ['小风获救', '小风的绝对忠诚', '超能力进化', '特殊技能：超越极限'] } },
            { text: '尽力救治，但听天由命', outcome: { relationshipChange: 10, consequence: '你尽力救治小风，但伤势太重了。经过抢救，他活了下来，但他的超能力受到了损伤——他再也无法达到以前的速度了。但他依然很开心。他说："能活着，就够了。"' } },
            { text: '让他有尊严地离开，不要过度抢救', outcome: { relationshipChange: -15, consequence: '你决定让小风有尊严地离开。他在队友们的陪伴下，平静地离开了人世。大家都很伤心，他们失去了最灵活的队友。你也很伤心，但你知道这是他的选择。不过你能感觉到，有些人对你的决定有些不满。', unlocks: ['小风去世', '队友们的悲伤'] } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 75, minPhase: 7 },
    mortality: { canDie: true, deathConditions: ['超越极限牺牲', '大事件中保护玩家', '超能力失控', '侦察时被击杀'] },
  },
  // 小雷（能量型超能力者）
  {
    id: 'xiao_lei',
    name: '小雷（能量型超能力者）',
    age: 22,
    gender: 'male',
    appearance: '中等身材，面容坚毅，眼神锐利。穿着一件特制的绝缘服，因为他的超能力会让普通衣服带电。他的超能力是能量操控——能吸收和释放各种形式的能量，包括电能、热能、动能等。说话声音低沉，很有力量感。',
    background: '迷雾来临时是个电工，对电力有着天生的亲和力。迷雾来临时，他在变电站值班，靠着变电站的设备和自己的知识活了下来。他在迷雾中觉醒了超能力——能量操控。他加入了你们的势力，成为了超能力小队的一员。他性格沉稳，做事认真，是团队里的可靠后盾。',
    personality: { bravery: 80, selfishness: 20, calmness: 85, trust: 60, ambition: 30, kindness: 60 },
    baseAttributes: { strength: 13, agility: 12, intelligence: 16, luck: 10 },
    skills: ['超能力：能量操控', '能量攻击', '能量护盾', '能量吸收', '电力维修', '电子设备操作'],
    behaviorPatterns: [
      { condition: '玩家好感度<30', action: '保持距离，只进行工作交流，话不多但很实在', priority: 10 },
      { condition: '玩家好感度30-60', action: '开始亲近，愿意分享技术经验，把玩家当作好领导', priority: 8 },
      { condition: '玩家好感度>60', action: '把玩家当作最好的朋友和兄弟，愿意为玩家做任何事', priority: 5 },
      { condition: '遇到电子设备时', action: '职业本能发作，主动检查和维修', priority: 7 },
      { condition: '战斗时', action: '沉稳，利用能量攻击和护盾，攻守兼备', priority: 8 },
      { condition: '有新的能量源时', action: '兴奋，立刻开始研究能怎么利用', priority: 6 },
    ],
    relationshipTypes: ['陌生人', '队友', '朋友', '兄弟', '敌对'],
    personalQuest: {
      id: 'xiaolei_quest',
      name: '能量的掌控',
      description: '小雷一生都在和能量打交道。但在这个迷雾世界中，他的超能力给他带来了力量，也带来了危险。帮助他掌控自己的力量，或者让他明白力量的真正意义。',
      stages: [
        {
          stage: 1,
          name: '能量的失控',
          description: '小雷在一次训练中失控了——他吸收了太多能量，无法控制，差点炸毁了整个训练场。他很害怕，把自己关在房间里，不敢使用超能力。他说他不想伤害任何人。',
          triggerCondition: '好感度>30，第85天后',
          choices: [
            { text: '进去安慰他，告诉他你会帮他控制力量', requirement: '魅力>18', outcome: { relationshipChange: 20, consequence: '你进去安慰小雷。他看到你，松了一口气。他说："我好害怕，我怕自己会伤害到大家。"你告诉他，你会帮他控制力量。在你的帮助下，小雷逐渐学会了控制自己的超能力。他说："谢谢你。有你在，我就不害怕了。"', unlocks: ['小雷的信任', '能量控制训练'] } },
            { text: '让他自己冷静一下，不要打扰', outcome: { relationshipChange: 5, consequence: '你让小雷自己冷静一下。他在房间里待了三天，最终自己走了出来。虽然他还是有些害怕，但他已经能够基本控制自己的力量了。他对你说："谢谢你给我时间。"' } },
            { text: '建议他暂时不要使用超能力', outcome: { relationshipChange: -10, consequence: '你建议小雷暂时不要使用超能力。小雷很失望，但还是照做了。但你能感觉到，他对你的建议有些不满——他觉得你不信任他能控制自己的力量。' } },
          ],
        },
        {
          stage: 2,
          name: '能量的应用',
          description: '小雷发现了超能力的新用法——他不仅能攻击和防御，还能为基地提供电力，驱动各种设备。他开始为基地建设能源系统，让大家用上了电。大家都称赞他是"能量大师"。小雷第一次意识到，他的力量不仅是为了战斗，更是为了改善大家的生活。',
          triggerCondition: '好感度>50，第100天后',
          choices: [
            { text: '称赞他，告诉他这是他最棒的贡献', outcome: { relationshipChange: 20, consequence: '你称赞小雷，告诉他这是他最棒的贡献。小雷开心地笑了。他说："谢谢你。我以前一直以为超能力只是用来战斗的。但现在我明白了，超能力也可以用来改善大家的生活。"从那天起，小雷变得更加积极了，他开始研究更多的超能力民用用法。', unlocks: ['小雷的成长', '基地能源系统', '生活质量提高'] } },
            { text: '建议他继续训练战斗能力', outcome: { relationshipChange: 10, consequence: '你建议小雷继续训练战斗能力。小雷口头上答应了，但你能感觉到，他对你的建议有些不满——他觉得你不理解他的追求。' } },
            { text: '让他负责培训更多的能量型人才', outcome: { relationshipChange: 15, consequence: '你让小雷负责培训更多的能量型人才。小雷很开心，立刻开始制定培训计划。在他的努力下，基地里的能量型人才越来越多，能源供应大大提高。他说："谢谢你给我这个机会。我会让整个基地都亮起来！"' } },
          ],
        },
        {
          stage: 3,
          name: '能量的爆发',
          description: '在最终决战中，小雷为了摧毁敌人的能量护盾，吸收了大量的能量，然后一次性释放出来。他成功摧毁了护盾，但他自己也因为能量过载而身受重伤。他躺在地上，微笑着说："我……终于……发挥出了……全部的力量……"',
          triggerCondition: '好感度>70，第150天后',
          choices: [
            { text: '不惜一切代价救他，调集所有医疗资源', requirement: '智力>20，资源充足', outcome: { relationshipChange: 30, consequence: '你不惜一切代价救小雷。陈静和陈博士联手，经过七天七夜的抢救，终于把他从死亡线上拉了回来。小雷醒来后，看着你，笑得很开心。他说："谢谢你。我以为再也见不到你们了。"从那天起，他把你当作救命恩人，愿意为你做任何事。而且，经过这次能量爆发，他的超能力变得更加强大了——他能够更好地控制和利用能量了。', unlocks: ['小雷获救', '小雷的绝对忠诚', '超能力进化', '特殊技能：能量爆发'] } },
            { text: '尽力救治，但听天由命', outcome: { relationshipChange: 10, consequence: '你尽力救治小雷，但伤势太重了。经过抢救，他活了下来，但他的超能力受到了损伤——他再也无法释放出以前那么强大的能量了。但他依然很开心。他说："能活着，就够了。"' } },
            { text: '让他有尊严地离开，不要过度抢救', outcome: { relationshipChange: -15, consequence: '你决定让小雷有尊严地离开。他在队友们的陪伴下，平静地离开了人世。大家都很伤心，他们失去了最强大的能量后盾。你也很伤心，但你知道这是他的选择。不过你能感觉到，有些人对你的决定有些不满。', unlocks: ['小雷去世', '队友们的悲伤'] } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 75, minPhase: 7 },
    mortality: { canDie: true, deathConditions: ['能量过载牺牲', '大事件中保护玩家', '超能力失控', '战斗中被击杀'] },
  },
  // 小灵（感知型超能力者）
  {
    id: 'xiao_ling',
    name: '小灵（感知型超能力者）',
    age: 20,
    gender: 'female',
    appearance: '娇小，面容清秀，眼神深邃而神秘。穿着一件轻便的衣服，因为她的超能力不需要特殊装备。她的超能力是感知——能感知到周围的环境、生物、甚至思想。她的眼睛有时候会发出淡淡的光芒，那是她在使用超能力。说话声音轻柔，但很有穿透力。',
    background: '迷雾来临时是个心理学系的学生，对人类的心理有着天生的洞察力。迷雾来临时，她在图书馆看书，靠着自己的感知能力活了下来。她在迷雾中觉醒了超能力——感知。她加入了你们的势力，成为了超能力小队的一员。她性格温柔，善解人意，是团队里的心灵支柱。',
    personality: { bravery: 60, selfishness: 15, calmness: 90, trust: 75, ambition: 20, kindness: 90 },
    baseAttributes: { strength: 6, agility: 10, intelligence: 20, luck: 15 },
    skills: ['超能力：感知', '环境感知', '生物感知', '思想感知', '心理辅导', '危险预警'],
    behaviorPatterns: [
      { condition: '玩家好感度<30', action: '保持距离，只进行工作交流，话不多但很温柔', priority: 10 },
      { condition: '玩家好感度30-60', action: '开始亲近，愿意分享感知经验，把玩家当作好领导和朋友', priority: 8 },
      { condition: '玩家好感度>60', action: '把玩家当作最好的朋友和姐妹，愿意为玩家做任何事', priority: 5 },
      { condition: '有人情绪低落时', action: '主动上前安慰，用自己的感知能力理解对方的心情', priority: 7 },
      { condition: '有危险时', action: '第一时间感知到，发出预警', priority: 10 },
      { condition: '使用超能力时', action: '专注，眼睛发出淡淡的光芒', priority: 6 },
    ],
    relationshipTypes: ['陌生人', '队友', '朋友', '姐妹', '敌对'],
    personalQuest: {
      id: 'xiaoling_quest',
      name: '心灵的窗户',
      description: '小灵的超能力让她能感知到别人的思想和情绪。但这也给她带来了巨大的负担——她能感受到别人的痛苦和恐惧。帮助她学会保护自己的心灵，或者让她明白感知的真正意义。',
      stages: [
        {
          stage: 1,
          name: '心灵的负担',
          description: '小灵在一次大规模战斗后，因为感知到了太多人的痛苦和恐惧，精神崩溃了。她把自己关在房间里，不吃不喝。她说她能听到所有人的声音，感受到所有人的痛苦，她快要疯了。',
          triggerCondition: '好感度>30，第85天后',
          choices: [
            { text: '进去陪她，用你的力量保护她的心灵', requirement: '意志力>18，魅力>18', outcome: { relationshipChange: 25, consequence: '你进去陪小灵，用你的力量保护她的心灵。她靠在你的肩膀上，哭了很久。她说："谢谢你。有你在，我就不害怕了。"在你的帮助下，小雷逐渐学会了保护自己的心灵，不再被别人的情绪所左右。她说："谢谢你。是你让我明白了，感知不是负担，而是礼物。"', unlocks: ['小灵的信任', '心灵保护训练'] } },
            { text: '让她自己冷静一下，不要打扰', outcome: { relationshipChange: 5, consequence: '你让小灵自己冷静一下。她在房间里待了五天，最终自己走了出来。虽然她还是有些虚弱，但她已经能够基本保护自己的心灵了。她对你说："谢谢你给我时间。"' } },
            { text: '建议她暂时不要使用超能力', outcome: { relationshipChange: -10, consequence: '你建议小灵暂时不要使用超能力。小灵很失望，但还是照做了。但你能感觉到，她对你的建议有些不满——她觉得你不理解她的痛苦。' } },
          ],
        },
        {
          stage: 2,
          name: '心灵的治愈',
          description: '小灵发现了超能力的新用法——她不仅能感知别人的情绪，还能治愈别人的心灵创伤。她开始为基地里的人做心理辅导，帮助他们走出迷雾带来的阴影。大家都称赞她是"心灵治愈者"。小灵第一次意识到，她的感知能力不仅是为了预警，更是为了治愈。',
          triggerCondition: '好感度>50，第100天后',
          choices: [
            { text: '称赞她，告诉她这是她最棒的贡献', outcome: { relationshipChange: 20, consequence: '你称赞小灵，告诉她这是她最棒的贡献。小灵开心地笑了。她说："谢谢你。我以前一直以为感知只是用来预警的。但现在我明白了，感知也可以用来治愈。"从那天起，小灵变得更加积极了，她开始研究更多的超能力治愈用法。基地里的人的精神状态越来越好。', unlocks: ['小灵的成长', '心理辅导系统', '基地精神状态提升'] } },
            { text: '建议她继续训练感知能力', outcome: { relationshipChange: 10, consequence: '你建议小灵继续训练感知能力。小灵口头上答应了，但你能感觉到，她对你的建议有些不满——她觉得你不理解她的追求。' } },
            { text: '让她负责培训更多的感知型人才', outcome: { relationshipChange: 15, consequence: '你让小灵负责培训更多的感知型人才。小灵很开心，立刻开始制定培训计划。在她的努力下，基地里的感知型人才越来越多，预警和心理辅导能力大大提高。她说："谢谢你给我这个机会。我会让更多的人学会治愈心灵！"' } },
          ],
        },
        {
          stage: 3,
          name: '心灵的连接',
          description: '在最终决战中，小灵为了感知到敌人的核心位置，将自己的感知能力提升到了极限。她成功感知到了敌人的核心位置，帮助你们取得了胜利。但她自己也因为精神过载而身受重伤。她躺在地上，微笑着说："我……终于……感知到了……一切……"',
          triggerCondition: '好感度>70，第150天后',
          choices: [
            { text: '不惜一切代价救她，调集所有医疗资源', requirement: '智力>20，资源充足', outcome: { relationshipChange: 30, consequence: '你不惜一切代价救小灵。陈静和陈博士联手，经过七天七夜的抢救，终于把她从死亡线上拉了回来。小灵醒来后，看着你，笑得很开心。她说："谢谢你。我以为再也见不到你们了。"从那天起，她把你当作救命恩人，愿意为你做任何事。而且，经过这次精神过载，她的超能力变得更加强大了——她能够更好地控制和利用感知能力了，甚至能和别人建立心灵连接。', unlocks: ['小灵获救', '小灵的绝对忠诚', '超能力进化', '特殊技能：心灵连接'] } },
            { text: '尽力救治，但听天由命', outcome: { relationshipChange: 10, consequence: '你尽力救治小灵，但伤势太重了。经过抢救，她活了下来，但她的超能力受到了损伤——她再也无法感知到以前那么远的范围了。但她依然很开心。她说："能活着，就够了。"' } },
            { text: '让她有尊严地离开，不要过度抢救', outcome: { relationshipChange: -15, consequence: '你决定让小灵有尊严地离开。她在队友们的陪伴下，平静地离开了人世。大家都很伤心，他们失去了最温柔的心灵治愈者。你也很伤心，但你知道这是她的选择。不过你能感觉到，有些人对你的决定有些不满。', unlocks: ['小灵去世', '队友们的悲伤'] } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 75, minPhase: 7 },
    mortality: { canDie: true, deathConditions: ['精神过载牺牲', '大事件中保护玩家', '超能力失控', '被敌人的精神攻击击杀'] },
  },
  // 林鹰（自由联盟盟主）
  {
    id: 'lin_ying',
    name: '林鹰（自由联盟盟主）',
    age: 45,
    gender: 'male',
    appearance: '高大英俊，气质不凡，眼神锐利如鹰。穿着一件整洁的军装，虽然是末世，但依然保持着军人的风范。他的左臂有一道长长的伤疤，是在一次战斗中留下的。说话声音洪亮，很有感染力，能让人心甘情愿地跟随他。',
    background: '迷雾来临时是个特种部队的指挥官，在混乱中展现了出色的领导才能。他组织了一支强大的武装力量，建立了自由联盟。他相信在这个末世中，只有强大的军事力量才能保护大家。但他也有自己的原则——不欺负弱小，不背叛盟友。他是迷雾世界最强大的势力之一的领袖。',
    personality: { bravery: 95, selfishness: 40, calmness: 85, trust: 45, ambition: 80, kindness: 55 },
    baseAttributes: { strength: 18, agility: 16, intelligence: 18, luck: 14 },
    skills: ['军事指挥', '特种作战', '射击', '格斗', '政治手腕', '外交谈判', '人心洞察'],
    behaviorPatterns: [
      { condition: '玩家力量<20', action: '保持外交距离，只进行正式交流，不透露联盟核心机密', priority: 10 },
      { condition: '玩家力量20-30', action: '开始重视玩家，愿意进行深度合作，分享一些情报', priority: 8 },
      { condition: '玩家力量>30', action: '把玩家当作平等的盟友，甚至考虑合并势力', priority: 5 },
      { condition: '遇到战斗时', action: '冷静指挥，战术清晰，能在混乱中找到胜机', priority: 10 },
      { condition: '提到自由联盟时', action: '骄傲，说他的联盟是迷雾世界最自由、最强大的势力', priority: 6 },
      { condition: '看到弱小被欺负时', action: '愤怒，会出手保护，虽然他相信力量为尊', priority: 7 },
    ],
    relationshipTypes: ['陌生人', '外交对象', '盟友', '朋友', '对手', '敌对'],
    personalQuest: {
      id: 'linying_quest',
      name: '自由的代价',
      description: '林鹰一生都在追求自由和强大。但在这个迷雾世界中，自由和强大往往是矛盾的。帮助他找到平衡，或者让他成为迷雾世界最强大的人。',
      stages: [
        {
          stage: 1,
          name: '联盟的邀请',
          description: '林鹰邀请你加入自由联盟，成为他的盟友。他说如果你们结盟，将成为迷雾世界最强大的势力。但他也提出了条件——你们需要在军事上支持自由联盟，并且在重大决策上听从他的意见。这是一个关于独立和联盟的抉择。',
          triggerCondition: '好感度>20，第95天后',
          choices: [
            { text: '同意结盟，但保持独立性', requirement: '外交>18，智力>18', outcome: { relationshipChange: 20, consequence: '你同意和林鹰结盟，但保持独立性。林鹰想了想，最终点了点头。他说："你是个聪明人。知道什么该让，什么不该让。好，我们结盟！"你们建立了强大的联盟，成为了迷雾世界最强大的势力之一。林鹰对你的智慧非常佩服。', unlocks: ['自由联盟结盟', '强大的军事盟友'] } },
            { text: '拒绝，你们要保持完全独立', outcome: { relationshipChange: -15, consequence: '你拒绝了林鹰的邀请。林鹰有些失望，但也理解你的立场。他说："没关系。每个人都有自己的选择。但我希望你知道，在这个世界上，独自生存是很艰难的。"他离开了，但你们保持了友好的关系。' } },
            { text: '同意加入，完全服从林鹰的指挥', outcome: { relationshipChange: 10, consequence: '你同意加入自由联盟，完全服从林鹰的指挥。林鹰很开心，说你是个识时务的人。但你能感觉到，你的同伴们对你的决定有些不满——他们觉得你放弃了独立性。' } },
          ],
        },
        {
          stage: 2,
          name: '自由的困境',
          description: '自由联盟内部出现了矛盾——一部分人认为应该加强集权，提高效率；另一部分人认为应该保持自由，尊重个人权利。林鹰来找你商量，希望你能给他一些建议。这是一个关于自由和秩序的抉择。',
          triggerCondition: '好感度>50，第110天后',
          choices: [
            { text: '建议他在自由和秩序之间找到平衡', requirement: '智慧>22，魅力>20', outcome: { relationshipChange: 20, consequence: '你建议林鹰在自由和秩序之间找到平衡。林鹰想了很久，最终点了点头。他说："你说得对。没有自由的秩序是暴政，没有秩序的自由是混乱。我们需要找到平衡。"他开始改革自由联盟的制度，在自由和秩序之间找到了平衡点。联盟变得更加稳定和强大。林鹰说："谢谢你。是你让我明白了自由的真正意义。"', unlocks: ['自由联盟改革', '林鹰的信任', '联盟更加稳定强大'] } },
            { text: '建议他加强集权，提高效率', outcome: { relationshipChange: 10, consequence: '你建议林鹰加强集权。林鹰想了想，点了点头。他开始加强集权，联盟的效率确实提高了，但自由也减少了。一些人开始不满，联盟内部出现了裂痕。' } },
            { text: '建议他保持自由，尊重个人权利', outcome: { relationshipChange: 15, consequence: '你建议林鹰保持自由。林鹰想了想，点了点头。他继续保持自由，联盟的自由确实得到了保障，但效率也降低了。在面对危机时，联盟的反应速度变慢了。' } },
          ],
        },
        {
          stage: 3,
          name: '最终的抉择',
          description: '在最终决战前，林鹰提出了一个大胆的提议——合并你们的势力，建立一个统一的人类联邦。他愿意担任副首领，由你担任最高首领。但这意味着你要承担更大的责任，同时也要处理好两个势力的融合问题。',
          triggerCondition: '好感度>70，第140天后',
          choices: [
            { text: '同意合并，建立人类联邦', requirement: '领导力>25，智力>22', outcome: { relationshipChange: 30, consequence: '你同意和林鹰合并，建立人类联邦。林鹰担任副首领，负责军事；你担任最高首领，负责外交和内政。合并后的联邦成为了迷雾世界最强大的势力，没有之一。林鹰说："我相信你能带领我们走向更好的未来。自由联盟的兄弟们，就交给你了。"在最终决战中，联邦发挥了巨大的作用，帮助你们取得了胜利。', unlocks: ['人类联邦建立', '林鹰的忠诚', '最强大的势力', '最终决战的胜利保障'] } },
            { text: '同意建立紧密联盟，但保持各自独立', outcome: { relationshipChange: 15, consequence: '你同意建立紧密联盟，但保持各自独立。林鹰理解你的选择，说："独立的联盟更稳定。我们互相支持，但不干涉对方的内部事务。"你们建立了紧密的联盟关系，虽然没有合并，但合作非常顺畅。' } },
            { text: '拒绝，你不想承担更大的责任', outcome: { relationshipChange: -10, consequence: '你拒绝了林鹰的提议。林鹰有些失望，但表示理解。他说："每个人都有自己的选择。我尊重你的决定。"但你能感觉到，他对你的评价降低了——他觉得你缺乏领袖的担当。' } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 95, minPhase: 8 },
    mortality: { canDie: true, deathConditions: ['战斗中牺牲', '大事件中保护玩家', '内部政变被暗杀', '被进化者组织刺杀'] },
  },
  // 老狐狸（流浪者商队队长）
  {
    id: 'lao_hu_li',
    name: '老狐狸（商队队长）',
    age: 60,
    gender: 'male',
    appearance: '瘦小，面容精明，眼睛眯成一条缝，总是带着狡黠的笑容。穿着一件破旧的皮袄，口袋里塞满了各种小物件和账本。走路一瘸一拐，据说是年轻时被野兽咬的。说话语速慢，但每句话都很有分量，让人摸不透他在想什么。',
    background: '迷雾来临时是个走南闯北的商人，有着丰富的贸易经验和人脉。迷雾来临时，他靠着自己的精明和商队的物资活了下来。他建立了一支流浪者商队，在各个势力之间进行贸易。他知道所有势力的秘密，但从不轻易透露。他常说："在这个世界上，信息就是金钱，人脉就是生命。"',
    personality: { bravery: 50, selfishness: 75, calmness: 95, trust: 20, ambition: 60, kindness: 35 },
    baseAttributes: { strength: 7, agility: 9, intelligence: 22, luck: 18 },
    skills: ['贸易谈判', '情报收集', '人脉管理', '路线规划', '商品鉴定', '风险评估'],
    behaviorPatterns: [
      { condition: '玩家好感度<30', action: '只进行常规交易，价格偏高，不透露任何情报', priority: 10 },
      { condition: '玩家好感度30-60', action: '开始给予折扣，分享一些基础情报，但核心情报保密', priority: 8 },
      { condition: '玩家好感度>60', action: '信任玩家，分享重要情报，甚至愿意透露一些秘密', priority: 5 },
      { condition: '有稀有商品时', action: '眼睛发亮，主动提出交易，价格可以商量', priority: 7 },
      { condition: '遇到危险时', action: '第一时间逃跑，但会留下一部分物资作为"见面礼"', priority: 10 },
      { condition: '提到他的过去时', action: '笑而不答，转移话题', priority: 6 },
    ],
    relationshipTypes: ['陌生人', '客户', '合作伙伴', '朋友', '敌对'],
    personalQuest: {
      id: 'laohuli_quest',
      name: '商人的智慧',
      description: '老狐狸一生都在和人打交道，他知道所有势力的秘密。但他也有自己的烦恼和秘密。帮助他解开过去的心结，或者利用他的情报为自己谋利。',
      stages: [
        {
          stage: 1,
          name: '神秘的商品',
          description: '老狐狸拿出了一件神秘的商品——一张古老的地图，上面标注着迷雾深处的一个神秘地点。他说这张地图是他从一个流浪者手里换来的，那个地点可能有巨大的宝藏。但他要价很高。',
          triggerCondition: '好感度>30，第100天后',
          choices: [
            { text: '买下地图，去探索神秘地点', requirement: '积分>300，勇气>18', outcome: { relationshipChange: 15, consequence: '你花大价钱买下了地图，然后去探索了神秘地点。你在那里发现了一个巨大的地下仓库，里面有大量的物资和武器。老狐狸知道后，笑得很开心。他说："我就知道你是个有魄力的人。怎么样，没让你失望吧？"你们的关系更近了一步。', unlocks: ['神秘地图', '地下仓库', '大量物资和武器'] } },
            { text: '和他讨价还价，争取更低的价格', requirement: '魅力>20，智力>18', outcome: { relationshipChange: 10, consequence: '你和老狐狸讨价还价了很久。最终，他同意以更低的价格卖给你。他说："你是个难缠的对手。但我喜欢和难缠的对手做生意，因为这样的交易才有意思。"你以较低的价格买下了地图。' } },
            { text: '不买，觉得太危险了', outcome: { relationshipChange: -5, consequence: '你没有买地图。老狐狸有些失望，但也理解你的谨慎。他说："没关系。机会总是留给有勇气的人的。"他把地图收了起来，继续向别人推销。' } },
          ],
        },
        {
          stage: 2,
          name: '老狐狸的过去',
          description: '一次喝醉后，老狐狸告诉你他的过去——他曾经有一个幸福的家庭，妻子和女儿。但迷雾来临时，他为了保护商队的物资，放弃了救妻子和女儿。他一直活在愧疚中，用贸易和金钱来麻痹自己。他说他这辈子最对不起的就是他的家人。',
          triggerCondition: '好感度>50，第115天后',
          choices: [
            { text: '安慰他，告诉他那不是他的错', outcome: { relationshipChange: 20, consequence: '你安慰老狐狸，告诉他那不是他的错。老狐狸沉默了很久，然后眼泪流了下来。他说："谢谢你。从来没有人跟我说过这些。"从那天起，他把你当作可以倾诉的朋友，不再对你隐瞒任何事情。他甚至把自己的所有情报和人脉都分享给了你。', unlocks: ['老狐狸的信任', '所有情报和人脉'] } },
            { text: '问他有没有想过弥补', requirement: '智慧>18', outcome: { relationshipChange: 15, consequence: '你问老狐狸有没有想过弥补。老狐狸想了很久，然后说："我一直在弥补。我用贸易帮助那些需要帮助的人，用金钱支持那些正义的势力。但我知道，这永远无法弥补我对家人的亏欠。"他开始更加积极地做善事，用自己的方式弥补过去。' } },
            { text: '转移话题，不提这件事', outcome: { relationshipChange: 5, consequence: '你转移了话题，不提这件事。老狐狸感激地看了你一眼。他知道你不想让他难过。但你也能感觉到，他心里的话还没有说完。' } },
          ],
        },
        {
          stage: 3,
          name: '最后的交易',
          description: '在最终决战前，老狐狸来找你，说他有一个最后的交易——他愿意把自己的所有情报、人脉和物资都交给你，条件是你要保护好他的商队，让他们能在战后继续生存。他说他老了，跑不动了，想把一切都交给值得信任的人。',
          triggerCondition: '好感度>70，第140天后',
          choices: [
            { text: '同意，承诺保护他的商队', requirement: '领导力>20，魅力>20', outcome: { relationshipChange: 30, consequence: '你同意了老狐狸的交易，承诺保护他的商队。老狐狸开心地笑了。他说："谢谢你。我就知道你是个值得信任的人。"他把自己的所有情报、人脉和物资都交给了你。这些情报和物资在最终决战中发挥了巨大的作用，帮助你们取得了胜利。战后，你兑现了承诺，保护了他的商队，让他们继续在新世界中贸易。老狐狸说："谢谢你。你是我这辈子做过的最好的交易。"', unlocks: ['老狐狸的所有情报和物资', '商队的支持', '最终决战的重要帮助', '老狐狸的忠诚'] } },
            { text: '同意交易，但只承诺尽力保护', outcome: { relationshipChange: 15, consequence: '你同意了交易，但只承诺尽力保护。老狐狸想了想，点了点头。他说："好吧。尽力就好。"他把大部分情报和物资交给了你，但保留了一部分作为商队的后路。' } },
            { text: '拒绝，你不想承担这个责任', outcome: { relationshipChange: -10, consequence: '你拒绝了老狐狸的交易。老狐狸有些失望，但表示理解。他说："没关系。每个人都有自己的选择。"他带着商队离开了，继续在各个势力之间贸易。但你能感觉到，他对你的信任减少了很多。' } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 100, minPhase: 8 },
    mortality: { canDie: true, deathConditions: ['贸易纠纷被杀害', '大事件中保护商队牺牲', '被进化者组织抓捕', '疾病缠身去世'] },
  },
  // 张博士（进化者组织首席科学家）
  {
    id: 'zhang_boshi',
    name: '张博士（进化者组织科学家）',
    age: 55,
    gender: 'male',
    appearance: '瘦削，戴一副厚厚的眼镜，头发花白但乱糟糟的。穿着一件破旧的白大褂，上面有很多化学药品的污渍。眼神狂热而疲惫，像是一个长期沉迷于研究的人。说话语速快，经常用专业术语，然后意识到你听不懂，再用通俗的话解释。',
    background: '曾经是著名的基因学家，先知的学生和助手。他参与了迷雾实验的整个过程，是进化者组织的首席科学家。先知被击败后，他被你们抓捕。他对先知有着复杂的感情——既崇拜他的智慧，又恐惧他的疯狂。他掌握着进化者组织的所有研究资料和秘密。',
    personality: { bravery: 40, selfishness: 50, calmness: 70, trust: 30, ambition: 55, kindness: 40 },
    baseAttributes: { strength: 6, agility: 8, intelligence: 24, luck: 8 },
    skills: ['基因工程', '超能力研究', '迷雾研究', '实验设计', '数据分析', '科学论文写作'],
    behaviorPatterns: [
      { condition: '玩家好感度<30', action: '保持警惕，只回答必要的问题，不透露核心研究秘密', priority: 10 },
      { condition: '玩家好感度30-60', action: '开始合作，分享一些研究成果，但核心技术保密', priority: 8 },
      { condition: '玩家好感度>60', action: '信任玩家，分享所有研究成果，甚至愿意为玩家工作', priority: 5 },
      { condition: '看到新的实验样本时', action: '兴奋，眼睛发亮，立刻开始研究', priority: 7 },
      { condition: '提到先知时', action: '复杂的表情——既有崇拜，又有恐惧', priority: 6 },
      { condition: '研究遇到困难时', action: '执着，不放弃，直到找到解决方案', priority: 9 },
    ],
    relationshipTypes: ['陌生人', '俘虏', '合作者', '朋友', '导师', '敌对'],
    personalQuest: {
      id: 'zhangboshi_quest',
      name: '科学家的救赎',
      description: '张博士是先知的学生和助手，参与了迷雾实验。他对自己的过去感到愧疚，但也对科学有着执着的追求。帮助他找到救赎，或者利用他的知识为自己谋利。',
      stages: [
        {
          stage: 1,
          name: '俘虏的合作',
          description: '张博士被你们抓捕后，起初很不配合。但你发现他对科学有着执着的追求，如果你能给他提供研究条件，他可能会愿意合作。这是一个关于信任和利用的抉择。',
          triggerCondition: '第130天后，抓捕张博士',
          choices: [
            { text: '给他提供研究条件，让他为你们工作', requirement: '智力>20，资源充足', outcome: { relationshipChange: 15, consequence: '你给张博士提供了研究条件，让他为你们工作。张博士很惊讶，然后很开心。他说："谢谢你。我以为我会在监狱里度过余生。"他开始为你们工作，分享了很多进化者组织的研究成果。这些研究成果大大提高了你们的科技水平。', unlocks: ['张博士的合作', '进化者组织研究成果', '科技水平提高'] } },
            { text: '审问他，获取情报', requirement: '智力>18，意志力>18', outcome: { relationshipChange: 5, consequence: '你审问了张博士，获取了很多情报。虽然他有些保留，但你还是获得了很多有价值的信息。这些情报帮助你们更好地了解了进化者组织和迷雾的真相。' } },
            { text: '把他关起来，不给他任何研究条件', outcome: { relationshipChange: -15, consequence: '你把张博士关了起来，不给他任何研究条件。张博士很失望，也很愤怒。他说："你和那些野蛮人没什么区别！"他拒绝和你们合作，什么也不肯说。' } },
          ],
        },
        {
          stage: 2,
          name: '过去的愧疚',
          description: '在合作过程中，张博士逐渐向你敞开心扉。他告诉你他参与迷雾实验的过程，以及他对自己过去的愧疚。他说他当时被先知的智慧和魅力所迷惑，没有意识到实验的后果。等他意识到的时候，已经太晚了。他说他这辈子最对不起的就是那些因为迷雾而死去的人。',
          triggerCondition: '好感度>50，第140天后',
          choices: [
            { text: '告诉他，他可以用研究来弥补过去', outcome: { relationshipChange: 20, consequence: '你告诉张博士，他可以用研究来弥补过去。张博士想了很久，然后点了点头。他说："你说得对。我不能改变过去，但我可以创造未来。"他开始更加积极地研究，致力于找到驱散迷雾和治愈变异的方法。他的研究进展很快，取得了很多重要的突破。', unlocks: ['张博士的救赎', '驱散迷雾研究', '治愈变异研究'] } },
            { text: '问他有没有想过为自己的行为负责', requirement: '智慧>18', outcome: { relationshipChange: 15, consequence: '你问张博士有没有想过为自己的行为负责。张博士沉默了很久，然后说："我一直在想。但我不知道该怎么负责。也许，用我的研究来弥补，就是最好的负责方式。"他开始更加积极地做研究，用自己的方式弥补过去。' } },
            { text: '转移话题，不提这件事', outcome: { relationshipChange: 5, consequence: '你转移了话题，不提这件事。张博士感激地看了你一眼。他知道你不想让他难过。但你也能感觉到，他心里的愧疚还没有完全消除。' } },
          ],
        },
        {
          stage: 3,
          name: '最后的研究',
          description: '在最终决战前，张博士完成了他最重要的研究——一种能暂时削弱先知力量的药剂。他说这种药剂能在关键时刻发挥作用，但制作过程很危险，他自己也在制作过程中受了重伤。他把药剂交给你，说："这是我最后的研究。用它来打败先知，结束这一切。"',
          triggerCondition: '好感度>70，第148天后',
          choices: [
            { text: '感谢他，承诺会用它打败先知', requirement: '魅力>20', outcome: { relationshipChange: 30, consequence: '你感谢了张博士，承诺会用他的药剂打败先知。张博士开心地笑了。他说："谢谢你。能在有生之年看到先知被打败，我就满足了。"在最终决战中，张博士的药剂发挥了关键作用，帮助你们削弱了先知的力量，最终取得了胜利。战后，张博士继续他的研究，致力于治愈变异和重建文明。他说："谢谢你。是你让我找到了救赎。"', unlocks: ['削弱先知的药剂', '最终决战的关键帮助', '张博士的救赎', '张博士的忠诚'] } },
            { text: '怀疑药剂的效果，让他先测试', outcome: { relationshipChange: 10, consequence: '你怀疑药剂的效果，让张博士先测试。张博士有些失望，但还是照做了。测试证明药剂确实有效。但你能感觉到，张博士对你的怀疑有些不满。' } },
            { text: '拒绝使用，你不想依赖他的研究', outcome: { relationshipChange: -15, consequence: '你拒绝使用张博士的药剂。张博士很失望，也很愤怒。他说："你不懂科学！这是我一辈子的心血！"但你坚持自己的决定。在最终决战中，你们没有药剂的帮助，战斗更加艰难。虽然最终还是取得了胜利，但付出了更大的代价。' } },
          ],
        },
      ],
    },
    unlockCondition: { minDay: 130, minPhase: 9 },
    mortality: { canDie: true, deathConditions: ['研究事故', '大事件中保护研究成果', '被进化者组织残余暗杀', '劳累过度病倒'] },
  },
];

/** 根据天数和阶段获取可遇到的NPC */
export function getAvailableNpcs(day: number, phase: number): NpcFullProfile[] {
  return NPC_DEFS.filter(npc =>
    day >= npc.unlockCondition.minDay &&
    phase >= npc.unlockCondition.minPhase
  );
}

// ============================================================
// 五、因果系统配置（事件有因有果，影响传播）
// ============================================================
export interface CausalRelation {
  id: string;
  cause: {
    type: 'action' | 'choice' | 'event' | 'state' | 'npc_action';
    description: string;
    parameters?: Record<string, any>;
  };
  effect: {
    type: 'state_change' | 'event_trigger' | 'npc_relation' | 'unlock' | 'resource_change' | 'attribute_change';
    description: string;
    delay?: number; // 延迟天数（因果不是立即发生的）
    probability?: number; // 发生概率（1=必然）
    parameters?: Record<string, any>;
  };
  // 因果链（这个效果可能触发更多因果）
  chain?: string[]; // 后续因果关系ID
}

export const CAUSAL_RELATIONS: CausalRelation[] = [
  // 资源相关因果
  {
    id: 'starvation_health_decline',
    cause: { type: 'state', description: '食物连续3天不足' },
    effect: { type: 'attribute_change', description: '力量下降，健康恶化', delay: 1, probability: 1, parameters: { strength: -1, health: -10 } },
  },
  {
    id: 'dehydration_sanity_decline',
    cause: { type: 'state', description: '水连续2天不足' },
    effect: { type: 'attribute_change', description: '理智快速下降，出现幻觉', delay: 1, probability: 1, parameters: { sanity: -15, intelligence: -1 } },
  },
  {
    id: 'overexertion_injury',
    cause: { type: 'action', description: '体力耗尽时继续进行高强度行动' },
    effect: { type: 'state_change', description: '受伤，健康下降', probability: 0.7, parameters: { health: -15, status: 'injured' } },
    chain: ['infection_risk'],
  },
  {
    id: 'infection_risk',
    cause: { type: 'state', description: '受伤后未及时处理' },
    effect: { type: 'state_change', description: '伤口感染，健康持续下降', delay: 2, probability: 0.5, parameters: { health: -20, status: 'infected' } },
  },
  // NPC相关因果
  {
    id: 'npc_betrayal_trigger',
    cause: { type: 'state', description: 'NPC好感度低于20，且资源短缺' },
    effect: { type: 'event_trigger', description: 'NPC可能背叛，偷走物资或攻击玩家', delay: 1, probability: 0.3, parameters: { event: 'npc_betrayal' } },
  },
  {
    id: 'npc_loyalty_sacrifice',
    cause: { type: 'state', description: 'NPC好感度高于80，玩家处于致命危险' },
    effect: { type: 'event_trigger', description: 'NPC可能牺牲自己保护玩家', probability: 0.6, parameters: { event: 'npc_sacrifice' } },
  },
  // 探索相关因果
  {
    id: 'deep_explore_danger',
    cause: { type: 'action', description: '在高危险区域长时间探索' },
    effect: { type: 'event_trigger', description: '遭遇强力怪物或异常事件', probability: 0.6, parameters: { event: 'deep_zone_danger' } },
    chain: ['combat_injury_risk'],
  },
  {
    id: 'combat_injury_risk',
    cause: { type: 'event', description: '战斗中受伤' },
    effect: { type: 'state_change', description: '健康下降，可能影响后续行动', probability: 1, parameters: { health: -10 } },
  },
  // 迷雾相关因果
  {
    id: 'long_mist_exposure_sanity',
    cause: { type: 'state', description: '连续在浓厚迷雾中暴露超过3天' },
    effect: { type: 'attribute_change', description: '理智持续下降，可能出现幻觉和幻听', delay: 1, probability: 0.8, parameters: { sanity: -20 } },
    chain: ['hallucination_event'],
  },
  {
    id: 'hallucination_event',
    cause: { type: 'state', description: '理智低于30' },
    effect: { type: 'event_trigger', description: '出现幻觉，可能做出危险行为', probability: 0.5, parameters: { event: 'hallucination' } },
  },
  // 基地相关因果
  {
    id: 'weak_defense_breach',
    cause: { type: 'state', description: '基地防御等级低于兽潮难度' },
    effect: { type: 'event_trigger', description: '兽潮中基地被攻破', probability: 0.7, parameters: { event: 'base_breach' } },
  },
  {
    id: 'strong_defense_reputation',
    cause: { type: 'state', description: '基地防御等级高，成功抵御多次兽潮' },
    effect: { type: 'npc_relation', description: '吸引更多幸存者加入，声望提升', delay: 3, probability: 0.8, parameters: { reputation: 20, npc_influx: true } },
  },
  // ============================================================
  // NPC相关因果关系（具体剧情因果链）
  // ============================================================
  {
    id: 'saved_duoduo_father_repay',
    cause: { type: 'choice', description: '救了朵朵' },
    effect: { type: 'npc_relation', description: '朵朵父亲杜建国后来在关键时刻报恩，提供重要帮助', delay: 50, probability: 0.9, parameters: { npc: 'du_jianguo', affection: 50 } },
    chain: ['dujianguo_joins'],
  },
  {
    id: 'abandoned_duoduo_consequence',
    cause: { type: 'choice', description: '抛弃了朵朵' },
    effect: { type: 'state_change', description: '内心受到谴责，理智持续下降，可能在夜晚听到朵朵的哭声', delay: 3, probability: 0.7, parameters: { sanity: -10, status: 'guilty' } },
    chain: ['hallucination_event'],
  },
  {
    id: 'saved_oldk_loyalty',
    cause: { type: 'choice', description: '救了老K或帮助老K复仇' },
    effect: { type: 'npc_relation', description: '老K成为最忠诚的战友，在关键时刻不惜牺牲自己保护玩家', delay: 10, probability: 0.95, parameters: { npc: 'old_k', affection: 80, loyalty: 'absolute' } },
  },
  {
    id: 'betrayed_oldk_consequence',
    cause: { type: 'choice', description: '背叛了老K' },
    effect: { type: 'event_trigger', description: '老K成为敌人，在后续事件中找玩家复仇', delay: 15, probability: 0.8, parameters: { event: 'oldk_revenge' } },
  },
  {
    id: 'helped_zhang_trade_benefit',
    cause: { type: 'choice', description: '帮助了商人老张' },
    effect: { type: 'resource_change', description: '老张提供稀有商品和重要情报，交易价格优惠', delay: 5, probability: 0.9, parameters: { trade_discount: 0.3, rare_items: true } },
  },
  {
    id: 'cheated_zhang_consequence',
    cause: { type: 'choice', description: '欺骗了商人老张' },
    effect: { type: 'npc_relation', description: '老张断绝贸易关系，其他商人也对玩家提高警惕', delay: 3, probability: 0.85, parameters: { trade_penalty: 0.5, reputation: -20 } },
  },
  {
    id: 'treated_doctor_well_research',
    cause: { type: 'choice', description: '善待陈静医生，支持她的研究' },
    effect: { type: 'unlock', description: '陈静研究出治疗迷雾感染的方法，解锁医疗科技', delay: 20, probability: 0.8, parameters: { unlock: 'mist_cure', tech: 'medicine' } },
  },
  {
    id: 'ignored_doctor_consequence',
    cause: { type: 'choice', description: '忽视陈静医生的警告' },
    effect: { type: 'state_change', description: '迷雾感染扩散，基地成员健康下降', delay: 10, probability: 0.7, parameters: { health: -15, infection_rate: 0.3 } },
  },
  {
    id: 'trained_with_zhou_skills',
    cause: { type: 'action', description: '和老周一起狩猎训练' },
    effect: { type: 'attribute_change', description: '学习老周的狩猎技巧，敏捷和力量提升', delay: 0, probability: 1, parameters: { agility: 1, strength: 1, skill: 'hunting' } },
  },
  {
    id: 'helped_yang_invention',
    cause: { type: 'choice', description: '支持小杨的发明研究' },
    effect: { type: 'unlock', description: '小杨发明出战车和迷雾驱散装置，解锁工程科技', delay: 30, probability: 0.85, parameters: { unlock: 'battle_vehicle', tech: 'engineering' } },
  },
  {
    id: 'saved_xiaoyu_trust',
    cause: { type: 'choice', description: '救了林小雨或帮助她' },
    effect: { type: 'npc_relation', description: '林小雨成为坚定盟友，希望号安全区提供军事支持', delay: 10, probability: 0.9, parameters: { npc: 'lin_xiaoyu', affection: 60, military_support: true } },
  },
  {
    id: 'respected_zhao_alliance',
    cause: { type: 'choice', description: '尊重赵明，与希望号建立平等联盟' },
    effect: { type: 'npc_relation', description: '赵明深度信任，希望号与玩家势力合并，人口和资源大幅增加', delay: 40, probability: 0.8, parameters: { npc: 'zhao_ming', affection: 70, merge: true } },
  },
  {
    id: 'disrespected_zhao_conflict',
    cause: { type: 'choice', description: '轻视赵明或试图吞并希望号' },
    effect: { type: 'event_trigger', description: '希望号与玩家势力敌对，爆发冲突战争', delay: 20, probability: 0.75, parameters: { event: 'hope_ship_war' } },
  },
  {
    id: 'befriended_tieshan_brother',
    cause: { type: 'choice', description: '与铁山建立兄弟关系' },
    effect: { type: 'npc_relation', description: '铁山带领钢铁兄弟会全力支持，军事力量大幅增强', delay: 15, probability: 0.9, parameters: { npc: 'tie_shan', affection: 80, military_boost: 0.5 } },
  },
  {
    id: 'defeated_tieshan_submit',
    cause: { type: 'action', description: '在战斗中击败铁山' },
    effect: { type: 'npc_relation', description: '铁山臣服，钢铁兄弟会成为附庸势力', delay: 0, probability: 0.85, parameters: { npc: 'tie_shan', affection: 40, submit: true } },
  },
  {
    id: 'allied_with_linying_power',
    cause: { type: 'choice', description: '与林鹰的自由联盟建立深度联盟' },
    effect: { type: 'npc_relation', description: '自由联盟提供强大军事支持，成为迷雾世界最强大的联盟', delay: 20, probability: 0.85, parameters: { npc: 'lin_ying', affection: 60, super_alliance: true } },
  },
  {
    id: 'trusted_laohuli_intel',
    cause: { type: 'choice', description: '信任老狐狸，与他建立长期合作' },
    effect: { type: 'unlock', description: '老狐狸提供关键情报和稀有物资，在关键时刻预警危险', delay: 10, probability: 0.9, parameters: { intel: true, rare_supply: true, early_warning: true } },
  },
  {
    id: 'converted_blackcrow_ally',
    cause: { type: 'choice', description: '感化黑鸦，让进化者残余成为盟友' },
    effect: { type: 'npc_relation', description: '黑鸦带领超能力者加入，超能力战力大幅增强', delay: 15, probability: 0.85, parameters: { npc: 'black_crow', affection: 60, superpower_boost: 0.5 } },
  },
  {
    id: 'killed_blackcrow_chaos',
    cause: { type: 'action', description: '杀死黑鸦，消灭进化者残余' },
    effect: { type: 'state_change', description: '进化者残余四散，部分成为流寇，部分被其他势力收编', delay: 5, probability: 0.8, parameters: { chaos: true, remnant_scatter: true } },
  },
  {
    id: 'negotiated_prophet_peace',
    cause: { type: 'choice', description: '与先知谈判，和平解决' },
    effect: { type: 'unlock', description: '先知成为顾问，提供全部知识和技术，解锁隐藏结局', delay: 0, probability: 0.9, parameters: { advisor: true, all_knowledge: true, hidden_ending: 'love_evolution' } },
  },
  {
    id: 'destroyed_prophet_freedom',
    cause: { type: 'action', description: '消灭先知的核心意识' },
    effect: { type: 'state_change', description: '迷雾开始消散，人类获得自由，但失去了先知的知识', delay: 10, probability: 0.95, parameters: { mist_dispersal: true, freedom: true, lost_knowledge: true } },
  },
  {
    id: 'inherited_prophet_power',
    cause: { type: 'choice', description: '继承先知的力量和意志' },
    effect: { type: 'unlock', description: '成为新的迷雾之主，获得强大力量，但承担巨大责任', delay: 0, probability: 0.9, parameters: { mist_lord: true, great_power: true, great_responsibility: true, ending: 'E16' } },
  },
  // ============================================================
  // 基地建设相关因果关系
  // ============================================================
  {
    id: 'built_farm_food_surplus',
    cause: { type: 'action', description: '建造并升级农田' },
    effect: { type: 'resource_change', description: '食物充足，NPC好感度提升，吸引更多幸存者加入', delay: 5, probability: 0.9, parameters: { food_surplus: true, npc_affection: 10, population_growth: true } },
  },
  {
    id: 'built_infirmary_health_improve',
    cause: { type: 'action', description: '建造并升级医疗室' },
    effect: { type: 'state_change', description: '伤病恢复速度提升，疾病死亡率下降，NPC存活率提高', delay: 3, probability: 0.95, parameters: { healing_speed: 1.5, disease_death_rate: -0.5, npc_survival: true } },
  },
  {
    id: 'built_workshop_tech_progress',
    cause: { type: 'action', description: '建造并升级工坊' },
    effect: { type: 'unlock', description: '解锁更多制造配方，武器装备品质提升，迷雾积分收入增加', delay: 5, probability: 0.9, parameters: { crafting_unlock: true, weapon_quality: 1, points_income: true } },
  },
  {
    id: 'built_wall_defense_strong',
    cause: { type: 'action', description: '建造并升级围墙' },
    effect: { type: 'state_change', description: '基地防御力大幅提升，兽潮伤亡减少，声望提升', delay: 3, probability: 0.95, parameters: { defense: 2, beast_wave_casualties: -0.5, reputation: 10 } },
  },
  {
    id: 'built_library_research_boost',
    cause: { type: 'action', description: '建造并升级图书室' },
    effect: { type: 'attribute_change', description: '研究速度提升，智力属性增长加快，解锁更多科技', delay: 7, probability: 0.85, parameters: { research_speed: 1.5, intelligence_growth: 1, tech_unlock: true } },
  },
  {
    id: 'built_barracks_military_strong',
    cause: { type: 'action', description: '建造并升级兵营' },
    effect: { type: 'state_change', description: '战士战斗力提升，训练速度加快，军事力量增强', delay: 5, probability: 0.9, parameters: { combat_power: 1.3, training_speed: 1.5, military_strength: true } },
  },
  {
    id: 'built_altar_awakening',
    cause: { type: 'action', description: '建造迷雾祭坛室' },
    effect: { type: 'unlock', description: '觉醒进度加速，可能觉醒超能力，但理智流失加快', delay: 10, probability: 0.8, parameters: { awakening_speed: 2, superpower: true, sanity_drain: 1.5 } },
  },
  {
    id: 'neglect_base_decay',
    cause: { type: 'state', description: '长期不维护基地设施' },
    effect: { type: 'state_change', description: '基地设施老化损坏，防御力下降，NPC不满情绪增加', delay: 15, probability: 0.7, parameters: { facility_decay: true, defense: -1, npc_dissatisfaction: true } },
  },
  // ============================================================
  // 探索相关因果关系
  // ============================================================
  {
    id: 'explored_ruins_loot',
    cause: { type: 'action', description: '探索废墟区域' },
    effect: { type: 'resource_change', description: '发现物资和物品，可能找到有价值的东西', delay: 0, probability: 0.8, parameters: { loot: true, random_items: true } },
  },
  {
    id: 'explored_deep_forest_danger',
    cause: { type: 'action', description: '深入迷雾森林' },
    effect: { type: 'event_trigger', description: '遭遇强大野兽或变异生物，可能获得稀有材料', delay: 0, probability: 0.7, parameters: { event: 'deep_forest_danger', rare_materials: true } },
  },
  {
    id: 'explored_research_lab_truth',
    cause: { type: 'action', description: '探索废弃研究所' },
    effect: { type: 'unlock', description: '发现迷雾真相的线索，解锁研究资料和科技', delay: 0, probability: 0.85, parameters: { truth_clue: true, research_data: true, tech_unlock: true } },
  },
  {
    id: 'explored_military_base_weapons',
    cause: { type: 'action', description: '探索军方基地' },
    effect: { type: 'resource_change', description: '发现武器弹药和军事装备，大幅提升战斗力', delay: 0, probability: 0.8, parameters: { weapons: true, ammo: true, military_gear: true, combat_boost: 0.3 } },
  },
  {
    id: 'explored_mist_altar_power',
    cause: { type: 'action', description: '探索迷雾祭坛' },
    effect: { type: 'unlock', description: '获得迷雾晶石和神秘力量，可能觉醒或强化超能力，但理智流失', delay: 0, probability: 0.75, parameters: { mist_crystal: true, mystic_power: true, awakening: true, sanity_drain: true } },
  },
  {
    id: 'explored_anomaly_insanity',
    cause: { type: 'action', description: '探索异常区域' },
    effect: { type: 'state_change', description: '看到不可能的景象，理智大幅流失，可能获得特殊能力或物品', delay: 0, probability: 0.7, parameters: { sanity: -20, special_ability: true, rare_items: true } },
    chain: ['hallucination_event'],
  },
  {
    id: 'explored_mist_core_truth_complete',
    cause: { type: 'action', description: '到达迷雾核心' },
    effect: { type: 'unlock', description: '发现迷雾的完整真相，解锁最终结局分支', delay: 0, probability: 0.95, parameters: { complete_truth: true, final_ending: true, special_item: 'mist_core' } },
  },
  {
    id: 'reckless_exploration_death',
    cause: { type: 'action', description: '在低血量或低理智时深入危险区域' },
    effect: { type: 'state_change', description: '遭遇致命危险，可能重伤或死亡', delay: 0, probability: 0.6, parameters: { health: -30, death_risk: true } },
  },
  // ============================================================
  // 道德选择相关因果关系
  // ============================================================
  {
    id: 'helped_stranger_reputation',
    cause: { type: 'choice', description: '无私帮助陌生幸存者' },
    effect: { type: 'npc_relation', description: '声望提升，更多幸存者愿意加入，NPC好感度普遍提升', delay: 3, probability: 0.9, parameters: { reputation: 15, population_growth: true, npc_affection: 5 } },
  },
  {
    id: 'robbed_stranger_infamy',
    cause: { type: 'choice', description: '抢劫或伤害无辜幸存者' },
    effect: { type: 'npc_relation', description: '恶名传播，幸存者避而远之，NPC好感度下降，可能被追杀', delay: 5, probability: 0.85, parameters: { infamy: 20, population_decline: true, npc_affection: -15, bounty: true } },
  },
  {
    id: 'shared_food_loyalty',
    cause: { type: 'choice', description: '在资源短缺时分享食物给同伴' },
    effect: { type: 'npc_relation', description: '同伴忠诚度大幅提升，在关键时刻愿意牺牲自己保护玩家', delay: 0, probability: 0.95, parameters: { loyalty: 30, sacrifice_willingness: true } },
  },
  {
    id: 'hoarded_food_betrayal',
    cause: { type: 'choice', description: '在资源短缺时囤积食物，不顾同伴死活' },
    effect: { type: 'event_trigger', description: '同伴不满，可能背叛或离开，团队凝聚力下降', delay: 3, probability: 0.75, parameters: { event: 'npc_betrayal', team_cohesion: -30 } },
  },
  {
    id: 'kept_promise_trust',
    cause: { type: 'choice', description: '信守承诺，完成对NPC的承诺' },
    effect: { type: 'npc_relation', description: 'NPC信任度大幅提升，愿意分享更多秘密和资源', delay: 0, probability: 0.9, parameters: { trust: 25, secrets: true, resources: true } },
  },
  {
    id: 'broke_promise_distrust',
    cause: { type: 'choice', description: '违背承诺，欺骗NPC' },
    effect: { type: 'npc_relation', description: 'NPC信任度大幅下降，可能报复或散布负面消息', delay: 3, probability: 0.85, parameters: { trust: -30, revenge: true, negative_rumor: true } },
  },
  {
    id: 'spared_enemy_mercy',
    cause: { type: 'choice', description: '放过投降的敌人' },
    effect: { type: 'npc_relation', description: '仁慈之名传播，部分敌人可能归降，声望提升', delay: 5, probability: 0.7, parameters: { mercy_reputation: 15, enemy_surrender: true, population_growth: true } },
  },
  {
    id: 'executed_enemy_fear',
    cause: { type: 'choice', description: '处决投降的敌人' },
    effect: { type: 'npc_relation', description: '恐惧之名传播，敌人战斗更加顽强，部分幸存者恐惧离开', delay: 3, probability: 0.8, parameters: { fear_reputation: 20, enemy_morale: 0.3, population_decline: true } },
  },
  // ============================================================
  // 资源管理相关因果关系
  // ============================================================
  {
    id: 'overtrained_injury',
    cause: { type: 'action', description: '体力耗尽时继续高强度训练或战斗' },
    effect: { type: 'state_change', description: '过度疲劳导致受伤，健康下降，可能留下后遗症', delay: 0, probability: 0.7, parameters: { health: -15, status: 'injured', fatigue: true } },
    chain: ['infection_risk'],
  },
  {
    id: 'ignored_injury_infection',
    cause: { type: 'state', description: '受伤后不及时治疗' },
    effect: { type: 'state_change', description: '伤口感染，健康持续下降，可能导致死亡', delay: 3, probability: 0.6, parameters: { health: -25, status: 'infected', death_risk: true } },
  },
  {
    id: 'low_sanity_hallucination',
    cause: { type: 'state', description: '理智长期低于30' },
    effect: { type: 'event_trigger', description: '出现幻觉和幻听，可能做出危险行为，甚至走进迷雾深处', delay: 1, probability: 0.6, parameters: { event: 'hallucination', dangerous_behavior: true, death_risk: true } },
  },
  {
    id: 'good_rest_recovery',
    cause: { type: 'action', description: '在安全的庇护所充分休息' },
    effect: { type: 'state_change', description: '健康和体力快速恢复，理智恢复，状态提升', delay: 0, probability: 0.95, parameters: { health: 15, energy: 30, sanity: 10, status: 'rested' } },
  },
  {
    id: 'balanced_diet_health',
    cause: { type: 'state', description: '长期保持食物和水的充足供应' },
    effect: { type: 'attribute_change', description: '身体素质提升，力量和耐力增长，疾病抵抗力增强', delay: 10, probability: 0.8, parameters: { strength: 1, endurance: 1, disease_resistance: 0.3 } },
  },
  {
    id: 'starvation_decline',
    cause: { type: 'state', description: '长期食物不足' },
    effect: { type: 'attribute_change', description: '身体素质下降，力量和耐力减少，疾病抵抗力降低', delay: 7, probability: 0.85, parameters: { strength: -1, endurance: -1, disease_resistance: -0.3, health: -10 } },
  },
  {
    id: 'dehydration_decline',
    cause: { type: 'state', description: '长期饮水不足' },
    effect: { type: 'attribute_change', description: '身体机能下降，理智和敏捷减少，可能出现幻觉', delay: 3, probability: 0.9, parameters: { sanity: -15, agility: -1, hallucination: true, health: -10 } },
  },
  {
    id: 'wealthy_trade_opportunities',
    cause: { type: 'state', description: '积累大量迷雾积分和物资' },
    effect: { type: 'unlock', description: '解锁高级贸易和特殊商品，商人主动来访，获得稀有物品', delay: 5, probability: 0.8, parameters: { advanced_trade: true, special_goods: true, merchant_visit: true, rare_items: true } },
  },
  {
    id: 'poverty_vulnerability',
    cause: { type: 'state', description: '长期资源匮乏，积分不足' },
    effect: { type: 'state_change', description: '无法购买关键物资，在危机中更加脆弱，NPC可能离开', delay: 10, probability: 0.7, parameters: { vulnerability: true, npc_leaving: true, crisis_risk: true } },
  },
];

/** 检查因果关系是否触发 */
export function checkCausalRelations(causeType: string, description: string): CausalRelation[] {
  return CAUSAL_RELATIONS.filter(c =>
    c.cause.type === causeType &&
    c.cause.description.includes(description)
  );
}

// ============================================================
// 六、成长方向系统（六大成长方向）
// ============================================================
export interface GrowthPath {
  id: string;
  name: string;
  description: string;
  coreActions: string[]; // 核心行动
  primaryAttributes: string[]; // 主要提升的属性
  advantages: string[]; // 优势
  disadvantages: string[]; // 劣势
  majorEventBonus: Record<string, number>; // 各大事件中的优势倍率
  uniqueUnlocks: string[]; // 独特解锁内容
}

export const GROWTH_PATHS: GrowthPath[] = [
  {
    id: 'combat',
    name: '战斗型',
    description: '专注于提升战斗力，以力破局。在战斗和兽潮中如鱼得水，但资源管理和社交可能是短板。',
    coreActions: ['锻炼', '狩猎', '战斗', '武器强化'],
    primaryAttributes: ['strength', 'agility'],
    advantages: ['战斗伤害高', '兽潮轻松', '击杀奖励多', '可探索高危险区域'],
    disadvantages: ['资源消耗大', '受伤风险高', '社交能力弱', '基地建设慢'],
    majorEventBonus: { beast_wave_1: 1.5, elite_monster: 1.5, faction_war: 1.3, final_boss: 1.2 },
    uniqueUnlocks: ['战斗大师称号', '特殊武器', '近战专精', '狂暴技能'],
  },
  {
    id: 'survival',
    name: '生存型',
    description: '专注于资源收集和生存技能，稳扎稳打。资源永远充足，容错率高，但战斗力可能不足。',
    coreActions: ['搜寻', '采集', '制作', '种植'],
    primaryAttributes: ['intelligence', 'luck'],
    advantages: ['资源充足', '容错率高', '制作能力强', '不易饿死渴死'],
    disadvantages: ['战斗力弱', '大事件可能吃力', '探索危险区域困难'],
    majorEventBonus: { beast_wave_1: 1.0, group_crisis: 1.3, base_defense: 1.5, internal_rebellion: 1.2 },
    uniqueUnlocks: ['生存专家称号', '特殊制作配方', '农业技术', '资源探测'],
  },
  {
    id: 'social',
    name: '社交型',
    description: '专注于与人交往，建立人脉和联盟。朋友多了路好走，但过度依赖他人可能在背叛时崩溃。',
    coreActions: ['NPC互动', '交易', '谈判', '帮助他人'],
    primaryAttributes: ['intelligence', 'luck'],
    advantages: ['NPC好感度高', '盟友多', '交易有利', '情报来源广'],
    disadvantages: ['个人战斗力弱', '被背叛时损失大', '资源可能被盟友消耗'],
    majorEventBonus: { group_crisis: 1.5, faction_encounter: 1.5, internal_rebellion: 1.5, alliance_war: 1.3 },
    uniqueUnlocks: ['人脉大师称号', '特殊NPC剧情', '外交技能', '情报网络'],
  },
  {
    id: 'explorer',
    name: '探索型',
    description: '专注于探索迷雾，发现秘密和宝藏。可能找到捷径和神器，但也可能踏入致命危险。',
    coreActions: ['探索废墟', '深入迷雾', '研究地图', '发现新区域'],
    primaryAttributes: ['agility', 'intelligence'],
    advantages: ['发现特殊物品', '解锁隐藏区域', '获得真相线索', '可能找到捷径'],
    disadvantages: ['危险系数高', '容易受伤或死亡', '资源不稳定'],
    majorEventBonus: { elite_monster: 1.2, mist_altar: 1.5, research_lab: 1.5, final_boss: 1.3 },
    uniqueUnlocks: ['探索者称号', '隐藏地图', '特殊物品', '真相线索'],
  },
  {
    id: 'builder',
    name: '基地型',
    description: '专注于基地建设和防御，固若金汤。防御战轻松，但机动性差，可能错过外部机会。',
    coreActions: ['建设基地', '升级防御', '生产制造', '训练成员'],
    primaryAttributes: ['strength', 'intelligence'],
    advantages: ['基地防御强', '防御战轻松', '生产能力强', '成员训练有素'],
    disadvantages: ['机动性差', '资源消耗大', '可能错过外部机会'],
    majorEventBonus: { beast_wave_1: 1.5, large_beast_wave: 1.8, base_defense: 2.0, faction_war: 1.3 },
    uniqueUnlocks: ['建筑师称号', '特殊建筑', '防御工事', '训练设施'],
  },
  {
    id: 'mystic',
    name: '神秘型',
    description: '专注于研究迷雾的秘密，追求真相和力量。可能获得超凡能力，但理智风险极高。',
    coreActions: ['研究迷雾', '探索异常区域', '使用迷雾结晶', '觉醒能力'],
    primaryAttributes: ['intelligence', 'luck'],
    advantages: ['可能觉醒特殊能力', '了解迷雾真相', '特殊结局分支', '迷雾区域适应力强'],
    disadvantages: ['理智流失快', '容易疯狂', '风险极高', '可能被迷雾吞噬'],
    majorEventBonus: { mist_altar: 1.8, anomaly_zone: 1.8, research_lab: 1.5, final_boss: 1.5 },
    uniqueUnlocks: ['觉醒者称号', '特殊能力', '真相线', '神秘结局'],
  },
];

/** 计算玩家的成长方向倾向 */
export function calculateGrowthPath(state: any): { path: GrowthPath; score: number }[] {
  const scores: { path: GrowthPath; score: number }[] = [];
  for (const path of GROWTH_PATHS) {
    let score = 0;
    // 根据属性计算
    for (const attr of path.primaryAttributes) {
      score += (state.attributes?.[attr] ?? 5) * 2;
    }
    // 根据行动历史计算（简化）
    scores.push({ path, score });
  }
  return scores.sort((a, b) => b.score - a.score);
}

// ============================================================
// 七、属性系统公式（保留并扩展）
// ============================================================
export interface AttributeFormula {
  strengthDamageMultiplier: number;
  weaponDamageMultiplier: number;
  maxDodgeChance: number;
  dodgePerAgility: number;
  baseHitChance: number;
  hitPerAgility: number;
  checkPerIntelligence: number;
  baseCritChance: number;
  critPerLuck: number;
  dropPerLuck: number;
  // 新增
  sanityDrainPerIntelligence: number; // 智力越高理智流失越慢
  healthPerStrength: number; // 力量越高生命上限越高
  energyPerAgility: number; // 敏捷越高体力上限越高
}

export const ATTRIBUTE_FORMULA: AttributeFormula = {
  strengthDamageMultiplier: 1.5,
  weaponDamageMultiplier: 1.0,
  maxDodgeChance: 0.5,
  dodgePerAgility: 0.02,
  baseHitChance: 0.7,
  hitPerAgility: 0.01,
  checkPerIntelligence: 0.005,
  baseCritChance: 0.05,
  critPerLuck: 0.01,
  dropPerLuck: 0.02,
  sanityDrainPerIntelligence: 0.05,
  healthPerStrength: 5,
  energyPerAgility: 3,
};

export function calculateMeleeDamage(strength: number, weaponAttack: number, skillMultiplier: number = 1): number {
  const base = strength * ATTRIBUTE_FORMULA.strengthDamageMultiplier;
  const weapon = weaponAttack * (1 + strength / 20);
  return Math.floor((base + weapon) * skillMultiplier);
}

export function calculateDodgeChance(agility: number): number {
  return Math.min(ATTRIBUTE_FORMULA.maxDodgeChance, agility * ATTRIBUTE_FORMULA.dodgePerAgility);
}

export function calculateHitChance(agility: number, targetAgility: number): number {
  return Math.min(0.95, Math.max(0.3,
    ATTRIBUTE_FORMULA.baseHitChance +
    agility * ATTRIBUTE_FORMULA.hitPerAgility -
    targetAgility * ATTRIBUTE_FORMULA.hitPerAgility
  ));
}

export function calculateCheckBonus(intelligence: number): number {
  return intelligence * ATTRIBUTE_FORMULA.checkPerIntelligence * 100;
}

export function calculateCritChance(luck: number, skillBonus: number = 0): number {
  return Math.min(0.5, ATTRIBUTE_FORMULA.baseCritChance + luck * ATTRIBUTE_FORMULA.critPerLuck + skillBonus);
}

export function calculateDropMultiplier(luck: number): number {
  return 1 + luck * ATTRIBUTE_FORMULA.dropPerLuck;
}

/** 计算理智流失（智力越高越慢） */
export function calculateSanityDrain(baseDrain: number, intelligence: number): number {
  return Math.max(1, baseDrain * (1 - intelligence * ATTRIBUTE_FORMULA.sanityDrainPerIntelligence));
}

/** 计算生命上限 */
export function calculateHealthMax(strength: number, level: number): number {
  return 100 + strength * ATTRIBUTE_FORMULA.healthPerStrength + level * 10;
}

/** 计算体力上限 */
export function calculateEnergyMax(agility: number, level: number): number {
  return 100 + agility * ATTRIBUTE_FORMULA.energyPerAgility + level * 5;
}

// ============================================================
// 八、等级与经验系统（保留）
// ============================================================
export interface LevelConfig {
  baseExp: number;
  expGrowth: number;
  maxLevel: number;
  healthPerLevel: number;
  attributePointsPerLevel: number;
  skillPointsPerLevel: number;
}

export const LEVEL_CONFIG: LevelConfig = {
  baseExp: 100,
  expGrowth: 1.5,
  maxLevel: 50,
  healthPerLevel: 10,
  attributePointsPerLevel: 1,
  skillPointsPerLevel: 1,
};

export function calculateExpRequired(level: number): number {
  return Math.floor(LEVEL_CONFIG.baseExp * Math.pow(level, LEVEL_CONFIG.expGrowth));
}

export function calculateCombatExp(enemyLevel: number, victory: boolean): number {
  if (!victory) return Math.floor(enemyLevel * 5);
  return Math.floor(enemyLevel * 20 + 10);
}

export function calculateExploreExp(day: number): number {
  return Math.floor(5 + day * 0.5);
}

// ============================================================
// 九、货币与积分系统（保留并扩展）
// ============================================================
export interface CurrencyConfig {
  combatRewardBase: number;
  combatRewardPerLevel: number;
  exploreRewardBase: number;
  questRewardBase: number;
  buyMultiplier: number;
  sellMultiplier: number;
  baseUpgradeCostMultiplier: number;
  // 新增：晶核系统
  crystalDropChance: number;
  crystalValueBase: number;
}

export const CURRENCY_CONFIG: CurrencyConfig = {
  combatRewardBase: 10,
  combatRewardPerLevel: 5,
  exploreRewardBase: 3,
  questRewardBase: 50,
  buyMultiplier: 1.3,
  sellMultiplier: 0.6,
  baseUpgradeCostMultiplier: 2.0,
  crystalDropChance: 0.3,
  crystalValueBase: 20,
};

export function calculateCombatPoints(enemyLevel: number, luck: number): number {
  const base = CURRENCY_CONFIG.combatRewardBase + enemyLevel * CURRENCY_CONFIG.combatRewardPerLevel;
  return Math.floor(base * calculateDropMultiplier(luck));
}

/** 计算晶核价值 */
export function calculateCrystalValue(crystalLevel: number): number {
  return Math.floor(CURRENCY_CONFIG.crystalValueBase * Math.pow(1.5, crystalLevel - 1));
}

// ============================================================
// 十、基地/木屋系统（保留并扩展）
// ============================================================
export interface BaseConfig {
  maxLevel: number;
  upgradeResourceBase: Record<string, number>;
  upgradeGrowth: number;
  restHealthPerLevel: number;
  restEnergyPerLevel: number;
  storagePerLevel: number;
  defensePerLevel: number;
  productionPerLevel: number;
  // 新增：建筑系统
  buildings: BuildingDef[];
}

export interface BuildingDef {
  id: string;
  name: string;
  description: string;
  maxLevel: number;
  cost: Record<string, number>;
  effects: Record<string, number>;
  unlockPhase: number;
}

export const BASE_CONFIG: BaseConfig = {
  maxLevel: 10,
  upgradeResourceBase: { wood: 20, stone: 10, metal: 5 },
  upgradeGrowth: 2.0,
  restHealthPerLevel: 2,
  restEnergyPerLevel: 3,
  storagePerLevel: 50,
  defensePerLevel: 10,
  productionPerLevel: 5,
  buildings: [
    { id: 'wall', name: '围墙', description: '保护基地免受野兽侵袭', maxLevel: 5, cost: { wood: 30, stone: 20 }, effects: { defense: 20 }, unlockPhase: 1 },
    { id: 'farm', name: '农田', description: '种植食物，实现自给自足', maxLevel: 5, cost: { wood: 20, water: 10 }, effects: { food_production: 5 }, unlockPhase: 2 },
    { id: 'workshop', name: '工坊', description: '制作武器和工具', maxLevel: 5, cost: { wood: 40, metal: 20 }, effects: { crafting: 1 }, unlockPhase: 2 },
    { id: 'infirmary', name: '医疗室', description: '治疗伤病，恢复健康', maxLevel: 5, cost: { wood: 30, medicine: 10 }, effects: { healing: 10 }, unlockPhase: 3 },
    { id: 'watchtower', name: '瞭望塔', description: '提前发现危险，增加警戒范围', maxLevel: 3, cost: { wood: 50, stone: 30 }, effects: { detection: 1 }, unlockPhase: 3 },
    { id: 'library', name: '图书室', description: '研究迷雾和技术，提升智力', maxLevel: 3, cost: { wood: 40, paper: 20 }, effects: { research: 1 }, unlockPhase: 4 },
    { id: 'barracks', name: '兵营', description: '训练战斗人员，提升战斗力', maxLevel: 5, cost: { wood: 60, metal: 30 }, effects: { training: 1 }, unlockPhase: 5 },
    { id: 'altar_room', name: '迷雾祭坛室', description: '研究迷雾的力量，可能觉醒能力', maxLevel: 3, cost: { stone: 50, mist_crystal: 5 }, effects: { mystic_research: 1 }, unlockPhase: 6 },
  ],
};

export function calculateBaseUpgradeCost(currentLevel: number): Record<string, number> {
  const cost: Record<string, number> = {};
  const multiplier = Math.pow(BASE_CONFIG.upgradeGrowth, currentLevel);
  for (const [item, base] of Object.entries(BASE_CONFIG.upgradeResourceBase)) {
    cost[item] = Math.floor(base * multiplier);
  }
  return cost;
}

export function calculateBaseRest(baseLevel: number): { health: number; energy: number; sanity: number } {
  return {
    health: 5 + baseLevel * BASE_CONFIG.restHealthPerLevel,
    energy: 10 + baseLevel * BASE_CONFIG.restEnergyPerLevel,
    sanity: 3 + baseLevel,
  };
}

/** 计算基地总防御力（含建筑） */
export function calculateBaseDefense(baseLevel: number, buildings: Record<string, number>): number {
  let defense = baseLevel * BASE_CONFIG.defensePerLevel;
  for (const [buildingId, level] of Object.entries(buildings)) {
    const def = BASE_CONFIG.buildings.find(b => b.id === buildingId);
    if (def?.effects.defense) {
      defense += def.effects.defense * level;
    }
  }
  return defense;
}

// ============================================================
// 十一、武器与装备系统（保留并扩展，添加神话品质）
// ============================================================
export type ItemQuality = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';

export interface QualityConfig {
  name: string;
  color: string;
  damageMultiplier: number;
  durabilityMultiplier: number;
  upgradeCostMultiplier: number;
  dropChance: number; // 掉落概率
}

export const QUALITY_CONFIG: Record<ItemQuality, QualityConfig> = {
  common: { name: '普通', color: '#9ca3af', damageMultiplier: 1.0, durabilityMultiplier: 1.0, upgradeCostMultiplier: 1.0, dropChance: 0.5 },
  uncommon: { name: '精良', color: '#22c55e', damageMultiplier: 1.3, durabilityMultiplier: 1.2, upgradeCostMultiplier: 1.5, dropChance: 0.25 },
  rare: { name: '稀有', color: '#3b82f6', damageMultiplier: 1.6, durabilityMultiplier: 1.5, upgradeCostMultiplier: 2.0, dropChance: 0.13 },
  epic: { name: '史诗', color: '#a855f7', damageMultiplier: 2.0, durabilityMultiplier: 2.0, upgradeCostMultiplier: 3.0, dropChance: 0.07 },
  legendary: { name: '传说', color: '#f59e0b', damageMultiplier: 2.5, durabilityMultiplier: 3.0, upgradeCostMultiplier: 5.0, dropChance: 0.03 },
  mythic: { name: '神话', color: '#ef4444', damageMultiplier: 3.5, durabilityMultiplier: 5.0, upgradeCostMultiplier: 10.0, dropChance: 0.01 },
};

export function calculateWeaponDamage(baseAttack: number, quality: ItemQuality, enhanceLevel: number = 0): number {
  const qualityMult = QUALITY_CONFIG[quality].damageMultiplier;
  const enhanceBonus = enhanceLevel * 2;
  return Math.floor(baseAttack * qualityMult + enhanceBonus);
}

/** 随机获取装备品质（受幸运影响） */
export function rollItemQuality(luck: number, rng: () => number): ItemQuality {
  const roll = rng();
  const luckBonus = luck * 0.005; // 每点幸运增加0.5%稀有度
  let cumulative = 0;
  const qualities: ItemQuality[] = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'mythic'];
  for (const q of qualities) {
    cumulative += QUALITY_CONFIG[q].dropChance + (q !== 'common' ? luckBonus : 0);
    if (roll < cumulative) return q;
  }
  return 'common';
}

// ============================================================
// 十二、称号系统（保留并扩展）
// ============================================================
export interface TitleDef {
  id: string;
  name: string;
  description: string;
  unlockCondition: {
    type: 'achievement' | 'day' | 'combat' | 'explore' | 'special' | 'npc' | 'phase';
    value: number | string;
  };
  bonuses: {
    strength?: number;
    agility?: number;
    intelligence?: number;
    luck?: number;
    health?: number;
    damageMultiplier?: number;
    defenseMultiplier?: number;
    sanityRegen?: number;
  };
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const TITLES: TitleDef[] = [
  // 基础称号
  { id: 'first_blood', name: '初次见血', description: '击杀第一只迷雾野兽', unlockCondition: { type: 'combat', value: 1 }, bonuses: { strength: 1, damageMultiplier: 0.05 }, rarity: 'common' },
  { id: 'fog_seven_days', name: '迷雾七日', description: '存活到第7天', unlockCondition: { type: 'day', value: 7 }, bonuses: { health: 10 }, rarity: 'common' },
  { id: 'beast_slayer', name: '屠兽者', description: '累计击杀10只野兽', unlockCondition: { type: 'combat', value: 10 }, bonuses: { strength: 3, damageMultiplier: 0.1 }, rarity: 'rare' },
  { id: 'explorer', name: '探索者', description: '访问10个不同场景', unlockCondition: { type: 'explore', value: 10 }, bonuses: { agility: 2, luck: 2 }, rarity: 'common' },
  { id: 'fog_thirty_days', name: '雾海一月', description: '存活到第30天', unlockCondition: { type: 'day', value: 30 }, bonuses: { health: 20, damageMultiplier: 0.15, defenseMultiplier: 0.15 }, rarity: 'rare' },
  { id: 'beast_wave_survivor', name: '兽潮征服者', description: '成功防御第一次兽潮', unlockCondition: { type: 'special', value: 'beast_wave_1' }, bonuses: { defenseMultiplier: 0.2, health: 15 }, rarity: 'rare' },
  { id: 'truth_seeker', name: '真相追寻者', description: '发现迷雾真相', unlockCondition: { type: 'special', value: 'truth_seen' }, bonuses: { intelligence: 5, luck: 3 }, rarity: 'epic' },
  // 新增称号
  { id: 'solo_survivor', name: '独行者', description: '独自存活14天', unlockCondition: { type: 'day', value: 14 }, bonuses: { agility: 3, luck: 2, sanityRegen: 1 }, rarity: 'common' },
  { id: 'leader', name: '领导者', description: '拥有5名以上同伴', unlockCondition: { type: 'npc', value: 5 }, bonuses: { intelligence: 3, health: 15 }, rarity: 'rare' },
  { id: 'builder_master', name: '建筑大师', description: '基地达到5级', unlockCondition: { type: 'special', value: 'base_level_5' }, bonuses: { defenseMultiplier: 0.3, health: 20 }, rarity: 'epic' },
  { id: 'awakened', name: '觉醒者', description: '觉醒特殊能力', unlockCondition: { type: 'special', value: 'awakened' }, bonuses: { intelligence: 5, damageMultiplier: 0.2, sanityRegen: 2 }, rarity: 'epic' },
  { id: 'fog_hundred_days', name: '百日迷雾', description: '存活到第100天', unlockCondition: { type: 'day', value: 100 }, bonuses: { health: 50, damageMultiplier: 0.3, defenseMultiplier: 0.3, sanityRegen: 3 }, rarity: 'legendary' },
  { id: 'beast_king', name: '兽王', description: '累计击杀100只野兽', unlockCondition: { type: 'combat', value: 100 }, bonuses: { strength: 10, damageMultiplier: 0.3 }, rarity: 'legendary' },
  { id: 'faction_leader', name: '势力之主', description: '建立自己的势力', unlockCondition: { type: 'phase', value: 6 }, bonuses: { intelligence: 8, health: 30, defenseMultiplier: 0.2 }, rarity: 'epic' },
  { id: 'mist_lord', name: '迷雾之主', description: '到达迷雾核心', unlockCondition: { type: 'special', value: 'mist_core_reached' }, bonuses: { intelligence: 10, luck: 10, damageMultiplier: 0.5, sanityRegen: 5 }, rarity: 'legendary' },
  { id: 'humanity_savior', name: '人类救星', description: '击败最终BOSS，拯救人类', unlockCondition: { type: 'special', value: 'final_boss_defeated' }, bonuses: { health: 100, damageMultiplier: 0.5, defenseMultiplier: 0.5, sanityRegen: 10 }, rarity: 'legendary' },
];

// ============================================================
// 十三、资源消耗公式（分阶段，保留）
// ============================================================
export interface ResourceConsumption {
  food: number;
  water: number;
  sanity: number;
  energy: number;
  warmth: number;
}

export function calculateDailyConsumption(day: number, baseConsumption: ResourceConsumption, weather?: WeatherType): ResourceConsumption {
  const phase = getPhaseByDay(day);
  const mult = phase.resourceConsumptionMultiplier;
  let weatherMult = 1;
  if (weather) {
    weatherMult = WEATHER_CONFIG[weather].sanityDrainMultiplier; // 用理智消耗倍率近似
  }
  return {
    food: Math.floor(baseConsumption.food * mult),
    water: Math.floor(baseConsumption.water * mult * (weather === 'rainy' ? 0.8 : 1)),
    sanity: Math.floor(baseConsumption.sanity * mult * weatherMult),
    energy: Math.floor(baseConsumption.energy * mult),
    warmth: Math.floor(baseConsumption.warmth * mult * (weather === 'stormy' ? 1.5 : 1)),
  };
}

// ============================================================
// 十四、随机事件触发率（分阶段，保留并扩展）
// ============================================================
export function calculateEventRate(day: number, mistDensity?: MistDensity): number {
  const phase = getPhaseByDay(day);
  const baseRate = 0.3;
  let rate = baseRate * phase.eventRateMultiplier;
  if (mistDensity) {
    rate *= MIST_DENSITY_CONFIG[mistDensity].specialEventChance * 3;
  }
  return Math.min(0.9, rate);
}

// ============================================================
// 十五、怪物强度（分阶段，保留并扩展）
// ============================================================
export function calculateMonsterStrength(day: number, mistDensity?: MistDensity): number {
  const phase = getPhaseByDay(day);
  let strength = phase.monsterStrengthMultiplier;
  if (mistDensity) {
    strength *= 1 + MIST_DENSITY_CONFIG[mistDensity].monsterSpawnRate;
  }
  return strength;
}

// ============================================================
// 十六、大事件难度评估系统
// ============================================================
export interface MajorEventAssessment {
  eventName: string;
  difficulty: 'easy' | 'normal' | 'hard' | 'deadly';
  survivalChance: number;
  rewardMultiplier: number;
  penaltyDescription: string;
  // 评估依据
  assessedFactors: { factor: string; value: number; pass: boolean }[];
}

/** 评估玩家在大事件中的难度等级 */
export function assessMajorEventDifficulty(
  event: GamePhase['majorEvent'],
  playerState: {
    attributes: { strength: number; agility: number; intelligence: number; luck: number };
    resources: Record<string, number>;
    inventory: Record<string, number>;
    baseLevel: number;
    allyCount: number;
    level: number;
  }
): MajorEventAssessment {
  const thresholds = event.difficultyThresholds;
  let result: MajorEventAssessment = {
    eventName: event.name,
    difficulty: 'deadly',
    survivalChance: 0.05,
    rewardMultiplier: 0,
    penaltyDescription: '',
    assessedFactors: [],
  };

  // 从高到低检查难度阈值
  for (const threshold of thresholds) {
    const conditions = threshold.conditions;
    let allPass = true;
    const factors: { factor: string; value: number; pass: boolean }[] = [];

    if (conditions.minStrength !== undefined) {
      const pass = playerState.attributes.strength >= conditions.minStrength;
      factors.push({ factor: '力量', value: playerState.attributes.strength, pass });
      if (!pass) allPass = false;
    }
    if (conditions.minAgility !== undefined) {
      const pass = playerState.attributes.agility >= conditions.minAgility;
      factors.push({ factor: '敏捷', value: playerState.attributes.agility, pass });
      if (!pass) allPass = false;
    }
    if (conditions.minIntelligence !== undefined) {
      const pass = playerState.attributes.intelligence >= conditions.minIntelligence;
      factors.push({ factor: '智力', value: playerState.attributes.intelligence, pass });
      if (!pass) allPass = false;
    }
    if (conditions.hasWeapon) {
      const hasWeapon = Object.keys(playerState.inventory).some(k =>
        k.includes('spear') || k.includes('sword') || k.includes('knife') || k.includes('weapon') || k.includes('axe')
      );
      factors.push({ factor: '武器', value: hasWeapon ? 1 : 0, pass: hasWeapon });
      if (!hasWeapon) allPass = false;
    }
    if (conditions.hasArmor) {
      const hasArmor = Object.keys(playerState.inventory).some(k =>
        k.includes('armor') || k.includes('leather') || k.includes('cloth_armor')
      );
      factors.push({ factor: '护甲', value: hasArmor ? 1 : 0, pass: hasArmor });
      if (!hasArmor) allPass = false;
    }
    if (conditions.baseLevel !== undefined) {
      const pass = playerState.baseLevel >= conditions.baseLevel;
      factors.push({ factor: '基地等级', value: playerState.baseLevel, pass });
      if (!pass) allPass = false;
    }
    if (conditions.allyCount !== undefined) {
      const pass = playerState.allyCount >= conditions.allyCount;
      factors.push({ factor: '盟友数量', value: playerState.allyCount, pass });
      if (!pass) allPass = false;
    }
    if (conditions.resourceStockpile !== undefined) {
      const totalResources = Object.values(playerState.resources).reduce((a, b) => a + b, 0);
      const pass = totalResources >= conditions.resourceStockpile;
      factors.push({ factor: '资源储备', value: totalResources, pass });
      if (!pass) allPass = false;
    }

    if (allPass) {
      result = {
        eventName: event.name,
        difficulty: threshold.level,
        survivalChance: threshold.outcome.survivalChance,
        rewardMultiplier: threshold.outcome.rewardMultiplier,
        penaltyDescription: threshold.outcome.penaltyDescription,
        assessedFactors: factors,
      };
      break; // 找到最高可达到的难度等级
    }
  }

  return result;
}

// ============================================================
// 十七、多结局系统
// ============================================================
export interface EndingDetail {
  id: string;
  name: string;
  type: 'good' | 'neutral' | 'bad' | 'hidden' | 'special';
  description: string;
  triggerCondition: {
    type: 'day' | 'quest' | 'choice' | 'state' | 'special' | 'item' | 'combat';
    value: number | string;
    parameters?: Record<string, any>;
  };
  epilogue: string; // 结局后记
}

export const ENDINGS: EndingDetail[] = [
  // 好结局
  { id: 'E01', name: '直升机的轰鸣', type: 'good', description: '救援直升机到来，你成功获救。', triggerCondition: { type: 'day', value: 30 }, epilogue: '你登上了直升机，看着迷雾中的庇护所越来越小。你活下来了，但那些在迷雾中失去的人，你永远不会忘记。' },
  { id: 'E02', name: '冲天信号弹', type: 'good', description: '你用信号弹引来了救援队。', triggerCondition: { type: 'item', value: 'flare_gun' }, epilogue: '信号弹在迷雾中炸开，红色的光芒照亮了天空。不久后，救援队的声音从远方传来。你成功了。' },
  { id: 'E03', name: '篝火长明', type: 'good', description: '你建立了一个幸存者社区，在迷雾中点燃了文明的火种。', triggerCondition: { type: 'special', value: 'community_built' }, epilogue: '你的篝火从未熄灭。越来越多的幸存者聚集到这里，你们建立了一个小小的社区。迷雾还在，但人类的希望也在。' },
  { id: 'E04', name: '平凡的等待', type: 'neutral', description: '你在庇护所中等待，直到迷雾自然消散。', triggerCondition: { type: 'day', value: 60 }, epilogue: '第60天，迷雾突然开始消散。你走出庇护所，看到了久违的阳光。世界变了，但你还活着。' },
  // 坏结局（死亡）
  { id: 'E07', name: '走进雾里', type: 'bad', description: '理智归零，你走进了迷雾深处，再也没有回来。', triggerCondition: { type: 'state', value: 'sanity_zero' }, epilogue: '你听到迷雾中有声音在呼唤你。你不由自主地走了进去。迷雾吞没了你的身影，仿佛你从未存在过。' },
  { id: 'E08', name: '干渴', type: 'bad', description: '水源耗尽，你在干渴中死去。', triggerCondition: { type: 'state', value: 'water_zero' }, epilogue: '你的嘴唇干裂，喉咙像火烧一样。你最后看了一眼迷雾，然后倒在了地上。水，你只想喝一口水。' },
  { id: 'E09', name: '饥饿', type: 'bad', description: '食物耗尽，你在饥饿中死去。', triggerCondition: { type: 'state', value: 'food_zero' }, epilogue: '你的肚子饿得绞痛，视线开始模糊。你想起了迷雾来临前的那顿饭，当时你还抱怨饭菜不好吃。现在，你愿意用一切换一口面包。' },
  { id: 'E10', name: '病榻', type: 'bad', description: '伤病不治，你在病痛中死去。', triggerCondition: { type: 'state', value: 'health_zero' }, epilogue: '伤口感染了，高烧不退。你躺在庇护所的地板上，意识越来越模糊。你听到迷雾中有什么东西在靠近，但你已经无力反抗了。' },
  { id: 'E11', name: '夜访者', type: 'bad', description: '你在战斗中被杀死。', triggerCondition: { type: 'combat', value: 'death' }, epilogue: '怪物的利爪撕开了你的喉咙。你倒在地上，看着自己的血染红了迷雾。最后一个念头是：我本可以活得更久的。' },
  { id: 'E12', name: '兽潮之夜', type: 'bad', description: '你在兽潮中被吞噬。', triggerCondition: { type: 'special', value: 'beast_wave_death' }, epilogue: '无数只野兽冲破了你的防线。你挥舞着武器，但它们太多了。最后，你被淹没在野兽的海洋中，连骨头都没有剩下。' },
  // 隐藏/特殊结局
  { id: 'E05', name: '迷雾之眼', type: 'hidden', description: '你发现了迷雾的真相，成为了迷雾的一部分。', triggerCondition: { type: 'special', value: 'truth_embrace' }, epilogue: '你看到了迷雾的真相——它是一个巨大的意识体，一个在沉睡中做梦的古神。你选择了融入它，成为它的一只眼睛。你不再是人类，但你获得了永恒。' },
  { id: 'E06', name: '同行者', type: 'hidden', description: '你和同伴们一起，在迷雾中建立了新的家园。', triggerCondition: { type: 'special', value: 'all_companions_alive' }, epilogue: '老K、朵朵、陈医生，还有其他许多人。你们一起在迷雾中活了下来，建立了一个新的家园。迷雾还在，但你们不再害怕。因为你们有彼此。' },
  { id: 'E13', name: '守望者的日记', type: 'hidden', description: '你记录了迷雾中的一切，你的日记成为了后世的圣经。', triggerCondition: { type: 'special', value: 'diary_complete' }, epilogue: '你在迷雾中活了很久，记录了你看到的一切。当你最终死去时，你的日记被后来的幸存者发现。他们把你的日记奉为圣经，称你为"守望者"。你的名字，永远流传。' },
  { id: 'E14', name: '不散的篝火', type: 'special', description: '你点燃了永不熄灭的篝火，成为了迷雾中的传说。', triggerCondition: { type: 'special', value: 'eternal_flame' }, epilogue: '你用迷雾结晶点燃了一堆篝火，它永远不会熄灭。无数幸存者被篝火的光芒吸引，聚集到这里。你成为了传说中的"篝火者"，你的篝火，是迷雾中永不消逝的希望。' },
  // 后期结局（十阶段体系）
  { id: 'E15', name: '文明重生', type: 'good', description: '你领导人类重建了文明，迷雾消散，世界迎来新的纪元。', triggerCondition: { type: 'special', value: 'civilization_rebuilt' }, epilogue: '迷雾完全消散了。你站在新建的城市中心，看着孩子们在阳光下奔跑。人类文明从废墟中重生，而你，是这个新时代的奠基人。历史会记住你的名字。' },
  { id: 'E16', name: '迷雾之主', type: 'special', description: '你掌握了迷雾的力量，成为了新的迷雾之主。', triggerCondition: { type: 'special', value: 'mist_lord_ending' }, epilogue: '你击败了旧的迷雾之主，吸收了它的力量。现在，你就是迷雾本身。人类在你的迷雾中生存，你是他们的神，也是他们的囚笼。你获得了永恒，但你还是人类吗？' },
  { id: 'E17', name: '独裁者', type: 'neutral', description: '你建立了一个强大的帝国，但你成为了独裁者。', triggerCondition: { type: 'special', value: 'dictator_ending' }, epilogue: '你的帝国强大而繁荣，但所有人都活在你的阴影下。你是救世主，也是暴君。你给了人类安全，却夺走了他们的自由。历史会如何评价你？也许，你自己也不知道答案。' },
  { id: 'E18', name: '人类末日', type: 'bad', description: '你未能阻止灾难，人类文明终结。', triggerCondition: { type: 'special', value: 'humanity_extinct' }, epilogue: '最终BOSS摧毁了一切。你的军队、你的基地、你的文明，都化为了灰烬。你是最后的人类，你看着迷雾吞没了整个世界。然后，你也被吞没了。人类，灭绝了。' },
];

// ============================================================
// 十八、超能力系统（觉醒/等级/训练/进化/失控）
// ============================================================
export interface SuperpowerType {
  id: string;
  name: string;
  description: string;
  primaryAttribute: string;
  baseDamage: number;
  baseDefense: number;
  baseUtility: number;
  evolutionPath: string[];
 失控风险: number;
}
export const SUPERPOWER_TYPES: SuperpowerType[] = [
  { id: 'strength', name: '力量强化', description: '短时间内大幅提升力量，能击碎岩石、投掷重物。', primaryAttribute: 'strength', baseDamage: 20, baseDefense: 10, baseUtility: 5, evolutionPath: ['力量强化', '巨人之力', '山岳之躯', '泰坦之力'], 失控风险: 0.1 },
  { id: 'speed', name: '超速移动', description: '短时间内以远超常人的速度移动，能闪避攻击、快速侦察。', primaryAttribute: 'agility', baseDamage: 15, baseDefense: 5, baseUtility: 20, evolutionPath: ['超速移动', '风之步', '瞬影', '时空穿梭'], 失控风险: 0.15 },
  { id: 'energy', name: '能量操控', description: '吸收和释放各种形式的能量，包括电能、热能、动能。', primaryAttribute: 'intelligence', baseDamage: 25, baseDefense: 15, baseUtility: 15, evolutionPath: ['能量操控', '能量爆发', '能量掌控', '能量法则'], 失控风险: 0.2 },
  { id: 'perception', name: '感知强化', description: '大幅提升感知能力，能感知周围环境、生物、甚至思想。', primaryAttribute: 'intelligence', baseDamage: 5, baseDefense: 5, baseUtility: 30, evolutionPath: ['感知强化', '心灵感应', '预知', '全知'], 失控风险: 0.25 },
  { id: 'regeneration', name: '再生治愈', description: '快速恢复伤势，甚至能再生肢体，也能治愈他人。', primaryAttribute: 'strength', baseDamage: 5, baseDefense: 20, baseUtility: 25, evolutionPath: ['再生治愈', '生命之力', '生命法则', '生命创造'], 失控风险: 0.1 },
  { id: 'shadow', name: '暗影操控', description: '操控阴影，能隐身、制造暗影武器、甚至在阴影中穿梭。', primaryAttribute: 'agility', baseDamage: 18, baseDefense: 8, baseUtility: 18, evolutionPath: ['暗影操控', '暗影行者', '暗影主宰', '暗影法则'], 失控风险: 0.3 },
  { id: 'mist', name: '迷雾操控', description: '操控迷雾，能改变迷雾浓度、制造迷雾幻象、甚至用迷雾攻击。', primaryAttribute: 'intelligence', baseDamage: 20, baseDefense: 12, baseUtility: 20, evolutionPath: ['迷雾操控', '迷雾行者', '迷雾主宰', '迷雾法则'], 失控风险: 0.35 },
  { id: 'ice', name: '冰霜操控', description: '操控冰霜，能冻结物体、制造冰武器、降低周围温度。', primaryAttribute: 'intelligence', baseDamage: 22, baseDefense: 15, baseUtility: 12, evolutionPath: ['冰霜操控', '冰霜行者', '冰霜主宰', '绝对零度'], 失控风险: 0.2 },
  { id: 'fire', name: '烈焰操控', description: '操控火焰，能制造火球、火焰护盾、甚至引发爆炸。', primaryAttribute: 'strength', baseDamage: 28, baseDefense: 10, baseUtility: 10, evolutionPath: ['烈焰操控', '烈焰行者', '烈焰主宰', '太阳之火'], 失控风险: 0.25 },
  { id: 'gravity', name: '重力操控', description: '操控重力，能改变周围重力场、压制敌人、甚至制造黑洞。', primaryAttribute: 'intelligence', baseDamage: 30, baseDefense: 20, baseUtility: 15, evolutionPath: ['重力操控', '重力场', '重力主宰', '引力法则'], 失控风险: 0.4 },
];
export interface SuperpowerLevel {
  level: number;
  name: string;
  damageMultiplier: number;
  defenseMultiplier: number;
  utilityMultiplier: number;
  energyCost: number;
 失控风险Multiplier: number;
  requiredExp: number;
}
export const SUPERPOWER_LEVELS: SuperpowerLevel[] = [
  { level: 1, name: '初醒', damageMultiplier: 1.0, defenseMultiplier: 1.0, utilityMultiplier: 1.0, energyCost: 20, 失控风险Multiplier: 1.0, requiredExp: 0 },
  { level: 2, name: '熟练', damageMultiplier: 1.3, defenseMultiplier: 1.2, utilityMultiplier: 1.2, energyCost: 25, 失控风险Multiplier: 0.9, requiredExp: 100 },
  { level: 3, name: '精通', damageMultiplier: 1.6, defenseMultiplier: 1.5, utilityMultiplier: 1.5, energyCost: 30, 失控风险Multiplier: 0.8, requiredExp: 300 },
  { level: 4, name: '大师', damageMultiplier: 2.0, defenseMultiplier: 1.8, utilityMultiplier: 1.8, energyCost: 35, 失控风险Multiplier: 0.7, requiredExp: 700 },
  { level: 5, name: '宗师', damageMultiplier: 2.5, defenseMultiplier: 2.2, utilityMultiplier: 2.2, energyCost: 40, 失控风险Multiplier: 0.6, requiredExp: 1500 },
  { level: 6, name: '传说', damageMultiplier: 3.0, defenseMultiplier: 2.5, utilityMultiplier: 2.5, energyCost: 45, 失控风险Multiplier: 0.5, requiredExp: 3000 },
  { level: 7, name: '神话', damageMultiplier: 4.0, defenseMultiplier: 3.0, utilityMultiplier: 3.0, energyCost: 50, 失控风险Multiplier: 0.4, requiredExp: 6000 },
];
/** 计算超能力伤害 */
export function calculateSuperpowerDamage(powerType: string, powerLevel: number, primaryAttr: number): number {
  const type = SUPERPOWER_TYPES.find(t => t.id === powerType);
  const level = SUPERPOWER_LEVELS.find(l => l.level === powerLevel);
  if (!type || !level) return 0;
  return Math.floor((type.baseDamage + primaryAttr * 2) * level.damageMultiplier);
}
/** 计算超能力失控概率 */
export function calculate失控Chance(powerType: string, powerLevel: number, sanity: number): number {
  const type = SUPERPOWER_TYPES.find(t => t.id === powerType);
  const level = SUPERPOWER_LEVELS.find(l => l.level === powerLevel);
  if (!type || !level) return 0;
  const baseChance = type.失控风险 * level.失控风险Multiplier;
  const sanityPenalty = Math.max(0, (50 - sanity) * 0.01);
  return Math.min(0.8, baseChance + sanityPenalty);
}
/** 计算超能力训练经验获取 */
export function calculateTrainingExp(powerLevel: number, trainingHours: number, intelligence: number): number {
  const baseExp = trainingHours * 5;
  const intBonus = intelligence * 0.5;
  const levelPenalty = 1 / (1 + powerLevel * 0.2);
  return Math.floor(baseExp * (1 + intBonus / 100) * levelPenalty);
}
// ============================================================
// 十九、科技树系统（分类/前置/研究时间/效果）
// ============================================================
export interface TechNode {
  id: string;
  name: string;
  description: string;
  category: 'biology' | 'engineering' | 'military' | 'agriculture' | 'medicine' | 'mystic';
  tier: number;
  researchTime: number; // 研究时间（天）
  cost: Record<string, number>;
  prerequisites: string[];
  effects: Record<string, any>;
  unlockPhase: number;
}
export const TECH_TREE: TechNode[] = [
  // 生物科技
  { id: 'bio_basic', name: '基础生物学', description: '研究迷雾对生物的影响，为后续研究打下基础。', category: 'biology', tier: 1, researchTime: 3, cost: { points: 50, researcher: 1 }, prerequisites: [], effects: { researchSpeed: 1.1 }, unlockPhase: 5 },
  { id: 'bio_mutation', name: '变异研究', description: '研究生物变异的规律，找到控制变异的方法。', category: 'biology', tier: 2, researchTime: 5, cost: { points: 100, researcher: 2 }, prerequisites: ['bio_basic'], effects: { mutationControl: 0.2 }, unlockPhase: 6 },
  { id: 'bio_awakening', name: '觉醒研究', description: '研究超能力觉醒的规律，找到安全的觉醒方法。', category: 'biology', tier: 3, researchTime: 7, cost: { points: 200, researcher: 3 }, prerequisites: ['bio_mutation'], effects: { safeAwakening: true, awakeningSuccessRate: 0.8 }, unlockPhase: 7 },
  { id: 'bio_evolution', name: '进化研究', description: '研究人类进化的方向，引导人类主动进化。', category: 'biology', tier: 4, researchTime: 10, cost: { points: 500, researcher: 5 }, prerequisites: ['bio_awakening'], effects: { controlledEvolution: true, evolutionSpeed: 1.5 }, unlockPhase: 8 },
  // 工程科技
  { id: 'eng_basic', name: '基础工程学', description: '研究迷雾中的建筑和工程技术，为后续研究打下基础。', category: 'engineering', tier: 1, researchTime: 3, cost: { points: 50, engineer: 1 }, prerequisites: [], effects: { buildSpeed: 1.1 }, unlockPhase: 5 },
  { id: 'eng_power', name: '能源技术', description: '研究迷雾中的能源获取和利用技术。', category: 'engineering', tier: 2, researchTime: 5, cost: { points: 100, engineer: 2 }, prerequisites: ['eng_basic'], effects: { powerGeneration: 1.5 }, unlockPhase: 6 },
  { id: 'eng_vehicle', name: '载具技术', description: '研究迷雾中的载具改装和制造技术。', category: 'engineering', tier: 3, researchTime: 7, cost: { points: 200, engineer: 3 }, prerequisites: ['eng_power'], effects: { vehicleSpeed: 1.3, vehicleCapacity: 1.5 }, unlockPhase: 7 },
  { id: 'eng_automation', name: '自动化技术', description: '研究自动化生产和防御系统。', category: 'engineering', tier: 4, researchTime: 10, cost: { points: 500, engineer: 5 }, prerequisites: ['eng_vehicle'], effects: { automation: true, productionSpeed: 2.0 }, unlockPhase: 8 },
  // 军事科技
  { id: 'mil_basic', name: '基础军事学', description: '研究迷雾中的战术和战略，为后续研究打下基础。', category: 'military', tier: 1, researchTime: 3, cost: { points: 50, commander: 1 }, prerequisites: [], effects: { combatEffectiveness: 1.1 }, unlockPhase: 5 },
  { id: 'mil_weapon', name: '武器技术', description: '研究迷雾中的武器制造和强化技术。', category: 'military', tier: 2, researchTime: 5, cost: { points: 100, blacksmith: 2 }, prerequisites: ['mil_basic'], effects: { weaponDamage: 1.3, weaponDurability: 1.5 }, unlockPhase: 6 },
  { id: 'mil_armor', name: '护甲技术', description: '研究迷雾中的护甲制造和强化技术。', category: 'military', tier: 3, researchTime: 7, cost: { points: 200, blacksmith: 3 }, prerequisites: ['mil_weapon'], effects: { armorDefense: 1.5, armorDurability: 1.5 }, unlockPhase: 7 },
  { id: 'mil_tactics', name: '高级战术', description: '研究迷雾中的高级战术和战略。', category: 'military', tier: 4, researchTime: 10, cost: { points: 500, commander: 5 }, prerequisites: ['mil_armor'], effects: { tacticalAdvantage: true, combatEffectiveness: 1.5 }, unlockPhase: 8 },
  // 农业科技
  { id: 'agr_basic', name: '基础农业学', description: '研究迷雾中的农业技术，为后续研究打下基础。', category: 'agriculture', tier: 1, researchTime: 3, cost: { points: 50, farmer: 1 }, prerequisites: [], effects: { cropYield: 1.1 }, unlockPhase: 5 },
  { id: 'agr_crop', name: '作物改良', description: '研究迷雾中的作物改良技术，提高产量和抗病性。', category: 'agriculture', tier: 2, researchTime: 5, cost: { points: 100, farmer: 2 }, prerequisites: ['agr_basic'], effects: { cropYield: 1.5, diseaseResistance: 0.5 }, unlockPhase: 6 },
  { id: 'agr_livestock', name: '畜牧技术', description: '研究迷雾中的畜牧和养殖技术。', category: 'agriculture', tier: 3, researchTime: 7, cost: { points: 200, farmer: 3 }, prerequisites: ['agr_crop'], effects: { livestockYield: 1.5, meatProduction: 1.3 }, unlockPhase: 7 },
  { id: 'agr_hydroponics', name: '水培技术', description: '研究无土栽培和水培技术，提高空间利用率。', category: 'agriculture', tier: 4, researchTime: 10, cost: { points: 500, farmer: 5 }, prerequisites: ['agr_livestock'], effects: { hydroponics: true, spaceEfficiency: 2.0 }, unlockPhase: 8 },
  // 医疗科技
  { id: 'med_basic', name: '基础医学', description: '研究迷雾中的医疗技术，为后续研究打下基础。', category: 'medicine', tier: 1, researchTime: 3, cost: { points: 50, doctor: 1 }, prerequisites: [], effects: { healingSpeed: 1.1 }, unlockPhase: 5 },
  { id: 'med_disease', name: '疾病研究', description: '研究迷雾中的疾病和感染，找到治疗方法。', category: 'medicine', tier: 2, researchTime: 5, cost: { points: 100, doctor: 2 }, prerequisites: ['med_basic'], effects: { diseaseCure: true, infectionRate: 0.5 }, unlockPhase: 6 },
  { id: 'med_surgery', name: '外科技术', description: '研究迷雾中的外科手术和创伤治疗技术。', category: 'medicine', tier: 3, researchTime: 7, cost: { points: 200, doctor: 3 }, prerequisites: ['med_disease'], effects: { surgerySuccessRate: 0.9, traumaHealing: 1.5 }, unlockPhase: 7 },
  { id: 'med_regeneration', name: '再生医学', description: '研究组织再生和肢体再生技术。', category: 'medicine', tier: 4, researchTime: 10, cost: { points: 500, doctor: 5 }, prerequisites: ['med_surgery'], effects: { regeneration: true, limbRegrowth: true }, unlockPhase: 8 },
  // 神秘科技
  { id: 'mys_basic', name: '迷雾研究', description: '研究迷雾的本质和规律，为后续研究打下基础。', category: 'mystic', tier: 1, researchTime: 5, cost: { points: 100, mystic: 1 }, prerequisites: [], effects: { mistUnderstanding: 0.1 }, unlockPhase: 6 },
  { id: 'mys_crystal', name: '晶石研究', description: '研究迷雾晶石的性质和利用方法。', category: 'mystic', tier: 2, researchTime: 7, cost: { points: 200, mystic: 2 }, prerequisites: ['mys_basic'], effects: { crystalPower: 1.5, crystalUsage: true }, unlockPhase: 7 },
  { id: 'mys_ritual', name: '仪式研究', description: '研究迷雾中的神秘仪式和力量。', category: 'mystic', tier: 3, researchTime: 10, cost: { points: 400, mystic: 3 }, prerequisites: ['mys_crystal'], effects: { ritualPower: true, mysticAbility: 1.5 }, unlockPhase: 8 },
  { id: 'mys_truth', name: '迷雾真相', description: '研究迷雾的终极真相，找到驱散迷雾的方法。', category: 'mystic', tier: 4, researchTime: 15, cost: { points: 1000, mystic: 5 }, prerequisites: ['mys_ritual'], effects: { mistTruth: true, mistDispersal: true }, unlockPhase: 9 },
];
/** 计算研究时间（受研究员数量和智力影响） */
export function calculateResearchTime(baseTime: number, researcherCount: number, avgIntelligence: number): number {
  const researcherBonus = 1 + (researcherCount - 1) * 0.3;
  const intBonus = 1 + (avgIntelligence - 10) * 0.02;
  return Math.max(1, Math.ceil(baseTime / (researcherBonus * intBonus)));
}
/** 检查科技前置条件是否满足 */
export function checkTechPrerequisites(techId: string, researchedTechs: string[]): boolean {
  const tech = TECH_TREE.find(t => t.id === techId);
  if (!tech) return false;
  return tech.prerequisites.every(p => researchedTechs.includes(p));
}
// ============================================================
// 二十、外交势力系统（关系值/贸易/战争/联盟）
// ============================================================
export interface FactionDef {
  id: string;
  name: string;
  leader: string;
  population: number;
  militaryStrength: number;
  economicStrength: number;
  description: string;
  ideology: string;
  relationshipTypes: string[];
  tradeGoods: string[];
  militaryUnits: string[];
  unlockDay: number;
  baseRelationship: number; // 初始关系值（-100到100）
}
export const FACTIONS: FactionDef[] = [
  {
    id: 'hope_ship',
    name: '希望号安全区',
    leader: '赵明',
    population: 500,
    militaryStrength: 150,
    economicStrength: 200,
    description: '由前市长赵明建立的安全区，以秩序和稳定为核心。拥有完善的防御体系和物资储备，是迷雾世界最稳定的势力之一。',
    ideology: '秩序与稳定',
    relationshipTypes: ['陌生人', '贸易伙伴', '盟友', '敌对'],
    tradeGoods: ['食物', '药品', '武器', '建材'],
    militaryUnits: ['巡逻队', '守卫队', '精锐小队'],
    unlockDay: 25,
    baseRelationship: 0,
  },
  {
    id: 'iron_brotherhood',
    name: '钢铁兄弟会',
    leader: '铁山',
    population: 300,
    militaryStrength: 250,
    economicStrength: 100,
    description: '由前拳击手铁山建立的军事组织，以力量为尊。拥有强大的战斗力，但经济和物资相对薄弱。崇尚兄弟情谊和武力。',
    ideology: '力量与兄弟情谊',
    relationshipTypes: ['陌生人', '对手', '盟友', '兄弟', '敌对'],
    tradeGoods: ['武器', '战士', '建材', '矿石'],
    militaryUnits: ['战士', '精锐战士', '重甲战士'],
    unlockDay: 66,
    baseRelationship: -10,
  },
  {
    id: 'freedom_alliance',
    name: '自由联盟',
    leader: '林鹰',
    population: 1000,
    militaryStrength: 400,
    economicStrength: 300,
    description: '由前特种部队指挥官林鹰建立的军事联盟，以自由和强大为核心。拥有迷雾世界最强大的军事力量之一，同时也有完善的经济体系。',
    ideology: '自由与强大',
    relationshipTypes: ['陌生人', '贸易伙伴', '盟友', '对手', '敌对'],
    tradeGoods: ['武器', '弹药', '食物', '药品', '技术'],
    militaryUnits: ['正规军', '特种部队', '装甲部队', '超能力小队'],
    unlockDay: 91,
    baseRelationship: -20,
  },
  {
    id: 'evolvers',
    name: '进化者组织',
    leader: '先知（林教授）',
    population: 200,
    militaryStrength: 350,
    economicStrength: 150,
    description: '由先知建立的神秘组织，以人类进化为核心理念。拥有大量超能力者和先进的生物技术，但成员数量较少。是迷雾世界最危险的势力之一。',
    ideology: '人类进化',
    relationshipTypes: ['陌生人', '观察者', '对手', '信徒', '敌对'],
    tradeGoods: ['超能力技术', '生物制品', '迷雾晶石', '研究资料'],
    militaryUnits: ['超能力者', '精锐超能力者', '进化战士'],
    unlockDay: 46,
    baseRelationship: -50,
  },
  {
    id: 'wanderers',
    name: '流浪者商队',
    leader: '老狐狸',
    population: 100,
    militaryStrength: 50,
    economicStrength: 400,
    description: '由老狐狸带领的流动商队，以贸易和信息为核心。没有固定的领地，但拥有迷雾世界最完善的贸易网络和情报系统。',
    ideology: '贸易与信息',
    relationshipTypes: ['陌生人', '客户', '合作伙伴', '朋友', '敌对'],
    tradeGoods: ['各种物资', '情报', '稀有物品', '技术'],
    militaryUnits: ['商队护卫'],
    unlockDay: 100,
    baseRelationship: 10,
  },
  {
    id: 'new_hope',
    name: '新希望基地（玩家势力）',
    leader: '玩家',
    population: 0,
    militaryStrength: 0,
    economicStrength: 0,
    description: '由玩家建立的势力，从一个小小的庇护所发展壮大。玩家的选择决定了这个势力的发展方向和最终命运。',
    ideology: '由玩家决定',
    relationshipTypes: ['玩家势力'],
    tradeGoods: ['由玩家决定'],
    militaryUnits: ['由玩家决定'],
    unlockDay: 1,
    baseRelationship: 0,
  },
];
export interface RelationshipLevel {
  minValue: number;
  name: string;
  description: string;
  tradeMultiplier: number;
  militarySupport: number;
  eventChance: number;
}
export const RELATIONSHIP_LEVELS: RelationshipLevel[] = [
  { minValue: -100, name: '死敌', description: '不共戴天的敌人，随时可能发动战争。', tradeMultiplier: 0, militarySupport: 0, eventChance: 0.5 },
  { minValue: -60, name: '敌对', description: '关系恶劣，可能发生冲突和战争。', tradeMultiplier: 0.3, militarySupport: 0, eventChance: 0.3 },
  { minValue: -20, name: '冷淡', description: '关系冷淡，几乎没有交流。', tradeMultiplier: 0.7, militarySupport: 0, eventChance: 0.1 },
  { minValue: 0, name: '中立', description: '普通的外交关系，有基本的贸易和交流。', tradeMultiplier: 1.0, militarySupport: 0, eventChance: 0.05 },
  { minValue: 20, name: '友好', description: '关系友好，有较多的贸易和合作。', tradeMultiplier: 1.2, militarySupport: 0.2, eventChance: 0.03 },
  { minValue: 50, name: '盟友', description: '亲密的盟友，在军事和经济上互相支持。', tradeMultiplier: 1.5, militarySupport: 0.5, eventChance: 0.02 },
  { minValue: 80, name: '兄弟', description: '如同兄弟一般的关系，在任何情况下都会互相支持。', tradeMultiplier: 2.0, militarySupport: 1.0, eventChance: 0.01 },
];
/** 获取关系等级 */
export function getRelationshipLevel(value: number): RelationshipLevel {
  let result = RELATIONSHIP_LEVELS[0];
  for (const level of RELATIONSHIP_LEVELS) {
    if (value >= level.minValue) result = level;
  }
  return result;
}
/** 计算贸易价格（受关系影响） */
export function calculateTradePrice(basePrice: number, relationship: number, isBuying: boolean): number {
  const level = getRelationshipLevel(relationship);
  if (isBuying) {
    return Math.floor(basePrice / level.tradeMultiplier);
  } else {
    return Math.floor(basePrice * level.tradeMultiplier);
  }
}
/** 计算关系变化（受行动影响） */
export function calculateRelationshipChange(baseChange: number, playerCharisma: number, targetTrust: number): number {
  const charismaBonus = 1 + (playerCharisma - 10) * 0.02;
  const trustMultiplier = targetTrust / 50;
  return Math.floor(baseChange * charismaBonus * Math.max(0.5, trustMultiplier));
}
// ============================================================
// 二十一、声望系统（获取/消耗/效果）
// ============================================================
export interface ReputationLevel {
  minValue: number;
  name: string;
  description: string;
  effects: Record<string, number>;
}
export const REPUTATION_LEVELS: ReputationLevel[] = [
  { minValue: 0, name: '无名小卒', description: '没有人知道你是谁。', effects: { tradeDiscount: 0, npcTrust: 0, recruitment: 0 } },
  { minValue: 100, name: '小有名气', description: '有些人听说过你的名字。', effects: { tradeDiscount: 0.05, npcTrust: 5, recruitment: 0.1 } },
  { minValue: 300, name: '声名鹊起', description: '在一定范围内有了名气。', effects: { tradeDiscount: 0.1, npcTrust: 10, recruitment: 0.2 } },
  { minValue: 600, name: '名震一方', description: '在一个地区内很有名望。', effects: { tradeDiscount: 0.15, npcTrust: 15, recruitment: 0.3 } },
  { minValue: 1000, name: '声名远扬', description: '名声传遍了整个迷雾世界。', effects: { tradeDiscount: 0.2, npcTrust: 20, recruitment: 0.4 } },
  { minValue: 2000, name: '传奇人物', description: '你的名字成为了传说。', effects: { tradeDiscount: 0.3, npcTrust: 30, recruitment: 0.6 } },
  { minValue: 5000, name: '神话级存在', description: '你已经超越了人类的范畴，成为了神话。', effects: { tradeDiscount: 0.5, npcTrust: 50, recruitment: 1.0 } },
];
export interface ReputationSource {
  id: string;
  name: string;
  description: string;
  baseReputation: number;
  repeatable: boolean;
  maxTriggers?: number;
}
export const REPUTATION_SOURCES: ReputationSource[] = [
  { id: 'kill_monster', name: '击杀怪物', description: '击杀迷雾中的怪物。', baseReputation: 5, repeatable: true },
  { id: 'save_survivor', name: '拯救幸存者', description: '拯救遇到危险的幸存者。', baseReputation: 20, repeatable: true },
  { id: 'complete_quest', name: '完成任务', description: '完成NPC或势力的任务。', baseReputation: 30, repeatable: true },
  { id: 'win_battle', name: '赢得战斗', description: '在战斗中取得胜利。', baseReputation: 15, repeatable: true },
  { id: 'build_base', name: '建设基地', description: '建设和升级基地。', baseReputation: 50, repeatable: true },
  { id: 'help_others', name: '帮助他人', description: '无私地帮助其他幸存者。', baseReputation: 10, repeatable: true },
  { id: 'discover_truth', name: '发现真相', description: '发现迷雾的真相。', baseReputation: 200, repeatable: false },
  { id: 'defeat_boss', name: '击败BOSS', description: '击败强大的BOSS。', baseReputation: 500, repeatable: false },
  { id: 'save_humanity', name: '拯救人类', description: '拯救人类文明。', baseReputation: 2000, repeatable: false },
  { id: 'betray_ally', name: '背叛盟友', description: '背叛信任你的盟友。', baseReputation: -100, repeatable: true },
  { id: 'kill_innocent', name: '杀害无辜', description: '杀害无辜的幸存者。', baseReputation: -200, repeatable: true },
  { id: 'steal', name: '偷窃', description: '偷窃他人的财物。', baseReputation: -50, repeatable: true },
];
/** 获取声望等级 */
export function getReputationLevel(reputation: number): ReputationLevel {
  let result = REPUTATION_LEVELS[0];
  for (const level of REPUTATION_LEVELS) {
    if (reputation >= level.minValue) result = level;
  }
  return result;
}
/** 计算声望获取（受魅力和行为影响） */
export function calculateReputationGain(baseReputation: number, playerCharisma: number, actionType: string): number {
  const charismaBonus = 1 + (playerCharisma - 10) * 0.02;
  let typeMultiplier = 1;
  if (actionType === 'heroic') typeMultiplier = 1.5;
  if (actionType === 'selfless') typeMultiplier = 1.3;
  if (actionType === 'negative') typeMultiplier = -1;
  return Math.floor(baseReputation * charismaBonus * typeMultiplier);
}
/** 计算声望效果 */
export function calculateReputationEffects(reputation: number): Record<string, number> {
  const level = getReputationLevel(reputation);
  return level.effects;
}
// ============================================================
// 二十二、版本信息
// ============================================================
export const GAME_VERSION = '1.0.0';
export const GAME_VERSION_NAME = '体系化完整版';
export const GAME_VERSION_DESCRIPTION = '十阶段体系、每日系统、迷雾规则、NPC动态（27个完整NPC）、因果系统、成长方向、大事件检验、属性公式、等级经验、货币、基地建筑、武器品质、称号、多结局、超能力系统、科技树系统、外交势力系统、声望系统';
