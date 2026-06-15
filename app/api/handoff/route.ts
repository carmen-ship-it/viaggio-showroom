import { NextResponse } from "next/server";

export interface HandoffApiPayload {
  customerName?: string;
  vehicle?: string;
  interestSummary?: string;
  kioskId?: string;
  comparisonViewed?: string;
  financingViewed?: string;
  topicsExplored?: string[];
  objections?: string[];
  suggestedOpening?: string;
  sessionMinutes?: number;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as HandoffApiPayload;

    const handoff = {
      id: `handoff_${Date.now()}`,
      status: "pending" as const,
      triggeredAt: new Date().toISOString(),
      temperature: "hot" as const,
      customerName: body.customerName?.trim() || "Familia Mendoza",
      vehicle: body.vehicle?.trim() || "GAC GS4 MAX GT · Gris",
      interestSummary:
        body.interestSummary?.trim() ||
        "Solicitud de asesor en vivo desde kiosco",
      kioskId: body.kioskId?.trim() || "Kiosco 1",
      comparisonViewed: body.comparisonViewed,
      financingViewed: body.financingViewed,
      topicsExplored: body.topicsExplored ?? [],
      objections: body.objections ?? [],
      suggestedOpening:
        body.suggestedOpening?.trim() ||
        "Vi tu recorrido en el kiosco — ¿en qué te ayudo?",
      persona: "mixto" as const,
      sessionMinutes: body.sessionMinutes ?? 0,
    };

    return NextResponse.json({ ok: true, handoff }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "No se pudo registrar el handoff." },
      { status: 500 },
    );
  }
}
