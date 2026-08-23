// 世界频道：伪实时滚动器。文案池按天数区间过滤 + 节点插播，游标防重复
import { EventBus, GameEvents } from '../core/EventBus';
import type { ChatPool, ChatMessage } from '../data/TalentDefs';
import type { GameCtx } from './RunModel';

export interface ChatRoller {
    tick(dt: number): void;
    /** 立即从活跃池滚一条（模拟器/headless 用） */
    forceRoll(): void;
    /** 节点插播：天灾/事件联动强制指定池下一条 */
    inject(poolId: string): void;
    reset(): void;
}

export function createChatRoller(ctx: GameCtx): ChatRoller {
    let timer = 0;
    let nextInterval = rollInterval();

    function rollInterval(): number {
        // 90~180s；用 ctx.rng 保证可复现
        return 90 + ctx.rng.next() * 90;
    }

    function activePools(): ChatPool[] {
        return ctx.cfg.chatPools.filter(p =>
            (p.dayMin === undefined || ctx.run.day >= p.dayMin) &&
            (p.dayMax === undefined || ctx.run.day <= p.dayMax));
    }

    function pull(pool: ChatPool): ChatMessage {
        const cursor = ctx.run.chatCursors[pool.id] ?? 0;
        const msg = pool.messages[cursor % pool.messages.length];
        ctx.run.chatCursors[pool.id] = cursor + 1;
        return msg;
    }

    return {
        tick(dt: number): void {
            timer += dt;
            if (timer >= nextInterval) {
                timer = 0;
                nextInterval = rollInterval();
                this.forceRoll();
            }
        },

        forceRoll(): void {
            const pools = activePools();
            if (!pools.length) return;
            let total = 0;
            for (const p of pools) total += p.weight;
            let r = ctx.rng.next() * total;
            let pool = pools[0];
            for (const p of pools) {
                r -= p.weight;
                if (r < 0) { pool = p; break; }
            }
            EventBus.emit(GameEvents.ChatNew, pull(pool));
        },

        inject(poolId: string): void {
            const pool = ctx.cfg.chatPools.find(p => p.id === poolId);
            if (!pool?.messages?.length) return;
            EventBus.emit(GameEvents.ChatNew, pull(pool));
        },

        reset(): void {
            timer = 0;
            nextInterval = rollInterval();
        },
    };
}
