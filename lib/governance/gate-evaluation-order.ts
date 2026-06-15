/**
 * Weekly gate evaluation order (Constitutional Harmonization §1.3).
 * FIE step 1.5 inserted after data-quality gate — see C-01 / v1.1 bundle.
 */

import type { GateId } from "./gate-registry";

/** Phase A scaffold — ordered gate IDs for weekly batch evaluation. */
export const WEEKLY_GATE_EVALUATION_ORDER: readonly GateId[] = [
  "CPI-G-COIE-01",
  "CPI-G-FIE-01",
  "CPI-G-FIE-02",
  "CPI-G-FIE-03",
  "CPI-G-FIE-04",
  "CPI-G-FIE-05",
  "CPI-G-MKIE-01",
  "CPI-G-CPO-04",
  "CPI-G-COIE-07",
] as const;
