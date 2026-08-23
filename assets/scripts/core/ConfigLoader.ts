// 配置加载：Cocos resources 目录 JSON → 校验 → AllConfigs
// 注意：本文件依赖 'cc'，仅供运行时使用；单测直接用 fs 读 JSON + validateConfigs
import { resources, JsonAsset } from 'cc';
import type { AllConfigs } from './ConfigSchema';
import { validateConfigs } from './ConfigSchema';

const CONFIG_PATHS = {
    items: 'configs/items',
    statuses: 'configs/statuses',
    talents: 'configs/talents',
    recipes: 'configs/recipes',
    locations: 'configs/locations',
    lootTables: 'configs/loot_tables',
    disasters: 'configs/disasters',
    endings: 'configs/endings',
} as const;

function loadOne(path: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
        resources.load(path, JsonAsset, (err, asset) => {
            if (err) return reject(new Error(`加载配置失败: ${path}\n${err.message}`));
            resolve((asset as JsonAsset).json);
        });
    });
}

function loadEvents(): Promise<unknown[]> {
    const files = ['events/fog_explore', 'events/fog_daily', 'events/fog_crisis',
        'events/fog_night', 'events/fog_story'];
    return Promise.all(files.map(loadOne)).then(arrs =>
        arrs.flatMap(a => ((a as { events?: unknown[] }).events ?? [])));
}

function loadChatPools(): Promise<unknown[]> {
    return loadOne('configs/chat_pools').then(o => {
        const pools = (o as { chatPools?: unknown[] }).chatPools ?? [];
        // 事件里的 chatInject 引用校验需要池 id，这里同时登记 link_gift 等
        return pools;
    });
}

export async function loadAllConfigs(): Promise<AllConfigs> {
    const [items, statuses, talents, recipes, locations, lootTables,
        disasters, endings, events, chatPools] = await Promise.all([
        loadOne(CONFIG_PATHS.items).then(o => (o as { items: [] }).items),
        loadOne(CONFIG_PATHS.statuses).then(o => (o as { statuses: [] }).statuses),
        loadOne(CONFIG_PATHS.talents).then(o => (o as { talents: [] }).talents),
        loadOne(CONFIG_PATHS.recipes).then(o => (o as { recipes: [] }).recipes),
        loadOne(CONFIG_PATHS.locations).then(o => (o as { locations: [] }).locations),
        loadOne(CONFIG_PATHS.lootTables).then(o => (o as { lootTables: [] }).lootTables),
        loadOne(CONFIG_PATHS.disasters).then(o => (o as { disasters: [] }).disasters),
        loadOne(CONFIG_PATHS.endings).then(o => (o as { endings: [] }).endings),
        loadEvents(),
        loadChatPools(),
    ]);

    const cfg: AllConfigs = {
        items, statuses, talents, recipes, locations,
        lootTables, disasters, endings, events, chatPools,
    } as unknown as AllConfigs;

    const issues = validateConfigs(cfg);
    if (issues.length > 0) {
        const detail = issues.map(i => `  [${i.path}] ${i.msg}`).join('\n');
        throw new Error(`配置校验失败（${issues.length} 处）：\n${detail}`);
    }
    return cfg;
}
