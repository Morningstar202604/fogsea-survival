// 全部界面与流程编排（程序化 UI）
import { Node, Label, Color, UITransform } from 'cc';
import { EventBus, GameEvents } from '../core/EventBus';
import { GameManager } from '../core/GameManager';
import type { GameCtx } from '../systems/RunModel';
import { COL, fullScreen, node, panel, label, button, Typewriter, hexColor, scrollList, setClickSfx } from './UIKit';
import { AudioManager } from '../core/AudioManager';
import { TimeSystem } from '../systems/TimeSystem';
import type { MorningReport } from '../systems/TimeSystem';
import { EventEngine } from '../systems/EventEngine';
import { SceneSystem } from '../systems/SceneSystem';
import { SkillSystem } from '../systems/SkillSystem';
import type { EventDef } from '../data/EventDefs';
import { InventorySystem } from '../systems/InventorySystem';
import { CraftSystem } from '../systems/CraftSystem';
import { ItemUsageSystem } from '../systems/ItemUsageSystem';
import { LocationSystem } from '../systems/LocationSystem';
import { ShelterSystem } from '../systems/ShelterSystem';
import { DisasterSystem } from '../systems/DisasterSystem';
import { TradingSystem } from '../systems/TradingSystem';
import { TalentSystem } from '../systems/TalentSystem';
import { RNG } from '../core/RNG';

const WEATHER_NAME: Record<string, string> = {
    fog_thick: '☁浓雾', fog_light: '🌫薄雾', sunny: '☀罕见晴朗', rain: '🌧雨',
    cold_front: '❄寒流', acid_rain: '☂酸雨',
};

export class GameApp {
    static I: GameApp | null = null;

    private root: Node;
    private screenLayer: Node;
    private dialogLayer: Node;
    private tw = new Typewriter(40);
    private twLabel: Label | null = null;
    private chatBubble: Label | null = null;
    private lastChats: string[] = [];
    private channelContent: Node | null = null;
    private hud: {
        stats?: Label; dayInfo?: Label; disaster?: Label; apDots?: Label;
        chips?: Label; actions?: Node; sleepBtn?: Node;
    } = {};

    constructor(root: Node) {
        this.root = root;
        fullScreen(this.root);
        this.screenLayer = node('screens', this.root);
        fullScreen(this.screenLayer);
        this.dialogLayer = node('dialogs', this.root);
        fullScreen(this.dialogLayer);
        this.dialogLayer.active = false;

        EventBus.on(GameEvents.ChatNew, msg => {
            const m = msg as { nick: string; text: string };
            const line = `[${m.nick}] ${m.text}`;
            this.lastChats.push(line);
            if (this.lastChats.length > 30) this.lastChats.shift();
            if (this.chatBubble) this.chatBubble.string = `💬 ${line}`;
            if (this.channelContent) this.renderChannelRows();
        });
        EventBus.on(GameEvents.ChatInject, p => {
            const poolId = (p as { poolId: string }).poolId;
            const gm = GameManager.I;
            if (gm.chat && poolId) gm.chat.inject(poolId);
        });

        GameApp.I = this;
        this.tw.setSpeed(GameManager.I.global.settings.typeSpeed);
        AudioManager.I.mount(root);
        AudioManager.I.setEnabled(GameManager.I.global.settings.sound);
        setClickSfx(() => AudioManager.I.play('click', 0.6));
        EventBus.on(GameEvents.ChestOpened, () => AudioManager.I.play('chest'));
    }

    tick(dt: number): void {
        if (this.twLabel && this.tw.tick(dt, this.twLabel)) { /* 打字机进行中 */ }
        const gm = GameManager.I;
        if (gm.chat && gm.ctx) gm.chat.tick(dt);
    }

    private clearScreens(): void { this.screenLayer.destroyAllChildren(); }
    private clearDialogs(): void { this.dialogLayer.removeAllChildren(); this.dialogLayer.active = false; }

    // ================= 主页 =================
    showHome(): void {
        this.clearScreens(); this.clearDialogs(); this.hud = {};
        const gm = GameManager.I;
        const scr = panel(this.screenLayer, 'home', 720, 1280, COL.bg);

        label(scr, '全 民 求 生', { size: 52, color: COL.accent, align: 'center', maxWidth: 720 })
            .node.setPosition(0, 420);
        label(scr, '—— 迷 雾 降 临 ——', { size: 24, color: COL.dim, align: 'center', maxWidth: 720 })
            .node.setPosition(0, 360);

        let y = 120;
        button(scr, '▶ 进入迷雾', 380, 88, () => this.showTalentDraw(),
            { bg: COL.panelLine, textColor: COL.accent, fontSize: 28 }).setPosition(0, y);
        y -= 108;
        if (gm.hasRunningSave()) {
            button(scr, '↻ 继续求生', 380, 80, () => this.continueRun()).setPosition(0, y);
            y -= 96;
        }
        button(scr, `结局图鉴 ${gm.global.endingsUnlocked.length}/12`, 380, 80,
            () => this.showCollection()).setPosition(0, y);
        y -= 96;
        button(scr, `成就 ${gm.global.achievements.length}`, 380, 80,
            () => this.showCollection(true)).setPosition(0, y);
        y -= 96;
        button(scr, '⚙ 设置', 380, 80, () => this.openSettings()).setPosition(0, y);

        label(scr, `累计 ${gm.global.totalRuns} 局 · 最长存活 ${gm.global.bestDaysSurvived} 天`,
            { size: 20, color: COL.dim, align: 'center', maxWidth: 720 }).node.setPosition(0, -520);
    }

