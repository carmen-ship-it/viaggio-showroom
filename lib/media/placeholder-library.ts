/**
 * Premium fallback catalog — legally usable generated treatments for every mediaId.
 * No copyrighted GAC photography; SVG silhouettes and infographics only.
 */

export type FallbackTreatment =
  | "cinematic-hero"
  | "exterior-vehicle"
  | "interior-cockpit"
  | "family-journey"
  | "trust-chapter"
  | "warranty-card"
  | "safety-card"
  | "compare-card"
  | "financing-card"
  | "persona-portrait"
  | "logo-brand"
  | "tour-step"
  | "ambient-video"
  | "route-map"
  | "service-local"
  | "coming-soon";

export type FallbackStrategy =
  | "ken-burns-gradient"
  | "static-silhouette"
  | "infographic-overlay"
  | "split-comparison"
  | "portrait-illustration"
  | "wordmark-svg"
  | "motion-poster"
  | "chapter-scroll";

export interface FallbackSpec {
  mediaId: string;
  treatment: FallbackTreatment;
  strategy: FallbackStrategy;
  caption: string;
  label: string;
  gradient: string;
  accent: string;
  secondaryAccent?: string;
}

const GRADIENTS = {
  hero: "linear-gradient(145deg, #0a0c10 0%, #1a2332 38%, #2a3038 72%, #0b0d10 100%)",
  exterior:
    "linear-gradient(155deg, #0b0d10 0%, #1e2a3a 42%, #3d4a5c 68%, #14171c 100%)",
  interior:
    "linear-gradient(135deg, #0f1419 0%, #1a2535 45%, #2d3540 100%)",
  family:
    "linear-gradient(120deg, #14171c 0%, #2d3a2a 40%, #1a2332 100%)",
  trust:
    "linear-gradient(160deg, #0a0c10 0%, #1a2e3a 50%, #0f1419 100%)",
  warranty:
    "linear-gradient(135deg, #141820 0%, #1e3a5f 55%, #0a0c10 100%)",
  safety:
    "linear-gradient(145deg, #0f1419 0%, #1a3a35 50%, #14171c 100%)",
  compare:
    "linear-gradient(150deg, #14171c 0%, #2a3038 45%, #1a2332 100%)",
  financing:
    "linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 50%, #f0f0f5 100%)",
  persona:
    "linear-gradient(145deg, #1a2332 0%, #2a3545 60%, #14171c 100%)",
  warm: "linear-gradient(155deg, #10141a 0%, #3d2e1f 35%, #0b0d10 100%)",
  video:
    "linear-gradient(160deg, #0f1419 0%, #1e3a5f 50%, #14171c 100%)",
};

