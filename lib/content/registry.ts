import { cache } from "react";
import type { VehicleRegistry } from "@/types/vehicle";
import { contentPaths } from "./paths";
import { readJsonFile } from "./loader";
import { validateContent } from "./validator";

export const getVehicleRegistry = cache((): VehicleRegistry => {
  const data = readJsonFile<unknown>(contentPaths.registry());
  return validateContent<VehicleRegistry>(
    "vehicle-registry.schema.json",
    data,
    "vehicle registry",
  );
});

export function getActiveVehicleSlugs(): string[] {
  return getVehicleRegistry()
    .vehicles.filter((v) => v.status !== "coming_soon")
    .map((v) => v.slug);
}

export function getAllVehicleSlugs(): string[] {
  return getVehicleRegistry().vehicles.map((v) => v.slug);
}

export function getDefaultVehicleSlug(): string {
  return getVehicleRegistry().defaultVehicleSlug;
}
