// 背包：容量、堆叠、增删查
import { EventBus, GameEvents } from '../core/EventBus';
import type { ItemStack } from '../data/ItemDefs';
import type { GameCtx } from './RunModel';

export class InventorySystem {
    private static itemMap(ctx: GameCtx): Map<string, { stackable: boolean; maxStack: number }> {
        if (!this._map || this._cfgRef !== ctx.cfg) {
            this._cfgRef = ctx.cfg;
            this._map = new Map(ctx.cfg.items.map(i => [i.id, i]));
        }
        return this._map as any;
    }
    private static _map: Map<string, any> | null = null;
    private static _cfgRef: unknown = null;

    static capacity(ctx: GameCtx): number {
        // 基础容量 + 天赋加成 + 储物箱设施
        const storage = ctx.run.facilities.includes('storage_box') ? 2 : 0;
        return ctx.run.bagCap + ctx.talent.bagCapacityAdd + storage;
    }

    static usedSlots(ctx: GameCtx): number {
        return ctx.run.inventory.length;
    }

    static isFull(ctx: GameCtx): boolean {
        return this.usedSlots(ctx) >= this.capacity(ctx);
    }

    static count(ctx: GameCtx, itemId: string): number {
        let total = 0;
        for (const s of ctx.run.inventory) {
            if (s.itemId === itemId) total += s.count;
        }
        return total;
    }

    static hasAll(ctx: GameCtx, reqs: ItemStack[] | undefined): boolean {
        if (!reqs?.length) return true;
        return reqs.every(r => this.count(ctx, r.itemId) >= r.count);
    }

    /** 添加物品；返回实际入包数量（容量不足时截断） */
    static add(ctx: GameCtx, itemId: string, count: number): number {
        if (count <= 0) return 0;
        const def = this.itemMap(ctx).get(itemId);
        if (!def) throw new Error(`未知物品: ${itemId}`);
        let left = count;
        let added = 0;

        if (!def.stackable) {
            while (left > 0 && !this.isFull(ctx)) {
                ctx.run.inventory.push({ itemId, count: 1 });
                left--; added++;
            }
        } else {
            const slot = ctx.run.inventory.find(s => s.itemId === itemId);
            if (slot) {
                const room = def.maxStack - slot.count;
                const take = Math.min(room, left);
                slot.count += take;
                left -= take; added += take;
            }
            while (left > 0 && !this.isFull(ctx)) {
                const take = Math.min(def.maxStack, left);
                ctx.run.inventory.push({ itemId, count: take });
                left -= take; added += take;
            }
        }

        if (added > 0) EventBus.emit(GameEvents.InventoryChanged, { itemId, added });
        return added;
    }

    static remove(ctx: GameCtx, itemId: string, count: number): void {
        const inv = ctx.run.inventory;
        let left = count;
        for (let i = inv.length - 1; i >= 0 && left > 0; i--) {
            if (inv[i].itemId !== itemId) continue;
            const take = Math.min(inv[i].count, left);
            inv[i].count -= take;
            left -= take;
            if (inv[i].count <= 0) inv.splice(i, 1);
        }
        EventBus.emit(GameEvents.InventoryChanged, { itemId, removed: count - left });
    }

    /** 消耗多组材料；调用前应先 hasAll 校验 */
    static removeMany(ctx: GameCtx, reqs: ItemStack[]): void {
        for (const r of reqs) this.remove(ctx, r.itemId, r.count);
    }
}

