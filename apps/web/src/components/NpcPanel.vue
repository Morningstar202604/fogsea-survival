<script setup lang="ts">
import { computed } from 'vue';
import { useGame } from '../game/useGame';
import { getNpcStatuses, isRecruited, getCompanionDefense, getCompanionRankBonus, COMPANION_DEFS } from '@fogsea/core';

const g = useGame();

const npcs = computed(() => {
  const st = g.state;
  if (!st) return [];
  return getNpcStatuses(st).map((n) => {
    const def = COMPANION_DEFS.find((c) => c.id === n.id);
    return { ...n, recruited: isRecruited(st, n.id), defense: def?.defense ?? 0, rankBonus: def?.rankBonus ?? 0 };
  });
});

const squad = computed(() => {
  const st = g.state;
  if (!st) return { count: 0, defense: 0, rank: 0 };
  const recruited = getNpcStatuses(st).filter((n) => isRecruited(st, n.id));
  return { count: recruited.length, defense: getCompanionDefense(st), rank: getCompanionRankBonus(st) };
});

function canRecruit(favor: number, recruited: boolean): boolean {
  return !recruited && favor >= 30;
}

function recruit(npcId: string): void {
  g.recruit?.(npcId);
}
</script>

<template>
  <div class="npc-panel">
    <h3 class="panel-title">同伴羁绊</h3>
    <p class="panel-note">在支线中与他们同行，羁绊会随共同经历加深。羁绊达到「信赖」即可邀请入队——同伴提供每日帮助，并在兽潮时协防（当前队伍：{{ squad.count }} 人 · 协防 {{ squad.defense }} · 声望 +{{ squad.rank }}）。</p>

    <div class="npc-list">
      <div v-for="npc in npcs" :key="npc.id" class="npc-card" :class="{ done: npc.lineDone }">
        <div class="npc-head">
          <span class="npc-name">{{ npc.name }}</span>
          <span class="npc-title">{{ npc.title }}</span>
          <span class="npc-level" :class="{ max: npc.favor >= 80 }">{{ npc.levelName }}</span>
        </div>

        <div class="favor-row">
          <div class="favor-track">
            <div class="favor-fill" :style="{ width: npc.favor + '%' }"></div>
          </div>
          <span class="favor-num">{{ npc.favor }}</span>
        </div>

        <p class="npc-desc">{{ npc.description }}</p>

        <div class="npc-foot">
          <span v-if="npc.recruited" class="joined-badge">✓ 已入队（协防 {{ npc.defense }} · 声望 +{{ npc.rankBonus }}）</span>
          <button
            v-else-if="canRecruit(npc.favor, npc.recruited)"
            class="recruit-btn"
            @click="recruit(npc.id)"
          >邀请加入（协防 {{ npc.defense }}）</button>
          <span v-else class="hint-badge">好感达 30 可邀请</span>
          <span v-if="npc.lineDone" class="done-badge">✓ 支线已完结</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.npc-panel {
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

.panel-note {
  margin: 0;
  font-size: 0.8rem;
  color: #566072;
}

.npc-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.npc-card {
  padding: 0.7rem 0.8rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.npc-card.done {
  border-color: rgba(111, 196, 146, 0.35);
}

.npc-head {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}

.npc-name {
  font-size: 0.95rem;
  color: #e4e9f2;
  font-weight: 700;
}

.npc-title {
  flex: 1;
  font-size: 0.75rem;
  color: #7aa2c9;
}

.npc-level {
  font-size: 0.72rem;
  padding: 0.12rem 0.45rem;
  border-radius: 4px;
  background: rgba(122, 162, 201, 0.15);
  color: #7aa2c9;
  font-weight: 600;
}

.npc-level.max {
  background: rgba(201, 160, 106, 0.22);
  color: #c9a06a;
}

.favor-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.favor-track {
  flex: 1;
  height: 7px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.favor-fill {
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, #7aa2c9, #6fc492);
  transition: width 0.3s ease;
}

.favor-num {
  font-size: 0.72rem;
  color: #8b95a7;
  width: 2rem;
  text-align: right;
}

.npc-desc {
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.6;
  color: #8b95a7;
}

.done-badge {
  align-self: flex-start;
  font-size: 0.72rem;
  color: #6fc492;
}
.npc-foot {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.joined-badge {
  font-size: 0.72rem;
  color: #6fc492;
  font-weight: 600;
}
.recruit-btn {
  padding: 0.35rem 0.7rem;
  border-radius: 6px;
  border: 1px solid rgba(111, 196, 146, 0.5);
  background: rgba(111, 196, 146, 0.12);
  color: #6fc492;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
}
.recruit-btn:hover {
  background: rgba(111, 196, 146, 0.22);
}
.hint-badge {
  font-size: 0.7rem;
  color: #566072;
}
</style>
