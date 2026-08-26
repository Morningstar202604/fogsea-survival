// 关系/好感度系统：以 counters 存储的 0~100 数值，驱动交易折扣、专属剧情与结局评分
// 设计要点：
//   rel(NPC) ∈ [0,100]，增益事件走 EventEngine.applyEffects 的 setFlags 不适合数值，
//   故直接落 run.counters['rel_'+npcId]；旧档无该键时视为初始值 init。
import type { GameCtx } from './RunModel';

export type NpcId = 'laok' | 'kid' | 'doc' | 'ratking' | 'rescue';

export const NPC_INIT: Record<NpcId, number> = {
    laok: 30,      // 老K：入队即有战友情基础
    kid: 10,       // 小女孩（剧情线）
    doc: 20,       // 老医生（交易常客）
    ratking: 0,    // 鼠王（喂食线）
    rescue: 0,     // 救援队进度折算
};

export class RelationshipSystem {
    static get(ctx: GameCtx, npc: NpcId): number {
        return ctx.run.counters[`rel_${npc}`] ?? NPC_INIT[npc];
    }

    /** 增减好感度，钳制 [0,100]；delta 可为负 */
    static add(ctx: GameCtx, npc: NpcId, delta: number): number {
        const v = Math.max(0, Math.min(100, this.get(ctx, npc) + delta));
        ctx.run.counters[`rel_${npc}`] = v;
        return v;
    }

    /** 阶梯标签：供 UI 与事件 conditions.flags 近似使用 */
    static tier(ctx: GameCtx, npc: NpcId): 'stranger' | 'friendly' | 'trusted' | 'bonded' {
        const v = this.get(ctx, npc);
        if (v >= 80) return 'bonded';
        if (v >= 55) return 'trusted';
        if (v >= 30) return 'friendly';
        return 'stranger';
    }

    /** 全部关系分之和（结局评分向量的一维） */
    static totalBond(ctx: GameCtx): number {
        return (Object.keys(NPC_INIT) as NpcId[]).reduce((s, n) => s + this.get(ctx, n), 0);
    }
}