    // ================= 天赋抽取 =================
    private showTalentDraw(): void {
        const gm = GameManager.I;
        this.clearDialogs();
        const scr = panel(this.screenLayer, 'talent', 720, 1280, COL.bg);
        label(scr, '命运三选一', { size: 40, color: COL.accent, align: 'center', maxWidth: 720 })
            .node.setPosition(0, 460);
        label(scr, '它将决定你这一局的活法', { size: 22, color: COL.dim, align: 'center', maxWidth: 720 })
            .node.setPosition(0, 400);

        const picks = TalentSystem.draw3(gm.cfg!.talents, new RNG(Date.now() >>> 0));
        picks.forEach((t, i) => {
            const cardY = 180 - i * 240;
            const card = panel(scr, `card_${t.id}`, 600, 200, COL.panel);
            card.setPosition(0, cardY);
            label(card, t.name, { size: 32, color: COL.accent }).node.setPosition(-280 + 8, 60);
            label(card, `流派：${t.archetype}   ${'★'.repeat(t.rarity)}`, { size: 20, color: COL.purple })
                .node.setPosition(-272, 18);
            label(card, t.desc, { size: 20, wrap: true, maxWidth: 560, color: COL.text })
                .node.setPosition(0, -34);
            card.on(Node.EventType.TOUCH_END, () => {
                this.startRun(t.id, picks.filter(p => p.id !== t.id).map(p => p.name));
            });
        });
    }

    // ================= 开局：礼包演出 → 进对局 =================
    private giftLines: string[] = [];
    private startRun(talentId: string, missedTalents: string[]): void {
        const gm = GameManager.I;
        const ctx = gm.newRun(talentId);
        this.giftLines = [
            `【系统】天赋已绑定：【${gm.cfg!.talents.find(t => t.id === talentId)?.name}】`,
            ...(missedTalents.map(n => `【系统】错过的可能：${n}`)),
            '【系统】新手礼包已发放，点击拆开……',
        ];
        this.clearScreens();
        const scr = panel(this.screenLayer, 'gift', 720, 1280, COL.bg);
        const lb = label(scr, '', { size: 26, wrap: true, maxWidth: 620 });
        lb.node.setPosition(0, 100);
        this.twLabel = lb;
        let idx = 0;
        const next = () => {
            if (idx < this.giftLines.length) {
                lb.string += (idx > 0 ? '\n' : '') + this.giftLines[idx];
                idx++;
                setTimeout(next, 450);
            } else {
        button(scr, '睁 开 双 眼', 340, 84, () => this.enterRun(), { bg: COL.panelLine, textColor: COL.accent })
            .setPosition(0, -260);
            }
        };
        next();
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

    /** 拆完礼包正式进入第 1 天 */
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
        const scr = panel(this.screenLayer, 'game', 720, 1280, COL.bg);
        scr.on(Node.EventType.TOUCH_END, () => this.tw.skip());

        // 状态栏
        this.hud.stats = label(scr, '', { size: 22, color: COL.text });
        this.hud.stats.node.setPosition(-330, 600);
        this.hud.dayInfo = label(scr, '', { size: 22, color: COL.text });
        this.hud.dayInfo.node.setPosition(-330, 566);
        this.hud.disaster = label(scr, '', { size: 20, color: COL.bad });
        this.hud.disaster.node.setPosition(-330, 536);
        this.hud.chips = label(scr, '', { size: 20, color: COL.purple });
        this.hud.chips.node.setPosition(-330, 508);

        // 叙事区
        const logPanel = panel(scr, 'log', 680, 300, '#181c25');
        logPanel.setPosition(0, 300);
        const logLb = label(logPanel, '', { size: 24, wrap: true, maxWidth: 640 });
        logLb.node.setPosition(-320, 130);
        this.twLabel = logLb;

        // 世界频道气泡
        this.chatBubble = label(scr, '💬 …', { size: 18, color: COL.dim, wrap: true, maxWidth: 660 });
        this.chatBubble.node.setPosition(-330, 118);

        // 行动区容器（按钮由 enableActions 动态重建，含入睡）
        this.hud.actions = node('actions', scr, 720, 320);
        this.hud.actions.setPosition(0, -160);
        this.hud.apDots = label(scr, '', { size: 24, color: COL.accent, align: 'center', maxWidth: 720 });
        this.hud.apDots.node.setPosition(0, -345);
    }

    private logLines: string[] = [];
    private appendLog(line: string): void {
        this.logLines.push(line);
        if (this.logLines.length > 4) this.logLines.shift();
        const text = this.logLines.join('\n');
        this.tw.set(text);
        if (this.twLabel) this.tw.skip(), this.twLabel.string = text;
        void text;
    }

