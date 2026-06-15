"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { TestDriveFormContent } from "@/lib/content/shared";
import type { Dealership } from "@/types/dealership";
import type { Vehicle } from "@/types/vehicle";
import { MediaSurface } from "@/components/media/MediaSurface";
import { TouchNav } from "@/components/cinematic/TouchNav";
import {
  formatScreenLabel,
  shouldDisableExplorationBranches,
  shouldUseConversionFocusMode,
  kioskViewportShellClass,
} from "@/lib/config/demo-mode";
import {
  AdvisorIcon,
  CalendarIcon,
  ChatIcon,
  ConversionPathCard,
  FinanceIcon,
  SessionRecap,
  ShareIcon,
} from "@/components/conversion/ConversionParts";
import { ConsultantHandoffModal } from "@/components/handoff/ConsultantHandoffModal";
import { useHandoffStore } from "@/lib/demo/use-handoff-store";
import { routes } from "@/lib/navigation/routes";
import { fadeUp, staggerContainer, transition } from "@/lib/motion/variants";
import { useSession } from "@/lib/session/SessionProvider";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { cn } from "@/lib/utils/cn";

interface ConversionHubScreenProps {
  vehicle: Vehicle;
  dealership: Dealership;
  formContent: TestDriveFormContent;
  backHref: string;
}

const TOPIC_LABELS: Record<string, string> = {
  adas: "Seguridad ADAS",
  "family-comfort": "Espacio familiar",
  "family-safety": "Seguridad familiar",
  "warranty-terms": "Garantía",
  engine: "Motor",
  chassis: "Chasis",
  "brand-heritage": "Marca GAC",
  "daily-driving": "Manejo diario",
  children: "Los chicos",
  "family-trips": "Viajes en familia",
};

