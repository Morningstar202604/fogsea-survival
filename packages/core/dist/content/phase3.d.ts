/**
 * 第三阶段：小队（第15-21天）内容
 * 包含：医生陈静引入、猎人老周引入、团体冲突、第一次大型兽潮、更多随机事件
 *
 * 设计原则：
 * 1. 团体动力学 — 人多了，矛盾就来了
 * 2. 专业分工 — 医生、猎人各有专长
 * 3. 大事件检验 — 第一次兽潮，检验玩家的准备
 * 4. 道德困境 — 资源有限时，谁活谁死？
 */
import type { SceneNode, RandomEventDef } from '../types.js';
export declare const PHASE3_SCENES: Record<string, SceneNode>;
export declare const PHASE3_EVENTS: RandomEventDef[];
/**
 * 将第三阶段内容合并到主内容包中
 */
export declare function mergePhase3Content(content: any): any;
//# sourceMappingURL=phase3.d.ts.map