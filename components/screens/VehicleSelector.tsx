"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { VehicleKeyStat, VehicleRegistryEntry } from "@/types/vehicle";
import { MediaSurface } from "@/components/media/MediaSurface";
import { GlobalHeader } from "@/components/layout/GlobalHeader";
import { TouchNav } from "@/components/cinematic/TouchNav";
import { routes } from "@/lib/navigation/routes";
import { shouldHideComingSoonVehicles, shouldUseKioskViewportStrict, kioskViewportShellClass } from "@/lib/config/demo-mode";
import { useInteractionSound } from "@/lib/audio/useInteractionSound";
import { fadeUp, staggerContainer, transition } from "@/lib/motion/variants";
import { cn } from "@/lib/utils/cn";

interface VehicleSelectorProps {
  vehicles: VehicleRegistryEntry[];
  defaultSlug: string;
  brand: string;
  dealershipName: string;
  heroStats?: VehicleKeyStat[];
}

export function VehicleSelector({
  vehicles,
  defaultSlug,
  brand,
  dealershipName,
  heroStats = [],
}: VehicleSelectorProps) {
  const { playCardSelect } = useInteractionSound();

  const sorted = [...vehicles].sort(
    (a, b) => (a.launchPriority ?? 99) - (b.launchPriority ?? 99),
  );
  const hero = sorted.find((v) => v.slug === defaultSlug) ?? sorted[0];
  const others = shouldHideComingSoonVehicles()
    ? []
    : sorted.filter((v) => v.slug !== hero.slug);
  const soloHero = others.length === 0;
  const heroMediaId = hero.heroMediaId ?? `${hero.slug}-hero`;

  const kioskStrict = shouldUseKioskViewportStrict();

  return (
    <div className={cn("flex flex-col", kioskStrict ? kioskViewportShellClass() : "min-h-screen")}>
      <GlobalHeader brand={brand} dealershipName={dealershipName} />
      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col px-6 md:px-[var(--spacing-kiosk)]",
          soloHero
            ? kioskStrict
              ? "justify-center py-4"
              : "min-h-screen justify-center py-24 md:py-28"
            : "min-h-screen py-24 md:py-28",
        )}
      >
        <motion.div
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={transition.normal}
          className={cn(kioskStrict ? "mb-6" : "mb-12", soloHero && "text-center")}
        >
          <p className="type-label text-[var(--color-accent-warm)]">
            Selección de vehículo
          </p>
          <h1 className="type-headline mt-4 text-white">Elegí tu GAC</h1>
        </motion.div>

        <div
          className={cn(
            "grid gap-8",
            soloHero ? "mx-auto w-full max-w-5xl" : "lg:grid-cols-[1.4fr_1fr]",
          )}
        >
          <Link
            href={routes.vehicleHero(hero.slug)}
            className="group block"
            onClick={playCardSelect}
          >
            <motion.article
              className={cn(
                "relative overflow-hidden rounded-3xl border border-[var(--color-accent-warm)]/25",
                soloHero
                  ? kioskStrict
                    ? "min-h-0 max-h-[42vh] flex-1"
                    : "min-h-[68vh]"
                  : "min-h-[55vh]",
              )}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={transition.slow}
              whileHover={{ scale: 1.01 }}
            >
              <MediaSurface
                mediaId={heroMediaId}
                className="absolute inset-0 min-h-full"
                overlay={false}
              />
              <div
                className={cn(
                  "relative z-10 flex flex-col justify-end p-8 md:p-12",
                  soloHero
                  ? kioskStrict
                    ? "min-h-0 max-h-[42vh] flex-1"
                    : "min-h-[68vh]"
                  : "min-h-[55vh]",
                )}
              >
                <span className="mb-3 inline-flex w-fit rounded-full bg-[var(--color-accent-warm)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--canvas-deep)]">
                  Disponible ahora
                </span>
                <h2 className="type-display text-white">{hero.modelName}</h2>
                <p className="type-kiosk-lead mt-4 max-w-xl text-white/75">{hero.tagline}</p>
                {heroStats.length > 0 ? (
                  <div className={cn("flex flex-wrap gap-3", kioskStrict && "mt-4")}>
                    {(kioskStrict ? heroStats.slice(0, 2) : heroStats).map((stat) => (
                      <span
                        key={stat.label}
                        className="rounded-full border border-white/15 bg-black/35 px-4 py-1.5 text-sm backdrop-blur-md"
                      >
                        {stat.value} · {stat.label}
                      </span>
                    ))}
                  </div>
                ) : null}
                <span className={cn("inline-flex min-h-[52px] w-fit items-center gap-2 rounded-full bg-[var(--color-accent-warm)] px-7 py-3 text-base font-semibold text-[var(--canvas-deep)] shadow-lg shadow-[var(--color-accent-warm)]/20 transition-transform group-hover:scale-[1.02]", kioskStrict ? "mt-5" : "mt-8")}>
                  Explorar experiencia →
                </span>
              </div>
            </motion.article>
          </Link>

          {others.length > 0 ? (
            <motion.div
              className="flex flex-col gap-4"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {others.map((vehicle) => (
                <motion.article
                  key={vehicle.slug}
                  variants={fadeUp}
                  transition={transition.normal}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] opacity-60"
                >
                  <MediaSurface
                    mediaId={vehicle.heroMediaId ?? `${vehicle.slug}-hero`}
                    className="h-36"
                  />
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-wider text-white/40">
                      Próximamente
                    </p>
                    <h3 className="mt-1 text-lg font-medium">{vehicle.modelName}</h3>
                    <p className="mt-2 text-sm text-white/50">{vehicle.tagline}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : null}
        </div>
      </div>
      <TouchNav backHref={routes.home()} backLabel="Atrás" className="shrink-0" />
    </div>
  );
}
