// 事件引擎：条件过滤 → 加权抽取 → 选项执行（效果原子依序应用）
import { EventBus, GameEvents } from '../core/EventBus';
import type {
    EventDef, EventOption, EventConditions, ResultBranch,
    StatKey, EventType,
} from '../data/EventDefs';
import { weightedPickWith } from '../core/RNG';
import type { GameCtx } from './RunModel';
import { StatsSystem } from './StatsSystem';
import { InventorySystem } from './InventorySystem';
import { StatusEffectSystem } from './StatusEffectSystem';

export interface PickContext {
    poolType: EventType;
    locationId?: string;      // explore 类必填
}

export class EventEngine {
    /** 抽取一条可触发事件；池空返回 null。约定 weight=0 的事件只能被 nextEvent 连锁触发 */
    static pick(ctx: GameCtx, pc: PickContext): EventDef | null {
        const run = ctx.run;
        const candidates = ctx.cfg.events.filter(e => {
            if (e.weight <= 0) return false;                 // 仅连锁事件不进随机池
            if (e.type !== pc.poolType) return false;
            if (e.type === 'explore' && pc.locationId && !e.pool?.includes(pc.locationId)) return false;
            if (e.once && run.firedEvents.some(f => f.id === e.id)) return false;
            const fired = run.firedEvents.find(f => f.id === e.id);
            if (fired && e.cooldownDays && run.day - fired.lastDay < e.cooldownDays) return false;
            return this.checkConditions(ctx, e.conditions);
        });
        if (candidates.length === 0) return null;

        // 危机类权重随天数放大；浓雾日危机更频繁
        const fogFactor = ctx.run.weather === 'fog_thick' ? 1.3 : 1;
        const weighted = candidates.map(e => ({
            ...e,
            weight: e.type === 'crisis'
                ? e.weight * (1 + run.day * 0.08) * fogFactor
                : e.weight,
        }));
        return weightedPickWith(ctx.rng, weighted);
    }

    static checkConditions(ctx: GameCtx, cond: EventConditions | undefined): boolean {
        if (!cond) return true;
        const run = ctx.run;
        if (cond.dayMin !== undefined && run.day < cond.dayMin) return false;
        if (cond.dayMax !== undefined && run.day > cond.dayMax) return false;
        if (cond.flags?.some(f => !run.flags.includes(f))) return false;
        if (cond.notFlags?.some(f => run.flags.includes(f))) return false;
        if (cond.items && !InventorySystem.hasAll(ctx, cond.items)) return false;
        if (cond.weathers && !cond.weathers.includes(run.weather)) return false;
        if (cond.disasterActive &&
            run.disasterNext?.id !== cond.disasterActive) return false;
        if (cond.statuses?.some(s => !run.statuses.some(x => x.id === s))) return false;
        if (cond.notStatuses?.some(s => run.statuses.some(x => x.id === s))) return false;
        for (const [k, c] of Object.entries(cond.stats ?? {})) {
            const v = run.stats[k as StatKey];
            if (c.op === '>=' ? v < c.value : v > c.value) return false;
        }
        return true;
    }

    /** 检查选项是否可用（requires） */
    static optionAvailable(ctx: GameCtx, opt: EventOption): boolean {
        const r = opt.requires;
        if (!r) return true;
        if (r.talent && ctx.talent.id !== r.talent) return false;
        if (!InventorySystem.hasAll(ctx, r.items)) return false;
        for (const [k, c] of Object.entries(r.stats ?? {})) {
            const v = ctx.run.stats[k as StatKey];
            if (c.op === '>=' ? v < c.value : v > c.value) return false;
        }
        return true;
    }

    /**
     * 执行选项：加权抽结果 → 效果依序应用 → 记录 once
     * @returns 命中的结果分支；nextEvent/endingId 由调用方（TimeSystem/GameView）接续
     */
    static resolveOption(ctx: GameCtx, ev: EventDef, optIdx: number): ResultBranch {
        const opt = ev.options[optIdx];
        if (!opt) throw new Error(`选项越界: ${ev.id}#${optIdx}`);
        const branch = weightedPickWith(ctx.rng, opt.results);

        this.applyEffects(ctx, branch);

        if (ev.once || ev.cooldownDays) {
            const exist = ctx.run.firedEvents.find(f => f.id === ev.id);
            if (exist) exist.lastDay = ctx.run.day;
            else ctx.run.firedEvents.push({ id: ev.id, lastDay: ctx.run.day });
        }

        EventBus.emit(GameEvents.EventResult, { eventId: ev.id, branch });
        return branch;
    }

    /** 效果原子依序应用：属性→物品→状态→flag→解锁→频道插播 */
    static applyEffects(ctx: GameCtx, fx: ResultBranch): void {
        if (fx.hp !== undefined) StatsSystem.apply(ctx, 'hp', fx.hp);
        if (fx.hunger !== undefined) StatsSystem.apply(ctx, 'hunger', fx.hunger);
        if (fx.thirst !== undefined) StatsSystem.apply(ctx, 'thirst', fx.thirst);
        if (fx.sanity !== undefined) StatsSystem.apply(ctx, 'sanity', fx.sanity);

        if (fx.gainItems) {
            for (const g of fx.gainItems)
                InventorySystem.add(ctx, g.itemId, g.count * ctx.talent.lootMult);
        }
        if (fx.loseItems) {
            for (const l of fx.loseItems)
                InventorySystem.remove(ctx, l.itemId, Math.min(l.count, InventorySystem.count(ctx, l.itemId)));
        }
        if (fx.addStatus) for (const s of fx.addStatus) StatusEffectSystem.add(ctx, s);
        if (fx.removeStatus) for (const s of fx.removeStatus) StatusEffectSystem.remove(ctx, s);
        if (fx.setFlags) for (const f of fx.setFlags) {
            if (!ctx.run.flags.includes(f)) ctx.run.flags.push(f);
        }
        if (fx.unlockLocation && !ctx.run.unlockedLocations.includes(fx.unlockLocation)) {
            ctx.run.unlockedLocations.push(fx.unlockLocation);
        }
        if (fx.companionJoin && !ctx.run.companion) {
            ctx.run.companion = { hp: 100, daysUnfed: 0, exploredToday: false };
        }
        if (fx.chatInject) EventBus.emit(GameEvents.ChatInject, { poolId: fx.chatInject });
    }
}
