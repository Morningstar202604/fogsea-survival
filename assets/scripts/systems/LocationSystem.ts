// 地点系统：解锁/冷却/存量枯竭/探索产出
import { EventEngine as _EE } from './EventEngine';
import type { LocationDef } from '../data/EventDefs';
import type { ItemStack } from '../data/ItemDefs';
import { InventorySystem } from './InventorySystem';
import { LootSystem } from './LootSystem';
import { StatusEffectSystem } from './StatusEffectSystem';
import type { GameCtx } from './RunModel';

export interface ExploreOutcome {
    locationId: string;
    baseYields: ItemStack[];
    chest: ReturnType<typeof LootSystem.openChest> | null;
    eventId: string | null;      // 命中的事件，由 GameView 接续弹出
}

export interface ExploreOptions {
    extraRiskPct?: number;   // 黄昏"贪一趟"风险加成（百分点）
    yieldMult?: number;      // 产出倍率
}

export class LocationSystem {
    static isUnlocked(ctx: GameCtx, id: string): boolean {
        return ctx.run.unlockedLocations.includes(id);
    }

    /** 已解锁地点定义列表（UI 动态生成按钮用） */
    static unlockedList(ctx: GameCtx): LocationDef[] {
        return ctx.cfg.locations.filter(l => this.isUnlocked(ctx, l.id));
    }

    static isOnCooldown(ctx: GameCtx, id: string): boolean {
        return (ctx.run.locationCooldowns[id] ?? 0) > 0;
    }

    /** 每天清晨调用：所有地点冷却 -1 */
    static tickCooldowns(ctx: GameCtx): void {
        for (const k of Object.keys(ctx.run.locationCooldowns)) {
            const v = ctx.run.locationCooldowns[k] - 1;
            if (v <= 0) delete ctx.run.locationCooldowns[k];
            else ctx.run.locationCooldowns[k] = v;
        }
    }

    static getDef(ctx: GameCtx, id: string): LocationDef {
        const def = ctx.cfg.locations.find(l => l.id === id);
        if (!def) throw new Error(`未知地点: ${id}`);
        return def;
    }

    /** UI 按钮/行动前检查：未解锁/冷却中/缺工具 */
    static canExplore(ctx: GameCtx, id: string): { ok: boolean; reason?: string } {
        if (!this.isUnlocked(ctx, id)) return { ok: false, reason: '尚未解锁' };
        if (this.isOnCooldown(ctx, id)) return { ok: false, reason: '迷雾尚未散去' };
        const def = this.getDef(ctx, id);
        if (def.requiresTool && InventorySystem.count(ctx, def.requiresTool) < 1) {
            return { ok: false, reason: `需要：火把` };
        }
        return { ok: true };
    }

    /**
     * 执行一次探索（调用方负责扣 AP 与解锁/冷却校验）
     * @param triggerEvent 返回要触发的事件 id（由 TimeSystem/GameView 决定如何弹）
     */
    static explore(
        ctx: GameCtx,
        locationId: string,
        opts: ExploreOptions | undefined,
        triggerEvent: (eventId: string | null) => void,
    ): ExploreOutcome {
        const gate = this.canExplore(ctx, locationId);
        if (!gate.ok) throw new Error(`无法探索 ${locationId}: ${gate.reason}`);
        const def = this.getDef(ctx, locationId);
        ctx.run.locationCooldowns[locationId] = def.cooldownDays;

        // ===== 枯竭机制：扣减存量，见底则无产出无宝箱（事件仍可能触发）=====
        const before = ctx.run.locationStock[locationId] ?? def.initialStock;
        const stock = Math.max(0, before - 1);
        ctx.run.locationStock[locationId] = stock;
        const depleted = stock <= 0;

        // 1. 保底产出 1~2 组（枯竭则跳过）
        const mult = (opts?.yieldMult ?? 1) * ctx.talent.lootMult;
        const baseYields: ItemStack[] = [];
        if (!depleted) {
            const yieldCount = ctx.rng.int(1, Math.min(2, def.baseYields.length));
            const picked = ctx.rng.shuffle(def.baseYields).slice(0, yieldCount);
            for (const y of picked) {
                const count = Math.max(1, Math.round(y.count * mult));
                baseYields.push({ itemId: y.itemId, count });
                InventorySystem.add(ctx, y.itemId, count);
            }
        }

        // 2. 追加宝箱（天气修正：晴+10pp / 浓雾-10pp；枯竭减半；数量吃 yieldMult）
        let chest: ExploreOutcome['chest'] = null;
        if (!depleted) {
            let cc = def.chestChance;
            if (ctx.run.weather === 'sunny') cc += 0.10;
            if (ctx.run.weather === 'fog_thick') cc -= 0.10;
            if (depleted) cc *= 0.5;
            if (ctx.rng.chance(Math.max(0, cc) * 100)) {
                chest = LootSystem.openChest(ctx, undefined, opts?.yieldMult ?? 1);
            }
        }

        // 3. 风险判定 → 地点事件池
        let eventId: string | null = null;
        const risk = Math.min(0.95, def.riskRate + (opts?.extraRiskPct ?? 0) / 100);
        if (ctx.rng.chance(risk * 100)) {
            const ev = _EE.pick(ctx, { poolType: 'explore', locationId });
            eventId = ev ? ev.id : null;
        }

        // 4. 雨天外出淋雨：12% 生病
        if (ctx.run.weather === 'rain' && ctx.rng.chance(12)) {
            StatusEffectSystem.add(ctx, 'sick');
        }

        triggerEvent(eventId);
        return { locationId, baseYields, chest, eventId };
    }

    /** 剩余可搜刮量 */
    static stockLeft(ctx: GameCtx, id: string): number {
        const def = this.getDef(ctx, id);
        return Math.max(0, ctx.run.locationStock[id] ?? def.initialStock);
    }
}
