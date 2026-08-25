// 音频管理：单例。播放 resources/audio/<name> 下的 AudioClip，按需加载并缓存。
// 音频文件尚未入库时静默跳过（内容缺口，不影响逻辑）；放入文件即自动生效。
import { Node, AudioSource, AudioClip, resources } from 'cc';

export class AudioManager {
    private static _i: AudioManager | null = null;
    static get I(): AudioManager {
        if (!this._i) this._i = new AudioManager();
        return this._i;
    }

    private src: AudioSource | null = null;
    private cache = new Map<string, AudioClip | null>();   // null = 已确认缺失
    enabled = true;

    /** 在场景根下挂常驻音频节点（GameApp 构造时调用一次） */
    mount(root: Node): void {
        if (this.src) return;
        const n = new Node('audio');
        root.addChild(n);
        this.src = n.addComponent(AudioSource);
    }

    setEnabled(on: boolean): void {
        this.enabled = on;
    }

    /** 播放一次音效；同名资源重复调用走缓存 */
    play(name: string, volumeScale = 1): void {
        if (!this.enabled || !this.src) return;
        const cached = this.cache.get(name);
        if (cached !== undefined) {
            if (cached) this.src.playOneShot(cached, volumeScale);
            return;
        }
        resources.load(`audio/${name}`, AudioClip, (err, clip) => {
            if (err || !clip) {
                this.cache.set(name, null);
                return;
            }
            this.cache.set(name, clip);
            if (!this.enabled || !this.src) return;
            this.src.playOneShot(clip, volumeScale);
        });
    }
}
