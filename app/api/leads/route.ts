import { NextResponse } from "next/server";

export interface LeadPayload {
  type: "test_drive";
  name: string;
  phone: string;
  email?: string;
  vehicleSlug: string;
  preferredDate?: string;
  preferredTime?: string;
  spouseAttending?: boolean;
  childrenAttending?: boolean;
  childSeat?: string;
  routePreference?: string;
  sessionContext?: Record<string, unknown>;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadPayload;

    if (!body.name?.trim() || !body.phone?.trim()) {
      return NextResponse.json(
        { error: "Nombre y teléfono son requeridos." },
        { status: 400 },
      );
    }

    const lead = {
      id: `lead_${Date.now()}`,
      status: "new",
      createdAt: new Date().toISOString(),
      ...body,
    };

    return NextResponse.json({ ok: true, lead }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "No se pudo procesar la solicitud." },
      { status: 500 },
    );
  }
}
