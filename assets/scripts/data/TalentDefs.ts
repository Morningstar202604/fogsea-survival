// ===== 天赋（开局抽取，10 种）=====
export type TalentHook =
    | { type: 'revealHintDaily' }                    // T01 每日提示
    | { type: 'lootMult'; mult: number }             // T02 物资增幅
    | { type: 'nightRiskFactor'; factor: number }    // T03 守夜人
    | { type: 'dirtyConsumeFactor'; factor: number } // T04 铁胃
    | { type: 'craftCostReduce'; n: number }         // T05 巧匠
    | { type: 'combatBonus'; pct: number }           // T06 猎手
    | { type: 'bagCapacityAdd'; n: number }          // T07 囤积者
    | { type: 'chestUpgradeChance'; pct: number }    // T08 福星
    | { type: 'giftEveryNDays'; n: number }          // T09 社牛
    | { type: 'dangerWarn' };                        // T10 第六感

export interface TalentDef {
    id: string;              // T01 ~ T10
    name: string;            // 【每日提示】
    archetype: string;       // 流派名：信息流
    rarity: number;          // 星级展示
    desc: string;
    hooks: TalentHook[];
}

// ===== 世界频道 =====
export interface ChatMessage {
    nick: string;
    text: string;
}

export interface ChatPool {
    id: string;                  // phase_1_3 / link_disaster_cold ...
    weight: number;
    dayMin?: number;
    dayMax?: number;
    messages: ChatMessage[];
}
