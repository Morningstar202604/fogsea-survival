// 迁移脚本：旧版(04a5c60) ink 风格剧本 → 新 packages/core ContentPack
// 读取 src/content/_legacy/*.json，生成 src/content/full.ts（含主线 + 6 条触发式支线）。
// 精简模型：丢弃 relNpc/relDelta/morality/fogPressure/skill/skillLevel/shelterMin/apLeft/rel 等无对应字段。
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(process.cwd());
const LEG = 'packages/core/src/content/_legacy';
const OUT = 'packages/core/src/content/full.ts';

const RES_MAP = { food: 'food', water: 'water', health: 'health', sanity: 'sanity', energy: 'energy' };
const DROPPED = new Set(['relNpc', 'relDelta', 'morality', 'fogPressure', 'skill', 'skillLevel', 'shelterMin', 'apLeft', 'rel']);
const dropCount = {};

function asList(x) {
  if (x == null) return [];
  if (Array.isArray(x)) return x;
  if (typeof x === 'object') return Object.values(x);
  return [];
}
function readJson(p) {
  let raw = fs.readFileSync(path.join(ROOT, LEG, p), 'utf-8');
  if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
  return JSON.parse(raw);
}
function drop(kind) {
  dropCount[kind] = (dropCount[kind] || 0) + 1;
}

// 平铺效果对象（旧 outcome/event-result 的扁平字段）→ ChoiceEffect[]
function flatToEffects(o) {
  const effs = [];
  if (typeof o.sanity === 'number') effs.push({ kind: 'resource', resource: 'sanity', delta: o.sanity });
  if (o.resources && typeof o.resources === 'object') {
    for (const [k, v] of Object.entries(o.resources)) {
      const rk = RES_MAP[k];
      if (rk) effs.push({ kind: 'resource', resource: rk, delta: v });
      else drop('resources.' + k);
    }
  }
  if (o.stats && typeof o.stats === 'object') {
    for (const [k, v] of Object.entries(o.stats)) {
      const rk = RES_MAP[k];
      if (rk) effs.push({ kind: 'resource', resource: rk, delta: v });
      else drop('stats.' + k);
    }
  }
  for (const k of DROPPED) if (k in o) drop(k);
  if (Array.isArray(o.setFlags)) for (const f of o.setFlags) effs.push({ kind: 'flag', flag: f });
  if (Array.isArray(o.loseItems)) for (const it of o.loseItems) effs.push({ kind: 'item', item: it.itemId, amount: -(it.count ?? 1) });
  if (Array.isArray(o.gainItems)) for (const it of o.gainItems) effs.push({ kind: 'item', item: it.itemId, amount: it.count ?? 1 });
  return effs;
}

function convertRequires(req) {
  if (!req) return undefined;
  const cond = {};
  if (Array.isArray(req.flags) && req.flags.length) cond.flags = req.flags;
  if (Array.isArray(req.items) && req.items.length) {
    cond.items = {};
    for (const it of req.items) cond.items[it.itemId] = it.count ?? 1;
  }
  if (req.stats && typeof req.stats === 'object') {
    const res = {};
    for (const [k, v] of Object.entries(req.stats)) {
      const rk = RES_MAP[k];
      if (rk) res[rk] = v;
      else drop('req.stats.' + k);
    }
    if (Object.keys(res).length) cond.resources = res;
  }
  // 丢弃 skillLevel/apLeft/shelterMin/rel
  for (const k of ['skillLevel', 'apLeft', 'shelterMin', 'rel']) if (k in req) drop('req.' + k);
  return Object.keys(cond).length ? cond : undefined;
}

/** 清洗迁移文本：去 \r、压缩连续空行、去首尾空白，避免字符泄漏 */
function cleanText(t) {
  if (typeof t !== 'string') return t;
  return t.replace(/\r/g, '').replace(/\n{3,}/g, '\n\n').trim();
}

/** 清洗旁白数组：逐条清洗并剔除空串，join 后无 \n 残尾 */
function cleanNarr(narr) {
  return (narr || [])
    .filter((x) => typeof x === 'string' && x.trim().length > 0)
    .map((x) => cleanText(x));
}

