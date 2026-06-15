/**
 * MkIE shock classification pre-check (C-03).
 * Must run calendar_check before shock_registry_write.
 */

import { findMatchingEvent } from "./endogenous-calendar";

export type ShockClassificationOutcome =
  | { action: "annotate_only"; eventId: string }
  | { action: "proceed_to_registry" };

export interface ShockCandidate {
  metricId: string;
  detectedAt: string;
  proposedSeverity: "S0" | "S1" | "S2" | "S3" | "S4";
}

/**
 * Phase A scaffold — blocks S2+ severity when a calendar match has annotationOnly.
 */
export function classifyShockCandidate(
  candidate: ShockCandidate,
): ShockClassificationOutcome {
  const match = findMatchingEvent(
    candidate.metricId,
    new Date(candidate.detectedAt),
  );

  if (match?.annotationOnly) {
    return { action: "annotate_only", eventId: match.eventId };
  }

  return { action: "proceed_to_registry" };
}
