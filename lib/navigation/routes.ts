import type { JourneyPersonaSlug } from "@/types/content";

const showroomRoot = "";

export const routes = {
  home: () => `${showroomRoot}/`,
  vehicles: () => `${showroomRoot}/vehicles`,
  vehicle: (slug: string) => `${showroomRoot}/vehicles/${slug}`,
  vehicleHero: (slug: string) => `${showroomRoot}/vehicles/${slug}/hero`,
  theme: (slug: string, themeId: string) =>
    `${showroomRoot}/vehicles/${slug}/themes/${themeId}`,
  topic: (slug: string, themeId: string, topicId: string) =>
    `${showroomRoot}/vehicles/${slug}/themes/${themeId}/${topicId}`,
  tour: (slug: string, tourId: string) =>
    `${showroomRoot}/vehicles/${slug}/tour/${tourId}`,
  journey: (slug: string, persona: JourneyPersonaSlug) =>
    `${showroomRoot}/vehicles/${slug}/journey/${persona}`,
  faq: (slug: string) => `${showroomRoot}/vehicles/${slug}/trust/faq`,
  trustStory: (slug: string) => `${showroomRoot}/vehicles/${slug}/trust/story`,
  personaExperience: (slug: string, persona: string) =>
    `${showroomRoot}/vehicles/${slug}/experience/${persona}`,
  warranty: (slug: string) => `${showroomRoot}/vehicles/${slug}/trust/warranty`,
  financing: (slug: string) =>
    `${showroomRoot}/vehicles/${slug}/economics/financing`,
  testDrive: (slug: string) => `${showroomRoot}/vehicles/${slug}/test-drive`,
  testDriveInfo: (slug: string) =>
    `${showroomRoot}/vehicles/${slug}/test-drive/info`,
  share: (slug: string) => `${showroomRoot}/vehicles/${slug}/share`,
  shareToken: (slug: string, token: string) =>
    `${showroomRoot}/vehicles/${slug}/share/${token}`,
  convert: (slug: string) => `${showroomRoot}/vehicles/${slug}/convert`,
  whatsapp: (slug: string) => `${showroomRoot}/vehicles/${slug}/whatsapp`,
  resume: (slug: string) => `${showroomRoot}/vehicles/${slug}/resume`,
  compare: (slug: string) => `${showroomRoot}/vehicles/${slug}/compare`,
  compareDetail: (slug: string, targetId: string) =>
    `${showroomRoot}/vehicles/${slug}/compare/${targetId}`,
  gallery: (slug: string) => `${showroomRoot}/vehicles/${slug}/gallery`,
  specs: (slug: string) => `${showroomRoot}/vehicles/${slug}/specs`,
} as const;

export type RouteKey = keyof typeof routes;
