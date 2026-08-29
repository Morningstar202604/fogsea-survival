/**
 * 游戏会话组合式函数：连接 @survival/core 引擎与 Vue UI。
 * 负责：新局/续档、选项应用、每日推进、叙事日志、存档持久化、导入导出。
 * 返回 reactive 代理本身（不解构），保证 UI 响应式。
 */
import { reactive, computed, toRefs } from 'vue';
import {
  Rng,
  createInitialState,
  fullContent,
  resolveScene,
  resolveEvent,
  availableChoices,
  applyChoice,
  applyEventChoice,
  runDaily,
  exportState,
  importState,
  upgradeBase,
  unlockSkill,
  chooseSpecialization,
  buyFromMerchant,
  sellToMerchant,
  executeCombatRound,
  type GameState,
  type Choice,
} from '@survival/core';
import {
  readSlots,
  writeSlot,
  readMeta,
  writeMeta,
  clearSlot,
  SLOT_COUNT,
  type SlotEntry,
} from './storage';

export type Screen = 'menu' | 'game';

export interface LogItem {
  text: string;
  kind: 'scene' | 'result' | 'daily' | 'system';
}

export interface GameSession {
  screen: Screen;
  state: GameState | null;
  slots: SlotEntry[];
  activeSlot: number;
  log: LogItem[];
  toast: string;
  viewText: string;
  viewChoices: Choice[];
  inEvent: boolean;
  eventText: string;
  newGame: (slot: number) => void;
  continueGame: (slot: number) => void;
  choose: (choice: Choice) => void;
  endDay: () => void;
  backToMenu: () => void;
  exportSave: () => string;
  importSave: (raw: string, slot: number) => boolean;
  deleteSlot: (slot: number) => void;
  
  // v2.0 新增方法
  upgradeBase?: () => void;
  openBuildMenu?: () => void;
  upgradeSkill?: (skillId: string) => void;
  chooseSpecialization?: (branch: 'tech' | 'cultivation' | 'general') => void;
  buyFromMarket?: (itemId: string, merchantId: string) => void;
  sellToMarket?: (itemId: string) => void;
  startStory?: (storyId: string) => void;
  combatAction?: (action: 'attack' | 'defend' | 'skill' | 'flee') => void;
}

let _session: GameSession | null = null;

/**
 * 模块级单例：App 内所有组件共享同一游戏会话。
 * 多个组件各自调用 useGame() 必须拿到同一实例，否则状态互不同步。
 */
export function useGame(): GameSession {
  if (!_session) _session = createSession();
  return _session;
}

