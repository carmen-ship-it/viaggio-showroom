import { Suspense } from "react";
import { getDealership, getTestDriveForm, getVehicle } from "@/lib/content";
import { generateVehicleStaticParams } from "@/lib/content/static-params";
import { routes } from "@/lib/navigation";
import { CinematicShell } from "@/components/cinematic";
import { TestDriveForm } from "@/components/screens/TestDriveForm";

interface TestDrivePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return generateVehicleStaticParams();
}

function TestDriveFormFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--canvas-light)]">
      <p className="text-[var(--text-secondary-on-light)]">Cargando formulario…</p>
    </div>
  );
}

export default async function TestDrivePage({ params }: TestDrivePageProps) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  const dealership = getDealership();
  const formContent = getTestDriveForm();

  return (
    <CinematicShell screenId="S14">
      <Suspense fallback={<TestDriveFormFallback />}>
        <TestDriveForm
          vehicle={vehicle}
          dealership={dealership}
          formContent={formContent}
          backHref={routes.convert(slug)}
        />
      </Suspense>
    </CinematicShell>
  );
}
