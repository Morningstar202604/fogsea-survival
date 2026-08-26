// 交易系统 v0.4：世界频道隔空交易
// 数值模型：每件物品有基准价值 VALUE；报价由模板 × 当日行情因子 f 生成，
//   f ∈ [0.70, 1.45]：f<0.95 玩家赚 / f>1.15 玩家亏，"估价"本身就是玩法。
// 好感度折扣：与特定 NPC 成交积累关系，关系≥55 时其报价 f×0.85（更划算）。
// 议价：每日一次对最优报价砍价，成功率 = clamp(45 + SAN/4 - 5, 20, 85)。
import { EventBus, GameEvents } from '../core/EventBus';
import { clamp } from '../core/RNG';
import type { TradeOffer } from '../data/SaveSchema';
import { InventorySystem } from './InventorySystem';
import { RelationshipSystem } from './RelationshipSystem';
import type { NpcId } from './RelationshipSystem';
import { ChapterSystem } from './ChapterSystem';
import type { GameCtx } from './RunModel';

interface TradeTemplate {
    id: string;
    nick: string;
    npc?: NpcId;                       // 关联 NPC（好感折扣）
    give: { itemId: string; count: number };
    get: { itemId: string; count: number };
}

/** 报价模板池：give=我方付出 get=我方获得 */
const TRADE_POOL: TradeTemplate[] = [
    { id: 't_wood_can',   nick: '囤货佬',   give: { itemId: 'mat_wood',      count: 5 }, get: { itemId: 'food_canned',     count: 1 } },
    { id: 't_can_fish',   nick: '钓鱼佬',   give: { itemId: 'food_canned',   count: 1 }, get: { itemId: 'food_raw_fish',   count: 2 } },
    { id: 't_cloth_med',  nick: '老医生',   npc: 'doc', give: { itemId: 'mat_cloth', count: 3 }, get: { itemId: 'med_antibiotic', count: 1 } },
    { id: 't_stone_rope', nick: '拾荒者',   give: { itemId: 'mat_stone',     count: 4 }, get: { itemId: 'mat_rope',        count: 2 } },
    { id: 't_berry_water',nick: '夜猫子',   give: { itemId: 'food_berry',    count: 5 }, get: { itemId: 'water_clean',     count: 1 } },
    { id: 't_metal_light',nick: '机械师',   give: { itemId: 'mat_scrap_metal', count: 2 }, get: { itemId: 'tool_lighter',  count: 1 } },
    { id: 't_can_part',   nick: '神秘人',   give: { itemId: 'food_canned',   count: 3 }, get: { itemId: 'key_radio_parts', count: 1 } },
    { id: 't_wood_meat',  nick: '主妇阿姐', give: { itemId: 'mat_wood',      count: 4 }, get: { itemId: 'food_cooked_meat', count: 1 } },
    { id: 't_map_aid',    nick: '收藏家',   give: { itemId: 'key_map_fragment', count: 1 }, get: { itemId: 'med_first_aid', count: 1 } },
    { id: 't_can_sed',    nick: '失眠者',   give: { itemId: 'food_canned',   count: 2 }, get: { itemId: 'med_sedative',    count: 1 } },
    { id: 't_rope_meat',  nick: '老猎人',   give: { itemId: 'mat_rope',      count: 1 }, get: { itemId: 'food_raw_meat',   count: 1 } },
    { id: 't_berry_pain', nick: '隔壁小孩', npc: 'kid', give: { itemId: 'food_berry', count: 4 }, get: { itemId: 'med_painkiller', count: 1 } },
    // —— v0.4 新增模板 ——
    { id: 't_book_san',   nick: '读书人',   give: { itemId: 'food_canned',   count: 1 }, get: { itemId: 'book_novel',      count: 1 } },
    { id: 't_herb_med',   nick: '采药姑',   npc: 'doc', give: { itemId: 'herb_green', count: 2 }, get: { itemId: 'med_herbal', count: 2 } },
    { id: 't_choco_fish', nick: '甜品师',   give: { itemId: 'food_raw_fish', count: 3 }, get: { itemId: 'lux_choco',       count: 1 } },
    { id: 't_coal_metal', nick: '铁匠',     give: { itemId: 'mat_charcoal',  count: 3 }, get: { itemId: 'mat_scrap_metal', count: 2 } },
];

/** 物品基准价值（等价交换的锚） */
export const ITEM_BASE_VALUE: Record<string, number> = {
    food_berry: 0.5, water_dirty: 1, mat_wood: 1, mat_stone: 1, mat_charcoal: 1,
    food_black_bread: 1.5, mat_cloth: 1.5, herb_green: 1.5, food_raw_fish: 2,
    food_raw_meat: 2, mat_rope: 2, food_biscuit: 2, water_boiled: 2.5,
    water_clean: 2.5, med_herbal: 3, tea_herb: 3, med_painkiller: 2.5,
    med_ointment: 3, food_cooked_fish: 3.5, food_mushroom: 1.5, book_novel: 4,
    lux_choco: 4, food_canned: 4, food_cooked_meat: 4, med_detox: 4,
    med_sedative: 4, med_bandage: 3, key_map_fragment: 4, med_antibiotic: 5,
    tool_lighter: 5, key_radio_parts: 6, tool_stone_axe: 8, tool_flashlight: 5,
    tool_fishing_rod: 6, tool_torch: 4, tool_radio: 10, key_signal_gun: 12,
    tool_iron_axe: 12, tool_bow: 9, salt: 3,
};
function val(id: string): number { return ITEM_BASE_VALUE[id] ?? 2; }

