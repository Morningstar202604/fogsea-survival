/**
 * v1.0 NPC 羁绊系统
 *
 * 全民求生流的"队伍/羁绊"钩子：与主角产生联结的幸存者们。
 * 好感度由玩家在对应角色支线中走过的场景数推导（探索越多越亲密），
 * 无需内容侧逐条埋点；支线完结（line_done_* 标记）额外加成。
 */
import type { GameState } from './types.js';

export interface NpcDef {
  id: string;
  name: string;
  title: string;
  /** 对应支线场景 id 前缀 */
  linePrefix: string;
  /** 支线首个场景 id（用于检测 line_done_ 标记） */
  entryScene: string;
  description: string;
}

export const NPC_ROSTER: NpcDef[] = [
  {
    id: 'duoduo',
    name: '朵朵',
    title: '邻家的妹妹',
    linePrefix: 'duoduo_',
    entryScene: 'duoduo_s1_meet',
    description: '在便利店废墟里遇到的女孩，把你的木屋当成了全世界的安全岛。',
  },
  {
    id: 'laok',
    name: '老K',
    title: '沉默的巡逻者',
    linePrefix: 'laok_',
    entryScene: 'laok_s1_pact',
    description: '前特种兵，话少枪稳。他守夜的时候，你能睡个整觉。',
  },
  {
    id: 'doc',
    name: '林医生',
    title: '雾中的医者',
    linePrefix: 'doc_',
    entryScene: 'doc_s1_housecall',
    description: '背着药箱挨家问诊的执拗人。在雾海里，一板抗生素比黄金贵。',
  },
  {
    id: 'rat',
    name: '鼠王',
    title: '下水道的君主',
    linePrefix: 'rat_',
    entryScene: 'rat_s1_return',
    description: '地下的情报贩子与规则制定者。他认识每一个人，包括不该认识的人。',
  },
  {
    id: 'rescue',
    name: '救援队',
    title: '无线电那头的声音',
    linePrefix: 'rescue_',
    entryScene: 'rescue_s1_wreck',
    description: '7 号避难所的幸存者们。信号接通的那一刻，雾海不再只有你一个人。',
  },
  {
    id: 'crystal',
    name: '结晶之声',
    title: '矿脉的低语',
    linePrefix: 'crystal_',
    entryScene: 'crystal_s1_vein',
    description: '紫色结晶里的存在。它自称朋友——雾里的东西都这么说。',
  },
];

/** 羁绊等级（0-100 好感度映射） */
const FAVOR_LEVELS: Array<{ min: number; name: string }> = [
  { min: 80, name: '生死之交' },
  { min: 55, name: '挚友' },
  { min: 30, name: '信赖' },
  { min: 10, name: '相识' },
  { min: 0, name: '陌生' },
];

export interface NpcStatus extends NpcDef {
  favor: number;
  levelName: string;
  lineDone: boolean;
}

/** 汇总全体 NPC 羁绊状态（纯函数，UI 直接消费）。 */
export function getNpcStatuses(state: GameState): NpcStatus[] {
  const visited = new Set(state.visitedScenes ?? []);
  return NPC_ROSTER.map((npc) => {
    let favor = 0;
    for (const sceneId of visited) {
      if (sceneId.startsWith(npc.linePrefix)) favor += 12;
    }
    const done = !!state.flags[`line_done_${npc.entryScene}`];
    if (done) favor += 10;
    favor = Math.min(100, favor);
    const levelName = FAVOR_LEVELS.find((l) => favor >= l.min)?.name ?? '陌生';
    return { ...npc, favor, levelName, lineDone: done };
  });
}
