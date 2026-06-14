"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import type { FinancingData } from "@/lib/content/financing";
import type { Vehicle } from "@/types/vehicle";
import { TouchNav } from "@/components/cinematic/TouchNav";
import { formatScreenLabel } from "@/lib/config/demo-mode";
import { routes } from "@/lib/navigation/routes";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { fadeUp, staggerContainer, transition } from "@/lib/motion/variants";
import { FinancingVisualCard } from "@/components/media/TrustMediaFramework";
import { LogoPlaceholder } from "@/components/media/LogoPlaceholder";
import { useSession } from "@/lib/session/SessionProvider";
import { cn } from "@/lib/utils/cn";

interface FinancingPreviewScreenProps {
  financing: FinancingData;
  vehicle: Vehicle;
  backHref: string;
}

function formatCurrency(value: number, currency: string): string {
  return new Intl.NumberFormat("es-BO", {
    style: "currency",
    currency: currency === "BOB" ? "BOB" : "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatRange(
  range: { min: number; max: number },
  currency: string,
): string {
  return `${formatCurrency(range.min, currency)} — ${formatCurrency(range.max, currency)}`;
}

export function FinancingPreviewScreen({
  financing,
  vehicle,
  backHref,
}: FinancingPreviewScreenProps) {
  const router = useRouter();
  const {
    financingSelection,
    setFinancingSelection,
    setFinancingInterestFlagged,
    trustSignals,
    compareTarget,
    recordTrustSignal,
  } = useSession();

  const [trimId, setTrimId] = useState(
    financingSelection?.trimId ?? financing.trims[0]?.id ?? "",
  );
  const [plazo, setPlazo] = useState(
    financingSelection?.plazo ?? financing.plazos[2] ?? 36,
  );

  useEffect(() => {
    recordTrustSignal("financing_preview");
    trackEvent({ type: "financing_preview_viewed", vehicleSlug: vehicle.slug });
  }, [recordTrustSignal, vehicle.slug]);

  const selectedTrim =
    financing.trims.find((t) => t.id === trimId) ?? financing.trims[0];
  const cuotaRange = selectedTrim?.cuotas[String(plazo)];

  const tcoTotal = useMemo(() => {
    const { tcoPreview } = financing;
    return {
      min:
        tcoPreview.fuelMonthlyBob.min +
        tcoPreview.maintenanceMonthlyBob.min +
        tcoPreview.insuranceMonthlyBob.min,
      max:
        tcoPreview.fuelMonthlyBob.max +
        tcoPreview.maintenanceMonthlyBob.max +
        tcoPreview.insuranceMonthlyBob.max,
    };
  }, [financing]);

  const combinedMonthly = useMemo(() => {
    if (!cuotaRange) return null;
    return {
      min: cuotaRange.min + tcoTotal.min,
      max: cuotaRange.max + tcoTotal.max,
    };
  }, [cuotaRange, tcoTotal]);

  const readinessIndex = useMemo(() => {
    let score = 0;
    if (trustSignals >= 2) score += 1;
    if (compareTarget) score += 1;
    if (financingSelection) score += 1;
    return Math.min(score, financing.readinessLevels.length - 1);
  }, [trustSignals, compareTarget, financingSelection, financing.readinessLevels.length]);

  useEffect(() => {
    if (!selectedTrim || !cuotaRange) return;
    setFinancingSelection({
      trimId: selectedTrim.id,
      trimLabel: selectedTrim.label,
      plazo,
      cuotaMin: cuotaRange.min,
      cuotaMax: cuotaRange.max,
    });
  }, [selectedTrim, plazo, cuotaRange, setFinancingSelection]);

  const handleConfirmInterest = () => {
    setFinancingInterestFlagged(true);
    recordTrustSignal("financing_interest");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--canvas-light)] text-[var(--text-on-light)]">
      <div className="border-b border-[var(--color-accent-warm)]/20 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-6 md:px-12">
          <div className="flex items-center gap-3">
            <span className="h-1 w-12 rounded-full bg-[var(--color-accent-warm)]" />
            <p className="type-label text-[var(--text-secondary-on-light)]">
              {formatScreenLabel("S26 · Financiamiento orientativo")}
            </p>
          </div>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[var(--text-secondary-on-light)]">
            {financing.disclaimer} Los valores en pantalla no son vinculantes — tu
            consultor confirma tasa, entrada y plazo con bancos aliados de Viaggio.
          </p>
        </div>
      </div>

      <motion.div
        className="mx-auto w-full max-w-5xl flex-1 px-6 py-10 md:px-12 md:py-12"
        initial={fadeUp.initial}
        animate={fadeUp.animate}
        transition={transition.normal}
      >
        <h1 className="type-headline text-[var(--text-on-light)]">
          Cuota mensual orientativa
        </h1>
        <p className="type-kiosk-lead mt-5 max-w-2xl text-[var(--text-secondary-on-light)]">
          Una idea realista del pago mensual del {vehicle.modelName} en Santa Cruz.
          Sin simulación bancaria en el kiosk.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {financing.trims.map((trim) => (
            <button
              key={trim.id}
              type="button"
              onClick={() => setTrimId(trim.id)}
              className={cn(
                "min-h-[48px] rounded-full border px-5 py-2 text-sm transition-colors",
                trimId === trim.id
                  ? "border-[var(--canvas-deep)] bg-[var(--canvas-deep)] text-white"
                  : "border-black/15 bg-white hover:border-black/25",
              )}
            >
              {trim.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_220px]">
          <div className="rounded-3xl border border-black/8 bg-white p-8 shadow-[0_24px_64px_-40px_rgba(0,0,0,0.2)] md:p-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary-on-light)]">
              Cuota referencial · {plazo} meses
            </p>
            <AnimatePresence mode="wait">
              {cuotaRange ? (
                <motion.p
                  key={`${trimId}-${plazo}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 font-mono text-5xl font-medium tracking-tight md:text-6xl"
                >
                  {formatCurrency(cuotaRange.min, financing.currency)}
                  <span className="mx-2 text-2xl text-[var(--text-secondary-on-light)]">
                    —
                  </span>
                  {formatCurrency(cuotaRange.max, financing.currency)}
                </motion.p>
              ) : null}
            </AnimatePresence>
            <p className="mt-2 text-sm text-[var(--text-secondary-on-light)]">
              por mes · {selectedTrim?.label}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {financing.plazos.map((months) => (
                <button
                  key={months}
                  type="button"
                  onClick={() => setPlazo(months)}
                  className={cn(
                    "min-h-[44px] rounded-xl border px-4 py-2 text-sm tabular-nums transition-colors",
                    plazo === months
                      ? "border-[var(--color-accent-warm)] bg-[var(--color-accent-warm)]/10 font-medium"
                      : "border-black/10 bg-[var(--canvas-light)] hover:border-black/20",
                  )}
                >
                  {months} meses
                </button>
              ))}
            </div>
          </div>

          <FinancingVisualCard className="hidden lg:block" />
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-medium">Ejemplos por plazo</h2>
          <p className="mt-2 text-sm text-[var(--text-secondary-on-light)]">
            Compará cómo cambia la cuota orientativa según el plazo elegido.
          </p>
          <motion.div
            className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {financing.plazos.map((months) => {
              const range = selectedTrim?.cuotas[String(months)];
              if (!range) return null;
              const isActive = plazo === months;
              return (
                <motion.button
                  key={months}
                  type="button"
                  variants={fadeUp}
                  transition={transition.normal}
                  onClick={() => setPlazo(months)}
                  className={cn(
                    "rounded-2xl border p-5 text-left transition-colors",
                    isActive
                      ? "border-[var(--color-accent-warm)] bg-[var(--color-accent-warm)]/10"
                      : "border-black/8 bg-white hover:border-black/15",
                  )}
                >
                  <p className="text-xs uppercase tracking-[0.15em] text-[var(--text-secondary-on-light)]">
                    {months} meses
                  </p>
                  <p className="mt-2 font-mono text-lg font-medium tabular-nums">
                    {formatRange(range, financing.currency)}
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-secondary-on-light)]">
                    / mes orientativo
                  </p>
                </motion.button>
              );
            })}
          </motion.div>
        </section>

        <section className="mt-12 rounded-3xl border border-[var(--color-accent-trust)]/25 bg-white p-8 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-accent-trust)]">
                Vista previa TCO
              </p>
              <h2 className="mt-2 text-2xl font-light">
                Costo mensual total estimado
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[var(--text-secondary-on-light)]">
                {financing.tcoPreview.note}
              </p>
            </div>
            <p className="rounded-full border border-black/10 bg-[var(--canvas-light)] px-4 py-2 text-sm tabular-nums">
              ~{financing.tcoPreview.defaultKmPerMonth.toLocaleString("es-BO")} km/mes
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                label: financing.tcoPreview.fuelLabel,
                range: financing.tcoPreview.fuelMonthlyBob,
              },
              {
                label: financing.tcoPreview.maintenanceLabel,
                range: financing.tcoPreview.maintenanceMonthlyBob,
              },
              {
                label: financing.tcoPreview.insuranceLabel,
                range: financing.tcoPreview.insuranceMonthlyBob,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-black/8 bg-[var(--canvas-light)] p-5"
              >
                <p className="text-sm text-[var(--text-secondary-on-light)]">
                  {item.label}
                </p>
                <p className="mt-2 font-mono text-lg font-medium tabular-nums">
                  {formatRange(item.range, financing.currency)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-[var(--color-accent-trust)]/20 bg-[var(--color-accent-trust)]/6 p-5">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium">Uso mensual (sin cuota)</p>
                <p className="mt-1 font-mono text-2xl tabular-nums">
                  {formatRange(tcoTotal, financing.currency)}
                </p>
              </div>
              {combinedMonthly ? (
                <div className="text-right">
                  <p className="text-sm font-medium text-[var(--color-accent-trust)]">
                    Cuota + uso mensual
                  </p>
                  <p className="mt-1 font-mono text-2xl font-medium tabular-nums">
                    {formatRange(combinedMonthly, financing.currency)}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-medium">{financing.explanation.headline}</h2>
          <p className="mt-3 max-w-3xl text-[var(--text-secondary-on-light)]">
            {financing.explanation.intro}
          </p>
          <ul className="mt-6 space-y-3">
            {financing.explanation.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex gap-3 rounded-2xl border border-black/8 bg-white px-5 py-4 text-sm leading-relaxed"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent-warm)]" />
                {bullet}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-medium">Entender tu cuota</h2>
          <motion.ul
            className="mt-6 grid gap-4 md:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {financing.affordabilityTips.map((tip) => (
              <motion.li
                key={tip.id}
                variants={fadeUp}
                transition={transition.normal}
                className="rounded-2xl border border-black/8 bg-white p-5"
              >
                <h3 className="font-medium">{tip.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary-on-light)]">
                  {tip.description}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-medium">Preparación financiera</h2>
          <div className="mt-6 rounded-2xl border border-black/8 bg-white p-6">
            <div className="flex gap-2">
              {financing.readinessLevels.map((level, index) => (
                <div
                  key={level.id}
                  className={cn(
                    "h-2 flex-1 rounded-full transition-colors",
                    index <= readinessIndex
                      ? "bg-[var(--color-accent-trust)]"
                      : "bg-black/10",
                  )}
                />
              ))}
            </div>
            <p className="mt-4 text-sm font-medium">
              {financing.readinessLevels[readinessIndex]?.label}
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary-on-light)]">
              {financing.readinessLevels[readinessIndex]?.description}
            </p>
          </div>
        </section>

        <section className="section-rhythm-lg">
          <h2 className="text-2xl font-medium">Socios financieros</h2>
          <div className="mt-5 flex flex-wrap items-center gap-6">
            <LogoPlaceholder logoId="logo-bank-partner-1" height={36} variant="light" />
          </div>
        </section>
      </motion.div>

      <TouchNav
        backHref={backHref}
        backLabel="Volver a comparación"
        onNext={() => {
          handleConfirmInterest();
          router.push(routes.convert(vehicle.slug));
        }}
        nextLabel="Dar el siguiente paso"
      />
    </div>
  );
}
