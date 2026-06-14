import { getDealership, getTestDriveForm, getVehicle } from "@/lib/content";
import { generateVehicleStaticParams } from "@/lib/content/static-params";
import { routes } from "@/lib/navigation";
import { ConversionHubScreen } from "@/components/screens/ConversionHubScreen";
import { VehiclePageShell } from "@/components/layout";

interface ConvertPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return generateVehicleStaticParams();
}

export default async function ConvertPage({ params }: ConvertPageProps) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  const dealership = getDealership();
  const formContent = getTestDriveForm();

  return (
    <VehiclePageShell
      slug={slug}
      screenId="S13"
      currentPath={routes.convert(slug)}
    >
      <ConversionHubScreen
        vehicle={vehicle}
        dealership={dealership}
        formContent={formContent}
        backHref={routes.financing(slug)}
      />
    </VehiclePageShell>
  );
}
