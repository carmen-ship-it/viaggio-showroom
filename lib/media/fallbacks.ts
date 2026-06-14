/**
 * Default video → still fallback chains when manifest entry lacks fallbackId.
 * Keys are media IDs; values are image asset IDs from the manifest.
 */
export const VIDEO_FALLBACK_IDS: Record<string, string> = {
  "video-attract-loop": "gs4-max-hero-01",
  "video-hero-ambient": "gs4-max-hero-ambient",
  "video-trust-adas": "gs4-max-int-dashboard",
  "video-trust-heritage": "gs4-max-hero-01",
  "video-viaggio-taller": "gs4-max-service-cover",
  "video-trust-engine": "gs4-max-ext-front-34",
  "video-trust-chassis": "gs4-max-ext-front-34",
  "video-trust-structure": "gs4-max-ext-front-34",
};

export const IMAGE_FALLBACK_IDS: Record<string, string> = {
  "gs4-max-hero-ambient": "gs4-max-hero-01",
  "gs4-max-adas-hero": "gs4-max-int-dashboard",
  "gs4-max-int-360-display": "gs4-max-int-dashboard",
  "gs4-max-technology-cover": "gs4-max-int-dashboard",
  "gs4-max-family-safety-hero": "gs4-max-int-rear-seats",
  "gs4-max-family-cover": "gs4-max-int-rear-seats",
  "gs4-max-service-cover": "gs4-max-hero-01",
  "gs4-max-safety-cover": "gs4-max-int-rear-seats",
  "gs4-max-reliability-cover": "gs4-max-ext-front-34",
  "gs4-max-warranty-cover": "warranty-timeline-5yr-150k",
  "emkoo-hero-01": "gs4-max-hero-01",
  "emzoom-hero-01": "gs4-max-hero-01",
  "gs8-hero-01": "gs4-max-hero-01",
};

export function getConfiguredFallbackId(mediaId: string): string | undefined {
  return VIDEO_FALLBACK_IDS[mediaId] ?? IMAGE_FALLBACK_IDS[mediaId];
}
