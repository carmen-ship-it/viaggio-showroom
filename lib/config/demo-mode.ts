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
  /** Hotspots off on scripted executive path — single TouchNav CTA */
  enableHeroHotspotsInDemo: false,
  /** S14: nombre + teléfono + día only */
  kioskShortForm: true,
  /** S13: single primary advisor CTA; test drive via TouchNav */
  conversionFocusMode: true,
  /** S26: cuota + plazo only — hide TCO, tips, partner placeholders */
  financingCompact: true,
  /** S26: lock to 36 months in kiosk demo */
  financingSinglePlazo: 36,
  /** S26: hide trim toggles — default trim only */
  financingLockTrim: true,
  /** S12: pin scorecard + verdict in top viewport */
  compareCompactLayout: true,
  /** Prefer single-viewport layouts on 1920×1080 demo path */
  kioskViewportStrict: true,
  /** S25: static top-2 FAQ cards — no accordion */
  faqCompactLayout: true,
  /** S08: hero + narration + 2×2 grid above fold */
  topicCompactLayout: true,
  /** S11: hide category preview chips */
  hideCompareCategoryPreview: true,
  /** S06: max steps on trust tour for kiosk attention budget */
  maxTrustTourSteps: 3,
  /** S06: hide TopicRenderer sub-panel */
  tourCompactLayout: true,
  /** S15: QR + button + completion banner only */
  whatsappCompactLayout: true,
  /** S13: one dominant advisor card */
  conversionSinglePrimary: true,
  /** Host narration: zero delay on screen enter */
  hostNarrationImmediate: true,
  /** Host narration playback rate (~25% faster) */
  hostNarrationPlaybackRate: 1.25,
  /** Top progress strip on executive path */
  showDemoPathProgress: true,
  /** Persistent Inicio control */
  showKioskHome: true,
  /** Hide mute — staff uses idle reset */
  hideMuteInDemo: true,
  /** Pre-fill test drive form for executive rehearsal */
  demoPrefillCustomerName: "Roberto Mendoza",
  demoPrefillCustomerPhone: "+591 712 345 678",
  /** Hide the Ajustes control — kiosk operators use staff reset instead */
  hideSettings: true,
  defaultVehicleSlug: "gs4-max",
} as const;

/** Executive kiosk path (no S24) — matches Phase 2B audit */
export const executiveDemoPathRoutes = [
  "/",
  "/vehicles",
  "/vehicles/gs4-max/hero",
  "/vehicles/gs4-max/trust/faq",
  "/vehicles/gs4-max/tour/trust",
  "/vehicles/gs4-max/themes/safety/adas",
  "/vehicles/gs4-max/compare",
  "/vehicles/gs4-max/compare/corolla-cross",
  "/vehicles/gs4-max/economics/financing",
  "/vehicles/gs4-max/convert",
  "/vehicles/gs4-max/test-drive",
  "/vehicles/gs4-max/whatsapp",
] as const;

/** Legacy demo path (includes S24) — middleware / docs reference */
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

export function shouldUseConversionSinglePrimary(): boolean {
  return demoModeConfig.enabled && demoModeConfig.conversionSinglePrimary;
}

export function shouldUseFinancingCompact(): boolean {
  return demoModeConfig.enabled && demoModeConfig.financingCompact;
}

export function shouldUseFinancingLockTrim(): boolean {
  return demoModeConfig.enabled && demoModeConfig.financingLockTrim;
}

export function shouldUseFinancingSinglePlazo(): number | null {
  return demoModeConfig.enabled ? demoModeConfig.financingSinglePlazo : null;
}

export function shouldUseCompareCompactLayout(): boolean {
  return demoModeConfig.enabled && demoModeConfig.compareCompactLayout;
}

export function shouldUseKioskViewportStrict(): boolean {
  return demoModeConfig.enabled && demoModeConfig.kioskViewportStrict;
}

export function shouldUseFaqCompactLayout(): boolean {
  return demoModeConfig.enabled && demoModeConfig.faqCompactLayout;
}

export function shouldUseTopicCompactLayout(): boolean {
  return demoModeConfig.enabled && demoModeConfig.topicCompactLayout;
}

export function shouldHideCompareCategoryPreview(): boolean {
  return demoModeConfig.enabled && demoModeConfig.hideCompareCategoryPreview;
}

export function shouldUseTourCompactLayout(): boolean {
  return demoModeConfig.enabled && demoModeConfig.tourCompactLayout;
}

export function getMaxTrustTourSteps(): number | null {
  return demoModeConfig.enabled ? demoModeConfig.maxTrustTourSteps : null;
}

export function shouldUseWhatsappCompactLayout(): boolean {
  return demoModeConfig.enabled && demoModeConfig.whatsappCompactLayout;
}

export function shouldShowDemoPathProgress(): boolean {
  return demoModeConfig.enabled && demoModeConfig.showDemoPathProgress;
}

export function shouldShowKioskHome(): boolean {
  return demoModeConfig.enabled && demoModeConfig.showKioskHome;
}

export function shouldHideMuteInDemo(): boolean {
  return demoModeConfig.enabled && demoModeConfig.hideMuteInDemo;
}

export function getHostNarrationPlaybackRate(): number {
  return demoModeConfig.enabled ? demoModeConfig.hostNarrationPlaybackRate : 1;
}

/** Effective delay — immediate start in kiosk demo */
export function getHostNarrationDelayMs(configuredDelayMs: number): number {
  if (demoModeConfig.enabled && demoModeConfig.hostNarrationImmediate) {
    return 0;
  }
  return configuredDelayMs;
}

export function shouldUseExecutiveDemoPath(): boolean {
  return demoModeConfig.enabled;
}

/** Tailwind classes for strict 1080p kiosk viewport shells */
export function kioskViewportShellClass(): string {
  return shouldUseKioskViewportStrict()
    ? "flex h-[100dvh] max-h-[1080px] flex-col overflow-hidden"
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

export function getExecutiveDemoPathIndex(pathname: string): number {
  const normalized = pathname.split("?")[0]?.replace(/\/$/, "") || "/";
  const path = normalized === "" ? "/" : normalized;
  return executiveDemoPathRoutes.findIndex((route) => route === path);
}

export function getExecutiveDemoPathProgress(pathname: string): {
  step: number;
  total: number;
  label: string;
} | null {
  const index = getExecutiveDemoPathIndex(pathname);
  if (index < 0) return null;
  const labels = [
    "Bienvenida",
    "Modelos",
    "Hero",
    "Confianza",
    "Tour",
    "ADAS",
    "Comparar",
    "Detalle",
    "Cuota",
    "Convertir",
    "Prueba",
    "WhatsApp",
  ];
  return {
    step: index + 1,
    total: executiveDemoPathRoutes.length,
    label: labels[index] ?? "Recorrido",
  };
}

export const demoPrimaryCtaClass = "demo-primary-cta-highlight";
