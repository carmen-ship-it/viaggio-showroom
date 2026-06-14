export type VehicleStatus = "active" | "preview" | "coming_soon";

export interface VehicleKeyStat {
  label: string;
  value: string;
  icon?: string;
}

export interface HeroHotspot {
  id: string;
  label: string;
  topicId: string;
  themeId: string;
  position: { x: number; y: number };
}

export interface VehicleMetadata {
  segment?: string;
  fuelType?: string;
  engine?: string;
  transmission?: string;
  drivetrain?: string;
  heroHotspots?: HeroHotspot[];
  [key: string]: string | HeroHotspot[] | undefined;
}

export interface Vehicle {
  slug: string;
  modelName: string;
  modelYear: number;
  status: VehicleStatus;
  tagline: string;
  heroMediaId?: string;
  priceFrom?: number;
  priceDisclaimer?: string;
  launchPriority?: number;
  keyStats?: VehicleKeyStat[];
  metadata?: VehicleMetadata;
}

export interface VehicleRegistryEntry {
  slug: string;
  modelName: string;
  modelYear: number;
  status: VehicleStatus;
  tagline: string;
  heroMediaId?: string;
  priceFrom?: number;
  priceDisclaimer?: string;
  launchPriority?: number;
}

export interface VehicleRegistry {
  vehicles: VehicleRegistryEntry[];
  defaultVehicleSlug: string;
}
