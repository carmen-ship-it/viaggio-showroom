import type { ScreenAudioConfig } from "@/types/audio";

/** Per-screen optional audio tracks — content-driven, Spanish (Bolivia) voice-over slots. */
export const SCREEN_AUDIO: Record<string, ScreenAudioConfig> = {
  S01: {
    screenId: "S01",
    ambientAssetId: "audio-ambient-attract",
    autoPlayAmbient: true,
  },
  S02: {
    screenId: "S02",
    ambientAssetId: "audio-ambient-showroom",
    autoPlayAmbient: true,
  },
  S03: {
    screenId: "S03",
    ambientAssetId: "audio-ambient-showroom",
    autoPlayAmbient: true,
  },
  S04: {
    screenId: "S04",
    ambientAssetId: "audio-ambient-showroom",
    autoPlayAmbient: true,
  },
  S06: {
    screenId: "S06",
    ambientAssetId: "audio-ambient-showroom",
    autoPlayAmbient: true,
    autoPlayNarration: true,
  },
  S08: {
    screenId: "S08",
    ambientAssetId: "audio-ambient-showroom",
    autoPlayNarration: true,
  },
  S22: {
    screenId: "S22",
    ambientAssetId: "audio-ambient-showroom",
    autoPlayAmbient: true,
  },
  S24: {
    screenId: "S24",
    ambientAssetId: "audio-ambient-showroom",
    autoPlayNarration: true,
  },
};

export function getScreenAudioConfig(screenId: string): ScreenAudioConfig | undefined {
  return SCREEN_AUDIO[screenId];
}
