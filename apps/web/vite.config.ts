import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Web 前端：Vue3 + Vite。消费 @fogsea/core（workspace 依赖）。
// host:true 便于同网段手机访问预览；port 固定 5173 与历史预览一致。
export default defineConfig({
  plugins: [vue()],
  server: { port: 5173, host: true },
  preview: { port: 4173, host: true },
});
