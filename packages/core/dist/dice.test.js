import { describe, it, expect } from 'vitest';
import { rollD100, rollD20, rollD6 } from './dice.js';
import { createRng } from './rng.js';
describe('Dice System', () => {
    describe('rollD100', () => {
        it('should return a value between 1 and 100', () => {
            for (let i = 0; i < 100; i++) {
                const result = rollD100();
                expect(result).toBeGreaterThanOrEqual(1);
                expect(result).toBeLessThanOrEqual(100);
            }
        });
        it('should return consistent results with same seed', () => {
            const rng1 = createRng(42);
            const rng2 = createRng(42);
            const results1 = [];
            const results2 = [];
            for (let i = 0; i < 10; i++) {
                results1.push(rollD100(rng1));
                results2.push(rollD100(rng2));
            }
            expect(results1).toEqual(results2);
        });
    });
    describe('rollD20', () => {
        it('should return a value between 1 and 20', () => {
            for (let i = 0; i < 100; i++) {
                const result = rollD20();
                expect(result).toBeGreaterThanOrEqual(1);
                expect(result).toBeLessThanOrEqual(20);
            }
        });
    });
    describe('rollD6', () => {
        it('should return a value between 1 and 6', () => {
            for (let i = 0; i < 100; i++) {
                const result = rollD6();
                expect(result).toBeGreaterThanOrEqual(1);
                expect(result).toBeLessThanOrEqual(6);
            }
        });
    });
});
describe('Rng System', () => {
    it('should create Rng with seed', () => {
        const rng = createRng(123);
        expect(rng).toBeDefined();
    });
    it('should generate consistent random numbers', () => {
        const rng1 = createRng(42);
        const rng2 = createRng(42);
        const values1 = [];
        const values2 = [];
        for (let i = 0; i < 20; i++) {
            values1.push(rng1());
            values2.push(rng2());
        }
        expect(values1).toEqual(values2);
    });
});
//# sourceMappingURL=dice.test.js.map