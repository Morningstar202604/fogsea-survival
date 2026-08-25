// GameApp 的 Web/DOM 移植版：与 Cocos 版共用全部 systems/core 逻辑
import { GameManager } from '../../assets/scripts/core/GameManager';
import { EventBus, GameEvents } from '../../assets/scripts/core/EventBus';
import { RNG } from '../../assets/scripts/core/RNG';
import { Typewriter } from '../../assets/scripts/core/Typewriter';
import { TimeSystem } from '../../assets/scripts/systems/TimeSystem';
import type { MorningReport } from '../../assets/scripts/systems/TimeSystem';
import { EventEngine } from '../../assets/scripts/systems/EventEngine';
import type { EventDef } from '../../assets/scripts/data/EventDefs';
import { InventorySystem } from '../../assets/scripts/systems/InventorySystem';
import { CraftSystem } from '../../assets/scripts/systems/CraftSystem';
import { ItemUsageSystem } from '../../assets/scripts/systems/ItemUsageSystem';
import { LocationSystem } from '../../assets/scripts/systems/LocationSystem';
import { DisasterSystem } from '../../assets/scripts/systems/DisasterSystem';
import { TradingSystem } from '../../assets/scripts/systems/TradingSystem';
import { TalentSystem } from '../../assets/scripts/systems/TalentSystem';
import { COL, el, div, txt, btn, clear, setClickSfx } from './domkit';
import { audio } from './audio';

const WEATHER_NAME: Record<string, string> = {
    fog_thick: '☁浓雾', fog_light: '🌫薄雾', sunny: '☀罕见晴朗', rain: '🌧雨',
    cold_front: '❄寒流', acid_rain: '☂酸雨',
};

interface HudRefs {
    stats?: HTMLElement; dayInfo?: HTMLElement; disaster?: HTMLElement;
    chips?: HTMLElement; apDots?: HTMLElement;
    logPanel?: HTMLElement; bubble?: HTMLElement; actions?: HTMLElement;
}

export class AppDom {
    private screen: HTMLElement;
    private dialogLayer: HTMLElement;
    private tw = new Typewriter(40);
    private twEl: HTMLElement | null = null;
    private twSink = { string: '' };
    private logLines: string[] = [];
    private lastChats: string[] = [];
    private channelListEl: HTMLElement | null = null;
    private giftLines: string[] = [];
    private hud: HudRefs = {};

    constructor(root: HTMLElement) {
        this.screen = root.querySelector('#screen') as HTMLElement;
        this.dialogLayer = root.querySelector('#dialog') as HTMLElement;

        const gm = GameManager.I;
        this.tw.setSpeed(gm.global.settings.typeSpeed);
        audio.setEnabled(gm.global.settings.sound);
        setClickSfx(() => audio.play('click', 0.6));

        EventBus.on(GameEvents.ChatNew, msg => {
            const m = msg as { nick: string; text: string };
            const line = `[${m.nick}] ${m.text}`;
            this.lastChats.push(line);
            if (this.lastChats.length > 30) this.lastChats.shift();
            if (this.hud.bubble) this.hud.bubble.textContent = `💬 ${line}`;
            if (this.channelListEl) this.renderChannelRows();
        });
        EventBus.on(GameEvents.ChatInject, p => {
            const poolId = (p as { poolId: string }).poolId;
            if (gm.chat && poolId) gm.chat.inject(poolId);
        });
        EventBus.on(GameEvents.ChestOpened, () => audio.play('chest'));
    }

    tick(dt: number): void {
        if (this.twEl && this.tw.tick(dt, this.twSink)) this.twEl.textContent = this.twSink.string;
        const gm = GameManager.I;
        if (gm.chat && gm.ctx) gm.chat.tick(dt);
    }

    private bindTw(elx: HTMLElement | null): void {
        this.twEl = elx;
        this.twSink = { string: '' };
    }

    private clearScreens(): void { clear(this.screen); }
    private clearDialogs(): void {
        clear(this.dialogLayer);
        this.dialogLayer.classList.remove('show');
        this.bindTw(null);
    }

    /** 弹窗骨架 */
    private dialog(title: string, opts: { center?: boolean; sub?: string } = {}): HTMLElement {
        this.clearDialogs();
        this.dialogLayer.classList.add('show');
        const mask = div('mask', this.dialogLayer);
        const dlg = div(opts.center ? 'dlg center' : 'dlg', mask);
        txt(title, dlg, 'dlg-title');
        if (opts.sub) txt(opts.sub, dlg, 'dlg-sub');
        return dlg;
    }

