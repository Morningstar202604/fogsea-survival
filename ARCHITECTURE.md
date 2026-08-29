# 雾海生存 v2.0 架构设计文档

## 📋 目录

- [系统概览](#系统概览)
- [核心模块](#核心模块)
- [数据流设计](#数据流设计)
- [扩展指南](#扩展指南)

---

## 系统概览

### 整体架构图

```
┌─────────────────────────────────────────────────┐
│                  Web Frontend (Vue3)             │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │ Game UI  │ │ Base UI  │ │ Skill Tree UI    │ │
│  └────┬─────┘ └────┬─────┘ └────────┬─────────┘ │
│       │            │                 │           │
│  ┌────┴────────────┴─────────────────┴─────────┐ │
│  │         useGame() - Reactivity Hook          │ │
│  └──────────────────┬──────────────────────────┘ │
└─────────────────────┼────────────────────────────┘
                      │ IPC / State Sync
┌─────────────────────┼────────────────────────────┐
│              Core Engine (TypeScript)             │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │ World    │ │ Survival │ │ Base Building    │ │
│  │ System   │ │ System   │ │ System           │ │
│  └────┬─────┘ └────┬─────┘ └────────┬─────────┘ │
│       │            │                 │           │
│  ┌────┴────────────┴─────────────────┴─────────┐ │
│  │         GameState (Immutable State)          │ │
│  └──────────────────┬──────────────────────────┘ │
│                     │                             │
│  ┌──────────────────┴──────────────────────────┐ │
│  │         Content Pack (JSON Data)             │ │
│  └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

---

## 核心模块

### 1. WorldSystem（世界系统）

**职责**: 管理游戏世界的生成、迷雾扩散、区域探索

```typescript
interface WorldSystem {
  // 生成初始世界地图
  generateWorld(seed: number): WorldMap;

  // 驱散迷雾（5×5米范围）
  disperseFog(state: GameState, direction: Direction): ExplorationResult;

  // 获取当前区域信息
  getCurrentArea(state: GameState): AreaInfo;

  // 检查区域危险等级
  getDangerLevel(areaId: string): number;
}
```

**关键特性**:
- 程序化地图生成（基于种子）
- 动态迷雾半径扩展
- 区域难度梯度设计
- 随机资源点分布

---

### 2. SurvivalSystem（生存系统）

**职责**: 管理玩家的六维生存指标和每日消耗

```typescript
interface SurvivalSystem {
  // 应用每日资源消耗
  applyDailyConsumption(state: GameState): ConsumptionResult;

  // 检查生存状态（是否死亡）
  checkSurvivalStatus(state: GameState): SurvivalStatus;

  // 补充资源（进食/饮水等）
  replenishResource(state: GameState, resource: ResourceKey, amount: number): void;

  // 计算环境对生存的影响（温度、天气等）
  calculateEnvironmentalImpact(state: GameState): EnvironmentalEffect;
}
```

**六维指标**:
- **Health (生命)**: 归零即死亡，可通过医疗物品恢复
- **Hunger (饥饿)**: 随时间上升，过高会持续扣血
- **Thirst (口渴)**: 随时间上升，过高会加速扣血
- **Warmth (温暖)**: 夜间/寒冷天气下降，过低会降低属性
- **Sanity (理智)**: 迷雾中持续下降，过低会产生幻觉事件
- **Energy (体力)**: 行动消耗，过低无法进行高强度活动

---

### 3. BaseBuildingSystem（基地建设系统）

**职责**: 管理避难所的升级、建筑放置、防御设施

```typescript
interface BaseBuildingSystem {
  // 升级避难所
  upgradeBase(state: GameState): UpgradeResult;

  // 放置建筑
  placeStructure(state: GameState, structure: StructureDef, position: Position): PlacementResult;

  // 建造防御设施
  buildDefense(state: GameState, defense: DefenseDef): BuildResult;

  // 计算基地总防御力
  calculateBaseDefense(state: GameState): DefensePower;

  // 处理兽潮攻击
  handleBeastWave(state: GameState, waveLevel: number): WaveResult;
}
```

**升级路线**:
```
Level 1: 茅草屋 (初始)
  ├─ 容量: 50格存储
  └─ 防御: 无

Level 2: 木屋
  ├─ 容量: 100格存储
  ├─ 解锁: 木刺陷阱、简易栅栏
  └─ 需求: 木材×200, 石材×50

Level 3: 石屋
  ├─ 容量: 200格存储
  ├─ 解锁: 连弩塔楼、预警系统
  └─ 需求: 石材×500, 金属×100

Level 4: 堡垒
  ├─ 容量: 500格存储
  ├─ 解锁: 城墙、箭塔、农田
  └─ 需求: 石材×1500, 金属×500, 图纸×5

Level 5: 山谷基地
  ├─ 容量: 无限存储
  ├─ 解锁: 所有高级建筑
  └─ 需求: 完成主线任务"占领天险"
```

---

### 4. CombatSystem（战斗系统）

**职责**: 处理玩家与怪物的战斗、战利品掉落

```typescript
interface CombatSystem {
  // 发起战斗
  initiateCombat(state: GameState, monster: MonsterDef): CombatSession;

  // 执行攻击动作
  performAttack(session: CombatSession, action: CombatAction): AttackResult;

  // 计算伤害
  calculateDamage(attacker: Combatant, defender: Combatant): DamageInfo;

  // 处理战利品掉落
  processLootDrop(monster: MonsterDef, playerLuck: number): LootTable;
}
```

**战斗流程**:
```
1. 遭遇怪物 → 显示怪物信息（等级、血量、技能）
2. 选择行动 → 攻击/防御/使用道具/逃跑
3. 掷骰检定 → d100 vs 怪物闪避
4. 计算伤害 → (攻击力 × 技能系数) - 防御力
5. 怪物反击 → AI 选择行动
6. 循环直到一方死亡或逃跑成功
7. 结算战利品 → 根据怪物等级和幸运值掉落
```

---

### 5. SkillTreeSystem（技能树系统）

**职责**: 管理技能解锁、升级、专精选择

```typescript
interface SkillTreeSystem {
  // 解锁技能
  unlockSkill(state: GameState, skillId: string): UnlockResult;

  // 升级技能
  levelUpSkill(state: GameState, skillId: string): LevelUpResult;

  // 选择专精方向
  chooseSpecialization(state: GameState, spec: Specialization): SpecResult;

  // 计算技能加成
  calculateSkillBonus(state: GameState): SkillBonuses;
}
```

**技能树结构**:
```
科技系 (Technology)
├─ 武器大师
│  ├─ Lv1: 武器伤害 +10%
│  ├─ Lv2: 解锁高级武器图纸
│  └─ Lv3: 武器耐久消耗 -50%
├─ 建筑专家
│  ├─ Lv1: 建筑成本 -10%
│  ├─ Lv2: 解锁自动化生产
│  └─ Lv3: 建筑速度 +100%
└─ 交易大亨
   ├─ Lv1: 交易手续费 -20%
   ├─ Lv2: 解锁市场定价权
   └─ Lv3: 可发行自定义货币

修仙系 (Cultivation)
├─ 符箓师
│  ├─ Lv1: 解锁基础符箓制作
│  ├─ Lv2: 符箓效果 +50%
│  └─ Lv3: 解锁高级符箓
├─ 灵力修炼
│  ├─ Lv1: 最大灵力 +100
│  ├─ Lv2: 灵力恢复速度 +50%
│  └─ Lv3: 解锁法术战斗
└─ 炼器师
   ├─ Lv1: 装备强化成功率 +20%
   ├─ Lv2: 解锁附魔系统
   └─ Lv3: 装备品质自动提升

通用系 (General)
├─ 探索者
│  ├─ Lv1: 迷雾驱散范围 +2米
│  ├─ Lv2: 移动速度 +20%
│  └─ Lv3: 发现隐藏宝箱概率 +10%
├─ 生存专家
│  ├─ Lv1: 资源消耗 -10%
│  ├─ Lv2: 自然恢复速度 +30%
│  └─ Lv3: 免疫负面环境影响
└─ 幸运儿
   ├─ Lv1: 幸运值 +5
   ├─ Lv2: 暴击率 +10%
   └─ Lv3: 稀有掉落概率 +15%
```

---

### 6. EconomySystem（经济系统）

**职责**: 管理货币流通、市场交易、商人NPC

```typescript
interface EconomySystem {
  // 购买物品
  purchaseItem(state: GameState, itemId: string, quantity: number): PurchaseResult;

  // 出售物品
  sellItem(state: GameState, itemId: string, quantity: number): SaleResult;

  // 更新市场价格
  updateMarketPrices(state: GameState): PriceUpdate;

  // 发行自定义货币
  issueCustomCurrency(state: GameState, currencyName: string, amount: number): IssueResult;

  // 处理玩家间交易
  processPlayerTrade(trade: TradeOffer): TradeResult;
}
```

**经济演进**:
```
阶段1: 以物易物
  - 木材换食物 (比例 2:1)
  - 石材换工具 (比例 3:1)

阶段2: 商城积分
  - 击杀怪物获得积分
  - 系统固定价格收购/出售

阶段3: 玩家市场
  - 自由定价
  - 供需关系影响价格波动

阶段4: 货币发行
  - 强者发行"乌木块"等自定义货币
  - 建立商会控制市场
  - 垄断特定商品交易
```

---

### 7. NarrativeSystem（叙事系统）

**职责**: 管理主线剧情、支线任务、随机事件

```typescript
interface NarrativeSystem {
  // 加载剧本线
  loadStoryline(storylineId: string): StorylineDef;

  // 触发支线任务
  triggerSideQuest(state: GameState, questId: string): QuestActivation;

  // 抽取随机事件
  drawRandomEvent(state: GameState): RandomEventDef | null;

  // 检查结局条件
  checkEndingCondition(state: GameState): EndingDef | null;
}
```

**剧情结构**:
```
主线剧情 (3条可选开局)
├─ 救援线: 寻找失散的家人，揭开迷雾真相
├─ 结晶线: 收集神秘结晶，解锁超凡力量
└─ 生存线: 纯粹求生，建立最强基地

支线任务 (触发式)
├─ 朵朵线: 救助神秘女孩，获得特殊伙伴
├─ 联盟线: 组建幸存者联盟，对抗敌对势力
└─ 遗迹线: 探索古代遗迹，获取失落科技

随机事件池 (100+个)
├─ 资源类: 发现宝箱、遭遇商人、天气突变
├─ 战斗类: 怪物袭击、PVP遭遇、BOSS挑战
├─ 剧情类: NPC求助、道德抉择、隐藏线索
└─ 灾难类: 兽潮、瘟疫、地震、极寒
```

---

## 数据流设计

### 状态更新流程

```
用户操作 (UI)
    ↓
useGame Hook
    ↓
Engine.applyChoice()
    ↓
┌─────────────────────────┐
│  1. 验证前置条件         │
│  2. 应用效果列表         │
│     - 资源增减           │
│     - 标志设置           │
│     - 物品获得           │
│     - 掷骰检定           │
│  3. 更新场景跳转         │
│  4. 检查结局条件         │
│  5. 保存状态快照         │
└─────────────────────────┘
    ↓
GameState (Immutable)
    ↓
Vue Reactivity Update
    ↓
UI Re-render
```

### 存档系统设计

```typescript
interface SaveSystem {
  // 保存到本地存储
  saveToLocalStorage(state: GameState): void;

  // 从本地存储加载
  loadFromLocalStorage(): GameState | null;

  // 导出存档文件
  exportSaveFile(state: GameState): SaveFileData;

  // 导入存档文件
  importSaveFile(data: SaveFileData): GameState;

  // 云存档（未来扩展）
  syncToCloud(state: GameState): Promise<void>;
}
```

**存档格式**:
```json
{
  "version": "2.0.0",
  "timestamp": 1724918400000,
  "playtime": 3600,
  "state": {
    "day": 15,
    "resources": {...},
    "base": {...},
    "skills": {...},
    ...
  },
  "checksum": "abc123def456"
}
```

---

## 扩展指南

### 添加新建筑类型

1. 在 `packages/core/src/types.ts` 中定义建筑接口：
```typescript
export interface NewStructureDef {
  id: string;
  name: string;
  description: string;
  cost: Record<string, number>;
  effects: StructureEffect[];
  prerequisites?: string[]; // 前置建筑ID
}
```

2. 在 `packages/core/src/content/structures.ts` 中添加数据：
```typescript
export const NEW_STRUCTURE: NewStructureDef = {
  id: 'windmill',
  name: '风车磨坊',
  description: '自动生产面粉',
  cost: { wood: 100, stone: 50 },
  effects: [
    { type: 'production', resource: 'flour', rate: 10 } // 每天10单位
  ],
  prerequisites: ['workbench']
};
```

3. 在引擎中注册建筑逻辑：
```typescript
// packages/core/src/engine.ts
registerStructure(NEW_STRUCTURE);
```

### 添加新技能

1. 定义技能效果：
```typescript
export const NEW_SKILL: SkillDef = {
  id: 'master_crafter',
  name: '工匠大师',
  tree: 'technology',
  maxLevel: 3,
  effects: [
    { level: 1, bonus: { craftingSpeed: 0.2 } },
    { level: 2, bonus: { craftingSpeed: 0.5, unlockBlueprints: ['advanced'] } },
    { level: 3, bonus: { craftingSpeed: 1.0, autoRepair: true } }
  ]
};
```

2. 在技能树UI中渲染：
```vue
<!-- apps/web/src/components/SkillTree.vue -->
<SkillNode :skill="NEW_SKILL" />
```

### 添加新随机事件

1. 创建事件定义：
```typescript
export const MYSTERIOUS_MERCHANT: RandomEventDef = {
  id: 'mysterious_merchant',
  weight: 15,
  minDay: 5,
  maxTriggers: 3,
  text: '一个神秘的商人出现在你的营地...',
  choices: [
    {
      id: 'buy_rare_item',
      text: '购买稀有物品 (花费 100 积分)',
      effects: [
        { kind: 'resource', resource: 'energy', delta: -100 },
        { kind: 'item', item: 'rare_crystal', amount: 1 }
      ],
      next: '__return__'
    },
    {
      id: 'decline',
      text: '拒绝交易',
      effects: [],
      next: '__return__'
    }
  ]
};
```

2. 添加到事件池：
```typescript
// packages/core/src/content/events.ts
export const EVENT_POOL = [
  ...EXISTING_EVENTS,
  MYSTERIOUS_MERCHANT
];
```

---

## 性能优化建议

1. **懒加载内容数据**: 大型剧本线和事件池按需加载
2. **状态快照压缩**: 使用 LZ-string 压缩存档数据
3. **虚拟滚动**: 大量物品/技能列表使用虚拟滚动
4. **Web Worker**: 复杂计算（如地图生成）移至 Worker
5. **缓存策略**: 频繁访问的数据使用 Map 缓存

---

## 测试策略

```typescript
// 单元测试示例
describe('BaseBuildingSystem', () => {
  test('should upgrade base from hut to wooden house', () => {
    const state = createTestState();
    state.base.level = 1;
    state.inventory.wood = 200;
    state.inventory.stone = 50;

    const result = upgradeBase(state);

    expect(result.success).toBe(true);
    expect(state.base.level).toBe(2);
    expect(state.inventory.wood).toBe(0);
    expect(state.inventory.stone).toBe(0);
  });
});

// 集成测试示例
describe('Full Game Loop', () => {
  test('player should survive 10 days with proper resource management', () => {
    const state = createInitialState(CONTENT_PACK);
    const rng = new Rng(42);

    for (let day = 1; day <= 10; day++) {
      // 模拟玩家决策
      makeOptimalChoices(state);
      runDaily(CONTENT_PACK, state, rng);

      expect(state.resources.health.current).toBeGreaterThan(0);
    }
  });
});
```

---

**文档版本**: v2.0.0-alpha.1  
**最后更新**: 2026-08-29  
**维护者**: fogsea-survival team
