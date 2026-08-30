/**
 * v1.0 NPC 羁绊系统
 *
 * 全民求生流的"队伍/羁绊"钩子：与主角产生联结的幸存者们。
 * 好感度由玩家在对应角色支线中走过的场景数推导（探索越多越亲密），
 * 无需内容侧逐条埋点；支线完结（line_done_* 标记）额外加成。
 */
import type { GameState } from './types.js';
export interface NpcDef {
    id: string;
    name: string;
    title: string;
    /** 对应支线场景 id 前缀 */
    linePrefix: string;
    /** 支线首个场景 id（用于检测 line_done_ 标记） */
    entryScene: string;
    description: string;
}
export declare const NPC_ROSTER: NpcDef[];
export interface NpcStatus extends NpcDef {
    favor: number;
    levelName: string;
    lineDone: boolean;
}
/** 汇总全体 NPC 羁绊状态（纯函数，UI 直接消费）。 */
export declare function getNpcStatuses(state: GameState): NpcStatus[];
//# sourceMappingURL=npc.d.ts.map