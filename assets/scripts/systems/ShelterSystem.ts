// 庇护所等级效果查询
export interface ShelterEffects {
    nightSanityDrain: number;   // 夜间 SAN 基础消耗
    hasHiddenBuff: boolean;     // 授予【隐蔽】
    coldImmune: boolean;        // 寒流免疫
}

const LEVEL_EFFECTS: Record<number, ShelterEffects> = {
    1: { nightSanityDrain: 8, hasHiddenBuff: false, coldImmune: false },
    2: { nightSanityDrain: 4, hasHiddenBuff: true, coldImmune: false },
    3: { nightSanityDrain: 2, hasHiddenBuff: true, coldImmune: true },
};

export class ShelterSystem {
    static effects(level: number): ShelterEffects {
        return LEVEL_EFFECTS[level] ?? LEVEL_EFFECTS[1];
    }

    static effectsOf(ctx: import('./RunModel').GameCtx): ShelterEffects {
        return this.effects(ctx.run.shelterLevel);
    }
}
