import { describe, it, expect } from 'vitest';
import { gainSkillPoints, createInitialSkillTree } from './skills.js';
describe('Skill System', () => {
    describe('createInitialSkillTree', () => {
        it('should create initial skill tree', () => {
            const state = createInitialSkillTree();
            expect(state).toBeDefined();
            expect(state.points).toBe(3); // Starting skill points
            expect(state.totalPoints).toBeGreaterThan(0);
            expect(state.skills).toBeDefined();
            expect(Object.keys(state.skills).length).toBeGreaterThan(0);
        });
        it('should have proper initial state structure', () => {
            const state = createInitialSkillTree();
            expect(state).toHaveProperty('points');
            expect(state).toHaveProperty('totalPoints');
            expect(state).toHaveProperty('skills');
            expect(state).toHaveProperty('canChooseSpecialization');
        });
    });
    describe('gainSkillPoints', () => {
        it('should gain skill points', () => {
            const state = createInitialSkillTree();
            const newState = gainSkillPoints(state, 2);
            expect(newState.points).toBe(5); // 3 + 2
        });
        it('should not exceed reasonable point limits', () => {
            const state = createInitialSkillTree();
            const newState = gainSkillPoints(state, 100);
            expect(newState.points).toBe(103);
        });
    });
});
//# sourceMappingURL=skills.test.js.map