    // ================= 主页 =================
    showHome(): void {
        this.clearScreens(); this.clearDialogs(); this.hud = {};
        const scr = div('screen', this.screen);
        txt('全 民 求 生', scr, 'title');
        txt('—— 迷 雾 降 临 ——', scr, 'subtitle');

        const menu = div('menu', scr);
        btn(menu, '▶ 进入迷雾', () => this.showTalentDraw(), { kind: 'primary' });
        const gm = GameManager.I;
        if (gm.hasRunningSave()) {
            btn(menu, '↻ 继续求生', () => this.continueRun());
        }
        btn(menu, `结局图鉴 ${gm.global.endingsUnlocked.length}/12`, () => this.showCollection(false));
        btn(menu, `成就 ${gm.global.achievements.length}`, () => this.showCollection(true));
        btn(menu, '⚙ 设置', () => this.openSettings());

        txt(`累计 ${gm.global.totalRuns} 局 · 最长存活 ${gm.global.bestDaysSurvived} 天`, scr, 'footer-stat');
    }

    // ================= 天赋抽取 =================
    private showTalentDraw(): void {
        this.clearDialogs();
        const scr = div('screen', this.screen);
        txt('命运三选一', scr, 'title').style.fontSize = '30px';
        txt('它将决定你这一局的活法', scr, 'subtitle');
        const menu = div('menu', scr);

        const picks = TalentSystem.draw3(GameManager.I.cfg!.talents, new RNG(Date.now() >>> 0));
        for (const t of picks) {
            const card = div('rowcard', menu);
            card.style.flexDirection = 'column';
            card.style.alignItems = 'stretch';
            card.style.cursor = 'pointer';
            txt(`${t.name}`, card, 'name').style.color = COL.accent;
            txt(`流派：${t.archetype}   ${'★'.repeat(t.rarity)}`, card, 'sub').style.color = COL.purple;
            txt(t.desc, card, 'sub');
            card.addEventListener('click', () => {
                this.startRun(t.id, picks.filter(p => p.id !== t.id).map(p => p.name));
            });
        }
    }

    // ================= 开局：礼包演出 → 进对局 =================
    private startRun(talentId: string, missedTalents: string[]): void {
        const gm = GameManager.I;
        // 测试钩子：允许冒烟测试注入固定种子以保证可复现
        const seed = (globalThis as { __QS_TEST_SEED__?: number }).__QS_TEST_SEED__;
        const ctx = gm.newRun(talentId, seed);
        this.giftLines = [
            `【系统】天赋已绑定：【${gm.cfg!.talents.find(t => t.id === talentId)?.name}】`,
            ...(missedTalents.map(n => `【系统】错过的可能：${n}`)),
            '【系统】新手礼包已发放，点击拆开……',
        ];
        this.clearScreens();
        const scr = div('screen', this.screen);
        const lb = txt('', scr, 'evt-body');
        lb.style.marginTop = '18%';
        let idx = 0;
        const next = (): void => {
            if (idx < this.giftLines.length) {
                lb.textContent += (idx > 0 ? '\n' : '') + this.giftLines[idx];
                idx++;
                setTimeout(next, 450);
            } else {
                btn(scr, '睁 开 双 眼', () => this.enterRun(), { kind: 'primary' })
                    .style.marginTop = '24px';
            }
        };
        next();
        void ctx;
    }

    private continueRun(): void {
        const gm = GameManager.I;
        const ctx = gm.continueRun();
        if (!ctx) return;
        this.buildGameScreen();
        this.refreshHUD();
        this.appendLog(`【系统】第 ${ctx.run.day} 天，你从短暂的黑暗中醒来。`);
        this.enableActions(true);
    }

    private enterRun(): void {
        const gm = GameManager.I;
        const ctx = gm.ctx!;
        this.buildGameScreen();
        this.refreshHUD();
        this.appendLog('【系统】你在破木屋中醒来。迷雾，正贴着窗户缓缓流动……');
        GameManager.I.persist();
        this.morningSequence(TimeSystem.startMorning(ctx));
    }

    // ================= 对局主界面 =================
    private buildGameScreen(): void {
        this.clearScreens(); this.hud = {};
        const scr = div('screen', this.screen);

        this.hud.stats = txt('', scr, 'hud');
        this.hud.dayInfo = txt('', scr, 'hud-day');
        this.hud.disaster = txt('', scr, 'hud-warn');
        this.hud.chips = txt('', scr, 'hud-chips');
        this.hud.logPanel = div('logpanel', scr);
        this.bindTw(this.hud.logPanel);
        this.hud.bubble = txt('💬 …', scr, 'bubble');
        this.hud.apDots = txt('', scr, 'hud-ap');
        this.hud.actions = div('actions', scr);
    }

