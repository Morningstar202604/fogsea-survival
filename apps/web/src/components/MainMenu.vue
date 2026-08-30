<script setup lang="ts">
import { ref } from 'vue';
import { useGame, SLOT_COUNT } from '../game/useGame';
import { drawTalentChoices, fullContent, type TalentDef } from '@fogsea/core';
import { readMeta } from '../game/storage';

const g = useGame();

// 结局图鉴（跨周目收集）
const allEndings = Object.values(fullContent.storyline.endings);
const unlockedEndings = readMeta().unlockedEndings;
const endingDex = allEndings.map((e) => ({
  id: e.id,
  title: unlockedEndings.includes(e.id) ? e.title : '？？？',
  unlocked: unlockedEndings.includes(e.id),
  category: e.category,
}));

// 开局天赋三选一：点"新游戏"先抽天赋，选定后再真正开档
const pickingFor = ref<number | null>(null);
const talentChoices = ref<TalentDef[]>([]);

const tierNames: Record<string, string> = { S: 'SSS·传说', A: 'SR·稀有', B: 'R·普通' };

function startPick(slot: number): void {
  talentChoices.value = drawTalentChoices({ next: Math.random });
  pickingFor.value = slot;
}

function confirmTalent(talent: TalentDef): void {
  if (pickingFor.value === null) return;
  g.newGame(pickingFor.value, talent.id);
  pickingFor.value = null;
}

function fmtTime(iso: string | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function slotLabel(i: number): string {
  return `存档 ${i + 1}`;
}

async function handleImport(slot: number): Promise<void> {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.qssave,.txt,application/json,text/plain';
  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;
    const raw = await file.text();
    g.importSave(raw.trim(), slot);
  };
  input.click();
}

function handleExport(): void {
  const raw = g.exportSave();
  if (!raw) return;
  const blob = new Blob([raw], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `迷雾降临_存档${g.activeSlot + 1}.qssave`;
  a.click();
  URL.revokeObjectURL(url);
}
</script>

<template>
  <div class="menu">
    <div class="menu-title">
      <h1>雾海生存</h1>
      <p class="sub">迷雾降临</p>
      <p class="desc">雾起之后，你成了这座小镇最后的活人。活下去，撑到救援来临。</p>
    </div>

    <div class="slots">
      <div v-for="i in SLOT_COUNT" :key="i" class="slot" :class="{ filled: g.slots[i - 1].state }">
        <div class="slot-head">
          <span class="slot-name">{{ slotLabel(i - 1) }}</span>
          <span v-if="g.slots[i - 1].state" class="slot-day">第 {{ g.slots[i - 1].info?.day ?? '?' }} 天</span>
        </div>
        <p v-if="g.slots[i - 1].state" class="slot-meta">
          <span v-if="g.slots[i - 1].info?.outcome">{{ g.slots[i - 1].info!.outcome!.title }}（已结束）</span>
          <span v-else>进行中</span>
          <span class="dot">·</span>
          <span>{{ fmtTime(g.slots[i - 1].info?.updatedAt) }}</span>
        </p>
        <p v-else class="slot-meta empty">空存档</p>
        <div class="slot-actions">
          <button v-if="g.slots[i - 1].state && !g.slots[i - 1].info?.outcome" class="btn primary" @click="g.continueGame(i - 1)">继续</button>
          <button v-else-if="g.slots[i - 1].state" class="btn primary" @click="startPick(i - 1)">重开</button>
          <button v-else class="btn primary" @click="startPick(i - 1)">新游戏</button>
          <button v-if="g.slots[i - 1].state" class="btn ghost" @click="handleExport">导出</button>
          <button v-if="g.slots[i - 1].state" class="btn danger" @click="g.deleteSlot(i - 1)">清空</button>
          <button class="btn ghost" @click="handleImport(i - 1)">导入</button>
        </div>
      </div>
    </div>

    <p class="hint">存档保存在本机浏览器。导出后可分享给他人继续游玩。</p>

    <!-- 结局图鉴 -->
    <div class="dex">
      <h3 class="dex-title">结局图鉴（{{ unlockedEndings.length }} / {{ allEndings.length }}）</h3>
      <div class="dex-grid">
        <span
          v-for="e in endingDex"
          :key="e.id"
          class="dex-chip"
          :class="{ unlocked: e.unlocked, good: e.unlocked && e.category === 'good', true: e.unlocked && e.category === 'true' }"
        >{{ e.title }}</span>
      </div>
    </div>

    <!-- 开局天赋三选一 -->
    <div v-if="pickingFor !== null" class="talent-mask" @click.self="pickingFor = null">
      <div class="talent-modal">
        <h2 class="talent-title">天赋觉醒</h2>
        <p class="talent-sub">雾海听见了你的名字。三选一，选定后不可更改。</p>
        <div class="talent-cards">
          <button
            v-for="t in talentChoices"
            :key="t.id"
            class="talent-card"
            :class="'tier-' + t.tier"
            @click="confirmTalent(t)"
          >
            <span class="talent-tier">{{ tierNames[t.tier] }}</span>
            <span class="talent-name">{{ t.name }}</span>
            <span class="talent-desc">{{ t.description }}</span>
          </button>
        </div>
        <button class="btn ghost reroll" @click="startPick(pickingFor)">换一批</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  padding: 2rem 1rem;
  padding-top: max(2rem, env(safe-area-inset-top));
  padding-bottom: max(2rem, env(safe-area-inset-bottom));
  box-sizing: border-box;
}
.menu-title {
  text-align: center;
}
.menu-title h1 {
  margin: 0;
  font-size: 2.6rem;
  letter-spacing: 0.3em;
  text-indent: 0.3em;
  color: #e8edf5;
}
.menu-title .sub {
  margin: 0.3rem 0 0;
  font-size: 1.05rem;
  letter-spacing: 0.5em;
  text-indent: 0.5em;
  color: #7aa2c9;
}
.menu-title .desc {
  margin: 1rem auto 0;
  max-width: 34rem;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #8b95a7;
}
.slots {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
  max-width: 34rem;
}
.slot {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  padding: 0.9rem 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}
.slot.filled {
  border-color: rgba(122, 162, 201, 0.35);
}
.slot-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.slot-name {
  font-weight: 600;
  color: #dde4ee;
}
.slot-day {
  font-size: 0.9rem;
  color: #7aa2c9;
}
.slot-meta {
  margin: 0;
  font-size: 0.85rem;
  color: #7c8799;
}
.slot-meta .dot {
  margin: 0 0.4rem;
}
.slot-meta.empty {
  color: #566072;
}
.slot-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.hint {
  font-size: 0.8rem;
  color: #566072;
}

