# 开发环境备忘（DEV NOTES）

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
