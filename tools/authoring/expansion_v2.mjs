// ===== v0.8 世界内容扩展：config patches + 3 新事件池 + 12幕手写场景 =====
// 用法: node tools/authoring/expansion_v2.mjs
// 产出:
//   assets/resources/configs/{items,recipes,locations,disasters,chat_pools}.json  (patch)
//   assets/resources/configs/events/{fog_versions,fog_neighbors,fog_regions_explore}.json  (new)
//   assets/resources/configs/scenes.json  (append 12 scenes)
//   assets/resources/configs/events/fog_story2.json  (patch met-flags)
import { readFileSync, writeFileSync } from 'node:fs';
const CFG = 'assets/resources/configs/';
const rd = p => JSON.parse(readFileSync(CFG + p, 'utf8').replace(/^\uFEFF/, ''));
const wr = (p, d) => writeFileSync(CFG + p, JSON.stringify(d, null, 2) + '\n', 'utf8');

// ─── 1. items.json + crystal torch ──────────────────────────────────────────
const itemsObj = rd('items.json');
const items = itemsObj.items || itemsObj;
items.push({
    id: 'tool_crystal_torch', name: '晶石提灯', category: 'tool', stackable: true,
    maxStack: 2, icon: 'crystal_lamp', desc: '以雾中结晶制成的提灯，散发冷蓝色微光。迷雾中的低语似乎对它有所忌惮。',
    use: { sanity: 12 }
});
writeFileSync(CFG + 'items.json', JSON.stringify({ items }, null, 2) + '\n', 'utf8');
console.log('✓ items.json + tool_crystal_torch');

// ─── 2. recipes.json + crystal lamp ─────────────────────────────────────────
const recObj = rd('recipes.json');
const recs = recObj.recipes || recObj;
recs.push({
    id: 'craft_crystal_lamp', name: '晶石提灯',
    costItems: [{ itemId: 'key_mist_crystal', count: 1 }, { itemId: 'mat_wood', count: 1 }],
    outputKind: 'item', outputId: 'tool_crystal_torch', unlockDay: 11,
    desc: '将结晶嵌入木框。提灯亮起的刹那，雾气竟主动退开半步。'
});
writeFileSync(CFG + 'recipes.json', JSON.stringify({ recipes: recs }, null, 2) + '\n', 'utf8');
console.log('✓ recipes.json + craft_crystal_lamp');

// ─── 3. locations.json + 3 new locations ────────────────────────────────────
const locsObj = rd('locations.json');
const locs = locsObj.locations || locsObj;
locs.push(
    {
        id: 'crystal_hollow', name: '结晶洞', unlockDay: 11, cooldownDays: 2,
        initialStock: 6, riskRate: 0.55, chestChance: 0.45, requiresTool: 'tool_crystal_torch',
        baseYields: [{ itemId: 'key_mist_crystal', count: 1 }, { itemId: 'mat_stone', count: 2 }],
        dangerLevel: 4
    },
    {
        id: 'ruin_laomao', name: '三楼老猫的废墟', unlockDay: 99, cooldownDays: 2,
        initialStock: 8, riskRate: 0.40, chestChance: 0.50,
        baseYields: [{ itemId: 'med_bandage', count: 1 }, { itemId: 'food_canned', count: 1 }, { itemId: 'mat_cloth', count: 2 }],
        dangerLevel: 3
    },
    {
        id: 'ruin_laozhou', name: '南墙根老周家遗址', unlockDay: 99, cooldownDays: 2,
        initialStock: 8, riskRate: 0.35, chestChance: 0.45,
        baseYields: [{ itemId: 'mat_wood', count: 3 }, { itemId: 'food_canned', count: 2 }, { itemId: 'mat_rope', count: 1 }],
        dangerLevel: 2
    }
);
wr('locations.json', { locations: locs });
console.log('✓ locations.json +3 (crystal_hollow, ruin_laomao, ruin_laozhou)');

