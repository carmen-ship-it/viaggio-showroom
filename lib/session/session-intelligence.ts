import type { FinancingSelection } from "./SessionProvider";

export const TOPIC_LABELS: Record<string, string> = {
  adas: "Seguridad ADAS",
  "family-comfort": "Espacio familiar",
  "family-safety": "Seguridad familiar",
  "warranty-terms": "Garantía y repuestos",
  "brand-heritage": "Confianza en marca GAC",
  engine: "Motor",
  chassis: "Chasis",
  "daily-driving": "Manejo diario",
  children: "Los chicos",
  "family-trips": "Viajes en familia",
  "china-brand": "Marca china",
  "parts-service": "Repuestos locales",
};

export interface SessionSnapshot {
  topicsVisited: string[];
  compareTarget: string | null;
  financingSelection: FinancingSelection | null;
  financingInterestFlagged: boolean;
  trustSignals: number;
  customerName?: string;
  vehicleName?: string;
}

export interface MemoryChip {
  id: string;
  label: string;
  category: "topic" | "compare" | "financing" | "objection" | "trust";
}

export interface SessionIntelligence {
  interestSummary: string;
  objections: string[];
  suggestedOpening: string;
  memoryChips: MemoryChip[];
  topicsExplored: string[];
  memoryCount: number;
}

const FAQ_TOPIC_MAP: Record<string, { topicId: string; objection?: string }> = {
  "china-brand": { topicId: "brand-heritage", objection: "Marca china" },
  "parts-service": { topicId: "warranty-terms", objection: "Repuestos locales" },
  warranty: { topicId: "warranty-terms", objection: "Garantía postventa" },
  resale: { topicId: "brand-heritage" },
};

export function mapFaqItemToTopic(faqItemId: string): {
  topicId: string;
  objection?: string;
} | null {
  return FAQ_TOPIC_MAP[faqItemId] ?? null;
}

export function deriveObjections(snapshot: SessionSnapshot): string[] {
  const objections: string[] = [];

  if (
    snapshot.topicsVisited.includes("brand-heritage") ||
    snapshot.topicsVisited.includes("china-brand")
  ) {
    objections.push("Marca china");
  }

  if (
    snapshot.topicsVisited.includes("warranty-terms") ||
    snapshot.topicsVisited.includes("parts-service")
  ) {
    objections.push("Repuestos locales");
  }

  if (snapshot.compareTarget) {
    objections.push(`Comparación con ${snapshot.compareTarget}`);
  }

  if (snapshot.financingSelection || snapshot.financingInterestFlagged) {
    objections.push("Cuota mensual");
  }

  if (
    snapshot.topicsVisited.includes("family-comfort") ||
    snapshot.topicsVisited.includes("family-safety") ||
    snapshot.topicsVisited.includes("adas")
  ) {
    objections.push("Seguridad familiar");
  }

  return [...new Set(objections)].slice(0, 4);
}

export function buildInterestSummary(snapshot: SessionSnapshot): string {
  const parts: string[] = [];

  if (snapshot.compareTarget) {
    parts.push(`Comparó con ${snapshot.compareTarget}`);
  }

  if (snapshot.financingSelection) {
    parts.push(
      `${snapshot.financingSelection.trimLabel} · ${snapshot.financingSelection.plazo} meses`,
    );
  } else if (snapshot.financingInterestFlagged) {
    parts.push("Cuota a confirmar");
  }

  if (
    snapshot.topicsVisited.includes("family-comfort") ||
    snapshot.topicsVisited.includes("family-safety")
  ) {
    parts.push("Interés en espacio familiar");
  }

  if (snapshot.topicsVisited.includes("adas")) {
    parts.push("Exploró ADAS");
  }

  if (snapshot.trustSignals >= 2) {
    parts.push("Confianza explorada");
  }

  return parts.length ? parts.join(" · ") : "Recorrido showroom";
}

export function buildSuggestedOpening(snapshot: SessionSnapshot): string {
  const vehicle = snapshot.vehicleName ?? "GS4 MAX";
  const cues: string[] = [];

  if (snapshot.compareTarget) {
    cues.push(`compararon el ${vehicle} con el ${snapshot.compareTarget}`);
  }

  if (snapshot.financingSelection) {
    cues.push(
      `miraron la cuota a ${snapshot.financingSelection.plazo} meses en ${snapshot.financingSelection.trimLabel}`,
    );
  } else if (snapshot.financingInterestFlagged) {
    cues.push("pidieron orientación sobre la cuota");
  }

  if (
    snapshot.topicsVisited.includes("family-comfort") ||
    snapshot.topicsVisited.includes("family-safety")
  ) {
    cues.push("les interesa el espacio para la familia");
  }

  if (snapshot.topicsVisited.includes("adas")) {
    cues.push("revisaron la seguridad ADAS");
  }

  if (cues.length === 0) {
    return `Vi que recorrieron el ${vehicle} en el kiosco. ¿Quieren que les preparemos una prueba de manejo o prefieren ver primero los números exactos?`;
  }

  const familyHint =
    snapshot.topicsVisited.includes("family-comfort") ||
    snapshot.topicsVisited.includes("family-safety")
      ? " con la familia"
      : "";

  return `Vi que ${cues.join(" y ")}. ¿Quieren que preparemos la prueba${familyHint} o prefieren ver primero los números exactos?`;
}

export function buildMemoryChips(snapshot: SessionSnapshot): MemoryChip[] {
  const chips: MemoryChip[] = [];

  snapshot.topicsVisited.slice(0, 5).forEach((topicId) => {
    chips.push({
      id: `topic-${topicId}`,
      label: TOPIC_LABELS[topicId] ?? topicId,
      category: "topic",
    });
  });

  if (snapshot.compareTarget) {
    chips.push({
      id: "compare",
      label: `vs ${snapshot.compareTarget}`,
      category: "compare",
    });
  }

  if (snapshot.financingSelection) {
    chips.push({
      id: "financing",
      label: `${snapshot.financingSelection.trimLabel} · ${snapshot.financingSelection.plazo} meses`,
      category: "financing",
    });
  } else if (snapshot.financingInterestFlagged) {
    chips.push({
      id: "financing-intent",
      label: "Cuota a confirmar",
      category: "financing",
    });
  }

  deriveObjections(snapshot).forEach((objection, index) => {
    chips.push({
      id: `objection-${index}`,
      label: objection,
      category: "objection",
    });
  });

  if (snapshot.trustSignals >= 2) {
    chips.push({
      id: "trust",
      label: "Confianza explorada",
      category: "trust",
    });
  }

  return chips;
}

export function buildSessionIntelligence(snapshot: SessionSnapshot): SessionIntelligence {
  const topicsExplored = snapshot.topicsVisited.map(
    (id) => TOPIC_LABELS[id] ?? id,
  );
  const memoryChips = buildMemoryChips(snapshot);

  return {
    interestSummary: buildInterestSummary(snapshot),
    objections: deriveObjections(snapshot),
    suggestedOpening: buildSuggestedOpening(snapshot),
    memoryChips,
    topicsExplored,
    memoryCount: memoryChips.length,
  };
}
