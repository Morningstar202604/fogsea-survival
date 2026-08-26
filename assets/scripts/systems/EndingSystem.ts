// 结局判定链：短路求值，保证同帧多条件命中时结局唯一且确定
// 优先级：
//   1. 事件直设 run.endingId
//   2. hp<=0 → 按致死原因细分 E08~E12
//   3. SAN 崩溃连续 >=3 天 → E07
//   4/5. D15 夜结算 → 信号手段分档 E01/E02/E03/E04
import type { GameCtx } from './RunModel';

export interface DeathHint {
    duringNightEvent?: boolean;   // 死于夜间事件战败
    duringBeastTide?: boolean;    // 死于兽潮守屋战
}

export class EndingSystem {
    static evaluate(ctx: GameCtx, death: DeathHint = {}): string | null {
        const run = ctx.run;

        // 1. 事件直设（如隐藏结局 E05 迷雾之眼）
        if (run.endingId) return run.endingId;

        // 2. 死亡细分
        if (run.stats.hp <= 0) {
            if (death.duringBeastTide) return 'E12';
            if (death.duringNightEvent) return 'E11';
            if (run.statuses.some(s => ['sick', 'poisoned', 'hypothermia', 'acid_burn'].includes(s.id)))
                return 'E10';                                    // 病榻
            if (run.stats.thirst <= 0) return 'E08';             // 干渴
            if (run.stats.hunger <= 0) return 'E09';             // 饥饿
            return 'E11';
        }

        // 3. 崩溃
        if (run.sanZeroStreak >= 3) return 'E07';

        // 4/5. 第 15 天夜结算：信号手段分档（同行者优先于普通信号结局）
        if (run.day >= 15 && run.phase === 'night') {
            const laokWith = run.companion !== null ||
                (run.flags.includes('laok_ally') &&
                 run.flags.includes('laok_trust') &&
                 !run.flags.includes('laok_betrayed') &&
                 !run.flags.includes('laok_gone'));
            if (laokWith) return 'E06';                           // 同行者
            // 隐藏：守望者的日记 —— 长期记录 + 救援进度 + 收音机
            if ((run.counters.journal ?? 0) >= 10 &&
                (run.counters.rescueProgress ?? 0) >= 2 &&
                run.facilities.includes('radio')) return 'E13';
            // 隐藏：不散的篝火 —— 与小女孩线建立深厚羁绊
            if (run.flags.includes('kid_saved')) return 'E14';
            if (run.flags.includes('radio_done') || run.facilities.includes('radio')) return 'E01';
            if (run.flags.includes('flare_used')) return 'E02';   // 信号弹
            if (run.facilities.includes('signal_pile')) return 'E03';
            return 'E04';                                         // 平凡的等待
        }

        return null;
    }

    static finish(ctx: GameCtx, endingId: string): void {
        ctx.run.endingId = endingId;
        ctx.cfg.endings.find(e => e.id === endingId); // 存在性由配置校验保证
    }
}
