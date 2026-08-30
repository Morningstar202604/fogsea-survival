/**
 * v1.0 成就系统（跨周目收集驱动）
 *
 * 每日结算末尾检查；新达成项写入 meta.unlockedAchievements（跨周目持久）
 * 并返回系统播报。check 需为幂等纯判定，由调用方保证去重。
 */
import type { GameState } from './types.js';
export interface AchievementDef {
    id: string;
    name: string;
    desc: string;
    check: (state: GameState) => boolean;
}
export declare const ACHIEVEMENTS: AchievementDef[];
/** 检查并解锁新成就；返回新达成的成就列表（已去重，直接写 meta）。 */
export declare function checkAchievements(state: GameState): AchievementDef[];
//# sourceMappingURL=achievements.d.ts.map