"use client";

import { motion } from "framer-motion";
import type { HeroHotspot, Vehicle } from "@/types/vehicle";
import { GlobalHeader } from "@/components/layout/GlobalHeader";
import {
  CinematicOverlay,
  HeroStatStrip,
  HotSpotMarker,
  KenBurnsBackground,
  PremiumCTA,
} from "@/components/premium";
import { TouchNav } from "@/components/cinematic/TouchNav";
import { shouldDisableExplorationBranches } from "@/lib/config/demo-mode";
import { routes } from "@/lib/navigation/routes";
import { useSession } from "@/lib/session/SessionProvider";
import { fadeUp, transition } from "@/lib/motion/variants";

export type { HeroHotspot } from "@/types/vehicle";

interface VehicleHeroProps {
  vehicle: Vehicle;
  hotspots?: HeroHotspot[];
  brand: string;
  dealershipName: string;
}

export function VehicleHero({
  vehicle,
  hotspots = [],
  brand,
  dealershipName,
}: VehicleHeroProps) {
  const { canShowCompareCta, canShowConvertCta, trustSignals } = useSession();
  const hideExploration = shouldDisableExplorationBranches();
  const mediaId = vehicle.heroMediaId ?? `${vehicle.slug}-hero`;
  const stats = vehicle.keyStats ?? [];

  return (
    <div className="relative min-h-screen bg-[var(--canvas-deep)]">
      <KenBurnsBackground mediaId={mediaId} overlay={false} />
      <CinematicOverlay variant="hero" />

      <GlobalHeader
        brand={brand}
        dealershipName={dealershipName}
        vehicleName={vehicle.modelName}
      />

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="relative flex flex-1 flex-col justify-end px-6 pb-8 pt-28 md:px-[var(--spacing-kiosk)] md:pb-12 md:pt-32">
          <div className="mx-auto w-full max-w-[70%] md:mx-0">
            <motion.p
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={transition.reveal}
              className="type-label text-[var(--color-accent-warm)]"
            >
              GAC Motor · Viaggio Motors
            </motion.p>
            <motion.h1
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...transition.reveal, delay: 0.08 }}
              className="type-display mt-4 text-white"
            >
              {vehicle.modelName}
            </motion.h1>
            <motion.p
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...transition.reveal, delay: 0.14 }}
              className="type-body mt-5 max-w-xl text-[var(--text-secondary)]"
            >
              {vehicle.tagline}
            </motion.p>
          </div>

          {hotspots.length > 0 && !hideExploration ? (
            <div className="pointer-events-none absolute inset-0 hidden lg:block">
              {hotspots.map((spot, index) => (
                <div
                  key={spot.id}
                  className="pointer-events-auto absolute"
                  style={{
                    left: `${spot.position.x * 100}%`,
                    top: `${spot.position.y * 100}%`,
                  }}
                >
                  <HotSpotMarker
                    href={routes.topic(vehicle.slug, spot.themeId, spot.topicId)}
                    label={spot.label}
                    index={index}
                  />
                </div>
              ))}
            </div>
          ) : null}

          <HeroStatStrip stats={stats} className="mt-10 md:mt-14" />
        </div>

        <motion.div
          className="border-t border-white/10 bg-[var(--canvas-deep)]/85 px-6 py-8 backdrop-blur-2xl md:px-[var(--spacing-kiosk)]"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transition.reveal, delay: 0.45 }}
        >
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            {!hideExploration ? (
              <>
                <PremiumCTA href={routes.journey(vehicle.slug, "diego")} tier="secondary">
                  ¿Cómo es en familia?
                </PremiumCTA>
                <PremiumCTA
                  href={routes.faq(vehicle.slug)}
                  tier="secondary"
                  accent="trust"
                >
                  ¿Es confiable?
                </PremiumCTA>
                <PremiumCTA
                  href={routes.topic(vehicle.slug, "safety", "family-safety")}
                  tier="secondary"
                  accent="trust"
                >
                  Seguridad familiar
                </PremiumCTA>
                <PremiumCTA
                  href={routes.personaExperience(vehicle.slug, "sofia")}
                  tier="secondary"
                  accent="sofia"
                >
                  Diseño y tecnología
                </PremiumCTA>
                {canShowCompareCta ? (
                  <PremiumCTA href={routes.compare(vehicle.slug)} tier="tertiary">
                    Comparar →
                  </PremiumCTA>
                ) : null}
                {trustSignals >= 2 ? (
                  <PremiumCTA href={routes.financing(vehicle.slug)} tier="tertiary">
                    Ver cuota orientativa
                  </PremiumCTA>
                ) : null}
                {canShowConvertCta ? (
                  <PremiumCTA href={routes.convert(vehicle.slug)} tier="primary">
                    Dar el siguiente paso
                  </PremiumCTA>
                ) : null}
              </>
            ) : null}
          </div>
          <TouchNav
            backHref={routes.vehicles()}
            backLabel="Modelos"
            nextHref={routes.faq(vehicle.slug)}
            nextLabel="¿Es confiable?"
            className="mt-4 px-0 pb-0 pt-2"
          />
        </motion.div>
      </div>
    </div>
  );
}
