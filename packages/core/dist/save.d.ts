import type { GameState } from './types.js';
export declare function crc32(input: string): number;
/** 序列化单局状态为 JSON 字符串（内部存储用）。 */
export declare function serialize(state: GameState): string;
/** 从 JSON 字符串还原单局状态。 */
export declare function deserialize(raw: string): GameState;
/** 导出文本：`<Base64(JSON)>:<crc32 hex 8位>`。 */
export declare function exportState(state: GameState): string;
/** 从导出文本还原；crc 不符 / 结构非法 / 解析失败均返回 null。 */
export declare function importState(raw: string): GameState | null;
//# sourceMappingURL=save.d.ts.map