export type LeadTemperature = "hot" | "warm" | "cold";

export type LeadPersona = "tecnico" | "familiar" | "valor" | "mixto";

export interface LeadRequestedAction {
  id: string;
  label: string;
  urgent?: boolean;
}

export interface OperationsLead {
  id: string;
  customerName: string;
  temperature: LeadTemperature;
  kioskId: string;
  vehicleViewed: string;
  comparisonViewed?: string;
  financingViewed?: string;
  persona: LeadPersona;
  topicsExplored: string[];
  objections: string[];
  suggestedOpening: string;
  requestedActions: LeadRequestedAction[];
  waitSeconds: number;
  sessionMinutes: number;
  claimedBy?: string;
  notes?: string;
}

export interface KioskSession {
  id: string;
  kioskLabel: string;
  customerLabel: string;
  vehicle: string;
  depthMinutes: number;
  temperature: LeadTemperature;
  currentScreen: string;
  staffAssigned?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  status: "available" | "with_customer" | "test_drive" | "break";
  leadsHandled: number;
  avgResponseSeconds: number;
  slaCompliance: number;
}

export interface FunnelStage {
  label: string;
  count: number;
  rate?: number;
}

export interface WeeklyTrendPoint {
  day: string;
  visits: number;
  leads: number;
  testDrives: number;
  sales: number;
}

export interface ObjectionStat {
  label: string;
  count: number;
  trend: "up" | "down" | "stable";
}

export interface CompetitorStat {
  name: string;
  comparisons: number;
  wins: number;
  losses: number;
}

export const dealershipMeta = {
  name: "Viaggio Motors",
  location: "Av. Banzer, Santa Cruz",
  brand: "GAC Motor Bolivia",
  shiftLabel: "Sábado · Turno mañana",
  reportWeek: "10 – 15 Jun 2026",
} as const;

export const staffUser = {
  name: "Javier Ríos",
  role: "Asesor de ventas",
  initials: "JR",
} as const;

export const managerUser = {
  name: "Patricia Vargas",
  role: "Gerente comercial",
  initials: "PV",
} as const;

export const executiveMeta = {
  period: "Semana del 10 al 15 de junio",
  preparedFor: "Dirección · Viaggio Motors",
} as const;

export const operationsLeads: OperationsLead[] = [
  {
    id: "lead-mendoza",
    customerName: "Familia Mendoza",
    temperature: "hot",
    kioskId: "Kiosco 1",
    vehicleViewed: "GAC GS4 MAX GT · Gris",
    comparisonViewed: "Toyota Corolla Cross",
    financingViewed: "36 meses · cuota orientativa USD 412",
    persona: "mixto",
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
    requestedActions: [
      { id: "advisor", label: "Quiero hablar con un asesor ahora", urgent: true },
      { id: "test-drive", label: "Agendar prueba de manejo" },
    ],
    waitSeconds: 0,
    sessionMinutes: 22,
  },
  {
    id: "lead-vargas",
    customerName: "Martín Vargas",
    temperature: "hot",
    kioskId: "Kiosco 2",
    vehicleViewed: "GAC GS4 MAX GT · Blanco",
    comparisonViewed: "Hyundai Tucson",
    financingViewed: "48 meses · cuota orientativa USD 368",
    persona: "tecnico",
    topicsExplored: [
      "Retomó sesión QR",
      "Especificaciones motor",
      "Comparación Tucson",
      "Financiamiento",
    ],
    objections: ["Tasa de interés"],
    suggestedOpening:
      "Martín, vi que retomaste la sesión del viernes y ya comparaste con el Tucson. ¿Arrancamos con la prueba de las 11:30 o preferís cerrar números primero?",
    requestedActions: [
      { id: "test-drive", label: "Prueba de manejo solicitada", urgent: true },
    ],
    waitSeconds: 48,
    sessionMinutes: 14,
    claimedBy: "Lucía Fernández",
  },
  {
    id: "lead-mendez",
    customerName: "Laura Méndez",
    temperature: "warm",
    kioskId: "Kiosco 2",
    vehicleViewed: "GAC GS4 MAX GL",
    comparisonViewed: "Toyota Corolla Cross",
    financingViewed: "Costo mensual estimado",
    persona: "familiar",
    topicsExplored: ["Tour Diego", "Espacio trasero", "Comparación", "TCO"],
    objections: ["Reventa"],
    suggestedOpening:
      "Laura, exploraste bastante el espacio familiar y la comparación con Corolla Cross. ¿Te ayudo a ver la unidad en piso o preferís una cotización orientativa?",
    requestedActions: [{ id: "explore", label: "Exploración profunda · sin datos" }],
    waitSeconds: 0,
    sessionMinutes: 18,
  },
  {
    id: "lead-quiroga",
    customerName: "Ana Quiroga",
    temperature: "warm",
    kioskId: "Kiosco 1",
    vehicleViewed: "GAC GS4 MAX GT",
    financingViewed: "24 y 36 meses",
    persona: "valor",
    topicsExplored: ["Tour Sofía", "Equipamiento", "Cuota orientativa"],
    objections: ["Precio de contado"],
    suggestedOpening:
      "Ana, vi que revisaste equipamiento y cuotas. ¿Querés que veamos versiones con mejor relación precio-equipo?",
    requestedActions: [{ id: "financing", label: "Interés en financiamiento" }],
    waitSeconds: 0,
    sessionMinutes: 11,
  },
  {
    id: "lead-erazo",
    customerName: "Visitante anónimo",
    temperature: "cold",
    kioskId: "Kiosco 2",
    vehicleViewed: "GAC GS4 MAX",
    persona: "valor",
    topicsExplored: ["Héroe", "Galería breve"],
    objections: [],
    suggestedOpening:
      "Sesión superficial — dejar explorar. Ofrecer ayuda solo si se detiene más de 5 minutos en un tema.",
    requestedActions: [],
    waitSeconds: 0,
    sessionMinutes: 4,
  },
];

