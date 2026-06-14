import type { AudioChannel, AudioPreferences } from "@/types/audio";

/** Default channel gains (0–1) — narration-first luxury presentation mix. */
export const DEFAULT_CHANNEL_GAIN: Record<AudioChannel, number> = {
  ambient: 0.055,
  narration: 1,
  interaction: 0.28,
};

/**
 * Ambient multiplier while host narration is playing.
 * Applied to base ambient gain (~20% of normal — aggressive duck for speech clarity).
 */
export const AMBIENT_DUCK_RATIO = 0.2;

/** @deprecated Use AMBIENT_DUCK_RATIO × DEFAULT_CHANNEL_GAIN.ambient for effective ducked level. */
export const AMBIENT_DUCKED_GAIN =
  DEFAULT_CHANNEL_GAIN.ambient * AMBIENT_DUCK_RATIO;

/** Headphone mode adjusts relative channel balance for private listening. */
export const HEADPHONE_MODE_GAIN: Record<AudioChannel, number> = {
  ambient: 0.5,
  narration: 1,
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

/** Fade-down when host narration starts (ms). */
export const AMBIENT_DUCK_FADE_MS = 450;

/** Fade-up when host narration ends (ms). */
export const AMBIENT_RESTORE_FADE_MS = 900;

/** Interaction SFX debounce to avoid rapid-fire on fast taps (ms). */
export const INTERACTION_DEBOUNCE_MS = 120;

/** Home attract screen handles audio unlock via "Tocá para empezar" — no separate overlay. */
export const ATTRACT_AUDIO_UNLOCK_PATH = "/";
