"use client";

import { useCallback } from "react";
import { useAudioOptional } from "./AudioProvider";

export type InteractionSoundId =
  | "audio-sfx-nav-tap"
  | "audio-sfx-card-select"
  | "audio-sfx-transition-soft"
  | "audio-sfx-success"
  | "audio-sfx-qr-reveal"
  | "audio-sfx-cta-tap"
  | "audio-sfx-step-advance"
  | "audio-sfx-vehicle-select"
  | "audio-sfx-nav-back";

/** Plays premium interaction SFX when enabled; no-op when muted or audio unavailable. */
export function useInteractionSound() {
  const audio = useAudioOptional();

  const play = useCallback(
    (soundId: InteractionSoundId) => {
      audio?.playInteraction(soundId);
    },
    [audio],
  );

  const playNavTap = useCallback(() => play("audio-sfx-nav-tap"), [play]);
  const playCardSelect = useCallback(() => play("audio-sfx-card-select"), [play]);
  const playTransition = useCallback(() => play("audio-sfx-transition-soft"), [play]);
  const playSuccess = useCallback(() => play("audio-sfx-success"), [play]);
  const playQrReveal = useCallback(() => play("audio-sfx-qr-reveal"), [play]);

  /** @deprecated */
  const playCtaTap = playNavTap;
  const playStepAdvance = playNavTap;
  const playVehicleSelect = playCardSelect;
  const playNavBack = playNavTap;

  return {
    play,
    playNavTap,
    playCardSelect,
    playTransition,
    playSuccess,
    playQrReveal,
    playCtaTap,
    playStepAdvance,
    playVehicleSelect,
    playNavBack,
  };
}
