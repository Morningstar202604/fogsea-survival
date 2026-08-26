// 全部配置表的聚合类型 + 引用完整性校验（纯逻辑，可单测）
import type { ItemDef } from '../data/ItemDefs';
import type { EventDef } from '../data/EventDefs';
import type { TalentDef, ChatPool } from '../data/TalentDefs';
import type { StatusDef } from '../data/StatusDefs';
import type { RecipeDef, LocationDef, LootTable, DisasterDef, EndingDef } from '../data/EventDefs';
import type { SceneDef } from '../data/SceneDefs';
import { SKILL_CATEGORIES, type SkillCategory } from '../data/SkillDefs';

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
    scenes?: SceneDef[];
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
                if (r.nextEvent && !r.nextEvent.startsWith('scene:') && !eventIds.has(r.nextEvent))
                    err(`events:${e.id}`, `连锁事件 ${r.nextEvent} 不存在`);
                if (r.endingId && !endingIds.has(r.endingId))
                    err(`events:${e.id}`, `结局引用 ${r.endingId} 不存在`);
            }
            if (o.requires?.talent && !talentIds.has(o.requires.talent))
                err(`events:${e.id}`, `天赋条件 ${o.requires.talent} 不存在`);
            if (o.requires?.rel && !SCENE_NPCS.includes(o.requires.rel.npc))
                err(`events:${e.id}`, `好感对象 ${o.requires.rel.npc} 不存在`);
            if (o.requires?.skillLevel) {
                for (const cat of Object.keys(o.requires.skillLevel)) {
                    if (!SKILL_CATEGORIES.includes(cat as SkillCategory))
                        err(`events:${e.id}`, `技能线 ${cat} 不存在`);
                }
            }
        }
    }

    // ===== 场景（多拍剧本）=====
    const sceneIds = new Set<string>();
    for (const sc of c.scenes ?? []) {
        if (sceneIds.has(sc.id)) err(`scenes:${sc.id}`, '场景 ID 重复');
        sceneIds.add(sc.id);
        if (!sc.nodes?.length) { err(`scenes:${sc.id}`, 'nodes 为空'); continue; }
        const nodeIds = new Set<string>();
        for (const nd of sc.nodes) {
            if (nodeIds.has(nd.id)) err(`scenes:${sc.id}/${nd.id}`, '节点 ID 重复');
            nodeIds.add(nd.id);
            if (!nd.choices?.length) err(`scenes:${sc.id}/${nd.id}`, 'choices 为空');
        }
        if (!nodeIds.has(sc.entry)) err(`scenes:${sc.id}`, `入口节点 ${sc.entry} 不存在`);
        const checkJump = (ndId: string, kind: string, target: string | undefined): void => {
            if (!target || target === 'END') return;
            if (!nodeIds.has(target)) err(`scenes:${sc.id}/${ndId}`, `${kind} 目标 ${target} 不存在`);
        };
        for (const nd of sc.nodes) {
            checkJump(nd.id, 'gather', nd.gather);
            for (const ch of nd.choices ?? []) {
                const outs = Array.isArray(ch.outcomes) ? ch.outcomes : [ch.outcomes];
                if (!outs.length) { err(`scenes:${sc.id}/${nd.id}`, 'outcomes 为空'); continue; }
                for (const o of outs) {
                    checkJump(nd.id, 'goto', o.goto);
                    for (const g of [...(o.effects?.gainItems ?? []), ...(o.effects?.loseItems ?? [])])
                        if (!itemIds.has(g.itemId)) err(`scenes:${sc.id}/${nd.id}`, `物品引用 ${g.itemId} 不存在`);
                    for (const s of [...(o.effects?.addStatus ?? []), ...(o.effects?.removeStatus ?? [])])
                        if (!statusIds.has(s)) err(`scenes:${sc.id}/${nd.id}`, `状态引用 ${s} 不存在`);
                    if (o.effects?.endingId && !endingIds.has(o.effects.endingId))
                        err(`scenes:${sc.id}/${nd.id}`, `结局引用 ${o.effects.endingId} 不存在`);
                }
                const rq = ch.requires;
                if (rq?.talent && !talentIds.has(rq.talent))
                    err(`scenes:${sc.id}/${nd.id}`, `天赋条件 ${rq.talent} 不存在`);
                if (rq?.rel && !SCENE_NPCS.includes(rq.rel.npc))
                    err(`scenes:${sc.id}/${nd.id}`, `好感对象 ${rq.rel.npc} 不存在`);
                for (const g of rq?.items ?? [])
                    if (!itemIds.has(g.itemId)) err(`scenes:${sc.id}/${nd.id}`, `门槛物品 ${g.itemId} 不存在`);
                if (rq?.skillLevel) {
                    for (const cat of Object.keys(rq.skillLevel)) {
                        if (!SKILL_CATEGORIES.includes(cat as SkillCategory))
                            err(`scenes:${sc.id}/${nd.id}`, `技能线 ${cat} 不存在`);
                    }
                }
            }
        }
    }
    // 事件 → 场景链入引用（nextEvent: 'scene:场景id/节点id'）
    const sceneIndex = new Map<string, Set<string>>();
    for (const sc of c.scenes ?? []) sceneIndex.set(sc.id, new Set(sc.nodes.map(n => n.id)));
    for (const e of c.events) {
        for (const o of e.options) {
            for (const r of o.results) {
                if (!r.nextEvent?.startsWith('scene:')) continue;
                const key = r.nextEvent.slice('scene:'.length);
                const slash = key.indexOf('/');
                const sid = slash > 0 ? key.slice(0, slash) : key;
                const nid = slash > 0 ? key.slice(slash + 1) : '';
                if (!sceneIndex.get(sid)?.has(nid))
                    err(`events:${e.id}`, `链入场景节点 ${r.nextEvent} 不存在`);
            }
        }
    }
    return issues;
}

/** 场景/事件共用的合法好感对象 */
const SCENE_NPCS = ['laok', 'kid', 'doc', 'ratking', 'rescue'];
