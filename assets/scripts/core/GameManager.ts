// 游戏总装配：配置加载、单局生命周期、全局档案
import { sys } from 'cc';
import type { AllConfigs } from './ConfigSchema';
import { loadAllConfigs } from './ConfigLoader';
import { SaveManager } from './SaveManager';
import type { StorageBackend } from './SaveManager';
import { RNG } from './RNG';
import { createRunState } from '../systems/RunModel';
import type { GameCtx } from '../systems/RunModel';
import { TalentSystem } from '../systems/TalentSystem';
import type { ChatRoller } from '../systems/WorldChannelSystem';
import { createChatRoller } from '../systems/WorldChannelSystem';
import { AchievementSystem } from '../systems/AchievementSystem';
import type { RunSnapshot } from '../systems/AchievementSystem';
import { SAVE_VERSION } from '../data/SaveSchema';
import type { RunState, GlobalProfile } from '../data/SaveSchema';

class LocalStorageBackend implements StorageBackend {
    get(key: string): string | null {
        return sys.localStorage.getItem(key);
    }
    set(key: string, value: string): void {
        sys.localStorage.setItem(key, value);
    }
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
    };
    save = new SaveManager(new LocalStorageBackend());
    chat: ChatRoller | null = null;

    async init(): Promise<void> {
        this.cfg = await loadAllConfigs();
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
        // 新手礼包
        this.addLater(run, 'food_black_bread', 2);
        this.addLater(run, 'water_clean', 2);
        this.addLater(run, 'mat_wood', 10);
        this.attachRun(run);
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

    private addLater(run: RunState, itemId: string, count: number): void {
        // 简单入包：工具占格，材料堆叠（与 InventorySystem 规则一致的轻量版）
        const def = this.cfg!.items.find(i => i.id === itemId)!;
        let left = count;
        if (!def.stackable) {
            while (left-- > 0 && run.inventory.length < run.bagCap)
                run.inventory.push({ itemId, count: 1 });
        } else {
            const slot = run.inventory.find(s => s.itemId === itemId && s.count < def.maxStack);
            if (slot) {
                const take = Math.min(def.maxStack - slot.count, left);
                slot.count += take; left -= take;
            }
            while (left > 0 && run.inventory.length < run.bagCap) {
                const take = Math.min(def.maxStack, left);
                run.inventory.push({ itemId, count: take });
                left -= take;
            }
        }
    }
}