    private appendLog(line: string): void {
        this.logLines.push(line);
        if (this.logLines.length > 4) this.logLines.shift();
        const text = this.logLines.join('\n');
        this.tw.set(text);
        if (this.twEl) {
            this.tw.skip();
            this.twEl.textContent = text;
        }
    }

    private refreshHUD(): void {
        const gm = GameManager.I;
        const ctx = gm.ctx!;
        const s = ctx.run.stats;
        const bar = (v: number) => '█'.repeat(Math.round(v / 10)) + '░'.repeat(10 - Math.round(v / 10));
        if (this.hud.stats)
            this.hud.stats.textContent =
                `❤️${bar(s.hp)}${s.hp}\n🍞${bar(s.hunger)}${s.hunger}\n💧${bar(s.thirst)}${s.thirst}\n🧠${bar(s.sanity)}${s.sanity}`;
        const shelterName = ['', '破木屋', '加固木屋', '石砌居所'][ctx.run.shelterLevel];
        if (this.hud.dayInfo)
            this.hud.dayInfo.textContent =
                `第${ctx.run.day}天 ${WEATHER_NAME[ctx.run.weather] ?? ctx.run.weather}  🏠${shelterName}  🎒${InventorySystem.usedSlots(ctx)}/${InventorySystem.capacity(ctx)}`;

        const dn = DisasterSystem.isActiveToday(ctx);
        if (this.hud.disaster) {
            if (dn) {
                this.hud.disaster.textContent = `⚠ ${dn.name} 进行中！`;
            } else if (ctx.run.disasterNext) {
                const def = DisasterSystem.getDef(ctx, ctx.run.disasterNext.id);
                const left = Math.max(0, ctx.run.disasterNext.dueDay - ctx.run.day);
                this.hud.disaster.textContent = left <= 5 ? `⏳ ${def.name} 还有 ${left} 天` : '';
            } else this.hud.disaster.textContent = '';
        }

        if (this.hud.chips)
            this.hud.chips.textContent = ctx.run.statuses.map(x => `[${x.id}]`).join('');
        if (this.hud.apDots)
            this.hud.apDots.textContent =
                '●'.repeat(ctx.run.apLeft) + '○'.repeat(Math.max(0, 3 - ctx.run.apLeft));
    }

    private enableActions(on: boolean): void {
        const gm = GameManager.I;
        const ctx = gm.ctx!;
        const box = this.hud.actions;
        if (!box) return;
        clear(box);
        if (!on) return;

        const blockedByRain = DisasterSystem.blocksExplore(ctx);
        if (!blockedByRain) {
            for (const loc of LocationSystem.unlockedList(ctx)) {
                const gate = LocationSystem.canExplore(ctx, loc.id);
                const stock = LocationSystem.stockLeft(ctx, loc.id);
                const stockTxt = stock <= 0 ? '·枯竭' : `(${stock})`;
                const b = btn(box, `探索·${loc.name}${stockTxt}`,
                    () => this.doExplore(loc.id),
                    { disabled: !gate.ok || ctx.run.apLeft <= 0, small: true });
                if (stock <= 0) b.style.color = COL.dim;
                if (stock > 0 && stock <= 3) {
                    const tag = txt('即将见底', b, 'tag');
                    tag.style.color = stock <= 2 ? COL.bad : COL.dim;
                }
                if (!gate.ok && gate.reason === '需要：火把') {
                    txt('需火把', b, 'tag');
                }
            }
        }
        btn(box, '制作/建造', () => this.openCraft(),
            { disabled: ctx.run.apLeft <= 0, small: true });
        btn(box, '休息 SAN+15', () => this.doRest(),
            { disabled: ctx.run.apLeft <= 0, small: true });
        btn(box, '背包', () => this.openInventory(), { small: true });
        btn(box, '📋 情报', () => this.openIntel(), { small: true });
        btn(box, '🔁 交易', () => this.openTrade(), { small: true });
        btn(box, '💬 频道', () => this.openWorldChannel(), { small: true });
        btn(box, '⚙', () => this.openSettings(true), { small: true });
        if (ctx.run.companion) {
            const c = ctx.run.companion;
            const hpTag = c.hp > 70 ? '安好' : c.hp > 35 ? '带伤' : '虚弱';
            const fedTag = c.daysUnfed > 0 ? `${c.daysUnfed}天没吃` : '饱腹';
            btn(box, '派老K外出', () => this.sendLaoK(),
                { disabled: c.exploredToday || ctx.run.apLeft <= 0 || c.hp <= 30, small: true });
            txt(`🧔老K：${hpTag}·${fedTag}`, box, 'companion-tag');
        }
        btn(box, '🌙 入睡', () => this.goSleepPrompt(), { kind: 'danger', small: true });

        if (blockedByRain) {
            txt('☂ 酸雨肆虐，今天无法外出', box, 'note').style.gridColumn = 'span 2';
        }
    }

