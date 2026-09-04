<script setup lang="ts">
import { ref, watch } from 'vue';
import { useGame } from '../game/useGame';
import { NarrativeEngine, type NarrativeScene } from '@fogsea/core';

const g = useGame();

const currentScene = ref<NarrativeScene | null>(null);

const TYPE_LABELS: Record<string, string> = {
  dialogue: '💬 对话',
  exploration: '🔍 探索',
  combat: '⚔️ 战斗',
  negotiation: '🤝 谈判',
  dilemma: '😰 困境',
  discovery: '✨ 发现',
  disaster: '🌪️ 灾难',
  trade: '🏪 交易',
  training: '📚 训练',
  story: '📖 剧情',
};

function generateScene(): void {
  if (!g.state) return;
  const engine = new NarrativeEngine(g.state.day);
  currentScene.value = engine.generateScene(g.state);
}

function getChoiceCostText(costs: Array<{ type: string; amount?: number; itemId?: string; resource?: string }>): string {
  if (!costs.length) return '';
  return costs.map((c) => {
    if (c.type === 'ap') return `AP${c.amount ?? 1}`;
    if (c.type === 'health') return `HP${c.amount ?? 1}`;
    if (c.type === 'sanity') return `理智${c.amount ?? 1}`;
    if (c.type === 'energy') return `体力${c.amount ?? 1}`;
    if (c.type === 'resource') return `${c.resource ?? ''}${c.amount ?? 1}`;
    if (c.type === 'item') return `${c.itemId ?? ''}×${c.amount ?? 1}`;
    return '';
  }).filter(Boolean).join(' · ');
}

watch(() => g.state?.day, () => {
  if (!currentScene.value || !currentScene.value.repeatable) {
    generateScene();
  }
});
</script>

<template>
  <div v-if="!g.state" class="empty-view">
    <p>开始游戏后将展示叙事引擎分析。</p>
  </div>
  <div v-else class="narrative-panel">
    <div class="panel-header">
      <span class="panel-title">📜 叙事引擎</span>
      <button class="btn-icon" @click="generateScene" title="重新生成场景">⟳</button>
    </div>

    <template v-if="currentScene">
      <!-- 场景头部 -->
      <div class="scene-header">
        <span class="scene-type-badge" :class="currentScene.type">
          {{ TYPE_LABELS[currentScene.type] ?? currentScene.type }}
        </span>
        <h2 class="scene-title">{{ currentScene.title }}</h2>
      </div>

      <!-- 场景描述 -->
      <div class="scene-text">{{ currentScene.text }}</div>

      <!-- 环境信息 -->
      <div v-if="currentScene.environment" class="environment-tag">
        🗺️ {{ currentScene.environment }}
      </div>

      <!-- 在场 NPC -->
      <div v-if="currentScene.npcs && currentScene.npcs.length" class="npcs-section">
        <div class="section-label">👥 在场人物</div>
        <div class="npc-list">
          <div v-for="npc in currentScene.npcs" :key="npc.id" class="npc-card">
            <span class="npc-name">{{ npc.name }}</span>
            <span class="npc-type" :class="npc.type">{{ npc.type }}</span>
            <span class="npc-disp">信赖 {{ npc.disposition }}</span>
          </div>
        </div>
      </div>

      <!-- 选项 -->
      <div v-if="currentScene.choices && currentScene.choices.length" class="choices-section">
        <div class="section-label">🎯 可执行选项</div>
        <div class="choices-grid">
          <div
            v-for="choice in currentScene.choices"
            :key="choice.id"
            class="choice-card"
          >
            <div class="choice-top">
              <span class="choice-text">{{ choice.text }}</span>
              <span class="choice-chance" :class="choice.successChance >= 0.7 ? 'good' : choice.successChance >= 0.4 ? 'warn' : 'bad'">
                {{ Math.round(choice.successChance * 100) }}%
              </span>
            </div>
            <div v-if="choice.description" class="choice-desc">{{ choice.description }}</div>
            <div v-if="getChoiceCostText(choice.costs)" class="choice-cost">
              {{ getChoiceCostText(choice.costs) }}
            </div>
          </div>
        </div>
      </div>

      <!-- 时间限制 -->
      <div v-if="currentScene.timeLimit" class="time-limit">
        ⏱️ 限时 {{ currentScene.timeLimit }} 回合内决策
      </div>
    </template>

    <div v-else class="empty-state">
      <p>今日暂无叙事场景触发。</p>
      <button class="btn-primary" @click="generateScene">生成场景</button>
    </div>
  </div>
</template>

<style scoped>
.narrative-panel {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  min-height: 0;
  overflow-y: auto;
  padding-right: 0.2rem;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.panel-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #aeb7c7;
}
.btn-icon {
  background: none;
  border: 1px solid rgba(255,255,255,0.12);
  color: #8b95a7;
  border-radius: 6px;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.15s ease;
}
.btn-icon:hover {
  border-color: #7aa2c9;
  color: #e4e9f2;
}