    private refreshHUD(): void {
        const gm = GameManager.I;
        const ctx = gm.ctx!;
        const s = ctx.run.stats;
        const bar = (v: number) => '█'.repeat(Math.round(v / 10)) + '░'.repeat(10 - Math.round(v / 10));
        this.hud.stats!.string =
            `❤️${bar(s.hp)}${s.hp}\n🍞${bar(s.hunger)}${s.hunger}\n💧${bar(s.thirst)}${s.thirst}\n🧠${bar(s.sanity)}${s.sanity}`;
        const shelterName = ['', '破木屋', '加固木屋', '石砌居所'][ctx.run.shelterLevel];
        this.hud.dayInfo!.string =
            `第${ctx.run.day}天 ${WEATHER_NAME[ctx.run.weather] ?? ctx.run.weather}  🏠${shelterName}  🎒${InventorySystem.usedSlots(ctx)}/${InventorySystem.capacity(ctx)}`;

        const dn = DisasterSystem.isActiveToday(ctx);
        if (dn) {
            this.hud.disaster!.string = `⚠ ${dn.name} 进行中！`;
        } else if (ctx.run.disasterNext) {
            const def = DisasterSystem.getDef(ctx, ctx.run.disasterNext.id);
            const left = Math.max(0, ctx.run.disasterNext.dueDay - ctx.run.day);
            this.hud.disaster!.string = left <= 5 ? `⏳ ${def.name} 还有 ${left} 天` : '';
        } else this.hud.disaster!.string = '';

        const st = ctx.run.statuses.map(x => `[${x.id}]`).join('');
        this.hud.chips!.string = st;

        this.hud.apDots!.string = '●'.repeat(ctx.run.apLeft) + '○'.repeat(Math.max(0, 3 - ctx.run.apLeft));
        void Color;
    }

    /** 动态重建行动按钮 */
    private enableActions(on: boolean): void {
        const gm = GameManager.I;
        const ctx = gm.ctx!;
        const box = this.hud.actions!;
        box.destroyAllChildren();
        if (!on) return;

        const canExploreAny = LocationSystem.unlockedList(ctx).some(l => LocationSystem.canExplore(ctx, l.id).ok);
        const blockedByRain = DisasterSystem.blocksExplore(ctx);
        let col = 0, row = 0;
        const put = (n: Node) => { n.setPosition(col * 230 - 230, -row * 78); col++; if (col >= 2) { col = 0; row++; } };

        if (!blockedByRain) {
            for (const loc of LocationSystem.unlockedList(ctx)) {
                const gate = LocationSystem.canExplore(ctx, loc.id);
                const stock = LocationSystem.stockLeft(ctx, loc.id);
                const stockTxt = stock <= 0 ? '·枯竭' : `(${stock})`;
                const stockColor = stock <= 2 ? COL.bad : COL.dim;
                const b = button(box, `探索·${loc.name}${stockTxt}`, 210, 64, () => this.doExplore(loc.id),
                    { disabled: !gate.ok || ctx.run.apLeft <= 0, fontSize: 20,
                      textColor: stock <= 0 ? COL.dim : undefined });
                put(b);
                if (stock > 0 && stock <= 3) {
                    label(b, '即将见底', { size: 13, color: stockColor, align: 'center' })
                        .node.setPosition(0, -22);
                }
                if (!gate.ok && gate.reason === '需要：火把') {
                    label(b, '需火把', { size: 14, color: COL.dim, align: 'center' })
                        .node.setPosition(0, 0);
                }
            }
        }
        const craftB = button(box, '制作/建造', 210, 64, () => this.openCraft(),
            { disabled: ctx.run.apLeft <= 0 }); put(craftB);
        const restB = button(box, '休息 SAN+15', 210, 64, () => this.doRest(),
            { disabled: ctx.run.apLeft <= 0 }); put(restB);
        const bagB = button(box, `背包`, 210, 64, () => this.openInventory()); put(bagB);
        const intelB = button(box, `📋 情报`, 210, 64, () => this.openIntel()); put(intelB);
        const tradeB = button(box, `🔁 交易`, 210, 64, () => this.openTrade()); put(tradeB);
        const chanB = button(box, `💬 频道`, 210, 64, () => this.openWorldChannel()); put(chanB);
        const sleepB = button(box, '🌙 入睡', 210, 64, () => this.goSleepPrompt(), { bg: '#5a3038' });
        put(sleepB);
        if (ctx.run.companion) {
            const c = ctx.run.companion;
            const hpTag = c.hp > 70 ? '安好' : c.hp > 35 ? '带伤' : '虚弱';
            const fedTag = c.daysUnfed > 0 ? `${c.daysUnfed}天没吃` : '饱腹';
            const sendB = button(box, `派老K外出`, 210, 64, () => this.sendLaoK(),
                { disabled: c.exploredToday || ctx.run.apLeft <= 0 || c.hp <= 30 });
            put(sendB);
            label(this.hud.actions!, `🧔老K：${hpTag}·${fedTag}`, { size: 16, color: COL.dim })
                .node.setPosition(col * 230 - 230 + 40, -row * 78);
            col++; if (col >= 2) { col = 0; row++; }
        }
        void canExploreAny;
        if (blockedByRain) {
            label(box, '☂ 酸雨肆虐，今天无法外出', { size: 22, color: COL.bad, align: 'center', maxWidth: 700 })
                .node.setPosition(0, -row * 78);
        }
    }

