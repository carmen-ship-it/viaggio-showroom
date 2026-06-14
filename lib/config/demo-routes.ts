import { demoModeConfig, isDemoMode } from "./demo-mode";

const slug = demoModeConfig.defaultVehicleSlug;

function vehiclePath(suffix: string): string {
  return `/vehicles/${slug}${suffix}`;
}

/** Returns redirect target pathname when demo mode blocks the current route */
export function resolveDemoRedirect(pathname: string): string | null {
  if (!isDemoMode || !demoModeConfig.hideUnfinishedRoutes) return null;

  const exactRedirects: Record<string, string> = {
    [vehiclePath("")]: vehiclePath("/hero"),
    [vehiclePath("/resume")]: vehiclePath("/convert"),
    [vehiclePath("/share")]: vehiclePath("/convert"),
    [vehiclePath("/test-drive/info")]: vehiclePath("/test-drive"),
    [vehiclePath("/gallery")]: vehiclePath("/hero"),
    [vehiclePath("/specs")]: vehiclePath("/hero"),
    [vehiclePath("/trust/warranty")]: vehiclePath("/trust/faq"),
  };

  if (exactRedirects[pathname]) {
    return exactRedirects[pathname];
  }

  if (/^\/vehicles\/[^/]+\/journey\//.test(pathname)) {
    const vehicleSlug = pathname.split("/")[2];
    return `/vehicles/${vehicleSlug}/tour/trust`;
  }

  if (/^\/vehicles\/[^/]+\/experience\//.test(pathname)) {
    const vehicleSlug = pathname.split("/")[2];
    return `/vehicles/${vehicleSlug}/hero`;
  }

  if (/^\/vehicles\/[^/]+\/share\//.test(pathname)) {
    const vehicleSlug = pathname.split("/")[2];
    return `/vehicles/${vehicleSlug}/convert`;
  }

  const themeLandingMatch = pathname.match(/^\/vehicles\/([^/]+)\/themes\/([^/]+)$/);
  if (themeLandingMatch) {
    const [, vehicleSlug, themeId] = themeLandingMatch;
    if (themeId === "safety") {
      return `/vehicles/${vehicleSlug}/themes/safety/adas`;
    }
    return `/vehicles/${vehicleSlug}/hero`;
  }

  const topicMatch = pathname.match(/^\/vehicles\/([^/]+)\/themes\/([^/]+)\/([^/]+)$/);
  if (topicMatch) {
    const [, vehicleSlug, themeId, topicId] = topicMatch;
    if (themeId === "safety" && topicId === "adas") {
      return null;
    }
    return `/vehicles/${vehicleSlug}/themes/safety/adas`;
  }

  return null;
}
