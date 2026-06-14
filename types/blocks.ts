export interface HeroBlockData {
  mediaId: string;
  headline: string;
  subheadline?: string;
}

export interface NarrationBlockData {
  text: string;
  emphasis?: string;
  /** Maps to media-manifest or lib/audio/assets registry */
  audioAssetId?: string;
  /** Kiosk auto-advance vs full script when both variants exist */
  variant?: "short" | "full";
  autoPlay?: boolean;
}

export interface FeatureGridItem {
  icon: string;
  title: string;
  description: string;
}

export interface FeatureGridBlockData {
  features: FeatureGridItem[];
}

export interface StatCalloutItem {
  value: string;
  label: string;
}

export interface StatCalloutBlockData {
  stats: StatCalloutItem[];
}

export interface CtaBlockData {
  action:
    | "test_drive"
    | "test_drive_info"
    | "whatsapp"
    | "compare"
    | "tour"
    | "topic"
    | "share";
  label: string;
  targetId?: string;
  targetThemeId?: string;
}

export interface TrustSectionBlockData {
  title: string;
  subtitle?: string;
  items: Array<{
    icon?: string;
    label: string;
    value: string;
  }>;
  variant?: "warranty" | "service" | "heritage" | "default";
}