// ─── 4. disasters.json + mist tides ────────────────────────────────────────
const disObj = rd('disasters.json');
const dis = disObj.disasters || disObj;
// Insert D7 mist_tide_small and D11 mist_tide_big, keep sorted by dueDay
dis.push(
    {
        id: 'mist_tide_small', name: '🌫 雾潮', dueDay: 7, durationDays: 1,
        nightCheck: { passIfAnyOf: ['campfire', 'door_bolt'], failHpLoss: -10, failSanityLoss: -12 },
        chatPoolId: 'link_mist_tide'
    },
    {
        id: 'mist_tide_big', name: '🌫 大雾潮', dueDay: 11, durationDays: 1,
        nightCheck: { passIfAnyOf: ['shelter>=3', 'door_bolt', 'campfire'], failHpLoss: -16, failSanityLoss: -14, passHpLoss: -4 },
        chatPoolId: 'link_mist_tide'
    }
);
dis.sort((a, b) => a.dueDay - b.dueDay);
wr('disasters.json', { disasters: dis });
console.log('✓ disasters.json +2 (mist_tide_small D7, mist_tide_big D11)');

// ─── 5. chat_pools.json + 6 new pools ──────────────────────────────────────
const cpObj = rd('chat_pools.json');
const pools = cpObj.chatPools || cpObj;
pools.push(
    { id: 'neighbors_intro', weight: 8, dayMin: 2, dayMax: 3, messages: [
        { nick: '铁蛋杂货铺', text: '东区铁蛋 做过三年批发生意 现在什么都能换 需要的私聊' },
        { nick: '三楼老猫',   text: '三楼有猫三只 人一个 求购猫粮 猫粮比我的命重要' },
        { nick: '南墙根老周', text: '老周一家四口 都在 南墙根搭了棚子 有孩子玩伴的联系' },
        { nick: '直播达人小美', text: '家人们谁懂啊 穿越第2天还在直播 没信号但仪式感要有' },
        { nick: '理性分析',   text: '刚统计了频道发言人数 还剩217个 等你们报平安' },
        { nick: '干饭第一名', text: '铁蛋你那儿有辣酱吗 我用两个罐头换' }
    ]},
    { id: 'neighbors_up', weight: 10, dayMin: 4, dayMax: 7, messages: [
        { nick: '铁蛋杂货铺', text: '三天跑了七趟超市 攒了20罐 够本了' },
        { nick: '三楼老猫',   text: '猫们今天抓了只老鼠 我还没决定要不要吃' },
        { nick: '南墙根老周', text: '老大今天学会系鞋带了 这种日子还有新技能get' },
        { nick: '直播达人小美', text: '开了个生存技巧专栏 粉丝0 但我在坚持' },
        { nick: '铁蛋杂货铺', text: '南墙根老周你那木头多吗 换两根绳子' },
        { nick: '三楼老猫',   text: '等风来你那个手电筒卖吗 开个价' },
        { nick: '南墙根老周', text: '小孩的衣服有没有人要 我家老大穿不下了' },
        { nick: '直播达人小美', text: '刚在超市翻到一面镜子 化妆都不用 照照自己确认还活着' }
    ]},
    { id: 'neighbors_fall', weight: 10, dayMin: 8, dayMax: 12, messages: [
        { nick: '三楼老猫',   text: '猫粮断了两天了……它们已经开始看我了' },
        { nick: '南墙根老周', text: '东边那片雾越来越浓 老周家得挪地方了' },
        { nick: '直播达人小美', text: '三天没开播了 电池还剩一格 省着' },
        { nick: '铁蛋杂货铺', text: '收金属件 急收 有偿 高价' },
        { nick: '三楼老猫',   text: '大花今天没回来……' },
        { nick: '南墙根老周', text: '小的发烧了 有没有退烧药 布洛芬也行' },
        { nick: '直播达人小美', text: '听到了外面有东西在跑 不是人' },
        { nick: '三楼老猫',   text: '二花也没回来。' }
    ]},
    { id: 'neighbors_last', weight: 8, dayMin: 13, dayMax: 15, messages: [
        { nick: '铁蛋杂货铺', text: '最后的货 全部半价 有人活着就拿走' },
        { nick: '直播达人小美', text: '明天如果救援来 我一定播出来' },
        { nick: '南墙根老周', text: '孩子没事 我在 你们也在' },
        { nick: '等风来',     text: '一周前217个人 现在……不知道了' },
        { nick: '理性分析',   text: '救援确认 明天到 坚持住' },
        { nick: '干饭第一名', text: '最后的罐头 分给邻居们了 大家活着见' }
    ]},
    { id: 'link_mist_tide', weight: 5, messages: [
        { nick: '系统频道',   text: '【雾潮预警】迷雾浓度异常上升，今夜视野将降至零' },
        { nick: '夜猫子',     text: '雾在涨……窗外什么都看不见了' },
        { nick: '三楼老猫',   text: '猫在叫 雾里有东西' },
        { nick: '理性分析',   text: '火光能驱散雾气 有火堆的赶紧点' },
        { nick: '阿巴阿巴',   text: '雾里好像有人在叫我的名字……' },
        { nick: '等风来',     text: '雾退了 它退了！！' }
    ]},
    { id: 'rank_chatter', weight: 6, dayMin: 4, dayMax: 12, messages: [
        { nick: '铁蛋杂货铺', text: '排行榜出了？我排第几' },
        { nick: '干饭第一名', text: '第12名 还行 比上不足比下有余' },
        { nick: '隔壁老王',   text: '我连榜都没上 是不是被忘了' },
        { nick: '理性分析',   text: '排行榜算法：庇护所等级×3+技能总和×2+存活天数' },
        { nick: '三楼老猫',   text: '猫不算分吗 那我肯定低' },
        { nick: '咸鱼翻身',   text: '第3！庇护所升满+采集拉满 稳了' },
        { nick: '夜猫子',     text: '第47 算了 反正最后看谁活着' },
        { nick: '直播达人小美', text: '我的直播算内容创作分吗 那我该第一' }
    ]}
);
wr('chat_pools.json', { chatPools: pools });
console.log('✓ chat_pools.json +6 pools');