/* === 开局天赋三选一 === */
.talent-mask {
  position: fixed;
  inset: 0;
  background: rgba(4, 8, 14, 0.82);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 60;
  padding: 1rem;
}
.talent-modal {
  width: 100%;
  max-width: 36rem;
  background: #10161f;
  border: 1px solid rgba(122, 162, 201, 0.3);
  border-radius: 14px;
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
}
.talent-title {
  margin: 0;
  font-size: 1.4rem;
  letter-spacing: 0.3em;
  text-indent: 0.3em;
  color: #e8edf5;
}
.talent-sub {
  margin: 0;
  font-size: 0.85rem;
  color: #7aa2c9;
}
.talent-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.6rem;
}
@media (max-width: 640px) {
  .talent-cards {
    grid-template-columns: 1fr;
  }
}
.talent-card {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0.9rem 0.7rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  cursor: pointer;
  transition: all 0.15s ease;
  text-align: center;
}
.talent-card:hover {
  transform: translateY(-2px);
}
.talent-card.tier-S {
  border-color: rgba(201, 160, 106, 0.65);
  background: rgba(201, 160, 106, 0.08);
}
.talent-card.tier-S:hover {
  border-color: #c9a06a;
}
.talent-card.tier-A {
  border-color: rgba(122, 162, 201, 0.55);
}
.talent-card.tier-A:hover {
  border-color: #7aa2c9;
}
.talent-card.tier-B:hover {
  border-color: #6fc492;
}
.talent-tier {
  font-size: 0.68rem;
  letter-spacing: 0.15em;
  color: #8b95a7;
}
.talent-card.tier-S .talent-tier {
  color: #c9a06a;
}
.talent-name {
  font-size: 1.05rem;
  font-weight: 700;
  color: #e8edf5;
}
.talent-desc {
  font-size: 0.75rem;
  line-height: 1.6;
  color: #8b95a7;
}
.reroll {
  align-self: center;
  padding: 0.45rem 1.4rem;
  border-radius: 8px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #aeb7c7;
  cursor: pointer;
  font-size: 0.85rem;
}
.reroll:hover {
  border-color: #7aa2c9;
  color: #e4e9f2;
}
.dex {
  width: 100%;
  max-width: 34rem;
}
.dex-title {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: #aeb7c7;
  font-weight: 600;
}
.dex-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}
.dex-chip {
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  font-size: 0.75rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #566072;
}
.dex-chip.unlocked {
  color: #cdd6e4;
  border-color: rgba(122, 162, 201, 0.4);
}
.dex-chip.unlocked.good {
  color: #6fc492;
  border-color: rgba(111, 196, 146, 0.45);
}
.dex-chip.unlocked.true {
  color: #c9a06a;
  border-color: rgba(201, 160, 106, 0.5);
}
</style>
