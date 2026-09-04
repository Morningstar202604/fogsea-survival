<script setup lang="ts">
import { ref, watch } from 'vue';
import { useGame } from '../game/useGame';
import { StrategyEngine, type StrategyAdvice } from '@fogsea/core';

const g = useGame();

const advice = ref<StrategyAdvice | null>(null);

function refreshAdvice(): void {
  if (!g.state) return;
  const engine = new StrategyEngine(g.state.day);
  advice.value = engine.generateStrategyAdvice(g.state);
}

// 自动刷新：进入页面或状态变化时
watch(() => g.state?.day, () => refreshAdvice());

const phaseLabel: Record<string, string> = {
  early: '🌅 初期',
  mid: '🌤️ 中期',
  late: '🌙 后期',
  endgame: '💀 终局',
};

const archetypeLabel: Record<string, string> = {
  farming: '🌾 种田流',
  combat: '⚔️ 战斗流',
  strategy: '🧠 策略流',
  exploration: '🗺️ 探索流',
  survival: '🛡️ 生存流',
  social: '🤝 社交流',
  mystical: '✨ 神秘流',
  balanced: '⚖️ 均衡流',
};

const priorityColor: Record<string, string> = {
  high: '#c0504d',
  medium: '#c9a06a',
  low: '#566072',
};

const scoreColor = (score: number) => {
  if (score >= 70) return '#4f9d6f';
  if (score >= 40) return '#c9a06a';
  return '#c0504d';
};
</script>

<template>
  <div v-if="!g.state" class="empty-view">
    <p>开始游戏后将实时分析你的策略。</p>
  </div>
  <div v-else class="strategy-panel">
    <div class="panel-header">
      <span class="panel-title">🔮 策略引擎分析</span>
      <button class="btn-icon" @click="refreshAdvice" title="刷新分析">⟳</button>
    </div>

    <template v-if="advice">
      <!-- 阶段与主导策略 -->
      <div class="phase-row">
        <div class="phase-badge" :class="advice.currentPhase">
          {{ phaseLabel[advice.currentPhase] ?? advice.currentPhase }}
        </div>
        <div class="dominant">
          <span class="dominant-label">主导策略</span>
          <span class="dominant-value">
            {{ archetypeLabel[advice.analysis.dominantStrategy] ?? advice.analysis.dominantStrategy }}
          </span>
        </div>
        <div class="efficiency">
          <span class="dominant-label">整体效率</span>
          <span class="efficiency-value" :style="{ color: scoreColor(advice.analysis.overallEfficiency) }">
            {{ Math.round(advice.analysis.overallEfficiency) }}%
          </span>
        </div>
      </div>

      <!-- 各流派评分 -->
      <div class="scores-section">
        <div class="section-label">流派评分</div>
        <div class="score-bars">
          <div v-for="s in advice.analysis.scores" :key="s.archetype" class="score-row">
            <span class="score-name">{{ archetypeLabel[s.archetype] ?? s.archetype }}</span>
            <div class="score-bar-track">
              <div
                class="score-bar-fill"
                :style="{
                  width: `${Math.min(100, s.score)}%`,
                  background: scoreColor(s.score),
                }"
              ></div>
            </div>
            <span class="score-val" :style="{ color: scoreColor(s.score) }">{{ Math.round(s.score) }}</span>
          </div>
        </div>
      </div>

      <!-- 优势与弱点 -->
      <div class="sw-section" v-if="advice.analysis.strengths.length || advice.analysis.weaknesses.length">
        <div class="strengths" v-if="advice.analysis.strengths.length">
          <div class="section-label" style="color:#4f9d6f">💪 优势</div>
          <div
            v-for="st in advice.analysis.strengths.slice(0, 3)"
            :key="st.archetype"
            class="sw-tag success"
          >
            {{ archetypeLabel[st.archetype] ?? st.archetype }}
          </div>
        </div>
        <div class="weaknesses" v-if="advice.analysis.weaknesses.length">
          <div class="section-label" style="color:#c0504d">⚠️ 弱点</div>
          <div
            v-for="wk in advice.analysis.weaknesses.slice(0, 3)"
            :key="wk.archetype"
            class="sw-tag danger"
          >
            {{ archetypeLabel[wk.archetype] ?? wk.archetype }}
          </div>
        </div>
      </div>

      <!-- 策略建议 -->
      <div class="advice-section" v-if="advice.advice.length">
        <div class="section-label">💡 当前建议</div>
        <ul class="advice-list">
          <li v-for="(item, i) in advice.advice" :key="i">{{ item }}</li>
        </ul>
      </div>

      <!-- 下一步行动 -->
      <div class="actions-section" v-if="advice.nextActions.length">
        <div class="section-label">🎯 推荐行动</div>
        <ul class="action-list">
          <li v-for="(item, i) in advice.nextActions.slice(0, 4)" :key="i">{{ item }}</li>
        </ul>
      </div>

      <!-- 推荐项 -->
      <div class="recs-section" v-if="advice.analysis.recommendations.length">
        <div class="section-label">📋 长期规划</div>
        <div
          v-for="rec in advice.analysis.recommendations.slice(0, 3)"
          :key="rec.type"
          class="rec-item"
        >
          <span
            class="rec-priority"
            :style="{ borderColor: priorityColor[rec.priority], color: priorityColor[rec.priority] }"
          >
            {{ rec.priority === 'high' ? '紧急' : rec.priority === 'medium' ? '中等' : '低优先级' }}
          </span>
          <span class="rec-text">{{ rec.text }}</span>
        </div>
      </div>
    </template>

    <div v-else class="loading-state">
      <p>正在分析策略…</p>
    </div>
  </div>
