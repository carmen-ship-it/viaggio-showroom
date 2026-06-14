"use client";

import { useEffect, useRef } from "react";
import { useAudio } from "./AudioProvider";

/** Continuous showroom ambient — starts after audio unlock, loops across navigation. */
export function useShowroomAmbient(): void {
  const { audioUnlocked, preferences, ensureShowroomAmbient, pauseAmbient } = useAudio();
  const startedRef = useRef(false);

  useEffect(() => {
    const onReset = () => {
      startedRef.current = false;
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

    if (startedRef.current) {
      void ensureShowroomAmbient();
      return;
    }

    void ensureShowroomAmbient().then((ok) => {
      if (ok) startedRef.current = true;
    });
  }, [audioUnlocked, preferences.masterMuted, ensureShowroomAmbient, pauseAmbient]);
}
