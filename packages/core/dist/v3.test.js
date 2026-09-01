import { describe, it, expect } from 'vitest';
import { fullContent } from './content/full.js';
import { createInitialState, runDaily, applyChoice, resolveScene, availableChoices, initiateCombat, executeCombatRound, getNpcStatuses, Rng, } from './index.js';
describe('行动点日循环', () => {
    it('新局 3 行动点，消耗 hub 行动后递减', () => {
        const s = createInitialState(fullContent);
        expect(s.ap).toBe(3);
        const scene = resolveScene(fullContent, s.currentScene);
        const search = scene.choices.find((c) => c.id === 'search');
        expect(search.apCost).toBe(1);
        applyChoice(fullContent, s, search, new Rng(1));
        expect(s.ap).toBe(2);
    });
    it('runDaily 晨间刷新行动点为 3', () => {
        const s = createInitialState(fullContent);
        s.ap = 0;
        runDaily(fullContent, s, new Rng(1));
        expect(s.ap).toBe(3);
    });
    it('income 并入每日消耗后，单日食物排水 = 消耗量（约 10）而非 20', () => {
        const s = createInitialState(fullContent);
        const before = s.resources.food.current;
        runDaily(fullContent, s, new Rng(1));
        const drained = before - s.resources.food.current;
        expect(drained).toBeGreaterThan(0);
        expect(drained).toBeLessThanOrEqual(12); // 仅每日消耗（tier1 food 10，四舍五入），无 income 叠加
    });
});
describe('主动狩猎战斗', () => {
    it('combat 效果直接开局战斗会话', () => {
        const s = createInitialState(fullContent, undefined, 'strong_body');
        s.day = 10;
        const before = s.combat;
        applyChoice(fullContent, s, { id: 't', text: 't', apCost: 1, effects: [{ kind: 'combat' }], next: '__return__' }, new Rng(1));
        expect(before).toBeUndefined();
        expect(s.combat).toBeDefined();
        expect(s.combat.enemyMaxHp).toBeGreaterThan(0);
        expect(s.ap).toBe(2);
    });
    it('hub 夜巡狩猎掷骰成功时进入战斗（多种子抽样）', () => {
        let seen = false;
        for (let seed = 1; seed <= 40 && !seen; seed++) {
            const s = createInitialState(fullContent, undefined, 'strong_body');
            const scene = resolveScene(fullContent, s.currentScene);
            const hunt = scene.choices.find((c) => c.id === 'hunt');
            const usable = availableChoices(scene.choices, s).find((c) => c.id === 'hunt');
            applyChoice(fullContent, s, usable ?? hunt, new Rng(seed));
            if (s.combat) {
                seen = true;
                expect(s.combat.log.length).toBeGreaterThan(0);
            }
        }
        expect(seen).toBe(true);
    });
    it('战斗胜利：击杀数与掉落落地', () => {
        const s = createInitialState(fullContent, undefined, 'strong_body');
        s.day = 5;
        s.combat = initiateCombat(s, 'wild_dog');
        const inv0 = { ...s.inventory };
        let guard = 0;
        let ended = false;
        let result;
        while (!ended && guard++ < 300) {
            const r = executeCombatRound(s, s.combat, 'attack', new Rng(guard));
            s.combat = r.session;
            ended = r.ended;
            result = r.result;
        }
        expect(result).toBeDefined();
        if (result?.victory) {
            expect(s.runStats.kills).toBe(1);
            for (const id of Object.keys(result.loot)) {
                expect(s.inventory[id]).toBeGreaterThan(inv0[id] ?? 0);
            }
        }
    });
});
describe('基地产出接入生存资源', () => {
    it('农田产出直接加到资源条 food', async () => {
        const { buildStructure } = await import('./base.js');
        const s = createInitialState(fullContent, undefined, 'craftsman');
        s.base.level = 4; // 农田需要 4 级基地
        s.inventory.wood = 500;
        s.inventory.stone = 500;
        const built = buildStructure(s, 'farm', { x: 0, y: 0 });
        expect(built.success).toBe(true);
        const before = s.resources.food.current;
        const r = runDaily(fullContent, s, new Rng(1));
        expect(r.messages.some((m) => m.includes('[生产]'))).toBe(true);
        // 产出 +20 food 直接进资源（无 income 排水，净增约 10）
        expect(s.resources.food.current).toBeGreaterThan(before);
    });
});
describe('NPC 羁绊', () => {
    it('走过朵朵支线场景累积好感，完结标记额外加成', () => {
        const s = createInitialState(fullContent);
        s.visitedScenes.push('duoduo_s1_meet', 'duoduo_s2_frog', 'duoduo_s3_letters');
        const before = getNpcStatuses(s).find((n) => n.id === 'duoduo');
        expect(before.favor).toBe(36);
        expect(before.levelName).toBe('信赖');
        s.flags['line_done_duoduo_s1_meet'] = true;
        const after = getNpcStatuses(s).find((n) => n.id === 'duoduo');
        expect(after.favor).toBe(46);
        expect(after.lineDone).toBe(true);
    });
    it('花名册包含 6 位角色且好感有上限', () => {
        const s = createInitialState(fullContent);
        s.visitedScenes.push(...Array.from({ length: 20 }, (_, i) => `duoduo_s${(i % 8) + 1}_x`));
        const duoduo = getNpcStatuses(s).find((n) => n.id === 'duoduo');
        expect(getNpcStatuses(s).length).toBe(6);
        expect(duoduo.favor).toBeLessThanOrEqual(100);
    });
});
//# sourceMappingURL=v3.test.js.map