function buildChoice(lineId, ch, effObj, narr, gather, suffix, selfId, localIdx) {
  let next;
  if (effObj.endingId) next = effObj.endingId;
  else if (typeof effObj.goto === 'string') {
    const owner = nodeOwner[effObj.goto];
    next = owner ? `${owner}__${effObj.goto}` : `${lineId}__${effObj.goto}`;
  } else next = selfId; // 无 goto/结局：停留当前节点继续叙事；全自循环节点由后续死锁修复兜底
  const effects = flatToEffects(effObj);
  const requires = convertRequires(ch.requires);
  const base = ch.id && String(ch.id).trim() && String(ch.id) !== 'c' ? String(ch.id) : `c_${localIdx}`;
  return {
    id: base + (suffix != null ? `_${suffix}` : ''),
    text: cleanText(ch.text) || '继续',
    effects,
    next,
    ...(requires ? { requires } : {}),
    ...(cleanNarr(narr).length ? { result: cleanNarr(narr).join('\n') } : {}),
  };
}

// ---- 读取旧数据 ----
const scenes = readJson('scenes.json').scenes;
const enRaw = readJson('endings.json');
const endings = {};
for (const e of enRaw.endings) endings[e.id] = { id: e.id, title: e.name, desc: e.desc, category: e.kind };

// 全局节点归属（旧剧本存在跨幕 goto，需按目标节点实际所属幕加前缀）
const nodeOwner = {};
for (const sd of scenes) for (const nd of asList(sd.nodes)) nodeOwner[nd.id] = sd.id;

// ---- 场景 → 触发式支线 ----
const lines = [];
for (const sd of scenes) {
  const scenesMap = {};
  for (const nd of asList(sd.nodes)) {
    const nodeId = `${sd.id}__${nd.id}`;
    const gather = nd.gather;
    const choices = [];
    for (const ch of asList(nd.choices)) {
      const outs = asList(ch.outcomes);
      const narr = outs.filter((o) => typeof o === 'string');
      const objs = outs.filter((o) => o && typeof o === 'object');
      if (objs.length === 0) {
        choices.push(buildChoice(sd.id, ch, {}, narr, gather, undefined, nodeId, choices.length));
      } else if (objs.length === 1) {
        choices.push(buildChoice(sd.id, ch, objs[0], narr, gather, undefined, nodeId, choices.length));
      } else {
        objs.forEach((o, i) => choices.push(buildChoice(sd.id, ch, o, narr, gather, i, nodeId, choices.length + i)));
      }
    }
    scenesMap[nodeId] = { id: nodeId, text: nd.text || '', choices };
  }
  const trigger = {};
  if (sd.trigger?.dayMin) trigger.dayMin = sd.trigger.dayMin;
  if (Array.isArray(sd.trigger?.flags)) trigger.flags = sd.trigger.flags;
  if (Array.isArray(sd.trigger?.notFlags)) trigger.notFlags = sd.trigger.notFlags;
  lines.push({
    id: sd.id,
    title: sd.name || sd.id,
    desc: '',
    trigger,
    initialScene: `${sd.id}__${sd.entry}`,
    scenes: scenesMap,
  });
}

// ---- 事件池 → randomEvents ----
const randomEvents = [];
const evFiles = fs.readdirSync(path.join(ROOT, LEG, 'events')).filter((f) => f.endsWith('.json'));
for (const fn of evFiles) {
  let json;
  try {
    json = readJson(path.join('events', fn));
  } catch (e) {
    console.warn('跳过无法解析的事件文件:', fn, '-', e.message);
    continue;
  }
  const lst = Array.isArray(json) ? json : json.events || json.items || [];
  for (const ev of lst) {
    if (!ev || typeof ev !== 'object') continue;
    const choices = [];
    for (const opt of asList(ev.options)) {
      const narr = [];
      const effs = [];
      for (const r of asList(opt.results)) {
        if (r.text) narr.push(r.text);
        if (r.effects && typeof r.effects === 'object') effs.push(...flatToEffects(r.effects));
      }
      choices.push({
        id: opt.id || `o_${choices.length}`,
        text: opt.text || '继续',
        effects: effs,
        next: '__return__',
        ...(narr.length ? { result: narr.join('\n') } : {}),
      });
    }
    randomEvents.push({
      id: ev.id,
      weight: typeof ev.weight === 'number' ? ev.weight : 0,
      minDay: 1,
      maxTriggers: ev.type === 'daily' ? -1 : 1,
      text: ev.text || '',
      choices,
    });
  }
}

