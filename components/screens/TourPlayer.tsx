"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { ContentBlock, Tour, Topic } from "@/types/content";
import type { Persona } from "@/types/persona";
import type { NarrationBlockData } from "@/types/blocks";
import {
  CinematicOverlay,
  GlassCard,
  PremiumCTA,
  StoryTransition,
} from "@/components/premium";
import { TourMedia } from "@/components/media/TourMedia";
import { PersonaAvatar } from "@/components/media/PersonaAvatar";
import { TopicRenderer } from "@/components/content/TopicRenderer";
import { TouchNav } from "@/components/cinematic/TouchNav";
import {
  demoPrimaryCtaClass,
  shouldDisableExplorationBranches,
  shouldHideDeveloperTools,
  shouldHighlightPrimaryCta,
  shouldUseTourCompactLayout,
  shouldUseKioskViewportStrict,
  isDemoMode,
} from "@/lib/config/demo-mode";
import { useSession } from "@/lib/session/SessionProvider";
import { routes } from "@/lib/navigation/routes";
import { crossfade, transition } from "@/lib/motion/variants";
import { cn } from "@/lib/utils/cn";

interface TourStepTopic {
  stepId: string;
  title: string;
  topic: Topic | null;
  mediaId?: string;
  transitionLine?: string;
}

interface TourPlayerProps {
  tour: Tour;
  steps: TourStepTopic[];
  persona: Persona;
  vehicleSlug: string;
  backHref: string;
  variant?: "trust" | "family";
}

function getNarrationText(topic: Topic | null): string | null {
  if (!topic) return null;
  const narration = topic.blocks.find(
    (b): b is ContentBlock => b.type === "narration",
  );
  if (!narration?.data) return null;
  const data = narration.data as unknown as NarrationBlockData;
  return data.text ?? null;
}

