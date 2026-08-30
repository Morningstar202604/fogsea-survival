/**
 * v2.1 幸存者排行榜
 *
 * 品类标配压力装置（全民求生流的"全网排名/直播围观"）：
 * 162 名幸存者的排位随天数自然下滑（他人在成长），基地等级、世界等级、
 * 幸运与物资积累会拉高排名。每 3 天播报一次，制造"不进则退"的竞争焦虑。
 * 设计为确定性函数（不依赖 Rng），便于测试与复现。
 */
import type { GameState } from './types.js';
export declare const RANK_TOTAL = 162;
/** 当前排名：1 最好。开局约 #81，竞争者每日追赶，玩家的成长对冲下滑。 */
export declare function computeRank(state: GameState): number;
/** 每 3 天的排行榜播报；无播报日返回 null。 */
export declare function rankMessage(state: GameState): string | null;
//# sourceMappingURL=ranking.d.ts.map