// 技能树系统单元测试（v0.7）
import { describe, it, expect } from 'vitest';
import { RNG } from '../../assets/scripts/core/RNG';
import { createRunState, type GameCtx } from '../../assets/scripts/systems/RunModel';
import { TalentSystem } from '../../assets/scripts/systems/TalentSystem';
import { SkillSystem } from '../../assets/scripts/systems/SkillSystem';
import { EventEngine } from '../../assets/scripts/systems/EventEngine';
import { SaveManager, MemoryStorage } from '../../assets/scripts/core/SaveManager';
import { SAVE_VERSION, type RunState } from '../../assets/scripts/data/SaveSchema';
import { SKILL_BRANCHES, XP_PER_LEVEL } from '../../assets/scripts/data/SkillDefs';
import { loadConfigsFromDisk } from '../shared/loadConfigs';

function makeCtx(seed = 7): GameCtx {
    const cfg = loadConfigsFromDisk();
    const talentDef = cfg.talents.find(t => t.id === 'T02')!;
    return {
        cfg,
        run: createRunState(seed, 'T02'),
        rng: new RNG(seed),
        talent: TalentSystem.buildRuntime(talentDef),
    };
}

describe('SkillSystem：XP 与等级', () => {
    it('grant 累计 XP，level = floor(xp/100)，封顶 10', () => {
        const ctx = makeCtx();
        expect(SkillSystem.level(ctx, 'survival')).toBe(0);
        SkillSystem.grant(ctx, 'survival', 99);
        expect(SkillSystem.level(ctx, 'survival')).toBe(0);
        SkillSystem.grant(ctx, 'survival', 1);
        expect(SkillSystem.level(ctx, 'survival')).toBe(1);
        SkillSystem.grant(ctx, 'survival', 10000);
        expect(SkillSystem.level(ctx, 'survival')).toBe(10);   // 封顶
    });

    it('xpToNext 正确计算升级缺口', () => {
        const ctx = makeCtx();
        SkillSystem.grant(ctx, 'craft', 30);
        expect(SkillSystem.xpToNext(ctx, 'craft')).toBe(XP_PER_LEVEL - 30);
        SkillSystem.grant(ctx, 'craft', 70);
        expect(SkillSystem.xpToNext(ctx, 'craft')).toBe(XP_PER_LEVEL);   // 刚升级，下一整级
        SkillSystem.grant(ctx, 'craft', XP_PER_LEVEL * 20);              // 远超上限
        expect(SkillSystem.level(ctx, 'craft')).toBe(10);                // 封顶
        expect(SkillSystem.xpToNext(ctx, 'craft')).toBe(0);
    });

    it('grantForAction 按 ACTION_XP 表多线发放', () => {
        const ctx = makeCtx();
        SkillSystem.grantForAction(ctx, 'explore');            // [15,5,0,3,0]
        expect(SkillSystem.xp(ctx, 'survival')).toBe(15);
        expect(SkillSystem.xp(ctx, 'combat')).toBe(5);
        expect(SkillSystem.xp(ctx, 'knowledge')).toBe(3);
        expect(SkillSystem.xp(ctx, 'social')).toBe(0);
        // cookFine → craft+18 knowledge+5
        SkillSystem.grantForAction(ctx, 'cookFine');
        expect(SkillSystem.xp(ctx, 'craft')).toBe(18);
    });

    it('totalLevel 为五线之和', () => {
        const ctx = makeCtx();
        SkillSystem.grant(ctx, 'survival', 150);
        SkillSystem.grant(ctx, 'social', 250);
        expect(SkillSystem.totalLevel(ctx)).toBe(1 + 2);
    });
});

describe('SkillSystem：分支解锁与特性', () => {
    it('无前置分支直接可用；链式前置逐级开启', () => {
        const ctx = makeCtx();
        // forager 无前置
        expect(SkillSystem.branchUnlocked(ctx, 'forager')).toBe(true);
        // pathfinder 需要 forager Lv1（=生存 Lv1）
        expect(SkillSystem.branchUnlocked(ctx, 'pathfinder')).toBe(false);
        SkillSystem.grant(ctx, 'survival', XP_PER_LEVEL);
        expect(SkillSystem.branchUnlocked(ctx, 'pathfinder')).toBe(true);
        // endurer 需要 pathfinder「分支等级」≥1 —— 分支等级跟随线等级
        expect(SkillSystem.branchUnlocked(ctx, 'endurer')).toBe(true);
    });

    it('跨线前置：tactician 需要 knowledge 线达标（branchId 引用）', () => {
        const ctx = makeCtx();
        SkillSystem.grant(ctx, 'combat', XP_PER_LEVEL);        // hunter/brawler 链就绪
        expect(SkillSystem.branchUnlocked(ctx, 'brawler')).toBe(true);
        expect(SkillSystem.branchUnlocked(ctx, 'tactician')).toBe(false);   // 缺 scout精英 Lv1
        SkillSystem.grant(ctx, 'knowledge', XP_PER_LEVEL);     // scout精英 Lv1
        expect(SkillSystem.branchUnlocked(ctx, 'tactician')).toBe(true);
    });

    it('featureUnlocked 随线等级点亮 unlocksByLevel', () => {
        const ctx = makeCtx();
        expect(SkillSystem.featureUnlocked(ctx, 'herb_quality_1')).toBe(false);
        SkillSystem.grant(ctx, 'survival', XP_PER_LEVEL);      // forager Lv1
        expect(SkillSystem.featureUnlocked(ctx, 'herb_quality_1')).toBe(true);
        expect(SkillSystem.featureUnlocked(ctx, 'herb暴击')).toBe(false);   // Lv2 特性
        SkillSystem.grant(ctx, 'survival', XP_PER_LEVEL);      // Lv2
        expect(SkillSystem.featureUnlocked(ctx, 'herb暴击')).toBe(true);
    });

    it('15 分支定义完整：每分支 3 级解锁、id 唯一、prereq 可解析', () => {
        const ids = new Set<string>();
        for (const b of SKILL_BRANCHES) {
            expect(ids.has(b.id)).toBe(false);
            ids.add(b.id);
            expect(b.unlocksByLevel.length).toBe(3);
            for (const pre of b.prereq ?? []) {
                if (pre.branchId) expect(ids.has(pre.branchId) || SKILL_BRANCHES.some(x => x.id === pre.branchId)).toBe(true);
                else expect(SKILL_BRANCHES.some(x => x.id === pre.branch)).toBe(true);
            }
        }
        expect(SKILL_BRANCHES.length).toBe(15);
    });
});