</template>

<style scoped>
.strategy-panel {
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
  letter-spacing: 0.02em;
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

.phase-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.phase-badge {
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid transparent;
}
.phase-badge.early    { background: rgba(79,157,111,0.15); color: #4f9d6f; border-color: rgba(79,157,111,0.3); }
.phase-badge.mid      { background: rgba(122,162,201,0.15); color: #7aa2c9; border-color: rgba(122,162,201,0.3); }
.phase-badge.late     { background: rgba(201,160,106,0.15); color: #c9a06a; border-color: rgba(201,160,106,0.3); }
.phase-badge.endgame  { background: rgba(192,80,77,0.15);  color: #c0504d; border-color: rgba(192,80,77,0.3); }

.dominant, .efficiency {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}
.dominant-label, .efficiency .dominant-label {
  font-size: 0.65rem;
  color: #566072;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.dominant-value, .efficiency-value {
  font-size: 0.85rem;
  font-weight: 600;
  color: #e4e9f2;
}

.section-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #566072;
  margin-bottom: 0.35rem;
}

.scores-section, .advice-section, .actions-section, .recs-section {
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 8px;
  padding: 0.55rem 0.65rem;
}

.score-bars {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
.score-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}
.score-name {
  font-size: 0.75rem;
  color: #8b95a7;
  width: 80px;
  flex-shrink: 0;
}
.score-bar-track {
  flex: 1;
  height: 6px;
  background: rgba(255,255,255,0.06);
  border-radius: 999px;
  overflow: hidden;
}
.score-bar-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.5s ease;
}
.score-val {
  font-size: 0.7rem;
  width: 30px;
  text-align: right;
  flex-shrink: 0;
}

.sw-section {
  display: flex;
  gap: 0.8rem;
}
.sw-section > div {
  flex: 1;
}
.sw-tag {
  display: inline-block;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  font-size: 0.72rem;
  margin: 0.1rem 0.15rem 0.1rem 0;
}
.sw-tag.success { background: rgba(79,157,111,0.12); color: #4f9d6f; }
.sw-tag.danger  { background: rgba(192,80,77,0.12);  color: #c0504d; }

.advice-list, .action-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.advice-list li, .action-list li {
  font-size: 0.78rem;
  color: #9aa5b8;
  line-height: 1.5;
  padding-left: 0.6rem;
  position: relative;
}
.advice-list li::before {
  content: '›';
  position: absolute;
  left: 0;
  color: #7aa2c9;
}
.action-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #c9a06a;
}

.rec-item {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  margin-bottom: 0.3rem;
}
.rec-priority {
  flex-shrink: 0;
  font-size: 0.65rem;
  padding: 0.1rem 0.35rem;
  border: 1px solid;
  border-radius: 999px;
  margin-top: 0.1rem;
  white-space: nowrap;
}
.rec-text {
  font-size: 0.76rem;
  color: #8b95a7;
  line-height: 1.5;
}

.loading-state, .empty-view {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #566072;
  font-size: 0.82rem;
  text-align: center;
  padding: 1rem;
}
</style>
