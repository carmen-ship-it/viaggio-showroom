import { cache } from "react";
import { contentPaths } from "./paths";
import { readJsonFile } from "./loader";

export interface TestDriveLogistics {
  title: string;
  subtitle: string;
  heroMediaId: string;
  duration: { headline: string; description: string };
  familyWelcome: {
    headline: string;
    description: string;
    childrenNote: string;
  };
  spouse: { headline: string; description: string };
  route: { headline: string; description: string; mediaId: string };
  bring: { headline: string; items: string[] };
  scheduling: {
    headline: string;
    weekday: string;
    weekend: string;
    note: string;
  };
  vehiclePrep: { headline: string; description: string };
  whatToExpect: { headline: string; steps: string[] };
}

export interface ShareSummaryBullet {
  id: string;
  title: string;
  description: string;
}

export interface ShareSummary {
  vehicleSlug: string;
  headline: string;
  subheadline: string;
  bullets: ShareSummaryBullet[];
  whatsappTemplate: string;
  testDriveInvite: string;
}

export interface TestDriveFormContent {
  title: string;
  subtitle: string;
  fields: {
    name: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    email: { label: string; placeholder: string; helper: string };
    preferredDay: { label: string };
    timeSlot: { label: string };
    attendees: { label: string };
    spouse: { label: string };
    children: { label: string };
    childSeat: {
      label: string;
      options: { yes: string; no: string; unknown: string };
    };
    route: { label: string };
  };
  timeSlots: { morning: string; afternoon: string; weekend: string };
  routes: { city: string; doble_via: string; both: string };
  submit: string;
  confirmation: {
    headline: string;
    helper: string;
    sharePrompt: string;
    whatsappConfirm: string;
  };
}

export const getTestDriveLogistics = cache((): TestDriveLogistics => {
  return readJsonFile<TestDriveLogistics>(
    `${contentPaths.sharedDir()}/test-drive-logistics.json`,
  );
});

export const getTestDriveForm = cache((): TestDriveFormContent => {
  return readJsonFile<TestDriveFormContent>(
    `${contentPaths.sharedDir()}/test-drive-form.json`,
  );
});

export function getShareSummary(vehicleSlug: string): ShareSummary {
  const path = `${contentPaths.vehicleDir(vehicleSlug)}/share-summary.json`;
  try {
    return readJsonFile<ShareSummary>(path);
  } catch {
    return {
      vehicleSlug,
      headline: "Resumen para tu familia",
      subheadline: "Explorá el vehículo en Viaggio Motors",
      bullets: [],
      whatsappTemplate: "Mirá lo que vimos en Viaggio — ¿lo vemos juntos?",
      testDriveInvite: "Agendá una prueba de manejo en familia.",
    };
  }
}
