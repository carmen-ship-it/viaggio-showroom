"use client";

/** Reserved for Phase 2.1 — vehicle context on client */
export function useVehicle(slug: string) {
  return {
    slug,
    isReady: false,
  };
}
