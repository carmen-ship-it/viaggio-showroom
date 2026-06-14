import type { ConversionEventType } from "@/types/analytics";

export interface TrackEventPayload {
  type: ConversionEventType | string;
  vehicleSlug?: string;
  metadata?: Record<string, unknown>;
}

export function trackEvent({ type, vehicleSlug, metadata }: TrackEventPayload): void {
  const detail = {
    type,
    vehicleSlug,
    metadata,
    timestamp: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("viaggio-analytics", { detail }));
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[viaggio-analytics]", detail);
  }
}
