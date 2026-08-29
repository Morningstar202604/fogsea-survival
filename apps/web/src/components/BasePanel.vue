<script setup lang="ts">
import { computed } from 'vue';
import { useGame } from '../game/useGame';
import type { BuildingType } from '@fogsea/core';

const g = useGame();

const baseInfo = computed(() => {
  const st = g.state;
  if (!st || !st.base) return null;
  return {
    level: st.base.level,
    defense: st.base.defense,
    structures: st.base.structures || {},
    dailyProduction: st.base.dailyProduction || {},
  };
});

const buildingLabels: Record<BuildingType, string> = {
  farm: '农田',
  well: '水井',
  workshop: '工坊',
  watchtower: '瞭望塔',
  wall: '围墙',
  storage: '仓库',
  laboratory: '实验室',
  meditation_room: '冥想室',
  training_ground: '训练场',
  hospital: '医疗站',
  market: '市场',
  power_plant: '发电厂',
};

const structureCategories = computed(() => {
  if (!baseInfo.value) return null;
  
  const production: Array<{ type: BuildingType; count: number; label: string }> = [];
  const defense: Array<{ type: BuildingType; count: number; label: string }> = [];
  const utility: Array<{ type: BuildingType; count: number; label: string }> = [];
  
  for (const [type, count] of Object.entries(baseInfo.value.structures)) {
    const label = buildingLabels[type as BuildingType] || type;
    if (['farm', 'well', 'workshop', 'laboratory', 'meditation_room', 'training_ground', 'power_plant'].includes(type)) {
      production.push({ type: type as BuildingType, count, label });
    } else if (['watchtower', 'wall'].includes(type)) {
      defense.push({ type: type as BuildingType, count, label });
    } else {
      utility.push({ type: type as BuildingType, count, label });
    }
  }
  
  return { production, defense, utility };
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
        <span class="value">{{ baseInfo.defense }}</span>
      </div>
    </div>

    <div v-if="structureCategories" class="buildings">
      <!-- 生产建筑 -->
      <div v-if="structureCategories.production.length > 0" class="building-category">
        <h4 class="category-title">生产设施</h4>
        <div class="building-list">
          <div v-for="b in structureCategories.production" :key="b.type" class="building-item">
            <span class="building-name">{{ b.label }}</span>
            <span class="building-count">×{{ b.count }}</span>
          </div>
        </div>
      </div>

      <!-- 防御建筑 -->
      <div v-if="structureCategories.defense.length > 0" class="building-category">
        <h4 class="category-title">防御设施</h4>
        <div class="building-list">
          <div v-for="b in structureCategories.defense" :key="b.type" class="building-item">
            <span class="building-name">{{ b.label }}</span>
            <span class="building-count">×{{ b.count }}</span>
          </div>
        </div>
      </div>

      <!-- 功能建筑 -->
      <div v-if="structureCategories.utility.length > 0" class="building-category">
        <h4 class="category-title">功能设施</h4>
        <div class="building-list">
          <div v-for="b in structureCategories.utility" :key="b.type" class="building-item">
            <span class="building-name">{{ b.label }}</span>
            <span class="building-count">×{{ b.count }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="Object.keys(baseInfo.dailyProduction).length > 0" class="production-info">
      <h4 class="section-title">每日产出</h4>
      <div class="production-grid">
        <div v-for="(amount, resource) in baseInfo.dailyProduction" :key="resource" class="production-item">
          <span class="resource-label">{{ resource }}</span>
          <span class="resource-amount">+{{ amount }}</span>
        </div>
      </div>
    </div>

    <div class="base-actions">
      <button class="btn upgrade" @click="g.upgradeBase?.()">
        升级基地 → {{ getNextBaseLevel() }}
      </button>
      <button class="btn build" @click="g.openBuildMenu?.()">
        建造建筑
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
</style>
