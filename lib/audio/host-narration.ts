/** Showroom host narration — Phase 7.3 executive demo */

export type HostScreenId =
  | "S01"
  | "S02"
  | "S03"
  | "S22"
  | "S06"
  | "S08"
  | "S25"
  | "S12"
  | "S26"
  | "S13"
  | "S15";

export interface HostNarrationTrack {
  assetId: string;
  src: string;
  screenId: HostScreenId;
  delayMs: number;
  label: string;
  /** Session key suffix — prevents replay on same screen visit */
  sessionKey: string;
  /** Minimum ms before replay (S01 idle loop) */
  cooldownMs?: number;
}

export const SHOWROOM_AMBIENT_ASSET_ID = "audio-ambient-showroom";

export const HOST_NARRATION_TRACKS: Record<string, HostNarrationTrack> = {
  "host-s01": {
    assetId: "audio-narration-host-s01-attract",
    src: "/assets/audio/narration/host/host-s01-attract.mp3",
    screenId: "S01",
    delayMs: 2500,
    label: "Host — Bienvenida attract",
    sessionKey: "host-s01",
    cooldownMs: 240_000,
  },
  "host-s02": {
    assetId: "audio-narration-host-s02-welcome",
    src: "/assets/audio/narration/host/host-s02-welcome.mp3",
    screenId: "S02",
    delayMs: 1000,
    label: "Host — Bienvenida sesión",
    sessionKey: "host-s02",
  },
  "host-s03": {
    assetId: "audio-narration-host-s03-selector",
    src: "/assets/audio/narration/host/host-s03-selector.mp3",
    screenId: "S03",
    delayMs: 1500,
    label: "Host — Selector de vehículo",
    sessionKey: "host-s03",
  },
  "host-s22": {
    assetId: "audio-narration-host-s22-hero",
    src: "/assets/audio/narration/host/host-s22-hero.mp3",
    screenId: "S22",
    delayMs: 2000,
    label: "Host — Hero inmersivo",
    sessionKey: "host-s22",
  },
  "host-s25": {
    assetId: "audio-narration-host-s25-faq",
    src: "/assets/audio/narration/host/host-s25-faq.mp3",
    screenId: "S25",
    delayMs: 1000,
    label: "Host — FAQ confianza",
    sessionKey: "host-s25",
  },
  "host-s06-trust": {
    assetId: "audio-narration-host-s06-tour-intro-trust",
    src: "/assets/audio/narration/host/host-s06-tour-intro-trust.mp3",
    screenId: "S06",
    delayMs: 1000,
    label: "Host — Tour intro confianza",
    sessionKey: "host-s06-trust",
  },
  "host-s06-family": {
    assetId: "audio-narration-host-s06-tour-intro-family",
    src: "/assets/audio/narration/host/host-s06-tour-intro-family.mp3",
    screenId: "S06",
    delayMs: 1000,
    label: "Host — Tour intro familia",
    sessionKey: "host-s06-family",
  },
  "host-s06-desire": {
    assetId: "audio-narration-host-s06-tour-intro-desire",
    src: "/assets/audio/narration/host/host-s06-tour-intro-desire.mp3",
    screenId: "S06",
    delayMs: 1000,
    label: "Host — Tour intro descubrimiento",
    sessionKey: "host-s06-desire",
  },
  "host-s08-frame": {
    assetId: "audio-narration-host-s08-topic-frame",
    src: "/assets/audio/narration/host/host-s08-topic-frame.mp3",
    screenId: "S08",
    delayMs: 1000,
    label: "Host — Marco de tema",
    sessionKey: "host-s08-frame",
  },
  "host-s08-adas": {
    assetId: "audio-narration-host-s08-adas",
    src: "/assets/audio/narration/host/host-s08-adas.mp3",
    screenId: "S08",
    delayMs: 2000,
    label: "Host — Tema ADAS",
    sessionKey: "host-s08-adas",
  },
  "host-s12": {
    assetId: "audio-narration-host-s12-compare",
    src: "/assets/audio/narration/host/host-s12-compare.mp3",
    screenId: "S12",
    delayMs: 1500,
    label: "Host — Comparación",
    sessionKey: "host-s12",
  },
  "host-s26": {
    assetId: "audio-narration-host-s26-financing",
    src: "/assets/audio/narration/host/host-s26-financing.mp3",
    screenId: "S26",
    delayMs: 2000,
    label: "Host — Financiamiento",
    sessionKey: "host-s26",
  },
  "host-s13": {
    assetId: "audio-narration-host-s13-convert",
    src: "/assets/audio/narration/host/host-s13-convert.mp3",
    screenId: "S13",
    delayMs: 2500,
    label: "Host — Conversión",
    sessionKey: "host-s13",
  },
  "host-s15": {
    assetId: "audio-narration-host-s15-whatsapp",
    src: "/assets/audio/narration/host/host-s15-whatsapp.mp3",
    screenId: "S15",
    delayMs: 2000,
    label: "Host — WhatsApp",
    sessionKey: "host-s15",
  },
};

export function resolveHostTrackKey(options: {
  screenId: HostScreenId;
  tourId?: string;
  topicId?: string;
}): string | null {
  const { screenId, tourId, topicId } = options;

  switch (screenId) {
    case "S01":
      return "host-s01";
    case "S02":
      return "host-s02";
    case "S03":
      return "host-s03";
    case "S22":
      return "host-s22";
    case "S25":
      return "host-s25";
    case "S06":
      if (tourId === "family") return "host-s06-family";
      if (tourId === "desire") return "host-s06-desire";
      return "host-s06-trust";
    case "S08":
      if (topicId === "adas") return "host-s08-adas";
      return "host-s08-frame";
    case "S12":
      return "host-s12";
    case "S26":
      return "host-s26";
    case "S13":
      return "host-s13";
    case "S15":
      return "host-s15";
    default:
      return null;
  }
}

export function getHostTrack(trackKey: string): HostNarrationTrack | undefined {
  return HOST_NARRATION_TRACKS[trackKey];
}
