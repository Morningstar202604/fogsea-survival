// 存档管理：可注入存储后端（localStorage / 内存），含版本迁移与轻量防篡改
import { SAVE_VERSION, RUN_KEY, GLOBAL_KEY, DEFAULT_SETTINGS } from '../data/SaveSchema';
import type { RunState, GlobalProfile } from '../data/SaveSchema';

export interface StorageBackend {
    get(key: string): string | null;
    set(key: string, value: string): void;
}

/** 测试/模拟器用内存后端 */
export class MemoryStorage implements StorageBackend {
    private m = new Map<string, string>();
    get(key: string): string | null { return this.m.get(key) ?? null; }
    set(key: string, v: string): void { this.m.set(key, v); }
}

type Migration = (data: Record<string, unknown>) => Record<string, unknown>;
const MIGRATIONS: Record<number, Migration> = {
    // v1→v2：新增地点存量/天气预告/随从/交易字段
    1: (d) => {
        d.locationStock = d.locationStock ?? {};
        d.weatherTomorrow = d.weatherTomorrow ?? null;
        d.companion = null;
        d.tradesToday = [];
        d.tradesAccepted = [];
        if (d.disasterNext && typeof d.disasterNext === 'object')
            (d.disasterNext as Record<string, unknown>).activeToday =
                !!(d.disasterNext as { dueDay?: number }).dueDay &&
                (d.disasterNext as { dueDay: number }).dueDay === (d as { day?: number }).day;
        return d;
    },
    // v2→v3：新增场景（多拍剧本）字段
    2: (d) => {
        d.scene = null;
        d.scenesDone = [];
        return d;
    },
    // v3→v4：新增技能树字段
    3: (d) => {
        d.skills = {
            xp: { survival: 0, combat: 0, craft: 0, knowledge: 0, social: 0 },
            inspiration: 0,
            inspirationCharges: 0,
        };
        return d;
    },
};

export class SaveManager {
    constructor(private store: StorageBackend) {}

    saveRun(run: RunState): void {
        run.version = SAVE_VERSION;
        const json = JSON.stringify(run);
        this.store.set(RUN_KEY, json);
        this.store.set(`${RUN_KEY}_sum`, String(this.checksum(json)));
    }

    loadRun(): RunState | null {
        const raw = this.store.get(RUN_KEY);
        if (!raw) return null;
        try {
            const sum = this.store.get(`${RUN_KEY}_sum`);
            if (sum && Number(sum) !== this.checksum(raw)) throw new Error('checksum');
            let data = JSON.parse(raw) as RunState & { version?: number };
            let v = data.version ?? 0;
            while (v < SAVE_VERSION) {
                data = MIGRATIONS[v]?.(data as unknown as Record<string, unknown>) as unknown as RunState;
                v++;
            }
            data.version = SAVE_VERSION;
            return data;
        } catch {
            // 损坏档备份，绝不静默覆盖
            this.store.set(`${RUN_KEY}_bak`, raw);
            return null;
        }
    }

    clearRun(): void {
        this.store.set(RUN_KEY, '');
        this.store.set(`${RUN_KEY}_sum`, '0');
    }

    hasRun(): boolean {
        const raw = this.store.get(RUN_KEY);
        return !!raw && raw.length > 2;
    }

    loadGlobal(): GlobalProfile {
        const raw = this.store.get(GLOBAL_KEY);
        const base: GlobalProfile = {
            version: SAVE_VERSION, totalRuns: 0, bestDaysSurvived: 0,
            endingsUnlocked: [], achievements: [], totalChestsOpened: 0,
            settings: { ...DEFAULT_SETTINGS },
        };
        if (!raw) return base;
        try {
            const parsed = JSON.parse(raw) as Partial<GlobalProfile>;
            return { ...base, ...parsed, settings: { ...base.settings, ...(parsed.settings ?? {}) } };
        } catch {
            return base;
        }
    }

    saveGlobal(g: GlobalProfile): void {
        g.version = SAVE_VERSION;
        this.store.set(GLOBAL_KEY, JSON.stringify(g));
    }

    /** 轻量校验和：挡住随手改档；非安全加密 */
    private checksum(s: string): number {
        let h = 5381;
        for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
        return h;
    }
}
