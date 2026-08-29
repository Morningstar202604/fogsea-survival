# 《全民求生：迷雾降临》剧情写法手册 + 剧情总览

> 用途：说明这款文字抉择生存游戏的剧情内容**是怎么写的**（脚本 schema），并**概括整款游戏的剧情线**。
> 所有字段与样本均取自真实配置（`assets/resources/configs/`），可照抄扩写，不臆造。
> 证据来源：`SceneDefs.ts`（场景 schema）、`RelationshipSystem.ts`（关系）、`endings.json`（结局）、`scenes.json`（44 场）、`events/fog_*.json`（事件池）。

---

## 一、剧情内容由「两层」构成

| 层 | 文件 | 性质 | 触发方式 |
|---|---|---|---|
| **手写多幕剧本** | `scenes.json`（44 场） | 角色主线、长弧、精写散文 | 清晨调度器按 `trigger + priority` 开幕，或 `chain` 被事件链入 |
| **事件池（分支叙事）** | `events/fog_*.json`（fog_story / fog_daily / fog_crisis / fog_night / fog_explore / fog_neighbors …） | 每日随机遭遇、危机、夜戏、探索 | 按 `type + weight` 加权抽取，`once:true` 只触发一次 |

**一句话区分**：`scenes.json` 是"作者精心写好的连续剧"；`events/fog_*.json` 是"每天随机掉落的短篇遭遇"。两者都用同一套 **节点 + 抉择 + 效果落地** 机制。

---

## 二、手写剧本写法（`SceneDef` schema，照抄即可）

一个场景 = 一幕可整段演完的剧本，用 **ink「weave」语义的 JSON 化**：
- `choices[].outcomes[].goto` → 显式跳转（深入嵌套分支）
- `node.gather` → 没写 goto 时的汇流落点（分支汇回主线）
- `goto:'END'` 或无 gather → 本幕结束

### 字段结构

```jsonc
{
  "id": "rescue_s1_wreck",        // 唯一 id，命名约定：<线>_s<幕>_<主题>
  "name": "救援 · 一",             // 幕名（UI 徽标显示）
  "entry": "gate",                 // 入口节点 id
  "priority": 18,                  // 同晨多幕就绪时，大者优先开演（危机>日常）
  "trigger": {                     // 触发条件（全部满足才开）
    "dayMin": 4,                   // 最早第几天
    "notFlags": ["rescue_met","rescue_lost"]  // 任一 flag 存在则永不触发
  },
  "startBy": "scheduler",          // 'scheduler' 清晨调度 / 'chain' 仅由事件链入
  "nodes": [
    {
      "id": "gate",
      "chapter": "一 · 橙色身影",   // 小节标题（增强"小说感"）
      "text": "第四天夜里，无线电的杂音第一次有了人声的形状……",  // 叙事正文（支持 \n）
      "choices": [
        {
          "text": "把他拖进屋",                    // 选项文案
          "outcomes": {                            // 单对象=确定结果；数组=加权掷骰
            "text": "你架起他往屋里拖，血蹭了一路……【好感度提升：救援队 +10】",
            "effects": { "setFlags":["rescue_met"], "relNpc":"rescue", "relDelta":10, "sanity":-2 }
          }
        },
        {
          "text": "先给他草药止血",
          "requires": { "items": [{"itemId":"med_herbal","count":1}] }, // 门槛：需持有草药
          "outcomes": { "text":"……","effects": { "loseItems":[{"itemId":"med_herbal","count":1}], "setFlags":["rescue_met"], "relNpc":"rescue","relDelta":15 } }
        }
      ]
    }
  ]
}
```

### `requires`（选项门槛，可叠加）
`items`（道具门槛/消耗）、`talent`（天赋）、`stats`（属性阈值）、`flags`/`notFlags`、`rel:{npc,min}`（好感门槛）、`shelterMin`（庇护所等级）、`apLeft`（剩余行动点）、`skillLevel:{survival:2}`（技能线等级）。

### `effects`（结果落地，由 EventEngine 统一执行）
`setFlags` / `relNpc + relDelta`（好感增减，钳制 0~100）/ `morality`（道德）/ `sanity`（理智）/ `fogPressure`（雾压）/ `gainItems` / `loseItems` / `apDelta` / `endingId`（直接通往某结局）。

---

## 三、事件池写法（`EventDef` schema）

```jsonc
{
  "events": [
    {
      "id": "evt_story_eye_of_mist",
      "title": "迷雾之眼",
      "type": "story",          // story/daily/crisis/night/explore/neighbors…
      "weight": 0,              // 抽取权重；0=不随机（仅由条件/链入触发）
      "once": true,            // 只触发一次
      "conditions": { "flags": [] },
      "text": "三块结晶在石台上悬浮起来……",   // 叙事正文
      "options": [             // 抉择（= 场景的 choices）
        { "text": "直视它", "requires": {}, "results": [
            { "weight":100, "text":"……", "effects": { "endingId":"E05" } }  // 通往隐藏结局
        ]},
        { "text": "闭上眼，转身逃走", "results": [
            { "weight":100, "text":"……", "effects": { "sanity":-15 } }
        ]}
      ]
    }
  ]
}
```

