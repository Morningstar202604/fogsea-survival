// 状态效果（Buff/Debuff）：注册表查询 + 每日 tick
import { EventBus, GameEvents } from '../core/EventBus';
import type { StatusDef, ActiveStatus } from '../data/StatusDefs';
import type { GameCtx } from './RunModel';

export class StatusEffectSystem {
    private static registry(ctx: GameCtx): Map<string, StatusDef> {
        if (!this._reg) {
            this._reg = new Map(ctx.cfg.statuses.map(s => [s.id, s]));
        }
        return this._reg;
    }
    private static _reg: Map<string, StatusDef> | null = null;

    static reset(): void {
        this._reg = null;
    }

    static has(ctx: GameCtx, id: string): boolean {
        return ctx.run.statuses.some(s => s.id === id);
    }

    static getDef(ctx: GameCtx, id: string): StatusDef | undefined {
        return this.registry(ctx).get(id);
    }

    /** 添加状态：同类刷新天数不叠加 */
    static add(ctx: GameCtx, id: string, days?: number): void {
        const def = this.getDef(ctx, id);
        if (!def) throw new Error(`未知状态: ${id}`);
        const exist = ctx.run.statuses.find(s => s.id === id);
        const dur = days ?? def.durationDays;
        if (exist) {
            exist.remainDays = Math.max(exist.remainDays, dur === -1 ? 999 : dur);
        } else {
            ctx.run.statuses.push({ id, remainDays: dur === -1 ? 999 : dur });
            EventBus.emit(GameEvents.StatusAdd, { id });
        }
    }

    static remove(ctx: GameCtx, id: string): void {
        const idx = ctx.run.statuses.findIndex(s => s.id === id);
        if (idx >= 0) {
            ctx.run.statuses.splice(idx, 1);
            EventBus.emit(GameEvents.StatusRemove, { id });
        }
    }

    /** 用药解除 */
    static cureWithItem(ctx: GameCtx, statusId: string): boolean {
        const st = ctx.run.statuses.find(s => s.id === statusId);
        if (!st) return false;
        const def = this.getDef(ctx, statusId)!;
        if (def.cureItemId && Inventory_has(ctx, def.cureItemId)) {
            Inventory_take(ctx, def.cureItemId, 1);
            this.remove(ctx, statusId);
            return true;
        }
        return false;
    }

    /**
     * 每日结算：按 perDay 扣属性 + 消耗倍率生效 + 自然痊愈倒计时
     * @returns consumeMult 本次衰减的消耗倍率
     */
    static tickDaily(ctx: GameCtx): { consumeMult: number; perDayHp: number; perDaySanity: number } {
        let consumeMult = 1;
        let perDayHp = 0;
        let perDaySanity = 0;
        for (const st of [...ctx.run.statuses]) {
            const def = this.getDef(ctx, st.id);
            if (!def) continue;
            if (def.consumeMult && def.consumeMult > 1) consumeMult = Math.max(consumeMult, def.consumeMult);
            if (def.perDay?.hp) perDayHp += def.perDay.hp;
            if (def.perDay?.sanity) perDaySanity += def.perDay.sanity;

            // 自然痊愈（-1 表示永久，需药物或条件解除）
            if (st.remainDays > 0 && st.remainDays < 999) {
                st.remainDays -= 1;
                if (st.remainDays <= 0) this.remove(ctx, st.id);
            }
        }
        return { consumeMult, perDayHp, perDaySanity };
    }
}

// 局部别名避免循环 import：InventorySystem 与本系统互查
import { InventorySystem as _Inv } from './InventorySystem';
function Inventory_has(ctx: GameCtx, id: string) { return _Inv.count(ctx, id) > 0; }
function Inventory_take(ctx: GameCtx, id: string, n: number) { return _Inv.remove(ctx, id, n); }
