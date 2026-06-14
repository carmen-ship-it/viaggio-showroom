import fs from "fs";
import path from "path";

export function readJsonFile<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

export function readJsonFilesFromDir<T>(dirPath: string): T[] {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  return fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) => readJsonFile<T>(path.join(dirPath, file)));
}

export function fileExists(filePath: string): boolean {
  return fs.existsSync(filePath);
}
