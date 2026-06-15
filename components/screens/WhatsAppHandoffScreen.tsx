"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Dealership } from "@/types/dealership";
import type { Vehicle } from "@/types/vehicle";
import type { WhatsAppContext } from "@/lib/whatsapp/buildWhatsAppLink";
import { QRCodePanel } from "@/components/conversion/QRCodePanel";
import { TouchNav } from "@/components/cinematic/TouchNav";
import {
  formatScreenLabel,
  kioskViewportShellClass,
  shouldUseWhatsappCompactLayout,
} from "@/lib/config/demo-mode";
import { buildWhatsAppLink, buildWhatsAppMessage } from "@/lib/whatsapp/buildWhatsAppLink";
import { fadeUp, transition } from "@/lib/motion/variants";
import { useSession } from "@/lib/session/SessionProvider";
import { useInteractionSound } from "@/lib/audio/useInteractionSound";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { cn } from "@/lib/utils/cn";

const TOPIC_LABELS: Record<string, string> = {
  adas: "seguridad",
  "family-comfort": "familia",
  "family-safety": "seguridad familiar",
  "warranty-terms": "garantía",
  engine: "motor",
  chassis: "chasis",
  "brand-heritage": "marca GAC",
};

interface WhatsAppHandoffScreenProps {
  vehicle: Vehicle;
  dealership: Dealership;
  backHref: string;
  intent?: WhatsAppContext["intent"];
}

export function WhatsAppHandoffScreen({
  vehicle,
  dealership,
  backHref,
  intent = "general",
}: WhatsAppHandoffScreenProps) {
  const {
    topicsVisited,
    compareTarget,
    financingSelection,
    customerName,
    recordTrustSignal,
  } = useSession();

  const { playQrReveal } = useInteractionSound();
  const qrPlayedRef = useRef(false);
  const compact = shouldUseWhatsappCompactLayout();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    recordTrustSignal("whatsapp_intent");
    trackEvent({ type: "whatsapp_click", vehicleSlug: vehicle.slug });
  }, [recordTrustSignal, vehicle.slug]);

  useEffect(() => {
    if (qrPlayedRef.current) return;
    qrPlayedRef.current = true;
    const timer = setTimeout(() => {
      playQrReveal();
      setRevealed(true);
    }, compact ? 0 : 400);
    return () => clearTimeout(timer);
  }, [playQrReveal, compact]);

  const topicLabels = topicsVisited
    .slice(0, 4)
    .map((id) => TOPIC_LABELS[id] ?? id);

  const financingNote = financingSelection
    ? `${financingSelection.trimLabel}, ${financingSelection.plazo} meses`
    : undefined;

  const whatsappContext = useMemo<WhatsAppContext>(
    () => ({
      vehicleName: vehicle.modelName,
      customerName: customerName || undefined,
      intent,
      topics: topicLabels.length ? topicLabels : undefined,
      compareTarget: compareTarget ?? undefined,
      financingNote,
    }),
    [
      vehicle.modelName,
      customerName,
      intent,
      topicLabels,
      compareTarget,
      financingNote,
    ],
  );

  const message = useMemo(
    () => buildWhatsAppMessage(whatsappContext),
    [whatsappContext],
  );

  const whatsappHref = buildWhatsAppLink(dealership, whatsappContext);
  const displayPhone = dealership.whatsapp.replace(
    /(\+591)(\d{3})(\d{3})(\d{3})/,
    "$1 $2 $3 $4",
  );

  return (
    <div className={cn("flex flex-col bg-[var(--canvas-soft)] text-white", kioskViewportShellClass())}>
      <motion.div
        className={cn(
          "relative mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 md:px-12",
          compact ? "py-8" : "py-12 md:py-16",
        )}
        initial={fadeUp.initial}
        animate={fadeUp.animate}
        transition={transition.normal}
      >
        <p className="type-label text-[var(--color-accent-trust)]">
          {formatScreenLabel("S15 · WhatsApp")}
        </p>
        <h1 className="type-headline mt-4 max-w-3xl text-white">
          {compact ? "Escaneá y listo" : "Continuá la conversación en tu celular"}
        </h1>
        <p className="type-kiosk-lead mt-4 max-w-2xl text-white/65">
          {compact
            ? "1. Escaneá el código · 2. Abrí WhatsApp con tu resumen."
            : "El kiosk comparte el contexto de tu visita. Escaneá el código o abrí WhatsApp — un consultor Viaggio responde con lo que ya exploraste."}
        </p>

        <div className={cn("mt-8 grid gap-6", compact ? "md:grid-cols-[1fr_1fr]" : "md:grid-cols-2")}>
          <QRCodePanel
            value={whatsappHref}
            label="WhatsApp · Viaggio Motors"
            hint="Escaneá con tu celular"
            step={1}
            size={compact ? 220 : 260}
            variant="dark"
          />
          <div className="flex flex-col justify-center gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[56px] rounded-full bg-[#25D366] px-6 py-3 text-center text-base font-semibold text-white shadow-lg shadow-[#25D366]/20"
            >
              Abrir WhatsApp
            </a>
            <span className="min-h-[48px] flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 font-mono text-sm tabular-nums text-white/80">
              {displayPhone}
            </span>
            {revealed ? (
              <p className="rounded-2xl border border-[var(--color-accent-trust)]/35 bg-[var(--color-accent-trust)]/10 px-5 py-4 text-center text-base text-white/85">
                Listo — podés esperar al asesor o seguir mirando el showroom.
              </p>
            ) : null}
          </div>
        </div>

        {!compact ? (
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">
              Vista previa del mensaje
            </p>
            <pre className="mt-4 whitespace-pre-wrap font-sans text-base leading-relaxed text-white/75">
              {message}
            </pre>
          </div>
        ) : null}
      </motion.div>

      <TouchNav backHref={backHref} backLabel="Volver" className="shrink-0" />
    </div>
  );
}
