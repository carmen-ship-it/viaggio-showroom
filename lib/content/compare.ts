import fs from "fs";
import path from "path";
import { cache } from "react";
import { notFound } from "next/navigation";
import { contentPaths } from "./paths";
import { fileExists, readJsonFile } from "./loader";
import { validateContent } from "./validator";
import { vehicleExists } from "./vehicle";

export type CompareVerdict = "anchor_wins" | "target_wins" | "tie";

export interface CompareRow {
  label: string;
  anchorValue: string;
  targetValue: string;
  verdict: CompareVerdict;
  personaId?: "carlos" | "sofia" | "diego";
  explanation?: string;
}

export interface CompareDimension {
  category: string;
  rows: CompareRow[];
}

export interface CompareTarget {
  id: string;
  vehicleSlug: string;
  targetType: "competitor" | "gac_model";
  targetSlug?: string;
  displayName: string;
  thumbnailMediaId?: string;
  contentVersion?: string;
  lastVerified?: string;
  dimensions: CompareDimension[];
  /** Route segment derived from compare JSON filename */
  routeSlug: string;
}

export interface CompareHubTarget {
  slug: string;
  displayName: string;
  thumbnailMediaId: string;
  available: boolean;
  comingSoonLabel?: string;
}

export interface CompareHub {
  vehicleSlug: string;
  title: string;
  subtitle: string;
  introLine: string;
  anchorMediaId: string;
  defaultTargetSlug: string;
  categories: string[];
  targets: CompareHubTarget[];
}

export interface CompareVerdictSummary {
  anchorWins: number;
  targetWins: number;
  ties: number;
}

const HUB_FILENAME = "hub.json";

function compareDir(vehicleSlug: string): string {
  return path.join(contentPaths.vehicleDir(vehicleSlug), "compare");
}

function compareFilePath(vehicleSlug: string, routeSlug: string): string {
  return path.join(compareDir(vehicleSlug), `${routeSlug}.json`);
}

function isCompareTargetFile(filename: string): boolean {
  return filename.endsWith(".json") && filename !== HUB_FILENAME;
}

export function compareExists(vehicleSlug: string): boolean {
  if (!vehicleExists(vehicleSlug)) return false;
  const dir = compareDir(vehicleSlug);
  if (!fs.existsSync(dir)) return false;
  return fs.readdirSync(dir).some(isCompareTargetFile);
}

export function compareHubExists(vehicleSlug: string): boolean {
  return fileExists(path.join(compareDir(vehicleSlug), HUB_FILENAME));
}

export function compareTargetExists(
  vehicleSlug: string,
  routeSlug: string,
): boolean {
  return fileExists(compareFilePath(vehicleSlug, routeSlug));
}

export const getCompareTargetIds = cache((vehicleSlug: string): string[] => {
  if (!vehicleExists(vehicleSlug)) return [];
  const dir = compareDir(vehicleSlug);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter(isCompareTargetFile)
    .map((file) => file.replace(/\.json$/, ""));
});

export const getCompareHub = cache((vehicleSlug: string): CompareHub => {
  if (!vehicleExists(vehicleSlug)) notFound();
  const filePath = path.join(compareDir(vehicleSlug), HUB_FILENAME);
  if (!fileExists(filePath)) notFound();
  return readJsonFile<CompareHub>(filePath);
});

export const getCompareTarget = cache(
  (vehicleSlug: string, routeSlug: string): CompareTarget => {
    if (!vehicleExists(vehicleSlug)) notFound();
    const filePath = compareFilePath(vehicleSlug, routeSlug);
    if (!fileExists(filePath)) notFound();
    const data = readJsonFile<unknown>(filePath);
    const validated = validateContent<Omit<CompareTarget, "routeSlug">>(
      "compare-target.schema.json",
      data,
      `compare:${vehicleSlug}:${routeSlug}`,
    );
    return { ...validated, routeSlug };
  },
);

export const getCompareTargets = cache((vehicleSlug: string): CompareTarget[] => {
  return getCompareTargetIds(vehicleSlug).map((routeSlug) =>
    getCompareTarget(vehicleSlug, routeSlug),
  );
});

export function summarizeCompareVerdicts(
  target: CompareTarget,
): CompareVerdictSummary {
  const summary: CompareVerdictSummary = {
    anchorWins: 0,
    targetWins: 0,
    ties: 0,
  };

  for (const dimension of target.dimensions) {
    for (const row of dimension.rows) {
      if (row.verdict === "anchor_wins") summary.anchorWins += 1;
      else if (row.verdict === "target_wins") summary.targetWins += 1;
      else summary.ties += 1;
    }
  }

  return summary;
}

/** @deprecated Use getCompareTargetIds */
export const getCompareTargetSlugs = getCompareTargetIds;