    private busy = false;

    private doExplore(locId: string): void {
        const gm = GameManager.I;
        const ctx = gm.ctx!;
        if (this.busy) return;
        this.busy = true;
        TimeSystem.explore(ctx, locId, undefined, ev => {
            this.refreshHUD(); this.enableActions(true);
            const def = LocationSystem.getDef(ctx, locId);
            this.appendLog(`【探索·${def.name}】${ev ? '似乎有什么在等你……' : '收获入包。'}`);
            if (ev) this.presentEvent(ev, () => this.afterAction());
            else this.afterAction();
        });
        this.busy = false;
    }

    private doRest(): void {
        TimeSystem.rest(GameManager.I.ctx!);
        this.appendLog('【休息】你在火堆边打了个盹，精神好了一些。');
        this.refreshHUD(); this.enableActions(true);
        this.afterAction();
    }

    private sendLaoK(): void {
        const r = TimeSystem.sendCompanion(GameManager.I.ctx!);
        this.appendLog(r.msg);
        GameManager.I.persist();
        this.refreshHUD(); this.enableActions(true);
    }

    private afterAction(): void {
        const gm = GameManager.I;
        GameManager.I.persist();
        this.refreshHUD(); this.enableActions(true);
        if (this.checkDeath()) return;
        if (gm.ctx!.run.apLeft <= 0) {
            this.appendLog('【黄昏】太阳正在下沉，迷雾开始变浓了。');
        }
    }

    private checkDeath(): boolean {
        const gm = GameManager.I;
        const ending = TimeSystem.checkSuddenDeath(gm.ctx!);
        if (ending) { this.showEnding(ending); return true; }
        return false;
    }

    // ================= 黄昏 → 夜晚 =================
    private goSleepPrompt(): void {
        const gm = GameManager.I;
        const ctx = gm.ctx!;
        const anyExplore = LocationSystem.unlockedList(ctx).some(l => LocationSystem.canExplore(ctx, l.id).ok);
        if (TimeSystem.duskNeeded(ctx) && anyExplore) {
            const dlg = this.dialog('夜幕将至', { center: true, sub: '还剩行动点。要贪最后一趟吗？' });
            const row = div('opts', dlg);
            row.style.flexDirection = 'row';
            btn(row, '再探一轮（收益+50% 危险↑）',
                () => { this.clearDialogs(); this.duskBonusExploreThenNight(); }, { kind: 'danger' });
            btn(row, '回家睡觉', () => { this.clearDialogs(); this.nightSequence({}); });
        } else {
            this.clearDialogs();
            this.nightSequence({});
        }
    }

    private duskBonusExploreThenNight(): void {
        const gm = GameManager.I;
        const ctx = gm.ctx!;
        const locs = LocationSystem.unlockedList(ctx).filter(l => LocationSystem.canExplore(ctx, l.id).ok);
        if (!locs.length) { this.nightSequence({}); return; }
        const loc = locs[ctx.rng.int(0, locs.length - 1)];
        TimeSystem.explore(ctx, loc.id, { bonusMult: 1.5, extraRiskPct: 20 }, ev => {
            this.appendLog(`【暮色突袭·${loc.name}】你在渐浓的雾里加快了脚步……`);
            void this.vibrate();
            if (ev) this.presentEvent(ev, () => this.nightSequence({}));
            else this.nightSequence({});
        });
    }

    private nightSequence(deathHint: { duringNightEvent?: boolean }): void {
        const gm = GameManager.I;
        const ctx = gm.ctx!;
        this.enableActions(false);
        const night = TimeSystem.beginNight(ctx);

        const proceed = (hint: typeof deathHint): void => {
            const fin = TimeSystem.finishNight(ctx, hint);
            GameManager.I.persist();
            if (fin.ended) { this.showEnding(fin.endingId!); return; }
            this.buildGameScreen();
            this.morningSequence(TimeSystem.startMorning(ctx));
        };

        this.appendLog('【夜晚】你锁好门，把火拨旺了一些……（自动进食饮水）');
        this.refreshHUD();

        if (night.nightEventId) {
            const ev = gm.cfg!.events.find(e => e.id === night.nightEventId)!;
            this.presentEvent(ev, () => {
                deathHint.duringNightEvent = true;
                if (this.checkDeath()) return;
                proceed(deathHint);
            });
        } else {
            setTimeout(() => proceed(deathHint), 900);
        }
    }

