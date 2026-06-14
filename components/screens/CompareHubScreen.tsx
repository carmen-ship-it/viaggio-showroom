"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CompareHub, CompareTarget } from "@/lib/content/compare";
import type { Vehicle } from "@/types/vehicle";
import { MediaSurface } from "@/components/media/MediaSurface";
import {
  CompareVerdictBadge,
  getVerdictPreview,
} from "@/components/compare/CompareVerdictBadge";
import { TouchNav } from "@/components/cinematic/TouchNav";
import {
  formatScreenLabel,
  shouldHideComingSoonVehicles,
} from "@/lib/config/demo-mode";
import { routes } from "@/lib/navigation/routes";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { fadeUp, staggerContainer, transition } from "@/lib/motion/variants";
import { useSession } from "@/lib/session/SessionProvider";
import { cn } from "@/lib/utils/cn";

interface CompareHubScreenProps {
  hub: CompareHub;
  vehicle: Vehicle;
  targets: CompareTarget[];
  backHref: string;
}

export function CompareHubScreen({
  hub,
  vehicle,
  targets,
  backHref,
}: CompareHubScreenProps) {
  const { canShowCompareCta, recordTrustSignal } = useSession();

  const defaultRouteSlug =
    targets.find((t) => t.routeSlug === hub.defaultTargetSlug)?.routeSlug ??
    targets[0]?.routeSlug ??
    "";

  const [selectedRouteSlug, setSelectedRouteSlug] = useState(defaultRouteSlug);
  const [hoverCategory, setHoverCategory] = useState<string | null>(null);

  useEffect(() => {
    trackEvent({ type: "compare_view", vehicleSlug: vehicle.slug });
    recordTrustSignal("compare_hub");
  }, [vehicle.slug, recordTrustSignal]);

  useEffect(() => {
    if (defaultRouteSlug && !selectedRouteSlug) {
      setSelectedRouteSlug(defaultRouteSlug);
    }
  }, [defaultRouteSlug, selectedRouteSlug]);

  const selectedTarget = targets.find((t) => t.routeSlug === selectedRouteSlug);

  const detailHref = selectedTarget
    ? routes.compareDetail(vehicle.slug, selectedTarget.routeSlug)
    : undefined;

  const comingSoonTargets = shouldHideComingSoonVehicles()
    ? []
    : hub.targets.filter((t) => !t.available);

  if (!canShowCompareCta) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--canvas-soft)] px-6 text-center">
        <h1 className="text-3xl font-light">Comparación disponible pronto</h1>
        <p className="mt-4 max-w-md text-lg text-white/60">
          Explorá un poco más sobre confianza y seguridad — luego podés comparar con
          otros modelos.
        </p>
        <Link
          href={routes.faq(vehicle.slug)}
          className="mt-8 min-h-[52px] rounded-full bg-white px-8 py-3 text-sm font-semibold text-[var(--canvas-deep)]"
        >
          Ir a preguntas frecuentes
        </Link>
        <TouchNav backHref={backHref} backLabel="Volver" className="mt-8" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--canvas-soft)]">
      <motion.div
        className="flex flex-1 flex-col gap-8 px-6 py-10 lg:flex-row lg:px-12 lg:py-14"
        initial={fadeUp.initial}
        animate={fadeUp.animate}
        transition={transition.reveal}
      >
        <aside className="lg:w-[45%] lg:shrink-0">
          <p className="type-label text-[var(--color-accent-trust)]">
            {formatScreenLabel("S11 · Comparación")}
          </p>
          <h1 className="type-headline mt-4 text-white">{hub.title}</h1>
          <p className="type-kiosk-lead mt-5 max-w-xl text-white/60">{hub.subtitle}</p>
          <p className="mt-5 max-w-xl text-base italic text-white/45">{hub.introLine}</p>

          <div className="relative mt-8 overflow-hidden rounded-3xl border border-white/12 bg-white/[0.04] shadow-2xl shadow-black/30">
            <div className="relative aspect-[16/10]">
              <MediaSurface
                mediaId={hub.anchorMediaId}
                className="absolute inset-0"
                overlay
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--canvas-soft)] via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent-warm)]">
                  Tu referencia
                </p>
                <h2 className="mt-1 text-2xl font-light md:text-3xl">{vehicle.modelName}</h2>
                <p className="mt-2 text-sm text-white/65">Full equipo · Viaggio Motors</p>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex flex-1 flex-col">
          <p className="type-label text-white/45">
            Elegí con qué comparar
          </p>

          <motion.div
            className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {targets.map((target) => {
              const isSelected = selectedRouteSlug === target.routeSlug;
              return (
                <motion.button
                  key={target.routeSlug}
                  type="button"
                  variants={fadeUp}
                  transition={transition.normal}
                  onClick={() => {
                    setSelectedRouteSlug(target.routeSlug);
                    trackEvent({
                      type: "comparison_started",
                      vehicleSlug: vehicle.slug,
                      metadata: { targetId: target.id },
                    });
                  }}
                  className={cn(
                    "group relative min-h-[160px] overflow-hidden rounded-2xl border text-left transition-all",
                    isSelected
                      ? "border-[var(--color-accent-trust)] ring-2 ring-[var(--color-accent-trust)]/30"
                      : "border-white/10 hover:border-white/25 hover:-translate-y-1",
                  )}
                  aria-pressed={isSelected}
                >
                  <MediaSurface
                    mediaId={target.thumbnailMediaId ?? "compare-corolla-cross"}
                    className="absolute inset-0 opacity-70"
                    animate={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                  <div className="relative flex h-full min-h-[160px] flex-col justify-end p-6">
                    <p className="text-xl font-medium">{target.displayName}</p>
                    <p className="mt-1 text-xs text-white/55">
                      {target.dimensions.length} categorías · comparación honesta
                    </p>
                  </div>
                </motion.button>
              );
            })}

            {comingSoonTargets.map((target) => (
              <div
                key={target.slug}
                className="relative min-h-[140px] cursor-not-allowed overflow-hidden rounded-2xl border border-white/10 opacity-45"
                aria-disabled
              >
                <MediaSurface
                  mediaId={target.thumbnailMediaId}
                  className="absolute inset-0 opacity-50"
                  animate={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
                <div className="relative flex h-full min-h-[140px] flex-col justify-end p-5">
                  <p className="text-lg font-medium">{target.displayName}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-white/50">
                    {target.comingSoonLabel ?? "Próximamente"}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {selectedTarget ? (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition.normal}
            >
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                Vista previa por categoría
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {hub.categories.map((category) => {
                  const previewVerdict = getVerdictPreview(
                    selectedTarget.dimensions,
                    category,
                  );

                  return (
                    <button
                      key={category}
                      type="button"
                      onMouseEnter={() => setHoverCategory(category)}
                      onMouseLeave={() => setHoverCategory(null)}
                      onFocus={() => setHoverCategory(category)}
                      onBlur={() => setHoverCategory(null)}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
                        hoverCategory === category
                          ? "border-[var(--color-accent-trust)]/50 bg-white/[0.08]"
                          : "border-white/10 bg-white/[0.03]",
                      )}
                    >
                      {category}
                      {previewVerdict && hoverCategory === category ? (
                        <CompareVerdictBadge verdict={previewVerdict} size="sm" />
                      ) : null}
                    </button>
                  );
                })}
              </div>
              {hoverCategory ? (
                <p className="mt-3 text-sm text-white/55">
                  En {hoverCategory.toLowerCase()} verás filas con veredicto honesto:
                  nosotros ganamos, ellos ganan o empate.
                </p>
              ) : null}
            </motion.div>
          ) : null}
        </div>
      </motion.div>

      <TouchNav
        backHref={backHref}
        backLabel="Volver al hero"
        {...(detailHref
          ? {
              nextHref: detailHref,
              nextLabel: selectedTarget
                ? `Ver comparación con ${selectedTarget.displayName}`
                : "Ver comparación",
            }
          : {})}
      />
    </div>
  );
}
