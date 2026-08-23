// 交易系统：世界频道隔空交易——每日刷新报价，等价性由玩家自行判断
import { EventBus, GameEvents } from '../core/EventBus';
import type { TradeOffer } from '../data/SaveSchema';
import { InventorySystem } from './InventorySystem';
import type { GameCtx } from './RunModel';

interface TradeTemplate {
    id: string;
    nick: string;
    give: { itemId: string; count: number };
    get: { itemId: string; count: number };
}

/** 报价池：有赚有亏，评估价值本身就是玩法；每条报价每局限一次 */
const TRADE_POOL: TradeTemplate[] = [
    { id: 't_wood_can',   nick: '囤货佬',   give: { itemId: 'mat_wood',      count: 5 }, get: { itemId: 'food_canned',     count: 1 } },
    { id: 't_can_fish',   nick: '钓鱼佬',   give: { itemId: 'food_canned',   count: 1 }, get: { itemId: 'food_raw_fish',   count: 2 } },
    { id: 't_cloth_med',  nick: '老医生',   give: { itemId: 'mat_cloth',     count: 3 }, get: { itemId: 'med_antibiotic',  count: 1 } },
    { id: 't_stone_rope', nick: '拾荒者',   give: { itemId: 'mat_stone',     count: 4 }, get: { itemId: 'mat_rope',        count: 2 } },
    { id: 't_berry_water',nick: '夜猫子',   give: { itemId: 'food_berry',    count: 5 }, get: { itemId: 'water_clean',     count: 1 } },
    { id: 't_metal_light',nick: '机械师',   give: { itemId: 'mat_scrap_metal', count: 2 }, get: { itemId: 'tool_lighter',  count: 1 } },
    { id: 't_can_part',   nick: '神秘人',   give: { itemId: 'food_canned',   count: 3 }, get: { itemId: 'key_radio_parts', count: 1 } },
    { id: 't_wood_meat',  nick: '主妇阿姐', give: { itemId: 'mat_wood',      count: 4 }, get: { itemId: 'food_cooked_meat', count: 1 } },
    { id: 't_map_aid',    nick: '收藏家',   give: { itemId: 'key_map_fragment', count: 1 }, get: { itemId: 'med_first_aid', count: 1 } },
    { id: 't_can_sed',    nick: '失眠者',   give: { itemId: 'food_canned',   count: 2 }, get: { itemId: 'med_sedative',    count: 1 } },
    { id: 't_rope_meat',  nick: '老猎人',   give: { itemId: 'mat_rope',      count: 1 }, get: { itemId: 'food_raw_meat',   count: 1 } },
    { id: 't_berry_pain', nick: '隔壁小孩', give: { itemId: 'food_berry',    count: 4 }, get: { itemId: 'med_painkiller',  count: 1 } },
];

export class TradingSystem {
    /** 每天清晨随机刷出 2 条不重复报价 */
    static rollOffers(ctx: GameCtx): void {
        const bag = TRADE_POOL.slice();
        const offers: TradeOffer[] = [];
        while (offers.length < 2 && bag.length > 0) {
            const idx = ctx.rng.int(0, bag.length - 1);
            const t = bag.splice(idx, 1)[0];
            offers.push({ id: t.id, nick: t.nick, give: t.give, get: t.get });
        }
        ctx.run.tradesToday = offers;
        ctx.run.tradesAccepted = [];
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

    /** 接受交易：付出→获得→频道插播 */
    static accept(ctx: GameCtx, offerId: string): boolean {
        const offer = this.findOffer(ctx, offerId);
        if (!offer || !this.canAccept(ctx, offer)) return false;
        InventorySystem.remove(ctx, offer.give.itemId, offer.give.count);
        InventorySystem.add(ctx, offer.get.itemId, offer.get.count);
        ctx.run.tradesAccepted.push(offer.id);
        if (!ctx.run.flags.includes('trade_' + offer.id)) {
            ctx.run.flags.push('trade_' + offer.id);
        }
        EventBus.emit(GameEvents.ChatInject, { poolId: 'link_gift' });
        return true;
    }
}
