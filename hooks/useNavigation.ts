"use client";

import { routes } from "@/lib/navigation";

/** Reserved for Phase 2.1 — typed navigation helpers */
export function useNavigation(vehicleSlug?: string) {
  return {
    routes,
    vehicleSlug,
  };
}
