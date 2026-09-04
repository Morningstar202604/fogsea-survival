import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Web 前端：Vue3 + Vite。消费 @fogsea/core（workspace 依赖）。
// host:true 便于同网段手机访问预览；port 固定 5173 与历史预览一致。
export default defineConfig({
  plugins: [vue()],
  server: { port: 5173, host: true },
  preview: { port: 4173, host: true },
  build: {
    // 面板已按 tab 分包（GameScreen defineAsyncComponent）；@fogsea/core 内容包体积天然较大，
    // 抬高告警阈值以聚焦真实问题（仍保留 code-splitting 收益）。
    chunkSizeWarningLimit: 1600,
    rolldownOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules') && (id.includes('/vue') || id.includes('\\vue'))) return 'vue';
        },
      },
    },
  },
});
