import { test, expect } from 'vitest';
import { loadConfigsFromDisk } from '../shared/loadConfigs';
import { validateConfigs } from '../../assets/scripts/core/ConfigSchema';

const cfg = loadConfigsFromDisk();
const issues = validateConfigs(cfg);

test('ConfigSchema 全量 0 issue（含新增场景线）', () => {
  if (issues.length) {
    throw new Error(
      'ConfigSchema 校验失败 (' + issues.length + '):\n' +
        issues.map((i: any) => `${i.key ?? '?'}: ${i.msg ?? JSON.stringify(i)}`).join('\n')
    );
  }
  expect(issues).toEqual([]);
});

test('救援线 / 结晶真相线 各 8 幕齐全', () => {
  const scenes = cfg.scenes ?? [];
  const rescue = scenes.filter((s) => s.id.startsWith('rescue_s'));
  const crystal = scenes.filter((s) => s.id.startsWith('crystal_s'));
  expect(rescue.length).toBe(8);
  expect(crystal.length).toBe(8);
});

test('每条新幕 entry 节点存在', () => {
  const scenes = cfg.scenes ?? [];
  for (const s of scenes) {
    if (!s.id.startsWith('rescue_s') && !s.id.startsWith('crystal_s')) continue;
    const nodeIds = new Set(s.nodes.map((n) => n.id));
    expect(nodeIds.has(s.entry)).toBe(true);
  }
});
