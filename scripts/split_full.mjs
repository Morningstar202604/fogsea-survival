/**
 * 拆分 packages/core/src/content/full.ts（约 2.5 万行单文件）为可维护的模块：
 *   - content/storyline.ts    → 旧版主线剧本（storyline 对象：主循环 + 14 结局）
 *   - content/legacyLines.ts  → 旧 6 条触发式支线（lines 数组）
 *   - content/legacyEvents.ts → 旧事件池（randomEvents 数组）
 *   - full.ts                 → 仅剩组装器（含 income / startingResources 与尾部混入）
 *
 * 纯文本搬运：字符串感知的花括号匹配，内容字节级不变；由 validate.test.ts + 全量测试门禁。
 * 用法：node scripts/split_full.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const fullPath = join(root, 'packages/core/src/content/full.ts');
const text = readFileSync(fullPath, 'utf8');

// 幂等保护：full.ts 已是拆分态时拒绝重跑（避免把组装模板误当源内容）
if (text.includes("from './storyline.js'") || !text.includes('"randomEvents": [')) {
  console.log('full.ts 已是拆分态或结构异常，已中止（如需重跑请先 git checkout HEAD -- packages/core/src/content/full.ts）');
  process.exit(1);
}

/** 从 openIdx（指向 { 或 [）找到配对的闭合位置，返回闭合符后的下标。字符串与 \\" 转义均感知。 */
function findClose(src, openIdx) {
  const openCh = src[openIdx];
  const closeCh = openCh === '{' ? '}' : ']';
  let depth = 0;
  let inStr = false;
  let i = openIdx;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (c === '\\') { i += 1; continue; }
      if (c === '"') inStr = false;
      continue;
    }
    if (c === '"') { inStr = true; continue; }
    if (c === openCh) { depth += 1; continue; }
    if (c === closeCh) {
      depth -= 1;
      if (depth === 0) break;
    }
  }
  if (i >= src.length) throw new Error(`未找到 ${openCh} 的配对闭合符`);
  return i + 1;
}

const slice = (a, b) => text.slice(a, b).trimEnd();

const storyKey = text.indexOf('"storyline":');
const storyStart = text.indexOf('{', storyKey);
const storyEnd = findClose(text, storyStart);

const linesKey = text.indexOf('"lines":');
const linesStart = text.indexOf('[', linesKey);
const linesEnd = findClose(text, linesStart);

const eventsKey = text.indexOf('"randomEvents":');
const eventsStart = text.indexOf('[', eventsKey);
const eventsEnd = findClose(text, eventsStart);

const incomeStart = text.indexOf('"income":');
const objEndIdx = text.lastIndexOf('};');
if ([storyKey, linesKey, eventsKey, incomeStart, objEndIdx].some((v) => v < 0)) {
  throw new Error('未能定位全部顶层键，脚本中止（结构可能已变化）');
}

// 尾部合并块（fullContent 暴露后再混入 phase/extra 内容），原样保留
const tail = text.slice(objEndIdx + 2).trimStart();

const storylineText = slice(storyStart, storyEnd);
const linesText = slice(linesStart, linesEnd);
const eventsText = slice(eventsStart, eventsEnd);
const incomeBlock = slice(incomeStart, objEndIdx);

writeFileSync(
  join(root, 'packages/core/src/content/storyline.ts'),
  `import type { StorylineDef } from '../types.js';\n\n// 旧版主线剧本（合成生存主循环 + 14 结局）。\n// 由 scripts/split_full.mjs 从 full.ts 拆分生成，勿手改——重新生成请运行该脚本。\nexport const STORYLINE_DEF: StorylineDef = ${storylineText};\n`,
);

writeFileSync(
  join(root, 'packages/core/src/content/legacyLines.ts'),
  `import type { SceneLineDef } from '../types.js';\n\n// 旧 6 条触发式支线剧本。\n// 由 scripts/split_full.mjs 从 full.ts 拆分生成，勿手改。\nexport const LEGACY_LINES: SceneLineDef[] = ${linesText};\n`,
);

writeFileSync(
  join(root, 'packages/core/src/content/legacyEvents.ts'),
  `import type { RandomEventDef } from '../types.js';\n\n// 旧事件池（44 场时期带权重的随机事件）。\n// 由 scripts/split_full.mjs 从 full.ts 拆分生成，勿手改。\nexport const LEGACY_RANDOM_EVENTS: RandomEventDef[] = ${eventsText};\n`,
);

const head = `import type { ContentPack } from '../types.js';
import { STORYLINE_DEF } from './storyline.js';
import { LEGACY_LINES } from './legacyLines.js';
import { LEGACY_RANDOM_EVENTS } from './legacyEvents.js';
import { PHASE1_SCENES, PHASE1_EVENTS } from './phase1.js';
import { PHASE2_SCENES, PHASE2_EVENTS } from './phase2.js';
import { PHASE3_SCENES, PHASE3_EVENTS } from './phase3.js';
import { PHASE4_SCENES, PHASE4_EVENTS } from './phase4.js';
import { PHASE5_SCENES, PHASE5_EVENTS } from './phase5.js';
import { PHASE6_SCENES, PHASE6_EVENTS } from './phase6.js';
import { PHASE7_SCENES, PHASE7_EVENTS } from './phase7.js';
import { PHASE8_SCENES, PHASE8_EVENTS } from './phase8.js';
import { PHASE9_SCENES, PHASE9_EVENTS } from './phase9.js';
import { PHASE10_SCENES, PHASE10_EVENTS } from './phase10.js';
import { CAUSAL_EVENTS } from './causal-events.js';
import { getAllExtraEvents } from './extraContent.js';
import { NEW_RANDOM_EVENTS } from './expandedContent.js';

// 内容已拆分（scripts/split_full.mjs 一键重新生成）：主线剧本=storyline.ts、旧支线=legacyLines.ts、旧事件池=legacyEvents.ts。
// 本文件仅保留组装逻辑。
`;

const body = `export const fullContent: ContentPack = {
  "version": "2.0.2",
  "storyline": { ...STORYLINE_DEF, "scenes": { ...STORYLINE_DEF.scenes } },
  "lines": LEGACY_LINES,
  "randomEvents": [...LEGACY_RANDOM_EVENTS],
${incomeBlock}
};

${tail}
`;

writeFileSync(join(root, 'packages/core/src/content/full.ts'), head + body);
console.log('done: storyline.ts / legacyLines.ts / legacyEvents.ts / full.ts(assembler)');