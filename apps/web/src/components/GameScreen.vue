<script setup lang="ts">
import { useGame } from '../game/useGame';
import ResourceBar from './ResourceBar.vue';
import SceneView from './SceneView.vue';

const g = useGame();

function exportSave(): void {
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
  <div class="layout">
    <aside class="panel left">
      <ResourceBar />
      <div class="sys">
        <button class="btn ghost" @click="exportSave">导出存档</button>
        <button class="btn ghost" @click="g.backToMenu">主菜单</button>
      </div>
    </aside>

    <main class="panel main">
      <SceneView />
      <div class="footer">
        <button v-if="!g.state?.outcome" class="btn primary wide" @click="g.endDay">
          结束今日，进入下一天
        </button>
        <button v-else class="btn ghost wide" @click="g.backToMenu">返回主菜单</button>
      </div>
    </main>

    <aside class="panel right">
      <h3 class="aside-title">生存日志</h3>
      <p class="aside-note">跟随迷雾中的线索，撑过每一天。</p>
    </aside>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr) 200px;
  gap: 1rem;
  height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
}
.panel {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.left {
  gap: 1rem;
}
.main {
  flex: 1;
}
.right {
  gap: 0.5rem;
}
.sys {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: auto;
}
.footer {
  padding-top: 0.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: 0.8rem;
}
.aside-title {
  margin: 0;
  font-size: 0.95rem;
  color: #aeb7c7;
}
.aside-note {
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.6;
  color: #566072;
}
.btn {
  padding: 0.55rem 0.9rem;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 0.9rem;
  transition: opacity 0.15s ease;
}
.btn.primary {
  background: #2f6f9f;
  color: #fff;
}
.btn.primary:hover {
  background: #357eaf;
}
.btn.ghost {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.15);
  color: #aeb7c7;
}
.btn.ghost:hover {
  border-color: #7aa2c9;
  color: #e4e9f2;
}
.btn.wide {
  width: 100%;
  padding: 0.7rem;
  font-size: 0.95rem;
}
@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    height: auto;
    min-height: 100vh;
    gap: 0.7rem;
    padding: 0.7rem;
  }
  .right {
    display: none;
  }
  .left {
    order: 1;
  }
  .main {
    order: 2;
  }
}
</style>
