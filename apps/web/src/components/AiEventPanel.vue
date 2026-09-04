<script setup lang="ts">
import { ref, watch } from 'vue';
import { useGame } from '../game/useGame';
import { AIEventGenerator, type GameEvent, type EventImpact } from '@fogsea/core';

const g = useGame();

const currentEvent = ref<GameEvent | null>(null);
const isLoading = ref(false);

const CATEGORY_LABELS: Record<string, string> = {
  survival: '🍖 生存',
  social: '🤝 社交',
  exploration: '🗺️ 探索',
  combat: '⚔️ 战斗',
  economic: '💰 经济',
  environmental: '🌿 环境',
  mysterious: '🔮 神秘',
  disaster: '🌪️ 灾祸',
  opportunity: '✨ 机遇',
  narrative: '📖 剧情',
};

const PRIORITY_LABELS: Record<number, string> = {
  0: '低',
  1: '中',
  2: '高',
  3: '紧急',
};

const IMPACT_LABELS: Record<string, string> = {
  resource: '资源',
  item: '物品',
  flag: '标记',
  status: '状态',
  reputation: '声望',
  relationship: '关系',
  narrative: '叙事',
  chain: '连锁事件',
};

function formatImpact(impact: EventImpact): string {
  const base = IMPACT_LABELS[impact.type] ?? impact.type;
  if (impact.type === 'resource' && impact.resource) {
    return `${base} ${impact.resource} ${impact.amount ?? 0 > 0 ? '+' : ''}${impact.amount ?? 0}`;
  }
  if (impact.type === 'item' && impact.itemId) {
    return `${impact.itemId} ×${impact.itemCount ?? 1}`;
  }
  if (impact.type === 'relationship' && impact.npcId) {
    return `${impact.npcId} 关系 ${impact.relationshipChange ?? 0 > 0 ? '+' : ''}${impact.relationshipChange ?? 0}`;
  }
  if (impact.type === 'status' && impact.status) {
    return `${impact.status}${impact.statusDuration ? `(${impact.statusDuration}回合)` : ''}`;
  }
  return base;
}

function generateEvent(): void {
  if (!g.state) return;
  isLoading.value = true;
  const engine = new AIEventGenerator(g.state.day);
  currentEvent.value = engine.generateEvent(g.state, g.state.day);
  isLoading.value = false;
}

watch(() => g.state?.day, () => {
  generateEvent();
});
</script>

