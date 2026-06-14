import { getVehicle } from "@/lib/content";
import { generateVehicleStaticParams } from "@/lib/content/static-params";
import { routes } from "@/lib/navigation";
import { ResumePlaceholder } from "@/components/screens/ResumePlaceholder";
import { VehiclePageShell } from "@/components/layout";

interface ResumePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return generateVehicleStaticParams();
}

export default async function ResumePage({ params }: ResumePageProps) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);

  return (
    <VehiclePageShell
      slug={slug}
      screenId="S37"
      currentPath={routes.resume(slug)}
    >
      <ResumePlaceholder slug={slug} vehicleName={vehicle.modelName} />
    </VehiclePageShell>
  );
}
