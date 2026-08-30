export const NPC_ROSTER = [
    {
        id: 'duoduo',
        name: '朵朵',
        title: '邻家的妹妹',
        linePrefix: 'duoduo_',
        entryScene: 'duoduo_s1_meet',
        description: '在便利店废墟里遇到的女孩，把你的木屋当成了全世界的安全岛。',
    },
    {
        id: 'laok',
        name: '老K',
        title: '沉默的巡逻者',
        linePrefix: 'laok_',
        entryScene: 'laok_s1_pact',
        description: '前特种兵，话少枪稳。他守夜的时候，你能睡个整觉。',
    },
    {
        id: 'doc',
        name: '林医生',
        title: '雾中的医者',
        linePrefix: 'doc_',
        entryScene: 'doc_s1_housecall',
        description: '背着药箱挨家问诊的执拗人。在雾海里，一板抗生素比黄金贵。',
    },
    {
        id: 'rat',
        name: '鼠王',
        title: '下水道的君主',
        linePrefix: 'rat_',
        entryScene: 'rat_s1_return',
        description: '地下的情报贩子与规则制定者。他认识每一个人，包括不该认识的人。',
    },
    {
        id: 'rescue',
        name: '救援队',
        title: '无线电那头的声音',
        linePrefix: 'rescue_',
        entryScene: 'rescue_s1_wreck',
        description: '7 号避难所的幸存者们。信号接通的那一刻，雾海不再只有你一个人。',
    },
    {
        id: 'crystal',
        name: '结晶之声',
        title: '矿脉的低语',
        linePrefix: 'crystal_',
        entryScene: 'crystal_s1_vein',
        description: '紫色结晶里的存在。它自称朋友——雾里的东西都这么说。',
    },
];
/** 羁绊等级（0-100 好感度映射） */
const FAVOR_LEVELS = [
    { min: 80, name: '生死之交' },
    { min: 55, name: '挚友' },
    { min: 30, name: '信赖' },
    { min: 10, name: '相识' },
    { min: 0, name: '陌生' },
];
/** 汇总全体 NPC 羁绊状态（纯函数，UI 直接消费）。 */
export function getNpcStatuses(state) {
    const visited = new Set(state.visitedScenes ?? []);
    return NPC_ROSTER.map((npc) => {
        let favor = 0;
        for (const sceneId of visited) {
            if (sceneId.startsWith(npc.linePrefix))
                favor += 12;
        }
        const done = !!state.flags[`line_done_${npc.entryScene}`];
        if (done)
            favor += 10;
        favor = Math.min(100, favor);
        const levelName = FAVOR_LEVELS.find((l) => favor >= l.min)?.name ?? '陌生';
        return { ...npc, favor, levelName, lineDone: done };
    });
}
//# sourceMappingURL=npc.js.map