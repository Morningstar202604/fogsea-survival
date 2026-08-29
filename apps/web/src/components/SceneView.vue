<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue';
import { useGame } from '../game/useGame';
import type { Choice } from '@survival/core';

const g = useGame();
const logBox = ref<HTMLElement | null>(null);

const hasOutcome = computed(() => !!g.state?.outcome);

watch(
  () => g.log.length,
  async () => {
    await nextTick();
    logBox.value?.scrollTo({ top: logBox.value.scrollHeight, behavior: 'smooth' });
  },
);

function pick(c: Choice): void {
  g.choose(c);
}
</script>

<template>
  <div class="scene">
    <div ref="logBox" class="log">
      <p
        v-for="(item, i) in g.log"
        :key="i"
        class="line"
        :class="'k-' + item.kind"
      >{{ item.text }}</p>
    </div>

    <div v-if="!hasOutcome" class="actions">
      <button
        v-for="(c, i) in g.viewChoices"
        :key="i"
        class="choice"
        @click="pick(c)"
      >
        <span class="ct">{{ c.text }}</span>
        <span v-if="c.hint" class="ch">{{ c.hint }}</span>
      </button>
      <p v-if="g.viewChoices.length === 0" class="none">眼前没有可做的事，等待明天的到来。</p>
    </div>

    <div v-else class="end-panel">
      <h2>{{ g.state?.outcome?.title }}</h2>
      <p class="end-desc">{{ g.state?.outcome?.desc }}</p>
      <div class="end-stats">
        <span>存活 {{ g.state?.day }} 天</span>
        <span>触发事件 {{ g.state?.runStats.eventsTriggered }} 次</span>
        <span>已解锁结局 {{ g.state?.meta.unlockedEndings.length }} 个</span>
      </div>
      <div class="end-actions">
        <button class="btn primary" @click="g.newGame(g.activeSlot)">再来一局</button>
        <button class="btn ghost" @click="g.backToMenu">返回主菜单</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scene {
  display: flex;
  flex-direction: column;
  min-height: 0;
  flex: 1;
}
.log {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  padding-right: 0.4rem;
  scroll-behavior: smooth;
}
.line {
  margin: 0;
  line-height: 1.75;
  font-size: 1rem;
  white-space: pre-wrap;
  word-break: break-word;
}
.k-scene {
  color: #e4e9f2;
}
.k-result {
  color: #a9d18e;
}
.k-daily {
  color: #7aa2c9;
  font-weight: 600;
}
.k-system {
  color: #c9a06a;
}
.actions {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.choice {
  text-align: left;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  padding: 0.75rem 0.9rem;
  color: #e4e9f2;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  transition: border-color 0.15s ease, background 0.15s ease;
}
.choice:hover {
  border-color: #7aa2c9;
  background: rgba(122, 162, 201, 0.12);
}
.choice .ct {
  font-size: 0.98rem;
}
.choice .ch {
  font-size: 0.8rem;
  color: #7c8799;
}
.none {
  color: #566072;
  font-size: 0.9rem;
  margin: 0;
}
.end-panel {
  margin-top: 1rem;
  padding: 1.2rem;
  border: 1px solid rgba(201, 160, 106, 0.4);
  border-radius: 10px;
  background: rgba(201, 160, 106, 0.06);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.end-panel h2 {
  margin: 0;
  color: #c9a06a;
  letter-spacing: 0.08em;
}
.end-desc {
  margin: 0;
  line-height: 1.7;
  color: #d6cdb8;
}
.end-stats {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  font-size: 0.85rem;
  color: #8b95a7;
}
.end-actions {
  display: flex;
  gap: 0.6rem;
  margin-top: 0.4rem;
}
</style>
