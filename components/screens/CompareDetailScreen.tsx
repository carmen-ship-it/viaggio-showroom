"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type {
  CompareTarget,
  CompareVerdictSummary,
} from "@/lib/content/compare";
import type { Persona } from "@/types/persona";
import type { Vehicle } from "@/types/vehicle";
import { MediaSurface } from "@/components/media/MediaSurface";
import { PersonaAvatar } from "@/components/media/PersonaAvatar";
import { CompareVerdictBadge } from "@/components/compare/CompareVerdictBadge";
import { TouchNav } from "@/components/cinematic/TouchNav";
import { formatScreenLabel, shouldUseCompareCompactLayout, kioskViewportShellClass } from "@/lib/config/demo-mode";
import { routes } from "@/lib/navigation/routes";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { fadeUp, staggerContainer, transition } from "@/lib/motion/variants";
import { useSession } from "@/lib/session/SessionProvider";
import { cn } from "@/lib/utils/cn";

interface CompareDetailScreenProps {
  vehicle: Vehicle;
  target: CompareTarget;
  summary: CompareVerdictSummary;
  personas: Record<string, Persona>;
  backHref: string;
}

export function CompareDetailScreen({
  vehicle,
  target,
  summary,
  personas,
  backHref,
}: CompareDetailScreenProps) {
  const { setCompareTarget, recordTrustSignal } = useSession();
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const compactLayout = shouldUseCompareCompactLayout();

  const verdictParagraph = compactLayout
    ? "Corolla Cross gana en reventa. El GS4 MAX gana en equipamiento, airbags y garantía — con honestidad en ambos lados."
    : "Corolla Cross es una excelente opción si priorizás solo la marca. El GS4 MAX gana cuando comparás equipamiento de serie, airbags, tecnología y garantía — y reconocemos con honestidad dónde Toyota sigue fuerte hoy, especialmente en reventa.";

  const anchorMediaId = vehicle.heroMediaId ?? "gs4-max-ext-front-34";

  useEffect(() => {
    setCompareTarget(target.displayName);
    recordTrustSignal("compare_detail");
    trackEvent({
      type: "compare_view",
      vehicleSlug: vehicle.slug,
      metadata: { targetId: target.id, screen: "S12" },
    });
  }, [target.displayName, target.id, vehicle.slug, setCompareTarget, recordTrustSignal]);

  useEffect(() => {
    const node = footerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          recordTrustSignal("comparison_completed");
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [recordTrustSignal]);

  const toggleRow = useCallback((key: string) => {
    setExpandedKey((prev) => (prev === key ? null : key));
  }, []);

  const statItems = [
    { label: "Nosotros ganamos", value: summary.anchorWins, tone: "trust" as const },
    { label: "Ellos ganan", value: summary.targetWins, tone: "neutral" as const },
    { label: "Empate", value: summary.ties, tone: "glass" as const },
  ];

  const highlightedRows = compactLayout
    ? target.dimensions.flatMap((dimension) =>
        dimension.rows.slice(0, 1).map((row) => ({
          ...row,
          category: dimension.category,
          rowKey: `${dimension.category}-${row.label}`,
        })),
      ).slice(0, 3)
    : [];

  return (
    <div className={cn("flex flex-col bg-[var(--canvas-soft)]", kioskViewportShellClass())}>
      <motion.header
        className={cn(
          "border-b border-white/8 bg-[var(--canvas-soft)]/95 backdrop-blur-xl",
          compactLayout ? "shrink-0 px-6 py-5 md:px-12" : "px-6 py-6 md:px-12",
        )}
        initial={fadeUp.initial}
        animate={fadeUp.animate}
        transition={transition.reveal}
      >
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3">
            <span className="h-1 w-12 rounded-full bg-[var(--color-accent-warm)]" />
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              {formatScreenLabel("S12 · Comparación honesta")}
            </p>
          </div>
          <h1 className={cn("type-headline text-white", compactLayout ? "mt-3" : "mt-4")}>
            {vehicle.modelName} vs {target.displayName}
          </h1>

          {!compactLayout ? (
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-24 overflow-hidden rounded-xl border border-white/10 md:h-20 md:w-32">
                  <MediaSurface mediaId={anchorMediaId} className="absolute inset-0" animate={false} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-white/45">GS4 MAX</p>
                  <p className="font-medium">Full Equipo</p>
                </div>
              </div>

              <p className="hidden text-center text-sm uppercase tracking-[0.3em] text-white/35 md:block">
                vs
              </p>

              <div className="flex items-center gap-4 md:justify-end">
                <div className="text-right md:order-2">
                  <p className="text-xs uppercase tracking-wider text-white/45">Competidor</p>
                  <p className="font-medium">{target.displayName}</p>
                </div>
                <div className="relative h-16 w-24 overflow-hidden rounded-xl border border-white/10 md:order-1 md:h-20 md:w-32">
                  <MediaSurface
                    mediaId={target.thumbnailMediaId ?? "compare-corolla-cross"}
                    className="absolute inset-0"
                    animate={false}
                  />
                </div>
              </div>
            </div>
          ) : null}

          <div className={cn("flex flex-wrap gap-3", compactLayout ? "mt-4" : "mt-6")}>
            {statItems.map((stat) => (
              <div
                key={stat.label}
                className={cn(
                  "rounded-2xl border px-5 py-4",
                  stat.tone === "trust" &&
                    "border-[var(--color-accent-trust)]/30 bg-[var(--color-accent-trust)]/10",
                  stat.tone === "neutral" &&
                    "border-[var(--color-accent-neutral)]/30 bg-white/[0.04]",
                  stat.tone === "glass" && "border-white/10 bg-white/[0.03]",
                )}
              >
                <p className="font-mono text-3xl tabular-nums">{stat.value}</p>
                <p className="mt-1 text-sm text-white/55">{stat.label}</p>
              </div>
            ))}
          </div>

          {compactLayout ? (
            <div className="mt-4 rounded-2xl border border-[var(--color-accent-trust)]/25 bg-[var(--color-accent-trust)]/8 p-4 md:p-5">
              <p className="text-base leading-relaxed text-white/80 md:text-lg">{verdictParagraph}</p>
            </div>
          ) : null}
        </div>
      </motion.header>

      {compactLayout ? (
        <div className="flex min-h-0 flex-1 flex-col px-6 py-4 md:px-12">
          <p className="text-xs uppercase tracking-[0.2em] text-white/45">
            Tres diferencias clave
          </p>
          <div className="mt-3 space-y-2 overflow-hidden">
            {highlightedRows.map((row) => (
              <div
                key={row.rowKey}
                className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-[var(--color-accent-warm)]">
                    {row.category}
                  </p>
                  <p className="mt-0.5 truncate font-medium">{row.label}</p>
                </div>
                <CompareVerdictBadge verdict={row.verdict} size="sm" />
              </div>
            ))}
          </div>
          <TouchNav
            backHref={backHref}
            backLabel="Elegir competidor"
            nextHref={routes.financing(vehicle.slug)}
            nextLabel="Cuota orientativa"
            className="mt-auto shrink-0 px-0 pb-0 pt-3"
          />
        </div>
      ) : (
        <>
      <div className="flex-1 px-6 py-8 md:px-12">
        <motion.div
          className="mx-auto max-w-5xl space-y-10"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {target.dimensions.map((dimension) => (
            <motion.section
              key={dimension.category}
              variants={fadeUp}
              transition={transition.normal}
            >
              <h2 className="text-xs uppercase tracking-[0.25em] text-[var(--color-accent-warm)]">
                {dimension.category}
              </h2>

              <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full border-collapse text-left">
                  <caption className="sr-only">
                    Comparación {dimension.category} entre {vehicle.modelName} y{" "}
                    {target.displayName}
                  </caption>
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-wider text-white/45">
                      <th scope="col" className="px-4 py-3 md:px-6">
                        Criterio
                      </th>
                      <th scope="col" className="hidden px-4 py-3 md:table-cell md:px-6">
                        GS4 MAX
                      </th>
                      <th scope="col" className="hidden px-4 py-3 md:table-cell md:px-6">
                        {target.displayName}
                      </th>
                      <th scope="col" className="px-4 py-3 md:px-6">
                        Resultado
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dimension.rows.map((row, rowIndex) => {
                      const rowKey = `${dimension.category}-${row.label}`;
                      const isExpanded = expandedKey === rowKey;
                      const isEven = rowIndex % 2 === 0;
                      const persona = row.personaId ? personas[row.personaId] : undefined;

                      return (
                        <Fragment key={rowKey}>
                          <tr
                            className={cn(
                              "border-b border-white/6 transition-colors",
                              isEven ? "bg-white/[0.02]" : "bg-transparent",
                              isExpanded && "bg-white/[0.05]",
                            )}
                          >
                            <td className="px-4 py-4 md:px-6">
                              <button
                                type="button"
                                onClick={() => toggleRow(rowKey)}
                                className="flex w-full items-start gap-2 text-left"
                                aria-expanded={isExpanded}
                              >
                                <span className="mt-0.5 shrink-0 text-lg text-white/40">
                                  {isExpanded ? "−" : "+"}
                                </span>
                                <span>
                                  <span className="block text-lg font-medium">{row.label}</span>
                                  <span className="mt-1 block text-sm text-white/55 md:hidden">
                                    GS4 MAX: {row.anchorValue}
                                  </span>
                                  <span className="mt-0.5 block text-sm text-white/45 md:hidden">
                                    {target.displayName}: {row.targetValue}
                                  </span>
                                </span>
                              </button>
                            </td>
                            <td className="hidden px-4 py-4 tabular-nums text-white/80 md:table-cell md:px-6">
                              {row.anchorValue}
                            </td>
                            <td className="hidden px-4 py-4 tabular-nums text-white/65 md:table-cell md:px-6">
                              {row.targetValue}
                            </td>
                            <td className="px-4 py-4 md:px-6">
                              <CompareVerdictBadge verdict={row.verdict} size="sm" />
                            </td>
                          </tr>
                          <AnimatePresence>
                            {isExpanded && row.explanation ? (
                              <tr>
                                <td
                                  colSpan={4}
                                  className="border-b border-white/6 px-4 pb-5 pt-0 md:px-6"
                                >
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="overflow-hidden"
                                  >
                                    <div className="rounded-xl border border-white/8 bg-white/[0.04] p-4 md:p-5">
                                      {persona ? (
                                        <div className="mb-3 flex items-center gap-3">
                                          <PersonaAvatar persona={persona} size="sm" />
                                          <p className="text-xs uppercase tracking-wider text-white/45">
                                            {persona.name} · {dimension.category}
                                          </p>
                                        </div>
                                      ) : null}
                                      <p className="text-base italic leading-relaxed text-white/75 md:text-lg">
                                        {row.explanation}
                                      </p>
                                    </div>
                                  </motion.div>
                                </td>
                              </tr>
                            ) : null}
                          </AnimatePresence>
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </motion.section>
          ))}
        </motion.div>

        <motion.div
          ref={footerRef}
          className="mx-auto mt-12 max-w-5xl rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={transition.reveal}
        >
          <p className="text-lg leading-relaxed text-white/70">{verdictParagraph}</p>
          {target.lastVerified ? (
            <p className="mt-3 text-xs text-white/40">
              Datos verificados · {target.lastVerified}
            </p>
          ) : null}
        </motion.div>
      </div>

      <TouchNav
        backHref={backHref}
        backLabel="Elegir competidor"
        nextHref={routes.financing(vehicle.slug)}
        nextLabel="Cuota orientativa"
      />
        </>
      )}
    </div>
  );
}
