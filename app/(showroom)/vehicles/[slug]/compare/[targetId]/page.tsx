import { notFound } from "next/navigation";
import {
  compareExists,
  compareTargetExists,
  getCompareTarget,
  getCompareTargetIds,
  getActiveVehicleSlugs,
  getPersonas,
  getVehicle,
  summarizeCompareVerdicts,
} from "@/lib/content";
import { routes } from "@/lib/navigation";
import { CinematicShell } from "@/components/cinematic";
import { CompareDetailScreen } from "@/components/screens/CompareDetailScreen";

interface CompareDetailPageProps {
  params: Promise<{ slug: string; targetId: string }>;
}

export function generateStaticParams() {
  const params: { slug: string; targetId: string }[] = [];
  for (const slug of getActiveVehicleSlugs()) {
    if (!compareExists(slug)) continue;
    for (const targetId of getCompareTargetIds(slug)) {
      params.push({ slug, targetId });
    }
  }
  return params;
}

export default async function CompareDetailPage({ params }: CompareDetailPageProps) {
  const { slug, targetId } = await params;
  if (!compareTargetExists(slug, targetId)) notFound();

  const vehicle = getVehicle(slug);
  const target = getCompareTarget(slug, targetId);
  const summary = summarizeCompareVerdicts(target);
  const personas = Object.fromEntries(
    getPersonas().map((persona) => [persona.id, persona]),
  );

  return (
    <CinematicShell screenId="S12" hideChrome>
      <CompareDetailScreen
        vehicle={vehicle}
        target={target}
        summary={summary}
        personas={personas}
        backHref={routes.compare(slug)}
      />
    </CinematicShell>
  );
}
