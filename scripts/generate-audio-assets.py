#!/usr/bin/env python3
"""Generate executive-demo audio assets."""
from __future__ import annotations

import math
import os
import struct
import subprocess
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AUDIO = ROOT / "public" / "assets" / "audio"
HOST = AUDIO / "narration" / "host"
VOICE = os.environ.get("VIAGGIO_TTS_VOICE", "Paulina")
RATE = int(os.environ.get("VIAGGIO_TTS_RATE", "165"))

SCRIPTS = {
    "host-s01-attract": (
        "Bienvenido a Viaggio. Acá nadie te va a apurar ni a seguir con la mirada. "
        "Este recorrido es tuyo: mirá, compará, preguntá, a tu ritmo. "
        "Cuando quieras empezar, tocá la pantalla. Te acompaño en cada paso."
    ),
    "host-s03-selector": (
        "Hoy el recorrido completo está armado alrededor del GS4 MAX, el SUV que más familias "
        "están evaluando en Santa Cruz. No es un catálogo: es una experiencia guiada. "
        "Tocá la tarjeta cuando quieras y entramos al vehículo en grande. "
        "Los demás modelos GAC vienen en camino; por ahora, profundizamos acá."
    ),
    "host-s22-hero": (
        "Antes de números y comparaciones, tomate este momento. "
        "Fijate cómo se ve el GS4 MAX en persona, proporciones, presencia, detalle. "
        "Los datos están abajo cuando los necesites. "
        "En los próximos pasos vas a poder responder si podés confiar en esto para tu familia."
    ),
    "host-s06-tour-intro-trust": (
        "Ahora entramos al tour guiado. Vas a recorrer el GS4 MAX con un especialista digital. "
        "No hace falta memorizar: avanzá paso a paso. Primero confianza, después deseo."
    ),
    "host-s06-tour-intro-family": (
        "Ahora entramos al tour guiado con Diego, pensando en la vida real en familia."
    ),
    "host-s06-tour-intro-desire": (
        "Ahora entramos al tour guiado con Sofía, diseño y equipamiento."
    ),
    "host-s08-topic-frame": (
        "Este tema responde una pregunta concreta de tu proceso de decisión. "
        "Escuchá al especialista y seguí cuando quieras."
    ),
    "host-s08-adas": (
        "Mucha gente mira el equipamiento; pocos se preguntan qué pasa un martes a las siete en la doble vía. "
        "Acá hablamos de margen, esos segundos extra cuando el tráfico se frena de golpe. "
        "Carlos te muestra qué trae el GS4 MAX de serie."
    ),
    "host-s12-compare": (
        "Comparar no es descalificar al otro auto, es entender qué estás pagando realmente. "
        "Vas a ver filas donde ganamos y alguna donde el competidor lleva ventaja."
    ),
    "host-s26-financing": (
        "Llegaste al momento en que muchos se preguntan si les cierra la cuota. "
        "Lo que ves acá es orientativo. Ningún número de esta pantalla es final."
    ),
    "host-s13-convert": (
        "Llegaste lejos en pocos minutos. Ahora elegís cómo seguir: probarlo, WhatsApp, o compartir. Sin presión."
    ),
    "host-s15-whatsapp": (
        "Este paso conecta lo digital con una persona real de Viaggio. "
        "Tu recorrido viaja en el mensaje para que no empieces de cero."
    ),
}


def has_ffmpeg() -> bool:
    return subprocess.run(["which", "ffmpeg"], capture_output=True).returncode == 0


def write_wav(path: Path, samples: list[float], sample_rate: int = 44100) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with wave.open(str(path), "w") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sample_rate)
        frames = bytearray()
        for s in samples:
            clamped = max(-1.0, min(1.0, s))
            frames.extend(struct.pack("<h", int(clamped * 32767 * 0.9)))
        wf.writeframes(frames)