export const activeKioskSessions: KioskSession[] = [
  {
    id: "sess-1",
    kioskLabel: "Kiosco 1",
    customerLabel: "Familia Mendoza",
    vehicle: "GS4 MAX GT",
    depthMinutes: 22,
    temperature: "hot",
    currentScreen: "Conversión · Asesor ahora",
    staffAssigned: undefined,
  },
  {
    id: "sess-2",
    kioskLabel: "Kiosco 2",
    customerLabel: "Martín Vargas",
    vehicle: "GS4 MAX GT",
    depthMinutes: 14,
    temperature: "hot",
    currentScreen: "Prueba de manejo",
    staffAssigned: "Lucía Fernández",
  },
  {
    id: "sess-3",
    kioskLabel: "Kiosco 2",
    customerLabel: "Laura Méndez",
    vehicle: "GS4 MAX GL",
    depthMinutes: 18,
    temperature: "warm",
    currentScreen: "Comparación · Corolla Cross",
  },
  {
    id: "sess-4",
    kioskLabel: "Kiosco 1",
    customerLabel: "Ana Quiroga",
    vehicle: "GS4 MAX GT",
    depthMinutes: 11,
    temperature: "warm",
    currentScreen: "Financiamiento",
  },
];

export const staffRoster: StaffMember[] = [
  {
    id: "javier",
    name: "Javier Ríos",
    status: "with_customer",
    leadsHandled: 4,
    avgResponseSeconds: 98,
    slaCompliance: 96,
  },
  {
    id: "lucia",
    name: "Lucía Fernández",
    status: "test_drive",
    leadsHandled: 3,
    avgResponseSeconds: 80,
    slaCompliance: 100,
  },
  {
    id: "diego",
    name: "Diego Salazar",
    status: "available",
    leadsHandled: 2,
    avgResponseSeconds: 112,
    slaCompliance: 88,
  },
  {
    id: "patricia",
    name: "Patricia Gómez",
    status: "with_customer",
    leadsHandled: 1,
    avgResponseSeconds: 0,
    slaCompliance: 100,
  },
];

export const testDrivesToday = [
  {
    time: "10:00",
    customer: "Familia Mendoza",
    vehicle: "GS4 MAX GT Gris",
    advisor: "Javier Ríos",
    status: "completada" as const,
  },
  {
    time: "11:30",
    customer: "Martín Vargas",
    vehicle: "GS4 MAX GT Blanco",
    advisor: "Lucía Fernández",
    status: "en_curso" as const,
  },
  {
    time: "15:00",
    customer: "Laura Méndez",
    vehicle: "GS4 MAX GL",
    advisor: "Diego Salazar",
    status: "confirmada" as const,
  },
];

