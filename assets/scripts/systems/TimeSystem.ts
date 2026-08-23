// 时间主循环：晨间播报 → 白天行动 → 黄昏抉择 → 夜晚结算
import { EventBus, GameEvents } from '../core/EventBus';
import type { EventDef } from '../data/EventDefs';
import { StatsSystem } from './StatsSystem';
import { StatusEffectSystem } from './StatusEffectSystem';
import { InventorySystem } from './InventorySystem';
import { ShelterSystem } from './ShelterSystem';
import { DisasterSystem } from './DisasterSystem';
import { LocationSystem } from './LocationSystem';
import { EventEngine } from './EventEngine';
import { TradingSystem } from './TradingSystem';
import { EndingSystem } from './EndingSystem';
import type { GameCtx } from './RunModel';

const WEATHER_POOL: { id: string; weight: number }[] = [
    { id: 'fog_thick', weight: 45 },
    { id: 'fog_light', weight: 30 },
    { id: 'sunny', weight: 15 },
    { id: 'rain', weight: 10 },
];

export interface MorningReport {
    day: number;
    weather: string;
    disasterCountdown: { name: string; dueDay: number; daysLeft: number } | null;
    hint: string | null;          // T01 每日提示
    dailyEventId: string | null;
    giftItemId: string | null;    // T09 社牛赠礼
    storyEventId: string | null;  // 剧情链自然触发
}

export interface ExploreRequest {
    bonusMult?: number;           // 黄昏"贪一趟"收益加成
    extraRiskPct?: number;
}

export interface NightReport {
    nightEventId: string | null;
    endingId: string | null;      // 非空即本局结束
    newDay: number;
}

export class TimeSystem {
    // ============ 清晨 ============
    static startMorning(ctx: GameCtx): MorningReport {
        const run = ctx.run;
        run.phase = 'morning';

        // 天气：优先用昨日预告；再为明天预摇（收音机预报）
        const w = run.weatherTomorrow ?? pickWeather(ctx);
        run.weather = DisasterSystem.overrideWeather(ctx, w);
        run.weatherTomorrow = pickWeather(ctx);
        DisasterSystem.onMorning(ctx);
        LocationSystem.tickCooldowns(ctx);

        // 地点解锁 + 存量初始化
        for (const l of ctx.cfg.locations) {
            if (run.locationStock[l.id] === undefined) {
                run.locationStock[l.id] = l.initialStock;
            }
            if (l.unlockDay <= run.day && !run.unlockedLocations.includes(l.id)) {
                run.unlockedLocations.push(l.id);
            }
        }

        // 陷阱被动：清晨收猎
        if (run.facilities.includes('trap') && ctx.rng.chance(50)) {
            InventorySystem.add(ctx, 'food_raw_meat', 1);
        }

        // 行动点恢复（充沛 buff +1）
        run.apLeft = 3 + (run.statuses.some(s => s.id === 'energized') ? 1 : 0);

        // 天气实感：晴天振奋 / 雨天免费集水
        if (run.weather === 'sunny') StatsSystem.apply(ctx, 'sanity', 5);
        if (run.weather === 'rain') InventorySystem.add(ctx, 'water_dirty', 1);

        // 随从每日重置
        if (run.companion) run.companion.exploredToday = false;

        // 今日交易报价
        TradingSystem.rollOffers(ctx);

        // T01 每日提示（动态情报版）
        const hint = ctx.talent.has('T01') ? buildHint(ctx) : null;

        // 每日事件 60%
        const dailyEv = ctx.rng.chance(60)
            ? EventEngine.pick(ctx, { poolType: 'daily' })
            : null;

        // 剧情链自然推进（30%，条件满足的 once 事件）
        const storyEv = ctx.rng.chance(30)
            ? EventEngine.pick(ctx, { poolType: 'story' })
            : null;

        // T09 社牛赠礼：每 N 天
        let gift: string | null = null;
        const giftN = ctx.talent.giftEveryNDays;
        if (giftN && run.day % giftN === 0) {
            gift = rollGift(ctx);
        }

        return {
            day: run.day,
            weather: run.weather,
            disasterCountdown: disasterCountdownInfo(ctx),
            hint,
            dailyEventId: dailyEv ? dailyEv.id : null,
            giftItemId: gift,
            storyEventId: storyEv ? storyEv.id : null,
        };
    }

