/**
 * FIE financial truth gates (constitutional FIE domain).
 * C-01 scaffold — evaluators land in Phase B (B-01).
 */

import { JOIN_RATE_THRESHOLD } from "@/lib/crm/close-join";

export const FIE_GATE_IDS = [
  "CPI-G-FIE-01",
  "CPI-G-FIE-02",
  "CPI-G-FIE-03",
  "CPI-G-FIE-04",
  "CPI-G-FIE-05",
] as const;

/** Harmonized with session-outcome join gate (C-11). */
export const FIE_SESSION_JOIN_THRESHOLD = JOIN_RATE_THRESHOLD;

export interface FieGateResult {
  gateId: (typeof FIE_GATE_IDS)[number];
  passed: boolean;
}

/** Phase A stub — returns not-evaluated until CRM join data is wired. */
export function evaluateFieGates(): FieGateResult[] {
  return FIE_GATE_IDS.map((gateId) => ({ gateId, passed: false }));
}
