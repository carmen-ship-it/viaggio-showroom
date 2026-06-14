/** Audio channel identifiers — each channel has independent volume and playback rules. */
export type AudioChannel = "ambient" | "narration" | "interaction";

export type AudioPlaybackState = "idle" | "loading" | "playing" | "paused" | "unavailable";

export type NarrationVariant = "short" | "full";

/** Resolved audio asset ready for playback. */
export interface ResolvedAudioAsset {
  assetId: string;
  src: string;
  channel: AudioChannel;
  loop: boolean;
  available: boolean;
  label?: string;
}

/** Per-screen optional audio configuration (content-driven). */
export interface ScreenAudioConfig {
  screenId: string;
  ambientAssetId?: string;
  narrationAssetId?: string;
  autoPlayAmbient?: boolean;
  autoPlayNarration?: boolean;
}

/** User-facing audio preferences (session-scoped). */
export interface AudioPreferences {
  masterMuted: boolean;
  ambientVolume: number;
  narrationVolume: number;
  interactionVolume: number;
  narrationAutoPlay: boolean;
  interactionSoundsEnabled: boolean;
  headphoneMode: boolean;
}

export interface NarrationTrackRef {
  assetId: string;
  vehicleSlug?: string;
  personaId?: string;
  topicId?: string;
  stepId?: string;
  variant?: NarrationVariant;
}