<template>
  <div v-if="!g.state" class="empty-view">
    <p>开始游戏后将展示 AI 事件生成器分析。</p>
  </div>
  <div v-else class="ai-event-panel">
    <div class="panel-header">
      <span class="panel-title">🎲 AI 事件引擎</span>
      <button class="btn-icon" @click="generateEvent" :disabled="isLoading" title="重新生成事件">
        {{ isLoading ? '…' : '⟳' }}
      </button>
    </div>

    <template v-if="currentEvent">
      <!-- 事件头部 -->
      <div class="event-header">
        <span class="event-category" :class="currentEvent.category">
          {{ CATEGORY_LABELS[currentEvent.category] ?? currentEvent.category }}
        </span>
        <span class="event-priority" :class="`priority-${currentEvent.priority}`">
          {{ PRIORITY_LABELS[currentEvent.priority] ?? currentEvent.priority }}
        </span>
        <h2 class="event-title">{{ currentEvent.title }}</h2>
      </div>

      <!-- 事件描述 -->
      <div class="event-description">{{ currentEvent.description }}</div>

      <!-- 背景信息 -->
      <div v-if="currentEvent.background" class="event-background">
        📜 {{ currentEvent.background }}
      </div>

      <!-- 触发条件 -->
      <div v-if="currentEvent.triggers && currentEvent.triggers.length" class="triggers-section">
        <div class="section-label">⚡ 触发条件</div>
        <div class="triggers-list">
          <div
            v-for="(trigger, i) in currentEvent.triggers"
            :key="i"
            class="trigger-tag"
          >
            <span class="trigger-type">{{ trigger.type }}</span>
            <span v-if="trigger.day !== undefined" class="trigger-val">第{{ trigger.day }}天</span>
            <span v-if="trigger.probability !== undefined" class="trigger-val">
              概率 {{ Math.round(trigger.probability * 100) }}%
            </span>
          </div>
        </div>
      </div>

      <!-- 选项 -->
      <div v-if="currentEvent.options && currentEvent.options.length" class="options-section">
        <div class="section-label">🎯 可选行动</div>
        <div class="options-grid">
          <div
            v-for="opt in currentEvent.options"
            :key="opt.id"
            class="option-card"
          >
            <div class="option-top">
              <span class="option-text">{{ opt.text }}</span>
              <span
                class="option-chance"
                :class="opt.successChance >= 0.7 ? 'good' : opt.successChance >= 0.4 ? 'warn' : 'bad'"
              >
                {{ Math.round(opt.successChance * 100) }}%
              </span>
            </div>
            <div v-if="opt.description" class="option-desc">{{ opt.description }}</div>

            <!-- 成功影响 -->
            <div v-if="opt.successImpacts.length" class="impacts success">
              <div class="impact-label">✅ 成功结果</div>
              <div class="impact-list">
                <span v-for="(imp, j) in opt.successImpacts" :key="j" class="impact-tag">
                  {{ formatImpact(imp) }}
                </span>
              </div>
            </div>

            <!-- 失败影响 -->
            <div v-if="opt.failureImpacts.length" class="impacts failure">
              <div class="impact-label">❌ 失败结果</div>
              <div class="impact-list">
                <span v-for="(imp, j) in opt.failureImpacts" :key="j" class="impact-tag">
                  {{ formatImpact(imp) }}
                </span>
              </div>
            </div>

            <!-- 消耗 -->
            <div v-if="opt.costs && opt.costs.length" class="option-cost">
              {{ opt.costs.map(c => `${c.type === 'ap' ? 'AP' : c.type} ${c.amount ?? 0}`).join(' · ') }}
            </div>
          </div>
        </div>
      </div>

      <!-- 冷却与重复 -->
      <div class="event-meta">
        <span v-if="currentEvent.cooldownDays" class="meta-tag">冷却 {{ currentEvent.cooldownDays }} 天</span>
        <span v-if="currentEvent.repeatable" class="meta-tag">可重复</span>
        <span v-if="currentEvent.maxTriggers" class="meta-tag">最多触发 {{ currentEvent.maxTriggers }} 次</span>
      </div>
    </template>

    <div v-else-if="!isLoading" class="empty-state">
      <p>今日暂无事件生成。</p>
      <button class="btn-primary" @click="generateEvent">生成事件</button>
    </div>

    <div v-else class="loading-state">
      <p>正在生成事件…</p>
    </div>
  </div>
</template>

