import type { ReactNode } from "react";
import { getVehicle } from "@/lib/content";
import { buildVehicleNav } from "@/lib/navigation";
import { ShowroomShell } from "./ShowroomShell";

interface VehiclePageShellProps {
  slug: string;
  screenId?: string;
  currentPath?: string;
  children: ReactNode;
}

export function VehiclePageShell({
  slug,
  screenId,
  currentPath,
  children,
}: VehiclePageShellProps) {
  const vehicle = getVehicle(slug);
  const navSections = buildVehicleNav(slug);

  return (
    <ShowroomShell
      navSections={navSections}
      currentPath={currentPath}
      vehicleName={vehicle.modelName}
      screenId={screenId}
    >
      {children}
    </ShowroomShell>
  );
}
