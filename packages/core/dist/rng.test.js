import { describe, it, expect } from 'vitest';
import { createRng } from './rng.js';
describe('RNG System', () => {
    it('should create Rng with seed', () => {
        const rng = createRng(123);
        expect(rng).toBeDefined();
        expect(typeof rng).toBe('object');
    });
    it('should have required Rng properties', () => {
        const rng = createRng(42);
        expect(rng).toHaveProperty('seed');
        expect(rng).toHaveProperty('int');
        expect(rng).toHaveProperty('float');
    });
    it('should generate consistent random sequences', () => {
        const rng1 = createRng(12345);
        const rng2 = createRng(12345);
        const values1 = [];
        const values2 = [];
        for (let i = 0; i < 50; i++) {
            values1.push(rng1());
            values2.push(rng2());
        }
        expect(values1).toEqual(values2);
    });
    it('should produce different sequences with different seeds', () => {
        const rng1 = createRng(1);
        const rng2 = createRng(2);
        const values1 = [];
        const values2 = [];
        for (let i = 0; i < 20; i++) {
            values1.push(rng1());
            values2.push(rng2());
        }
        expect(values1).not.toEqual(values2);
    });
});
//# sourceMappingURL=rng.test.js.map