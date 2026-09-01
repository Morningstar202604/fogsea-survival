import type { RandomEventDef } from '../types.js';
/**
 * 因果系统触发型事件（gameConfig.CAUSAL_RELATIONS 中 event_trigger 引用的事件）。
 * weight 固定为 0：不进入每日随机事件池，仅由因果规则按概率/延迟触发。
 */
export declare const CAUSAL_EVENTS: RandomEventDef[];
//# sourceMappingURL=causal-events.d.ts.map