/** 打字机：纯 TS 状态机，由外部 tick(dt) 驱动；speed<=0 表示立即显示 */
export class Typewriter {
    private full = '';
    private shown = 0;
    private speed: number;      // 字/秒
    done = true;

    constructor(speed = 25) { this.speed = speed; }

    setSpeed(v: number): void { this.speed = v; }

    set(text: string, instant = false): void {
        this.full = text;
        this.shown = instant ? text.length : 0;
        this.done = instant || text.length === 0;
    }

    skip(): void {
        this.shown = this.full.length;
        this.done = true;
    }

    /** 返回是否仍在打字中 */
    tick(dt: number, sink: { string: string }): boolean {
        if (this.done) return false;
        if (this.speed <= 0) {
            this.shown = this.full.length;
            this.done = true;
            sink.string = this.full;
            return false;
        }
        this.shown = Math.min(this.full.length, this.shown + this.speed * dt);
        if (this.shown >= this.full.length) this.done = true;
        sink.string = this.full.slice(0, Math.floor(this.shown));
        return !this.done;
    }
}
