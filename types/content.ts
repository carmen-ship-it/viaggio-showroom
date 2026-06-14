import type { PersonaId } from "./persona";

export type ContentBlockType =
  | "hero"
  | "narration"
  | "feature_grid"
  | "stat_callout"
  | "media_gallery"
  | "comparison_snippet"
  | "accordion"
  | "video"
  | "cta";

export type CtaAction =
  | "test_drive"
  | "test_drive_info"
  | "whatsapp"
  | "compare"
  | "tour"
  | "topic"
  | "share";

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  personaId?: PersonaId;
  sortOrder: number;
  data?: Record<string, unknown>;
}

export interface Theme {
  id: string;
  vehicleSlug: string;
  title: string;
  description?: string;
  icon?: string;
  primaryPersonaId: PersonaId;
  sortOrder: number;
  coverMediaId?: string;
  topicIds?: string[];
}

export interface Topic {
  id: string;
  themeId: string;
  vehicleSlug: string;
  title: string;
  personaId: PersonaId;
  tags?: string[];
  relatedTopicIds?: string[];
  blocks: ContentBlock[];
}

export interface TourStep {
  id: string;
  title?: string;
  topicId?: string;
  personaId: PersonaId;
  blocks?: ContentBlock[];
}

export interface Tour {
  id: string;
  vehicleSlug: string;
  title: string;
  description?: string;
  durationMinutes: number;
  leadPersonaId: PersonaId;
  steps: TourStep[];
}

export type JourneyPersonaSlug = "carlos" | "sofia" | "diego";

export const JOURNEY_TOUR_MAP: Record<JourneyPersonaSlug, string> = {
  carlos: "trust",
  sofia: "desire",
  diego: "family",
};
