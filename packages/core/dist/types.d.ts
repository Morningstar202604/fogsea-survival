/**
 * 核心领域类型定义。
 * 所有数据均以纯 JSON 可序列化结构承载，GameState 为单一状态对象。
 */
/** 资源键：食物 / 水 / 生命 / 理智 / 体力 */
export type ResourceKey = 'food' | 'water' | 'health' | 'sanity' | 'energy';
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
    kind: 'resource' | 'flag' | 'item' | 'roll' | 'jump';
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
    /** 检定成功后附加的额外效果（可嵌套 resource/flag/item） */
    successEffects?: ChoiceEffect[];
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
}
export interface Condition {
    /** 需要持有的 flag（全部满足） */
    flags?: string[];
    /** 需要持有的物品（id->最低数量） */
    items?: Record<string, number>;
    /** 资源下限（key->最低 current） */
    resources?: Partial<Record<ResourceKey, number>>;
}
export interface SceneNode {
    id: string;
    /** 场景正文 */
    text: string;
    choices: Choice[];
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
    trigger: {
        dayMin?: number;
        flags?: string[];
        notFlags?: string[];
    };
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
    startingResources: Partial<Record<ResourceKey, {
        current: number;
        max: number;
    }>>;
}
/** 单局结算统计 */
export interface RunStats {
    /** 存活天数（死亡/结局时的 day） */
    survivalDays: number;
    /** 触发过的随机事件数 */
    eventsTriggered: number;
    /** 各资源累计获得量快照 */
    resources: Partial<Record<ResourceKey, number>>;
}
/** 跨周目元数据 */
export interface MetaState {
    /** 周目数 */
    runs: number;
    /** 已解锁结局 id 列表 */
    unlockedEndings: string[];
    /** 最大存活天数 */
    bestDays: number;
}
/** 结局/死亡结算结果 */
export interface Outcome {
    type: OutcomeType;
    id: string;
    title: string;
    desc: string;
}
/** 游戏状态（单一对象） */
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
}
//# sourceMappingURL=types.d.ts.map