#!/usr/bin/env node
/**
 * Demo readiness audit — media manifest vs disk, per-screen media mapping.
 * Run: node scripts/demo-readiness-audit.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(
  fs.readFileSync(path.join(ROOT, "content/vehicles/gs4-max/media-manifest.json"), "utf8"),
);

function assetExists(src) {
  if (!src?.startsWith("/assets/")) return false;
  return fs.existsSync(path.join(ROOT, "public", src.slice(1)));
}

function resolveStatus(mediaId) {
  const asset = manifest.assets.find((a) => a.id === mediaId);
  if (!asset) return { mediaId, status: "unmapped", src: null };
  if (assetExists(asset.src)) return { mediaId, status: "ready", src: asset.src };
  if (asset.fallbackId) {
    const fb = manifest.assets.find((a) => a.id === asset.fallbackId);
    if (fb && assetExists(fb.src)) {
      return { mediaId, status: "fallback", src: fb.src, fallbackId: asset.fallbackId };
    }
  }
  return { mediaId, status: "placeholder", src: asset.src };
}

const vehicle = JSON.parse(
  fs.readFileSync(path.join(ROOT, "content/vehicles/gs4-max/vehicle.json"), "utf8"),
);
const compareHub = JSON.parse(
  fs.readFileSync(path.join(ROOT, "content/vehicles/gs4-max/compare/hub.json"), "utf8"),
);
const trustStory = JSON.parse(
  fs.readFileSync(path.join(ROOT, "content/vehicles/gs4-max/trust-story.json"), "utf8"),
);

const TARGET_FILES = [
  "public/assets/vehicles/gs4-max/exterior/hero-01.webp",
  "public/assets/vehicles/gs4-max/exterior/hero-ambient.webp",
  "public/assets/vehicles/gs4-max/exterior/front-34.webp",
  "public/assets/vehicles/gs4-max/interior/dashboard.webp",
  "public/assets/vehicles/gs4-max/lifestyle/family-road-trip.webp",
  "public/assets/personas/carlos-avatar.webp",
];

const screens = {
  S01: {
    route: "/",
    media: ["video-attract-loop", "gs4-max-hero-ambient", "gs4-max-hero-01"],
  },
  S02: {
    route: "/ (welcome phase)",
    media: ["gs4-max-hero-ambient", "persona-carlos-avatar", "persona-sofia-avatar", "persona-diego-avatar"],
  },
  S03: {
    route: "/vehicles",
    media: [
      vehicle.heroMediaId,
      "gs4-max-ext-silver",
      "emkoo-hero-01",
      "emzoom-hero-01",
      "gs8-hero-01",
    ],
  },
  S06: {
    route: "/vehicles/gs4-max/tour/trust",
    media: [
      "gs4-max-ext-front-34",
      "gs4-max-adas-hero",
      "warranty-timeline-5yr-150k",
      "gs4-max-service-cover",
      "video-trust-adas",
    ],
  },
  S08: {
    route: "/vehicles/gs4-max/themes/safety/adas",
    media: ["gs4-max-adas-hero", "gs4-max-int-dashboard", "gs4-max-family-cover"],
  },
  S11: {
    route: "/vehicles/gs4-max/compare",
    media: [compareHub.anchorMediaId, "compare-corolla-cross"],
  },
  S12: {
    route: "/vehicles/gs4-max/compare/corolla-cross",
    media: [vehicle.heroMediaId, "compare-corolla-cross", "persona-sofia-avatar"],
  },
  S13: {
    route: "/vehicles/gs4-max/convert",
    media: [vehicle.heroMediaId],
  },
  S14: {
    route: "/vehicles/gs4-max/test-drive",
    media: [vehicle.heroMediaId, "viaggio-test-drive-route"],
  },
  S15: {
    route: "/vehicles/gs4-max/whatsapp",
    media: ["logo-viaggio-full"],
  },
  S22: {
    route: "/vehicles/gs4-max/hero",
    media: [vehicle.heroMediaId, "gs4-max-ext-front-34"],
  },
  S24: {
    route: "/vehicles/gs4-max/trust/story",
    media: trustStory.chapters.map((c) => c.mediaId).filter(Boolean),
  },
  S25: {
    route: "/vehicles/gs4-max/trust/faq",
    media: ["persona-carlos-avatar", "warranty-timeline-5yr-150k"],
  },
  S26: {
    route: "/vehicles/gs4-max/economics/financing",
    media: ["logo-bank-partner-1", vehicle.heroMediaId],
  },
};

console.log(JSON.stringify({ TARGET_FILES, screens, resolveStatus }, null, 2));

const manifestStats = { ready: 0, missing: 0 };
for (const a of manifest.assets) {
  if (assetExists(a.src)) manifestStats.ready++;
  else manifestStats.missing++;
}

const report = {
  generatedAt: new Date().toISOString(),
  manifestStats,
  targetFiles: TARGET_FILES.map((p) => ({
    path: p,
    exists: fs.existsSync(path.join(ROOT, p)),
    manifestEntry: manifest.assets.find((a) => a.src === `/${p.replace("public/", "")}`)?.id ?? null,
  })),
  screens: Object.fromEntries(
    Object.entries(screens).map(([id, { route, media }]) => {
      const resolved = [...new Set(media)].map(resolveStatus);
      const placeholderVisible = resolved.every((r) => r.status === "placeholder" || r.status === "unmapped");
      const anyReady = resolved.some((r) => r.status === "ready");
      const score = anyReady ? (placeholderVisible ? 4 : 7) : placeholderVisible ? 5 : 6;
      return [
        id,
        {
          route,
          media: resolved,
          placeholderVisible,
          missingAssets: resolved.filter((r) => r.status !== "ready").map((r) => r.mediaId),
          visualQualityScore: score,
        },
      ];
    }),
  ),
};

console.log(JSON.stringify(report, null, 2));
