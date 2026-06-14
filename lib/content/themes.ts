import { cache } from "react";
import { notFound } from "next/navigation";
import type { Theme } from "@/types/content";
import { contentPaths } from "./paths";
import { readJsonFile, readJsonFilesFromDir } from "./loader";
import { validateContent } from "./validator";
import { vehicleExists } from "./vehicle";

export const getThemes = cache((vehicleSlug: string): Theme[] => {
  if (!vehicleExists(vehicleSlug)) {
    notFound();
  }

  const themes = readJsonFilesFromDir<unknown>(contentPaths.themesDir(vehicleSlug))
    .map((data, index) =>
      validateContent<Theme>(
        "theme.schema.json",
        data,
        `theme:${vehicleSlug}:${index}`,
      ),
    )
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return themes;
});

export const getTheme = cache(
  (vehicleSlug: string, themeId: string): Theme => {
    const themePath = `${contentPaths.themesDir(vehicleSlug)}/${themeId}.json`;

    try {
      const data = readJsonFile<unknown>(themePath);
      return validateContent<Theme>(
        "theme.schema.json",
        data,
        `theme:${vehicleSlug}:${themeId}`,
      );
    } catch {
      notFound();
    }
  },
);

export function getThemeIds(vehicleSlug: string): string[] {
  return getThemes(vehicleSlug).map((t) => t.id);
}