    // ================= 清晨播报 =================
    private morningSequence(m: MorningReport): void {
        const lines: string[] = [`【第 ${m.day} 天清晨】天气：${WEATHER_NAME[m.weather] ?? m.weather}`];
        if (m.disasterCountdown && m.disasterCountdown.daysLeft <= 5) {
            lines.push(`【预警】${m.disasterCountdown.name} 将于 ${m.disasterCountdown.daysLeft} 天后抵达！`);
        }
        if (m.hint) lines.push(m.hint);
        if (m.giftItemId) {
            const gname = GameManager.I.cfg!.items.find(i => i.id === m.giftItemId)?.name ?? m.giftItemId;
            lines.push(`【世界频道】网友私聊送来了：${gname}×1`);
        }
        this.appendLog(lines.join('\n'));
        GameManager.I.persist();

        const afterStory = (): void => {
            this.refreshHUD(); this.enableActions(true);
        };
        const afterDaily = (): void => {
            if (m.storyEventId) {
                const sev = GameManager.I.cfg!.events.find(e => e.id === m.storyEventId);
                if (sev) { this.presentEvent(sev, afterStory); return; }
            }
            afterStory();
        };
        if (m.dailyEventId) {
            const ev = GameManager.I.cfg!.events.find(e => e.id === m.dailyEventId)!;
            this.presentEvent(ev, afterDaily);
        } else afterDaily();
    }

    // ================= 事件弹窗 =================
    private presentEvent(ev: EventDef, onDone: () => void): void {
        const gm = GameManager.I;
        const dlg = this.dialog('');
        dlg.classList.add('center');

        const badge = ({ explore: '探索', daily: '日常', crisis: '危机', night: '深夜', story: '剧情' } as Record<string, string>)[ev.type] ?? '事件';
        const badgeColor = ({ crisis: COL.bad, night: COL.purple, story: COL.blue } as Record<string, string>)[ev.type] ?? COL.good;
        const title = txt(`${badge} · ${ev.title}`, dlg, 'dlg-title');
        title.style.color = badgeColor;

        const body = txt('', dlg, 'evt-body');
        this.bindTw(body);
        this.tw.set(ev.text);

        const optsBox = div('opts', dlg);
        const showOptions = (): void => {
            clear(optsBox);
            ev.options.forEach((opt, i) => {
                const ok = EventEngine.optionAvailable(gm.ctx!, opt);
                let text = opt.text;
                if (!ok && opt.requires?.items?.length) text += '（缺材料）';
                if (!ok && opt.requires?.talent) {
                    const tn = gm.cfg!.talents.find(t => t.id === opt.requires!.talent)?.name;
                    text += `（需要天赋：${tn}）`;
                }
                btn(optsBox, text, () => {
                    const branch = EventEngine.resolveOption(gm.ctx!, ev, i);
                    clear(optsBox);
                    this.bindTw(body);
                    this.tw.set(branch.text);
                    const afterResult = (): void => {
                        void this.vibrate();
                        this.refreshHUD();
                        const deadEnd = branch.endingId;
                        this.clearDialogs();
                        if (deadEnd) { this.finishWithEnding(deadEnd); return; }
                        const sudden = TimeSystem.checkSuddenDeath(gm.ctx!);
                        if (sudden) { this.finishWithEnding(sudden); return; }
                        if (branch.nextEvent) {
                            const next = gm.cfg!.events.find(e => e.id === branch.nextEvent);
                            if (next) { this.presentEvent(next, onDone); return; }
                        }
                        GameManager.I.persist();
                        onDone();
                    };
                    setTimeout(afterResult, Math.min(3500, 350 + branch.text.length * 35));
                }, { disabled: !ok });
            });
        };
        setTimeout(showOptions, Math.min(2500, 300 + ev.text.length * 30));
        body.addEventListener('click', () => {
            this.tw.skip();
            body.textContent = this.twSink.string = ev.text;
        });
    }

