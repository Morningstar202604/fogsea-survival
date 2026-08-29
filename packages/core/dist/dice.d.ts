import type { RollTier } from './types.js';
/**
 * 掷骰检定（d100）：成功阈值为 (100 - difficulty)，即
 * - 大成功: roll >= 95
 * - 成功:   roll >= (100 - difficulty)
 * - 失败:   roll >= 30（且有难度门槛）
 * - 大失败: roll <= 10
 *
 * difficulty 越高越难成功。返回档位 + 具体点数。
 */
export interface RollResult {
    roll: number;
    tier: RollTier;
    success: boolean;
}
export declare function rollD100(rng: () => number, difficulty: number, bonus?: number): RollResult;
/** 命中判定用于生成检定结果文本 */
export declare function tierLabel(tier: RollTier): string;
//# sourceMappingURL=dice.d.ts.map