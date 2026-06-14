import "server-only";

import fs from "fs";
import { cache } from "react";
import type { MediaAsset, MediaAvailabilityMap, MediaManifest } from "@/types/media";
import { fileExists, readJsonFile } from "@/lib/content/loader";
import { validateContent } from "@/lib/content/validator";
import { mediaManifestPath, publicAssetPath } from "./paths";

export function assetFileExists(src: string): boolean {
  if (!src.startsWith("/assets/")) {
    return false;
  }
  return fs.existsSync(publicAssetPath(src));
}

export function buildAvailabilityMap(manifest: MediaManifest): MediaAvailabilityMap {
  const map: MediaAvailabilityMap = {};

  for (const asset of manifest.assets) {
    map[asset.id] = assetFileExists(asset.src);
    if (asset.posterSrc) {
      map[`${asset.id}__poster`] = assetFileExists(asset.posterSrc);
    }
  }

  return map;
}

function indexManifest(manifest: MediaManifest): Map<string, MediaAsset> {
  return new Map(manifest.assets.map((asset) => [asset.id, asset]));
}

export const getMediaManifest = cache((vehicleSlug: string): MediaManifest => {
  const manifestPath = mediaManifestPath(vehicleSlug);

  if (!fileExists(manifestPath)) {
    return { vehicleSlug, assets: [] };
  }

  const data = readJsonFile<unknown>(manifestPath);
  return validateContent<MediaManifest>(
    "media-manifest.schema.json",
    data,
    `media-manifest:${vehicleSlug}`,
  );
});

export const getMediaManifestIndex = cache(
  (vehicleSlug: string): Map<string, MediaAsset> => {
    return indexManifest(getMediaManifest(vehicleSlug));
  },
);

export function getMediaAsset(
  vehicleSlug: string,
  mediaId: string,
): MediaAsset | undefined {
  return getMediaManifestIndex(vehicleSlug).get(mediaId);
}

export const getMediaAvailability = cache(
  (vehicleSlug: string): MediaAvailabilityMap => {
    return buildAvailabilityMap(getMediaManifest(vehicleSlug));
  },
);