    private sendLaoK(): void {
        const r = TimeSystem.sendCompanion(GameManager.I.ctx!);
        this.appendLog(r.msg);
        GameManager.I.persist();
        this.refreshHUD(); this.enableActions(true);
    }

    // ================= 情报面板 =================
    private openIntel(): void {
        const gm = GameManager.I;
        const ctx = gm.ctx!;
        this.clearDialogs();
        this.dialogLayer.active = true;
        panel(this.dialogLayer, 'mask', 720, 1280, '#05060a');
        const pnl = panel(this.dialogLayer, 'intel', 680, 1060, COL.bg);
        label(pnl, '📋 幸存者情报板', { size: 28, color: COL.accent }).node.setPosition(0, 480);

        let y = 410;
        // 天气实感说明
        const wDesc: Record<string, string> = {
            sunny: '☀ 晴：精神+5，开箱率提升', fog_light: '🌫 薄雾：一切如常',
            fog_thick: '☁ 浓雾：危机事件增多，开箱率下降',
            rain: '🌧 雨：晨间自动集水；外出易淋病',
            cold_front: '❄ 寒流进行中', acid_rain: '☂ 酸雨进行中：禁止外出',
        };
        label(pnl, `今日天气：${wDesc[ctx.run.weather] ?? ctx.run.weather}`,
            { size: 21, wrap: true, maxWidth: 620, color: COL.text }).node.setPosition(-310, y); y -= 56;

        // 明日预报（收音机）
        if (ctx.run.facilities.includes('radio') || ctx.run.weatherTomorrow) {
            let fc = `明日天气：${WEATHER_NAME[ctx.run.weatherTomorrow ?? '?'] ?? '未知'}`;
            if (!ctx.run.facilities.includes('radio')) fc += '（有收音机可提前获知详情）';
            label(pnl, `📡 ${fc}`, { size: 20, wrap: true, maxWidth: 620, color: COL.blue })
                .node.setPosition(-310, y); y -= 52;
        }

        // 天灾倒计时 + 达标清单
        const dn = ctx.run.disasterNext;
        if (dn) {
            const def = DisasterSystem.getDef(ctx, dn.id);
            const left = Math.max(0, dn.dueDay - ctx.run.day);
            label(pnl, `⚠ ${def.name}：${left === 0 ? '今日！' : `还有 ${left} 天`}`,
                { size: 24, color: left <= 2 ? COL.bad : COL.accent }).node.setPosition(-310, y); y -= 48;
            for (const item of DisasterSystem.requirementChecklist(ctx, def)) {
                label(pnl, `   ${item.ok ? '✅' : '❌'} ${item.label}`,
                    { size: 20, color: item.ok ? COL.good : COL.bad }).node.setPosition(-300, y); y -= 42;
            }
            if (!def.nightCheck) {
                label(pnl, '   ✅ 当日待在屋里即可', { size: 20, color: COL.good })
                    .node.setPosition(-300, y); y -= 42;
            }
            y -= 10;
        }

        // 地点存量
        label(pnl, '—— 各地剩余物资 ——', { size: 20, color: COL.dim }).node.setPosition(-310, y); y -= 44;
        for (const loc of LocationSystem.unlockedList(ctx)) {
            const st = LocationSystem.stockLeft(ctx, loc.id);
            const bar = '▮'.repeat(Math.min(6, st / 2 | 0)) + '▯'.repeat(6 - Math.min(6, st / 2 | 0));
            const col2 = st <= 2 ? COL.bad : st <= 5 ? COL.accent : COL.good;
            label(pnl, `${loc.name.padEnd(5)} ${bar} ${st}`,
                { size: 20, color: col2 }).node.setPosition(-300, y); y -= 40;
        }

        button(pnl, '关闭', 200, 64, () => { this.clearDialogs(); this.enableActions(true); })
            .setPosition(0, -500);
    }

