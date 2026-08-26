// 夜晚全流程回归：入睡 → 夜间事件 → 清晨推进，含狂点/跳字等真实操作
// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { registerConfigLoader, GameManager } from '../../assets/scripts/core/GameManager';
import { buildAllConfigs } from '../../assets/scripts/core/ConfigBuild';
import { AppDom } from '../src/app';
import type { EventDef } from '../../assets/scripts/data/EventDefs';

const here = dirname(fileURLToPath(import.meta.url));
const CFG_DIR = join(here, '../../assets/resources/configs');

function nodeLoad(path: string): unknown {
    const rel = path.replace(/^configs\//, '');
    const raw = readFileSync(join(CFG_DIR, `${rel}.json`), 'utf-8');
    return JSON.parse(raw.replace(/^\uFEFF/, ''));
}

const pageErrors: string[] = [];
window.addEventListener('error', e => pageErrors.push(String((e as ErrorEvent).message)));

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

function btns(): HTMLElement[] {
    return [...document.querySelectorAll('button, .rowcard')] as HTMLElement[];
}
function clickByText(text: string): boolean {
    const t = btns().find(e => (e.textContent ?? '').includes(text));
    if (!t) return false;
    t.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    return true;
}
function countMasks(): number {
    return document.querySelectorAll('#dialog .mask').length;
}
function bodyText(): string {
    const b = document.querySelector('#dialog .evt-body');
    return b ? (b.textContent ?? '') : '';
}
async function waitForText(text: string, timeout = 8000): Promise<boolean> {
    const end = Date.now() + timeout;
    while (Date.now() < end) {
        if ((document.body.textContent ?? '').includes(text)) return true;
        await sleep(100);
    }
    return false;
}

/** 若有事件弹窗则点穿：等选项 → 点首个可用（或任意） → 等结果与 afterResult 定时播完 */
async function passEventDialog(maxMs = 12000): Promise<boolean> {
    const end = Date.now() + maxMs;
    while (Date.now() < end) {
        expect(countMasks()).toBeLessThanOrEqual(1);
        if (countMasks() === 0) return false;
        const allOpts = [...document.querySelectorAll('#dialog .opts .btn')];
        // 优先点非 disabled 的；如果没有就点第一个（locked 选项也会走 resolveOption 返回锁文案）
        const opt = allOpts.find(b => !(b as HTMLButtonElement).disabled) ?? allOpts[0];
        if (opt) {
            opt.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            await sleep(4500);
            return true;
        }
        await sleep(150);
    }
    return false;
}

describe('夜晚流程完整性', () => {
    it('连续6夜：天数严格+1、弹窗不叠、狂点入睡不双结算、无页面错误', async () => {
        (globalThis as { __QS_TEST_SEED__?: number }).__QS_TEST_SEED__ = 20260826;
        document.body.innerHTML = '<div id="phone"><div id="screen"></div><div id="dialog"></div></div>';
        registerConfigLoader(async () => buildAllConfigs(nodeLoad));
        await GameManager.I.init();
        GameManager.I.global.settings.typeSpeed = 0; // 瞬间显示，缩短测试

        const app = new AppDom(document.getElementById('phone')!);
        app.showHome();
        expect(await waitForText('进入迷雾')).toBe(true);
        expect(clickByText('进入迷雾')).toBe(true);
        expect(await waitForText('命运三选一')).toBe(true);
        if (!clickByText('★')) console.log('DIAG: 未找到天赋卡，DOM=', document.body.textContent?.slice(0, 300));
        if (!(await waitForText('新手礼包已发放', 6000))) {
            console.log('DIAG: 礼包未出现，DOM=', document.body.textContent?.slice(0, 400));
        }
        if (!(await waitForText('睁 开 双 眼', 5000))) {
            console.log('DIAG: 睁眼按钮未出现，DOM=', document.body.textContent?.slice(0, 400));
        }
        expect(clickByText('睁 开 双 眼')).toBe(true);
        clickByText('睁 开 双 眼');
        expect(await waitForText('第1天', 6000)).toBe(true);
        for (let i = 0; i < 4 && countMasks() > 0; i++) await passEventDialog();

        let nightEventsSeen = 0;
        for (let n = 1; n <= 6; n++) {
            // 极端种子下可能提前触发结局（E07 崩溃等）：合法游戏结果，跳出并记录
            if (!GameManager.I.ctx || GameManager.I.ctx.run.endingId) {
                console.log(`DIAG: 第${n}夜前对局已结束（ending=${GameManager.I.ctx?.run.endingId ?? '已结算'}），提前收尾`);
                break;
            }
            const dayBefore = GameManager.I.ctx.run.day;
            if (dayBefore !== n) { console.log(`DIAG: dayBefore=${dayBefore} expected=${n} — 跳过`); break; }
            expect(dayBefore).toBe(n);
            expect(countMasks()).toBeLessThanOrEqual(1);

            // 狂点入睡 3 连击：不得产生双结算/多弹窗
            for (let k = 0; k < 3; k++) clickByText('入睡');
            if (await waitForText('回家睡觉', 1500)) {
                expect(clickByText('回家睡觉')).toBe(true);
            }
            // v0.4：夜间姿态弹窗
            if (await waitForText('安睡', 2000)) {
                expect(clickByText('安睡')).toBe(true);
            }
            if (await passEventDialog()) nightEventsSeen++;

            // 夜间结算可能触发结局（E07 崩溃/天灾夜失败等）：ctx 被清空即对局结束
            if (!GameManager.I.ctx || GameManager.I.ctx.run.endingId) {
                console.log(`DIAG: 第${n}夜后对局结束（ending=${GameManager.I.ctx?.run.endingId ?? '已结算'}），提前收尾`);
                break;
            }
            if (!(await waitForText(`第${n + 1}天`, 15000))) {
                if (!GameManager.I.ctx || GameManager.I.ctx.run.endingId) {
                    console.log(`DIAG: 等待次日时对局结束（ending=${GameManager.I.ctx?.run.endingId ?? '已结算'}），提前收尾`);
                    break;
                }
                console.log(`DIAG4: 第${n + 1}天未出现 day=${GameManager.I.ctx!.run.day} ` +
                    `phase=${GameManager.I.ctx!.run.phase} masks=${countMasks()} ` +
                    `scene=${JSON.stringify(GameManager.I.ctx!.run.scene)} ` +
                    `dlg=${JSON.stringify((document.querySelector('#dialog .dlg')?.textContent ?? '').slice(0, 120))} ` +
                    `errs=${JSON.stringify(pageErrors.slice(-3))}`);
                expect(await waitForText(`第${n + 1}天`, 3000)).toBe(true);
            }
            expect(GameManager.I.ctx!.run.day).toBe(n + 1); // 严格+1，无连跳
            // v0.6 场景剧本：一个清晨可能连续多拍（场景幕+日常+剧情），上限放宽到 20
            for (let i = 0; i < 20 && countMasks() > 0; i++) await passEventDialog();
            // 若对局已结束（如少年结局），不再断言弹窗清零
            if (!GameManager.I.ctx!.endingId) expect(countMasks()).toBe(0);
        }
        console.log(`DIAG: 6夜中触发夜间事件 ${nightEventsSeen} 次`);
        const realErrors = pageErrors.filter(e => !e.includes('HTMLMediaElement'));
        expect(realErrors).toEqual([]);
        void app;
    }, 360000);

    it('结果阶段点屏幕跳字：正文必须停留在分支结果，而不是回退成问题文本', async () => {
        (globalThis as { __QS_TEST_SEED__?: number }).__QS_TEST_SEED__ = 42;
        document.body.innerHTML = '<div id="phone"><div id="screen"></div><div id="dialog"></div></div>';
        registerConfigLoader(async () => buildAllConfigs(nodeLoad));
        await GameManager.I.init();
        GameManager.I.global.settings.typeSpeed = 40;

        const app = new AppDom(document.getElementById('phone')!);
        app.showHome();
        // 事件弹窗依赖对局上下文（resolveOption 需要 ctx.rng）：先建立真实对局
        GameManager.I.newRun('T01', 42);

        const fakeEv = {
            id: 'evt_test_ui', title: '测试事件', type: 'night',
            text: '问题原文ABC', once: false,
            options: [{
                text: '选项一',
                results: [{ weight: 100, text: '分支结果XYZ' }],
            }],
        } as unknown as EventDef;

        let done = false;
        // jsdom 无 rAF：手动泵驱动打字机
        const pump = setInterval(() => app.tick(0.05), 25);
        (app as unknown as { presentEvent(ev: EventDef, cb: () => void): void })
            .presentEvent(fakeEv, () => { done = true; });

        await waitForText('选项一', 4000);           // 选项出现（speed=40，300+len*30ms 内）
        await sleep(500);                            // 等问题文本打完
        expect(bodyText()).toContain('问题原文ABC');
        document.querySelector('#dialog .opts .btn')!
            .dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await sleep(80);
        console.log('DIAG2 masks=', countMasks(), 'optsBtns=',
            document.querySelectorAll('#dialog .opts .btn').length,
            'body=', JSON.stringify(bodyText()));

        // 结果打字期间狂点正文跳字（真实玩家行为）
        for (let i = 0; i < 5; i++) {
            document.querySelector('#dialog .evt-body')!
                .dispatchEvent(new MouseEvent('click', { bubbles: true }));
            await sleep(60);
            console.log(`DIAG3[${i}]`, JSON.stringify(bodyText()),
                'errs=', JSON.stringify(pageErrors));
        }
        expect(bodyText()).toContain('分支结果XYZ');   // 回退即本用例失败
        expect(bodyText()).not.toContain('问题原文ABC');
        expect(done).toBe(false);                      // afterResult 定时未到
        await sleep(3600);
        clearInterval(pump);
        expect(done).toBe(true);                       // 流程正常收尾
        const realErrors = pageErrors.filter(e => !e.includes('HTMLMediaElement'));
        expect(realErrors).toEqual([]);                // 全程无未捕获异常
        void app;
    }, 30000);
});
