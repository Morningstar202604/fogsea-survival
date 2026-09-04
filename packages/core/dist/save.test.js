import { describe, it, expect } from 'vitest';
import { exportState, importState } from './save.js';
describe('Save System', () => {
    it('should export state', () => {
        const state = {
            day: 5,
            resources: {
                food: { current: 50, max: 100 },
                water: { current: 30, max: 100 },
                health: { current: 80, max: 100 },
                sanity: { current: 80, max: 100 },
            },
            flags: {},
            inventory: {},
        };
        const exported = exportState(state);
        expect(exported).toBeDefined();
        expect(typeof exported).toBe('string');
    });
    it('should import state', () => {
        const original = {
            day: 5,
            resources: {
                food: { current: 50, max: 100 },
                water: { current: 30, max: 100 },
                health: { current: 80, max: 100 },
                sanity: { current: 80, max: 100 },
            },
            flags: {},
            inventory: {},
        };
        const exported = exportState(original);
        const imported = importState(exported);
        expect(imported).toBeDefined();
        expect(imported.day).toBe(5);
    });
});
//# sourceMappingURL=save.test.js.map