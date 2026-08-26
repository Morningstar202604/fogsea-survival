// 每日行动系统：白天可选的轻量行动（多数不消耗 AP，但每日一次）
// 全部收益由公式驱动，数值集中在本文件便于平衡调参。
import { clamp } from '../core/RNG';
import type { GameCtx } from './RunModel';
import { StatsSystem } from './StatsSystem';
import { InventorySystem } from './InventorySystem';
import { StatusEffectSystem } from './StatusEffectSystem';
import { RelationshipSystem } from './RelationshipSystem';
import { SkillSystem } from './SkillSystem';

export interface ActionResult { ok: boolean; msg: string; }

const today = (ctx: GameCtx) => `d${ctx.run.day}`;

function oncePerDay(ctx: GameCtx, key: string): boolean {
    const k = `act_${key}`;
    if (ctx.run.counters[k] === ctx.run.day) return false;
    ctx.run.counters[k] = ctx.run.day;
    return true;
}

export class DailyActionSystem {
    /** 💪 锻炼：HP 上限 +1（软上限 120），饥饿 -6；连续 7 天触发 flag */
    static exercise(ctx: GameCtx): ActionResult {
        if (!oncePerDay(ctx, 'ex')) return { ok: false, msg: '今天已经锻炼过了，肌肉需要休息。' };
        StatsSystem.apply(ctx, 'hunger', -6);
        const before = ctx.run.statMax.hp;
        ctx.run.statMax.hp = Math.min(120, before + 1);
        const streak = (ctx.run.counters.exStreak ?? 0) + 1;
        ctx.run.counters.exStreak = streak;
        let extra = '';
        if (ctx.run.statMax.hp > before && ctx.run.statMax.hp >= 120) extra = '（体魄已臻极限）';
        else if (ctx.run.statMax.hp > before) extra = '（生命上限+1）';
        if (streak === 7) {
            if (!ctx.run.flags.includes('ex_week')) ctx.run.flags.push('ex_week');
            extra += ' 连续七天！你摸到了铁匠般的体格。';
        }
        return { ok: true, msg: `【锻炼】俯卧撑做到手臂发抖。${extra}` };
    }

    /** 🧘 冥想：SAN +8 + 庇护所×2，书架再 +3；低 SAN 时额外稳住心神 */
    static meditate(ctx: GameCtx): ActionResult {
        if (!oncePerDay(ctx, 'med')) return { ok: false, msg: '心绪已尽，明天再冥想吧。' };
        let bonus = 8 + ctx.run.shelterLevel * 2
            + (ctx.run.facilities.includes('bookshelf') ? 3 : 0);
        // 灵媒分支加成
        if (SkillSystem.featureUnlocked(ctx, 'sanity_shield')) bonus += 4;
        StatsSystem.apply(ctx, 'sanity', bonus);
        if (ctx.run.stats.sanity < 30) StatusEffectSystem.remove(ctx, 'panic');
        return { ok: true, msg: `【冥想】呼吸沉入雾底。精神+${bonus}。` };
    }

    /** 📔 写日记：SAN+3，累计计数；≥10 天解锁隐藏结局线 */
    static journal(ctx: GameCtx): ActionResult {
        if (!oncePerDay(ctx, 'jr')) return { ok: false, msg: '今天的日记已经写过了。' };
        StatsSystem.apply(ctx, 'sanity', 3);
        const n = (ctx.run.counters.journal ?? 0) + 1;
        ctx.run.counters.journal = n;
        let extra = '';
        if (n === 10) {
            ctx.run.flags.push('journal_keeper');
            extra += ' 第十篇了。这本日记，也许会有人读到。';
        }
        // 灵媒分支：梦境事件触发
        if (SkillSystem.featureUnlocked(ctx, 'dream_events') && ctx.rng.chance(20)) {
            ctx.run.flags.push('dream_event_pending');
            extra += ' 写着写着，笔尖停了——你似乎看到了一些不属于今天的画面。';
        }
        // 灵感积累（已由 SkillSystem.checkInspiration 处理）
        return { ok: true, msg: `【日记】记下第 ${n} 篇。精神+3。${extra}` };
    }

