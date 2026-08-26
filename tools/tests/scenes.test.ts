// 场景（多拍剧本）引擎单测：调度 / 编译 / weave 推进 / 玩法钩子
import { describe, it, expect } from 'vitest';
import { RNG } from '../../assets/scripts/core/RNG';
import { createRunState } from '../../assets/scripts/systems/RunModel';
import { TalentSystem } from '../../assets/scripts/systems/TalentSystem';
import { InventorySystem } from '../../assets/scripts/systems/InventorySystem';
import { EventEngine } from '../../assets/scripts/systems/EventEngine';
import { EndingSystem } from '../../assets/scripts/systems/EndingSystem';
import { SceneSystem } from '../../assets/scripts/systems/SceneSystem';
import type { GameCtx } from '../../assets/scripts/systems/RunModel';
import type { EventDef } from '../../assets/scripts/data/EventDefs';
import { loadConfigsFromDisk } from '../shared/loadConfigs';

function makeCtx(seed = 42): GameCtx {
    const cfg = loadConfigsFromDisk();
    const talentDef = cfg.talents.find(t => t.id === 'T02')!;
    const run = createRunState(seed, 'T02');
    return { cfg, run, rng: new RNG(seed), talent: TalentSystem.buildRuntime(talentDef) };
}

/** 从当前活动场景一路选第 pickIdx 个选项，直到本幕结束；返回访问过的节点 id */
function walkScene(ctx: GameCtx, pickIdx: (ev: EventDef, step: number) => number, maxSteps = 24): string[] {
    const visited: string[] = [];
    for (let i = 0; i < maxSteps; i++) {
        const ev = SceneSystem.activeNode(ctx);
        if (!ev) break;
        visited.push(ev.id);
        const idx = Math.min(pickIdx(ev, i), ev.options.length - 1);
        const branch = EventEngine.resolveOption(ctx, ev, idx);
        const next = SceneSystem.followUp(ctx, ev, branch);
        if (!next) break;
    }
    return visited;
}

describe('SceneSystem 调度', () => {
    it('D1~2 无任何场景可触发', () => {
        const ctx = makeCtx();
        ctx.run.day = 2;
        expect(SceneSystem.morningStart(ctx)).toBeNull();
        expect(ctx.run.scene).toBeNull();
    });

    it('D3 触发朵朵相遇幕，写入 run.scene', () => {
        const ctx = makeCtx();
        ctx.run.day = 3;
        expect(SceneSystem.morningStart(ctx)).toBe('duoduo_s1_meet');
        expect(ctx.run.scene?.nodeId).toBe('gate');
        // 已触发过不再重复开新幕（活动场景优先恢复）
        expect(SceneSystem.morningStart(ctx)).toBe('duoduo_s1_meet');
    });

    it('被赶走（kid_repelled）后整条线封锁', () => {
        const ctx = makeCtx();
        ctx.run.day = 6;
        ctx.run.flags.push('kid_repelled');
        expect(SceneSystem.morningStart(ctx)).toBeNull();
    });

    it('同晨多幕就绪时取优先级最高者（危机幕）', () => {
        const ctx = makeCtx();
        ctx.run.day = 9;
        ctx.run.flags.push('kid_met');
        ctx.run.stats.hp = 90;
        InventorySystem.add(ctx, 'tool_torch', 1);
        const sid = SceneSystem.morningStart(ctx)!;
        const def = ctx.cfg.scenes!.find(s => s.id === sid)!;
        const best = ctx.cfg.scenes!
            .filter(d => SceneSystem.eligible(ctx, d))
            .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))[0];
        expect(def.id).toBe(best.id);
        expect(sid).toBe('duoduo_s6_crisis');
    });
});

