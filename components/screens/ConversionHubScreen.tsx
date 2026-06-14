"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import type { TestDriveFormContent } from "@/lib/content/shared";
import type { Dealership } from "@/types/dealership";
import type { Vehicle } from "@/types/vehicle";
import { MediaSurface } from "@/components/media/MediaSurface";
import { TouchNav } from "@/components/cinematic/TouchNav";
import {
  formatScreenLabel,
  shouldDisableExplorationBranches,
} from "@/lib/config/demo-mode";
import {
  CalendarIcon,
  ChatIcon,
  ConversionPathCard,
  FinanceIcon,
  SessionRecap,
  ShareIcon,
} from "@/components/conversion/ConversionParts";
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
  } = useSession();
  const hideExploration = shouldDisableExplorationBranches();

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
    <div className="flex min-h-screen flex-col bg-[var(--canvas-soft)]">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <MediaSurface
            mediaId={vehicle.heroMediaId ?? `${vehicle.slug}-hero`}
            className="h-full w-full opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--canvas-soft)] via-[var(--canvas-soft)]/90 to-[var(--canvas-soft)]" />
        </div>

        <motion.div
          className="relative z-10 px-6 pb-8 pt-10 md:px-12 md:pt-14"
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
              <p className="type-kiosk-lead mt-5 text-white/65">
                Elegí la forma que te resulte más cómoda. Sin presión — un consultor
                Viaggio te acompaña cuando quieras.
              </p>
            </div>
            <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-xl border border-white/10 md:h-28 md:w-48">
              <MediaSurface
                mediaId={vehicle.heroMediaId ?? `${vehicle.slug}-hero`}
                className="absolute inset-0"
                animate={false}
              />
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-md">
            <p className="type-label text-white/45">
              Resumen de sesión
            </p>
            <div className="mt-4">
              <SessionRecap chips={recapChips} />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className={cn(
          "grid flex-1 gap-5 px-6 py-10 md:px-[var(--spacing-kiosk)] md:py-12",
          hideExploration
            ? "mx-auto w-full max-w-3xl md:grid-cols-1"
            : "md:grid-cols-2 md:px-12",
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
            href={routes.testDrive(vehicle.slug)}
            icon={<CalendarIcon />}
            title="Agendá tu prueba de manejo"
            description="20–30 minutos, familia bienvenida. Probamos en Doble Vía con A/C si hace calor."
            highlightPrimary
            variant="dark"
          />
        </motion.div>
        <motion.div variants={fadeUp} transition={transition.normal}>
          <ConversionPathCard
            href={routes.whatsapp(vehicle.slug)}
            icon={<ChatIcon />}
            title="Escribinos por WhatsApp"
            description="Continuá la conversación con contexto de lo que exploraste en el showroom."
            variant="dark"
          />
        </motion.div>
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

      <footer className="border-t border-white/10 px-6 py-8 md:px-[var(--spacing-kiosk)]">
        <div className="mx-auto max-w-4xl text-base text-white/50">
          <p className="font-medium text-white/70">{dealership.name}</p>
          <p className="mt-2">{dealership.address}</p>
          <p className="mt-1">
            {dealership.hours.weekdays} · {dealership.hours.saturday}
          </p>
        </div>
      </footer>

      <TouchNav backHref={backHref} backLabel="Seguir explorando" />
    </div>
  );
}
