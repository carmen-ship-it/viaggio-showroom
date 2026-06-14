"use client";

import { useEffect } from "react";
import { getScreenAudioConfig } from "./screen-tracks";
import { useAudio } from "./AudioProvider";

interface UseScreenAmbientOptions {
  screenId: string;
  enabled?: boolean;
}

/** Starts ambient soundtrack for a screen when configured and assets are available. */
export function useScreenAmbient({ screenId, enabled = true }: UseScreenAmbientOptions): void {
  const { preferences, playAmbient, stopAmbient } = useAudio();
  const config = getScreenAudioConfig(screenId);

  useEffect(() => {
    if (!enabled || !config?.ambientAssetId || !config.autoPlayAmbient) return;
    if (preferences.masterMuted) return;

    void playAmbient(config.ambientAssetId);

    return () => {
      stopAmbient();
    };
  }, [
    enabled,
    screenId,
    config?.ambientAssetId,
    config?.autoPlayAmbient,
    preferences.masterMuted,
    playAmbient,
    stopAmbient,
  ]);
}
