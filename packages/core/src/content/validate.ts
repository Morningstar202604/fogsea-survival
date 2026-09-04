/**
 * 内容校验器（SchemaValidator）。
 * 对齐开发设计文档 §3.11 规则清单，按当前精简 schema 落地。
 * 重点覆盖迁移缺陷三类：选项重复 / next 自循环 / 字符泄漏。
 * 返回 ValidationIssue[]；空数组 = 通过。
 */
import type {
  Choice,
  ContentPack,
  EndingDef,
  SceneNode,
} from '../types.js';
import { RESOURCE_KEYS } from '../resources.js';

export interface ValidationIssue {
  code: string;
  path: string;
  msg: string;
}

/** 场景 id 全集：主线场景 + 全部支线场景 */
function allSceneIds(content: ContentPack): Set<string> {
  const ids = new Set(Object.keys(content.storyline.scenes));
  for (const line of content.lines ?? []) for (const id of Object.keys(line.scenes)) ids.add(id);
  return ids;
}

function endingIds(content: ContentPack): Set<string> {
  const ids = new Set(Object.keys(content.storyline.endings));
  for (const line of content.lines ?? []) for (const id of Object.keys(line.endings ?? {})) ids.add(id);
  return ids;
}

/** 文本清洗质量检查：换行残尾 / 模板占位 / markdown 痕迹 / 控制字符 */
function textLeakIssues(text: string, path: string): ValidationIssue[] {
  const out: ValidationIssue[] = [];
  if (text.includes('{') && text.includes('}')) {
    const m = text.match(/\{[^}\n]{1,40}\}/);
    if (m) out.push({ code: 'V12', path, msg: `疑似模板占位未解析: ${m[0]}` });
  }
  if (/\*\*|^#+\s|`|\[.*\]\(/.test(text)) {
    out.push({ code: 'V12', path, msg: '疑似 markdown 标记残留' });
  }
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(text)) {
    out.push({ code: 'V12', path, msg: '含控制字符' });
  }
  if (/\\r/.test(text)) {
    out.push({ code: 'V12', path, msg: '含 \\r 转义残留' });
  }
  if (text !== text.trimEnd()) {
    out.push({ code: 'V12', path, msg: '文本尾部含空白/换行残留' });
  }
  return out;
}

