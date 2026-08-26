// ===== 章节系统（v0.5）：给整个游戏提供"锚"=====
// 五章结构，每章 = 天数区间 + 入章必发大事件 + 系统性修正。
// 无论玩家中间做了什么，到达章节点必然触发转场——这是节奏的骨架。
import type { GameCtx } from './RunModel';

export interface ChapterDef {
    id: number;               // 1~5
    name: string;
    startDay: number;
    endDay: number;
    introTitle: string;
    introText: string;
    /** 入章必发的大事件 id（story 类，once） */
    anchorEventId: string;
}

export const CHAPTERS: ChapterDef[] = [
    {
        id: 1, name: '第一章 · 觉醒', startDay: 1, endDay: 3,
        introTitle: '第一章 · 觉醒',
        introText: '迷雾降临第三天。你学会了活下去的三件事：吃、喝、天黑回屋。\n但今晚之后，雾里的规矩变了——世界频道开始有人做起了生意。',
        anchorEventId: 'evt_ch1_market',
    },
    {
        id: 2, name: '第二章 · 扎根', startDay: 4, endDay: 6,
        introTitle: '第二章 · 扎根',
        introText: '木屋不再是藏身处，而是家。你认识了邻居、搭起了火堆、甚至有了自己的日程。\n可雾也在扎根——它开始有了规律，像是某种呼吸。',
        anchorEventId: 'evt_ch2_breath',
    },
    {
        id: 3, name: '第三章 · 暗流', startDay: 7, endDay: 9,
        introTitle: '第三章 · 暗流',
        introText: '世界频道变得安静了。以前每天几百条消息，现在只剩零星几句。\n有人不再上线。你开始明白"消失"在这个世界里意味着什么。',
        anchorEventId: 'evt_ch3_silence',
    },
    {
        id: 4, name: '第四章 · 低语', startDay: 10, endDay: 12,
        introTitle: '第四章 · 低语',
        introText: '雾里开始有人叫你的名字——用你死去亲人的声音。\n而更深的地方，结晶的光越来越亮，像在传递某个讯息。',
        anchorEventId: 'evt_ch4_whisper',
    },
    {
        id: 5, name: '第五章 · 终局', startDay: 13, endDay: 15,
        introTitle: '第五章 · 终局',
        introText: '广播恢复了：救援编队已进入大雾区，三天内过境。\n所有还活着的人都在做最后一件事——等待，或者被等待。',
        anchorEventId: 'evt_ch5_final',
    },
];

export interface ChapterModifiers {
    /** 夜间事件概率倍率 */
    nightChanceMult: number;
    /** 危机事件权重倍率 */
    crisisWeightMult: number;
    /** 剧情(故事)权重倍率 */
    storyWeightMult: number;
    /** 行情因子偏移（正=商人更黑） */
    priceBias: number;
    /** 每晚额外 SAN 流失 */
    extraNightSanDrain: number;
}

const MODS: Record<number, ChapterModifiers> = {
    1: { nightChanceMult: 0.90, crisisWeightMult: 1.00, storyWeightMult: 1.00, priceBias: -0.05, extraNightSanDrain: 0 },
    2: { nightChanceMult: 1.00, crisisWeightMult: 1.15, storyWeightMult: 1.20, priceBias: 0.00, extraNightSanDrain: 0 },
    3: { nightChanceMult: 1.20, crisisWeightMult: 1.30, storyWeightMult: 1.40, priceBias: 0.06, extraNightSanDrain: 1 },
    4: { nightChanceMult: 1.30, crisisWeightMult: 1.40, storyWeightMult: 2.00, priceBias: 0.10, extraNightSanDrain: 2 },
    5: { nightChanceMult: 1.35, crisisWeightMult: 1.50, storyWeightMult: 1.60, priceBias: 0.12, extraNightSanDrain: 2 },
};

export class ChapterSystem {
    static def(chapterId: number): ChapterDef {
        return CHAPTERS.find(c => c.id === chapterId) ?? CHAPTERS[0];
    }

    static current(ctx: GameCtx): ChapterDef {
        const day = ctx.run.day;
        return CHAPTERS.find(c => day >= c.startDay && day <= c.endDay) ?? CHAPTERS[CHAPTERS.length - 1];
    }

    /**
     * 清晨同步：推进章节。返回入章大事件 id（仅当刚换章），否则 null。
     * 章节 id 记录在 counters.chapter，兼容旧档（缺省按天数推导）。
     */
    static sync(ctx: GameCtx): string | null {
        const ch = this.current(ctx);
        const prev = ctx.run.counters.chapter ?? 1;
        ctx.run.counters.chapter = ch.id;
        if (ch.id !== prev && !ctx.run.flags.includes(`chapter_${ch.id}_seen`)) {
            ctx.run.flags.push(`chapter_${ch.id}_seen`);
            return ch.anchorEventId;
        }
        return null;
    }

    /** 当前章的系统修正（供 TimeSystem/EventEngine/TradingSystem 查询） */
    static modifiers(ctx: GameCtx): ChapterModifiers {
        return MODS[this.current(ctx).id] ?? MODS[1];
    }
}
