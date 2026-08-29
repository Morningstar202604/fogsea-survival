import { describe, it, expect } from 'vitest';
import { demoContent } from './content/index.js';
import { fullContent } from './content/full.js';
import {
  createInitialState,
  applyChoice,
  availableChoices,
  conditionMet,
  resolveScene,
  findEnding,
} from './engine.js';
import {
  serialize,
  deserialize,
  exportState,
  importState,
} from './save.js';
import type { Choice, ContentPack, GameState } from './types.js';
import { Rng } from './rng.js';

/** 在内容包里找到第一个带 requires 的选项（demo/full 均可） */
function firstRequiringChoice(content: ContentPack): { choice: Choice; sceneId: string } | null {
  for (const [id, node] of Object.entries(content.storyline.scenes)) {
    const c = node.choices.find((x) => x.requires);
    if (c) return { choice: c, sceneId: id };
  }
  for (const line of content.lines ?? []) {
    for (const [id, node] of Object.entries(line.scenes)) {
      const c = node.choices.find((x) => x.requires);
      if (c) return { choice: c, sceneId: id };
    }
  }
  return null;
}

function lastChoice(): Choice {
  return {
    id: 'test_last_choice',
    text: '测试末路选项',
    effects: [{ kind: 'resource', resource: 'food', delta: -9999 }],
  };
}

describe('core engine edge cases', () => {
  it('资源扣除钳制到 0，不越下界', () => {
    const s = createInitialState(demoContent);
    const before = s.resources.food.current;
    const r = applyChoice(demoContent, s, lastChoice(), new Rng(1));
    expect(s.resources.food.current).toBe(0);
    expect(s.resources.food.current).toBeGreaterThanOrEqual(0);
    expect(before).toBeGreaterThan(0);
    expect(r.outcome).toBeUndefined();
  });

  it('资源收益钳制到 max，不越上界', () => {
    const s = createInitialState(demoContent);
    const c: Choice = {
      id: 'test_boom',
      text: '测试暴富选项',
      effects: [{ kind: 'resource', resource: 'food', delta: 99999 }],
    };
    applyChoice(demoContent, s, c, new Rng(1));
    expect(s.resources.food.current).toBe(s.resources.food.max);
  });

  it('availableChoices 依据 requires 过滤选项', () => {
    const hit = firstRequiringChoice(fullContent);
    if (!hit) throw new Error('fullContent 未找到带 requires 的选项，测试前置失效');
    const { choice, sceneId } = hit;
    const cond = choice.requires!;
    const s = createInitialState(fullContent);
    s.currentScene = sceneId;

    // 满足条件时保留：把 requires 中出现的资源/物品/flags 全部补足
    const passState: GameState = structuredClone(s);
    for (const [res, v] of Object.entries(cond.resources ?? {})) {
      const key = res as keyof GameState['resources'];
      passState.resources[key] = { ...passState.resources[key], current: v };
    }
    for (const [item, min] of Object.entries(cond.items ?? {})) {
      passState.inventory[item] = min;
    }
    for (const f of cond.flags ?? []) passState.flags[f] = true;
    const withCond = availableChoices([choice], passState);
    expect(withCond.some((x) => x.id === choice.id)).toBe(true);

    // 破坏任一条件时被过滤：资源置 0 / 物品清 0 / flag 置反，取最先命中的一类
    const failState: GameState = structuredClone(s);
    const resKeys = Object.keys(cond.resources ?? {});
    const itemKeys = Object.keys(cond.items ?? {});
    if (resKeys.length) {
      const key = resKeys[0] as keyof GameState['resources'];
      failState.resources[key] = { ...failState.resources[key], current: 0 };
    } else if (itemKeys.length) {
      failState.inventory[itemKeys[0]] = 0;
    } else if ((cond.flags ?? []).length) {
      failState.flags[cond.flags![0]] = !failState.flags[cond.flags![0]];
    }
    const without = availableChoices([choice], failState);
    expect(without.some((x) => x.id === choice.id)).toBe(false);
  });

  it('conditionMet 对 undefined 恒真', () => {
    const s = createInitialState(demoContent);
    expect(conditionMet(undefined, s)).toBe(true);
  });

  it('支线 __return__ 出栈返回上级场景', () => {
    const s = createInitialState(demoContent);
    s.currentScene = 'some_line_scene';
    s.eventStack.push('start');
    const c: Choice = { id: 'test_ret', text: '返回', effects: [], next: '__return__' };
    applyChoice(demoContent, s, c, new Rng(1));
    expect(s.currentScene).toBe('start');
    expect(s.eventStack).toHaveLength(0);
  });

  it('跳转结局 id 时写入 outcome', () => {
    const s = createInitialState(fullContent);
    const eid = Object.keys(fullContent.storyline.endings)[0];
    const ed = findEnding(fullContent, eid)!;
    const c: Choice = { id: 'test_end', text: '走向结局', effects: [], next: eid };
    const r = applyChoice(fullContent, s, c, new Rng(1));
    expect(r.outcome?.type).toBe('ending');
    expect(s.outcome?.id).toBe(eid);
    expect(ed.title).toBeTruthy();
  });
});

describe('save roundtrip', () => {
  it('serialize/deserialize 保真', () => {
    const s = createInitialState(demoContent);
    applyChoice(demoContent, s, demoContent.storyline.scenes.start.choices[0], new Rng(1));
    const restored = deserialize(serialize(s));
    expect(restored).toEqual(s);
  });

  it('exportState/importState 保真且校验通过', () => {
    const s = createInitialState(demoContent);
    const txt = exportState(s);
    const back = importState(txt);
    expect(back).not.toBeNull();
    expect(back).toEqual(s);
  });

  it('导入数据被篡改时校验失败返回 null', () => {
    const s = createInitialState(demoContent);
    const txt = exportState(s);
    const [b64, crc] = txt.split(':');
    // 篡改 payload：把最后 4 个字符反转，校验和不变 → 必须拒绝
    const tampered = b64.slice(0, -4) + b64.slice(-4).split('').reverse().join('');
    expect(importState(`${tampered}:${crc}`)).toBeNull();
  });

  it('空串 / 非法结构导入返回 null', () => {
    expect(importState('')).toBeNull();
    expect(importState('abc:12345678')).toBeNull();
    expect(importState('not-valid')).toBeNull();
  });
});

describe('resolveScene 鲁棒性', () => {
  it('不存在的场景返回 null 不抛错', () => {
    const s = createInitialState(demoContent);
    expect(resolveScene(demoContent, 'no_such_scene')).toBeNull();
    // 引擎在空事件栈且场景丢失时也不崩溃
    const ev = resolveScene(fullContent, 'no_such_scene');
    expect(ev).toBeNull();
    expect(s).toBeDefined();
  });
});
