import type { ContentPack } from '../types.js';
import { PHASE1_SCENES, PHASE1_EVENTS } from './phase1.js';
import { PHASE2_SCENES, PHASE2_EVENTS } from "./phase2.js";
import { PHASE3_SCENES, PHASE3_EVENTS } from "./phase3.js";
import { PHASE4_SCENES, PHASE4_EVENTS } from "./phase4.js";
import { PHASE5_SCENES, PHASE5_EVENTS } from "./phase5.js";
import { PHASE6_SCENES, PHASE6_EVENTS } from "./phase6.js";
import { PHASE7_SCENES, PHASE7_EVENTS } from "./phase7.js";
import { PHASE8_SCENES, PHASE8_EVENTS } from "./phase8.js";
import { PHASE9_SCENES, PHASE9_EVENTS } from "./phase9.js";
import { PHASE10_SCENES, PHASE10_EVENTS } from "./phase10.js";
import { CAUSAL_EVENTS } from "./causal-events.js";

// 自动生成（scripts/migrate.mjs）：旧版 44 场 + 事件池 + 14 结局 迁移至新 ContentPack。
// 主线为合成生存循环；6 条旧剧情线作为触发式支线(lines)。精简模型已丢弃关系/道德/雾压/天赋等字段。
export const fullContent: ContentPack = {
  "version": 1,
  "storyline": {
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
  },
  "lines": [
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
  ],
  "randomEvents": [
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
  ],
  "income": [
    {
      "resource": "warmth",
      "delta": -1
    }
  ],
  "startingResources": {
    "food": {
      "current": 80,
      "max": 100
    },
    "water": {
      "current": 80,
      "max": 100
    },
    "health": {
      "current": 100,
      "max": 100
    },
    "sanity": {
      "current": 100,
      "max": 100
    },
    "energy": {
      "current": 100,
      "max": 100
    },
    "warmth": {
      "current": 100,
      "max": 100
    }
  }
};

// v0.5.0: 合并第一阶段新增内容（序章扩展、老K引入、大事件兽潮、每日小事件）
fullContent.storyline.scenes = {
  ...fullContent.storyline.scenes,
  ...PHASE1_SCENES,
  ...PHASE2_SCENES,
  ...PHASE3_SCENES,
  ...PHASE4_SCENES,
  ...PHASE5_SCENES,
  ...PHASE6_SCENES,
  ...PHASE7_SCENES,
  ...PHASE8_SCENES,
  ...PHASE9_SCENES,
  ...PHASE10_SCENES,
};
if (!fullContent.randomEvents) fullContent.randomEvents = [];
fullContent.randomEvents = [...fullContent.randomEvents, ...PHASE1_EVENTS, ...PHASE2_EVENTS, ...PHASE3_EVENTS, ...PHASE4_EVENTS, ...PHASE5_EVENTS, ...PHASE6_EVENTS, ...PHASE7_EVENTS, ...PHASE8_EVENTS, ...PHASE9_EVENTS, ...PHASE10_EVENTS];
// 因果系统触发型事件（weight=0，仅由 CAUSAL_RELATIONS 的 event_trigger 引用）
fullContent.randomEvents = [...fullContent.randomEvents, ...CAUSAL_EVENTS];
