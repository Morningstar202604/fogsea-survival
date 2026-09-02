import type { RandomEventDef } from '../types.js';

/**
 * 因果系统触发型事件（gameConfig.CAUSAL_RELATIONS 中 event_trigger 引用的事件）。
 * weight 固定为 0：不进入每日随机事件池，仅由因果规则按概率/延迟触发。
 */
export const CAUSAL_EVENTS: RandomEventDef[] = [
  {
    id: "npc_betrayal",
    text: `深夜，你被一阵轻微的响动惊醒。

营地边缘，一个熟悉的身影正蹑手蹑脚地翻动着公共物资箱。火把的光很暗，但你看得很清楚——那是这几天一直和你并肩的人。

他把几罐食物和一小卷布料塞进了自己的包里，动作很熟练，显然不是第一次。

你的手按在了武器上。

在这个世界里，信任比食物还贵。`,
    minDay: 10,
    maxTriggers: 1,
    weight: 0,
    choices: [
      {
        id: "confront",
        text: "当面对质",
        hint: "把事情摆到明面上",
        effects: [
          { kind: "resource", resource: "sanity", delta: -6 },
          { kind: "item", item: "food_canned", amount: 3 }
        ],
        result: `你站了出来，声音不大，但足够让所有人听见。

他僵在原地，包里的罐头滚落出来。营地里一片死寂。

最后，他没有辩解，把东西交了回来，收拾了自己的东西。天亮之前，他消失在雾里。

物资追回来了，但营地里少了一个人，也少了一些说不清的东西。

【你追回了物资，但也失去了一个同伴。】`,
        next: "__return__"
      },
      {
        id: "pretend_asleep",
        text: "假装没看见，暗中提防",
        hint: "留他在身边，但不再信任",
        effects: [
          { kind: "resource", resource: "sanity", delta: -4 },
          { kind: "flag", flag: "watched_betrayal" }
        ],
        result: `你闭上了眼睛，呼吸放得很平稳。

脚步声远去，你的心却一直悬着。

从今晚起，你睡觉时会握着刀，值夜时会把最重要的物资藏在自己身边。你没有撕破脸——多一个人，就多一分活下去的力气。

但你比谁都清楚，这份信任已经死了。

【你选择隐忍，从此夜里再难安眠。】`,
        next: "__return__"
      },
      {
        id: "expel_him",
        text: "立刻驱逐，绝不留情",
        hint: "背叛没有第二次",
        effects: [
          { kind: "resource", resource: "energy", delta: -5 },
          { kind: "flag", flag: "expelled_traitor" }
        ],
        result: `你把所有人叫醒，当众宣布了他的所作所为。

他求你给他一次机会，说迷雾里的独行活不过三天。你没说话，只是指了指雾的深处。

他走的时候没有回头。

营地安静了，你却整夜没有合眼。规矩立住了，人心也冷了半截。

【立了规矩，寒了人心。】`,
        next: "__return__"
      }
    ]
  },
  {
    id: "npc_sacrifice",
    text: `兽吼就在耳边。

一头变异的野兽撞开了临时路障，直冲着你扑过来。你脚下一滑，躲闪已经来不及了。

就在这时，一个身影从侧面撞了上来，把你推向一边。

是你身边的人。

他举着撬棍和野兽缠斗在一起，肩膀已经被撕开了一道口子，血溅在了墙上。

机会只有一瞬。`,
    minDay: 8,
    maxTriggers: 1,
    weight: 0,
    choices: [
      {
        id: "fight_back",
        text: "趁隙反击，救下他",
        hint: "赌一把",
        effects: [
          { kind: "resource", resource: "health", delta: -12 },
          { kind: "resource", resource: "sanity", delta: -5 },
          { kind: "flag", flag: "debt_of_life" }
        ],
        result: `你没有逃。

撬棍、石块、撕心裂肺的吼声——当你反应过来的时候，野兽已经倒在了血泊里。

他还活着，肩膀的伤口很深，但止住了血。他看着你，咧嘴笑了笑，说值了。

你们互相搀扶着回到营地。从今天起，这条命不再只属于你一个人。

【欠下一条命的重量，比伤更疼。】`,
        next: "__return__"
      },
      {
        id: "accept_cover",
        text: "抓住机会先撤，拖他出来",
        hint: "先保住能保住的",
        effects: [
          { kind: "resource", resource: "sanity", delta: -10 },
          { kind: "flag", flag: "companion_sacrificed" }
        ],
        result: `你的身体比意志先动了——你退了出去。

等野兽的咆哮停下，你回到原地。他还有呼吸，但伤得很重，以后可能再也提不动武器了。

他躺在担架上，断断续续地说：不怪你。

可你夜夜都会听见那声兽吼，看见自己后退的那半步。

【活下来的人，要背着走开的那一步活下去。】`,
        next: "__return__"
      }
    ]
  },
  {
    id: "deep_zone_danger",
    text: `你已经深入了危险区腹地。

这里的雾浓得像浆糊，能见度不到十步。地上的植物呈现出不正常的暗紫色，空气里有股铁锈味。

然后你听见了——沉重的、不规律的脚步声，正从雾的深处逼近。

雾里透出一个巨大的轮廓。它还没发现你，但风向随时会变。

这是一片连经验最丰富的拾荒者都不愿踏足的地方。`,
    minDay: 12,
    maxTriggers: 2,
    weight: 0,
    choices: [
      {
        id: "sneak_away",
        text: "屏住呼吸，慢慢退出去",
        hint: "稳，但一无所获",
        effects: [
          { kind: "resource", resource: "energy", delta: -8 },
          { kind: "resource", resource: "sanity", delta: -4 }
        ],
        result: `你贴着墙根，一步一步向后挪。

脚步声在三十步外停顿了一次——你的心脏几乎停跳——然后转向了另一个方向。

等你退回安全区，后背已经被冷汗浸透了。

什么都没拿到，但命还在。有时候，空手而归就是最好的收获。

【全身而退，也是一种胜利。】`,
        next: "__return__"
      },
      {
        id: "push_through",
        text: "趁它没发现，冲过去",
        hint: "危险区核心有价值的东西",
        effects: [
          { kind: "resource", resource: "health", delta: -22 },
          { kind: "resource", resource: "sanity", delta: -8 },
          { kind: "item", item: "key_mist_crystal", amount: 1 }
        ],
        result: `你压低身形，在废墟的阴影里狂奔。

爪风擦着你的后背扫过，一堵半塌的墙替你挡住了追击。你钻进一道裂缝，摸到了你要找的东西——一块拳头大小的雾晶，在黑暗里泛着幽幽的光。

代价是后背三道血痕，和一路狂奔后几乎炸开的肺。

值不值？活着回来的人才有资格说。

【冒着生命危险，带回了稀有的雾晶。】`,
        next: "__return__"
      },
      {
        id: "stand_and_fight",
        text: "占据高地，和它硬碰硬",
        hint: "极度危险",
        effects: [
          { kind: "resource", resource: "health", delta: -32 },
          { kind: "resource", resource: "sanity", delta: -10 },
          { kind: "item", item: "mat_scrap_metal", amount: 4 }
        ],
        result: `你抢占了断墙的制高点，在它扑上来的瞬间全力一击。

搏斗持续了整整一分钟，像一整年那么久。

当它终于不再动弹，你瘫坐在血泊和碎石里，几乎握不住武器。你从它巢穴里翻出了不少能用的金属。

这一战你赢了，但你也清楚——再来一次，你可能就回不来了。

【险胜。你的传说又多了一笔，你的骨头也少了几分完好。】`,
        next: "__return__"
      }
    ]
  },
  {
    id: "hallucination",
    text: `你的视野开始扭曲。

墙壁的纹路在蠕动，空气里飘出了烤肉的香味——你已经很多天没闻过这个味道了。

角落里，你看见了已经死去的人，在朝你招手，说你找到出口了，就在门外。

你明知道精神已经绷到了极限，可那扇"门"看起来那么真实，香气那么真实。

理智正在一分一分地流失。`,
    minDay: 6,
    maxTriggers: 3,
    weight: 0,
    choices: [
      {
        id: "bite_wake",
        text: "咬破手指，用疼痛保持清醒",
        hint: "以痛制幻",
        effects: [
          { kind: "resource", resource: "health", delta: -6 },
          { kind: "resource", resource: "sanity", delta: 8 },
          { kind: "flag", flag: "resisted_hallucination" }
        ],
        result: `你狠狠咬了下去。

铁锈味在嘴里弥漫，剧痛像一盆冰水浇在头上。招手的人影碎了，烤肉的香气散了，"门"变成了斑驳的墙。

你靠着墙滑坐到地上，大口喘气，然后笑出了声——有点疯，但你还是你。

痛觉是清醒的代价，这买卖划算。

【用一点伤，换回了神志。】`,
        next: "__return__"
      },
      {
        id: "follow_vision",
        text: "顺着幻觉走过去看看",
        hint: "也许……是真的呢",
        effects: [
          { kind: "resource", resource: "sanity", delta: -12 },
          { kind: "resource", resource: "health", delta: -10 }
        ],
        result: `你一步一步走向那扇"门"。

手指触到墙壁的瞬间，幻觉如潮水般退去——你站在断墙的边缘，脚下一半已经悬空，再走半步就是两层楼的落差。

你手脚并用地爬了回来，吐得昏天黑地。

没有出口。从来就没有。你把额头抵在冰凉的地上，第一次认真地想：自己是不是正在变成雾的一部分。

【差点用命验证了幻觉。】`,
        next: "__return__"
      },
      {
        id: "count_breath",
        text: "原地坐下，闭眼默数呼吸",
        hint: "等它过去",
        effects: [
          { kind: "resource", resource: "sanity", delta: -4 },
          { kind: "resource", resource: "energy", delta: 5 }
        ],
        result: `你盘腿坐下，闭眼，数呼吸。

一，二，三……幻觉的低语在耳边嗡嗡作响，你只是数数。数到第两百下，声音淡了；数到第四百下，世界重新有了轮廓。

你再睁眼时，天已经蒙蒙亮。什么都没发生，这本身就是最好的结果。

【熬过去了。熬，也是一种本事。】`,
        next: "__return__"
      }
    ]
  },
  {
    id: "base_breach",
    text: `警报声撕破了夜空。

兽潮撞上了围墙——第一道防线已经碎了，木栅栏在巨兽面前像纸一样被撕开。

几只变异兽已经冲进了外围区，物资棚的方向传来坍塌声。

核心区的大门在震动。留给你做决定的时间不多了。`,
    minDay: 15,
    maxTriggers: 2,
    weight: 0,
    choices: [
      {
        id: "defend_core",
        text: "死守核心区",
        hint: "保住命，弃掉外围",
        effects: [
          { kind: "resource", resource: "health", delta: -10 },
          { kind: "item", item: "food_canned", amount: -6 },
          { kind: "flag", flag: "base_breach_survived" }
        ],
        result: `你把所有人撤进核心区，用一切能搬动的东西堵死了门。

一整夜，撞击声没有停过。有人哭，有人吐，你握着武器站在最前面，天亮时手还在抖。

兽潮退了。外围全毁了，物资棚被啃掉了一半，但人都活着，核心区还在。

墙可以重建，人没了就没了。

【惨烈的胜利。人还在，就有明天。】`,
        next: "__return__"
      },
      {
        id: "evacuate",
        text: "放弃基地，趁乱撤进迷雾",
        hint: "断尾求生",
        effects: [
          { kind: "resource", resource: "sanity", delta: -8 },
          { kind: "resource", resource: "energy", delta: -12 },
          { kind: "flag", flag: "base_evacuated" }
        ],
        result: `你下达了撤退的命令。

所有人背着能背动的东西钻进了浓雾，身后是基地方向冲天的火光和兽吼。

你们在雾里走了一夜。有人回头看了很多次，你一次都没有。

家没了，但队伍还在。找块新地方，墙还能再砌起来——只要人活着。

【失去了一切，除了最重要的东西。】`,
        next: "__return__"
      },
      {
        id: "counterattack",
        text: "组织反击，把兽潮打回去",
        hint: "最疯狂的决定",
        effects: [
          { kind: "resource", resource: "health", delta: -25 },
          { kind: "resource", resource: "sanity", delta: -6 },
          { kind: "item", item: "mat_scrap_metal", amount: 5 },
          { kind: "flag", flag: "repelled_beast_tide" }
        ],
        result: `你吼出了反击的命令，火把和武器一起涌向外围。

那是一场绞肉机。但人数、地形和背水一战的狠劲站在你们这边——黎明前，最后一只变异兽倒在了大门前。

你们守住了基地，几乎完整的基地。兽尸拆出了大量可用的甲片和金属。

这一夜会被记住很多年。

【用血换来的完胜。基地的传说，从今晚开始。】`,
        next: "__return__"
      }
    ]
  },
  {
    id: "oldk_revenge",
    text: `一个流浪者带来了消息：老K在找你。

当年闹翻的时候，你拿走了属于他的东西。他记着，一天都没忘过。

今天傍晚，你在集市废墟的入口看见了他。三个月的迷雾把那个曾经圆滑的商人磨成了一头困兽，他身后站着两个拿武器的手下。

"东西，"他说，"或者别的什么。"

雾在他们身后涌动，像在等一场好戏。`,
    minDay: 20,
    maxTriggers: 1,
    weight: 0,
    choices: [
      {
        id: "negotiate",
        text: "交出物资，换他撤手",
        hint: "花钱消灾",
        effects: [
          { kind: "item", item: "food_canned", amount: -5 },
          { kind: "item", item: "med_first_aid", amount: -2 },
          { kind: "flag", flag: "oldk_peace" }
        ],
        result: `你把物资放在了两人中间的地上。

老K盯着你看了很久，久到雾都换了一个方向。最后他挥了挥手，手下把东西收了。

"算你识相。"他说，"这买卖，两清了。"

他们消失在雾里。你盯着自己空掉的背包，心里憋着一团火，但火没烧起来。

活人的尊严能折价，死人的不能。

【亏了物资，买回了太平。】`,
        next: "__return__"
      },
      {
        id: "ambush",
        text: "将计就计，提前设伏",
        hint: "他不会只来这一次",
        effects: [
          { kind: "resource", resource: "health", delta: -12 },
          { kind: "item", item: "mat_scrap_metal", amount: 3 },
          { kind: "flag", flag: "oldk_resolved" }
        ],
        result: `你比他预想的更快。

集市废墟的三面早就埋好了绊索和油桶，你站在他唯一的退路上等他。

打斗很短，也很脏。他的两个手下扔下武器跑了，老K躺在断墙下，看着你，像看着另一个自己。

"拿去吧，"他喘着气，"这鬼地方，你比我更适合活着。"

你收缴了他的全部家当，留了他一条命。

【恩怨了结。有些账，只能用这种方式清。】`,
        next: "__return__"
      },
      {
        id: "stand_fight",
        text: "当面硬拼，决一死战",
        hint: "血债血偿",
        effects: [
          { kind: "resource", resource: "health", delta: -30 },
          { kind: "resource", resource: "sanity", delta: -8 },
          { kind: "flag", flag: "oldk_defeated" }
        ],
        result: `你没有废话，直接动了手。

三打一。你用一场几乎送命的混战证明了一件事：你不想死的时候，谁也收不走你的命。

老K的手下折了一个，剩下的人抬着他退了。你没有追——你的左臂已经抬不起来了。

从今往后，雾里的流浪者提起你，语气都会变一变。

【你赢了，赢得只剩半条命。但这条命，从此没人敢惦记。】`,
        next: "__return__"
      }
    ]
  },
  {
    id: "hope_ship_war",
    text: `"希望号"的广播响彻了整片区域，这是它第一次不用礼貌的措辞。

"缓冲区居民注意：你们非法占有的物资属于全人类。限四十八小时内移交，否则我们将采取必要行动。"

然后你看见了他们的人：武装齐整，沿河布哨，探照灯夜夜扫过你们的住区。

战争没有宣战书。它只是来了。

你手里握着的，是这片雾里最后的自主权。`,
    minDay: 25,
    maxTriggers: 1,
    weight: 0,
    choices: [
      {
        id: "first_strike",
        text: "先发制人，夜袭他们的哨站",
        hint: "不给对方集结的时间",
        effects: [
          { kind: "resource", resource: "health", delta: -20 },
          { kind: "item", item: "key_battery", amount: 2 },
          { kind: "flag", flag: "hope_ship_hostile" }
        ],
        result: `雨夜，你带着人摸掉了河边最关键的一个哨站。

交火比预想的短。当他们反应过来时，你们已经带着电台、电池和整个哨站的补给消失在雾里。

"希望号"的广播骂了整整一夜，但探照灯从此不敢再过河。

你把钢笔一样的电台零件攥在手里——现在，规则是他们定的还是你们定的，得再谈。

【狭路相逢，先出拳的活着。】`,
        next: "__return__"
      },
      {
        id: "hold_and_talk",
        text: "据守待变，谈判周旋",
        hint: "用时间换筹码",
        effects: [
          { kind: "item", item: "food_canned", amount: -8 },
          { kind: "resource", resource: "sanity", delta: -5 },
          { kind: "flag", flag: "hope_ship_truce" }
        ],
        result: `你拒绝了移交，也拒绝了开枪。

谈判进行了三轮，桌上推过去的除了物资清单，还有你绘制的兽潮活动图——那是他们花多大代价都买不到的东西。

第四轮，双方的哨位都后撤了五十米。

停战不是信任，只是谁都需要时间。但至少，今夜的探照灯不会再扫过孩子们的窗户。

【退了一步，换来喘息。外交是另一种战斗。】`,
        next: "__return__"
      },
      {
        id: "vanish_mist",
        text: "举队遁入迷雾深处",
        hint: "让他们找不到人",
        effects: [
          { kind: "resource", resource: "sanity", delta: -10 },
          { kind: "resource", resource: "energy", delta: -12 },
          { kind: "flag", flag: "mist_hidden" }
        ],
        result: `你们拆掉了能带走的全部设施，整个营地像被雾吞掉了一样消失了。

雾深处的日子很苦：水要一口一口省着喝，夜里的声音近得可怕。但"希望号"的搜索队三次从你们头顶走过，一次都没有发现。

一个月后，他们的广播换回了礼貌的语气。

自由有时候不是打赢来的，是藏出来的。

【迷雾收留了你们，也藏起了你们。】`,
        next: "__return__"
      }
    ]
  },
  {
    id: "deep_forest_danger",
    text: `深林里的雾会"呼吸"。

你循着足迹追了三公里，本该追到猎物——但你追到的，是一片被彻底压平的林地，和地上一串斗一样大的爪印。

灌木丛深处传来低沉的呼吸声，每一口都像风箱。几根缠着浓雾的藤蔓无风自动，露出了后面的东西：一只你从未见过的变异体，正护着巢穴里亮晶晶的一堆东西。

退路还有。但那堆东西，随便一件都够你换半个月的粮。`,
    minDay: 14,
    maxTriggers: 2,
    weight: 0,
    choices: [
      {
        id: "hunt_it",
        text: "猎杀它，拿下巢穴",
        hint: "富贵险中求",
        effects: [
          { kind: "resource", resource: "health", delta: -28 },
          { kind: "item", item: "key_mist_crystal", amount: 1 },
          { kind: "item", item: "mat_scrap_metal", amount: 2 },
          { kind: "flag", flag: "sl_variant_predator" }
        ],
        result: `这一战没有任何花哨可言。

你用地形、陷阱和一整个下午，把这场猎杀变成了一门消耗课。当它终于倒下时，你已经数不清自己流了多少血。

巢穴里躺着你要的东西：一枚上好的雾晶，还有嵌在它甲壳缝隙里的旧世界金属。

你背着战利品走出深林时，太阳正好落山。

【深林承认了新的猎手。】`,
        next: "__return__"
      },
      {
        id: "scavenge_edge",
        text: "只捡外围的碎料，绝不靠近巢穴",
        hint: "见好就收",
        effects: [
          { kind: "item", item: "mat_cloth", amount: 2 },
          { kind: "item", item: "mat_stone", amount: 2 },
          { kind: "resource", resource: "health", delta: -8 }
        ],
        result: `你压着心跳，只在外围活动。

碎布、石料、半卷旧铁丝——都是它巢穴边上散落的东西，不够耀眼，但足够实在。

低沉的呼吸声一直没停，你也一直没有靠近。退出深林的时候，你的后背全湿了，收获袋却不空。

克制不是懦弱。空手回去才是。

【稳当的收获，完整的命。】`,
        next: "__return__"
      },
      {
        id: "retreat",
        text: "原路撤退，不冒这个险",
        hint: "来日方长",
        effects: [
          { kind: "resource", resource: "energy", delta: -5 }
        ],
        result: `你盯着那堆微光看了十秒钟，然后转身，原路退出了深林。

十秒钟里你想了很多：自己的伤、营地的粮、还有上次那头野兽留下的疤。

三公里夜路，你走得很稳。回到火堆边时，同伴问有什么收获，你摊了摊手。

什么都没有——包括伤口。

【有些险，不值得冒第二次。】`,
        next: "__return__"
      }
    ]
  }
];
