import { describe, it, expect } from 'vitest';
import { createInitialProgressionState, checkProgression, evaluateCatastrophe, resolveCatastrophe } from './progression.js';
describe('Progression System', () => {
    describe('createInitialProgressionState', () => {
        it('should create initial state with required fields', () => {
            const state = createInitialProgressionState();
            expect(state).toBeDefined();
            expect(state.level).toBe(1);
            expect(state.exp).toBe(0);
            expect(state.expToNext).toBeGreaterThan(0);
            expect(state.attributePoints).toBe(0);
            expect(state.skillPoints).toBe(0);
        });
    });
    describe('checkProgression', () => {
        it('should check progression and return messages', () => {
            const state = createInitialProgressionState();
            const result = checkProgression(state, {});
            expect(result).toBeDefined();
            expect(result.messages).toBeDefined();
        });
    });
    describe('evaluateCatastrophe', () => {
        it('should evaluate catastrophe', () => {
            const state = createInitialProgressionState();
            const result = evaluateCatastrophe(state, {});
            expect(result).toBeDefined();
            expect(result.messages).toBeDefined();
        });
    });
    describe('resolveCatastrophe', () => {
        it('should resolve catastrophe', () => {
            const state = createInitialProgressionState();
            const result = resolveCatastrophe(state, {}, {});
            expect(result).toBeDefined();
            expect(result.messages).toBeDefined();
        });
    });
});
//# sourceMappingURL=progression.test.js.map