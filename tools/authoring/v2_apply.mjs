// v2_apply.mjs — 一次性执行 v0.8 全部扩展
// node tools/authoring/v2_apply.mjs
import { execSync } from 'node:child_process';
const run = cmd => { console.log(`\n▶ ${cmd}`); execSync(cmd, { stdio: 'inherit', cwd: 'D:\\00000\\quanmin-survival' }); };

run('node tools/authoring/expansion_v2.mjs');
run('node tools/authoring/add_doc.mjs');
run('node tools/authoring/add_rat.mjs');

console.log('\n✅ v0.8 全部扩展完成');
