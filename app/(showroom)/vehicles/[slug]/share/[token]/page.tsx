import { getActiveVehicleSlugs, getDealership, getShareSummary, getVehicle } from "@/lib/content";
import { CinematicShell } from "@/components/cinematic";
import { FamilyShareScreen } from "@/components/screens/FamilyShareScreen";

interface ShareTokenPageProps {
  params: Promise<{ slug: string; token: string }>;
}

export async function generateStaticParams() {
  const slugs = getActiveVehicleSlugs();
  return slugs.map((slug) => ({
    slug,
    token: "preview",
  }));
}

export default async function ShareTokenPage({ params }: ShareTokenPageProps) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  const dealership = getDealership();
  const summary = getShareSummary(slug);

  return (
    <CinematicShell screenId="S33-mobile" hideChrome>
      <FamilyShareScreen
        summary={summary}
        vehicle={vehicle}
        dealership={dealership}
        backHref={`/vehicles/${slug}/share`}
        compact
      />
    </CinematicShell>
  );
}
