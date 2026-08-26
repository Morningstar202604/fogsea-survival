// 把事件文件里的 "effects": "@{k=v; ...}" 字符串转换为真正的 JSON 对象
// 用法：node convert_events.mjs <file1.json> [file2.json ...]
import { readFileSync, writeFileSync } from 'node:fs';

const files = process.argv.slice(2);
if (!files.length) { console.error('用法: node convert_events.mjs <events.json> ...'); process.exit(1); }

function parseEffects(str) {
    const body = str.trim().replace(/^@\{/, '').replace(/\}$/, '').trim();
    if (!body) return {};
    const out = {};
    // 按分号切分，但要跳过 [] 内部的逗号——本 DSL 的数组内无分号，直接 split(';') 安全
    for (const part of body.split(';')) {
        const seg = part.trim();
        if (!seg) continue;
        const eq = seg.indexOf('=');
        let key, raw;
        if (eq === -1) {
            // 形如 setFlags['a'] 的错误写法容错：跳过
            console.warn('  ! 无法解析片段:', seg);
            continue;
        }
        key = seg.slice(0, eq).trim();
        raw = seg.slice(eq + 1).trim();
        const arrMatch = raw.match(/^\[(.*)\]$/s);
        if (arrMatch) {
            const inner = arrMatch[1].trim();
            if (!inner) { out[key] = []; continue; }
            if (key === 'gainItems' || key === 'loseItems') {
                out[key] = [...inner.matchAll(/\{([^}]*)\}/g)].map(m => {
                    const obj = {};
                    for (const kv of m[1].split(',')) {
                        const [k, v] = kv.split('=').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
                        obj[k] = Number.isNaN(Number(v)) ? v : Number(v);
                    }
                    return obj;
                });
            } else {
                out[key] = inner.split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
            }
            continue;
        }
        const unq = raw.replace(/^['"]|['"]$/g, '');
        const num = Number(raw);
        out[key] = raw !== '' && !Number.isNaN(num) ? num : unq;
    }
    return out;
}

for (const f of files) {
    const json = JSON.parse(readFileSync(f, 'utf-8'));
    let converted = 0;
    for (const ev of json.events ?? []) {
        for (const opt of ev.options ?? []) {
            for (const r of opt.results ?? []) {
                if (typeof r.effects === 'string') {
                    r.effects = parseEffects(r.effects);
                    converted++;
                } else if (r.effects && typeof r.effects !== 'object') {
                    console.warn(`  ! ${ev.id}: 异常 effects 类型`, typeof r.effects);
                }
            }
        }
    }
    writeFileSync(f, JSON.stringify(json, null, 2) + '\n', 'utf-8');
    console.log(`${f}: 转换 ${converted} 处 effects`);
}
