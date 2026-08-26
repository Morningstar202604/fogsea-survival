// headless 模拟器：真实系统跑完整对局，验证数值目标（策划案 §16）
// 运行：npm run sim [局数]
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
import { ItemUsageSystem } from '../../assets/scripts/systems/ItemUsageSystem';
import { StatusEffectSystem } from '../../assets/scripts/systems/StatusEffectSystem';
import { TradingSystem } from '../../assets/scripts/systems/TradingSystem';
import { SkillSystem } from '../../assets/scripts/systems/SkillSystem';
import { DailyActionSystem } from '../../assets/scripts/systems/DailyActionSystem';
import { SceneSystem } from '../../assets/scripts/systems/SceneSystem';
import type { EventDef } from '../../assets/scripts/data/EventDefs';

const TOTAL_DAYS = 15;

function makeCtx(seed: number, talentId: string): GameCtx {
    const cfg = loadConfigsFromDisk();
    const run = createRunState(seed, talentId);
    const talent = TalentSystem.buildRuntime(cfg.talents.find(t => t.id === talentId)!);
    return { cfg, run, rng: new RNG(seed), talent };
}

/** 随机策略：在可用选项里加权随机选一个 */
function pickOption(ctx: GameCtx, ev: EventDef): number {
    const avail = ev.options
        .map((o, i) => ({ o, i }))
        .filter(x => EventEngine.optionAvailable(ctx, x.o));
    const pool = avail.map(x => ({ i: x.i, weight: 1 }));
    let total = 0;
    for (const p of pool) total += p.weight;
    let r = ctx.rng.next() * total;
    for (const p of pool) {
        r -= p.weight;
        if (r < 0) return p.i;
    }
    return 0;
}

/** 解析一条事件及其连锁，直到没有 nextEvent；返回死亡提示 */
function runEventChain(ctx: GameCtx, evId: string | null): { duringNightEvent?: boolean } {
    const hint: { duringNightEvent?: boolean } = {};
    let id = evId;
    let guard = 0;
    while (id && guard++ < 10) {
        const ev = ctx.cfg.events.find(e => e.id === id);
        if (!ev) break;
        // story 类事件 weight=0 不进随机池，但可被连锁直达
        const optIdx = pickOption(ctx, ev);
        const branch = EventEngine.resolveOption(ctx, ev, optIdx);
        if (ev.type === 'night') hint.duringNightEvent = true;
        const dead = TimeSystem.checkSuddenDeath(ctx, hint);
        if (dead) break;
        id = branch.nextEvent ?? null;
    }
    return hint;
}

/** 模拟真人整理背包：满仓时丢弃低价值杂物腾位 */
const JUNK_PRIORITY = ['food_berry', 'water_dirty', 'mat_charcoal', 'mat_stone', 'mat_cloth'];
function tidyBag(ctx: GameCtx): void {
    if (!InventorySystem.isFull(ctx)) return;
    for (const junk of JUNK_PRIORITY) {
        if (InventorySystem.count(ctx, junk) > 0) {
            InventorySystem.remove(ctx, junk, 1);
            return;
        }
    }
}

/** 粗略价值表：真人扫一眼报价就知道亏不亏 */
const ITEM_VALUE: Record<string, number> = {
    food_berry: 0.5, water_dirty: 1, mat_wood: 1, mat_stone: 1, mat_charcoal: 1,
    food_black_bread: 1.5, mat_cloth: 1.5, food_raw_fish: 2, food_raw_meat: 2,
    mat_rope: 2, food_biscuit: 2, water_boiled: 2.5, water_clean: 2.5,
    med_painkiller: 2.5, med_ointment: 3, food_cooked_fish: 3.5, food_canned: 4,
    food_cooked_meat: 4, med_detox: 4, med_sedative: 4, med_bandage: 3,
    med_antibiotic: 5, med_first_aid: 7, tool_lighter: 5, key_radio_parts: 6,
    tool_stone_axe: 8, tool_iron_axe: 12, tool_fishing_rod: 6, tool_torch: 4,
    tool_flashlight: 5, tool_radio: 10, key_map_fragment: 4, key_signal_gun: 12,
};
function val(id: string): number { return ITEM_VALUE[id] ?? 2; }

/** 真人会一眼看穿的好买卖：价值多 15% 以上且付出品有富余（>3件）就成交 */
function tryTrades(ctx: GameCtx): void {
    for (const offer of ctx.run.tradesToday) {
        if (TradingSystem.isAccepted(ctx, offer.id)) continue;
        const gain = val(offer.get.itemId) * offer.get.count;
        const cost = val(offer.give.itemId) * offer.give.count;
        const surplus = InventorySystem.count(ctx, offer.give.itemId) - offer.give.count;
        if (gain > cost * 1.15 && surplus >= 3 && TradingSystem.canAccept(ctx, offer)) {
            TradingSystem.accept(ctx, offer.id);
        }
    }
}

