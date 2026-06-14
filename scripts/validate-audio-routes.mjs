#!/usr/bin/env node
/**
 * Validates executive demo host narration assets and route → track mapping.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const HOST_DIR = path.join(ROOT, "public/assets/audio/narration/host");

const HOST_TRACKS = {
  "host-s01": {
    file: "host-s01-attract.mp3",
    screen: "S01 Attract",
    route: "/",
  },
  "host-s03": {
    file: "host-s03-selector.mp3",
    screen: "S03 Selector",
    route: "/vehicles",
  },
  "host-s22": {
    file: "host-s22-hero.mp3",
    screen: "S22 Hero",
    route: "/vehicles/gs4-max/hero",
  },
  "host-s06-trust": {
    file: "host-s06-tour-intro-trust.mp3",
    screen: "S06 Tour Intro (trust)",
    route: "/vehicles/gs4-max/tour/trust",
  },
  "host-s08-adas": {
    file: "host-s08-adas.mp3",
    screen: "S08 ADAS",
    route: "/vehicles/gs4-max/themes/safety/adas",
  },
  "host-s12": {
    file: "host-s12-compare.mp3",
    screen: "S12 Compare",
    route: "/vehicles/gs4-max/compare/corolla-cross",
  },
  "host-s26": {
    file: "host-s26-financing.mp3",
    screen: "S26 Financing",
    route: "/vehicles/gs4-max/economics/financing",
  },
  "host-s13": {
    file: "host-s13-convert.mp3",
    screen: "S13 Convert",
    route: "/vehicles/gs4-max/convert",
  },
  "host-s15": {
    file: "host-s15-whatsapp.mp3",
    screen: "S15 WhatsApp",
    route: "/vehicles/gs4-max/whatsapp",
  },
};

function resolveTourId(routePath) {
  const segment = routePath.split("/").pop();
  if (!segment) return undefined;
  if (routePath.includes("/journey/")) {
    if (segment === "diego") return "family";
    if (segment === "sofia") return "desire";
    return "trust";
  }
  return segment;
}

function resolveHostTrackKey({ screenId, tourId, topicId }) {
  switch (screenId) {
    case "S01":
      return "host-s01";
    case "S03":
      return "host-s03";
    case "S22":
      return "host-s22";
    case "S06":
      if (tourId === "family") return "host-s06-family";
      if (tourId === "desire") return "host-s06-desire";
      return "host-s06-trust";
    case "S08":
      if (topicId === "adas") return "host-s08-adas";
      return "host-s08-frame";
    case "S12":
      return "host-s12";
    case "S26":
      return "host-s26";
    case "S13":
      return "host-s13";
    case "S15":
      return "host-s15";
    default:
      return null;
  }
}

const HOST_ROUTE_SCREENS = [
  { screenId: "S03", match: (p) => p === "/vehicles" },
  { screenId: "S22", match: (p) => /\/vehicles\/[^/]+\/hero$/.test(p) },
  {
    screenId: "S06",
    match: (p) => /\/vehicles\/[^/]+\/(tour|journey)\/[^/]+$/.test(p),
    tourId: resolveTourId,
  },
  {
    screenId: "S08",
    match: (p) => /\/vehicles\/[^/]+\/themes\/[^/]+\/[^/]+$/.test(p),
    topicId: (p) => p.split("/").pop(),
  },
  { screenId: "S12", match: (p) => /\/vehicles\/[^/]+\/compare\/[^/]+$/.test(p) },
  {
    screenId: "S26",
    match: (p) => /\/vehicles\/[^/]+\/economics\/financing$/.test(p),
  },
  { screenId: "S13", match: (p) => /\/vehicles\/[^/]+\/convert$/.test(p) },
  { screenId: "S15", match: (p) => /\/vehicles\/[^/]+\/whatsapp$/.test(p) },
];

function fileExists(relativePath) {
  return fs.existsSync(path.join(ROOT, "public", relativePath.replace(/^\//, "")));
}

const report = [];
let failures = 0;

for (const [trackKey, meta] of Object.entries(HOST_TRACKS)) {
  const src = `/assets/audio/narration/host/${meta.file}`;
  const exists = fileExists(src);
  const wavLeftover = fs.existsSync(path.join(HOST_DIR, meta.file.replace(".mp3", ".wav")));

  if (!exists) failures += 1;

  report.push({
    screen: meta.screen,
    route: meta.route,
    trackKey,
    narrationFile: meta.file,
    status: exists ? "OK" : "MISSING",
    missingAssets: exists ? [] : [src],
    notes: wavLeftover ? "synthetic WAV still on disk" : undefined,
  });
}

for (const entry of report) {
  if (entry.trackKey === "host-s01") {
    entry.notes = [entry.notes, "wired via ExperienceEntry"].filter(Boolean).join("; ");
    continue;
  }

  const config = HOST_ROUTE_SCREENS.find((item) => item.match(entry.route));
  if (!config) {
    entry.status = entry.status === "OK" ? "ROUTE_UNMATCHED" : entry.status;
    entry.notes = [entry.notes, "no ScreenAudioController route"].filter(Boolean).join("; ");
    failures += 1;
    continue;
  }

  const trackKey = resolveHostTrackKey({
    screenId: config.screenId,
    tourId: config.tourId?.(entry.route),
    topicId: config.topicId?.(entry.route),
  });

  if (trackKey !== entry.trackKey) {
    entry.status = "ROUTE_MISMATCH";
    entry.notes = [entry.notes, `expected ${entry.trackKey}, got ${trackKey}`].filter(Boolean).join("; ");
    failures += 1;
  }
}

const ambientRemoved = !fileExists("/assets/audio/ambient/showroom-loop.mp3");
const sfxFiles = [
  "nav-tap.mp3",
  "card-select.mp3",
  "transition-soft.mp3",
  "success.mp3",
  "qr-reveal.mp3",
];

for (const sfx of sfxFiles) {
  const src = `/assets/audio/sfx/${sfx}`;
  if (!fileExists(src)) {
    report.push({
      screen: "UI SFX",
      route: "—",
      trackKey: "—",
      narrationFile: sfx,
      status: "MISSING",
      missingAssets: [src],
    });
    failures += 1;
  }
}

console.log(JSON.stringify({ ambientRemoved, report, failures }, null, 2));
process.exit(failures > 0 ? 1 : 0);
