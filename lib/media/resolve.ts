import "server-only";

import type {
  MediaAsset,
  MediaAvailabilityMap,
  MediaLoadStatus,
  ResolvedMedia,
} from "@/types/media";
import { getConfiguredFallbackId } from "./fallbacks";
import { assetFileExists, getMediaManifestIndex } from "./manifest";

const MAX_FALLBACK_DEPTH = 6;

function resolveFallbackId(asset: MediaAsset | undefined, mediaId: string): string | undefined {
  return asset?.fallbackId ?? getConfiguredFallbackId(mediaId);
}

function pickSrc(
  asset: MediaAsset,
  availability: MediaAvailabilityMap,
): { src: string | null; status: MediaLoadStatus } {
  if (availability[asset.id] ?? assetFileExists(asset.src)) {
    return { src: asset.src, status: "ready" };
  }
  return { src: null, status: "missing" };
}

export function resolveMediaAsset(
  vehicleSlug: string,
  mediaId: string,
  availability: MediaAvailabilityMap = {},
  visited: Set<string> = new Set(),
): ResolvedMedia {
  if (visited.has(mediaId) || visited.size >= MAX_FALLBACK_DEPTH) {
    return {
      mediaId,
      type: "image",
      src: null,
      alt: mediaId.replace(/[-_]/g, " "),
      status: "placeholder",
      resolvedFromId: mediaId,
    };
  }

  visited.add(mediaId);
  const index = getMediaManifestIndex(vehicleSlug);
  const asset = index.get(mediaId);

  if (!asset) {
    const configuredFallback = getConfiguredFallbackId(mediaId);
    if (configuredFallback && !visited.has(configuredFallback)) {
      const resolved = resolveMediaAsset(
        vehicleSlug,
        configuredFallback,
        availability,
        visited,
      );
      return {
        ...resolved,
        mediaId,
        status: "fallback",
        resolvedFromId: mediaId,
        fallbackId: configuredFallback,
      };
    }

    return {
      mediaId,
      type: "image",
      src: null,
      alt: mediaId.replace(/[-_]/g, " "),
      status: "placeholder",
      resolvedFromId: mediaId,
    };
  }

  const { src, status } = pickSrc(asset, availability);

  if (src) {
    return {
      mediaId,
      type: asset.type,
      src,
      alt: asset.alt,
      posterSrc: asset.posterSrc,
      status,
      resolvedFromId: mediaId,
      fallbackId: resolveFallbackId(asset, mediaId),
    };
  }

  const fallbackId = resolveFallbackId(asset, mediaId);
  if (fallbackId && !visited.has(fallbackId)) {
    const resolved = resolveMediaAsset(vehicleSlug, fallbackId, availability, visited);
    return {
      ...resolved,
      mediaId,
      type: resolved.type === "video" && asset.type === "video" ? "image" : resolved.type,
      alt: asset.alt,
      posterSrc: asset.posterSrc ?? resolved.posterSrc,
      status: "fallback",
      resolvedFromId: mediaId,
      fallbackId,
    };
  }

  return {
    mediaId,
    type: asset.type,
    src: null,
    alt: asset.alt,
    posterSrc: asset.posterSrc,
    status: "placeholder",
    resolvedFromId: mediaId,
    fallbackId,
  };
}

export interface MediaValidationIssue {
  mediaId: string;
  kind: "missing_file" | "missing_manifest" | "broken_fallback";
  message: string;
}

export function validateMediaAssets(
  vehicleSlug: string,
  referencedIds: string[],
): MediaValidationIssue[] {
  const index = getMediaManifestIndex(vehicleSlug);
  const issues: MediaValidationIssue[] = [];
  const seen = new Set<string>();

  for (const mediaId of referencedIds) {
    if (seen.has(mediaId)) continue;
    seen.add(mediaId);

    const asset = index.get(mediaId);
    if (!asset) {
      issues.push({
        mediaId,
        kind: "missing_manifest",
        message: `No manifest entry for "${mediaId}"`,
      });
      continue;
    }

    if (!assetFileExists(asset.src)) {
      issues.push({
        mediaId,
        kind: "missing_file",
        message: `Asset file missing: ${asset.src}`,
      });
    }

    const fallbackId = resolveFallbackId(asset, mediaId);
    if (fallbackId && !index.has(fallbackId)) {
      issues.push({
        mediaId,
        kind: "broken_fallback",
        message: `Fallback "${fallbackId}" is not registered in manifest`,
      });
    }
  }

  return issues;
}