describe('SkillSystem：灵感', () => {
    it('journal 触发灵感积累（概率驱动，种子固定可测边界）', () => {
        const ctx = makeCtx(20260826);
        let triggered = 0;
        for (let i = 0; i < 200; i++) {
            SkillSystem.grantForAction(ctx, 'journal');
            if ((ctx.run.skills!.inspiration ?? 0) > 0) triggered++;
            ctx.run.skills!.inspiration = 0;                    // 重置便于统计触发率
        }
        expect(triggered).toBeGreaterThan(10);                  // 15% 期望 ≈30，下界宽松防抖动
        expect(triggered).toBeLessThan(80);
    });

    it('consumeInspiration 消耗点数并给 3 次 buff；buff 期间不可叠加，耗尽后可再次点燃', () => {
        const ctx = makeCtx();
        ctx.run.skills!.inspiration = 2;
        expect(SkillSystem.hasInspiration(ctx)).toBe(false);
        // 第一次点燃
        expect(SkillSystem.consumeInspiration(ctx)).toBe(true);
        expect(SkillSystem.hasInspiration(ctx)).toBe(true);
        expect(ctx.run.skills!.inspirationCharges).toBe(3);
        // buff 激活期间再次消耗 → 拒绝（防叠加）
        expect(SkillSystem.consumeInspiration(ctx)).toBe(false);
        // 三次 tick 耗尽 buff
        SkillSystem.tickInspirationCharge(ctx);
        SkillSystem.tickInspirationCharge(ctx);
        SkillSystem.tickInspirationCharge(ctx);
        expect(SkillSystem.hasInspiration(ctx)).toBe(false);
        // 剩余点数(1)可再次点燃；之后点数为空 → 拒绝
        expect(SkillSystem.consumeInspiration(ctx)).toBe(true);
        expect(ctx.run.skills!.inspiration).toBe(0);
        SkillSystem.tickInspirationCharge(ctx); SkillSystem.tickInspirationCharge(ctx); SkillSystem.tickInspirationCharge(ctx);
        expect(SkillSystem.consumeInspiration(ctx)).toBe(false);
    });
});

describe('EventEngine：skillLevel 选项门槛', () => {
    it('等级不足给出锁定原因，达标后放行', () => {
        const ctx = makeCtx();
        const opt = {
            text: '测试',
            requires: { skillLevel: { knowledge: 2 } },
            results: [{ weight: 100, text: '' }],
        } as never;
        expect(EventEngine.optionLockedReason(ctx, opt)).toContain('knowledge');
        SkillSystem.grant(ctx, 'knowledge', XP_PER_LEVEL * 2);
        expect(EventEngine.optionLockedReason(ctx, opt)).toBeNull();
    });
});

describe('SaveSchema v4 迁移', () => {
    it('v3 存档迁移后带 skills 字段且版本升到当前', () => {
        const store = new MemoryStorage();
        const sm = new SaveManager(store);
        const oldRun = createRunState(1, 'T01') as RunState;
        delete (oldRun as Partial<RunState>).skills;
        oldRun.version = 3;                                     // 伪装旧档
        store.set('qs_run', JSON.stringify(oldRun));
        store.set('qs_run_sum', String(0));                     // 校验和置 0 会失败？
        // 直接写正确校验和：借 saveRun 不行（会盖版本），手动算
        const raw = store.get('qs_run')!;
        let h = 5381;
        for (let i = 0; i < raw.length; i++) h = (((h << 5) + h + raw.charCodeAt(i)) >>> 0);
        store.set('qs_run_sum', String(h));

        const loaded = sm.loadRun()!;
        expect(loaded.version).toBe(SAVE_VERSION);
        expect(loaded.skills).toBeDefined();
        expect(loaded.skills!.xp.social).toBe(0);
        expect(loaded.skills!.inspirationCharges).toBe(0);
    });
});
