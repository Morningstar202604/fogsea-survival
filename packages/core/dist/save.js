/**
 * 存档序列化。
 * - serialize/deserialize：内部存储（JSON 字符串，3 槽位由 UI 层管理）。
 * - exportState/importState：Base64(UTF-8 JSON) + CRC32 校验尾，供导入导出分享。
 *   btoa/atob 在浏览器与 Node 18+ 均为全局可用，core 不做运行时环境判断。
 */
/** 标准 CRC32（IEEE 802.3），表驱动。 */
const CRC_TABLE = (() => {
    const table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++)
            c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        table[n] = c >>> 0;
    }
    return table;
})();
export function crc32(input) {
    let crc = 0xffffffff;
    for (let i = 0; i < input.length; i++) {
        crc = CRC_TABLE[(crc ^ input.charCodeAt(i)) & 0xff] ^ (crc >>> 8);
    }
    return (crc ^ 0xffffffff) >>> 0;
}
/** 序列化单局状态为 JSON 字符串（内部存储用）。 */
export function serialize(state) {
    return JSON.stringify(state);
}
/** 从 JSON 字符串还原单局状态。 */
export function deserialize(raw) {
    return JSON.parse(raw);
}
/** 导出文本：`<Base64(JSON)>:<crc32 hex 8位>`。 */
export function exportState(state) {
    const json = serialize(state);
    const b64 = btoa(unescape(encodeURIComponent(json)));
    return `${b64}:${crc32(json).toString(16).padStart(8, '0')}`;
}
/** 从导出文本还原；crc 不符 / 结构非法 / 解析失败均返回 null。 */
export function importState(raw) {
    const idx = raw.lastIndexOf(':');
    if (idx < 0)
        return null;
    const b64 = raw.slice(0, idx);
    const checksum = raw.slice(idx + 1);
    if (!/^[0-9a-f]{8}$/.test(checksum))
        return null;
    let json;
    try {
        json = decodeURIComponent(escape(atob(b64)));
    }
    catch {
        return null;
    }
    if (crc32(json).toString(16).padStart(8, '0') !== checksum)
        return null;
    try {
        const st = JSON.parse(json);
        if (typeof st !== 'object' || st === null || !st.resources || !st.currentScene)
            return null;
        if (!st.meta || !st.runStats)
            return null;
        return st;
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=save.js.map