// 旧事件池（44 场时期带权重的随机事件）。
// 由 scripts/split_full.mjs 从 full.ts 拆分生成，勿手改。
export const LEGACY_RANDOM_EVENTS = [
    {
        "id": "evt_airdrop",
        "weight": 9,
        "minDay": 3,
        "maxTriggers": 3,
        "text": "【系统播报】检测到未知飞行物掠过雾层上空——一只补给空投箱摇摇晃晃地坠落在东边两百米的灌木丛里，降落伞缠在了树枝上。",
        "choices": [
            {
                "id": "o_0",
                "text": "冒险冲过去抢空投",
                "hint": "可能空手而归",
                "effects": [
                    {
                        "kind": "roll",
                        "difficulty": 55,
                        "successEffects": [
                            {
                                "kind": "item",
                                "item": "food",
                                "amount": 15
                            },
                            {
                                "kind": "item",
                                "item": "metal",
                                "amount": 5
                            }
                        ]
                    }
                ],
                "next": "__return__",
                "result": "你在雾里狂奔……灌木丛里的箱子还剩多少，全看运气。"
            },
            {
                "id": "o_1",
                "text": "谨慎观察半小时再靠近",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "energy",
                        "delta": -5
                    },
                    {
                        "kind": "item",
                        "item": "food",
                        "amount": 8
                    }
                ],
                "next": "__return__",
                "result": "你等到雾稍散了些才摸过去，箱子被别人先撬开了一半，剩下的也够吃两天。"
            },
            {
                "id": "o_2",
                "text": "无视它——太显眼的地方太危险",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    }
                ],
                "next": "__return__",
                "result": "入夜后，东边传来几声争抢的尖叫。你裹紧毯子，庆幸自己没去。"
            }
        ]
    },
    {
        "id": "evt_caravan",
        "weight": 7,
        "minDay": 5,
        "maxTriggers": 2,
        "text": "【系统播报】一辆挂着铜铃的三轮车碾过雾气停在你门口。车夫裹得只露出一双眼睛：「以物易物，童叟无欺——今日特价，木材换罐头。」",
        "choices": [
            {
                "id": "o_0",
                "text": "用木材×20换罐头（食物+12）",
                "effects": [
                    {
                        "kind": "item",
                        "item": "wood",
                        "amount": -20
                    },
                    {
                        "kind": "item",
                        "item": "food",
                        "amount": 12
                    }
                ],
                "next": "__return__",
                "result": "铜铃叮当作响，你用一捆木头换回了救命的热量。"
            },
            {
                "id": "o_1",
                "text": "用石材×10换金属×6",
                "effects": [
                    {
                        "kind": "item",
                        "item": "stone",
                        "amount": -10
                    },
                    {
                        "kind": "item",
                        "item": "metal",
                        "amount": 6
                    }
                ],
                "next": "__return__",
                "result": "「石头换铁？你这买卖做得过。」车夫咧嘴，铜铃又响了一声。"
            },
            {
                "id": "o_2",
                "text": "什么都不换，只打听外面的消息",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    },
                    {
                        "kind": "flag",
                        "flag": "heard_caravan_rumor",
                        "flagValue": true
                    }
                ],
                "next": "__return__",
                "result": "「西边的雾上周吃掉了一个村子。」车夫压低声音，「给钱也不换那种死法。」"
            }
        ]
    },
    {
        "id": "evt_ch1_market",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "第三天夜里，世界频道的画风突变。刷屏的求救和哭嚎退下去了，取而代之的是一行行报价：'木柴换罐头''盐换布''童叟无欺'。\n有人开始做生意了。在末世里，这比任何救援信号都让人安心——说明还有人打算活下去。",
        "choices": [
            {
                "id": "o_0",
                "text": "明天去看看行情",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 6
                    },
                    {
                        "kind": "flag",
                        "flag": "market_mindset"
                    }
                ],
                "next": "__return__",
                "result": "你把可交易物资列了张清单。规则正在雾里重建，而你要成为规则的一部分，而不是猎物。"
            },
            {
                "id": "o_1",
                "text": "嗤之以鼻：都是投机分子",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "flag",
                        "flag": "market_mindset"
                    },
                    {
                        "kind": "flag",
                        "flag": "market_skeptic"
                    }
                ],
                "next": "__return__",
                "result": "你关掉频道。但半夜你还是忍不住又打开看了一遍行情——真香。"
            }
        ]
    },
    {
        "id": "evt_ch2_breath",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "连续三晚，你都注意到同一件事：浓雾会在深夜十一点整变薄一线，凌晨三点再涨回来。\n涨、落、涨、落——像某种庞大生物的呼吸。你不是唯一发现的人，频道里有人管它叫'换气'。",
        "choices": [
            {
                "id": "o_0",
                "text": "记录规律（换气时外出更安全？）",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 5
                    },
                    {
                        "kind": "flag",
                        "flag": "breath_known"
                    }
                ],
                "next": "__return__",
                "result": "你在墙上画满了时间表。如果雾有呼吸，它就有心跳；有心跳，就有弱点。"
            },
            {
                "id": "o_1",
                "text": "别研究它，装作没看见",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    },
                    {
                        "kind": "flag",
                        "flag": "saw_retreat"
                    }
                ],
                "next": "__return__",
                "result": "有些规律知道了反而睡不着。你把这一页从日记里撕掉了。\n但规律自己找上门来：那晚你失眠，亲眼看见雾的'落潮'里，有什么东西跟着一起退了出去。"
            }
        ]
    },
    {
        "id": "evt_ch3_silence",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "世界频道的在线人数从四万七千跌到了九千。\n没有人组织告别，那些头像就那样一个个灰下去。今晚，一个叫'等风来'的账号发了最后一条消息：'我妈做的面。好想吃。'\n然后他也灰了。",
        "choices": [
            {
                "id": "o_0",
                "text": "为陌生人们守一夜灵",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 10
                    },
                    {
                        "kind": "flag",
                        "flag": "mourned_strangers"
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "你在窗台点了一排小火苗，替所有再也没上线的人。火光很小，但足够证明：有人记得他们来过。"
            },
            {
                "id": "o_1",
                "text": "麻木地划过名单",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    },
                    {
                        "kind": "flag",
                        "flag": "numb_witness"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -9
                    },
                    {
                        "kind": "flag",
                        "flag": "numb_witness"
                    }
                ],
                "next": "__return__",
                "result": "你已经学会了不去数死亡。这是活下来的本事之一——也是最疼的那一种。\n划到一个熟悉的名字时你的手指停住了：'隔壁老王'。他昨天还在跟你讨论腌萝卜配方。"
            }
        ]
    },
    {
        "id": "evt_ch4_whisper",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "入夜后，雾贴着窗户喊你的名字。\n第一声是奶奶的嗓音，第二声是初中同桌的，第三声——是你自己的，但你此刻明明坐在屋里。",
        "choices": [
            {
                "id": "o_0",
                "text": "回应：我在这里",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 12
                    },
                    {
                        "kind": "flag",
                        "flag": "answered_fog"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -14
                    },
                    {
                        "kind": "flag",
                        "flag": "answered_fog"
                    }
                ],
                "next": "__return__",
                "result": "'找到了。'无数声音同时松了口气，然后温柔下来。整夜，雾都安静地陪着你，像一场迟到多年的探亲。\n'找到了。'语气瞬间变得饥饿。它们撞了一夜窗户，天亮才散。你在门后攥着菜刀坐到日出。"
            },
            {
                "id": "o_1",
                "text": "咬住舌头不出声",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    },
                    {
                        "kind": "flag",
                        "flag": "kept_name"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -9
                    },
                    {
                        "kind": "flag",
                        "flag": "kept_name"
                    }
                ],
                "next": "__return__",
                "result": "老规矩是对的：雾来了，别应声。名字被叫破之前，你还是你。\n它们换了策略，开始用记忆里的声音说话——说小时候的事，说只有你知道的承诺。你把耳朵压在胳膊下，听到了天亮。"
            }
        ]
    },
    {
        "id": "evt_ch5_final",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "所有频段同时响起，官方的声音带着电流的颤抖：\n'救援编队已进入大雾区边缘。重复：已进入。各幸存者保持信号畅通，准备撤离。'\n三天。倒计时开始了。频道里的九千人同时沸腾，然后陷入更深的沉默——每个人都在算同一道题：我，能等到吗？",
        "choices": [
            {
                "id": "o_0",
                "text": "清点家当，写完最后一篇日记",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 10
                    },
                    {
                        "kind": "flag",
                        "flag": "final_prep"
                    }
                ],
                "next": "__return__",
                "result": "你把日子掰开了过：什么能带走，什么必须留下，什么要留给后来的人。写完抬头，天边竟有一线极淡的金色。"
            },
            {
                "id": "o_1",
                "text": "把消息告诉每一个还活着的人",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 6
                    },
                    {
                        "kind": "flag",
                        "flag": "final_herald"
                    }
                ],
                "next": "__return__",
                "result": "你敲遍了能敲的门，喊哑了嗓子。有人哭着道谢，有人已经听不懂人话了。但你把'三天'两个字，种进了每一双眼睛里。"
            }
        ]
    },
    {
        "id": "evt_crisis_dehydration",
        "weight": 20,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "你的视线开始扭曲，喉咙像塞满了烧红的沙子。远处似乎有一汪清泉在雾里闪光……不，那不是水。",
        "choices": [
            {
                "id": "o_0",
                "text": "喝下仅剩的脏水（需要脏水）",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    },
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "你颤抖着拧开瓶盖。至少，还活着。"
            },
            {
                "id": "o_1",
                "text": "咬破手指用血润喉",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    }
                ],
                "next": "__return__",
                "result": "咸腥的味道让你清醒了一点。这不是办法，但今晚先活过去。"
            }
        ]
    },
    {
        "id": "evt_crisis_starving",
        "weight": 20,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "饥饿像一只手从里面攥住你的胃。你盯着自己消瘦的手背发呆，突然觉得——树皮也许也能吃？",
        "choices": [
            {
                "id": "o_0",
                "text": "啃桦树皮充饥",
                "effects": [],
                "next": "__return__",
                "result": "又苦又涩，但胃里的绞痛缓解了些。"
            },
            {
                "id": "o_1",
                "text": "强忍着睡过去",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    }
                ],
                "next": "__return__",
                "result": "你在半梦半醒间熬过这一夜。梦里全是食物。"
            }
        ]
    },
    {
        "id": "evt_crisis_hallucination_friend",
        "weight": 18,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "「嘿，好久不见。」门口站着你大学最好的朋友，笑着朝你挥手，就像你们上周才刚见过面。可你的这位朋友，在穿越那天就再也没上过线。",
        "choices": [
            {
                "id": "o_0",
                "text": "陪他坐一会儿",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 10
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -12
                    }
                ],
                "next": "__return__",
                "result": "你们聊了很多，聊到太阳落山。他走的时候说：「替我好好活。」你低头擦了擦脸，再抬头时门口只有雾。但胸口那块石头轻了一些。\n聊到一半，他的脖子开始以不可能的角度转动。你尖叫着后退，撞翻了水罐。雾散了，屋里只剩你一个人和满地狼藉。"
            },
            {
                "id": "o_1",
                "text": "闭眼默念：不是真的",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    }
                ],
                "next": "__return__",
                "result": "等你睁开眼，门口空无一人。你在原地站了很久很久。"
            }
        ]
    },
    {
        "id": "evt_crisis_infection",
        "weight": 20,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "伤口周围的皮肤又红又肿，一跳一跳地疼，边缘摸上去发烫。一道红线正顺着血管慢慢向上爬。这不是普通的伤。",
        "choices": [
            {
                "id": "o_0",
                "text": "咬牙处理伤口（挤出脓血）",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "剧痛之后是一种奇异的轻松。红线的势头被遏制住了。\n脓血混着脏水溅了一地，伤口反而更深了。但至少，该排的都排出来了。"
            },
            {
                "id": "o_1",
                "text": "用抗生素（需要）",
                "effects": [
                    {
                        "kind": "item",
                        "item": "med_antibiotic",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "药片下肚，烧很快退了。现代医学万岁——哪怕只是一片过期药。"
            }
        ]
    },
    {
        "id": "evt_crisis_sleepless",
        "weight": 15,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "你已经两夜没合眼了。每次闭上眼，眼皮后面就有画面：雾、门缝、慢半拍的倒影。你的太阳穴突突直跳，眼前的世界开始轻微地扭曲。",
        "choices": [
            {
                "id": "o_0",
                "text": "吃一片镇静剂（需要）",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 20
                    },
                    {
                        "kind": "item",
                        "item": "med_sedative",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "药物把你按进了无梦的深眠。醒来时晨光正好，世界暂时安静了。"
            },
            {
                "id": "o_1",
                "text": "数呼吸：吸，一；呼，二……",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 6
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    }
                ],
                "next": "__return__",
                "result": "数到四百多的时候，天亮了。虽然疲惫，但你守住了自己的意识。\n数到两百时你忘了数到哪了。重新开始。又忘。窗外似乎有什么笑了一声。"
            }
        ]
    },
    {
        "id": "evt_crisis_give_up",
        "weight": 12,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "你坐在门槛上看着雾。一个念头毫无预兆地浮上来：「就这么躺着不动，会怎么样呢？」它很轻，很温和，像一句劝慰。",
        "choices": [
            {
                "id": "o_0",
                "text": "掐自己一把，站起来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 8
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "疼是真的疼。疼说明你还活着。你骂骂咧咧地站起来继续干活——骂人也是活人的特权。\n你在门槛上又坐了很久，直到腿麻得失去知觉才勉强起身。今天什么都没干成。"
            },
            {
                "id": "o_1",
                "text": "看看门框上刻的日子",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 6
                    }
                ],
                "next": "__return__",
                "result": "那些刻痕里有一道是你的。「第X天」——不管X是几，它还没结束。你深吸一口气，把雾关在了门外。"
            }
        ]
    },
    {
        "id": "evt_crisis_body_limit",
        "weight": 15,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一阵眩晕袭来，你扶住墙才没有倒下。视野边缘发黑，耳朵里全是自己的心跳声。你的身体在用最后的方式警告你：再这样下去，就要出人命了。",
        "choices": [
            {
                "id": "o_0",
                "text": "吞掉所有能吃的，先活过今天",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "你翻出背包里所有能入口的东西一扫而空。胃里有了东西，眼前的黑雾终于散开了一点。"
            },
            {
                "id": "o_1",
                "text": "使用急救包（需要）",
                "effects": [
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "绷带、药剂、夹板……专业的力量。做完全套处理后，你感觉自己又能打十个。"
            },
            {
                "id": "o_2",
                "text": "今天彻底休息",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 5
                    },
                    {
                        "kind": "flag",
                        "flag": "rested_today"
                    }
                ],
                "next": "__return__",
                "result": "你破例把宝贵的行动点全用来躺着。身体是革命的本钱——这句话现在听着格外有道理。"
            }
        ]
    },
    {
        "id": "evt_crisis_poison_worse",
        "weight": 25,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "腹部的绞痛突然加剧，一波强过一波。你扶着墙滑坐在地，冷汗浸透了后背——毒素正在和你的身体赛跑。",
        "choices": [
            {
                "id": "o_0",
                "text": "灌大量水冲淡毒素",
                "effects": [],
                "next": "__return__",
                "result": "你几乎喝光了手头所有的水。反复的呕吐之后，绞痛终于轻了一些。"
            }
        ]
    },
    {
        "id": "evt_c_fog_seep",
        "weight": 12,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "寒流把雾气压得很低，白色的丝线正从窗缝、门缝、地板裂隙里往屋里渗。温度计的读数在肉眼可见地下滑。",
        "choices": [
            {
                "id": "o_0",
                "text": "堵缝！布条加泥浆全用上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 3
                    },
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": -1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    },
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "你把每一条缝都塞得严严实实。屋里的空气终于不再流动，体温保住了。\n堵住了窗户，雾却从地板下面顶了上来，像有生命一样绕开你的补丁。"
            },
            {
                "id": "o_1",
                "text": "生火驱雾",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 5
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": -2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    }
                ],
                "next": "__return__",
                "result": "热浪逼退白丝。火光映墙上，你们对峙到天明。\n柴太湿，烟先把你熏出了眼泪。雾在你咳嗽声里继续推进。"
            },
            {
                "id": "o_2",
                "text": "裹紧所有衣物硬扛",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    }
                ],
                "next": "__return__",
                "result": "你把自己裹成一个茧。冷意还是钻进了骨头缝，但至少呼吸是自己的。"
            }
        ]
    },
    {
        "id": "evt_c_acid_drip",
        "weight": 11,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "酸雨找到了屋顶的薄弱点，一滴、一滴落在你的床边，木板冒起细小的白烟。",
        "choices": [
            {
                "id": "o_0",
                "text": "挪床+接水两不误",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    }
                ],
                "next": "__return__",
                "result": "你用铁锅接住滴液，既保住地板又攒了一碗'化学试剂'——至少能腐蚀门锁。\n半夜翻身时胳膊肘扫翻了锅。灼热的液体溅上手背。"
            },
            {
                "id": "o_1",
                "text": "冲上房顶补漏",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    }
                ],
                "next": "__return__",
                "result": "雨衣+油布+三分钟作业。补丁扛住了整场酸雨。\n一颗雨点精准地落进你的衣领。那种疼，一辈子忘不掉。"
            }
        ]
    },
    {
        "id": "evt_c_beast_scratch",
        "weight": 12,
        "minDay": 8,
        "maxTriggers": 1,
        "text": "兽潮的爪子已经搭上了你的墙板。一下一下的抓挠从四面八方响起，像在挑选最薄的那面。",
        "choices": [
            {
                "id": "o_0",
                "text": "举火把守在最薄的一面墙后",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    },
                    {
                        "kind": "item",
                        "item": "tool_torch",
                        "amount": -1
                    },
                    {
                        "kind": "flag",
                        "flag": "fought_beast"
                    },
                    {
                        "kind": "item",
                        "item": "tool_torch",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "火光让大多数爪子犹豫着收了回去。整夜你与一双反光的眼睛对峙。\n有个胆大的探进头来。你一火把抡过去，它哀嚎着带倒了半面墙板。"
            },
            {
                "id": "o_1",
                "text": "死守门口不出声",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -7
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -12
                    }
                ],
                "next": "__return__",
                "result": "你顶着门闩听它们巡视了一夜。天亮时门闩弯了，但门还在。\n某个瞬间所有声音同时停止。这种安静比抓挠可怕一百倍。"
            }
        ]
    },
    {
        "id": "evt_c_thick_fog_knock",
        "weight": 13,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "大白天，浓雾里传来礼貌的三下敲门声。门外站着一个白得近乎透明的人影，它隔着门问：'可以借个火吗？'",
        "choices": [
            {
                "id": "o_0",
                "text": "隔着门递出打火机",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 6
                    },
                    {
                        "kind": "flag",
                        "flag": "lent_fire"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    },
                    {
                        "kind": "item",
                        "item": "tool_lighter",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "门缝里伸出的手接过打火机，又还回来——还带着余温，和一句'好人有好报'。雾散了，人没了。\n打火机递出去就再也没回来。门外安静了很久很久。"
            },
            {
                "id": "o_1",
                "text": "一言不发等它离开",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -9
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    },
                    {
                        "kind": "flag",
                        "flag": "fire_curse"
                    }
                ],
                "next": "__return__",
                "result": "它问了十七遍'可以借个火吗'。每一遍的音调完全一致。你数完了全部十七遍。\n它等到日头偏西才走。走前留下一句话：'你会需要火的，很快。'当晚你的火堆被风浇灭了。"
            }
        ]
    },
    {
        "id": "evt_daily_dew",
        "weight": 10,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "清晨，木屋外的草叶上凝满了露水。这是迷雾世界少有的馈赠。",
        "choices": [
            {
                "id": "o_0",
                "text": "收集露水",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "一壶清凉的露水。虽然不多，但干净。"
            }
        ]
    },
    {
        "id": "evt_daily_radio_news",
        "weight": 8,
        "minDay": 10,
        "maxTriggers": -1,
        "text": "你摆弄着捡来的旧收音机。刺啦刺啦的杂音里，隐约夹着断续的人声广播。",
        "choices": [
            {
                "id": "o_0",
                "text": "仔细辨认内容",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 6
                    },
                    {
                        "kind": "flag",
                        "flag": "heard_rescue_news"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "「……救援船将于近期抵达东部海岸线……请幸存者……」你把频道记了下来。\n只有杂音。也许只是风声。"
            }
        ]
    },
    {
        "id": "evt_daily_rat",
        "weight": 10,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "一只硕大的灰白老鼠大摇大摆地穿过你的木屋，嘴里还叼着什么。",
        "choices": [
            {
                "id": "o_0",
                "text": "追打它",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_raw_meat",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    }
                ],
                "next": "__return__",
                "result": "雾鼠丢下赃物逃了。你夺回了一块肉干——虽然已经脏了。\n它钻进墙缝消失了。你的储备又少了一点。"
            },
            {
                "id": "o_1",
                "text": "随它去",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -2
                    }
                ],
                "next": "__return__",
                "result": "只要它别再带朋友来就行。"
            }
        ]
    },
    {
        "id": "evt_daily_birds",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "一大群鸟突然从林子方向炸开般飞起，盘旋着不肯落下。它们在怕什么？",
        "choices": [
            {
                "id": "o_0",
                "text": "记下方位，今天避开那边",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -1
                    },
                    {
                        "kind": "flag",
                        "flag": "birds_warned"
                    }
                ],
                "next": "__return__",
                "result": "直觉救过很多次命了。你把那个方向刻在了门框上。"
            },
            {
                "id": "o_1",
                "text": "鸟都跑了说明没危险？照常探索",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    }
                ],
                "next": "__return__",
                "result": "一整天你都感觉背后有视线。晚上回想起来，还是后颈发凉。"
            }
        ]
    },
    {
        "id": "evt_daily_smoke",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "透过雾隙，你看见远处升起一道笔直的烟柱——有人在你附近生火。而且那烟烧得又直又旺，像是在刻意打招呼。",
        "choices": [
            {
                "id": "o_0",
                "text": "也生一堆烟回应（消耗木材）",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 10
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": -1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    }
                ],
                "next": "__return__",
                "result": "对面的烟柱欢快地扭了一下，随后熄灭——像是完成了任务。世界频道上多了一句：「东边的朋友你好呀」。你笑了。\n你的烟刚起来，对面瞬间熄灭了。之后那里再没有升起过烟。"
            },
            {
                "id": "o_1",
                "text": "保持隐蔽，观察一天",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "你趴在窗口看了一整天。烟柱的主人很谨慎，你们谁也没找到谁。"
            }
        ]
    },
    {
        "id": "evt_daily_carving",
        "weight": 7,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "你整理木屋时发现门框内侧刻着密密麻麻的正字，最下面一行小字：「第9天 我还活着 你们也要活下去」。最后几刀明显没了力气。",
        "choices": [
            {
                "id": "o_0",
                "text": "在旁边刻上自己的正字",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 7
                    }
                ],
                "next": "__return__",
                "result": "一刀一刀，你把「第一天」刻得很深。从今天起，这间屋子的门框上有两个人的日子。"
            }
        ]
    },
    {
        "id": "evt_daily_dream_family",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "夜里你梦见了家：厨房的灯、沙发的凹陷、阳台上晾着没干的衣服。醒来时枕头湿了一片，屋里冷得像冰窖。",
        "choices": [
            {
                "id": "o_0",
                "text": "把梦里的细节写在墙上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 9
                    }
                ],
                "next": "__return__",
                "result": "「厨房灯是暖黄色的。」写下来的瞬间，那些东西就永远不会丢了。你要活着回去核对每一个细节。"
            },
            {
                "id": "o_1",
                "text": "不敢回想，立刻起身干活",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "麻木是很好的止痛药。你劈了一上午柴，手掌磨出了血泡也没觉得疼。"
            }
        ]
    },
    {
        "id": "evt_daily_tooth",
        "weight": 6,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "早上啃黑面包时，一颗牙晃了。你对着水洼照了照——牙龈苍白，嘴唇也裂着。你的身体开始抗议了。",
        "choices": [
            {
                "id": "o_0",
                "text": "省着点吃，把好的留给明天",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -1
                    }
                ],
                "next": "__return__",
                "result": "细水长流。虽然还是饿，但至少不用和自己的牙较劲。"
            },
            {
                "id": "o_1",
                "text": "该吃吃！身体是撑出来的",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    }
                ],
                "next": "__return__",
                "result": "你狠狠嚼完了双份口粮。牙齿的问题……以后再说吧。"
            }
        ]
    },
    {
        "id": "evt_daily_rain_mushroom",
        "weight": 7,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "昨夜下过雨，屋后的腐木上冒出了一片嫩菌子。迷雾世界的菌子长得格外快，也格外……随机。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑小的采",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 2
                    }
                ],
                "next": "__return__",
                "result": "小菌子最安全，这是老饕的常识。今晚加菜！\n还是有两条漏网之鱼混进锅里了……半夜你抱着肚子在屋里转圈。"
            },
            {
                "id": "o_1",
                "text": "全采全晒，存起来",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "mat_charcoal",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "晒干后能放很久。万一哪天断粮，这些干菌子就是救命稻草。"
            }
        ]
    },
    {
        "id": "evt_daily_knock_help",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "世界频道上，一个坐标离你不远的幸存者发消息：「谁有多余的水 我三天没喝干净水了 好心人有吗」。",
        "choices": [
            {
                "id": "o_0",
                "text": "送他一份净水",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 12
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": -1
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "你把水放在了约定的石头下。傍晚路过时，石头上多了一把野蜂蜜。「谢谢。活下去。」——人心在雾里也能传热。"
            },
            {
                "id": "o_1",
                "text": "送一份脏水（也是心意）",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 5
                    },
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "「谢了 聊胜于无」。频道那头的语气听不出喜怒。但至少你出手了。"
            },
            {
                "id": "o_2",
                "text": "自己也快断了，装没看见",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    }
                ],
                "next": "__return__",
                "result": "那条求助消息后来没有更新了。你告诉自己：先活下来的人才有资格谈善良。"
            }
        ]
    },
    {
        "id": "evt_daily_exercise",
        "weight": 7,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "难得的晴朗间隙。你在木屋前伸了个懒腰，决定活动一下僵硬的身体——毕竟在这个世界，身体是唯一的本钱。",
        "choices": [
            {
                "id": "o_0",
                "text": "做一套广播体操（第七套）",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 6
                    }
                ],
                "next": "__return__",
                "result": "熟悉的口号让肌肉都记起了学生时代。微微出汗，浑身舒畅。"
            },
            {
                "id": "o_1",
                "text": "算了，多睡十分钟",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 3
                    }
                ],
                "next": "__return__",
                "result": "被窝是人类最伟大的发明。虽然起来时更冷了，但精神确实好了些。"
            }
        ]
    },
    {
        "id": "evt_daily_channel_fight",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "世界频道上两个人吵起来了：「你凭什么拿走我藏的箱子！」「迷雾里的东西没有主人！」几百人在围观，还有人开了赌盘猜谁赢。",
        "choices": [
            {
                "id": "o_0",
                "text": "围观吃瓜",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "吵了整整一上午，最后两人约在雾里单挑。频道安静了一小时后，有人发了句「人没了」。全场沉默。你默默关掉了面板。"
            },
            {
                "id": "o_1",
                "text": "发一句：都少说两句 囤货要紧",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 4
                    }
                ],
                "next": "__return__",
                "result": "你的发言被顶到了热评第一。争吵不了了之。理性的人还是比想象中多一点。"
            }
        ]
    },
    {
        "id": "evt_daily_old_news",
        "weight": 6,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "你在柜子底层翻出一叠穿越前的旧报纸。头条日期是灾难前一天：「本市明日有雾 出行请注意安全」。命运开了一个巨大的玩笑。",
        "choices": [
            {
                "id": "o_0",
                "text": "仔细读一遍这些新闻",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 8
                    }
                ],
                "next": "__return__",
                "result": "菜价、球赛、明星八卦……这些琐碎到可笑的日常，现在读来字字珍贵。你把报纸仔细收好：这是文明存在过的证据。"
            },
            {
                "id": "o_1",
                "text": "拿来引火",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    },
                    {
                        "kind": "item",
                        "item": "mat_charcoal",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "头版头条烧得最快。火焰里有油墨的味道，像是在替那个世界说最后的告别。"
            }
        ]
    },
    {
        "id": "evt_d_stray_cat",
        "weight": 9,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "一只瘦骨嶙峋的三花猫蹲在你的柴堆上，用一种'本喵考察过了，这里能活'的眼神看着你。",
        "choices": [
            {
                "id": "o_0",
                "text": "分它一点吃的",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 8
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "它吃得很慢很斯文，吃完在你门口蹭了蹭。从此你的屋檐下多了一位编外居民。"
            },
            {
                "id": "o_1",
                "text": "装作没看见",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    }
                ],
                "next": "__return__",
                "result": "它盯了你三秒，跳下柴堆走了。尾巴尖甩了甩，像在说'行吧'。\n当晚你听见它在屋顶上叫了一整夜。声音像小孩哭。"
            }
        ]
    },
    {
        "id": "evt_d_postman",
        "weight": 6,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "一个背着巨大邮包的人影从雾里走出来，制服笔挺，皮鞋锃亮。'您的信。'他把一封空信封递给你，然后转身离开。",
        "choices": [
            {
                "id": "o_0",
                "text": "追上去问是谁寄的",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 10
                    },
                    {
                        "kind": "flag",
                        "flag": "postman_met"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    },
                    {
                        "kind": "flag",
                        "flag": "postman_met"
                    }
                ],
                "next": "__return__",
                "result": "'寄件人是未来的您。'他没有回头，'他说这封信很重要——所以是空的，内容要您自己写。'\n你追进了雾里，直到看不见任何东西。回家后你在信封内衬摸到一行凸起的字：'别回头。'"
            },
            {
                "id": "o_1",
                "text": "收下信封不追问",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 3
                    }
                ],
                "next": "__return__",
                "result": "有些问题不适合问穿制服的人。你把空信封压在枕头下。"
            }
        ]
    },
    {
        "id": "evt_d_mirrors",
        "weight": 7,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "你在碎裂的后视镜前洗手。水声停了以后，镜子里的你还保持着洗手的动作。",
        "choices": [
            {
                "id": "o_0",
                "text": "直视它",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 5
                    }
                ],
                "next": "__return__",
                "result": "你们对峙了很久。最后它先眨了眼——然后你发现自己一直闭着眼。\n你冲它做了个鬼脸。它做了一个更丑的。不知为何你想笑，恐惧就这样散了。"
            },
            {
                "id": "o_1",
                "text": "用布把镜子蒙上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "眼不见为净。但你知道它在布后面看着你吃饭、睡觉、呼吸。"
            }
        ]
    },
    {
        "id": "evt_d_rainbow",
        "weight": 6,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "两场浓雾之间居然出现了彩虹，一头扎进雾海深处，像通往另一个世界的桥。",
        "choices": [
            {
                "id": "o_0",
                "text": "对着彩虹发一会呆",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 10
                    }
                ],
                "next": "__return__",
                "result": "七种颜色在灰白世界里亮得刺眼。你想起小时候也这样看过天。"
            },
            {
                "id": "o_1",
                "text": "朝彩虹尽头走一段",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 6
                    },
                    {
                        "kind": "item",
                        "item": "herb_green",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "当然没有宝藏。但你采到了一大捧被雨水催开的野花，插在窗边的罐头瓶里。\n你越走越远，回头的路标全被雾吞了。凭记忆摸索了两小时才回来，又累又饿。"
            }
        ]
    },
    {
        "id": "evt_d_sneeze",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "今天喷嚏打个不停，鼻音重得像另一个人在说话。",
        "choices": [
            {
                "id": "o_0",
                "text": "多喝热水硬扛",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -2
                    }
                ],
                "next": "__return__",
                "result": "热流滚过喉咙，好受了一点。\n热水从鼻子里呛了出来。狼狈，没用。"
            },
            {
                "id": "o_1",
                "text": "吃点好的增强抵抗力",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": -1
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "一整罐罐头下肚，身体有了打仗的本钱。\n吃完就吐了。病中肠胃根本受不了油腻。"
            }
        ]
    },
    {
        "id": "evt_d_ants",
        "weight": 7,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "门前的蚂蚁排成一条黑线，衔着白色卵粒向高处迁移。老话讲，这是大雨的预告。",
        "choices": [
            {
                "id": "o_0",
                "text": "相信蚂蚁，加固屋顶",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 4
                    },
                    {
                        "kind": "flag",
                        "flag": "roof_fixed"
                    }
                ],
                "next": "__return__",
                "result": "你抢在大雨前补好了漏点。夜里雨声如鼓，屋里滴雨未落。\n白忙一场，一夜无雨。但至少劳动让人睡得香。"
            },
            {
                "id": "o_1",
                "text": "观察蚁群路线找它们的粮仓",
                "effects": [
                    {
                        "kind": "item",
                        "item": "herb_green",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -1
                    }
                ],
                "next": "__return__",
                "result": "顺藤摸瓜挖出一小堆草籽。炒一炒能顶一顿。\n你趴在地上看了半小时，膝盖印都留在了地上。什么也没捞着。"
            }
        ]
    },
    {
        "id": "evt_d_radio_static",
        "weight": 8,
        "minDay": 10,
        "maxTriggers": -1,
        "text": "深夜没开机，收音机却自己响起细弱的电流声，像有人隔着频段在犹豫要不要说话。",
        "choices": [
            {
                "id": "o_0",
                "text": "凑近听清楚",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 6
                    },
                    {
                        "kind": "flag",
                        "flag": "rescue_hint"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 4
                    }
                ],
                "next": "__return__",
                "result": "'……第七区的幸存者请注意……'断断续续的坐标信息！你抄了下来。\n杂音里渐渐分辨出一段哼唱——是哄孩子睡觉的调子。你默默听了很久。"
            },
            {
                "id": "o_1",
                "text": "拔掉电池",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -2
                    },
                    {
                        "kind": "flag",
                        "flag": "radio_silenced"
                    }
                ],
                "next": "__return__",
                "result": "有些频道不该通。你把电池收进铁盒，压在箱底。"
            }
        ]
    },
    {
        "id": "evt_d_old_news",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "风把一张旧报纸糊在你的窗户上，日期正是迷雾降临那天。头版标题只有半截：'全球性浓雾……请市民勿要……'",
        "choices": [
            {
                "id": "o_0",
                "text": "读完每一个字",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 3
                    }
                ],
                "next": "__return__",
                "result": "后半截被人撕走了，撕口很整齐——是故意不让你看的。\n角落里有一则寻人启事：寻找走失老人，特征：会说梦话，内容为天气预报。"
            },
            {
                "id": "o_1",
                "text": "留着引火",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_charcoal",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "纸是好纸，火是真火。过去的事就该烧掉取暖。"
            }
        ]
    },
    {
        "id": "evt_d_dandelion",
        "weight": 7,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "墙角钻出一株蒲公英，绒球完好无损。在这个连灰尘都带着湿气的世界里，它干净得不像话。",
        "choices": [
            {
                "id": "o_0",
                "text": "吹散它许个愿",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 6
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 8
                    }
                ],
                "next": "__return__",
                "result": "种子乘着无风的空气飞出很远很远。你许的愿是'明天也想看见太阳'。\n你一吹，绒毛全粘在了自己脸上。愿望没许成，倒把自己逗笑了。"
            },
            {
                "id": "o_1",
                "text": "连根移栽到窗台",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 4
                    },
                    {
                        "kind": "flag",
                        "flag": "window_garden"
                    }
                ],
                "next": "__return__",
                "result": "罐头盒、溪泥、蒲公英。你的窗台有了第一个住客。"
            }
        ]
    },
    {
        "id": "evt_d_caravan",
        "weight": 6,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "远处传来铃铛声和拖长的叫卖：'盐——火柴——针线——拿粮食来换嘞——'一支小商队正沿着雾墙边缘移动。",
        "choices": [
            {
                "id": "o_0",
                "text": "拿物资去换盐",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 4
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": -3
                    },
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "三捆木柴换了小半袋粗盐。商人临走多塞给你一颗水果糖：'看你面善。'\n交易到一半起了雾风，商队突然加速离开，你追出去百米无功而返。"
            },
            {
                "id": "o_1",
                "text": "躲在屋里观察他们",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -2
                    },
                    {
                        "kind": "flag",
                        "flag": "caravan_passed"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    }
                ],
                "next": "__return__",
                "result": "商队共五人两车。他们经过你家时敲了敲门：'有人吗？我们不留货。'你没应。\n你注意到队尾的人走路姿势很怪，像是脚不沾地。铃声远了以后，你才发现自己在发抖。"
            }
        ]
    },
    {
        "id": "evt_d_photo_memory",
        "weight": 6,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "你又拿出那张旧照片。这次你没有看背面，而是盯着正面的海滩看了很久很久。",
        "choices": [
            {
                "id": "o_0",
                "text": "回忆和老K的相识",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 3
                    }
                ],
                "next": "__return__",
                "result": "照片上的年轻人笑得一嘴白牙。那时候谁都以为明天会更好。你想给他讲讲后来发生的事。"
            },
            {
                "id": "o_1",
                "text": "把照片朝下扣在桌上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    }
                ],
                "next": "__return__",
                "result": "有些记忆需要扣一会儿，等心里那块地翻松了再翻开看。"
            }
        ]
    },
    {
        "id": "evt_d_fogbell",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "正午十二点整，浓雾深处传来了钟声。一下，一下，不多不少敲了十二下。这个世界没有钟楼。",
        "choices": [
            {
                "id": "o_0",
                "text": "跟着数完整",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 6
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    }
                ],
                "next": "__return__",
                "result": "十二下，分毫不差。数完的瞬间你莫名安心：至少还有什么东西在守时。\n第十二下之后，隔了很久，又有极轻的第十三下。你假装没听见。"
            },
            {
                "id": "o_1",
                "text": "捂住耳朵干活",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "你劈了一下午柴。斧头声和钟声混在一起，反而踏实。"
            }
        ]
    },
    {
        "id": "evt_edge_driftwood",
        "weight": 10,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "雾气在脚下流淌。你在一截倒伏的巨木旁停下——木头深处似乎嵌着什么东西，泛着微弱的反光。",
        "choices": [
            {
                "id": "o_0",
                "text": "费力撬出来",
                "effects": [
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -2
                    }
                ],
                "next": "__return__",
                "result": "是一把还算完好的手电筒！电池居然还有电。\n只是个空罐头盒。白费力气。"
            },
            {
                "id": "o_1",
                "text": "先劈开木头当柴火",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 1
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 2
                    }
                ],
                "next": "__return__",
                "result": "干燥的木柴，今晚的火有着落了。"
            }
        ]
    },
    {
        "id": "evt_edge_bottle",
        "weight": 6,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "浓雾边缘，一只玻璃瓶卡在礁石缝里，瓶中卷着一张纸条：「如果你也看到这张纸——你不是一个人。」",
        "choices": [
            {
                "id": "o_0",
                "text": "把纸条小心收好",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 8
                    }
                ],
                "next": "__return__",
                "result": "知道有人在同一片迷雾里挣扎着，心里竟然踏实了一些。"
            }
        ]
    },
    {
        "id": "evt_edge_ashes",
        "weight": 9,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一圈石头围着一堆灰烬——有人在这里过夜。灰烬中央似乎还有没烧尽的东西。",
        "choices": [
            {
                "id": "o_0",
                "text": "翻找灰烬",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    },
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    },
                    {
                        "kind": "item",
                        "item": "tool_lighter",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "半截烧焦的布料还能用。主人应该走得不远……\n只有灰。但灰是温的——就在刚才，还有人坐在这里。\n灰下埋着一个打火机！主人大概是忘了它。"
            },
            {
                "id": "o_1",
                "text": "别碰，赶紧离开",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -2
                    }
                ],
                "next": "__return__",
                "result": "在迷雾里，其他幸存者未必是朋友。"
            }
        ]
    },
    {
        "id": "evt_edge_mire",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "退潮后的滩涂上，泥沼里陷着半个箱子，在雾里若隐若现。泥沼看起来不深——大概。",
        "choices": [
            {
                "id": "o_0",
                "text": "卷起裤腿下去挖",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "箱子里是几罐保存完好的罐头！泥浆也算不了什么。\n箱子是空的。而你的一只鞋永远留在了泥沼里，脚也被硬物划伤了。"
            },
            {
                "id": "o_1",
                "text": "用树枝够一够",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -2
                    }
                ],
                "next": "__return__",
                "result": "够到了！一小卷绳索从箱缝里滑了出来。\n树枝断了，箱子纹丝不动。"
            }
        ]
    },
    {
        "id": "evt_forest_boar",
        "weight": 12,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "灌木丛猛地一颤——一头獠牙发黑的野猪正低头拱土，距离你不到十步。它还没发现你。",
        "choices": [
            {
                "id": "o_0",
                "text": "握紧武器冲上去（战斗）",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_raw_meat",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    }
                ],
                "next": "__return__",
                "result": "搏斗中你被撞翻在地，但最终结果了它。一大块鲜肉！\n你灵活地爬上了树。野猪撞了几下树干，悻悻离去。\n野猪的獠牙擦过你的大腿！你连滚带爬才逃开。"
            },
            {
                "id": "o_1",
                "text": "悄悄绕开",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    }
                ],
                "next": "__return__",
                "result": "你屏住呼吸退进树影。它哼了一声，走远了。\n脚下枯枝一声脆响！野猪抬头直视你的方向……你狂奔逃命。"
            },
            {
                "id": "o_2",
                "text": "【猎手】算好风向，从上风口接近",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 5
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_meat",
                        "amount": 3
                    }
                ],
                "next": "__return__",
                "result": "一击毙命。猎手的直觉从不出错。"
            }
        ]
    },
    {
        "id": "evt_forest_mushroom",
        "weight": 10,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一棵朽木下长着一片蘑菇，肥厚饱满。其中几朵伞盖泛着不自然的紫色。",
        "choices": [
            {
                "id": "o_0",
                "text": "只采白色的",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 2
                    }
                ],
                "next": "__return__",
                "result": "安全第一。晚饭有着落了。\n晚上吃完就开始头晕……好像混进去毒蘑菇！"
            },
            {
                "id": "o_1",
                "text": "紫色的也许能卖钱？全采了",
                "effects": [
                    {
                        "kind": "item",
                        "item": "med_sedative",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "你赌赢了——这种「雾菇」晒干后是很好的安神药引。\n当晚你就上吐下泻。教训惨痛。"
            }
        ]
    },
    {
        "id": "evt_forest_old_trap",
        "weight": 9,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "锈迹斑斑的捕兽夹半埋在落叶里，弹簧还绷得紧紧的。夹子上挂着几缕灰白色的毛——不是任何你认识的动物。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心拆解它",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "咔哒一声，夹子松开了。弹簧和铁片都是好材料。\n咔嚓——夹子猛地弹合，咬住了你的手指！"
            },
            {
                "id": "o_1",
                "text": "把它整个搬回去当武器",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    }
                ],
                "next": "__return__",
                "result": "沉是沉了点，但这玩意儿既能防身又能再利用。\n搬运途中夹子突然弹开，划破了你的小臂。"
            }
        ]
    },
    {
        "id": "evt_forest_sap",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一棵粗壮的白桦树干上有道旧的切口，树汁正顺着痕迹缓缓渗出，在树下积成一个小水洼。",
        "choices": [
            {
                "id": "o_0",
                "text": "切开树皮接树汁",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 3
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "清甜微凉的树汁，带着桦树的清香。这是迷雾里少见的温柔。\n切口流出的汁液发苦发浊——这棵树病了。"
            },
            {
                "id": "o_1",
                "text": "砍下带切口的树皮引火",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_charcoal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "桦树皮是最好的火引子，一点就着。"
            }
        ]
    },
    {
        "id": "evt_market_pharmacy",
        "weight": 11,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "超市角落的药店柜台玻璃碎了一地，处方药被搜刮了大半。柜台最里面有个带锁的抽屉，锁扣已经松动。",
        "choices": [
            {
                "id": "o_0",
                "text": "撬开抽屉",
                "effects": [
                    {
                        "kind": "item",
                        "item": "med_antibiotic",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_painkiller",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -2
                    },
                    {
                        "kind": "item",
                        "item": "med_painkiller",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "抗生素、止痛药——这一抽屉能救命！\n只有一堆过期维生素和一本药品说明书。\n抽屉里盘着一条冬眠的蛇！它受惊咬了你一口就窜走了。"
            },
            {
                "id": "o_1",
                "text": "太吵容易招人，放弃",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -1
                    }
                ],
                "next": "__return__",
                "result": "谨慎点好。你退出了药店区。"
            }
        ]
    },
    {
        "id": "evt_market_freezer",
        "weight": 10,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "生鲜区的冷冻库门虚掩着，冷气还在往外冒——这里居然还通着电？货架上的冻肉让你的胃狠狠抽搐了一下。",
        "choices": [
            {
                "id": "o_0",
                "text": "冲进去能拿多少拿多少",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_raw_meat",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_meat",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "两大块冻肉抱在怀里，透心凉，心里美！\n地面的冰霜滑得像陷阱。你摔了个结实，怀里的肉也掉了一半。"
            },
            {
                "id": "o_1",
                "text": "研究一下为什么还有电",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    },
                    {
                        "kind": "flag",
                        "flag": "found_generator"
                    }
                ],
                "next": "__return__",
                "result": "你顺着电线摸过去，发现一台柴油发电机还在低吼。油箱里的存油……被抽走了大半，只留下一层底油和一股汽油味。"
            }
        ]
    },
    {
        "id": "evt_creek_fishing",
        "weight": 10,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "溪水清澈见底，几条肥美的鱼在卵石间游弋。这里难得没有浓雾。",
        "choices": [
            {
                "id": "o_0",
                "text": "下竿垂钓",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 5
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_fish",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_fish",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "浮漂一顿——两条鱼！今晚加餐。\n一下午只有一条小鱼咬钩。\n鱼没钓到，倒是脚底滑进溪水里，浑身湿透。"
            },
            {
                "id": "o_1",
                "text": "顺便灌满水壶",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 2
                    }
                ],
                "next": "__return__",
                "result": "上游的水很干净，直接喝也没大碍。"
            }
        ]
    },
    {
        "id": "evt_creek_upstream",
        "weight": 9,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "上游漂下来一个鼓鼓囊囊的防水包，卡在了两块岩石之间。包身写着一行褪色的字：户外用品店·促销。",
        "choices": [
            {
                "id": "o_0",
                "text": "下水去捞",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    },
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "包里是一条崭新的鱼线和一把多功能刀片！今天运气不错。\n水流比看上去急得多！你呛了好几口水才爬上岸，包也漂走了。"
            },
            {
                "id": "o_1",
                "text": "用鱼竿把包勾过来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 3
                    },
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "工具用对了地方。包里的东西一件不少。"
            }
        ]
    },
    {
        "id": "evt_creek_reflection",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "你在溪边蹲下想洗把脸。水面平静下来的那一刻，倒影里的「你」比你慢了半拍才抬手。",
        "choices": [
            {
                "id": "o_0",
                "text": "死死盯住它，看谁先眨眼",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 12
                    },
                    {
                        "kind": "flag",
                        "flag": "faced_reflection"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -14
                    }
                ],
                "next": "__return__",
                "result": "对峙了不知多久，「它」先散开了。溪水依旧清澈。你忽然觉得没那么怕了——连自己的影子都吓不住你。\n倒影突然咧嘴笑了。你踉跄着后退，溅起的水花打碎了那张脸。"
            },
            {
                "id": "o_1",
                "text": "立刻转身离开，不再看水",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -7
                    }
                ],
                "next": "__return__",
                "result": "眼不见为净。但那一整天，你都在回想那慢掉的半拍。"
            }
        ]
    },
    {
        "id": "evt_village_cellar",
        "weight": 11,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一间半塌的农舍后面，一扇木门斜嵌在地里——地窖。门轴锈死了，门缝里飘出陈腐的气息，以及……若有若无的食物味。",
        "choices": [
            {
                "id": "o_0",
                "text": "打开手电筒下去",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 5
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "光柱扫过：整整齐齐两排储物架！罐头、腊肠、腌菜……这家人走得一定很匆忙。\n架子上的食物早就烂透了。但角落里有只完好的急救箱。"
            },
            {
                "id": "o_1",
                "text": "摸黑下去",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -12
                    }
                ],
                "next": "__return__",
                "result": "你凭着触觉摸到了几个罐头，赶紧逃出了黑暗。\n第三级台阶是空的！你重重摔进黑暗里，有什么液体淋了一头。你连滚带爬冲向门口的光亮。"
            },
            {
                "id": "o_2",
                "text": "做个记号，改日再来",
                "effects": [],
                "next": "__return__",
                "result": "工欲善其事，必先利其器。至少要等有光源再说。"
            }
        ]
    },
    {
        "id": "evt_village_well",
        "weight": 9,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "村子中央有一口古井。你朝井底扔了颗石子——很久很久之后，传来一声轻响。不对，井没那么深。而且刚才那声音……像是被什么软东西接住的。",
        "choices": [
            {
                "id": "o_0",
                "text": "吊着绳子下去看看",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": -1
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -10
                    },
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": -1
                    },
                    {
                        "kind": "item",
                        "item": "key_map_fragment",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_painkiller",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "井底的「软东西」是一个前人留下的背包！里面的物资保存完好。\n背包旁边靠着一具白骨，手里攥着半张地图。你礼貌地道了歉，取走了地图和背包里的药。"
            },
            {
                "id": "o_1",
                "text": "对着井口大喊一声",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -9
                    }
                ],
                "next": "__return__",
                "result": "「喂——」回声散尽后，井底传来极轻极轻的一声回应。你决定不去细听那是回声还是别的什么。"
            }
        ]
    },
    {
        "id": "evt_mine_cart",
        "weight": 10,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "锈蚀的铁轨伸进矿洞深处。一辆还算完整的矿车停在岔口，轨道上方的指示牌歪歪斜斜：「3号矿脉 →」。",
        "choices": [
            {
                "id": "o_0",
                "text": "推着矿车沿轨道深入",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    },
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 3
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    }
                ],
                "next": "__return__",
                "result": "吱嘎声里，矿车把你送到了一处富矿断面！石料和金属管够。\n半路一根枕木断裂，矿车脱轨侧翻！你被甩进了积水里。"
            },
            {
                "id": "o_1",
                "text": "只在岔口附近敲敲打打",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 2
                    }
                ],
                "next": "__return__",
                "result": "稳妥起见。你捡到了些散落的矿石。"
            }
        ]
    },
    {
        "id": "evt_miner_helmet",
        "weight": 9,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "巷道尽头靠着墙坐着一位矿工——或者说，曾经是矿工的人。他头上的安全帽矿灯竟然还亮着一点幽光，膝盖上摊着一个笔记本。",
        "choices": [
            {
                "id": "o_0",
                "text": "取下矿灯，合上本子",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    },
                    {
                        "kind": "flag",
                        "flag": "read_miner_note"
                    },
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "矿灯还能用！本子最后一页写着：「雾会听。别在洞里说想家。」你把这句话记住了，也把他的双手交叠好了。"
            },
            {
                "id": "o_1",
                "text": "读完笔记本的每一页",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -10
                    },
                    {
                        "kind": "flag",
                        "flag": "read_miner_note"
                    },
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_sedative",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "整整四十页，记录的都是同一件事：他在雾里听见了他女儿的声音，一天比一天近。「明天我就去找她」。最后一页是空白。你默默取下了矿灯。"
            }
        ]
    },
    {
        "id": "evt_deepfog_wall",
        "weight": 15,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "火把的光推开浓雾，照出一面光滑如镜的岩壁。贴近了才发现——岩壁里封着无数张一闪即逝的脸。它们在同时低语，说的都是你熟悉的话。",
        "choices": [
            {
                "id": "o_0",
                "text": "凑近去听清楚一句",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -12
                    },
                    {
                        "kind": "flag",
                        "flag": "whisper_hint"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -16
                    }
                ],
                "next": "__return__",
                "result": "千百个声音里，你捕捉到了一句：「……第七天，向北……」。你不知道这意味着什么，但你记住了。\n所有声音在同一瞬间叫出了你的名字。你捂着耳朵跌坐在地，火把差点熄灭。"
            },
            {
                "id": "o_1",
                "text": "捂住耳朵快步通过",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "不看，不听。低语声在身后渐渐远去，像潮水退出沙滩。"
            }
        ]
    },
    {
        "id": "evt_signal_plane",
        "weight": 7,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "头顶的浓雾忽然震颤起来——那是引擎的轰鸣！有什么飞机正在雾层上方飞过。信号枪在你怀里烫得像一块炭。",
        "choices": [
            {
                "id": "o_0",
                "text": "朝天发射信号弹！",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 20
                    },
                    {
                        "kind": "flag",
                        "flag": "flare_used"
                    },
                    {
                        "kind": "item",
                        "item": "key_signal_gun",
                        "amount": -1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -18
                    },
                    {
                        "kind": "item",
                        "item": "key_signal_gun",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "红色的光柱刺穿了浓雾！轰鸣声盘旋了两圈，似乎……注意到了什么。雾层恢复了平静，但你知道他们看见了。\n信号弹哑火了。你看着手里这坨废铁，第一次在迷雾里哭出了声。"
            },
            {
                "id": "o_1",
                "text": "留着，也许该在最后一天用",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    }
                ],
                "next": "__return__",
                "result": "轰鸣声远去了。你盯着自己的手看了很久。这个决定是对是错，没人知道。"
            }
        ]
    },
    {
        "id": "evt_edge_sign",
        "weight": 7,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一块歪斜的金属警示牌立在雾中：「前方区域 浓度异常 禁止入内」。落款处被人用马克笔加了一行字：「别信牌子 那边箱子多」。",
        "choices": [
            {
                "id": "o_0",
                "text": "听后半句的",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 5
                    },
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    }
                ],
                "next": "__return__",
                "result": "牌子后面果然是个小型补给点！留言的好人，祝你平安。\n你在浓得化不开的雾里摸到了一个箱子——然后被里面窜出的东西咬了！你退回来时手里只抓着半张网。"
            },
            {
                "id": "o_1",
                "text": "听牌子的",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 1
                    }
                ],
                "next": "__return__",
                "result": "官方的牌子总不会害人。你绕开了那片区域。也许错过了箱子，但保住了命。"
            }
        ]
    },
    {
        "id": "evt_edge_dog",
        "weight": 7,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "「汪！汪汪！」狗叫声从雾里传来，声音里带着急切。有人养着狗？在这个世界里，一条狗比一把刀更稀罕。",
        "choices": [
            {
                "id": "o_0",
                "text": "循声找过去",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 12
                    },
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    }
                ],
                "next": "__return__",
                "result": "是一条被铁链缠住的老猎犬！你帮它解开缠结，它舔了舔你的手，叼来了一截绳子——像是回礼。\n叫声停了。你找了半小时一无所获，倒是被荆棘划了一腿的口子。"
            },
            {
                "id": "o_1",
                "text": "学两声狗叫逗逗它",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 6
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -2
                    }
                ],
                "next": "__return__",
                "result": "远处的狗叫兴奋地回应了你，一声接一声。虽然幼稚，但你笑了——穿越以来第一次。\n你的模仿太烂了，对面的叫声突然变得低沉凶狠。你明智地撤退了。"
            }
        ]
    },
    {
        "id": "evt_forest_watchtower",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一座消防瞭望塔立在林间空地上，梯子锈蚀但还算结实。塔顶视野应该能穿透一部分迷雾——如果上面安全的话。",
        "choices": [
            {
                "id": "o_0",
                "text": "爬上塔顶眺望",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 8
                    },
                    {
                        "kind": "flag",
                        "flag": "climbed_tower"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    }
                ],
                "next": "__return__",
                "result": "从高处看，雾海像一片灰白色的海洋缓缓起伏。你辨认出了超市和矿洞的方向！这一眼值回票价。\n半路一根横档断裂！你挂在高空晃了半分钟才爬回去。心脏差点从嗓子眼里跳出来。"
            },
            {
                "id": "o_1",
                "text": "搜查塔底的值班室",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "值班室里有一床毛毯、半瓶驱蚊水和一本翻烂的扑克。你带走了能带的。"
            }
        ]
    },
    {
        "id": "evt_forest_hive",
        "weight": 7,
        "minDay": 20,
        "maxTriggers": 1,
        "text": "低矮的灌木上挂着一个野蜂巢，个头不小。蜂蜜是迷雾里的顶级奢侈品——如果操作得当的话。",
        "choices": [
            {
                "id": "o_0",
                "text": "用湿布蒙面摘取",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 8
                    },
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": -1
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_painkiller",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    },
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "收获满满一大块蜜脾！甜到发齁的幸福。\n布没蒙严实。你顶着三个大包狼狈逃窜，蜂蜜也没敢要了。"
            },
            {
                "id": "o_1",
                "text": "太危险，放弃",
                "effects": [],
                "next": "__return__",
                "result": "你和蜜蜂井水不犯河水。走远些还能听见嗡嗡声。"
            }
        ]
    },
    {
        "id": "evt_market_lockers",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "员工休息室的一排储物柜，大部分敞开着被掏空了。只剩三扇柜门还锁着——里面会是什么？",
        "choices": [
            {
                "id": "o_0",
                "text": "逐个撬开",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 4
                    },
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 2
                    }
                ],
                "next": "__return__",
                "result": "第一格：半包烟。第二格：换洗衣服。第三格：一把多功能小刀！这波不亏。\n三格全被撬过了，只剩一张全家福照片掉在地上。你把它摆正了才走。\n第三格里蹿出一只受惊的橘猫，撞翻了整排柜子！混乱中你捞到了它窝里垫着的旧外套。"
            },
            {
                "id": "o_1",
                "text": "只拿走明面上的东西",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "休息室的沙发垫下摸出了几颗糖。甜味让今天好过了一点。"
            }
        ]
    },
    {
        "id": "evt_market_backdoor",
        "weight": 9,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "货架区早就被搬空了，但收银台后面的仓库卷帘门只拉开了一半——下面压着一个轮胎。里面黑漆漆的，深不见底。",
        "choices": [
            {
                "id": "o_0",
                "text": "用轮胎垫着钻进去",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -12
                    }
                ],
                "next": "__return__",
                "result": "仓库深处还有整托盘的货！你扛了两箱压缩饼干出来，累得够呛。\n里面的味道不对劲。你的手电照到了角落里一堆白骨——是老鼠的。数不清的老鼠骨头。你退出得比进去快十倍。"
            },
            {
                "id": "o_1",
                "text": "在门口喊两嗓子试试动静",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    }
                ],
                "next": "__return__",
                "result": "回声散尽，毫无动静。看来是安全的……但你也喊来了别的什么注意。\n黑暗里有东西回应了你——不是语言，是一阵密集的、窸窣的移动声。你默默把卷帘门又压低了一点。"
            }
        ]
    },
    {
        "id": "evt_creek_glint",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "阳光难得地刺破雾层，溪水深处有什么东西反了一下光——就在最深的那个水湾里。",
        "choices": [
            {
                "id": "o_0",
                "text": "深吸一口气潜下去",
                "effects": [
                    {
                        "kind": "item",
                        "item": "tool_iron_axe",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    }
                ],
                "next": "__return__",
                "result": "是一把沉在河底的铁斧！斧刃还泛着新磨的光。谁把它扔在这的？\n你摸到了冰凉的东西，浮上来才发现只是块亮片石头。顺带呛了半肚子水。"
            },
            {
                "id": "o_1",
                "text": "用鱼竿的线钩它",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 5
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "三钩两钩，钩上来一顶金属安全帽——帽檐下卡着一小块碎晶石。"
            }
        ]
    },
    {
        "id": "evt_creek_waterwheel",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "溪流上游立着一架废弃的老水车，轮叶上挂满了青苔。它还在缓缓转动，吱呀、吱呀，像这个世界残存的一口气。",
        "choices": [
            {
                "id": "o_0",
                "text": "检查水车后的蓄水池",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 6
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_fish",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "池子里积着经过沉淀的清水，还有几条被困住的鱼！水车替你干了半天的活。"
            },
            {
                "id": "o_1",
                "text": "拆一块轮叶当木材",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 2
                    }
                ],
                "next": "__return__",
                "result": "老水车吱呀了两声，像是在抗议。你取走了一块腐朽的轮叶，心里有点过意不去。"
            }
        ]
    },
    {
        "id": "evt_village_school",
        "weight": 9,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "「希望小学」的门牌斜挂在锈蚀的大门上。黑板上还留着最后一课的板书：「同学们，明天我们学习《春天来了》。」教室里桌椅东倒西歪，值日表上的名字已经褪色。",
        "choices": [
            {
                "id": "o_0",
                "text": "翻找教师的讲台柜",
                "effects": [
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "tool_radio",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    },
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "教师们的抽屉里翻出了急救包和一台收音机！知识就是力量， literal意思。\n粉笔、教案、一面小红旗。你在讲台抽屉最里面摸到了半包压缩饼干——某个老师留下的应急粮。"
            },
            {
                "id": "o_1",
                "text": "在黑板上写点什么",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 8
                    }
                ],
                "next": "__return__",
                "result": "你拿起粉笔，在《春天来了》下面写上：「第X天，我还活着。」然后对着空教室上了一堂只有自己学生的课。心情竟然好了不少。"
            }
        ]
    },
    {
        "id": "evt_village_scarecrow",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "晒谷场中央立着一个稻草人。你发誓刚才路过时它的脸朝向左边——现在，它正对着你。破草帽下的黑洞洞的脸，说不清是错觉还是别的。",
        "choices": [
            {
                "id": "o_0",
                "text": "走过去把它推倒",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 6
                    },
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    }
                ],
                "next": "__return__",
                "result": "就是个普通稻草人，木杆加稻草。你拆了它的「衣服」（其实是块不错的油布）扬长而去。战胜恐惧最好的方式就是拆了它。\n你的手刚碰到它，整具稻草人突然瘫软倒下——里面的木架子早就朽断了。但你被吓得连退五步，摔进了谷堆里。"
            },
            {
                "id": "o_1",
                "text": "朝它鞠一躬再绕行",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -2
                    }
                ],
                "next": "__return__",
                "result": "入乡随俗，礼多鬼不怪。你郑重地鞠了一躬，从晒谷场边缘绕了过去。身后似乎传来一声轻笑，也可能是风。"
            }
        ]
    },
    {
        "id": "evt_mine_pool",
        "weight": 9,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "巷道尽头是一片墨绿色的地下积水潭，水面平静得像镜面。潭边的岩壁上有敲凿的痕迹——这里曾经被人开采到水下。",
        "choices": [
            {
                "id": "o_0",
                "text": "潜水探一探矿壁",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -10
                    }
                ],
                "next": "__return__",
                "result": "水下岩缝里嵌着发亮的矿脉！你憋着气撬下了好几块。\n水下比想象的深。你的手碰到了什么软绵绵的东西，吓得一口气冲出水面——撞上了洞顶的钟乳石。"
            },
            {
                "id": "o_1",
                "text": "只灌一瓶潭边渗出的清水",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "岩石过滤过的地下水，清凉甘冽。不冒险也有不冒险的收获。"
            }
        ]
    },
    {
        "id": "evt_mine_creak",
        "weight": 10,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "头顶的支撑木发出一声悠长的吱嘎声，细碎的尘土簌簌落下。这片巷道随时可能塌方——但缝隙里能看到未采掘的矿脉在闪光。",
        "choices": [
            {
                "id": "o_0",
                "text": "快进快出，赌一把",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    },
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_charcoal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -10
                    }
                ],
                "next": "__return__",
                "result": "你在尘土飞扬中狂凿了几块富矿冲了出来！身后的支撑木在你跨出瞬间轰然倒塌。\n塌方来得比预想更快！一块巨石擦着你的肩膀砸下来，把你掀翻在地。你拖着腿爬出来的时候天都黑了。"
            },
            {
                "id": "o_1",
                "text": "用木料加固后再挖",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": -2
                    },
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "花了两根木料做支撑，挖掘变得安心许多。稳稳当当满载而归——工程学万岁。"
            }
        ]
    },
    {
        "id": "evt_deepfog_tree",
        "weight": 12,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "浓雾里悬着一棵树——不是长在地上，而是根须朝天，枝丫垂向地面，整个倒悬浮在半空中，随着你的呼吸轻轻摇晃。树上结着拳头大小的、发光的果实。",
        "choices": [
            {
                "id": "o_0",
                "text": "摘一颗果子",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 10
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -10
                    },
                    {
                        "kind": "flag",
                        "flag": "touched_hanging_fruit"
                    }
                ],
                "next": "__return__",
                "result": "果实在掌心化成了一汪清凉的光，顺着喉咙流下去。疲惫一扫而空，连雾气都变得可以原谅了。\n果实在你合拢手指的瞬间炸成一蓬冷光。你打了个寒战，感觉有什么东西顺着光钻进了你的记忆深处。"
            },
            {
                "id": "o_1",
                "text": "绕开这棵不讲道理的树",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "物理学家看了会沉默。你选择尊重常识，绕行了三米远。"
            }
        ]
    },
    {
        "id": "evt_village_photo",
        "weight": 12,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "废弃村庄的一间农舍里，灶台居然是温的。墙角蜷着一个满脸胡茬的男人，见你进来，缓缓举起双手：「别紧张……我叫老K。」桌上摆着一张旧照片。",
        "choices": [
            {
                "id": "o_0",
                "text": "和他搭伙",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 12
                    },
                    {
                        "kind": "flag",
                        "flag": "laok_ally"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -10
                    },
                    {
                        "kind": "flag",
                        "flag": "laok_betrayed"
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "老K会修东西，还懂草药。他说等雾散了一起去找救援队。你多了个同伴。\n当晚老K不见了，带走了你半个背包。照片还留在桌上。"
            },
            {
                "id": "o_1",
                "text": "拿起照片看看",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 5
                    },
                    {
                        "kind": "flag",
                        "flag": "laok_photo_seen"
                    },
                    {
                        "kind": "item",
                        "item": "key_old_photo",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "照片背面写着：老K，勿念。男人的眼圈红了。「这是我闺女画的。」他声音沙哑。气氛缓和了不少。"
            },
            {
                "id": "o_2",
                "text": "转身就走",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    }
                ],
                "next": "__return__",
                "result": "你退出农舍。身后传来一声轻轻的叹息。"
            }
        ]
    },
    {
        "id": "evt_deepfog_altar",
        "weight": 20,
        "minDay": 12,
        "maxTriggers": 1,
        "text": "火把的光只能推开半米浓雾。雾中忽然浮现出一座石台，台上凹槽的形状——和你口袋里的结晶一模一样。",
        "choices": [
            {
                "id": "o_0",
                "text": "放入迷雾结晶",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 10
                    },
                    {
                        "kind": "flag",
                        "flag": "altar_used"
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": -1
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -10
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "石台嗡鸣，浓雾短暂地退开一线。你瞥见了远处沉船湾的轮廓，还有一块新的结晶躺在凹槽旁。\n结晶碎裂，一股寒意钻进你的骨髓。石台拒绝了这份供品。"
            },
            {
                "id": "o_1",
                "text": "放入全部三块结晶（需要三块）",
                "effects": [],
                "next": "__return__",
                "result": "三道光同时亮起——"
            },
            {
                "id": "o_2",
                "text": "记下位置，速速离开",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "好奇心会害死人。你标记了方位，原路撤回。"
            }
        ]
    },
    {
        "id": "evt_ex_mailbox",
        "weight": 10,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "迷雾边缘立着一只绿色邮筒，铁皮锈得厉害，投递口却被人擦得发亮。里面塞满了寄不出去的信。",
        "choices": [
            {
                "id": "o_0",
                "text": "取走有价值的邮票和信纸",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    },
                    {
                        "kind": "flag",
                        "flag": "mail_seen"
                    }
                ],
                "next": "__return__",
                "result": "你抽出一沓信纸和几枚纪念邮票。物资归你，故事留给邮筒。\n最底下一封信的收件人写着你的名字。你没敢拆，塞回了深处。"
            },
            {
                "id": "o_1",
                "text": "把一封写给自己家人的信念出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 10
                    }
                ],
                "next": "__return__",
                "result": "你借着邮筒盖写了一封短信投进去。做完这一切，胸口那块石头轻了一点。"
            }
        ]
    },
    {
        "id": "evt_ex_kite",
        "weight": 9,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "树杈上挂着半截风筝，骨架完好，蒙皮撕了一半。线上还系着一个迷你金属扣。",
        "choices": [
            {
                "id": "o_0",
                "text": "拆下骨架和线",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "竹篾和结实的线都是好材料。\n拆的时候线轴崩开，划伤了手背。"
            },
            {
                "id": "o_1",
                "text": "把风筝放起来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 8
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    }
                ],
                "next": "__return__",
                "result": "风筝在浓雾里飞得很高，看不见了。你盯着线的方向笑了很久。\n线放尽时，另一头传来极轻的一下回拉——像有什么把它接住了。"
            }
        ]
    },
    {
        "id": "evt_ex_footprint",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "泥地上一串脚印，赤足，间距很大，从雾里来又回雾里去。脚印中心被烧出一个个焦黑的小坑。",
        "choices": [
            {
                "id": "o_0",
                "text": "沿脚印追一段",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -10
                    }
                ],
                "next": "__return__",
                "result": "脚印尽头是一小堆还温热的灰烬，里面埋着半罐没开封的罐头。\n你跟丢了。回头时发现自己的来时路上多出一行新的赤足印。"
            },
            {
                "id": "o_1",
                "text": "绕开，别惹麻烦",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    }
                ],
                "next": "__return__",
                "result": "你退回小路。有些好奇心会要命。"
            }
        ]
    },
    {
        "id": "evt_ex_birch_carve",
        "weight": 10,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一棵白桦树上刻满名字和日期，最深的一行是：'等雾散了就回家'。刻痕很新。",
        "choices": [
            {
                "id": "o_0",
                "text": "在下面也刻一个名字",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 6
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    }
                ],
                "next": "__return__",
                "result": "你刻下自己的名字。像是在对这个世界说：我还在。\n刻到一半，树皮渗出的汁液是暗红色的。你换了棵树刻完了后半截。"
            },
            {
                "id": "o_1",
                "text": "检查刻痕附近有没有藏物",
                "effects": [
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "'回家'下方三指处有个油布包：几颗盐和一小卷绳。\n只有一枚生锈的铁盒，空空如也。"
            }
        ]
    },
    {
        "id": "evt_ex_beehive",
        "weight": 9,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "低矮的枝桠上吊着一个野蜂巢，蜂群在冷雾里不太活跃。巢里应该有蜜。",
        "choices": [
            {
                "id": "o_0",
                "text": "用火把熏蜂取蜜",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 12
                    },
                    {
                        "kind": "item",
                        "item": "tool_torch",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "浓烟驱散蜂群。你收获了大块蜜脾，甜到发昏。\n还是有几只倔蜂追着你蛰。脸肿了一天，但蜜是真甜。"
            },
            {
                "id": "o_1",
                "text": "直接伸手掏",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 4
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    }
                ],
                "next": "__return__",
                "result": "手快有！掏出一块蜜脾撒腿就跑。\n蜂群瞬间炸营。你顶着满头包逃出白桦林。"
            }
        ]
    },
    {
        "id": "evt_ex_mushroom_ring",
        "weight": 10,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "林间空地上长着一圈整齐的蘑菇，圆得像用圆规画出来的。老人们说这种圈进不得。",
        "choices": [
            {
                "id": "o_0",
                "text": "采外圈的",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 2
                    }
                ],
                "next": "__return__",
                "result": "外圈是无毒的杨树菇，今晚加餐。\n采着采着你发现自己站在圈子正中央——不记得走过来的。"
            },
            {
                "id": "o_1",
                "text": "采内圈的（更肥嫩）",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 3
                    }
                ],
                "next": "__return__",
                "result": "内圈菌肉厚实，赚了。\n这些颜色艳得不正常。当晚你上吐下泻。"
            },
            {
                "id": "o_2",
                "text": "绕开这个鬼地方",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "你退出去时数了数，圈里一共站着几个影子——你不敢确认是不是零。"
            }
        ]
    },
    {
        "id": "evt_ex_birdcage",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一只黄铜鸟笼挂在枝头，笼门开着，里面却铺着新鲜草叶——像是有人最近还在喂。",
        "choices": [
            {
                "id": "o_0",
                "text": "取走铜笼",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    }
                ],
                "next": "__return__",
                "result": "黄铜是好东西，能换能熔。\n提起来才发现笼底压着一撮羽毛和一张字条：'它先走了'。"
            },
            {
                "id": "o_1",
                "text": "留下食物再走",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 6
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "你在笼边摆了几颗浆果。第二天路过时，浆果不见了，笼门关上了。"
            }
        ]
    },
    {
        "id": "evt_ex_freezer",
        "weight": 11,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "超市断电已久，但最里侧一台冷藏柜的柜门反常地关着，上面压着重物。拉开的瞬间寒气扑面。",
        "choices": [
            {
                "id": "o_0",
                "text": "忍着恶臭翻到底",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_meat",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    },
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "冻了三个月的速冻水饺和牛肉粒。煮开就没问题！\n翻出一袋冻豆子和一股挥之不去的腐味。你在货架间干呕了十分钟。"
            },
            {
                "id": "o_1",
                "text": "只拿柜顶的东西就走",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "柜顶塞着两提卫生纸和一把塑料勺。聊胜于无。"
            }
        ]
    },
    {
        "id": "evt_ex_shelffall",
        "weight": 9,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一声呻吟般的金属扭曲声——头顶整排货架正朝你倾塌下来。",
        "choices": [
            {
                "id": "o_0",
                "text": "向侧前方扑滚",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "货架砸在你身后半米。扬尘里你顺手摸了两件货。\n还是被边缘扫中肩膀。疼，但命在。"
            },
            {
                "id": "o_1",
                "text": "撑住货架争取时间",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 3
                    }
                ],
                "next": "__return__",
                "result": "你硬生生扛住倾斜的角钢，倒身抽出三罐头。力量就是物资。\n角钢太沉，你被压住小腿挣了很久才脱身。"
            }
        ]
    },
    {
        "id": "evt_ex_office",
        "weight": 7,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "办公室的门虚掩着。桌上一本破损账本压着一份供货点名单，抽屉没锁。",
        "choices": [
            {
                "id": "o_0",
                "text": "带走账本仔细研究",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 4
                    },
                    {
                        "kind": "flag",
                        "flag": "ledger_read"
                    },
                    {
                        "kind": "item",
                        "item": "key_ledger",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "账本最后一页用红笔圈了几处'应急库房'。其中一处，似乎就在……沉船方向？"
            },
            {
                "id": "o_1",
                "text": "只翻抽屉",
                "effects": [
                    {
                        "kind": "item",
                        "item": "med_painkiller",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "lux_choco",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "半瓶止痛药和一块融化又凝固的巧克力。\n抽屉夹层弹出一封辞呈，日期是迷雾降临前一天。他到底走成了没有？"
            }
        ]
    },
    {
        "id": "evt_ex_sample",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "促销试吃摊的小桌居然还立着，牙签筒、纸杯一应俱全，仿佛昨夜还有人营业。",
        "choices": [
            {
                "id": "o_0",
                "text": "打扫战场，能吃的都收走",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_black_bread",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -7
                    }
                ],
                "next": "__return__",
                "result": "几包未拆封的饼干和小面包。过期三天，问题不大。\n拆开的一包肉脯上爬满白色小蠕虫。你连牙签筒都没敢碰。"
            },
            {
                "id": "o_1",
                "text": "坐在摊位后扮一回店员",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 5
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 8
                    }
                ],
                "next": "__return__",
                "result": "你对空气喊了一声'试吃啦'。回音散去时，你听见很远处有个孩子笑了一下。\n你笑着笑着就哭了，哭了很久才想起来自己为什么笑。"
            }
        ]
    },
    {
        "id": "evt_ex_cartgrave",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "几十辆购物车在停车场叠成一座歪斜的高塔，风穿过车轮缝发出呜咽般的声音。",
        "choices": [
            {
                "id": "o_0",
                "text": "攀上去拆车筐",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "拆下的金属网格是万能建材。\n车塔在你脚下移位滑动！你摔下来时被车筐刮了个满怀。"
            },
            {
                "id": "o_1",
                "text": "逐辆翻车内遗落物",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    },
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 3
                    }
                ],
                "next": "__return__",
                "result": "第三辆车里躺着婴儿提篮，篮底垫着一件完好的毛衣和半包奶粉。\n除了硬币什么都没有。你收集了一把硬币——万一世界恢复了呢。"
            }
        ]
    },
    {
        "id": "evt_ex_creek_glitter",
        "weight": 11,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "浅滩的水底有什么东西在阳光下闪闪发亮。水凉得刺骨。",
        "choices": [
            {
                "id": "o_0",
                "text": "脱鞋下水摸",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 3
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -9
                    }
                ],
                "next": "__return__",
                "result": "是一枚掉落的银戒指和一把沉底的螺丝刀。\n摸了半天只捞起一把淤泥——以及泥里一只惨白的、不属于任何活人的手模型。"
            },
            {
                "id": "o_1",
                "text": "用鱼竿试探深度顺便钓鱼",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_raw_fish",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    }
                ],
                "next": "__return__",
                "result": "挂底的钩拽上来一串小鱼。一举两得。\n钓上来一只湿透的旧怀表，指针停在 4:44。"
            }
        ]
    },
    {
        "id": "evt_ex_creek_foam",
        "weight": 9,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "溪水上游漂来成片白色泡沫，带着若有若无的甜味。水质明显不对劲。",
        "choices": [
            {
                "id": "o_0",
                "text": "取样观察",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -2
                    },
                    {
                        "kind": "flag",
                        "flag": "creek_suspect"
                    }
                ],
                "next": "__return__",
                "result": "泡沫是上游某处倾倒的洗涤剂残留，无毒。你放心地在下游灌了水。\n甜味来源不明。你决定连下游的水都暂时不喝了——谨慎总没错。"
            },
            {
                "id": "o_1",
                "text": "逆流而上查源头",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "lux_choco",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -12
                    }
                ],
                "next": "__return__",
                "result": "源头是一辆翻倒的清洁车。你在驾驶室里找到一瓶未开封苏打水。\n你看到泡沫尽头泡着一个人形轮廓。你没有靠近的勇气，狂奔而回。"
            }
        ]
    },
    {
        "id": "evt_ex_wet_prints",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "溪边的鹅卵石上有两行刚踩出来的湿脚印，一行大一行小，并排走向密林。",
        "choices": [
            {
                "id": "o_0",
                "text": "跟着脚印走",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    },
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -10
                    }
                ],
                "next": "__return__",
                "result": "脚印尽头是一件晾在树枝上的小孩外套，口袋里有半块饼干。\n你听到林子深处有大人和孩子的笑声，此起彼伏。可这座村子早就没人了。"
            },
            {
                "id": "o_1",
                "text": "折返，今天不再靠近水边",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 3
                    }
                ],
                "next": "__return__",
                "result": "你回到岸上晒太阳。安全感的味道和阳光一样。"
            }
        ]
    },
    {
        "id": "evt_ex_village_well",
        "weight": 10,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "村口的辘轳井边放着两只铁桶，井绳绷得笔直——桶好像还在井里，很沉。",
        "choices": [
            {
                "id": "o_0",
                "text": "摇辘轳拉上来",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "满满一桶井水，冰凉甘冽。另一桶里是有人存好的腌菜。\n第二只桶出水时，你在桶底看到了一只睁着的眼睛——是画上去的，画得很逼真。"
            },
            {
                "id": "o_1",
                "text": "往井里丢块石头听听回声",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 0
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -10
                    },
                    {
                        "kind": "flag",
                        "flag": "well_sos"
                    }
                ],
                "next": "__return__",
                "result": "很久很久才有水声。这井深得不像话。\n石头落地前，井底传来了敲击回应——三短，三长，三短。"
            }
        ]
    },
    {
        "id": "evt_ex_clothesline",
        "weight": 9,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "两户人家之间的晒衣绳还晾着几件衣服，被雨水洗得发白，却叠得整整齐齐地别着夹子。",
        "choices": [
            {
                "id": "o_0",
                "text": "全部收走",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 3
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 4
                    },
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "布料就是资源。你朝空屋子道了声谢。\n收到最后一件，你发现每件衣服的口袋里都装着一张全家福。你把它们原样放了回去。"
            },
            {
                "id": "o_1",
                "text": "只拿一双靴子",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    }
                ],
                "next": "__return__",
                "result": "一双合脚的胶靴。走远路再也不磨脚了。\n靴子里盘着一条正在蜕皮的蛇。你和它互相吓了一大跳。"
            }
        ]
    },
    {
        "id": "evt_ex_granary",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "村仓的地窖门用木杠闩着，缝隙里飘出发霉谷物和另一种说不清的味道。",
        "choices": [
            {
                "id": "o_0",
                "text": "撬开门杠下去",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_black_bread",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    },
                    {
                        "kind": "item",
                        "item": "food_black_bread",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "半窖受潮但还能吃的陈麦，还有一缸密封完好的腌萝卜。\n窖里的陈粮早被什么东西搬空了，只剩墙角堆着整齐的骨头。家畜的——你反复告诉自己。"
            },
            {
                "id": "o_1",
                "text": "在门口撒一圈石灰粉再来",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 2
                    }
                ],
                "next": "__return__",
                "result": "没有石灰，你用灶灰代替。至少蛇虫不爱跨过灰线。下去快取快撤。"
            }
        ]
    },
    {
        "id": "evt_ex_slogan",
        "weight": 7,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "土墙上用红漆刷着大字：'守好家门，等待救援'。漆迹下隐约还有一层更旧的字。",
        "choices": [
            {
                "id": "o_0",
                "text": "辨认下面那层旧字",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -2
                    },
                    {
                        "kind": "flag",
                        "flag": "know_rule"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "旧标语写着：'雾来了，别应声。'两代人守的是同一个村子的规矩。\n旧字被新漆彻底盖死，什么都认不出来。这份沉默比字更瘆人。"
            },
            {
                "id": "o_1",
                "text": "补上一句自己的话",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 7
                    }
                ],
                "next": "__return__",
                "result": "你蘸着锅底灰在旁边写：'第__天，我还活着。'写完数字的那一栏，你填得很用力。"
            }
        ]
    },
    {
        "id": "evt_ex_minelamp",
        "weight": 10,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "矿洞口的工具架上排着几盏老式矿灯，其中一盏竟然还能亮，光柱稳稳打在前方黑暗里。",
        "choices": [
            {
                "id": "o_0",
                "text": "带走能亮的矿灯",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 4
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "灯壳结实，电池还有余量。夜里多一分光就多一分胆。\n灯亮了三步路就熄了。你摸黑撞上工具架，头上挨了一下。"
            },
            {
                "id": "o_1",
                "text": "把所有电池都拆走",
                "effects": [
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 2
                    }
                ],
                "next": "__return__",
                "result": "大小电池七拼八凑凑出五节。电台和手电都有救了。"
            }
        ]
    },
    {
        "id": "evt_ex_cart_push",
        "weight": 9,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "巷道深处停着一辆装满矿石的推车，轨道向前延伸进一片死寂的黑。头顶不时落下碎石。",
        "choices": [
            {
                "id": "o_0",
                "text": "推着车深入",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 4
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "推车挡落了塌方的碎石，你捡回两条命外加满满一车好石头。\n轨道尽头是断崖。你刹不住车，连人带车冲进黑暗——醒来时躺在洞口，浑身是伤。"
            },
            {
                "id": "o_1",
                "text": "只在巷道口捡漏",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 2
                    }
                ],
                "next": "__return__",
                "result": "散落的矿石和一只工牌。你把工牌立在洞口，算是某种纪念。"
            }
        ]
    },
    {
        "id": "evt_ex_water_sound",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "黑暗尽头传来规律的滴水声，还有一丝流动的风——矿洞深处可能有暗河和出口。",
        "choices": [
            {
                "id": "o_0",
                "text": "循声探进去",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 3
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -14
                    }
                ],
                "next": "__return__",
                "result": "暗河！你灌满所有容器，还在河滩上捡到一颗被打磨过的发光晶体。\n暗河边坐着一圈'矿工'，背对着你，一动不动。你踮着脚退出去了，水也没敢灌。"
            },
            {
                "id": "o_1",
                "text": "记下位置改日再来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 1
                    }
                ],
                "next": "__return__",
                "result": "你用石块在巷道壁上做了个箭头记号。有备而来总比莽撞强。"
            }
        ]
    },
    {
        "id": "evt_ex_miner_note",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "休息室的黑板上是潦草的粉笔字：'别挖穿东壁。雾从那边进来。我们错了。'",
        "choices": [
            {
                "id": "o_0",
                "text": "按留言所说避开东壁采西巷",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 3
                    },
                    {
                        "kind": "flag",
                        "flag": "heeded_warning"
                    },
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 2
                    }
                ],
                "next": "__return__",
                "result": "西巷平安无事，你还发现前人藏起的一小袋盐。\n西巷塌了半边。留言的人大概也没料到。你抄近路狼狈撤出。"
            },
            {
                "id": "o_1",
                "text": "偏要看看东壁后面是什么",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -13
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    }
                ],
                "next": "__return__",
                "result": "东壁裂隙里吹出浓稠的白雾，雾里有一面镜子。镜子里你没有脸。你跑得比任何时候都快。\n东壁后是一条被雾灌满的死巷，你抢在塌方前退出，顺走了架上的铁镐头。"
            }
        ]
    },
    {
        "id": "evt_ex_crystal_cluster",
        "weight": 11,
        "minDay": 12,
        "maxTriggers": 1,
        "text": "岩壁上生长着一片迷雾结晶，每一颗都在以心跳般的频率明明灭灭。你数了数，频率和你完全同步。",
        "choices": [
            {
                "id": "o_0",
                "text": "敲下最大的一颗",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 5
                    },
                    {
                        "kind": "flag",
                        "flag": "crystal_taken"
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -10
                    },
                    {
                        "kind": "flag",
                        "flag": "fog_silent"
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "结晶入手温热，光随之熄灭。掌心像捂着一颗小小的太阳。\n结晶碎裂的瞬间，整片雾安静下来——所有的虫鸣、风声，全没了。"
            },
            {
                "id": "o_1",
                "text": "只是看着它们呼吸",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 6
                    }
                ],
                "next": "__return__",
                "result": "你们对视了很久。离开时，有一瞬间你觉得它们在替你保守某个秘密。"
            }
        ]
    },
    {
        "id": "evt_ex_whisperer",
        "weight": 9,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一个由雾构成的人形坐在岩石上，对着掌心絮絮低语。它的声音像很多人在同时说话。",
        "choices": [
            {
                "id": "o_0",
                "text": "凑近听它在说什么",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -12
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -10
                    },
                    {
                        "kind": "flag",
                        "flag": "heard_list"
                    }
                ],
                "next": "__return__",
                "result": "它在重复你三天前说过的一句话，一字不差。然后它转头看你，用你自己的声音说：'该回家了。'\n它在念一份长长的名单。最后一个名字念出来时，你浑身冰凉——那是你认识的人。"
            },
            {
                "id": "o_1",
                "text": "保持距离绕过去",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    }
                ],
                "next": "__return__",
                "result": "你贴着岩壁挪了过去。低语声在你身后停了很久，又缓缓继续。"
            }
        ]
    },
    {
        "id": "evt_ex_glow_hand",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "雾气凝结的岩面上印着一个巨大的五指手印，指尖泛着微光。尺寸不是人类能达到的比例。",
        "choices": [
            {
                "id": "o_0",
                "text": "把手掌覆上去比对",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 0
                    },
                    {
                        "kind": "flag",
                        "flag": "hand_matched"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 15
                    }
                ],
                "next": "__return__",
                "result": "你的手印与它完美重叠——只是小了一号。岩面下传来一声悠长的叹息。\n触感意外地温暖。光芒顺着手臂爬上来，你看见雾的另一面：无数木屋的灯火。幻象消失了，但你记得那份暖意。"
            },
            {
                "id": "o_1",
                "text": "拓下手印图案",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "flag",
                        "flag": "hand_rubbing"
                    }
                ],
                "next": "__return__",
                "result": "你用炭粉拓了一份手印。也许哪天能用得上——或者只是留个念想。"
            }
        ]
    },
    {
        "id": "evt_ex_faceless",
        "weight": 7,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "十步之外站着一个穿雨衣的身影。它没有脸，却让你确凿地感觉到它在看你。",
        "choices": [
            {
                "id": "o_0",
                "text": "挥手打招呼",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    },
                    {
                        "kind": "flag",
                        "flag": "waved_back"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -15
                    }
                ],
                "next": "__return__",
                "result": "它缓缓抬起手，用一模一样的动作向你挥了挥，然后转身走进雾里。不知为何你想哭。\n它开始模仿你每一个动作，越来越快，直到你们的动作重叠成一个。"
            },
            {
                "id": "o_1",
                "text": "举起武器对峙",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 5
                    }
                ],
                "next": "__return__",
                "result": "你握紧手里的东西。人影静止片刻，慢慢后退，融进白色里。勇气有时候就是武器。"
            }
        ]
    },
    {
        "id": "evt_ex_generator",
        "weight": 11,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "塔底的配电房里躺着一台柴油发电机。油箱见底，但机身保养得很好——最近有人在维护它。",
        "choices": [
            {
                "id": "o_0",
                "text": "搜刮机油和零件",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "滤芯、皮带、半桶柴油。机械师看了都会流口水。\n你刚拧下一颗螺栓，整层楼道的灯忽然全亮了——发电机自启了。你夺门而出。"
            },
            {
                "id": "o_1",
                "text": "试着发动它给电台供电",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 6
                    },
                    {
                        "kind": "flag",
                        "flag": "tower_aligned"
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": -1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "轰鸣声中，整套天线阵列缓缓转向东南方。它收到了什么指令。\n发动机咳了几声就熄火了。但你注意到电表读数跳过一格——电从哪来的？"
            }
        ]
    },
    {
        "id": "evt_ex_dutylog",
        "weight": 10,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "值班台上摊着日志本。最后一页的字迹潦草：'D-3。他们回复了。不是救援频道。别回话。千万别回话。'",
        "choices": [
            {
                "id": "o_0",
                "text": "按日志警告执行静默",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 3
                    },
                    {
                        "kind": "flag",
                        "flag": "kept_silent"
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "你把发射机保险丝拔了揣兜里。有些信号，不听比听活得久。"
            },
            {
                "id": "o_1",
                "text": "好奇害死猫：按下回话键",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 10
                    },
                    {
                        "kind": "flag",
                        "flag": "answered_call"
                    },
                    {
                        "kind": "flag",
                        "flag": "rescue_hint"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -12
                    },
                    {
                        "kind": "flag",
                        "flag": "answered_call"
                    }
                ],
                "next": "__return__",
                "result": "电流声里传来清晰的回答：'收到。坚持住。'是个温暖的女声。你选择相信。\n回答你的声音逐字复读了你的话，然后开始复读你此刻的心跳声。你扯断了电源线。"
            }
        ]
    },
    {
        "id": "evt_ex_flag_antenna",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "百米天线的拉索上缠着一面褪色旗帜，旗面画着一个笑脸——有人爬上去挂的，为了给幸存者指路。",
        "choices": [
            {
                "id": "o_0",
                "text": "爬上去取旗",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 6
                    },
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "布料结实防水，正好做屋顶补丁。旗杆顶端的视野让你看清了雾海的全貌。\n爬到一半，固定索松了。你抱着旗杆滑下来的姿势要多狼狈有多狼狈。"
            },
            {
                "id": "o_1",
                "text": "在旗下埋个时间胶囊",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 8
                    }
                ],
                "next": "__return__",
                "result": "你埋下一张字条和一枚硬币。如果有一天有人找到它，请告诉他：这里有人认真地活过。"
            }
        ]
    },
    {
        "id": "evt_ex_flooded_hull",
        "weight": 11,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "搁浅的渔船半个船身浸在海湾里，舱室随潮汐一起一伏，发出鲸息般的声响。",
        "choices": [
            {
                "id": "o_0",
                "text": "趁退潮钻进货舱",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "货舱里码着没泡水的物资箱：罐头、淡水、还有一大袋盐。\n潮水回来得比你预计的快。你抱着抢到的箱子从舱口游了出来。"
            },
            {
                "id": "o_1",
                "text": "搜船长室",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "flag",
                        "flag": "captain_log"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    }
                ],
                "next": "__return__",
                "result": "航海日志与一把黄铜钥匙。日志提到'湾北的集装箱是老周的'。\n船长室墙上钉着一张全家福，相框擦得一尘不染——这艘船上不止你一个人来过。"
            }
        ]
    },
    {
        "id": "evt_ex_chartroom",
        "weight": 9,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "海图桌上摊开着海湾全域图，有人用红铅笔标注了七处叉叉，其中一个画了圈。",
        "choices": [
            {
                "id": "o_0",
                "text": "研究标记点",
                "effects": [
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    },
                    {
                        "kind": "flag",
                        "flag": "map_arrow"
                    }
                ],
                "next": "__return__",
                "result": "画圈的叉对应一处补给暗仓。按图索骥，你在礁石缝里摸出防水盒。\n七个叉连起来是一个箭头，指向陆地深处。指向哪里，图上没有画完。"
            },
            {
                "id": "o_1",
                "text": "揭走整张海图当加固布",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 2
                    }
                ],
                "next": "__return__",
                "result": "厚实的海图纸防潮性能一流。至于秘密嘛，已经糊在屋顶上了。"
            }
        ]
    },
    {
        "id": "evt_ex_drift_bottle",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "浪花把一只玻璃漂流瓶推到你脚边。软木塞封得很紧，瓶身裹着防潮油布——这是认真准备的。",
        "choices": [
            {
                "id": "o_0",
                "text": "打开看信",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    },
                    {
                        "kind": "flag",
                        "flag": "bottle_warn"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 6
                    }
                ],
                "next": "__return__",
                "result": "'如果你捡到这瓶，说明湾里还能走。别信穿救生衣的。'落款日期是上周。\n'今天是我们女儿的五岁生日。蛋糕她爸做了三次都塌了。'信纸上有泪痕晕开的地图。"
            },
            {
                "id": "o_1",
                "text": "留着瓶子装淡水",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "玻璃瓶是储水神器。信你原样塞了回去——有些话属于大海。"
            }
        ]
    },
    {
        "id": "evt_ex_container",
        "weight": 9,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "半埋进沙里的集装箱，门轴锈死，但侧面被人切割过一个仅容一人通过的方洞。",
        "choices": [
            {
                "id": "o_0",
                "text": "钻进去",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    },
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    },
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 2
                    }
                ],
                "next": "__return__",
                "result": "箱内堆着压缩干粮和成捆帆布。你在黑暗里撞翻了什么，随后听见抓挠声从货物深处逼近。\n箱子里用粉笔画满了正字计数，角落蜷着一床叠好的毯子。有人在这里等过很久很久。"
            },
            {
                "id": "o_1",
                "text": "先扔块石头探动静",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -12
                    }
                ],
                "next": "__return__",
                "result": "石头滚了半天停下，没有动静。你安心地搬空了门口的帆布捆。\n石头扔进去，里面传来石头回应——准确地扔回了你脚边。力度刚刚好。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_100",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "歪斜的公交站牌。站牌下有个坐垫。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_101",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "翻倒的婴儿车。车里还挂着一只晃来晃去的奶瓶。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_102",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "挂在校门口的横幅。\"欢迎新同学\"被撕去了一半。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_103",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "半埋的行李箱。锁扣锈死，箱角被什么咬开过。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_104",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一只跑丢的拖鞋。旁边还有另一只的脚印。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_105",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "散落一地的传单。纸上的字已经晕成一片蓝。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_106",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一辆没油的小轿车。后备箱虚掩着。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_107",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "缠满雾水的广告牌。上面印着\"家的味道\"。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_108",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "半埋的行李箱。锁扣锈死，箱角被什么咬开过。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_bandage",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_bandage",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_109",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "翻倒的婴儿车。车里还挂着一只晃来晃去的奶瓶。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_110",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "翻倒的婴儿车。车里还挂着一只晃来晃去的奶瓶。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_111",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "歪斜的公交站牌。站牌下有个坐垫。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_112",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "半埋的行李箱。锁扣锈死，箱角被什么咬开过。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_113",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "翻倒的婴儿车。车里还挂着一只晃来晃去的奶瓶。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_114",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "歪斜的公交站牌。站牌下有个坐垫。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_115",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "半埋的行李箱。锁扣锈死，箱角被什么咬开过。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_116",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一只跑丢的拖鞋。旁边还有另一只的脚印。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_117",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一辆没油的小轿车。后备箱虚掩着。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_bandage",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_bandage",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_118",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "缠满雾水的广告牌。上面印着\"家的味道\"。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_bandage",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_bandage",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_119",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "半埋的行李箱。锁扣锈死，箱角被什么咬开过。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_120",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "翻倒的婴儿车。车里还挂着一只晃来晃去的奶瓶。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_bandage",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_bandage",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_121",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "翻倒的婴儿车。车里还挂着一只晃来晃去的奶瓶。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_bandage",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_bandage",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_122",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一只跑丢的拖鞋。旁边还有另一只的脚印。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_bandage",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_bandage",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_fog_edge_123",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "散落一地的传单。纸上的字已经晕成一片蓝。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_124",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "树杈间的吊床。绳结打得相当专业。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_125",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "挂在枝头的布条阵。每隔几步一条，像路标又像封印。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "herb_green",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 3
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_126",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "苔藓覆盖的石堆。石头的摆放方式不太自然。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "herb_green",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_127",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "系在树上的秋千。木板还在轻轻晃。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "herb_green",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 3
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_128",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一截焦黑的树桩。雷劈的？还是别的火。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 3
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_129",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "树洞里的松果堆。整理得整整齐齐，是松鼠的粮仓。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 3
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_130",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "倒伏的白桦。树干笔直得像标枪。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_131",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一圈新鲜的刨花。附近有人砍过柴。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "herb_green",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_charcoal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "mat_charcoal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_132",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "挂在枝头的布条阵。每隔几步一条，像路标又像封印。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 3
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_133",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "树洞里的松果堆。整理得整整齐齐，是松鼠的粮仓。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 3
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_134",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "树杈间的吊床。绳结打得相当专业。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "herb_green",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 3
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_135",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一圈新鲜的刨花。附近有人砍过柴。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "herb_green",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_charcoal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "mat_charcoal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_136",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "挂在枝头的布条阵。每隔几步一条，像路标又像封印。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_charcoal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "mat_charcoal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_137",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一圈新鲜的刨花。附近有人砍过柴。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_138",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "树杈间的吊床。绳结打得相当专业。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 3
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_139",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "树洞里的松果堆。整理得整整齐齐，是松鼠的粮仓。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_140",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "树洞里的松果堆。整理得整整齐齐，是松鼠的粮仓。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_141",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "苔藓覆盖的石堆。石头的摆放方式不太自然。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_charcoal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "mat_charcoal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_142",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "系在树上的秋千。木板还在轻轻晃。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_143",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "系在树上的秋千。木板还在轻轻晃。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "herb_green",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_charcoal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "mat_charcoal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_144",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "苔藓覆盖的石堆。石头的摆放方式不太自然。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_145",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "树洞里的松果堆。整理得整整齐齐，是松鼠的粮仓。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "herb_green",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_146",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "系在树上的秋千。木板还在轻轻晃。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_charcoal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "mat_charcoal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_birch_forest_147",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一截焦黑的树桩。雷劈的？还是别的火。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_148",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "货架深处的进口食品区。标签全是看不懂的外文。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_149",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "卡在收银台下的购物卡。余额未知，但世界曾经很在乎它。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_150",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "促销堆头残骸。方便面箱子踩扁了一地。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_151",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "员工储物柜。三排柜子，只有一个是上着的。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_152",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "仓库卷帘门前。门后传来滴水声。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "lux_choco",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "lux_choco",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_153",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "服务台的失物招领盒。里面躺着几把钥匙和一枚婚戒。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_154",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "化妆品区的大镜子。镜面碎成了蛛网。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_155",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "生鲜区的冰柜。断电已久，门却关得很严。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_156",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "卡在收银台下的购物卡。余额未知，但世界曾经很在乎它。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_157",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "卡在收银台下的购物卡。余额未知，但世界曾经很在乎它。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_158",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "服务台的失物招领盒。里面躺着几把钥匙和一枚婚戒。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_159",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "生鲜区的冰柜。断电已久，门却关得很严。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "lux_choco",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "lux_choco",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_160",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "生鲜区的冰柜。断电已久，门却关得很严。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "lux_choco",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "lux_choco",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_161",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "促销堆头残骸。方便面箱子踩扁了一地。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "lux_choco",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "lux_choco",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_162",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "卡在收银台下的购物卡。余额未知，但世界曾经很在乎它。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_163",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "化妆品区的大镜子。镜面碎成了蛛网。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_164",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "仓库卷帘门前。门后传来滴水声。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_165",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "货架深处的进口食品区。标签全是看不懂的外文。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_166",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "员工储物柜。三排柜子，只有一个是上着的。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_167",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "员工储物柜。三排柜子，只有一个是上着的。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_168",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "生鲜区的冰柜。断电已久，门却关得很严。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_169",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "卡在收银台下的购物卡。余额未知，但世界曾经很在乎它。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_170",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "仓库卷帘门前。门后传来滴水声。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_supermarket_171",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "员工储物柜。三排柜子，只有一个是上着的。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_172",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "卡在石头缝里的鱼群。退水后它们回不去了。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_fish",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_fish",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_173",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "溪边平整的大石板。有人在这儿野餐过。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "herb_green",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_174",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "湿滑的青苔岩壁。岩缝里有反光的东西。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 3
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_175",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "溪水拐弯处的漩涡。漩涡中心沉着个背包。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_fish",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_fish",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_176",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "沙洲上一串鹅卵石塔。叠了七层，稳稳当当。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_177",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "上游漂来的野花。花瓣还带着露水。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_178",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "废弃的取水竹槽。槽身长满了青苔但结构完好。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "herb_green",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_fish",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_fish",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_179",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "对岸的野莓丛。红得发黑，够不着。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 3
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_180",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "卡在石头缝里的鱼群。退水后它们回不去了。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 3
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_181",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "湿滑的青苔岩壁。岩缝里有反光的东西。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_182",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "溪水拐弯处的漩涡。漩涡中心沉着个背包。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_fish",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_fish",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_183",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "废弃的取水竹槽。槽身长满了青苔但结构完好。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 3
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_184",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "沙洲上一串鹅卵石塔。叠了七层，稳稳当当。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 3
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_185",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "沙洲上一串鹅卵石塔。叠了七层，稳稳当当。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "herb_green",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 3
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_186",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "上游漂来的野花。花瓣还带着露水。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_187",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "溪水拐弯处的漩涡。漩涡中心沉着个背包。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "herb_green",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_fish",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_fish",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_188",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "上游漂来的野花。花瓣还带着露水。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_fish",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_fish",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_189",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "对岸的野莓丛。红得发黑，够不着。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_fish",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_fish",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_190",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "溪边平整的大石板。有人在这儿野餐过。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_fish",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_fish",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_191",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "对岸的野莓丛。红得发黑，够不着。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_fish",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_raw_fish",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_192",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "溪水拐弯处的漩涡。漩涡中心沉着个背包。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_193",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "对岸的野莓丛。红得发黑，够不着。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 3
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_194",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "废弃的取水竹槽。槽身长满了青苔但结构完好。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "herb_green",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 3
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_creek_valley_195",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "沙洲上一串鹅卵石塔。叠了七层，稳稳当当。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "herb_green",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 3
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_196",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "墙根的一排陶罐。罐口都用纱布蒙着。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_197",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "贴着福门的农舍。门缝里塞着褪色的春联。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_black_bread",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_black_bread",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_198",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "半塌的灶房。灶膛里的灰是温的。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_199",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "村委会的黑板报。粉笔字写着防汛值班表。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_herbal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_herbal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_200",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "压水井。井把子上缠着防滑布。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_herbal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_herbal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_201",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "鸡窝。稻草窝里居然还有一颗蛋。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_herbal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_herbal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_202",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "院里晒着的辣椒串。红得刺眼，像还在等主人回来。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_203",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "晾在中庭的中药渣。药味还没散尽。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_herbal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_herbal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_204",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "晾在中庭的中药渣。药味还没散尽。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_herbal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_herbal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_205",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "贴着福门的农舍。门缝里塞着褪色的春联。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_herbal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_herbal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_206",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "鸡窝。稻草窝里居然还有一颗蛋。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_207",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "村委会的黑板报。粉笔字写着防汛值班表。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_208",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "贴着福门的农舍。门缝里塞着褪色的春联。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_black_bread",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_black_bread",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_209",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "贴着福门的农舍。门缝里塞着褪色的春联。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_herbal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_herbal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_210",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "半塌的灶房。灶膛里的灰是温的。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_black_bread",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_black_bread",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_211",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "贴着福门的农舍。门缝里塞着褪色的春联。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_herbal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_herbal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_212",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "贴着福门的农舍。门缝里塞着褪色的春联。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_black_bread",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_black_bread",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_213",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "贴着福门的农舍。门缝里塞着褪色的春联。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_214",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "半塌的灶房。灶膛里的灰是温的。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_herbal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_herbal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_215",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "晾在中庭的中药渣。药味还没散尽。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_black_bread",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_black_bread",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_216",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "晾在中庭的中药渣。药味还没散尽。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_mushroom",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_black_bread",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_black_bread",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_217",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "晾在中庭的中药渣。药味还没散尽。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_herbal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_herbal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_218",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "晾在中庭的中药渣。药味还没散尽。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_abandoned_village_219",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "墙根的一排陶罐。罐口都用纱布蒙着。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_herbal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_herbal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_220",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "刻着名字的工具架。每个挂钩下面都有一行小字。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_221",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "墙上悬挂的矿工帽。帽灯的玻璃裂了。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_222",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "通风管裂口。管子里吹出细细的凉风。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_223",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "角落的铁皮柜。柜门上画着一个笑脸。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_224",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "积水的水泵房。水面浮着一层油花。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 4
                    },
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_225",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "支木密布的主巷道。头顶偶尔掉渣。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 4
                    },
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_226",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "轨道尽头的手推车。车轮上缠满了铁丝。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_227",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一箱未开封的炸药。受潮结块，碰不得。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 4
                    },
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_228",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "通风管裂口。管子里吹出细细的凉风。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_229",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "积水的水泵房。水面浮着一层油花。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 4
                    },
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_230",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一箱未开封的炸药。受潮结块，碰不得。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_231",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "刻着名字的工具架。每个挂钩下面都有一行小字。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 4
                    },
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_232",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "支木密布的主巷道。头顶偶尔掉渣。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_233",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "积水的水泵房。水面浮着一层油花。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 4
                    },
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_234",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "角落的铁皮柜。柜门上画着一个笑脸。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_235",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "积水的水泵房。水面浮着一层油花。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_236",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "轨道尽头的手推车。车轮上缠满了铁丝。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_237",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "角落的铁皮柜。柜门上画着一个笑脸。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_238",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一箱未开封的炸药。受潮结块，碰不得。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_239",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "刻着名字的工具架。每个挂钩下面都有一行小字。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_240",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "支木密布的主巷道。头顶偶尔掉渣。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_241",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "轨道尽头的手推车。车轮上缠满了铁丝。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_242",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "墙上悬挂的矿工帽。帽灯的玻璃裂了。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_mine_243",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "轨道尽头的手推车。车轮上缠满了铁丝。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_stone",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_deep_fog_244",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一排朝同一方向的脚印。所有脚尖都对准雾最浓处。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_deep_fog_245",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "悬停在耳边的低语。凑近了听，又散开了。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_deep_fog_246",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "悬浮在半空的光尘。伸手一搅就四散，又缓缓聚拢。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_deep_fog_247",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一座无火的篝火堆。灰烬排列成一个完美的圆。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_deep_fog_248",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "缠绕整棵枯树的灯串。不通电却在明明灭灭。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_deep_fog_249",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一面立着的穿衣镜。镜框上缠着干枯的花。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_deep_fog_250",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "倒插在地上的雨伞。伞面朝上，接了一伞清亮的雾水。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_deep_fog_251",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "石桌上摆好的两副碗筷。像是有人在等人。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_deep_fog_252",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "石桌上摆好的两副碗筷。像是有人在等人。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_deep_fog_253",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "悬浮在半空的光尘。伸手一搅就四散，又缓缓聚拢。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_deep_fog_254",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一排朝同一方向的脚印。所有脚尖都对准雾最浓处。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_deep_fog_255",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "倒插在地上的雨伞。伞面朝上，接了一伞清亮的雾水。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_deep_fog_256",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一座无火的篝火堆。灰烬排列成一个完美的圆。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_deep_fog_257",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一座无火的篝火堆。灰烬排列成一个完美的圆。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_deep_fog_258",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "石桌上摆好的两副碗筷。像是有人在等人。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_deep_fog_259",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "悬浮在半空的光尘。伸手一搅就四散，又缓缓聚拢。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_deep_fog_260",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一排朝同一方向的脚印。所有脚尖都对准雾最浓处。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_deep_fog_261",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一排朝同一方向的脚印。所有脚尖都对准雾最浓处。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_radio_tower_262",
        "weight": 5,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "一本翻烂的《莫尔斯电码手册》。页边写满了翻译练习。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_radio_tower_263",
        "weight": 5,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "贴满便签的操作台。每张便签都是一个频段参数。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_radio_tower_264",
        "weight": 5,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "屋顶避雷针。针尖熔了一个瘤。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_radio_parts",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_radio_parts",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_radio_tower_265",
        "weight": 5,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "天线基座的工具箱。扳手齐全，少了一把螺丝刀。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_radio_tower_266",
        "weight": 5,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "墙上的信号覆盖图。用红笔圈了三个盲区。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_radio_parts",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_radio_parts",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_radio_tower_267",
        "weight": 5,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "备用发电机房。机油味呛人。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_radio_tower_268",
        "weight": 5,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "成捆的同轴电缆。铜芯在断口处闪闪发亮。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_radio_tower_269",
        "weight": 5,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "值班室的行军床。被子叠成了豆腐块。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_radio_tower_270",
        "weight": 5,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "屋顶避雷针。针尖熔了一个瘤。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_radio_tower_271",
        "weight": 5,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "贴满便签的操作台。每张便签都是一个频段参数。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_radio_tower_272",
        "weight": 5,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "墙上的信号覆盖图。用红笔圈了三个盲区。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_radio_tower_273",
        "weight": 5,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "贴满便签的操作台。每张便签都是一个频段参数。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_radio_tower_274",
        "weight": 5,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "墙上的信号覆盖图。用红笔圈了三个盲区。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_radio_tower_275",
        "weight": 5,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "值班室的行军床。被子叠成了豆腐块。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_radio_parts",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_radio_parts",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_radio_tower_276",
        "weight": 5,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "天线基座的工具箱。扳手齐全，少了一把螺丝刀。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_radio_tower_277",
        "weight": 5,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "屋顶避雷针。针尖熔了一个瘤。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_radio_tower_278",
        "weight": 5,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "值班室的行军床。被子叠成了豆腐块。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_radio_tower_279",
        "weight": 5,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "成捆的同轴电缆。铜芯在断口处闪闪发亮。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "tool_flashlight",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_280",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "半沉的帆船桅杆。帆布还能扯下来。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_281",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "潮池。一小片被困住的海。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_282",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "沙滩上的集装箱门。被海浪打磨得没了锐角。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_283",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "冲上岸的救生圈。圈绳上系着哨子。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_284",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "礁石缝里的酒瓶。瓶身贴着手写的价签。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_285",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "渔网缠成的球。网眼里挂着贝壳和浮子。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。四周的白雾无声无息地合拢过来，退路开始模糊。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n四周的白雾无声无息地合拢过来，退路开始模糊。你在混乱中只保住了一部分，胳膊还被划了一道。\n四周的白雾无声无息地合拢过来，退路开始模糊。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_286",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一堆烧过的篝火痕迹。周围散落着烟头和罐头盒。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_287",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "倾覆的皮划艇。艇底用马克笔写着\"别放弃\"。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_288",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "倾覆的皮划艇。艇底用马克笔写着\"别放弃\"。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_289",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "倾覆的皮划艇。艇底用马克笔写着\"别放弃\"。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_290",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一堆烧过的篝火痕迹。周围散落着烟头和罐头盒。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_291",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "渔网缠成的球。网眼里挂着贝壳和浮子。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_292",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "冲上岸的救生圈。圈绳上系着哨子。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_293",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "半沉的帆船桅杆。帆布还能扯下来。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。刚碰到它，整个结构发出不堪重负的呻吟——要塌。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你在混乱中只保住了一部分，胳膊还被划了一道。\n刚碰到它，整个结构发出不堪重负的呻吟——要塌。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_294",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "倾覆的皮划艇。艇底用马克笔写着\"别放弃\"。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_295",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一堆烧过的篝火痕迹。周围散落着烟头和罐头盒。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_296",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "潮池。一小片被困住的海。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_297",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "倾覆的皮划艇。艇底用马克笔写着\"别放弃\"。",
        "choices": [
            {
                "id": "o_0",
                "text": "小心地只拿走最外面的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_298",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "一堆烧过的篝火痕迹。周围散落着烟头和罐头盒。",
        "choices": [
            {
                "id": "o_0",
                "text": "快速判断后取走了一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "冒险把整堆都扒了出来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_299",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "冲上岸的救生圈。圈绳上系着哨子。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_300",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "沙滩上的集装箱门。被海浪打磨得没了锐角。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_301",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "渔网缠成的球。网眼里挂着贝壳和浮子。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "water_dirty",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "赌一把全部打包",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你在混乱中只保住了一部分，胳膊还被划了一道。\n手伸进去的瞬间指尖传来金属的凉意——有人设了机关。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_302",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "冲上岸的救生圈。圈绳上系着哨子。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mat_rope",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。草丛/暗处的呼吸声骤然逼近——有东西守在这里。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "med_first_aid",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你在混乱中只保住了一部分，胳膊还被划了一道。\n草丛/暗处的呼吸声骤然逼近——有东西守在这里。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_g_shipwreck_bay_303",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "冲上岸的救生圈。圈绳上系着哨子。",
        "choices": [
            {
                "id": "o_0",
                "text": "挑拣出完好的一部分",
                "effects": [
                    {
                        "kind": "item",
                        "item": "salt",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "细水长流。你拿到了东西，也没惊动任何东西。\n还是慢了半拍。一切正常。正常反而让你心里发毛。你两手空空撤离。"
            },
            {
                "id": "o_1",
                "text": "贪心地把能搬的都搬上",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "心跳如鼓，收获翻倍。贪婪有时候确实是美德——在雾里。\n一切正常。正常反而让你心里发毛。你在混乱中只保住了一部分，胳膊还被划了一道。\n一切正常。正常反而让你心里发毛。你被迫空手撤退，狼狈得像只兔子。"
            }
        ]
    },
    {
        "id": "evt_nb_tiedan_deal",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "「铁蛋杂货铺」在频道发来私信：\n\n兄弟 我这儿有批好货 需要的话拿木头来换 2木=1罐头 怎么样？",
        "choices": [
            {
                "id": "o_0",
                "text": "交易（-2木 +1罐头 +5sanity）",
                "effects": [],
                "next": "__return__",
                "result": "铁蛋秒回：「爽快！下次有好货先找你。」你们的关系加深了。"
            },
            {
                "id": "o_1",
                "text": "婉拒",
                "effects": [],
                "next": "__return__",
                "result": "铁蛋：「行 需要再找我。」"
            }
        ]
    },
    {
        "id": "evt_nb_laomao_feed",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "「三楼老猫」在频道喊：\n\n谁有多余的鱼 我家三只猫断粮了 我可以用东西换",
        "choices": [
            {
                "id": "o_0",
                "text": "给他一条鱼（-1鱼 +cat_bless flag）",
                "effects": [],
                "next": "__return__",
                "result": "老猫：「救命了！！小花二花大花都谢谢你们！！\n猫们的名字你记住了。"
            },
            {
                "id": "o_1",
                "text": "表示同情但无能为力",
                "effects": [],
                "next": "__return__",
                "result": "老猫：「……没事 我再想想办法。」"
            }
        ]
    },
    {
        "id": "evt_nb_laomei_signal",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "「直播达人小美」发来私信：\n\n我家电池快没电了 这是我直播的命 我愿意用医疗包换 有人有电池吗",
        "choices": [
            {
                "id": "o_0",
                "text": "送她一节电池（-1电池 +key_amulet）",
                "effects": [],
                "next": "__return__",
                "result": "小美：「家人们！！好心人！！我用急救包换！！\n她在直播间举起急救包对着镜头挥手。"
            },
            {
                "id": "o_1",
                "text": "自己也需要电池",
                "effects": [],
                "next": "__return__",
                "result": "你没有回复。小美还在频道喊。"
            }
        ]
    },
    {
        "id": "evt_nb_laomao_dead",
        "weight": 40,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "【频道讣告】\n\n「三楼老猫」已36小时未发言。\n最后一条消息是：「二花也没回来。」\n\n你私聊了他，没有回复。\n\n三楼的门虚掩着。里面有猫叫声，但没有人。",
        "choices": [
            {
                "id": "o_0",
                "text": "前往三楼查看（解锁废墟）",
                "effects": [],
                "next": "__return__",
                "result": "你推开三楼的门。\n\n三只猫围着空碗转圈。桌上留着半袋猫粮和一张纸条：\n「如果我不在了，帮我照顾它们。——老猫」\n\n你解锁了废墟探索地点。"
            },
            {
                "id": "o_1",
                "text": "在频道默哀",
                "effects": [],
                "next": "__return__",
                "result": "你在频道打了三个句号。"
            }
        ]
    },
    {
        "id": "evt_nb_laomei_hunt",
        "weight": 30,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "频道突然炸了——\n\n「直播达人小美」：有人在外面！！不是好人！！他们在砸门！！\n\n然后信号断了。\n\n频道里一片混乱。有人说听到了尖叫声。",
        "choices": [
            {
                "id": "o_0",
                "text": "赶去救援（需要武器 -6hp）",
                "effects": [],
                "next": "__return__",
                "result": "你赶到时，小美正用椅子顶着门。门外两个人见你有武器，骂骂咧咧跑了。\n\n小美：「谢谢你……我把镜头对准你了 家人们记住这个英雄！」"
            },
            {
                "id": "o_1",
                "text": "太危险了",
                "effects": [],
                "next": "__return__",
                "result": "你在频道里听了一夜。\n第二天，小美的账号再也没有亮起来。"
            }
        ]
    },
    {
        "id": "evt_nb_laozhou_dead",
        "weight": 35,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "【频道消息】\n\n有人在南墙根老周家门口发现了拖拽痕迹。\n棚子里只剩下孩子的玩具和半碗冷粥。\n\n老周一家四口，全部失联。",
        "choices": [
            {
                "id": "o_0",
                "text": "留下一张字条（+sanity）",
                "effects": [],
                "next": "__return__",
                "result": "你写了张纸条：「如果你回来了，我们在东区。」压在枕头下面。\n\n你解锁了老周家遗址。"
            },
            {
                "id": "o_1",
                "text": "沉默离开",
                "effects": [],
                "next": "__return__",
                "result": "你没有停留。你解锁了老周家遗址。"
            }
        ]
    },
    {
        "id": "evt_nb_mei_finale_safe",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "「直播达人小美」在频道发了一段话：\n\n「家人们 我数了一下 我一共直播了14天。\n从第1天对着空房间说话，到现在镜头里还有你们。\n\n明天救援来的话 我会把所有录像公开。\n最后一场直播——」\n\n她把镜头转向你的木屋方向，挥手。",
        "choices": [
            {
                "id": "o_0",
                "text": "挥手回应",
                "effects": [],
                "next": "__return__",
                "result": "你在镜头里挥了挥手。小美笑了。\n\n频道里有人刷：「活着真好。」"
            }
        ]
    },
    {
        "id": "evt_nb_mei_finale_gone",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "频道里有一条未读消息，来自两天前的「直播达人小美」：\n\n「最后一场直播。镜头对着窗外的雾。\n谢谢你们看了我14天。」\n\n录像只有37秒。最后一帧是黑屏。",
        "choices": [
            {
                "id": "o_0",
                "text": "保存录像",
                "effects": [],
                "next": "__return__",
                "result": "你把录像保存了。有些东西值得被记住。"
            }
        ]
    },
    {
        "id": "evt_nb_reputation",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": -1,
        "text": "一条私信弹了出来——\n\n「你好 我是等风来。听说你在迷雾边缘帮了那个孩子……谢谢你。」\n\n附件：干净的水×1",
        "choices": [
            {
                "id": "o_0",
                "text": "收下",
                "effects": [],
                "next": "__return__",
                "result": "你收下了水。善意是会传递的。"
            }
        ]
    },
    {
        "id": "evt_night_footsteps",
        "weight": 12,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "深夜，你被头顶细碎的脚步声惊醒。那声音很轻、很慢，像是有什么东西正围着烟囱踱步……",
        "choices": [
            {
                "id": "o_0",
                "text": "抄起武器冲出去",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -14
                    }
                ],
                "next": "__return__",
                "result": "一只灰白的野猫窜过屋脊。虚惊一场。\n一团黑影扑面而来！你挥舞着击退了它，手臂却被抓伤了。\n你什么都没看清。之后整夜，脚步声都在你耳边打转。"
            },
            {
                "id": "o_1",
                "text": "裹紧被子装睡",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -7
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -9
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "不知过了多久，声音消失了。你又活过了一夜。\n天亮时你发现储备的罐头少了一个……它进过屋里。"
            }
        ]
    },
    {
        "id": "evt_night_knock",
        "weight": 10,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "笃、笃、笃。三声不紧不慢的敲门声。现在是凌晨两点。「有人吗……救救我……」门外的声音很虚弱。",
        "choices": [
            {
                "id": "o_0",
                "text": "开门",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 8
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -16
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -10
                    }
                ],
                "next": "__return__",
                "result": "是个浑身湿透的女人。她吃了你的食物，天亮前离开了，留下一把铜钥匙作为报答。\n门外空无一人。只有门板上五道深深的爪痕。\n「救救我」的东西猛地扑进门框！你用尽全力才把它抵出去。"
            },
            {
                "id": "o_1",
                "text": "死死顶住门不出声",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -13
                    }
                ],
                "next": "__return__",
                "result": "敲门声持续到凌晨三点，戛然而止。\n门板在震颤中裂了一道缝。有什么东西窥视了你很久才离开。"
            }
        ]
    },
    {
        "id": "evt_night_rat_steal",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "悉悉索索的声音从房梁上传来。一群雾鼠正在搬运你的储备粮。",
        "choices": [
            {
                "id": "o_0",
                "text": "点火把驱赶",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -2
                    }
                ],
                "next": "__return__",
                "result": "火光冲天而起，鼠群四散奔逃。保住了物资。"
            },
            {
                "id": "o_1",
                "text": "扔东西砸",
                "effects": [
                    {
                        "kind": "item",
                        "item": "food_berry",
                        "amount": -1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    },
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "砸中了！鼠群哄散。但你的储备也遭了殃。\n全砸空了。它们拖着战利品扬长而去。"
            }
        ]
    },
    {
        "id": "evt_night_whisper",
        "weight": 15,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "「回家吧……」一个熟悉的声音贴着你的耳朵响起。是妈妈？可妈妈明明远在千里之外。窗外的浓雾里，有个轮廓正缓缓成形。",
        "choices": [
            {
                "id": "o_0",
                "text": "跟着声音走出去",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -18
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -10
                    }
                ],
                "next": "__return__",
                "result": "你走到院子中央，寒意让你猛然惊醒——那个「妈妈」的轮廓在你面前三步处凝固了，然后无声地散开。你连滚带爬回到屋里。\n你越走越深。第二天清晨，救援队在木屋外的雾里找到了昏迷的你——离屋子三百米，赤着脚。"
            },
            {
                "id": "o_1",
                "text": "捂住耳朵默数到一百",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    }
                ],
                "next": "__return__",
                "result": "数到六十七的时候，声音消失了。天亮后你发现自己指甲抠进了掌心。"
            }
        ]
    },
    {
        "id": "evt_night_fire_out",
        "weight": 12,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "半夜你被冷意惊醒——火堆只剩一层将熄的红光，像随时会断气的萤火虫。柴架上的木柴已经见底。",
        "choices": [
            {
                "id": "o_0",
                "text": "摸黑起来添柴（消耗木材）",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 5
                    },
                    {
                        "kind": "item",
                        "item": "mat_wood",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "火星子噼啪一声重新窜起。你裹着毯子看着火苗发呆，竟觉得无比安心。"
            },
            {
                "id": "o_1",
                "text": "拆一把椅子救急",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -2
                    }
                ],
                "next": "__return__",
                "result": "那把从超市搬回来的椅子完成了它最后的使命。\n湿椅子烧出满屋浓烟，你呛得眼泪直流也没能救回火。"
            },
            {
                "id": "o_2",
                "text": "裹紧所有衣物硬扛",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    }
                ],
                "next": "__return__",
                "result": "这一夜格外漫长。你的牙齿咯咯响到天明，指尖冻得发紫。"
            }
        ]
    },
    {
        "id": "evt_night_handprint",
        "weight": 11,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "清晨前的最后一波睡意里，你听见窗外「啪」的一声轻响——像是手掌按在玻璃上的声音。这扇窗户，昨天刚钉好木板。",
        "choices": [
            {
                "id": "o_0",
                "text": "掀开木板看一眼",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -13
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "玻璃上是一个清晰的手印，五指细长得不合比例，正缓缓向下滑落，像它的主人顺着窗户滑了下去。\n什么都没有。只有你自己的哈气在玻璃上凝成雾圈。"
            },
            {
                "id": "o_1",
                "text": "把柜子推过去堵住窗户",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "重物压地板的吱呀声里，你居然又睡着了。人类的心理防线有时候就这么朴实无华。"
            }
        ]
    },
    {
        "id": "evt_night_crying",
        "weight": 10,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "呜……呜……哭声从迷雾深处传来，忽远忽近。是个女人，或者声音像女人的什么东西。它听起来很伤心，伤心得让人心里发毛。",
        "choices": [
            {
                "id": "o_0",
                "text": "循着哭声走过去",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 12
                    },
                    {
                        "kind": "flag",
                        "flag": "helped_crying_woman"
                    },
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": -1
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -14
                    }
                ],
                "next": "__return__",
                "result": "你在一片空地上找到了蜷缩的她——一个真实的、冻得发抖的幸存者。你把备用毛毯给了她。她指了给你看一处水源作为回报。\n哭声在你靠近时突然停止了。四周安静得能听见自己的心跳。你转身狂奔，身后的脚步声追了你一百米才消失。"
            },
            {
                "id": "o_1",
                "text": "堵住耳朵，在心里道歉",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -9
                    }
                ],
                "next": "__return__",
                "result": "哭声一直持续到凌晨三点，然后戛然而止。那种突然的寂静比哭声更可怕。"
            }
        ]
    },
    {
        "id": "evt_night_rat_king",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "厨房传来一阵窸窸窣窣。你举起火把一照——十几只雾鼠整齐地蹲在储物箱前，为首那只足有猫大，额前长着一撮白毛。它们齐刷刷地看着你，不逃也不动。",
        "choices": [
            {
                "id": "o_0",
                "text": "供奉一块食物",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 4
                    },
                    {
                        "kind": "flag",
                        "flag": "rat_king_pact"
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "白毛鼠王叼起食物，鼠群鱼贯而出，临走前它回头看了你一眼。之后你的屋子再没闹过耗子——它们认下了你这个邻居。"
            },
            {
                "id": "o_1",
                "text": "抄起扫帚全灭了他",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    },
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -10
                    },
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "一场大战！你浑身是灰地站在这群强盗的尸体中间，夺回了储备粮。\n鼠王一声尖啸，鼠群如黑色潮水般扑来！你且战且退，最后是火把救了你——但储物区已被洗劫一空。"
            }
        ]
    },
    {
        "id": "evt_night_dawn_bell",
        "weight": 6,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "凌晨四点四十四分，远处传来了钟声。当——当——当。一共响了七下。这个世界没有教堂，也没有钟楼。世界频道的消息停在了三分钟前。",
        "choices": [
            {
                "id": "o_0",
                "text": "跟着钟声数：一、二、三……",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 10
                    },
                    {
                        "kind": "flag",
                        "flag": "heard_bells"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    },
                    {
                        "kind": "flag",
                        "flag": "heard_eighth_bell"
                    }
                ],
                "next": "__return__",
                "result": "七下。不多不少。钟声停后，整个世界的呼吸仿佛都顺畅了些。你说不上为什么，但你觉得这是个好兆头。\n第七下之后，还有极轻的第八下——像是故意藏起来的。那一整天你都在琢磨：八下意味着什么？"
            }
        ]
    },
    {
        "id": "evt_night_dream_warning",
        "weight": 7,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "梦里你站在自家门口，门上贴着一张纸条，上面的字迹模糊不清，只看清了开头两个字：「明天」。你想凑近去看，梦却醒了。",
        "choices": [
            {
                "id": "o_0",
                "text": "醒来后把梦记下来，处处当心",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    },
                    {
                        "kind": "flag",
                        "flag": "dream_caution"
                    }
                ],
                "next": "__return__",
                "result": "小心使得万年船。这一天你避开了所有的冒险选择——也许纸条写的就是这个意思？"
            },
            {
                "id": "o_1",
                "text": "梦就是梦，翻个身继续睡",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 3
                    }
                ],
                "next": "__return__",
                "result": "一夜无梦到天亮。挺好。"
            }
        ]
    },
    {
        "id": "evt_night_breathing",
        "weight": 9,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "万籁俱寂中，你听见了——门外有呼吸声。很慢、很深、很有耐心。它就站在那里，隔着木板和你一起呼吸着这个夜晚。",
        "choices": [
            {
                "id": "o_0",
                "text": "对着门说：我看见你了",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -12
                    }
                ],
                "next": "__return__",
                "result": "呼吸声停了一拍，然后渐渐远去。虚张声势有时真的有用——对它们，也对你自己。\n呼吸声停了。然后，门板上传来「咚」的一声轻响，像是它把额头抵在了门上。你僵在原地直到天亮。"
            },
            {
                "id": "o_1",
                "text": "屏住呼吸和它比耐力",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -7
                    }
                ],
                "next": "__return__",
                "result": "你憋到眼前发黑也没出声。天亮时门外空无一物，只有地上一小片比别处更浓的湿雾。"
            }
        ]
    },
    {
        "id": "evt_night_moonlight",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "后半夜，浓雾忽然裂开了一道口子——真正的月光倾泻进来，落在你的床沿。那是穿越以来你见到的第一缕直接来自天空的光。",
        "choices": [
            {
                "id": "o_0",
                "text": "走到光里站一会儿",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 15
                    }
                ],
                "next": "__return__",
                "result": "银白色的光凉凉的，像一只手轻轻按在你头顶。你仰起脸，透过那道雾隙看见了三颗星星。「还在。」你说，「都还在。」"
            }
        ]
    },
    {
        "id": "evt_n2_sleepwalk",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "刺骨的凉意把你惊醒——你正站在屋子中央，赤着脚，右手紧紧攥着什么。睁开手：一把菜刀。",
        "choices": [
            {
                "id": "o_0",
                "text": "把刀放回厨房锁进柜子",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    }
                ],
                "next": "__return__",
                "result": "你摸黑完成了一切，然后坐在床沿等到天亮。至少这次你是自己醒的。"
            },
            {
                "id": "o_1",
                "text": "检查门是否关好",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -12
                    }
                ],
                "next": "__return__",
                "result": "门闩完好。你是从梦里自己走出来的，不是被叫出去的。谢天谢地。\n门开着一条缝。门外泥地上有一圈脚印围着你的房子转了整整一周。"
            }
        ]
    },
    {
        "id": "evt_n2_closet_breath",
        "weight": 9,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "半夜你被一阵极轻的、绵长的呼吸声惊醒。声音来自壁橱。节奏和你的一模一样——你屏住，它也停了。",
        "choices": [
            {
                "id": "o_0",
                "text": "猛地拉开橱门",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -7
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -13
                    }
                ],
                "next": "__return__",
                "result": "里面只挂着你的旧外套。可外套的口袋是翻出来的，拉链全拉开了。\n一团黑影像被倒出的水一样泻在地上，从门缝里流走了。你的外套再也没找到过。"
            },
            {
                "id": "o_1",
                "text": "对着壁橱说：我知道你在",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 5
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -10
                    }
                ],
                "next": "__return__",
                "result": "呼吸声停了几秒，然后极轻地叹了口气，从此消失。承认它的存在反而让它退场。\n里面传出一个用你的声音说的话：'我也知道你在。'那一夜你们谁都没有先眨眼。"
            }
        ]
    },
    {
        "id": "evt_n2_queue_outside",
        "weight": 7,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "月光把窗棂投在墙上。你数了数影子：窗棂只有四格，墙上的影子却有五条。多出来的那条在缓缓移动。",
        "choices": [
            {
                "id": "o_0",
                "text": "数清楚它移动的规律",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -9
                    },
                    {
                        "kind": "flag",
                        "flag": "queue_seen"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 4
                    }
                ],
                "next": "__return__",
                "result": "它每七秒挪动一格，像在排队等着进入什么。天亮时它排到了门口的位置。\n你盯着看了半夜，终于确认：那是云。只是云。你为这个答案长出一口气。"
            },
            {
                "id": "o_1",
                "text": "拉上窗帘睡觉",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    }
                ],
                "next": "__return__",
                "result": "眼不见心不烦。半夜你听见玻璃上很轻的一声叩击，像道别。"
            }
        ]
    },
    {
        "id": "evt_n2_moon_figure",
        "weight": 7,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "薄雾裂开的间隙里，院子里立着一个笔直的人形。它没有动作，月光穿过它时也没有影子。",
        "choices": [
            {
                "id": "o_0",
                "text": "开窗问它要什么",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 3
                    },
                    {
                        "kind": "flag",
                        "flag": "asked_figure"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -12
                    }
                ],
                "next": "__return__",
                "result": "'借一步说话。'它的声音像很多人叠在一起。你没有去。它点点头消散了——竟像是如释重负。\n它缓缓转头。那张脸是你自己的，只是表情是你从未有过的绝望。"
            },
            {
                "id": "o_1",
                "text": "熄灯装睡到天明",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    }
                ],
                "next": "__return__",
                "result": "你听着自己的心跳熬到鸡叫。晨光里院子里空无一物，只有一圈焦黑的印子。\n半梦半醒间，有人替你掖了掖被角。手法温柔得熟悉。"
            }
        ]
    },
    {
        "id": "evt_n2_furniture_drag",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "楼下传来沉重的摩擦声——有什么东西正在拖动你的桌子，一下，一下，往门口的方向挪。",
        "choices": [
            {
                "id": "o_0",
                "text": "冲下去阻止",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -14
                    },
                    {
                        "kind": "flag",
                        "flag": "cellar_sealed"
                    }
                ],
                "next": "__return__",
                "result": "灯亮的瞬间一切归位。只有桌腿上多了五道新鲜的刮痕，方向朝着门。\n你看见桌子自己立起来，用四条腿飞快地爬进了黑暗的地窖口。你把地窖钉死了。"
            },
            {
                "id": "o_1",
                "text": "在楼上敲地板三下",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -2
                    },
                    {
                        "kind": "flag",
                        "flag": "knock_pact"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -11
                    }
                ],
                "next": "__return__",
                "result": "楼下安静了。过了一会儿，下面回敲了两下。像某种约定达成了。\n楼下回敲了十七下。为什么是十七下？你数了三遍。就是十七下。"
            }
        ]
    },
    {
        "id": "evt_n2_humming",
        "weight": 8,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "雾夜静得能听见露水凝结。这时窗外飘来一段哼唱，温柔的摇篮曲，一遍又一遍，永远差最后一句没唱完。",
        "choices": [
            {
                "id": "o_0",
                "text": "轻声接上最后一句",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 10
                    },
                    {
                        "kind": "flag",
                        "flag": "song_completed"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -12
                    }
                ],
                "next": "__return__",
                "result": "你唱完了那句尾音。外面安静了几秒，然后一个苍老的声音说：'谢谢你，孩子。她找这首歌找了好久了。'\n你的声音刚落，摇篮曲戛然而止。所有虫鸣也停了。你意识到自己唱错了一个音。"
            },
            {
                "id": "o_1",
                "text": "用被子蒙住头",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "曲子在黎明前终于唱完了最后一句。你不知道该庆幸还是难过。"
            }
        ]
    },
    {
        "id": "evt_n2_fire_sparks",
        "weight": 7,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "火堆里一颗松果爆出满堂金星。飞舞的火星在夜里划出金线，像一场微型的流星雨。",
        "choices": [
            {
                "id": "o_0",
                "text": "往火里再丢颗松果看更大的",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 8
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -1
                    }
                ],
                "next": "__return__",
                "result": "轰！火星冲起一人高。你笑得像个孩子，暂时忘了门外是世界末日。\n第二颗松果是湿的，炸出一股呛人的白烟，你咳出了眼泪。"
            },
            {
                "id": "o_1",
                "text": "借着火光修补衣物",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 4
                    },
                    {
                        "kind": "item",
                        "item": "mat_cloth",
                        "amount": -2
                    },
                    {
                        "kind": "item",
                        "item": "med_bandage",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "针脚歪歪扭扭但结实。劳动和火光是最好的安眠药。"
            }
        ]
    },
    {
        "id": "evt_n2_frost_mirror",
        "weight": 7,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "寒夜，水缸边的镜子结满了霜花。霜层上被人用指尖画了一个笑脸——霜是从内侧开始结的。",
        "choices": [
            {
                "id": "o_0",
                "text": "擦掉笑脸",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -12
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "擦干净的那一刻，你在镜中看见身后站着人。转身，无人。再看镜子，笑脸又回来了。\n你把它改成哭脸。第二天霜化了，镜面干干净净，像什么都没发生过。"
            },
            {
                "id": "o_1",
                "text": "在旁边画一张自己的脸",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 6
                    },
                    {
                        "kind": "flag",
                        "flag": "frost_friend"
                    }
                ],
                "next": "__return__",
                "result": "两张笑脸并排挂着。你退后看看，觉得这面镜子总算有点人气了。"
            }
        ]
    },
    {
        "id": "evt_n2_flashlight_signal",
        "weight": 8,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "浓雾深处，一束手电光规律地闪烁：三短，三长，三短。然后是长久的等待，又开始重复。有人在求救。",
        "choices": [
            {
                "id": "o_0",
                "text": "用手电回应",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    },
                    {
                        "kind": "flag",
                        "flag": "responded_sos"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    },
                    {
                        "kind": "flag",
                        "flag": "sos_approach"
                    }
                ],
                "next": "__return__",
                "result": "对面的光乱了片刻，随即打出两个字的方向：'别来'。然后彻底熄灭。\n对面回以急促的三闪，随后光点开始向你的方向移动！你抄起了门闩。"
            },
            {
                "id": "o_1",
                "text": "记下方位明天白天去找",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -2
                    },
                    {
                        "kind": "flag",
                        "flag": "sos_marked"
                    }
                ],
                "next": "__return__",
                "result": "你在地图上做了标记。白天的雾林总归安全些——大概。"
            }
        ]
    },
    {
        "id": "evt_n2_radio_selfon",
        "weight": 7,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "收音机在深夜自己亮起了指示灯。旋钮纹丝未动，喇叭里的女声清晰得可怕：'……检测到幸存者生命体征……编号114……'",
        "choices": [
            {
                "id": "o_0",
                "text": "对着话筒回答：我是114号",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 8
                    },
                    {
                        "kind": "flag",
                        "flag": "numbered_114"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -15
                    }
                ],
                "next": "__return__",
                "result": "'114号，记录：仍然活着。'电流声顿了顿，'请继续保持。'指示灯温柔地灭了。不知为何你睡得很沉。\n'114号，更正：已于昨日注销。'女声毫无起伏。指示灯灭掉的瞬间你听见自己牙齿打颤的声音。"
            },
            {
                "id": "o_1",
                "text": "拔电源砸机器",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    },
                    {
                        "kind": "flag",
                        "flag": "radio_smashed"
                    },
                    {
                        "kind": "item",
                        "item": "tool_radio",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "你抡起它砸在墙上，塑料壳裂成两半。指示灯又亮了三秒才不甘心地熄灭。"
            }
        ]
    },
    {
        "id": "evt_exp_crystal_1",
        "weight": 25,
        "minDay": 12,
        "maxTriggers": 1,
        "text": "洞壁上嵌满了淡蓝色结晶，手指触碰时微微发热。\n你小心翼翼撬下一块。",
        "choices": [
            {
                "id": "o_0",
                "text": "仔细采集",
                "effects": [],
                "next": "__return__",
                "result": "你获得了两块结晶。"
            },
            {
                "id": "o_1",
                "text": "只取一块就走",
                "effects": [],
                "next": "__return__",
                "result": "一块足够了。贪心在迷雾中不是好品质。"
            }
        ]
    },
    {
        "id": "evt_exp_crystal_2",
        "weight": 25,
        "minDay": 12,
        "maxTriggers": 1,
        "text": "洞穴深处传来低沉的嗡鸣声。结晶在黑暗中发出微弱的脉动。\n空气中有股奇怪的甜味。",
        "choices": [
            {
                "id": "o_0",
                "text": "深入探索（风险）",
                "effects": [],
                "next": "__return__",
                "result": "你冒险深入，收获了三块结晶。但嗡鸣声让你头痛欲裂。"
            },
            {
                "id": "o_1",
                "text": "在外围采集",
                "effects": [],
                "next": "__return__",
                "result": "外围的结晶品质一般，但至少安全。"
            }
        ]
    },
    {
        "id": "evt_exp_crystal_3",
        "weight": 20,
        "minDay": 12,
        "maxTriggers": 1,
        "text": "洞穴角落有一具骸骨，手中紧握着一块特别大的结晶。\n旁边散落着一本笔记。",
        "choices": [
            {
                "id": "o_0",
                "text": "取走结晶（-3sanity）",
                "effects": [],
                "next": "__return__",
                "result": "你掰开骸骨的手指，取走了那块拳头大的结晶。\n笔记上写着：「结晶会唱歌 但不要听太久」"
            },
            {
                "id": "o_1",
                "text": "不打扰逝者",
                "effects": [],
                "next": "__return__",
                "result": "你鞠了一躬，转身离开。有些东西不该拿。"
            }
        ]
    },
    {
        "id": "evt_exp_laomao_1",
        "weight": 25,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "三楼一片狼藉。但猫砂盆整齐排列，碗里的猫粮已经发霉。\n窗台上有个猫窝，里面窝着一只橘猫。",
        "choices": [
            {
                "id": "o_0",
                "text": "喂猫（-1food）",
                "effects": [],
                "next": "__return__",
                "result": "橘猫警惕地闻了闻，然后大口吃起来。它没有跑。"
            },
            {
                "id": "o_1",
                "text": "搜索物资",
                "effects": [],
                "next": "__return__",
                "result": "你在柜子里找到了绷带和布料。老猫的存货。"
            }
        ]
    },
    {
        "id": "evt_exp_laomao_2",
        "weight": 25,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "三只猫围了上来——小花、二花、大花。\n它们认出了你。那只喂过它们鱼的人。\n\n二花蹭了蹭你的腿，叼来一个东西放在你脚边。",
        "choices": [
            {
                "id": "o_0",
                "text": "捡起来",
                "effects": [],
                "next": "__return__",
                "result": "是一盒急救包。老猫藏的。\n\n纸条上写着：「给帮过我们的人。——猫们」"
            }
        ]
    },
    {
        "id": "evt_exp_laomao_3",
        "weight": 20,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "墙上贴满了猫的照片。每只都有名字。\n最中间一张全家福：三只猫和一个人。\n背面写着：「小花 二花 大花 和我 我们是一家人」",
        "choices": [
            {
                "id": "o_0",
                "text": "拍照留念",
                "effects": [],
                "next": "__return__",
                "result": "你拍下了这张全家福。有些温暖值得被记住。"
            },
            {
                "id": "o_1",
                "text": "拿走照片",
                "effects": [],
                "next": "__return__",
                "result": "你把照片收进口袋。"
            }
        ]
    },
    {
        "id": "evt_exp_laozhou_1",
        "weight": 25,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "棚子里散落着孩子的玩具：积木、小汽车、一只缺了耳朵的布熊。\n墙上用粉笔画着一家四口手牵手。",
        "choices": [
            {
                "id": "o_0",
                "text": "检查柜子",
                "effects": [],
                "next": "__return__",
                "result": "柜子里还有木柴和罐头。老周攒的。"
            },
            {
                "id": "o_1",
                "text": "带走布熊",
                "effects": [],
                "next": "__return__",
                "result": "你捡起那只缺耳朵的布熊。它很轻。"
            }
        ]
    },
    {
        "id": "evt_exp_laozhou_2",
        "weight": 25,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "地上有一张纸条，是孩子的字迹：\n\n「爸爸说等雾散了 带我们去看海」",
        "choices": [
            {
                "id": "o_0",
                "text": "收好纸条",
                "effects": [],
                "next": "__return__",
                "result": "你把纸条叠好放进口袋。有些承诺在末日里依然闪闪发光。"
            },
            {
                "id": "o_1",
                "text": "放回原处",
                "effects": [],
                "next": "__return__",
                "result": "有些话属于这里。"
            }
        ]
    },
    {
        "id": "evt_exp_laozhou_3",
        "weight": 20,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "棚子后面有个小菜园，几棵白菜还在长。\n有人用塑料布搭了个简易温室。",
        "choices": [
            {
                "id": "o_0",
                "text": "采摘白菜",
                "effects": [],
                "next": "__return__",
                "result": "白菜还有些营养。你采了三棵。"
            },
            {
                "id": "o_1",
                "text": "给菜园浇水",
                "effects": [],
                "next": "__return__",
                "result": "你用水壶给菜园浇了水。也许还会有人回来吃。"
            }
        ]
    },
    {
        "id": "evt_story_eye_of_mist",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "三块结晶在石台上悬浮起来，缓缓咬合成一只眼睛的形状。浓雾以石台为圆心向四面八方退开——你看见了天空、远山、以及雾下真实的世界。一只巨大的、由纯粹光构成的瞳孔在你面前缓缓睁开。",
        "choices": [
            {
                "id": "o_0",
                "text": "直视它",
                "effects": [],
                "next": "__return__",
                "result": "瞳孔里没有审判，只有注视——像整个世界第一次认真看见了你。无数信息涌入脑海：雾的来历、游戏的规则、回家的路。当你再睁开眼时，掌心多了一枚发光的印记。救援直升机会找到你的。它必须找到你。"
            },
            {
                "id": "o_1",
                "text": "闭上眼，转身逃走",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -15
                    }
                ],
                "next": "__return__",
                "result": "身后传来一声悠长的叹息。等你回头，一切如初：石台空着，结晶碎了，雾合拢了。有些门只开一次。"
            }
        ]
    },
    {
        "id": "evt_echo_woman_gift",
        "weight": 6,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "清晨开门，门槛上放着一小捆草药，压着张字条：「上次多谢你的毯子。我往南走了。你也保重。——一个被你救过的人」",
        "choices": [
            {
                "id": "o_0",
                "text": "收下这份心意",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 14
                    },
                    {
                        "kind": "item",
                        "item": "med_antibiotic",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "water_clean",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "抗生素和一壶净水。原来善意在迷雾里是会流动的。"
            }
        ]
    },
    {
        "id": "evt_echo_looter_revenge",
        "weight": 7,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "黄昏归途，一道黑影从废墟后闪出堵住去路——是超市那个铁管男。「找到你了。」他活动着手腕，眼神阴沉。",
        "choices": [
            {
                "id": "o_0",
                "text": "抄家伙干他",
                "effects": [
                    {
                        "kind": "flag",
                        "flag": "looter_done"
                    },
                    {
                        "kind": "item",
                        "item": "mat_scrap_metal",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    },
                    {
                        "kind": "flag",
                        "flag": "looter_done"
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "几回合交锋后他丢下铁管跑了。你捡起他的「武器」，顺手搜了他的口袋。\n你败了。他抢走一个罐头，撂下狠话消失在雾里。"
            },
            {
                "id": "o_1",
                "text": "递上一个罐头赔罪",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 5
                    },
                    {
                        "kind": "flag",
                        "flag": "looter_done"
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "他盯着罐头看了半天，忽然泄了气似的接过去：「……算了。那天是我先动的手。」恩怨两清。"
            },
            {
                "id": "o_2",
                "text": "转身就跑",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    },
                    {
                        "kind": "flag",
                        "flag": "looter_done"
                    }
                ],
                "next": "__return__",
                "result": "你在废墟间七拐八绕甩掉了追踪。但从此每次外出都感觉背后有视线。"
            }
        ]
    },
    {
        "id": "evt_echo_rats_gift",
        "weight": 5,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "清晨，门口整整齐齐摆着一样东西——白毛鼠王带着两只小鼠蹲在三步外看着你。它把那东西往前拱了拱。",
        "choices": [
            {
                "id": "o_0",
                "text": "收下",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 12
                    },
                    {
                        "kind": "item",
                        "item": "key_radio_parts",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "是一个无线电零件！上面还有细小的齿印。「……你们从哪翻出来的？」鼠王满意地眯起眼，带着手下钻进墙缝。你和鼠邦签订了永久和平条约。"
            }
        ]
    },
    {
        "id": "evt_story_shipwreck_gate",
        "weight": 6,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "三块地图碎片严丝合缝地拼在一起，指向浓雾深处的一线海崖。你循着指引穿过最后一道雾墙——眼前豁然开朗：一艘搁浅的巨轮斜插在月牙形的海湾里，船身斑驳，却完好得不可思议。",
        "choices": [
            {
                "id": "o_0",
                "text": "登上沉船探索",
                "effects": [
                    {
                        "kind": "item",
                        "item": "key_signal_gun",
                        "amount": 1
                    },
                    {
                        "kind": "item",
                        "item": "food_canned",
                        "amount": 2
                    }
                ],
                "next": "__return__",
                "result": "船长室里，航海日志停在穿越那一天。而保险柜里静静躺着：信号枪、药品、罐头山——还有一台崭新的卫星电话。你在甲板上燃起信号堆，这一次，烟柱笔直得像一根通天柱。（隐藏结局）"
            }
        ]
    },
    {
        "id": "evt_s_rescue_start",
        "weight": 13,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "收音机里忽然插进一条清晰的讯息：'东经xxx，北纬xx，安全区开放。重复，安全区开放。'坐标就在三十公里外的山那头。",
        "choices": [
            {
                "id": "o_0",
                "text": "记下坐标并开始准备行囊",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 8
                    },
                    {
                        "kind": "flag",
                        "flag": "rescue_plan"
                    }
                ],
                "next": "__return__",
                "result": "你把坐标刻在门框上。三十公里，穿过最浓的雾——但那是一个方向，一个盼头。"
            }
        ]
    },
    {
        "id": "evt_s_rescue_team",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "轰鸣声穿透浓雾由远及近！一架直升机贴着雾顶盘旋，探照灯的光柱扫过你的屋顶——他们真的来了。",
        "choices": [
            {
                "id": "o_0",
                "text": "点燃信号堆",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 15
                    },
                    {
                        "kind": "flag",
                        "flag": "rescue_done"
                    },
                    {
                        "kind": "flag",
                        "flag": "flare_used"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -15
                    },
                    {
                        "kind": "flag",
                        "flag": "rescue_missed"
                    }
                ],
                "next": "__return__",
                "result": "浓烟笔直地升起。光柱停在你家上空，扩音器里传出人声：'坚持住！我们放下吊索！'\n柴太潮，烟起得断断续续。光柱悬停良久，最终缓缓移向了别处。你在原地站到天黑。"
            },
            {
                "id": "o_1",
                "text": "挥舞床单大声呼喊",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 15
                    },
                    {
                        "kind": "flag",
                        "flag": "rescue_done"
                    },
                    {
                        "kind": "flag",
                        "flag": "flare_used"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -12
                    },
                    {
                        "kind": "flag",
                        "flag": "rescue_missed"
                    }
                ],
                "next": "__return__",
                "result": "白色床单在探照灯下格外显眼。直升机降低高度，风压吹倒了半面篱笆——但谁在乎呢！他们看见你了！\n雾太厚，光柱三次掠过又移开。你追着轰鸣声跑了整个山坡，直到双腿发软。"
            }
        ]
    },
    {
        "id": "evt_s_crystal_dream",
        "weight": 11,
        "minDay": 12,
        "maxTriggers": 1,
        "text": "你做了一个过分清醒的梦。梦里所有的结晶连成一张网，网的中心悬浮着一句话：'我们不是雾。我们是记得。'",
        "choices": [
            {
                "id": "o_0",
                "text": "在梦里问：记得什么？",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    },
                    {
                        "kind": "flag",
                        "flag": "crystal_truth"
                    },
                    {
                        "kind": "flag",
                        "flag": "crystal_dream_done"
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -12
                    },
                    {
                        "kind": "flag",
                        "flag": "hand_matched"
                    },
                    {
                        "kind": "flag",
                        "flag": "crystal_dream_done"
                    }
                ],
                "next": "__return__",
                "result": "无数画面涌来：这里曾是座热闹的镇子。雾降下那晚，所有人都还在——只是换了一种存在方式。\n网收紧了。你在窒息中惊醒，掌心的结晶烫得像烙铁。它烙下一个图案：那只发光的手印。"
            },
            {
                "id": "o_1",
                "text": "拒绝这个梦，醒来",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    },
                    {
                        "kind": "flag",
                        "flag": "crystal_dream_done"
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": -1
                    }
                ],
                "next": "__return__",
                "result": "你猛地坐起，把结晶扔出了窗外。窗外传来一声很轻的、像是叹息的落地声。"
            }
        ]
    },
    {
        "id": "evt_s_crystal_call",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "今夜的雾与以往不同——它在你的门前让开了一条笔直的路，路的尽头有光。所有低语汇成一句：'来看看我们。'",
        "choices": [
            {
                "id": "o_0",
                "text": "走上那条路",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 20
                    },
                    {
                        "kind": "flag",
                        "flag": "fog_eye_done"
                    },
                    {
                        "kind": "item",
                        "item": "key_mist_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -15
                    },
                    {
                        "kind": "flag",
                        "flag": "fog_eye_done"
                    }
                ],
                "next": "__return__",
                "result": "路的尽头，你终于看清了雾的真容：千万张温柔的脸，守着一座沉睡的小镇。它们等你很久了。你伸出手——然后你在自家床上醒来，晨光满屋，掌心多了一颗温热的结晶。\n你越走越深，四周的脸渐渐变得饥饿。最后关头你咬破舌尖，剧痛让你转身狂奔——身后，无数声音在齐声喊你的名字。"
            },
            {
                "id": "o_1",
                "text": "关门，上闩，点灯",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    },
                    {
                        "kind": "flag",
                        "flag": "fog_eye_refused"
                    },
                    {
                        "kind": "flag",
                        "flag": "fog_eye_done"
                    }
                ],
                "next": "__return__",
                "result": "你在灯下坐到天明。门外的小路上，雾久久没有合拢——像一道敞开的门，和一个没有被赴约的约定。"
            }
        ]
    },
    {
        "id": "evt_s_doc_visit",
        "weight": 12,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "敲门声响起，门外站着背包袱的老医生：'路过，讨口水。顺便看看——你这有没有伤病需要处理？收费公道。'",
        "choices": [
            {
                "id": "o_0",
                "text": "请他治疗（付草药或布料）",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 4
                    },
                    {
                        "kind": "item",
                        "item": "herb_green",
                        "amount": -2
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 8
                    },
                    {
                        "kind": "item",
                        "item": "herb_green",
                        "amount": -2
                    }
                ],
                "next": "__return__",
                "result": "老人手艺精湛，三下五除二处理好你的伤口，还教了你一套土方。\n他治好了伤，却盯着你的气色皱眉：'年轻人，心病比身病难医。'这句话你琢磨了一整天。"
            },
            {
                "id": "o_1",
                "text": "请他喝茶聊天",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 8
                    },
                    {
                        "kind": "item",
                        "item": "tea_herb",
                        "amount": -1
                    },
                    {
                        "kind": "item",
                        "item": "med_antibiotic",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "一壶茶的时间，他讲了雾降那天医院里的故事。临走留下半盒抗生素：'用不上就当存着。'"
            },
            {
                "id": "o_2",
                "text": "婉拒，但送他一段路",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 5
                    }
                ],
                "next": "__return__",
                "result": "你陪他走到雾墙边。分别时他拍拍你的肩：活着的人，别亏待自己。这句话比药管用。"
            }
        ]
    },
    {
        "id": "evt_s_ratking_offer",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "清晨，门槛外整整齐齐码着几样东西：一颗纽扣电池、一枚亮闪闪的硬币、还有一朵不知从哪摘的野花。不远处，白毛鼠王带着族群静静看着你。",
        "choices": [
            {
                "id": "o_0",
                "text": "收下礼物，回赠一块饼干",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 8
                    },
                    {
                        "kind": "flag",
                        "flag": "ratking_gift"
                    },
                    {
                        "kind": "item",
                        "item": "food_biscuit",
                        "amount": -1
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "饼干被最小的那只鼠小心翼翼地拖走了。从此你的储物间再也没丢过一粒粮。"
            },
            {
                "id": "o_1",
                "text": "只收礼物不回礼",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    },
                    {
                        "kind": "flag",
                        "flag": "ratking_gift"
                    },
                    {
                        "kind": "item",
                        "item": "key_battery",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "你收下了东西。鼠王看了你很久，转身离去。那之后，夜里偶尔仍有窸窣声绕着粮仓转。"
            }
        ]
    },
    {
        "id": "evt_v110_patch",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "【世界公告】迷雾纪元 v1.1 补丁已部署——\n\n■ 「区域排行榜」上线：生存者按庇护所、技能、存活天数排名\n■ 你已被分配至「东七区」。请为你的据点命名，称号将同步至全区域频道。\n\n⚠ 迷雾浓度上升：夜行生物变得更活跃，请加固庇护所。",
        "choices": [
            {
                "id": "o_0",
                "text": "命名为「灯塔小筑」",
                "effects": [],
                "next": "__return__",
                "result": "【据点命名成功】灯塔小筑——愿它成为迷雾中的坐标。"
            },
            {
                "id": "o_1",
                "text": "命名为「野猫窝」",
                "effects": [],
                "next": "__return__",
                "result": "【据点命名成功】野猫窝——你取的，你开心就好。"
            },
            {
                "id": "o_2",
                "text": "命名为「铁皮屋」",
                "effects": [],
                "next": "__return__",
                "result": "【据点命名成功】铁皮屋——朴实无华，但很结实。"
            }
        ]
    },
    {
        "id": "evt_rank_d4",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "【排行榜速报】东七区第1期排名出炉——\n\n你当前排位：#7 / 187人\n当前榜首「咸鱼翻身」庇护所Lv3 + 采集满级。\n\n提示：提升庇护所等级和技能可快速升榜。排名影响每周补给箱品质。",
        "choices": [
            {
                "id": "o_0",
                "text": "继续努力",
                "effects": [],
                "next": "__return__",
                "result": "排名中游，不急不躁。"
            },
            {
                "id": "o_1",
                "text": "争取前十",
                "effects": [],
                "next": "__return__",
                "result": "前十在望，差一点。"
            },
            {
                "id": "o_2",
                "text": "无所谓排名",
                "effects": [],
                "next": "__return__",
                "result": "你关掉了排行榜。活命要紧。"
            }
        ]
    },
    {
        "id": "evt_v115_patch",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "【世界公告】迷雾纪元 v1.5 补丁已部署——\n\n■ 「雾潮协议」生效：迷雾浓度周期性波动，今夜将出现第1次雾潮\n■ 结晶矿脉在浓雾区被探测到（解锁新区域：结晶洞）\n\n⚠ 夜间需火光或门闩抵御雾潮侵袭。",
        "choices": [
            {
                "id": "o_0",
                "text": "上报你的联合地图（+knowledge）",
                "effects": [],
                "next": "__return__",
                "result": "你将联合勘测地图上传至区域频道。系统奖励knowledge经验+25。"
            },
            {
                "id": "o_1",
                "text": "仔细阅读协议条款",
                "effects": [],
                "next": "__return__",
                "result": "你逐条阅读了雾潮协议。knowledge经验+10。"
            },
            {
                "id": "o_2",
                "text": "关掉公告",
                "effects": [],
                "next": "__return__",
                "result": "你看了一眼就关掉了。"
            }
        ]
    },
    {
        "id": "evt_v120_patch",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "【世界公告】迷雾纪元 v2.0 补丁已部署——\n\n■ 「灵潮复苏」：结晶能量开始渗透迷雾，技能经验获取效率+50%（持续至第15天）\n■ 新配方解锁：晶石提灯（结晶×1 + 木×1 → 晶石提灯）\n■ 区域频道扩容：支持跨区通讯\n\n⚠ 大型雾潮将在今夜来袭。",
        "choices": [
            {
                "id": "o_0",
                "text": "研究灵潮现象",
                "effects": [],
                "next": "__return__",
                "result": "灵潮的能量波纹在你指尖跃动。knowledge+20 survival+10。"
            },
            {
                "id": "o_1",
                "text": "赶制晶石提灯",
                "effects": [],
                "next": "__return__",
                "result": "你立即动手制作提灯。craft+15。"
            }
        ]
    },
    {
        "id": "evt_rank_d8_high",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "【排行榜速报】第2期——你排位 #3 / 179人（存活率下降中）\n\n「铁蛋杂货铺」私聊你：大佬 你那庇护所怎么升的 教教呗？",
        "choices": [
            {
                "id": "o_0",
                "text": "分享经验",
                "effects": [],
                "next": "__return__",
                "result": "你热心回复了铁蛋。分享让人快乐。"
            },
            {
                "id": "o_1",
                "text": "保持神秘",
                "effects": [],
                "next": "__return__",
                "result": "你已读不回。排行榜上的人都很忙。"
            }
        ]
    },
    {
        "id": "evt_rank_d8_mid",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "【排行榜速报】第2期——你排位 #9 / 179人\n\n距前十差1名。有人在频道说：「前十全是肝帝」。",
        "choices": [
            {
                "id": "o_0",
                "text": "今晚加把劲",
                "effects": [],
                "next": "__return__",
                "result": "你决定今晚多守一会儿。"
            },
            {
                "id": "o_1",
                "text": "佛系随缘",
                "effects": [],
                "next": "__return__",
                "result": "生死面前，排名算什么。"
            }
        ]
    },
    {
        "id": "evt_rank_d8_low",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "【排行榜速报】第2期——你排位 #34 / 179人\n\n有人在频道说：「不上榜的反而活得好 别卷了」。",
        "choices": [
            {
                "id": "o_0",
                "text": "有道理",
                "effects": [],
                "next": "__return__",
                "result": "不上榜也有不上榜的活法。"
            },
            {
                "id": "o_1",
                "text": "下周冲榜",
                "effects": [],
                "next": "__return__",
                "result": "你暗自握拳。"
            }
        ]
    },
    {
        "id": "evt_rank_d12_high",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "【排行榜终报】最终排名 #3 / 162人（已25人离线）\n\n系统提示：你的高排名解锁了特殊补给——急救包×2 + 信号弹×1。",
        "choices": [
            {
                "id": "o_0",
                "text": "收下补给",
                "effects": [],
                "next": "__return__",
                "result": "高级补给箱空投至你的庇护所。"
            }
        ]
    },
    {
        "id": "evt_rank_d12_mid",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "【排行榜终报】最终排名 #11 / 162人\n\n中游成绩，补给普通：绷带×2 + 干粮×1。",
        "choices": [
            {
                "id": "o_0",
                "text": "收下补给",
                "effects": [],
                "next": "__return__",
                "result": "普通补给箱送到。"
            }
        ]
    },
    {
        "id": "evt_rank_d12_low",
        "weight": 0,
        "minDay": 1,
        "maxTriggers": 1,
        "text": "【排行榜终报】最终排名 #41 / 162人\n\n末位补给：浆果×2。但你还活着，这就够了。",
        "choices": [
            {
                "id": "o_0",
                "text": "活着就好",
                "effects": [],
                "next": "__return__",
                "result": "你拿到了最基本的补给。"
            }
        ]
    },
    {
        "id": "first_beast_wave_warning",
        "weight": 0,
        "minDay": 7,
        "maxTriggers": 1,
        "text": "【世界预警·迷雾加深】\n\n后半夜，木屋外的雾墙亮起一阵不祥的微光。远处传来第一声真正的兽吼——不再是狼，是某种更重、更大的东西。\n\n雾在进化。兽群也在进化。留给你的时间不多了。",
        "choices": [
            {
                "id": "o_0",
                "text": "连夜加固木屋外围（消耗木材×20）",
                "effects": [
                    {
                        "kind": "item",
                        "item": "wood",
                        "amount": -20
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -2
                    }
                ],
                "next": "__return__",
                "result": "你连夜把木刺削尖钉进门框。天亮时，泥地上多了几串陌生的爪印。"
            },
            {
                "id": "o_1",
                "text": "磨一根像样的木矛",
                "hint": "获得木矛",
                "effects": [
                    {
                        "kind": "item",
                        "item": "wooden_spear",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "energy",
                        "delta": -10
                    }
                ],
                "next": "__return__",
                "result": "你花了一整夜打磨矛尖。手在抖，但矛比手稳。"
            },
            {
                "id": "o_2",
                "text": "留在暗处观察兽群动向",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    },
                    {
                        "kind": "flag",
                        "flag": "beast_wave_observed",
                        "flagValue": true
                    }
                ],
                "next": "__return__",
                "result": "你记下了吼声的方位和间隔。恐惧还在，但你至少知道它们从哪来。"
            }
        ]
    },
    {
        "id": "beast_wave_preparation",
        "weight": 0,
        "minDay": 15,
        "maxTriggers": 1,
        "text": "【世界预警·兽潮前夕】\n\n地平线传来持续的震动，雾海深处的嚎叫连成了一片。兽潮将在数日内抵达——这一次不是几只野兽，是一股潮水。",
        "choices": [
            {
                "id": "o_0",
                "text": "储备木石，闭门死守（消耗木材×30、石头×10）",
                "effects": [
                    {
                        "kind": "item",
                        "item": "wood",
                        "amount": -30
                    },
                    {
                        "kind": "item",
                        "item": "stone",
                        "amount": -10
                    },
                    {
                        "kind": "flag",
                        "flag": "beast_wave_ready",
                        "flagValue": true
                    }
                ],
                "next": "__return__",
                "result": "栅栏加高了两层，壕沟里插满削尖的木桩。它们想进来，就得先付出代价。"
            },
            {
                "id": "o_1",
                "text": "主动出击，猎杀落单的先头兽",
                "hint": "有风险，缴获兽核",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "health",
                        "delta": -15
                    },
                    {
                        "kind": "resource",
                        "resource": "energy",
                        "delta": -20
                    },
                    {
                        "kind": "item",
                        "item": "beast_core",
                        "amount": 1
                    }
                ],
                "next": "__return__",
                "result": "你拖着伤回到屋里，手里的兽核还带着体温。"
            },
            {
                "id": "o_2",
                "text": "用电台联络附近的幸存者",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 4
                    },
                    {
                        "kind": "flag",
                        "flag": "alliance_contact",
                        "flagValue": true
                    }
                ],
                "next": "__return__",
                "result": "无线电里传来三声短促的回应。你不是一个人在守。"
            }
        ]
    },
    {
        "id": "power_awakening",
        "weight": 0,
        "minDay": 30,
        "maxTriggers": 1,
        "text": "【世界异变·力量觉醒】\n\n今夜，雾海深处浮起万千光点，像倒悬的星河。你的指尖开始发光——有什么东西正顺着血液爬升，在心脏处轰然炸开。\n\n雾海开始认可你了。选择你的道路。",
        "choices": [
            {
                "id": "o_0",
                "text": "走科技之路：理解它，然后利用它",
                "effects": [
                    {
                        "kind": "flag",
                        "flag": "path_tech",
                        "flagValue": true
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 2
                    }
                ],
                "next": "__return__",
                "result": "你拆开收音机的最后一枚零件，公式在脑中清晰起来——力量不必来自雾，可以来自理解。"
            },
            {
                "id": "o_1",
                "text": "走修行之路：顺应它，与雾共鸣",
                "effects": [
                    {
                        "kind": "flag",
                        "flag": "path_cultivation",
                        "flagValue": true
                    },
                    {
                        "kind": "resource",
                        "resource": "energy",
                        "delta": 5
                    }
                ],
                "next": "__return__",
                "result": "你盘膝坐下，跟随光点的节奏吐纳。一缕暖流沉入小腹——雾不是灾，是灵气。"
            },
            {
                "id": "o_2",
                "text": "拒绝力量，保持凡人之躯",
                "effects": [
                    {
                        "kind": "flag",
                        "flag": "path_mortal",
                        "flagValue": true
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 6
                    }
                ],
                "next": "__return__",
                "result": "你握紧拳头，把光芒按回皮肤之下。有些东西一旦拿起，就再也放不下了。"
            }
        ]
    },
    {
        "id": "ancient_ruins_discovery",
        "weight": 0,
        "minDay": 50,
        "maxTriggers": 1,
        "text": "【世界发现·真相浮现】\n\n浓雾散开了一角。雾墙之后矗立着一座不属于这个时代的黑色石碑，碑文在发光，像是在等待能够读懂它的人。\n\n碑文的第一行只有一句话：观察者，你终于来了。",
        "choices": [
            {
                "id": "o_0",
                "text": "抄录碑文，仔细研究",
                "effects": [
                    {
                        "kind": "flag",
                        "flag": "ruins_truth_1",
                        "flagValue": true
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -4
                    }
                ],
                "next": "__return__",
                "result": "你抄下三十七个符号。夜里它们在梦中重排成句：这不是天灾，是一次筛选。"
            },
            {
                "id": "o_1",
                "text": "带走碑文旁的神秘结晶",
                "hint": "获得神秘结晶",
                "effects": [
                    {
                        "kind": "item",
                        "item": "mysterious_crystal",
                        "amount": 1
                    },
                    {
                        "kind": "resource",
                        "resource": "health",
                        "delta": -10
                    }
                ],
                "next": "__return__",
                "result": "结晶入手的瞬间，雾海发出一声悠长的叹息。有什么东西，注意到你了。"
            },
            {
                "id": "o_2",
                "text": "摧毁石碑，假装什么都没看见",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 8
                    },
                    {
                        "kind": "flag",
                        "flag": "ruins_destroyed",
                        "flagValue": true
                    }
                ],
                "next": "__return__",
                "result": "石碑碎裂时发出无声的悲鸣。你转身回屋，把那一角重新用雾封死。"
            }
        ]
    },
    {
        "id": "final_countdown",
        "weight": 0,
        "minDay": 80,
        "maxTriggers": 1,
        "text": "【世界终局·终极考验】\n\n雾海开始退潮。地平线上，一座由雾构成的巨影缓缓站起——迷雾之主苏醒了。\n\n所有幸存者的无线电同时响起同一句话：倒数七日。",
        "choices": [
            {
                "id": "o_0",
                "text": "燃烧储备，武装到牙齿（消耗食物30、金属×20）",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "food",
                        "delta": -30
                    },
                    {
                        "kind": "item",
                        "item": "metal",
                        "amount": -20
                    },
                    {
                        "kind": "flag",
                        "flag": "final_battle_ready",
                        "flagValue": true
                    }
                ],
                "next": "__return__",
                "result": "你把最后的存粮烤成干粮，把废铁淬成刀锋。七天后，要么死，要么走出去。"
            },
            {
                "id": "o_1",
                "text": "静坐调息，直面终局",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 10
                    },
                    {
                        "kind": "flag",
                        "flag": "final_battle_ready",
                        "flagValue": true
                    }
                ],
                "next": "__return__",
                "result": "你安静地擦净那把陪你走过八十天的木矛。来吧。"
            },
            {
                "id": "o_2",
                "text": "深挖地窖，赌一把苟活",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "energy",
                        "delta": -15
                    },
                    {
                        "kind": "flag",
                        "flag": "final_hideout",
                        "flagValue": true
                    }
                ],
                "next": "__return__",
                "result": "你把地窖挖深了三米，用木板封住头顶。雾声从缝隙里渗进来，像某种叹息。"
            }
        ]
    },
    {
        "id": "catastrophe_beast_wave_tier1",
        "weight": 0,
        "minDay": 10,
        "maxTriggers": 1,
        "text": "【天灾降临·初级兽潮】\n\n黎明前，雾墙像被撕开了一样，数十头低阶野兽嚎叫着冲向你的木屋。它们眼里没有兽性，只有饥饿。",
        "choices": [
            {
                "id": "o_0",
                "text": "依托工事死守",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "木栅栏被撞得吱呀作响，但它们没能进来。天亮时，院子里留下了七具尸体。"
            },
            {
                "id": "o_1",
                "text": "爬上屋顶反击",
                "hint": "有受伤风险",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "health",
                        "delta": -10
                    },
                    {
                        "kind": "item",
                        "item": "mutant_fang",
                        "amount": 2
                    }
                ],
                "next": "__return__",
                "result": "你用木矛从屋顶一次次捅下去，最后两匹野兽拖着伤逃进了雾里。"
            },
            {
                "id": "o_2",
                "text": "弃屋躲入地窖",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "energy",
                        "delta": -15
                    },
                    {
                        "kind": "resource",
                        "resource": "food",
                        "delta": -10
                    }
                ],
                "next": "__return__",
                "result": "你在黑暗里听着头顶的撕咬声直到黄昏。木屋损失惨重，但人没事。"
            }
        ]
    },
    {
        "id": "catastrophe_extreme_cold",
        "weight": 0,
        "minDay": 20,
        "maxTriggers": 1,
        "text": "【天灾降临·极寒来袭】\n\n气温在一夜之间跌到了零下四十度。雾冻结成了霜壳，敲在墙上像石头。火堆成了你唯一的心跳。",
        "choices": [
            {
                "id": "o_0",
                "text": "烧掉备用木料取暖（消耗木材×25）",
                "effects": [
                    {
                        "kind": "item",
                        "item": "wood",
                        "amount": -25
                    }
                ],
                "next": "__return__",
                "result": "炉火烧了整整五天。木料没了，但骨头是暖的。"
            },
            {
                "id": "o_1",
                "text": "裹紧所有衣物，减少外出",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "energy",
                        "delta": -10
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -3
                    }
                ],
                "next": "__return__",
                "result": "你把自己裹成一个茧，靠数屋顶的冰裂声打发时间。"
            },
            {
                "id": "o_2",
                "text": "冒雪外出搜集燃料",
                "hint": "有冻伤风险",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "health",
                        "delta": -15
                    },
                    {
                        "kind": "item",
                        "item": "wood",
                        "amount": 15
                    }
                ],
                "next": "__return__",
                "result": "你拖回一捆湿柴，指尖冻得发黑。这一趟，值，也不值。"
            }
        ]
    },
    {
        "id": "catastrophe_beast_wave_tier2",
        "weight": 0,
        "minDay": 35,
        "maxTriggers": 1,
        "text": "【天灾降临·中级兽潮】\n\n这一次的兽群不一样：它们的甲壳泛着金属光泽，吼声里带着令理智震颤的音节。进化的怪物，学会了战术。",
        "choices": [
            {
                "id": "o_0",
                "text": "消耗物资，全面死守（木材×40、石材×20）",
                "effects": [
                    {
                        "kind": "item",
                        "item": "wood",
                        "amount": -40
                    },
                    {
                        "kind": "item",
                        "item": "stone",
                        "amount": -20
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -5
                    }
                ],
                "next": "__return__",
                "result": "三道防线被撕碎了两道。黎明时分，兽潮退了，你的手还在抖。"
            },
            {
                "id": "o_1",
                "text": "利用地形与兽群周旋",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "energy",
                        "delta": -20
                    },
                    {
                        "kind": "item",
                        "item": "beast_core",
                        "amount": 2
                    }
                ],
                "next": "__return__",
                "result": "你把兽群引进了沼泽，收割了两个核心。雾海在为你让路。"
            },
            {
                "id": "o_2",
                "text": "释放信号弹向盟友求援",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": 3
                    },
                    {
                        "kind": "flag",
                        "flag": "alliance_aid_received",
                        "flagValue": true
                    }
                ],
                "next": "__return__",
                "result": "远处亮起了回应的火光。有人和你在同一场噩梦里并肩。"
            }
        ]
    },
    {
        "id": "catastrophe_fog_expansion",
        "weight": 0,
        "minDay": 45,
        "maxTriggers": 1,
        "text": "【天灾降临·迷雾扩张】\n\n你开垦的每一寸土地都在被浓雾重新吞没。边界上的木桩一节节消失在灰白里，像被什么东西吃掉了。",
        "choices": [
            {
                "id": "o_0",
                "text": "举火把重新驱散领地",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "energy",
                        "delta": -25
                    }
                ],
                "next": "__return__",
                "result": "你举着火把走了一整天，雾退回了界碑之外。"
            },
            {
                "id": "o_1",
                "text": "放弃外围田地，收缩防线",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -6
                    },
                    {
                        "kind": "resource",
                        "resource": "food",
                        "delta": -15
                    }
                ],
                "next": "__return__",
                "result": "你看着半年的耕作沉入灰白。活着，比什么都重要。"
            },
            {
                "id": "o_2",
                "text": "深入新雾区侦察",
                "hint": "危险，可能有发现",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "health",
                        "delta": -10
                    },
                    {
                        "kind": "flag",
                        "flag": "explored_new_fog",
                        "flagValue": true
                    }
                ],
                "next": "__return__",
                "result": "新雾区的雾是活的——你亲眼看见雾墙在你身后合拢。你记下了里面的路标。"
            }
        ]
    },
    {
        "id": "catastrophe_beast_wave_tier3",
        "weight": 0,
        "minDay": 60,
        "maxTriggers": 1,
        "text": "【天灾降临·高级兽潮】\n\n大地在颤抖。雾海尽头，一头山岳般的巨兽缓缓走来，它的每一次呼吸都让雾浪翻滚。兽王来了——这是生死存亡的一战。",
        "choices": [
            {
                "id": "o_0",
                "text": "倾尽全力，与兽王决战",
                "hint": "九死一生",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "health",
                        "delta": -30
                    },
                    {
                        "kind": "resource",
                        "resource": "energy",
                        "delta": -30
                    },
                    {
                        "kind": "flag",
                        "flag": "beast_king_slain",
                        "flagValue": true
                    }
                ],
                "next": "__return__",
                "result": "你亲手斩下了兽王的獠牙。那一夜，整个雾海安静得像在默哀。"
            },
            {
                "id": "o_1",
                "text": "退入基地核心，凭工事死守（木材×50、石材×30）",
                "effects": [
                    {
                        "kind": "item",
                        "item": "wood",
                        "amount": -50
                    },
                    {
                        "kind": "item",
                        "item": "stone",
                        "amount": -30
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -8
                    }
                ],
                "next": "__return__",
                "result": "城墙在兽王的冲撞下呻吟了三天。第四天清晨，它转身离开了。"
            },
            {
                "id": "o_2",
                "text": "携带轻装撤离，放弃基地",
                "effects": [
                    {
                        "kind": "resource",
                        "resource": "energy",
                        "delta": -20
                    },
                    {
                        "kind": "resource",
                        "resource": "sanity",
                        "delta": -12
                    },
                    {
                        "kind": "flag",
                        "flag": "abandoned_base",
                        "flagValue": true
                    }
                ],
                "next": "__return__",
                "result": "你回头看了一眼燃烧的木屋，转身走进雾里。活着，就还有下一次。"
            }
        ]
    }
];
//# sourceMappingURL=legacyEvents.js.map