/**
 * 核心领域类型定义 v2.0。
 * 所有数据均以纯 JSON 可序列化结构承载，GameState 为单一状态对象。
 * 
 * v2.0 新增：基地建设、技能树、推进机制、战斗系统等完整游戏机制
 */

import type { BaseInfo } from './base.js';
import type { SkillTreeState } from './skills.js';
import type { ProgressionState } from './progression.js';
import type { EconomyState } from './economy.js';

/** 资源键：食物 / 水 / 生命 / 理智 / 体力 / 温暖 */
export type ResourceKey = 'food' | 'water' | 'health' | 'sanity' | 'energy' | 'warmth';

export interface Resource {
  current: number;
  /** 本局累计获得量（结算统计用） */
  accumulated: number;
  max: number;
}

export type Resources = Record<ResourceKey, Resource>;

/** 掷骰结果档位 */
export type RollTier = 'crit_success' | 'success' | 'fail' | 'crit_fail';

/** 结局类型：故事结局 / 死亡 */
export type OutcomeType = 'ending' | 'death';

/** 场景节点分支 */
export interface ChoiceEffect {
  kind: 'resource' | 'flag' | 'item' | 'roll' | 'jump' | 'combat';
  /** kind=resource: 资源键 */
  resource?: ResourceKey;
  /** kind=resource: 增减量（负为消耗） */
  delta?: number;
  /** kind=flag: 标志名 */
  flag?: string;
  /** kind=flag: 置值（默认 true） */
  flagValue?: boolean;
  /** kind=item: 物品 id */
  item?: string;
  /** kind=item: 数量 */
  amount?: number;
  /** kind=roll: 检定难度（0-100） */
  difficulty?: number;
  /** kind=roll: 检定失败时跳转的场景/结局 id */
  onFail?: string;
  /** kind=roll: 检定成功时跳转的场景/结局 id */
  onSuccess?: string;
  /** kind=roll: 是否致命检定（失败直接结算伤害） */
  lethal?: boolean;
  /** kind=jump: 无条件跳转目标 */
  target?: string;
  /** kind=combat: 指定怪物 id；缺省时按当前天数自动选取 */
  monster?: string;
  /** 检定成功后附加的额外效果（可嵌套 resource/flag/item） */
  successEffects?: ChoiceEffect[];
  /** 检定失败后附加的额外效果（可嵌套 resource/flag/item） */
  failEffects?: ChoiceEffect[];
}

export interface Choice {
  id: string;
  /** 选项文案 */
  text: string;
  /** 选项说明（可选，小字） */
  hint?: string;
  effects: ChoiceEffect[];
  /** 下一目标：场景 id / 事件 id / 结局 id；特殊值 "__return__" 表示事件结束后返回主场景 */
  next: string;
  /** 前置条件：若为假则选项隐藏 */
  requires?: Condition;
  /** 选择后的结果旁白（旧版 outcomes 中的叙事文本，UI 展示用） */
  result?: string;
  /** 行动点消耗（每日行动点不足时 UI 禁用；引擎扣减下限 0） */
  apCost?: number;
}

export interface Condition {
  /** 需要持有的 flag（全部满足） */
  flags?: string[];
  /** 需要持有的物品（id->最低数量） */
  items?: Record<string, number>;
  /** 资源下限（key->最低 current） */
  resources?: Partial<Record<ResourceKey, number>>;
  /** 属性下限（key->最低值） */
  attributes?: Partial<Record<AttributeKey, number>>;
}

/** 玩家四维属性键 */
export type AttributeKey = 'strength' | 'agility' | 'intelligence' | 'luck';

export interface SceneNode {
  id: string;
  /** 场景正文 */
  text: string;
  choices: Choice[];
  /** 部分内容声明的默认流向（引擎以选项 next/jump 为准，此字段仅作内容标注） */
  next?: string;
}

/** 随机事件定义（事件池条目） */
export interface RandomEventDef {
  id: string;
  /** 事件池权重 */
  weight: number;
  /** 最小触发天数（第几天起才可触发） */
  minDay: number;
  /** 每局最多触发次数 */
  maxTriggers: number;
  /** 前置条件 */
  requires?: Condition;
  /** 事件正文 */
  text: string;
  choices: Choice[];
}

/** 结局定义 */
export interface EndingDef {
  id: string;
  /** 结局名 */
  title: string;
  /** 结局描述 */
  desc: string;
  /** 结局分类（用于图鉴） */
  category: string;
}

/** 每日结算配置：某资源每日固定增减 */
export interface IncomeRule {
  resource: ResourceKey;
  /** 每日变化量（负为消耗） */
  delta: number;
}

/** 剧本线定义：初始场景 id + 场景节点表（主线，始终可玩） */
export interface StorylineDef {
  id: string;
  title: string;
  desc: string;
  initialScene: string;
  scenes: Record<string, SceneNode>;
  endings: Record<string, EndingDef>;
}

