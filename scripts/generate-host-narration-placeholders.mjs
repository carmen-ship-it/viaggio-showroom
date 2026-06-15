#!/usr/bin/env node
/**
 * Generates short Spanish placeholder MP3s for host narration tracks.
 * Uses macOS `say` + `afconvert` when available; falls back to ffmpeg sine tone.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { execSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "../public/assets/audio/narration/host");

const TRACKS = {
  "host-s01-attract.mp3": "Bienvenido a Viaggio. Tocá la pantalla cuando quieras empezar.",
  "host-s02-welcome.mp3": "Sin presión. Empezá cuando estés listo.",
  "host-s03-selector.mp3": "Hoy el recorrido es el GS4 MAX. Tocá la tarjeta para entrar.",
  "host-s22-hero.mp3": "Mirá el vehículo en grande. El siguiente paso es confianza.",
  "host-s25-faq.mp3": "Las dos dudas más comunes, respondidas sin vueltas.",
  "host-s06-tour-intro-trust.mp3": "Carlos te guía en tres pasos clave de confianza.",
  "host-s06-tour-intro-family.mp3": "Diego te muestra el GS4 MAX en familia.",
  "host-s06-tour-intro-desire.mp3": "Sofía te ayuda a descubrir diseño y tecnología.",
  "host-s08-topic-frame.mp3": "Profundizamos un tema importante del vehículo.",
  "host-s08-adas.mp3": "Las asistencias al conductor te dan margen en Santa Cruz.",
  "host-s12-compare.mp3": "Comparación honesta: también donde Toyota gana.",
  "host-s26-financing.mp3": "Una cuota orientativa para planificar sin compromiso.",
  "host-s13-convert.mp3": "Elegí cómo querés dar el siguiente paso.",
  "host-s15-whatsapp.mp3": "Escaneá el código y seguí por WhatsApp con contexto.",
};

await mkdir(outDir, { recursive: true });

function hasCommand(cmd) {
  try {
    execSync(`which ${cmd}`, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

const useSay = hasCommand("say");
const useFfmpeg = hasCommand("ffmpeg");

for (const [filename, text] of Object.entries(TRACKS)) {
  const mp3Path = path.join(outDir, filename);
  const aiffPath = path.join(outDir, filename.replace(".mp3", ".aiff"));

  try {
    if (useSay && useFfmpeg) {
      execSync(`say -v Paulina -r 200 -o "${aiffPath}" "${text}"`, { stdio: "inherit" });
      execSync(
        `ffmpeg -y -i "${aiffPath}" -codec:a libmp3lame -qscale:a 6 "${mp3Path}"`,
        { stdio: "inherit" },
      );
      execSync(`rm -f "${aiffPath}"`, { stdio: "ignore" });
    } else if (useFfmpeg) {
      execSync(
        `ffmpeg -y -f lavfi -i sine=frequency=440:duration=1.5 -q:a 9 "${mp3Path}"`,
        { stdio: "inherit" },
      );
    } else {
      await writeFile(
        path.join(outDir, `${filename}.txt`),
        `${filename}\n${text}\n`,
        "utf8",
      );
    }
    console.log(`✓ ${filename}`);
  } catch (error) {
    console.error(`✗ ${filename}`, error.message);
  }
}

console.log(`Done → ${outDir}`);