    // ================= 设置 =================
    private openSettings(fromGame = false): void {
        const gm = GameManager.I;
        const s = gm.global.settings;
        const dlg = this.dialog('⚙ 设置');

        txt('文字速度', dlg, 'dlg-sub');
        const speeds: { label: string; v: number }[] = [
            { label: '慢', v: 15 }, { label: '快', v: 40 }, { label: '瞬间', v: 0 },
        ];
        const rowSpd = div('opts', dlg);
        rowSpd.style.flexDirection = 'row';
        for (const sp of speeds) {
            const cur = (s.typeSpeed <= 0 && sp.v <= 0) || (s.typeSpeed > 0 && sp.v === s.typeSpeed)
                || (s.typeSpeed > 0 && s.typeSpeed !== 15 && s.typeSpeed !== 40 && sp.v === 40);
            btn(rowSpd, sp.label, () => {
                s.typeSpeed = sp.v;
                this.tw.setSpeed(sp.v);
                this.persistGlobal();
                this.openSettings();
            }, { on: cur });
        }

        const rowSound = div('opts', dlg);
        rowSound.style.flexDirection = 'row';
        rowSound.style.justifyContent = 'space-between';
        txt(`音效（当前：${s.sound ? '开' : '关'}）`, rowSound, 'dlg-sub');
        btn(rowSound, s.sound ? '🔊 开' : '🔇 关', () => {
            s.sound = !s.sound;
            audio.setEnabled(s.sound);
            this.persistGlobal();
            this.openSettings();
        });

        const rowVib = div('opts', dlg);
        rowVib.style.flexDirection = 'row';
        rowVib.style.justifyContent = 'space-between';
        txt(`震动（当前：${s.vibrate ? '开' : '关'}）`, rowVib, 'dlg-sub');
        btn(rowVib, s.vibrate ? '✓ 开' : '✗ 关', () => {
            s.vibrate = !s.vibrate;
            this.persistGlobal();
            this.openSettings();
        });

        txt('设置保存在本机，随全局档案生效。', dlg, 'dlg-sub');
        btn(dlg, '关闭', () => {
            this.clearDialogs();
            if (fromGame) { this.refreshHUD(); this.enableActions(true); }
            else this.showHome();
        });
    }

    private persistGlobal(): void {
        GameManager.I.save.saveGlobal(GameManager.I.global);
    }

    /** 震动反馈：跟随设置开关；Web/不支持的平台上静默跳过 */
    private async vibrate(): Promise<void> {
        if (!GameManager.I.global.settings.vibrate) return;
        try {
            const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
            await Haptics.impact({ style: ImpactStyle.Medium });
        } catch { /* 平台不支持时静默 */ }
    }

    // ================= 制作 / 背包 =================
    private openCraft(): void {
        const gm = GameManager.I;
        const ctx = gm.ctx!;
        const dlg = this.dialog('制作 / 建造（消耗1行动点）');
        const list = div('listwrap', dlg);
        for (const r of gm.cfg!.recipes.filter(r => CraftSystem.isUnlocked(ctx, r))) {
            const cost = CraftSystem.effectiveCost(ctx, r)
                .map(c => `${gm.cfg!.items.find(i => i.id === c.itemId)?.name}${c.count}`).join(' ');
            const chk = CraftSystem.canCraft(ctx, r);
            const row = div(chk.ok ? 'rowcard' : 'rowcard off', list);
            const info = div('info', row);
            txt(r.name, info, 'name');
            txt(`材料：${cost}`, info, 'sub');
            btn(row, chk.ok ? '制作' : (chk.reason ?? '—'), () => {
                try {
                    CraftSystem.craft(ctx, r.id);
                    TimeSystem.spendAp(ctx, 1);
                    this.appendLog(`【制作】${r.name} 完成！`);
                } catch { /* 条件不满足时静默 */ }
                GameManager.I.persist(); this.refreshHUD();
                this.openCraft();
            }, { disabled: !chk.ok, small: true });
        }
        btn(dlg, '关闭', () => { this.clearDialogs(); this.enableActions(true); });
    }

    private openInventory(): void {
        const gm = GameManager.I;
        const ctx = gm.ctx!;
        const dlg = this.dialog(
            `背包 ${InventorySystem.usedSlots(ctx)}/${InventorySystem.capacity(ctx)}`);
        const list = div('listwrap', dlg);
        for (const slot of [...ctx.run.inventory]) {
            const def = gm.cfg!.items.find(i => i.id === slot.itemId)!;
            const row = div('rowcard', list);
            const info = div('info', row);
            txt(`${def.name} ×${slot.count}`, info, 'name');
            if (def.use) {
                btn(row, '使用', () => {
                    ItemUsageSystem.use(ctx, slot.itemId);
                    GameManager.I.persist(); this.refreshHUD();
                    this.openInventory();
                }, { small: true });
            }
            btn(row, '丢弃', () => {
                InventorySystem.remove(ctx, slot.itemId, 1);
                GameManager.I.persist(); this.refreshHUD();
                this.openInventory();
            }, { small: true, kind: 'ghost' });
        }
        btn(dlg, '关闭', () => { this.clearDialogs(); this.enableActions(true); });
    }

