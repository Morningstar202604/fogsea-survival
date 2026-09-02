import { describe, it, expect } from 'vitest';
import { demoContent } from './index.js';
import { fullContent } from './full.js';
import { validateContentPack } from './validate.js';
import { CAUSAL_RELATIONS, PHASE_STORY } from '../gameConfig.js';
/** 主线场景图可达集：roots = 初始场景 + 阶段剧情入口；沿 next/jump/roll 目标扩散 */
function reachableStoryScenes() {
    const scenes = fullContent.storyline.scenes;
    const roots = new Set([fullContent.storyline.initialScene, ...PHASE_STORY.map((b) => b.entryScene)]);
    const seen = new Set(roots);
    const queue = [...seen];
    while (queue.length) {
        const node = scenes[queue.shift()];
        if (!node)
            continue;
        for (const c of node.choices ?? []) {
            const targets = [];
            if (c.next && c.next !== '__return__')
                targets.push(c.next);
            for (const e of c.effects ?? []) {
                if (e.kind === 'jump' && e.target)
                    targets.push(e.target);
                if (e.onSuccess)
                    targets.push(e.onSuccess);
                if (e.onFail)
                    targets.push(e.onFail);
            }
            for (const t of targets) {
                if (scenes[t] && !seen.has(t)) {
                    seen.add(t);
                    queue.push(t);
                }
            }
        }
    }
    return seen;
}
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
    it('主线场景不允许存在死场景（所有场景都可从初始场景或阶段剧情入口到达）', () => {
        const reachable = reachableStoryScenes();
        const all = Object.keys(fullContent.storyline.scenes);
        const dead = all.filter((id) => !reachable.has(id));
        expect(dead).toEqual([]);
    });
    it('引擎引用的全部结局（E01-E18）必须在内容中定义', () => {
        const defined = new Set([
            ...Object.keys(fullContent.storyline.endings),
            ...(fullContent.lines ?? []).flatMap((l) => Object.keys(l.endings ?? {})),
        ]);
        const required = Array.from({ length: 18 }, (_, i) => `E${String(i + 1).padStart(2, '0')}`);
        const missing = required.filter((id) => !defined.has(id));
        expect(missing).toEqual([]);
    });
    it('每条阶段剧情链从入口出发必须存在出口（回到枢纽或结束事件）', () => {
        const scenes = fullContent.storyline.scenes;
        for (const beat of PHASE_STORY) {
            const seen = new Set([beat.entryScene]);
            const queue = [beat.entryScene];
            let hasExit = false;
            while (queue.length) {
                const node = scenes[queue.shift()];
                if (!node)
                    continue;
                for (const c of node.choices ?? []) {
                    if (c.next === 'start' || c.next === '__return__')
                        hasExit = true;
                    const t = c.next && c.next !== '__return__' && c.next !== 'start' ? c.next : null;
                    if (t && scenes[t] && !seen.has(t)) {
                        seen.add(t);
                        queue.push(t);
                    }
                }
            }
            if (!hasExit) {
                throw new Error(`阶段剧情链 ${beat.entryScene}（${beat.title}）没有 return/start 出口，玩家会被困住`);
            }
        }
    });
});
//# sourceMappingURL=validate.test.js.map