"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FaqItem, PersonaExperience, VehicleTrustStory } from "@/types/trust";
import type { Dealership } from "@/types/dealership";
import type { Persona } from "@/types/persona";
import { PersonaPortrait } from "@/components/persona/PersonaPortrait";
import { ContentBlockRenderer } from "@/components/content/ContentBlockRenderer";
import {
  CinematicOverlay,
  GlassCard,
  KenBurnsBackground,
  PremiumCTA,
  StoryTransition,
} from "@/components/premium";
import { TouchNav } from "@/components/cinematic/TouchNav";
import { useSession } from "@/lib/session/SessionProvider";
import { routes } from "@/lib/navigation/routes";
import { fadeUp, riseFromBottom, transition } from "@/lib/motion/variants";
import { formatScreenLabel } from "@/lib/config/demo-mode";
import { cn } from "@/lib/utils/cn";

interface CarlosTrustExperienceScreenProps {
  intro: PersonaExperience;
  faqTitle: string;
  faqItems: FaqItem[];
  story: VehicleTrustStory;
  persona: Persona;
  dealership: Dealership;
  vehicleSlug: string;
  backHref: string;
}

export function CarlosTrustExperienceScreen({
  intro,
  faqTitle,
  faqItems,
  story,
  persona,
  dealership,
  vehicleSlug,
  backHref,
}: CarlosTrustExperienceScreenProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const { recordTrustSignal, trustSignals } = useSession();

  const toggleFaq = (id: string) => {
    setOpenId((prev) => {
      const next = prev === id ? null : id;
      if (next) recordTrustSignal();
      return next;
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--canvas-soft)]">
      <div className="flex-1 snap-y snap-mandatory overflow-y-auto scroll-smooth">
        <section className="relative min-h-screen snap-start">
          <KenBurnsBackground
            mediaId={intro.mediaId ?? "gs4-max-ext-front-34"}
            overlay={false}
          />
          <CinematicOverlay variant="chapter-dark" />
          <div className="relative z-10 flex min-h-screen flex-col justify-end px-6 pb-16 pt-28 md:px-[var(--spacing-kiosk)] md:pb-24">
            <motion.div
              initial={riseFromBottom.initial}
              animate={riseFromBottom.animate}
              transition={transition.reveal}
              className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-end"
            >
              <GlassCard animate={false} accent="trust" className="p-8 lg:w-[32%]">
                <PersonaPortrait persona={persona} size="lg" />
              </GlassCard>
              <div className="flex-1">
                <p className="type-label text-[var(--color-accent-trust)]">
                  {formatScreenLabel("Experiencia Carlos")}
                </p>
                <h1 className="type-headline mt-3 text-white">{intro.title}</h1>
                {intro.subtitle ? (
                  <p className="type-body mt-4 max-w-2xl text-[var(--text-secondary)]">
                    {intro.subtitle}
                  </p>
                ) : null}
                <div className="mt-8 space-y-4">
                  {intro.blocks
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map((block) => (
                      <ContentBlockRenderer
                        key={block.id}
                        block={block}
                        vehicleSlug={vehicleSlug}
                        persona={persona}
                      />
                    ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="min-h-screen snap-start bg-[var(--canvas-deep)] px-6 py-16 md:px-[var(--spacing-kiosk)] md:py-24">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={fadeUp.initial}
              whileInView={fadeUp.animate}
              viewport={{ once: true }}
              transition={transition.reveal}
            >
              <p className="type-label text-[var(--color-accent-trust)]">Confianza</p>
              <h2 className="type-headline mt-2 text-white">{faqTitle}</h2>
              <p className="type-body mt-3 text-[var(--text-secondary)]">
                Objeciones comunes — respuestas honestas, sin presión de venta.
              </p>
            </motion.div>

            <ul className="mt-10 space-y-4">
              {faqItems.map((item, index) => {
                const isOpen = openId === item.id;
                return (
                  <li key={item.id}>
                    <GlassCard animate={false} className="overflow-hidden p-0">
                      <button
                        type="button"
                        onClick={() => toggleFaq(item.id)}
                        className={cn(
                          "flex min-h-[72px] w-full items-center justify-between px-6 py-5 text-left transition-colors",
                          isOpen && "bg-white/[0.04]",
                        )}
                        aria-expanded={isOpen}
                      >
                        <span className="pr-4 text-xl font-medium md:text-2xl">
                          {item.question}
                        </span>
                        <span
                          className={cn(
                            "text-2xl text-[var(--color-accent-trust)] transition-transform duration-300",
                            isOpen && "rotate-45",
                          )}
                        >
                          +
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={transition.fast}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-white/10 bg-[var(--canvas-light)] px-6 py-6 text-[var(--text-on-light)]">
                              <p className="type-body text-[var(--text-on-light)]">
                                {item.answer}
                              </p>
                              {item.proofSuggestion ? (
                                <p className="mt-4 text-base text-[var(--text-secondary-on-light)]">
                                  <span className="font-medium">Profundizar:</span>{" "}
                                  {item.proofSuggestion}
                                </p>
                              ) : null}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </GlassCard>
                    {index === 1 ? (
                      <StoryTransition accent="trust" className="py-6">
                        Para garantía de cinco años y mantenimiento sin costo, Carlos te explica
                        cada detalle — sin filtro.
                      </StoryTransition>
                    ) : null}
                  </li>
                );
              })}
            </ul>

            {trustSignals >= 2 ? (
              <div className="mt-10 flex flex-wrap gap-3">
                <PremiumCTA href={routes.tour(vehicleSlug, "trust")} tier="secondary" accent="trust">
                  Ver historias de clientes
                </PremiumCTA>
                <PremiumCTA href={routes.vehicleHero(vehicleSlug)} tier="tertiary">
                  Seguir explorando
                </PremiumCTA>
              </div>
            ) : null}
          </div>
        </section>

        {story.chapters.map((chapter, index) => {
          const isDark = chapter.variant === "dark";
          return (
            <section
              key={chapter.id}
              className={cn(
                "relative min-h-[85vh] snap-start px-6 py-20 md:px-[var(--spacing-kiosk)] md:py-28",
                isDark
                  ? "bg-[var(--canvas-deep)] text-white"
                  : "bg-[var(--canvas-light)] text-[var(--text-on-light)]",
              )}
            >
              {chapter.mediaId ? (
                <>
                  <KenBurnsBackground
                    mediaId={chapter.mediaId}
                    overlay={false}
                    className={isDark ? "opacity-30" : "opacity-20"}
                  />
                  <CinematicOverlay variant={isDark ? "chapter-dark" : "chapter-light"} />
                </>
              ) : null}
              <div className="relative z-10 mx-auto max-w-4xl">
                <motion.div
                  initial={fadeUp.initial}
                  whileInView={fadeUp.animate}
                  viewport={{ once: true }}
                  transition={{ ...transition.reveal, delay: index * 0.05 }}
                >
                  <p
                    className={cn(
                      "type-label",
                      isDark ? "text-[var(--color-accent-trust)]" : "text-[var(--color-viaggio)]",
                    )}
                  >
                    Capítulo {index + 1}
                  </p>
                  <h2
                    className={cn(
                      "type-headline mt-3",
                      isDark ? "text-white" : "text-[var(--text-on-light)]",
                    )}
                  >
                    {chapter.title}
                  </h2>
                  {chapter.subtitle ? (
                    <p
                      className={cn(
                        "type-body mt-4",
                        isDark ? "text-[var(--text-secondary)]" : "text-[var(--text-secondary-on-light)]",
                      )}
                    >
                      {chapter.subtitle}
                    </p>
                  ) : null}
                  <div className="mt-10 space-y-6">
                    {chapter.blocks
                      .sort((a, b) => a.sortOrder - b.sortOrder)
                      .map((block) =>
                        isDark ? (
                          <GlassCard
                            key={block.id}
                            variant="inset"
                            accent="trust"
                            className="p-6 md:p-8"
                          >
                            <ContentBlockRenderer
                              block={block}
                              vehicleSlug={vehicleSlug}
                              persona={persona}
                              tone="dark"
                            />
                          </GlassCard>
                        ) : (
                          <ContentBlockRenderer
                            key={block.id}
                            block={block}
                            vehicleSlug={vehicleSlug}
                            persona={persona}
                            tone="light"
                          />
                        ),
                      )}
                  </div>
                </motion.div>
              </div>
            </section>
          );
        })}

        <section className="snap-start border-t border-white/10 bg-[var(--canvas-soft)] px-6 py-16 text-center md:px-[var(--spacing-kiosk)]">
          <GlassCard animate={false} variant="elevated" className="mx-auto max-w-xl p-8">
            <p className="text-lg font-medium text-white">{dealership.name}</p>
            <p className="mt-2 text-base text-white/85">{dealership.address}</p>
            <p className="mt-1 text-sm text-white/70">{dealership.city}</p>
            <PremiumCTA
              href={`https://maps.google.com/?q=${dealership.coordinates.lat},${dealership.coordinates.lng}`}
              tier="secondary"
              accent="trust"
              className="mt-6"
            >
              Ver ubicación en mapa
            </PremiumCTA>
            {trustSignals > 0 ? (
              <p className="mt-6 text-sm text-[var(--color-accent-trust)]">
                {trustSignals} señales de confianza en esta sesión
              </p>
            ) : null}
          </GlassCard>
          <div className="mt-8">
            <PremiumCTA href={routes.tour(vehicleSlug, "trust")} tier="primary">
              Conocer la garantía — tour con Carlos
            </PremiumCTA>
          </div>
        </section>
      </div>

      <div className="border-t border-white/10 bg-[var(--canvas-deep)]/90 backdrop-blur-xl">
        <TouchNav
          backHref={backHref}
          backLabel="Experiencia Sofía"
          nextHref={routes.tour(vehicleSlug, "trust")}
          nextLabel="Tour con Carlos"
        />
      </div>
    </div>
  );
}
