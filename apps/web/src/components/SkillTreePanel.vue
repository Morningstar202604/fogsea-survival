<script setup lang="ts">
import { computed } from 'vue';
import { useGame } from '../game/useGame';
import { SkillBranch, SKILL_DEF_MAP } from '@fogsea/core';

const g = useGame();

const skillInfo = computed(() => {
  const st = g.state;
  if (!st || !st.skills) return null;
  
  return {
    totalPoints: st.skills.totalPoints,
    availablePoints: st.skills.points,
    skills: st.skills.skills,
    specialization: st.skills.specialization,
    canChooseSpecialization: st.skills.canChooseSpecialization,
  };
});

const branchLabels = {
  technology: '科技',
  cultivation: '修炼',
  general: '通用',
};

const skillCategories = computed(() => {
  if (!skillInfo.value) return null;

  const tech: { id: string; name: string; description: string; maxLevel: number; level: number; branch: SkillBranch }[] = [];
  const cultivation: { id: string; name: string; description: string; maxLevel: number; level: number; branch: SkillBranch }[] = [];
  const general: { id: string; name: string; description: string; maxLevel: number; level: number; branch: SkillBranch }[] = [];

  for (const [id, skill] of Object.entries(skillInfo.value.skills)) {
    const def = SKILL_DEF_MAP[id];
    if (!def) continue;
    const entry = { id, name: def.name, description: def.description, maxLevel: def.maxLevel, level: skill.level, branch: def.branch };
    if (def.branch === 'technology') {
      tech.push(entry);
    } else if (def.branch === 'cultivation') {
      cultivation.push(entry);
    } else {
      general.push(entry);
    }
  }

  return { tech, cultivation, general };
});

function getSkillLevel(skillId: string): number {
  if (!skillInfo.value) return 0;
  const skill = skillInfo.value.skills[skillId];
  return skill ? skill.level : 0;
}

function getMaxLevel(skillId: string): number {
  if (!skillInfo.value) return 3;
  const def = SKILL_DEF_MAP[skillId];
  return def ? def.maxLevel : 3;
}

function getSkillDescription(skillId: string): string {
  if (!skillInfo.value) return '';
  const def = SKILL_DEF_MAP[skillId];
  return def ? def.description : '';
}

function canUpgrade(skillId: string): boolean {
  if (!skillInfo.value) return false;
  const currentLevel = getSkillLevel(skillId);
  const maxLevel = getMaxLevel(skillId);
  return currentLevel < maxLevel && skillInfo.value.availablePoints > 0;
}

function upgradeSkill(skillId: string) {
  g.upgradeSkill?.(skillId);
}

function chooseSpecialization(branch: 'technology' | 'cultivation' | 'general') {
  g.chooseSpecialization?.(branch as SkillBranch);
}
</script>

