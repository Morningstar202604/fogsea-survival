import { EventBus, GameEvents } from '../core/EventBus';
import { clamp } from '../core/RNG';
import type { StatKey } from '../data/EventDefs';
import type { GameCtx } from './RunModel';

export class StatsSystem {
    /** 统一入口：改属性必经此处（钳制 + 广播）。delta 可为负 */
    static apply(ctx: GameCtx, key: StatKey, delta: number): void {
        const run = ctx.run;
        const before = run.stats[key];
        const after = clamp(before + delta, 0, run.statMax[key]);
        if (after === before) return;
        run.stats[key] = after;
        EventBus.emit(GameEvents.StatsChanged, { key, delta, newValue: after });
    }

    static get(ctx: GameCtx, key: StatKey): number {
        return ctx.run.stats[key];
    }

    /** 每日自然衰减：饱食 -20 / 水分 -30（状态效果加成由 StatusEffectSystem 处理） */
    static dailyDecay(ctx: GameCtx): void {
        StatsSystem.apply(ctx, 'hunger', -20);
        StatsSystem.apply(ctx, 'thirst', -30);
    }

    static isDangerous(ctx: GameCtx, key: StatKey): boolean {
        return ctx.run.stats[key] < 30;
    }

    /** 饥/渴归零惩罚，夜晚结算调用 */
    static applyStarvationPenalty(ctx: GameCtx): void {
        if (ctx.run.stats.hunger <= 0) StatsSystem.apply(ctx, 'hp', -15);
        if (ctx.run.stats.thirst <= 0) StatsSystem.apply(ctx, 'hp', -25);
    }
}
