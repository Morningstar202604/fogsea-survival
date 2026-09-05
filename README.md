<p align="center"><img src="docs/logo.svg" alt="FogSea Survival Logo" width="200" height="60" /></p>

# 雾海生存 FogSea Survival v0.4.2

> 基于热门求生流小说机制重构的文字生存策略游戏（安卓 App / Web）
>
> **关键词**：迷雾求生 · 文字游戏 · 生存策略 · 全民求生 · roguelite · 天赋三选一 · 基地建设 · 兽潮天灾 · 排行榜 · 安卓APK

[![Version](https://img.shields.io/badge/version-0.4.2-blue)](https://gitcode.com/badhope/fogsea-survival)
[![License](https://img.shields.io/badge/license-Apache--2.0-green)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Android%20%7C%20Web-green)](https://gitcode.com/badhope/fogsea-survival/releases)
[![Test](https://img.shields.io/badge/tests-75%2F75-brightgreen)](packages/core)
[![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](package.json)

## 📖 项目简介

**雾海生存**（FogSea Survival）是一款受热门网络小说启发的文字生存策略游戏。全球数十亿人类被卷入神秘的迷雾世界，每个人从一个小木屋开始，在充满危险的未知环境中艰难求生。

### 🎮 核心特色

- **🎲 开局天赋三选一** - S/A/B 分级 9 天赋，加权抽取，build 由选择铸成
- **⏳ 行动点日循环** - 每天 3 点行动力：搜寻/休整/加固/夜巡狩猎，资源分配即策略
- **⚔️ 回合制战斗** - 野外遭遇 + 主动狩猎，击杀掉落、XP、商城积分
- **🎒 物品自动升级** - 使用累积熟练度，Lv 提升交易价值（致敬《我的物品能自动升级》）
- **🏆 幸存者排行榜** - 162 人排位不进则退，满配可冲前三
- **🌦️ 世界等级 + 天灾** - D7/15/30/50/80 递进压力，天灾结算奖惩（基地/防御/储备判定）
- **👥 NPC 羁绊** - 朵朵/老K/林医生/鼠王/救援队/结晶之声，6 条支线共同经历换好感
- **📅 每日签到 + 成就** - 7 天周期大奖，12 枚跨周目成就
- **📖 结局图鉴** - 14 结局跨周目收集
- **🏗️ 基地建设** - 5 级升级路线，产出直入生存资源
- **💰 经济交易** - 商人 NPC、动态定价、以物易物

## 📱 下载安装（安卓）

1. 前往 Releases 页面下载 `FogSeaSurvival-v0.4.2-debug.apk`（约 4.4MB）：
   - GitHub：https://github.com/Morningstar202604/fogsea-survival/releases
   - Gitee：https://gitee.com/badhope/fogsea-survival/releases
   - GitCode：https://gitcode.com/badhope/fogsea-survival/releases
2. 允许安装未知来源应用后安装
3. 离线可玩，进度保存在本机

> Web 版仅作开发测试壳，功能与 APK 同步。

## 🚀 快速开始

### 环境要求

- Node.js >= 20
- pnpm >= 11

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

访问 `http://localhost:5173` 开始游戏

### 构建生产版本

```bash
pnpm build
```

### 运行测试

```bash
pnpm test
```

## 📦 项目结构

```
fogsea-survival/
├── apps/
│   └── web/                    # Vue3 Web 前端应用
│       ├── src/
│       │   ├── components/     # UI 组件
│       │   ├── game/          # 游戏逻辑 Hook
│       │   └── views/         # 页面视图
│       └── package.json
├── packages/
│   └── core/                   # 核心游戏引擎
│       ├── src/
│       │   ├── engine.ts      # 游戏主引擎
│       │   ├── types.ts       # TypeScript 类型定义
│       │   ├── resources.ts   # 资源管理系统
│       │   ├── content/       # 游戏内容数据
│       │   └── dice.ts        # 掷骰检定系统
│       └── package.json
├── README.md
└── package.json                # Monorepo 根配置
```

## 🎯 游戏机制

### 基础生存

- **四维属性**: 力量、敏捷、智力、幸运
- **六维指标**: 生命、饥饿、口渴、温暖、理智、体力
- **昼夜循环**: 白天探索，夜晚防守
- **天气系统**: 影响探索效率和怪物强度

### 基地建设

```
茅草屋 → 木屋 → 石屋 → 堡垒 → 山谷基地
  ↓       ↓      ↓      ↓       ↓
木刺    栅栏   连弩塔  预警系统  农田工坊
```

### 技能树系统

- **科技系**: 武器制作、建筑升级、自动化生产
- **修仙系**: 符箓制作、灵力修炼、法术战斗
- **通用系**: 探索加速、交易精通、生存专家

### 经济系统

- **初期**: 以物易物（木材换食物）
- **中期**: 商城积分（击杀怪物获得）
- **后期**: 自定义货币（如"乌木块"内部流通）

## 📚 灵感来源

本项目受以下热门全民求生小说启发：

1. **《全民迷雾求生》** - 迷雾世界观、小木屋开局
2. **《全民求生：我的物品能自动升级》** - 物品升级机制、经济垄断
3. **《全球冰封：我打造了末日安全屋》** - 基地建设、物资囤积
4. **《废土求生：我的避难所能招募玩家》** - NPC招募、势力建设

## 🛠️ 技术栈

- **前端框架**: Vue 3 (Composition API)
- **构建工具**: Vite
- **语言**: TypeScript
- **包管理**: pnpm workspace
- **移动端**: Capacitor (Android APK)
- **测试**: Vitest

## 📝 开发指南

### 添加新场景

编辑 `packages/core/src/content/full.ts`，按照现有格式添加新的场景节点。

### 创建新技能

在 `packages/core/src/types.ts` 中扩展 `SkillTreeState` 接口，然后在引擎中实现技能效果。

### 调整平衡性

修改 `packages/core/src/resources.ts` 中的资源消耗速率和 `packages/core/src/engine.ts` 中的掉落概率。

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 [Apache License 2.0](LICENSE) 开源协议。

## 🔗 仓库镜像（三平台同步，Release 均附 APK）

- GitCode：https://gitcode.com/badhope/fogsea-survival
- GitHub：https://github.com/Morningstar202604/fogsea-survival
- Gitee：https://gitee.com/badhope/fogsea-survival

## 🙏 致谢

感谢所有为全民求生类小说创作做出贡献的作者们，是你们的想象力为本项目提供了丰富的灵感源泉。

---

**当前版本**: v0.4.2  
**最后更新**: 2026-08-30  
**状态**: 安卓发布目标，web 为测试壳

