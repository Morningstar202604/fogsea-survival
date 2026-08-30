<script setup lang="ts">
import { computed } from 'vue';
import { useGame } from '../game/useGame';
import { STRUCTURE_DEFS, BASE_LEVEL_CONFIG, ITEM_DATABASE } from '@fogsea/core';

const g = useGame();

const baseInfo = computed(() => g.state?.base ?? null);

const structureGroups = computed(() => {
  const base = baseInfo.value;
  if (!base) return null;

  const production: Array<{ id: string; label: string; count: number }> = [];
  const defense: Array<{ id: string; label: string; count: number }> = [];
  const utility: Array<{ id: string; label: string; count: number }> = [];

  const counts = new Map<string, number>();
  for (const s of base.structures ?? []) {
    counts.set(s.structureId, (counts.get(s.structureId) ?? 0) + 1);
  }
  for (const [id, count] of counts) {
    const item = { id, label: STRUCTURE_DEFS[id]?.name ?? id, count };
    if (STRUCTURE_DEFS[id]?.effects?.some((e) => e.type === 'production')) {
      production.push(item);
    } else if (['wooden_spike', 'fence', 'ballista_tower', 'wall', 'watchtower'].includes(id)) {
      defense.push(item);
    } else {
      utility.push(item);
    }
  }

  const daily: Record<string, number> = {};
  for (const s of base.structures ?? []) {
    for (const e of STRUCTURE_DEFS[s.structureId]?.effects ?? []) {
      if (e.type === 'production' && e.target) {
        daily[e.target] = (daily[e.target] ?? 0) + e.value;
      }
    }
  }

  return { production, defense, utility, daily };
});

const buildOptions = computed(() => {
  const base = baseInfo.value;
  const st = g.state;
  if (!base || !st) return [];
  const cap = BASE_LEVEL_CONFIG[base.level]?.maxStructures ?? 0;
  return Object.values(STRUCTURE_DEFS).map((def) => {
    const levelOk = base.level >= def.minBaseLevel;
    const spaceOk = base.structures.length + def.space <= cap;
    const lack = Object.entries(def.cost).filter(([k, n]) => (st.inventory?.[k] ?? 0) < n);
    const affordable = lack.length === 0;
    return {
      id: def.id,
      name: def.name,
      desc: def.description,
      costText: Object.entries(def.cost).map(([k, n]) => `${ITEM_DATABASE[k]?.name ?? k}×${n}`).join('、'),
      levelOk,
      spaceOk,
      affordable,
      buildable: levelOk && spaceOk && affordable,
      minBaseLevel: def.minBaseLevel,
    };
  });
});

const capacityInfo = computed(() => {
  const base = baseInfo.value;
  if (!base) return null;
  const cap = BASE_LEVEL_CONFIG[base.level]?.maxStructures ?? 0;
  return { used: base.structures.length, cap, defense: base.totalDefense };
});

function getBaseLevelLabel(level: number): string {
  const labels = ['简陋小屋', '木屋', '石屋', '堡垒', '山谷基地'];
  return labels[level - 1] || `Lv.${level}`;
}

function getNextBaseLevel(): string {
  if (!baseInfo.value) return '';
  const next = baseInfo.value.level + 1;
  const labels = ['简陋小屋', '木屋', '石屋', '堡垒', '山谷基地'];
  return labels[next - 1] || '已满级';
}
</script>

