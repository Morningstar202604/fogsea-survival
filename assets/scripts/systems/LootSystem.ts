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

    /** 品质判定 → 抽取产出 → 天赋修正 → 入包 */
    static openChest(ctx: GameCtx, minTier?: ChestTier): ChestOpenResult {
        let tier = this.rollTier(ctx);
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
            const count = ctx.rng.int(entry.min, entry.max) * mult;
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
