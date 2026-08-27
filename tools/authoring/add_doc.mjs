// add_doc.mjs — 老医生路线 6幕
import { readFileSync, writeFileSync } from 'node:fs';
const P = 'assets/resources/configs/scenes.json';
const scenes = JSON.parse(readFileSync(P, 'utf8').replace(/^\uFEFF/, ''));

const docScenes = [
    // ── doc_s1 上门问诊 ─────────────────────────────────────────────────────
    {
        id: 'doc_s1_housecall', name: '老医生·上门问诊',
        entry: 'q', priority: 28,
        trigger: { dayMin: 4, dayMax: 6, flags: ['doc_met'], notFlags: ['doc_plan'] },
        nodes: [
            { id: 'q', text: '老医生站在你门口，手里攥着一瓶碘伏。\n「有个事儿想跟你商量。」他推了推眼镜，「我那儿的药品快见底了，但诊所还能撑。你要是愿意搭把手——」\n他看了一眼你手里的绷带。', choices: [
                { text: '分他一些草药（-2herb_green +10sanity）', requires: { items: [{ itemId: 'herb_green', count: 2 }] },
                  outcomes: { text: '你掏出两把晒干的草药递过去。他愣了一下，然后郑重其事地揣进怀里。\n「行，我记着。」他从兜里摸出一瓶碘伏塞给你，「拿着，擦伤了别感染。」\n【好感+15 获得碘伏×1】', effects: { loseItems: [{ itemId: 'herb_green', count: 2 }], gainItems: [{ itemId: 'med_bandage', count: 1 }], relNpc: 'doc', relDelta: 15, sanity: 10 } } },
                { text: '问他怎么认识这么多草药', outcomes: { text: '「社区医院干了二十年，什么没见过。」他笑了笑，「可惜现在没设备了，只能靠经验。你要想学，我可以教。」\n他从口袋里摸出一本翻烂的《野外急救手册》递给你。\n【获得「野外急救手册」】\n【好感+10】', effects: { relNpc: 'doc', relDelta: 10, setFlags: ['doc_trust1'], sanity: 8 } } },
                { text: '婉拒', outcomes: { text: '「行，不勉强。」他转身要走，又回头，「不过要是哪天改主意了，我在诊所等你。」\n他走了几步又折回来，「对了，溪谷那边最近不太平，别去太深。」', effects: { sanity: 2 } } }
            ] },
            { id: 'end', text: '老医生的背影消失在雾中。他的白大褂已经洗得发黄，但补丁补得整整齐齐。', choices: [
                { text: '记下他的话', outcomes: { text: '你在日记本上写下：「老医生——社区医院，懂草药，人不坏。」', effects: { setFlags: ['doc_trust1'], skillXp: { knowledge: 5 } } } },
                { text: '随他去吧', outcomes: { text: '你关上门。每个人都有自己的路。', effects: {} } }
            ] }
        ]
    },
    // ── doc_s2 药箱见底 ─────────────────────────────────────────────────────
    {
        id: 'doc_s2_shortage', name: '老医生·药箱见底',
        entry: 'q', priority: 30,
        trigger: { dayMin: 6, dayMax: 8, flags: ['doc_met'], notFlags: ['doc_plan'] },
        nodes: [
            { id: 'q', text: '你推开诊所的门时，老医生正对着空药箱发呆。\n「来了？」他没抬头，「药用完了。抗生素、退烧药、碘伏——都没了。」\n他指了指墙角的纸箱，「就剩这些。」\n箱子里躺着两卷绷带和一瓶过期三个月的止咳糖浆。', choices: [
                { text: '提议一起去找药', outcomes: { text: '「你认真的？」他抬头看你，眼里闪过一点光，「……行。明天一早去废弃超市，我知道药房在哪。」\n他从抽屉里摸出一把生锈的钥匙，「这是药房仓库的钥匙。之前一直没敢去。」\n【获得「药房仓库钥匙」】', effects: { setFlags: ['doc_plan'], relNpc: 'doc', relDelta: 10, sanity: 8 } } },
                { text: '帮他整理库存', requires: { skillLevel: { knowledge: 2 } }, outcomes: { text: '你帮他把有限的药品分类整理，标注保质期和用途。他看着你熟练的动作，点了点头。\n「你学过医？」你摇了摇头。他笑了，「那比我聪明。」\n【knowledge+10】', effects: { skillXp: { knowledge: 10 }, relNpc: 'doc', relDelta: 8, sanity: 5 } } },
                { text: '建议他去求别人帮忙', outcomes: { text: '「求人不如求己。」他摆摆手，「我再想想办法。」\n他关上药箱，声音闷闷的。', effects: { sanity: 2 } } }
            ] }
        ]
    },
    // ── doc_s3 出诊深雾 ─────────────────────────────────────────────────────
    {
        id: 'doc_s3_expedition', name: '老医生·出诊深雾',
        entry: 'q', priority: 32,
        trigger: { dayMin: 8, dayMax: 10, flags: ['doc_plan'], notFlags: ['doc_clinic'] },
        nodes: [
            { id: 'q', text: '清晨，老医生背着空药箱站在你门前。\n「走吧，」他低声说，「超市药房在二楼，听说没被搜过。」\n雾气很浓。他递给你一根布条，「系在手腕上，别走散了。」', choices: [
                { text: '跟他一起去', outcomes: { text: '你们穿过两片废墟，终于摸到了超市后门。\n药房的门锁着，但锁已经锈了。老医生撬了两下，锁就断了。\n「运气不错。」他推开门，「里面可能有老鼠，小心点。」\n他回头看了你一眼，「要是遇到危险，你先跑。我老了，跑不动。」\n【解锁链入场景：诊所之夜】', effects: { setFlags: ['doc_clinic'], relNpc: 'doc', relDelta: 15, sanity: 10 } } },
                { text: '问他为什么愿意冒险', outcomes: { text: '他沉默了一会儿。\n「我女儿今年二十二。」他说，「也在某个迷雾里。」\n「我救不了所有人。但能救一个是一个。」\n他推了推眼镜，「走吧。天亮了雾会更浓。」\n【好感+20】', effects: { relNpc: 'doc', relDelta: 20, setFlags: ['doc_plan_deep'], sanity: 12 } } }
            ] }
        ]
    },
    // ── doc_s4 诊所之夜（链入场景）──────────────────────────────────────────
    {
        id: 'doc_s4_clinic', name: '老医生·诊所之夜',
        entry: 'q', priority: 0,
        trigger: { flags: ['doc_clinic'], notFlags: ['doc_night_done'] },
        nodes: [
            { id: 'q', text: '你们在药房里翻了两个小时。抗生素找到了三盒，退烧药两瓶，还有一些纱布。\n正要离开时，老医生突然停下脚步。\n「等等——」他侧耳听了听，「外面有声音。」\n雾里传来脚步声。不止一个人。', choices: [
                { text: '躲起来观察', outcomes: { text: '你们蹲在货架后面。三个穿着黑色冲锋衣的人走进药房，手电筒扫过货架。\n「就这些了？」其中一个人翻了翻，「搜干净了，走。」\n他们拿走了剩下的所有药品。\n等他们走远，老医生长出一口气。\n「还好我们先到了。」他拍了拍你的肩膀，「走，回诊所。」', effects: { setFlags: ['doc_night_done'], sanity: -5, hpDelta: -2 } } },
                { text: '假装路过', outcomes: { text: '你站起来，举起双手。「我们也是来拿药的。」\n三个人对视一眼。领头的冷笑：「药房是公共的？」\n老医生挡在你前面：「我们先到的。」\n对方犹豫了一下，转身走了。「下次注意点。」\n老医生的手在发抖，但他没表现出来。\n【好感+10】', effects: { setFlags: ['doc_night_done'], relNpc: 'doc', relDelta: 10, hpDelta: -3 } } }
            ] }
        ]
    },
    // ── doc_s5 发热病人 ─────────────────────────────────────────────────────
    {
        id: 'doc_s5_fever', name: '老医生·发热病人',
        entry: 'q', priority: 34,
        trigger: { dayMin: 11, dayMax: 12, flags: ['doc_met'], notFlags: ['doc_fin'] },
        nodes: [
            { id: 'q', text: '诊所的门被撞开，一个女人抱着孩子冲进来。\n「医生！救救孩子！」\n老医生摸了摸孩子的额头，脸色变了。\n「高烧。」他转身翻药箱，「退烧药……只剩最后一瓶了。」\n他看了看孩子，又看了看你。\n「半瓶能退烧，但今晚可能反复。全瓶一次退干净，但药就没了。」', choices: [
                { text: '「全用吧，孩子要紧。」', requires: { items: [{ itemId: 'med_bandage', count: 1 }] }, outcomes: { text: '老医生点点头，把整瓶退烧药灌进孩子嘴里。\n十分钟后，孩子的呼吸平稳了。女人跪下来磕头，被老医生扶起来。\n「别跪，」他说，「我们是医生。」\n他收拾药箱时，你看到他偷偷叹了口气。\n【好感+15】', effects: { loseItems: [{ itemId: 'med_bandage', count: 1 }], relNpc: 'doc', relDelta: 15, sanity: 12 } } },
                { text: '「留半瓶备用。」', outcomes: { text: '老医生犹豫了一下，还是听了你的。半瓶灌下去，孩子退烧了，但速度慢一些。\n「今晚可能会反复。」他对女人说，「你守着，有任何情况来找我。」\n女人千恩万谢地走了。\n老医生坐下来，揉了揉太阳穴。\n「你说得对。我太冲动了。」', effects: { relNpc: 'doc', relDelta: 5, sanity: 5, setFlags: ['doc_prudent'] } } },
                { text: '「还有别的办法吗？」', requires: { skillLevel: { knowledge: 3 } }, outcomes: { text: '你翻出那本《野外急救手册》，找到了物理降温的方法。\n你用溪水浸湿毛巾敷在孩子额头，老医生在旁边指导。\n半小时后，孩子退烧了。药没用。\n老医生看着你，眼里有光。\n「你比我强。」他说这话时，语气里没有嫉妒，只有欣慰。\n【knowledge+15 好感+20】', effects: { skillXp: { knowledge: 15 }, relNpc: 'doc', relDelta: 20, sanity: 15 } } }
            ] }
        ]
    },
    // ── doc_s6 白旗 ─────────────────────────────────────────────────────────
    {
        id: 'doc_s6_flag', name: '老医生·白旗',
        entry: 'q', priority: 36,
        trigger: { dayMin: 13, dayMax: 14, flags: ['doc_met'], notFlags: ['doc_fin'] },
        nodes: [
            { id: 'q', text: '诊所门口挂起了一面白旗。\n老医生站在门口，看着来来往往的人。\n「从今天起，」他大声说，「这里免费看诊。有病的来，没病的也来坐坐。」\n他回头看了你一眼，笑了笑。\n「你教我的——能救一个是一个。」', choices: [
                { text: '留下帮忙', outcomes: { text: '你帮老医生整理了最后的药品，给每一个来诊所的人量了体温。\n他从柜子里摸出一瓶藏了很久的酒，倒了两杯。\n「敬你。」他举杯，「敬所有活着的人。」\n杯底碰在一起，发出清脆的响声。\n【老医生路线完结 — 诊所重开为区域救援点】', effects: { setFlags: ['doc_fin'], relNpc: 'doc', relDelta: 20, sanity: 18, hpDelta: 5, gainItems: [{ itemId: 'med_first_aid', count: 1 }] } } },
                { text: '默默离开', outcomes: { text: '你没有打扰他。有些人注定要在末日里点亮一盏灯。\n你回头看了一眼诊所的白旗。它在风中轻轻飘着。\n【老医生路线完结】', effects: { setFlags: ['doc_fin'], sanity: 12 } } }
            ] }
        ]
    }
];

scenes.scenes.push(...docScenes);
writeFileSync(P, JSON.stringify(scenes, null, 2) + '\n', 'utf8');
console.log(`✓ +doc route 6 scenes (doc_s1-s6) → total ${scenes.scenes.length}`);