    // ================= 交易面板 =================
    private openTrade(): void {
        const gm = GameManager.I;
        const ctx = gm.ctx!;
        this.clearDialogs();
        this.dialogLayer.active = true;
        panel(this.dialogLayer, 'mask', 720, 1280, '#05060a');
        const pnl = panel(this.dialogLayer, 'trade', 680, 900, COL.bg);
        label(pnl, '🔁 世界频道交易（每日刷新）', { size: 26, color: COL.accent }).node.setPosition(0, 400);

        let y = 320;
        for (const offer of ctx.run.tradesToday) {
            const done = TradingSystem.isAccepted(ctx, offer.id);
            const can = TradingSystem.canAccept(ctx, offer);
            const giveName = gm.cfg!.items.find(i => i.id === offer.give.itemId)?.name ?? offer.give.itemId;
            const getName = gm.cfg!.items.find(i => i.id === offer.get.itemId)?.name ?? offer.get.itemId;
            const row = panel(pnl, `t_${offer.id}`, 640, 110, done ? '#1a1e28' : COL.panel);
            row.setPosition(0, y);
            label(row, `[${offer.nick}]`, { size: 19, color: COL.purple }).node.setPosition(-280, 34);
            label(row, `出 ${giveName}×${offer.give.count}  ⇄  得 ${getName}×${offer.get.count}`,
                { size: 21, color: done ? COL.dim : COL.text }).node.setPosition(-270, 0);
            button(row, done ? '已成交' : '成交', 130, 58, () => {
                TradingSystem.accept(ctx, offer.id);
                this.appendLog(`【交易】与「${offer.nick}」完成了一笔交易。`);
                GameManager.I.persist(); this.refreshHUD();
                this.openTrade();
            }, { disabled: !can, fontSize: 20 }).setPosition(225, 0);
            y -= 124;
        }
        label(pnl, '报价好坏全凭眼光。明天会来一批新卖家。', { size: 17, color: COL.dim })
            .node.setPosition(0, y);
        button(pnl, '关闭', 200, 64, () => { this.clearDialogs(); this.enableActions(true); })
            .setPosition(0, -420);
    }

    // ================= 世界频道（全屏） =================
    private openWorldChannel(): void {
        const gm = GameManager.I;
        this.clearDialogs();
        this.dialogLayer.active = true;
        panel(this.dialogLayer, 'mask', 720, 1280, '#05060a');
        const pnl = panel(this.dialogLayer, 'channel', 680, 1060, COL.bg);
        label(pnl, '💬 世界频道 · 幸存者发言', { size: 28, color: COL.accent }).node.setPosition(0, 480);

        const list = scrollList(pnl, 'channel_list', 640, 830, 830);
        list.setPosition(0, -10);
        this.channelContent = list;
        this.renderChannelRows();
        if (!this.lastChats.length) {
            label(list, '频道还很安静……迷雾里的人都在忙着活下去。', { size: 20, color: COL.dim, wrap: true, maxWidth: 560 });
        }

        button(pnl, '刷新', 180, 60, () => {
            gm.chat?.forceRoll();
            this.renderChannelRows();
        }, { fontSize: 21 }).setPosition(-130, -480);
        button(pnl, '关闭', 180, 60, () => {
            this.channelContent = null;
            this.clearDialogs(); this.enableActions(true);
        }, { fontSize: 21 }).setPosition(130, -480);
    }

    /** 重排频道消息行：每行按文本长度估算换行高度，content 总高自适应 */
    private renderChannelRows(): void {
        const content = this.channelContent;
        if (!content) return;
        content.destroyAllChildren();
        const W = 620, PAD = 14, LINE_H = 30, CHARS_PER_LINE = 26;
        let y = -PAD;
        for (const line of this.lastChats) {
            const rows = Math.max(1, Math.ceil(line.length / CHARS_PER_LINE));
            const h = rows * LINE_H + PAD + 6;
            const row = panel(content, 'msg', W, h - PAD, '#1b202c');
            row.getComponent(UITransform)!.setAnchorPoint(0.5, 1);
            row.setPosition(0, y);
            const lb = label(row, line, { size: 19, wrap: true, maxWidth: W - 24,
                color: line.startsWith('[') ? COL.text : COL.accent });
            lb.node.getComponent(UITransform)!.setAnchorPoint(0.5, 1);
            lb.node.setPosition(0, -6);
            y -= h;
        }
        content.getComponent(UITransform)!.setContentSize(W, Math.max(830, -y + PAD));
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
            const yields = ctx.rng ? '' : '';
            this.appendLog(`【探索·${def.name}】${ev ? '似乎有什么在等你……' : '收获入包。'}`);
            void yields;
            SkillSystem.grantForAction(ctx, 'explore');
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
        if (ending) { this.showEnding(ending, false); return true; }
        return false;
    }

