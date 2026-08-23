export type ItemCategory = 'food' | 'water' | 'med' | 'mat' | 'tool' | 'key';

export interface ItemStack {
    itemId: string;
    count: number;
}

export interface ItemDef {
    id: string;
    name: string;
    category: ItemCategory;
    stackable: boolean;          // 工具/关键道具 false
    maxStack: number;            // 可叠 3
    icon: string;                // game-icons 图标名
    desc: string;
    // 使用效果（食物/饮水/药品才有），使用时由 UseEffects 解释
    use?: {
        hunger?: number;
        thirst?: number;
        hp?: number;
        sanity?: number;
        cureStatus?: string[];       // 解除状态
        riskSickPct?: number;        // 生病风险（脏食脏水/生肉）
        riskPoisonPct?: number;      // 中毒风险（毒物）
    };
}
