# 全民求生·迷雾降临 — pnpm monorepo 迁移与实现方案（Architect 阶段）

> 状态：2026-08-28。旧单包结构（web/assets/tools/docs）已在工作树删除、未提交；git 仍可恢复 04a5c60 版，但主人确认无需回退，基于现有 `packages/core` 骨架继续推进。

## 0. 现状盘点（证据）
- 新结构：pnpm monorepo。根 `package.json`(v0.1.0, "Vue3 + TS monorepo")，`pnpm-workspace.yaml` 声明 `packages/*` + `apps/*`。
- `packages/core`（`@survival/core`，已实现 4 模块）：
  - `types.ts` — 领域模型（GameState / SceneNode / Choice / ChoiceEffect / RandomEventDef / EndingDef / ContentPack / MetaState 等）
  - `resources.ts` — 资源创建/增减、每日结算 `applyIncome`、饥饿惩罚 `applyStarvation`、合法性校验
  - `dice.ts` — d100 掷骰检定 `rollD100`（含大成功/大失败档位）
  - `rng.ts` — 可种子随机 `Rng`（mulberry32，测试可复现，支持 `weighted` 加权抽取）
  - 含 `build`/`typecheck`/`test` 脚本，vitest 配置就绪（node 环境）
- `apps/web`（`@survival/web`）—— **未创建**，`package.json` 里 `dev:web` 指向不存在的包，当前不可运行。

## 1. 新领域模型要点（来自 types.ts，零臆测）
- 资源 5 种：`food` / `water` / `health` / `sanity` / `energy`，上限默认 100。
- 选项效果 `ChoiceEffect.kind`：`resource` / `flag` / `item` / `roll` / `jump`；`roll` 支持难度检定、成功/失败跳转、致命检定、成功附加效果嵌套。
- `Condition`（requires）：flags / items / resources 下限三类前置条件。
- `GameState` 单一对象：`day` / `resources` / `flags` / `inventory` / `currentScene` / `visitedScenes` / `pendingEvents` / `triggeredEvents` / `eventStack` / `outcome` / `runStats` / `meta`。
- `ContentPack`：`version` + `storyline`（SceneNode 表 + endings）+ `randomEvents[]` + `income[]`（每日结算）+ `startingResources`。
- ⚠️ **对照旧版(04a5c60)的显著缺口**：新模型暂未包含 NPC 好感/关系、天赋、技能树、道德值、雾压、庇护所等级、随从。这些是旧版已有的丰富系统，新模型需决策是否加回。

## 2. 目标架构（依赖单向：web → core）
```
quanmin-survival/
  packages/
    core/            @survival/core —— 纯逻辑，无 UI，可单测
      src/
        types.ts     领域模型（已有）
        resources.ts 资源/结算（已有）
        dice.ts      检定（已有）
        rng.ts       随机（已有）
        engine/      SceneEngine / EventEngine / OutcomeSystem / SaveManager（待建）
        content/     ContentPack 装载 + 剧本/事件/结局数据（待建）
        index.ts     统一导出（待建）
  apps/
    web/            @survival/web —— Vue3 + Vite 前端（待建）
      src/          消费 @survival/core，响应式三栏 UI（暗色雾霭风，沿用上轮已验证布局）
      public/configs/ 配置 JSON（或经 core 的 content 层）
```

## 3. 分阶段 Roadmap
- **Phase 0 — 可构建**：创建 `apps/web`（Vite + Vue3 + TS），联通 workspace（`pnpm install` / `dev:web` 可起），`pnpm -r typecheck`/`test` 全绿。
- **Phase 1 — core 引擎**：`SceneEngine`（解析 SceneNode、应用 Choice、requires 条件判定、跳转）、`EventEngine`（每日加权抽取、触发、嵌套 eventStack）、`OutcomeSystem`（接已有 `applyIncome`/`applyStarvation` 做结局/死亡结算 + meta 解锁）、`SaveManager`（序列化/新局/读档）。
- **Phase 2 — 内容层**：编写/迁移 `ContentPack`（剧本线 + 随机事件 + 结局 + 初始资源 + 每日结算）。先 1~2 条精简 storyline 跑通，再铺量。
- **Phase 3 — web UI**：Vue3 三栏响应式（状态/剧情/行动），暗色雾霭风，沿用上轮已验证的布局规范（PC 三栏 / 平板两栏 / 手机单列 + 行动吸底）。
- **Phase 4 — 门禁 & 预览**：`pnpm -r typecheck`/`test` 绿；本地起服，平台预览验证 PC 三栏 / 手机单列。

## 4. 待主人确认的关键决策（见对话提问）
- **决策 A — 第一版交付目标**：
  1. 最小可玩 demo（apps/web 骨架 + 完整引擎 + 1~2 条精简 storyline，先跑起来）
  2. 完整内容移植（旧 44 场/事件/结局按新 SceneNode 格式全量迁入，再接 UI）
  3. 仅补 core 引擎（先不做 UI，纯逻辑 + 测试）
- **决策 B — 复杂度边界**：
  1. 按新精简模型（仅 5 资源 + 选项分支，做纯粹生存抉择）
  2. 还原旧版丰富度（在 types 加回 NPC 好感/天赋/技能树/道德/雾压/随从，再实现引擎与 UI，工作量最大）

## 5. 风险与边界
- 不恢复旧 `web/`（主人确认）。新 UI 按 Vue3 重写，但布局风格沿用上轮已验证的暗色三栏响应式。
- 旧 44 场剧本若要迁入，需按新 `SceneNode` 格式（更简单：无 `chapter`/`gather`/`trigger`）转写，非直接拷贝。
- 若选"还原旧版丰富度"，需先扩展 `types.ts`（加 relationship/morality/fogPressure/talent/skill/shelter/companion），工作量显著增加，且会影响 Phase 1 引擎设计——建议先 demo 跑通再迭代。
- 数据持久化：先用 `localStorage` 落地 `GameState`（JSON 序列化），符合小台专家"本地优先 + 离线可用"铁律的兜底思路；后续如需跨端同步再接资料库。
