import { describe, it, expect } from 'vitest';
import { MONSTER_DATABASE } from './combat.js';
import { calculateCombatExp, calculateCombatPoints } from './combat.js';
describe('Combat System', () => {
    describe('Monster Database', () => {
        it('should have wild_dog monster', () => {
            const dog = MONSTER_DATABASE.wild_dog;
            expect(dog).toBeDefined();
            expect(dog.id).toBe('wild_dog');
            expect(dog.name).toBe('野狗');
            expect(dog.level).toBe(1);
            expect(dog.hp).toBe(30);
            expect(dog.attack).toBe(15);
            expect(dog.defense).toBe(5);
            expect(dog.agility).toBe(20);
            expect(dog.xpReward).toBe(20);
        });
        it('should have mutated_rat monster', () => {
            const rat = MONSTER_DATABASE.mutated_rat;
            expect(rat).toBeDefined();
            expect(rat.id).toBe('mutated_rat');
            expect(rat.name).toBe('变异鼠');
            expect(rat.level).toBe(1);
            expect(rat.hp).toBe(20);
            expect(rat.attack).toBe(10);
            expect(rat.defense).toBe(3);
            expect(rat.agility).toBe(30);
            expect(rat.xpReward).toBe(15);
        });
        it('should have shadow_wolf monster', () => {
            const wolf = MONSTER_DATABASE.shadow_wolf;
            expect(wolf).toBeDefined();
            expect(wolf.level).toBe(3);
            expect(wolf.hp).toBe(60);
            expect(wolf.attack).toBe(25);
            expect(wolf.defense).toBe(12);
            expect(wolf.agility).toBe(35);
        });
        it('should have all monsters with required fields', () => {
            const requiredFields = ['id', 'name', 'description', 'level', 'hp', 'attack', 'defense', 'agility', 'xpReward'];
            for (const [id, monster] of Object.entries(MONSTER_DATABASE)) {
                for (const field of requiredFields) {
                    expect(monster).toHaveProperty(field);
                }
            }
        });
    });
    describe('Combat Calculations', () => {
        it('should calculate combat experience', () => {
            const lvl1Exp = calculateCombatExp(1, false);
            const lvl1ExpWithBonus = calculateCombatExp(1, true);
            expect(lvl1Exp).toBeGreaterThan(0);
            expect(lvl1ExpWithBonus).toBeGreaterThan(lvl1Exp);
        });
        it('should calculate combat points', () => {
            const points = calculateCombatPoints(1, 10);
            expect(points).toBeGreaterThan(0);
        });
        it('should handle edge cases in experience calculation', () => {
            // Test with level 1
            expect(calculateCombatExp(1, false)).toBeDefined();
            // Test with higher level
            expect(calculateCombatExp(10, false)).toBeDefined();
            // Test with luck bonus
            expect(calculateCombatExp(1, true)).toBeDefined();
        });
    });
});
//# sourceMappingURL=combat.test.js.map