/**
 * Stakeholder kiosk demo configuration.
 * Enable with NEXT_PUBLIC_DEMO_MODE=true
 */
export const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

export const demoModeConfig = {
  enabled: isDemoMode,
  /** Hide S## badges, ShowroomNav, and inline screen IDs */
  hideDeveloperTools: true,
  /** Redirect unfinished / operator routes via middleware */
  hideUnfinishedRoutes: true,
  /** Omit coming-soon vehicle cards on S03 and compare targets on S11 */
  hideComingSoonVehicles: true,
  /** Strip "Próximamente" copy and resume/share stubs */
  hidePlaceholderWarnings: true,
  /** Lock S02 to Primera vez con GAC */
  forceVisitorPath: "first_time" as const,
  /** Pulse ring on scripted next actions (TouchNav + primary cards) */
  highlightPrimaryCta: true,
  /** Hide hero hotspots, secondary CTAs, and pre-researched path */
  disableExplorationBranches: true,
  /** Show hero hotspots during executive demo (independent of exploration branches) */
  enableHeroHotspotsInDemo: true,
  /** S14: nombre + teléfono + día only */
  kioskShortForm: true,
  /** S13: two dominant conversion cards, compact recap */
  conversionFocusMode: true,
  /** S26: cuota + plazo only — hide TCO, tips, partner placeholders */
  financingCompact: true,
  /** S12: pin scorecard + verdict in top viewport */
  compareCompactLayout: true,
  /** Prefer single-viewport layouts on 1920×1080 demo path */
  kioskViewportStrict: true,
  /** Pre-fill test drive form for executive rehearsal */
  demoPrefillCustomerName: "Roberto Mendoza",
  demoPrefillCustomerPhone: "+591 712 345 678",
  /** Hide the Ajustes control — kiosk operators use staff reset instead */
  hideSettings: true,
  defaultVehicleSlug: "gs4-max",
} as const;

/** Canonical demo path routes (see docs/demo-walkthrough.md) */
export const demoPathRoutes = [
  "/",
  "/vehicles",
  "/vehicles/gs4-max/hero",
  "/vehicles/gs4-max/trust/faq",
  "/vehicles/gs4-max/trust/story",
  "/vehicles/gs4-max/tour/trust",
  "/vehicles/gs4-max/themes/safety/adas",
  "/vehicles/gs4-max/compare",
  "/vehicles/gs4-max/compare/corolla-cross",
  "/vehicles/gs4-max/economics/financing",
  "/vehicles/gs4-max/convert",
  "/vehicles/gs4-max/test-drive",
  "/vehicles/gs4-max/whatsapp",
] as const;

export function shouldHideDeveloperTools(): boolean {
  return demoModeConfig.enabled && demoModeConfig.hideDeveloperTools;
}

export function shouldHideComingSoonVehicles(): boolean {
  return demoModeConfig.enabled && demoModeConfig.hideComingSoonVehicles;
}

export function shouldHidePlaceholderWarnings(): boolean {
  return demoModeConfig.enabled && demoModeConfig.hidePlaceholderWarnings;
}

export function shouldDisableExplorationBranches(): boolean {
  return demoModeConfig.enabled && demoModeConfig.disableExplorationBranches;
}

export function shouldHighlightPrimaryCta(): boolean {
  return demoModeConfig.enabled && demoModeConfig.highlightPrimaryCta;
}

export function shouldHideSettings(): boolean {
  return demoModeConfig.enabled && demoModeConfig.hideSettings;
}

export function shouldEnableHeroHotspotsInDemo(): boolean {
  return demoModeConfig.enabled && demoModeConfig.enableHeroHotspotsInDemo;
}

export function shouldUseKioskShortForm(): boolean {
  return demoModeConfig.enabled && demoModeConfig.kioskShortForm;
}

export function shouldUseConversionFocusMode(): boolean {
  return demoModeConfig.enabled && demoModeConfig.conversionFocusMode;
}

export function shouldUseFinancingCompact(): boolean {
  return demoModeConfig.enabled && demoModeConfig.financingCompact;
}

export function shouldUseCompareCompactLayout(): boolean {
  return demoModeConfig.enabled && demoModeConfig.compareCompactLayout;
}

export function shouldUseKioskViewportStrict(): boolean {
  return demoModeConfig.enabled && demoModeConfig.kioskViewportStrict;
}

/** Tailwind classes for strict 1080p kiosk viewport shells */
export function kioskViewportShellClass(): string {
  return shouldUseKioskViewportStrict()
    ? "h-[100dvh] max-h-[1080px] overflow-hidden"
    : "min-h-screen";
}

/** Strip leading "S## · " from eyebrow labels in demo mode */
export function formatScreenLabel(label: string): string {
  if (!shouldHideDeveloperTools()) return label;
  return label.replace(/^S\d+\s*·\s*/, "").trim();
}

/** Hide bare screen IDs like "S19" */
export function formatScreenId(screenId: string): string | null {
  if (!shouldHideDeveloperTools()) return screenId;
  return null;
}

export const demoPrimaryCtaClass = "demo-primary-cta-highlight";
