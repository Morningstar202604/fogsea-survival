// 场景根组件：唯一需要手动挂到 Canvas 的脚本
import { _decorator, Component } from 'cc';
import { GameManager } from '../core/GameManager';
import { GameApp } from './GameApp';

const { ccclass } = _decorator;

@ccclass('UIRoot')
export class UIRoot extends Component {
    private app: GameApp | null = null;

    async start() {
        await GameManager.I.init();
        this.app = new GameApp(this.node);
        this.app.showHome();
    }

    update(dt: number) {
        this.app?.tick(dt);
    }
}
