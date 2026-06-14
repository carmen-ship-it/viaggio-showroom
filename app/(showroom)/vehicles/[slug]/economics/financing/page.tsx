import { getActiveVehicleSlugs, getFinancing, getVehicle, getCompareHub, compareHubExists } from "@/lib/content";
import { routes } from "@/lib/navigation";
import { FinancingPreviewScreen } from "@/components/screens/FinancingPreviewScreen";
import { VehiclePageShell } from "@/components/layout";

interface FinancingPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getActiveVehicleSlugs().map((slug) => ({ slug }));
}

export default async function FinancingPage({ params }: FinancingPageProps) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  const financing = getFinancing(slug);
  const backHref = compareHubExists(slug)
    ? routes.compareDetail(slug, getCompareHub(slug).defaultTargetSlug)
    : routes.compare(slug);

  return (
    <VehiclePageShell
      slug={slug}
      screenId="S26"
      currentPath={routes.financing(slug)}
    >
      <FinancingPreviewScreen
        financing={financing}
        vehicle={vehicle}
        backHref={backHref}
      />
    </VehiclePageShell>
  );
}
