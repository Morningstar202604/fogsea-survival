// 游戏总装配：配置加载、单局生命周期、全局档案（无引擎依赖，Cocos/Web 共用）
import type { AllConfigs } from './ConfigSchema';
import { SaveManager } from './SaveManager';
import type { StorageBackend } from './SaveManager';
import { RNG } from './RNG';
import { createRunState } from '../systems/RunModel';
import type { GameCtx } from '../systems/RunModel';
import { TalentSystem } from '../systems/TalentSystem';
import { InventorySystem } from '../systems/InventorySystem';
import type { ChatRoller } from '../systems/WorldChannelSystem';
import { createChatRoller } from '../systems/WorldChannelSystem';
import { AchievementSystem } from '../systems/AchievementSystem';
import type { RunSnapshot } from '../systems/AchievementSystem';
import { SAVE_VERSION, DEFAULT_SETTINGS } from '../data/SaveSchema';
import type { RunState, GlobalProfile } from '../data/SaveSchema';

/** Web/WebView 通用存储：优先 window.localStorage；不可用时显式降级为内存存档（不静默丢档） */
class LocalStorageBackend implements StorageBackend {
    private mem = new Map<string, string>();
    private checked = false;
    private ok = false;

    private usable(): boolean {
        if (this.checked) return this.ok;
        this.checked = true;
        try {
            const ls = globalThis.localStorage;
            const k = '__qs_probe__';
            ls.setItem(k, '1');
            this.ok = ls.getItem(k) === '1';
            ls.removeItem(k);
        } catch {
            this.ok = false;
        }
        if (!this.ok) {
            // 明确告知降级，绝不假装已保存
            console.warn('[存档] localStorage 不可用，本次会话回退为内存存档（关闭应用即丢失）');
        }
        return this.ok;
    }

    get(key: string): string | null {
        if (!this.usable()) return this.mem.get(key) ?? null;
        try { return globalThis.localStorage.getItem(key); } catch { return this.mem.get(key) ?? null; }
    }
    set(key: string, value: string): void {
        if (!this.usable()) { this.mem.set(key, value); return; }
        try { globalThis.localStorage.setItem(key, value); } catch { this.mem.set(key, value); }
    }
}

/** 平台注册配置加载器：Cocos 版由 ConfigLoader 自注册，Web 版在入口用 fetch 实现 */
let configLoaderImpl: (() => Promise<AllConfigs>) | null = null;
export function registerConfigLoader(fn: () => Promise<AllConfigs>): void {
    configLoaderImpl = fn;
}

export class GameManager {
    private static _i: GameManager | null = null;
    static get I(): GameManager {
        if (!this._i) this._i = new GameManager();
        return this._i;
    }

    cfg: AllConfigs | null = null;
    ctx: GameCtx | null = null;
    global: GlobalProfile = {
        version: SAVE_VERSION, totalRuns: 0, bestDaysSurvived: 0,
        endingsUnlocked: [], achievements: [], totalChestsOpened: 0,
        settings: { ...DEFAULT_SETTINGS },
    };
    save = new SaveManager(new LocalStorageBackend());
    chat: ChatRoller | null = null;

    async init(): Promise<void> {
        if (!configLoaderImpl) throw new Error('未注册配置加载器（应 import 对应平台的 ConfigLoader）');
        this.cfg = await configLoaderImpl();
        this.global = this.save.loadGlobal();
        // 继续存档：重建上下文
        const run = this.save.loadRun();
        if (run) this.attachRun(run);
    }

    hasRunningSave(): boolean {
        return this.ctx !== null && !this.ctx.run.endingId;
    }

    /** 开新局：抽好的天赋直接传入 */
    newRun(talentId: string, seed?: number): GameCtx {
        const s = seed ?? Math.floor(Math.random() * 0x7fffffff);
        const run = createRunState(s, talentId);
        this.attachRun(run);
        // 新手礼包：统一走 InventorySystem，容量规则与游戏内一致（含天赋/储物箱加成）
        InventorySystem.add(this.ctx!, 'food_black_bread', 2);
        InventorySystem.add(this.ctx!, 'water_clean', 2);
        InventorySystem.add(this.ctx!, 'mat_wood', 10);
        this.persist();
        return this.ctx!;
    }

    continueRun(): GameCtx | null {
        return this.hasRunningSave() ? this.ctx : null;
    }

    private attachRun(run: RunState): void {
        if (!this.cfg) throw new Error('GameManager 未初始化');
        const talentDef = this.cfg.talents.find(t => t.id === run.talentId) ?? null;
        this.ctx = {
            cfg: this.cfg,
            run,
            rng: new RNG(run.seed),
            talent: TalentSystem.buildRuntime(talentDef),
        };
        this.chat = createChatRoller(this.ctx);
    }

    persist(): void {
        if (this.ctx) this.save.saveRun(this.ctx.run);
    }

    /** 单局结束：结算全局档案，返回新解锁成就 id */
    settleRun(daysSurvived: number): string[] {
        if (!this.ctx) return [];
        const before = this.global.endingsUnlocked.length;
        void before;
        const snap: RunSnapshot = {
            daysSurvived,
            endingId: this.ctx.run.endingId ?? 'E04',
            talentId: this.ctx.run.talentId,
            chestsOpened: this.ctx.run.counters.chestsOpened ?? 0,
            dirtyWaterDrunk: this.ctx.run.counters.dirtyWaterDrunk ?? 0,
            disastersAllPassed:
                this.ctx.run.flags.includes('disaster_cold_passed') &&
                this.ctx.run.flags.includes('disaster_acid_passed') &&
                this.ctx.run.flags.includes('disaster_beast_passed'),
            cookedMeals: this.ctx.run.counters.cookedMeals ?? 0,
        };
        const newly = AchievementSystem.settle(this.global, snap);
        this.save.saveGlobal(this.global);
        this.save.clearRun();
        this.chat = null;
        const endedCtx = this.ctx;
        this.ctx = null;
        void endedCtx;
        return newly;
    }
}
