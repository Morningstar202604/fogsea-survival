// 调试：单天赋跑 N 局，输出结局分布与死亡日分布
import { RNG } from '../../assets/scripts/core/RNG';
import { loadConfigsFromDisk } from '../shared/loadConfigs';
import { createRunState } from '../../assets/scripts/systems/RunModel';
import type { GameCtx } from '../../assets/scripts/systems/RunModel';
import { TalentSystem } from '../../assets/scripts/systems/TalentSystem';
import { TimeSystem } from '../../assets/scripts/systems/TimeSystem';
import { EventEngine } from '../../assets/scripts/systems/EventEngine';
import { InventorySystem } from '../../assets/scripts/systems/InventorySystem';
import { CraftSystem } from '../../assets/scripts/systems/CraftSystem';
import { LocationSystem } from '../../assets/scripts/systems/LocationSystem';

const N = Number(process.argv[2] ?? 2000);
const cfg = loadConfigsFromDisk();

function makeCtx(seed: number, talentId: string): GameCtx {
    const run = createRunState(seed, talentId);
    const talent = TalentSystem.buildRuntime(cfg.talents.find(t => t.id === talentId)!);
    return { cfg, run, rng: new RNG(seed), talent };
}

function pickOption(ctx: GameCtx, evId: string): number {
    const ev = ctx.cfg.events.find(e => e.id === evId)!;
    const avail = ev.options.map((o, i) => ({ o, i }))
        .filter(x => EventEngine.optionAvailable(ctx, x.o));
    return avail.length ? avail[ctx.rng.int(0, avail.length - 1)].i : 0;
}

function chain(ctx: GameCtx, evId: string | null): { duringNightEvent?: boolean } {
    const hint: { duringNightEvent?: boolean } = {};
    let id = evId;
    let guard = 0;
    while (id && guard++ < 10) {
        const ev = ctx.cfg.events.find(e => e.id === id)!;
        const optIdx = pickOption(ctx, id);
        const branch = EventEngine.resolveOption(ctx, ev, optIdx);
        if (ev.type === 'night') hint.duringNightEvent = true;
        if (TimeSystem.checkSuddenDeath(ctx, hint)) break;
        id = branch.nextEvent ?? null;
    }
    return hint;
}

function playOnce(seed: number): { days: number; endingId: string } {
    const ctx = makeCtx(seed, 'T03');
    InventorySystem.add(ctx, 'food_black_bread', 2);
    InventorySystem.add(ctx, 'water_clean', 2);
    InventorySystem.add(ctx, 'mat_wood', 10);

    for (let day = 1; day <= 15; day++) {
        const m = TimeSystem.startMorning(ctx);
        if (m.dailyEventId) {
            chain(ctx, m.dailyEventId);
            if (ctx.run.endingId) break;
        }
        while (TimeSystem.canAct(ctx)) {
            if (!TimeSystem.exploreAllowed(ctx)) break;
            if (!ctx.run.facilities.includes('campfire')
                && InventorySystem.count(ctx, 'mat_wood') >= 3 && ctx.rng.chance(60)) {
                CraftSystem.craft(ctx, 'craft_campfire');
                continue;
            }
            const locs = ctx.run.unlockedLocations.filter(l => !LocationSystem.isOnCooldown(ctx, l));
            if (!locs.length) { TimeSystem.rest(ctx); continue; }
            const loc = locs[ctx.rng.int(0, locs.length - 1)];
            let evId: string | null = null;
            try { TimeSystem.explore(ctx, loc, undefined, ev => { evId = ev ? ev.id : null; }); }
            catch { break; }
            chain(ctx, evId);
            if (ctx.run.endingId) break;
        }
        if (ctx.run.endingId) break;

        const night = TimeSystem.beginNight(ctx);
        let deathHint: { duringNightEvent?: boolean } = {};
        if (night.nightEventId) {
            deathHint = chain(ctx, night.nightEventId);
        }
        const fin = TimeSystem.finishNight(ctx, deathHint);
        if (fin.ended) return { days: ctx.run.day, endingId: fin.endingId! };
    }
    return { days: ctx.run.day, endingId: ctx.run.endingId ?? 'E04' };
}

const dist = new Map<string, number>();
const dayDist = new Map<number, number>();
for (let i = 0; i < N; i++) {
    const r = playOnce(7000 + i);
    dist.set(r.endingId, (dist.get(r.endingId) ?? 0) + 1);
    dayDist.set(r.days, (dayDist.get(r.days) ?? 0) + 1);
}
console.log('结局分布:', Object.fromEntries([...dist.entries()].sort()));
console.log('死亡日分布:', Object.fromEntries([...dayDist.entries()].sort((a, b) => a[0] - b[0])));