export function TourPlayer({
  tour,
  steps,
  persona,
  vehicleSlug,
  backHref,
  variant = "trust",
}: TourPlayerProps) {
  const [index, setIndex] = useState(0);
  const { recordTrustSignal, trustSignals } = useSession();
  const hideExploration = shouldDisableExplorationBranches();
  const hideDevChrome = shouldHideDeveloperTools();
  const tourCompact = shouldUseTourCompactLayout();
  const kioskStrict = shouldUseKioskViewportStrict();
  const current = steps[index];
  const progress = ((index + 1) / steps.length) * 100;
  const isLast = index === steps.length - 1;
  const isFamily = variant === "family";

  const goNext = () => {
    if (!isLast) {
      if (isFamily) {
        recordTrustSignal("diego_step");
      } else {
        recordTrustSignal("tour_step");
      }
      setIndex((i) => i + 1);
    }
  };

  const goBack = () => {
    if (index > 0) setIndex((i) => i - 1);
  };

  const stepMediaId =
    current.mediaId ??
    (current.topic?.blocks.find((b) => b.type === "hero")?.data as { mediaId?: string } | undefined)
      ?.mediaId ??
    `${vehicleSlug}-tour-${current.stepId}`;

  const narrationText = getNarrationText(current.topic);
  const accentColor = isFamily ? "#D4C4B0" : "var(--color-accent-trust)";

  return (
    <div className={cn("flex flex-col overflow-hidden bg-[var(--canvas-deep)]", kioskStrict ? "h-[100dvh] max-h-[1080px]" : "min-h-screen max-h-screen")}>
      <div className="relative h-1 w-full shrink-0 bg-white/5">
        <motion.div
          className="h-full"
          style={{ backgroundColor: isFamily ? "#D4C4B0" : accentColor }}
          animate={{ width: `${progress}%` }}
          transition={transition.crossfade}
        />
      </div>

      <header className="flex shrink-0 items-center justify-between px-6 py-6 md:px-[var(--spacing-kiosk)]">
        <div>
          <p className="type-label text-white/45">{tour.title}</p>
          <p className="mt-2 text-lg text-white/70">
            Paso {index + 1} de {steps.length}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <PersonaAvatar persona={persona} size="sm" />
          <div className="hidden text-right sm:block">
            <p className="text-base font-medium">{persona.name}</p>
            <p className="text-sm text-white/50">{persona.role}</p>
          </div>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={current.stepId}
          className={cn(
            "flex min-h-0 flex-1 flex-col",
            !tourCompact && "overflow-y-auto",
          )}
          initial={crossfade.initial}
          animate={crossfade.animate}
          exit={crossfade.exit}
          transition={transition.crossfade}
        >
          <div className="relative mx-4 shrink-0 md:mx-[var(--spacing-kiosk)] lg:max-h-[42vh] lg:min-h-[320px]">
            <TourMedia
              mediaId={String(stepMediaId)}
              className="h-[32vh] min-h-[280px] max-h-[42vh] lg:absolute lg:inset-0 lg:h-full lg:max-h-none lg:min-h-0"
              title={current.title}
              transitionLine={index > 0 ? current.transitionLine : undefined}
              showStepCaption={false}
              overlay={false}
            />
            <CinematicOverlay variant="theater" className="pointer-events-none absolute inset-0 rounded-2xl" />

            <div className="absolute inset-x-0 bottom-0 px-4 pb-4 md:px-8 md:pb-6">
              {current.transitionLine && index > 0 ? (
                <StoryTransition accent="trust" className="py-3">
                  {current.transitionLine}
                </StoryTransition>
              ) : null}

              <GlassCard animate={false} variant="elevated" className="p-6 md:p-8">
                <div className="flex gap-5 md:gap-6">
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-semibold text-white md:h-[4.5rem] md:w-[4.5rem]"
                    style={{ backgroundColor: accentColor }}
                  >
                    {persona.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className="type-label"
                      style={{ color: isFamily ? "#D4C4B0" : "var(--color-accent-trust)" }}
                    >
                      {persona.name} · {persona.role}
                    </p>
                    <h2 className="type-headline mt-2 text-2xl md:text-3xl lg:text-4xl">
                      {current.title}
                    </h2>
                    {narrationText ? (
                      <p className="type-body mt-4 text-[var(--text-secondary)]">
                        {narrationText}
                      </p>
                    ) : null}
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>

          {current.topic && !tourCompact ? (
            <div className="max-h-[26vh] shrink-0 overflow-y-auto px-6 py-3 md:px-[var(--spacing-kiosk)] md:py-4">
              <TopicRenderer
                topic={current.topic}
                persona={persona}
                heroFullBleed={false}
                className="gap-4"
              />
            </div>
          ) : hideDevChrome ? null : (
            <div className="flex-1 px-6 py-8 md:px-[var(--spacing-kiosk)]">
              <p className="type-body text-[var(--text-secondary)]">
                Contenido del paso en preparación.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-auto shrink-0 border-t border-white/10 bg-[var(--canvas-deep)]/90 backdrop-blur-2xl">
        {isLast ? (
          isFamily ? (
            <div className="space-y-3 px-6 py-6 md:px-[var(--spacing-kiosk)]">
              <PremiumCTA
                href={routes.testDriveInfo(vehicleSlug)}
                tier="primary"
                className="w-full"
              >
                Agendá con tu familia
              </PremiumCTA>
              <PremiumCTA href={routes.share(vehicleSlug)} tier="secondary" className="w-full">
                Mandáselo a tu pareja
              </PremiumCTA>
              {trustSignals < 2 ? (
                <Link
                  href={routes.topic(vehicleSlug, "safety", "family-safety")}
                  className="block text-center text-sm text-white/50 hover:text-white/70"
                >
                  ¿Dudas de seguridad? Carlos te explica →
                </Link>
              ) : null}
            </div>
          ) : (
            <div className="flex flex-col gap-3 px-6 py-6 sm:flex-row md:px-[var(--spacing-kiosk)]">
              <PremiumCTA
                href={routes.topic(vehicleSlug, "safety", "adas")}
                tier="primary"
                className={cn(
                  "flex-1",
                  shouldHighlightPrimaryCta() && demoPrimaryCtaClass,
                )}
              >
                Profundizar en ADAS
              </PremiumCTA>
              {!hideExploration ? (
                <PremiumCTA href={routes.vehicleHero(vehicleSlug)} tier="secondary" className="flex-1">
                  Volver al hero
                </PremiumCTA>
              ) : null}
            </div>
          )
        ) : (
          <TouchNav
            backLabel={index === 0 ? (isDemoMode ? "Volver a FAQ" : "Salir") : "Anterior"}
            onBack={index === 0 ? undefined : goBack}
            backHref={index === 0 ? backHref : undefined}
            onNext={goNext}
            nextLabel="Siguiente"
            className="md:px-[var(--spacing-kiosk)]"
          />
        )}
      </div>
    </div>
  );
}
