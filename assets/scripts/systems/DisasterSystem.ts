// 天灾系统：D5 寒流 / D9 酸雨 / D13 兽潮
import { EventBus, GameEvents } from '../core/EventBus';
import type { DisasterDef } from '../data/EventDefs';
import { StatusEffectSystem } from './StatusEffectSystem';
import { StatsSystem } from './StatsSystem';
import { ShelterSystem } from './ShelterSystem';
import type { GameCtx } from './RunModel';

export class DisasterSystem {
    static getDef(ctx: GameCtx, id: string): DisasterDef {
        const d = ctx.cfg.disasters.find(x => x.id === id);
        if (!d) throw new Error(`未知天灾: ${id}`);
        return d;
    }

    /** 清晨调用：刷新 disasterNext 指针；若今日到期则激活并广播 */
    static onMorning(ctx: GameCtx): void {
        const run = ctx.run;
        const upcoming = [...ctx.cfg.disasters]
            .sort((a, b) => a.dueDay - b.dueDay)
            .find(d => d.dueDay >= run.day);
        run.disasterNext = upcoming
            ? { id: upcoming.id, dueDay: upcoming.dueDay, activeToday: upcoming.dueDay === run.day }
            : null;

        if (upcoming && upcoming.dueDay === run.day) {
            EventBus.emit(GameEvents.DisasterHit, { id: upcoming.id });
            EventBus.emit(GameEvents.ChatInject, { poolId: upcoming.chatPoolId });
        }
    }

    static isActiveToday(ctx: GameCtx): DisasterDef | null {
        const next = ctx.run.disasterNext;
        if (!next || next.dueDay !== ctx.run.day) return null;
        return this.getDef(ctx, next.id);
    }

    /** 天气覆盖：寒流日强制 cold_front，酸雨日强制 acid_rain */
    static overrideWeather(ctx: GameCtx, rolledWeather: string): string {
        const active = this.isActiveToday(ctx);
        if (!active) return rolledWeather;
        if (active.id === 'cold_snap') return 'cold_front';
        if (active.id === 'acid_rain') return 'acid_rain';
        return rolledWeather;
    }

    /** 白天限制：酸雨禁止外出探索 */
    static blocksExplore(ctx: GameCtx): boolean {
        return this.isActiveToday(ctx)?.blockExplore === true;
    }

    /**
     * 夜间达标判定（寒流/兽潮）：满足 passIfAnyOf 之一即安全。
     * 达标条件语义：
     *  - 设施 id：如 campfire / door_bolt（查 facilities）
     *  - 'shelter>=2' / 'shelter>=3'：庇护所等级
     *  - 'weapon'：持有任一武器类工具（stone_axe/iron_axe）
     */
    static nightCheck(ctx: GameCtx): { passed: boolean; disaster: DisasterDef | null } {
        const active = this.isActiveToday(ctx);
        if (!active?.nightCheck) return { passed: true, disaster: null };

        const cond = active.nightCheck;
        let passed = false;
        for (const c of cond.passIfAnyOf) {
            if (c.startsWith('shelter>=')) {
                if (ctx.run.shelterLevel >= Number(c.split('=')[1])) { passed = true; break; }
            } else if (c === 'weapon') {
                const hasWeapon = ['stone_axe', 'iron_axe'].some(w =>
                    ctx.run.inventory.some(s => s.itemId === w));
                if (hasWeapon) { passed = true; break; }
            } else if (ctx.run.facilities.includes(c)) {
                passed = true;
                break;
            }
        }

        if (passed) {
            // 达标也有代价：顶住门的撞伤等
            if (cond.passHpLoss) StatsSystem.apply(ctx, 'hp', cond.passHpLoss);
            this.markPassed(ctx, active);
            return { passed: true, disaster: active };
        }

        // 未达标 → 惩罚 + 状态
        StatsSystem.apply(ctx, 'hp', cond.failHpLoss);
        StatsSystem.apply(ctx, 'sanity', cond.failSanityLoss);
        if (active.id === 'cold_snap') {
            // 石屋免疫失温
            if (!ShelterSystem.effectsOf(ctx).coldImmune) {
                StatusEffectSystem.add(ctx, 'hypothermia');
            }
        }
        return { passed: false, disaster: active };
    }

    /** 天灾达标记录（成就「天灾无伤」判定依据） */
    static markPassed(ctx: import('./RunModel').GameCtx, d: DisasterDef): void {
        const flag = `disaster_${d.id.split('_')[0]}_passed`;
        if (!ctx.run.flags.includes(flag)) ctx.run.flags.push(flag);
    }

    /** 无夜间判定的天灾（酸雨）：白天平安度过即达标 */
    static markDayPassed(ctx: GameCtx): void {
        const active = this.isActiveToday(ctx);
        if (active && !active.nightCheck) this.markPassed(ctx, active);
    }

    /** 情报面板：达标条件核对清单（label + 当前是否满足） */
    static requirementChecklist(
        ctx: GameCtx,
        def: DisasterDef,
    ): { label: string; ok: boolean }[] {
        if (!def.nightCheck) return [];
        return def.nightCheck.passIfAnyOf.map(c => {
            if (c.startsWith('shelter>=')) {
                const lv = Number(c.split('=')[1]);
                return { label: `庇护所 Lv${lv}+`, ok: ctx.run.shelterLevel >= lv };
            }
            if (c === 'weapon') {
                const hasW = ['stone_axe', 'iron_axe'].some(w =>
                    ctx.run.inventory.some(s => s.itemId === w));
                return { label: '武器（斧头）', ok: hasW };
            }
            return { label: this.facilityLabel(c), ok: ctx.run.facilities.includes(c) };
        });
    }

    private static facilityLabel(id: string): string {
        const map: Record<string, string> = {
            campfire: '火堆', door_bolt: '加固门闩', water_filter: '净水装置',
            trap: '捕兽陷阱', signal_pile: '信号堆', radio: '无线电',
            storage_box: '储物箱',
        };
        return map[id] ?? id;
    }
}

