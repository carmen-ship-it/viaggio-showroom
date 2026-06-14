import { cache } from "react";
import { notFound } from "next/navigation";
import type {
  PersonaExperience,
  VehicleFaq,
  VehicleTrustStory,
} from "@/types/trust";
import { contentPaths } from "./paths";
import { fileExists, readJsonFile } from "./loader";
import { vehicleExists } from "./vehicle";

function faqPath(slug: string) {
  return `${contentPaths.vehicleDir(slug)}/faq.json`;
}

function trustStoryPath(slug: string) {
  return `${contentPaths.vehicleDir(slug)}/trust-story.json`;
}

function personaExperiencePath(slug: string, persona: string) {
  return `${contentPaths.vehicleDir(slug)}/experience/${persona}.json`;
}

export const getVehicleFaq = cache((vehicleSlug: string): VehicleFaq => {
  if (!vehicleExists(vehicleSlug)) notFound();
  const path = faqPath(vehicleSlug);
  if (!fileExists(path)) notFound();
  return readJsonFile<VehicleFaq>(path);
});

export const getVehicleTrustStory = cache(
  (vehicleSlug: string): VehicleTrustStory => {
    if (!vehicleExists(vehicleSlug)) notFound();
    const path = trustStoryPath(vehicleSlug);
    if (!fileExists(path)) notFound();
    return readJsonFile<VehicleTrustStory>(path);
  },
);

export function faqExists(vehicleSlug: string): boolean {
  return fileExists(faqPath(vehicleSlug));
}

export function trustStoryExists(vehicleSlug: string): boolean {
  return fileExists(trustStoryPath(vehicleSlug));
}

export const getPersonaExperience = cache(
  (vehicleSlug: string, persona: string): PersonaExperience => {
    if (!vehicleExists(vehicleSlug)) notFound();
    const path = personaExperiencePath(vehicleSlug, persona);
    if (!fileExists(path)) notFound();
    return readJsonFile<PersonaExperience>(path);
  },
);

export function personaExperienceExists(
  vehicleSlug: string,
  persona: string,
): boolean {
  return fileExists(personaExperiencePath(vehicleSlug, persona));
}

export function carlosTrustExists(vehicleSlug: string): boolean {
  return (
    faqExists(vehicleSlug) &&
    trustStoryExists(vehicleSlug) &&
    personaExperienceExists(vehicleSlug, "carlos")
  );
}
