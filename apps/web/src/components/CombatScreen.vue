<script setup lang="ts">
import { computed } from 'vue';
import { useGame } from '../game/useGame';
import { MONSTER_DATABASE } from '@fogsea/core';

const g = useGame();

const combatInfo = computed(() => {
  const st = g.state;
  if (!st || !st.combat) return null;

  return {
    monster: MONSTER_DATABASE[st.combat.enemyId] ?? null,
    playerHp: st.resources.health.current,
    playerMaxHp: st.resources.health.max,
    monsterHp: st.combat.enemyHp,
    monsterMaxHp: st.combat.enemyMaxHp,
    round: st.combat.round,
    log: st.combat.log || [],
  };
});

function getHpPercent(current: number, max: number): number {
  return Math.round((current / max) * 100);
}

function getHpColor(pct: number): string {
  if (pct <= 25) return '#c0504d';
  if (pct <= 50) return '#c98a3d';
  return '#4f9d6f';
}

function attack() {
  g.combatAction?.('attack');
}

function defend() {
  g.combatAction?.('defend');
}

function useSkill() {
  g.combatAction?.('use_item');
}

function flee() {
  g.combatAction?.('flee');
}
</script>

<template>
  <div v-if="combatInfo" class="combat-screen">
    <h3 class="combat-title">战斗进行中</h3>
    
    <!-- 怪物信息 -->
    <div class="monster-panel">
      <div class="monster-header">
        <span class="monster-name">{{ combatInfo.monster?.name || '未知怪物' }}</span>
        <span class="monster-level">Lv.{{ combatInfo.monster?.level || 1 }}</span>
      </div>
      
      <div class="hp-bar-container">
        <div class="hp-label">
          <span>生命值</span>
          <span>{{ combatInfo.monsterHp }}/{{ combatInfo.monsterMaxHp }}</span>
        </div>
        <div class="hp-track">
          <div 
            class="hp-fill enemy"
            :style="{ 
              width: getHpPercent(combatInfo.monsterHp, combatInfo.monsterMaxHp) + '%',
              background: getHpColor(getHpPercent(combatInfo.monsterHp, combatInfo.monsterMaxHp))
            }"
          ></div>
        </div>
      </div>

      <div v-if="combatInfo.monster?.description" class="monster-desc">
        {{ combatInfo.monster.description }}
      </div>
    </div>

    <!-- 玩家血量 -->
    <div class="player-hp">
      <div class="hp-label">
        <span>你的生命</span>
        <span>{{ combatInfo.playerHp }}/{{ combatInfo.playerMaxHp }}</span>
      </div>
      <div class="hp-track">
        <div 
          class="hp-fill player"
          :style="{ 
            width: getHpPercent(combatInfo.playerHp, combatInfo.playerMaxHp) + '%',
            background: getHpColor(getHpPercent(combatInfo.playerHp, combatInfo.playerMaxHp))
          }"
        ></div>
      </div>
    </div>

    <!-- 战斗日志 -->
    <div class="combat-log">
      <h4 class="log-title">战斗记录</h4>
      <div class="log-content">
        <p v-for="(entry, i) in combatInfo.log.slice(-8)" :key="i" class="log-entry">
          {{ entry }}
        </p>
      </div>
    </div>

    <!-- 行动按钮 -->
    <div class="combat-actions">
      <button class="action-btn attack" @click="attack">
        ⚔️ 攻击
      </button>
      <button class="action-btn defend" @click="defend">
        🛡️ 防御
      </button>
      <button class="action-btn skill" @click="useSkill">
        ✨ 技能
      </button>
      <button class="action-btn flee" @click="flee">
        🏃 逃跑
      </button>
    </div>

    <div class="turn-indicator">
      第 {{ combatInfo.round }} 回合
    </div>
  </div>
</template>

<style scoped>
.combat-screen {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  background: rgba(192, 80, 77, 0.05);
  border: 1px solid rgba(192, 80, 77, 0.2);
  border-radius: 10px;
}

.combat-title {
  margin: 0;
  font-size: 1.1rem;
  color: #c0504d;
  font-weight: 700;
  text-align: center;
}

.monster-panel {
  padding: 0.8rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.monster-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.monster-name {
  font-size: 1.05rem;
  color: #e4e9f2;
  font-weight: 700;
}

.monster-level {
  font-size: 0.85rem;
  color: #c9a06a;
  font-weight: 600;
}

.hp-bar-container {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.hp-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.82rem;
  color: #8b95a7;
}

.hp-track {
  height: 12px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.hp-fill {
  height: 100%;
  border-radius: 6px;
  transition: width 0.4s ease, background 0.4s ease;
}

.monster-desc {
  margin: 0;
  font-size: 0.82rem;
  color: #8b95a7;
  line-height: 1.5;
  font-style: italic;
}

.player-hp {
  padding: 0.6rem;
  background: rgba(79, 157, 111, 0.08);
  border-radius: 6px;
}

.combat-log {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.log-title {
  margin: 0;
  font-size: 0.85rem;
  color: #aeb7c7;
  font-weight: 600;
}

.log-content {
  max-height: 200px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0.4rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
}

.log-entry {
  margin: 0;
  font-size: 0.82rem;
  color: #cdd6e4;
  line-height: 1.5;
}

.combat-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.6rem;
}

.action-btn {
  padding: 0.7rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.action-btn.attack {
  background: #c0504d;
  color: #fff;
}

.action-btn.attack:hover:not(:disabled) {
  background: #d0605d;
}

.action-btn.defend {
  background: #2f6f9f;
  color: #fff;
}

.action-btn.defend:hover:not(:disabled) {
  background: #357eaf;
}

.action-btn.skill {
  background: #c9a06a;
  color: #fff;
}

.action-btn.skill:hover:not(:disabled) {
  background: #d9b07a;
}

.action-btn.flee {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #aeb7c7;
}

.action-btn.flee:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.15);
  border-color: #7aa2c9;
  color: #e4e9f2;
}

.turn-indicator {
  text-align: center;
  padding: 0.5rem;
  font-size: 0.85rem;
  color: #c9a06a;
  font-style: italic;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