    /** 📻 听收音机：情报+救援进度；进度越高 D15 结局越好 */
    static listenRadio(ctx: GameCtx): ActionResult {
        if (!ctx.run.facilities.includes('radio'))
            return { ok: false, msg: '没有收音机。杂乱的电流声只是风声。' };
        if (!oncePerDay(ctx, 'radio')) return { ok: false, msg: '今天该听的都听了。' };
        StatsSystem.apply(ctx, 'sanity', 2);
        let rescueGain = 1;
        // 学者分支加成
        if (SkillSystem.featureUnlocked(ctx, 'radio_decrypt')) rescueGain += 1;
        if (SkillSystem.featureUnlocked(ctx, 'rescue_boost')) rescueGain += 1;
        const p = (ctx.run.counters.rescueProgress ?? 0) + rescueGain;
        ctx.run.counters.rescueProgress = p;
        const lines = [
            '……滋滋……任何频段看到请回应……',
            '……东三区救援点已设……重复……东三区……',
            '……保持信号……我们正在接近大雾区……',
            '……直升机编队将于近日过境……注意开阔地……',
        ];
        const line = lines[Math.min(3, Math.floor(p / 2))];
        return { ok: true, msg: `【广播】${line}（救援进度 ${p}）` };
    }

    /** 🔥 添柴：1 木材 → 火堆燃料 +2（上限 6）；燃料决定夜晚火堆是否生效 */
    static stokeFire(ctx: GameCtx): ActionResult {
        if (!ctx.run.facilities.includes('campfire'))
            return { ok: false, msg: '还没有火堆。先去制作一个。' };
        if (InventorySystem.count(ctx, 'mat_wood') < 1)
            return { ok: false, msg: '没有木材可添。' };
        if ((ctx.run.fireFuel ?? 0) >= 6)
            return { ok: false, msg: '柴堆已经够高了，省着点木材。' };
        InventorySystem.remove(ctx, 'mat_wood', 1);
        ctx.run.fireFuel = Math.min(6, (ctx.run.fireFuel ?? 0) + 2);
        return { ok: true, msg: `【添柴】火更旺了。（燃料 ${ctx.run.fireFuel}/6）` };
    }

    /** 🎣 钓鱼：1AP，需鱼竿；成功率受天气/天赋影响 */
    static fish(ctx: GameCtx): ActionResult & { apCost: number } {
        if (ctx.run.apLeft <= 0) return { ok: false, msg: '没有行动点了。', apCost: 1 };
        if (!oncePerDay(ctx, 'fish')) return { ok: false, msg: '溪谷的鱼被钓怕了，明天再来。', apCost: 1 };
        if (!InventorySystem.count(ctx, 'tool_fishing_rod'))
            return { ok: false, msg: '需要一根鱼竿（制作获得）。', apCost: 0 };
        TimeSys_spendAp(ctx, 1);
        let p = 55;
        if (ctx.run.weather === 'rain') p += 12;
        if (ctx.run.weather === 'sunny') p -= 5;
        if (ctx.run.weather === 'fog_thick') p -= 8;
        p += ctx.talent.fishingBonusPct;
        p = clamp(p, 15, 95);
        if (ctx.rng.chance(p)) {
            const n = 1 + (ctx.rng.chance(30 + ctx.talent.fishingBonusPct / 2) ? 1 : 0);
            InventorySystem.add(ctx, 'food_raw_fish', n);
            return { ok: true, msg: `【钓鱼】浮漂一沉——生鱼×${n}！`, apCost: 1 };
        }
        // 脱钩，但偶尔惊起水下的东西（事件钩子交给 flags）
        if (ctx.rng.chance(18)) ctx.run.flags.push('fish_odd');
        return { ok: true, msg: '【钓鱼】浮漂纹丝不动。你与溪水对峙了一下午。', apCost: 1 };
    }

    // ================= v0.5 新增六项行动 =================

    /** 🏹 打猎：1AP，需猎弓；成功率 = 40 + 天数 + 猎手加成 */
    static hunt(ctx: GameCtx): ActionResult & { apCost: number } {
        if (ctx.run.apLeft <= 0) return { ok: false, msg: '没有行动点了。', apCost: 1 };
        if (!oncePerDay(ctx, 'hunt')) return { ok: false, msg: '猎物今天学乖了，换个时辰吧。', apCost: 1 };
        if (!InventorySystem.count(ctx, 'tool_bow'))
            return { ok: false, msg: '需要一把猎弓（制作获得）。', apCost: 0 };
        TimeSys_spendAp(ctx, 1);
        let p = 40 + ctx.run.day * 2 + ctx.talent.combatBonusPct * 0.6;
        if (ctx.run.weather === 'fog_thick') p -= 10;   // 雾太浓，看不见箭路
        p = clamp(p, 15, 90);
        if (ctx.rng.chance(p)) {
            InventorySystem.add(ctx, 'food_raw_meat', 1);
            if (ctx.rng.chance(35)) InventorySystem.add(ctx, 'mat_cloth', 1);   // 兽皮
            ctx.run.counters.hunts = (ctx.run.counters.hunts ?? 0) + 1;
            return { ok: true, msg: '【狩猎】箭矢没入草丛的瞬间传来闷响。今晚有肉了。', apCost: 1 };
        }
        if (ctx.rng.chance(20)) {
            ctx.run.counters.fogPressure = Math.min(30, (ctx.run.counters.fogPressure ?? 0) + 2);
            return { ok: true, msg: '【狩猎】追着血迹走了很远，猎物不见了——你也一样。雾，好像更近了。', apCost: 1 };
        }
        return { ok: true, msg: '【狩猎】一无所获。你学会辨认了三种不结果的脚印。', apCost: 1 };
    }

