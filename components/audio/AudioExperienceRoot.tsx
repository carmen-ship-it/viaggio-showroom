"use client";

import type { ReactNode } from "react";
import { useShowroomAmbient } from "@/lib/audio/useShowroomAmbient";
import { AudioUnlockOverlay } from "@/components/audio/AudioUnlockOverlay";

/** Global audio bootstrap: unlock overlay + continuous showroom ambient. */
export function AudioExperienceRoot({ children }: { children: ReactNode }) {
  useShowroomAmbient();

  return (
    <>
      {children}
      <AudioUnlockOverlay />
    </>
  );
}