// ─── 6. fog_versions.json — 版本公告 + 排行榜阶梯 ──────────────────────────
const fog_versions = [
    // ── v1.1 公告 + 排行榜命名 ──────────────────────────────────────────────
    {
        id: 'evt_v110_patch', type: 'story', dayMin: 3, dayMax: 4, once: true,
        text: `【世界公告】迷雾纪元 v1.1 补丁已部署——\n\n■ 「区域排行榜」上线：生存者按庇护所、技能、存活天数排名\n■ 你已被分配至「东七区」。请为你的据点命名，称号将同步至全区域频道。\n\n⚠ 迷雾浓度上升：夜行生物变得更活跃，请加固庇护所。`,
        options: [
            { text: '命名为「灯塔小筑」', results: [{ setFlags: ['terr_a'], sanityDelta: 4, text: '【据点命名成功】灯塔小筑——愿它成为迷雾中的坐标。' }] },
            { text: '命名为「野猫窝」',   results: [{ setFlags: ['terr_b'], sanityDelta: 4, text: '【据点命名成功】野猫窝——你取的，你开心就好。' }] },
            { text: '命名为「铁皮屋」',   results: [{ setFlags: ['terr_c'], sanityDelta: 4, text: '【据点命名成功】铁皮屋——朴实无华，但很结实。' }] }
        ]
    },
    // ── 排行榜阶梯第1阶段（D4当天链入）──────────────────────────────────────
    {
        id: 'evt_rank_d4', type: 'story', dayMin: 4, dayMax: 4, once: true,
        text: '【排行榜速报】东七区第1期排名出炉——\n\n你当前排位：#7 / 187人\n当前榜首「咸鱼翻身」庇护所Lv3 + 采集满级。\n\n提示：提升庇护所等级和技能可快速升榜。排名影响每周补给箱品质。',
        options: [
            { text: '继续努力',  results: [{ setFlags: ['rank_mid'], hpDelta: 0, text: '排名中游，不急不躁。' }] },
            { text: '争取前十',  results: [{ setFlags: ['rank_mid'], hpDelta: 0, text: '前十在望，差一点。' }] },
            { text: '无所谓排名', results: [{ setFlags: ['rank_low'], hpDelta: 0, text: '你关掉了排行榜。活命要紧。' }] }
        ]
    },
    // ── v1.5 雾潮协议 + 联合地图消费 ────────────────────────────────────────
    {
        id: 'evt_v115_patch', type: 'story', dayMin: 7, dayMax: 7, once: true,
        text: `【世界公告】迷雾纪元 v1.5 补丁已部署——\n\n■ 「雾潮协议」生效：迷雾浓度周期性波动，今夜将出现第1次雾潮\n■ 结晶矿脉在浓雾区被探测到（解锁新区域：结晶洞）\n\n⚠ 夜间需火光或门闩抵御雾潮侵袭。`,
        options: [
            { text: '上报你的联合地图（+knowledge）', requires: { flags: ['lk_joint_map'] },
              results: [{ skillXp: { knowledge: 25 }, setFlags: ['patch115'], text: '你将联合勘测地图上传至区域频道。系统奖励knowledge经验+25。' }] },
            { text: '仔细阅读协议条款', results: [{ skillXp: { knowledge: 10 }, setFlags: ['patch115'], text: '你逐条阅读了雾潮协议。knowledge经验+10。' }] },
            { text: '关掉公告', results: [{ setFlags: ['patch115'], text: '你看了一眼就关掉了。' }] }
        ]
    },
    // ── v2.0 灵潮复苏 ────────────────────────────────────────────────────────
    {
        id: 'evt_v120_patch', type: 'story', dayMin: 11, dayMax: 11, once: true,
        text: `【世界公告】迷雾纪元 v2.0 补丁已部署——\n\n■ 「灵潮复苏」：结晶能量开始渗透迷雾，技能经验获取效率+50%（持续至第15天）\n■ 新配方解锁：晶石提灯（结晶×1 + 木×1 → 晶石提灯）\n■ 区域频道扩容：支持跨区通讯\n\n⚠ 大型雾潮将在今夜来袭。`,
        options: [
            { text: '研究灵潮现象', results: [{ skillXp: { knowledge: 20, survival: 10 }, setFlags: ['patch200'], text: '灵潮的能量波纹在你指尖跃动。knowledge+20 survival+10。' }] },
            { text: '赶制晶石提灯', results: [{ skillXp: { craft: 15 }, setFlags: ['patch200'], text: '你立即动手制作提灯。craft+15。' }] }
        ]
    },
    // ── 排行榜阶梯第2阶段（D8，3个变体各自独立事件）────────────────────────
    {
        id: 'evt_rank_d8_high', type: 'story', dayMin: 8, dayMax: 8, once: true, conditions: { flags: ['rank_high'] },
        text: '【排行榜速报】第2期——你排位 #3 / 179人（存活率下降中）\n\n「铁蛋杂货铺」私聊你：大佬 你那庇护所怎么升的 教教呗？',
        options: [
            { text: '分享经验', results: [{ sanityDelta: 5, text: '你热心回复了铁蛋。分享让人快乐。' }] },
            { text: '保持神秘', results: [{ text: '你已读不回。排行榜上的人都很忙。' }] }
        ]
    },
    {
        id: 'evt_rank_d8_mid', type: 'story', dayMin: 8, dayMax: 8, once: true, conditions: { flags: ['rank_mid'] },
        text: '【排行榜速报】第2期——你排位 #9 / 179人\n\n距前十差1名。有人在频道说：「前十全是肝帝」。',
        options: [
            { text: '今晚加把劲',  results: [{ hpDelta: -2, text: '你决定今晚多守一会儿。' }] },
            { text: '佛系随缘',    results: [{ sanityDelta: 3, text: '生死面前，排名算什么。' }] }
        ]
    },
    {
        id: 'evt_rank_d8_low', type: 'story', dayMin: 8, dayMax: 8, once: true, conditions: { flags: ['rank_low'] },
        text: '【排行榜速报】第2期——你排位 #34 / 179人\n\n有人在频道说：「不上榜的反而活得好 别卷了」。',
        options: [
            { text: '有道理', results: [{ sanityDelta: 3, text: '不上榜也有不上榜的活法。' }] },
            { text: '下周冲榜', results: [{ hpDelta: -1, text: '你暗自握拳。' }] }
        ]
    },
    // ── 排行榜阶梯第3阶段（D12）────────────────────────────────────────────
    {
        id: 'evt_rank_d12_high', type: 'story', dayMin: 12, dayMax: 12, once: true, conditions: { flags: ['rank_high'] },
        text: '【排行榜终报】最终排名 #3 / 162人（已25人离线）\n\n系统提示：你的高排名解锁了特殊补给——急救包×2 + 信号弹×1。',
        options: [
            { text: '收下补给', results: [{ gainItems: [['med_first_aid', 2], ['key_signal_gun', 1]], text: '高级补给箱空投至你的庇护所。' }] }
        ]
    },
    {
        id: 'evt_rank_d12_mid', type: 'story', dayMin: 12, dayMax: 12, once: true, conditions: { flags: ['rank_mid'] },
        text: '【排行榜终报】最终排名 #11 / 162人\n\n中游成绩，补给普通：绷带×2 + 干粮×1。',
        options: [
            { text: '收下补给', results: [{ gainItems: [['med_bandage', 2], ['food_biscuit', 1]], text: '普通补给箱送到。' }] }
        ]
    },
    {
        id: 'evt_rank_d12_low', type: 'story', dayMin: 12, dayMax: 12, once: true, conditions: { flags: ['rank_low'] },
        text: '【排行榜终报】最终排名 #41 / 162人\n\n末位补给：浆果×2。但你还活着，这就够了。',
        options: [
            { text: '活着就好', results: [{ gainItems: [['food_berry', 2]], text: '你拿到了最基本的补给。' }] }
        ]
    }
];
wr('events/fog_versions.json', fog_versions);
console.log('✓ fog_versions.json — 版本公告×3 + 排行榜阶梯×9');