    /** 🌿 采药：0AP 每日一次；草药是茶与药膏的原料 */
    static gatherHerbs(ctx: GameCtx): ActionResult {
        if (!oncePerDay(ctx, 'herb')) return { ok: false, msg: '附近的草药今天采光了。' };
        let n = 1;
        if (ctx.run.weather === 'rain') n += 1;         // 雨后草药疯长
        if (ctx.rng.chance(25)) n += 1;
        // 采集者分支加成
        if (SkillSystem.featureUnlocked(ctx, 'herb_quality_1')) n += 1;
        if (SkillSystem.featureUnlocked(ctx, 'herb暴击') && ctx.rng.chance(25)) n += 1;
        InventorySystem.add(ctx, 'herb_green', n);
        return { ok: true, msg: `【采药】溪边、林缘、墙根。苦艾草×${n}。` };
    }

    /** 🪤 查陷阱：有陷阱设施时手动巡查（额外于清晨被动收成） */
    static checkTrap(ctx: GameCtx): ActionResult & { apCost: number } {
        if (!ctx.run.facilities.includes('trap'))
            return { ok: false, msg: '没有陷阱可查。先去制作一个。', apCost: 0 };
        if (ctx.run.apLeft <= 0) return { ok: false, msg: '没有行动点了。', apCost: 1 };
        if (!oncePerDay(ctx, 'trap')) return { ok: false, msg: '陷阱今天查过了。', apCost: 1 };
        TimeSys_spendAp(ctx, 1);
        // 猎手分支加成
        const trapBonus = SkillSystem.featureUnlocked(ctx, 'trap_mastery') ? 20 : 0;
        if (ctx.rng.chance(45 + trapBonus)) {
            InventorySystem.add(ctx, 'food_raw_meat', 1);
            return { ok: true, msg: '【陷阱】套住了一只肥硕野兔！它瞪你的眼神充满背叛。', apCost: 1 };
        }
        if (ctx.rng.chance(20)) {
            ctx.run.flags.push('trap_something_odd');
            return { ok: true, msg: '【陷阱】陷阱被触发了，猎物不见踪影——地上拖着一条不属于任何野兽的拖痕。', apCost: 1 };
        }
        return { ok: true, msg: '【陷阱】空空如也。你重新布好饵，明天再来。', apCost: 1 };
    }

    /** 🧵 编织：0AP 布料→绳索（2布=1绳），消耗体力 */
    static weaveRope(ctx: GameCtx): ActionResult {
        if (!oncePerDay(ctx, 'weave')) return { ok: false, msg: '手指已经磨出泡了，明天再编。' };
        if (InventorySystem.count(ctx, 'mat_cloth') < 2)
            return { ok: false, msg: '需要 2 块布料。' };
        InventorySystem.remove(ctx, 'mat_cloth', 2);
        InventorySystem.add(ctx, 'mat_rope', 1);
        StatsSystem.apply(ctx, 'hunger', -3);
        return { ok: true, msg: '【编织】撕条、搓捻、合股。一根结实的绳子诞生了。' };
    }

