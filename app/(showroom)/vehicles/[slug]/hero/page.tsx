import { getDealership, getVehicle } from "@/lib/content";
import { getHeroHotspots } from "@/lib/content/hero";
import { generateVehicleStaticParams } from "@/lib/content/static-params";
import { CinematicShell } from "@/components/cinematic";
import { VehicleHero } from "@/components/screens/VehicleHero";

interface HeroPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return generateVehicleStaticParams();
}

export default async function VehicleHeroPage({ params }: HeroPageProps) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  const dealership = getDealership();
  const hotspots = getHeroHotspots(vehicle.metadata);

  return (
    <CinematicShell screenId="S22" hideChrome>
      <VehicleHero
        vehicle={vehicle}
        hotspots={hotspots}
        brand={dealership.brand}
        dealershipName={dealership.name}
      />
    </CinematicShell>
  );
}
