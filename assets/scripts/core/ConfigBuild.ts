// 配置构建（纯 TS）：任意异步 JSON 加载器 → 校验 → AllConfigs
import type { AllConfigs } from './ConfigSchema';
import { validateConfigs } from './ConfigSchema';

export type RawConfigLoader = (path: string) => Promise<unknown>;

export const CONFIG_PATHS = {
    items: 'configs/items',
    statuses: 'configs/statuses',
    talents: 'configs/talents',
    recipes: 'configs/recipes',
    locations: 'configs/locations',
    lootTables: 'configs/loot_tables',
    disasters: 'configs/disasters',
    endings: 'configs/endings',
} as const;

const EVENT_FILES = ['events/fog_explore', 'events/fog_daily', 'events/fog_crisis',
    'events/fog_night', 'events/fog_story', 'events/fog_explore2', 'events/fog_daily2',
    'events/fog_crisis2', 'events/fog_night2', 'events/fog_story2', 'events/fog_chapters',
    'events/fog_generated'];

const ROOT_KEYS = {
    items: 'items', statuses: 'statuses', talents: 'talents', recipes: 'recipes',
    locations: 'locations', lootTables: 'lootTables', disasters: 'disasters', endings: 'endings',
} as const;

/** 通用构建：load(path) 返回该 JSON 的内容对象 */
export async function buildAllConfigs(load: RawConfigLoader): Promise<AllConfigs> {
    const one = async (key: keyof typeof ROOT_KEYS): Promise<unknown[]> => {
        const o = await load(CONFIG_PATHS[key]) as Record<string, unknown[]>;
        return o[ROOT_KEYS[key]] ?? [];
    };
    const eventsFiles = await Promise.all(EVENT_FILES.map(p =>
        load(`configs/${p}`) as Promise<Record<string, unknown[]>>));
    const chatRaw = await load('configs/chat_pools') as Record<string, unknown[]>;
    // 兼容同步/异步加载器：统一包一层 Promise；缺 scenes.json 时优雅降级为空池
    const scenesRaw = await Promise.resolve(load('configs/scenes'))
        .catch(() => ({ scenes: [] })) as Record<string, unknown[]>;

    const [items, statuses, talents, recipes, locations, lootTables,
        disasters, endings] = await Promise.all([
        one('items'), one('statuses'), one('talents'), one('recipes'),
        one('locations'), one('lootTables'), one('disasters'), one('endings'),
    ]);    const events = eventsFiles.flatMap(a => a.events ?? []);
    const chatPools = chatRaw.chatPools ?? [];
    const scenes = (scenesRaw.scenes ?? []) as AllConfigs['scenes'];

    const cfg: AllConfigs = {
        items, statuses, talents, recipes, locations,
        lootTables, disasters, endings, events, chatPools, scenes,
    } as unknown as AllConfigs;

    const issues = validateConfigs(cfg);
    if (issues.length > 0) {
        const detail = issues.map(i => `  [${i.path}] ${i.msg}`).join('\n');
        throw new Error(`配置校验失败（${issues.length} 处）：\n${detail}`);
    }
    return cfg;
}
