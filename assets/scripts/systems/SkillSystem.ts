// 技能树引擎：XP/等级/分支/解锁/灵感系统
import { SKILL_CATEGORIES, XP_PER_LEVEL, MAX_SKILL_LEVEL, ACTION_XP,
         SKILL_BRANCHES, SKILL_NAMES, FEATURE_REGISTRY, type SkillCategory } from '../data/SkillDefs';
import type { GameCtx } from './RunModel';

export interface SkillBranchState {
    xp: number;       // 累计 XP
    level: number;    // computed level 0~10
}

export interface SkillsState {
    /** 5 条技能线的 XP 累计值（由各 action 累加） */
    xp: Record<SkillCategory, number>;
    /** 灵感点数（写日记/冥想积累，制作/烹饪时消耗） */
    inspiration: number;
    /** 已触发的灵感 buff 剩余次数 */
    inspirationCharges: number;
}

function computeLevel(xp: number): number {
    return Math.min(MAX_SKILL_LEVEL, Math.floor(xp / XP_PER_LEVEL));
}

export class SkillSystem {
    // ===== XP 管理 =====

    /** 给指定技能线授予 XP（自动计算等级） */
    static grant(ctx: GameCtx, category: SkillCategory, xp: number): void {
        const run = ctx.run;
        if (!run.skills) this.initSkills(ctx);
        run.skills!.xp[category] = (run.skills!.xp[category] ?? 0) + xp;
    }

    /** 根据行动 id 批量授予多条线的 XP */
    static grantForAction(ctx: GameCtx, actionId: string): void {
        const row = ACTION_XP[actionId];
        if (!row) return;
        const cats: SkillCategory[] = ['survival', 'combat', 'craft', 'knowledge', 'social'];
        for (let i = 0; i < 5; i++) {
            if (row[i] > 0) this.grant(ctx, cats[i], row[i]);
        }
        // 检查灵感触发
        this.checkInspiration(ctx, actionId);
    }

    /** 行动将获得的 XP 摘要（授予前调用，用于 UI 回执，如 "⭐+15生存 +3知识"） */
    static xpSummaryFor(_ctx: GameCtx, actionId: string): string {
        const row = ACTION_XP[actionId];
        if (!row) return '';
        const cats = SKILL_CATEGORIES;
        const parts: string[] = [];
        for (let i = 0; i < 5; i++) {
            if (row[i] > 0) parts.push(`+${row[i]}${SKILL_NAMES[cats[i]].replace(/^\S+\s/, '')}`);
        }
        return parts.length ? `⭐ ${parts.join(' ')}` : '';
    }

    // ===== 等级查询 =====

    /** 获取指定技能线的当前等级（0~10） */
    static level(ctx: GameCtx, category: SkillCategory): number {
        const xp = ctx.run.skills?.xp?.[category] ?? 0;
        return computeLevel(xp);
    }

    /** 获取指定技能线的当前 XP */
    static xp(ctx: GameCtx, category: SkillCategory): number {
        return ctx.run.skills?.xp?.[category] ?? 0;
    }

    /** 距下一级所需 XP */
    static xpToNext(ctx: GameCtx, category: SkillCategory): number {
        const cur = this.level(ctx, category);
        if (cur >= MAX_SKILL_LEVEL) return 0;
        const curXp = this.xp(ctx, category);
        return XP_PER_LEVEL - (curXp % XP_PER_LEVEL);
    }

    /** 全线总等级（用于某些全局门槛） */
    static totalLevel(ctx: GameCtx): number {
        if (!ctx.run.skills) return 0;
        let sum = 0;
        for (const c of SKILL_CATEGORIES) sum += this.level(ctx, c);
        return sum;
    }

    // ===== 分支与解锁 =====

    /** 检查某个分支是否已解锁（前置条件满足；branchId 支持跨线引用） */
    static branchUnlocked(ctx: GameCtx, branchId: string): boolean {
        const branch = SKILL_BRANCHES.find(b => b.id === branchId);
        if (!branch) return false;
        for (const pre of branch.prereq ?? []) {
            const targetBranchId = pre.branchId ?? pre.branch;
            const preBranch = SKILL_BRANCHES.find(b => b.id === targetBranchId);
            if (!preBranch) return false;
            if (this.branchLevel(ctx, targetBranchId) < pre.level) return false;
        }
        return true;
    }

