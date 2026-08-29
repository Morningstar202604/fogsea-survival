# 雾海生存 FogSea Survival v2.0

> 基于热门小说机制重构的迷雾求生策略游戏

[![Version](https://img.shields.io/badge/version-2.0.0--alpha.1-blue)](https://github.com/your-repo/fogsea-survival)
[![License](https://img.shields.io/badge/license-Apache--2.0-green)](LICENSE)
[![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen)](package.json)

## 📖 项目简介

**雾海生存**（FogSea Survival）是一款受热门网络小说启发的文字生存策略游戏。全球数十亿人类被卷入神秘的迷雾世界，每个人从一个小木屋开始，在充满危险的未知环境中艰难求生。

### 🎮 核心特色（v2.0 新增）

- **🏗️ 基地建设系统** - 从小木屋到山谷堡垒的完整升级路线
- **⚔️ 技能树系统** - 科技/修仙双分支专精，自由搭配战斗风格
- **💰 经济交易系统** - 玩家间自由交易、市场定价、货币发行
- **🌫️ 迷雾探索** - 5×5米范围驱散，发现资源与危险并存
- **📖 多线剧情** - 主线+支线+随机事件，20+种不同结局
- **👥 社交系统** - 联盟建立、领地争夺、PVP/PVE玩法

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

## 🙏 致谢

感谢所有为全民求生类小说创作做出贡献的作者们，是你们的想象力为本项目提供了丰富的灵感源泉。

---

**当前版本**: v2.0.0-alpha.1  
**最后更新**: 2026-08-29  
**状态**: 重构进行中 🚧
