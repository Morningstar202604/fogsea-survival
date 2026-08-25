# -*- coding: utf-8 -*-
# 程序合成音效（无版权负担）：click/chest/clear/death 四枚 16bit 单声道 WAV
import wave, struct, math, os

SR = 22050
OUT_DIRS = [
    r"D:\0000004\quanmin-survival\assets\resources\audio",
    r"D:\0000004\quanmin-survival\web\public\audio",
]


def env(i, n, attack=0.01, release=0.35):
    t = i / n
    a = min(1.0, t / attack) if attack > 0 else 1.0
    r = min(1.0, (1.0 - t) / release) if release > 0 else 1.0
    return a * r


def tone(freqs_with_amp, ms, fade_release=0.35):
    n = int(SR * ms / 1000)
    out = []
    for i in range(n):
        s = 0.0
        for f, amp in freqs_with_amp:
            s += amp * math.sin(2 * math.pi * f * i / SR)
        out.append(s * env(i, n, release=fade_release))
    return out


def sweep(f0, f1, ms, release=0.25):
    n = int(SR * ms / 1000)
    out = []
    phase = 0.0
    for i in range(n):
        f = f0 + (f1 - f0) * (i / n)
        phase += 2 * math.pi * f / SR
        out.append(0.7 * math.sin(phase) * env(i, n, release=release))
    return out


def concat(*parts):
    r = []
    for p in parts:
        r.extend(p)
    return r


def silence(ms):
    return [0.0] * int(SR * ms / 1000)


SFX = {
    # 点击：短促高频木鱼感
    "click": tone([(1250, 0.6), (2500, 0.15)], 45, fade_release=0.8),
    # 开箱：双音上行铃
    "chest": concat(tone([(880, 0.55)], 110), tone([(1320, 0.55)], 170)),
    # 好结局：C-E-G-C 上行琶音
    "clear": concat(
        tone([(523, 0.5)], 120),
        tone([(659, 0.5)], 120),
        tone([(784, 0.5)], 120),
        tone([(1046, 0.55)], 260),
    ),
    # 死亡：下行低鸣
    "death": concat(sweep(360, 90, 620), silence(60)),
}


def save(name, samples):
    peak = max(1e-9, max(abs(s) for s in samples))
    scale = 0.82 / peak
    for d in OUT_DIRS:
        os.makedirs(d, exist_ok=True)
        p = os.path.join(d, name + ".wav")
        with wave.open(p, "wb") as w:
            w.setnchannels(1)
            w.setsampwidth(2)
            w.setframerate(SR)
            w.writeframes(
                b"".join(
                    struct.pack("<h", int(max(-1.0, min(1.0, s * scale)) * 32767))
                    for s in samples
                )
            )
        print("written", p, len(samples) / SR, "s")


for k, v in SFX.items():
    save(k, v)
