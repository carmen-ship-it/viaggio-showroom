import "server-only";

import type {
  MediaAvailabilityMap,
  MediaManifest,
  ResolvedMedia,
} from "@/types/media";
import { resolveMediaAsset, validateMediaAssets } from "./resolve";
import { getMediaManifest, getMediaAvailability } from "./manifest";

export type AssetManifest = MediaManifest;

export class MediaResolver {
  constructor(
    private readonly vehicleSlug: string,
    private readonly availability: MediaAvailabilityMap = getMediaAvailability(
      vehicleSlug,
    ),
  ) {}

  static forVehicle(vehicleSlug: string): MediaResolver {
    return new MediaResolver(vehicleSlug);
  }

  resolve(mediaId: string): ResolvedMedia {
    return resolveMediaAsset(this.vehicleSlug, mediaId, this.availability);
  }

  getManifest(): AssetManifest {
    return getMediaManifest(this.vehicleSlug);
  }

  validate(referencedIds: string[]) {
    return validateMediaAssets(this.vehicleSlug, referencedIds);
  }
}

export { resolveMediaAsset, validateMediaAssets };
