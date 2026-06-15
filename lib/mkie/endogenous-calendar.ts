/**
 * Endogenous Event Calendar (C-03 scaffold).
 * Consumer contract: calendar_check before shock_registry_write.
 */

import type { EndogenousEvent } from "@/types/mkie";

/** Phase A scaffold — in-memory store until persistence layer (B-02). */
const calendar: EndogenousEvent[] = [];

export function listEndogenousEvents(): readonly EndogenousEvent[] {
  return calendar;
}

export function findMatchingEvent(
  metricId: string,
  at: Date,
): EndogenousEvent | undefined {
  return calendar.find((event) => {
    if (!event.affectedMetrics.includes(metricId)) return false;
    const start = new Date(event.scheduledAt);
    const end = new Date(event.expiresAt);
    return at >= start && at <= end;
  });
}

export function registerEndogenousEvent(event: EndogenousEvent): void {
  calendar.push(event);
}