> 事件池与手写剧本**机制同源**：都是 `text + options/choices + results/outcomes + effects`。区别仅在于触发方式（调度 vs 抽取）和写作粒度（事件更短、可随机）。

---

## 四、驱动一切的世界状态维度

- **5 个 NPC 好感**（0~100，落 `counters['rel_'+npc]`）：`laok`老K(初30) / `kid`朵朵(初10) / `doc`老医生(初20) / `ratking`鼠王(初0) / `rescue`救援队(初0)。
  - 阶梯 `tier()`：`<30` 陌生 / `30~54` 友善 / `55~79` 信赖 / `≥80` 羁绊（驱动交易折扣、专属剧情、结局评分）。
- **道德 `morality`**（0~100）、**雾压 `fogPressure`**（0~30，随天数攀升=雾在收紧）、**理智 `sanity`**。
- **庇护所等级**、**行动点 AP**（每日配额）、**技能线等级**（survival 等）。

> ⚠️ 关系**不存在** `RunState.relationships` 字段——必须从 `counters['rel_'+npc]` 读（经 `RelationshipSystem.get`），臆造字段会假实现。

---

## 五、整款游戏剧情总览

**核心设定**：迷雾突降的末世。玩家是幸存者，困于雾中木屋，目标撑到第 15 天等来救援——或揭开雾的真相。

**6 条剧情线（共 44 场）：**

1. **老K线（laok，8 幕）**：从战友情结盟 → 赠礼 → 旧照片(过往) → 夜间巡逻 → 秘密 → 共定计划 → 立誓。战友情主线，衔接隐藏结局 E06「同行者」。
2. **朵朵线（kid，8 幕）**：雾中相遇的小女孩 → 纸青蛙 → 信 → 布偶熊 → 同玩 → 危机 → 建庇护所 → 黎明。温情线，衔接隐藏结局 E14「不散的篝火」。
3. **老医生线（doc，6 幕）**：上门问诊 → 药箱见底 → 出诊深雾 → 诊所之夜 → 发热病人 → 举起白旗。生存交易/医德线。
4. **鼠王线（ratking，6 幕）**：喂食回礼 → 地下情报价目 → 地下请柬 → 下水道王座 → 鼠后之乱 → 别礼。暗线/彩蛋。
5. **救援线（rescue，8 幕，第 4 天起）**：坠机(wreck) → 苏醒 → 修电台(赠 `key_radio_parts`) → 报坐标 → 分歧 → 潮汐 → 前夜 → 离开展现救援。主通关线，推进原生 `rescueProgress`，衔接 E13「守望者的日记」。
6. **结晶真相线（crystal，8 幕，隐藏）**：矿脉 → 老K → 共鸣 → 老医生 → 集齐第二/三块 → 裂隙 → 真相。集齐三块结晶触发隐藏结局 E05「迷雾之眼」（揭示世界真相/回家的路）。

**14 个结局（`endings.json`）：**
- 好结局(4)：E01 直升机轰鸣 / E02 冲天信号弹 / E03 篝火长明 / E04 平凡等待
- 隐藏结局(4)：E05 迷雾之眼(结晶真相) / E06 同行者(老K上机) / E13 守望者的日记(日记入档案馆) / E14 不散的篝火(与朵朵)
- 死亡结局(6)：E07 走进雾里 / E08 干渴 / E09 饥饿 / E10 病榻 / E11 夜访者 / E12 兽潮之夜

**设计母题**：在"活下去"与"做个好人"之间二选一——搜救援队背包可得物资但道德-5、好感-20；救人中道德与好感上升却理智-2。玩家的道德/好感/是否集齐结晶，决定落到 14 结局中的哪一个。

---

## 六、想批量写新内容？照这个清单做

**加一场手写剧本**（扩角色线或新线）：
1. 在 `scenes.json` 的 `scenes[]` 追加一个 `SceneDef`，`id` 用 `<线>_s<幕>_<主题>`。
2. 写 `nodes[]`：每节点 `chapter`(小节标题) + `text`(散文) + `choices[]`。
3. 抉择里用 `requires` 设门槛（道具/好感/技能），用 `outcomes[].effects` 落地好感/道德/物品/flag。
4. 设 `trigger`(第几天/哪些 flag) 与 `priority`(危机幕给高值)。

**加一条随机事件**（扩每日遭遇）：
1. 在对应 `events/fog_*.json` 的 `events[]` 追加 `EventDef`。
2. 设 `type`(daily/crisis/night/explore) + `weight`(抽取概率，0=不随机) + `once`。
3. 写 `text` + `options[].results[].effects`（可直接 `endingId` 通往结局）。

**校验**：改完跑 `tools` 配置校验（ConfigSchema 引用完整性）+ `web` 端 `tsc --noEmit` + vitest，确保 0 issue、0 回归。三真源（`assets/resources/configs` → `web/public/configs` → `web/android/.../public/configs`）同步。
