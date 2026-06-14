"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Dealership } from "@/types/dealership";
import type { Vehicle } from "@/types/vehicle";
import type { WhatsAppContext } from "@/lib/whatsapp/buildWhatsAppLink";
import { QRCodePanel } from "@/components/conversion/QRCodePanel";
import { TouchNav } from "@/components/cinematic/TouchNav";
import { formatScreenLabel } from "@/lib/config/demo-mode";
import { GlassCard } from "@/components/premium/GlassCard";
import { buildWhatsAppLink, buildWhatsAppMessage } from "@/lib/whatsapp/buildWhatsAppLink";
import { routes } from "@/lib/navigation/routes";
import { fadeUp, staggerContainer, transition } from "@/lib/motion/variants";
import {
  buildResumeUrl,
  getOrCreateResumeToken,
} from "@/lib/session/resume-token";
import { useSession } from "@/lib/session/SessionProvider";
import { trackEvent } from "@/lib/analytics/trackEvent";

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

  const [resumeToken, setResumeToken] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");

  useEffect(() => {
    recordTrustSignal("whatsapp_intent");
    trackEvent({ type: "whatsapp_click", vehicleSlug: vehicle.slug });
  }, [recordTrustSignal, vehicle.slug]);

  useEffect(() => {
    const token = getOrCreateResumeToken(vehicle.slug);
    setResumeToken(token);
    setResumeUrl(buildResumeUrl(window.location.origin, vehicle.slug, token));
  }, [vehicle.slug]);

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

  const consultantName = dealership.consultants?.[0] ?? "María Elena Vargas";

  const consultantScript =
    intent === "test_drive"
      ? "Vi tu solicitud de prueba de manejo — ¿arrancamos por confirmar día y hora?"
      : intent === "financing"
        ? "Vi que exploraste la cuota orientativa — sentémonos con financiamiento para el número exacto."
        : "Vi lo que exploraste en el showroom — ¿te ayudo con prueba de manejo o cuota?";

  return (
    <div className="flex min-h-screen flex-col bg-[var(--canvas-soft)] text-white">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(74,155,142,0.22),transparent)]" />
        <motion.div
          className="relative mx-auto w-full max-w-6xl px-6 pb-10 pt-12 md:px-12 md:pt-16"
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={transition.normal}
        >
          <p className="type-label text-[var(--color-accent-trust)]">
            {formatScreenLabel("S15 · WhatsApp")}
          </p>
          <h1 className="type-headline mt-5 max-w-3xl text-white">
            Continuá la conversación en tu celular
          </h1>
          <p className="type-kiosk-lead mt-6 max-w-2xl text-white/65">
            El kiosk comparte el contexto de tu visita. Escaneá el código o abrí
            WhatsApp — un consultor Viaggio responde con lo que ya exploraste, sin
            repetir todo desde cero.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="mx-auto grid w-full max-w-6xl flex-1 gap-8 px-6 pb-12 md:grid-cols-2 md:px-12"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.div variants={fadeUp} transition={transition.normal}>
          <QRCodePanel
            value={whatsappHref}
            label="WhatsApp · Viaggio Motors"
            hint="Escaneá con tu celular para abrir WhatsApp con el mensaje listo"
            step={1}
            size={260}
            variant="dark"
          />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[56px] flex-1 rounded-full bg-[#25D366] px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-[#25D366]/20"
            >
              Abrir WhatsApp
            </a>
            <span className="min-h-[56px] flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-6 font-mono text-sm tabular-nums text-white/80">
              {displayPhone}
            </span>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} transition={transition.normal}>
          <QRCodePanel
            value={resumeUrl || `${routes.resume(vehicle.slug)}`}
            label="Reanudar sesión (opcional)"
            hint="Guardá tu exploración para continuar después en el celular"
            step={2}
            size={220}
            variant="dark"
          />
          {resumeToken ? (
            <p className="mt-4 text-center font-mono text-xs text-white/40">
              Código · {resumeToken}
            </p>
          ) : null}
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={transition.normal}
          className="md:col-span-2"
        >
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45">
              Vista previa del mensaje
            </p>
            <pre className="mt-4 whitespace-pre-wrap font-sans text-base leading-relaxed text-white/75">
              {message}
            </pre>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={transition.normal}
          className="md:col-span-2"
        >
          <GlassCard accent="trust" variant="elevated" animate={false}>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent-trust)]">
              Handoff al consultor
            </p>
            <h2 className="mt-3 text-2xl font-light">
              Un consultor de Viaggio te atiende en breve
            </h2>
            <p className="mt-3 text-white/65">
              Usualmente menos de 2 minutos en piso. Tu sesión viaja con el lead —
              el consultor ya sabe qué temas viste y no te hace repetir el recorrido.
            </p>
            <blockquote className="mt-6 border-l-2 border-[var(--color-accent-trust)] pl-5 text-lg italic text-white/80">
              &ldquo;Hola, soy {consultantName} de Viaggio. {consultantScript}&rdquo;
            </blockquote>
            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                "Contexto de sesión adjunto al mensaje",
                "Sin formulario duplicado en piso",
                "Te contactamos por WhatsApp con tu permiso",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-white/60"
                >
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>
        </motion.div>

        <motion.div
          variants={fadeUp}
          transition={transition.normal}
          className="md:col-span-2"
        >
          <Link
            href={routes.convert(vehicle.slug)}
            className="min-h-[56px] block rounded-full border border-white/15 bg-white/[0.06] px-6 py-3.5 text-center text-base font-medium backdrop-blur-md"
          >
            Seguir explorando en el kiosk
          </Link>
        </motion.div>
      </motion.div>

      <TouchNav backHref={backHref} backLabel="Volver" />
    </div>
  );
}
