# 开发环境备忘（DEV NOTES）

## 版本策略（2026-08-27 起）

- **统一小版本体系 v0.1.x**：自 v0.1.0 起，所有迭代均视为小版本，递增补丁号（v0.1.0 → v0.1.1 → …）。
- 历史 v0.2 ~ v0.7.1 的全部功能（数学层 / 章节 / 技能树 / 场景剧本 / 事件十倍扩容等）已归并为 **v0.1.0 起点**，不再使用 0.2 / 0.3 … 这类里程碑式跳号。
- `VERSION` / `README` / `DEV-NOTES` 三处版本号以本策略为准，对外发布前务必一致。
- Cocos 端（GameApp.ts）冻结在 v0.3.x 快照，出货管线走 Web dist → Capacitor；追平前勿从 Cocos 出包。

## 首次用 Cocos Creator 打开本项目

1. 打开 **Cocos Dashboard** → 项目 → 导入 → 选择 `D:\github\quanmin-survival`（引擎版本选 **3.8.x**）
2. 首次打开会自动生成：`library/`、`temp/`、所有 `.meta` 文件、`temp/tsconfig.cocos.json`
3. 新建场景：Assets/Scenes 右键 → 新建 → Scene，命名 `Main`，双击进入
4. 层级面板：新建 Canvas（右键 → 创建 → UI 组件 → Canvas）
5. 选中 Canvas，属性检查器最下方「添加组件」→ 自定义脚本 → **UIRoot**
6. 菜单 项目 → 项目设置 → 功能裁剪：保持默认（2D）
7. 把 Main 场景拖为启动场景（构建设置里），或直接点预览 ▶

> UI 全部由 `GameApp.ts` 程序化生成，**不需要**拖任何预制体/节点，只需上面第 5 步挂一次 UIRoot。

## 常用命令

```powershell
cd D:\github\quanmin-survival\tools
npm test                # 单元测试（20 个）
npm run sim             # 数值模拟器（勤奋策略，5000局）
npx tsx sim/simulator.ts dist 2000 T03   # 单天赋结局分布
npx tsc -p tsconfig.game.json            # 全工程类型检查（含 cc 类型）
```

## 变更日志

### v0.1.0 版本重置（2026-08-27）
- 版本号体系重置：历史 v0.2~v0.7.1 全部功能归并为 v0.1.x 小版本系列起点，当前全部功能 = v0.1.0。
- `VERSION` 0.5.0 → 0.1.0；`README` 状态段 v0.3.3 → v0.1.0 并反映真实功能（22 天赋 / 118+204 事件 / 14 结局 / 技能树 / 场景剧本）；三处版本号对齐。
- 真实功能基线（归并后）：动态世界 · 数学层（保底/动态权重/好感/体温/燃料）· 五章章节系统 · 世界状态（道德值/雾压）· 程序化内容引擎（204 探索事件）· 场景剧本引擎（朵朵线+老K线 8 幕 29 拍）· 5 线技能树（15 节点）· 渐进解锁 · 场景选择 234 选项。

### v0.1.1 物品/配方/天赋扩容（2026-08-27）
> 内容素材层扩充，全部复用既有合法键，零假实现、零新增 hook 类型、零代码改动。
1. **物品 +14**（68 个）：肉干 / 水果罐头 / 热汤 / 薄荷茶 / 蜂蜜 / 镇痛贴 / 维生素片 / 兴奋剂 / 椰子水 / 老唱片（10 消耗品）+ 兽骨 / 羽毛 / 玻璃片 / 野葱（4 材料）。全部使用合法 `use` 键（hunger/thirst/sanity/hp/cureStatus），图标复用既有有效名避免破图。
2. **配方 +8**（33 个）：风干肉干 / 蜜渍果 / 煮热汤 / 薄荷茶 / 镇痛贴 / 维生素片 / 兴奋剂 / 布绳。产物均为既有或本批新增物品，前置设施仅 campfire（已有对应配方），无新设施 id。
3. **天赋 +10**（T13–T22，22 个）：拾荒者 / 神枪手 / 仓鼠症 / 夜行猫 / 锦鲤 / 渔老大 / 仁心 / 苦行僧 / 交际花 / 鹰眼。**全部复用既有 12 种 hook 类型**（lootMult / nightRisk / dirty / medic / combat / bag / chest / gift / warn / fishing / hint / craftReduce），消费逻辑已存在于 TalentRuntime，自动进入抽卡池，单天赋模型下真实生效。
4. **三真源同步**：`assets/resources/configs/` 改后同步至 `web/dist/configs/` 与 `web/android/app/src/main/assets/public/configs/`（消除 web/dist 缺失 craft_crystal_lamp 的历史快照差异），确保 Web 运行时与 APK 出包均消费新内容。
5. 回归：tools vitest 55/55（无回归）· 双端 tsc 0 错误 · web vitest 冒烟通过 · 模拟器双指标达标 · ConfigSchema 校验三处配置 0 issue。

