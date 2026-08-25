// 配置加载：Cocos resources 目录 JSON → 校验 → AllConfigs
// 本文件依赖 'cc'，仅供 Cocos 运行时使用；Web 版在入口注册 fetch 加载器即可
import { resources, JsonAsset } from 'cc';
import { buildAllConfigs } from './ConfigBuild';
import type { AllConfigs } from './ConfigSchema';
import { registerConfigLoader } from './GameManager';

function loadOne(path: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
        resources.load(path, JsonAsset, (err, asset) => {
            if (err) return reject(new Error(`加载配置失败: ${path}\n${err.message}`));
            resolve((asset as JsonAsset).json);
        });
    });
}

export async function loadAllConfigs(): Promise<AllConfigs> {
    return buildAllConfigs(loadOne);
}

registerConfigLoader(loadAllConfigs);
