import { describe, it, expect } from 'vitest';
import { demoContent } from './content/index.js';
import { fullContent } from './content/full.js';
import { createInitialState, resolveScene, availableChoices, applyChoice, runDaily, applyEventChoice, resolveEvent, } from './engine.js';
import { Rng } from './rng.js';
describe('core engine smoke', () => {
    it('新局从 initialScene 起步', () => {
        const s = createInitialState(demoContent);
        expect(s.currentScene).toBe('start');
        expect(s.day).toBe(1);
        expect(s.resources.food.current).toBe(70);
    });
    it('选项落地资源并跳转', () => {
        const s = createInitialState(demoContent);
        const scene = resolveScene(demoContent, s.currentScene);
        const c = scene.choices.find((x) => x.id === 'search');
        const r = applyChoice(demoContent, s, c, new Rng(1));
        expect(s.resources.food.current).toBe(82);
        expect(s.currentScene).toBe('after_search');
        expect(r.outcome).toBeUndefined();
    });
    it('每日结算消耗资源并抽取事件', () => {
        const s = createInitialState(demoContent);
        const r = runDaily(demoContent, s, new Rng(2));
        expect(s.day).toBe(2);
        expect(s.resources.food.current).toBeLessThan(70);
        expect(r.event?.id).toBe('evt_howl');
        expect(s.pendingEvents).toContain('evt_howl');
    });
    it('事件选择后返回主场景并标记已触发', () => {
        const s = createInitialState(demoContent);
        runDaily(demoContent, s, new Rng(2));
        const ev = resolveEvent(demoContent, s.pendingEvents[0]);
        const c = ev.choices[0];
        applyEventChoice(demoContent, s, c, new Rng(3));
        expect(s.triggeredEvents).toContain('evt_howl');
        expect(s.currentScene).toBe('start');
        expect(s.flags.heard_howl).toBe(true);
    });
    it('全量内容(fullContent)可被引擎消费且不崩溃', () => {
        const s = createInitialState(fullContent);
        const rng = new Rng(42);
        // 跑 20 天，每天：若有事件则选第一个选项，否则在主场景选第一个可选项，然后推进一天
        for (let d = 0; d < 20 && !s.outcome; d++) {
            if (s.pendingEvents.length) {
                const ev = resolveEvent(fullContent, s.pendingEvents[0]);
                const c = availableChoices(ev.choices, s)[0] ?? ev.choices[0];
                applyEventChoice(fullContent, s, c, rng);
            }
            else {
                const scene = resolveScene(fullContent, s.currentScene);
                expect(scene).not.toBeNull();
                const cs = availableChoices(scene.choices, s);
                if (cs.length)
                    applyChoice(fullContent, s, cs[0], rng);
            }
            if (!s.outcome)
                runDaily(fullContent, s, rng);
        }
        expect(s.day).toBeGreaterThan(1);
    });
});
//# sourceMappingURL=engine.test.js.map