    // ================= 情报面板 =================
    private openIntel(): void {
        const gm = GameManager.I;
        const ctx = gm.ctx!;
        const dlg = this.dialog('📋 幸存者情报板');
        const list = div('listwrap', dlg);

        const wDesc: Record<string, string> = {
            sunny: '☀ 晴：精神+5，开箱率提升', fog_light: '🌫 薄雾：一切如常',
            fog_thick: '☁ 浓雾：危机事件增多，开箱率下降',
            rain: '🌧 雨：晨间自动集水；外出易淋病',
            cold_front: '❄ 寒流进行中', acid_rain: '☂ 酸雨进行中：禁止外出',
        };
        txt(`今日天气：${wDesc[ctx.run.weather] ?? ctx.run.weather}`, list, 'msgline');

        if (ctx.run.facilities.includes('radio') || ctx.run.weatherTomorrow) {
            let fc = `明日天气：${WEATHER_NAME[ctx.run.weatherTomorrow ?? '?'] ?? '未知'}`;
            if (!ctx.run.facilities.includes('radio')) fc += '（有收音机可提前获知详情）';
            const elx = txt(`📡 ${fc}`, list, 'msgline');
            elx.style.color = COL.blue;
        }

        const dn = ctx.run.disasterNext;
        if (dn) {
            const def = DisasterSystem.getDef(ctx, dn.id);
            const left = Math.max(0, dn.dueDay - ctx.run.day);
            const wx = txt(`⚠ ${def.name}：${left === 0 ? '今日！' : `还有 ${left} 天`}`, list, 'msgline');
            wx.style.color = left <= 2 ? COL.bad : COL.accent;
            for (const item of DisasterSystem.requirementChecklist(ctx, def)) {
                const cx = txt(`   ${item.ok ? '✅' : '❌'} ${item.label}`, list, 'msgline');
                cx.style.color = item.ok ? COL.good : COL.bad;
            }
            if (!def.nightCheck) {
                const px = txt('   ✅ 当日待在屋里即可', list, 'msgline');
                px.style.color = COL.good;
            }
        }

        txt('—— 各地剩余物资 ——', list, 'dlg-sub');
        for (const loc of LocationSystem.unlockedList(ctx)) {
            const st = LocationSystem.stockLeft(ctx, loc.id);
            const barN = Math.min(6, st / 2 | 0);
            const bar = '▮'.repeat(barN) + '▯'.repeat(6 - barN);
            const col2 = st <= 2 ? COL.bad : st <= 5 ? COL.accent : COL.good;
            const lx = txt(`${loc.name.padEnd(5)} ${bar} ${st}`, list, 'msgline');
            lx.style.color = col2;
        }

        btn(dlg, '关闭', () => { this.clearDialogs(); this.enableActions(true); });
    }

    // ================= 交易面板 =================
    private openTrade(): void {
        const gm = GameManager.I;
        const ctx = gm.ctx!;
        const dlg = this.dialog('🔁 世界频道交易（每日刷新）');
        const list = div('listwrap', dlg);
        for (const offer of ctx.run.tradesToday) {
            const done = TradingSystem.isAccepted(ctx, offer.id);
            const can = TradingSystem.canAccept(ctx, offer);
            const giveName = gm.cfg!.items.find(i => i.id === offer.give.itemId)?.name ?? offer.give.itemId;
            const getName = gm.cfg!.items.find(i => i.id === offer.get.itemId)?.name ?? offer.get.itemId;
            const row = div(done ? 'rowcard off' : 'rowcard', list);
            const info = div('info', row);
            txt(`[${offer.nick}]`, info, 'sub').style.color = COL.purple;
            txt(`出 ${giveName}×${offer.give.count}  ⇄  得 ${getName}×${offer.get.count}`,
                info, 'name');
            btn(row, done ? '已成交' : '成交', () => {
                TradingSystem.accept(ctx, offer.id);
                this.appendLog(`【交易】与「${offer.nick}」完成了一笔交易。`);
                GameManager.I.persist(); this.refreshHUD();
                this.openTrade();
            }, { disabled: !can, small: true });
        }
        txt('报价好坏全凭眼光。明天会来一批新卖家。', list, 'dlg-sub');
        btn(dlg, '关闭', () => { this.clearDialogs(); this.enableActions(true); });
    }

