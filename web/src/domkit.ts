// DOM UI 工具包：UIKit 的 Web 对应物
export const COL = {
    bg: '#14171e', panel: '#1f2430', panelLine: '#39415a',
    text: '#cfd6e4', dim: '#78829c', accent: '#e8b34b',
    good: '#7ec97e', bad: '#e0655f', purple: '#9d7bd8', blue: '#5b8fd4',
};

export function el<K extends keyof HTMLElementTagNameMap>(
    tag: K, cls: string | undefined, parent?: HTMLElement | null,
): HTMLElementTagNameMap[K] {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (parent) parent.appendChild(n);
    return n;
}

export function div(cls?: string, parent?: HTMLElement | null): HTMLDivElement {
    return el('div', cls, parent);
}

export function txt(text: string, parent?: HTMLElement | null, cls?: string): HTMLDivElement {
    const n = div(cls, parent);
    n.textContent = text;
    return n;
}

export interface BtnOpts {
    disabled?: boolean;
    kind?: 'primary' | 'danger' | 'ghost';
    small?: boolean;
    on?: boolean;      // 选中态高亮
}

let clickSfx: (() => void) | null = null;
export function setClickSfx(fn: (() => void) | null): void { clickSfx = fn; }

export function btn(
    parent: HTMLElement | null, text: string,
    onClick?: () => void, opts: BtnOpts = {},
): HTMLButtonElement {
    const b = el('button', 'btn', parent);
    b.type = 'button';
    b.textContent = text;
    if (opts.kind) b.classList.add(opts.kind);
    if (opts.small) b.classList.add('small');
    if (opts.on) b.classList.add('on');
    if (opts.disabled) {
        b.classList.add('disabled');
        b.disabled = true;
    } else {
        b.addEventListener('click', () => { if (clickSfx) clickSfx(); onClick?.(); });
    }
    return b;
}

export function clear(node: HTMLElement): void {
    while (node.firstChild) node.removeChild(node.firstChild);
}
