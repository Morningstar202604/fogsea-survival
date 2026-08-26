// v0.7.1 场景补写执行器：合并三份手写内容并写回 scenes.json
import { readFileSync, writeFileSync } from 'node:fs';
import { ADD_DD } from './add_dd.mjs';
import { ADD_LK1 } from './add_lk1.mjs';
import { ADD_LK2 } from './add_lk2.mjs';

const P = 'assets/resources/configs/scenes.json';
let raw = readFileSync(P, 'utf8');
const bom = raw.charCodeAt(0) === 0xFEFF;
if (bom) raw = raw.slice(1);
const j = JSON.parse(raw);

const ADD = { ...ADD_DD, ...ADD_LK1, ...ADD_LK2 };

let added = 0;
const errors = [];
const nodeIndex = new Map(); // sceneId -> Map(nodeId -> node)
for (const sc of j.scenes) {
    nodeIndex.set(sc.id, new Map(sc.nodes.map(n => [n.id, n])));
}

for (const [key, choices] of Object.entries(ADD)) {
    const slash = key.indexOf('/');
    const sid = key.slice(0, slash);
    const nid = key.slice(slash + 1);
    const nd = nodeIndex.get(sid)?.get(nid);
    if (!nd) { errors.push(`节点不存在: ${key}`); continue; }
    for (const c of choices) {
        // 去重：同文本不重复添加
        if (nd.choices.some(x => x.text === c.text)) continue;
        nd.choices.push(structuredClone(c));
        added++;
    }
}

if (errors.length) {
    console.error('AUTHORING ERRORS:');
    errors.forEach(e => console.error(' ', e));
    process.exit(1);
}

writeFileSync(P, (bom ? '\uFEFF' : '') + JSON.stringify(j, null, 2) + '\n', 'utf8');
console.log('added:', added);

// 统计
let tc = 0, tn = 0; const thin = [];
for (const sc of j.scenes) {
    for (const nd of sc.nodes) {
        tn++; tc += nd.choices.length;
        if (nd.choices.length < 3) thin.push(`${sc.id}/${nd.id}=${nd.choices.length}`);
    }
}
console.log(`total: ${tc} choices / ${tn} nodes, avg ${(tc / tn).toFixed(1)}`);
console.log('thin(<3):', thin.length ? thin.join(' ') : 'none');

// flag 链路审计：setFlags 与 requires.flags 配对
const setF = new Set(), reqF = new Set();
for (const sc of j.scenes) for (const nd of sc.nodes) for (const c of nd.choices) {
    (c.requires?.flags ?? []).forEach(f => reqF.add(f));
    const outs = Array.isArray(c.outcomes) ? c.outcomes : [c.outcomes];
    outs.forEach(o => (o.effects?.setFlags ?? []).forEach(f => setF.add(f)));
}
const dangling = [...reqF].filter(f => !setF.has(f) && !['kid_met', 'laok_ally'].includes(f));
console.log('requires 无产出的 flag:', dangling.length ? dangling.join(' ') : 'none');
