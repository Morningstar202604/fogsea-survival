// 制作系统：配方校验与执行（含 T05 巧匠材料减免 + 品质系统 + 灵感）
import type { RecipeDef } from '../data/EventDefs';
import { InventorySystem } from './InventorySystem';
import { EventBus, GameEvents } from '../core/EventBus';
import type { GameCtx } from './RunModel';
import { SkillSystem } from './SkillSystem';

export type CraftQuality = 'normal' | 'fine' | 'master';

/** 品质加成倍率 */
const QUALITY_MULT: Record<CraftQuality, number> = { normal: 1, fine: 1.3, master: 1.6 };

export class CraftSystem {
    static getRecipe(ctx: GameCtx, id: string): RecipeDef {
        const r = ctx.cfg.recipes.find(x => x.id === id);
        if (!r) throw new Error(`未知配方: ${id}`);
        return r;
    }

    static isUnlocked(ctx: GameCtx, recipe: RecipeDef): boolean {
        return (recipe.unlockDay ?? 1) <= ctx.run.day;
    }

    /** T05：材料需求 -1（最低 1） */
    static effectiveCost(ctx: GameCtx, recipe: RecipeDef) {
        const reduce = ctx.talent.craftCostReduce;
        // 建造者分支额外减免
        const buildReduce = SkillSystem.featureUnlocked(ctx, 'build_cost_minus') ? 1 : 0;
        return recipe.costItems.map(c => ({
            itemId: c.itemId,
            count: Math.max(1, c.count - reduce - buildReduce),
        }));
    }

    static canCraft(ctx: GameCtx, recipe: RecipeDef): { ok: boolean; reason?: string } {
        if (!this.isUnlocked(ctx, recipe)) return { ok: false, reason: '尚未解锁' };
        if (recipe.needsFacility && !ctx.run.facilities.includes(recipe.needsFacility))
            return { ok: false, reason: `需要设施：${recipe.needsFacility}` };
        if (recipe.outputKind === 'shelterUpgrade' &&
            Number(recipe.outputId) !== ctx.run.shelterLevel + 1)
            return { ok: false, reason: '庇护所等级不符' };
        if (!InventorySystem.hasAll(ctx, this.effectiveCost(ctx, recipe)))
            return { ok: false, reason: '材料不足' };
        return { ok: true };
    }

    /** 计算本次制作品质 */
    static computeQuality(ctx: GameCtx): CraftQuality {
        const craftLv = SkillSystem.level(ctx, 'craft');
        const hasInspiration = SkillSystem.hasInspiration(ctx);
        if (craftLv >= 6 && hasInspiration) return 'master';
        if (craftLv >= 3) return 'fine';
        return 'normal';
    }

    /** 品质对应的倍率 */
    static qualityMult(quality: CraftQuality): number {
        return QUALITY_MULT[quality];
    }

    static craft(ctx: GameCtx, recipeId: string): { quality: CraftQuality } {
        const recipe = this.getRecipe(ctx, recipeId);
        const check = this.canCraft(ctx, recipe);
        if (!check.ok) throw new Error(`无法制作 ${recipeId}: ${check.reason}`);

        InventorySystem.removeMany(ctx, this.effectiveCost(ctx, recipe));

        // 计算品质
        const quality = this.computeQuality(ctx);
        if (quality !== 'normal') SkillSystem.tickInspirationCharge(ctx);

        switch (recipe.outputKind) {
            case 'item':
                InventorySystem.add(ctx, recipe.outputId, 1);
                break;
            case 'facility':
                if (!ctx.run.facilities.includes(recipe.outputId)) {
                    ctx.run.facilities.push(recipe.outputId);
                }
                if (recipe.outputId === 'campfire') {
                    ctx.run.fireFuel = (ctx.run.fireFuel ?? 0) + 2;
                }
                break;
            case 'shelterUpgrade':
                ctx.run.shelterLevel = Number(recipe.outputId);
                EventBus.emit(GameEvents.ShelterUpgraded, { level: ctx.run.shelterLevel });
                break;
        }

        // 授予制作 XP（灵感加成）
        const xpBonus = quality === 'master' ? 1.5 : quality === 'fine' ? 1.2 : 1;
        SkillSystem.grant(ctx, 'craft', Math.round(15 * xpBonus));

        return { quality };
    }
}
