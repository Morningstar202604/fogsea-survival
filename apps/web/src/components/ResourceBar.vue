<script setup lang="ts">
import { computed } from 'vue';
import { useGame } from '../game/useGame';
import { RESOURCE_LABELS } from '@survival/core';
import type { ResourceKey } from '@survival/core';

const g = useGame();

const order: ResourceKey[] = ['food', 'water', 'energy', 'sanity', 'health'];

const resourceList = computed(() => {
  const st = g.state;
  if (!st) return [];
  return order.map((k) => ({
    key: k,
    label: RESOURCE_LABELS[k],
    current: st.resources[k].current,
    max: st.resources[k].max,
    pct: Math.round((st.resources[k].current / st.resources[k].max) * 100),
  }));
});

const attributes = computed(() => {
  const st = g.state;
  if (!st || !st.attributes) return null;
  return st.attributes;
});

const progressionInfo = computed(() => {
  const st = g.state;
  if (!st || !st.progression) return null;
  return {
    worldTier: st.progression.currentWorldTier,
    nextTierDay: st.day + st.progression.daysToNextTier,
    skillPoints: st.skills?.totalPoints || 0,
    baseLevel: st.base?.level || 0,
    specialization: st.skills?.specialization || null,
  };
});

function tone(pct: number): string {
  if (pct <= 20) return 'critical';
  if (pct <= 50) return 'low';
  return 'ok';
}

function getTierLabel(tier: number): string {
  const labels = ['普通', '困难', '噩梦', '地狱', '深渊'];
  return labels[tier - 1] || `T${tier}`;
}

function getBaseLevelLabel(level: number): string {
  const labels = ['简陋小屋', '木屋', '石屋', '堡垒', '山谷基地'];
  return labels[level - 1] || `Lv.${level}`;
}
</script>

<template>
  <div class="resbar">
    <div class="resbar-head">
      <span class="day">第 {{ g.state?.day ?? 1 }} 天</span>
      <span class="best">历史最佳 {{ g.state?.meta.bestDays ?? 0 }} 天</span>
    </div>

    <!-- 世界等级信息 -->
    <div v-if="progressionInfo" class="progression-info">
      <div class="info-row">
        <span class="label">世界等级:</span>
        <span class="value tier">{{ getTierLabel(progressionInfo.worldTier) }}</span>
      </div>
      <div class="info-row">
        <span class="label">基地等级:</span>
        <span class="value">{{ getBaseLevelLabel(progressionInfo.baseLevel) }}</span>
      </div>
      <div class="info-row">
        <span class="label">技能点:</span>
        <span class="value points">{{ progressionInfo.skillPoints }}</span>
      </div>
      <div v-if="progressionInfo.specialization" class="info-row">
        <span class="label">专精:</span>
        <span class="value spec">{{ progressionInfo.specialization === 'tech' ? '科技' : progressionInfo.specialization === 'cultivation' ? '修炼' : '通用' }}</span>
      </div>
    </div>

    <!-- 资源条 -->
    <div v-for="r in resourceList" :key="r.key" class="res">
      <div class="res-label">
        <span>{{ r.label }}</span>
        <span class="val">{{ r.current }}/{{ r.max }}</span>
      </div>
      <div class="track">
        <div
          class="fill"
          :class="tone(r.pct)"
          :style="{ width: r.pct + '%' }"
        ></div>
      </div>
    </div>

    <!-- 属性面板 -->
    <div v-if="attributes" class="attributes-panel">
      <h4 class="attr-title">属性</h4>
      <div class="attr-grid">
        <div class="attr-item">
          <span class="attr-label">力量</span>
          <span class="attr-value">{{ attributes.strength }}</span>
        </div>
        <div class="attr-item">
          <span class="attr-label">敏捷</span>
          <span class="attr-value">{{ attributes.agility }}</span>
        </div>
        <div class="attr-item">
          <span class="attr-label">智力</span>
          <span class="attr-value">{{ attributes.intelligence }}</span>
        </div>
        <div class="attr-item">
          <span class="attr-label">幸运</span>
          <span class="attr-value">{{ attributes.luck }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.resbar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.resbar-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 0.2rem;
}
.day {
  font-size: 1rem;
  font-weight: 600;
  color: #e8edf5;
}
.best {
  font-size: 0.78rem;
  color: #566072;
}

/* 推进信息 */
.progression-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.5rem;
  background: rgba(122, 162, 201, 0.08);
  border-radius: 6px;
  margin-bottom: 0.5rem;
}
.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.82rem;
}
.info-row .label {
  color: #8b95a7;
}
.info-row .value {
  color: #e4e9f2;
  font-weight: 500;
}
.info-row .value.tier {
  color: #c9a06a;
}
.info-row .value.points {
  color: #4f9d6f;
}
.info-row .value.spec {
  color: #7aa2c9;
}

.res {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.res-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #aeb7c7;
}
.res-label .val {
  color: #7c8799;
  font-variant-numeric: tabular-nums;
}
.track {
  height: 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.07);
  overflow: hidden;
}
.fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.4s ease;
}
.fill.ok {
  background: #4f9d6f;
}
.fill.low {
  background: #c98a3d;
}
.fill.critical {
  background: #c0504d;
}

/* 属性面板 */
.attributes-panel {
  margin-top: 0.5rem;
  padding: 0.6rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
}
.attr-title {
  margin: 0 0 0.4rem 0;
  font-size: 0.85rem;
  color: #aeb7c7;
  font-weight: 600;
}
.attr-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
}
.attr-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0.5rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 4px;
}
.attr-label {
  font-size: 0.8rem;
  color: #8b95a7;
}
.attr-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: #e4e9f2;
}
</style>