def export_audio(wav: Path, dest_mp3: Path) -> None:
    dest_mp3.parent.mkdir(parents=True, exist_ok=True)
    if has_ffmpeg():
        subprocess.run(
            ["ffmpeg", "-y", "-i", str(wav), "-codec:a", "libmp3lame", "-qscale:a", "2", str(dest_mp3)],
            check=True,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        wav.unlink(missing_ok=True)
    else:
        dest_wav = dest_mp3.with_suffix(".wav")
        wav.rename(dest_wav)


def pink_noise(length: int) -> list[float]:
    rows = [0.0] * length
    b = [0.0] * 7
    for i in range(length):
        white = (hash(i * 9973) % 2000 - 1000) / 1000.0
        b[0] = 0.99886 * b[0] + white * 0.0555179
        b[1] = 0.99332 * b[1] + white * 0.0750759
        b[2] = 0.96900 * b[2] + white * 0.1538520
        b[3] = 0.86650 * b[3] + white * 0.3104856
        b[4] = 0.55000 * b[4] + white * 0.5329522
        b[5] = -0.7616 * b[5] - white * 0.0168980
        rows[i] = (sum(b) + white * 0.5362) * 0.11
        b[6] = white * 0.115926
    return rows


def ambient_pad(duration: float = 60.0, sample_rate: int = 44100) -> list[float]:
    n = int(duration * sample_rate)
    noise = pink_noise(n)
    out = [0.0] * n
    freqs = [110.0, 164.81, 220.0]
    for i in range(n):
        t = i / sample_rate
        tone = sum(math.sin(2 * math.pi * f * t) for f in freqs) * 0.012
        fade = min(1.0, t / 2.0, (duration - t) / 2.0)
        out[i] = (noise[i] + tone) * fade * 0.35
    return out


def tone_sfx(freq: float, duration: float, volume: float = 0.12) -> list[float]:
    sample_rate = 44100
    n = int(duration * sample_rate)
    return [
        math.sin(2 * math.pi * freq * (i / sample_rate))
        * volume
        * min(1.0, (i / sample_rate) / 0.008)
        * min(1.0, (duration - i / sample_rate) / 0.04)
        for i in range(n)
    ]


def say_to_wav(text: str, out_wav: Path) -> None:
    aiff = out_wav.with_suffix(".aiff")
    subprocess.run(["say", "-v", VOICE, "-r", str(RATE), "-o", str(aiff), text], check=True)
    subprocess.run(["afconvert", "-f", "WAVE", "-d", "LEI16", str(aiff), str(out_wav)], check=True)
    aiff.unlink(missing_ok=True)


def main() -> None:
    for d in (AUDIO / "ambient", AUDIO / "sfx", HOST):
        d.mkdir(parents=True, exist_ok=True)

    print("→ Ambient showroom loop")
    tmp = AUDIO / "ambient" / "_tmp.wav"
    write_wav(tmp, ambient_pad())
    export_audio(tmp, AUDIO / "ambient" / "showroom-loop.mp3")

    print("→ Premium SFX")
    for name, freq, dur, vol in [
        ("nav-tap", 520, 0.09, 0.12),
        ("card-select", 380, 0.14, 0.14),
        ("transition-soft", 440, 0.22, 0.10),
        ("success", 660, 0.28, 0.11),
        ("qr-reveal", 494, 0.35, 0.09),
    ]:
        tmp = AUDIO / "sfx" / f"_tmp_{name}.wav"
        write_wav(tmp, tone_sfx(freq, dur, vol))
        export_audio(tmp, AUDIO / "sfx" / f"{name}.mp3")

    print("→ Host narration")
    for name, text in SCRIPTS.items():
        tmp = HOST / f"_tmp_{name}.wav"
        say_to_wav(text, tmp)
        export_audio(tmp, HOST / f"{name}.mp3")
        print(f"  · {name}")

    print("✓ Done")


if __name__ == "__main__":
    main()