const EXPLICIT: Record<string, Omit<FallbackSpec, "mediaId">> = {
  "video-attract-loop": {
    treatment: "ambient-video",
    strategy: "motion-poster",
    caption: "GAC GS4 MAX — experiencia cinematográfica de bienvenida",
    label: "ATTRACT LOOP",
    gradient: GRADIENTS.video,
    accent: "#C8A96E",
  },
  "gs4-max-hero-01": {
    treatment: "cinematic-hero",
    strategy: "ken-burns-gradient",
    caption: "GAC GS4 MAX — vista tres cuartos plateado",
    label: "HERO",
    gradient:
      "linear-gradient(155deg, #0f1419 0%, #2a3d52 35%, #4a5f78 58%, #1a2332 100%)",
    accent: "#C8A96E",
  },
  "gs4-max-hero-ambient": {
    treatment: "cinematic-hero",
    strategy: "ken-burns-gradient",
    caption: "Ambiente cinematográfico — espacio seguro para la interfaz",
    label: "AMBIENT",
    gradient: GRADIENTS.hero,
    accent: "#8E8E93",
  },
  "video-hero-ambient": {
    treatment: "ambient-video",
    strategy: "motion-poster",
    caption: "Movimiento suave del GS4 MAX en escena amplia",
    label: "HERO AMBIENT",
    gradient: GRADIENTS.video,
    accent: "#C8A96E",
  },
  "gs4-max-ext-front-34": {
    treatment: "exterior-vehicle",
    strategy: "static-silhouette",
    caption: "Vista frontal tres cuartos — motor turbo 1.5L",
    label: "EXTERIOR 3/4",
    gradient: GRADIENTS.exterior,
    accent: "#C8A96E",
  },
  "gs4-max-ext-silver": {
    treatment: "exterior-vehicle",
    strategy: "static-silhouette",
    caption: "Color plateado — configuración predeterminada Bolivia",
    label: "PLATA",
    gradient: GRADIENTS.exterior,
    accent: "#B8C4D0",
  },
  "compare-corolla-cross": {
    treatment: "compare-card",
    strategy: "split-comparison",
    caption: "Toyota Corolla Cross — comparación honesta de segmento",
    label: "COROLLA CROSS",
    gradient: GRADIENTS.compare,
    accent: "#4A9B8E",
    secondaryAccent: "#8E8E93",
  },
  "gs4-max-int-dashboard": {
    treatment: "interior-cockpit",
    strategy: "static-silhouette",
    caption: "Tablero digital con pantalla central 12,3″ y ADAS",
    label: "DASHBOARD",
    gradient: GRADIENTS.interior,
    accent: "#4A9B8E",
  },
  "gs4-max-adas-hero": {
    treatment: "safety-card",
    strategy: "infographic-overlay",
    caption: "Asistencias al conductor de serie — ADiGO Pilot",
    label: "ADAS",
    gradient: GRADIENTS.safety,
    accent: "#4A9B8E",
  },
  "gs4-max-int-rear-seats": {
    treatment: "family-journey",
    strategy: "static-silhouette",
    caption: "Segunda fila amplia — espacio para la familia",
    label: "REAR SEATS",
    gradient: GRADIENTS.family,
    accent: "#6B8E6B",
  },
  "gs4-max-int-360-display": {
    treatment: "interior-cockpit",
    strategy: "infographic-overlay",
    caption: "Cámara panorámica 360° en pantalla central",
    label: "360° VIEW",
    gradient: GRADIENTS.interior,
    accent: "#4A9B8E",
  },
  "gs4-max-family-cover": {
    treatment: "family-journey",
    strategy: "ken-burns-gradient",
    caption: "Tu familia en Santa Cruz — el GS4 MAX en la rutina diaria",
    label: "FAMILIA",
    gradient: GRADIENTS.family,
    accent: "#6B8E6B",
  },
  "gs4-max-family-safety-hero": {
    treatment: "safety-card",
    strategy: "infographic-overlay",
    caption: "8 airbags de serie — protección para quienes viajan con vos",
    label: "SEGURIDAD FAMILIAR",
    gradient: GRADIENTS.safety,
    accent: "#4A9B8E",
  },
  "gs4-max-technology-cover": {
    treatment: "interior-cockpit",
    strategy: "static-silhouette",
    caption: "Tecnología a bordo — pantalla, conectividad y ADAS",
    label: "TECNOLOGÍA",
    gradient: GRADIENTS.interior,
    accent: "#E07A5F",
  },
  "gs4-max-safety-cover": {
    treatment: "safety-card",
    strategy: "infographic-overlay",
    caption: "Seguridad activa y pasiva — confianza en cada trayecto",
    label: "SEGURIDAD",
    gradient: GRADIENTS.safety,
    accent: "#4A9B8E",
  },
  "gs4-max-reliability-cover": {
    treatment: "exterior-vehicle",
    strategy: "static-silhouette",
    caption: "Ingeniería y durabilidad — pensado para calles reales",
    label: "CONFIABILIDAD",
    gradient: GRADIENTS.exterior,
    accent: "#4A6FA5",
  },
  "gs4-max-warranty-cover": {
    treatment: "warranty-card",
    strategy: "infographic-overlay",
    caption: "Garantía GAC 5 años / 150.000 km con respaldo Viaggio",
    label: "GARANTÍA",
    gradient: GRADIENTS.warranty,
    accent: "#C8A96E",
  },
  "gs4-max-service-cover": {
    treatment: "service-local",
    strategy: "chapter-scroll",
    caption: "Servicio postventa Viaggio Motors en Santa Cruz",
    label: "SERVICIO",
    gradient: GRADIENTS.trust,
    accent: "#4A9B8E",
  },
  "warranty-timeline-5yr-150k": {
    treatment: "warranty-card",
    strategy: "infographic-overlay",
    caption: "5 años ó 150.000 km — cobertura oficial GAC en Bolivia",
    label: "5 AÑOS / 150K",
    gradient: GRADIENTS.warranty,
    accent: "#C8A96E",
  },
  "video-trust-adas": {
    treatment: "safety-card",
    strategy: "motion-poster",
    caption: "Demostración ADAS — frenado automático y cámara 360°",
    label: "ADAS DEMO",
    gradient: GRADIENTS.safety,
    accent: "#4A9B8E",
  },
  "video-trust-heritage": {
    treatment: "trust-chapter",
    strategy: "chapter-scroll",
    caption: "GAC Motor — marca global con presencia en Bolivia",
    label: "GAC GLOBAL",
    gradient: GRADIENTS.trust,
    accent: "#C8A96E",
  },
  "video-viaggio-taller": {
    treatment: "service-local",
    strategy: "chapter-scroll",
    caption: "Taller autorizado Viaggio — técnicos capacitados GAC",
    label: "TALLER VIAGGIO",
    gradient: GRADIENTS.trust,
    accent: "#4A9B8E",
  },
  "video-trust-engine": {
    treatment: "exterior-vehicle",
    strategy: "motion-poster",
    caption: "Motor turbo 1.5L — 177 HP de rendimiento eficiente",
    label: "MOTOR",
    gradient: GRADIENTS.exterior,
    accent: "#C8A96E",
  },
  "video-trust-chassis": {
    treatment: "exterior-vehicle",
    strategy: "motion-poster",
    caption: "Chasis reforzado — estabilidad en pavimento irregular",
    label: "CHASIS",
    gradient: GRADIENTS.exterior,
    accent: "#4A6FA5",
  },
  "viaggio-test-drive-route": {
    treatment: "route-map",
    strategy: "infographic-overlay",
    caption: "Ruta de prueba: Showroom → Doble Vía → regreso",
    label: "RUTA PRUEBA",
    gradient: GRADIENTS.trust,
    accent: "#4A9B8E",
  },
  "logo-viaggio-full": {
    treatment: "logo-brand",
    strategy: "wordmark-svg",
    caption: "Viaggio Motors Santa Cruz",
    label: "VIAGGIO",
    gradient: "linear-gradient(135deg, #14171c 0%, #1a2332 100%)",
    accent: "#FFFFFF",
  },
  "logo-gac-full": {
    treatment: "logo-brand",
    strategy: "wordmark-svg",
    caption: "GAC Motor",
    label: "GAC",
    gradient: "linear-gradient(135deg, #0a0c10 0%, #1a1a1a 100%)",
    accent: "#C8A96E",
  },
  "logo-bank-partner-1": {
    treatment: "financing-card",
    strategy: "wordmark-svg",
    caption: "Socio financiero autorizado Viaggio",
    label: "BANCO",
    gradient: GRADIENTS.financing,
    accent: "#1D1D1F",
  },
  "persona-carlos-avatar": {
    treatment: "persona-portrait",
    strategy: "portrait-illustration",
    caption: "Carlos — mecánico maestro, voz de confianza técnica",
    label: "CARLOS",
    gradient: GRADIENTS.persona,
    accent: "#4A6FA5",
  },
  "persona-sofia-avatar": {
    treatment: "persona-portrait",
    strategy: "portrait-illustration",
    caption: "Sofía — consultora, guía de diseño y valor",
    label: "SOFÍA",
    gradient: GRADIENTS.persona,
    accent: "#E07A5F",
  },
  "persona-diego-avatar": {
    treatment: "persona-portrait",
    strategy: "portrait-illustration",
    caption: "Diego — conductor familiar, vida real en Santa Cruz",
    label: "DIEGO",
    gradient: GRADIENTS.persona,
    accent: "#6B8E6B",
  },
  "gs4-max-diego-colegio": {
    treatment: "family-journey",
    strategy: "ken-burns-gradient",
    caption: "7:15 — colegio, rutina matutina con los chicos",
    label: "COLEGIO",
    gradient: GRADIENTS.family,
    accent: "#6B8E6B",
  },
  "gs4-max-diego-mediodia": {
    treatment: "family-journey",
    strategy: "ken-burns-gradient",
    caption: "Mediodía en Santa Cruz — A/C y confort para la familia",
    label: "MEDIODÍA",
    gradient: GRADIENTS.family,
    accent: "#6B8E6B",
  },
  "gs4-max-diego-super": {
    treatment: "family-journey",
    strategy: "static-silhouette",
    caption: "Compras del super — espacio de carga práctico",
    label: "SUPERMERCADO",
    gradient: GRADIENTS.family,
    accent: "#6B8E6B",
  },
  "gs4-max-diego-buenavista": {
    treatment: "family-journey",
    strategy: "ken-burns-gradient",
    caption: "Buena Vista — salida familiar de fin de semana",
    label: "BUENA VISTA",
    gradient: GRADIENTS.family,
    accent: "#6B8E6B",
  },
  "gs4-max-diego-carretera": {
    treatment: "family-journey",
    strategy: "ken-burns-gradient",
    caption: "Carretera de Santa Cruz — estabilidad en ruta larga",
    label: "CARRETERA",
    gradient: GRADIENTS.family,
    accent: "#6B8E6B",
  },
  "gs4-max-diego-confort": {
    treatment: "family-journey",
    strategy: "static-silhouette",
    caption: "Confort climático — clave en el calor cruceño",
    label: "CONFORT",
    gradient: GRADIENTS.family,
    accent: "#6B8E6B",
  },
  "gs4-max-diego-ano1": {
    treatment: "family-journey",
    strategy: "infographic-overlay",
    caption: "Año 1 de propiedad — experiencia real de dueño",
    label: "AÑO 1",
    gradient: GRADIENTS.family,
    accent: "#6B8E6B",
  },
  "emkoo-hero-01": {
    treatment: "coming-soon",
    strategy: "static-silhouette",
    caption: "GAC EMKOO — próximamente en Viaggio",
    label: "EMKOO",
    gradient: GRADIENTS.exterior,
    accent: "#8E8E93",
  },
  "emzoom-hero-01": {
    treatment: "coming-soon",
    strategy: "static-silhouette",
    caption: "GAC EMZOOM — próximamente en Viaggio",
    label: "EMZOOM",
    gradient: GRADIENTS.exterior,
    accent: "#8E8E93",
  },
  "gs8-hero-01": {
    treatment: "coming-soon",
    strategy: "static-silhouette",
    caption: "GAC GS8 — próximamente en Viaggio",
    label: "GS8",
    gradient: GRADIENTS.exterior,
    accent: "#8E8E93",
  },
};