function createSession(): GameSession {
  const s = reactive({
    screen: 'menu' as Screen,
    state: null as GameState | null,
    slots: readSlots() as SlotEntry[],
    activeSlot: 0,
    log: [] as LogItem[],
    toast: '',
  });

  // 会话内 Rng：续档时重建（单机玩法无需跨存档复现随机序列）
  let rng = new Rng();

  const view = computed(() => {
    if (!s.state) return { text: '', choices: [] as Choice[], inEvent: false, eventText: '' };
    const st = s.state;
    if (st.pendingEvents.length > 0) {
      const ev = resolveEvent(fullContent, st.pendingEvents[0]);
      if (ev) {
        return {
          text: ev.text,
          choices: availableChoices(ev.choices, st),
          inEvent: true,
          eventText: ev.text,
        };
      }
    }
    const node = resolveScene(fullContent, st.currentScene);
    return {
      text: node?.text ?? '（场景缺失：' + st.currentScene + '）',
      choices: node ? availableChoices(node.choices, st) : [],
      inEvent: false,
      eventText: '',
    };
  });

  // 派生视图属性：作为返回对象的 computed 直接引用 view（保持响应式）

  function pushLog(text: string, kind: LogItem['kind']): void {
    // 场景文本折叠：若最近一条 scene 文本相同则跳过，避免循环场景反复堆叠
    if (kind === 'scene') {
      for (let i = s.log.length - 1; i >= 0; i--) {
        if (s.log[i].kind === 'scene') {
          if (s.log[i].text === text) return;
          break;
        }
      }
    }
    s.log.push({ text, kind });
  }

  function persist(): void {
    if (!s.state) return;
    s.slots = writeSlot(s.activeSlot, s.state);
  }

  function showToast(msg: string): void {
    s.toast = msg;
    setTimeout(() => {
      s.toast = '';
    }, 2600);
  }

  /** 结算归档：更新跨周目 meta 并写入存档。 */
  function finalizeRun(): void {
    if (!s.state) return;
    const m = readMeta();
    m.runs += 1;
    const out = s.state.outcome;
    if (out && out.type === 'ending') {
      m.unlockedEndings = Array.from(new Set([...m.unlockedEndings, out.id]));
    }
    m.bestDays = Math.max(m.bestDays, s.state.day);
    writeMeta(m);
    persist();
  }

  function newGame(slot: number): void {
    const state = createInitialState(fullContent, readMeta());
    s.state = state;
    s.activeSlot = slot;
    s.log = [];
    rng = new Rng();
    const node = resolveScene(fullContent, state.currentScene);
    if (node) pushLog(node.text, 'scene');
    persist();
    s.screen = 'game';
    showToast('新的一局开始了，第 1 天');
  }

  function continueGame(slot: number): void {
    const entry = s.slots[slot];
    if (!entry.state) return;
    s.state = entry.state;
    s.activeSlot = slot;
    s.log = [];
    rng = new Rng();
    s.screen = 'game';
    const node = resolveScene(fullContent, entry.state.currentScene);
    if (node) pushLog(node.text, 'scene');
    showToast('已读取存档');
  }

  function choose(choice: Choice): void {
    if (!s.state) return;
    const st = s.state;
    const inEvent = st.pendingEvents.length > 0;
    const r = inEvent
      ? applyEventChoice(fullContent, st, choice, rng)
      : applyChoice(fullContent, st, choice, rng);
    if (r.resultText) pushLog(r.resultText, 'result');
    if (st.outcome) {
      finalizeRun();
      pushLog(`【${st.outcome.title}】${st.outcome.desc}`, 'system');
    } else if (st.pendingEvents.length === 0) {
      const node = resolveScene(fullContent, st.currentScene);
      if (node && node.text !== s.log[s.log.length - 1]?.text) pushLog(node.text, 'scene');
    }
    persist();
  }

  function endDay(): void {
    if (!s.state) return;
    const st = s.state;
    if (st.pendingEvents.length > 0) {
      showToast('先处理完眼前的事件');
      return;
    }
    const r = runDaily(fullContent, st, rng);
    for (const msg of r.messages) pushLog(msg, 'daily');
    if (r.dead) {
      finalizeRun();
      pushLog(`【${st.outcome?.title ?? '死亡'}】${st.outcome?.desc ?? ''}`, 'system');
      persist();
      return;
    }
    pushLog(`—— 第 ${st.day} 天 ——`, 'daily');
    if (r.event) {
      pushLog(r.event.text, 'scene');
    } else {
      const node = resolveScene(fullContent, st.currentScene);
      if (node) pushLog(node.text, 'scene');
    }
    persist();
  }

  function backToMenu(): void {
    s.screen = 'menu';
    s.slots = readSlots();
    s.state = null;
  }

  function exportSave(): string {
    return s.state ? exportState(s.state) : '';
  }

  function importSave(raw: string, slot: number): boolean {
    const st = importState(raw);
    if (!st) return false;
    s.slots = writeSlot(slot, st);
    showToast('导入成功');
    return true;
  }

  function deleteSlot(slot: number): void {
    s.slots = clearSlot(slot);
  }

  // === v2.0 新增方法实现 ===

  function upgradeBase(): void {
    if (!s.state) return;
    const result = upgradeBase(s.state);
    if (result.success) {
      showToast(result.message);
      pushLog(result.message, 'system');
      persist();
    } else {
      showToast(result.message);
    }
  }

  function openBuildMenu(): void {
    showToast('建造功能开发中，敬请期待！');
  }

  function upgradeSkill(skillId: string): void {
    if (!s.state) return;
    const result = unlockSkill(s.state, skillId);
    if (result.success) {
      showToast(result.message);
      pushLog(result.message, 'system');
      persist();
    } else {
      showToast(result.message);
    }
  }

  function chooseSpecializationFn(branch: 'tech' | 'cultivation' | 'general'): void {
    if (!s.state) return;
    const branchMap = { tech: 'tech', cultivation: 'cultivation', general: 'general' };
    const result = chooseSpecialization(s.state, branchMap[branch]);
    if (result.success) {
      showToast(result.message);
      pushLog(result.message, 'system');
      persist();
    } else {
      showToast(result.message);
    }
  }

  function buyFromMarket(itemId: string, merchantId: string): void {
    if (!s.state) return;
    const result = buyFromMerchant(s.state, itemId, merchantId);
    if (result.success) {
      showToast(`购买了 ${result.itemName || itemId}`);
      pushLog(result.message, 'result');
      persist();
    } else {
      showToast(result.message);
    }
  }

  function sellToMarket(itemId: string): void {
    if (!s.state) return;
    const result = sellToMerchant(s.state, itemId);
    if (result.success) {
      showToast(`出售了 ${result.itemName || itemId}，获得 ${result.gold} 金币`);
      pushLog(result.message, 'result');
      persist();
    } else {
      showToast(result.message);
    }
  }

  function startStory(storyId: string): void {
    if (!s.state) return;
    // 标记故事线已触发
    s.state.flags[`story_${storyId}_started`] = true;
    showToast(`开始探索${storyId}剧情线`);
    pushLog(`你决定探索${storyId}的剧情线...`, 'system');
    persist();
  }

  function combatAction(action: 'attack' | 'defend' | 'skill' | 'flee'): void {
    if (!s.state || !s.state.combat) return;
    
    const result = executeCombatRound(s.state, action);
    
    // 显示战斗日志
    for (const entry of result.log.slice(-3)) {
      pushLog(entry, 'result');
    }
    
    if (result.victory) {
      showToast('战斗胜利！');
      pushLog(`击败了敌人！获得战利品。`, 'system');
      // 清除战斗状态
      delete s.state.combat;
      persist();
    } else if (result.defeat) {
      showToast('战斗失败！');
      pushLog('你在战斗中落败...', 'system');
      persist();
    } else if (result.fled) {
      showToast('成功逃脱！');
      delete s.state.combat;
      persist();
    } else {
      persist();
    }
  }

  return reactive({
    ...toRefs(s),
    viewText: computed(() => view.value.text),
    viewChoices: computed(() => view.value.choices),
    inEvent: computed(() => view.value.inEvent),
    eventText: computed(() => view.value.eventText),
    newGame,
    continueGame,
    choose,
    endDay,
    backToMenu,
    exportSave,
    importSave,
    deleteSlot,
    upgradeBase,
    openBuildMenu,
    upgradeSkill,
    chooseSpecialization: chooseSpecializationFn,
    buyFromMarket,
    sellToMarket,
    startStory,
    combatAction,
  }) as unknown as GameSession;
}

export { SLOT_COUNT };
