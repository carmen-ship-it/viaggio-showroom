import { contentPaths } from "./paths";
import { fileExists } from "./loader";

export function tourExists(vehicleSlug: string, tourId: string): boolean {
  return fileExists(`${contentPaths.toursDir(vehicleSlug)}/${tourId}.json`);
}

export function topicExists(
  vehicleSlug: string,
  topicId: string,
): boolean {
  return fileExists(`${contentPaths.topicsDir(vehicleSlug)}/${topicId}.json`);
}

export function themeExists(vehicleSlug: string, themeId: string): boolean {
  return fileExists(`${contentPaths.themesDir(vehicleSlug)}/${themeId}.json`);
}

export function vehicleHasExperiencePack(vehicleSlug: string): boolean {
  return (
    fileExists(contentPaths.themesDir(vehicleSlug)) &&
    fileExists(contentPaths.toursDir(vehicleSlug))
  );
}
