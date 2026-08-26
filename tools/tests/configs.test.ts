// 配置引用完整性校验：加载真实 JSON 跑 validateConfigs，必须 0 问题
import { describe, it, expect } from 'vitest';
import { loadConfigsFromDisk } from '../shared/loadConfigs';
import { validateConfigs } from '../../assets/scripts/core/ConfigSchema';

describe('配置表完整性', () => {
    it('所有引用合法（物品/状态/事件/结局/天赋/文案池）', () => {
        const cfg = loadConfigsFromDisk();
        const issues = validateConfigs(cfg);
        expect(issues.map(i => `${i.path}: ${i.msg}`)).toEqual([]);
    });

    it('基础数量底线', () => {
        const cfg = loadConfigsFromDisk();
        expect(cfg.items.length).toBeGreaterThanOrEqual(36);
        expect(cfg.talents.length).toBe(12);
        expect(cfg.events.filter(e => e.type === 'explore').length).toBeGreaterThanOrEqual(8);
        expect(cfg.chatPools.every(p => p.messages.length >= 4)).toBe(true);
        expect(cfg.endings.length).toBe(14);
        expect((cfg.scenes ?? []).length).toBeGreaterThanOrEqual(8);   // v0.6 场景剧本
    });
});