export class TradingSystem {
    /** 每天清晨刷出 3 条不重复报价；数量按行情因子重算 */
    static rollOffers(ctx: GameCtx): void {
        const bag = TRADE_POOL.slice();
        const offers: TradeOffer[] = [];
        while (offers.length < 3 && bag.length > 0) {
            const idx = ctx.rng.int(0, bag.length - 1);
            const t = bag.splice(idx, 1)[0];
            const f = this.marketFactor(ctx, t);
            const giveCount = Math.max(1, Math.round(t.give.count * f));
            offers.push({
                id: t.id, nick: t.nick,
                give: { itemId: t.give.itemId, count: giveCount },
                get: { itemId: t.get.itemId, count: t.get.count },
            });
        }
        ctx.run.tradesToday = offers;
        ctx.run.tradesAccepted = [];
        ctx.run.counters.haggleDay = 0;   // 重置每日议价
    }

    /**
     * 行情因子：均匀抖动 × 好感折扣。
     *   base ~ U[0.82, 1.30]（期望≈1.06，略亏是常态，捡漏靠眼光）
     *   关系 ≥55 的关联 NPC：×0.85（熟人让利）
     */
    private static marketFactor(ctx: GameCtx, t: TradeTemplate): number {
        const bias = ChapterSystem.modifiers(ctx).priceBias;   // 章节越深，商人越黑
        let f = 0.84 + ctx.rng.next() * 0.40 + bias;
        const tier = t.npc ? RelationshipSystem.tier(ctx, t.npc) : null;
        if (tier === 'trusted' || tier === 'bonded') f *= 0.85;
        return clamp(f, 0.72, 1.38);
    }

    /** 报价的性价比：获得价值 / 付出价值（>1 即赚） */
    static ratio(ctx: GameCtx, offer: TradeOffer): number {
        const gain = val(offer.get.itemId) * offer.get.count;
        const cost = val(offer.give.itemId) * offer.give.count;
        return gain / Math.max(0.1, cost);
    }

    static findOffer(ctx: GameCtx, offerId: string): TradeOffer | undefined {
        return ctx.run.tradesToday.find(o => o.id === offerId);
    }

    static isAccepted(ctx: GameCtx, offerId: string): boolean {
        return ctx.run.tradesAccepted.includes(offerId);
    }

    static canAccept(ctx: GameCtx, offer: TradeOffer): boolean {
        // 每条报价每局只能成交一次（卖家不会无限供货）
        if (ctx.run.flags.includes('trade_' + offer.id)) return false;
        return !this.isAccepted(ctx, offer.id) && InventorySystem.hasAll(ctx, [offer.give]);
    }

    /** 接受交易：付出→获得→好感积累→频道插播 */
    static accept(ctx: GameCtx, offerId: string): boolean {
        const offer = this.findOffer(ctx, offerId);
        if (!offer || !this.canAccept(ctx, offer)) return false;
        InventorySystem.remove(ctx, offer.give.itemId, offer.give.count);
        InventorySystem.add(ctx, offer.get.itemId, offer.get.count);
        ctx.run.tradesAccepted.push(offer.id);
        if (!ctx.run.flags.includes('trade_' + offer.id)) {
            ctx.run.flags.push('trade_' + offer.id);
        }
        // 与关联 NPC 的每次成交 +3 好感（老医生/小女孩）
        const tpl = TRADE_POOL.find(t => t.id === offer.id);
        if (tpl?.npc) RelationshipSystem.add(ctx, tpl.npc, 3);
        EventBus.emit(GameEvents.ChatInject, { poolId: 'link_gift' });
        return true;
    }

    /**
     * 🔥 议价（每日一次）：对当前性价比最高的未成交报价砍掉 1 件付出。
     * 成功率 = clamp(45 + SAN/4 - 5, 20, 85)；失败则该报价作废（对方拉黑你）。
     * @returns 结果描述
     */
    static haggleBest(ctx: GameCtx): { ok: boolean; msg: string } {
        if ((ctx.run.counters.haggleDay ?? 0) === ctx.run.day) {
            return { ok: false, msg: '今天已经议过价了，别把名声搞臭。' };
        }
        const pending = ctx.run.tradesToday.filter(o =>
            !this.isAccepted(ctx, o.id) && !ctx.run.flags.includes('trade_' + o.id));
        if (!pending.length) return { ok: false, msg: '没有可议的报价。' };
        ctx.run.counters.haggleDay = ctx.run.day;

        pending.sort((a, b) => this.ratio(ctx, b) - this.ratio(ctx, a));
        const target = pending[0];
        const p = clamp(45 + ctx.run.stats.sanity / 4 - 5, 20, 85);
        if (ctx.rng.chance(p)) {
            target.give.count = Math.max(1, target.give.count - 1);
            return { ok: true, msg: `【议价】三言两语说服了「${target.nick}」，付出减 1！` };
        }
        ctx.run.tradesAccepted.push(target.id);   // 作废
        return { ok: true, msg: `【议价】「${target.nick}」觉得你在得寸进尺，撤回了报价。` };
    }
}
