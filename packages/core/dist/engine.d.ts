import type { ContentPack, GameState, SceneNode, Choice, RandomEventDef, Outcome, Condition, EndingDef } from './types.js';
import { Rng } from './rng.js';
/** 创建新一局状态 v2.1：集成所有新系统；talentId 提供则落地开局天赋 */
export declare function createInitialState(content: ContentPack, meta?: GameState['meta'], talentId?: string): GameState;
/** 跨主线 + 支线解析场景节点（currentScene 可能在某条线内）。 */
export declare function resolveScene(content: ContentPack, sceneId: string): SceneNode | null;
/** 跨主线 + 支线查找结局定义。 */
export declare function findEnding(content: ContentPack, id: string): EndingDef | null;
/** 按 id 取随机事件定义。 */
export declare function resolveEvent(content: ContentPack, id: string): RandomEventDef | null;
/** 条件判定：requires 为空则恒真；flags/items/resources 全部满足才通过。 */
export declare function conditionMet(cond: Condition | undefined, state: GameState): boolean;
/** 过滤出当前可显示的选项（requires 满足）。 */
export declare function availableChoices(choices: Choice[], state: GameState): Choice[];
export interface ChoiceResult {
    state: GameState;
    /** 结果旁白（选项自带叙事文本） */
    resultText?: string;
    /** 若跳转到结局则给出结算结果 */
    outcome?: Outcome;
    next?: string;
    /** 系统播报（物品升级等 meta 反馈，UI 以系统口吻展示） */
    systemMessages?: string[];
}
/**
 * 应用一个选项（场景或事件通用）：
 * - 遍历 effects：roll 做 d100 检定决定 onSuccess/onFail 跳转与附加效果；
 *   jump 直接改写跳转目标；其余效果即时落地。
 * - 跳转目标若是结局 id → 写入 state.outcome 并解锁图鉴；
 *   若是 "__return__" → 从场景栈弹出返回上级场景；否则更新 currentScene。
 * 注：进入支线由 scheduleLine 显式压栈，本函数对普通场景跳转不压栈（保证线内游走不出栈）。
 */
export declare function applyChoice(content: ContentPack, state: GameState, choice: Choice, rng: Rng): ChoiceResult;
/** 应用事件选项：处理完后从 pendingEvents 弹出并记入 triggeredEvents。 */
export declare function applyEventChoice(content: ContentPack, state: GameState, choice: Choice, rng: Rng): ChoiceResult;
/** 每日抽取一个随机事件（按 weight 加权；受 minDay / maxTriggers 约束；weight<=0 不抽）。 */
export declare function drawDailyEvent(content: ContentPack, state: GameState, rng: Rng): RandomEventDef | null;
/**
 * 触发式支线调度：当前不在任何线/事件内时，按声明顺序找到首个满足 trigger 且未完成的支线，
 * 将其入口压栈切为当前场景（一次性，靠 line_done_<id> 标记防重复触发）。
 */
export declare function scheduleLine(content: ContentPack, state: GameState): void;
/**
 * 推进一天 v2.0：集成基地生产、技能成长、推进机制
 */
/** 刷新每日面板（天气、迷雾浓度、危险等级、隐藏提示） */
export declare function refreshDailyPanel(state: GameState, rng: Rng): string[];
/** 检查并触发大事件 */
export declare function checkAndTriggerMajorEvent(state: GameState): {
    triggered: boolean;
    event?: any;
    assessment?: any;
    messages: string[];
};
/** 更新已解锁区域 */
export declare function updateUnlockedZones(state: GameState): string[];
/** 处理待生效的因果效果 */
export declare function processPendingCausalEffects(state: GameState): string[];
/** 记录因果关系 */
export declare function recordCausalRelation(state: GameState, causeId: string, effectDescription: string, delayDays?: number, probability?: number): void;
export declare function runDaily(content: ContentPack, state: GameState, rng: Rng): {
    dead: boolean;
    messages: string[];
    event: RandomEventDef | null;
    progression?: any;
};
/** 获得经验值，自动检查升级 */
export declare function gainExp(state: GameState, amount: number): {
    leveledUp: boolean;
    newLevel: number;
};
/** 分配属性点 */
export declare function allocateAttribute(state: GameState, attr: 'strength' | 'agility' | 'intelligence' | 'luck'): boolean;
/** 获得迷雾积分 */
export declare function gainMistPoints(state: GameState, amount: number): void;
/** 检查并解锁称号 */
export declare function checkTitles(state: GameState): string[];
/** 获取当前称号的属性加成 */
export declare function getActiveTitleBonuses(state: GameState): Record<string, number>;
/** 更新当前游戏阶段 */
export declare function updateCurrentPhase(state: GameState): void;
/** 检查是否可以建造指定建筑 */
export declare function canBuildBuilding(state: GameState, buildingId: string): {
    canBuild: boolean;
    reason?: string;
    cost?: Record<string, number>;
};
/** 建造或升级建筑 */
export declare function buildOrUpgradeBuilding(state: GameState, buildingId: string): {
    success: boolean;
    message: string;
};
/** 获取所有建筑的总效果 */
export declare function getBuildingEffects(state: GameState): Record<string, number>;
/** 每日应用建筑效果（在 runDaily 中调用） */
export declare function applyBuildingDailyEffects(state: GameState): string[];
/**
 * 自动检查并触发因果关系
 * 根据玩家当前状态和行为，匹配因果关系并触发效果
 */
export declare function autoCheckCausalRelations(state: GameState): string[];
/**
 * 记录玩家的选择因果（在applyChoice中调用）
 * 根据玩家选择的flag，自动记录相关因果关系
 */
export declare function recordChoiceCausality(state: GameState, choice: Choice): void;
//# sourceMappingURL=engine.d.ts.map