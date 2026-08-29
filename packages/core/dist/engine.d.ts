import type { ContentPack, GameState, SceneNode, Choice, RandomEventDef, Outcome, Condition, EndingDef } from './types.js';
import { Rng } from './rng.js';
/** 创建新一局状态：从 ContentPack 的初始资源与入口场景起步。 */
export declare function createInitialState(content: ContentPack, meta?: GameState['meta']): GameState;
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
 * 推进一天：应用每日结算（income + 饥饿惩罚）→ 若死亡则结算死亡结局；
 * 否则 day+1，调度触发式支线；若未进入支线则抽取当日随机事件放入 pendingEvents。
 */
export declare function runDaily(content: ContentPack, state: GameState, rng: Rng): {
    dead: boolean;
    messages: string[];
    event: RandomEventDef | null;
};
//# sourceMappingURL=engine.d.ts.map