describe('SceneSystem 推进与玩法钩子', () => {
    it('相遇幕·分罐头全流程：消耗道具、置 flag、登记完结', () => {
        const ctx = makeCtx(7);
        ctx.run.day = 3;
        InventorySystem.add(ctx, 'food_canned', 1);
        const before = InventorySystem.count(ctx, 'food_canned');
        SceneSystem.morningStart(ctx);

        const visited = walkScene(ctx, () => 0);   // 每拍都选第一个可用选项
        expect(visited.length).toBeGreaterThanOrEqual(3);
        expect(ctx.run.flags).toContain('kid_met');
        expect(InventorySystem.count(ctx, 'food_canned')).toBe(before - 1);
        expect(ctx.run.scenesDone).toContain('duoduo_s1_meet');
        expect(ctx.run.scene).toBeNull();
    });

    it('赶走路径：短收束且不置 kid_met', () => {
        const ctx = makeCtx(11);
        ctx.run.day = 3;
        SceneSystem.morningStart(ctx);
        // gate 节点第 3 个选项 = 赶走（前两个缺材料不可用也允许直接结算，这里直接按索引选）
        const ev = SceneSystem.activeNode(ctx)!;
        const idx = ev.options.findIndex(o => o.text.includes('赶走'));
        const branch = EventEngine.resolveOption(ctx, ev, idx);
        SceneSystem.followUp(ctx, ev, branch);          // 跌落到 repent 收束拍
        walkScene(ctx, () => 0);
        expect(ctx.run.flags).toContain('kid_repelled');
        expect(ctx.run.flags).not.toContain('kid_met');
        expect(ctx.run.scenesDone).toContain('duoduo_s1_meet');
    });

    it('危机幕·火把线救下朵朵（kid_saved）', () => {
        const ctx = makeCtx(21);
        ctx.run.day = 9;
        ctx.run.flags.push('kid_met');
        ctx.run.stats.hp = 90;
        InventorySystem.add(ctx, 'tool_torch', 1);
        SceneSystem.morningStart(ctx);

        walkScene(ctx, ev => {
            if (ev.id.endsWith('/wake')) return 0;      // 火把冲锋
            if (ev.id.endsWith('/barn')) return 0;      // 绕后墙
            return 0;                                   // shadow/saved_end 首选项
        });
        expect(ctx.run.flags).toContain('kid_saved');
        expect(ctx.run.scenesDone).toContain('duoduo_s6_crisis');
    });

    it('apSpend 效果真实扣减行动点', () => {
        const ctx = makeCtx(33);
        ctx.run.day = 7;
        ctx.run.apLeft = 3;
        ctx.run.flags.push('kid_met');
        ['duoduo_s2_frog', 'duoduo_s3_letters', 'duoduo_s4_bear'].forEach(id =>
            ctx.run.scenesDone.push(id));               // 让 s5 成为唯一就绪幕
        expect(SceneSystem.morningStart(ctx)).toBe('duoduo_s5_play');

        const beforeAp = ctx.run.apLeft;
        walkScene(ctx, () => 0);                        // 选「陪她玩」
        expect(ctx.run.apLeft).toBeLessThan(beforeAp);
        expect(ctx.run.flags).toContain('kid_mistwise');
    });

    it('requires 门槛：庇护所等级与剧情 flag 正确锁选项', () => {
        const ctx = makeCtx(55);
        ctx.run.day = 12;
        ctx.run.flags.push('kid_saved');
        ctx.run.scene = { id: 'duoduo_s7_shelter', nodeId: 'eve' };
        const ev = SceneSystem.activeNode(ctx)!;

        ctx.run.shelterLevel = 1;
        expect(EventEngine.optionAvailable(ctx, ev.options[0])).toBe(false);
        ctx.run.shelterLevel = 2;
        expect(EventEngine.optionAvailable(ctx, ev.options[0])).toBe(true);
        expect(EventEngine.optionAvailable(ctx, ev.options[1])).toBe(true);

        // map 节点：未学识字时「让她读字」应锁定
        ctx.run.scene = { id: 'duoduo_s7_shelter', nodeId: 'map' };
        const mapEv = SceneSystem.activeNode(ctx)!;
        const readOpt = mapEv.options.find(o => o.text.includes('读出来'))!;
        expect(EventEngine.optionLockedReason(ctx, readOpt)).toBe('条件未满足');
        ctx.run.flags.push('kid_letters');
        expect(EventEngine.optionLockedReason(ctx, readOpt)).toBeNull();
    });

    it('跨天挂起恢复：run.scene 持久化后 morningStart 原样续演', () => {
        const ctx = makeCtx(66);
        ctx.run.day = 3;
        SceneSystem.morningStart(ctx);
        ctx.run.day = 4;                                 // 模拟隔了一夜
        expect(SceneSystem.morningStart(ctx)).toBe('duoduo_s1_meet');
        const ev = SceneSystem.activeNode(ctx)!;
        expect(ev.id.startsWith('scene:duoduo_s1_meet/')).toBe(true);
    });
});

