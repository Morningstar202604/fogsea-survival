/**
 * 内容校验器（SchemaValidator）。
 * 对齐开发设计文档 §3.11 规则清单，按当前精简 schema 落地。
 * 重点覆盖迁移缺陷三类：选项重复 / next 自循环 / 字符泄漏。
 * 返回 ValidationIssue[]；空数组 = 通过。
 */
import type { ContentPack } from '../types.js';
export interface ValidationIssue {
    code: string;
    path: string;
    msg: string;
}
/** 全量校验一个 ContentPack，返回错误清单（空数组=通过） */
export declare function validateContentPack(content: ContentPack): ValidationIssue[];
/** 便捷封装：返回是否通过 */
export declare function isContentValid(content: ContentPack): boolean;
//# sourceMappingURL=validate.d.ts.map