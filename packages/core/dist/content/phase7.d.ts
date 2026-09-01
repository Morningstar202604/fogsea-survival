/**
 * 第七阶段：基地深化（第66-90天）内容
 * 包含：基地建设系统、科技研究树、超能力培养、外交系统、新威胁
 *
 * 设计原则：
 * 1. 基地建设 — 从据点升级为真正的基地，完整的建筑升级系统
 * 2. 科技树 — 研究新科技，解锁新能力
 * 3. 超能力培养 — 超能力者的训练和成长
 * 4. 外交 — 与其他势力的关系管理
 * 5. 新威胁 — 变异生物、敌对势力、内部矛盾
 */
import type { SceneNode, RandomEventDef } from '../types.js';
export declare const PHASE7_SCENES: Record<string, SceneNode>;
export declare const PHASE7_EVENTS: RandomEventDef[];
/**
 * 将第七阶段内容合并到主内容包中
 */
export declare function mergePhase7Content(content: any): any;
//# sourceMappingURL=phase7.d.ts.map