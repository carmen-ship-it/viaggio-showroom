import { getActiveVehicleSlugs, getTestDriveLogistics, getVehicle } from "@/lib/content";
import { routes } from "@/lib/navigation";
import { TestDriveLogisticsScreen } from "@/components/screens/TestDriveLogisticsScreen";
import { VehiclePageShell } from "@/components/layout";

interface TestDriveInfoPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getActiveVehicleSlugs().map((slug) => ({ slug }));
}

export default async function TestDriveInfoPage({ params }: TestDriveInfoPageProps) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  const logistics = getTestDriveLogistics();

  return (
    <VehiclePageShell
      slug={slug}
      screenId="S34"
      currentPath={routes.testDriveInfo(slug)}
    >
      <TestDriveLogisticsScreen
        logistics={logistics}
        vehicle={vehicle}
        backHref={routes.convert(slug)}
      />
    </VehiclePageShell>
  );
}
