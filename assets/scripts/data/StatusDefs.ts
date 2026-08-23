// 状态效果定义 —— 配置见 resources/configs/statuses.json
export interface StatusDef {
    id: string;
    name: string;
    kind: 'debuff' | 'buff';
    perDay?: Partial<Record<'hp' | 'hunger' | 'thirst' | 'sanity', number>>;
    consumeMult?: number;       // 每日消耗倍率（生病1.1 / 失温2）
    durationDays: number;       // 自然痊愈天数；-1 = 需药物解除或条件解除
    cureItemId?: string;        // 用药即解
    icon: string;
    desc: string;
}

export interface ActiveStatus {
    id: string;
    remainDays: number;
}

export const STATUS_IDS = {
    injured: 'injured',
    sick: 'sick',
    poisoned: 'poisoned',
    hypothermia: 'hypothermia',
    acidBurn: 'acid_burn',
    energized: 'energized',     // 充沛 buff：次日 AP+1
    hidden: 'hidden',           // 隐蔽 buff：夜间恶性减半（由庇护所授予）
} as const;
