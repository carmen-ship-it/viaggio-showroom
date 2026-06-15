"use client";

import { usePathname } from "next/navigation";
import { DemoPathProgress } from "./DemoPathProgress";
import { KioskHomeButton } from "./KioskHomeButton";
import { shouldShowKioskHome } from "@/lib/config/demo-mode";

const HEADER_HOME_ROUTES = ["/vehicles", "/vehicles/gs4-max/hero"];

export function KioskNavChrome() {
  const pathname = usePathname() ?? "/";
  const normalized = pathname.split("?")[0]?.replace(/\/$/, "") || "/";

  if (!shouldShowKioskHome()) return null;
  if (normalized === "/") return <DemoPathProgress />;

  const showFloatingHome = !HEADER_HOME_ROUTES.some(
    (route) => normalized === route || normalized.startsWith(`${route}/`),
  );

  return (
    <>
      <DemoPathProgress />
      {showFloatingHome ? <KioskHomeButton /> : null}
    </>
  );
}
