<script setup lang="ts">
import { useGame } from './game/useGame';
import MainMenu from './components/MainMenu.vue';
import GameScreen from './components/GameScreen.vue';

const g = useGame();
</script>

<template>
  <div class="app">
    <MainMenu v-if="g.screen === 'menu'" />
    <GameScreen v-else />

    <Transition name="toast">
      <div v-if="g.toast" class="toast">{{ g.toast }}</div>
    </Transition>
  </div>
</template>

<style>
:root {
  color-scheme: dark;
}
* {
  box-sizing: border-box;
}
html,
body {
  margin: 0;
  padding: 0;
}
body {
  font-family: system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', Roboto, sans-serif;
  background: radial-gradient(140% 120% at 50% 0%, #1a2130 0%, #0b0e15 72%);
  color: #cdd6e4;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}
#app {
  min-height: 100vh;
}
.toast {
  position: fixed;
  top: 1.2rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(18, 24, 36, 0.92);
  border: 1px solid rgba(122, 162, 201, 0.4);
  color: #dde4ee;
  padding: 0.55rem 1.2rem;
  border-radius: 999px;
  font-size: 0.9rem;
  z-index: 100;
  pointer-events: none;
}
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-8px);
}
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.14);
  border-radius: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
</style>
