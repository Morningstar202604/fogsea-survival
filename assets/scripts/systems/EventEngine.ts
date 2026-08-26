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
import { RelationshipSystem } from './RelationshipSystem';
import { ChapterSystem } from './ChapterSystem';
import { SkillSystem } from './SkillSystem';
import { SKILL_NAMES } from '../data/SkillDefs';
import type { SkillCategory } from '../data/SkillDefs';

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

        // ===== 动态权重模型（v0.5）=====
        // w = base × crisisScale × fogFactor × storyChain × freshness × chapter × worldState
        const mods = ChapterSystem.modifiers(ctx);
        const fogFactor = ctx.run.weather === 'fog_thick' ? 1.3 : 1;
        const fogPressure = Math.min(30, ctx.run.counters.fogPressure ?? 0);
        const worldFear = 1 + fogPressure * 0.01;          // 雾压：世界记得你闯过多深
        const weighted = candidates.map(e => {
            let w = e.weight;
            if (e.type === 'crisis') w *= (1 + run.day * 0.08) * fogFactor * mods.crisisWeightMult;
            else if (e.type === 'night') w *= (1 + run.day * 0.02) * mods.nightChanceMult;
            else if (e.type === 'daily') w *= 1 + run.day * 0.03;
            if (e.type === 'story') {
                if (e.conditions?.flags?.length) w *= 3;   // 已开启的剧情线加速
                w *= mods.storyWeightMult;
            }
            if (e.type === 'night' || e.type === 'crisis') w *= worldFear;
            const fired = run.firedEvents.find(f => f.id === e.id);
            if (fired && run.day - fired.lastDay <= 3) w *= 0.35;
            return { ...e, weight: w };
        });
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
        if (cond.companionAlive !== undefined && (run.companion !== null) !== cond.companionAlive) return false;
        for (const [k, c] of Object.entries(cond.stats ?? {})) {
            const v = run.stats[k as StatKey];
            if (c.op === '>=' ? v < c.value : v > c.value) return false;
        }
        return true;
    }

    /** 检查选项是否可用（requires） */
    static optionAvailable(ctx: GameCtx, opt: EventOption): boolean {
        return this.optionLockedReason(ctx, opt) === null;
    }

    /** 选项不可用原因；null = 可用。UI 直接展示该文案 */
    static optionLockedReason(ctx: GameCtx, opt: EventOption): string | null {
        const r = opt.requires;
        if (!r) return null;
        if (r.talent && ctx.talent.id !== r.talent) {
            const tn = ctx.cfg.talents.find(t => t.id === r.talent)?.name ?? r.talent;
            return `需要天赋：${tn}`;
        }
        if (!InventorySystem.hasAll(ctx, r.items)) return '缺材料';
        if (r.flags?.some(f => !ctx.run.flags.includes(f))) return '条件未满足';
        if (r.notFlags?.some(f => ctx.run.flags.includes(f))) return '条件未满足';
        if (r.rel && RelationshipSystem.get(ctx, r.rel.npc as never) < r.rel.min) return '好感不足';
        if (r.shelterMin !== undefined && ctx.run.shelterLevel < r.shelterMin)
            return `需庇护所 Lv.${r.shelterMin}`;
        if (r.apLeft !== undefined && ctx.run.apLeft < r.apLeft) return '行动点不足';
        if (r.skillLevel) {
            for (const [cat, minLvl] of Object.entries(r.skillLevel) as [SkillCategory, number][]) {
                if (SkillSystem.level(ctx, cat) < minLvl) {
                    return `需${SKILL_NAMES[cat].replace(/^\S+\s/, '')}Lv${minLvl}`;
                }
            }
        }
        for (const [k, c] of Object.entries(r.stats ?? {})) {
            const v = ctx.run.stats[k as StatKey];
            if (c.op === '>=' ? v < c.value : v > c.value) return '状态不满足';
        }
        return null;
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
        if (fx.relNpc && fx.relDelta) {
            RelationshipSystem.add(ctx, fx.relNpc as never, fx.relDelta);
        }
        if (fx.morality) {
            ctx.run.counters.morality = (ctx.run.counters.morality ?? 0) + fx.morality;
        }
        if (fx.fogPressure) {
            ctx.run.counters.fogPressure = Math.max(0,
                (ctx.run.counters.fogPressure ?? 0) + fx.fogPressure);
        }
        if (fx.apSpend) {
            ctx.run.apLeft = Math.max(0, ctx.run.apLeft - fx.apSpend);
        }
        if (fx.skillXp) {
            for (const [cat, xp] of Object.entries(fx.skillXp) as [SkillCategory, number][]) {
                if (xp > 0) SkillSystem.grant(ctx, cat, xp);
            }
        }
        if (fx.chatInject) EventBus.emit(GameEvents.ChatInject, { poolId: fx.chatInject });
    }
}
