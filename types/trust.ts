import type { PersonaId } from "./persona";
import type { ContentBlock } from "./content";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  proofSuggestion?: string;
  personaId: PersonaId;
}

export interface VehicleFaq {
  vehicleSlug: string;
  title: string;
  subtitle?: string;
  introPersonaId: PersonaId;
  items: FaqItem[];
}

export interface TrustStoryChapter {
  id: string;
  title: string;
  subtitle?: string;
  variant: "dark" | "light";
  mediaId?: string;
  personaId: PersonaId;
  blocks: ContentBlock[];
}

export interface VehicleTrustStory {
  vehicleSlug: string;
  title: string;
  chapters: TrustStoryChapter[];
}

export interface PersonaExperience {
  vehicleSlug: string;
  personaId: PersonaId;
  title: string;
  subtitle?: string;
  mediaId?: string;
  blocks: ContentBlock[];
  tourId?: string;
  themeId?: string;
}