### v0.1.2 剧本线扩容：救援线 + 结晶真相线（2026-08-27）
> 场景剧本引擎新增两条 8 幕 29 拍角色剧本，全部复用既有合法 EffectPayload 字段与已注册 NPC/物品/结局，零代码改动、零假实现。

1. **救援线 rescue_s1_wreck ~ rescue_s8_leave（8 幕）**：遇险船员（rescue NPC）从沉船湾获救 → 以零件助建 radio → 推进原生 rescueProgress 系统 → 解锁 E13「守望者的日记」隐藏结局。靠 flag 链（rescue_met→rescue_talked→rescue_radio_help→…）串联，dayMin 错开保证顺序；effects 全部走合法字段，赠 key_radio_parts 助建 radio 设施。
2. **结晶真相线 crystal_s1_vein ~ crystal_s8_truth（8 幕）**：由 laok/doc 揭示迷雾结晶真相 → 赠 key_mist_crystal（maxStack=3，契合 E05「迷雾之眼」三块收集）→ 衔接 E05 隐藏结局。文本密度对标网文，含 flag 长链与多分支。
3. **三真源同步**：`assets/resources/configs/scenes.json` 改后 cp 同步至 `web/dist/configs/scenes.json` 与 `web/android/app/src/main/assets/public/configs/scenes.json`，场景总数 28→44（id 重复 0）。
4. **零假实现核查**：rescue NPC 已在 RelationshipSystem 初始化好感（rescue:0）；key_mist_crystal maxStack=3 与 E05 触发事件（fog_story.json）一致；craft_radio 产出 radio 设施；两条线纯 JSON 真实现，无新增代码/hook。
5. 回归：tools vitest **58/58**（新增 verify_scenes.test 全量 ConfigSchema 0 issue + 救援/结晶线各 8 幕 + entry 节点存在；修正 scenes.test 过时假设 day6 morningStart 不再返回 null）· 双端 tsc 0 错误 · web vitest 3/3 · 模拟器死亡率 56.1% / 好结局率 43.9%（40~60% 双达标）· ConfigSchema 全量 0 issue。

### v0.2 动态世界（六大系统）
1. **地点枯竭**：每地有存量（12/14/10/12/8/8/6），搜刮见底无产出，UI/情报板显示余量
2. **天气实感**：晴天SAN+5开箱+10%、雨天自动集水+外出12%生病、浓雾危机×1.3开箱-10%；收音机看明日预报
3. **老K随从**：农舍事件入队；每晚吃1份食物（断粮掉血，3天走人）；可派外出(1AP)带回铜箱级物资
4. **情报面板**：天气实感说明+明日预报+天灾达标清单(✓/✗)+各地存量条；T01提示改为动态建议
5. **行为回响**：救哭女→D7报恩赠药；抢铁管人→D5复仇伏击；喂鼠王→D9送无线电零件
6. **隔空交易**：每日刷2条报价（12种池），好坏自判，成交触发频道插播

存档版本升至 v2（含 v1 迁移）。模拟器回归：死亡率 67.6%（机器人不会用交易/情报，真人收益更大）。

### 平衡修正（枯竭+交易上线后）
- 超市罐头产出 ×2、陷阱 40%→50%、兽潮伤害 -25/-8 → -20/-6
- 交易改为**每条报价每局限一次**（防刷），报价池比例再平衡
- 模拟器新增价值表 + 真人式"扫一眼好买卖就成交"策略
- **最终校准：死亡率 55.4%（正中55%目标）· 好结局率 44.6% · 天赋极差 21.6pp —— 双指标首次全过 ✅**


## 已知事项 / TODO

