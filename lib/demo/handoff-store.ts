import type { LeadPersona, LeadTemperature } from "./operations-data";

export type HandoffStatus = "pending" | "claimed" | "completed";

export interface LiveHandoff {
  id: string;
  customerName: string;
  vehicle: string;
  temperature: LeadTemperature;
  interestSummary: string;
  kioskId: string;
  status: HandoffStatus;
  claimedBy?: string;
  triggeredAt: string;
  comparisonViewed?: string;
  financingViewed?: string;
  topicsExplored: string[];
  objections: string[];
  suggestedOpening: string;
  persona: LeadPersona;
  sessionMinutes: number;
}

export interface TriggerHandoffInput {
  customerName?: string;
  vehicle?: string;
  temperature?: LeadTemperature;
  interestSummary?: string;
  kioskId?: string;
  comparisonViewed?: string;
  financingViewed?: string;
  topicsExplored?: string[];
  objections?: string[];
  suggestedOpening?: string;
  persona?: LeadPersona;
  sessionMinutes?: number;
}

const STORAGE_KEY = "viaggio-s36-handoffs";
export const HANDOFF_SLA_SECONDS = 120;

type Listener = () => void;
const listeners = new Set<Listener>();

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readHandoffs(): LiveHandoff[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as LiveHandoff[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeHandoffs(handoffs: LiveHandoff[]): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(handoffs));
  listeners.forEach((listener) => listener());
  window.dispatchEvent(new CustomEvent("viaggio-handoff-change"));
}

export function subscribeHandoffs(listener: Listener): () => void {
  if (!isBrowser()) return () => undefined;

  listeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  const onCustom = () => listener();

  window.addEventListener("storage", onStorage);
  window.addEventListener("viaggio-handoff-change", onCustom);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("viaggio-handoff-change", onCustom);
  };
}

export function getHandoffs(): LiveHandoff[] {
  return readHandoffs();
}

export function getActiveHandoffs(): LiveHandoff[] {
  return readHandoffs().filter((h) => h.status !== "completed");
}

export function getPendingHandoffs(): LiveHandoff[] {
  return readHandoffs().filter((h) => h.status === "pending");
}

export const mendozaHandoffDefaults: TriggerHandoffInput = {
  customerName: "Familia Mendoza",
  vehicle: "GAC GS4 MAX GT · Gris",
  temperature: "hot",
  interestSummary:
    "Comparó con Corolla Cross · Cuota 36 meses · Retoma Etios 2018 · Interés en espacio familiar",
  kioskId: "Kiosco 1",
  comparisonViewed: "Toyota Corolla Cross",
  financingViewed: "36 meses · cuota orientativa USD 412",
  topicsExplored: [
    "FAQ confianza",
    "Repuestos Santa Cruz",
    "Tour Carlos · garantía",
    "ADAS · cámaras",
    "Comparación",
    "Cuota orientativa",
  ],
  objections: ["Marca china", "Repuestos locales"],
  suggestedOpening:
    "Vi que compararon el GS4 MAX con el Corolla Cross y miraron la cuota a 36 meses con retoma del Etios. ¿Quieren que preparemos la prueba con los niños o prefieren ver primero los números exactos?",
  persona: "mixto",
  sessionMinutes: 22,
};

export function buildHandoffPayload(
  input: TriggerHandoffInput = {},
): Omit<LiveHandoff, "id" | "triggeredAt" | "status"> {
  const merged = { ...mendozaHandoffDefaults, ...input };
  return {
    customerName: merged.customerName!,
    vehicle: merged.vehicle!,
    temperature: merged.temperature!,
    interestSummary: merged.interestSummary!,
    kioskId: merged.kioskId!,
    comparisonViewed: merged.comparisonViewed,
    financingViewed: merged.financingViewed,
    topicsExplored: merged.topicsExplored ?? [],
    objections: merged.objections ?? [],
    suggestedOpening: merged.suggestedOpening!,
    persona: merged.persona!,
    sessionMinutes: merged.sessionMinutes ?? 0,
  };
}

export function triggerHandoff(input: TriggerHandoffInput = {}): LiveHandoff {
  const payload = buildHandoffPayload(input);
  const handoff: LiveHandoff = {
    ...payload,
    id: `handoff-${Date.now()}`,
    triggeredAt: new Date().toISOString(),
    status: "pending",
  };

  const existing = readHandoffs().filter(
    (h) =>
      !(
        h.status === "pending" &&
        h.customerName === handoff.customerName &&
        h.kioskId === handoff.kioskId
      ),
  );

  writeHandoffs([handoff, ...existing]);
  return handoff;
}

export function claimHandoff(id: string, advisorName: string): LiveHandoff | null {
  const handoffs = readHandoffs();
  const index = handoffs.findIndex((h) => h.id === id);
  if (index === -1) return null;

  const updated: LiveHandoff = {
    ...handoffs[index],
    status: "claimed",
    claimedBy: advisorName,
  };
  handoffs[index] = updated;
  writeHandoffs(handoffs);
  return updated;
}

export function completeHandoff(id: string): LiveHandoff | null {
  const handoffs = readHandoffs();
  const index = handoffs.findIndex((h) => h.id === id);
  if (index === -1) return null;

  const updated: LiveHandoff = {
    ...handoffs[index],
    status: "completed",
  };
  handoffs[index] = updated;
  writeHandoffs(handoffs);
  return updated;
}

export function resetHandoffs(): void {
  writeHandoffs([]);
}

export function getElapsedSeconds(handoff: LiveHandoff, now = Date.now()): number {
  const started = new Date(handoff.triggeredAt).getTime();
  return Math.max(0, Math.floor((now - started) / 1000));
}

export function getSlaRemainingSeconds(
  handoff: LiveHandoff,
  now = Date.now(),
): number {
  return Math.max(0, HANDOFF_SLA_SECONDS - getElapsedSeconds(handoff, now));
}

export function isSlaBreached(handoff: LiveHandoff, now = Date.now()): boolean {
  return handoff.status === "pending" && getElapsedSeconds(handoff, now) >= HANDOFF_SLA_SECONDS;
}
