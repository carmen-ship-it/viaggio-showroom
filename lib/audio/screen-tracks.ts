import type { ScreenAudioConfig } from "@/types/audio";

/** Per-screen optional audio flags — global ambient handled by useShowroomAmbient. */
export const SCREEN_AUDIO: Record<string, ScreenAudioConfig> = {
  S01: {
    screenId: "S01",
    autoPlayAmbient: false,
  },
  S02: {
    screenId: "S02",
    autoPlayAmbient: false,
  },
  S03: {
    screenId: "S03",
    autoPlayAmbient: false,
  },
  S04: {
    screenId: "S04",
    autoPlayAmbient: false,
  },
  S06: {
    screenId: "S06",
    autoPlayAmbient: false,
    autoPlayNarration: false,
  },
  S08: {
    screenId: "S08",
    autoPlayNarration: false,
  },
  S22: {
    screenId: "S22",
    autoPlayAmbient: false,
  },
  S24: {
    screenId: "S24",
    autoPlayNarration: false,
  },
};

export function getScreenAudioConfig(screenId: string): ScreenAudioConfig | undefined {
  return SCREEN_AUDIO[screenId];
}
