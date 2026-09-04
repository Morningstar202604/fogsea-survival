<script setup lang="ts">
import { ref, computed, watch, defineAsyncComponent } from 'vue';
import { useGame } from '../game/useGame';
import ResourceBar from './ResourceBar.vue';
import SceneView from './SceneView.vue';

// 各面板按需加载：拆分为独立 chunk，降低首屏主包体积
const BasePanel = defineAsyncComponent(() => import('./BasePanel.vue'));
const SkillTreePanel = defineAsyncComponent(() => import('./SkillTreePanel.vue'));
const CombatScreen = defineAsyncComponent(() => import('./CombatScreen.vue'));
const MarketPanel = defineAsyncComponent(() => import('./MarketPanel.vue'));
const ProgressionIndicator = defineAsyncComponent(() => import('./ProgressionIndicator.vue'));
const InventoryPanel = defineAsyncComponent(() => import('./InventoryPanel.vue'));
const NpcPanel = defineAsyncComponent(() => import('./NpcPanel.vue'));
const StrategyPanel = defineAsyncComponent(() => import('./StrategyPanel.vue'));
const NarrativePanel = defineAsyncComponent(() => import('./NarrativePanel.vue'));
const AiEventPanel = defineAsyncComponent(() => import('./AiEventPanel.vue'));

const g = useGame();
const activeTab = ref<'story' | 'base' | 'skills' | 'inventory' | 'npc' | 'combat' | 'market' | 'progression' | 'strategy' | 'narrative' | 'ai_event'>('story');

const isInCombat = computed(() => g.state?.combat !== undefined);

// 只显示最近 20 条日志
const recentLog = computed(() => g.log.slice(-20));

// 遭遇战开始时自动切到战斗页
watch(isInCombat, (inCombat) => {
  if (inCombat) activeTab.value = 'combat';
});

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

const tabLabels: Record<string, string> = {
  story: '📖 剧情',
  base: '🏠 基地',
  inventory: '🎒 背包',
  npc: '👥 同伴',
  skills: '⚡ 技能',
  combat: '⚔️ 战斗',
  market: '💰 市场',
  progression: '🌍 推进',
  strategy: '🔮 策略',
  narrative: '📜 叙事',
  ai_event: '🎲 事件',
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

        <!-- 背包视图 -->
        <InventoryPanel v-else-if="activeTab === 'inventory'" />

        <!-- 同伴羁绊 -->
        <NpcPanel v-else-if="activeTab === 'npc'" />

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

        <!-- 策略引擎视图 -->
        <StrategyPanel v-else-if="activeTab === 'strategy'" />

        <!-- 叙事引擎视图 -->
        <NarrativePanel v-else-if="activeTab === 'narrative'" />

        <!-- AI事件引擎视图 -->
        <AiEventPanel v-else-if="activeTab === 'ai_event'" />
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
      <div v-if="g.log.length === 0" class="aside-note">跟随迷雾中的线索，撑过每一天。</div>
      <div v-else class="log-entries">
        <div
          v-for="(entry, i) in recentLog"
          :key="i"
          class="log-entry"
          :class="`log-${entry.kind}`"
        >
          {{ entry.text }}
        </div>
      </div>
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
  padding-left: max(1rem, env(safe-area-inset-left));
  padding-right: max(1rem, env(safe-area-inset-right));
  padding-top: max(1rem, env(safe-area-inset-top));
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
  box-sizing: border-box;
}
.panel {
  background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  min-height: 0;
  box-shadow: 0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04);
}
.left {
  gap: 1rem;
}
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  gap: 0.35rem;
  margin-bottom: 0.8rem;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  overflow-x: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.12) transparent;
}
.tab-nav::-webkit-scrollbar {
  height: 4px;
}
.tab-nav::-webkit-scrollbar-track {
  background: transparent;
}
.tab-nav::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.12);
  border-radius: 2px;
}

.tab-btn {
  padding: 0.45rem 0.75rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #8b95a7;
  cursor: pointer;
  font-size: 0.8rem;
  white-space: nowrap;
  transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}
.tab-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, rgba(122,162,201,0.15) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.18s ease;
}
.tab-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  color: #cdd6e4;
  transform: translateY(-1px);
}
.tab-btn:hover::before {
  opacity: 1;
}
.tab-btn.active {
  background: linear-gradient(135deg, rgba(122,162,201,0.2) 0%, rgba(122,162,201,0.1) 100%);
  border-color: #7aa2c9;
  color: #e4e9f2;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(122,162,201,0.2);
}
.tab-btn.active::before {
  opacity: 1;
}

/* 内容区域 */
.content-area {
  flex: 1;
  overflow-y: auto;
  min-height: 0;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.1) transparent;
}
.content-area::-webkit-scrollbar {
  width: 6px;
}
.content-area::-webkit-scrollbar-track {
  background: transparent;
}
.content-area::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.1);
  border-radius: 3px;
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
.empty-view p { margin: 0; }

.footer {
  padding-top: 0.8rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: 0.8rem;
}

/* 右侧日志 */
.aside-title {
  margin: 0 0 0.5rem 0;
  font-size: 0.85rem;
  color: #aeb7c7;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.aside-title::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 1em;
  background: linear-gradient(to bottom, #7aa2c9, #4f9d6f);
  border-radius: 2px;
}
.aside-note {
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.6;
  color: #566072;
  font-style: italic;
  text-align: center;
  padding: 1rem 0.5rem;
}
.log-entries {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-height: 0;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.08) transparent;
}
.log-entries::-webkit-scrollbar { width: 4px; }
.log-entries::-webkit-scrollbar-track { background: transparent; }
.log-entries::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 2px; }

.log-entry {
  font-size: 0.75rem;
  line-height: 1.5;
  padding: 0.3rem 0.45rem;
  border-radius: 4px;
  word-break: break-word;
  animation: log-in 0.2s ease-out;
}
@keyframes log-in {
  from { opacity: 0; transform: translateY(-4px); }
  to { opacity: 1; transform: translateY(0); }
}
.log-scene    { background: rgba(122,162,201,0.08); color: #8b95a7; border-left: 2px solid #7aa2c9; }
.log-result   { background: rgba(86,158,109,0.08); color: #9cc4a8; border-left: 2px solid #569e6d; }
.log-daily    { background: rgba(180,130,60,0.08); color: #c4a46a; border-left: 2px solid #b4823c; font-weight: 500; }
.log-system   { background: rgba(160,100,180,0.08); color: #b89adb; border-left: 2px solid #a064b4; }

.btn {
  padding: 0.55rem 0.9rem;
  border-radius: 8px;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.15s ease;
}
.btn.primary {
  background: linear-gradient(135deg, #2f6f9f 0%, #265a82 100%);
  color: #fff;
  box-shadow: 0 2px 12px rgba(47,111,159,0.3);
}
.btn.primary:hover {
  background: linear-gradient(135deg, #357eaf 0%, #2f6f9f 100%);
  box-shadow: 0 4px 16px rgba(47,111,159,0.4);
  transform: translateY(-1px);
}
.btn.ghost {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.15);
  color: #aeb7c7;
}
.btn.ghost:hover {
  border-color: #7aa2c9;
  color: #e4e9f2;
  background: rgba(122,162,201,0.06);
}
.btn.wide {
  width: 100%;
  padding: 0.7rem;
  font-size: 0.95rem;
}

/* 响应式 */
@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    height: auto;
    min-height: 100vh;
    gap: 0.7rem;
    padding: 0.7rem;
  }
  .right { display: none; }
  .left { order: 1; }
  .main { order: 2; }
  .tab-nav { flex-wrap: wrap; }
}
</style>
