/**
 * MkIE endogenous event calendar types (C-03).
 * Schema authority: MARKET_INTELLIGENCE_ENGINE.md Appendix A (pending renumber).
 */

export const ENDOGENOUS_EVENT_CLASSES = [
  "ORG_EXPERIMENT",
  "CAMPAIGN_LAUNCH",
  "INCENTIVE_CHANGE",
  "CONFIG_DEPLOY",
  "STAFFING_CHANGE",
  "KNOWLEDGE_PUBLISH",
] as const;

export type EndogenousEventClass = (typeof ENDOGENOUS_EVENT_CLASSES)[number];

export type EndogenousSourceEngine =
  | "CoIE"
  | "MIE"
  | "OIE"
  | "SalespersonDNA"
  | "ExperimentGenealogy";

export interface EndogenousEvent {
  eventId: string;
  class: EndogenousEventClass;
  sourceEngine: EndogenousSourceEngine;
  scheduledAt: string;
  detectedAt?: string;
  affectedMetrics: string[];
  annotationOnly: boolean;
  coieAttestation: boolean;
  expiresAt: string;
}
