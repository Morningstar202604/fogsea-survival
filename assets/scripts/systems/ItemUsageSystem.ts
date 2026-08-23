// 物品使用：食物/饮水/药品的主动使用入口（副作用在此落地）
import { EventBus } from '../core/EventBus';
import type { ItemDef } from '../data/ItemDefs';
import { StatsSystem } from './StatsSystem';
import { StatusEffectSystem } from './StatusEffectSystem';
import { InventorySystem } from './InventorySystem';
import type { GameCtx } from './RunModel';

export class ItemUsageSystem {
    static canUse(ctx: GameCtx, itemId: string): boolean {
        const def = ctx.cfg.items.find(i => i.id === itemId);
        return !!def?.use;
    }

    /** 使用一件物品；返回是否成功 */
    static use(ctx: GameCtx, itemId: string): boolean {
        const def = ctx.cfg.items.find(i => i.id === itemId);
        if (!def?.use || InventorySystem.count(ctx, itemId) < 1) return false;

        // 净水装置：脏水直接净化饮用（无副作用）
        const filtered =
            itemId === 'water_dirty' && ctx.run.facilities.includes('water_filter');

        InventorySystem.remove(ctx, itemId, 1);
        const u: NonNullable<ItemDef['use']> = def.use;

        if (u.hp) StatsSystem.apply(ctx, 'hp', u.hp);
        if (u.hunger) StatsSystem.apply(ctx, 'hunger', u.hunger);
        if (u.thirst) StatsSystem.apply(ctx, 'thirst', u.thirst);
        if (u.sanity) StatsSystem.apply(ctx, 'sanity', u.sanity);
        if (u.cureStatus) for (const s of u.cureStatus) StatusEffectSystem.remove(ctx, s);

        if (!filtered) {
            const riskSick = (u.riskSickPct ?? 0) * ctx.talent.dirtyConsumeFactor;
            const riskPoison = (u.riskPoisonPct ?? 0) * ctx.talent.dirtyConsumeFactor;
            if (riskSick > 0 && ctx.rng.chance(riskSick)) StatusEffectSystem.add(ctx, 'sick');
            if (riskPoison > 0 && ctx.rng.chance(riskPoison)) StatusEffectSystem.add(ctx, 'poisoned');
        }

        EventBus.emit('item:used', { itemId });
        return true;
    }
}