<template>
  <div v-if="baseInfo" class="base-panel">
    <h3 class="panel-title">基地建设</h3>

    <div class="base-header">
      <div class="base-level">
        <span class="label">当前等级:</span>
        <span class="value">{{ getBaseLevelLabel(baseInfo.level) }}</span>
      </div>
      <div class="base-defense">
        <span class="label">防御值:</span>
        <span class="value">{{ baseInfo.totalDefense }}</span>
      </div>
    </div>

    <div v-if="structureGroups" class="buildings">
      <!-- 生产建筑 -->
      <div v-if="structureGroups.production.length > 0" class="building-category">
        <h4 class="category-title">生产设施</h4>
        <div class="building-list">
          <div v-for="b in structureGroups.production" :key="b.id" class="building-item">
            <span class="building-name">{{ b.label }}</span>
            <span class="building-count">×{{ b.count }}</span>
          </div>
        </div>
      </div>

      <!-- 防御建筑 -->
      <div v-if="structureGroups.defense.length > 0" class="building-category">
        <h4 class="category-title">防御设施</h4>
        <div class="building-list">
          <div v-for="b in structureGroups.defense" :key="b.id" class="building-item">
            <span class="building-name">{{ b.label }}</span>
            <span class="building-count">×{{ b.count }}</span>
          </div>
        </div>
      </div>

      <!-- 功能建筑 -->
      <div v-if="structureGroups.utility.length > 0" class="building-category">
        <h4 class="category-title">功能设施</h4>
        <div class="building-list">
          <div v-for="b in structureGroups.utility" :key="b.id" class="building-item">
            <span class="building-name">{{ b.label }}</span>
            <span class="building-count">×{{ b.count }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="structureGroups && Object.keys(structureGroups.daily).length > 0" class="production-info">
      <h4 class="section-title">每日产出</h4>
      <div class="production-grid">
        <div v-for="(amount, resource) in structureGroups.daily" :key="resource" class="production-item">
          <span class="resource-label">{{ resource }}</span>
          <span class="resource-amount">+{{ amount }}</span>
        </div>
      </div>
    </div>

    <div v-if="capacityInfo" class="cap-row">
      <span>设施 {{ capacityInfo.used }}/{{ capacityInfo.cap }}</span>
      <span>防御工事 {{ capacityInfo.defense }}</span>
    </div>

    <!-- 建造清单 -->
    <div v-if="buildOptions.length > 0" class="build-section">
      <h4 class="section-title">建造清单</h4>
      <div class="build-list">
        <div
          v-for="opt in buildOptions"
          :key="opt.id"
          class="build-card"
          :class="{ ok: opt.buildable }"
        >
          <div class="build-head">
            <span class="build-name">{{ opt.name }}</span>
            <span class="build-cost">{{ opt.costText || '免费' }}</span>
          </div>
          <p class="build-desc">{{ opt.desc }}</p>
          <div class="build-foot">
            <span v-if="!opt.levelOk" class="build-req">需要基地 {{ opt.minBaseLevel }} 级</span>
            <span v-else-if="!opt.spaceOk" class="build-req">设施空间不足</span>
            <span v-else-if="!opt.affordable" class="build-req">材料不足</span>
            <button v-else class="build-btn" @click="g.build?.(opt.id)">建造</button>
          </div>
        </div>
      </div>
    </div>

    <div class="base-actions">
      <button class="btn upgrade" @click="g.upgradeBase?.()">
        升级基地 → {{ getNextBaseLevel() }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.base-panel {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.panel-title {
  margin: 0;
  font-size: 1rem;
  color: #e4e9f2;
  font-weight: 600;
}

.base-header {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 6px;
}

.base-level, .base-defense {
  display: flex;
  gap: 0.4rem;
  align-items: center;
  font-size: 0.85rem;
}

.base-level .label, .base-defense .label {
  color: #8b95a7;
}

.base-level .value, .base-defense .value {
  color: #e4e9f2;
  font-weight: 600;
}

.buildings {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.building-category {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.category-title {
  margin: 0;
  font-size: 0.85rem;
  color: #aeb7c7;
  font-weight: 600;
}

.building-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
}

.building-item {
  display: flex;
  justify-content: space-between;
  padding: 0.35rem 0.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 4px;
  font-size: 0.82rem;
}

.building-name {
  color: #cdd6e4;
}

.building-count {
  color: #4f9d6f;
  font-weight: 600;
}

.production-info {
  padding: 0.5rem;
  background: rgba(79, 157, 111, 0.08);
  border-radius: 6px;
}

.section-title {
  margin: 0 0 0.4rem 0;
  font-size: 0.85rem;
  color: #aeb7c7;
  font-weight: 600;
}

.production-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.3rem;
}

.production-item {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
}

.resource-label {
  color: #8b95a7;
}

.resource-amount {
  color: #4f9d6f;
  font-weight: 600;
}

.base-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.3rem;
}

.btn {
  flex: 1;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 0.82rem;
  transition: all 0.15s ease;
}

.btn.upgrade {
  background: #2f6f9f;
  color: #fff;
}

.btn.upgrade:hover {
  background: #357eaf;
}

.btn.build {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.15);
  color: #aeb7c7;
}

.btn.build:hover {
  border-color: #7aa2c9;
  color: #e4e9f2;
}
.cap-row {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 0.5rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 6px;
  font-size: 0.78rem;
  color: #8b95a7;
}
.build-section {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.build-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 0.5rem;
}
.build-card {
  padding: 0.55rem 0.6rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.build-card.ok {
  border-color: rgba(111, 196, 146, 0.4);
}
.build-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.3rem;
}
.build-name {
  font-size: 0.85rem;
  color: #dde4ee;
  font-weight: 600;
}
.build-cost {
  font-size: 0.68rem;
  color: #c9a06a;
  text-align: right;
}
.build-desc {
  margin: 0;
  font-size: 0.7rem;
  color: #7c8799;
  line-height: 1.5;
}
.build-foot {
  display: flex;
  justify-content: flex-end;
  min-height: 1.6rem;
  align-items: center;
}
.build-req {
  font-size: 0.68rem;
  color: #c0504d;
}
.build-btn {
  padding: 0.25rem 0.7rem;
  border-radius: 5px;
  border: none;
  background: #4f9d6f;
  color: #fff;
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
}
.build-btn:hover {
  background: #5ab87e;
}
</style>