- [x] 世界频道目前只有底部气泡，全屏频道页待做 → 已做：行动区新增"💬 频道"，全屏滚动列表 + 刷新按钮，新消息实时插入
- [x] 制作/背包列表超过一屏无滚动（ScrollView 待接）→ 已做：UIKit.scrollList 程序化 ScrollView，两面板完整展示可滚动
- [x] 黄昏"再探一轮"的收益加成尚未在产出结算中生效（UI 已传参）→ 已修复：yieldMult 现同时作用于宝箱产出（LootSystem.openChest 新增 countMult 参数），22 测试 + 模拟器回归通过
- [x] 音频资源未接入（AudioManager 待实现）→ 模块已实现（按需加载 resources/audio/<name> 并缓存，click/chest/clear/death 四处挂钩）；**音频文件本身仍需放入 `assets/resources/audio/` 才有声音**
- [x] 设置界面（打字机速度/震动开关）未做 → 已做：主页"⚙ 设置"，打字机三档速度实时生效并持久化（GlobalProfile.settings，旧档自动补默认值）；音效/震动为持久化开关，供 AudioManager 与引擎震动 API 消费
- [ ] 音频资源未接入（AudioManager 待实现）
- [x] 设置界面（打字机速度/震动开关）未做 → 已做：主页"⚙ 设置"，打字机三档速度实时生效并持久化（GlobalProfile.settings，旧档自动补默认值）；音效/震动为持久化开关，供 AudioManager 与引擎震动 API 消费
- [ ] C 盘空间告急时 npm/vitest 会随机失败 —— 已将 TEMP 切到 `D:\tmp`，建议尽快清理 C 盘

### v0.3 本轮开发（2026-08-25）
1. **黄昏加成修复**：再探一轮 +50% 现同时作用于宝箱产出（openChest countMult）
2. **列表滚动**：UIKit.scrollList（程序化 ScrollView+Mask），制作/背包全量可滚
3. **全屏世界频道**：行动区"💬 频道"，滚动消息流+刷新按钮，新消息实时插入
4. **设置界面**：打字机三档速度（实时生效）/音效/震动，随全局档案持久化
5. **AudioManager**：单例 + resources 按需加载缓存；click/chest/clear/death 挂钩；音频文件入库即自动生效

回归证据：vitest 24/24 · `npx tsc -p tsconfig.game.json` 0 错误 · 模拟器死亡率 55.4% / 好结局率 44.6% 双达标

### v0.3.1 Web + Capacitor 双端架构（2026-08-25）
**动机**：Cocos 出 APK 依赖编辑器 GUI（CDN 反盗链无法命令行装），改为 Web 技术栈全命令行出包。

