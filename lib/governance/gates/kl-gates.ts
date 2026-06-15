/**
 * Knowledge Library substrate gate.
 * SS-01 — no SIE spec/price/legal claim without valid knowledgeRef.
 */

export const KL_GATE_ID = "CPI-G-KL-01" as const;

export interface KlGateInput {
  knowledgeRef?: { ready: boolean; validatedAt?: string };
}

export interface KlGateResult {
  gateId: typeof KL_GATE_ID;
  passed: boolean;
}

/** Phase A stub — grounding enforcement lives in lib/content/validator.ts (C-02). */
export function evaluateKlGate(_input: KlGateInput): KlGateResult {
  return { gateId: KL_GATE_ID, passed: false };
}