    /** 🚶 远眺侦察：爬上高处看雾的动向（情报+雾压对冲） */
    static scout(ctx: GameCtx): ActionResult & { apCost: number } {
        if (ctx.run.apLeft <= 0) return { ok: false, msg: '没有行动点了。', apCost: 1 };
        if (!oncePerDay(ctx, 'scout')) return { ok: false, msg: '今天已经侦察过了。', apCost: 1 };
        TimeSys_spendAp(ctx, 1);
        // 侦察抵消雾压
        const fogReduce = SkillSystem.featureUnlocked(ctx, 'scout_range_plus') ? 5 : 3;
        ctx.run.counters.fogPressure = Math.max(0, (ctx.run.counters.fogPressure ?? 0) - fogReduce);
        StatsSystem.apply(ctx, 'sanity', 3);
        const intel: string[] = [];
        if (ctx.run.disasterNext) {
            const left = Math.max(0, ctx.run.disasterNext.dueDay - ctx.run.day);
            intel.push(`远方有异动——${left === 0 ? '就是今天' : `约 ${left} 天后`}会有大事`);
        }
        if (ctx.run.weatherTomorrow && ctx.rng.chance(60)) {
            intel.push('明日风向已辨');
        }
        if (ctx.rng.chance(30)) {
            ctx.run.flags.push('scout_spotted');
            intel.push('雾墙外似乎有车辙印通向未知处');
        }
        // 学者分支：广播解密加成
        if (SkillSystem.featureUnlocked(ctx, 'radio_decrypt') && ctx.rng.chance(25)) {
            intel.push('远处传来微弱的电子信号');
        }
        const tail = intel.length ? `（${intel.join('；')}）` : '（雾海茫茫，暂无异动）';
        return { ok: true, msg: `【侦察】登上高地眺望。${tail}`, apCost: 1 };
    }

    /** 🍲 给朵朵留饭：好感行动（她隔天来取） */
    static leaveFoodForKid(ctx: GameCtx): ActionResult {
        if (!ctx.run.flags.includes('kid_met'))
            return { ok: false, msg: '还不认识那个小女孩。' };
        if ((ctx.run.counters.kidFoodDay ?? -9) >= ctx.run.day - 1)
            return { ok: false, msg: '昨天留的她还没吃完。' };
        const has = ['food_berry', 'food_biscuit', 'food_black_bread']
            .find(id => InventorySystem.count(ctx, id) > 0);
        if (!has) return { ok: false, msg: '没有适合孩子吃的食物。' };
        InventorySystem.remove(ctx, has, 1);
        ctx.run.counters.kidFoodDay = ctx.run.day;
        RelationshipSystem.add(ctx, 'kid', 4);
        return { ok: true, msg: '【留饭】你把食物包好放在石阶上，压了块石头防猫。' };
    }

    /** ♟ 与老K下棋：0AP 关系+SAN（需老K在场） */
    static playChessWithLaok(ctx: GameCtx): ActionResult {
        if (!ctx.run.companion && !ctx.run.flags.includes('laok_ally'))
            return { ok: false, msg: '老K不在身边。' };
        if (!oncePerDay(ctx, 'chess')) return { ok: false, msg: '今天杀够了，他说要保存脑力。' };
        const win = ctx.rng.chance(45);
        RelationshipSystem.add(ctx, 'laok', 3);
        if (win) {
            StatsSystem.apply(ctx, 'sanity', 7);
            return { ok: true, msg: '【棋局】你又赢了他。他骂骂咧咧地摆子："再来，最后一把！"——第五个最后一把。' };
        }
        StatsSystem.apply(ctx, 'sanity', 5);
        return { ok: true, msg: '【棋局】输了。但他讲了个战地笑话，值回票价比输棋更暖。' };
    }

    /** 🍳 烹饪盛宴：大锅乱炖（肉+鱼+蘑菇任二）→ 全属性大餐 buff */
    static cookFeast(ctx: GameCtx): ActionResult & { apCost: number } {
        if (!ctx.run.facilities.includes('campfire'))
            return { ok: false, msg: '没有火堆做不了大餐。', apCost: 0 };
        if (ctx.run.apLeft <= 0) return { ok: false, msg: '没有行动点了。', apCost: 1 };
        if (!oncePerDay(ctx, 'feast')) return { ok: false, msg: '肚子和锅都需要休息。', apCost: 1 };
        const mains = ['food_raw_meat', 'food_raw_fish', 'food_mushroom']
            .filter(id => InventorySystem.count(ctx, id) > 0);
        if (mains.length < 2)
            return { ok: false, msg: '至少需要两种不同主料（生肉/生鱼/蘑菇）。', apCost: 0 };
        for (const id of mains.slice(0, 2)) InventorySystem.remove(ctx, id, 1);
        TimeSys_spendAp(ctx, 1);
        StatsSystem.apply(ctx, 'hunger', 45);
        StatsSystem.apply(ctx, 'sanity', 16);
        StatsSystem.apply(ctx, 'hp', 6);
        ctx.run.counters.feasts = (ctx.run.counters.feasts ?? 0) + 1;
        return { ok: true, msg: '【盛宴】乱炖出锅，香气霸道地占领了整间木屋。这一餐值得活着。（饱食+45 精神+16 生命+6）', apCost: 1 };
    }

    // ================= v0.7 技能深化新行动 =================