function hashMediaId(mediaId: string): number {
  let hash = 0;
  for (let i = 0; i < mediaId.length; i += 1) {
    hash = (hash << 5) - hash + mediaId.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function inferFromPattern(mediaId: string): Omit<FallbackSpec, "mediaId"> {
  const lower = mediaId.toLowerCase();

  if (lower.includes("logo")) {
    return EXPLICIT["logo-viaggio-full"];
  }
  if (lower.includes("persona-") || lower.includes("avatar")) {
    const personaKey = lower.includes("sofia")
      ? "persona-sofia-avatar"
      : lower.includes("diego")
        ? "persona-diego-avatar"
        : "persona-carlos-avatar";
    return EXPLICIT[personaKey];
  }
  if (lower.includes("compare") || lower.includes("corolla")) {
    return EXPLICIT["compare-corolla-cross"];
  }
  if (lower.includes("warranty") || lower.includes("garantia")) {
    return EXPLICIT["warranty-timeline-5yr-150k"];
  }
  if (lower.includes("safety") || lower.includes("adas") || lower.includes("seguridad")) {
    return EXPLICIT["gs4-max-adas-hero"];
  }
  if (lower.includes("financ") || lower.includes("bank") || lower.includes("cuota")) {
    return EXPLICIT["logo-bank-partner-1"];
  }
  if (lower.includes("video") || lower.includes("loop")) {
    return EXPLICIT["video-attract-loop"];
  }
  if (lower.includes("tour-") || lower.includes("trust-0") || lower.includes("diego-0")) {
    return {
      treatment: "tour-step",
      strategy: "motion-poster",
      caption: "Paso del recorrido guiado — GS4 MAX",
      label: mediaId.replace(/[-_]/g, " ").toUpperCase().slice(0, 24),
      gradient: GRADIENTS.trust,
      accent: "#4A9B8E",
    };
  }
  if (lower.includes("family") || lower.includes("diego") || lower.includes("lifestyle")) {
    return EXPLICIT["gs4-max-family-cover"];
  }
  if (lower.includes("int-") || lower.includes("dashboard") || lower.includes("interior")) {
    return EXPLICIT["gs4-max-int-dashboard"];
  }
  if (lower.includes("ext-") || lower.includes("silver") || lower.includes("hero")) {
    return EXPLICIT["gs4-max-hero-01"];
  }
  if (lower.includes("service") || lower.includes("viaggio") || lower.includes("taller")) {
    return EXPLICIT["gs4-max-service-cover"];
  }
  if (lower.includes("heritage") || lower.includes("brand") || lower.includes("trust")) {
    return EXPLICIT["video-trust-heritage"];
  }
  if (lower.includes("route") || lower.includes("map")) {
    return EXPLICIT["viaggio-test-drive-route"];
  }
  if (lower.includes("cover")) {
    return EXPLICIT["gs4-max-hero-ambient"];
  }

  const index = hashMediaId(mediaId) % 5;
  const palette = [
    GRADIENTS.hero,
    GRADIENTS.exterior,
    GRADIENTS.interior,
    GRADIENTS.family,
    GRADIENTS.trust,
  ];

  return {
    treatment: "cinematic-hero",
    strategy: "ken-burns-gradient",
    caption: `Visualización premium — ${mediaId.replace(/[-_]/g, " ")}`,
    label: mediaId.replace(/[-_]/g, " ").toUpperCase().slice(0, 28),
    gradient: palette[index],
    accent: "#C8A96E",
  };
}

export function getFallbackSpec(mediaId: string): FallbackSpec {
  const explicit = EXPLICIT[mediaId];
  if (explicit) {
    return { mediaId, ...explicit };
  }
  return { mediaId, ...inferFromPattern(mediaId) };
}

export function listAllFallbackMediaIds(): string[] {
  return Object.keys(EXPLICIT);
}
