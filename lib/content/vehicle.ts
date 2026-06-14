import { cache } from "react";
import { notFound } from "next/navigation";
import type { Vehicle } from "@/types/vehicle";
import { contentPaths } from "./paths";
import { fileExists, readJsonFile } from "./loader";
import { validateContent } from "./validator";
import { getVehicleRegistry } from "./registry";

export const getVehicle = cache((slug: string): Vehicle => {
  const registry = getVehicleRegistry();
  const entry = registry.vehicles.find((v) => v.slug === slug);

  if (!entry) {
    notFound();
  }

  const vehiclePath = contentPaths.vehicle(slug);
  if (!fileExists(vehiclePath)) {
    notFound();
  }

  const data = readJsonFile<unknown>(vehiclePath);
  return validateContent<Vehicle>("vehicle.schema.json", data, `vehicle:${slug}`);
});

export function vehicleExists(slug: string): boolean {
  return getVehicleRegistry().vehicles.some((v) => v.slug === slug);
}
