// Web 版启动冒烟测试：真实走一遍 初始化 → 主页 → 抽天赋 → 拆礼包 → 对局 → 探索 → 各面板
// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { registerConfigLoader, GameManager } from '../../assets/scripts/core/GameManager';
import { buildAllConfigs } from '../../assets/scripts/core/ConfigBuild';
import { AppDom } from '../src/app';

const here = dirname(fileURLToPath(import.meta.url));
const CFG_DIR = join(here, '../../assets/resources/configs');

function nodeLoad(path: string): unknown {
    const rel = path.replace(/^configs\//, '');
    const raw = readFileSync(join(CFG_DIR, `${rel}.json`), 'utf-8');
    return JSON.parse(raw.replace(/^\uFEFF/, ''));   // 剥 BOM，与 fetchLoad 一致
}

const pageErrors: string[] = [];
window.addEventListener('error', e => pageErrors.push(String((e as ErrorEvent).message)));

function clickByText(text: string): boolean {
    const els = [...document.querySelectorAll('button, .rowcard')];
    const target = els.find(e => (e.textContent ?? '').includes(text));
    if (!target) return false;
    target.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    return true;
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

async function waitForText(text: string, timeout = 8000): Promise<boolean> {
    const end = Date.now() + timeout;
    while (Date.now() < end) {
        if ((document.body.textContent ?? '').includes(text)) return true;
        await sleep(120);
    }
    return false;
}

/** 像真玩家一样把事件弹窗点穿：等选项出现 → 点首个可用项 → 处理分支链 */
async function playThroughEventDialogs(maxRounds = 5): Promise<void> {
    for (let i = 0; i < maxRounds; i++) {
        let clicked = false;
        const end = Date.now() + 7000;
        while (Date.now() < end) {
            const opts = [...document.querySelectorAll('#dialog .opts .btn')] as HTMLButtonElement[];
            const opt = opts.find(b => !b.disabled && !b.classList.contains('disabled'));
            if (opt) {
                opt.dispatchEvent(new MouseEvent('click', { bubbles: true }));
                clicked = true;
                break;
            }
            await sleep(150);
        }
        if (!clicked) return;   // 没有弹窗（或没有可用选项）了
        await sleep(4000);      // 分支结果播完 + afterResult 定时（最长 3500ms）
    }
}

describe('Web 版启动冒烟', () => {
    it('初始化到对局内探索全程不抛错', async () => {
        (globalThis as { __QS_TEST_SEED__?: number }).__QS_TEST_SEED__ = 20260825;
        document.body.innerHTML = '<div id="phone"><div id="screen"></div><div id="dialog"></div></div>';
        registerConfigLoader(async () => buildAllConfigs(nodeLoad));
        await GameManager.I.init();

        const app = new AppDom(document.getElementById('phone')!);
        app.showHome();
        expect(await waitForText('进入迷雾')).toBe(true);

        // 主页 → 抽天赋
        expect(clickByText('进入迷雾')).toBe(true);
        expect(await waitForText('命运三选一')).toBe(true);

        // 选第一张卡 → 礼包演出逐行出现 → 睁开双眼
        expect(clickByText('★')).toBe(true);
        expect(await waitForText('新手礼包已发放', 6000)).toBe(true);
        expect(await waitForText('睁 开 双 眼', 4000)).toBe(true);
        expect(clickByText('睁 开 双 眼')).toBe(true);

        // 进入对局：像玩家一样处理晨间事件弹窗（可能没有/可能有/可能带分支链）
        expect(await waitForText('第1天', 6000)).toBe(true);
        await playThroughEventDialogs();
        expect(GameManager.I.ctx).not.toBeNull();
        expect(GameManager.I.ctx!.run.endingId).toBeNull();

        // 探索·迷雾边缘：仅当天未被封路时可用（酸雨日按钮整体消失属正常）
        const exploreBtn = [...document.querySelectorAll('button')]
            .find(b => (b.textContent ?? '').includes('探索·迷雾边缘'));
        if (exploreBtn) {
            expect(GameManager.I.ctx!.run.apLeft).toBeGreaterThan(0);
            expect(clickByText('探索·迷雾边缘')).toBe(true);
            await sleep(600);
            await playThroughEventDialogs();   // 探索也可能触发事件
            expect(GameManager.I.ctx!.run.apLeft).toBeLessThan(3);
            expect(GameManager.I.save.hasRun()).toBe(true);
        } else {
            console.log('DIAG_BLOCKED: 酸雨日，跳过探索');
        }
        expect(GameManager.I.save.hasRun()).toBe(true);

        // 面板冒烟：背包 / 制作 / 情报 / 交易 / 频道 / 设置
        for (const [entry, marker] of [
            ['背包', '丢弃'], ['制作/建造', '材料'], ['📋 情报', '各地剩余物资'],
            ['🔁 交易', '报价好坏'], ['💬 频道', '世界频道'], ['⚙', '文字速度'],
        ] as const) {
            expect(clickByText(entry as string)).toBe(true);
            expect(await waitForText(marker as string, 3000)).toBe(true);
            expect(clickByText('关闭')).toBe(true);
            await sleep(80);
        }

        // 游戏内改打字机速度并持久化
        expect(clickByText('⚙')).toBe(true);
        expect(await waitForText('文字速度', 3000)).toBe(true);
        expect(clickByText('瞬间')).toBe(true);
        await sleep(150);
        expect(GameManager.I.global.settings.typeSpeed).toBe(0);
        expect(clickByText('关闭')).toBe(true);
        await sleep(80);

        // 全程无未捕获页面错误（jsdom 不支持 media play 属已知噪音，单独放行）
        const realErrors = pageErrors.filter(e => !e.includes('HTMLMediaElement'));
        expect(realErrors).toEqual([]);

        void app;
    }, 40000);
});
