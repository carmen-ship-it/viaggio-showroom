import {
  getDealership,
  getPersona,
  getVehicle,
} from "@/lib/content";
import {
  getVehicleTrustStory,
  trustStoryExists,
} from "@/lib/content/trust";
import { generateVehicleStaticParams } from "@/lib/content/static-params";
import { CinematicShell } from "@/components/cinematic";
import { TrustStoryScreen } from "@/components/screens/TrustStoryScreen";
import { routes } from "@/lib/navigation";

interface TrustStoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const vehicles = await generateVehicleStaticParams();
  return vehicles.filter((v) => trustStoryExists(v.slug));
}

export default async function TrustStoryPage({ params }: TrustStoryPageProps) {
  const { slug } = await params;
  const story = getVehicleTrustStory(slug);
  const persona = getPersona("carlos");
  const dealership = getDealership();
  getVehicle(slug);

  return (
    <CinematicShell screenId="S24" hideChrome>
      <TrustStoryScreen
        story={story}
        persona={persona}
        dealership={dealership}
        tourHref={routes.tour(slug, "trust")}
        backHref={routes.faq(slug)}
      />
    </CinematicShell>
  );
}