    // ============ 白天行动 ============
    static canAct(ctx: GameCtx): boolean {
        return ctx.run.phase !== 'night' && ctx.run.apLeft > 0;
    }

    static spendAp(ctx: GameCtx, n = 1): void {
        ctx.run.apLeft = Math.max(0, ctx.run.apLeft - n);
    }

    static exploreAllowed(ctx: GameCtx): boolean {
        if (DisasterSystem.blocksExplore(ctx)) return false;
        return true;
    }

    /** 探索地点（扣1AP）。产出/宝箱由 LocationSystem 处理；事件 id 经 onEvent 回传 */
    static explore(
        ctx: GameCtx,
        locationId: string,
        req: ExploreRequest | undefined,
        onEvent: (ev: EventDef | null) => void,
    ): void {
        if (!this.canAct(ctx)) throw new Error('无可用行动点');
        this.spendAp(ctx);
        ctx.run.phase = 'daytime';
        LocationSystem.explore(ctx, locationId, {
            extraRiskPct: req?.extraRiskPct ?? 0,
            yieldMult: req?.bonusMult ?? 1,
        }, evId => {
            onEvent(evId ? findEvent(ctx, evId) : null);
        });
    }

    static rest(ctx: GameCtx): void {
        if (!this.canAct(ctx)) throw new Error('无可用行动点');
        this.spendAp(ctx);
        StatsSystem.apply(ctx, 'sanity', 15);
        if (ctx.run.shelterLevel >= 2) StatsSystem.apply(ctx, 'hp', 5);
        // 小憩总能恢复一点体力
        StatsSystem.apply(ctx, 'hp', 3);
    }

    // ============ 黄昏 ============
    static duskNeeded(ctx: GameCtx): boolean {
        return ctx.run.apLeft > 0 && ctx.run.phase !== 'night';
    }

    // ============ 夜晚结算（两段式：beginNight → [弹夜间事件] → finishNight）============
    static beginNight(ctx: GameCtx): { nightEventId: string | null } {
        const run = ctx.run;
        run.phase = 'night';

        // 0. 火堆/石屋驱寒：有火源则失温状态当晚解除
        if (run.facilities.includes('campfire') || ShelterSystem.effectsOf(ctx).coldImmune) {
            StatusEffectSystem.remove(ctx, 'hypothermia');
        }

        // 0.5 随从晚餐：吃一份食物；断粮则掉血，三天不吃走人
        if (run.companion) {
            const food = run.inventory.find(s => {
                const def = ctx.cfg.items.find(i => i.id === s.itemId);
                return def?.category === 'food';
            });
            if (food) {
                InventorySystem.remove(ctx, food.itemId, 1);
                run.companion.daysUnfed = 0;
                run.companion.hp = Math.min(120, run.companion.hp + 5);
            } else {
                run.companion.daysUnfed += 1;
                run.companion.hp -= 12;
            }
            if (run.companion.hp <= 0 || run.companion.daysUnfed >= 3) {
                run.flags.push('laok_gone');
                EventBus.emit(GameEvents.ChatNew, { nick: '老K', text: '兄弟 我先走一步 别找我' });
                run.companion = null;
            }
        }

        // 1. 自动吃喝（优先高恢复、非风险）；入夜前已口渴则允许喝双份
        autoConsume(ctx, 'food');
        const thirsty = run.stats.thirst < 60;
        autoConsume(ctx, 'water');
        if (thirsty) autoConsume(ctx, 'water');

        // 火堆的火光让人安心（奖励生产行为）
        if (run.facilities.includes('campfire')) StatsSystem.apply(ctx, 'sanity', 3);

        // 2. 自然衰减 + 状态结算
        StatsSystem.dailyDecay(ctx);
        const tick = StatusEffectSystem.tickDaily(ctx);
        if (tick.perDayHp) StatsSystem.apply(ctx, 'hp', tick.perDayHp);
        if (tick.perDaySanity) StatsSystem.apply(ctx, 'sanity', tick.perDaySanity);
        if (tick.consumeMult > 1) {
            StatsSystem.apply(ctx, 'hunger', -Math.round(20 * (tick.consumeMult - 1)));
            StatsSystem.apply(ctx, 'thirst', -Math.round(30 * (tick.consumeMult - 1)));
        }
        StatsSystem.applyStarvationPenalty(ctx);

        // 3. 庇护所夜间 SAN 消耗
        StatsSystem.apply(ctx, 'sanity', -ShelterSystem.effectsOf(ctx).nightSanityDrain);

        // 4. 夜间事件抽取（42% × 守夜人 × 隐蔽）
        let chance = 42 * ctx.talent.nightRiskFactor;
        if (run.statuses.some(s => s.id === 'hidden')) chance *= 0.5;
        const ev = ctx.rng.chance(chance)
            ? EventEngine.pick(ctx, { poolType: 'night' })
            : null;
        return { nightEventId: ev ? ev.id : null };
    }

