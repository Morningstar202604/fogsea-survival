// 程序化 UI 工具包：颜色、面板、文本、按钮（全部代码生成，无需预制体）
import { Node, UITransform, Label, Sprite, SpriteFrame, Color, Button, Widget, Layers } from 'cc';
import { builtinResMgr } from 'cc';

// 迷雾降临配色（文档03 §4）
export const COL = {
    bg: '#14171e',
    panel: '#1f2430',
    panelLine: '#39415a',
    text: '#cfd6e4',
    dim: '#78829c',
    accent: '#e8b34b',     // 金
    good: '#7ec97e',
    bad: '#e0655f',
    purple: '#9d7bd8',
    blue: '#5b8fd4',
};

const _white: SpriteFrame | null = null;
function whiteFrame(): SpriteFrame {
    // 兼容不同版本内建白图 key
    return (builtinResMgr.get('ui-sprite-frame')
        ?? builtinResMgr.get('default_sprite_splash')) as unknown as SpriteFrame;
}
void _white;

export function hexColor(hex: string): Color {
    const c = new Color();
    Color.fromHEX(c, hex);
    return c;
}

export function node(name: string, parent?: Node, w = 100, h = 100): Node {
    const n = new Node(name);
    n.layer = Layers.Enum.UI_2D;
    const ut = n.addComponent(UITransform);
    ut.setContentSize(w, h);
    if (parent) parent.addChild(n);
    return n;
}

export function fullScreen(n: Node): void {
    const wd = n.addComponent(Widget);
    wd.isAlignLeft = wd.isAlignRight = wd.isAlignTop = wd.isAlignBottom = true;
    wd.left = wd.right = wd.top = wd.bottom = 0;
}

/** 纯色面板（白图染色） */
export function panel(parent: Node, name: string, w: number, h: number, hex: string): Node {
    const n = node(name, parent, w, h);
    const sp = n.addComponent(Sprite);
    sp.spriteFrame = whiteFrame();
    sp.color = hexColor(hex);
    return n;
}

export interface LabelOpts {
    size?: number;
    color?: string;
    wrap?: boolean;
    align?: 'left' | 'center';
    maxWidth?: number;
    lineHeight?: number;
}

export function label(parent: Node, text: string, opts: LabelOpts = {}): Label {
    const n = node('label', parent, opts.maxWidth ?? parent.getComponent(UITransform)!.width, 40);
    const lb = n.addComponent(Label);
    lb.string = text;
    lb.fontSize = opts.size ?? 24;
    lb.lineHeight = opts.lineHeight ?? (opts.size ?? 24) * 1.45;
    lb.color = hexColor(opts.color ?? COL.text);
    if (opts.wrap && opts.maxWidth) {
        lb.overflow = Label.Overflow.RESIZE_HEIGHT;
        n.getComponent(UITransform)!.setContentSize(opts.maxWidth, 40);
    }
    lb.horizontalAlign = opts.align === 'center'
        ? Label.HorizontalAlign.CENTER : Label.HorizontalAlign.LEFT;
    lb.verticalAlign = Label.VerticalAlign.TOP;
    return lb;
}

export interface BtnOpts {
    bg?: string;
    textColor?: string;
    fontSize?: number;
    disabled?: boolean;
}

export function button(
    parent: Node, text: string, w: number, h: number,
    onClick: () => void, opts: BtnOpts = {},
): Node {
    const n = panel(parent, `btn_${text}`, w, h, opts.disabled ? '#2a2f3a' : (opts.bg ?? COL.panel));
    const sp = n.getComponent(Sprite)!;
    sp.color = hexColor(opts.disabled ? '#2a2f3a' : (opts.bg ?? COL.panel));

    const lb = label(n, text, { size: opts.fontSize ?? 24, color: opts.textColor ?? COL.text, align: 'center' });
    const ut = n.getComponent(UITransform)!;
    lb.node.getComponent(UITransform)!.setContentSize(w - 16, h);
    lb.node.setPosition(0, 0);

    const btn = n.addComponent(Button);
    btn.transition = Button.Transition.SCALE;
    btn.zoomScale = 0.95;
    if (!opts.disabled) {
        n.on(Button.EventType.CLICK, onClick);
    }
    void ut;
    return n;
}

/** 打字机：纯 TS 状态机，由外部 tick(dt) 驱动 */
export class Typewriter {
    private full = '';
    private shown = 0;
    private speed: number;      // 字/秒
    done = true;

    constructor(speed = 25) { this.speed = speed; }

    set(text: string, instant = false): void {
        this.full = text;
        this.shown = instant ? text.length : 0;
        this.done = instant || text.length === 0;
        this.apply();
    }

    skip(): void {
        this.shown = this.full.length;
        this.done = true;
        this.apply();
    }

    tick(dt: number, lb: Label): boolean {
        if (this.done) return false;
        this.shown = Math.min(this.full.length, this.shown + this.speed * dt);
        if (this.shown >= this.full.length) this.done = true;
        this.applyTo(lb);
        return !this.done;
    }

    private apply(): void { /* 由 applyTo 渲染 */ }
    private applyTo(lb: Label): void {
        lb.string = this.full.slice(0, Math.floor(this.shown));
    }
}
