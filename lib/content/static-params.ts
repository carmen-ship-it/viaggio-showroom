import { getAllVehicleSlugs } from "@/lib/content";

export async function generateVehicleStaticParams() {
  return getAllVehicleSlugs().map((slug) => ({ slug }));
}