    // ================= 黄昏 → 夜晚 =================
    private goSleepPrompt(): void {
        const gm = GameManager.I;
        const ctx = gm.ctx!;
        this.clearDialogs();
        this.dialogLayer.active = true;
        const mask = panel(this.dialogLayer, 'mask', 720, 1280, '#000000');
        mask.getComponent('cc.Sprite' as never); void mask;
        const dlg = panel(this.dialogLayer, 'dusk', 600, 300, COL.panel);
        dlg.setPosition(0, 0);
        label(dlg, '夜幕将至', { size: 30, color: COL.accent }).node.setPosition(0, 100);
        const anyExplore = LocationSystem.unlockedList(ctx).some(l => LocationSystem.canExplore(ctx, l.id).ok);
        if (TimeSystem.duskNeeded(ctx) && anyExplore) {
            label(dlg, '还剩行动点。要贪最后一趟吗？', { size: 22, wrap: true, maxWidth: 540, color: COL.dim })
                .node.setPosition(0, 40);
            button(dlg, '再探一轮（收益+50% 危险↑）', 480, 70, () => {
                this.clearDialogs();
                this.duskBonusExploreThenNight();
            }, { bg: '#5a3038' }).setPosition(-125, -60);
            button(dlg, '回家睡觉', 480, 70, () => { this.clearDialogs(); this.nightSequence({}); },
                { bg: COL.panelLine }).setPosition(155, -60);
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
            if (ev) this.presentEvent(ev, () => this.nightSequence({}), true);
            else this.nightSequence({});
        });
    }

    private nightSequence(deathHint: { duringNightEvent?: boolean }): void {
        const gm = GameManager.I;
        const ctx = gm.ctx!;
        this.enableActions(false);
        const night = TimeSystem.beginNight(ctx);

        const proceed = (hint: typeof deathHint) => {
            const fin = TimeSystem.finishNight(ctx, hint);
            GameManager.I.persist();
            if (fin.ended) { this.showEnding(fin.endingId!, false); return; }
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
            }, true);
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

        const afterDaily = () => {
            const afterStory = () => {
                this.refreshHUD(); this.enableActions(true);
            };
            // —— v0.6 场景（多拍剧本）优先于零散剧情事件 ——
            const sc = m.sceneId ? SceneSystem.activeNode(GameManager.I.ctx!) : null;
            if (sc) { this.appendLog('【剧情】一段新的故事开始了……'); this.presentEvent(sc, afterStory); return; }
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
    private presentEvent(ev: EventDef, onDone: () => void, modal = true): void {
        if (!modal) { /* 预留非模态 */ }
        const gm = GameManager.I;
        this.clearDialogs();
        this.dialogLayer.active = true;
        const mask = panel(this.dialogLayer, 'mask', 720, 1280, '#05060a');
        const dlg = panel(this.dialogLayer, `evt_${ev.id}`, 660, 760, COL.panel);
        dlg.setPosition(0, 60);

        const badge = ({ explore: '探索', daily: '日常', crisis: '危机', night: '深夜', story: '剧情' } as Record<string, string>)[ev.type] ?? '事件';
        const badgeColor = ({ crisis: COL.bad, night: COL.purple, story: COL.blue } as Record<string, string>)[ev.type] ?? COL.good;
        label(dlg, `${badge} · ${ev.title}`, { size: 30, color: badgeColor }).node.setPosition(-250, 320);

        const body = label(dlg, '', { size: 23, wrap: true, maxWidth: 590 });
        body.node.setPosition(-295, 260);
        this.twLabel = body;
        this.tw.set(ev.text);
        // 打完字或点击正文跳过后再出选项
        const showOptions = () => {
            optsBox.destroyAllChildren();
            let y = -60;
            ev.options.forEach((opt, i) => {
                const ok = EventEngine.optionAvailable(gm.ctx!, opt);
                let text = opt.text;
                if (!ok) text += `（${EventEngine.optionLockedReason(gm.ctx!, opt)}）`;
                const b = button(optsBox, text, 590, 74, () => {
                    this.tw.skip();
                    const branch = EventEngine.resolveOption(gm.ctx!, ev, i);
                    optsBox.active = false;
                    this.twLabel = body;
                    this.tw.set(branch.text);
                    const afterResult = () => {
                        this.refreshHUD();
                        const deadEnd = branch.endingId;
                        this.clearDialogs();
                        if (deadEnd) { this.finishWithEnding(deadEnd, false); return; }
                        const sudden = TimeSystem.checkSuddenDeath(gm.ctx!);
                        if (sudden) { this.finishWithEnding(sudden, false); return; }
                        const next = SceneSystem.followUp(gm.ctx!, ev, branch);
                        if (next) { this.presentEvent(next, onDone, modal); return; }
                        GameManager.I.persist();
                        onDone();
                    };
                    // 等打字机放完（简化：定时按文本长度估算）
                    setTimeout(afterResult, Math.min(3500, 350 + branch.text.length * 35));
                }, { disabled: !ok, fontSize: 21 });
                b.setPosition(0, y);
                y -= 86;
            });
        };
        const optsBox = node('opts', dlg, 640, 420);
        optsBox.setPosition(0, -150);
        // 简化：文本较长时延迟出选项
        setTimeout(showOptions, Math.min(2500, 300 + ev.text.length * 30));
        dlg.on(Node.EventType.TOUCH_END, () => this.tw.skip());
    }

    // ================= 设置 =================
    private openSettings(): void {
        const gm = GameManager.I;
        const s = gm.global.settings;
        this.clearDialogs();
        this.dialogLayer.active = true;
        panel(this.dialogLayer, 'mask', 720, 1280, '#05060a');
        const pnl = panel(this.dialogLayer, 'settings', 680, 900, COL.bg);
        label(pnl, '⚙ 设置', { size: 30, color: COL.accent }).node.setPosition(0, 380);

        // 打字机速度：三档
        label(pnl, '文字速度', { size: 22, color: COL.text }).node.setPosition(-230, 260);
        const speeds: { label: string; v: number }[] = [
            { label: '慢', v: 15 }, { label: '快', v: 40 }, { label: '瞬间', v: 0 },
        ];
        speeds.forEach((sp, i) => {
            const cur = (s.typeSpeed <= 0 && sp.v <= 0) || (s.typeSpeed > 0 && sp.v === s.typeSpeed)
                || (s.typeSpeed > 0 && s.typeSpeed !== 15 && s.typeSpeed !== 40 && sp.v === 40);
            button(pnl, cur ? `● ${sp.label}` : sp.label, 130, 64, () => {
                s.typeSpeed = sp.v;
                this.tw.setSpeed(sp.v);
                this.persistGlobal();
                this.openSettings();
            }, { bg: cur ? COL.panelLine : COL.panel, textColor: cur ? COL.accent : COL.text })
                .setPosition(i * 150 - 150, 180);
        });
        label(pnl, `当前：${s.typeSpeed <= 0 ? '瞬间显示' : `${s.typeSpeed} 字/秒`}`,
            { size: 18, color: COL.dim }).node.setPosition(0, 110);

        // 音效开关
        label(pnl, '音效', { size: 22, color: COL.text }).node.setPosition(-230, 20);
        button(pnl, s.sound ? '🔊 开' : '🔇 关', 130, 64, () => {
            s.sound = !s.sound;
            AudioManager.I.setEnabled(s.sound);
            this.persistGlobal();
            this.openSettings();
        }, { textColor: s.sound ? COL.good : COL.dim }).setPosition(60, 20);

        // 震动开关
        label(pnl, '震动', { size: 22, color: COL.text }).node.setPosition(-230, -80);
        button(pnl, s.vibrate ? '✓ 开' : '✗ 关', 130, 64, () => {
            s.vibrate = !s.vibrate;
            this.persistGlobal();
            this.openSettings();
        }, { textColor: s.vibrate ? COL.good : COL.dim }).setPosition(60, -80);
        label(pnl, '设置保存在本机，随全局档案生效。', { size: 17, color: COL.dim })
            .node.setPosition(0, -180);

        button(pnl, '关闭', 200, 64, () => { this.clearDialogs(); this.showHome(); })
            .setPosition(0, -380);
    }

    private persistGlobal(): void {
        GameManager.I.save.saveGlobal(GameManager.I.global);
    }

    // ================= 制作 / 背包 =================
    private openCraft(): void {
        const gm = GameManager.I;
        const ctx = gm.ctx!;
        this.clearDialogs();
        this.dialogLayer.active = true;
        const mask = panel(this.dialogLayer, 'mask', 720, 1280, '#05060a');
        const pnl = panel(this.dialogLayer, 'craft', 680, 1000, COL.bg);
        label(pnl, '制作 / 建造（消耗1行动点）', { size: 28, color: COL.accent }).node.setPosition(0, 440);

        const rows = gm.cfg!.recipes.filter(r => CraftSystem.isUnlocked(ctx, r));
        const list = scrollList(pnl, 'craft_list', 660, 820, rows.length * 104 + 40);
        list.setPosition(0, -15);
        let y = -52;   // content 锚点在顶部，首行中心下移半行
        for (const r of rows) {
            const cost = CraftSystem.effectiveCost(ctx, r)
                .map(c => `${gm.cfg!.items.find(i => i.id === c.itemId)?.name}${c.count}`).join(' ');
            const chk = CraftSystem.canCraft(ctx, r);
            const row = panel(list, `r_${r.id}`, 640, 92, chk.ok ? COL.panel : '#1a1e28');
            row.setPosition(0, y);
            label(row, r.name, { size: 24, color: chk.ok ? COL.text : COL.dim }).node.setPosition(-290, 24);
            label(row, `材料：${cost}`, { size: 17, color: COL.dim }).node.setPosition(-290, -12);
            button(row, chk.ok ? '制作' : (chk.reason ?? '—'), 130, 60, () => {
                try {
                    CraftSystem.craft(ctx, r.id);
                    TimeSystem.spendAp(ctx, 1);
                    this.appendLog(`【制作】${r.name} 完成！`);
                } catch (e) { void e; }
                GameManager.I.persist(); this.refreshHUD();
                this.openCraft();
            }, { disabled: !chk.ok, fontSize: 19 }).setPosition(230, 0);
            y -= 104;
        }
        button(pnl, '关闭', 200, 64, () => { this.clearDialogs(); this.enableActions(true); })
            .setPosition(0, -470);
    }

    private openInventory(): void {
        const gm = GameManager.I;
        const ctx = gm.ctx!;
        this.clearDialogs();
        this.dialogLayer.active = true;
        panel(this.dialogLayer, 'mask', 720, 1280, '#05060a');
        const pnl = panel(this.dialogLayer, 'bag', 680, 1000, COL.bg);
        label(pnl, `背包 ${InventorySystem.usedSlots(ctx)}/${InventorySystem.capacity(ctx)}`,
            { size: 28, color: COL.accent }).node.setPosition(0, 440);

        const slots = [...ctx.run.inventory];
        const list = scrollList(pnl, 'bag_list', 660, 820, slots.length * 92 + 40);
        list.setPosition(0, -15);
        let y = -46;
        for (const slot of slots) {
            const def = gm.cfg!.items.find(i => i.id === slot.itemId)!;
            const row = panel(list, `i_${slot.itemId}`, 640, 80, COL.panel);
            row.setPosition(0, y);
            label(row, `${def.name} ×${slot.count}`, { size: 23 }).node.setPosition(-270, 0);
            if (def.use) {
                button(row, '使用', 110, 56, () => {
                    ItemUsageSystem.use(ctx, slot.itemId);
                    GameManager.I.persist(); this.refreshHUD();
                    this.openInventory();
                }).setPosition(220, 0);
            }
            button(row, '丢弃', 110, 56, () => {
                InventorySystem.remove(ctx, slot.itemId, 1);
                GameManager.I.persist(); this.refreshHUD();
                this.openInventory();
            }, { fontSize: 19 }).setPosition(90, 0);
            y -= 92;
        }
        button(pnl, '关闭', 200, 64, () => { this.clearDialogs(); this.enableActions(true); })
            .setPosition(0, -470);
    }

    // ================= 结算 =================
    private finishWithEnding(endingId: string, _flag: boolean): void {
        this.showEnding(endingId, false);
    }

    private showEnding(endingId: string, _fromLoad: boolean): void {
        const gm = GameManager.I;
        const ctx = gm.ctx!;
        const hadBefore = gm.global.endingsUnlocked.includes(endingId);
        const days = ctx.run.day;
        const newly = gm.settleRun(days);
        const ed = gm.cfg!.endings.find(e => e.id === endingId);
        this.clearScreens(); this.clearDialogs();
        this.hud = {};
        AudioManager.I.play(ed?.kind === 'death' ? 'death' : 'clear');

        const kindColor = ed?.kind === 'death' ? COL.dim : ed?.kind === 'hidden' ? COL.purple : COL.accent;
        const scr = panel(this.screenLayer, 'ending', 720, 1280, ed?.kind === 'death' ? '#101216' : '#1c1a12');
        label(scr, endingId, { size: 26, color: COL.dim, align: 'center', maxWidth: 720 }).node.setPosition(0, 380);
        label(scr, ed?.name ?? endingId, { size: 46, color: kindColor, align: 'center', maxWidth: 720 }).node.setPosition(0, 310);
        label(scr, ed?.desc ?? '', { size: 24, wrap: true, maxWidth: 600, align: 'left', color: COL.text })
            .node.setPosition(0, 190);
        label(scr, `存活 ${days} 天`, { size: 24, color: COL.dim, align: 'center', maxWidth: 720 }).node.setPosition(0, 60);
        if (!hadBefore && ed) {
            label(scr, `✦ 解锁新结局图鉴：${ed.name}`, { size: 24, color: COL.good, align: 'center', maxWidth: 720 })
                .node.setPosition(0, 10);
        }
        if (newly.length) {
            const names = newly.map(id =>
                ({ first_run: '初来乍到' }[id] ?? id)).join('、');
            label(scr, `🏆 成就解锁：${names}`, { size: 20, color: COL.accent, align: 'center', maxWidth: 640 })
                .node.setPosition(0, -40);
        }
        let y = -180;
        button(scr, '再来一局', 300, 84, () => this.showTalentDraw(), { bg: COL.panelLine, textColor: COL.accent })
            .setPosition(-160, y);
        button(scr, '回到主页', 300, 84, () => this.showHome()).setPosition(160, y);
    }

    private showCollection(achvTab = false): void {
        const gm = GameManager.I;
        this.clearScreens();
        const scr = panel(this.screenLayer, 'collect', 720, 1280, COL.bg);
        label(scr, achvTab ? '成就' : '结局图鉴', { size: 36, color: COL.accent, align: 'center', maxWidth: 720 })
            .node.setPosition(0, 480);
        let y = 380;
        if (!achvTab) {
            for (const e of gm.cfg!.endings) {
                const got = gm.global.endingsUnlocked.includes(e.id);
                const row = panel(scr, `e_${e.id}`, 640, 76, COL.panel);
                row.setPosition(0, y);
                label(row, got ? `${e.id} ${e.name}` : `${e.id} ？？？`,
                    { size: 22, color: got ? COL.text : '#4a5164' }).node.setPosition(-290, 0);
                if (got) label(row, e.kind === 'death' ? '死亡' : e.kind === 'hidden' ? '隐藏' : '达成',
                    { size: 18, color: e.kind === 'death' ? COL.dim : COL.good }).node.setPosition(250, 0);
                y -= 88;
                if (y < -480) break;
            }
        } else {
            label(scr, `总局数 ${gm.global.totalRuns} · 最长存活 ${gm.global.bestDaysSurvived} 天\n\n成就详情见后续版本`,
                { size: 24, wrap: true, maxWidth: 600, color: COL.text }).node.setPosition(0, 100);
        }
        button(scr, '返回', 220, 70, () => this.showHome()).setPosition(0, -520);
    }
}

// 避免未用告警：保留 ShelterSystem 引用供后续 HUD 扩展
void ShelterSystem;
void hexColor;




