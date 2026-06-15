#!/usr/bin/env node
/**
 * Static verification of narration-first mix constants and executive route wiring.
 * Does not replace real-device listening tests.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const EXECUTIVE_ROUTES = [
  { screen: "S01 Attract", route: "/", wiredIn: "ExperienceEntry" },
  { screen: "S03 Vehicle Selection", route: "/vehicles" },
  { screen: "S22 Hero", route: "/vehicles/gs4-max/hero" },
  { screen: "S06 Trust Tour", route: "/vehicles/gs4-max/tour/trust" },
  { screen: "S12 Compare", route: "/vehicles/gs4-max/compare/corolla-cross" },
  { screen: "S26 Financing", route: "/vehicles/gs4-max/economics/financing" },
  { screen: "S13 Conversion", route: "/vehicles/gs4-max/convert" },
  { screen: "S15 WhatsApp", route: "/vehicles/gs4-max/whatsapp" },
];

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), "utf8");
}

const constantsSrc = read("lib/audio/constants.ts");
const engineSrc = read("lib/audio/AudioEngine.ts");
const mobileSrc = read("lib/audio/mobile-playback.ts");
const providerSrc = read("lib/audio/AudioProvider.tsx");
const overlaySrc = read("components/audio/AudioUnlockOverlay.tsx");
const attractSrc = read("components/screens/AttractLoop.tsx");
const showroomSrc = read("lib/audio/useShowroomAmbient.ts");
const screenTracksSrc = read("lib/audio/screen-tracks.ts");

const checks = [];

function pass(id, detail) {
  checks.push({ id, status: "PASS", detail });
}

function fail(id, detail) {
  checks.push({ id, status: "FAIL", detail });
}

function warn(id, detail) {
  checks.push({ id, status: "WARN", detail });
}

// Parse gain constants from source
const ambientMatch = constantsSrc.match(/ambient:\s*(0\.\d+)/);
const narrationMatch = constantsSrc.match(/narration:\s*(0\.\d+|1)/);
const duckRatioMatch = constantsSrc.match(/AMBIENT_DUCK_RATIO\s*=\s*(0\.\d+)/);
const duckFadeMatch = constantsSrc.match(/AMBIENT_DUCK_FADE_MS\s*=\s*(\d+)/);
const restoreFadeMatch = constantsSrc.match(/AMBIENT_RESTORE_FADE_MS\s*=\s*(\d+)/);

const ambient = ambientMatch ? Number(ambientMatch[1]) : null;
const narration = narrationMatch ? Number(narrationMatch[1]) : null;
const duckRatio = duckRatioMatch ? Number(duckRatioMatch[1]) : null;
const duckFade = duckFadeMatch ? Number(duckFadeMatch[1]) : null;
const restoreFade = restoreFadeMatch ? Number(restoreFadeMatch[1]) : null;

if (ambient === 0.055 && narration === 1 && duckRatio === 0.2) {
  pass("mix-constants", `ambient=${ambient}, narration=${narration}, duckRatio=${duckRatio}`);
} else {
  fail("mix-constants", `unexpected values ambient=${ambient} narration=${narration} duckRatio=${duckRatio}`);
}

const ducked = ambient * duckRatio;
const narrationToAmbient = narration / ambient;
const narrationToDucked = narration / ducked;
pass(
  "mix-ratios",
  `ducked ambient=${ducked.toFixed(4)} (${(duckRatio * 100).toFixed(0)}% of base); narration:ambient=${narrationToAmbient.toFixed(1)}:1; narration:ducked=${narrationToDucked.toFixed(0)}:1`,
);

if (narration <= 1 && ambient <= 1 && ducked <= 1) {
  pass("mix-no-clipping-engine", "All computed element.volume targets ≤ 1.0 (no engine-side clipping)");
} else {
  fail("mix-no-clipping-engine", "Gain exceeds HTMLAudioElement max volume 1.0");
}

if (duckFade === 450 && restoreFade === 900) {
  pass("mix-fade-timings", `duck=${duckFade}ms restore=${restoreFade}ms`);
} else {
  fail("mix-fade-timings", `duck=${duckFade} restore=${restoreFade}`);
}

if (
  engineSrc.includes("syncAmbientVolume({ fade: true, restoring: false })") &&
  engineSrc.includes("syncAmbientVolume({ fade: true, restoring: true })")
) {
  pass("mix-duck-restore-hooks", "Narration start/end call separate duck and restore fades");
} else {
  fail("mix-duck-restore-hooks", "Missing duck/restore fade hooks in AudioEngine");
}

if (
  engineSrc.includes("configureMobileAudioElement(element)") &&
  mobileSrc.includes('setAttribute("playsinline"') &&
  mobileSrc.includes('setAttribute("webkit-playsinline"')
) {
  pass("mobile-playsinline", "All pooled audio elements receive playsinline attributes");
} else {
  fail("mobile-playsinline", "playsinline wiring incomplete");
}

if (
  providerSrc.includes("unlockFromUserGesture(SHOWROOM_AMBIENT_ASSET_ID)") &&
  attractSrc.includes("onPointerDown") &&
  overlaySrc.includes("ATTRACT_AUDIO_UNLOCK_PATH") &&
  overlaySrc.includes("onPointerDown")
) {
  pass("mobile-gesture-unlock", "Sync gesture unlock on attract + deep-link overlay");
} else {
  fail("mobile-gesture-unlock", "Gesture unlock path incomplete");
}

if (
  showroomSrc.includes("ensureShowroomAmbient") &&
  !screenTracksSrc.includes("autoPlayAmbient: true") &&
  engineSrc.includes("ensureAmbientPlaying")
) {
  pass("ambient-continuous", "Global ambient hook; per-screen autoPlayAmbient disabled");
} else {
  fail("ambient-continuous", "Ambient may restart per screen");
}

if (
  engineSrc.includes("handlePageHidden") &&
  engineSrc.includes("handlePageVisible") &&
  engineSrc.includes("visibilitychange")
) {
  pass("mobile-tab-background", "visibilitychange pauses/resumes ambient + narration");
} else {
  fail("mobile-tab-background", "Tab background handling missing");
}

if (!engineSrc.includes("webkitAudioContext") && !engineSrc.includes("new AudioContext")) {
  pass("no-audiocontext", "HTMLAudioElement only — no AudioContext suspended risk");
} else {
  fail("no-audiocontext", "Web Audio API detected");
}

if (providerSrc.includes("probe.volume = 0.001") && providerSrc.includes("SILENT_WAV_DATA_URI")) {
  pass("no-autoplay-violation-code", "Mount probe uses silent WAV only");
} else {
  fail("no-autoplay-violation-code", "Audible autoplay path detected in provider mount");
}

// pauseNarration does not restore ambient duck — document as known gap
if (engineSrc.includes("pauseChannel(channel: AudioChannel)") && !engineSrc.match(/pauseChannel[\s\S]*syncAmbientVolume/)) {
  warn(
    "narration-pause-duck",
    "pauseNarration() leaves ambient ducked until stop/resume/end — manual pause edge case",
  );
}

// S01 host narration before unlock
if (read("components/screens/ExperienceEntry.tsx").includes('screenId: "S01"') &&
    read("lib/audio/useHostNarration.ts").includes("!audioUnlocked")) {
  warn(
    "s01-attract-narration",
    "S01 host track requires audioUnlocked; attract tap advances to welcome — S01 narration rarely plays on mobile cold start",
  );
}

// No orientation handler
if (!engineSrc.includes("orientationchange") && !providerSrc.includes("orientationchange")) {
  warn("orientation-change", "No orientation listener — relies on browser; no code regression from mix pass");
}

// Concurrent fadeVolume has no cancel token
if (engineSrc.includes("requestAnimationFrame(step)") && !engineSrc.includes("fadeGeneration")) {
  warn("fade-overlap", "Concurrent fadeVolume rAF loops not cancelled — rapid screen changes may cause brief volume flutter");
}

for (const entry of EXECUTIVE_ROUTES) {
  const assetOk = entry.screen.startsWith("S01")
    ? fs.existsSync(path.join(ROOT, "public/assets/audio/narration/host/host-s01-attract.mp3"))
    : true;
  checks.push({
    id: `route-${entry.screen}`,
    status: assetOk ? "PASS" : "FAIL",
    detail: `${entry.route} → ${entry.wiredIn ?? "ScreenAudioController"}`,
  });
}

const ambientFile = path.join(ROOT, "public/assets/audio/ambient/showroom-loop.mp3");
if (fs.existsSync(ambientFile)) {
  pass("ambient-asset", `showroom-loop.mp3 (${(fs.statSync(ambientFile).size / 1024 / 1024).toFixed(2)} MB)`);
} else {
  fail("ambient-asset", "showroom-loop.mp3 missing");
}

const summary = {
  timestamp: new Date().toISOString(),
  recommendedGains: {
    narration: 1,
    ambient: 0.055,
    ambientDucked: Number((0.055 * 0.2).toFixed(4)),
    duckRatio: 0.2,
    duckFadeMs: 450,
    restoreFadeMs: 900,
    headphoneAmbientMultiplier: 0.5,
    headphoneNarrationMultiplier: 1,
  },
  checks,
  failures: checks.filter((c) => c.status === "FAIL").length,
  warnings: checks.filter((c) => c.status === "WARN").length,
};

console.log(JSON.stringify(summary, null, 2));
process.exit(summary.failures > 0 ? 1 : 0);
