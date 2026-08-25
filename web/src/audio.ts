// Web 端音频适配：HTMLAudioElement 池 + 缓存；资源缺失时静默跳过（内容未接入不报错）
class WebAudioManager {
    enabled = true;
    private cache = new Map<string, HTMLAudioElement | null>();   // null = 已确认缺失

    setEnabled(on: boolean): void { this.enabled = on; }

    play(name: string, volumeScale = 1): void {
        if (!this.enabled) return;
        let a = this.cache.get(name);
        if (a === undefined) {
            a = new Audio(`audio/${name}.wav`);
            a.preload = 'auto';
            a.addEventListener('error', () => this.cache.set(name, null), { once: true });
            this.cache.set(name, a);
        }
        if (!a) return;
        try { a.volume = Math.min(1, Math.max(0, volumeScale)); } catch { /* 忽略 */ }
        try { a.currentTime = 0; } catch { /* 忽略 */ }
        try {
            const p = a.play() as unknown as Promise<void> | undefined;
            if (p && typeof p.catch === 'function') p.catch(() => { /* 自动播放策略拦截时静默 */ });
        } catch { /* 播放不可用时静默 */ }
    }
}

export const audio = new WebAudioManager();
