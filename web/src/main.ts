// Web 入口：注册配置加载器 → 初始化 GameManager → 启动 UI + 主循环
import './style.css';
import { registerConfigLoader } from '../../assets/scripts/core/GameManager';
import { buildAllConfigs } from '../../assets/scripts/core/ConfigBuild';
import type { AllConfigs } from '../../assets/scripts/core/ConfigSchema';
import { GameManager } from '../../assets/scripts/core/GameManager';
import { AppDom } from './app';
import { audio } from './audio';

async function fetchLoad(path: string): Promise<unknown> {
    const r = await fetch(`${path}.json`);
    if (!r.ok) throw new Error(`加载配置失败: ${path} (HTTP ${r.status})`);
    // 配置文件带 UTF-8 BOM，JSON.parse 不容忍，需剥掉
    return JSON.parse((await r.text()).replace(/^\uFEFF/, ''));
}

registerConfigLoader(async (): Promise<AllConfigs> => buildAllConfigs(fetchLoad));

const root = document.getElementById('phone')!;
let app: AppDom | null = null;
let last = performance.now();

function loop(now: number): void {
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    app?.tick(dt);
    requestAnimationFrame(loop);
}

async function boot(): Promise<void> {
    try {
        await GameManager.I.init();
        audio.setEnabled(GameManager.I.global.settings.sound);
        app = new AppDom(root);
        app.showHome();
        requestAnimationFrame(loop);
    } catch (e) {
        root.textContent = `初始化失败：${(e as Error).message}`;
    }
}

void boot();