1. **共享层去引擎化**：GameManager 改用 window.localStorage；配置加载拆为 ConfigBuild（纯）+ 平台注册器（registerConfigLoader）；Typewriter 移至 core/。systems/data/EventBus/RNG/SaveManager 本就是纯 TS，27/33 文件零改动复用
2. **web/**：vite + vanilla TS，DOM 版 UIKit（domkit）与 GameApp 全流程移植（app.ts），音频适配 HTMLAudioElement；`npm run build` 出 dist
3. **APK 管线**：Capacitor 7 壳（appId com.badhope.fogdescends）→ `npx cap sync android` → `gradlew assembleDebug`。产物 `dist-apk/quanmin-survival-debug.apk`
4. **修复 Cocos 版入睡按钮丢失 bug**：buildGameScreen 把入睡按钮加进 actions 容器后被 enableActions 的 destroyAllChildren 清掉，导致首次行动后无法入夜——已移入 enableActions 动态重建

构建环境：D:\android-env（SDK34/NDK r25b/CMake/JDK17+21）、Gradle 8.11.1 本地包。
注意：Capacitor 7 需 **JDK 21** 构建（非 docs/04 的 17）；services.gradle.org 被 TLS 干扰，wrapper 已指向本地 zip（腾讯镜像可下）。
正式签名包步骤见 D:\android-env\README-环境说明.md + D:\keys\fog-descend.keystore。

### v0.3.2 真实性补全 + 冒烟测试（2026-08-25）
用户要求"反复检查是否有假实现，必须补齐"，审计结果与修复：

1. **【严重】存档静默丢档**：LocalStorageBackend 用 try/catch 吞掉 localStorage 写入失败——在 Node 残缺 webstorage 环境下永远"假保存"。已改为启动探测 + 显式降级内存存档（console.warn 告知），绝不假装已保存
2. **【严重】配置 BOM 崩溃**：configs/*.json 带 UTF-8 BOM，Web 端 JSON.parse 直接炸导致无法开局。fetchLoad 已剥 BOM
3. **音效假实现 → 真实现**：之前只是"缺文件时静默跳过"；现由 `tools/gen_sfx.py` 程序合成 click/chest/clear/death 四枚 WAV 落盘到 assets/resources/audio 与 web/public/audio
4. **震动开关假实现 → 真实现**：接入 @capacitor/haptics（Web 自动空操作），事件结果揭示 / 结局 / 黄昏贪趟三处消费 settings.vibrate
5. **游戏内设置入口缺失**：主页有 ⚙ 设置但对局内没有；行动区新增 ⚙，关闭按来源返回
6. **冒烟测试**：web/tests/boot.test.ts（jsdom）真实驱动 初始化→抽天赋→拆礼包→晨间事件选项→探索→六面板→改设置持久化 全链路；tests/setup.ts 提供规范 localStorage；__QS_TEST_SEED__ 钩子保证可复现

回归证据：web tsc 0 错误 · vitest 1/1 · cocos tsc 0 错误 · tools vitest 24/24 · 模拟器双达标 · gradlew assembleDebug 成功 · APK 内含新 bundle 与 4 枚音效。
双击试玩：仓库根目录 `启动游戏.bat`（自动起服务并开浏览器 http://localhost:5173）。

### v0.3.3 去重（减少重复造轮子）
- **删除 `GameManager.addLater`**：它手写了入包/堆叠逻辑，且与 `InventorySystem.add` 规则不一致（漏算天赋背包加成与储物箱），属"假一致"。现 `newRun` 改为先 `attachRun` 再统一调用 `InventorySystem.add`，规则与游戏内完全一致，并修掉容量 bug
- **合并 `RNG.weightedPick`**：原静态方法用 `Math.random()`（不可复现）与 `weightedPickWith` 重复。改为实例方法 `rng.weightedPick(arr)` 直接委托 `weightedPickWith`，消除重复实现且保证可种子化
- 回归：cocos tsc 0 错误 · tools vitest 24/24 · 模拟器双达标 · web tsc 0 · web vitest 1/1 · APK 已用新包重打（08-25 09:03）

## 提交规范

feat(模块): 中文描述，例：
`feat(event): 新增夜间事件池 4 条`

### v0.4 大扩容「雾更深了」（2026-08-26）
1. **数学层**：幸运值+软/硬保底掉落（pity 9必银/14必金）· 动态事件权重（天数缩放×剧情链加速×抗重复采样）· 交易行情因子+议价博弈 · 夜间体温模型（寒流夜失温风险）· 火堆燃料制（自动烧柴续燃）· 好感度系统（老K/朵朵/医生/鼠王）
2. **玩法层**：白天新行动 🎣钓鱼 💪锻炼(HP上限成长) 🧘冥想 📔日记(10篇→隐藏线) 📻广播(救援进度) 🔥添柴；夜间姿态三选（安睡/守夜/读书）
3. **内容层**：事件 71→118（新增探索36/日常12/夜间10/危机4/剧情链16：朵朵线·老K身世线·救援线·结晶真相线）；物品 +17；配方 +9；天赋 10→12（渔夫/妙手回春）；地点 7→9（无线电台/沉船湾）；结局 12→14（E13守望者的日记/E14不散的篝火）
4. **修复**：Web 夜间弹窗回退 bug（旧监听器残留）· 打字机尾字不显示 · 天赋页残屏
5. 回归：tools 24/24 · web vitest 3/3 · 双端 tsc 0 错误 · 模拟器死亡率 40.9% / 好结局率 59.1% 双达标

### v0.5 章节锚定 + 内容十倍扩容（2026-08-26）
1. **章节系统**：五章结构（觉醒/扎根/暗流/低语/终局），每章=天数区间+入章必发大事件+系统修正（夜事件率/危机权重/剧情权重/行情偏移/夜间SAN压迫）。无论玩家做什么，到点必转场——节奏有了骨架
2. **世界状态**：道德值(morality)与雾压(fogPressure)计数器——深入浓雾/招惹未知会推高雾压，反过来抬高夜与危机频率；侦察可对冲。世界记得你的行为
3. **行为扩容**：白天行动 6→13（+打猎/采药/查陷阱/编织/侦察/留饭/下棋/盛宴），全部公式化收益
4. **程序化内容引擎**：gen_events.mjs 组合语法（发现物×风险×抉择×后果）固定种子生成 204 条探索事件，产物固化为 fog_generated.json
5. **手写内容**：5 个章节锚点大事件（雾市开张/雾的呼吸/沉默的大多数/名字/倒计时）
6. 回归：tools 24/24 · web vitest 全过 · 双端 tsc 0 · 模拟器死亡率 43.8% / 好结局率 56.2% 双达标

### v0.6 场景剧本引擎「朵朵线」样板（2026-08-26）
1. **SceneDef 多拍剧本格式**（data/SceneDefs.ts）：节点(choices+goto)+gather 汇流 = ink weave 的 JSON 化；玩法钩子一等公民（道具门槛/AP消耗(apSpend)/庇护所等级(shelterMin)/好感度门槛(rel)），效果统一走 EventEngine.applyEffects
2. **SceneSystem**：清晨调度（挂起恢复 > priority 挑幕）→ 节点编译成合成 EventDef 复用现有 presentEvent 流水线 → followUp 推进/完结登记。加新剧本不改任何结构
3. **朵朵线重写为 8 幕 29 拍角色剧本**（configs/scenes.json，节点文本 ~4500 字，密度对标网文）：相遇(道具抉择)→纸青蛙→识字/看踪迹分支天赋→布偶熊→捉迷藏(AP+雾习性情报)→深夜呼救多拍危机(火把/柴刀/喊话/锁门×谷仓×影子遭遇，kid_mistwise 专属安全路线)→兽潮前夜收留(识字→地图碎片联动沉船湾线；看踪迹→猎道生肉)→千纸鹤终章。旧 4 条单卡朵朵事件移除，flag 兼容（E14 判定不变）
4. **选项门槛细化**：EventOption.requires 新增 flags/notFlags/rel/shelterMin/apLeft，optionLockedReason 统一输出锁定原因（缺材料/好感不足/需庇护所Lv.N…），两端 UI 直接展示
5. **存档 v3**：run.scene + scenesDone 字段，v2→v3 迁移补默认值
6. 回归：tools vitest 35/35（新增 scenes.test 11 用例：调度/推进/apSpend/shelterMin 门槛/跨天恢复）· 双端 tsc 0 错误 · web vitest 2/2（夜流程 drain 上限 3→10 适配场景节奏）· 模拟器死亡率 43.8% / 好结局率 56.2% 双达标

### v0.6.1 老K线剧本「向导的约定」（2026-08-26）
1. **链式场景**：SceneDef 新增 startBy:'chain'——只由事件分支 nextEvent('scene:id/node') 链入，调度器永不主动开演；ConfigSchema 校验 scene 引用（场景+节点存在性）
2. **触发门槛扩展**：SceneTrigger.companionAlive（随从在场/不在场）
3. **老K线重写为 8 幕 29 拍**：入伙夜(探索农舍搭伙成功→链入)→门口布包(trust)→照片背后的人(弟弟身世)→火光里的女儿(deep)→联合巡逻(雾压-3)→矿洞钥匙(多路线:大路/排水沟×信件高潮,bond)→兽潮计划(备料骰子/负伤分支/并肩之夜)→盟约(指南针信物,E06 提示)。文本 ~4400 字
4. 移除 5 条旧单卡事件(gift/past/plan/photo/choice)，flag 兼容（laok_trust/deep/bond 全保留，E06 判定不变）
5. 回归：tools vitest 39/39 · 双端 tsc 0 · web vitest 3/3 · 模拟器双达标

### v0.7 技能树 × 渐进解锁 × 场景选择扩容（2026-08-26）
1. **技能树引擎**：`SkillSystem.ts` + `SkillDefs.ts`——5 线（生存/战斗/制作/知识/社交）× 3 分支 = 15 节点；level=floor(xp/100) 封顶10；分支有**跨线前置**（如战术家需知识线侦察兵Lv1）；灵感系统（日记/冥想概率积攒→制作/烹饪点燃，3次加成）
2. **存档 v4**：run.skills{xp,inspiration,inspirationCharges}，v3→v4 迁移
3. **选项技能门槛**：EventOption.requires / SceneRequires 新增 `skillLevel`（如 {knowledge:2}），optionLockedReason 输出「xx等级不足」；ConfigSchema 校验技能线引用合法性
4. **子系统深化**：
   - 制作：品质三级（粗制/精良⭐/大师✨，由制作等级+灵感决定），建造者分支材料再减免
   - 烹饪：新增「精致料理」行动（烹饪师Lv1 解锁，1AP 单食材，品质决定收益）
   - 侦察：知识Lv1 解锁侦察；侦察兵Lv2 解锁「深度侦察」（可发现隐藏地点）
   - 采药/陷阱/广播/冥想/日记：全部接入对应分支被动加成
5. **场景选择扩容**：16 幕 57 节点全部扩到 ≥4 选（234 个选择，平均 4.1/节点，原 1.5）——含技能门槛选、道具门槛选、观察系、社交系
6. **UI 渐进开放**：行动栏按等级显隐（锁定按钮点击跳转技能面板）；新「⭐技能」面板（五线进度条+下级解锁预告+灵感状态）；HUD 显示总等级与灵感标记；制作日志显示品质标签
7. 回归：tools vitest **51/51**（新增 skills.test 12 用例：XP/等级封顶/跨线前置/灵感消耗/迁移）· 双端 tsc 0 · web vitest 3/3（night-flow 修复：夜间结算触发结局时提前收尾不再误报）· 模拟器死亡率 44.0% / 好结局率 56.0% 双达标 · scan clean

### v0.7.1 评审修复：通电·除污·校准（2026-08-26）
> 四角色评审团（玩法程序/玩家/PM架构/网文主编）全量评审后的修复版。评审发现的 P0 全部清零。

**通电（XP 链路修复）**
1. `EffectPayload.skillXp` 落地 applyEffects——场景/事件选择从此真正发放技能经验（此前248个outcome发0点）
2. doDailyAction 改显式 actionId 传参，废除 msg 关键词匹配——修复狩猎/查陷阱/下棋三条线 XP 从未发放的静默断裂
3. 灵感点燃接线：CraftSystem.craft/cookFine 入口调 consumeInspiration；大师品质门槛统一为 **制作Lv4+灵感**（原Lv6三重锁死）；点燃时日志显示 💡
4. 交易成交 +15 社交经验；sleep XP 移至 finishNight（白天打盹不再可刷）
5. 反馈可视化：行动日志追加 `⭐ +15生存` 回执；场景选择效果行显示技能经验；锁定原因输出中文（"需知识Lv2"，不再漏英文枚举）

**除污（叙事层）**
6. 删除全部 141 个批量注入模板选项（兽潮夜递饼干、给失踪儿童递坐垫等违和项清零）
7. 手写补写 75 个情境化选项（tools/authoring/*.mjs 可复跑）：每条遵循三原则之一（揭示人物/推进张力/改变世界质感）；重点10节点含骰子分支与 flag 长链：
   - 夜枭暗号(dd_signal)→谷仓救援暗号路线；油桶/数脚步→shadow 三种脱身分支
   - 日常侦察发现的车辙(scout_spotted)→老K巡逻复盘拼图(lk_joint_map)——跨系统回收
   - 信件不读(lk_letter_unread)→s8 盟约「出去那天还你」收束
   - 首个 rel 门槛选项（laok好感≥25 抚平蜡笔画）；168选/57节点，无<2选节点

**校准**
8. 存档 normalizeRunState：xp 字符串拼接/缺失键/charges NaN 全部归一化；损坏档给出「开新局/返回」对话框（消灭幽灵按钮）
9. 技能面板数据派生：经验来源带数值提示、解锁预告由 SKILL_BRANCHES/FEATURE_REGISTRY 生成（消手写三重定义）、知识线去掉"侦察解锁侦察"循环指引
10. 模拟器接入技能树：探索XP+睡前日记/冥想+场景自动推进（bot每拍选项0）→ 死亡率 54.2% / 好结局率 45.8%（双达标，危机拍真实生效）
11. 杂项：巧编(weaveRopeUpgraded)接线建造者Lv1替换基础编织；中英混合id改 snake_case（scout_elite/herb_crit）
12. **平台决策记录**：Cocos GameApp.ts 冻结在 v0.3.x 快照（每日行动/技能面板未接），出货管线走 Web dist→Capacitor；追平前勿从 Cocos 出包
13. 回归：tools vitest **55/55** · 双端 tsc 0 · web vitest 3/3 · 模拟器双达标
