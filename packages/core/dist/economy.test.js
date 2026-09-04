import { describe, it, expect } from 'vitest';
import { createInitialEconomy, applyIncome, updateMarketPrices } from './economy.js';
describe('Economy System', () => {
    describe('createInitialEconomy', () => {
        it('should create initial economy state', () => {
            const state = createInitialEconomy();
            expect(state).toBeDefined();
            expect(state.credits).toBeDefined();
            expect(state.reputation).toBeDefined();
        });
    });
    describe('applyIncome', () => {
        it('should apply income and handle death state', () => {
            const state = {
                ...createInitialEconomy(),
                resources: {
                    food: { current: 50, max: 100 },
                    water: { current: 30, max: 100 },
                    health: { current: 80, max: 100 },
                    sanity: { current: 80, max: 100 },
                },
                day: 1,
            };
            const result = applyIncome(state, {});
            expect(result).toBeDefined();
            expect(result.messages).toBeDefined();
        });
    });
    describe('updateMarketPrices', () => {
        it('should update market prices', () => {
            const state = {
                ...createInitialEconomy(),
                day: 5,
                resources: createResources({ food: 50, water: 30 }),
            };
            const result = updateMarketPrices(state, 5);
            expect(result).toBeDefined();
        });
    });
});
//# sourceMappingURL=economy.test.js.map