/**
 * 第五阶段：据点（第31-45天）内容
 * 包含：建立据点、基地建设系统、势力外交、第一次灯塔探索、更多随机事件
 *
 * 设计原则：
 * 1. 基地建设 — 从流浪到定居，建立自己的势力
 * 2. 势力外交 — 与其他幸存者团体建立关系
 * 3. 真相探索 — 第一次尝试进入灯塔，揭开迷雾真相的一角
 * 4. 系统深化 — 建筑、升级、资源管理
 */
import type { SceneNode, RandomEventDef } from '../types.js';
export declare const PHASE5_SCENES: Record<string, SceneNode>;
export declare const PHASE5_EVENTS: RandomEventDef[];
/**
 * 将第五阶段内容合并到主内容包中
 */
export declare function mergePhase5Content(content: any): any;
//# sourceMappingURL=phase5.d.ts.map