    /** 夜间事件解析完、天灾夜检后调用：崩溃计数 → 结局判定 → 推进天数 */
    static finishNight(
        ctx: GameCtx,
        deathHint: { duringNightEvent?: boolean; duringBeastTide?: boolean } = {},
    ): { ended: boolean; endingId: string | null; newDay: number } {
        const run = ctx.run;

        // 5. 天灾夜间达标判定（寒流/兽潮惩罚在此落地）
        DisasterSystem.nightCheck(ctx);
        // 酸雨类无夜间判定的天灾：平安度过当天即记录达标
        if (ctx.run.weather === 'acid_rain') DisasterSystem.markDayPassed(ctx);

        // 6. 崩溃连击计数
        if (run.stats.sanity <= 0) run.sanZeroStreak += 1;
        else run.sanZeroStreak = 0;

        // 7. 结局判定（死亡 / 崩溃 / D15 收官）
        const ending = EndingSystem.evaluate(ctx, {
            ...deathHint,
            duringBeastTide:
                deathHint.duringBeastTide ||
                DisasterSystem.isActiveToday(ctx)?.id === 'beast_tide',
        });
        if (ending) {
            EndingSystem.finish(ctx, ending);
            return { ended: true, endingId: ending, newDay: run.day };
        }

        // 8. 推进到下一天清晨
        run.day += 1;
        run.phase = 'morning';
        EventBus.emit(GameEvents.DayAdvance, { newDay: run.day });
        return { ended: false, endingId: null, newDay: run.day };
    }

    /** 每次事件效果落地后检查猝死（HP≤0 即死，不等夜晚） */
    static checkSuddenDeath(
        ctx: GameCtx,
        deathHint: { duringNightEvent?: boolean; duringBeastTide?: boolean } = {},
    ): string | null {
        if (ctx.run.endingId || ctx.run.stats.hp > 0) return null;
        const ending = EndingSystem.evaluate(ctx, deathHint);
        if (ending) EndingSystem.finish(ctx, ending);
        return ending ?? null;
    }

    /** 派随从外出（1AP，每日一次）：带回随机铜箱级物资，有小概率受伤 */
    static sendCompanion(ctx: GameCtx): { ok: boolean; msg: string } {
        const run = ctx.run;
        if (!run.companion) return { ok: false, msg: '没有随从' };
        if (run.companion.exploredToday) return { ok: false, msg: '今天已经派他出去过了' };
        if (run.companion.hp <= 30) return { ok: false, msg: '他伤得太重，需要休息' };

        this.spendAp(ctx);
        run.companion.exploredToday = true;

        const copper = ctx.cfg.lootTables.find(t => t.tier === 'copper');
        if (!copper || !copper.entries.length) return { ok: true, msg: '老K空手而归。' };
        const entry = copper.entries[ctx.rng.int(0, copper.entries.length - 1)];
        const count = Math.max(1, Math.round(ctx.rng.int(entry.min, entry.max) * 0.7));
        InventorySystem.add(ctx, entry.itemId, count);

        let hurtNote = '';
        if (ctx.rng.chance(20)) {
            run.companion.hp -= 12;
            hurtNote = ' 他胳膊上多了道口子，说不碍事。';
        }
        const name = ctx.cfg.items.find(i => i.id === entry.itemId)?.name ?? entry.itemId;
        return { ok: true, msg: `【老K归来】带回了${name}×${count}。${hurtNote}` };
    }
}

// ---------- 内部工具 ----------
function pickWeather(ctx: GameCtx): string {
    let total = 0;
    for (const w of WEATHER_POOL) total += w.weight;
    let r = ctx.rng.next() * total;
    for (const w of WEATHER_POOL) {
        r -= w.weight;
        if (r < 0) return w.id;
    }
    return 'fog_thick';
}

