<script setup lang="ts">
import { ref, computed } from 'vue';
import { useGame } from '../game/useGame';
import ResourceBar from './ResourceBar.vue';
import SceneView from './SceneView.vue';
import BasePanel from './BasePanel.vue';
import SkillTreePanel from './SkillTreePanel.vue';
import CombatScreen from './CombatScreen.vue';
import MarketPanel from './MarketPanel.vue';
import ProgressionIndicator from './ProgressionIndicator.vue';

const g = useGame();
const activeTab = ref<'story' | 'base' | 'skills' | 'combat' | 'market' | 'progression'>('story');

const isInCombat = computed(() => g.state?.combat !== undefined);

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

const tabLabels = {
  story: '📖 剧情',
  base: '🏠 基地',
  skills: '⚡ 技能',
  combat: '⚔️ 战斗',
  market: '💰 市场',
  progression: '🌍 推进',
};
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
      <!-- 标签页导航 -->
      <div class="tab-nav">
        <button 
          v-for="(label, key) in tabLabels" 
          :key="key"
          class="tab-btn"
          :class="{ active: activeTab === key }"
          @click="activeTab = key as any"
        >
          {{ label }}
        </button>
      </div>

      <!-- 内容区域 -->
      <div class="content-area">
        <!-- 剧情视图 -->
        <SceneView v-if="activeTab === 'story'" />
        
        <!-- 基地视图 -->
        <BasePanel v-else-if="activeTab === 'base'" />
        
        <!-- 技能树视图 -->
        <SkillTreePanel v-else-if="activeTab === 'skills'" />
        
        <!-- 战斗视图（仅在战斗中显示） -->
        <CombatScreen v-else-if="activeTab === 'combat' && isInCombat" />
        <div v-else-if="activeTab === 'combat' && !isInCombat" class="empty-view">
          <p>当前没有战斗，探索时可能会遭遇怪物。</p>
        </div>
        
        <!-- 市场视图 -->
        <MarketPanel v-else-if="activeTab === 'market'" />
        
        <!-- 推进状态视图 -->
        <ProgressionIndicator v-else-if="activeTab === 'progression'" />
      </div>

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
  display: flex;
  flex-direction: column;
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

/* 标签页导航 */
.tab-nav {
  display: flex;
  gap: 0.4rem;
  margin-bottom: 0.8rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  overflow-x: auto;
}

.tab-btn {
  padding: 0.5rem 0.8rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: #8b95a7;
  cursor: pointer;
  font-size: 0.82rem;
  white-space: nowrap;
  transition: all 0.15s ease;
}

.tab-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  color: #cdd6e4;
}

.tab-btn.active {
  background: rgba(122, 162, 201, 0.15);
  border-color: #7aa2c9;
  color: #e4e9f2;
  font-weight: 600;
}

/* 内容区域 */
.content-area {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.empty-view {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #566072;
  font-size: 0.9rem;
  text-align: center;
  padding: 2rem;
}

.empty-view p {
  margin: 0;
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
  .tab-nav {
    flex-wrap: wrap;
  }
}
</style>