/** 校验单个选项 */
function validateChoice(
  choice: Choice,
  path: string,
  sceneIdSet: Set<string>,
  endingIdSet: Set<string>,
  issues: ValidationIssue[],
  seenChoiceIds: Set<string>,
): void {
  if (!choice.id) {
    issues.push({ code: 'V5', path, msg: '选项缺少 id' });
  } else if (seenChoiceIds.has(choice.id)) {
    issues.push({ code: 'V5', path, msg: `选项 id 重复: ${choice.id}` });
  } else {
    seenChoiceIds.add(choice.id);
  }
  if (!choice.text) issues.push({ code: 'V1', path, msg: '选项缺少文案' });

  // next 可达性
  if (choice.next === '__return__') {
    // 事件选项允许 return 出栈；普通场景里 return 需有事件栈兜底（运行时容错，不判错）
  } else if (endingIdSet.has(choice.next)) {
    // 结局跳转合法
  } else if (sceneIdSet.has(choice.next)) {
    // 场景跳转合法
  } else {
    issues.push({ code: 'V1', path, msg: `next 指向不存在的目标: ${choice.next}` });
  }

  // 自循环：选项 next 指向自身所在节点（无其它出口的直连自循环）
  if (choice.next === path && choice.effects.length === 0) {
    issues.push({ code: 'V11', path, msg: `选项自循环且无效果（next==自身）: ${choice.id}` });
  }

  // 效果合法性
  for (const eff of choice.effects) {
    const ep = `${path}->${choice.id}.effects`;
    switch (eff.kind) {
      case 'resource':
        if (!eff.resource || !RESOURCE_KEYS.includes(eff.resource)) {
          issues.push({ code: 'V4', path: ep, msg: `非法资源键: ${String(eff.resource)}` });
        }
        if (typeof eff.delta !== 'number') issues.push({ code: 'V4', path: ep, msg: 'resource delta 非数字' });
        break;
      case 'flag':
        if (!eff.flag) issues.push({ code: 'V7', path: ep, msg: 'flag 效果缺少 flag 名' });
        break;
      case 'item':
        if (!eff.item) issues.push({ code: 'V7', path: ep, msg: 'item 效果缺少 item id' });
        break;
      case 'roll': {
        const rd = eff.difficulty ?? 50;
        if (rd < 0 || rd > 100) issues.push({ code: 'V10', path: ep, msg: `检定难度越界: ${rd}` });
        if (eff.onFail && !sceneIdSet.has(eff.onFail) && !endingIdSet.has(eff.onFail)) {
          issues.push({ code: 'V2', path: ep, msg: `检定失败分支不存在: ${eff.onFail}` });
        }
        if (eff.onSuccess && !sceneIdSet.has(eff.onSuccess) && !endingIdSet.has(eff.onSuccess)) {
          issues.push({ code: 'V2', path: ep, msg: `检定成功分支不存在: ${eff.onSuccess}` });
        }
        for (const se of eff.successEffects ?? []) {
          if (se.kind === 'resource' && (!se.resource || !RESOURCE_KEYS.includes(se.resource))) {
            issues.push({ code: 'V4', path: ep, msg: `successEffects 非法资源键: ${String(se.resource)}` });
          }
        }
        break;
      }
      case 'jump':
        if (eff.target && !sceneIdSet.has(eff.target) && !endingIdSet.has(eff.target)) {
          issues.push({ code: 'V1', path: ep, msg: `jump 目标不存在: ${eff.target}` });
        }
        break;
      case 'combat':
        // 战斗效果：monster 缺省时引擎按天数自动选怪，无内容可校验
        break;
      default:
        issues.push({ code: 'V3', path: ep, msg: `未知效果类型: ${String((eff as { kind?: unknown }).kind)}` });
    }
  }

  // 条件引用
  if (choice.requires) {
    const rp = `${path}->${choice.id}.requires`;
    for (const k of Object.keys(choice.requires.resources ?? {})) {
      if (!RESOURCE_KEYS.includes(k as never)) {
        issues.push({ code: 'V4', path: rp, msg: `requires 非法资源键: ${k}` });
      }
    }
  }

  // 文本泄漏
  if (choice.text) issues.push(...textLeakIssues(choice.text, `${path}->${choice.id}.text`));
  if (choice.result) issues.push(...textLeakIssues(choice.result, `${path}->${choice.id}.result`));
  if (choice.hint) issues.push(...textLeakIssues(choice.hint, `${path}->${choice.id}.hint`));
}

/** 校验单个场景节点 */
function validateSceneNode(
  node: SceneNode,
  path: string,
  sceneIdSet: Set<string>,
  endingIdSet: Set<string>,
  issues: ValidationIssue[],
  isMainline: boolean,
): void {
  if (!node.text) issues.push({ code: 'V1', path, msg: '场景缺少正文' });
  else issues.push(...textLeakIssues(node.text, `${path}.text`));
  const seen = new Set<string>();
  for (let i = 0; i < node.choices.length; i++) {
    validateChoice(node.choices[i], path, sceneIdSet, endingIdSet, issues, seen);
  }
  // 死锁：所有选项都指向自身（无法离开）。
  // 主线 start 是主循环 hub（行动→结算→回 start），属刻意设计，豁免。
  if (!isMainline && node.choices.length > 0) {
    const allSelf = node.choices.every((c) => c.next === path);
    if (allSelf) issues.push({ code: 'V11', path, msg: `节点所有选项均指向自身（死循环，玩家无法离开）` });
  }
}

/** 校验结局定义 */
function validateEnding(e: EndingDef, path: string, issues: ValidationIssue[]): void {
  if (!e.title) issues.push({ code: 'V8', path, msg: '结局缺少标题' });
  if (!e.desc) issues.push({ code: 'V8', path, msg: '结局缺少描述' });
  else issues.push(...textLeakIssues(e.desc, `${path}.desc`));
}