function disasterCountdownInfo(ctx: GameCtx) {
    const n = ctx.run.disasterNext;
    if (!n) return null;
    const def = DisasterSystem.getDef(ctx, n.id);
    return { name: def.name, dueDay: n.dueDay, daysLeft: Math.max(0, n.dueDay - ctx.run.day) };
}

function buildHint(ctx: GameCtx): string {
    const run = ctx.run;
    // 动态情报：优先级从高到低给出可执行建议
    // 1. 天灾备战缺口
    const dn = run.disasterNext;
    if (dn && dn.dueDay - run.day <= 2) {
        const def = DisasterSystem.getDef(ctx, dn.id);
        if (def.nightCheck) {
            for (const c of def.nightCheck.passIfAnyOf) {
                if (c === 'campfire' && !run.facilities.includes('campfire'))
                    return '【提示】寒潮将至，今晚之前最好生起火堆。';
                if (c === 'door_bolt' && !run.facilities.includes('door_bolt'))
                    return '【提示】兽潮将至，一门闩胜过十把刀。';
                if (c === 'weapon') {
                    const hasW = ['stone_axe', 'iron_axe'].some(w =>
                        run.inventory.some(s => s.itemId === w));
                    if (!hasW) return '【提示】有什么能挥舞的东西吗？快去弄一把。';
                }
            }
        }
    }
    // 2. 枯竭预警
    const low = ctx.cfg.locations
        .filter(l => run.unlockedLocations.includes(l.id))
        .find(l => (run.locationStock[l.id] ?? 0) <= 2);
    if (low) return `【提示】${low.name}的物资快要见底了。`;
    // 3. 渴/饿指向
    if (run.stats.thirst < 50) return '【提示】溪谷方向应有净水。';
    if (run.stats.hunger < 50) return '【提示】超市方向似乎还有罐头的气味。';
    // 4. 兜底风味
    const flavor = [
        '【提示】西面的迷雾似乎比昨天薄了一些。',
        '【提示】今夜风从北边来，火要旺一点。',
    ];
    return ctx.rng.pick(flavor);
}

function rollGift(ctx: GameCtx): string | null {
    const pool = ['food_biscuit', 'water_clean', 'med_bandage'];
    const id = pool[ctx.rng.int(0, pool.length - 1)];
    const added = InventorySystem.add(ctx, id, 1);
    if (added > 0) EventBus.emit(GameEvents.ChatInject, { poolId: 'link_gift' });
    return added > 0 ? id : null;
}

function findEvent(ctx: GameCtx, id: string): EventDef | null {
    return ctx.cfg.events.find(e => e.id === id) ?? null;
}

/** 自动进食/饮水：选恢复值最高且无风险的；只有风险品也吃（计脏水数） */
function autoConsume(ctx: GameCtx, cat: 'food' | 'water'): string | null {
    const catItems = ctx.cfg.items.filter(i =>
        i.use && (cat === 'food' ? i.category === 'food' : i.category === 'water'));
    const owned = catItems.filter(i => InventorySystem.count(ctx, i.id) > 0);
    if (!owned.length) return null;

    const safe = owned.filter(i => !i.use!.riskSickPct && !i.use!.riskPoisonPct);
    const restoreKey = cat === 'food' ? 'hunger' : 'thirst' as const;
    const sorted = (safe.length ? safe : owned).sort((a, b) =>
        (b.use![restoreKey] ?? 0) - (a.use![restoreKey] ?? 0));
    const item = sorted[0];

    InventorySystem.remove(ctx, item.id, 1);
    const u = item.use!;
    if (u.hunger) StatsSystem.apply(ctx, 'hunger', u.hunger);
    if (u.thirst) StatsSystem.apply(ctx, 'thirst', u.thirst);
    if (u.sanity) StatsSystem.apply(ctx, 'sanity', u.sanity);

    if (item.id === 'water_dirty') ctx.run.counters.dirtyWaterDrunk += 1;

    // 副作用判定
    const riskSick = (u.riskSickPct ?? 0) * ctx.talent.dirtyConsumeFactor;
    const riskPoison = (u.riskPoisonPct ?? 0) * ctx.talent.dirtyConsumeFactor;
    if (riskSick > 0 && ctx.rng.chance(riskSick)) StatusEffectSystem.add(ctx, 'sick');
    if (riskPoison > 0 && ctx.rng.chance(riskPoison)) StatusEffectSystem.add(ctx, 'poisoned');

    return item.id;
}



