import { getDealership, getVehicle, getVehicleRegistry } from "@/lib/content";
import { CinematicShell } from "@/components/cinematic";
import { ShowroomMediaBoundary } from "@/components/media/ShowroomMediaBoundary";
import { VehicleSelector } from "@/components/screens/VehicleSelector";

export default function VehiclesPage() {
  const registry = getVehicleRegistry();
  const dealership = getDealership();
  const heroVehicle = getVehicle(registry.defaultVehicleSlug);

  return (
    <ShowroomMediaBoundary vehicleSlug={registry.defaultVehicleSlug}>
      <CinematicShell screenId="S03" hideChrome>
        <VehicleSelector
          vehicles={registry.vehicles}
          defaultSlug={registry.defaultVehicleSlug}
          brand={dealership.brand}
          dealershipName={dealership.name}
          heroStats={heroVehicle.keyStats}
        />
      </CinematicShell>
    </ShowroomMediaBoundary>
  );
}
