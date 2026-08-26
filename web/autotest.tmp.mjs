// 真实浏览器自动试玩：抓 console 错误 / 页面异常 / 截图关键画面
import { chromium } from 'playwright';

const BASE = process.argv[2] ?? 'http://localhost:5173';
const errors = [];

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 420, height: 860 } });
page.on('console', m => { if (m.type() === 'error') errors.push('[console] ' + m.text()); });
page.on('pageerror', e => errors.push('[pageerror] ' + e.message));

const shot = (n) => page.screenshot({ path: `D:/Temp/User/opencode/shot-${n}.png` });

await page.goto(BASE, { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1500);
console.log('TITLE=', await page.title());
console.log('BODY_HEAD=', (await page.textContent('body'))?.slice(0, 120));
await shot('1-home');

async function clickText(t, timeout = 4000) {
    try {
        await page.waitForSelector(`text=${t}`, { timeout });
        const els = await page.$$('button, .rowcard');
        for (const el of els) {
            const tx = (await el.textContent()) ?? '';
            if (tx.includes(t)) { await el.click(); return true; }
        }
    } catch { /* ignore */ }
    return false;
}
const bodyHas = async t => ((await page.textContent('body')) ?? '').includes(t);
const waitBody = async (t, ms = 6000) => {
    const end = Date.now() + ms;
    while (Date.now() < end) { if (await bodyHas(t)) return true; await page.waitForTimeout(120); }
    return false;
};

// 开局全流程
if (!await clickText('进入迷雾')) { console.log('FAIL: no 进入迷雾'); }
await shot('2-talent');
await clickText('★');
await waitBody('睁 开 双 眼', 8000);
await shot('3-gift');
await clickText('睁 开 双 眼');
console.log('day1=', await waitBody('第1天', 8000));
await shot('4-day1');

// 处理晨间弹窗：遮罩彻底消失才继续（上限45s）
for (let deadline = Date.now() + 45000; Date.now() < deadline;) {
    await page.waitForTimeout(800);
    const mask = await page.$('#dialog.show .mask');
    if (!mask) break;
    const opt = await page.$('#dialog .opts .btn:not([disabled])');
    if (opt) { await opt.click(); await page.waitForTimeout(4200); }
}

// 点几个每日行动
for (const act of ['采药', '日记', '锻炼']) {
    if (await clickText(act)) {
        await page.waitForTimeout(400);
        console.log(`act ${act} ok`);
    } else console.log(`act ${act} NOT FOUND`);
}
await shot('5-actions');

// 入睡 → 姿态 → 夜晚
await clickText('入睡');
if (await clickText('回家睡觉', 2500)) console.log('dusk prompt handled');
else if (await bodyHas('今晚怎么过')) console.log('posture direct');
await page.waitForTimeout(600);
await shot('6-posture');
if (!await clickText('安睡', 2500)) console.log('no posture dialog');
// 夜间事件？
for (let deadline = Date.now() + 45000; Date.now() < deadline;) {
    await page.waitForTimeout(800);
    const mask = await page.$('#dialog.show .mask');
    if (!mask) break;
    const opt = await page.$('#dialog .opts .btn:not([disabled])');
    if (opt) { await opt.click(); await page.waitForTimeout(4200); }
}
console.log('day2=', await waitBody('第2天', 25000));
await shot('7-day2');
// —— 验证效果回执出现在日志里 ——
const logTxt = (await page.textContent('.logpanel')) ?? '';
console.log('RECEIPT_IN_LOG=', /▸ /.test(logTxt) ? 'YES' : 'no');

console.log('ERRORS=', errors.length ? JSON.stringify(errors.slice(0, 10), null, 1) : 'none');
await browser.close();
