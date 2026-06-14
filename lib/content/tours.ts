import { cache } from "react";
import { notFound } from "next/navigation";
import type { JourneyPersonaSlug, Tour } from "@/types/content";
import { JOURNEY_TOUR_MAP } from "@/types/content";
import { contentPaths } from "./paths";
import { readJsonFile, readJsonFilesFromDir } from "./loader";
import { validateContent } from "./validator";
import { vehicleExists } from "./vehicle";
import { tourExists } from "./availability";

export const getTours = cache((vehicleSlug: string): Tour[] => {
  if (!vehicleExists(vehicleSlug)) {
    notFound();
  }

  return readJsonFilesFromDir<unknown>(contentPaths.toursDir(vehicleSlug)).map(
    (data, index) =>
      validateContent<Tour>(
        "tour.schema.json",
        data,
        `tour:${vehicleSlug}:${index}`,
      ),
  );
});

export const getTour = cache((vehicleSlug: string, tourId: string): Tour => {
  const tourPath = `${contentPaths.toursDir(vehicleSlug)}/${tourId}.json`;

  try {
    const data = readJsonFile<unknown>(tourPath);
    return validateContent<Tour>(
      "tour.schema.json",
      data,
      `tour:${vehicleSlug}:${tourId}`,
    );
  } catch {
    notFound();
  }
});

export function getTourIds(vehicleSlug: string): string[] {
  return getTours(vehicleSlug).map((t) => t.id);
}

export function getTourForJourney(
  vehicleSlug: string,
  journey: JourneyPersonaSlug,
): Tour | null {
  const tourId = JOURNEY_TOUR_MAP[journey];
  if (!tourExists(vehicleSlug, tourId)) {
    return null;
  }
  return getTour(vehicleSlug, tourId);
}
