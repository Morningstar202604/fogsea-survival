/**
 * 第四阶段：车队（第22-30天）内容
 * 包含：机械师引入、寻找车辆燃料、车队组建、迁移遭遇、更多随机事件
 *
 * 设计原则：
 * 1. 规模升级 — 从步行到车队，活动范围大幅扩大
 * 2. 专业分工 — 机械师、司机等新角色
 * 3. 路上遭遇 — 迁移途中的各种危险和机遇
 * 4. 势力接触 — 开始接触其他幸存者团体
 */
import type { SceneNode, RandomEventDef } from '../types.js';
export declare const PHASE4_SCENES: Record<string, SceneNode>;
export declare const PHASE4_EVENTS: RandomEventDef[];
/**
 * 将第四阶段内容合并到主内容包中
 */
export declare function mergePhase4Content(content: any): any;
//# sourceMappingURL=phase4.d.ts.map