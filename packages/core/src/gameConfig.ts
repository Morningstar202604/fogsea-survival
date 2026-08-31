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
    name: '医生（陈默）',
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
// 十八、版本信息
// ============================================================
export const GAME_VERSION = '0.5.0';
export const GAME_VERSION_NAME = '体系化架构版';
export const GAME_VERSION_DESCRIPTION = '十阶段体系、每日系统、迷雾规则、NPC动态、因果系统、成长方向、大事件检验、多结局';