// ─── 7. fog_neighbors.json — 邻居据点生死簿 ────────────────────────────────
const fog_neighbors = [
    // ── 铁蛋交易 ─────────────────────────────────────────────────────────────
    {
        id: 'evt_nb_tiedan_deal', type: 'daily', dayMin: 4, dayMax: 5, once: true,
        text: '「铁蛋杂货铺」在频道发来私信：\n\n兄弟 我这儿有批好货 需要的话拿木头来换 2木=1罐头 怎么样？',
        options: [
            { text: '交易（-2木 +1罐头 +5sanity）', requires: { items: [['mat_wood', 2]] },
              results: [{ consumeItems: [['mat_wood', 2]], gainItems: [['food_canned', 1]], sanityDelta: 5, text: '铁蛋秒回：「爽快！下次有好货先找你。」你们的关系加深了。' }] },
            { text: '婉拒', results: [{ text: '铁蛋：「行 需要再找我。」' }] }
        ]
    },
    // ── 老猫喂猫 ─────────────────────────────────────────────────────────────
    {
        id: 'evt_nb_laomao_feed', type: 'daily', dayMin: 5, dayMax: 6, once: true,
        text: '「三楼老猫」在频道喊：\n\n谁有多余的鱼 我家三只猫断粮了 我可以用东西换',
        options: [
            { text: '给他一条鱼（-1鱼 +cat_bless flag）', requires: { items: [['food_raw_fish', 1]] },
              results: [{ consumeItems: [['food_raw_fish', 1]], setFlags: ['cat_bless'], sanityDelta: 5, text: '老猫：「救命了！！小花二花大花都谢谢你们！！」\n猫们的名字你记住了。' }] },
            { text: '表示同情但无能为力', results: [{ sanityDelta: -1, text: '老猫：「……没事 我再想想办法。」' }] }
        ]
    },
    // ── 小美求助 ─────────────────────────────────────────────────────────────
    {
        id: 'evt_nb_laomei_signal', type: 'daily', dayMin: 6, dayMax: 7, once: true,
        text: '「直播达人小美」发来私信：\n\n我家电池快没电了 这是我直播的命 我愿意用医疗包换 有人有电池吗',
        options: [
            { text: '送她一节电池（-1电池 +key_amulet）', requires: { items: [['key_battery', 1]] },
              results: [{ consumeItems: [['key_battery', 1]], gainItems: [['med_first_aid', 1]], setFlags: ['nb_mei_saved'], text: '小美：「家人们！！好心人！！我用急救包换！！」\n她在直播间举起急救包对着镜头挥手。' }] },
            { text: '自己也需要电池', results: [{ text: '你没有回复。小美还在频道喊。' }] }
        ]
    },
    // ── 老猫讣告 (D8) ────────────────────────────────────────────────────────
    {
        id: 'evt_nb_laomao_dead', type: 'story', dayMin: 8, dayMax: 8, once: true, weight: 40,
        text: `【频道讣告】\n\n「三楼老猫」已36小时未发言。\n最后一条消息是：「二花也没回来。」\n\n你私聊了他，没有回复。\n\n三楼的门虚掩着。里面有猫叫声，但没有人。`,
        options: [
            { text: '前往三楼查看（解锁废墟）', results: [{ unlockLocation: 'ruin_laomao', setFlags: ['nb_mao_dead'], text: '你推开三楼的门。\n\n三只猫围着空碗转圈。桌上留着半袋猫粮和一张纸条：\n「如果我不在了，帮我照顾它们。——老猫」\n\n你解锁了废墟探索地点。' }] },
            { text: '在频道默哀', results: [{ sanityDelta: -3, setFlags: ['nb_mao_dead'], text: '你在频道打了三个句号。' }] }
        ]
    },
    // ── 小美遇险 (D9 危机) ───────────────────────────────────────────────────
    {
        id: 'evt_nb_laomei_hunt', type: 'crisis', dayMin: 9, dayMax: 9, once: true, weight: 30,
        text: '频道突然炸了——\n\n「直播达人小美」：有人在外面！！不是好人！！他们在砸门！！\n\n然后信号断了。\n\n频道里一片混乱。有人说听到了尖叫声。',
        options: [
            { text: '赶去救援（需要武器 -6hp）', requires: { items: [['tool_weapon', 1]] },
              results: [{ hpDelta: -6, setFlags: ['nb_mei_rescued'], text: '你赶到时，小美正用椅子顶着门。门外两个人见你有武器，骂骂咧咧跑了。\n\n小美：「谢谢你……我把镜头对准你了 家人们记住这个英雄！」' }] },
            { text: '太危险了', results: [{ sanityDelta: -8, setFlags: ['nb_mei_gone'], text: '你在频道里听了一夜。\n第二天，小美的账号再也没有亮起来。' }] }
        ]
    },
    // ── 老周一家失踪 (D10) ───────────────────────────────────────────────────
    {
        id: 'evt_nb_laozhou_dead', type: 'story', dayMin: 10, dayMax: 10, once: true, weight: 35,
        text: `【频道消息】\n\n有人在南墙根老周家门口发现了拖拽痕迹。\n棚子里只剩下孩子的玩具和半碗冷粥。\n\n老周一家四口，全部失联。`,
        options: [
            { text: '留下一张字条（+sanity）', results: [{ setFlags: ['nb_zhou_dead'], sanityDelta: 3, unlockLocation: 'ruin_laozhou', text: '你写了张纸条：「如果你回来了，我们在东区。」压在枕头下面。\n\n你解锁了老周家遗址。' }] },
            { text: '沉默离开', results: [{ setFlags: ['nb_zhou_dead'], unlockLocation: 'ruin_laozhou', text: '你没有停留。你解锁了老周家遗址。' }] }
        ]
    },
    // ── 小美结局（存活分支 D14）────────────────────────────────────────────
    {
        id: 'evt_nb_mei_finale_safe', type: 'story', dayMin: 14, dayMax: 14, once: true,
        conditions: { notFlags: ['nb_mei_gone'] },
        text: '「直播达人小美」在频道发了一段话：\n\n「家人们 我数了一下 我一共直播了14天。\n从第1天对着空房间说话，到现在镜头里还有你们。\n\n明天救援来的话 我会把所有录像公开。\n最后一场直播——」\n\n她把镜头转向你的木屋方向，挥手。',
        options: [
            { text: '挥手回应', results: [{ sanityDelta: 10, text: '你在镜头里挥了挥手。小美笑了。\n\n频道里有人刷：「活着真好。」' }] }
        ]
    },
    // ── 小美结局（死亡分支 D14）────────────────────────────────────────────
    {
        id: 'evt_nb_mei_finale_gone', type: 'story', dayMin: 14, dayMax: 14, once: true,
        conditions: { flags: ['nb_mei_gone'] },
        text: '频道里有一条未读消息，来自两天前的「直播达人小美」：\n\n「最后一场直播。镜头对着窗外的雾。\n谢谢你们看了我14天。」\n\n录像只有37秒。最后一帧是黑屏。',
        options: [
            { text: '保存录像', results: [{ sanityDelta: -2, text: '你把录像保存了。有些东西值得被记住。' }] }
        ]
    }
];
wr('events/fog_neighbors.json', fog_neighbors);
console.log('✓ fog_neighbors.json — 邻居×10 + 死flag消费(dd_vouched→频道感谢 D5)');

