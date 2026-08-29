
import { Rng, createInitialState, resolveScene, availableChoices, fullContent } from 'file:///D:/00000/quanmin-survival/packages/core/dist/index.js';

const state = createInitialState(fullContent, { runs: 0, unlockedEndings: [], bestDays: 0 });
console.log('currentScene:', state.currentScene);
console.log('pendingEvents:', JSON.stringify(state.pendingEvents));
const node = resolveScene(fullContent, state.currentScene);
console.log('scene id:', node?.id);
console.log('scene text:', node?.text);
console.log('raw choices count:', node?.choices?.length);
const av = availableChoices(node?.choices ?? [], state);
console.log('available choices count:', av.length);
console.log('available ids:', av.map(c => c.id).join(','));
console.log('resources:', JSON.stringify(state.resources));
