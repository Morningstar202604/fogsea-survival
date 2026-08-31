/**
 * 第二阶段：互助组（第8-14天）内容
 * 包含：朵朵引入完整剧情线、更多NPC、大量随机事件、团体冲突
 *
 * 设计原则：
 * 1. 角色栩栩如生 — 每个NPC有独特的性格、背景、行为模式
 * 2. 选择有重量 — 每个选择都有真正的后果
 * 3. 创新烧脑 — 迷雾的规则、人性的考验、真相的伏笔
 * 4. 情感共鸣 — 让玩家真正关心这些角色
 */
import type { SceneNode, RandomEventDef } from '../types.js';
export declare const PHASE2_SCENES: Record<string, SceneNode>;
export declare const PHASE2_EVENTS: RandomEventDef[];
/**
 * 将第二阶段内容合并到主内容包中
 */
export declare function mergePhase2Content(content: any): any;
//# sourceMappingURL=phase2.d.ts.map