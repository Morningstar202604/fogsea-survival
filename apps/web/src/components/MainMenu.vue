<script setup lang="ts">
import { useGame, SLOT_COUNT } from '../game/useGame';

const g = useGame();

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
          <button v-else-if="g.slots[i - 1].state" class="btn primary" @click="g.newGame(i - 1)">重开</button>
          <button v-else class="btn primary" @click="g.newGame(i - 1)">新游戏</button>
          <button v-if="g.slots[i - 1].state" class="btn ghost" @click="handleExport">导出</button>
          <button v-if="g.slots[i - 1].state" class="btn danger" @click="g.deleteSlot(i - 1)">清空</button>
          <button class="btn ghost" @click="handleImport(i - 1)">导入</button>
        </div>
      </div>
    </div>

    <p class="hint">存档保存在本机浏览器。导出后可分享给他人继续游玩。</p>
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
</style>