    /** 🍲 精致料理：1AP 单食材精细烹饪，品质受制作等级影响 */
    static cookFine(ctx: GameCtx): ActionResult & { apCost: number } {
        if (!ctx.run.facilities.includes('campfire'))
            return { ok: false, msg: '没有火堆做不了精致料理。', apCost: 0 };
        if (ctx.run.apLeft <= 0) return { ok: false, msg: '没有行动点了。', apCost: 1 };
        if (!oncePerDay(ctx, 'fine')) return { ok: false, msg: '今天已经精细烹饪过了。', apCost: 1 };
        if (!SkillSystem.featureUnlocked(ctx, 'cook_quality_2'))
            return { ok: false, msg: '需要烹饪师 Lv1 才能精致料理。', apCost: 0 };
        const mains = ['food_raw_meat', 'food_raw_fish', 'food_mushroom']
            .filter(id => InventorySystem.count(ctx, id) > 0);
        if (mains.length < 1)
            return { ok: false, msg: '至少需要一种食材。', apCost: 0 };
        const ingredient = mains[0];
        InventorySystem.remove(ctx, ingredient, 1);
        TimeSys_spendAp(ctx, 1);
        const craftLv = SkillSystem.level(ctx, 'craft');
        const quality = SkillSystem.hasInspiration(ctx) ? 'master' :
                        craftLv >= 3 ? 'fine' : 'normal';
        const qualBonus = quality === 'master' ? 1.6 : quality === 'fine' ? 1.3 : 1;
        const hunger = Math.round(25 * qualBonus);
        const san = Math.round(10 * qualBonus);
        StatsSystem.apply(ctx, 'hunger', hunger);
        StatsSystem.apply(ctx, 'sanity', san);
        SkillSystem.tickInspirationCharge(ctx);
        const qualTag = quality === 'master' ? '✨大师级' : quality === 'fine' ? '⭐精良' : '';
        return { ok: true, msg: `【精致料理】用心烹制，${qualTag}出品。（饱食+${hunger} 精神+${san}）`, apCost: 1 };
    }

    /** 🧵 编织升级：Lv2+ 可用 1 布=1 绳（效率提升） */
    static weaveRopeUpgraded(ctx: GameCtx): ActionResult {
        if (!oncePerDay(ctx, 'weave2')) return { ok: false, msg: '手指已经磨出泡了，明天再编。' };
        if (!SkillSystem.featureUnlocked(ctx, 'build_cost_minus'))
            return { ok: false, msg: '需要建造者 Lv1 的编织技巧。' };
        if (InventorySystem.count(ctx, 'mat_cloth') < 1)
            return { ok: false, msg: '需要 1 块布料。' };
        InventorySystem.remove(ctx, 'mat_cloth', 1);
        InventorySystem.add(ctx, 'mat_rope', 1);
        StatsSystem.apply(ctx, 'hunger', -2);
        return { ok: true, msg: '【高效编织】技巧娴熟，省料出绳。' };
    }

    /** 🔍 深度侦察：Lv5+ 可发现隐藏地点 */
    static scoutDeep(ctx: GameCtx): ActionResult & { apCost: number } {
        if (ctx.run.apLeft <= 0) return { ok: false, msg: '没有行动点了。', apCost: 1 };
        if (!oncePerDay(ctx, 'scout2')) return { ok: false, msg: '今天已经侦察过了。', apCost: 1 };
        if (!SkillSystem.featureUnlocked(ctx, 'map_reveal'))
            return { ok: false, msg: '需要侦察兵 Lv2 才能深度侦察。', apCost: 0 };
        TimeSys_spendAp(ctx, 1);
        ctx.run.counters.fogPressure = Math.max(0, (ctx.run.counters.fogPressure ?? 0) - 5);
        StatsSystem.apply(ctx, 'sanity', 5);
        const intel: string[] = ['深度侦察完成'];
        if (ctx.rng.chance(40) && !ctx.run.unlockedLocations.includes('fog_deep_cave')) {
            ctx.run.unlockedLocations.push('fog_deep_cave');
            intel.push('发现隐藏洞穴入口！');
        }
        if (ctx.rng.chance(30)) {
            ctx.run.flags.push('scout_threat');
            intel.push('探测到远处的威胁动向');
        }
        return { ok: true, msg: `【深度侦察】${intel.join('；')}。`, apCost: 1 };
    }
}

// 局部别名避免循环 import
import { TimeSystem as _TS } from './TimeSystem';
function TimeSys_spendAp(ctx: GameCtx, n: number) { _TS.spendAp(ctx, n); }
