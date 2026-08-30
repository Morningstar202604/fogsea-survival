/**
 * v1.0 每日签到补给（品类标配留存钩子）
 *
 * 连签奖励按 7 天周期循环；第 7 天（streak % 7 === 0）发放周大奖。
 * 断签定义：跳过每日结算（不跑 runDaily 即不累计）。
 */
import type { GameState } from './types.js';
/** 每日结算第 0 步调用：累加连签并发放当日奖励。 */
export declare function processSignin(state: GameState): string;
//# sourceMappingURL=signin.d.ts.map