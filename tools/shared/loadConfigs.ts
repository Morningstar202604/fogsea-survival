// 工具链共享：从磁盘读全部配置 JSON → AllConfigs
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AllConfigs } from '../../assets/scripts/core/ConfigSchema';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');
const CFG = (p: string) => {
    // 兼容 PowerShell 写入的 UTF-8 BOM
    const raw = readFileSync(resolve(ROOT, 'assets/resources/configs', p), 'utf-8');
    return JSON.parse(raw.charCodeAt(0) === 0xfeff ? raw.slice(1) : raw);
};

export function loadConfigsFromDisk(): AllConfigs {
    const items = CFG('items.json').items;
    const statuses = CFG('statuses.json').statuses;
    const talents = CFG('talents.json').talents;
    const recipes = CFG('recipes.json').recipes;
    const locations = CFG('locations.json').locations;
    const lootTables = CFG('loot_tables.json').lootTables;
    const disasters = CFG('disasters.json').disasters;
    const endings = CFG('endings.json').endings;

    const eventFiles = ['fog_explore', 'fog_daily', 'fog_crisis', 'fog_night', 'fog_story',
        'fog_explore2', 'fog_daily2', 'fog_crisis2', 'fog_night2', 'fog_story2', 'fog_chapters',
        'fog_generated', 'fog_versions', 'fog_neighbors', 'fog_regions_explore'];
    const events = eventFiles.flatMap(f => CFG(`events/${f}.json`).events);
    const chatPools = CFG('chat_pools.json').chatPools;
    const scenes = CFG('scenes.json')?.scenes ?? [];

    return { items, statuses, talents, recipes, locations, lootTables, disasters, endings, events, chatPools, scenes };
}

export function readGameFile(rel: string): string {
    return readFileSync(resolve(ROOT, rel), 'utf-8');
}
