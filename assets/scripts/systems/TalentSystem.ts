// 天赋运行时：把声明式 hooks 预编译成查询接口，各系统只问不判
import type { TalentDef, TalentHook } from '../data/TalentDefs';
import { weightedPickWith } from '../core/RNG';
import type { RNG } from '../core/RNG';

export class TalentRuntime {
    private hooks: TalentHook[];

    constructor(private def: TalentDef | null) {
        this.hooks = def?.hooks ?? [];
    }

    get id(): string | null {
        return this.def?.id ?? null;
    }

    has(id: string): boolean {
        return this.def?.id === id;
    }

    /** T02 物资增幅：产出倍率 */
    get lootMult(): number {
        const h = this.hooks.find(h => h.type === 'lootMult') as
            | { type: 'lootMult'; mult: number } | undefined;
        return h?.mult ?? 1;
    }

    /** T03 守夜人：夜间恶性事件概率系数 */
    get nightRiskFactor(): number {
        const h = this.hooks.find(h => h.type === 'nightRiskFactor') as
            | { type: 'nightRiskFactor'; factor: number } | undefined;
        return h?.factor ?? 1;
    }

    /** T04 铁胃：脏食脏水副作用概率系数 */
    get dirtyConsumeFactor(): number {
        const h = this.hooks.find(h => h.type === 'dirtyConsumeFactor') as
            | { type: 'dirtyConsumeFactor'; factor: number } | undefined;
        return h?.factor ?? 1;
    }

    /** T05 巧匠：制作材料减免 */
    get craftCostReduce(): number {
        const h = this.hooks.find(h => h.type === 'craftCostReduce') as
            | { type: 'craftCostReduce'; n: number } | undefined;
        return h?.n ?? 0;
    }

    /** T06 猎手：战斗成功率加成（百分点） */
    get combatBonusPct(): number {
        const h = this.hooks.find(h => h.type === 'combatBonus') as
            | { type: 'combatBonus'; pct: number } | undefined;
        return h?.pct ?? 0;
    }

    /** T07 囤积者：背包扩容 */
    get bagCapacityAdd(): number {
        const h = this.hooks.find(h => h.type === 'bagCapacityAdd') as
            | { type: 'bagCapacityAdd'; n: number } | undefined;
        return h?.n ?? 0;
    }

    /** T08 福星：宝箱升档概率 */
    get chestUpgradeChancePct(): number {
        const h = this.hooks.find(h => h.type === 'chestUpgradeChance') as
            | { type: 'chestUpgradeChance'; pct: number } | undefined;
        return h?.pct ?? 0;
    }

    /** T09 社牛：每 N 天收到赠礼 */
    get giftEveryNDays(): number | null {
        const h = this.hooks.find(h => h.type === 'giftEveryNDays') as
            | { type: 'giftEveryNDays'; n: number } | undefined;
        return h ? h.n : null;
    }

    /** T11 渔夫：钓鱼成功率加成（百分点） */
    get fishingBonusPct(): number {
        const h = this.hooks.find(h => h.type === 'fishingBonus') as
            | { type: 'fishingBonus'; pct: number } | undefined;
        return h?.pct ?? 0;
    }

    /** T12 妙手回春：医疗物品效果倍率 */
    get medicFactor(): number {
        const h = this.hooks.find(h => h.type === 'medicFactor') as
            | { type: 'medicFactor'; factor: number } | undefined;
        return h?.factor ?? 1;
    }
}

export class TalentSystem {
    /** 命运三选一：均匀抽 3 张再由玩家选（UI 层调用 draw3 后展示） */
    static draw3(pool: TalentDef[], rng: RNG): TalentDef[] {
        if (pool.length < 3) throw new Error('天赋池不足 3 个');
        const bag = pool.slice();
        const out: TalentDef[] = [];
        while (out.length < 3) {
            const picked = weightedPickWith(rng, bag.map(t => ({ ...t, weight: 1 })));
            out.push(picked);
            bag.splice(bag.findIndex(t => t.id === picked.id), 1);
        }
        return out;
    }

    static buildRuntime(def: TalentDef | null): TalentRuntime {
        return new TalentRuntime(def);
    }
}