function playOnce(seed: number, talentId: string): { days: number; endingId: string } {
    const ctx = makeCtx(seed, talentId);

    // 新手礼包（策划案 §2③）
    InventorySystem.add(ctx, 'food_black_bread', 2);
    InventorySystem.add(ctx, 'water_clean', 2);
    InventorySystem.add(ctx, 'mat_wood', 10);

    for (let day = 1; day <= TOTAL_DAYS; day++) {
        const morning = TimeSystem.startMorning(ctx);

        // 每日事件
        tryTrades(ctx);   // 清晨扫一眼今日报价，有好买卖就成交
        if (morning.dailyEventId) {
            runEventChain(ctx, morning.dailyEventId);
            if (ctx.run.endingId) break;
        }
        // T09 赠礼已由 startMorning 直接入包（含频道插播），无需处理

        // v0.7.1 场景推进：像玩家一样把多拍剧本演完（每拍选第一个可用项）
        let sceneGuard = 0;
        while (!ctx.run.endingId && sceneGuard++ < 40) {
            const ev = SceneSystem.activeNode(ctx);
            if (!ev) break;
            const branch = EventEngine.resolveOption(ctx, ev, 0);
            if (SceneSystem.followUp(ctx, ev, branch) === null) break;
        }

        // 白天：跟随系统提示的新手策略（会做明显准备动作，但不会深度优化）
        while (TimeSystem.canAct(ctx)) {
            if (!TimeSystem.exploreAllowed(ctx)) break;

            const facs = ctx.run.facilities;
            const cnt = (id: string) => InventorySystem.count(ctx, id);

            // 0. 伤了先用药（人类的本能）
            if (ctx.run.stats.hp <= 50) {
                for (const med of ['med_first_aid', 'med_painkiller']) {
                    if (cnt(med) > 0) { ItemUsageSystem.use(ctx, med); break; }
                }
            }
            if (ctx.run.statuses.some(s => s.id === 'injured') && cnt('med_bandage') > 0) {
                ItemUsageSystem.use(ctx, 'med_bandage');
            }
            if (ctx.run.statuses.some(s => s.id === 'sick') && cnt('med_antibiotic') > 0) {
                ItemUsageSystem.use(ctx, 'med_antibiotic');
            }
            if (ctx.run.statuses.some(s => s.id === 'poisoned') && cnt('med_detox') > 0) {
                ItemUsageSystem.use(ctx, 'med_detox');
            }
            // 自制绷带（受伤且没绷带时）
            if (ctx.run.statuses.some(s => s.id === 'injured')
                && cnt('med_bandage') === 0 && cnt('mat_cloth') >= 2) {
                CraftSystem.craft(ctx, 'craft_bandage');
            }

            // 有火就先烹饪：熟食价值翻倍且无副作用
            if (facs.includes('campfire')) {
                if (InventorySystem.count(ctx, 'food_raw_meat') > 0) {
                    CraftSystem.craft(ctx, 'cook_meat');
                    tidyBag(ctx);
                }
                if (InventorySystem.count(ctx, 'food_raw_fish') > 0) {
                    CraftSystem.craft(ctx, 'cook_fish');
                    tidyBag(ctx);
                }
                if (InventorySystem.count(ctx, 'water_dirty') > 0) {
                    CraftSystem.craft(ctx, 'boil_water');
                    tidyBag(ctx);
                }
            }

            // 1. 火堆最优先
            if (!facs.includes('campfire') && cnt('mat_wood') >= 3) {
                CraftSystem.craft(ctx, 'craft_campfire');
                continue;
            }
            // 2. 储物箱（容量永远是刚需）
            if (!facs.includes('storage_box') && cnt('mat_wood') >= 4 && day >= 3) {
                CraftSystem.craft(ctx, 'craft_storage_box');
                continue;
            }
            // 2. 兽潮前装门闩（系统预警提示后的自然反应）
            if (!facs.includes('door_bolt') && day >= 11
                && cnt('mat_wood') >= 4 && cnt('mat_rope') >= 1) {
                CraftSystem.craft(ctx, 'craft_door_bolt');
                continue;
            }
            // 3. 石斧提升采集
            if (!ctx.run.inventory.some(s => s.id === 'tool_stone_axe')
                && day <= 8 && cnt('mat_wood') >= 2 && cnt('mat_stone') >= 2) {
                CraftSystem.craft(ctx, 'craft_stone_axe');
                continue;
            }

            let loc: string | null = null;
            const locs = ctx.run.unlockedLocations.filter(l => !LocationSystem.isOnCooldown(ctx, l));
            if (!locs.length) { TimeSystem.rest(ctx); continue; }
            // 4. 口渴优先溪谷；否则随机
            if (ctx.run.stats.thirst < 50 && locs.includes('creek_valley')) {
                loc = 'creek_valley';
            } else {
                loc = locs[ctx.rng.int(0, locs.length - 1)];
            }

            let eventId: string | null = null;
            try {
                TimeSystem.explore(ctx, loc, undefined, ev => { eventId = ev ? ev.id : null; });
            } catch {
                break;   // 工具缺失等情况直接休息
            }
            SkillSystem.grantForAction(ctx, 'explore');   // v0.7.1 模拟器感知技能树
            tidyBag(ctx);   // 探索产出后整理背包（模拟真人丢杂物）
            runEventChain(ctx, eventId);
            if (ctx.run.endingId) break;
        }
        if (ctx.run.endingId) break;

        // 黄昏：保守策略——回家
        void TimeSystem.duskNeeded;

        // 睡前习惯：写日记 / 冥想（像人一样积累知识线）
        DailyActionSystem.journal(ctx);
        if (ctx.rng.chance(50)) DailyActionSystem.meditate(ctx);

        // 夜晚
        const night = TimeSystem.beginNight(ctx);
        let deathHint = {};
        if (night.nightEventId) {
            deathHint = runEventChain(ctx, night.nightEventId);
        }
        const fin = TimeSystem.finishNight(ctx, deathHint);
        if (fin.ended) {
            return { days: ctx.run.day, endingId: fin.endingId! };
        }
    }

    // 兜底：循环正常走完但没触发 D15 结算（理论不发生）
    return {
        days: ctx.run.day,
        endingId: ctx.run.endingId ?? 'E04',
    };
}

