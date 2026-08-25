import { defineConfig } from 'vite';

// 根目录 tsconfig.json 依赖 Cocos Creator 生成的 temp/tsconfig.cocos.json，
// 用 tsconfigRaw 让 esbuild 不去解析它；类型检查由 `npm run typecheck`（web 自己的 tsconfig）负责。
export default defineConfig({
    base: './',
    esbuild: {
        tsconfigRaw: {
            compilerOptions: {
                target: 'ES2020',
                useDefineForClassFields: true,
                experimentalDecorators: true,
            },
        },
    },
    server: { port: 5173 },
    build: { outDir: 'dist', target: 'es2020' },
});