describe('老K线：链式触发与调度隔离', () => {
    it('chain 幕不被晨间调度器主动开演（只由事件链入）', () => {
        const ctx = makeCtx(88);
        ctx.run.day = 5;                                 // laok_s1_pact 无 dayMin 限制
        const sid = SceneSystem.morningStart(ctx);
        expect(sid).not.toBeNull();
        expect(sid).not.toBe('laok_s1_pact');            // 调度器只会挑 duoduo 线
    });

    it('followUp 解析 scene:id/node 引用并挂起活动场景', () => {
        const ctx = makeCtx(99);
        const fakeEv = { id: 'evt_village_photo' } as unknown as EventDef;
        const next = SceneSystem.followUp(ctx, fakeEv, { weight: 100, text: '', nextEvent: 'scene:laok_s1_pact/pact' });
        expect(next).not.toBeNull();
        expect(next!.id).toBe('scene:laok_s1_pact/pact');
        expect(ctx.run.scene).toEqual({ id: 'laok_s1_pact', nodeId: 'pact' });
        // 从 pact 一路演到 dawn 收束拍，不卡死、不出界
        const visited = walkScene(ctx, () => 0);
        expect(visited.length).toBeGreaterThanOrEqual(3);
        expect(ctx.run.scenesDone).toContain('laok_s1_pact');
    });

    it('E06 判定兼容：ally+trust 未背叛 → D15 夜同行结局', () => {
        const ctx = makeCtx(101);
        ctx.run.day = 15;
        ctx.run.phase = 'night';
        ctx.run.flags.push('laok_ally', 'laok_trust');
        expect(EndingSystem.evaluate(ctx)).toBe('E06');
    });

    it('老K线内容规模：8 幕 / ≥29 拍 / 文本密度达标', () => {
        const cfg = loadConfigsFromDisk();
        const laok = cfg.scenes!.filter(s => s.id.startsWith('laok_'));
        expect(laok.length).toBe(8);
        const nodes = laok.reduce((n, s) => n + s.nodes.length, 0);
        expect(nodes).toBeGreaterThanOrEqual(29);
        const chars = laok.reduce((n, s) => n + s.nodes.reduce((m, nd) => m + nd.text.length, 0), 0);
        expect(chars).toBeGreaterThan(4000);
    });
});

describe('朵朵线内容规模与引用完整性', () => {
    it('全部场景配置引用合法（含在 configs.test 主校验内），朵朵线 ≥ 28 拍', () => {
        const cfg = loadConfigsFromDisk();
        const duoduo = cfg.scenes!.filter(s => s.id.startsWith('duoduo_'));
        expect(duoduo.length).toBeGreaterThanOrEqual(8);
        const nodes = duoduo.reduce((n, s) => n + s.nodes.length, 0);
        expect(nodes).toBeGreaterThanOrEqual(28);
        const chars = duoduo.reduce((n, s) => n + s.nodes.reduce((m, nd) => m + nd.text.length, 0), 0);
        expect(chars).toBeGreaterThan(4000);             // 叙事密度底线
    });
});
