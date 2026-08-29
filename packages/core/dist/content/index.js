/**
 * 试玩版 ContentPack：仅用于引擎冒烟测试与本地起服占位。
 * Phase 2 将由迁移脚本生成的完整版（44 场剧本 + 事件池 + 14 结局）覆盖此导出。
 */
export const demoContent = {
    version: 1,
    storyline: {
        id: 'demo',
        title: '迷雾降临（试玩）',
        desc: '精简试玩版，用于验证引擎跑通。完整剧本将在 Phase 2 迁入。',
        initialScene: 'start',
        scenes: {
            start: {
                id: 'start',
                text: '迷雾从窗缝渗进木屋。你握紧手里的撬棍——必须撑到救援来临。',
                choices: [
                    {
                        id: 'search',
                        text: '翻找储物柜',
                        hint: '可能找到食物',
                        effects: [{ kind: 'resource', resource: 'food', delta: 12 }],
                        next: 'after_search',
                    },
                    {
                        id: 'rest',
                        text: '躺下休息',
                        effects: [{ kind: 'resource', resource: 'energy', delta: 15 }],
                        next: 'after_rest',
                    },
                ],
            },
            after_search: {
                id: 'after_search',
                text: '你找到几罐罐头，塞进了背包。',
                choices: [{ id: 'back', text: '回到木屋', effects: [], next: 'start' }],
            },
            after_rest: {
                id: 'after_rest',
                text: '体力恢复了一些，但雾似乎更浓了。',
                choices: [{ id: 'back', text: '回到木屋', effects: [], next: 'start' }],
            },
        },
        endings: {
            E_survive: { id: 'E_survive', title: '幸存者', desc: '你活到了救援抵达的那天。', category: 'good' },
            death: { id: 'death', title: '消失于雾', desc: '你倒在了冰冷的地板上。', category: 'death' },
        },
    },
    randomEvents: [
        {
            id: 'evt_howl',
            weight: 35,
            minDay: 1,
            maxTriggers: -1,
            text: '远处传来低沉的嚎叫，像是什么大型野兽在徘徊。',
            choices: [{ id: 'hide', text: '屏息躲藏', effects: [{ kind: 'flag', flag: 'heard_howl' }], next: '__return__' }],
        },
    ],
    income: [
        { resource: 'food', delta: -8 },
        { resource: 'water', delta: -8 },
    ],
    startingResources: { food: { current: 70, max: 100 }, water: { current: 70, max: 100 } },
};
//# sourceMappingURL=index.js.map