// ─── 8. fog_regions_explore.json — 新地点探索事件 ──────────────────────────
const fog_regions_explore = [
    // ── 结晶洞探索 ───────────────────────────────────────────────────────────
    {
        id: 'evt_exp_crystal_1', type: 'explore', pool: 'crystal_hollow', weight: 25,
        text: '洞壁上嵌满了淡蓝色结晶，手指触碰时微微发热。\n你小心翼翼撬下一块。',
        options: [
            { text: '仔细采集', results: [{ gainItems: [['key_mist_crystal', 2]], text: '你获得了两块结晶。' }] },
            { text: '只取一块就走', results: [{ gainItems: [['key_mist_crystal', 1]], text: '一块足够了。贪心在迷雾中不是好品质。' }] }
        ]
    },
    {
        id: 'evt_exp_crystal_2', type: 'explore', pool: 'crystal_hollow', weight: 25,
        text: '洞穴深处传来低沉的嗡鸣声。结晶在黑暗中发出微弱的脉动。\n空气中有股奇怪的甜味。',
        options: [
            { text: '深入探索（风险）', results: [{ hpDelta: -5, gainItems: [['key_mist_crystal', 3]], sanityDelta: 3, text: '你冒险深入，收获了三块结晶。但嗡鸣声让你头痛欲裂。' }] },
            { text: '在外围采集', results: [{ gainItems: [['key_mist_crystal', 1]], text: '外围的结晶品质一般，但至少安全。' }] }
        ]
    },
    {
        id: 'evt_exp_crystal_3', type: 'explore', pool: 'crystal_hollow', weight: 20,
        text: '洞穴角落有一具骸骨，手中紧握着一块特别大的结晶。\n旁边散落着一本笔记。',
        options: [
            { text: '取走结晶（-3sanity）', results: [{ gainItems: [['key_mist_crystal', 1]], sanityDelta: -3, text: '你掰开骸骨的手指，取走了那块拳头大的结晶。\n笔记上写着：「结晶会唱歌 但不要听太久」' }] },
            { text: '不打扰逝者', results: [{ sanityDelta: 2, text: '你鞠了一躬，转身离开。有些东西不该拿。' }] }
        ]
    },
    // ── 三楼老猫废墟探索 ─────────────────────────────────────────────────────
    {
        id: 'evt_exp_laomao_1', type: 'explore', pool: 'ruin_laomao', weight: 25,
        text: '三楼一片狼藉。但猫砂盆整齐排列，碗里的猫粮已经发霉。\n窗台上有个猫窝，里面窝着一只橘猫。',
        options: [
            { text: '喂猫（-1food）', requires: { items: [['food_berry', 1]] }, results: [{ consumeItems: [['food_berry', 1]], text: '橘猫警惕地闻了闻，然后大口吃起来。它没有跑。' }] },
            { text: '搜索物资', results: [{ gainItems: [['med_bandage', 1], ['mat_cloth', 1]], text: '你在柜子里找到了绷带和布料。老猫的存货。' }] }
        ]
    },
    {
        id: 'evt_exp_laomao_2', type: 'explore', pool: 'ruin_laomao', weight: 25, conditions: { flags: ['cat_bless'] },
        text: '三只猫围了上来——小花、二花、大花。\n它们认出了你。那只喂过它们鱼的人。\n\n二花蹭了蹭你的腿，叼来一个东西放在你脚边。',
        options: [
            { text: '捡起来', results: [{ gainItems: [['med_first_aid', 1]], text: '是一盒急救包。老猫藏的。\n\n纸条上写着：「给帮过我们的人。——猫们」' }] }
        ]
    },
    {
        id: 'evt_exp_laomao_3', type: 'explore', pool: 'ruin_laomao', weight: 20,
        text: '墙上贴满了猫的照片。每只都有名字。\n最中间一张全家福：三只猫和一个人。\n背面写着：「小花 二花 大花 和我 我们是一家人」',
        options: [
            { text: '拍照留念', results: [{ sanityDelta: 3, text: '你拍下了这张全家福。有些温暖值得被记住。' }] },
            { text: '拿走照片', results: [{ sanityDelta: 2, text: '你把照片收进口袋。' }] }
        ]
    },
    // ── 南墙根老周家遗址探索 ─────────────────────────────────────────────────
    {
        id: 'evt_exp_laozhou_1', type: 'explore', pool: 'ruin_laozhou', weight: 25,
        text: '棚子里散落着孩子的玩具：积木、小汽车、一只缺了耳朵的布熊。\n墙上用粉笔画着一家四口手牵手。',
        options: [
            { text: '检查柜子', results: [{ gainItems: [['mat_wood', 2], ['food_canned', 1]], text: '柜子里还有木柴和罐头。老周攒的。' }] },
            { text: '带走布熊', results: [{ gainItems: [['lux_teddy', 1]], sanityDelta: 2, text: '你捡起那只缺耳朵的布熊。它很轻。' }] }
        ]
    },
    {
        id: 'evt_exp_laozhou_2', type: 'explore', pool: 'ruin_laozhou', weight: 25,
        text: '地上有一张纸条，是孩子的字迹：\n\n「爸爸说等雾散了 带我们去看海」',
        options: [
            { text: '收好纸条', results: [{ sanityDelta: 2, text: '你把纸条叠好放进口袋。有些承诺在末日里依然闪闪发光。' }] },
            { text: '放回原处', results: [{ sanityDelta: 1, text: '有些话属于这里。' }] }
        ]
    },
    {
        id: 'evt_exp_laozhou_3', type: 'explore', pool: 'ruin_laozhou', weight: 20,
        text: '棚子后面有个小菜园，几棵白菜还在长。\n有人用塑料布搭了个简易温室。',
        options: [
            { text: '采摘白菜', results: [{ gainItems: [['food_berry', 3]], text: '白菜还有些营养。你采了三棵。' }] },
            { text: '给菜园浇水', results: [{ sanityDelta: 3, text: '你用水壶给菜园浇了水。也许还会有人回来吃。' }] }
        ]
    }
];
wr('events/fog_regions_explore.json', fog_regions_explore);
console.log('✓ fog_regions_explore.json — 探索×9 (结晶洞3 + 老猫废墟3 + 老周遗址3)');

