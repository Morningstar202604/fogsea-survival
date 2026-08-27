// add_rat.mjs — 鼠王路线 6幕 (含cross-link: dd_map_promise, sea_chart_seen)
import { readFileSync, writeFileSync } from 'node:fs';
const P = 'assets/resources/configs/scenes.json';
const scenes = JSON.parse(readFileSync(P, 'utf8').replace(/^\uFEFF/, ''));

const ratScenes = [
    // ── rat_s1 回礼 ──────────────────────────────────────────────────────────
    {
        id: 'rat_s1_return', name: '鼠王·回礼',
        entry: 'q', priority: 23,
        trigger: { dayMin: 5, dayMax: 7, flags: ['ratking_met'], notFlags: ['rat_deal'] },
        nodes: [
            { id: 'q', text: '你循着上次的路线找到了那个下水道入口。\n铁栅栏后面，一双发亮的眼睛正盯着你。\n「又来了？」鼠王的声音在管道里回荡，「这次带了什么？」\n他从栅栏缝里伸出一只枯瘦的手。', choices: [
                { text: '递给他两块饼干（-2food_biscuit）', requires: { items: [{ itemId: 'food_biscuit', count: 2 }] },
                  outcomes: { text: '他一把抓过饼干，塞进嘴里嚼了两口，眼睛突然亮了。\n「好东西。」他吞下去，「作为交换——」\n他从身后拖出一个布包，里面是一张皱巴巴的纸。\n「北边那片雾里有条暗河。顺着走能到沉船湾。很多人不知道。」\n【获得「暗河路线图」解锁沉船湾】', effects: { loseItems: [{ itemId: 'food_biscuit', count: 2 }], gainItems: [{ itemId: 'key_map_fragment', count: 1 }], setFlags: ['rat_deal'], relNpc: 'ratking', relDelta: 15, sanity: 8 } } },
                { text: '问他为什么住在下水道', outcomes: { text: '他沉默了很久。\n「上面太亮了。」他说，「我习惯了黑。」\n他从怀里掏出一只小铁盒，里面装着几颗发霉的糖。\n「她给我的。」他说了一个名字，你没听清。\n「后来她走了。我就下来了。」\n【好感+12】', effects: { relNpc: 'ratking', relDelta: 12, sanity: 10, setFlags: ['rat_story'] } } },
                { text: '给他一块石头（什么都没有）', outcomes: { text: '他接过石头看了看，又看了看你。\n「……有意思。」他把石头揣进兜里，「你很有趣。下次带点吃的来。」\n他没有生气。', effects: { relNpc: 'ratking', relDelta: 5, sanity: 5 } } }
            ] }
        ]
    },
    // ── rat_s2 情报价目 ─────────────────────────────────────────────────────
    {
        id: 'rat_s2_price', name: '鼠王·情报价目',
        entry: 'q', priority: 25,
        trigger: { dayMin: 7, dayMax: 9, flags: ['ratking_met'], notFlags: ['rat_invite'] },
        nodes: [
            { id: 'q', text: '鼠王今天看起来心情不错。\n他蹲在铁栅栏后面，面前摆着一张纸，上面用铅笔歪歪扭扭地写着：\n\n「情报价目表」\n① 兽潮路线——3食物\n② 诊所仓库位置——1金属件\n③ 其他幸存者位置——2食物\n④ 特殊情报（面议）——看你给什么', choices: [
                { text: '买兽潮路线情报（-3food_berry）', requires: { items: [{ itemId: 'food_berry', count: 3 }] },
                  outcomes: { text: '他接过浆果，指了指西边。\n「兽潮从西边来，沿河跑。你在河东边建东西挡，或者干脆在河西边蹲着——它们不回头。」\n他舔了舔手指，「别告诉别人。」\n【兽潮情报·有用】', effects: { loseItems: [{ itemId: 'food_berry', count: 3 }], setFlags: ['rat_intel_beast'], sanity: 5, skillXp: { survival: 8 } } } },
                { text: '买诊所仓库位置（-1mat_scrap_metal）', requires: { items: [{ itemId: 'mat_scrap_metal', count: 1 }] },
                  outcomes: { text: '他接过金属件，在纸上画了个圈。\n「超市二楼，左转第三个门。没被搜过。」\n他顿了顿，「老医生可能知道。但他不敢去。」\n【获得「仓库位置标记」】', effects: { loseItems: [{ itemId: 'mat_scrap_metal', count: 1 }], setFlags: ['rat_intel_clinic', 'doc_plan'], relNpc: 'doc', relDelta: 5, sanity: 5 } } },
                { text: '买其他幸存者位置（-2food_berry）', requires: { items: [{ itemId: 'food_berry', count: 2 }] },
                  outcomes: { text: '他掰着手指头数：\n「东边铁蛋杂货铺——有钱人。三楼老猫——怪人。南墙根老周——一家四口。北边有个直播的——小姑娘。」\n他眨眨眼，「还有你。你住在——」他指了指你的方向，「对吧？」\n你知道的，他什么都知道。', effects: { loseItems: [{ itemId: 'food_berry', count: 2 }], setFlags: ['rat_intel_neighbors'], sanity: 3 } } },
                { text: '问特殊情报', outcomes: { text: '他凑近栅栏，压低声音：\n「沉船湾下面有个密室。很多人不知道。里面的东西——」\n他伸出五根手指，「值五条命。」\n「但你得先拿到地图碎片。」他看了看你，「你有吗？」', effects: { sanity: 3 } } }
            ] }
        ]
    },
    // ── rat_s3 地下请柬 ─────────────────────────────────────────────────────
    {
        id: 'rat_s3_invite', name: '鼠王·地下请柬',
        entry: 'q', priority: 27,
        trigger: { dayMin: 9, dayMax: 10, flags: ['rat_deal'], notFlags: ['rat_kingdom'] },
        nodes: [
            { id: 'q', text: '你再次来到下水道入口时，发现铁栅栏被打开了。\n地上放着一张用锡纸做的「请柬」，上面歪歪扭扭地写着：\n\n「诚邀阁下参观鼠王国。入口：铁栅栏后左转50米。注意脚下。」\n下面画了一只戴皇冠的老鼠。', choices: [
                { text: '走进去看看', outcomes: { text: '你弯着腰走进下水道。管道比你想象的宽敞。\n走了五十米，你看到了——\n一盏油灯照亮了一个圆形的空间。地上铺着捡来的纸板，墙上挂着几张照片（看不清内容）。\n鼠王坐在一块石头上，面前摆着三只死老鼠。\n「欢迎来到鼠王国。」他站起来，「它们是我的臣民。」\n他指了指那三只死老鼠，「它们死了。我埋了它们。」\n他看着你，「你想看看我的王国吗？」\n【解锁链入场景：下水道王座】', effects: { setFlags: ['rat_kingdom'], relNpc: 'ratking', relDelta: 10, sanity: 8 } } },
                { text: '太脏了，不进去', outcomes: { text: '你站在入口犹豫了一会儿，转身离开了。\n身后传来鼠王的声音：「胆小鬼。」\n但语气里没有嘲讽，只有失望。', effects: { sanity: -2 } } }
            ] }
        ]
    },
    // ── rat_s4 下水道王座（链入场景）────────────────────────────────────────
    {
        id: 'rat_s4_throne', name: '鼠王·下水道王座',
        entry: 'q', priority: 0,
        trigger: { flags: ['rat_kingdom'], notFlags: ['rat_throne_done'] },
        nodes: [
            { id: 'q', text: '鼠王带你参观了整个「王国」。\n\n一只瘸腿的老鼠在角落里啃木头——「它是宰相。」\n一堆发霉的面包——「这是国库。」\n墙上用粉笔画的地图——「这是疆域。」\n\n他站在最中间，伸开双臂。\n「这就是我的王国。」他回头看你，「很小，但都是我的。」\n他的眼睛在油灯下亮晶晶的。', choices: [
                { text: '「很了不起。」', outcomes: { text: '他愣了一下。然后咧嘴笑了，露出几颗黄牙。\n「你是第一个这么说的人。」\n他从「国库」里拿出一块面包递给你。\n「吃。国王请客。」\n面包已经发霉了，但你还是吃了。\n因为它很甜。', effects: { setFlags: ['rat_throne_done'], relNpc: 'ratking', relDelta: 15, sanity: 12, hunger: 10 } } },
                { text: '问他为什么要把王国给你看', outcomes: { text: '他沉默了一会儿。\n「因为你是第一个给我饼干的人。」他说，「也是第一个没有笑我的人。」\n他坐回石头上，「我以前在上面有个家。后来没了。」\n「现在我有王国了。虽然只有三只死老鼠和一堆发霉面包。」\n他看着你，「你会告诉别人吗？」\n你摇了摇头。\n他笑了。\n【好感+20】', effects: { setFlags: ['rat_throne_done'], relNpc: 'ratking', relDelta: 20, sanity: 15 } } }
            ] }
        ]
    },
    // ── rat_s5 鼠后之乱 ─────────────────────────────────────────────────────
    {
        id: 'rat_s5_queen', name: '鼠王·鼠后之乱',
        entry: 'q', priority: 29,
        trigger: { dayMin: 11, dayMax: 12, flags: ['rat_kingdom'], notFlags: ['rat_fin'] },
        nodes: [
            { id: 'q', text: '你来找鼠王时，发现他蹲在角落里发抖。\n「她来了。」他声音发颤。\n「谁？」\n「鼠后。」他指了指管道深处，「她要抢我的王国。」\n远处传来窸窸窣窣的声音，像无数只爪子在水泥上爬。', choices: [
                { text: '帮他守住王国', outcomes: { text: '你和鼠王一起守在管道口。\n一群黑色的老鼠涌过来，领头的那只比猫还大。\n你用棍子挡在前面，鼠王在后面扔石头。\n打了一个小时，鼠群退了。\n鼠王瘫坐在地上，大口喘气。\n「谢谢你。」他说，「你是我的骑士。」\n他的王国保住了。', effects: { hpDelta: -3, sanity: -5, relNpc: 'ratking', relDelta: 20, setFlags: ['rat_queen_defeated'], skillXp: { survival: 10 } } } },
                { text: '建议他谈判', requires: { skillLevel: { social: 2 } }, outcomes: { text: '你让鼠王对着管道喊话：「我们可以共享领地！」\n对面安静了一会儿。\n然后一只老鼠叼着一块布走出来，放在鼠王面前。\n「她同意了。」鼠王难以置信，「她居然同意了。」\n布上绣着一朵花。是鼠后的嫁妆。\n「以后她管西边，我管东边。」鼠王把布叠好揣进兜里，「和平了。」\n【social+15 好感+15】', effects: { skillXp: { social: 15 }, relNpc: 'ratking', relDelta: 15, setFlags: ['rat_peace'], sanity: 12 } } },
                { text: '不想管，离开', outcomes: { text: '你转身走了。身后传来鼠王的喊声：「别走！！」\n你没有回头。\n第二天你来找他时，他蜷在角落里，身上多了几道抓痕。\n「没事。」他说，「它们走了。」\n但他的眼神变了。', effects: { sanity: -8, relNpc: 'ratking', relDelta: -10, setFlags: ['rat_abandoned'] } } }
            ] }
        ]
    },
    // ── rat_s6 别礼 ─────────────────────────────────────────────────────────
    {
        id: 'rat_s6_farewell', name: '鼠王·别礼',
        entry: 'q', priority: 31,
        trigger: { dayMin: 13, dayMax: 13, flags: ['rat_kingdom'], notFlags: ['rat_fin'] },
        nodes: [
            { id: 'q', text: '鼠王今天没有蹲在铁栅栏后面。\n他站在入口处，背对着你。\n「你要走了？」你问。\n他转过身，手里攥着一块发光的石头。\n「王国要搬家了。」他说，「雾越来越浓，下面不安全了。」\n他把石头递给你。\n「拿着。这是沉船湾的密室钥匙。」', choices: [
                { text: '收下钥匙', outcomes: { text: '你接过石头。它在掌心微微发热。\n「沉船湾下面有个密室。」他说，「里面的东西够你活很久。」\n他从兜里掏出那块绣花布，看了看，又揣回去。\n「替我跟铁蛋说一声，他欠我三块饼干。」\n他转身走进雾里。\n「别想我！」他头也不回地喊。\n你没有回答。\n【鼠王路线完结 — 解锁沉船湾密室】', effects: { setFlags: ['rat_fin'], gainItems: [{ itemId: 'key_map_fragment', count: 1 }], sanity: 10, relNpc: 'ratking', relDelta: 15 } } },
                { text: '给他一些食物作饯别礼（-2food_canned）', requires: { items: [{ itemId: 'food_canned', count: 2 }] },
                  outcomes: { text: '他接过罐头，愣了一下。\n「你人不错。」他说，「比我认识的大多数人都好。」\n他把石头塞进你手里，又从兜里掏出那块绣花布。\n「这个也给你。」他说，「万一你遇到她——鼠后——替我说声谢谢。」\n他笑了。然后转身走进雾里。\n你看着他的背影消失在迷雾中。\n【鼠王路线完结 — 解锁沉船湾密室 + 绣花布（特殊物品）】', effects: { loseItems: [{ itemId: 'food_canned', count: 2 }], gainItems: [{ itemId: 'key_map_fragment', count: 1 }], setFlags: ['rat_fin'], relNpc: 'ratking', relDelta: 25, sanity: 18 } } },
                { text: '不给，直接拿钥匙', outcomes: { text: '他看了看你，又看了看手里的石头。\n「算了。」他把石头递给你，「拿去吧。反正我也用不上了。」\n他转身走了。没有回头。\n你手里攥着石头，站在原地。\n【鼠王路线完结】', effects: { gainItems: [{ itemId: 'key_map_fragment', count: 1 }], setFlags: ['rat_fin'], sanity: 5 } } }
            ] }
        ]
    }
];

scenes.scenes.push(...ratScenes);
writeFileSync(P, JSON.stringify(scenes, null, 2) + '\n', 'utf8');
console.log(`✓ +rat route 6 scenes (rat_s1-s6) → total ${scenes.scenes.length}`);