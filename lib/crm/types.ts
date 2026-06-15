/**
 * CRM financial system-of-record types (EB-002).
 * Close records require session join for constitutional join gates (C-06, C-11).
 */

export interface CloseRecord {
  closeId: string;
  sessionId: string | null;
  lost_reason: string | null;
  grossProfitTruth: number | null;
  closedAt: string;
  outcome: "won" | "lost";
}
