"use client";

import { useEffect } from "react";
import { isDemoMode } from "@/lib/config/demo-mode";

/** Prevent document scroll on executive kiosk demo (1920×1080). */
export function DemoKioskBodyLock() {
  useEffect(() => {
    if (!isDemoMode) return;
    document.documentElement.classList.add("demo-kiosk-strict");
    return () => {
      document.documentElement.classList.remove("demo-kiosk-strict");
    };
  }, []);

  return null;
}
