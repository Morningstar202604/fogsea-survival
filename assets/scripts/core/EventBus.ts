type Handler = (payload?: unknown) => void;

/** 全局事件总线：systems → ui 单向广播，模块间解耦 */
export class EventBus {
    private static handlers = new Map<string, Set<Handler>>();

    static on(type: string, h: Handler): void {
        let set = this.handlers.get(type);
        if (!set) {
            set = new Set();
            this.handlers.set(type, set);
        }
        set.add(h);
    }

    static off(type: string, h: Handler): void {
        this.handlers.get(type)?.delete(h);
    }

    static emit(type: string, payload?: unknown): void {
        const set = this.handlers.get(type);
        if (!set) return;
        for (const h of Array.from(set)) h(payload);
    }

    static clear(): void {
        this.handlers.clear();
    }
}

/** 游戏事件名常量（防拼写漂移） */
export const GameEvents = {
    StatsChanged: 'stats:changed',
    InventoryChanged: 'inventory:changed',
    StatusAdd: 'status:add',
    StatusRemove: 'status:remove',
    EventShow: 'event:show',
    EventResult: 'event:result',
    DayAdvance: 'day:advance',
    DisasterIncoming: 'disaster:incoming',
    DisasterHit: 'disaster:hit',
    DisasterSurvived: 'disaster:survived',
    ChatNew: 'chat:new',
    ChatInject: 'chat:inject',
    TalentDrawn: 'talent:drawn',
    ShelterUpgraded: 'shelter:upgraded',
    ChestOpened: 'chest:opened',
    RunEnd: 'run:end',
} as const;
