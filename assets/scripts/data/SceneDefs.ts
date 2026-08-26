// ===== 场景（多拍剧本）定义（v0.6 叙事层升级）=====
// 一个 SceneDef = 一幕可整段演完的剧本：节点(text+choices)经 goto 跳转，
// 分支走完后跌落到当前节点的 gather 汇流点——即 ink「weave」语义的 JSON 化：
//   · choices[].outcomes[].goto  → 显式跳转（深入嵌套）
//   · node.gather                → 未显式跳转时的汇流落点
//   · goto: 'END' / 无 gather    → 本幕结束
// 玩法钩子是一等公民：道具门槛/消耗、行动点(AP)、庇护所等级、好感度门槛
// 全部通过 requires/effects 表达，由 EventEngine.applyEffects 统一落地。
import type { EffectPayload, StatCond, StatKey } from './EventDefs';
import type { ItemStack } from './ItemDefs';
import type { SkillCategory } from './SkillDefs';

export interface SceneRequires {
    items?: ItemStack[];
    talent?: string;
    stats?: Partial<Record<StatKey, StatCond>>;
    flags?: string[];
    notFlags?: string[];
    rel?: { npc: string; min: number };
    shelterMin?: number;
    apLeft?: number;
    /** 技能线门槛：{ survival: 2 } = 生存线≥2 才可选 */
    skillLevel?: Partial<Record<SkillCategory, number>>;
}

/** 单个抉择的一个可能结局（weight>1 时同选项内加权掷骰） */
export interface SceneOutcome {
    weight?: number;                 // 缺省 100（确定性结果）
    text: string;                    // 结果播报文本
    effects?: EffectPayload;
    goto?: string;                   // 目标节点 id 或 'END'；缺省 → 当前节点 gather
}

export interface SceneChoice {
    text: string;
    requires?: SceneRequires;
    /** 数组=掷骰分支；单对象=确定结果 */
    outcomes: SceneOutcome[] | SceneOutcome;
}

export interface SceneNode {
    id: string;
    chapter?: string;                // 幕内小节标题（如「二·纸青蛙」）
    text: string;
    choices: SceneChoice[];
    gather?: string;                 // 汇流点：outcome 未写 goto 时的默认去向
}

export interface SceneTrigger {
    dayMin?: number;
    dayMax?: number;
    flags?: string[];                // 全部满足才可触发
    notFlags?: string[];             // 任一存在则永不触发
    /** true=随从必须在场；false=随从必须不在场 */
    companionAlive?: boolean;
}

export interface SceneDef {
    id: string;
    name: string;                    // 幕名（UI 徽标下显示）
    entry: string;                   // 入口节点
    nodes: SceneNode[];
    trigger?: SceneTrigger;
    /** 同晨多幕就绪时的挑选优先级，大者优先（危机幕 > 日常幕） */
    priority?: number;
    /**
     * 触发方式：
     *  'scheduler'（默认）— 清晨调度器按 trigger+priority 开幕
     *  'chain'            — 仅由事件分支 nextEvent('scene:id/node') 链入
     *                       （如探索遭遇战）；调度器永不主动开演，
     *                       但已挂起的 chain 幕仍会跨天恢复
     */
    startBy?: 'scheduler' | 'chain';
}
