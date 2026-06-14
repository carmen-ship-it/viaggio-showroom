export type MediaType = "image" | "video";

export type MediaCategory =
  | "exterior"
  | "interior"
  | "detail"
  | "lifestyle"
  | "persona"
  | "brand";

export interface MediaAsset {
  id: string;
  type: MediaType;
  src: string;
  alt: string;
  vehicleSlug?: string;
  category?: MediaCategory;
  tags?: string[];
  posterSrc?: string;
  fallbackId?: string;
}

export interface MediaManifest {
  vehicleSlug: string;
  assets: MediaAsset[];
}

export type MediaLoadStatus =
  | "ready"
  | "missing"
  | "fallback"
  | "placeholder";

export interface ResolvedMedia {
  mediaId: string;
  type: MediaType;
  src: string | null;
  alt: string;
  posterSrc?: string;
  status: MediaLoadStatus;
  resolvedFromId: string;
  fallbackId?: string;
}

export type MediaAvailabilityMap = Record<string, boolean>;