<template>
  <div v-if="skillInfo" class="skill-panel">
    <h3 class="panel-title">技能树</h3>
    
    <div class="skill-header">
      <div class="points-info">
        <span class="label">总技能点:</span>
        <span class="value">{{ skillInfo.totalPoints }}</span>
      </div>
      <div class="available-points">
        <span class="label">可用点数:</span>
        <span class="value highlight">{{ skillInfo.availablePoints }}</span>
      </div>
    </div>

    <!-- 专精选择 -->
    <div v-if="skillInfo.canChooseSpecialization && !skillInfo.specialization" class="specialization-choice">
      <h4 class="section-title">选择专精方向（不可更改）</h4>
      <div class="spec-options">
        <button
          v-for="branch in ['technology', 'cultivation', 'general'] as const"
          :key="branch"
          class="spec-btn"
          @click="chooseSpecialization(branch)"
        >
          {{ branchLabels[branch] }}
        </button>
      </div>
    </div>

    <div v-if="skillInfo.specialization" class="current-spec">
      <span class="label">当前专精:</span>
      <span class="value">{{ branchLabels[skillInfo.specialization] }}</span>
    </div>

    <!-- 技能分类显示 -->
    <div v-if="skillCategories" class="skill-categories">
      <!-- 科技系 -->
      <div v-if="skillCategories.tech.length > 0" class="skill-category">
        <h4 class="category-title">🔬 科技系</h4>
        <div class="skill-list">
          <div v-for="skill in skillCategories.tech" :key="skill.id" class="skill-item">
            <div class="skill-header-row">
              <span class="skill-name">{{ skill.name }}</span>
              <span class="skill-level">Lv.{{ getSkillLevel(skill.id) }}/{{ getMaxLevel(skill.id) }}</span>
            </div>
            <p class="skill-desc">{{ getSkillDescription(skill.id) }}</p>
            <button 
              v-if="canUpgrade(skill.id)" 
              class="upgrade-btn"
              @click="upgradeSkill(skill.id)"
            >
              升级 (-1点)
            </button>
            <div v-else-if="getSkillLevel(skill.id) >= getMaxLevel(skill.id)" class="maxed">
              已达满级
            </div>
          </div>
        </div>
      </div>

      <!-- 修炼系 -->
      <div v-if="skillCategories.cultivation.length > 0" class="skill-category">
        <h4 class="category-title">✨ 修炼系</h4>
        <div class="skill-list">
          <div v-for="skill in skillCategories.cultivation" :key="skill.id" class="skill-item">
            <div class="skill-header-row">
              <span class="skill-name">{{ skill.name }}</span>
              <span class="skill-level">Lv.{{ getSkillLevel(skill.id) }}/{{ getMaxLevel(skill.id) }}</span>
            </div>
            <p class="skill-desc">{{ getSkillDescription(skill.id) }}</p>
            <button 
              v-if="canUpgrade(skill.id)" 
              class="upgrade-btn"
              @click="upgradeSkill(skill.id)"
            >
              升级 (-1点)
            </button>
            <div v-else-if="getSkillLevel(skill.id) >= getMaxLevel(skill.id)" class="maxed">
              已达满级
            </div>
          </div>
        </div>
      </div>

      <!-- 通用系 -->
      <div v-if="skillCategories.general.length > 0" class="skill-category">
        <h4 class="category-title">⚔️ 通用系</h4>
        <div class="skill-list">
          <div v-for="skill in skillCategories.general" :key="skill.id" class="skill-item">
            <div class="skill-header-row">
              <span class="skill-name">{{ skill.name }}</span>
              <span class="skill-level">Lv.{{ getSkillLevel(skill.id) }}/{{ getMaxLevel(skill.id) }}</span>
            </div>
            <div class="skill-progress">
              <div class="progress-track">
                <div class="progress-fill" :style="{ width: Math.round((getSkillLevel(skill.id) / getMaxLevel(skill.id)) * 100) + '%' }"></div>
              </div>
            </div>
            <p class="skill-desc">{{ getSkillDescription(skill.id) }}</p>
            <button 
              v-if="canUpgrade(skill.id)" 
              class="upgrade-btn"
              @click="upgradeSkill(skill.id)"
            >
              升级 (-1点)
            </button>
            <div v-else-if="getSkillLevel(skill.id) >= getMaxLevel(skill.id)" class="maxed">
              已达满级
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skill-panel {
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

.skill-header {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 6px;
}

.points-info, .available-points {
  display: flex;
  gap: 0.4rem;
  align-items: center;
  font-size: 0.85rem;
}

.points-info .label, .available-points .label {
  color: #8b95a7;
}

.points-info .value, .available-points .value {
  color: #e4e9f2;
  font-weight: 600;
}

.available-points .value.highlight {
  color: #c9a06a;
}

.specialization-choice {
  padding: 0.6rem;
  background: rgba(201, 160, 106, 0.08);
  border-radius: 6px;
}

.section-title {
  margin: 0 0 0.5rem 0;
  font-size: 0.85rem;
  color: #c9a06a;
  font-weight: 600;
}

.spec-options {
  display: flex;
  gap: 0.5rem;
}

.spec-btn {
  flex: 1;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  color: #e4e9f2;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.15s ease;
}

.spec-btn:hover {
  background: rgba(201, 160, 106, 0.15);
  border-color: #c9a06a;
}

.current-spec {
  display: flex;
  gap: 0.4rem;
  padding: 0.4rem 0.6rem;
  background: rgba(122, 162, 201, 0.08);
  border-radius: 6px;
  font-size: 0.85rem;
}

.current-spec .label {
  color: #8b95a7;
}

.current-spec .value {
  color: #7aa2c9;
  font-weight: 600;
}

.skill-categories {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.skill-category {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-title {
  margin: 0;
  font-size: 0.9rem;
  color: #aeb7c7;
  font-weight: 600;
}

.skill-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.skill-item {
  padding: 0.6rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.skill-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.skill-name {
  font-size: 0.9rem;
  color: #e4e9f2;
  font-weight: 600;
}

.skill-level {
  font-size: 0.82rem;
  color: #7aa2c9;
  font-weight: 600;
}

.skill-desc {
  margin: 0;
  font-size: 0.8rem;
  color: #8b95a7;
  line-height: 1.5;
}

.upgrade-btn {
  padding: 0.35rem 0.7rem;
  background: linear-gradient(135deg, #4f9d6f 0%, #3d8a5d 100%);
  border: none;
  border-radius: 6px;
  color: #fff;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  transition: all 0.15s ease;
  align-self: flex-start;
  box-shadow: 0 2px 8px rgba(79,157,111,0.25);
}

.upgrade-btn:hover {
  background: linear-gradient(135deg, #5ab87e 0%, #4f9d6f 100%);
  box-shadow: 0 4px 12px rgba(79,157,111,0.35);
  transform: translateY(-1px);
}

.maxed {
  font-size: 0.8rem;
  color: #4f9d6f;
  font-style: italic;
}
</style>