export const conversionFunnel: FunnelStage[] = [
  { label: "Sesiones kiosco", count: 23, rate: 100 },
  { label: "Leads capturados", count: 11, rate: 48 },
  { label: "Calificados", count: 7, rate: 64 },
  { label: "Pruebas de manejo", count: 6, rate: 86 },
  { label: "Ventas atribuidas", count: 3, rate: 50 },
];

export const slaMetrics = {
  hotLeadsWaiting: 1,
  avgHotResponse: "1 min 48 seg",
  slaTarget: "2 min",
  slaCompliance: 94,
  unattendedHandoffs: 0,
  escalationsToday: 0,
};

export const temperatureDistribution = {
  hot: 2,
  warm: 5,
  cold: 4,
};

export const executiveKpis = {
  visits: { value: 118, delta: "+12%", label: "Visitas digitales" },
  leads: { value: 47, delta: "+9%", label: "Leads capturados" },
  testDrives: { value: 22, delta: "+18%", label: "Pruebas de manejo" },
  sales: { value: 8, delta: "+2", label: "Ventas atribuidas" },
  revenue: {
    value: 284500,
    currency: "USD",
    delta: "+15%",
    label: "Ingresos atribuidos",
  },
  hotSla: { value: 94, delta: "+6 pts", label: "Calientes atendidos a tiempo" },
};

export const topObjections: ObjectionStat[] = [
  { label: "Reventa / valor residual", count: 19, trend: "up" },
  { label: "Repuestos en Santa Cruz", count: 16, trend: "stable" },
  { label: "Marca china / confianza", count: 14, trend: "down" },
  { label: "Financiamiento / tasa", count: 11, trend: "up" },
  { label: "Precio de contado", count: 8, trend: "stable" },
];

export const topCompetitors: CompetitorStat[] = [
  { name: "Toyota Corolla Cross", comparisons: 31, wins: 18, losses: 9 },
  { name: "Hyundai Tucson", comparisons: 12, wins: 5, losses: 5 },
  { name: "Haval H6", comparisons: 7, wins: 4, losses: 2 },
  { name: "Chery Tiggo 8", comparisons: 5, wins: 3, losses: 1 },
];

export const weeklyTrends: WeeklyTrendPoint[] = [
  { day: "Lun", visits: 14, leads: 5, testDrives: 2, sales: 1 },
  { day: "Mar", visits: 18, leads: 7, testDrives: 3, sales: 1 },
  { day: "Mié", visits: 16, leads: 6, testDrives: 2, sales: 1 },
  { day: "Jue", visits: 21, leads: 9, testDrives: 4, sales: 1 },
  { day: "Vie", visits: 26, leads: 9, testDrives: 5, sales: 2 },
  { day: "Sáb", visits: 23, leads: 11, testDrives: 6, sales: 2 },
];

export const executiveInsights = [
  "Tucson apareció dos veces en comparaciones perdidas — preparar respuesta de valor, no solo precio.",
  "Sesiones con comparación honesta cierran 22% más que las que no comparan.",
  "Viernes: pico de tráfico QR con bajo cierre — reforzar personal en piso 17:00–19:00.",
  "Resumen familiar activó decisor secundario en 3 de 5 ventas de la semana.",
];

export function sortLeadsByPriority(leads: OperationsLead[]): OperationsLead[] {
  const order: Record<LeadTemperature, number> = { hot: 0, warm: 1, cold: 2 };
  return [...leads].sort((a, b) => {
    const tempDiff = order[a.temperature] - order[b.temperature];
    if (tempDiff !== 0) return tempDiff;
    return b.waitSeconds - a.waitSeconds;
  });
}

export function formatWaitTimer(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function formatCurrencyUsd(amount: number): string {
  return new Intl.NumberFormat("es-BO", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export const temperatureLabels: Record<LeadTemperature, string> = {
  hot: "Caliente",
  warm: "Tibio",
  cold: "Frío",
};

export const personaLabels: Record<LeadPersona, string> = {
  tecnico: "Técnico",
  familiar: "Familiar",
  valor: "Valor",
  mixto: "Técnico-familiar",
};
