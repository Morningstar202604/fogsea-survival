// 制作系统：配方校验与执行（含 T05 巧匠材料减免）
import type { RecipeDef } from '../data/EventDefs';
import { InventorySystem } from './InventorySystem';
import { EventBus, GameEvents } from '../core/EventBus';
import type { GameCtx } from './RunModel';

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
        return recipe.costItems.map(c => ({
            itemId: c.itemId,
            count: Math.max(1, c.count - reduce),
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

    static craft(ctx: GameCtx, recipeId: string): void {
        const recipe = this.getRecipe(ctx, recipeId);
        const check = this.canCraft(ctx, recipe);
        if (!check.ok) throw new Error(`无法制作 ${recipeId}: ${check.reason}`);

        InventorySystem.removeMany(ctx, this.effectiveCost(ctx, recipe));

        switch (recipe.outputKind) {
            case 'item':
                InventorySystem.add(ctx, recipe.outputId, 1);
                break;
            case 'facility':
                if (!ctx.run.facilities.includes(recipe.outputId)) {
                    ctx.run.facilities.push(recipe.outputId);
                }
                break;
            case 'shelterUpgrade':
                ctx.run.shelterLevel = Number(recipe.outputId);
                EventBus.emit(GameEvents.ShelterUpgraded, { level: ctx.run.shelterLevel });
                break;
        }
    }
}
