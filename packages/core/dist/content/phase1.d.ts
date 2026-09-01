/**
 * 第一阶段：独居期（第1-7天）新增内容
 * 包含：序章扩展、老K引入、每日小事件、大事件第一次兽潮
 *
 * 设计原则：
 * 1. 角色栩栩如生 — 每个NPC有独特的性格、背景、行为模式
 * 2. 选择有重量 — 每个选择都有真正的后果
 * 3. 创新烧脑 — 迷雾的规则不是简单的危险，而是有逻辑的
 * 4. 乐趣 — 有悬念、有伏笔、有反转
 */
import type { SceneNode, RandomEventDef } from '../types.js';
export declare const PHASE1_SCENES: Record<string, SceneNode>;
export declare const PHASE1_EVENTS: RandomEventDef[];
/**
 * 将第一阶段内容合并到主内容包中
 * @param content 主内容包
 * @returns 合并后的内容包
 */
export declare function mergePhase1Content(content: any): any;
//# sourceMappingURL=phase1.d.ts.map