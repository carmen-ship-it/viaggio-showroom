#!/usr/bin/env node
/**
 * MediaResolver trace — manifest vs disk with fallback chain resolution.
 * Run: node scripts/media-resolver-trace.mjs
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const manifest = JSON.parse(
  fs.readFileSync(path.join(ROOT, "content/vehicles/gs4-max/media-manifest.json"), "utf8"),
);

const index = new Map(manifest.assets.map((a) => [a.id, a]));
const MAX_DEPTH = 8;

function assetExists(src) {
  if (!src?.startsWith("/assets/")) return false;
  return fs.existsSync(path.join(ROOT, "public", src.slice(1)));
}

function resolveMediaId(mediaId, visited = new Set()) {
  if (visited.has(mediaId) || visited.size >= MAX_DEPTH) {
    return {
      mediaId,
      manifestPath: null,
      detected: false,
      fallbackActive: true,
      resolvedSrc: null,
      status: "placeholder",
      chain: [...visited, mediaId],
    };
  }
  visited.add(mediaId);
  const asset = index.get(mediaId);
  if (!asset) {
    return {
      mediaId,
      manifestPath: null,
      detected: false,
      fallbackActive: false,
      resolvedSrc: null,
      status: "unmapped",
      chain: [...visited],
    };
  }

  const primaryExists = assetExists(asset.src);
  if (primaryExists) {
    return {
      mediaId,
      manifestPath: asset.src,
      detected: true,
      fallbackActive: false,
      resolvedSrc: asset.src,
      status: "ready",
      chain: [...visited],
    };
  }

  if (asset.fallbackId && !visited.has(asset.fallbackId)) {
    const resolved = resolveMediaId(asset.fallbackId, visited);
    return {
      mediaId,
      manifestPath: asset.src,
      detected: false,
      fallbackActive: resolved.status === "ready" || resolved.status === "fallback",
      resolvedSrc: resolved.resolvedSrc,
      fallbackId: asset.fallbackId,
      status: resolved.resolvedSrc ? "fallback" : "placeholder",
      chain: resolved.chain,
    };
  }

  return {
    mediaId,
    manifestPath: asset.src,
    detected: false,
    fallbackActive: false,
    resolvedSrc: null,
    status: "placeholder",
    chain: [...visited],
  };
}

const PHASE_3A = [
  "gs4-max-hero-01",
  "gs4-max-hero-ambient",
  "gs4-max-ext-front-34",
  "gs4-max-int-dashboard",
  "gs4-max-family-cover",
  "persona-carlos-avatar",
];

const P0_CATALOG = [
  "gs4-max-hero-01",
  "gs4-max-hero-ambient",
  "video-attract-loop",
  "gs4-max-ext-front-34",
  "gs4-max-ext-silver",
  "compare-corolla-cross",
  "gs4-max-int-dashboard",
  "gs4-max-int-rear-seats",
  "warranty-timeline-5yr-150k",
  "logo-viaggio-full",
  "logo-gac-full",
  "persona-carlos-avatar",
  "persona-sofia-avatar",
  "persona-diego-avatar",
  "video-trust-adas",
];

const uniquePaths = [...new Set(manifest.assets.map((a) => a.src))];
const manifestAudit = uniquePaths.map((src) => ({
  path: src,
  onDisk: assetExists(src),
  mediaIds: manifest.assets.filter((a) => a.src === src).map((a) => a.id),
}));

const report = {
  generatedAt: new Date().toISOString(),
  phase3a: PHASE_3A.map((id) => resolveMediaId(id)),
  p0Catalog: P0_CATALOG.map((id) => resolveMediaId(id)),
  manifestSummary: {
    totalAssets: manifest.assets.length,
    uniquePaths: uniquePaths.length,
    pathsOnDisk: uniquePaths.filter((p) => assetExists(p)).length,
    pathsMissing: uniquePaths.filter((p) => !assetExists(p)).length,
  },
  manifestAudit,
};

console.log(JSON.stringify(report, null, 2));
