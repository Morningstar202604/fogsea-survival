import { describe, it, expect } from 'vitest';
import { demoContent } from './index.js';
import { fullContent } from './full.js';
import { validateContentPack } from './validate.js';
import { CAUSAL_RELATIONS } from '../gameConfig.js';
describe('content validator', () => {
    it('demoContent 全部校验通过', () => {
        const issues = validateContentPack(demoContent);
        expect(issues).toEqual([]);
    });
    it('fullContent（迁移生成）全部校验通过', () => {
        const issues = validateContentPack(fullContent);
        // 分组统计便于定位
        const byCode = new Map();
        for (const i of issues)
            byCode.set(i.code, (byCode.get(i.code) ?? 0) + 1);
        console.log('[validator] fullContent issues by code:', Object.fromEntries(byCode));
        console.log('[validator] first 30:', issues.slice(0, 30).map((i) => `${i.code} ${i.path} ${i.msg}`));
        expect(issues).toEqual([]);
    });
    it('因果关系 event_trigger 引用的事件必须存在于内容包', () => {
        const eventIds = new Set(fullContent.randomEvents.map((e) => e.id));
        const dangling = [];
        for (const causal of CAUSAL_RELATIONS) {
            const target = causal.effect.parameters?.event;
            if (causal.effect.type === 'event_trigger' && target && !eventIds.has(target)) {
                dangling.push(`${causal.id} -> ${target}`);
            }
        }
        expect(dangling).toEqual([]);
    });
});
//# sourceMappingURL=validate.test.js.map