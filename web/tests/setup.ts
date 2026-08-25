// vitest 环境补丁：Node 的实验性 localStorage 残缺对象会遮蔽 jsdom 的，
// 这里装一个功能完整的内存版，保证被测代码与浏览器行为一致。
const mem = new Map<string, string>();

(globalThis as Record<string, unknown>).localStorage = {
    getItem: (k: string): string | null => (mem.has(k) ? (mem.get(k) as string) : null),
    setItem: (k: string, v: string): void => { mem.set(k, String(v)); },
    removeItem: (k: string): void => { mem.delete(k); },
    clear: (): void => { mem.clear(); },
    key: (i: number): string | null => Array.from(mem.keys())[i] ?? null,
    get length(): number { return mem.size; },
};