.scene-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.scene-type-badge {
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 600;
  border: 1px solid transparent;
  flex-shrink: 0;
}
.scene-type-badge.dialogue       { background: rgba(122,162,201,0.15); color: #7aa2c9; border-color: rgba(122,162,201,0.3); }
.scene-type-badge.exploration    { background: rgba(79,157,111,0.15);  color: #4f9d6f; border-color: rgba(79,157,111,0.3); }
.scene-type-badge.combat         { background: rgba(192,80,77,0.15);   color: #c0504d; border-color: rgba(192,80,77,0.3); }
.scene-type-badge.negotiation    { background: rgba(201,160,106,0.15); color: #c9a06a; border-color: rgba(201,160,106,0.3); }
.scene-type-badge.dilemma        { background: rgba(160,100,180,0.15); color: #b89adb; border-color: rgba(160,100,180,0.3); }
.scene-type-badge.discovery      { background: rgba(255,200,80,0.15);  color: #ffc850; border-color: rgba(255,200,80,0.3); }
.scene-type-badge.disaster       { background: rgba(192,80,77,0.2);    color: #e0605c; border-color: rgba(192,80,77,0.4); }
.scene-type-badge.trade          { background: rgba(79,157,111,0.15);  color: #4f9d6f; border-color: rgba(79,157,111,0.3); }
.scene-type-badge.training       { background: rgba(122,162,201,0.15); color: #7aa2c9; border-color: rgba(122,162,201,0.3); }
.scene-type-badge.story          { background: rgba(201,160,106,0.15); color: #c9a06a; border-color: rgba(201,160,106,0.3); }

.scene-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #e4e9f2;
}

.scene-text {
  font-size: 0.82rem;
  color: #9aa5b8;
  line-height: 1.65;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 8px;
  padding: 0.55rem 0.7rem;
}

.environment-tag {
  font-size: 0.75rem;
  color: #566072;
  padding: 0.25rem 0.5rem;
  background: rgba(255,255,255,0.03);
  border-radius: 4px;
}

.section-label {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #566072;
  margin-bottom: 0.3rem;
}

.npcs-section {
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 8px;
  padding: 0.55rem 0.65rem;
}
.npc-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.npc-card {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.3rem 0.4rem;
  background: rgba(255,255,255,0.03);
  border-radius: 6px;
}
.npc-name {
  font-size: 0.82rem;
  font-weight: 600;
  color: #e4e9f2;
}
.npc-type {
  font-size: 0.65rem;
  padding: 0.1rem 0.35rem;
  border-radius: 999px;
  background: rgba(255,255,255,0.06);
  color: #8b95a7;
}
.npc-type.ally      { background: rgba(79,157,111,0.15); color: #4f9d6f; }
.npc-type.neutral   { background: rgba(201,160,106,0.15); color: #c9a06a; }
.npc-type.hostile   { background: rgba(192,80,77,0.15);  color: #c0504d; }
.npc-type.merchant  { background: rgba(122,162,201,0.15); color: #7aa2c9; }
.npc-type.quest_giver { background: rgba(255,200,80,0.15); color: #ffc850; }
.npc-disp {
  font-size: 0.7rem;
  color: #566072;
  margin-left: auto;
}

.choices-section {
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 8px;
  padding: 0.55rem 0.65rem;
}
.choices-grid {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.choice-card {
  padding: 0.45rem 0.55rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 8px;
  transition: border-color 0.15s ease;
}
.choice-card:hover {
  border-color: rgba(122,162,201,0.3);
}
.choice-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
}
.choice-text {
  font-size: 0.82rem;
  font-weight: 500;
  color: #dde4ee;
}
.choice-chance {
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.1rem 0.35rem;
  border-radius: 999px;
  flex-shrink: 0;
}
.choice-chance.good  { background: rgba(79,157,111,0.15); color: #4f9d6f; }
.choice-chance.warn  { background: rgba(201,160,106,0.15); color: #c9a06a; }
.choice-chance.bad   { background: rgba(192,80,77,0.15);  color: #c0504d; }
.choice-desc {
  font-size: 0.73rem;
  color: #566072;
  margin-top: 0.2rem;
}
.choice-cost {
  font-size: 0.68rem;
  color: #c0504d;
  margin-top: 0.15rem;
}

.time-limit {
  font-size: 0.75rem;
  color: #c9a06a;
  background: rgba(201,160,106,0.08);
  border: 1px solid rgba(201,160,106,0.2);
  border-radius: 6px;
  padding: 0.3rem 0.5rem;
}

.empty-view, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  color: #566072;
  font-size: 0.82rem;
  text-align: center;
  padding: 1.5rem 1rem;
}
.btn-primary {
  padding: 0.45rem 1rem;
  background: #2f6f9f;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.15s ease;
}
.btn-primary:hover { background: #357eaf; }
</style>
