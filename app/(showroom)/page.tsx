import {
  getDealership,
  getDefaultVehicleSlug,
  getPersonas,
  getVehicle,
} from "@/lib/content";
import { ShowroomMediaBoundary } from "@/components/media/ShowroomMediaBoundary";
import { ExperienceEntry } from "@/components/screens/ExperienceEntry";

export default function HomePage() {
  const dealership = getDealership();
  const defaultSlug = getDefaultVehicleSlug();
  const vehicle = getVehicle(defaultSlug);
  const personas = getPersonas();

  return (
    <ShowroomMediaBoundary vehicleSlug={defaultSlug}>
      <ExperienceEntry
        attractMediaId="gs4-max-hero-01"
        tagline="Conocé el GAC GS4 MAX a tu ritmo"
        brand={dealership.brand}
        dealershipName={dealership.name}
        vehicle={vehicle}
        personas={personas}
        defaultVehicleSlug={defaultSlug}
      />
    </ShowroomMediaBoundary>
  );
}
