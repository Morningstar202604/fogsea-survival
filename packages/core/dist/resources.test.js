import { describe, it, expect } from 'vitest';
import { createResources, deltaResource, applyDailyConsumption } from './resources.js';
describe('Resource System', () => {
    describe('createResources', () => {
        it('should create resources with starting values', () => {
            const res = createResources({ food: 50, water: 30 });
            expect(res.food.current).toBe(50);
            expect(res.food.max).toBe(50);
            expect(res.water.current).toBe(30);
            expect(res.water.max).toBe(30);
        });
        it('should handle default starting values', () => {
            const res = createResources();
            expect(res.food.current).toBeGreaterThan(0);
            expect(res.water.current).toBeGreaterThan(0);
            expect(res.health.current).toBeGreaterThan(0);
            expect(res.sanity.current).toBeGreaterThan(0);
        });
    });
    describe('deltaResource', () => {
        it('should increase resource value', () => {
            const res = createResources({ food: 50 });
            deltaResource(res.food, 10);
            expect(res.food.current).toBe(60);
        });
        it('should decrease resource value', () => {
            const res = createResources({ food: 50 });
            deltaResource(res.food, -10);
            expect(res.food.current).toBe(40);
        });
        it('should not go below zero', () => {
            const res = createResources({ food: 5 });
            deltaResource(res.food, -10);
            expect(res.food.current).toBe(0);
        });
        it('should not exceed max', () => {
            const res = createResources({ food: 50, foodMax: 100 });
            deltaResource(res.food, 100);
            expect(res.food.current).toBeLessThanOrEqual(100);
        });
    });
    describe('applyDailyConsumption', () => {
        it('should apply daily consumption', () => {
            const state = {
                ...createResources({ food: 50, water: 30, health: 100, sanity: 100 }),
                day: 1,
                resources: createResources({ food: 50, water: 30, health: 100, sanity: 100 }),
            };
            const messages = applyDailyConsumption(state);
            expect(messages).toBeDefined();
        });
    });
});
//# sourceMappingURL=resources.test.js.map