    /** 获取某个分支的当前等级（= 所属线的等级，但分支解锁后才计级） */
    static branchLevel(ctx: GameCtx, branchId: string): number {
        const branch = SKILL_BRANCHES.find(b => b.id === branchId);
        if (!branch) return 0;
        if (!this.branchUnlocked(ctx, branchId)) return 0;
        return this.level(ctx, branch.category);
    }

    /** 检查某个特性是否已解锁 */
    static featureUnlocked(ctx: GameCtx, featureId: string): boolean {
        if (!ctx.run.skills) return false;
        for (const branch of SKILL_BRANCHES) {
            if (!this.branchUnlocked(ctx, branch.id)) continue;
            const lvl = this.branchLevel(ctx, branch.id);
            for (let l = 0; l < lvl && l < branch.unlocksByLevel.length; l++) {
                if (branch.unlocksByLevel[l].includes(featureId)) return true;
            }
        }
        return false;
    }

    /** 检查某条线是否达到指定等级（用于简单门槛） */
    static categoryAtLeast(ctx: GameCtx, category: SkillCategory, minLevel: number): boolean {
        return this.level(ctx, category) >= minLevel;
    }

    /** 检查分支达到指定等级（用于分支特定门槛） */
    static branchAtLeast(ctx: GameCtx, branchId: string, minLevel: number): boolean {
        return this.branchLevel(ctx, branchId) >= minLevel;
    }

    /** 下一级的解锁预告（数据派生：分支已开→列特性名；未开→提示前置），供 UI 展示 */
    static nextUnlockPreview(ctx: GameCtx, category: SkillCategory): string {
        const lv = this.level(ctx, category);
        const nextLv = Math.min(MAX_SKILL_LEVEL, lv + 1);
        const feats: string[] = [];
        let blockedBy = '';
        for (const b of SKILL_BRANCHES) {
            if (b.category !== category) continue;
            if (!this.branchUnlocked(ctx, b.id)) {
                const pre = (b.prereq ?? [])[0];
                if (pre) {
                    const pb = SKILL_BRANCHES.find(x => x.id === (pre.branchId ?? pre.branch));
                    const pn = pb ? `${SKILL_NAMES[pb.category].replace(/^\S+\s/, '')}·${pb.name}` : pre.branchId ?? pre.branch;
                    blockedBy = `前置：${pn} Lv${pre.level}`;
                }
                continue;
            }
            const unlocks = b.unlocksByLevel[nextLv - 1] ?? [];
            for (const fid of unlocks) {
                const f = FEATURE_REGISTRY.find(x => x.id === fid);
                if (f) feats.push(f.name);
            }
        }
        if (feats.length) return `Lv${nextLv} 解锁：${feats.slice(0, 3).join('、')}`;
        return blockedBy || `Lv${nextLv}`;
    }

    // ===== 灵感系统 =====

    /** 写日记/冥想有概率触发灵感 */
    private static checkInspiration(ctx: GameCtx, actionId: string): void {
        const run = ctx.run;
        if (!run.skills) return;
        let chance = 0;
        if (actionId === 'journal') chance = 15;
        else if (actionId === 'meditate') chance = 10;

        // 学者分支加成
        if (this.featureUnlocked(ctx, 'lore_knowledge')) chance += 5;

        if (chance > 0 && ctx.rng.chance(chance)) {
            run.skills.inspiration = Math.min(5, (run.skills.inspiration ?? 0) + 1);
        }
    }

    /** 消耗一次灵感（制作/烹饪时调用），返回是否消耗成功 */
    static consumeInspiration(ctx: GameCtx): boolean {
        const run = ctx.run;
        if (!run.skills || (run.skills.inspirationCharges ?? 0) > 0) return false;
        if ((run.skills.inspiration ?? 0) <= 0) return false;
        run.skills.inspiration--;
        run.skills.inspirationCharges = 3; // 3 次灵感 buff
        return true;
    }

    /** 检查当前是否有灵感 buff */
    static hasInspiration(ctx: GameCtx): boolean {
        return (ctx.run.skills?.inspirationCharges ?? 0) > 0;
    }

    /** 每次制作/烹饪后消耗一次灵感 charge */
    static tickInspirationCharge(ctx: GameCtx): void {
        if (ctx.run.skills && (ctx.run.skills.inspirationCharges ?? 0) > 0) {
            ctx.run.skills.inspirationCharges!--;
        }
    }

    // ===== 初始化 =====

    static initSkills(ctx: GameCtx): void {
        ctx.run.skills = {
            xp: { survival: 0, combat: 0, craft: 0, knowledge: 0, social: 0 },
            inspiration: 0,
            inspirationCharges: 0,
        };
    }
}
