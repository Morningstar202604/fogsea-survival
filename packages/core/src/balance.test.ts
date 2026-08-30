import { describe, it, expect } from 'vitest';
import { fullContent } from './content/full.js';
import {
  createInitialState,
  runDaily,
  applyChoice,
  applyEventChoice,
  resolveScene,
  availableChoices,
  resolveEvent,
  executeCombatRound,
  evaluateCatastrophe,
  resolveCatastrophe,
  Rng,
} from './index.js';
import { CATASTROPHE_EVENTS } from './progression.js';

describe('自动进食（物品→资源转换）', () => {
  it('低存量时自动消耗背包食物/水', () => {
    const s = createInitialState(fullContent);
    s.resources.food.current = 10;
    s.resources.water.current = 10;
    s.inventory['food'] = 2;
    s.inventory['water'] = 2;
    const r = runDaily(fullContent, s, new Rng(1));
    expect(s.inventory['food']).toBe(1);
    expect(s.inventory['water']).toBe(1);
    expect(r.messages.some((m) => m.includes('吃了下来'))).toBe(true);
    expect(r.messages.some((m) => m.includes('喝了下来'))).toBe(true);
    // +30 补给应明显抵消当日消耗（tier1 约 -10/-8）
    expect(s.resources.food.current).toBeGreaterThan(20);
  });

  it('存量充足时不浪费物资', () => {
    const s = createInitialState(fullContent);
    s.resources.food.current = 80;
    s.inventory['food'] = 3;
    runDaily(fullContent, s, new Rng(1));
    expect(s.inventory['food']).toBe(3);
  });
});

describe('天灾结算（需求判定 + 奖惩落地）', () => {
  const wave1 = CATASTROPHE_EVENTS.find((e) => e.id === 'beast_wave_tier1')!;

  it('准备不足判定失败并列出原因', () => {
    const s = createInitialState(fullContent);
    const verdict = evaluateCatastrophe(s as any, wave1);
    expect(verdict.success).toBe(false);
    expect(verdict.messages.some((m) => m.includes('基地等级不足'))).toBe(true);
  });

  it('准备充分判定成功，奖励落地（XP→技能点、物品）', () => {
    const s = createInitialState(fullContent);
    s.base.level = 5;
    (s.base as any).totalDefense = 500;
    s.skills.points = 0;
    const verdict = evaluateCatastrophe(s as any, wave1);
    expect(verdict.success).toBe(true);
    const before = s.inventory['beast_core'] ?? 0;
    resolveCatastrophe(s as any, wave1, true);
    expect((s.inventory['beast_core'] ?? 0)).toBe(before + 3);
    expect(s.skills.points).toBeGreaterThanOrEqual(2); // xp 200 → 2 点
    expect(s.flags['unlocked_beast_hunting_technique']).toBe(true);
  });

  it('失败惩罚落地：资源、物品、生命三重损失', () => {
    const s = createInitialState(fullContent);
    s.resources.food.current = 80;
    s.resources.health.current = 100;
    s.inventory['wood'] = 60;
    resolveCatastrophe(s as any, wave1, false);
    expect(s.resources.food.current).toBe(30); // 80-50（资源类）
    expect(s.inventory['wood']).toBe(30); // 60-30（物品类损失）
    expect(s.resources.health.current).toBe(80); // 100-20
  });
});

describe('击杀获得积分', () => {
  it('战斗胜利后 economy.currency 增加', () => {
    const s = createInitialState(fullContent, undefined, 'strong_body');
    s.day = 5;
    s.combat = initiateCombatLocal(s, 'wild_dog');
    let guard = 0;
    let ended = false;
    let result: ReturnType<typeof executeCombatRound>['result'];
    while (!ended && guard++ < 300) {
      const r = executeCombatRound(s, s.combat!, 'attack', new Rng(guard));
      s.combat = r.session;
      ended = r.ended;
      result = r.result;
    }
    if (result?.victory) {
      expect(s.economy.currency).toBe(result.xpGained);
    }
  });
});

// 局部辅助：避免引入顶层 initiateCombat 与解构冲突
import { initiateCombat as initiateCombatLocal } from './combat.js';

describe('平衡回归：智能策略存活检查点', () => {
  // 策略：事件首选、支线避开结局、低存量搜寻、其余狩猎；
  // 预期：D17 饥饿螺旋已修复，死亡/结局不应早于 D30（D35 中级兽潮为首个设计压力墙）。
  const ENDINGS = new Set(Object.keys(fullContent.storyline.endings));

  function smartPolicy(s: ReturnType<typeof createInitialState>, rng: Rng): boolean {
    if (s.pendingEvents.length) {
      const ev = resolveEvent(fullContent, s.pendingEvents[0]);
      if (ev) {
        const cs = availableChoices(ev.choices, s);
        applyEventChoice(fullContent, s, cs[0] ?? ev.choices[0], rng);
      }
      return true;
    }
    const node = resolveScene(fullContent, s.currentScene);
    if (!node) return true;
    const choices = availableChoices(node.choices, s);
    if (!choices.length) return true;
    let pick;
    if (s.currentScene === 'start') {
      if (s.resources.food.current < 45 || s.resources.water.current < 40) {
        pick = choices.find((c) => c.id === 'search');
      } else if (s.resources.energy.current < 30) {
        pick = choices.find((c) => c.id === 'rest');
      } else {
        pick = choices.find((c) => c.id === 'hunt') ?? choices.find((c) => c.id === 'search');
      }
    } else {
      pick =
        choices.find((c) => c.next === '__return__') ??
        choices.find((c) => !ENDINGS.has(c.next)) ??
        choices[0];
    }
    if (!pick) return true;
    applyChoice(fullContent, s, pick, rng);
    return false;
  }

  it('10 个种子下均存活至第 30 天以后（或通关结局）', () => {
    for (let seed = 1; seed <= 10; seed++) {
      const s = createInitialState(fullContent, undefined, 'iron_stomach');
      const rng = new Rng(seed);
      for (let d = 1; d <= 60; d++) {
        let guard = 0;
        while (s.ap > 0 && guard++ < 12) {
          if (smartPolicy(s, rng)) break;
        }
        if (s.outcome) break;
        const r = runDaily(fullContent, s, rng);
        if (r.dead) break;
      }
      expect(s.day).toBeGreaterThanOrEqual(30);
    }
  });
});
