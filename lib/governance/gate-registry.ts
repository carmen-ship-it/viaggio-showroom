/**
 * Canonical CPI-G-* gate registry (RC-13 scaffold).
 * Authoritative definitions: CPI_OS_CONSTITUTIONAL_HARMONIZATION.md Part 1.
 * EB-001: CPI-G-{DOMAIN}-{NN} is the only valid gate namespace in code.
 */

export const GATE_DOMAINS = [
  "COIE",
  "CPO",
  "ERE",
  "MKIE",
  "FED",
  "IBS",
  "DNA",
  "FIE",
  "KL",
] as const;

export type GateDomain = (typeof GATE_DOMAINS)[number];

export type GateId = `CPI-G-${GateDomain}-${string}`;

export interface GateDefinition {
  id: GateId;
  domain: GateDomain;
  owner: string;
  purpose: string;
}

/** Phase A scaffold — populated in B-01 (gate registry runtime). */
export const GATE_REGISTRY: readonly GateDefinition[] = [];

export function isGateDomain(value: string): value is GateDomain {
  return (GATE_DOMAINS as readonly string[]).includes(value);
}

export function parseGateId(id: string): { domain: GateDomain; sequence: string } | null {
  const match = /^CPI-G-(COIE|CPO|ERE|MKIE|FED|IBS|DNA|FIE|KL)-(\d{2})$/.exec(id);
  if (!match) return null;
  return { domain: match[1] as GateDomain, sequence: match[2] };
}
