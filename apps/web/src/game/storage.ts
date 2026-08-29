/**
 * Web 端存档持久化：3 槽位 + 跨周目 meta。
 * 仅 UI 层依赖 localStorage，core 保持纯逻辑。
 */
import type { GameState, MetaState } from '@fogsea/core';
import { serialize, deserialize } from '@fogsea/core';

const SAVE_KEY = 'qs_saves_v1';
const META_KEY = 'qs_meta_v1';

export const SLOT_COUNT = 3;

export interface SlotInfo {
  day: number;
  updatedAt: string;
  outcome: { type: string; title: string } | null;
}

export interface SlotEntry {
  state: GameState | null;
  info: SlotInfo | null;
}

function defaultSlots(): SlotEntry[] {
  return Array.from({ length: SLOT_COUNT }, () => ({ state: null, info: null }));
}

export function readSlots(): SlotEntry[] {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return defaultSlots();
    const parsed = JSON.parse(raw) as { json: string | null; info: SlotInfo | null }[];
    if (!Array.isArray(parsed) || parsed.length !== SLOT_COUNT) return defaultSlots();
    return parsed.map((p) => {
      if (!p.json) return { state: null, info: p.info ?? null };
      try {
        return { state: deserialize(p.json), info: p.info ?? null };
      } catch {
        return { state: null, info: null };
      }
    });
  } catch {
    return defaultSlots();
  }
}

function persistSlots(slots: SlotEntry[]): void {
  const data = slots.map((s) => ({
    json: s.state ? serialize(s.state) : null,
    info: s.info,
  }));
  localStorage.setItem(SAVE_KEY, JSON.stringify(data));
}

export function writeSlot(index: number, state: GameState): SlotEntry[] {
  const slots = readSlots();
  const outcome = state.outcome
    ? { type: state.outcome.type, title: state.outcome.title }
    : null;
  slots[index] = {
    state,
    info: { day: state.day, updatedAt: new Date().toISOString(), outcome },
  };
  persistSlots(slots);
  return slots;
}

export function clearSlot(index: number): SlotEntry[] {
  const slots = readSlots();
  slots[index] = { state: null, info: null };
  persistSlots(slots);
  return slots;
}

export function readMeta(): MetaState {
  try {
    const raw = localStorage.getItem(META_KEY);
    if (!raw) return { runs: 0, unlockedEndings: [], bestDays: 0 };
    const m = JSON.parse(raw) as MetaState;
    return {
      runs: m.runs ?? 0,
      unlockedEndings: Array.isArray(m.unlockedEndings) ? m.unlockedEndings : [],
      bestDays: m.bestDays ?? 0,
    };
  } catch {
    return { runs: 0, unlockedEndings: [], bestDays: 0 };
  }
}

export function writeMeta(meta: MetaState): void {
  localStorage.setItem(META_KEY, JSON.stringify(meta));
}
