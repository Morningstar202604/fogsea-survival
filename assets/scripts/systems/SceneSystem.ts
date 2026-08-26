// 场景引擎（v0.6）：多拍剧本的调度、编译与推进。
// 设计原则：
//   · 内容 = 小颗粒节点卡；调度器决定"此刻演哪幕"——加剧本不改结构
//   · 编译期把 goto/gather 解析成合成事件的 nextEvent('scene:场景id/节点id')，
//     两端 UI 复用现有 presentEvent 流水线，零 UI 改造成本
//   · 效果统一走 EventEngine.applyEffects（属性/物品/状态/好感/道德/雾压/AP）
import type { EventDef, EventOption, ResultBranch } from '../data/EventDefs';
import type { SceneDef, SceneNode, SceneChoice, SceneOutcome } from '../data/SceneDefs';
import { EventEngine } from './EventEngine';
import type { GameCtx } from './RunModel';

export const SCENE_REF_PREFIX = 'scene:';
export const SCENE_END = 'END';

export class SceneSystem {
    static all(ctx: GameCtx): SceneDef[] {
        return ctx.cfg.scenes ?? [];
    }

    static byId(ctx: GameCtx, id: string): SceneDef | null {
        return this.all(ctx).find(s => s.id === id) ?? null;
    }

    private static node(def: SceneDef, nodeId: string): SceneNode | null {
        return def.nodes.find(n => n.id === nodeId) ?? null;
    }

    /** 当前活动场景的编译事件；无活动场景返回 null（两端 UI 的统一入口） */
    static activeNode(ctx: GameCtx): EventDef | null {
        const s = ctx.run.scene;
        if (!s) return null;
        return this.compile(ctx, s.id, s.nodeId);
    }

    // ================= 调度 =================

    /** 幕是否满足触发条件且未演过 */
    static eligible(ctx: GameCtx, def: SceneDef): boolean {
        if (ctx.run.scenesDone.includes(def.id)) return false;
        const t = def.trigger;
        if (!t) return true;
        if (t.dayMin !== undefined && ctx.run.day < t.dayMin) return false;
        if (t.dayMax !== undefined && ctx.run.day > t.dayMax) return false;
        if (t.flags?.some(f => !ctx.run.flags.includes(f))) return false;
        if (t.notFlags?.some(f => ctx.run.flags.includes(f))) return false;
        if (t.companionAlive !== undefined &&
            (ctx.run.companion !== null) !== t.companionAlive) return false;
        return true;
    }

    /**
     * 清晨调度：优先恢复跨天挂起的活动场景；否则按 priority 挑一幕就绪的新场景。
     * 命中时写入 run.scene 并返回场景 id；无 → null。
     */
    static morningStart(ctx: GameCtx): string | null {
        const run = ctx.run;
        if (run.scene && this.byId(ctx, run.scene.id)) return run.scene.id;
        const ready = this.all(ctx)
            .filter(d => this.eligible(ctx, d) && d.startBy !== 'chain')   // chain 幕只由事件链入
            .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
        const def = ready[0];
        if (!def) return null;
        run.scene = { id: def.id, nodeId: def.entry };
        return def.id;
    }

    /** 演完收尾：登记 scenesDone 并清掉活动场景（幂等） */
    static finishActive(ctx: GameCtx, sceneId?: string): void {
        const sid = sceneId ?? ctx.run.scene?.id;
        if (!sid) return;
        if (!ctx.run.scenesDone.includes(sid)) ctx.run.scenesDone.push(sid);
        if (ctx.run.scene?.id === sid || !sceneId) ctx.run.scene = null;
    }

    // ================= 编译 =================

    private static outcomesOf(c: SceneChoice): SceneOutcome[] {
        return Array.isArray(c.outcomes) ? c.outcomes : [c.outcomes];
    }

    /** 把场景节点编译成 UI 可直接呈现的合成事件（weight=0 不进随机池） */
    static compile(ctx: GameCtx, sceneId: string, nodeId: string): EventDef | null {
        const def = this.byId(ctx, sceneId);
        const nd = def ? this.node(def, nodeId) : null;
        if (!def || !nd) return null;

        const jumpRef = (target: string | undefined): string | undefined => {
            if (target === SCENE_END) return undefined;
            const dest = target ?? nd.gather;             // 未显式跳转 → 汇流点
            if (!dest || dest === SCENE_END) return undefined;
            return `${SCENE_REF_PREFIX}${sceneId}/${dest}`;
        };

        const options: EventOption[] = nd.choices.map(c => ({
            text: c.text,
            requires: c.requires,
            results: this.outcomesOf(c).map(o => this.compileOutcome(o, jumpRef)),
        }));

        return {
            id: `${SCENE_REF_PREFIX}${sceneId}/${nodeId}`,
            title: nd.chapter ? `${def.name} · ${nd.chapter}` : def.name,
            type: 'story',
            weight: 0,
            text: nd.text,
            options,
        };
    }

    private static compileOutcome(o: SceneOutcome, ref: (g?: string) => string | undefined): ResultBranch {
        return {
            weight: o.weight ?? 100,
            text: o.text,
            ...o.effects,
            nextEvent: ref(o.goto),
        };
    }

    // ================= 推进 =================

    /**
     * 选项结算后的接续入口（两端 UI 在 afterResult 里统一调用）：
     *   · branch.nextEvent 指向场景节点 → 更新 run.scene 并返回下一拍编译事件
     *   · 场景事件无后续 → 登记完结并返回 null
     *   · 普通事件连锁 → 维持原 cfg.events 查找语义
     */
    static followUp(ctx: GameCtx, ev: EventDef, branch: ResultBranch): EventDef | null {
        const nid = branch.nextEvent;
        if (nid?.startsWith(SCENE_REF_PREFIX)) {
            return this.gotoRef(ctx, nid.slice(SCENE_REF_PREFIX.length));
        }
        if (ev.id.startsWith(SCENE_REF_PREFIX)) {
            this.finishActive(ctx, ev.id.slice(SCENE_REF_PREFIX.length).split('/')[0]);
        }
        if (nid) return ctx.cfg.events.find(e => e.id === nid) ?? null;
        return null;
    }

    private static gotoRef(ctx: GameCtx, key: string): EventDef | null {
        const slash = key.indexOf('/');
        const sid = key.slice(0, slash);
        const nodeId = key.slice(slash + 1);
        const def = this.byId(ctx, sid);
        if (!def || !this.node(def, nodeId)) {
            this.finishActive(ctx, sid);      // 引用悬空：宁可完结也不卡死流程
            return null;
        }
        ctx.run.scene = { id: sid, nodeId };
        return this.compile(ctx, sid, nodeId);
    }
}
