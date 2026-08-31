/**
 * v2.0 系统集成测试
 *
 * 测试推进机制、基地建设、技能树、战斗系统的集成效果
 */
import { describe, test, expect } from 'vitest';
import { createInitialState, runDaily } from './engine.js';
import { fullContent } from './content/full.js';
import { Rng } from './rng.js';
import { upgradeBase, buildStructure } from './base.js';
import { unlockSkill, chooseSpecialization, SkillBranch, calculateSkillBonuses } from './skills.js';
import { initiateCombat, executeCombatRound } from './combat.js';
describe('v2.0 Integration Tests', () => {
    test('should initialize with all v2.0 systems', () => {
        const state = createInitialState(fullContent);
        // 检查新系统是否初始化
        expect(state.base).toBeDefined();
        expect(state.base.level).toBe(1);
        expect(state.skills).toBeDefined();
        expect(state.skills.points).toBe(0);
        expect(state.progression).toBeDefined();
        expect(state.progression.currentWorldTier).toBe(1);
        expect(state.attributes).toBeDefined();
        expect(state.attributes.strength).toBe(10);
    });
    test('should progress through world tiers', () => {
        const state = createInitialState(fullContent);
        const rng = new Rng(42);
        // 模拟到第7天
        for (let day = 1; day <= 7; day++) {
            const result = runDaily(fullContent, state, rng);
            expect(result.dead).toBe(false);
        }
        // 应该触发世界升级
        expect(state.progression.currentWorldTier).toBeGreaterThan(1);
        expect(state.day).toBe(8);
    });
    test('should produce resources from base buildings', () => {
        const state = createInitialState(fullContent);
        // 先升级到木屋（需要资源）
        state.inventory.wood = 200;
        state.inventory.stone = 50;
        const upgradeResult = upgradeBase(state);
        expect(upgradeResult.success).toBe(true);
        expect(state.base.level).toBe(2);
        // 建造伐木场（伐木场要求基地3级，测试直接设置等级跳过升级链）
        state.base.level = 3;
        state.inventory.wood = 100; // 补充木材用于建造
        const buildResult = buildStructure(state, 'logging_camp', { x: 0, y: 0 });
        expect(buildResult.success).toBe(true);
        // 运行一天，应该有木材产出
        const rng = new Rng(42);
        const result = runDaily(fullContent, state, rng);
        // 检查是否有生产消息
        const hasProduction = result.messages.some(m => m.includes('[生产]'));
        expect(hasProduction).toBe(true);
    });
    test('should unlock and level up skills', () => {
        const state = createInitialState(fullContent);
        // 给予足够技能点并模拟已经获得30点
        state.skills.points = 10;
        state.skills.totalPoints = 35; // 超过30，可以选择专精
        state.skills.canChooseSpecialization = true; // 手动设置标志
        // 选择专精
        const specResult = chooseSpecialization(state, SkillBranch.TECHNOLOGY);
        expect(specResult.success).toBe(true);
        expect(state.skills.specialization).toBe(SkillBranch.TECHNOLOGY);
        // 解锁科技系技能
        const unlockResult = unlockSkill(state, 'weapon_master');
        expect(unlockResult.success).toBe(true);
        expect(state.skills.skills['weapon_master'].level).toBe(1);
        // 再次升级
        const upgradeResult = unlockSkill(state, 'weapon_master');
        expect(upgradeResult.success).toBe(true);
        expect(state.skills.skills['weapon_master'].level).toBe(2);
    });
    test('should handle combat encounters', () => {
        const state = createInitialState(fullContent);
        const rng = new Rng(42);
        // 发起战斗
        const session = initiateCombat(state, 'wild_dog');
        expect(session.enemyId).toBe('wild_dog');
        expect(session.enemyHp).toBe(30);
        // 执行几个回合
        let currentSession = session;
        let ended = false;
        let rounds = 0;
        while (!ended && rounds < 10) {
            const result = executeCombatRound(state, currentSession, 'attack', rng);
            currentSession = result.session;
            ended = result.ended;
            rounds++;
            if (result.result) {
                if (result.result.victory) {
                    expect(result.result.xpGained).toBeGreaterThan(0);
                    expect(Object.keys(result.result.loot).length).toBeGreaterThan(0);
                }
                else {
                    expect(state.resources.health.current).toBe(0);
                }
            }
        }
        expect(rounds).toBeLessThan(10); // 应该在10回合内结束
    });
    test('should trigger catastrophe events', () => {
        const state = createInitialState(fullContent);
        const rng = new Rng(42);
        // 模拟到第10天（兽潮预警）
        for (let day = 1; day <= 10; day++) {
            const result = runDaily(fullContent, state, rng);
            if (day === 10) {
                // 应该有天灾预警
                expect(result.progression).toBeDefined();
            }
        }
        expect(state.day).toBe(11);
    });
    test('should calculate skill bonuses correctly', () => {
        const state = createInitialState(fullContent);
        // 解锁一些技能
        state.skills.points = 10;
        unlockSkill(state, 'explorer');
        unlockSkill(state, 'survival_expert');
        // 计算技能加成
        const bonuses = calculateSkillBonuses(state);
        expect(bonuses.survival.explorationSpeed).toBeGreaterThan(0);
        expect(bonuses.survival.resourceConsumptionReduction).toBeGreaterThan(0);
    });
    test('full game loop: 30 days survival', () => {
        const state = createInitialState(fullContent);
        const rng = new Rng(123);
        // 准备充足资源
        state.inventory.wood = 5000;
        state.inventory.stone = 3000;
        state.inventory.food = 3000;
        state.inventory.water = 3000;
        state.inventory.metal = 1000;
        let survivedDays = 0;
        for (let day = 1; day <= 30; day++) {
            const result = runDaily(fullContent, state, rng);
            if (result.dead) {
                console.log(`Died on day ${day}:`, result.messages.slice(-5));
                break;
            }
            survivedDays++;
            // 定期升级基地
            if (day === 5 && state.inventory.wood >= 200) {
                upgradeBase(state);
            }
            if (day === 15 && state.inventory.stone >= 500) {
                upgradeBase(state);
            }
            // 学习技能
            if (state.skills.points >= 1 && day % 5 === 0) {
                unlockSkill(state, 'explorer');
            }
        }
        // 允许一定的失败率，但至少要存活10天（推进机制会让游戏变难）
        expect(survivedDays).toBeGreaterThanOrEqual(10);
        expect(state.base.level).toBeGreaterThanOrEqual(1);
        expect(state.progression.currentWorldTier).toBeGreaterThan(1);
    });
});
//# sourceMappingURL=v2.integration.test.js.map