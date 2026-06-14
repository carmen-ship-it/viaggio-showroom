import type { HeroHotspot, VehicleMetadata } from "@/types/vehicle";

export function getHeroHotspots(metadata?: VehicleMetadata): HeroHotspot[] {
  const raw = metadata?.heroHotspots;
  if (!Array.isArray(raw)) return [];
  return raw as HeroHotspot[];
}
