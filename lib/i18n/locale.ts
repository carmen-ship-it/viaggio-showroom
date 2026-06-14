export const DEFAULT_LOCALE = "es-BO" as const;

export type SupportedLocale = typeof DEFAULT_LOCALE;

/** Reserved for Phase 2.1 — UI string loading from public/locales */
export function getDefaultLocale(): SupportedLocale {
  return DEFAULT_LOCALE;
}
