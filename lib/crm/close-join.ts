/**
 * Close-to-session join rate calculator (C-06, C-11).
 * Single threshold harmonized across CoIE and FIE gates.
 */

import type { CloseRecord } from "./types";

/** C-11: harmonized session-outcome join threshold across CoIE and FIE gates. */
export const JOIN_RATE_THRESHOLD = 0.95;

export interface JoinRateResult {
  rate: number;
  joined: number;
  total: number;
  threshold: number;
  passed: boolean;
}

export function computeCloseSessionJoinRate(
  closes: readonly CloseRecord[],
): JoinRateResult {
  const total = closes.length;
  const joined = closes.filter((c) => c.sessionId != null && c.sessionId !== "")
    .length;
  const rate = total === 0 ? 0 : joined / total;
  return {
    rate,
    joined,
    total,
    threshold: JOIN_RATE_THRESHOLD,
    passed: rate >= JOIN_RATE_THRESHOLD,
  };
}
