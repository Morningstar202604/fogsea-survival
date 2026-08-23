import { defineConfig } from 'vitest/config';

export default defineConfig({
    // 忽略游戏根目录的 tsconfig（它 extends 引擎生成的文件，编辑器首次打开才存在）
    esbuild: {
        tsconfigRaw: '{}',
    },
    test: {
        include: ['tests/**/*.test.ts'],
        environment: 'node',
    },
});
