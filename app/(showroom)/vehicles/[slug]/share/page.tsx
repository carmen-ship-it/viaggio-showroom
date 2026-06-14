import { getActiveVehicleSlugs, getDealership, getShareSummary, getVehicle } from "@/lib/content";
import { routes } from "@/lib/navigation";
import { FamilyShareScreen } from "@/components/screens/FamilyShareScreen";
import { VehiclePageShell } from "@/components/layout";

interface SharePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getActiveVehicleSlugs().map((slug) => ({ slug }));
}

export default async function SharePage({ params }: SharePageProps) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  const dealership = getDealership();
  const summary = getShareSummary(slug);

  return (
    <VehiclePageShell
      slug={slug}
      screenId="S33"
      currentPath={routes.share(slug)}
    >
      <FamilyShareScreen
        summary={summary}
        vehicle={vehicle}
        dealership={dealership}
        backHref={routes.convert(slug)}
      />
    </VehiclePageShell>
  );
}
