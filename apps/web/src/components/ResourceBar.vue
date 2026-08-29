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

function tone(pct: number): string {
  if (pct <= 20) return 'critical';
  if (pct <= 50) return 'low';
  return 'ok';
}
</script>

<template>
  <div class="resbar">
    <div class="resbar-head">
      <span class="day">第 {{ g.state?.day ?? 1 }} 天</span>
      <span class="best">历史最佳 {{ g.state?.meta.bestDays ?? 0 }} 天</span>
    </div>
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
</style>
