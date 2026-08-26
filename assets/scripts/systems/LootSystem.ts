// 宝箱品质掉落：木→铜→银→金
import { EventBus, GameEvents } from '../core/EventBus';
import type { LootTable } from '../data/EventDefs';
import { weightedPickWith } from '../core/RNG';
import type { GameCtx } from './RunModel';
import { InventorySystem } from './InventorySystem';

export const CHEST_TIERS = ['wood', 'copper', 'silver', 'gold'] as const;
export type ChestTier = (typeof CHEST_TIERS)[number];

/** 基础品质概率（策划案 §6：55/28/13/4） */
export const BASE_TIER_RATES: Record<ChestTier, number> = {
    wood: 55, copper: 28, silver: 13, gold: 4,
};

export interface ChestOpenResult {
    tier: ChestTier;
    upgradedByTalent: boolean;   // T08 触发升档
    gained: { itemId: string; count: number }[];
    overflowed: boolean;         // 背包满导致部分丢失
}

export class LootSystem {
    private static tables(ctx: GameCtx): Map<ChestTier, LootTable> {
        if (!this._tables || this._cfgRef !== ctx.cfg) {
            this._cfgRef = ctx.cfg;
            this._tables = new Map(ctx.cfg.lootTables.map(t => [t.tier, t]));
        }
        return this._tables;
    }
    private static _tables: Map<ChestTier, LootTable> | null = null;
    private static _cfgRef: unknown = null;

    /**
     * 幸运值（0~40）：天气 + 庇护所 + 福星天赋 的合成。
     * 作用于品质分布：gold/silver 概率按 (1+luck/100) 放大后归一化。
     */
    static luckOf(ctx: GameCtx): number {
        let luck = 0;
        if (ctx.run.weather === 'sunny') luck += 10;
        else if (ctx.run.weather === 'fog_thick') luck -= 6;
        luck += (ctx.run.shelterLevel - 1) * 3;
        luck += ctx.talent.chestUpgradeChancePct * 0.75;   // T08：20% → +15
        return Math.max(0, Math.round(luck));
    }

    /**
     * 带幸运修正的品质判定（不改写 BASE_TIER_RATES，luck=0 时与基础分布一致）
     */
    static rollTierWithLuck(ctx: GameCtx): ChestTier {
        const luck = this.luckOf(ctx);
        if (luck <= 0) return this.rollTier(ctx);
        const k = 1 + luck / 100;
        const w: Record<ChestTier, number> = {
            wood: BASE_TIER_RATES.wood,
            copper: BASE_TIER_RATES.copper,
            silver: BASE_TIER_RATES.silver * k,
            gold: BASE_TIER_RATES.gold * k,
        };
        const total = w.wood + w.copper + w.silver + w.gold;
        let roll = ctx.rng.next() * total;
        for (const t of [...CHEST_TIERS].reverse()) {
            roll -= w[t];
            if (roll < 0) return t;
        }
        return 'wood';
    }

    /** 保底计数器（软保底 5 箱起 silver 渐涨，硬保底 9 箱必银、14 箱必金） */
    private static pityTake(ctx: GameCtx): { soft: number; hardSilver: boolean; hardGold: boolean } {
        const c = ctx.run.counters;
        const pity = (c.pity ?? 0) + 1;
        c.pity = pity;
        return {
            soft: Math.max(0, pity - 4),
            hardSilver: pity >= 9,
            hardGold: pity >= 14,
        };
    }

    /**
     * 品质判定 → 抽取产出 → 天赋修正 → 入包
     * @param countMult 数量倍率（黄昏"再探一轮"的收益加成，作用于宝箱内所有物品）
     */
    static openChest(ctx: GameCtx, minTier?: ChestTier, countMult = 1): ChestOpenResult {
        // —— 品质：幸运分布 × 软/硬保底 × 天赋升档 ——
        const pity = this.pityTake(ctx);
        let tier = this.rollTierWithLuck(ctx);
        if (pity.hardGold) tier = 'gold';
        else if (pity.hardSilver && CHEST_TIERS.indexOf(tier) < CHEST_TIERS.indexOf('silver')) {
            tier = 'silver';
        } else if (pity.soft > 0 && CHEST_TIERS.indexOf(tier) < CHEST_TIERS.indexOf('copper')
            && ctx.rng.chance(pity.soft * 8)) {
            tier = 'copper';   // 软保底：木箱逐步让位给铜箱
        }
        if (pity.hardGold || pity.hardSilver) ctx.run.counters.pity = 0;   // 触发即重置

        // T08 福星：整体上调一档
        let upgraded = false;
        if (ctx.talent.chestUpgradeChancePct > 0 && ctx.rng.chance(ctx.talent.chestUpgradeChancePct)) {
            tier = this.upgradeTier(tier);
            upgraded = true;
        }
        if (minTier && CHEST_TIERS.indexOf(tier) < CHEST_TIERS.indexOf(minTier)) {
            tier = minTier;
        }

        const table = this.tables(ctx).get(tier)!;
        const groups = ctx.rng.int(1, 2);          // 抽 1~2 组条目
        const mult = ctx.talent.lootMult;           // T02 物资增幅

        const gained: ChestOpenResult['gained'] = [];
        const pickedIdx = new Set<number>();
        for (let i = 0; i < groups; i++) {
            let entry = weightedPickWith(ctx.rng, table.entries);
            // 避免同箱重复同一 entry（体验更好）
            let guard = 0;
            while (pickedIdx.has(table.entries.indexOf(entry)) && guard++ < 5) {
                entry = weightedPickWith(ctx.rng, table.entries);
            }
            pickedIdx.add(table.entries.indexOf(entry));
            const count = Math.max(1, Math.round(ctx.rng.int(entry.min, entry.max) * mult * countMult));
            gained.push({ itemId: entry.itemId, count });
        }

        let overflowed = false;
        for (const g of gained) {
            const added = InventorySystem.add(ctx, g.itemId, g.count);
            if (added < g.count) overflowed = true;
        }

        const result: ChestOpenResult = { tier, upgradedByTalent: upgraded, gained, overflowed };
        EventBus.emit(GameEvents.ChestOpened, result);
        return result;
    }

    static rollTier(ctx: GameCtx): ChestTier {
        const roll = ctx.rng.next() * 100;
        let acc = 0;
        for (const t of [...CHEST_TIERS].reverse()) {   // gold → wood 累加
            acc += BASE_TIER_RATES[t];
            if (roll < acc) return t;
        }
        return 'wood';
    }

    static upgradeTier(t: ChestTier): ChestTier {
        const idx = CHEST_TIERS.indexOf(t);
        return CHEST_TIERS[Math.min(idx + 1, CHEST_TIERS.length - 1)];
    }
}