// ─── 9. patch fog_story2.json — 给 doc_visit / ratking_offer 加 met-flag ───
const fog2 = rd('events/fog_story2.json');
const list2 = Array.isArray(fog2) ? fog2 : (fog2.events || []);
for (const e of list2) {
    if (e.id === 'evt_s_doc_visit') {
        for (const o of e.options) for (const r of o.results) {
            if (!r.setFlags) r.setFlags = [];
            if (!r.setFlags.includes('doc_met')) r.setFlags.push('doc_met');
        }
        console.log('✓ patch evt_s_doc_visit → +doc_met');
    }
    if (e.id === 'evt_s_ratking_offer') {
        for (const o of e.options) for (const r of o.results) {
            if (!r.setFlags) r.setFlags = [];
            if (!r.setFlags.includes('ratking_met')) r.setFlags.push('ratking_met');
            if (!r.relNpc) { r.relNpc = 'ratking'; r.relDelta = (r.relDelta || 0) + 10; }
        }
        console.log('✓ patch evt_s_ratking_offer → +ratking_met');
    }
}
wr('events/fog_story2.json', Array.isArray(fog2) ? list2 : fog2);

// ─── 10. 生成频道感谢事件（消费 dd_vouched）───────────────────────────────
const reputationEvt = {
    id: 'evt_nb_reputation', type: 'daily', dayMin: 5, dayMax: 6, once: true,
    conditions: { flags: ['dd_vouched'] },
    text: '一条私信弹了出来——\n\n「你好 我是等风来。听说你在迷雾边缘帮了那个孩子……谢谢你。」\n\n附件：干净的水×1',
    options: [
        { text: '收下', results: [{ gainItems: [['water_clean', 1]], sanityDelta: 5, text: '你收下了水。善意是会传递的。' }] }
    ]
};
const allNeighbors = [...fog_neighbors, reputationEvt];
wr('events/fog_neighbors.json', allNeighbors);
console.log('✓ fog_neighbors.json +evt_nb_reputation (消费 dd_vouched)');

console.log('\n✅ config + events 全部写入完毕');
