import { notFound } from "next/navigation";
import {
  compareExists,
  compareHubExists,
  getCompareHub,
  getCompareTargets,
  getVehicle,
} from "@/lib/content";
import { getActiveVehicleSlugs } from "@/lib/content/registry";
import { CinematicShell } from "@/components/cinematic";
import { CompareHubScreen } from "@/components/screens/CompareHubScreen";
import { routes } from "@/lib/navigation";

interface ComparePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getActiveVehicleSlugs()
    .filter((slug) => compareExists(slug))
    .map((slug) => ({ slug }));
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { slug } = await params;
  if (!compareExists(slug)) notFound();

  const vehicle = getVehicle(slug);
  const targets = getCompareTargets(slug);
  const hub = compareHubExists(slug)
    ? getCompareHub(slug)
    : {
        vehicleSlug: slug,
        title: "Comparar con honestidad",
        subtitle: "Elegí un competidor y mirá dónde gana cada uno.",
        introLine: "No es la única opción en el segmento.",
        anchorMediaId: vehicle.heroMediaId ?? "gs4-max-hero-01",
        defaultTargetSlug: targets[0]?.routeSlug ?? "",
        categories: targets[0]?.dimensions.map((d) => d.category) ?? [],
        targets: targets.map((t) => ({
          slug: t.routeSlug,
          displayName: t.displayName,
          thumbnailMediaId: t.thumbnailMediaId ?? "compare-corolla-cross",
          available: true,
        })),
      };

  return (
    <CinematicShell screenId="S11" hideChrome>
      <CompareHubScreen
        hub={hub}
        vehicle={vehicle}
        targets={targets}
        backHref={routes.topic(slug, "safety", "adas")}
      />
    </CinematicShell>
  );
}
