"use client";

import { motion } from "framer-motion";
import type { PersonaExperience } from "@/types/trust";
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
import { formatScreenLabel } from "@/lib/config/demo-mode";
import { routes } from "@/lib/navigation/routes";
import { fadeUp, staggerContainer, transition } from "@/lib/motion/variants";

const SOFIA_TRANSITIONS = [
  "Empecemos por lo que el mundo ve cuando vos llegás: el diseño.",
  "El exterior dice quién sos en la calle. Entremos — la cabina es donde todo se vuelve inteligente.",
  "La tecnología te da seguridad al manejar. El confort te hace querer quedarte un poco más.",
  "Cuando el confort se une al equipamiento completo, dejás de buscar \"más\" — ya lo tenés.",
];

interface SofiaExperienceScreenProps {
  experience: PersonaExperience;
  persona: Persona;
  vehicleSlug: string;
  backHref: string;
}

export function SofiaExperienceScreen({
  experience,
  persona,
  vehicleSlug,
  backHref,
}: SofiaExperienceScreenProps) {
  const sorted = [...experience.blocks].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--canvas-deep)]">
      <section className="relative min-h-[55vh] overflow-hidden md:min-h-[62vh]">
        <KenBurnsBackground
          mediaId={experience.mediaId ?? "gs4-max-hero-ambient"}
          overlay={false}
        />
        <CinematicOverlay variant="hero" />
        <div className="relative z-10 flex min-h-[55vh] flex-col justify-end px-6 pb-12 pt-28 md:min-h-[62vh] md:px-[var(--spacing-kiosk)] md:pb-16">
          <motion.p
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={transition.reveal}
            className="type-label"
            style={{ color: persona.colorAccent }}
          >
            {formatScreenLabel("Experiencia Sofía")}
          </motion.p>
          <motion.h1
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...transition.reveal, delay: 0.08 }}
            className="type-display mt-3 max-w-4xl text-white"
          >
            {experience.title}
          </motion.h1>
          {experience.subtitle ? (
            <motion.p
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...transition.reveal, delay: 0.14 }}
              className="type-body mt-5 max-w-2xl text-[var(--text-secondary)]"
            >
              {experience.subtitle}
            </motion.p>
          ) : null}
          <motion.p
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...transition.reveal, delay: 0.2 }}
            className="mt-6 text-lg italic text-white/50"
          >
            Maneja el Cambio — imaginalo en tu rutina, no en una ficha.
          </motion.p>
        </div>
      </section>

      <section className="flex flex-1 flex-col gap-12 px-6 py-12 md:px-[var(--spacing-kiosk)] md:py-16 lg:flex-row lg:gap-16">
        <aside className="lg:w-[30%] lg:shrink-0">
          <GlassCard accent="sofia" className="p-8 lg:sticky lg:top-28">
            <PersonaPortrait persona={persona} size="lg" />
            <p className="mt-6 text-center text-sm leading-relaxed text-white/55">
              Consultora premium — te acompaño a imaginar ser dueño/a, sin presión de cierre.
            </p>
          </GlassCard>
        </aside>

        <motion.div
          className="flex-1 space-y-6"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {sorted.map((block, index) => (
            <div key={block.id}>
              {index > 0 && SOFIA_TRANSITIONS[index - 1] ? (
                <StoryTransition accent="sofia">{SOFIA_TRANSITIONS[index - 1]}</StoryTransition>
              ) : null}
              <motion.div variants={fadeUp} transition={transition.reveal}>
                <GlassCard accent="sofia" variant="inset" className="p-6 md:p-8">
                  <ContentBlockRenderer
                    block={block}
                    vehicleSlug={vehicleSlug}
                    themeId={experience.themeId}
                    persona={persona}
                    heroFullBleed={false}
                  />
                </GlassCard>
              </motion.div>
            </div>
          ))}

          <GlassCard variant="elevated" accent="sofia" className="p-8 text-center">
            <p className="type-headline text-2xl md:text-3xl">Experiencialo vos mismo/a</p>
            <p className="type-body mt-3 text-[var(--text-secondary)]">
              Cuando quieras, coordinamos una tarde al volante — sin teatro, sin presión.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              {experience.tourId ? (
                <PremiumCTA
                  href={routes.tour(vehicleSlug, experience.tourId)}
                  tier="primary"
                >
                  Empezar el recorrido
                </PremiumCTA>
              ) : null}
              <PremiumCTA
                href={routes.convert(vehicleSlug)}
                tier="secondary"
                accent="sofia"
              >
                Coordinar mi experiencia al volante
              </PremiumCTA>
            </div>
          </GlassCard>
        </motion.div>
      </section>

      <div className="border-t border-white/10 bg-[var(--canvas-deep)]/90 backdrop-blur-xl">
        <TouchNav
          backHref={backHref}
          backLabel="Volver al hero"
          nextHref={routes.personaExperience(vehicleSlug, "carlos")}
          nextLabel="¿Es confiable? — Carlos"
        />
      </div>
    </div>
  );
}
