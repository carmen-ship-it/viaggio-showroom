"use client";

import { useEffect, useRef } from "react";
import type { HostScreenId } from "./host-narration";
import { getHostTrack, resolveHostTrackKey } from "./host-narration";
import {
  isHostTrackOnCooldown,
  markHostTrackCooldown,
  markHostTrackPlayed,
  wasHostTrackPlayed,
} from "./audio-session";
import { useAudio } from "./AudioProvider";

interface UseHostNarrationOptions {
  screenId: HostScreenId;
  enabled?: boolean;
  tourId?: string;
  topicId?: string;
  /** Override once-per-session guard (e.g. S01 idle replay after cooldown) */
  allowReplay?: boolean;
}

/**
 * Plays premium showroom host narration for executive demo screens.
 * Host never reads on-screen text — scripts live in EXECUTIVE_NARRATION_SCRIPT.md.
 */
export function useHostNarration({
  screenId,
  enabled = true,
  tourId,
  topicId,
  allowReplay = false,
}: UseHostNarrationOptions): void {
  const { audioUnlocked, preferences, playHostNarration, stopNarration } = useAudio();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const trackKey = resolveHostTrackKey({ screenId, tourId, topicId });

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    const stopOnLeave = () => {
      stopNarration();
    };

    if (!enabled || !audioUnlocked || !trackKey) {
      return stopOnLeave;
    }
    if (!preferences.narrationAutoPlay || preferences.masterMuted) {
      return stopOnLeave;
    }

    const track = getHostTrack(trackKey);
    if (!track) {
      return stopOnLeave;
    }

    if (!allowReplay && wasHostTrackPlayed(track.sessionKey)) {
      return stopOnLeave;
    }
    if (track.cooldownMs && isHostTrackOnCooldown(track.sessionKey, track.cooldownMs)) {
      return stopOnLeave;
    }

    timerRef.current = setTimeout(() => {
      void playHostNarration(track.assetId).then((played) => {
        if (played) {
          markHostTrackPlayed(track.sessionKey);
          if (track.cooldownMs) markHostTrackCooldown(track.sessionKey);
        }
      });
    }, track.delayMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      stopNarration();
    };
  }, [
    enabled,
    audioUnlocked,
    trackKey,
    preferences.narrationAutoPlay,
    preferences.masterMuted,
    allowReplay,
    playHostNarration,
    stopNarration,
    screenId,
    tourId,
    topicId,
  ]);
}
