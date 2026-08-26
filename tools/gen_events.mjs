// ===== 探索事件程序化生成器（v0.5 内容扩容引擎）=====
import { writeFileSync, readFileSync } from 'node:fs';

// mulberry32
function rng(seed) {
    let s = seed >>> 0;
    return () => {
        s = (s + 0x6d2b79f5) >>> 0;
        let t = s;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
const r = rng(20260826);
const pick = a => a[Math.floor(r() * a.length)];
const int = (a, b) => a + Math.floor(r() * (b - a + 1));

// ---------- 地点词库 ----------
const LOCS = {
    fog_edge: {
        name: '迷雾边缘',
        finds: [
            ['半埋的行李箱', '锁扣锈死，箱角被什么咬开过。'],
            ['翻倒的婴儿车', '车里还挂着一只晃来晃去的奶瓶。'],
            ['缠满雾水的广告牌', '上面印着"家的味道"。'],
            ['一辆没油的小轿车', '后备箱虚掩着。'],
            ['散落一地的传单', '纸上的字已经晕成一片蓝。'],
            ['歪斜的公交站牌', '站牌下有个坐垫。'],
            ['挂在校门口的横幅', '"欢迎新同学"被撕去了一半。'],
            ['一只跑丢的拖鞋', '旁边还有另一只的脚印。'],
        ],
        safeGain: [['mat_cloth', 1], ['mat_wood', 1], ['food_berry', 1], ['water_dirty', 1]],
        riskGain: [['mat_wood', 2], ['food_berry', 2], ['med_bandage', 1]],
    },
    birch_forest: {
        name: '白桦林',
        finds: [
            ['树杈间的吊床', '绳结打得相当专业。'],
            ['一圈新鲜的刨花', '附近有人砍过柴。'],
            ['挂在枝头的布条阵', '每隔几步一条，像路标又像封印。'],
            ['树洞里的松果堆', '整理得整整齐齐，是松鼠的粮仓。'],
            ['倒伏的白桦', '树干笔直得像标枪。'],
            ['苔藓覆盖的石堆', '石头的摆放方式不太自然。'],
            ['系在树上的秋千', '木板还在轻轻晃。'],
            ['一截焦黑的树桩', '雷劈的？还是别的火。'],
        ],
        safeGain: [['mat_wood', 2], ['herb_green', 1], ['mat_rope', 1]],
        riskGain: [['mat_wood', 3], ['food_mushroom', 2], ['mat_charcoal', 1]],
    },
    supermarket: {
        name: '废弃超市',
        finds: [
            ['卡在收银台下的购物卡', '余额未知，但世界曾经很在乎它。'],
            ['促销堆头残骸', '方便面箱子踩扁了一地。'],
            ['生鲜区的冰柜', '断电已久，门却关得很严。'],
            ['服务台的失物招领盒', '里面躺着几把钥匙和一枚婚戒。'],
            ['货架深处的进口食品区', '标签全是看不懂的外文。'],
            ['员工储物柜', '三排柜子，只有一个是上着的。'],
            ['化妆品区的大镜子', '镜面碎成了蛛网。'],
            ['仓库卷帘门前', '门后传来滴水声。'],
        ],
        safeGain: [['food_biscuit', 1], ['water_dirty', 1], ['mat_cloth', 1]],
        riskGain: [['food_canned', 2], ['water_clean', 1], ['lux_choco', 1]],
    },
    creek_valley: {
        name: '山泉溪谷',
        finds: [
            ['卡在石头缝里的鱼群', '退水后它们回不去了。'],
            ['溪边平整的大石板', '有人在这儿野餐过。'],
            ['上游漂来的野花', '花瓣还带着露水。'],
            ['湿滑的青苔岩壁', '岩缝里有反光的东西。'],
            ['废弃的取水竹槽', '槽身长满了青苔但结构完好。'],
            ['沙洲上一串鹅卵石塔', '叠了七层，稳稳当当。'],
            ['对岸的野莓丛', '红得发黑，够不着。'],
            ['溪水拐弯处的漩涡', '漩涡中心沉着个背包。'],
        ],
        safeGain: [['water_clean', 2], ['food_berry', 1], ['herb_green', 1]],
        riskGain: [['water_clean', 3], ['food_raw_fish', 2], ['key_mist_crystal', 1]],
    },
    abandoned_village: {
        name: '废弃村庄',
        finds: [
            ['院里晒着的辣椒串', '红得刺眼，像还在等主人回来。'],
            ['贴着福门的农舍', '门缝里塞着褪色的春联。'],
            ['鸡窝', '稻草窝里居然还有一颗蛋。'],
            ['压水井', '井把子上缠着防滑布。'],
            ['村委会的黑板报', '粉笔字写着防汛值班表。'],
            ['墙根的一排陶罐', '罐口都用纱布蒙着。'],
            ['晾在中庭的中药渣', '药味还没散尽。'],
            ['半塌的灶房', '灶膛里的灰是温的。'],
        ],
        safeGain: [['food_mushroom', 1], ['salt', 1], ['mat_wood', 1]],
        riskGain: [['food_black_bread', 2], ['salt', 2], ['med_herbal', 1]],
    },
    mine: {
        name: '废弃矿洞',
        finds: [
            ['轨道尽头的手推车', '车轮上缠满了铁丝。'],
            ['墙上悬挂的矿工帽', '帽灯的玻璃裂了。'],
            ['一箱未开封的炸药', '受潮结块，碰不得。'],
            ['通风管裂口', '管子里吹出细细的凉风。'],
            ['刻着名字的工具架', '每个挂钩下面都有一行小字。'],
            ['积水的水泵房', '水面浮着一层油花。'],
            ['支木密布的主巷道', '头顶偶尔掉渣。'],
            ['角落的铁皮柜', '柜门上画着一个笑脸。'],
        ],
        safeGain: [['mat_stone', 2], ['mat_scrap_metal', 1]],
        riskGain: [['mat_stone', 4], ['mat_scrap_metal', 2], ['key_battery', 1]],
    },
    deep_fog: {
        name: '浓雾深处',
        finds: [
            ['悬浮在半空的光尘', '伸手一搅就四散，又缓缓聚拢。'],
            ['一面立着的穿衣镜', '镜框上缠着干枯的花。'],
            ['一座无火的篝火堆', '灰烬排列成一个完美的圆。'],
            ['倒插在地上的雨伞', '伞面朝上，接了一伞清亮的雾水。'],
            ['石桌上摆好的两副碗筷', '像是有人在等人。'],
            ['缠绕整棵枯树的灯串', '不通电却在明明灭灭。'],
            ['一排朝同一方向的脚印', '所有脚尖都对准雾最浓处。'],
            ['悬停在耳边的低语', '凑近了听，又散开了。'],
        ],
        safeGain: [['key_mist_crystal', 1], ['water_clean', 1]],
        riskGain: [['key_mist_crystal', 2], ['key_battery', 1], ['med_first_aid', 1]],
        alwaysFogRisk: true,
    },
    radio_tower: {
        name: '无线电台',
        finds: [
            ['贴满便签的操作台', '每张便签都是一个频段参数。'],
            ['备用发电机房', '机油味呛人。'],
            ['天线基座的工具箱', '扳手齐全，少了一把螺丝刀。'],
            ['值班室的行军床', '被子叠成了豆腐块。'],
            ['墙上的信号覆盖图', '用红笔圈了三个盲区。'],
            ['成捆的同轴电缆', '铜芯在断口处闪闪发亮。'],
            ['一本翻烂的《莫尔斯电码手册》', '页边写满了翻译练习。'],
            ['屋顶避雷针', '针尖熔了一个瘤。'],
        ],
        safeGain: [['mat_scrap_metal', 2], ['key_battery', 1]],
        riskGain: [['key_radio_parts', 2], ['key_battery', 2], ['tool_flashlight', 1]],
    },
    shipwreck_bay: {
        name: '沉船湾',
        finds: [
            ['冲上岸的救生圈', '圈绳上系着哨子。'],
            ['半沉的帆船桅杆', '帆布还能扯下来。'],
            ['沙滩上的集装箱门', '被海浪打磨得没了锐角。'],
            ['渔网缠成的球', '网眼里挂着贝壳和浮子。'],
            ['礁石缝里的酒瓶', '瓶身贴着手写的价签。'],
            ['倾覆的皮划艇', '艇底用马克笔写着"别放弃"。'],
            ['一堆烧过的篝火痕迹', '周围散落着烟头和罐头盒。'],
            ['潮池', '一小片被困住的海。'],
        ],
        safeGain: [['salt', 1], ['mat_rope', 1], ['water_dirty', 1]],
        riskGain: [['food_canned', 2], ['salt', 2], ['med_first_aid', 1]],
    },
};

// ---------- 组合语法 ----------
const RISKS = [
    { key: 'collapse', text: '刚碰到它，整个结构发出不堪重负的呻吟——要塌。' },
    { key: 'beast', text: '草丛/暗处的呼吸声骤然逼近——有东西守在这里。' },
    { key: 'fog', text: '四周的白雾无声无息地合拢过来，退路开始模糊。' },
    { key: 'trap', text: '手伸进去的瞬间指尖传来金属的凉意——有人设了机关。' },
    { key: 'nothing', text: '一切正常。正常反而让你心里发毛。' },
];
const SAFE_VERBS = ['小心地只拿走最外面的', '快速判断后取走了', '挑拣出完好的'];
const RISK_VERBS = ['贪心地把能搬的都搬上', '冒险把整堆都扒了出来', '赌一把全部打包'];

export function generate() {
    const events = [];
    let seq = 100;
    for (const [locId, L] of Object.entries(LOCS)) {
        const used = new Set();
        const count = locId === 'deep_fog' || locId === 'radio_tower' ? 18 : 24;
        for (let i = 0; i < count; i++) {
            // 不重复抽取发现物
            let fi = int(0, L.finds.length - 1);
            let guard = 0;
            while (used.has(fi) && guard++ < 20) fi = int(0, L.finds.length - 1);
            used.add(fi);
            const [findName, findDesc] = L.finds[fi];
            const risk = pick(RISKS);
            const sg = pick(L.safeGain);
            const rg = pick(L.riskGain);
            const deepPenalty = L.alwaysFogRisk ? ', fogPressure=1' : '';
            const id = `evt_g_${locId}_${seq++}`;
            events.push({
                id,
                title: findName,
                type: 'explore',
                pool: [locId],
                weight: 5,
                cooldownDays: int(2, 4),
                text: `${findName}。${findDesc}`,
                options: [
                    {
                        text: `${pick(SAFE_VERBS)}一部分`,
                        results: [
                            { weight: 80, text: '细水长流。你拿到了东西，也没惊动任何东西。', effects: { gainItems: [{ itemId: sg[0], count: sg[1] }] } },
                            { weight: 20, text: `还是慢了半拍。${risk.text}你两手空空撤离。`, effects: { sanity: -3 } },
                        ],
                    },
                    {
                        text: `${pick(RISK_VERBS)}`,
                        results: [
                            { weight: 45, text: '心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。', effects: { gainItems: [{ itemId: rg[0], count: rg[1] }], sanity: 2 } },
                            { weight: 30, text: `${risk.text}你在混乱中只保住了一部分，胳膊还被划了一道。`, effects: { gainItems: [{ itemId: rg[0], count: 1 }], hp: -6 } },
                            { weight: 25, text: `${risk.text}你被迫空手撤退，狼狈得像只兔子。`, effects: { hp: -4, sanity: -5, fogPressure: 1 } },
                        ],
                    },
                ],
            });
            void deepPenalty;
        }
    }
    return events;
}

const out = new URL('../assets/resources/configs/events/fog_generated.json', import.meta.url);
writeFileSync(out, JSON.stringify({ events: generate() }, null, 1) + '\n', 'utf-8');
const j = JSON.parse(readFileSync(out, 'utf-8'));
console.log('generated:', j.events.length, 'events');