/**
 * 触发式支线（旧版 44 场中的独立剧情线，如救援线/朵朵线）。
 * 满足 trigger 时由引擎压栈切入，线内通过场景跳转游走，
 * 结束节点 next="__return__" 出栈返回主线。不还原旧版数值复杂系统，仅承载剧情分支。
 */
export interface SceneLineDef {
  id: string;
  title: string;
  desc: string;
  trigger: { dayMin?: number; flags?: string[]; notFlags?: string[] };
  initialScene: string;
  scenes: Record<string, SceneNode>;
  endings?: Record<string, EndingDef>;
}

/** 全部内容（剧本线 + 触发式支线 + 事件池 + 每日结算规则） */
export interface ContentPack {
  version: number;
  storyline: StorylineDef;
  /** 触发式支线：满足 trigger 时由引擎压栈切入，结束返回主线 */
  lines?: SceneLineDef[];
  randomEvents: RandomEventDef[];
  income: IncomeRule[];
  /** 初始资源 */
  startingResources: Partial<Record<ResourceKey, { current: number; max: number }>>;
}

/** 单局结算统计 */
export interface RunStats {
  /** 存活天数（死亡/结局时的 day） */
  survivalDays: number;
  /** 触发过的随机事件数 */
  eventsTriggered: number;
  /** 各资源累计获得量快照 */
  resources: Partial<Record<ResourceKey, number>>;
  /** 战斗击杀数 */
  kills: number;
  /** 连续签到天数 */
  signinStreak: number;
}

/** 跨周目元数据 */
export interface MetaState {
  /** 周目数 */
  runs: number;
  /** 已解锁结局 id 列表 */
  unlockedEndings: string[];
  /** 最大存活天数 */
  bestDays: number;
  /** 已解锁成就 id 列表（跨周目持久，可缺省由引擎补齐） */
  unlockedAchievements?: string[];
}

/** 结局/死亡结算结果 */
export interface Outcome {
  type: OutcomeType;
  id: string;
  title: string;
  desc: string;
}

/** 游戏状态（单一对象）v2.0 */
export interface GameState {
  version: number;
  day: number;
  resources: Resources;
  flags: Record<string, boolean>;
  inventory: Record<string, number>;
  /** 当前所处场景 id */
  currentScene: string;
  /** 已访问场景（去重） */
  visitedScenes: string[];
  /** 延迟事件队列（待触发的随机事件 id 或固定事件 id） */
  pendingEvents: string[];
  /** 已触发的随机事件记录（去重） */
  triggeredEvents: string[];
  /** 事件栈（事件嵌套时压栈，返回用） */
  eventStack: string[];
  /** 结算结果；null 表示进行中 */
  outcome: Outcome | null;
  runStats: RunStats;
  meta: MetaState;
  
  // === v2.0 新增系统 ===
  
  /** 基地建设信息 */
  base: BaseInfo;
  
  /** 技能树状态 */
  skills: SkillTreeState;
  
  /** 推进机制状态 */
  progression: ProgressionState;
  
  /** 经济状态 */
  economy: EconomyState;

  /** 物品等级（物品自动升级系统：使用次数累积→熟练度升级） */
  itemLevels: Record<string, { uses: number; level: number }>;
  
  /** 战斗会话（战斗中临时状态） */
  combat?: CombatSession;
  
  /** 装备栏 */
  equipment: EquipmentSlots;
  
  /** 玩家属性 */
  attributes: PlayerAttributes;

  /** 每日行动点（晨间刷新为 3；hub 行动消耗） */
  ap: number;

  // === v3.0 新增：等级/经验/属性点/称号系统 ===
  
  /** 玩家等级 */
  level: number;
  /** 当前经验值 */
  exp: number;
  /** 升级所需经验 */
  expToNext: number;
  /** 未分配的属性点 */
  attributePoints: number;
  /** 未分配的技能点 */
  skillPoints: number;
  /** 已解锁称号ID列表 */
  titles: string[];
  /** 当前装备的称号ID */
  activeTitle: string | null;
  /** 累计击杀数 */
  combatKills: number;
  /** 当前游戏阶段（1-5） */
  currentPhase: number;
  /** 迷雾积分（通用货币） */
  mistPoints: number;
}

/** 玩家基础属性 */
export interface PlayerAttributes {
  strength: number;      // 力量（影响战斗伤害/负重）
  agility: number;       // 敏捷（影响闪避/探索速度）
  intelligence: number;  // 智力（影响制作成功率/鉴定）
  luck: number;          // 幸运（影响掉落/暴击）
}

/** 装备栏位 */
export interface EquipmentSlots {
  weapon?: string;       // 武器
  armor?: string;        // 护甲
  accessory?: string;    // 饰品
}

/** 战斗会话 */
export interface CombatSession {
  enemyId: string;
  enemyHp: number;
  enemyMaxHp: number;
  round: number;
  log: string[];
}