    // ================= 世界频道（全屏） =================
    private openWorldChannel(): void {
        const gm = GameManager.I;
        const dlg = this.dialog('💬 世界频道 · 幸存者发言');
        this.channelListEl = div('listwrap', dlg);
        this.renderChannelRows();
        if (!this.lastChats.length) {
            txt('频道还很安静……迷雾里的人都在忙着活下去。', this.channelListEl, 'msgline');
        }

        const rowB = div('opts', dlg);
        rowB.style.flexDirection = 'row';
        btn(rowB, '刷新', () => {
            gm.chat?.forceRoll();
            this.renderChannelRows();
        });
        btn(rowB, '关闭', () => {
            this.channelListEl = null;
            this.clearDialogs(); this.enableActions(true);
        });
    }

    private renderChannelRows(): void {
        const content = this.channelListEl;
        if (!content) return;
        clear(content);
        for (const line of this.lastChats) {
            const m = div(line.startsWith('[') ? 'msgline' : 'msgline sys', content);
            m.textContent = line;
        }
    }

    // ================= 结算 =================
    private finishWithEnding(endingId: string): void {
        this.showEnding(endingId);
    }

    private showEnding(endingId: string): void {
        const gm = GameManager.I;
        const ctx = gm.ctx!;
        const hadBefore = gm.global.endingsUnlocked.includes(endingId);
        const days = ctx.run.day;
        const newly = gm.settleRun(days);
        const ed = gm.cfg!.endings.find(e => e.id === endingId);
        this.clearScreens(); this.clearDialogs();
        this.hud = {};
        void this.vibrate();
        audio.play(ed?.kind === 'death' ? 'death' : 'clear');

        const scr = div('screen', this.screen);
        txt(endingId, scr, 'subtitle');
        const nm = txt(ed?.name ?? endingId, scr, 'title');
        nm.style.fontSize = '34px'; nm.style.marginTop = '8px';
        nm.style.color = ed?.kind === 'death' ? COL.dim : ed?.kind === 'hidden' ? COL.purple : COL.accent;
        const desc = txt(ed?.desc ?? '', scr, 'evt-body');
        desc.style.whiteSpace = 'normal';
        txt(`存活 ${days} 天`, scr, 'subtitle');
        if (!hadBefore && ed) {
            const u = txt(`✦ 解锁新结局图鉴：${ed.name}`, scr, 'dlg-sub');
            u.style.color = COL.good; u.style.textAlign = 'center';
        }
        if (newly.length) {
            const names = newly.map(id =>
                ({ first_run: '初来乍到' }[id] ?? id)).join('、');
            const a = txt(`🏆 成就解锁：${names}`, scr, 'dlg-sub');
            a.style.color = COL.accent; a.style.textAlign = 'center';
        }
        const spacer = div('spacer', scr);
        const row = div('opts', scr);
        row.style.flexDirection = 'row';
        btn(row, '再来一局', () => this.showTalentDraw(), { kind: 'primary' });
        btn(row, '回到主页', () => this.showHome());
        void spacer;
    }

    private showCollection(achvTab: boolean): void {
        const gm = GameManager.I;
        const scr = div('screen', this.screen);
        txt(achvTab ? '成就' : '结局图鉴', scr, 'title').style.fontSize = '28px';

        if (!achvTab) {
            const list = div('listwrap', scr);
            list.style.flex = '1';
            for (const e of gm.cfg!.endings) {
                const got = gm.global.endingsUnlocked.includes(e.id);
                const row = div(got ? 'rowcard' : 'rowcard off', list);
                txt(got ? `${e.id} ${e.name}` : `${e.id} ？？？`, row, 'name');
                if (got) {
                    const k = txt(e.kind === 'death' ? '死亡' : e.kind === 'hidden' ? '隐藏' : '达成',
                        row, 'sub');
                    k.style.color = e.kind === 'death' ? COL.dim : COL.good;
                }
            }
        } else {
            const info = txt(
                `总局数 ${gm.global.totalRuns} · 最长存活 ${gm.global.bestDaysSurvived} 天\n\n成就详情见后续版本`,
                scr, 'evt-body');
            info.style.marginTop = '16px';
        }
        const backRow = div('opts', scr);
        btn(backRow, '返回', () => this.showHome());
    }
}