<style scoped>
.ai-event-panel {
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
.btn-icon:hover:not(:disabled) {
  border-color: #7aa2c9;
  color: #e4e9f2;
}
.btn-icon:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.event-header {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-wrap: wrap;
}
.event-category {
  padding: 0.15rem 0.45rem;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 600;
  border: 1px solid transparent;
  flex-shrink: 0;
}
.event-category.survival     { background: rgba(192,80,77,0.15); color: #c0504d; border-color: rgba(192,80,77,0.3); }
.event-category.social       { background: rgba(122,162,201,0.15); color: #7aa2c9; border-color: rgba(122,162,201,0.3); }
.event-category.exploration  { background: rgba(79,157,111,0.15); color: #4f9d6f; border-color: rgba(79,157,111,0.3); }
.event-category.combat       { background: rgba(192,80,77,0.15); color: #c0504d; border-color: rgba(192,80,77,0.3); }
.event-category.economic     { background: rgba(201,160,106,0.15); color: #c9a06a; border-color: rgba(201,160,106,0.3); }
.event-category.environmental{ background: rgba(79,157,111,0.15); color: #4f9d6f; border-color: rgba(79,157,111,0.3); }
.event-category.mysterious   { background: rgba(160,100,180,0.15); color: #b89adb; border-color: rgba(160,100,180,0.3); }
.event-category.disaster     { background: rgba(192,80,77,0.2);   color: #e0605c; border-color: rgba(192,80,77,0.4); }
.event-category.opportunity  { background: rgba(255,200,80,0.15); color: #ffc850; border-color: rgba(255,200,80,0.3); }
.event-category.narrative    { background: rgba(201,160,106,0.15); color: #c9a06a; border-color: rgba(201,160,106,0.3); }

.event-priority {
  font-size: 0.65rem;
  padding: 0.1rem 0.35rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.1);
  color: #8b95a7;
  margin-left: auto;
  flex-shrink: 0;
}
.event-priority.priority-3 { background: rgba(192,80,77,0.2);  color: #e0605c; border-color: rgba(192,80,77,0.4); }
.event-priority.priority-2 { background: rgba(201,160,106,0.15); color: #c9a06a; border-color: rgba(201,160,106,0.3); }
.event-priority.priority-1 { background: rgba(122,162,201,0.1); color: #7aa2c9; border-color: rgba(122,162,201,0.25); }

.event-title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #e4e9f2;
  width: 100%;
}

.event-description {
  font-size: 0.82rem;
  color: #9aa5b8;
  line-height: 1.65;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 8px;
  padding: 0.55rem 0.7rem;
}

.event-background {
  font-size: 0.75rem;
  color: #566072;
  padding: 0.25rem 0.5rem;
  background: rgba(160,100,180,0.06);
  border-radius: 4px;
}

.section-label {
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #566072;
  margin-bottom: 0.3rem;
}

.triggers-section, .options-section {
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 8px;
  padding: 0.55rem 0.65rem;
}

.triggers-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}
.trigger-tag {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.15rem 0.4rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 4px;
  font-size: 0.7rem;
  color: #8b95a7;
}
.trigger-type {
  font-weight: 600;
  color: #aeb7c7;
}
.trigger-val {
  color: #566072;
}

.options-grid {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}
.option-card {
  padding: 0.45rem 0.55rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 8px;
  transition: border-color 0.15s ease;
}
.option-card:hover {
  border-color: rgba(122,162,201,0.3);
}
.option-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
}
.option-text {
  font-size: 0.82rem;
  font-weight: 500;
  color: #dde4ee;
}
.option-chance {
  font-size: 0.68rem;
  font-weight: 600;
  padding: 0.1rem 0.35rem;
  border-radius: 999px;
  flex-shrink: 0;
}
.option-chance.good  { background: rgba(79,157,111,0.15); color: #4f9d6f; }
.option-chance.warn  { background: rgba(201,160,106,0.15); color: #c9a06a; }
.option-chance.bad   { background: rgba(192,80,77,0.15);  color: #c0504d; }
.option-desc {
  font-size: 0.73rem;
  color: #566072;
  margin-top: 0.2rem;
}
.option-cost {
  font-size: 0.68rem;
  color: #c0504d;
  margin-top: 0.15rem;
}

.impacts {
  margin-top: 0.3rem;
}
.impact-label {
  font-size: 0.68rem;
  font-weight: 600;
  margin-bottom: 0.15rem;
}
.impacts.success .impact-label { color: #4f9d6f; }
.impacts.failure .impact-label { color: #c0504d; }
.impact-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem;
}
.impact-tag {
  font-size: 0.68rem;
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  background: rgba(255,255,255,0.04);
  color: #8b95a7;
  border: 1px solid rgba(255,255,255,0.08);
}

.event-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}
.meta-tag {
  font-size: 0.68rem;
  padding: 0.1rem 0.4rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 999px;
  color: #566072;
}

.empty-view, .empty-state, .loading-state {
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
