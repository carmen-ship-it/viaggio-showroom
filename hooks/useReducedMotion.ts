"use client";

import { useEffect, useState } from "react";
import { useA11y } from "@/lib/a11y/A11yProvider";

export function useReducedMotion(): boolean {
  const { reduceMotion: reduceMotionOverride } = useA11y();
  const [systemReduced, setSystemReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setSystemReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduceMotionOverride || systemReduced;
}
