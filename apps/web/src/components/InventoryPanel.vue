<script setup lang="ts">
import { computed } from 'vue';
import { useGame } from '../game/useGame';
import { ITEM_DATABASE } from '@fogsea/core';

const g = useGame();

const items = computed(() => {
  const st = g.state;
  if (!st) return [];
  return Object.entries(st.inventory ?? {})
    .filter(([, n]) => (n ?? 0) > 0)
    .map(([id, n]) => {
      const rec = st.itemLevels?.[id];
      const level = rec?.level ?? 1;
      const uses = rec?.uses ?? 0;
      return {
        id,
        name: ITEM_DATABASE[id]?.name ?? id,
        desc: ITEM_DATABASE[id]?.description ?? '',
        count: n,
        level,
        uses,
        need: level * 10,
        pct: Math.min(100, Math.round((uses / (level * 10)) * 100)),
      };
    })
    .sort((a, b) => b.count - a.count);
});
</script>

<template>
  <div class="inv-panel">
    <h3 class="panel-title">背包</h3>

    <div v-if="items.length === 0" class="empty">
      背包空空如也。外出搜寻，或去市场淘点物资吧。
    </div>

    <div v-else class="item-list">
      <div v-for="item in items" :key="item.id" class="item-card">
        <div class="item-head">
          <span class="item-name">{{ item.name }}</span>
          <span class="item-count">×{{ item.count }}</span>
        </div>

        <div class="lv-row">
          <span class="lv-badge" :class="{ maxed: item.level >= 5 }">Lv.{{ item.level }}</span>
          <div class="xp-track">
            <div class="xp-fill" :style="{ width: item.pct + '%' }"></div>
          </div>
          <span class="xp-text">{{ item.uses }}/{{ item.need }}</span>
        </div>

        <p class="item-desc">{{ item.desc }}</p>
      </div>
    </div>

    <p class="tip">物品每次使用都会累积熟练度；满级后交易价值更高。</p>
  </div>
</template>

<style scoped>
.inv-panel {
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

.empty {
  padding: 1.4rem;
  text-align: center;
  color: #566072;
  font-size: 0.88rem;
}

.item-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 0.6rem;
}

.item-card {
  padding: 0.6rem 0.7rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.item-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.item-name {
  font-size: 0.9rem;
  color: #dde4ee;
  font-weight: 600;
}

.item-count {
  font-size: 0.85rem;
  color: #c9a06a;
  font-weight: 600;
}

.lv-row {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.lv-badge {
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  background: rgba(79, 157, 111, 0.18);
  color: #6fc492;
  font-size: 0.72rem;
  font-weight: 700;
  white-space: nowrap;
}

.lv-badge.maxed {
  background: rgba(201, 160, 106, 0.22);
  color: #c9a06a;
}

.xp-track {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.xp-fill {
  height: 100%;
  background: #4f9d6f;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.xp-text {
  font-size: 0.7rem;
  color: #566072;
  white-space: nowrap;
}

.item-desc {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.5;
  color: #7c8799;
}

.tip {
  margin: 0;
  font-size: 0.75rem;
  color: #566072;
}
</style>
