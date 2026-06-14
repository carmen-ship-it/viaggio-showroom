"use client";

import { useEffect, useRef, useState } from "react";
import { SHOWROOM_AMBIENT_ASSET_ID } from "./host-narration";
import { useAudio } from "./AudioProvider";

/** Continuous showroom ambient — starts after audio unlock, loops across navigation. */
export function useShowroomAmbient(): void {
  const { audioUnlocked, preferences, playAmbient, pauseAmbient } = useAudio();
  const startedRef = useRef(false);
  const [resetTick, setResetTick] = useState(0);

  useEffect(() => {
    const onReset = () => {
      startedRef.current = false;
      setResetTick((t) => t + 1);
    };
    window.addEventListener("viaggio-audio-reset", onReset);
    return () => window.removeEventListener("viaggio-audio-reset", onReset);
  }, []);

  useEffect(() => {
    if (!audioUnlocked || preferences.masterMuted) {
      pauseAmbient();
      startedRef.current = false;
      return;
    }

    if (startedRef.current) return;

    void playAmbient(SHOWROOM_AMBIENT_ASSET_ID).then((ok) => {
      if (ok) startedRef.current = true;
    });
  }, [audioUnlocked, preferences.masterMuted, playAmbient, pauseAmbient, resetTick]);
}
