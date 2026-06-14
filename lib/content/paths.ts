import path from "path";

export const CONTENT_ROOT = path.join(process.cwd(), "content");
export const SCHEMA_ROOT = path.join(process.cwd(), "docs", "schemas");

export const contentPaths = {
  registry: () => path.join(CONTENT_ROOT, "vehicles", "registry.json"),
  vehicle: (slug: string) =>
    path.join(CONTENT_ROOT, "vehicles", slug, "vehicle.json"),
  vehicleDir: (slug: string) => path.join(CONTENT_ROOT, "vehicles", slug),
  themesDir: (slug: string) =>
    path.join(CONTENT_ROOT, "vehicles", slug, "themes"),
  topicsDir: (slug: string) =>
    path.join(CONTENT_ROOT, "vehicles", slug, "topics"),
  toursDir: (slug: string) =>
    path.join(CONTENT_ROOT, "vehicles", slug, "tours"),
  mediaManifest: (slug: string) =>
    path.join(CONTENT_ROOT, "vehicles", slug, "media-manifest.json"),
  personas: () => path.join(CONTENT_ROOT, "personas", "personas.json"),
  dealership: () => path.join(CONTENT_ROOT, "shared", "dealership.json"),
  sharedDir: () => path.join(CONTENT_ROOT, "shared"),
} as const;
