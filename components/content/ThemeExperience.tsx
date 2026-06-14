"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Theme, Topic } from "@/types/content";
import type { Persona } from "@/types/persona";
import { MediaSurface } from "@/components/media/MediaSurface";
import { TopicRenderer } from "./TopicRenderer";
import { TrustSectionRenderer } from "./renderers/TrustSectionRenderer";
import { CTARenderer } from "./renderers/CTARenderer";
import { routes } from "@/lib/navigation/routes";
import { fadeUp, transition } from "@/lib/motion/variants";
import { cn } from "@/lib/utils/cn";

interface ThemeExperienceProps {
  theme: Theme;
  topics: Topic[];
  persona: Persona;
  vehicleSlug: string;
  isTrustTheme?: boolean;
  className?: string;
}

export function ThemeExperience({
  theme,
  topics,
  persona,
  vehicleSlug,
  isTrustTheme = false,
  className,
}: ThemeExperienceProps) {
  const coverId = theme.coverMediaId ?? `${vehicleSlug}-${theme.id}-cover`;
  const activeTopic = topics[0];

  return (
    <div className={cn("flex min-h-screen flex-col", className)}>
      <section className="relative min-h-[45vh]">
        <MediaSurface mediaId={coverId} className="absolute inset-0" />
        <div className="relative z-10 flex min-h-[45vh] flex-col justify-end px-6 pb-10 pt-24 md:px-12">
          <motion.p
            className="mb-2 text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={transition.normal}
          >
            {persona.name} · {persona.role}
          </motion.p>
          <motion.h1
            className="text-4xl font-light tracking-tight md:text-6xl"
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...transition.normal, delay: 0.1 }}
          >
            {theme.title}
          </motion.h1>
          {theme.description ? (
            <motion.p
              className="mt-4 max-w-2xl text-lg text-white/65"
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...transition.normal, delay: 0.15 }}
            >
              {theme.description}
            </motion.p>
          ) : null}
        </div>
      </section>

      <section className="flex-1 space-y-12 px-6 py-10 md:px-12">
        {topics.length > 1 ? (
          <nav className="flex flex-wrap gap-3">
            {topics.map((topic) => (
              <Link
                key={topic.id}
                href={routes.topic(vehicleSlug, theme.id, topic.id)}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition-colors hover:border-[var(--color-accent)] hover:text-white"
              >
                {topic.title}
              </Link>
            ))}
          </nav>
        ) : null}

        {isTrustTheme && activeTopic ? (
          <TrustSectionRenderer
            blocks={activeTopic.blocks}
            persona={persona}
            vehicleSlug={vehicleSlug}
          />
        ) : (
          topics.map((topic) => (
            <div key={topic.id}>
              {topics.length > 1 ? (
                <h2 className="mb-6 text-2xl font-light">{topic.title}</h2>
              ) : null}
              <TopicRenderer topic={topic} persona={persona} />
            </div>
          ))
        )}

        <div className="flex flex-wrap gap-4 pt-4">
          <CTARenderer
            data={{
              action: "test_drive",
              label: "Agendar prueba de manejo",
            }}
            vehicleSlug={vehicleSlug}
            variant="primary"
          />
          <CTARenderer
            data={{
              action: "tour",
              label: `Tour con ${persona.name}`,
              targetId:
                persona.id === "carlos"
                  ? "trust"
                  : persona.id === "sofia"
                    ? "desire"
                    : "family",
            }}
            vehicleSlug={vehicleSlug}
            variant="secondary"
          />
        </div>
      </section>
    </div>
  );
}