// ---- 合成主线 ----
const storyline = {
  id: 'main',
  title: '迷雾降临',
  desc: '生存主循环（合成骨架，旧 6 条线作为触发式支线保留）',
  initialScene: 'start',
  scenes: {
    start: {
      id: 'start',
      text: '迷雾未散。木屋是你的据点——必须撑到救援来临，或揭开雾的真相。',
      choices: [
        { id: 'search', text: '出门搜寻物资', hint: '食物与水', effects: [{ kind: 'resource', resource: 'food', delta: 10 }, { kind: 'resource', resource: 'water', delta: 8 }], next: 'start' },
        { id: 'rest', text: '在屋里休整', hint: '恢复体力', effects: [{ kind: 'resource', resource: 'energy', delta: 15 }], next: 'start' },
        { id: 'fortify', text: '加固门窗', hint: '抵御夜袭', effects: [{ kind: 'flag', flag: 'fortified' }], next: 'start' },
      ],
    },
  },
  endings,
};

// ---- 校验与兜底：消除 dangling 跳转 / 线入口缺失 ----
const validSceneIds = new Set([
  ...Object.keys(storyline.scenes),
  ...lines.flatMap((l) => Object.keys(l.scenes)),
]);
const endingIds = new Set(Object.keys(endings));
let danglingCount = 0;

// 1) 线入口缺失 → 回退到线内首节点（再不行回退主线 start）
for (const line of lines) {
  if (!validSceneIds.has(line.initialScene)) {
    const first = Object.keys(line.scenes)[0];
    console.warn(`线入口缺失: line=${line.id} entry=${line.initialScene} → fallback ${first ?? 'start'}`);
    danglingCount++;
    line.initialScene = first ?? 'start';
  }
}

// 2) 选项 next 指向不存在场景/且非结局/非 __return__ → 回退线入口
function fixNext(lineId, next) {
  if (next === '__return__' || endingIds.has(next) || validSceneIds.has(next)) return next;
  const line = lines.find((l) => l.id === lineId);
  return line && validSceneIds.has(line.initialScene) ? line.initialScene : 'start';
}
for (const line of lines) {
  for (const node of Object.values(line.scenes)) {
    for (const ch of node.choices) {
      const fixed = fixNext(line.id, ch.next);
      if (fixed !== ch.next) {
        console.warn(`dangling 跳转修正: line=${line.id} node=${node.id} choice=${ch.id} next=${ch.next} → ${fixed}`);
        danglingCount++;
        ch.next = fixed;
      }
    }
  }
}

// 3) 支线死锁修复：节点全部选项 next 指向自身（玩家无法离开）→ 首选项改为 __return__ 出栈回主线
let selfLoopCount = 0;
for (const line of lines) {
  for (const [nodeId, node] of Object.entries(line.scenes)) {
    if (node.choices.length > 0 && node.choices.every((c) => c.next === nodeId)) {
      node.choices[0].next = '__return__';
      selfLoopCount++;
      console.warn(`支线死锁修复: line=${line.id} node=${nodeId} → 首选项出口 __return__`);
    }
  }
}

const fullContent = {
  version: 1,
  storyline,
  lines,
  randomEvents,
  income: [
    { resource: 'food', delta: -10 },
    { resource: 'water', delta: -10 },
  ],
  startingResources: { food: { current: 70, max: 100 }, water: { current: 70, max: 100 } },
};

const ts = `import type { ContentPack } from '../types.js';\n\n// 自动生成（scripts/migrate.mjs）：旧版 44 场 + 事件池 + 14 结局 迁移至新 ContentPack。\n// 主线为合成生存循环；6 条旧剧情线作为触发式支线(lines)。精简模型已丢弃关系/道德/雾压/天赋等字段。\nexport const fullContent: ContentPack = ${JSON.stringify(fullContent, null, 2)};\n`;
fs.writeFileSync(path.join(ROOT, OUT), ts, 'utf-8');

// ---- 报告 ----
const sceneTotal = lines.reduce((s, l) => s + Object.keys(l.scenes).length, 0);
console.log('=== 迁移报告 ===');
console.log('支线(lines):', lines.length);
console.log('展平场景节点:', sceneTotal);
console.log('随机事件:', randomEvents.length, '(weight>0:', randomEvents.filter((e) => e.weight > 0).length, ')');
console.log('结局:', Object.keys(endings).length);
console.log('死链修正计数(dangling):', danglingCount);
console.log('支线死锁修复计数(selfLoop):', selfLoopCount);
console.log('丢弃字段统计(精简模型无对应):', JSON.stringify(dropCount));
console.log('输出:', OUT);