export function ConversionHubScreen(props: ConversionHubScreenProps) {
  const { vehicle, dealership, backHref } = props;
  const {
    topicsVisited,
    compareTarget,
    financingSelection,
    financingInterestFlagged,
    trustSignals,
    recordTrustSignal,
    customerName,
  } = useSession();
  const hideExploration = shouldDisableExplorationBranches();
  const focusMode = shouldUseConversionFocusMode();
  const { trigger, activeHandoffs, now } = useHandoffStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [activeHandoffId, setActiveHandoffId] = useState<string | null>(null);

  const activeHandoff =
    activeHandoffs.find((h) => h.id === activeHandoffId) ??
    (customerName
      ? activeHandoffs.find((h) => h.customerName === customerName)
      : null) ??
    null;

  const handleAdvisorRequest = useCallback(() => {
    const financingLabel = financingSelection
      ? `${financingSelection.trimLabel} · ${financingSelection.plazo} meses`
      : financingInterestFlagged
        ? "Cuota a confirmar"
        : null;

    const interestParts = [
      compareTarget ? `Comparó con ${compareTarget}` : null,
      financingLabel,
      topicsVisited.includes("family-comfort") || topicsVisited.includes("family-safety")
        ? "Interés en espacio familiar"
        : null,
    ].filter(Boolean);

    const displayName = customerName || "Visitante en piso";

    const handoff = trigger({
      customerName: displayName,
      vehicle: `${vehicle.modelName}`,
      comparisonViewed: compareTarget ?? undefined,
      financingViewed: financingLabel ?? undefined,
      interestSummary: interestParts.length ? interestParts.join(" · ") : "Recorrido showroom",
      topicsExplored: topicsVisited.map((id) => TOPIC_LABELS[id] ?? id),
      sessionMinutes: Math.max(8, topicsVisited.length * 2),
    });

    setActiveHandoffId(handoff.id);
    setModalOpen(true);

    trackEvent({
      type: "consultant_handoff",
      vehicleSlug: vehicle.slug,
      metadata: { source: "s13-cta", handoffId: handoff.id },
    });

    void fetch("/api/handoff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: handoff.customerName,
        vehicle: handoff.vehicle,
        interestSummary: handoff.interestSummary,
        comparisonViewed: handoff.comparisonViewed,
        financingViewed: handoff.financingViewed,
        topicsExplored: handoff.topicsExplored,
        sessionMinutes: handoff.sessionMinutes,
      }),
    }).catch(() => undefined);
  }, [
    compareTarget,
    customerName,
    financingInterestFlagged,
    financingSelection,
    topicsVisited,
    trigger,
    vehicle.modelName,
    vehicle.slug,
  ]);

  useEffect(() => {
    recordTrustSignal("conversion_hub");
    trackEvent({ type: "conversion_hub_viewed", vehicleSlug: vehicle.slug });
  }, [recordTrustSignal, vehicle.slug]);

  const recapChips = useMemo(() => {
    const chips: { id: string; label: string }[] = [];

    topicsVisited.slice(0, 4).forEach((topicId) => {
      chips.push({
        id: `topic-${topicId}`,
        label: TOPIC_LABELS[topicId] ?? topicId,
      });
    });

    if (compareTarget) {
      chips.push({ id: "compare", label: `vs ${compareTarget}` });
    }

    if (financingSelection) {
      chips.push({
        id: "financing",
        label: `${financingSelection.trimLabel} · ${financingSelection.plazo} meses`,
      });
    }

    if (financingInterestFlagged) {
      chips.push({ id: "financing-intent", label: "Cuota a confirmar" });
    }

    if (trustSignals >= 2) {
      chips.push({ id: "trust", label: "Confianza explorada" });
    }

    return chips;
  }, [
    topicsVisited,
    compareTarget,
    financingSelection,
    financingInterestFlagged,
    trustSignals,
  ]);

  return (
    <div className={cn("flex flex-col bg-[var(--canvas-soft)]", kioskViewportShellClass())}>
      <div className={cn("relative overflow-hidden", focusMode ? "shrink-0" : "")}>
        <div className="absolute inset-0">
          <MediaSurface
            mediaId={vehicle.heroMediaId ?? `${vehicle.slug}-hero`}
            className="h-full w-full opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--canvas-soft)] via-[var(--canvas-soft)]/90 to-[var(--canvas-soft)]" />
        </div>

        <motion.div
          className={cn(
            "relative z-10 px-6 md:px-12",
            focusMode ? "pb-4 pt-8 md:pt-10" : "pb-8 pt-10 md:pt-14",
          )}
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={transition.normal}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="type-label text-[var(--color-accent-trust)]">
                {formatScreenLabel("S13 · Tu recorrido")}
              </p>
              <h1 className="type-headline mt-4 text-white">
                ¿Cómo querés dar el siguiente paso?
              </h1>
              <p className={cn("type-kiosk-lead text-white/65", focusMode ? "mt-3" : "mt-5")}>
                Elegí la forma que te resulte más cómoda. Sin presión — un consultor
                Viaggio te acompaña cuando quieras.
              </p>
            </div>
            {!focusMode ? (
              <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-xl border border-white/10 md:h-28 md:w-48">
                <MediaSurface
                  mediaId={vehicle.heroMediaId ?? `${vehicle.slug}-hero`}
                  className="absolute inset-0"
                  animate={false}
                />
              </div>
            ) : null}
          </div>

          <div
            className={cn(
              "rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md",
              focusMode ? "mt-5 p-4" : "mt-10 p-7",
            )}
          >
            <p className="type-label text-white/45">Resumen de sesión</p>
            <div className={cn(focusMode ? "mt-2" : "mt-4")}>
              <SessionRecap chips={recapChips} />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className={cn(
          "grid flex-1 gap-5 px-6 md:px-[var(--spacing-kiosk)]",
          focusMode
            ? "mx-auto w-full max-w-4xl grid-cols-1 content-center py-6 md:grid-cols-2 md:py-8"
            : hideExploration
              ? "mx-auto w-full max-w-3xl md:grid-cols-1 md:py-12 py-10"
              : "md:grid-cols-2 md:px-12 md:py-12 py-10",
        )}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {!hideExploration ? (
          <motion.div variants={fadeUp} transition={transition.normal}>
            <ConversionPathCard
              href={routes.financing(vehicle.slug)}
              icon={<FinanceIcon />}
              title="Ver cuota orientativa"
              description="Rangos referenciales por versión y plazo — tu consultor confirma la tasa exacta."
              variant="dark"
            />
          </motion.div>
        ) : null}
        <motion.div variants={fadeUp} transition={transition.normal}>
          <ConversionPathCard
            icon={<AdvisorIcon />}
            title="Hablar con un asesor ahora"
            description="Un consultor de Viaggio viene al kiosco — usualmente en menos de 2 minutos."
            onClick={handleAdvisorRequest}
            highlightPrimary
            variant="dark"
            size={focusMode ? "focusPrimary" : "default"}
          />
        </motion.div>
        <motion.div variants={fadeUp} transition={transition.normal}>
          <ConversionPathCard
            href={routes.testDrive(vehicle.slug)}
            icon={<CalendarIcon />}
            title="Agendá tu prueba de manejo"
            description="20–30 minutos, familia bienvenida. Probamos en Doble Vía con A/C si hace calor."
            highlightPrimary={!focusMode}
            variant="dark"
            size={focusMode ? "focus" : "default"}
          />
        </motion.div>
        {!focusMode ? (
          <motion.div variants={fadeUp} transition={transition.normal}>
            <ConversionPathCard
              href={routes.whatsapp(vehicle.slug)}
              icon={<ChatIcon />}
              title="Escribinos por WhatsApp"
              description="Continuá la conversación con contexto de lo que exploraste en el showroom."
              variant="dark"
            />
          </motion.div>
        ) : null}
        {!hideExploration ? (
          <motion.div variants={fadeUp} transition={transition.normal}>
            <ConversionPathCard
              href={routes.share(vehicle.slug)}
              icon={<ShareIcon />}
              title="Compartir con tu familia"
              description="Enviá un resumen a tu pareja por WhatsApp o QR para decidir juntos."
              variant="dark"
            />
          </motion.div>
        ) : null}
      </motion.div>

      {!focusMode ? (
        <footer className="border-t border-white/10 px-6 py-8 md:px-[var(--spacing-kiosk)]">
          <div className="mx-auto max-w-4xl text-base text-white/50">
            <p className="font-medium text-white/70">{dealership.name}</p>
            <p className="mt-2">{dealership.address}</p>
            <p className="mt-1">
              {dealership.hours.weekdays} · {dealership.hours.saturday}
            </p>
          </div>
        </footer>
      ) : null}

      <TouchNav
        backHref={backHref}
        backLabel="Seguir explorando"
        {...(focusMode
          ? {
              nextHref: routes.whatsapp(vehicle.slug),
              nextLabel: "WhatsApp con contexto",
            }
          : {})}
      />

      <ConsultantHandoffModal
        open={modalOpen}
        handoff={activeHandoff}
        now={now}
        onContinueExploring={() => setModalOpen(false)}
      />
    </div>
  );
}
