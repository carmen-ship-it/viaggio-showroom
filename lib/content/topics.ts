import { cache } from "react";
import { notFound } from "next/navigation";
import type { Topic } from "@/types/content";
import { contentPaths } from "./paths";
import { readJsonFile, readJsonFilesFromDir } from "./loader";
import { topicExists, themeExists } from "./availability";
import { validateContent } from "./validator";
import { getTheme } from "./themes";
import { vehicleExists } from "./vehicle";

export const getTopics = cache((vehicleSlug: string): Topic[] => {
  if (!vehicleExists(vehicleSlug)) {
    notFound();
  }

  return readJsonFilesFromDir<unknown>(contentPaths.topicsDir(vehicleSlug)).map(
    (data, index) =>
      validateContent<Topic>(
        "topic.schema.json",
        data,
        `topic:${vehicleSlug}:${index}`,
      ),
  );
});

export const getTopic = cache(
  (vehicleSlug: string, themeId: string, topicId: string): Topic => {
    getTheme(vehicleSlug, themeId);

    const topicPath = `${contentPaths.topicsDir(vehicleSlug)}/${topicId}.json`;

    try {
      const data = readJsonFile<unknown>(topicPath);
      const topic = validateContent<Topic>(
        "topic.schema.json",
        data,
        `topic:${vehicleSlug}:${topicId}`,
      );

      if (topic.themeId !== themeId) {
        notFound();
      }

      return topic;
    } catch {
      notFound();
    }
  },
);

export function getTopicsForTheme(
  vehicleSlug: string,
  themeId: string,
): Topic[] {
  const theme = getTheme(vehicleSlug, themeId);
  const topicIds = theme.topicIds ?? [];

  if (topicIds.length === 0) {
    return getTopics(vehicleSlug).filter((t) => t.themeId === themeId);
  }

  return topicIds
    .map((id) => {
      try {
        const data = readJsonFile<unknown>(
          `${contentPaths.topicsDir(vehicleSlug)}/${id}.json`,
        );
        return validateContent<Topic>(
          "topic.schema.json",
          data,
          `topic:${vehicleSlug}:${id}`,
        );
      } catch {
        return null;
      }
    })
    .filter((t): t is Topic => t !== null);
}

export function getTopicIdsForTheme(
  vehicleSlug: string,
  themeId: string,
): string[] {
  return getTopicsForTheme(vehicleSlug, themeId).map((t) => t.id);
}

export function getTopicById(vehicleSlug: string, topicId: string): Topic | null {
  const topics = getTopics(vehicleSlug);
  return topics.find((t) => t.id === topicId) ?? null;
}

export function tryGetTopic(
  vehicleSlug: string,
  themeId: string,
  topicId: string,
): Topic | null {
  if (!themeExists(vehicleSlug, themeId) || !topicExists(vehicleSlug, topicId)) {
    return null;
  }

  try {
    return getTopic(vehicleSlug, themeId, topicId);
  } catch {
    return null;
  }
}
