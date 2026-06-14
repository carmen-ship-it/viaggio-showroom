export const themeTokens = {
  colors: {
    background: "var(--color-background)",
    foreground: "var(--color-foreground)",
    surface: "var(--color-surface)",
    surfaceMuted: "var(--color-surface-muted)",
    border: "var(--color-border)",
    accent: "var(--color-accent)",
    accentMuted: "var(--color-accent-muted)",
    viaggio: "var(--color-viaggio)",
    gac: "var(--color-gac)",
    persona: {
      carlos: "var(--color-persona-carlos)",
      sofia: "var(--color-persona-sofia)",
      diego: "var(--color-persona-diego)",
    },
  },
  spacing: {
    kioskPadding: "var(--spacing-kiosk)",
    sectionGap: "var(--spacing-section)",
  },
  typography: {
    display: "var(--font-display)",
    body: "var(--font-body)",
  },
  motion: {
    durationFast: 150,
    durationNormal: 300,
    durationSlow: 500,
  },
} as const;

export type ThemeToken = typeof themeTokens;
