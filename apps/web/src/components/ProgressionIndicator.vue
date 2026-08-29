<script setup lang="ts">
import { computed } from 'vue';
import { useGame } from '../game/useGame';

const g = useGame();

const progressionInfo = computed(() => {
  const st = g.state;
  if (!st || !st.progression) return null;
  
  return {
    worldTier: st.progression.worldTier,
    nextWorldTierDay: st.progression.nextWorldTierDay,
    catastropheWarning: st.progression.catastropheWarning,
    resourceDepletion: st.progression.resourceDepletion || {},
    activeStoryTriggers: st.progression.activeStoryTriggers || [],
  };
});

function getDaysUntilUpgrade(): number {
  if (!progressionInfo.value) return 0;
  const currentDay = g.state?.day || 1;
  return Math.max(0, (progressionInfo.value.nextWorldTierDay || 0) - currentDay);
}

function getCatastropheLabel(type?: string): string {
  if (!type) return '';
  const labels: Record<string, string> = {
    beast_wave: '兽潮来袭',
    acid_rain: '酸雨降临',
    earthquake: '大地震颤',
    plague: '瘟疫蔓延',
    meteor_shower: '流星雨',
  };
  return labels[type] || type;
}
</script>

<template>
  <div v-if="progressionInfo" class="progression-indicator">
    <h3 class="panel-title">世界状态</h3>
    
    <!-- 世界等级倒计时 -->
    <div class="tier-countdown">
      <div class="countdown-header">
        <span class="label">距离下次升级:</span>
        <span class="days">{{ getDaysUntilUpgrade() }} 天</span>
      </div>
      <div class="countdown-bar">
        <div 
          class="countdown-fill"
          :style="{ width: Math.min(100, (g.state?.day || 1) / (progressionInfo.nextWorldTierDay || 1) * 100) + '%' }"
        ></div>
      </div>
    </div>

    <!-- 灾难警告 -->
    <div v-if="progressionInfo.catastropheWarning" class="catastrophe-warning">
      <div class="warning-icon">⚠️</div>
      <div class="warning-content">
        <div class="warning-title">灾难预警</div>
        <div class="warning-desc">
          {{ getCatastropheLabel(progressionInfo.catastropheWarning.type) }} 
          将在 {{ progressionInfo.catastropheWarning.daysLeft }} 天后降临
        </div>
      </div>
    </div>

    <!-- 资源枯竭警告 -->
    <div v-if="Object.keys(progressionInfo.resourceDepletion).length > 0" class="depletion-warnings">
      <h4 class="warning-section-title">资源枯竭区域</h4>
      <div class="depletion-list">
        <div 
          v-for="(count, area) in progressionInfo.resourceDepletion" 
          :key="area"
          class="depletion-item"
        >
          <span class="area-name">{{ area }}</span>
          <span class="exploration-count">已探索 {{ count }} 次</span>
        </div>
      </div>
    </div>

    <!-- 故事触发提示 -->
    <div v-if="progressionInfo.activeStoryTriggers.length > 0" class="story-triggers">
      <h4 class="trigger-section-title">可用剧情线</h4>
      <div class="trigger-list">
        <div 
          v-for="trigger in progressionInfo.activeStoryTriggers" 
          :key="trigger.id"
          class="trigger-item"
        >
          <span class="trigger-name">{{ trigger.name }}</span>
          <button class="trigger-btn" @click="g.startStory?.(trigger.id)">
            开始
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.progression-indicator {
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

.tier-countdown {
  padding: 0.6rem;
  background: rgba(201, 160, 106, 0.08);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.countdown-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
}

.countdown-header .label {
  color: #8b95a7;
}

.countdown-header .days {
  color: #c9a06a;
  font-weight: 700;
}

.countdown-bar {
  height: 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.countdown-fill {
  height: 100%;
  background: linear-gradient(90deg, #c9a06a, #d9b07a);
  border-radius: 4px;
  transition: width 0.4s ease;
}

.catastrophe-warning {
  display: flex;
  gap: 0.6rem;
  padding: 0.7rem;
  background: rgba(192, 80, 77, 0.1);
  border: 1px solid rgba(192, 80, 77, 0.3);
  border-radius: 8px;
  animation: pulse-warning 2s ease-in-out infinite;
}

@keyframes pulse-warning {
  0%, 100% { border-color: rgba(192, 80, 77, 0.3); }
  50% { border-color: rgba(192, 80, 77, 0.6); }
}

.warning-icon {
  font-size: 1.5rem;
}

.warning-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.warning-title {
  font-size: 0.9rem;
  color: #c0504d;
  font-weight: 700;
}

.warning-desc {
  font-size: 0.82rem;
  color: #cdd6e4;
}

.depletion-warnings {
  padding: 0.6rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
}

.warning-section-title, .trigger-section-title {
  margin: 0 0 0.5rem 0;
  font-size: 0.85rem;
  color: #aeb7c7;
  font-weight: 600;
}

.depletion-list {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.depletion-item {
  display: flex;
  justify-content: space-between;
  padding: 0.35rem 0.5rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 4px;
  font-size: 0.82rem;
}

.area-name {
  color: #cdd6e4;
}

.exploration-count {
  color: #c98a3d;
  font-weight: 600;
}

.story-triggers {
  padding: 0.6rem;
  background: rgba(122, 162, 201, 0.08);
  border-radius: 6px;
}

.trigger-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.trigger-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0.5rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 4px;
}

.trigger-name {
  font-size: 0.85rem;
  color: #e4e9f2;
}

.trigger-btn {
  padding: 0.3rem 0.6rem;
  background: #2f6f9f;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 0.78rem;
  transition: background 0.15s ease;
}

.trigger-btn:hover {
  background: #357eaf;
}
</style>
