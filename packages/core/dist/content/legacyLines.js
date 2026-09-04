// 旧 6 条触发式支线剧本。
// 由 scripts/split_full.mjs 从 full.ts 拆分生成，勿手改。
export const LEGACY_LINES = [
    {
        "id": "duoduo_s1_meet",
        "title": "朵朵 · 一",
        "desc": "",
        "trigger": {
            "dayMin": 3,
            "notFlags": [
                "kid_met",
                "kid_repelled",
                "kid_lost"
            ]
        },
        "initialScene": "duoduo_s1_meet__gate",
        "scenes": {
            "duoduo_s1_meet__gate": {
                "id": "duoduo_s1_meet__gate",
                "text": "第三天清晨，你去查看陷阱时发现了她。\n六七岁的小女孩抱着膝盖蹲在你家篱笆外，穿一件明显大了两号的脏毛衣，嘴唇干得裂开了皮。她不哭也不闹，一双眼睛越过歪斜的木栅栏，死死钉在你手里那罐罐头上——准确地说，是钉在罐头商标上那个鲜红的番茄图案上。\n雾从她身后的村道漫过来，白茫茫的，把一切都泡得发胀。她就一动不动地坐在雾的边缘，像一只不敢靠近火堆、又实在饿极了的小兽。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "分她一个罐头",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 6
                            },
                            {
                                "kind": "flag",
                                "flag": "kid_met"
                            },
                            {
                                "kind": "item",
                                "item": "food_canned",
                                "amount": -1
                            }
                        ],
                        "next": "duoduo_s1_meet__name",
                        "requires": {
                            "items": {
                                "food_canned": 1
                            }
                        },
                        "result": "你蹲下来，把罐头从篱笆缝里递了过去。她扑上来抓过就开，拉环都差点拽断，吃得狼吞虎咽，噎住了也不肯停，直到最后一勺刮干净才停下来喘气。\n然后她站起来，郑重其事地掸掸裤子，朝你鞠了一躬：「我叫朵朵。哥哥你叫什么？」\n【叮！好感度提升：朵朵 +20】"
                    },
                    {
                        "id": "c_1",
                        "text": "给她水喝",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 4
                            },
                            {
                                "kind": "flag",
                                "flag": "kid_met"
                            },
                            {
                                "kind": "item",
                                "item": "water_clean",
                                "amount": -1
                            }
                        ],
                        "next": "duoduo_s1_meet__name",
                        "requires": {
                            "items": {
                                "water_clean": 1
                            }
                        },
                        "result": "你拧开水壶递过去。她小口小口地抿，喉结一下一下地滚，像在品尝什么失传已久的珍宝。「妈妈说不能大口喝，会呛。」她说这话时眼神很平静，平静得让你心里发堵——她妈妈在哪儿呢？\n你没敢问。\n【叮！好感度提升：朵朵 +15】"
                    },
                    {
                        "id": "c_2",
                        "text": "挥手赶走她",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -8
                            },
                            {
                                "kind": "flag",
                                "flag": "kid_repelled"
                            }
                        ],
                        "next": "duoduo_s1_meet__name",
                        "result": "「走吧，这儿不留人。」你压低声音说。\n她没有哭，也没有闹，只是安安静静地站起来拍了拍裤子上的土，一步三回头地走进了雾里。走到第三回头的时候，她的身影彻底融进了白色里。\n那天晚上你梦见很白很白的东西，醒来时天还没亮，窗板上全是抓挠般的划痕。\n【叮！好感度下降：朵朵 -15】"
                    },
                    {
                        "id": "c_3",
                        "text": "隔着篱笆把罐头推过去，不靠太近",
                        "effects": [],
                        "next": "duoduo_s1_meet__name"
                    },
                    {
                        "id": "c_4",
                        "text": "先观察她：有没有伤，身后有没有跟着东西",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "duoduo_s1_meet__name": {
                "id": "duoduo_s1_meet__name",
                "text": "朵朵擦擦嘴，忽然凑近了半步，两只手背在身后，压低声音，像在跟你交换什么天大的机密：「哥哥，你的名字呢？妈妈说过，知道名字的人，才能算真正的朋友。」\n雾贴着篱笆缓缓流过，把她小小的影子衬得忽浓忽淡。远处不知名的方向传来一声悠长的、不属于任何已知动物的鸣叫，她却连头都没回——从刚才到现在，她的眼睛一直亮得不合时宜。在这样的世界里，还敢这么亮地看着一个陌生人的眼睛的人，要么还没吃过苦头，要么已经决定把吃苦头这件事往后排一排。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "把名字告诉她",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 5
                            }
                        ],
                        "next": "__return__",
                        "result": "「哦——」她把这个名字在舌尖上滚了三遍，像收糖果一样郑重地收进了口袋，「我记性好着呢。妈妈说我三岁就能背出全家人的电话号码。」她顿了顿，声音低下去一点，「所以我永远不会忘。」\n不知道为什么，这句孩子气的话让你心里踏实了不少。在这个连名字都可能被雾偷走的世界里，有人记住了你。"
                    },
                    {
                        "id": "c_1",
                        "text": "「名字会被雾听走，叫我哥哥就行」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 3
                            }
                        ],
                        "next": "__return__",
                        "result": "她愣了一下，随即用力点头，一副「原来如此」的表情：「好！那我也不告诉别人我的名字——只告诉你一个人。这是秘密哦！」\n你们之间有了第一个秘密。在末世里，一个只属于两个人的秘密，比一箱罐头还金贵。"
                    },
                    {
                        "id": "c_2",
                        "text": "反问她：「那你叫什么？总得公平交易」",
                        "effects": [],
                        "next": "__return__"
                    },
                    {
                        "id": "c_3",
                        "text": "报一半留一半：「叫我小木就行」",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "duoduo_s1_meet__promise": {
                "id": "duoduo_s1_meet__promise",
                "text": "临走前，朵朵站在雾的边缘回过头来，逆着灰白的光，看不清表情，只有声音清清楚楚地穿过篱笆：「哥哥，明天我还来。我有力气了就帮你干活，你可别赶我走。」\n她顿了顿，又飞快地补了一句：「我说到做到，我从来不骗人。」\n【叮！世界频道新增词条：「东边村子似乎有个小孩」】\n从这天起，你的木屋多了一个惦记你的人——白天行动区出现了新的选择。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "目送她走进雾里",
                        "effects": [
                            {
                                "kind": "item",
                                "item": "food_berry",
                                "amount": 2
                            }
                        ],
                        "next": "__return__",
                        "result": "小小的身影三转两转就没进了白雾，快得让你怀疑刚才是不是一场幻觉。\n直到你低头，才发现手里不知何时被塞了一把野浆果，用狗尾巴草整整齐齐扎成一束——不知道她在哪片荆棘丛里采了多久。"
                    },
                    {
                        "id": "c_1",
                        "text": "把旧外套披到她肩上，再看她走进雾里",
                        "effects": [],
                        "next": "__return__",
                        "requires": {
                            "items": {
                                "mat_cloth": 1
                            }
                        }
                    },
                    {
                        "id": "c_2",
                        "text": "教她一句暗号：「夜枭叫两声，就是我」",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "duoduo_s1_meet__repent": {
                "id": "duoduo_s1_meet__repent",
                "text": "夜里风撞在窗板上，一下，又一下，节奏很轻很轻，像很小的一只手在外面敲。\n你翻了个身，用被子蒙住头，对自己说：末世就是这样，先顾活人，顾不了那么多。这话没毛病，谁听了都得点头。\n可脑子里翻来覆去的，全是那双盯着番茄图案的眼睛。那不是馋的眼睛，是饿了很多天的眼睛。而你在她转身之前，就已经数清楚了背包里还剩几个罐头。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "……但愿她能遇到别人",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -3
                            }
                        ],
                        "next": "__return__",
                        "result": "天亮时，窗台上多了一颗小石子，摆得端端正正，圆的那面朝上，像是某个孩子路过时留下的记号。\n你隔着玻璃盯着那颗石子看了很久很久，最后还是没有开门。"
                    },
                    {
                        "id": "c_1",
                        "text": "天不亮就把双份食物放上石阶",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            }
        }
    },
    {
        "id": "duoduo_s2_frog",
        "title": "朵朵 · 二",
        "desc": "",
        "trigger": {
            "dayMin": 4,
            "flags": [
                "kid_met"
            ]
        },
        "initialScene": "duoduo_s2_frog__gift",
        "scenes": {
            "duoduo_s2_frog__gift": {
                "id": "duoduo_s2_frog__gift",
                "text": "清晨推门，门槛的石阶上放着一只歪歪扭扭的纸青蛙和一小把浆果，摆得整整齐齐，浆果上还挂着露水——采下来不超过半个时辰。\n纸青蛙折得实在算不上好看：一边翅膀大一边翅膀小，屁股那里还破了个洞，用一小截草茎仔细地缝上了。\n篱笆外的雾里传来一阵憋不住的咯咯笑声。她躲在老地方那丛枯灌木后面看你呢，两只小脚丫在雾气里一晃一晃的，藏得一点也不用心的样子。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "朝雾里喊：谢谢朵朵！",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 5
                            }
                        ],
                        "next": "__return__",
                        "result": "「哇——被发现了啦！」笑声炸开了。小小的身影从灌木后蹦出来，冲你用力挥了两下手，又嗖地一声缩回雾里，只剩下一串踩着水洼远去的脚步声。\n从这天起她隔三差五就来蹭饭，你的木屋成了她在末世里的游乐场。"
                    },
                    {
                        "id": "c_1",
                        "text": "把纸青蛙摆在窗台最显眼的地方",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 4
                            }
                        ],
                        "next": "__return__",
                        "result": "你没有喊破，只是把纸青蛙摆在窗台正中央，朝着雾的方向。\n第二天，纸青蛙旁边多了一只纸船。第三天是一朵蔫了一半的野花。第四天是一颗磨圆的玻璃珠。\n你们谁都没提这件事，窗台却渐渐变成了一个小小的博物馆。"
                    },
                    {
                        "id": "c_2",
                        "text": "削一支炭笔挂在篱笆尖上",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "duoduo_s2_frog__tea": {
                "id": "duoduo_s2_frog__tea",
                "text": "这天她没跑，蹭在门槛上晃着两条够不着地的小腿，忽然没头没尾地问了一句：「哥哥，以前的……就是雾还没有的时候，外面的世界是什么样子的呀？」\n她的语气认真得不像个孩子，像在问一个能决定后半辈子怎么活的问题。\n雾在她身后缓慢地涨落，一起一伏，像某种庞大生物的呼吸。你忽然想起频道里有人说过，夜里十一点整，雾会变薄一线。你看了看天色，快了。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "讲学校、公交车和糖炒栗子",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 6
                            }
                        ],
                        "next": "__return__",
                        "result": "你讲了整整一个下午。讲到学校门口的糖炒栗子摊时，她咽了好大一口口水；讲到公交车，她追问「铁盒子怎么会自己跑」；讲到下课铃，她说「我们幼儿园也有，是海豚叫的」。\n最后她拍拍手宣布：「我都记住啦。等雾散了，我要挨个去看一遍。」\n有些东西，在被讲出来的那一刻，就重新存在了一次。"
                    },
                    {
                        "id": "c_1",
                        "text": "反问她：妈妈去哪儿了？",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -2
                            }
                        ],
                        "next": "__return__",
                        "result": "晃着的小腿停住了。\n「妈妈去找爸爸了，让我在这儿等。」她说得很快，眼睛看着自己的鞋尖，然后又飞快地补了一句，像是在说服自己，「他们说好会回来接我的。他们从来不骗人。」\n那之后很久很久，她都没有再提过这件事。"
                    },
                    {
                        "id": "c_2",
                        "text": "举起纸青蛙：「这补丁缝得比我的手艺强」",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "duoduo_s2_frog__close": {
                "id": "duoduo_s2_frog__close",
                "text": "傍晚她走后，你在频道上刷到一条消息：「东边村子好像有个小孩，一个人！谁家走丢的？在线等，挺急的。」\n下面跟了一排问号。然后是更长的沉默。九千人的频道，没有一个人接话。发消息的人最后自己回了一句「当我没说」，头像从此再没亮过。\n你关掉频道，往石阶上放了一块黑面包，想了想，又压了块石头防猫。做完这一切，你听见自己的心跳，稳得有点陌生。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "睡前检查了一遍门闩",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 3
                            }
                        ],
                        "next": "__return__",
                        "result": "面包在第二天清晨消失了。石阶上留着两个并排的小膝盖印，还有一小圈深色的水渍——不知道是清晨的露水，还是别的什么。\n你把那圈痕迹看了很久，最后默默把石头留在了原地。"
                    },
                    {
                        "id": "c_1",
                        "text": "在频道匿名回一句：「孩子没事，有人照应」",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            }
        }
    },
    {
        "id": "duoduo_s3_letters",
        "title": "朵朵 · 三",
        "desc": "",
        "trigger": {
            "dayMin": 5,
            "flags": [
                "kid_met"
            ],
            "notFlags": [
                "kid_letters",
                "kid_snaregirl"
            ]
        },
        "initialScene": "duoduo_s3_letters__book",
        "scenes": {
            "duoduo_s3_letters__book": {
                "id": "duoduo_s3_letters__book",
                "text": "朵朵今天背了个比她整个人还大的破布包，走一步晃三晃。到了跟前，她献宝似的从包里掏出半本识字课本——烧掉了整整一角，剩下的纸页黄脆得像枯叶。\n「废墟里捡的！」她得意地扬起下巴，随即又蔫下去，「可是……好多字我不认识。」她翻开书页，指尖小心翼翼地避开焦边，像在碰什么随时会碎的东西，「哥哥，你能教我吗？妈妈以前说，认字的人才不会被人骗。」",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "撕两块布做字卡，从「人」「口」「手」教起",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 6
                            },
                            {
                                "kind": "flag",
                                "flag": "kid_letters"
                            },
                            {
                                "kind": "item",
                                "item": "mat_cloth",
                                "amount": -2
                            }
                        ],
                        "next": "duoduo_s3_letters__read",
                        "requires": {
                            "items": {
                                "mat_cloth": 2
                            }
                        },
                        "result": "你把布裁成巴掌大的卡片，烧过的炭条写上字，一天教三个。她学得飞快，第二天就追着你要新的，睡觉都要把字卡攥在手心里，攥出一圈汗印子。\n【叮！朵朵学会了识字】——也许有一天，这些字会派上意想不到的用场。"
                    },
                    {
                        "id": "c_1",
                        "text": "字先放放，教她看脚印、辨野果、下套子",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 4
                            },
                            {
                                "kind": "flag",
                                "flag": "kid_snaregirl"
                            },
                            {
                                "kind": "item",
                                "item": "food_berry",
                                "amount": 2
                            }
                        ],
                        "next": "duoduo_s3_letters__read",
                        "result": "「这个是野兔的脚印，前浅后深说明它在跑；这个果子皮上有白霜的不能吃，吃了肚子会疼得打滚；下套子要卡在它回家的路上，不能卡在出门的路上……」\n她蹲在地上听得眼睛发亮，捡了根树枝在小本本上画得密密麻麻。\n【叮！朵朵学会了看踪迹】——这孩子在雾里活下去的本事，又多了一层。"
                    },
                    {
                        "id": "c_2",
                        "text": "「别乱跑了，太危险」——把她劝回去",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -4
                            }
                        ],
                        "next": "duoduo_s3_letters__read",
                        "result": "她的肩膀肉眼可见地垮了下来。抱着那半本书慢慢往外走，走了三步又停下，回过头来把书放在了你家门口的柴堆上。\n「那……书放你这儿。」她的声音很小，「你想看了就看看。」\n书在你桌上放了很多天。你一个字也没看进去。"
                    },
                    {
                        "id": "c_3",
                        "text": "拿浆果当奖品，认对一个给一颗",
                        "effects": [],
                        "next": "__return__",
                        "requires": {
                            "items": {
                                "food_berry": 3
                            }
                        }
                    }
                ]
            },
            "duoduo_s3_letters__read": {
                "id": "duoduo_s3_letters__read",
                "text": "黄昏的光从雾层里滤下来，灰扑扑的，落在泛黄的课本上，竟有了一点旧金色的意思。\n她头抵着头和你挤在一起，握笔的手势笨拙得像握一把小锄头，却一笔一划写得极认真，写两笔就要停下来吹吹手指头，舌头都不自觉地伸出了嘴角。\n火堆偶尔噼啪响一声，她就抬头看一眼火，再低头接着写。整个屋子安静得只剩下炭笔划过布面的沙沙声。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "教她写自己的名字：朵朵",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 8
                            }
                        ],
                        "next": "__return__",
                        "result": "「朵」字她总写成两个「几」。练到第十几遍，纸上终于站出了一个端正的「朵朵」。\n她盯着那两个字看了好久好久，久到你以为她睡着了。然后她忽然说：「原来我的名字写出来是这样的啊。」她又看了一眼，「真好看。」"
                    },
                    {
                        "id": "c_1",
                        "text": "教她写你的名字",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 10
                            }
                        ],
                        "next": "__return__",
                        "result": "「这是你！」她举着卡片向你宣布，语气骄傲得像刚铸出一把宝剑。然后她把卡片揣进贴身的口袋，隔着布料拍了拍。\n「这样你就不会丢了。」她一本正经地说，「丢了我也能把你找回来。」\n雾这么大，这话本来是不该信的。可你还是信了。"
                    },
                    {
                        "id": "c_2",
                        "text": "故意写错一个字让她来抓",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "duoduo_s3_letters__dusk": {
                "id": "duoduo_s3_letters__dusk",
                "text": "收拾课本的时候，最后一页夹着的纸片飘了出来，打着旋落在地上。\n那是从一张旧地图上撕下来的角，边缘磨出了毛边，印着密密的等高线，还有一小段蜿蜒的海岸线——在这片被浓雾封死的世界里，「海」这个字本身就带着一种不真实的意味。角落里有一行铅印的小字，被水渍晕开了一半。\n「这个字念什么呀？」她指着那行字问你。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "念给她听：「月牙湾……沉船……」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 4
                            },
                            {
                                "kind": "flag",
                                "flag": "sea_chart_seen"
                            }
                        ],
                        "next": "__return__",
                        "result": "「海！」她一下子蹦了起来，「我没见过海！哥哥，海是什么味道的？是不是也像雾一样，咸咸的？」\n你说不上来。但你把那张残页小心地抚平、收好——雾里捡到的东西没有一件是白捡的，说不定哪天真用得上。"
                    },
                    {
                        "id": "c_1",
                        "text": "把残页夹回课本：「等你认全字，自己念」",
                        "effects": [],
                        "next": "__return__"
                    },
                    {
                        "id": "c_2",
                        "text": "把残页凑近火光，辨认水渍下晕开的字",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "duoduo_s3_letters__sad": {
                "id": "duoduo_s3_letters__sad",
                "text": "那之后的几天，篱笆外再也没有出现过小小的身影。\n石阶空着。窗台的纸青蛙蒙了一层薄灰，你伸手想擦，又缩了回来——擦干净了，像是就把人家给忘了。\n频道上那条「谁家走丢的孩子」沉到了信息流的最底端，问号后面跟着的，是九千个人的沉默。这世上大多数告别都是这样的：没有葬礼，没有讣告，只有一个不再更新的头像。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "在石阶上留一罐水，天天换",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 5
                            },
                            {
                                "kind": "item",
                                "item": "water_clean",
                                "amount": -1
                            }
                        ],
                        "next": "__return__",
                        "result": "第一天，水没动。第二天，水没动。第三天，水面漂了一片落叶。\n第五天清晨，水罐旁边多了一只新折的纸青蛙。\n还是歪歪扭扭的，还是朝着你家门的方向。"
                    },
                    {
                        "id": "c_1",
                        "text": "沿篱笆外找一圈，看她脚印的去向",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            }
        }
    },
    {
        "id": "duoduo_s4_bear",
        "title": "朵朵 · 四",
        "desc": "",
        "trigger": {
            "dayMin": 6,
            "flags": [
                "kid_met"
            ],
            "notFlags": [
                "bear_given"
            ]
        },
        "initialScene": "duoduo_s4_bear__dream",
        "scenes": {
            "duoduo_s4_bear__dream": {
                "id": "duoduo_s4_bear__dream",
                "text": "朵朵今天没笑。\n她坐在门槛上晃着两条够不着地的小腿，声音闷闷的：「我梦见妈妈了。梦里她低头看着我，怀里抱着个软软的东西，黄色的，耳朵一边高一边低……我想不起来那是什么了。」\n她说想不起来，可她一直搓着手指——拇指反复摩挲着其余四指的指腹，一遍又一遍，好像掌心里还残留着那个触感，只是名字丢了。\n末世里的大人丢东西会哭，孩子丢东西，连哭都不知道该朝哪儿哭。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "把布偶熊送给她",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 8
                            },
                            {
                                "kind": "flag",
                                "flag": "bear_given"
                            },
                            {
                                "kind": "item",
                                "item": "toy_bear",
                                "amount": -1
                            }
                        ],
                        "next": "__return__",
                        "requires": {
                            "items": {
                                "toy_bear": 1
                            }
                        },
                        "result": "你转身进屋，把那只从废墟货架第二层翻出来的布偶熊递到她面前。\n她整个人僵住了。抱着熊愣了足足五秒钟，然后猛地抬起头看你，眼睛亮得像星星全掉了进去：「这是妈妈！我就知道是妈妈！它一直在找我！」\n你转过身假装添柴，抹了一把脸。火光真烫啊。"
                    },
                    {
                        "id": "c_1",
                        "text": "「我帮你留意，一定给你找一个」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 2
                            },
                            {
                                "kind": "flag",
                                "flag": "bear_promised"
                            }
                        ],
                        "next": "__return__",
                        "result": "「真的吗？！拉钩！」她伸出小拇指，郑重其事地和你拉了勾，再用两个大拇指盖上印章，「盖了章就不许反悔，骗人的是小狗！」\n从此每次探索废墟，你都会下意识地多看一眼货架的第二层——那里总是放玩具。"
                    },
                    {
                        "id": "c_2",
                        "text": "哄她：「梦里的东西，去梦里找才找得到」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -2
                            }
                        ],
                        "next": "__return__",
                        "result": "她似懂非懂地点点头，抱住膝盖把脸埋了进去，肩膀塌成了小小的弧形。\n有些东西终究要自己去寻，哪怕要穿过一整个梦。这个道理，大人说出来是安慰，孩子听起来，却是任务。"
                    }
                ]
            },
            "duoduo_s4_bear__hug": {
                "id": "duoduo_s4_bear__hug",
                "text": "那天傍晚她赖在你家不肯走了，抱着熊坐在火堆边，一样一样地给它介绍这个新家：「这是火堆，晚上要添柴的；这是锅，会做好吃的；这是碗，缺了个口但是好用；这是水，要烧开了才能喝……」\n介绍到最后，她卡了一下壳，偷偷看了你一眼，然后理直气壮地补上了：「这是我哥哥。」\n熊用那只缺了的扣子眼睛看着她。\n你没有纠正她。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "往锅里多添了一勺水",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 6
                            }
                        ],
                        "next": "__return__",
                        "result": "晚饭多做了一份。她吃得肚皮溜圆，抱着熊靠在草垫上，絮絮叨叨给熊讲你的事迹——讲你「一个人打跑了影子」，讲你「认识所有的野果」，越讲越离谱。\n讲到一半她自己睡着了，嘴角还挂着一粒米。\n火光把一大一小两个影子投在墙上，挨得很近。"
                    },
                    {
                        "id": "c_1",
                        "text": "往她碗里也拨了半勺热的",
                        "effects": [],
                        "next": "__return__"
                    },
                    {
                        "id": "c_2",
                        "text": "郑重其事地给熊也安排岗位：「它管看家」",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "duoduo_s4_bear__late": {
                "id": "duoduo_s4_bear__late",
                "text": "夜里你翻来覆去睡不着，索性爬起来整理白天搜来的物资。木柴码三摞，罐头归一格，药材单独包好——这些动作你已经做过几十个夜晚，熟得不用过脑子。\n所以脑子就空出来了。空出来的地方，全是她搓手指的样子。那个想不起来的软软的东西，那个一边高一边低的耳朵。\n有些东西丢了，疼的不是丢的人，是记得的人。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "把这事记在了心里",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 2
                            }
                        ],
                        "next": "__return__",
                        "result": "【叮！日记新增一行：欠朵朵一个「软软的东西」】\n有些债不是欠别人的，是欠自己良心的。而良心这种东西，末世里比罐头还稀缺，你得省着点用，但绝不能一点都不剩。"
                    },
                    {
                        "id": "c_1",
                        "text": "把搜来的半截红毛线单独收进内袋",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            }
        }
    },
    {
        "id": "duoduo_s5_play",
        "title": "朵朵 · 五",
        "desc": "",
        "trigger": {
            "dayMin": 7,
            "flags": [
                "kid_met"
            ],
            "notFlags": [
                "kid_mistwise"
            ]
        },
        "initialScene": "duoduo_s5_play__knock",
        "scenes": {
            "duoduo_s5_play__knock": {
                "id": "duoduo_s5_play__knock",
                "text": "雨天下午，篱笆上传来咚咚咚的敲门声——不用看也知道是谁，整片雾里只有一个人会用这种理直气壮的节奏敲门，仿佛全世界都欠着她一场捉迷藏。\n朵朵站在雨里，半边袖子都湿透了，头发贴在脸侧，还咧着嘴笑：「哥哥！陪我玩捉迷藏嘛！就在你家院子附近，绝不出篱笆！我肯定藏得你可找不到！」\n雨丝斜斜地飘。远处林子那头的雾气压得很低，正在慢慢地、慢慢地漫过来。",
                "choices": [
                    {
                        "id": "c_0_0",
                        "text": "陪她玩一局（消耗 1 行动点）",
                        "effects": [],
                        "next": "duoduo_s5_play__after"
                    },
                    {
                        "id": "c_2_1",
                        "text": "陪她玩一局（消耗 1 行动点）",
                        "effects": [],
                        "next": "duoduo_s5_play__after"
                    },
                    {
                        "id": "c_2",
                        "text": "塞给她一块饼干，让她雨大就回家",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 1
                            },
                            {
                                "kind": "item",
                                "item": "food_biscuit",
                                "amount": -1
                            }
                        ],
                        "next": "duoduo_s5_play__after",
                        "requires": {
                            "items": {
                                "food_biscuit": 1
                            }
                        },
                        "result": "「好吧……」她咬着饼干含糊不清地应了，一步三回头地走进雨幕，走到篱笆口还不死心地扯着嗓子喊，「下次！下次你一定要陪我玩！拉过钩的事不许赖！」\n雨一直下到天黑。屋里安静得能听见火堆里柴芯断裂的声音。"
                    },
                    {
                        "id": "c_3",
                        "text": "改玩室内捉迷藏，输的人洗碗",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "duoduo_s5_play__after": {
                "id": "duoduo_s5_play__after",
                "text": "晚上她赖着看完你做饭才肯走，理由是「一个人走夜路害怕」，可出门的时候蹦蹦跳跳，比谁都精神。\n到了门口她忽然想起什么似的，凑回来，用气声说：「哥哥，告诉你一个秘密哦——雾每天半夜会变薄一点点，就一小会儿。我跟你说过了，你不许告诉别人，这是我们两个人的秘密。」\n【叮！获得情报伙伴：朵朵懂得迷雾的习性】——某些关键时刻，她会派上用场。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "拉钩保密",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 4
                            }
                        ],
                        "next": "__return__",
                        "result": "「拉钩上吊，一百年不许变。」\n一大一小两根手指在火光里勾在一起。她盖印章的时候盖得格外用力，仿佛这样契约就会永远生效。\n那一瞬间你觉得，这个末世好像也没有那么冷。"
                    },
                    {
                        "id": "c_1",
                        "text": "把这个秘密写进日记，锁进抽屉",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            }
        }
    },
    {
        "id": "duoduo_s6_crisis",
        "title": "朵朵 · 六",
        "desc": "",
        "trigger": {
            "dayMin": 8,
            "flags": [
                "kid_met"
            ],
            "notFlags": [
                "kid_saved",
                "kid_lost"
            ]
        },
        "initialScene": "duoduo_s6_crisis__wake",
        "scenes": {
            "duoduo_s6_crisis__wake": {
                "id": "duoduo_s6_crisis__wake",
                "text": "凌晨，撕心裂肺的哭喊划破了浓雾。\n是朵朵的声音。\n从村西的方向传来，一声比一声弱，一声比一声远，像一只看不见的手正在把这个声音从世界上一点点抹掉。你从床上弹起来的时候撞翻了凳子，抓起门边的武器——手在抖，血却一下子全冲上了头顶。\n雾里的规矩第一条：天黑别应声。八十亿人用命验证过的铁律。\n可这一次，在雾里喊的是她。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "抄起火把冲进雾里（需要火把 HP≥40）",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 4
                            }
                        ],
                        "next": "duoduo_s6_crisis__barn",
                        "requires": {
                            "items": {
                                "tool_torch": 1
                            }
                        },
                        "result": "火折子抖了三次才点着。火把撕开一条光的通道，雾在光前面退，又在光后面无声地合拢，像一头巨大的、耐心的兽。\n你循着哭声狂奔，心跳声盖过了自己的脚步声。村西的路你白天走过无数遍，此刻却陌生得像另一个世界。\n【状态：轻伤】"
                    },
                    {
                        "id": "c_1_0",
                        "text": "只带柴刀，抄近路穿林子（HP≥60）",
                        "effects": [],
                        "next": "duoduo_s6_crisis__barn"
                    },
                    {
                        "id": "c_3_1",
                        "text": "只带柴刀，抄近路穿林子（HP≥60）",
                        "effects": [],
                        "next": "duoduo_s6_crisis__barn"
                    },
                    {
                        "id": "c_3_0",
                        "text": "隔着窗大喊：朝有灯的地方跑！",
                        "effects": [],
                        "next": "duoduo_s6_crisis__saved_end"
                    },
                    {
                        "id": "c_5_1",
                        "text": "隔着窗大喊：朝有灯的地方跑！",
                        "effects": [],
                        "next": "duoduo_s6_crisis__lost_end"
                    },
                    {
                        "id": "c_5",
                        "text": "锁死门窗，装作没听见",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -15
                            },
                            {
                                "kind": "flag",
                                "flag": "kid_ignored"
                            }
                        ],
                        "next": "__return__",
                        "result": "你退回到床角，用被子蒙住头。\n哭声还在继续，一声，又一声。你开始数数，数到一百的时候哭声弱了，数到五百的时候哭声断了，数到一千的时候，天边泛起了灰白色。\n你睁着眼躺到天明，被子里的空气又闷又冷。\n【好感度暴跌：朵朵 -40】【状态：恐慌】"
                    }
                ]
            },
            "duoduo_s6_crisis__barn": {
                "id": "duoduo_s6_crisis__barn",
                "text": "哭声来自废弃谷仓。\n仓门的合页锈死了，门缝里黑得像泼了墨，一股陈年的干草味混着别的什么味道从缝隙里渗出来。里面传来桌倒柜翻的动静，木头碎裂声，还有一个孩子压抑着的、抽抽噎噎的呜咽——她在拼命不让自己哭出声，因为她隐约知道，哭声会招来更可怕的东西。\n雾在你身后无声地合拢了。退路，已经看不见了。",
                "choices": [
                    {
                        "id": "c_0_0",
                        "text": "绕去后墙的狗洞，悄声把她引过来",
                        "effects": [],
                        "next": "duoduo_s6_crisis__shadow"
                    },
                    {
                        "id": "c_2_1",
                        "text": "绕去后墙的狗洞，悄声把她引过来",
                        "effects": [],
                        "next": "duoduo_s6_crisis__shadow"
                    },
                    {
                        "id": "c_2_0",
                        "text": "一脚踹开正门，光明正大地进去",
                        "effects": [],
                        "next": "duoduo_s6_crisis__shadow"
                    },
                    {
                        "id": "c_4_1",
                        "text": "一脚踹开正门，光明正大地进去",
                        "effects": [],
                        "next": "duoduo_s6_crisis__shadow"
                    },
                    {
                        "id": "c_4_0",
                        "text": "学一声夜枭叫——你们约好的暗号",
                        "effects": [],
                        "next": "duoduo_s6_crisis__shadow",
                        "requires": {
                            "flags": [
                                "dd_signal"
                            ]
                        }
                    },
                    {
                        "id": "c_6_1",
                        "text": "学一声夜枭叫——你们约好的暗号",
                        "effects": [],
                        "next": "duoduo_s6_crisis__shadow",
                        "requires": {
                            "flags": [
                                "dd_signal"
                            ]
                        }
                    },
                    {
                        "id": "c_6_0",
                        "text": "踢翻空油桶，让它滚向村东",
                        "effects": [],
                        "next": "duoduo_s6_crisis__shadow"
                    },
                    {
                        "id": "c_8_1",
                        "text": "踢翻空油桶，让它滚向村东",
                        "effects": [],
                        "next": "duoduo_s6_crisis__shadow"
                    },
                    {
                        "id": "c_8",
                        "text": "贴墙屏息，数它的脚步找出规律",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "duoduo_s6_crisis__shadow": {
                "id": "duoduo_s6_crisis__shadow",
                "text": "它在火光照不到的地方站着。\n轮廓像人，比例不对——手臂太长，脖颈的角度不对，关节弯曲的方向让眼睛拒绝理解。它歪着头「看」你们，那种姿态不像在打量猎物，倒像在辨认什么，像在回忆自己上一次站在屋顶烟囱下是什么时候。\n朵朵的小手死死攥着你的衣角，抖得像风里的叶子，但她咬着嘴唇，一声都不敢哭出来。\n它迈出了第一步。地面没有声音，它太轻了。",
                "choices": [
                    {
                        "id": "c_0_0",
                        "text": "举起火把逼它后退",
                        "effects": [],
                        "next": "duoduo_s6_crisis__saved_end",
                        "requires": {
                            "items": {
                                "tool_torch": 1
                            }
                        }
                    },
                    {
                        "id": "c_2_1",
                        "text": "举起火把逼它后退",
                        "effects": [],
                        "next": "duoduo_s6_crisis__saved_end",
                        "requires": {
                            "items": {
                                "tool_torch": 1
                            }
                        }
                    },
                    {
                        "id": "c_2_0",
                        "text": "背起她，全速狂奔",
                        "effects": [],
                        "next": "duoduo_s6_crisis__saved_end"
                    },
                    {
                        "id": "c_4_1",
                        "text": "背起她，全速狂奔",
                        "effects": [],
                        "next": "duoduo_s6_crisis__saved_end"
                    },
                    {
                        "id": "c_4",
                        "text": "放下她，转身把它引向远处",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 6
                            },
                            {
                                "kind": "flag",
                                "flag": "kid_saved"
                            }
                        ],
                        "next": "duoduo_s6_crisis__saved_end",
                        "result": "「躲进粮柜，听到我的声音再出来。无论听见什么，都不要出来。」\n你把她塞进空粮柜，合上柜门之前，看见她拼命点头，眼泪糊了一脸。\n然后你转身朝雾的反方向狂奔，用尽全力弄出声响——踢罐头、砸窗户、大喊大叫。它跟上来了。你带着它在雾里兜了一整夜，靠着白天侦察记住的地形甩脱了它。\n天亮回到家，双腿抖得像筛糠。粮柜的门开了一条缝，她真的听话地在里面躲了一夜，一声没吭。"
                    },
                    {
                        "id": "c_5",
                        "text": "拉她躲进阁楼，捂住嘴憋到天亮（朵朵懂雾的习性）",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 8
                            },
                            {
                                "kind": "flag",
                                "flag": "kid_saved"
                            }
                        ],
                        "next": "duoduo_s6_crisis__saved_end",
                        "requires": {
                            "flags": [
                                "kid_mistwise"
                            ]
                        },
                        "result": "你想起她说的：这些东西靠声音找人。\n你拉着她爬上谷仓阁楼，两人挤进草料堆最深处。她立刻明白了你的意思，双手捂住自己的嘴，把哭声咽了回去。\n它在下面站了整整一夜。木梯吱呀作响了四次，每一次你们都屏住呼吸。天亮时分，随着雾一起，它退了。\n她从头到尾没有发出一点声音。这孩子的镇定救了你们两个人。"
                    },
                    {
                        "id": "c_6_0",
                        "text": "数着拍子——第三步它必停顿，就是现在",
                        "effects": [],
                        "next": "duoduo_s6_crisis__saved_end",
                        "requires": {
                            "flags": [
                                "barn_pattern"
                            ]
                        }
                    },
                    {
                        "id": "c_8_1",
                        "text": "数着拍子——第三步它必停顿，就是现在",
                        "effects": [],
                        "next": "duoduo_s6_crisis__saved_end",
                        "requires": {
                            "flags": [
                                "barn_pattern"
                            ]
                        }
                    },
                    {
                        "id": "c_8",
                        "text": "它的注意力还在村东——低声：走",
                        "effects": [],
                        "next": "__return__",
                        "requires": {
                            "flags": [
                                "barn_distracted"
                            ]
                        }
                    }
                ]
            },
            "duoduo_s6_crisis__saved_end": {
                "id": "duoduo_s6_crisis__saved_end",
                "text": "后半夜，火堆烧得旺旺的。\n朵朵裹着你唯一的毯子在火边睡着了，睫毛上还挂着没干的泪，一只手抓着你的衣角，睡熟了都没松开——好像松开一点点，梦就会把她送回那个谷仓。\n你靠着墙坐着，听着屋外渐弱的雾声，忽然明白了一件事：在这片吞掉了八十亿人的迷雾里，你第一次有了非活下去不可的理由。\n理由现在就睡在你的毯子里，呼吸均匀，眉头渐渐舒展。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "守着她到天亮",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 8
                            }
                        ],
                        "next": "__return__",
                        "result": "【叮！朵朵得救了】——从今往后，她会在关键时刻帮助你。而第十五天的结局，或许也会因此不同。\n晨光透过雾层渗进来的时候，她在睡梦里轻轻喊了一声「妈妈」，然后翻了个身，把怀里的旧毯子搂得更紧了些。\n你往火堆里又添了一根柴。"
                    },
                    {
                        "id": "c_1",
                        "text": "把她汗湿的头发拢到耳后，什么都不问",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "duoduo_s6_crisis__lost_end": {
                "id": "duoduo_s6_crisis__lost_end",
                "text": "后来的很多天，你再也没见过她。\n石阶上的水罐你换了三天，第四天忘了，第五天想起来的时候，罐子还在原处，水一滴没少。你把那罐水端进屋里，从此再也没有往石阶上放过东西。\n世界频道那条「谁家走丢的孩子」，最终沉进了信息流的最底端，无人应答。只有那串停在半路的湿脚印，偶尔会在深夜里从记忆的背面浮上来，一步一步，踩过你的梦境。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "关掉频道",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -4
                            }
                        ],
                        "next": "__return__",
                        "result": "你告诉自己：你已经喊过了。你已经做了能做的。雾那么大，谁也怨不了。\n……已经做了能做的。\n这句话你在心里重复了很多遍。第一遍像解释，第十遍像谎言。"
                    },
                    {
                        "id": "c_1",
                        "text": "把那罐水，倒在她脚印消失的地方",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "duoduo_s6_crisis__ignore_end": {
                "id": "duoduo_s6_crisis__ignore_end",
                "text": "第二天，村西方向飘来的雾比往常浓了一些。\n你在院子里劈柴。斧头起落的节奏乱了又乱，有一斧头劈偏了，刃口啃进泥地里，震得虎口发麻。频道里有人聊起昨夜的哭声，猜是猫，猜是风，猜是哪个疯子在装神弄鬼。你划走了那条消息，指尖是僵的。\n雾从村西漫过来，漫过篱笆，在你门口停住了，像在等什么人开门。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "继续劈柴",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -3
                            }
                        ],
                        "next": "__return__",
                        "result": "木屑纷飞。每一声斧刃入木的闷响，都像是在替谁回答一个问题。\n这个问题你不敢想，也永远绕不开。它只是安静地待在那里，等着某个深夜，等你闭上眼。"
                    },
                    {
                        "id": "c_1",
                        "text": "那一斧劈下去，卡在木头里拔不出来",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            }
        }
    },
    {
        "id": "duoduo_s7_shelter",
        "title": "朵朵 · 七",
        "desc": "",
        "trigger": {
            "dayMin": 11,
            "flags": [
                "kid_saved"
            ]
        },
        "initialScene": "duoduo_s7_shelter__eve",
        "scenes": {
            "duoduo_s7_shelter__eve": {
                "id": "duoduo_s7_shelter__eve",
                "text": "频道里关于「兽潮」的讨论越来越密。有人说西边的林子整夜整夜地在移动，有人说溪谷的水连续三天是浑的，还有人只发了一个字：「跑」。然后就再也没上线。\n朵朵来的时候没有像往常那样蹦蹦跳跳。她绞着衣角站在门口，声音小得几乎听不见：「哥哥，今晚上……我能睡你家吗？就一晚上。我一个人害怕。」\n【预警】兽潮将在两天后过境。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "让她住进屋里（庇护所 Lv.2 以上）",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 10
                            },
                            {
                                "kind": "flag",
                                "flag": "kid_harbored"
                            }
                        ],
                        "next": "duoduo_s7_shelter__map",
                        "result": "「当然能。」你把最好的位置腾给她——离火堆最近、离门最远的那块地板。\n她高兴坏了，转头就跑去把自己那份家当搬了过来：半袋浆果、一只缺口的碗、叠得方方正正的小被子，还有那只一边耳朵高的布偶熊。东西不多，码得整整齐齐，像一座小小的城。\n【叮！朵朵入住庇护所】"
                    },
                    {
                        "id": "c_1",
                        "text": "把屋后的工具房收拾出来给她住",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 6
                            },
                            {
                                "kind": "flag",
                                "flag": "kid_harbored"
                            }
                        ],
                        "next": "duoduo_s7_shelter__map",
                        "result": "工具房狭小，但胜在结实，门板是整块的厚木。你把门闩拆下来修了两遍，又给她塞了个小火盆。\n她趴在门口研究了半天那个新门闩，然后学着你的样子拉开、插上、再拉开——确认自己一个人也能打开之后，才安心地笑了：「这样半夜我要是想尿尿，就不用喊你了。」\n……行吧，这确实很重要。"
                    },
                    {
                        "id": "c_2",
                        "text": "劝她：「跟着人群去南边更安全」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -6
                            }
                        ],
                        "next": "duoduo_s7_shelter__map",
                        "result": "她低下头「嗯」了一声，没有争辩，也没有像平时那样讨价还价。\n她转过身走进暮色里，背影小小的，背包一颠一颠的。走出十几步，她停下来回头看了一眼——就一眼——然后接着往前走了。\n那晚兽潮的嘶吼声传过来的时候，你盯着天花板，一夜没有合眼。"
                    },
                    {
                        "id": "c_3",
                        "text": "把唯一的床让出来，自己抱被子睡灶边",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "duoduo_s7_shelter__map": {
                "id": "duoduo_s7_shelter__map",
                "text": "安顿下来后，她神神秘秘地把门关严实，回头确认了两遍，才从怀里掏出一卷皱巴巴的纸，双手捧着递给你——那架势像在捧传国玉玺。\n「哥哥，我在西边的破车里捡到这个！上面的字，我认识好几个！」\n那是半张航海图的残页，边缘磨得起了毛，上面印着密密的等高线，还有一段月牙形的海岸线。雾降之后，「海」这个字，本身就是一种传说。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "让她把认识的字都读出来",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 6
                            },
                            {
                                "kind": "item",
                                "item": "key_map_fragment",
                                "amount": 1
                            }
                        ],
                        "next": "__return__",
                        "requires": {
                            "flags": [
                                "kid_letters"
                            ]
                        },
                        "result": "「月、牙、湾……还有这个，三点水的，是『海』！老师教过的！」她一个字一个字地指给你看，小手指戳得纸面咚咚响。残页角落那行被水渍晕开的铅印小字，被她逐字拼了出来。\n你照着她念的内容比对白天侦察记下的方位——沉船湾的位置，一下子清晰了起来。\n【叮！获得线索：地图碎片 ×1】"
                    },
                    {
                        "id": "c_1",
                        "text": "让她讲讲这张图是在哪儿捡到的",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 4
                            },
                            {
                                "kind": "item",
                                "item": "food_raw_meat",
                                "amount": 2
                            }
                        ],
                        "next": "__return__",
                        "requires": {
                            "flags": [
                                "kid_snaregirl"
                            ]
                        },
                        "result": "她把捡到图的方位、周围的大小脚印、当天的风向讲得清清楚楚，连「地上有拖痕，不是人走的，我绕着走的」这种细节都没漏掉。\n你顺着她的描述在脑子里把地形走了一遍——顺着她标记的那条有水源的小道走，去南边能省出整整半天的路程，还能顺路下套。\n【叮！朵朵标记的安全猎道：生肉 ×2】"
                    },
                    {
                        "id": "c_2",
                        "text": "把图收好，先一起吃点东西",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 3
                            }
                        ],
                        "next": "__return__",
                        "result": "图纸上的墨迹晕得太厉害，油灯的光又暗，一时半会儿看不出所以然。你把它压平收进枕头底下，先给她热了一碗杂烩。\n她捧着碗小口吹气的样子，让你暂时忘掉了外面越来越近的嘶吼声。\n有些账，可以明天再算。"
                    }
                ]
            },
            "duoduo_s7_shelter__watch": {
                "id": "duoduo_s7_shelter__watch",
                "text": "后半夜，远处的林子里传来了第一声长嚎。\n悠长，低沉，尾音打着颤，像是从大地底下渗出来的。她的手一下子抓住你的袖子，指节都发了白。\n「哥哥，」她的声音在抖，但每个字都说得很清楚，「等直升飞机来了，你带我一起坐好不好？我很轻的，真的，不占地方的。」\n火光在她的眼睛里跳。你在那双一眨不眨的眼睛里，看见了你自己的倒影。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "「一言为定。带上你那只熊。」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 8
                            }
                        ],
                        "next": "__return__",
                        "result": "「嗯！！」\n她重重点头，把手伸了出来。两只手指在火光里勾在一起，盖上大拇指的印章。\n那一夜，兽潮的嚎叫声始终没能真正靠近你们的火光。后来你才知道，那一晚整片村子的灯火，只剩下你们这一盏还亮着。"
                    },
                    {
                        "id": "c_1",
                        "text": "握住那只发白的小手：「不止直升机，还有明天」",
                        "effects": [],
                        "next": "__return__"
                    },
                    {
                        "id": "c_2",
                        "text": "搓了一根草绳圈成环，套在她手腕上",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "duoduo_s7_shelter__alone": {
                "id": "duoduo_s7_shelter__alone",
                "text": "兽潮过境的夜里，村西的方向火光冲天。\n你缩在门后，数着嘶吼声一波一波地从屋顶碾过去，像黑色的洪水从头顶淌过。不知道第几波的时候，你忽然想起她离开时的背影——也是朝着村西的方向去的，背着那个比她还大的小背包。\n第二天清晨，你去了南边的岔路口。路上空空的，只有雾。雾里什么都有，唯独没有人。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "在岔路口插了一根树枝",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -4
                            }
                        ],
                        "next": "__return__",
                        "result": "要是她回来，要是她还认路，一眼就能看见这儿有人等过。\n你把树枝插得很深，底下压了石头，风吹不走，野兽碰不倒。\n做完这些你站了一会儿，转身回家。雾在你身后把岔路口合拢了。"
                    },
                    {
                        "id": "c_1",
                        "text": "把那根树枝削平，刻上两个字：「向东」",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            }
        }
    },
    {
        "id": "duoduo_s8_dawn",
        "title": "朵朵 · 八",
        "desc": "",
        "trigger": {
            "dayMin": 14,
            "flags": [
                "kid_saved"
            ]
        },
        "initialScene": "duoduo_s8_dawn__crane",
        "scenes": {
            "duoduo_s8_dawn__crane": {
                "id": "duoduo_s8_dawn__crane",
                "text": "第十四天的清晨，雾比以往任何一天都薄。薄得能看见远处山脊的轮廓，薄得能听见天上远远滚过的引擎轰鸣——一阵，停一下，又一阵，确凿无疑，像大地的心跳正在恢复。\n朵朵天不亮就来了。她献宝似的摊开手掌：一只纸鹤，用的是你写过日记的纸页背面，炭笔字迹透过纸背隐隐透出来，正反两面都是你的日子。\n「哥哥你看！我用你教的方法折的！一个角都没折歪！」",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "收下，放进胸口口袋",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 12
                            },
                            {
                                "kind": "flag",
                                "flag": "kid_crane"
                            }
                        ],
                        "next": "__return__",
                        "result": "纸鹤的翅膀上还留着她的炭笔小字，歪歪扭扭的两个字：「平安」。\n你把纸鹤放进胸口的口袋，隔着布料按了按。心脏在那个位置跳，一下，一下，很稳。\n十五天了。你第一次觉得，活着这件事有了重量——因为有人把它折成了纸鹤，交到你手上。"
                    },
                    {
                        "id": "c_1",
                        "text": "「再折一只，凑一对」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 14
                            },
                            {
                                "kind": "flag",
                                "flag": "kid_crane"
                            }
                        ],
                        "next": "__return__",
                        "result": "你们头碰着头折了整整一个上午。她的手小，折得慢，但每一条折痕都用指甲反复压实。\n第二只她坚持要用红色的糖纸——「这只代表我，那只代表你」。两只纸鹤被细绳拴在一处，挂在窗前。风一吹，它们就轻轻碰一下头。\n像在说悄悄话。像在说：还在呢，还在呢。"
                    },
                    {
                        "id": "c_2",
                        "text": "问她：「纸鹤要飞去哪儿呀」",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "duoduo_s8_dawn__oath": {
                "id": "duoduo_s8_dawn__oath",
                "text": "轰鸣声越来越近了。\n她把自己的小背包拖出来摆在脚边，里面装得满满当当：半袋浆果、那只缺口的碗、叠得方方正正的小被子、一边耳朵高的布偶熊——如果当初你教过她识字的话，还有那张她已经能读出名字的海图。每一样都码得整整齐齐，随时可以拎起来就走。\n「我都收拾好啦，」她仰起脸看你，眼睛亮晶晶的，「随时可以出发！」\n【叮！距离救援编队过境还有 1 天】",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "握住她的手：一起等到那一天",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 10
                            }
                        ],
                        "next": "__return__",
                        "result": "小小的手心全是汗，但抓得特别紧，像是要把你手掌上的纹路都记下来。\n雾散开的这一角天空下，一堆篝火，两个人，等着同一阵风。\n十五天前的你不会相信——有些家，不是等来的，是两个人一起守出来的。"
                    },
                    {
                        "id": "c_1",
                        "text": "翻开她的小背包，把水壶灌满塞在最上层",
                        "effects": [],
                        "next": "__return__",
                        "requires": {
                            "items": {
                                "water_clean": 1
                            }
                        }
                    }
                ]
            }
        }
    },
    {
        "id": "laok_s1_pact",
        "title": "老K · 一",
        "desc": "",
        "trigger": {},
        "initialScene": "laok_s1_pact__pact",
        "scenes": {
            "laok_s1_pact__pact": {
                "id": "laok_s1_pact__pact",
                "text": "当夜，老K把火堆拨到最旺，在你对面盘腿坐下。三样东西一字排开：一把磨得发亮的柴刀，一卷鱼线，半块没用过的肥皂——都是他全部家当里最像样的三样。\n「搭伙可以，先说好三条。」他竖起手指，一根一根扳，「一，天黑不进雾；二，水必烧开；三，我的过去你别打听，想说我自然会说。」\n窗外雾气翻涌，屋里火光稳定。他等着，像在等一个签约的仪式。你知道这三条背后，每一句都写着死过人的教训。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "「三条都记下了。睡吧。」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 4
                            }
                        ],
                        "next": "laok_s1_pact__fire",
                        "result": "他盯着你看了两秒，点点头，把柴刀挪到自己那一侧——这是把你当自己人的放法。\n那一夜你睡得出奇地沉。屋里多了一个人呼吸的声音，风声好像都被压小了。\n【叮！好感度提升：老K +5】"
                    },
                    {
                        "id": "c_1_0",
                        "text": "「凭什么听你的？」",
                        "effects": [],
                        "next": "laok_s1_pact__fire"
                    },
                    {
                        "id": "c_3_1",
                        "text": "「凭什么听你的？」",
                        "effects": [],
                        "next": "laok_s1_pact__fire"
                    },
                    {
                        "id": "c_3",
                        "text": "逐条追问：每条规矩，背后是什么事",
                        "effects": [],
                        "next": "laok_s1_pact__fire"
                    },
                    {
                        "id": "c_4",
                        "text": "加第四条：「谁病了，另一个管到底」",
                        "effects": [],
                        "next": "laok_s1_pact__fire"
                    },
                    {
                        "id": "c_5",
                        "text": "伸出三根手指逐一碰回去，像击掌那样",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "laok_s1_pact__fire": {
                "id": "laok_s1_pact__fire",
                "text": "后半夜他被噩梦惊醒过一次，手按在刀柄上坐了很久，呼吸缓了半天才平下来。见你也醒着，他自嘲地笑笑：「习惯了。以前带队，睡前得把明天的路在心里走一遍，哪段有落石，哪里能扎营，全过一遍才睡得着。」\n他顿了顿，声音低下去：「要是……我是说要是有雾散的那天。」话没说完，他自己先摆了摆手，「算了，睡觉。明天还要早起。」\n黑暗里，你听见他翻身的声音，很久才停。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "「雾散了，你第一件事做什么？」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 4
                            }
                        ],
                        "next": "__return__",
                        "result": "他沉默了很久，久到你以为他睡着了。\n「给我闺女打个电话。」他背对着你说，「就说爸不是故意的。」\n火堆里一根柴烧断了，火星腾起来又灭掉。"
                    },
                    {
                        "id": "c_1",
                        "text": "默默把水袋递过去",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 3
                            }
                        ],
                        "next": "__return__",
                        "result": "他在黑暗里接了，喝了一大口，喉咙滚动了两下。「谢了。」\n有些问题不用问出口。递过去的水，和递过去的道理是一样的。"
                    },
                    {
                        "id": "c_2",
                        "text": "装睡，把翻身的动静留给他体面",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "laok_s1_pact__dawn": {
                "id": "laok_s1_pact__dawn",
                "text": "清晨你醒来时，他已经劈好了一垛柴，码得棱角分明像用尺子量过。他正蹲在门口研究你的陷阱绳结，眉头拧着：「你这结打得不对，兔子一挣就脱，等于白送。」\n他三两下重打了一个，绳子在他手里听话得像有生命。「跟我学，这叫活扣，山里的老猎人传下来的，传到我这是第四代。」\n【叮！获得同伴：老K】——白天行动区新增「♟ 下棋」「派老K外出」，每晚他会自动吃一份食物。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "跟他学那个活扣",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 5
                            }
                        ],
                        "next": "__return__",
                        "result": "你的手指笨得像五根胡萝卜，学了七遍才打出来。他难得地笑出了声，笑完又板起脸：「行，孺子可教。明天教你下套。」\n绳子在他手里听话得像有生命。你忽然意识到：这个雾里的世界，终于有了一个「我们」。"
                    },
                    {
                        "id": "c_1",
                        "text": "把自己打的绳结全拆掉，让他重教一遍",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            }
        }
    },
    {
        "id": "laok_s2_gift",
        "title": "老K · 二",
        "desc": "",
        "trigger": {
            "dayMin": 4,
            "flags": [
                "laok_ally"
            ],
            "notFlags": [
                "laok_betrayed",
                "laok_trust"
            ]
        },
        "initialScene": "laok_s2_gift__wrap",
        "scenes": {
            "laok_s2_gift__wrap": {
                "id": "laok_s2_gift__wrap",
                "text": "清晨醒来，门口放着一个巴掌大的小布包，布角打着标准的军用结——那种一拉就开、越挣越紧的专业打法。\n老K在院子里劈柴，斧头起落的节奏刻意弄得很响，头也不回：「拿着吧。绷带、消炎药、还有一瓶净水。我以前干野外向导的，这点东西够你应急。」\n他说得云淡风轻。可你知道，那瓶净水是市面上早就绝迹的东西，他一定藏了很久，藏得比自己用的那份还仔细。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "收下并郑重道谢",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 10
                            },
                            {
                                "kind": "flag",
                                "flag": "laok_trust"
                            },
                            {
                                "kind": "item",
                                "item": "med_bandage",
                                "amount": 1
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
                        "next": "laok_s2_gift__guide",
                        "result": "你解开军用结——手法很讲究，一看就是救过命的包法。绷带卷得整整齐齐，抗生素的铝箔板用油纸包了两层防潮。\n这个满脸胡茬的男人，比看起来可靠得多。\n【叮！获得物资；老K对你的信任 +1 级】"
                    },
                    {
                        "id": "c_1_0",
                        "text": "原样塞回他怀里：「留着，你比我更需要」",
                        "effects": [],
                        "next": "laok_s2_gift__guide"
                    },
                    {
                        "id": "c_3_1",
                        "text": "原样塞回他怀里：「留着，你比我更需要」",
                        "effects": [],
                        "next": "laok_s2_gift__guide"
                    },
                    {
                        "id": "c_3",
                        "text": "用两块布料换（不白拿他的东西）",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 8
                            },
                            {
                                "kind": "flag",
                                "flag": "laok_trust"
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
                            },
                            {
                                "kind": "item",
                                "item": "med_antibiotic",
                                "amount": 1
                            }
                        ],
                        "next": "__return__",
                        "requires": {
                            "items": {
                                "mat_cloth": 2
                            }
                        },
                        "result": "你把两块布塞进他手里：「等价交换，谁也不欠谁。」\n他低头看了看布，忽然笑了：「行啊，还学会跟商人谈生意了。成交。」\n这一次，两人都收得心安理得。"
                    }
                ]
            },
            "laok_s2_gift__guide": {
                "id": "laok_s2_gift__guide",
                "text": "收了东西的当天下午，他就拉着你「上课」，教得毫无保留：怎么从雾的走向辨明日风向，怎么用三根木棍搭一个把雨水引进锅里的导向槽，怎么把背包带打成能单手解开的活结。\n「这些玩意儿平时看着没用，」他用指节敲敲你的脑门，「但救命的时候，一次就够。我这条命，就是被这些『没用』的东西救回来的。」",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "认认真真学完全部三样",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 5
                            }
                        ],
                        "next": "__return__",
                        "result": "雨水导向槽你搭歪了两次，第三次终于让水流进了锅里。老K抱着膀子看了半天，点了根不知道从哪摸出来的烟：「行。照这么学下去，你小子能活得比我久。」\n黄昏的光穿过薄雾，落在那缕青烟上。"
                    },
                    {
                        "id": "c_1",
                        "text": "边学边夸：「你这十年队没白带」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 4
                            }
                        ],
                        "next": "__return__",
                        "result": "「少来这套。」他嘴上嫌弃，手里的演示却越来越起劲，连压箱底的「狼烟求救码」都掏出来教了你。\n男人这种生物，吃软不吃硬，尤其吃这一套。"
                    },
                    {
                        "id": "c_2",
                        "text": "掏出本子，把三样技巧连图带注记下来",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "laok_s2_gift__tip": {
                "id": "laok_s2_gift__tip",
                "text": "晚上熄火前，他往火堆上撒了一把湿草，青烟腾起，他盯着烟的方向看了足足十秒。\n「记住，」他说，「烟直走，明天晴；烟趴地，雾要涨；烟打转——」他停了一下，声音沉了沉，「别出门。打转的烟底下，走出来的东西不一定还是人。」\n四句口诀，前两句关于天气，后两句关于保命。你把它们记在了心里最重要的位置。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "记下这四句口诀",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 3
                            }
                        ],
                        "next": "__return__",
                        "result": "【叮！获得生存知识：观烟辨天】\n从今往后，每天清晨抬头看看烟，成了你们的默契。像一句只有两个人懂的暗号。"
                    },
                    {
                        "id": "c_1",
                        "text": "问他：「烟打转的时候，该往哪儿跑」",
                        "effects": [],
                        "next": "__return__"
                    },
                    {
                        "id": "c_2",
                        "text": "抓一把湿草，学着他的样子撒上去",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            }
        }
    },
    {
        "id": "laok_s3_photo",
        "title": "老K · 三",
        "desc": "",
        "trigger": {
            "dayMin": 5,
            "notFlags": [
                "laok_photo_done"
            ]
        },
        "initialScene": "laok_s3_photo__glance",
        "scenes": {
            "laok_s3_photo__glance": {
                "id": "laok_s3_photo__glance",
                "text": "晚饭后你整理杂物，一张旧照片从本子里滑出来，飘落在地。老K的目光扫过来，突然僵住了——擦刀的手停在半空，刀刃上的油都顾不上擦。\n「这照片……」他的声音有点哑，「你从哪儿弄来的？」\n照片背面朝上，隐约透出一行褪色的钢笔字。他的喉结上下滚了两下，那双见惯了生死的眼里，翻起了一点不该有的东西。",
                "choices": [
                    {
                        "id": "c_0_0",
                        "text": "如实相告，反问照片背后的故事",
                        "effects": [],
                        "next": "rescue_s5_split__split"
                    },
                    {
                        "id": "c_2_1",
                        "text": "如实相告，反问照片背后的故事",
                        "effects": [],
                        "next": "rescue_s5_split__split"
                    },
                    {
                        "id": "c_2",
                        "text": "打趣他：「咋，你失散的兄弟？」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 2
                            }
                        ],
                        "next": "rescue_s5_split__split",
                        "result": "他愣了一秒，然后「呸」了一声笑骂：「滚！我兄弟长得比我俊多了！」\n骂完他把自己的口粮分了你一半，动作粗鲁，理由敷衍：「看你瘦的，丢我的人。」\n眼角的湿意被他用大笑盖了过去。"
                    },
                    {
                        "id": "c_3",
                        "text": "把照片翻过去，只让他看背面那行字",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "laok_s3_photo__split": {
                "id": "laok_s3_photo__split",
                "text": "第二天清晨，你发现桌上摆着两份早餐——他用仅剩的面粉烙了两张饼，一边一张，摆得对称极了，连饼上的焦花都差不多。\n「吃。」他坐在对面啃着自己那张，含糊不清地说，「从今天起，粮食对半分。谁也别饿着，谁也别多占。」\n这是他定的第四条规矩。前三条保命，这一条，像是想把「家」这个字重新拼起来。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "把自己那张掰一半推回去",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 3
                            }
                        ],
                        "next": "__return__",
                        "result": "「规矩是你定的，」你把饼推过去，「但饭是大家一起吃的。我今天胃口小。」\n他瞪着你瞪了半天，最后把那半块饼撕成两份，一份又塞回你手里。两个固执的人，一顿早饭吃了半小时。"
                    },
                    {
                        "id": "c_1",
                        "text": "收下，认真吃完",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 4
                            }
                        ],
                        "next": "__return__",
                        "result": "你吃得干干净净，连渣都拍起来吃了。他看着你的吃相满意地点点头：「这就对了。浪费粮食的，山里有的是教训。」\n两张饼，两个人，一顿像样的早饭。末世里的奢侈，不过如此。"
                    },
                    {
                        "id": "c_2",
                        "text": "把饼对半掰开，两块半换着吃",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "laok_s3_photo__names": {
                "id": "laok_s3_photo__names",
                "text": "那天下午，他把照片翻过来倒过去看了好几遍，忽然没头没脑地问：「你家呢？雾来之前，家里还有什么人？」\n这是他第一次主动问起你的事。火堆上的水壶咕嘟咕嘟地响，蒸汽把两个人的轮廓都熏得模糊了。窗外的雾白得没有边界，屋里的这一点烟火气，显得格外不真实。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "讲给他们听——每一个人的名字",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 8
                            }
                        ],
                        "next": "laok_s3_photo__watch",
                        "result": "你讲了很久。讲到后来嗓子有点哑，他就默默往你手里塞了个烤热的面饼。\n「记下了。」他拍拍自己的脑袋，「我记性好。你家里人，从今往后也算我半个熟人。」\n在这片吞掉名字的雾里，多一个人记住你的来处，就多一分走不丢的底气。"
                    },
                    {
                        "id": "c_1",
                        "text": "只说了四个字：「都在等你」",
                        "effects": [],
                        "next": "laok_s3_photo__watch"
                    },
                    {
                        "id": "c_2",
                        "text": "讲完后轻声问：「你弟弟……叫什么？」",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "laok_s3_photo__watch": {
                "id": "laok_s3_photo__watch",
                "text": "入夜前，他捡了两块石子在桌上摆开：「以后夜里轮着守。你上半夜，我下半夜，换班喊一声。守夜的别贪睡，睡觉的不许装醒——两条都得守，守夜是保命，睡觉也是保命。」\n他把其中一块石子推给你。一块被磨得光滑的灰石头，边角圆润，不知在他口袋里躺了多少年。\n「这算什么？」\n「信物。」他说得一本正经，「拿着它站岗的，才算这个家的哨兵。」",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "收下石子，敬了个不伦不类的礼",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 5
                            },
                            {
                                "kind": "flag",
                                "flag": "laok_photo_done"
                            }
                        ],
                        "next": "__return__",
                        "result": "他绷着脸憋笑，最后还是没憋住，笑声撞在屋顶上弹回来。\n【叮！守夜同盟成立】——从此你们的夜晚有了秩序：一半属于你的警觉，一半属于他的鼾声。"
                    },
                    {
                        "id": "c_1",
                        "text": "把石子揣进贴胸的口袋",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            }
        }
    },
    {
        "id": "laok_s4_past",
        "title": "老K · 四",
        "desc": "",
        "trigger": {
            "dayMin": 7,
            "flags": [
                "laok_ally",
                "laok_trust"
            ],
            "notFlags": [
                "laok_deep"
            ]
        },
        "initialScene": "laok_s4_past__ember",
        "scenes": {
            "laok_s4_past__ember": {
                "id": "laok_s4_past__ember",
                "text": "晚饭后，老K摩挲着一张皱巴巴的画——蜡笔涂的，三个歪歪扭扭的小人手拉着手，太阳画在左上角，比房子还大。\n「我闺女画的。」他的声音很轻，「今年该上初中了。穿越那天她在外婆家……我这辈子最后悔的，就是那天没去接她放学。」\n火光在他脸上跳动，把那些沟壑照得忽深忽浅。他破天荒地开了口，像是把心口的石头一块块往外搬。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "「雾散了就去接她。我陪你走一趟。」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 14
                            }
                        ],
                        "next": "laok_s4_past__lesson",
                        "result": "老K愣了很久很久，突然笑了——眼睛亮得像换了一个人：「对，雾散了就去接她！到时候你得来喝满月酒——不对，升学酒！」\n那一晚你们聊到很晚。聊她小时候怕打雷，聊她考砸了藏卷子的地方。你多了一个战友，他多了一个证人——证明他不是孤身一人。"
                    },
                    {
                        "id": "c_1",
                        "text": "安静地陪他坐一会儿",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 8
                            }
                        ],
                        "next": "laok_s4_past__lesson",
                        "result": "有些话不需要回应。你只是往火堆里添了一根柴，让火烧得更稳一些。\n他看着火，你看着他。两个人的影子在墙上靠得很近，中间隔着的那点距离，叫作体面。"
                    },
                    {
                        "id": "c_2",
                        "text": "接过画，仔细抚平折角再递还给他",
                        "effects": [],
                        "next": "laok_s4_past__lesson"
                    },
                    {
                        "id": "c_3",
                        "text": "往火里添了根柴，让火烧得更稳些",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "laok_s4_past__lesson": {
                "id": "laok_s4_past__lesson",
                "text": "「睡不着就出来。」半夜，他忽然敲门，把你拽到院子里。\n今晚的雾薄得罕见，头顶竟有几颗星子透了下来，微弱，但确凿。他仰着头，用下巴指了指天上：「看见那个勺子形状的没有？北斗。勺口两颗星连线，往外延长五倍，亮的那颗就是北极星。找到它，就找到了北。」\n他的声音在夜里格外沉稳：「向导的第一课：迷路不可怕，可怕的是忘了抬头。」",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "顺着他的手臂找那颗星",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 8
                            },
                            {
                                "kind": "flag",
                                "flag": "star_wise"
                            }
                        ],
                        "next": "__return__",
                        "result": "你顺着他粗糙的手指望上去——找到了。北极星很小，很静，挂在那里千万年不动。\n「记住了？」\n「记住了。」\n「那就行。」他拍拍你的肩，「以后不管谁走散了，往北走，就能走回这儿。」\n这儿。他说这个词的时候，指的是你的木屋。"
                    },
                    {
                        "id": "c_1",
                        "text": "指着另一颗星问：「那颗呢？也叫得出吗」",
                        "effects": [],
                        "next": "__return__"
                    },
                    {
                        "id": "c_2",
                        "text": "借着星光，把北斗的形状描进本子里",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "laok_s4_past__promise": {
                "id": "laok_s4_past__promise",
                "text": "临睡前，他又补了一句，语气轻描淡写，内容却重若千钧：「到时候你得来喝满月酒——不对，升学酒。我闺女学习好，老师说她肯定能考上高中。」\n他望着熄灭的火堆，补上了后半句：「你要不来，酒就不开坛。」\n一个在末世里许诺未来的男人，比任何口号都有力量。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "「一言为定。礼金我先记账上。」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 6
                            },
                            {
                                "kind": "flag",
                                "flag": "laok_deep"
                            }
                        ],
                        "next": "__return__",
                        "result": "他哈哈大笑，笑声惊得墙外的什么东西窸窣逃窜。\n【叮！解锁剧情线：老K的身世与约定】——他开始把更重要的东西托付给你了。"
                    },
                    {
                        "id": "c_1",
                        "text": "认真地问：「闺女叫什么名字」",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            }
        }
    },
    {
        "id": "laok_s5_patrol",
        "title": "老K · 五",
        "desc": "",
        "trigger": {
            "dayMin": 8
        },
        "initialScene": "laok_s5_patrol__offer",
        "scenes": {
            "laok_s5_patrol__offer": {
                "id": "laok_s5_patrol__offer",
                "text": "清晨，老K把背包甩上肩，动作利落得不像个中年人：「今天我出去转一圈。东边超市的货架第二层可能还有漏网之鱼，西边溪谷的水位我三天没看了，心里没底。」\n他活动着手腕关节，噼啪作响，眼神是猎人的那种平静锐利。「你在家里看着火，别乱跑。放心，我死不了——答应过闺女的酒还没喝呢，阎王爷不敢收。」\n白天行动区的「派老K外出」，从此有了更重的分量。",
                "choices": [
                    {
                        "id": "c_0_0",
                        "text": "「带上哨子，天黑前必须回来」",
                        "effects": [],
                        "next": "laok_s5_patrol__debrief"
                    },
                    {
                        "id": "c_2_1",
                        "text": "「带上哨子，天黑前必须回来」",
                        "effects": [],
                        "next": "laok_s5_patrol__debrief"
                    },
                    {
                        "id": "c_2",
                        "text": "「今天雾太毒，谁都别动」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 3
                            }
                        ],
                        "next": "laok_s5_patrol__debrief",
                        "result": "他探头看了看天，点头：「听你的。雾趴着走的时候，山里的老手都得掂量。」\n那一天你们哪儿也没去。他修好了吱呀作响的门轴，你补了屋顶的漏洞。傍晚时分，远处传来一声若有若无的嚎叫——你们对视一眼，都从对方眼里看到了庆幸。"
                    },
                    {
                        "id": "c_3",
                        "text": "把你的火把塞进他背包侧袋",
                        "effects": [],
                        "next": "__return__",
                        "requires": {
                            "items": {
                                "tool_torch": 1
                            }
                        }
                    }
                ]
            },
            "laok_s5_patrol__debrief": {
                "id": "laok_s5_patrol__debrief",
                "text": "晚上，他就着火光用炭条在一块木板背面画地图——哪里的水位变了，哪里的泥地上出现了不属于野兽的爪印，哪条路的雾「闻起来不对」。\n「记下来。」他把木板推到你面前，指尖点着其中三处，「我一个人看得再多，也是一双眼睛。你加上我，是两双。两双眼睛看到的世界，比一双完整得多。」\n【叮！联合侦察：雾压 -3】",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "把情报誊抄进自己的日记",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 4
                            }
                        ],
                        "next": "__return__",
                        "result": "两双眼睛看到的世界，果然比一双完整得多。\n你忽然明白了他为什么非要出门：他不是在搜刮物资，他是在替你们两个人，把这个世界的底细一点点摸清。"
                    },
                    {
                        "id": "c_1",
                        "text": "在木板地图上补上你见过的那道车辙",
                        "effects": [],
                        "next": "__return__",
                        "requires": {
                            "flags": [
                                "scout_spotted"
                            ]
                        }
                    },
                    {
                        "id": "c_2",
                        "text": "把爪印的位置用炭条圈了个圈",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            }
        }
    },
    {
        "id": "laok_s6_secret",
        "title": "老K · 六",
        "desc": "",
        "trigger": {
            "dayMin": 10,
            "flags": [
                "laok_trust"
            ],
            "notFlags": [
                "laok_secret_done"
            ]
        },
        "initialScene": "laok_s6_secret__key",
        "scenes": {
            "laok_s6_secret__key": {
                "id": "laok_s6_secret__key",
                "text": "老K把你叫到屋后，左右看了看——确认连风都没有偷听的方向——才从贴身的口袋里摸出一把黄铜钥匙，塞进你手心。钥匙冰凉，却又带着一点体温，是他焐了一路的温度。\n「矿洞，工具房，第三排。」他的眼神是你从未见过的凝重，像两口深不见底的井，「里面有我留的东西……如果我没能自己回去取的话。」\n他没解释「没能」是什么意思。有些词，说出来就不吉利了；有些嘱托，托付出去就再也收不回。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "「我现在就去取回来」（HP≥50）",
                        "effects": [],
                        "next": "__return__",
                        "result": "他抓了一下你的手腕，力道很大：「路上小心。矿洞的支撑木朽了好几根，别在下面逗留。」\n你点头，把钥匙攥紧，出发。"
                    },
                    {
                        "id": "c_1",
                        "text": "把钥匙推回去：「你自己去，我在外面接应」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 5
                            },
                            {
                                "kind": "flag",
                                "flag": "laok_bond"
                            },
                            {
                                "kind": "flag",
                                "flag": "laok_secret_done"
                            },
                            {
                                "kind": "item",
                                "item": "med_bandage",
                                "amount": 1
                            }
                        ],
                        "next": "__return__",
                        "result": "他愣住了，捏着钥匙看了很久很久，像是在看一件失而复得的东西。\n「……好。」他重重点头，把钥匙重新收好，声音有点哑，「当晚我就去。这条命，往后跟你混了。」\n【叮！好感度大幅提升：老K +25】"
                    },
                    {
                        "id": "c_2",
                        "text": "问：「如果我回不来呢？」",
                        "effects": [],
                        "next": "__return__"
                    },
                    {
                        "id": "c_3",
                        "text": "把钥匙在掌心焐热了才还给他看：「记下了」",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "laok_s6_secret__trek": {
                "id": "laok_s6_secret__trek",
                "text": "矿洞在半山腰，两条路可选：大路平缓开阔，但整个人暴露在雾里；排水沟又低又黑，贴着岩壁钻过去，隐蔽却难走，据说沟里有蛇。\n洞口的支撑木上，你认出了一个记号——一个缩小的绳结刻痕，活扣的打法。是老K的手笔。他早就把退路和记号都安排好了，只等有一天，有人替他走进去。",
                "choices": [
                    {
                        "id": "c_0_0",
                        "text": "走大路，稳扎稳打",
                        "effects": [],
                        "next": "laok_s6_secret__room"
                    },
                    {
                        "id": "c_2_1",
                        "text": "走大路，稳扎稳打",
                        "effects": [],
                        "next": "laok_s6_secret__room"
                    },
                    {
                        "id": "c_2",
                        "text": "走排水沟，举火把贴壁疾行（需要火把）",
                        "effects": [
                            {
                                "kind": "item",
                                "item": "mat_scrap_metal",
                                "amount": 1
                            }
                        ],
                        "next": "laok_s6_secret__room",
                        "requires": {
                            "items": {
                                "tool_torch": 1
                            }
                        },
                        "result": "火光贴着湿滑的沟壁前进，头顶是废弃的运矿轨道，锈迹斑斑。你按他说的数着步子走——两百一十七步，正好是沟渠尽头。\n洞口的记号出现在眼前时，你长出了一口气。顺便在沟底捡了一截废铁。"
                    },
                    {
                        "id": "c_3",
                        "text": "进洞前，在支撑木上补刻一个活扣记号",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "laok_s6_secret__room": {
                "id": "laok_s6_secret__room",
                "text": "工具房的锁很涩，钥匙捅进去转了三次才咔哒一声弹开，声音在空旷的矿洞里荡出回音。\n手电扫过去：铁架、油桶、蒙尘的工作台，一切都覆着厚厚的灰——以及角落里一只用防水布裹了三层的箱子。箱子上压着一块石头，石头下面压着一张字条，只有三个字：\n「弟，勿念。」\n字条上的称呼，不是写给你的。",
                "choices": [
                    {
                        "id": "c_0_0",
                        "text": "打开箱子",
                        "effects": [],
                        "next": "laok_s6_secret__letter"
                    },
                    {
                        "id": "c_2_1",
                        "text": "打开箱子",
                        "effects": [],
                        "next": "laok_s6_secret__quiet_end"
                    },
                    {
                        "id": "c_2",
                        "text": "合掌默立三秒，再动手开箱",
                        "effects": [],
                        "next": "laok_s6_secret__letter"
                    },
                    {
                        "id": "c_3",
                        "text": "先查看箱子四周有没有布设机关",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "laok_s6_secret__letter": {
                "id": "laok_s6_secret__letter",
                "text": "回程的路上你一直在想那封信。想他写到「拉你一把」的时候，握笔的手会不会也在抖；想那个水渍糊住的地方，到底是雨水还是别的什么。\n到家时老K迎上来，嘴唇动了动，终究没敢问。你把药箱递给他，然后把看到的一切原原本本告诉了他。\n他背过身去，肩膀抖了很久。再转回来时眼眶通红，却笑了：「谢谢你，替我看了一眼。」",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "「下次一起去。信，当面念给他听。」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 10
                            }
                        ],
                        "next": "__return__",
                        "result": "他用力点头，用力到整个上半身都在晃。\n那天晚上他破例喝了自己存着的半瓶药酒，絮絮叨叨讲了很多弟弟的事——讲到最后，说的是：「雾散了，先去找他。找得到找不得到的，都去。」\n【叮！老K与你结为生死之交】"
                    },
                    {
                        "id": "c_1",
                        "text": "把信按原折痕放回去：有些话该他自己读",
                        "effects": [],
                        "next": "__return__"
                    },
                    {
                        "id": "c_2",
                        "text": "替他读出声——只读到抬头两个字就停下",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "laok_s6_secret__quiet_end": {
                "id": "laok_s6_secret__quiet_end",
                "text": "回到家，你对他说一切安好，东西都在，只是太重没拿回来。\n他盯着你看了很久很久——久到墙上的影子都换了角度，久到你几乎要绷不住。然后他没有戳穿，只是点点头：「辛苦。」两个字，千钧重。\n有些谎话说出口，是因为真话太锋利。他知道你撒谎的理由，就像你知道他拜托你的理由一样——都是为了让对方，还能背着包袱往前走。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "把这件事埋进肚子里",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -3
                            }
                        ],
                        "next": "__return__",
                        "result": "那一夜你听见他在院子里坐到很晚。\n第二天清晨，他在你门口放了那把黄铜钥匙——现在它属于你了。连同它背后的所有秘密一起。"
                    },
                    {
                        "id": "c_1",
                        "text": "夜里把工具房钥匙擦亮，挂上门后的钉子",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "laok_s6_secret__trust_end": {
                "id": "laok_s6_secret__trust_end",
                "text": "当晚他独自出了门。你按约定在村口的高地上举着火把接应——火光是他的路标，也是约定的信号：平安就三短一长，出事就不停地摇。\n后半夜，哨音由远及近。三短，一长。\n他回来了，脚步很轻，肩上的袋子却很沉。「拿到了。」他对你说，也像是对自己说，「该拿的，都拿到了。」",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "接过袋子，什么都不问",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 6
                            }
                        ],
                        "next": "__return__",
                        "result": "袋子里有药，有一封封着口的信，还有一小瓶他家乡的土——不知道什么时候备下的。\n他没解释，你没问。信任这个东西，一半是交出去，另一半是不追问。\n【叮！老K与你结为生死之交】"
                    },
                    {
                        "id": "c_1",
                        "text": "烧一锅热水，等他回来烫脚",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            }
        }
    },
    {
        "id": "laok_s7_plan",
        "title": "老K · 七",
        "desc": "",
        "trigger": {
            "dayMin": 11,
            "flags": [
                "laok_ally",
                "laok_deep"
            ],
            "notFlags": [
                "laok_plan_done"
            ]
        },
        "initialScene": "laok_s7_plan__proposal",
        "scenes": {
            "laok_s7_plan__proposal": {
                "id": "laok_s7_plan__proposal",
                "text": "「听我说。」老K摊开一张皱巴巴的手绘地图，上面用炭条标满了大小记号，密密麻麻像星图。「第十三天，兽潮。它们循着气味走河谷，硬拼是下策中的下策。」\n他的手指划过一条蜿蜒的线：「旧河道绕高地，居高临下，它们的冲锋队形会散。但得提前两天备木栅栏，一天设伏、一天加固——」他抬眼看你，目光灼灼，「信我一次？」\n【预警】兽潮将在两天后过境。",
                "choices": [
                    {
                        "id": "c_0_0",
                        "text": "「全听你的。人手物料你调。」",
                        "effects": [],
                        "next": "rescue_s7_eve__eve"
                    },
                    {
                        "id": "c_2_1",
                        "text": "「全听你的。人手物料你调。」",
                        "effects": [],
                        "next": "rescue_s7_eve__eve"
                    },
                    {
                        "id": "c_2",
                        "text": "「按我的法子来，加固门窗就行」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -4
                            }
                        ],
                        "next": "rescue_s7_eve__eve",
                        "result": "老K没争辩，只是默默收起了地图。那晚之后他话少了很多。\n也许向导也有向导的骄傲——他把命押在专业上的骄傲。你选择了另一条路，就得独自面对它的重量。"
                    },
                    {
                        "id": "c_3",
                        "text": "指着高地缺口问：「第一波冲这里怎么办」",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "laok_s7_plan__eve": {
                "id": "laok_s7_plan__eve",
                "text": "两天时间，你们把院子改造成了一个小小的堡垒：三层交叉的木栅栏、削尖的斜置拒马、灌了沙的陶罐压在冲锋的必经路口。\n干活间隙，老K不知疲倦，嘴里哼着一支不成调的歌。你问他唱的什么，他手上不停：「山里人开工都唱歌。唱了，山神爷就知道咱们是正经干活，不是来捣乱的——再说，」他咧嘴一笑，「哼着歌干活，不觉得累。」\n【叮！防御工事完工】",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "跟着他一起哼",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 6
                            }
                        ],
                        "next": "laok_s7_plan__night",
                        "result": "两个大男人，一边钉栅栏一边哼着跑调的山歌，惊飞了篱笆上的两只乌鸦。\n荒唐吗？有一点。安心吗？非常。"
                    },
                    {
                        "id": "c_1",
                        "text": "往陶罐的沙里掺石灰粉",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "laok_s7_plan__night": {
                "id": "laok_s7_plan__night",
                "text": "第十三夜，兽潮如期而至。\n大地先是低频地震颤，碗里的水纹丝成圈；然后是黑压压的洪流从河谷方向涌来——它们真的循着河道来了，一头撞在栅栏阵上，锋线散乱。你和老K背靠背站在高地缺口处，火把、柴刀、削尖的拒马各司其职，配合得像演练过一百遍。\n嘶吼声中，他忽然冲你咧嘴一笑。你居然也笑了。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "守住缺口，撑到天亮",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 12
                            },
                            {
                                "kind": "flag",
                                "flag": "laok_plan_done"
                            }
                        ],
                        "next": "__return__",
                        "result": "东方泛白时，兽潮退了，像一场黑色的洪水撤出了河道。\n栅栏上全是撞击的痕迹，但它们都扛住了。你们瘫坐在地上，相视大笑，笑得直不起腰——专业的事交给专业的人，再加上一个信他的你，这就是全部的秘诀。\n【叮！计划圆满成功】"
                    },
                    {
                        "id": "c_1",
                        "text": "背靠背时数他的呼吸给自己定拍",
                        "effects": [],
                        "next": "__return__"
                    },
                    {
                        "id": "c_2_0",
                        "text": "朝着兽群吼一嗓子，替自己壮胆",
                        "effects": [],
                        "next": "__return__"
                    },
                    {
                        "id": "c_4_1",
                        "text": "朝着兽群吼一嗓子，替自己壮胆",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "laok_s7_plan__stubborn": {
                "id": "laok_s7_plan__stubborn",
                "text": "兽潮之夜，你把自己焊在门后：门闩顶死、桌椅堆门、柴刀在手，呼吸压到最轻。\n外面的世界天崩地裂，撞击声、嘶吼声、木头断裂声混成一片。而走廊尽头，老K默默守着后窗——他没有走，也没有多话，只是提前把你的斧头磨利了，放在你伸手可得的地方。\n各守各的位置。这也是一种并肩。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "握紧柴刀，熬到天亮",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 2
                            },
                            {
                                "kind": "flag",
                                "flag": "laok_plan_done"
                            }
                        ],
                        "next": "__return__",
                        "result": "门闩顶住了。院墙被撞裂了一角，但屋子保住了，人也都在。\n清晨清点，老K看着墙上那道裂缝说：「下次，听听专业人士的？」\n你喘着气回嘴：「下次再说。」他哼了一声，嘴角却翘了起来。"
                    },
                    {
                        "id": "c_1",
                        "text": "给斧头柄缠上一圈防滑布条",
                        "effects": [],
                        "next": "__return__",
                        "requires": {
                            "items": {
                                "mat_cloth": 1
                            }
                        }
                    },
                    {
                        "id": "c_2",
                        "text": "在心里默数呼吸，从一数到一千",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            }
        }
    },
    {
        "id": "laok_s8_oath",
        "title": "老K · 八",
        "desc": "",
        "trigger": {
            "dayMin": 13
        },
        "initialScene": "laok_s8_oath__repair",
        "scenes": {
            "laok_s8_oath__repair": {
                "id": "laok_s8_oath__repair",
                "text": "兽潮过境的第一个清晨，你们合力修缮栅栏。阳光难得地穿透雾层，照得汗珠一闪一闪，锯末的气味混着晨雾的湿冷，竟有种踏实的生活气息。\n「一根、两根、三根……」老K一边钉钉子一边数着什么。你问他数什么，他头也不抬：「数咱们还剩多少钉子。数完了物资，」他抬眼看看渐渐变薄的雾，「就该数日子了。救援队快到了吧？」\n【叮！距离救援编队过境还有不到 2 天】",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "递给他水壶，让他歇口气",
                        "effects": [],
                        "next": "laok_s8_oath__compass",
                        "result": "他咕咚咕咚灌了大半壶，用手背抹嘴：「行了，缓过来了。接着干——干完这票，咱们的窝就算齐活了。」\n他说「咱们的窝」的时候，语气自然得就像说「今天的天气」。"
                    },
                    {
                        "id": "c_1",
                        "text": "把最后一把完好的钉子留给他收着",
                        "effects": [],
                        "next": "laok_s8_oath__compass"
                    },
                    {
                        "id": "c_2",
                        "text": "提议把缺口栅栏改成可拆卸的活扣结构",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "laok_s8_oath__compass": {
                "id": "laok_s8_oath__compass",
                "text": "傍晚收工，他忽然把一个东西按进你掌心：一只黄铜指南针，盖面被摩挲得发亮，边缘有一道深深的砍痕——那是某个故事留下的伤疤。\n「我认路靠脑子就够了，这玩意儿留给你。」他不容拒绝地合拢你的手指，「当年在山里，它替我挡过一刀。刀是冲我心口来的。」\n指针在夕阳下微微颤动，最后稳稳指向北方——像一句无声的承诺：路，永远有方向。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "郑重收下，贴身放好",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 8
                            },
                            {
                                "kind": "flag",
                                "flag": "laok_compass"
                            }
                        ],
                        "next": "__return__",
                        "result": "【叮！获得信物：老K的黄铜指南针】\n这不是一件装备，这是一段命的托付。从今天起，你的口袋里除了纸鹤和石子，又多了一份重量——活着走出去的重量。"
                    },
                    {
                        "id": "c_1",
                        "text": "问他砍痕的来历",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "laok_s8_oath__school": {
                "id": "laok_s8_oath__school",
                "text": "夜里最后一班岗，他难得主动开了腔，眼睛望着火堆：「雾散之后，我先去闺女学校门口等着。她放学要是看不见我，该着急了。」\n他顿了顿，转头看你：「你呢？雾散了你干什么去？」\n这个问题他在心里显然盘算了一整天。火堆噼啪响了一声，火星升起来，像在替你计时。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "「送你们父女俩回家」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 8
                            }
                        ],
                        "next": "laok_s8_oath__oath",
                        "result": "他怔了一下，随即重重锤了下你的肩膀，力道大得差点把你捶进火堆里。\n「好小子。」他别过头去，声音有点闷，「行。那你得喝那坛升学酒——双份。」"
                    },
                    {
                        "id": "c_1",
                        "text": "「想去看海。听说海是咸的。」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 10
                            }
                        ],
                        "next": "laok_s8_oath__oath",
                        "result": "「海？」他挑了挑眉，忽然笑了，「巧了。我弟以前总嚷嚷要去海边。行，送完闺女，我陪你去——顺路把我弟那份也看了。」\n两个约定，一条路线。雾散之后的日子，忽然就有了盼头。"
                    },
                    {
                        "id": "c_2",
                        "text": "「教你孙子下棋。让你尝尝连输五把的滋味」",
                        "effects": [],
                        "next": "__return__"
                    }
                ]
            },
            "laok_s8_oath__oath": {
                "id": "laok_s8_oath__oath",
                "text": "换岗前，他站起来伸出手——成年男人的仪式，不需要语言，简单，直接。\n「丑话说前头，」他握住你的手，力道极大，「最后这两天，谁也不许逞英雄，谁也不许死在前面。活着上直升机，一样不少地出去。做得到吗？」\n【叮！距离救援编队过境还有 1 天】",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "「做得到。击掌为誓。」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 10
                            }
                        ],
                        "next": "__return__",
                        "result": "手掌相击的一声脆响，在夜里传出很远。\n【叮！与老K立下同归之誓】——只要第十五天的夜里他还活着、还在身边，直升机的舱门就会为他多开一人位。\n雾散倒计时，开始了。"
                    },
                    {
                        "id": "c_1",
                        "text": "击掌之后补一句：「信我留着，出去那天还你」",
                        "effects": [],
                        "next": "__return__",
                        "requires": {
                            "flags": [
                                "lk_letter_unread"
                            ]
                        }
                    }
                ]
            }
        }
    },
    {
        "id": "doc_s1_housecall",
        "title": "老医生·上门问诊",
        "desc": "",
        "trigger": {
            "dayMin": 4,
            "flags": [
                "doc_met"
            ],
            "notFlags": [
                "doc_plan"
            ]
        },
        "initialScene": "doc_s1_housecall__q",
        "scenes": {
            "doc_s1_housecall__q": {
                "id": "doc_s1_housecall__q",
                "text": "老医生站在你门口，手里攥着一瓶碘伏。\n「有个事儿想跟你商量。」他推了推眼镜，「我那儿的药品快见底了，但诊所还能撑。你要是愿意搭把手——」\n他看了一眼你手里的绷带。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "分他一些草药（-2herb_green +10sanity）",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 10
                            },
                            {
                                "kind": "item",
                                "item": "herb_green",
                                "amount": -2
                            },
                            {
                                "kind": "item",
                                "item": "med_bandage",
                                "amount": 1
                            }
                        ],
                        "next": "__return__",
                        "requires": {
                            "items": {
                                "herb_green": 2
                            }
                        },
                        "result": "你掏出两把晒干的草药递过去。他愣了一下，然后郑重其事地揣进怀里。\n「行，我记着。」他从兜里摸出一瓶碘伏塞给你，「拿着，擦伤了别感染。」\n【好感+15 获得碘伏×1】"
                    },
                    {
                        "id": "c_1",
                        "text": "问他怎么认识这么多草药",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 8
                            },
                            {
                                "kind": "flag",
                                "flag": "doc_trust1"
                            }
                        ],
                        "next": "__return__",
                        "result": "「社区医院干了二十年，什么没见过。」他笑了笑，「可惜现在没设备了，只能靠经验。你要想学，我可以教。」\n他从口袋里摸出一本翻烂的《野外急救手册》递给你。\n【获得「野外急救手册」】\n【好感+10】"
                    },
                    {
                        "id": "c_2",
                        "text": "婉拒",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 2
                            }
                        ],
                        "next": "__return__",
                        "result": "「行，不勉强。」他转身要走，又回头，「不过要是哪天改主意了，我在诊所等你。」\n他走了几步又折回来，「对了，溪谷那边最近不太平，别去太深。」"
                    }
                ]
            },
            "doc_s1_housecall__end": {
                "id": "doc_s1_housecall__end",
                "text": "老医生的背影消失在雾中。他的白大褂已经洗得发黄，但补丁补得整整齐齐。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "记下他的话",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "doc_trust1"
                            }
                        ],
                        "next": "__return__",
                        "result": "你在日记本上写下：「老医生——社区医院，懂草药，人不坏。」"
                    },
                    {
                        "id": "c_1",
                        "text": "随他去吧",
                        "effects": [],
                        "next": "__return__",
                        "result": "你关上门。每个人都有自己的路。"
                    }
                ]
            }
        }
    },
    {
        "id": "doc_s2_shortage",
        "title": "老医生·药箱见底",
        "desc": "",
        "trigger": {
            "dayMin": 6,
            "flags": [
                "doc_met"
            ],
            "notFlags": [
                "doc_plan"
            ]
        },
        "initialScene": "doc_s2_shortage__q",
        "scenes": {
            "doc_s2_shortage__q": {
                "id": "doc_s2_shortage__q",
                "text": "你推开诊所的门时，老医生正对着空药箱发呆。\n「来了？」他没抬头，「药用完了。抗生素、退烧药、碘伏——都没了。」\n他指了指墙角的纸箱，「就剩这些。」\n箱子里躺着两卷绷带和一瓶过期三个月的止咳糖浆。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "提议一起去找药",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 8
                            },
                            {
                                "kind": "flag",
                                "flag": "doc_plan"
                            }
                        ],
                        "next": "__return__",
                        "result": "「你认真的？」他抬头看你，眼里闪过一点光，「……行。明天一早去废弃超市，我知道药房在哪。」\n他从抽屉里摸出一把生锈的钥匙，「这是药房仓库的钥匙。之前一直没敢去。」\n【获得「药房仓库钥匙」】"
                    },
                    {
                        "id": "c_1",
                        "text": "帮他整理库存",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 5
                            }
                        ],
                        "next": "__return__",
                        "result": "你帮他把有限的药品分类整理，标注保质期和用途。他看着你熟练的动作，点了点头。\n「你学过医？」你摇了摇头。他笑了，「那比我聪明。」\n【knowledge+10】"
                    },
                    {
                        "id": "c_2",
                        "text": "建议他去求别人帮忙",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 2
                            }
                        ],
                        "next": "__return__",
                        "result": "「求人不如求己。」他摆摆手，「我再想想办法。」\n他关上药箱，声音闷闷的。"
                    }
                ]
            }
        }
    },
    {
        "id": "doc_s3_expedition",
        "title": "老医生·出诊深雾",
        "desc": "",
        "trigger": {
            "dayMin": 8,
            "flags": [
                "doc_plan"
            ],
            "notFlags": [
                "doc_clinic"
            ]
        },
        "initialScene": "doc_s3_expedition__q",
        "scenes": {
            "doc_s3_expedition__q": {
                "id": "doc_s3_expedition__q",
                "text": "清晨，老医生背着空药箱站在你门前。\n「走吧，」他低声说，「超市药房在二楼，听说没被搜过。」\n雾气很浓。他递给你一根布条，「系在手腕上，别走散了。」",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "跟他一起去",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 10
                            },
                            {
                                "kind": "flag",
                                "flag": "doc_clinic"
                            }
                        ],
                        "next": "__return__",
                        "result": "你们穿过两片废墟，终于摸到了超市后门。\n药房的门锁着，但锁已经锈了。老医生撬了两下，锁就断了。\n「运气不错。」他推开门，「里面可能有老鼠，小心点。」\n他回头看了你一眼，「要是遇到危险，你先跑。我老了，跑不动。」\n【解锁链入场景：诊所之夜】"
                    },
                    {
                        "id": "c_1",
                        "text": "问他为什么愿意冒险",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 12
                            },
                            {
                                "kind": "flag",
                                "flag": "doc_plan_deep"
                            }
                        ],
                        "next": "__return__",
                        "result": "他沉默了一会儿。\n「我女儿今年二十二。」他说，「也在某个迷雾里。」\n「我救不了所有人。但能救一个是一个。」\n他推了推眼镜，「走吧。天亮了雾会更浓。」\n【好感+20】"
                    }
                ]
            }
        }
    },
    {
        "id": "doc_s4_clinic",
        "title": "老医生·诊所之夜",
        "desc": "",
        "trigger": {
            "flags": [
                "doc_clinic"
            ],
            "notFlags": [
                "doc_night_done"
            ]
        },
        "initialScene": "doc_s4_clinic__q",
        "scenes": {
            "doc_s4_clinic__q": {
                "id": "doc_s4_clinic__q",
                "text": "你们在药房里翻了两个小时。抗生素找到了三盒，退烧药两瓶，还有一些纱布。\n正要离开时，老医生突然停下脚步。\n「等等——」他侧耳听了听，「外面有声音。」\n雾里传来脚步声。不止一个人。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "躲起来观察",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -5
                            },
                            {
                                "kind": "flag",
                                "flag": "doc_night_done"
                            }
                        ],
                        "next": "__return__",
                        "result": "你们蹲在货架后面。三个穿着黑色冲锋衣的人走进药房，手电筒扫过货架。\n「就这些了？」其中一个人翻了翻，「搜干净了，走。」\n他们拿走了剩下的所有药品。\n等他们走远，老医生长出一口气。\n「还好我们先到了。」他拍了拍你的肩膀，「走，回诊所。」"
                    },
                    {
                        "id": "c_1",
                        "text": "假装路过",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "doc_night_done"
                            }
                        ],
                        "next": "__return__",
                        "result": "你站起来，举起双手。「我们也是来拿药的。」\n三个人对视一眼。领头的冷笑：「药房是公共的？」\n老医生挡在你前面：「我们先到的。」\n对方犹豫了一下，转身走了。「下次注意点。」\n老医生的手在发抖，但他没表现出来。\n【好感+10】"
                    }
                ]
            }
        }
    },
    {
        "id": "doc_s5_fever",
        "title": "老医生·发热病人",
        "desc": "",
        "trigger": {
            "dayMin": 11,
            "flags": [
                "doc_met"
            ],
            "notFlags": [
                "doc_fin"
            ]
        },
        "initialScene": "doc_s5_fever__q",
        "scenes": {
            "doc_s5_fever__q": {
                "id": "doc_s5_fever__q",
                "text": "诊所的门被撞开，一个女人抱着孩子冲进来。\n「医生！救救孩子！」\n老医生摸了摸孩子的额头，脸色变了。\n「高烧。」他转身翻药箱，「退烧药……只剩最后一瓶了。」\n他看了看孩子，又看了看你。\n「半瓶能退烧，但今晚可能反复。全瓶一次退干净，但药就没了。」",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "「全用吧，孩子要紧。」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 12
                            },
                            {
                                "kind": "item",
                                "item": "med_bandage",
                                "amount": -1
                            }
                        ],
                        "next": "__return__",
                        "requires": {
                            "items": {
                                "med_bandage": 1
                            }
                        },
                        "result": "老医生点点头，把整瓶退烧药灌进孩子嘴里。\n十分钟后，孩子的呼吸平稳了。女人跪下来磕头，被老医生扶起来。\n「别跪，」他说，「我们是医生。」\n他收拾药箱时，你看到他偷偷叹了口气。\n【好感+15】"
                    },
                    {
                        "id": "c_1",
                        "text": "「留半瓶备用。」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 5
                            },
                            {
                                "kind": "flag",
                                "flag": "doc_prudent"
                            }
                        ],
                        "next": "__return__",
                        "result": "老医生犹豫了一下，还是听了你的。半瓶灌下去，孩子退烧了，但速度慢一些。\n「今晚可能会反复。」他对女人说，「你守着，有任何情况来找我。」\n女人千恩万谢地走了。\n老医生坐下来，揉了揉太阳穴。\n「你说得对。我太冲动了。」"
                    },
                    {
                        "id": "c_2",
                        "text": "「还有别的办法吗？」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 15
                            }
                        ],
                        "next": "__return__",
                        "result": "你翻出那本《野外急救手册》，找到了物理降温的方法。\n你用溪水浸湿毛巾敷在孩子额头，老医生在旁边指导。\n半小时后，孩子退烧了。药没用。\n老医生看着你，眼里有光。\n「你比我强。」他说这话时，语气里没有嫉妒，只有欣慰。\n【knowledge+15 好感+20】"
                    }
                ]
            }
        }
    },
    {
        "id": "doc_s6_flag",
        "title": "老医生·白旗",
        "desc": "",
        "trigger": {
            "dayMin": 13,
            "flags": [
                "doc_met"
            ],
            "notFlags": [
                "doc_fin"
            ]
        },
        "initialScene": "doc_s6_flag__q",
        "scenes": {
            "doc_s6_flag__q": {
                "id": "doc_s6_flag__q",
                "text": "诊所门口挂起了一面白旗。\n老医生站在门口，看着来来往往的人。\n「从今天起，」他大声说，「这里免费看诊。有病的来，没病的也来坐坐。」\n他回头看了你一眼，笑了笑。\n「你教我的——能救一个是一个。」",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "留下帮忙",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 18
                            },
                            {
                                "kind": "flag",
                                "flag": "doc_fin"
                            },
                            {
                                "kind": "item",
                                "item": "med_first_aid",
                                "amount": 1
                            }
                        ],
                        "next": "__return__",
                        "result": "你帮老医生整理了最后的药品，给每一个来诊所的人量了体温。\n他从柜子里摸出一瓶藏了很久的酒，倒了两杯。\n「敬你。」他举杯，「敬所有活着的人。」\n杯底碰在一起，发出清脆的响声。\n【老医生路线完结 — 诊所重开为区域救援点】"
                    },
                    {
                        "id": "c_1",
                        "text": "默默离开",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 12
                            },
                            {
                                "kind": "flag",
                                "flag": "doc_fin"
                            }
                        ],
                        "next": "__return__",
                        "result": "你没有打扰他。有些人注定要在末日里点亮一盏灯。\n你回头看了一眼诊所的白旗。它在风中轻轻飘着。\n【老医生路线完结】"
                    }
                ]
            }
        }
    },
    {
        "id": "rat_s1_return",
        "title": "鼠王·回礼",
        "desc": "",
        "trigger": {
            "dayMin": 5,
            "flags": [
                "ratking_met"
            ],
            "notFlags": [
                "rat_deal"
            ]
        },
        "initialScene": "rat_s1_return__q",
        "scenes": {
            "rat_s1_return__q": {
                "id": "rat_s1_return__q",
                "text": "你循着上次的路线找到了那个下水道入口。\n铁栅栏后面，一双发亮的眼睛正盯着你。\n「又来了？」鼠王的声音在管道里回荡，「这次带了什么？」\n他从栅栏缝里伸出一只枯瘦的手。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "递给他两块饼干（-2food_biscuit）",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 8
                            },
                            {
                                "kind": "flag",
                                "flag": "rat_deal"
                            },
                            {
                                "kind": "item",
                                "item": "food_biscuit",
                                "amount": -2
                            },
                            {
                                "kind": "item",
                                "item": "key_map_fragment",
                                "amount": 1
                            }
                        ],
                        "next": "__return__",
                        "requires": {
                            "items": {
                                "food_biscuit": 2
                            }
                        },
                        "result": "他一把抓过饼干，塞进嘴里嚼了两口，眼睛突然亮了。\n「好东西。」他吞下去，「作为交换——」\n他从身后拖出一个布包，里面是一张皱巴巴的纸。\n「北边那片雾里有条暗河。顺着走能到沉船湾。很多人不知道。」\n【获得「暗河路线图」解锁沉船湾】"
                    },
                    {
                        "id": "c_1",
                        "text": "问他为什么住在下水道",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 10
                            },
                            {
                                "kind": "flag",
                                "flag": "rat_story"
                            }
                        ],
                        "next": "__return__",
                        "result": "他沉默了很久。\n「上面太亮了。」他说，「我习惯了黑。」\n他从怀里掏出一只小铁盒，里面装着几颗发霉的糖。\n「她给我的。」他说了一个名字，你没听清。\n「后来她走了。我就下来了。」\n【好感+12】"
                    },
                    {
                        "id": "c_2",
                        "text": "给他一块石头（什么都没有）",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 5
                            }
                        ],
                        "next": "__return__",
                        "result": "他接过石头看了看，又看了看你。\n「……有意思。」他把石头揣进兜里，「你很有趣。下次带点吃的来。」\n他没有生气。"
                    }
                ]
            }
        }
    },
    {
        "id": "rat_s2_price",
        "title": "鼠王·情报价目",
        "desc": "",
        "trigger": {
            "dayMin": 7,
            "flags": [
                "ratking_met"
            ],
            "notFlags": [
                "rat_invite"
            ]
        },
        "initialScene": "rat_s2_price__q",
        "scenes": {
            "rat_s2_price__q": {
                "id": "rat_s2_price__q",
                "text": "鼠王今天看起来心情不错。\n他蹲在铁栅栏后面，面前摆着一张纸，上面用铅笔歪歪扭扭地写着：\n\n「情报价目表」\n① 兽潮路线——3食物\n② 诊所仓库位置——1金属件\n③ 其他幸存者位置——2食物\n④ 特殊情报（面议）——看你给什么",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "买兽潮路线情报（-3food_berry）",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 5
                            },
                            {
                                "kind": "flag",
                                "flag": "rat_intel_beast"
                            },
                            {
                                "kind": "item",
                                "item": "food_berry",
                                "amount": -3
                            }
                        ],
                        "next": "__return__",
                        "requires": {
                            "items": {
                                "food_berry": 3
                            }
                        },
                        "result": "他接过浆果，指了指西边。\n「兽潮从西边来，沿河跑。你在河东边建东西挡，或者干脆在河西边蹲着——它们不回头。」\n他舔了舔手指，「别告诉别人。」\n【兽潮情报·有用】"
                    },
                    {
                        "id": "c_1",
                        "text": "买诊所仓库位置（-1mat_scrap_metal）",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 5
                            },
                            {
                                "kind": "flag",
                                "flag": "rat_intel_clinic"
                            },
                            {
                                "kind": "flag",
                                "flag": "doc_plan"
                            },
                            {
                                "kind": "item",
                                "item": "mat_scrap_metal",
                                "amount": -1
                            }
                        ],
                        "next": "__return__",
                        "requires": {
                            "items": {
                                "mat_scrap_metal": 1
                            }
                        },
                        "result": "他接过金属件，在纸上画了个圈。\n「超市二楼，左转第三个门。没被搜过。」\n他顿了顿，「老医生可能知道。但他不敢去。」\n【获得「仓库位置标记」】"
                    },
                    {
                        "id": "c_2",
                        "text": "买其他幸存者位置（-2food_berry）",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 3
                            },
                            {
                                "kind": "flag",
                                "flag": "rat_intel_neighbors"
                            },
                            {
                                "kind": "item",
                                "item": "food_berry",
                                "amount": -2
                            }
                        ],
                        "next": "__return__",
                        "requires": {
                            "items": {
                                "food_berry": 2
                            }
                        },
                        "result": "他掰着手指头数：\n「东边铁蛋杂货铺——有钱人。三楼老猫——怪人。南墙根老周——一家四口。北边有个直播的——小姑娘。」\n他眨眨眼，「还有你。你住在——」他指了指你的方向，「对吧？」\n你知道的，他什么都知道。"
                    },
                    {
                        "id": "c_3",
                        "text": "问特殊情报",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 3
                            }
                        ],
                        "next": "__return__",
                        "result": "他凑近栅栏，压低声音：\n「沉船湾下面有个密室。很多人不知道。里面的东西——」\n他伸出五根手指，「值五条命。」\n「但你得先拿到地图碎片。」他看了看你，「你有吗？」"
                    }
                ]
            }
        }
    },
    {
        "id": "rat_s3_invite",
        "title": "鼠王·地下请柬",
        "desc": "",
        "trigger": {
            "dayMin": 9,
            "flags": [
                "rat_deal"
            ],
            "notFlags": [
                "rat_kingdom"
            ]
        },
        "initialScene": "rat_s3_invite__q",
        "scenes": {
            "rat_s3_invite__q": {
                "id": "rat_s3_invite__q",
                "text": "你再次来到下水道入口时，发现铁栅栏被打开了。\n地上放着一张用锡纸做的「请柬」，上面歪歪扭扭地写着：\n\n「诚邀阁下参观鼠王国。入口：铁栅栏后左转50米。注意脚下。」\n下面画了一只戴皇冠的老鼠。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "走进去看看",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 8
                            },
                            {
                                "kind": "flag",
                                "flag": "rat_kingdom"
                            }
                        ],
                        "next": "__return__",
                        "result": "你弯着腰走进下水道。管道比你想象的宽敞。\n走了五十米，你看到了——\n一盏油灯照亮了一个圆形的空间。地上铺着捡来的纸板，墙上挂着几张照片（看不清内容）。\n鼠王坐在一块石头上，面前摆着三只死老鼠。\n「欢迎来到鼠王国。」他站起来，「它们是我的臣民。」\n他指了指那三只死老鼠，「它们死了。我埋了它们。」\n他看着你，「你想看看我的王国吗？」\n【解锁链入场景：下水道王座】"
                    },
                    {
                        "id": "c_1",
                        "text": "太脏了，不进去",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -2
                            }
                        ],
                        "next": "__return__",
                        "result": "你站在入口犹豫了一会儿，转身离开了。\n身后传来鼠王的声音：「胆小鬼。」\n但语气里没有嘲讽，只有失望。"
                    }
                ]
            }
        }
    },
    {
        "id": "rat_s4_throne",
        "title": "鼠王·下水道王座",
        "desc": "",
        "trigger": {
            "flags": [
                "rat_kingdom"
            ],
            "notFlags": [
                "rat_throne_done"
            ]
        },
        "initialScene": "rat_s4_throne__q",
        "scenes": {
            "rat_s4_throne__q": {
                "id": "rat_s4_throne__q",
                "text": "鼠王带你参观了整个「王国」。\n\n一只瘸腿的老鼠在角落里啃木头——「它是宰相。」\n一堆发霉的面包——「这是国库。」\n墙上用粉笔画的地图——「这是疆域。」\n\n他站在最中间，伸开双臂。\n「这就是我的王国。」他回头看你，「很小，但都是我的。」\n他的眼睛在油灯下亮晶晶的。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "「很了不起。」",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 12
                            },
                            {
                                "kind": "flag",
                                "flag": "rat_throne_done"
                            }
                        ],
                        "next": "__return__",
                        "result": "他愣了一下。然后咧嘴笑了，露出几颗黄牙。\n「你是第一个这么说的人。」\n他从「国库」里拿出一块面包递给你。\n「吃。国王请客。」\n面包已经发霉了，但你还是吃了。\n因为它很甜。"
                    },
                    {
                        "id": "c_1",
                        "text": "问他为什么要把王国给你看",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 15
                            },
                            {
                                "kind": "flag",
                                "flag": "rat_throne_done"
                            }
                        ],
                        "next": "__return__",
                        "result": "他沉默了一会儿。\n「因为你是第一个给我饼干的人。」他说，「也是第一个没有笑我的人。」\n他坐回石头上，「我以前在上面有个家。后来没了。」\n「现在我有王国了。虽然只有三只死老鼠和一堆发霉面包。」\n他看着你，「你会告诉别人吗？」\n你摇了摇头。\n他笑了。\n【好感+20】"
                    }
                ]
            }
        }
    },
    {
        "id": "rat_s5_queen",
        "title": "鼠王·鼠后之乱",
        "desc": "",
        "trigger": {
            "dayMin": 11,
            "flags": [
                "rat_kingdom"
            ],
            "notFlags": [
                "rat_fin"
            ]
        },
        "initialScene": "rat_s5_queen__q",
        "scenes": {
            "rat_s5_queen__q": {
                "id": "rat_s5_queen__q",
                "text": "你来找鼠王时，发现他蹲在角落里发抖。\n「她来了。」他声音发颤。\n「谁？」\n「鼠后。」他指了指管道深处，「她要抢我的王国。」\n远处传来窸窸窣窣的声音，像无数只爪子在水泥上爬。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "帮他守住王国",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -5
                            },
                            {
                                "kind": "flag",
                                "flag": "rat_queen_defeated"
                            }
                        ],
                        "next": "__return__",
                        "result": "你和鼠王一起守在管道口。\n一群黑色的老鼠涌过来，领头的那只比猫还大。\n你用棍子挡在前面，鼠王在后面扔石头。\n打了一个小时，鼠群退了。\n鼠王瘫坐在地上，大口喘气。\n「谢谢你。」他说，「你是我的骑士。」\n他的王国保住了。"
                    },
                    {
                        "id": "c_1",
                        "text": "建议他谈判",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 12
                            },
                            {
                                "kind": "flag",
                                "flag": "rat_peace"
                            }
                        ],
                        "next": "__return__",
                        "result": "你让鼠王对着管道喊话：「我们可以共享领地！」\n对面安静了一会儿。\n然后一只老鼠叼着一块布走出来，放在鼠王面前。\n「她同意了。」鼠王难以置信，「她居然同意了。」\n布上绣着一朵花。是鼠后的嫁妆。\n「以后她管西边，我管东边。」鼠王把布叠好揣进兜里，「和平了。」\n【social+15 好感+15】"
                    },
                    {
                        "id": "c_2",
                        "text": "不想管，离开",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -8
                            },
                            {
                                "kind": "flag",
                                "flag": "rat_abandoned"
                            }
                        ],
                        "next": "__return__",
                        "result": "你转身走了。身后传来鼠王的喊声：「别走！！」\n你没有回头。\n第二天你来找他时，他蜷在角落里，身上多了几道抓痕。\n「没事。」他说，「它们走了。」\n但他的眼神变了。"
                    }
                ]
            }
        }
    },
    {
        "id": "rat_s6_farewell",
        "title": "鼠王·别礼",
        "desc": "",
        "trigger": {
            "dayMin": 13,
            "flags": [
                "rat_kingdom"
            ],
            "notFlags": [
                "rat_fin"
            ]
        },
        "initialScene": "rat_s6_farewell__q",
        "scenes": {
            "rat_s6_farewell__q": {
                "id": "rat_s6_farewell__q",
                "text": "鼠王今天没有蹲在铁栅栏后面。\n他站在入口处，背对着你。\n「你要走了？」你问。\n他转过身，手里攥着一块发光的石头。\n「王国要搬家了。」他说，「雾越来越浓，下面不安全了。」\n他把石头递给你。\n「拿着。这是沉船湾的密室钥匙。」",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "收下钥匙",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 10
                            },
                            {
                                "kind": "flag",
                                "flag": "rat_fin"
                            },
                            {
                                "kind": "item",
                                "item": "key_map_fragment",
                                "amount": 1
                            }
                        ],
                        "next": "__return__",
                        "result": "你接过石头。它在掌心微微发热。\n「沉船湾下面有个密室。」他说，「里面的东西够你活很久。」\n他从兜里掏出那块绣花布，看了看，又揣回去。\n「替我跟铁蛋说一声，他欠我三块饼干。」\n他转身走进雾里。\n「别想我！」他头也不回地喊。\n你没有回答。\n【鼠王路线完结 — 解锁沉船湾密室】"
                    },
                    {
                        "id": "c_1",
                        "text": "给他一些食物作饯别礼（-2food_canned）",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 18
                            },
                            {
                                "kind": "flag",
                                "flag": "rat_fin"
                            },
                            {
                                "kind": "item",
                                "item": "food_canned",
                                "amount": -2
                            },
                            {
                                "kind": "item",
                                "item": "key_map_fragment",
                                "amount": 1
                            }
                        ],
                        "next": "__return__",
                        "requires": {
                            "items": {
                                "food_canned": 2
                            }
                        },
                        "result": "他接过罐头，愣了一下。\n「你人不错。」他说，「比我认识的大多数人都好。」\n他把石头塞进你手里，又从兜里掏出那块绣花布。\n「这个也给你。」他说，「万一你遇到她——鼠后——替我说声谢谢。」\n他笑了。然后转身走进雾里。\n你看着他的背影消失在迷雾中。\n【鼠王路线完结 — 解锁沉船湾密室 + 绣花布（特殊物品）】"
                    },
                    {
                        "id": "c_2",
                        "text": "不给，直接拿钥匙",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 5
                            },
                            {
                                "kind": "flag",
                                "flag": "rat_fin"
                            },
                            {
                                "kind": "item",
                                "item": "key_map_fragment",
                                "amount": 1
                            }
                        ],
                        "next": "__return__",
                        "result": "他看了看你，又看了看手里的石头。\n「算了。」他把石头递给你，「拿去吧。反正我也用不上了。」\n他转身走了。没有回头。\n你手里攥着石头，站在原地。\n【鼠王路线完结】"
                    }
                ]
            }
        }
    },
    {
        "id": "rescue_s1_wreck",
        "title": "救援 · 一",
        "desc": "",
        "trigger": {
            "dayMin": 4,
            "notFlags": [
                "rescue_met",
                "rescue_lost"
            ]
        },
        "initialScene": "rescue_s1_wreck__gate",
        "scenes": {
            "rescue_s1_wreck__gate": {
                "id": "rescue_s1_wreck__gate",
                "text": "第四天夜里，无线电的杂音第一次有了人声的形状。\n你循声推开门，雾里伏着一个穿橙色救援服的人，头盔滚在一边，胸口还有起伏，但血已经从护具缝里渗出来，在泥地上洇成暗色。他腰间挂着一个摔裂的方形盒子——电台。\n风把远处的雾吹薄了一瞬，你看见他攥着半截天线的手，指节发白。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "把他拖进屋",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -2
                            },
                            {
                                "kind": "flag",
                                "flag": "rescue_met"
                            }
                        ],
                        "next": "__return__",
                        "result": "你架起他往屋里拖，血蹭了一路。把他搁在火堆边时，他睫毛动了动，没醒。\n你守了一夜。天快亮时他喉咙里发出含糊的音节，像在喊谁的名字。\n【好感度提升：救援队 +10】"
                    },
                    {
                        "id": "c_1",
                        "text": "先给他草药止血",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "rescue_met"
                            },
                            {
                                "kind": "item",
                                "item": "med_herbal",
                                "amount": -1
                            }
                        ],
                        "next": "__return__",
                        "requires": {
                            "items": {
                                "med_herbal": 1
                            }
                        },
                        "result": "你撕开他护具，把草药按在伤口上。血慢慢止住，他的呼吸平了些。\n他迷迷糊糊睁开眼，看见你，费力地抬了抬手，又垂下去。\n【好感度提升：救援队 +15】"
                    },
                    {
                        "id": "c_2",
                        "text": "搜他的背包",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "rescue_met"
                            },
                            {
                                "kind": "flag",
                                "flag": "rescue_looted"
                            },
                            {
                                "kind": "item",
                                "item": "key_radio_parts",
                                "amount": 1
                            },
                            {
                                "kind": "item",
                                "item": "food_canned",
                                "amount": 1
                            }
                        ],
                        "next": "__return__",
                        "result": "你翻开他的包——半块压缩饼干，一份防水地图，还有那个摔裂电台里掉出来的零件。\n你把它们收进自己兜里。他好像动了动，但你不敢确定。\n【道德 -5，好感度下降：救援队 -20】"
                    },
                    {
                        "id": "c_3",
                        "text": "关上门，装没看见",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -5
                            },
                            {
                                "kind": "flag",
                                "flag": "rescue_lost"
                            }
                        ],
                        "next": "__return__",
                        "result": "你退回去，把门闩上。雾里那点人声形状的杂音，被你用被子捂了一夜。\n第二天清晨，门口只剩一滩暗色的痕迹，和半截折断的天线。\n【好感度下降：救援队 -30】"
                    }
                ]
            }
        }
    },
    {
        "id": "rescue_s2_awake",
        "title": "救援 · 二",
        "desc": "",
        "trigger": {
            "dayMin": 6,
            "flags": [
                "rescue_met"
            ],
            "notFlags": [
                "rescue_lost"
            ]
        },
        "initialScene": "rescue_s2_awake__talk",
        "scenes": {
            "rescue_s2_awake__talk": {
                "id": "rescue_s2_awake__talk",
                "text": "他醒了。是个年轻通讯兵，脸上有煤灰和冻伤，自我介绍时先咳了两声。\n「我是东三区救援点的。」他指了指腰间那个摔裂的盒子，「电台在来的路上被兽群撞了。要是它还在，外面的人就知道这片雾里还有活人。」\n他看你眼神里没有太多防备，反而有点局促，像是太久没跟活人说话。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "分他一个罐头",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "rescue_talked"
                            },
                            {
                                "kind": "flag",
                                "flag": "word_rescue_point"
                            },
                            {
                                "kind": "item",
                                "item": "food_canned",
                                "amount": -1
                            }
                        ],
                        "next": "__return__",
                        "requires": {
                            "items": {
                                "food_canned": 1
                            }
                        },
                        "result": "他接过去，没客气，三两口吃完，把空罐捏扁塞回你手里：「留着，这铁皮能换东西。」\n「东三区救援点。」他又说了一遍，「记住这个坐标。」\n【好感度提升：救援队 +10】"
                    },
                    {
                        "id": "c_1",
                        "text": "让他把外面的情况讲完",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 3
                            },
                            {
                                "kind": "flag",
                                "flag": "rescue_talked"
                            },
                            {
                                "kind": "flag",
                                "flag": "word_rescue_point"
                            }
                        ],
                        "next": "__return__",
                        "result": "他说雾起的那天，所有频段同时哑了，只有救援点还在循环播报。后来连他们也快要撑不住。\n「但直升机还在飞。」他最后说，「只要有人回应，他们就还会来。」\n你心里那点熄灭的希望，又被他拨亮了一格。\n【好感度提升：救援队 +5，精神 +3】"
                    },
                    {
                        "id": "c_2",
                        "text": "问他雾是怎么来的",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -2
                            },
                            {
                                "kind": "flag",
                                "flag": "rescue_talked"
                            }
                        ],
                        "next": "__return__",
                        "result": "他摇头：「我们也不清楚。只知道雾来之前，天上掉过一阵蓝色的雨。」\n他没再多说，只是看着窗外的白，眼神很远。\n【好感度提升：救援队 +3】"
                    }
                ]
            }
        }
    },
    {
        "id": "rescue_s3_radio",
        "title": "救援 · 三",
        "desc": "",
        "trigger": {
            "dayMin": 8,
            "flags": [
                "rescue_talked"
            ]
        },
        "initialScene": "rescue_s3_radio__fix",
        "scenes": {
            "rescue_s3_radio__fix": {
                "id": "rescue_s3_radio__fix",
                "text": "他撑着墙站起来，指着那个摔裂的电台：「核心板没坏，就差一个耦合零件。你这儿要是有类似的金属件……」\n他从兜里掏出那块从摔裂盒子里掉出来的零件——和你之前见过的某种制式一模一样。\n「这东西，能拼回去。」他把零件放在掌心，递向你。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "把电台零件给他拼上",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "rescue_radio_help"
                            },
                            {
                                "kind": "item",
                                "item": "key_radio_parts",
                                "amount": -1
                            }
                        ],
                        "next": "__return__",
                        "requires": {
                            "items": {
                                "key_radio_parts": 1
                            }
                        },
                        "result": "你们蹲在火堆边，就着一点光，把耦合零件卡回槽位。指示灯闪了两下，亮了。\n他长出一口气，拍了拍电台：「成了。这下外面能听见我们了。」\n【好感度提升：救援队 +15，手艺经验 +8】"
                    },
                    {
                        "id": "c_1",
                        "text": "陪他去废墟里翻零件",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "rescue_radio_help"
                            },
                            {
                                "kind": "item",
                                "item": "key_radio_parts",
                                "amount": 1
                            }
                        ],
                        "next": "__return__",
                        "result": "你们摸黑翻了近处的倒塌房屋，在一具冻僵的通讯车残骸里，找到了完好的耦合件。\n回来时他手都在抖，但眼睛亮得不行。\n【好感度提升：救援队 +10】"
                    },
                    {
                        "id": "c_2",
                        "text": "「这东西修不好，别费劲了」",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "rescue_no_radio"
                            }
                        ],
                        "next": "__return__",
                        "result": "他沉默了很久，把零件收回兜里。\n「也是。」他说，「能活到现在，已经算运气了。」\n但你看得出，他眼底那点火，暗了一截。\n【好感度下降：救援队 -5】"
                    }
                ]
            }
        }
    },
    {
        "id": "rescue_s4_coord",
        "title": "救援 · 四",
        "desc": "",
        "trigger": {
            "dayMin": 10,
            "flags": [
                "rescue_radio_help"
            ]
        },
        "initialScene": "rescue_s4_coord__coord",
        "scenes": {
            "rescue_s4_coord__coord": {
                "id": "rescue_s4_coord__coord",
                "text": "电台吱吱呀呀吐出断续的人声：「……东三区……坐标确认……有回应请……」\n他猛地抓住你的胳膊：「是救援点！他们收到残信号了。现在只要你敢报坐标，他们就能定位这片雾，派直升机来。」\n他顿了顿，又压低声音：「但信号一出去，雾里别的东西也会听见你。」",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "报坐标，让救援队来找你",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "rescue_coord"
                            },
                            {
                                "kind": "flag",
                                "flag": "rescue_signaled"
                            }
                        ],
                        "next": "__return__",
                        "result": "你对着话筒报出木屋的位置。那一头静了两秒，爆出一句「收到」，然后是一串你听不懂的调度代码。\n他松开手，笑了。雾好像也退了半步。\n【道德 +5，雾压 +3（你暴露了位置）】"
                    },
                    {
                        "id": "c_1",
                        "text": "只听情报，不报坐标",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 2
                            },
                            {
                                "kind": "flag",
                                "flag": "rescue_coord"
                            }
                        ],
                        "next": "__return__",
                        "result": "你摇头。他没勉强，只是把坐标又念了一遍，让你记牢。\n「也好。」他说，「活着比被找到重要。」\n【好感度提升：救援队 +2，精神 +2】"
                    },
                    {
                        "id": "c_2",
                        "text": "「别信任何坐标，包括这个」",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "rescue_coord"
                            },
                            {
                                "kind": "flag",
                                "flag": "rescue_cautious"
                            }
                        ],
                        "next": "__return__",
                        "result": "他愣了一下，随即苦笑：「你比我谨慎。」\n他把电台关小了音量，但没关掉。你们谁都没再提坐标的事。\n【好感度提升：救援队 +3】"
                    }
                ]
            }
        }
    },
    {
        "id": "rescue_s5_split",
        "title": "救援 · 五",
        "desc": "",
        "trigger": {
            "dayMin": 11,
            "flags": [
                "rescue_coord"
            ]
        },
        "initialScene": "rescue_s5_split__split",
        "scenes": {
            "rescue_s5_split__split": {
                "id": "rescue_s5_split__split",
                "text": "电台另一端，另一个声音插了进来——是个急躁的男的，主张立刻调直升机把你接走。\n通讯兵把话筒捂住，看向你：「他性子急。但带一个人走，就意味着少带一个伤员。你说呢？」\n火光映在他脸上，你第一次看清他眼睛里有犹豫，也有期待。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "「跟他走，别耽误」",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "rescue_chosen"
                            },
                            {
                                "kind": "flag",
                                "flag": "rescue_will_leave"
                            }
                        ],
                        "next": "__return__",
                        "result": "他点头，对着话筒说了句「接人」，那边应了。\n他回头看你，眼神里有点释然：「总算有个人能出去了。」\n【好感度提升：救援队 +10】"
                    },
                    {
                        "id": "c_1",
                        "text": "「我留下，让伤员先走」",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "rescue_chosen"
                            },
                            {
                                "kind": "flag",
                                "flag": "rescue_stay"
                            }
                        ],
                        "next": "__return__",
                        "result": "他怔住，随即重重拍了下你肩膀：「你这人……」\n他对着话筒改了口。那一头骂了句什么，但也认了。\n【道德 +3，好感度提升：救援队 +5】"
                    },
                    {
                        "id": "c_2",
                        "text": "沉默，让他说了算",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "rescue_chosen"
                            }
                        ],
                        "next": "__return__",
                        "result": "你没吭声。他盯着你看了几秒，自己拿了个折中的主意。\n「行吧。」他嘟囔，「两边都不得罪。」\n【好感度下降：救援队 -2】"
                    }
                ]
            }
        }
    },
    {
        "id": "rescue_s6_tide",
        "title": "救援 · 六",
        "desc": "",
        "trigger": {
            "dayMin": 13,
            "flags": [
                "rescue_chosen"
            ]
        },
        "initialScene": "rescue_s6_tide__tide",
        "scenes": {
            "rescue_s6_tide__tide": {
                "id": "rescue_s6_tide__tide",
                "text": "第十三天的夜，雾里传来密集的蹄声——兽潮。\n通讯兵一把抄起撬棍站到你身侧：「白天你救过我，今晚我替你扛一阵。」\n木屋在撞击下吱呀作响，火堆的光被扑得忽明忽暗。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "把火把塞给他",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 5
                            },
                            {
                                "kind": "flag",
                                "flag": "rescue_ally"
                            },
                            {
                                "kind": "item",
                                "item": "mat_wood",
                                "amount": -1
                            }
                        ],
                        "next": "__return__",
                        "requires": {
                            "items": {
                                "mat_wood": 1
                            }
                        },
                        "result": "你点燃一根木柴递过去。他挥舞着火把，把扑门的影子逼退了半步又半步。\n天亮时，门口堆了三层黑影，他还站着。\n【好感度提升：救援队 +15，精神 +5】"
                    },
                    {
                        "id": "c_1",
                        "text": "并肩作战",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "rescue_ally"
                            }
                        ],
                        "next": "__return__",
                        "result": "你们背靠背，把每一次扑上来的黑影都捅回去。他的撬棍和你手里的家伙，节奏居然合上了。\n兽潮退时，你肋下挨了一下，但他把你护在了墙角。\n【好感度提升：救援队 +20，体力 -5】"
                    },
                    {
                        "id": "c_2",
                        "text": "拉他躲进地窖",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -3
                            },
                            {
                                "kind": "flag",
                                "flag": "rescue_ally"
                            }
                        ],
                        "next": "__return__",
                        "result": "你拽着他滚进地窖。撞击声在头顶炸了整整一夜。\n天亮时上面安静了。他拍了拍你：「谢了。换我，未必拉得动你。」\n【好感度提升：救援队 +10，精神 -3】"
                    }
                ]
            }
        }
    },
    {
        "id": "rescue_s7_eve",
        "title": "救援 · 七",
        "desc": "",
        "trigger": {
            "dayMin": 15,
            "flags": [
                "rescue_ally"
            ]
        },
        "initialScene": "rescue_s7_eve__eve",
        "scenes": {
            "rescue_s7_eve__eve": {
                "id": "rescue_s7_eve__eve",
                "text": "直升机的事定了。撤离前夜，他把自己那点家当摊在桌上，挑挑拣拣，最后推过来一份。\n「拿着。」他说，「我走得轻，你还得在这儿撑几天。」\n桌上的罐头和水，在火光里泛着温吞的光。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "收下",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "rescue_eve"
                            },
                            {
                                "kind": "item",
                                "item": "food_canned",
                                "amount": 2
                            },
                            {
                                "kind": "item",
                                "item": "water_clean",
                                "amount": 2
                            }
                        ],
                        "next": "__return__",
                        "result": "你没推辞。他咧嘴一笑，把剩下的也往你这边挪了挪。\n「别客气，命要紧。」\n【获得：罐头×2，净水×2】"
                    },
                    {
                        "id": "c_1",
                        "text": "回赠他食物",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 3
                            },
                            {
                                "kind": "flag",
                                "flag": "rescue_eve"
                            },
                            {
                                "kind": "item",
                                "item": "food_canned",
                                "amount": -2
                            }
                        ],
                        "next": "__return__",
                        "requires": {
                            "items": {
                                "food_canned": 2
                            }
                        },
                        "result": "你反倒塞给他两个罐头：「你路上用得上。」\n他推了两下，还是收了，眼眶有点红：「我这辈子，欠人情记得特别清。」\n【好感度提升：救援队 +15，精神 +3】"
                    },
                    {
                        "id": "c_2",
                        "text": "问他为什么帮到底",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -2
                            },
                            {
                                "kind": "flag",
                                "flag": "rescue_eve"
                            },
                            {
                                "kind": "flag",
                                "flag": "rescue_backstory"
                            }
                        ],
                        "next": "__return__",
                        "result": "他沉默了一会儿：「我家人也在雾里失了联。帮着你，就像帮着当初的他们。」\n他没再往下说。火光里，你看见他手指在抖。\n【好感度提升：救援队 +12，精神 -2】"
                    }
                ]
            }
        }
    },
    {
        "id": "rescue_s8_leave",
        "title": "救援 · 八",
        "desc": "",
        "trigger": {
            "dayMin": 16,
            "flags": [
                "rescue_ally"
            ]
        },
        "initialScene": "rescue_s8_leave__leave",
        "scenes": {
            "rescue_s8_leave__leave": {
                "id": "rescue_s8_leave__leave",
                "text": "第十六天清晨，雾薄得能看见天。远处传来确凿的、越来越近的轰鸣——直升机。\n开阔地上，一个橙色光点正在降落。他背好那个修好的电台，回头看你。\n「该走了。」他说。风把他的衣角吹得猎猎作响。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "目送他登机",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 8
                            },
                            {
                                "kind": "flag",
                                "flag": "rescue_saved"
                            }
                        ],
                        "next": "__return__",
                        "result": "他踏上舷梯，在舱门边回头，冲你比了个手势——是你教朵朵的那种暗号。\n螺旋桨的风卷起满地落叶。飞机拔高，消失在灰白里。\n你站着，直到声浪彻底远去。\n【救援线完结 — 好感度提升：救援队 +20，精神 +8，道德 +5】"
                    },
                    {
                        "id": "c_1",
                        "text": "跟他一起走",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 10
                            },
                            {
                                "kind": "flag",
                                "flag": "rescue_saved"
                            },
                            {
                                "kind": "flag",
                                "flag": "rescue_left"
                            }
                        ],
                        "next": "__return__",
                        "result": "你跟着他冲上开阔地。他回头看见你，眼睛一下子亮了：「还以为你不肯走！」\n舱门合拢前，他把电台塞进你怀里：「这个，归你了。」\n引擎盖过了所有声音。雾，在脚下退成一片白海。\n【救援线完结 — 好感度提升：救援队 +25，精神 +10】"
                    },
                    {
                        "id": "c_2",
                        "text": "只是挥手，不说话",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 3
                            },
                            {
                                "kind": "flag",
                                "flag": "rescue_saved"
                            }
                        ],
                        "next": "__return__",
                        "result": "你站在篱笆边，抬了抬手。他也抬手，没说什么。\n飞机起飞时，你忽然想起他说的那句「活着比被找到重要」。\n也许他是对的。\n【救援线完结 — 好感度提升：救援队 +5，精神 +3】"
                    }
                ]
            }
        }
    },
    {
        "id": "crystal_s1_vein",
        "title": "结晶 · 一",
        "desc": "",
        "trigger": {
            "dayMin": 5,
            "notFlags": [
                "crystal_met"
            ]
        },
        "initialScene": "crystal_s1_vein__vein",
        "scenes": {
            "crystal_s1_vein__vein": {
                "id": "crystal_s1_vein__vein",
                "text": "第五天，你在雾最淡的缝隙里看见一道微光——岩壁上嵌着几块半透明的结晶体，蓝光一跳一跳，像有心跳。\n凑近了，你听见极轻的、不属于风的声音，从晶体内部传来。\n雾贴着晶体边缘，竟悄悄退开了一圈。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "采下一块",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -2
                            },
                            {
                                "kind": "flag",
                                "flag": "crystal_met"
                            },
                            {
                                "kind": "item",
                                "item": "key_mist_crystal",
                                "amount": 1
                            }
                        ],
                        "next": "__return__",
                        "result": "你用小刀撬下一块。晶体入手冰凉，蓝光顺着手腕往上爬了一寸，又缩回去。\n口袋里多了一块沉甸甸的、会呼吸的石头。\n【获得：迷雾结晶×1，雾压 +2】"
                    },
                    {
                        "id": "c_1",
                        "text": "先观察它的规律",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "crystal_met"
                            },
                            {
                                "kind": "flag",
                                "flag": "crystal_observed"
                            },
                            {
                                "kind": "item",
                                "item": "key_mist_crystal",
                                "amount": 1
                            }
                        ],
                        "next": "__return__",
                        "result": "你蹲了半晌，看出门道：蓝光随雾的浓淡呼吸，雾越浓它越亮。\n「它在吃雾。」你对自己说。这发现让你后背发凉，也让你多了一分底气。\n【获得：迷雾结晶×1，知识经验 +6】"
                    },
                    {
                        "id": "c_2",
                        "text": "不碰，绕开",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 1
                            },
                            {
                                "kind": "flag",
                                "flag": "crystal_met"
                            }
                        ],
                        "next": "__return__",
                        "result": "你怕那蓝光。绕开时，晶体里的声音似乎叹了口气。\n但你记下了它的位置——也许以后用得上。\n【精神 +1】"
                    }
                ]
            }
        }
    },
    {
        "id": "crystal_s2_laok",
        "title": "结晶 · 二",
        "desc": "",
        "trigger": {
            "dayMin": 7,
            "flags": [
                "crystal_met"
            ]
        },
        "initialScene": "crystal_s2_laok__laok",
        "scenes": {
            "crystal_s2_laok__laok": {
                "id": "crystal_s2_laok__laok",
                "text": "你把晶体亮给老K看。他脸色一下变了，伸手又缩回，像怕烫。\n「这玩意儿……」他压低声音，「战前我听人说过。说是某种气候装置的种子，失控了，才变成这满天的雾。」\n他盯着蓝光，眼神复杂，像在看一个老相识。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "听他把传闻讲完",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 2
                            },
                            {
                                "kind": "flag",
                                "flag": "crystal_hint"
                            }
                        ],
                        "next": "__return__",
                        "result": "他说那装置本是用来治理沙尘的，某天核心过载，吐出的不是清水而是雾，越积越厚，把整片陆地捂进了冬天。\n「结晶，就是它的种子。」他最后说。\n【好感度提升：老K +8，精神 +2】"
                    },
                    {
                        "id": "c_1",
                        "text": "「你怎么知道这些？」",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "crystal_hint"
                            },
                            {
                                "kind": "flag",
                                "flag": "laok_knows"
                            }
                        ],
                        "next": "__return__",
                        "result": "他沉默良久：「我以前……在那项目里打过工。打扫卫生的那种。」\n他苦笑，「所以雾起来的那天，我跑得比谁都快。」\n【好感度提升：老K +5，道德 +2，线索：老K知情】"
                    },
                    {
                        "id": "c_2",
                        "text": "「我不信」",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "crystal_hint"
                            }
                        ],
                        "next": "__return__",
                        "result": "老K耸肩：「不信也好。信了，晚上睡不着。」\n但他看晶体的眼神，分明是信的。\n【好感度下降：老K -3，线索：雾的传闻】"
                    }
                ]
            }
        }
    },
    {
        "id": "crystal_s3_resonate",
        "title": "结晶 · 三",
        "desc": "",
        "trigger": {
            "dayMin": 9,
            "flags": [
                "crystal_hint"
            ]
        },
        "initialScene": "crystal_s3_resonate__res",
        "scenes": {
            "crystal_s3_resonate__res": {
                "id": "crystal_s3_resonate__res",
                "text": "第九天夜里，三块晶体——你的一块，加上远处若有若无的呼应——在你掌心同时亮起。\n雾像被无形的手推开，木屋周围清出一圈空白。你能听见自己的心跳，格外清楚。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "握紧晶体",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 5
                            },
                            {
                                "kind": "flag",
                                "flag": "crystal_resonate"
                            }
                        ],
                        "next": "__return__",
                        "result": "蓝光从指缝溢出，把你的影子映在雾墙上，轮廓分明。\n那圈空白维持了很久，久到你几乎忘了雾的存在。\n【精神 +5，雾压 -3】"
                    },
                    {
                        "id": "c_1",
                        "text": "放在窗台当灯",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 3
                            },
                            {
                                "kind": "flag",
                                "flag": "crystal_resonate"
                            },
                            {
                                "kind": "flag",
                                "flag": "crystal_on_window"
                            }
                        ],
                        "next": "__return__",
                        "result": "你把晶体搁在窗台。它替火堆值了夜，蓝光一夜没灭。\n清晨你醒来，发现窗外那圈空白还在。\n【精神 +3，雾压 -2，线索：晶体镇雾】"
                    },
                    {
                        "id": "c_2",
                        "text": "害怕，扔到门外",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -3
                            },
                            {
                                "kind": "flag",
                                "flag": "crystal_resonate"
                            }
                        ],
                        "next": "__return__",
                        "result": "你把它丢出篱笆。蓝光在雾里滚了两圈，灭了。\n空白塌缩回去，雾重新合拢。你松了口气，又有点空。\n【精神 -3，线索：共鸣现象】"
                    }
                ]
            }
        }
    },
    {
        "id": "crystal_s4_doc",
        "title": "结晶 · 四",
        "desc": "",
        "trigger": {
            "dayMin": 11,
            "flags": [
                "crystal_resonate"
            ]
        },
        "initialScene": "crystal_s4_doc__doc",
        "scenes": {
            "crystal_s4_doc__doc": {
                "id": "crystal_s4_doc__doc",
                "text": "老医生看见晶体，二话不说把它请进了他那台吱呀作响的显微镜。\n半小时后他直起身，脸色比晶体还白：「这东西里头……有细胞。雾是活的。」\n他指着载玻片上一团缓缓蠕动的蓝光：「它在呼吸，在找同类。」",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "让他继续化验",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -2
                            },
                            {
                                "kind": "flag",
                                "flag": "crystal_scan"
                            }
                        ],
                        "next": "__return__",
                        "requires": {
                            "items": {
                                "key_mist_crystal": 1
                            }
                        },
                        "result": "他取样、染色、比对，忙到深夜。结论是：晶体是雾的「胚胎」，三块共鸣会唤醒母体。\n「要么集齐唤醒它，要么永远别让三块碰头。」他警告。\n【好感度提升：老医生 +10，线索：结晶是雾的胚胎】"
                    },
                    {
                        "id": "c_1",
                        "text": "只听结论",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": -1
                            },
                            {
                                "kind": "flag",
                                "flag": "crystal_scan"
                            }
                        ],
                        "next": "__return__",
                        "result": "你没把晶体交出去，只听他讲完。\n「活的。」这两个字在你脑子里转了一夜。\n【好感度提升：老医生 +5，线索：雾是活的】"
                    },
                    {
                        "id": "c_2",
                        "text": "「我不想知道细节」",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "crystal_scan"
                            }
                        ],
                        "next": "__return__",
                        "result": "老医生叹气，把显微镜盖上了：「行。无知者长寿。」\n但你看见他偷偷在笔记本上画下了晶体的样子。\n【好感度下降：老医生 -2，线索：雾是活的】"
                    }
                ]
            }
        }
    },
    {
        "id": "crystal_s5_second",
        "title": "结晶 · 五",
        "desc": "",
        "trigger": {
            "dayMin": 12,
            "flags": [
                "crystal_scan"
            ]
        },
        "initialScene": "crystal_s5_second__second",
        "scenes": {
            "crystal_s5_second__second": {
                "id": "crystal_s5_second__second",
                "text": "老医生说，唤醒母体需要三块。你只有一块。\n「鼠王那伙人，在沉船湾密室里囤了不少稀奇东西。」老K插话，「说不定有第二块。」\n雾里，似乎到处都藏着这种会呼吸的石头。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "用罐头向鼠王换",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "crystal_second"
                            },
                            {
                                "kind": "item",
                                "item": "food_canned",
                                "amount": -2
                            },
                            {
                                "kind": "item",
                                "item": "key_mist_crystal",
                                "amount": 1
                            }
                        ],
                        "next": "__return__",
                        "requires": {
                            "items": {
                                "food_canned": 2
                            }
                        },
                        "result": "鼠王眯着眼打量你，然后从兜里掏出一块蓝光莹莹的石头：「早就捡着玩了，臭显摆。」\n他换走你的罐头，心满意足。\n【获得：迷雾结晶×1】"
                    },
                    {
                        "id": "c_1",
                        "text": "深入雾中探寻",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "crystal_second"
                            },
                            {
                                "kind": "item",
                                "item": "key_mist_crystal",
                                "amount": 1
                            }
                        ],
                        "next": "__return__",
                        "result": "你循着微光，在塌了一半的钟楼尖顶上，抠出一块被藤蔓缠住的晶体。\n下来时划破了手，但值。\n【获得：迷雾结晶×1，体力 -3】"
                    },
                    {
                        "id": "c_2",
                        "text": "问老K讨",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "crystal_second"
                            },
                            {
                                "kind": "item",
                                "item": "key_mist_crystal",
                                "amount": 1
                            }
                        ],
                        "next": "__return__",
                        "result": "老K挠挠头，从怀里摸出一块：「本来留着压箱底的……给你吧，你比我会用。」\n他递过来时，手有点抖。\n【获得：迷雾结晶×1，好感度下降：老K -5】"
                    }
                ]
            }
        }
    },
    {
        "id": "crystal_s6_third",
        "title": "结晶 · 六",
        "desc": "",
        "trigger": {
            "dayMin": 14,
            "flags": [
                "crystal_second"
            ]
        },
        "initialScene": "crystal_s6_third__third",
        "scenes": {
            "crystal_s6_third__third": {
                "id": "crystal_s6_third__third",
                "text": "第三块线索指向雾最浓的腹地——据说那里立着一座没塌的信号塔，塔基嵌着母体本尊。\n老医生的话在耳边：「集齐唤醒它，或上交组织。两条路，两种结局。」\n你攥着两块晶体，蓝光隔着口袋互相呼应。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "集齐三块，召唤真相",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "crystal_third"
                            },
                            {
                                "kind": "flag",
                                "flag": "crystal_seek_truth"
                            }
                        ],
                        "next": "__return__",
                        "result": "你下定决心：要看见，就不要半途而废。\n你朝信号塔走去，两块晶体在掌心烫得发亮。\n【道德 +3，线索：追寻真相】"
                    },
                    {
                        "id": "c_1",
                        "text": "上交救援组织",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "crystal_third"
                            },
                            {
                                "kind": "flag",
                                "flag": "crystal_hand_in"
                            },
                            {
                                "kind": "item",
                                "item": "key_mist_crystal",
                                "amount": -2
                            }
                        ],
                        "next": "__return__",
                        "requires": {
                            "items": {
                                "key_mist_crystal": 2
                            }
                        },
                        "result": "你通过电台，把两块晶体交给了路过接应的救援队。\n他们郑重收下，说会送进实验室。\n「也许能造出解药。」那声音说。\n【失去：迷雾结晶×2，道德 -2】"
                    },
                    {
                        "id": "c_2",
                        "text": "暂且留着，再想想",
                        "effects": [
                            {
                                "kind": "flag",
                                "flag": "crystal_third"
                            }
                        ],
                        "next": "__return__",
                        "result": "你把晶体收好。真相可以等，命不能等。\n但那点蓝光，从此在你梦里亮着。\n【线索：第三块未决】"
                    }
                ]
            }
        }
    },
    {
        "id": "crystal_s7_crack",
        "title": "结晶 · 七",
        "desc": "",
        "trigger": {
            "dayMin": 16,
            "flags": [
                "crystal_third"
            ]
        },
        "initialScene": "crystal_s7_crack__crack",
        "scenes": {
            "crystal_s7_crack__crack": {
                "id": "crystal_s7_crack__crack",
                "text": "第十六天，雾毫无预兆地裂开一道缝。\n缝的那边，你看见久违的、灰蓝色的天，和远处一栋没塌的楼的轮廓。风从缝里灌进来，是干净的、带着土腥味的风。\n晶体在你怀里剧烈跳动，像要挣出去。",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "走向那道缝",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 6
                            },
                            {
                                "kind": "flag",
                                "flag": "crystal_crack"
                            }
                        ],
                        "next": "__return__",
                        "result": "你踏进空白。风灌满肺，你第一次觉得呼吸是件痛快事。\n缝在身后缓缓合拢，但你已看见过天了。\n【精神 +6，雾压 -5】"
                    },
                    {
                        "id": "c_1",
                        "text": "记录这一现象",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 3
                            },
                            {
                                "kind": "flag",
                                "flag": "crystal_crack"
                            },
                            {
                                "kind": "flag",
                                "flag": "journal_bonus"
                            }
                        ],
                        "next": "__return__",
                        "result": "你掏出日记，把裂缝的位置、风向、晶体的反应全记下来。\n也许有一天，这页纸能救别人。\n【精神 +3，知识经验 +5，线索：裂缝记录】"
                    },
                    {
                        "id": "c_2",
                        "text": "拉住老K一起看",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 4
                            },
                            {
                                "kind": "flag",
                                "flag": "crystal_crack"
                            }
                        ],
                        "next": "__return__",
                        "result": "你拽住老K，把他拖到缝前。他呆了半晌，突然红了眼：「原来天还在。」\n你们并肩站着，谁都没说话。\n【好感度提升：老K +5，精神 +4】"
                    }
                ]
            }
        }
    },
    {
        "id": "crystal_s8_truth",
        "title": "结晶 · 八",
        "desc": "",
        "trigger": {
            "dayMin": 18,
            "flags": [
                "crystal_crack"
            ]
        },
        "initialScene": "crystal_s8_truth__truth",
        "scenes": {
            "crystal_s8_truth__truth": {
                "id": "crystal_s8_truth__truth",
                "text": "第十八天，三块晶体终于在你掌心聚齐。\n蓝光炸开的瞬间，雾退到天地尽头，你看见了世界的最后真相——那座信号塔就是母体，而它，本是人类想用来拯救气候的手。\n它失败了，但从未停止呼吸。\n晶体在你手里轻轻发烫，像在问：你要把我唤醒，还是让我安睡？",
                "choices": [
                    {
                        "id": "c_0",
                        "text": "集齐三块，让它们共鸣",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 12
                            },
                            {
                                "kind": "flag",
                                "flag": "crystal_truth_seen"
                            },
                            {
                                "kind": "item",
                                "item": "key_mist_crystal",
                                "amount": 1
                            }
                        ],
                        "next": "__return__",
                        "result": "三块晶体贴合的刹那，蓝光贯通全身。雾在远方翻涌，却不再逼近。\n你听见一个很轻很轻的声音，像是世界在叹气，也像是谢谢。\n【获得：迷雾结晶×1（凑齐三块），精神 +12，雾压 -5，线索：真相揭晓】"
                    },
                    {
                        "id": "c_1",
                        "text": "把真相告诉老K",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 8
                            },
                            {
                                "kind": "flag",
                                "flag": "crystal_truth_seen"
                            },
                            {
                                "kind": "item",
                                "item": "key_mist_crystal",
                                "amount": 1
                            }
                        ],
                        "next": "__return__",
                        "result": "你拉住老K，把掌心的蓝光递给他看。他看完，长长舒了口气：「原来如此。原来我们没做错什么，也没做对什么。」\n你们在蓝光里坐着，像两个终于放学的小孩。\n【好感度提升：老K +10，精神 +8，线索：真相揭晓】"
                    },
                    {
                        "id": "c_2",
                        "text": "什么也不说，收好晶体",
                        "effects": [
                            {
                                "kind": "resource",
                                "resource": "sanity",
                                "delta": 4
                            },
                            {
                                "kind": "flag",
                                "flag": "crystal_truth_seen"
                            },
                            {
                                "kind": "item",
                                "item": "key_mist_crystal",
                                "amount": 1
                            }
                        ],
                        "next": "__return__",
                        "result": "你把晶体揣回口袋。真相太重，你选择自己扛着。\n但你知道，从今往后，你看雾的眼神不一样了。\n【精神 +4，线索：真相揭晓】"
                    }
                ]
            }
        }
    }
];
//# sourceMappingURL=legacyLines.js.map