/** 全量校验一个 ContentPack，返回错误清单（空数组=通过） */
export function validateContentPack(content: ContentPack): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const scenes = allSceneIds(content);
  const endings = endingIds(content);

  // 版本
  if (typeof content.version !== 'string' || !/^\d+\.\d+\.\d+$/.test(content.version)) issues.push({ code: 'V1', path: 'version', msg: 'version 非法，应为 x.y.z 格式' });

  // 主线
  const story = content.storyline;
  if (!story.initialScene || !scenes.has(story.initialScene)) {
    issues.push({ code: 'V1', path: 'storyline', msg: `主线入口场景不存在: ${story.initialScene}` });
  }
  const mainSeen = new Set<string>();
  for (const [id, node] of Object.entries(story.scenes)) {
    validateSceneNode(node, `storyline.${id}`, scenes, endings, issues, true);
    if (mainSeen.has(id)) issues.push({ code: 'V5', path: `storyline.${id}`, msg: `主线场景 id 重复: ${id}` });
    mainSeen.add(id);
  }
  for (const [id, e] of Object.entries(story.endings)) validateEnding(e, `storyline.endings.${id}`, issues);

  // 支线
  const lineSeen = new Set<string>();
  for (const line of content.lines ?? []) {
    if (lineSeen.has(line.id)) issues.push({ code: 'V5', path: `lines.${line.id}`, msg: `支线 id 重复: ${line.id}` });
    lineSeen.add(line.id);
    if (!line.scenes[line.initialScene]) {
      issues.push({ code: 'V1', path: `lines.${line.id}`, msg: `支线入口场景不存在: ${line.initialScene}` });
    }
    if (line.trigger) {
      const t = line.trigger;
      if (t.dayMin != null && (!Number.isInteger(t.dayMin) || t.dayMin < 1)) {
        issues.push({ code: 'V10', path: `lines.${line.id}.trigger`, msg: 'dayMin 非法' });
      }
    }
    const lineSeenIds = new Set<string>();
    for (const [id, node] of Object.entries(line.scenes)) {
      if (lineSeenIds.has(id)) issues.push({ code: 'V5', path: `lines.${line.id}.${id}`, msg: `场景 id 重复: ${id}` });
      lineSeenIds.add(id);
      validateSceneNode(node, `lines.${line.id}.${id}`, scenes, endings, issues, false);
    }
    for (const [id, e] of Object.entries(line.endings ?? {})) {
      validateEnding(e, `lines.${line.id}.endings.${id}`, issues);
    }
  }

  // 事件池
  const evSeen = new Set<string>();
  for (const ev of content.randomEvents) {
    if (evSeen.has(ev.id)) issues.push({ code: 'V5', path: `randomEvents.${ev.id}`, msg: `事件 id 重复: ${ev.id}` });
    evSeen.add(ev.id);
    if (typeof ev.weight !== 'number' || !isFinite(ev.weight)) {
      issues.push({ code: 'V10', path: `randomEvents.${ev.id}`, msg: '权重非数字' });
    }
    if (ev.minDay != null && (!Number.isInteger(ev.minDay) || ev.minDay < 1)) {
      issues.push({ code: 'V10', path: `randomEvents.${ev.id}`, msg: 'minDay 非法' });
    }
    if (ev.text) issues.push(...textLeakIssues(ev.text, `randomEvents.${ev.id}.text`));
    const seen = new Set<string>();
    for (let i = 0; i < ev.choices.length; i++) {
      const c = ev.choices[i];
      // 事件选项 next 只允许 __return__ 或结局
      if (c.next !== '__return__' && !endings.has(c.next)) {
        issues.push({
          code: 'V1',
          path: `randomEvents.${ev.id}.choices[${i}]`,
          msg: `事件选项 next 应为 __return__ 或结局，实际: ${c.next}`,
        });
      }
      validateChoice(c, `randomEvents.${ev.id}.choices[${i}]`, scenes, endings, issues, seen);
    }
  }

  // 每日结算资源键
  for (const rule of content.income) {
    if (!RESOURCE_KEYS.includes(rule.resource)) {
      issues.push({ code: 'V4', path: `income.${rule.resource}`, msg: `收入规则非法资源键: ${rule.resource}` });
    }
  }
  for (const [k, v] of Object.entries(content.startingResources)) {
    if (!RESOURCE_KEYS.includes(k as never)) {
      issues.push({ code: 'V4', path: `startingResources.${k}`, msg: `初始资源非法资源键: ${k}` });
    }
    if (v.current < 0 || v.current > v.max) {
      issues.push({ code: 'V4', path: `startingResources.${k}`, msg: `初始资源越界 [0,${v.max}]` });
    }
  }

  return issues;
}

/** 便捷封装：返回是否通过 */
export function isContentValid(content: ContentPack): boolean {
  return validateContentPack(content).length === 0;
}
