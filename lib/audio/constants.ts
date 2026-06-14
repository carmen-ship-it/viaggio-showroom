import type { AudioChannel, AudioPreferences } from "@/types/audio";

/** Default channel volumes (0–1) — ambient targets 10–15% effective output. */
export const DEFAULT_CHANNEL_GAIN: Record<AudioChannel, number> = {
  ambient: 0.12,
  narration: 0.88,
  interaction: 0.28,
};

/** Headphone mode adjusts relative channel balance for private listening. */
export const HEADPHONE_MODE_GAIN: Record<AudioChannel, number> = {
  ambient: 0.55,
  narration: 1.15,
  interaction: 0.9,
};

export const DEFAULT_AUDIO_PREFERENCES: AudioPreferences = {
  masterMuted: false,
  ambientVolume: 1,
  narrationVolume: 1,
  interactionVolume: 0.85,
  narrationAutoPlay: true,
  interactionSoundsEnabled: true,
  headphoneMode: false,
};

/** Fade-in for showroom ambient after first interaction (ms). */
export const AMBIENT_FADE_MS = 2000;

/** Interaction SFX debounce to avoid rapid-fire on fast taps (ms). */
export const INTERACTION_DEBOUNCE_MS = 120;
