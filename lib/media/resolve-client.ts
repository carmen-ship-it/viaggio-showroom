import type {
  MediaAsset,
  MediaAvailabilityMap,
  MediaLoadStatus,
  ResolvedMedia,
} from "@/types/media";
import { getConfiguredFallbackId } from "./fallbacks";

const MAX_FALLBACK_DEPTH = 6;

function indexManifest(assets: MediaAsset[]): Map<string, MediaAsset> {
  return new Map(assets.map((asset) => [asset.id, asset]));
}

function resolveFallbackId(asset: MediaAsset | undefined, mediaId: string): string | undefined {
  return asset?.fallbackId ?? getConfiguredFallbackId(mediaId);
}

function pickSrc(
  asset: MediaAsset,
  availability: MediaAvailabilityMap,
): { src: string | null; status: MediaLoadStatus } {
  if (availability[asset.id]) {
    return { src: asset.src, status: "ready" };
  }
  return { src: null, status: "missing" };
}

export function resolveMediaFromManifest(
  assets: MediaAsset[],
  mediaId: string,
  availability: MediaAvailabilityMap = {},
  visited: Set<string> = new Set(),
): ResolvedMedia {
  const index = indexManifest(assets);

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
  const asset = index.get(mediaId);

  if (!asset) {
    const configuredFallback = getConfiguredFallbackId(mediaId);
    if (configuredFallback && !visited.has(configuredFallback)) {
      const resolved = resolveMediaFromManifest(
        assets,
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
    const resolved = resolveMediaFromManifest(assets, fallbackId, availability, visited);
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
