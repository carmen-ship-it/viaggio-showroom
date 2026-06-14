import "server-only";

import path from "path";
import { contentPaths } from "@/lib/content/paths";

export const MEDIA_MANIFEST_FILENAME = "media-manifest.json";

export function mediaManifestPath(vehicleSlug: string): string {
  return path.join(contentPaths.vehicleDir(vehicleSlug), MEDIA_MANIFEST_FILENAME);
}

export function publicAssetPath(src: string): string {
  const normalized = src.startsWith("/") ? src.slice(1) : src;
  return path.join(process.cwd(), "public", normalized);
}
