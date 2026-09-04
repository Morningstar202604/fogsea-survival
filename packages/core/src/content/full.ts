import type { ContentPack } from '../types.js';
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
export const fullContent: ContentPack = {
  "version": "2.0.2",
  "storyline": { ...STORYLINE_DEF, "scenes": { ...STORYLINE_DEF.scenes } },
  "lines": LEGACY_LINES,
  "randomEvents": [...LEGACY_RANDOM_EVENTS],
"income": [
    {
      "resource": "warmth",
      "delta": -1
    }
  ],
  "startingResources": {
    "food": {
      "current": 80,
      "max": 100
    },
    "water": {
      "current": 80,
      "max": 100
    },
    "health": {
      "current": 100,
      "max": 100
    },
    "sanity": {
      "current": 100,
      "max": 100
    },
    "energy": {
      "current": 100,
      "max": 100
    },
    "warmth": {
      "current": 100,
      "max": 100
    }
  }
};

// v0.5.0: 合并第一阶段新增内容（序章扩展、老K引入、大事件兽潮、每日小事件）
fullContent.storyline.scenes = {
  ...fullContent.storyline.scenes,
  ...PHASE1_SCENES,
  ...PHASE2_SCENES,
  ...PHASE3_SCENES,
  ...PHASE4_SCENES,
  ...PHASE5_SCENES,
  ...PHASE6_SCENES,
  ...PHASE7_SCENES,
  ...PHASE8_SCENES,
  ...PHASE9_SCENES,
  ...PHASE10_SCENES,
};

if (!fullContent.randomEvents) fullContent.randomEvents = [];
fullContent.randomEvents = [...fullContent.randomEvents, ...PHASE1_EVENTS, ...PHASE2_EVENTS, ...PHASE3_EVENTS, ...PHASE4_EVENTS, ...PHASE5_EVENTS, ...PHASE6_EVENTS, ...PHASE7_EVENTS, ...PHASE8_EVENTS, ...PHASE9_EVENTS, ...PHASE10_EVENTS];
// 因果系统触发型事件（weight=0，仅由 CAUSAL_RELATIONS 的 event_trigger 引用）
fullContent.randomEvents = [...fullContent.randomEvents, ...CAUSAL_EVENTS];

// 额外内容扩展包：新增随机事件（场景需手动链接到主线）
fullContent.randomEvents = [...fullContent.randomEvents, ...getAllExtraEvents()];

// v4.0 扩展内容包：大幅增加游戏深度和广度
fullContent.randomEvents = [...fullContent.randomEvents, ...NEW_RANDOM_EVENTS];

