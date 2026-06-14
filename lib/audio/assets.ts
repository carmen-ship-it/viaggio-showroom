import type { AudioChannel } from "@/types/audio";
import { HOST_NARRATION_TRACKS } from "./host-narration";

export interface AudioAssetDefinition {
  id: string;
  src: string;
  channel: AudioChannel;
  loop?: boolean;
  label: string;
  vehicleSlug?: string;
}

export const GLOBAL_AUDIO_ASSETS: AudioAssetDefinition[] = [
  {
    id: "audio-sfx-nav-tap",
    src: "/assets/audio/sfx/nav-tap.mp3",
    channel: "interaction",
    label: "Toque de navegación",
  },
  {
    id: "audio-sfx-card-select",
    src: "/assets/audio/sfx/card-select.mp3",
    channel: "interaction",
    label: "Selección de tarjeta",
  },
  {
    id: "audio-sfx-transition-soft",
    src: "/assets/audio/sfx/transition-soft.mp3",
    channel: "interaction",
    label: "Transición de pantalla",
  },
  {
    id: "audio-sfx-success",
    src: "/assets/audio/sfx/success.mp3",
    channel: "interaction",
    label: "Confirmación exitosa",
  },
  {
    id: "audio-sfx-qr-reveal",
    src: "/assets/audio/sfx/qr-reveal.mp3",
    channel: "interaction",
    label: "Revelación QR",
  },
  /** @deprecated Use audio-sfx-nav-tap */
  {
    id: "audio-sfx-cta-tap",
    src: "/assets/audio/sfx/nav-tap.mp3",
    channel: "interaction",
    label: "Toque en CTA",
  },
  {
    id: "audio-sfx-step-advance",
    src: "/assets/audio/sfx/nav-tap.mp3",
    channel: "interaction",
    label: "Avance de paso",
  },
  {
    id: "audio-sfx-vehicle-select",
    src: "/assets/audio/sfx/card-select.mp3",
    channel: "interaction",
    label: "Selección de vehículo",
  },
  {
    id: "audio-sfx-nav-back",
    src: "/assets/audio/sfx/nav-tap.mp3",
    channel: "interaction",
    label: "Navegación atrás",
  },
];

export const HOST_AUDIO_ASSETS: AudioAssetDefinition[] = Object.values(
  HOST_NARRATION_TRACKS,
).map((track) => ({
  id: track.assetId,
  src: track.src,
  channel: "narration" as const,
  label: track.label,
}));

export const ALL_AUDIO_ASSETS: AudioAssetDefinition[] = [
  ...GLOBAL_AUDIO_ASSETS,
  ...HOST_AUDIO_ASSETS,
];
