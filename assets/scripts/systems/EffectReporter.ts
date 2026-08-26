// ===== 效果回执（v0.6）：一切操作后的"发生了什么"=====
// 快照 → 操作 → 差分报告。任何系统只要包一层 snap/report 就能获得完整反馈。
import type { StatKey } from '../data/EventDefs';
import type { GameCtx } from './RunModel';

export interface EffectSnap {
    stats: Record<StatKey, number>;
    hpMax: number;
    inv: Record<string, number>;
    statuses: string[];
    facilities: string[];
    shelter: number;
    fuel: number;
}

const STAT_ICON: Record<StatKey, string> = { hp: '❤️', hunger: '🍞', thirst: '💧', sanity: '🧠' };
const STAT_NAME: Record<StatKey, string> = { hp: '生命', hunger: '饱食', thirst: '饮水', sanity: '精神' };

export class EffectReporter {
    static snap(ctx: GameCtx): EffectSnap {
        const inv: Record<string, number> = {};
        for (const s of ctx.run.inventory) inv[s.itemId] = (inv[s.itemId] ?? 0) + s.count;
        return {
            stats: { ...ctx.run.stats },
            hpMax: ctx.run.statMax.hp,
            inv,
            statuses: ctx.run.statuses.map(s => s.id),
            facilities: [...ctx.run.facilities],
            shelter: ctx.run.shelterLevel,
            fuel: ctx.run.fireFuel ?? 0,
        };
    }

    /** 差分 → 中文摘要；无变化返回空串 */
    static report(ctx: GameCtx, b: EffectSnap, sep = ' · '): string {
        const out: string[] = [];
        const a = ctx.run;

        // 属性
        (Object.keys(b.stats) as StatKey[]).forEach(k => {
            const d = a.stats[k] - b.stats[k];
            if (d !== 0) out.push(`${STAT_ICON[k]}${STAT_NAME[k]}${d > 0 ? '+' : ''}${d}`);
        });
        if (a.statMax.hp > b.hpMax) out.push(`❤️上限+${a.statMax.hp - b.hpMax}`);

        // 物品增减
        const after: Record<string, number> = {};
        for (const s of a.inventory) after[s.itemId] = (after[s.itemId] ?? 0) + s.count;
        const gained: string[] = [];
        const lost: string[] = [];
        const ids = new Set([...Object.keys(b.inv), ...Object.keys(after)]);
        for (const id of ids) {
            const d = (after[id] ?? 0) - (b.inv[id] ?? 0);
            if (d === 0) continue;
            const name = ctx.cfg.items.find(i => i.id === id)?.name ?? id;
            gained.push(`${name}×${Math.abs(d)}`);
            void lost;
            if (d > 0) continue;
            lost.push(`${name}×${Math.abs(d)}`);
        }
        if (gained.length) out.push(`获得 ${gained.join('、')}`);
        if (lost.length) out.push(`消耗 ${lost.join('、')}`);

        // 状态
        const stName = (id: string) => ctx.cfg.statuses.find(s => s.id === id)?.name ?? id;
        const aIds = a.statuses.map(s => s.id);
        const bIds = b.statuses;
        for (const id of aIds) if (!bIds.includes(id)) out.push(`染上【${stName(id)}】`);
        for (const id of bIds) if (!aIds.includes(id)) out.push(`解除【${stName(id)}】`);

        // 设施 / 庇护所 / 燃料
        for (const f of a.facilities) if (!b.facilities.includes(f)) {
            out.push(`建成 ${ctx.cfg.recipes.find(r => r.outputId === f)?.name ?? f}`);
        }
        if (a.shelterLevel > b.shelter) out.push(`🏠 庇护所升至 Lv.${a.shelterLevel}`);
        if ((a.fireFuel ?? 0) > b.fuel) out.push(`🔥燃料+${(a.fireFuel ?? 0) - b.fuel}`);

        return out.join(sep);
    }
}
