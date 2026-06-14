import type { Dealership } from "@/types/dealership";

export interface WhatsAppContext {
  vehicleName: string;
  customerName?: string;
  intent?: "test_drive" | "financing" | "general" | "family_share";
  topics?: string[];
  compareTarget?: string;
  financingNote?: string;
}

const INTENT_LABELS: Record<NonNullable<WhatsAppContext["intent"]>, string> = {
  test_drive: "prueba de manejo",
  financing: "información de financiamiento y cuota",
  general: "información y precio",
  family_share: "decidir en familia sobre el GS4 MAX",
};

export function buildWhatsAppMessage(ctx: WhatsAppContext): string {
  const intent = ctx.intent ?? "general";
  const lines = [
    `Hola Viaggio, exploré el ${ctx.vehicleName} en el showroom digital.`,
    `Me interesa: ${INTENT_LABELS[intent]}.`,
  ];

  if (ctx.topics?.length) {
    lines.push(`Temas que vi: ${ctx.topics.join(", ")}.`);
  }
  if (ctx.compareTarget) {
    lines.push(`Comparé con: ${ctx.compareTarget}.`);
  }
  if (ctx.financingNote) {
    lines.push(`Financiamiento: ${ctx.financingNote}.`);
  }
  if (ctx.customerName) {
    lines.push(`Mi nombre: ${ctx.customerName}`);
  }

  return lines.join("\n");
}

export function buildWhatsAppLink(
  dealership: Dealership,
  ctx: WhatsAppContext,
): string {
  const phone = dealership.whatsapp.replace(/\D/g, "");
  const text = encodeURIComponent(buildWhatsAppMessage(ctx));
  return `https://wa.me/${phone}?text=${text}`;
}
