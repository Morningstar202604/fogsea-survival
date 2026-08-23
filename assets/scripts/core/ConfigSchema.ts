// 全部配置表的聚合类型 + 引用完整性校验（纯逻辑，可单测）
import type { ItemDef } from '../data/ItemDefs';
import type { EventDef } from '../data/EventDefs';
import type { TalentDef, ChatPool } from '../data/TalentDefs';
import type { StatusDef } from '../data/StatusDefs';
import type { RecipeDef, LocationDef, LootTable, DisasterDef, EndingDef } from '../data/EventDefs';

export interface AllConfigs {
    items: ItemDef[];
    statuses: StatusDef[];
    talents: TalentDef[];
    recipes: RecipeDef[];
    locations: LocationDef[];
    lootTables: LootTable[];
    disasters: DisasterDef[];
    endings: EndingDef[];
    events: EventDef[];
    chatPools: ChatPool[];
}

export interface ValidationIssue {
    path: string;
    msg: string;
}

export function validateConfigs(c: AllConfigs): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    const err = (path: string, msg: string) => issues.push({ path, msg });

    const itemIds = new Set(c.items.map(i => i.id));
    const statusIds = new Set(c.statuses.map(s => s.id));
    const endingIds = new Set(c.endings.map(e => e.id));
    const talentIds = new Set(c.talents.map(t => t.id));
    const eventIds = new Set<string>();
    for (const e of c.events) {
        if (eventIds.has(e.id)) err(`events:${e.id}`, '事件 ID 重复');
        eventIds.add(e.id);
    }

    // 物品
    for (const it of c.items) {
        if (it.stackable && it.maxStack <= 1) err(`items:${it.id}`, 'stackable 但 maxStack<=1');
        if (!it.stackable && it.maxStack !== 1) err(`items:${it.id}`, '不可叠加物品 maxStack 应为 1');
    }
    // 状态
    for (const st of c.statuses) {
        if (st.cureItemId && !itemIds.has(st.cureItemId))
            err(`statuses:${st.id}`, `cureItemId ${st.cureItemId} 不存在`);
    }
    // 天赋
    if (c.talents.length < 3) err('talents', '天赋池至少 3 个（命运三选一）');
    // 配方
    for (const r of c.recipes) {
        for (const cost of r.costItems)
            if (!itemIds.has(cost.itemId)) err(`recipes:${r.id}`, `材料 ${cost.itemId} 不存在`);
        if (r.outputKind === 'item' && !itemIds.has(r.outputId))
            err(`recipes:${r.id}`, `产物物品 ${r.outputId} 不存在`);
        if (r.needsFacility && !c.recipes.some(x => x.outputKind === 'facility' && x.outputId === r.needsFacility))
            err(`recipes:${r.id}`, `前置设施 ${r.needsFacility} 无对应配方`);
    }
    // 地点
    for (const l of c.locations) {
        if (!c.events.some(e => e.type === 'explore' && e.pool?.includes(l.id)))
            err(`locations:${l.id}`, '该地点无任何挂接的探索事件');
    }
    // 掉落表
    for (const lt of c.lootTables) {
        for (const en of lt.entries)
            if (!itemIds.has(en.itemId)) err(`lootTables:${lt.tier}`, `掉落物 ${en.itemId} 不存在`);
    }
    // 天灾
    for (const d of c.disasters) {
        if (!c.chatPools.some(p => p.id === d.chatPoolId))
            err(`disasters:${d.id}`, `联动文案池 ${d.chatPoolId} 不存在`);
    }
    // 事件
    for (const e of c.events) {
        if (!e.options?.length) { err(`events:${e.id}`, 'options 为空'); continue; }
        if (e.conditions) {
            for (const s of [...(e.conditions.statuses ?? []), ...(e.conditions.notStatuses ?? [])])
                if (!statusIds.has(s)) err(`events:${e.id}`, `条件状态引用 ${s} 不存在`);
        }
        for (const o of e.options) {
            for (const r of o.results) {
                for (const g of [...(r.gainItems ?? []), ...(r.loseItems ?? [])])
                    if (!itemIds.has(g.itemId)) err(`events:${e.id}`, `物品引用 ${g.itemId} 不存在`);
                for (const s of [...(r.addStatus ?? []), ...(r.removeStatus ?? [])])
                    if (!statusIds.has(s)) err(`events:${e.id}`, `状态引用 ${s} 不存在`);
                if (r.nextEvent && !eventIds.has(r.nextEvent))
                    err(`events:${e.id}`, `连锁事件 ${r.nextEvent} 不存在`);
                if (r.endingId && !endingIds.has(r.endingId))
                    err(`events:${e.id}`, `结局引用 ${r.endingId} 不存在`);
            }
            if (o.requires?.talent && !talentIds.has(o.requires.talent))
                err(`events:${e.id}`, `天赋条件 ${o.requires.talent} 不存在`);
        }
    }
    return issues;
}
