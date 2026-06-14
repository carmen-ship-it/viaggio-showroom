"use client";

import { useEffect, useRef } from "react";
import type { PersonaId } from "@/types/persona";
import type { NarrationBlockData } from "@/types/blocks";
import { buildNarrationAssetId } from "./resolve-audio";
import { useAudio } from "./AudioProvider";

interface UseTourNarrationOptions {
  vehicleSlug: string;
  stepId: string;
  personaId: PersonaId;
  topicId?: string;
  narrationData?: NarrationBlockData | null;
  enabled?: boolean;
}

/**
 * Syncs tour step changes to narration playback.
 * Respects narrationAutoPlay preference; manual controls via NarrationControls.
 */
export function useTourNarration({
  stepId,
  personaId,
  topicId,
  narrationData,
  enabled = true,
}: UseTourNarrationOptions): {
  narrationAssetId: string | null;
  hasAudioTrack: boolean;
} {
  const { preferences, playNarration, stopNarration, playInteraction } = useAudio();
  const prevStepRef = useRef<string | null>(null);

  const narrationAssetId = buildNarrationAssetId(personaId, {
    audioAssetId: narrationData?.audioAssetId,
    stepId,
    topicId,
  });

  useEffect(() => {
    if (!enabled || !narrationAssetId) return;

    if (prevStepRef.current && prevStepRef.current !== stepId) {
      playInteraction("audio-sfx-step-advance");
    }
    prevStepRef.current = stepId;

    if (!preferences.narrationAutoPlay || preferences.masterMuted) return;

    void playNarration(narrationAssetId);

    return () => {
      // Step unmount stops narration only when leaving tour entirely is handled by stopAll elsewhere
    };
  }, [
    enabled,
    stepId,
    narrationAssetId,
    preferences.narrationAutoPlay,
    preferences.masterMuted,
    playNarration,
    playInteraction,
  ]);

  useEffect(() => {
    return () => {
      stopNarration();
    };
  }, [stopNarration]);

  return {
    narrationAssetId,
    hasAudioTrack: Boolean(narrationAssetId),
  };
}
