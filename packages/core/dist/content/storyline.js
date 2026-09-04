// 旧版主线剧本（合成生存主循环 + 14 结局）。
// 由 scripts/split_full.mjs 从 full.ts 拆分生成，勿手改——重新生成请运行该脚本。
export const STORYLINE_DEF = {
    "id": "main",
    "title": "迷雾降临",
    "desc": "生存主循环（合成骨架，旧 6 条线作为触发式支线保留）",
    "initialScene": "start",
    "scenes": {
        "start": {
            "id": "start",
            "text": "木屋。火光摇曳。\n\n迷雾已经笼罩了不知道多少天。你靠着墙，听着外面雾里传来的窸窣声。每一天都是生存，但你知道，不能一直这样下去——要么找到出路，要么死在这雾里。\n\n【提示】合理分配行动力。低血量/低体力时做危险的事会真的死掉。",
            "choices": [
                {
                    "id": "prologue",
                    "text": "📖 序章：迷雾初临 [回顾开场剧情]",
                    "hint": "不消耗行动点。回顾你是如何来到这迷雾世界的。",
                    "apCost": 0,
                    "effects": [],
                    "next": "ch1_wake",
                    "result": ""
                },
                {
                    "id": "story_progress",
                    "text": "▶ 推进剧情 [查看当前故事]",
                    "hint": "查看当前章节和可触发的剧情事件",
                    "apCost": 0,
                    "effects": [],
                    "next": "story_hub",
                    "result": ""
                },
                {
                    "id": "search",
                    "text": "出门搜寻物资 [食物+12] [水+10]",
                    "hint": "消耗1行动点。体力低于20时有受伤风险。",
                    "apCost": 1,
                    "effects": [
                        {
                            "kind": "resource",
                            "resource": "food",
                            "delta": 12
                        },
                        {
                            "kind": "resource",
                            "resource": "water",
                            "delta": 10
                        },
                        {
                            "kind": "resource",
                            "resource": "energy",
                            "delta": -5
                        }
                    ],
                    "next": "start",
                    "result": "你在雾里翻了三处废墟。灰尘呛得你直咳嗽，但收获够撑一天。"
                },
                {
                    "id": "explore_ruins",
                    "text": "探索附近废墟 [可能找到零件/物资]",
                    "hint": "消耗1行动点。危险！低血量时可能遭遇不测。",
                    "apCost": 1,
                    "effects": [
                        {
                            "kind": "roll",
                            "difficulty": 40,
                            "successEffects": [
                                {
                                    "kind": "item",
                                    "item": "radio_parts",
                                    "amount": 1
                                },
                                {
                                    "kind": "item",
                                    "item": "metal",
                                    "amount": 2
                                },
                                {
                                    "kind": "resource",
                                    "resource": "food",
                                    "delta": 8
                                }
                            ],
                            "failEffects": [
                                {
                                    "kind": "resource",
                                    "resource": "health",
                                    "delta": -5
                                },
                                {
                                    "kind": "resource",
                                    "resource": "energy",
                                    "delta": -5
                                }
                            ]
                        }
                    ],
                    "next": "start",
                    "result": "你走向那栋半塌的建筑。雾里的影子晃了晃，你握紧了手里的棍子……"
                },
                {
                    "id": "rest",
                    "text": "在屋里休整 [体力+15] [理智+3] [生命+5]",
                    "hint": "消耗1行动点。安全的恢复手段。",
                    "apCost": 1,
                    "effects": [
                        {
                            "kind": "resource",
                            "resource": "energy",
                            "delta": 15
                        },
                        {
                            "kind": "resource",
                            "resource": "sanity",
                            "delta": 3
                        },
                        {
                            "kind": "resource",
                            "resource": "health",
                            "delta": 5
                        }
                    ],
                    "next": "start",
                    "result": "你靠着墙打了个盹。梦里没有雾，只有阳光。伤口好像也没那么疼了。"
                },
                {
                    "id": "craft_fire",
                    "text": "生火取暖 [温暖+25] [理智+5]",
                    "hint": "消耗1行动点，需要木材×3。夜晚前生火更安全。",
                    "apCost": 1,
                    "requires": {
                        "items": {
                            "wood": 3
                        }
                    },
                    "effects": [
                        {
                            "kind": "item",
                            "item": "wood",
                            "amount": -3
                        },
                        {
                            "kind": "resource",
                            "resource": "warmth",
                            "delta": 25
                        },
                        {
                            "kind": "resource",
                            "resource": "sanity",
                            "delta": 5
                        },
                        {
                            "kind": "resource",
                            "resource": "health",
                            "delta": 3
                        }
                    ],
                    "next": "start",
                    "result": "火堆噼啪作响。橘色的光把阴影逼到墙角。你伸出手，感觉指节慢慢活了过来。"
                },
                {
                    "id": "gather_wood",
                    "text": "砍伐木材 [木材+5]",
                    "hint": "消耗1行动点。体力低于15时会受伤。",
                    "apCost": 1,
                    "effects": [
                        {
                            "kind": "item",
                            "item": "wood",
                            "amount": 5
                        },
                        {
                            "kind": "resource",
                            "resource": "energy",
                            "delta": -8
                        }
                    ],
                    "next": "start",
                    "result": "你找到几棵枯死的树，抡起斧头砍了半天。木材堆在墙角，心里踏实了不少。"
                },
                {
                    "id": "meditate",
                    "text": "静坐冥想 [理智+10] [生命+3]",
                    "hint": "消耗1行动点。平复心神，对抗迷雾侵蚀。",
                    "apCost": 1,
                    "effects": [
                        {
                            "kind": "resource",
                            "resource": "sanity",
                            "delta": 10
                        },
                        {
                            "kind": "resource",
                            "resource": "energy",
                            "delta": -3
                        },
                        {
                            "kind": "resource",
                            "resource": "health",
                            "delta": 3
                        }
                    ],
                    "next": "start",
                    "result": "你闭上眼睛，试着忽略雾里的低语。呼吸慢慢平稳下来，那些幻觉也退散了。"
                },
                {
                    "id": "use_bandage",
                    "text": "使用绷带包扎 [生命+20]",
                    "hint": "消耗1行动点，需要绷带×1。重伤时的救命稻草。",
                    "apCost": 1,
                    "requires": {
                        "items": {
                            "bandage": 1
                        }
                    },
                    "effects": [
                        {
                            "kind": "item",
                            "item": "bandage",
                            "amount": -1
                        },
                        {
                            "kind": "resource",
                            "resource": "health",
                            "delta": 20
                        }
                    ],
                    "next": "start",
                    "result": "你咬着牙把绷带缠在伤口上。疼得直冒冷汗，但血总算止住了。"
                },
                {
                    "id": "use_herb",
                    "text": "熬制草药 [生命+12] [理智+3]",
                    "hint": "消耗1行动点，需要草药×2。缓慢恢复，还能平复心神。",
                    "apCost": 1,
                    "requires": {
                        "items": {
                            "herb": 2
                        }
                    },
                    "effects": [
                        {
                            "kind": "item",
                            "item": "herb",
                            "amount": -2
                        },
                        {
                            "kind": "resource",
                            "resource": "health",
                            "delta": 12
                        },
                        {
                            "kind": "resource",
                            "resource": "sanity",
                            "delta": 3
                        }
                    ],
                    "next": "start",
                    "result": "你把草药扔进铁罐里熬煮。苦涩的味道弥漫开来，但喝下去后，身体确实暖和了一些。"
                },
                {
                    "id": "hunt",
                    "text": "夜巡狩猎 [危险！可能遭遇野兽]",
                    "hint": "消耗1行动点。血量低于30时不要去，真的会死。",
                    "apCost": 1,
                    "effects": [
                        {
                            "kind": "roll",
                            "difficulty": 55,
                            "successEffects": [
                                {
                                    "kind": "combat"
                                }
                            ],
                            "failEffects": [
                                {
                                    "kind": "resource",
                                    "resource": "energy",
                                    "delta": -5
                                }
                            ]
                        }
                    ],
                    "next": "start",
                    "result": "你握紧木矛走进雾里。黑暗深处，有什么东西也在找你。"
                },
                {
                    "id": "repair_radio",
                    "text": "修理无线电 [需要零件×3]",
                    "hint": "消耗1行动点。修好后可发送求救信号，触发好结局。",
                    "apCost": 1,
                    "requires": {
                        "items": {
                            "radio_parts": 3
                        }
                    },
                    "effects": [
                        {
                            "kind": "item",
                            "item": "radio_parts",
                            "amount": -3
                        },
                        {
                            "kind": "flag",
                            "flag": "radio_fixed"
                        }
                    ],
                    "next": "start",
                    "result": "你把最后一个零件焊上去，拧开旋钮——刺啦刺啦的电流声里，似乎有人类的声音。无线电修好了！"
                },
                {
                    "id": "train",
                    "text": "锻炼身体 [力量+1] [体力-8]",
                    "hint": "消耗1行动点。永久提升力量，战斗伤害更高。",
                    "apCost": 1,
                    "effects": [
                        {
                            "kind": "resource",
                            "resource": "energy",
                            "delta": -8
                        }
                    ],
                    "next": "start",
                    "result": "你用碎石做了个简易哑铃，对着晨光练了一组。胳膊酸得发抖，但你知道这会有用的。"
                },
                {
                    "id": "study",
                    "text": "研究地图和线索 [智力+1] [理智+2]",
                    "hint": "消耗1行动点。永久提升智力，检定成功率更高。",
                    "apCost": 1,
                    "effects": [
                        {
                            "kind": "resource",
                            "resource": "sanity",
                            "delta": 2
                        }
                    ],
                    "next": "start",
                    "result": "你把搜来的残破地图摊在地上，用炭笔标出已探索的区域。迷雾的轮廓似乎清晰了一些。"
                }
            ]
        },
        "story_hub": {
            "id": "story_hub",
            "text": "你翻出那本残破的笔记本，上面记录着你来到这迷雾世界后的每一天。\n\n有些记忆已经模糊了，但有些事，你永远不会忘。",
            "choices": [
                {
                    "id": "back",
                    "text": "← 回到木屋",
                    "effects": [],
                    "next": "start",
                    "result": ""
                }
            ]
        },
        "ch1_wake": {
            "id": "ch1_wake",
            "text": "你是被冷醒的。\n\n不是冬天那种冷，是一种渗进骨头里的、带着潮湿气息的冷。你睁开眼，发现自己躺在一间陌生的木屋里。天花板的木板在滴水，空气里弥漫着腐叶和铁锈的味道。\n\n窗外是一片浓得化不开的白雾。你什么都看不见，只能听见雾里传来的、若有若无的低语声。\n\n你不记得自己是怎么来到这里的。最后一段记忆，是下班路上的一场大雨，然后……就没有然后了。\n\n你的口袋里有一部没电的手机，一串钥匙，和半包没拆的烟。除此之外，一无所有。",
            "choices": [
                {
                    "id": "look_around",
                    "text": "仔细查看木屋",
                    "effects": [
                        {
                            "kind": "item",
                            "item": "wood",
                            "amount": 3
                        },
                        {
                            "kind": "resource",
                            "resource": "sanity",
                            "delta": -3
                        }
                    ],
                    "next": "ch1_first_explore",
                    "result": "你扶着墙站起来，腿有点软。木屋里空荡荡的，只有一张破床、一个锈迹斑斑的铁炉，和角落里堆着的几根木柴。你把木柴收起来——至少今晚不会冻死了。\n\n但你注意到，木屋的门是从外面被闩上的。有人，或者有什么东西，把你关在了这里。"
                },
                {
                    "id": "panic",
                    "text": "冲出门去",
                    "effects": [
                        {
                            "kind": "resource",
                            "resource": "sanity",
                            "delta": -8
                        },
                        {
                            "kind": "resource",
                            "resource": "health",
                            "delta": -5
                        }
                    ],
                    "next": "ch1_first_explore",
                    "result": "你猛地冲向门口，用肩膀撞开了那扇破旧的木门。雾扑面而来，你踉跄着跑了几步，然后被什么东西绊倒了。\n\n你趴在地上，大口喘着气。雾里的低语声更近了，像是有人贴着你的耳朵在说话。你听不清内容，但那声音让你头皮发麻。\n\n你花了好一会儿才冷静下来。跑是没用的——你根本不知道自己在往哪跑。"
                },
                {
                    "id": "calm",
                    "text": "深呼吸，冷静下来",
                    "effects": [
                        {
                            "kind": "resource",
                            "resource": "sanity",
                            "delta": 5
                        }
                    ],
                    "next": "ch1_first_explore",
                    "result": "你闭上眼睛，做了几次深呼吸。 panic 解决不了问题。你告诉自己：不管这是什么地方，先活下来再说。\n\n你睁开眼，感觉冷静了一些。雾还在，低语还在，但你已经不再那么害怕了。"
                }
            ]
        },
        "ch1_first_explore": {
            "id": "ch1_first_explore",
            "text": "你走出木屋。\n\n雾比你想象的更浓。能见度不到五米，你只能看到脚下的碎石路和路边模糊的树影。空气潮湿阴冷，每一口呼吸都像是在喝冰水。\n\n你沿着小路走了大约十分钟，发现了一栋半塌的建筑。看起来像是个便利店——玻璃碎了一地，货架倒了大半，但里面可能还有些能用的东西。\n\n雾里传来了什么声音。像是脚步声，又像是拖拽什么东西的声音。你不确定。",
            "choices": [
                {
                    "id": "enter_store",
                    "text": "进入便利店搜索",
                    "effects": [
                        {
                            "kind": "resource",
                            "resource": "energy",
                            "delta": -5
                        },
                        {
                            "kind": "roll",
                            "difficulty": 35,
                            "successEffects": [
                                {
                                    "kind": "resource",
                                    "resource": "food",
                                    "delta": 20
                                },
                                {
                                    "kind": "resource",
                                    "resource": "water",
                                    "delta": 15
                                },
                                {
                                    "kind": "item",
                                    "item": "bandage",
                                    "amount": 2
                                }
                            ],
                            "failEffects": [
                                {
                                    "kind": "resource",
                                    "resource": "health",
                                    "delta": -12
                                },
                                {
                                    "kind": "resource",
                                    "resource": "sanity",
                                    "delta": -5
                                }
                            ]
                        }
                    ],
                    "next": "ch1_night",
                    "result": "你小心翼翼地走进便利店。地上有碎玻璃，你踮着脚走过去。货架上还剩些东西——几包过期的饼干、半瓶矿泉水、还有一卷绷带。\n\n你把东西塞进包里，正准备离开，突然听到身后传来一声低沉的嘶吼。你猛地回头——雾里站着一个人影，不，那不是人。它的四肢扭曲成不正常的角度，皮肤是灰白色的，眼睛里没有瞳孔。\n\n你转身就跑。身后的嘶吼声越来越近，但你不敢回头。你一直跑，直到看到木屋的轮廓，才敢停下来。\n\n你靠在门上，大口喘着气。那东西没有追过来。但你知道，它还在雾里。"
                },
                {
                    "id": "avoid_store",
                    "text": "绕开便利店，继续探索",
                    "effects": [
                        {
                            "kind": "resource",
                            "resource": "energy",
                            "delta": -8
                        },
                        {
                            "kind": "resource",
                            "resource": "food",
                            "delta": 5
                        },
                        {
                            "kind": "resource",
                            "resource": "water",
                            "delta": 5
                        }
                    ],
                    "next": "ch1_night",
                    "result": "你决定不冒险。便利店看起来太危险了，你绕开它，继续沿着小路走。\n\n你在路边找到了一些野果——不确定能不能吃，但你太饿了，还是摘了几个。你还在一个破桶里接到了一些雨水。\n\n天色渐渐暗了下来。你意识到，必须在天黑前回到木屋。夜晚的雾，看起来比白天更浓了。"
                },
                {
                    "id": "investigate_sound",
                    "text": "调查那个声音",
                    "effects": [
                        {
                            "kind": "resource",
                            "resource": "sanity",
                            "delta": -10
                        },
                        {
                            "kind": "roll",
                            "difficulty": 50,
                            "successEffects": [
                                {
                                    "kind": "item",
                                    "item": "metal",
                                    "amount": 3
                                },
                                {
                                    "kind": "resource",
                                    "resource": "sanity",
                                    "delta": -5
                                }
                            ],
                            "failEffects": [
                                {
                                    "kind": "resource",
                                    "resource": "health",
                                    "delta": -20
                                },
                                {
                                    "kind": "resource",
                                    "resource": "sanity",
                                    "delta": -15
                                }
                            ]
                        }
                    ],
                    "next": "ch1_night",
                    "result": "你握紧拳头，朝声音传来的方向走去。雾里的影子晃了晃，你看到了——那是一只野狗，不，比野狗大得多。它的皮毛是灰白色的，嘴里滴着涎水，正盯着你看。\n\n你和它对峙了几秒。然后，它扑了过来。\n\n你不知道自己是怎么活下来的。你只记得自己用一根铁棍拼命地挥打，然后那东西哀嚎着跑了。你瘫坐在地上，浑身是伤，手里还攥着那根铁棍。\n\n你活下来了。但你知道，下一次，可能就没这么幸运了。"
                }
            ]
        },
        "ch1_night": {
            "id": "ch1_night",
            "text": "夜幕降临。\n\n你回到木屋，用木柴生了一堆火。火光在墙上跳动，把你的影子拉得很长。外面的雾更浓了，低语声也更清晰了——你甚至能听出那是一个女人的声音，在反复念着什么。\n\n你听不懂，但那声音让你头皮发麻。\n\n你靠在火边，感觉稍微暖和了一些。但你知道，这只是第一个夜晚。在这迷雾里，还有无数个夜晚在等着你。\n\n你必须想办法活下去。",
            "choices": [
                {
                    "id": "sleep",
                    "text": "睡觉，保存体力",
                    "effects": [
                        {
                            "kind": "resource",
                            "resource": "energy",
                            "delta": 20
                        },
                        {
                            "kind": "resource",
                            "resource": "sanity",
                            "delta": -3
                        }
                    ],
                    "next": "start",
                    "result": "你裹着那件破外套，在火边躺了下来。你告诉自己不要睡太死，但疲惫很快就战胜了恐惧。\n\n你做了一个梦。梦里你回到了家，坐在沙发上看电视。一切都很正常，没有雾，没有低语。然后电视突然变成了雪花，屏幕里传出那个女人的声音——\n\n你猛地惊醒。火快灭了，外面的天已经蒙蒙亮。你活过了第一个夜晚。"
                },
                {
                    "id": "watch",
                    "text": "守夜，保持警惕",
                    "effects": [
                        {
                            "kind": "resource",
                            "resource": "energy",
                            "delta": -10
                        },
                        {
                            "kind": "resource",
                            "resource": "sanity",
                            "delta": 3
                        },
                        {
                            "kind": "flag",
                            "flag": "ch1_survived_night"
                        }
                    ],
                    "next": "start",
                    "result": "你决定不睡。你往火里添了根木柴，然后靠在门边，听着外面的动静。\n\n夜很长。雾里的低语声时断时续，有时候像是在叫你的名字。你好几次差点冲出去看看，但都忍住了。\n\n大约凌晨三点的时候，你听到了脚步声——不是一个，是好几个。它们在木屋外面转了一圈，然后离开了。你屏住呼吸，直到脚步声完全消失，才敢大口喘气。\n\n天亮了。你活过了第一个夜晚。而且你知道了一件事——夜里，雾里有东西在游荡。"
                },
                {
                    "id": "investigate_whisper",
                    "text": "循着低语声走出去",
                    "effects": [
                        {
                            "kind": "resource",
                            "resource": "sanity",
                            "delta": -20
                        },
                        {
                            "kind": "roll",
                            "difficulty": 60,
                            "successEffects": [
                                {
                                    "kind": "item",
                                    "item": "radio_parts",
                                    "amount": 1
                                },
                                {
                                    "kind": "resource",
                                    "resource": "sanity",
                                    "delta": -10
                                }
                            ],
                            "failEffects": [
                                {
                                    "kind": "resource",
                                    "resource": "health",
                                    "delta": -25
                                },
                                {
                                    "kind": "resource",
                                    "resource": "sanity",
                                    "delta": -20
                                }
                            ]
                        }
                    ],
                    "next": "start",
                    "result": "你鬼使神差地推开了门。雾扑面而来，你循着那个女人的声音走去。\n\n雾越来越浓，你已经看不到木屋了。低语声越来越近，你甚至能听出她在念的是一串数字——像是某种坐标。\n\n然后你看到了她。她站在雾里，背对着你，穿着一件白色的连衣裙。她的头发很长，垂到腰际。你想喊她，但发不出声音。\n\n她慢慢地转过身来。你看到了她的脸——没有脸，只有一片空白。\n\n你尖叫着转身就跑。你不知道自己跑了多久，直到你撞到了木屋的门。你瘫在地上，浑身发抖。\n\n但你注意到，你的手里攥着什么东西——是一个电子元件，像是从什么设备上拆下来的。"
                }
            ]
        }
    },
    "endings": {
        "E01": {
            "id": "E01",
            "title": "直升机的轰鸣",
            "desc": "无线电里传来沙哑的人声：「收到你的信号了，坚持住！」三天后，螺旋桨的轰鸣撕开了浓雾。",
            "category": "good"
        },
        "E02": {
            "id": "E02",
            "title": "冲天信号弹",
            "desc": "红色的光划破迷雾。你瘫坐在地，看着那道光像火种一样，点燃了整个灰白的世界。",
            "category": "good"
        },
        "E03": {
            "id": "E03",
            "title": "篝火长明",
            "desc": "救援队说，是那堆烧了十五天的篝火让他们找到了方向。灰烬还温热着。",
            "category": "good"
        },
        "E04": {
            "id": "E04",
            "title": "平凡的等待",
            "desc": "第15天，雾散了一角。你听见远处传来发动机声——他们来了。没有鲜花与掌声，但你活下来了。",
            "category": "good"
        },
        "E05": {
            "id": "E05",
            "title": "迷雾之眼",
            "desc": "三块结晶在掌心共鸣，浓雾向两侧退开。你看见了这个世界最后的真相……（隐藏结局）",
            "category": "hidden"
        },
        "E06": {
            "id": "E06",
            "title": "同行者",
            "desc": "直升机上多了一个人。老K把旧照片塞回口袋，第一次笑了。（隐藏结局）",
            "category": "hidden"
        },
        "E07": {
            "id": "E07",
            "title": "走进雾里",
            "desc": "你听见有人在雾里喊你的名字。你放下一切，朝着那个声音走了过去。",
            "category": "death"
        },
        "E08": {
            "id": "E08",
            "title": "干渴",
            "desc": "喉咙里的灼烧感最终盖过了一切。迷雾很大，但水比雾更重要——这个道理来得太晚了。",
            "category": "death"
        },
        "E09": {
            "id": "E09",
            "title": "饥饿",
            "desc": "胃早已不再抗议。你在梦里吃了一顿很饱很饱的饭。",
            "category": "death"
        },
        "E10": {
            "id": "E10",
            "title": "病榻",
            "desc": "高烧中，木屋的天花板慢慢变成医院的白色。你没能等到退烧的那天。",
            "category": "death"
        },
        "E11": {
            "id": "E11",
            "title": "夜访者",
            "desc": "门闩没能挡住它。那一夜之后，木屋里再也没有亮起过火光。",
            "category": "death"
        },
        "E12": {
            "id": "E12",
            "title": "兽潮之夜",
            "desc": "兽潮过境，像一场黑色的洪水。你的木屋没能成为孤岛。",
            "category": "death"
        },
        "E13": {
            "id": "E13",
            "title": "守望者的日记",
            "desc": "直升机轰鸣着降落时，救援队员在你桌上发现了一摞日记。十几个日夜的记录：天气、物资、每一个帮助过你的人。队长读完沉默了很久，说：'这才是我们找的人。'你的日记被收进了灾后档案馆。",
            "category": "hidden"
        },
        "E14": {
            "id": "E14",
            "title": "不散的篝火",
            "desc": "你把最后一块巧克力掰成两半。小女孩靠着你睡着了，手里还攥着那只布偶熊。篝火烧到天亮，直升机的探照灯落下时，你们谁都没有醒。有些家，不是等来的，是两个人一起守出来的。",
            "category": "hidden"
        },
        "E15": {
            "id": "E15",
            "title": "文明重生",
            "desc": "迷雾散尽的那一天，你在新希望城的城墙上看着第一缕真正的阳光。学校、医院、电站、船坞——人类用十年时间走回了两百天前失去的一切，然后继续向前。孩子们在太阳下奔跑，不再需要数着罐头过日子。你带领他们走出黑暗，而他们把世界还给了所有人。",
            "category": "团结"
        },
        "E16": {
            "id": "E16",
            "title": "迷雾之主",
            "desc": "你继承了先知的力量，雾听从你的意志。你站在雾的中心，看它随着你的呼吸涨落。人类不再惧怕迷雾，因为他们供奉着它的主人。力量是完整的，孤独也是。夜里你偶尔会想起木屋里的火光，想起还没有成为神的日子。",
            "category": "力量"
        },
        "E17": {
            "id": "E17",
            "title": "独裁者",
            "desc": "铁腕之下，秩序井然。你的帝国里有面包、有电灯、有纪律，唯独没有反对的声音。你给了人类安全，人类交给你自由。史书将由胜利者书写，而你，就是那位胜利者——直到下一个胜利者出现。",
            "category": "权力"
        },
        "E18": {
            "id": "E18",
            "title": "人类末日",
            "desc": "最终决战失败了。灯塔的光熄灭，迷雾合拢，城市一个接一个地安静下去。你在这颗星球最后的记录里写道：我们挣扎过、团结过、战斗到最后一天。迷雾之外也许还有别的什么，但那已经与人类无关。雾，赢了。",
            "category": "毁灭"
        }
    }
};
//# sourceMappingURL=storyline.js.map