// ================= 主程序 =================
function main() {
    // dist 模式：输出单天赋(默认T03)的结局/死亡日分布
    if (process.argv[2] === 'dist') {
        const n = Number(process.argv[3] ?? 2000);
        const talentId = process.argv[4] ?? 'T03';
        const cfg = loadConfigsFromDisk();
        const endings = new Map<string, number>();
        const days = new Map<number, number>();
        for (let i = 0; i < n; i++) {
            const r = playOnce(50000 + i, talentId);
            endings.set(r.endingId, (endings.get(r.endingId) ?? 0) + 1);
            days.set(r.days, (days.get(r.days) ?? 0) + 1);
        }
        console.log(`天赋=${talentId} n=${n}`);
        console.log('结局:', Object.fromEntries([...endings.entries()].sort()));
        console.log('死亡日:', Object.fromEntries([...days.entries()].sort((a, b) => a[0] - b[0])));
        return;
    }

    const nPerTalent = Number(process.argv[2] ?? 500);
    const cfg = loadConfigsFromDisk();
    console.log(`\n=== 全民求生·迷雾降临 数值模拟器 ===`);
    console.log(`每天赋 ${nPerTalent} 局 × ${cfg.talents.length} 天赋 = ${nPerTalent * cfg.talents.length} 局\n`);

    const header = ['天赋', '死亡率', '平均存活', '好结局率', 'E05隐藏'].join('\t');
    console.log(header);
    console.log('-'.repeat(56));

    let totalDeaths = 0, totalRuns = 0, totalDays = 0, goodEndings = 0, e05Count = 0;
    let seedBase = 1000;

    for (const t of cfg.talents) {
        let deaths = 0, daysSum = 0, good = 0, e05 = 0;
        for (let i = 0; i < nPerTalent; i++) {
            const r = playOnce(seedBase++, t.id);
            totalRuns++;
            totalDays += r.days;
            const isDeath = cfg.endings.find(e => e.id === r.endingId)?.kind === 'death';
            if (isDeath) deaths++;
            else good++;
            if (r.endingId === 'E05') e05++;
        }
        totalDeaths += deaths; goodEndings += good; e05Count += e05;
        const pct = (v: number) => (v / nPerTalent * 100).toFixed(1) + '%';
        console.log(
            `${t.name.padEnd(6)}\t${pct(deaths)}\t${(daysSum / nPerTalent).toFixed(1)}\t\t${pct(good)}\t${e05}`
        );
    }

    console.log('-'.repeat(56));
    console.log(`总体：死亡率 ${(totalDeaths / totalRuns * 100).toFixed(1)}%` +
        ` | 平均存活 ${(totalDays / totalRuns).toFixed(1)} 天` +
        ` | 好结局率 ${(goodEndings / totalRuns * 100).toFixed(1)}%` +
        ` | E05 触发 ${e05Count} 次`);
    // 校验口径（勤奋策略）：死亡 40~60%，好结局 40~60%
    // 随机策略（debug_dist.ts）作为难度下界：接近全灭
    const deathRate = totalDeaths / totalRuns;
    const goodRate = goodEndings / totalRuns;
    const okDeath = deathRate >= 0.40 && deathRate <= 0.60;
    const okGood = goodRate >= 0.40 && goodRate <= 0.60;
    console.log(`\n数值目标校验（勤奋新手策略）：死亡率 40~60% → ${okDeath ? '✅' : '❌'}；好结局率 40~60% → ${okGood ? '✅' : '❌'}`);
    process.exit(okDeath && okGood ? 0 : 1);
}

main();
