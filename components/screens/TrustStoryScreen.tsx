"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { VehicleTrustStory } from "@/types/trust";
import type { Persona } from "@/types/persona";
import type { Dealership } from "@/types/dealership";
import { TrustMedia } from "@/components/media/TrustMedia";
import { ContentBlockRenderer } from "@/components/content/ContentBlockRenderer";
import { TouchNav } from "@/components/cinematic/TouchNav";
import { useSession } from "@/lib/session/SessionProvider";
import { fadeUp, transition } from "@/lib/motion/variants";
import { cn } from "@/lib/utils/cn";

interface TrustStoryScreenProps {
  story: VehicleTrustStory;
  persona: Persona;
  dealership: Dealership;
  tourHref: string;
  backHref: string;
}

export function TrustStoryScreen({
  story,
  persona,
  dealership,
  tourHref,
  backHref,
}: TrustStoryScreenProps) {
  const { recordTrustSignal } = useSession();

  useEffect(() => {
    recordTrustSignal("trust_story_view");
  }, [recordTrustSignal]);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="snap-y snap-mandatory overflow-y-auto">
        {story.chapters.map((chapter, index) => {
          const isDark = chapter.variant === "dark";
          return (
            <section
              key={chapter.id}
              className={cn(
                "relative flex min-h-screen snap-start flex-col justify-center px-6 py-20 md:px-[var(--spacing-kiosk)]",
                isDark ? "bg-[var(--canvas-deep)]" : "bg-[var(--canvas-light)] text-[var(--text-on-light)]",
              )}
            >
              {chapter.mediaId ? (
                <TrustMedia
                  mediaId={chapter.mediaId}
                  variant={isDark ? "dark" : "light"}
                  animate={!isDark}
                />
              ) : null}
              <div className="relative z-10 mx-auto w-full max-w-4xl">
                <motion.div
                  initial={fadeUp.initial}
                  whileInView={fadeUp.animate}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ ...transition.slow, delay: index * 0.1 }}
                >
                  <p
                    className={cn(
                      "type-label",
                      isDark ? "text-[var(--color-accent-trust)]" : "text-[var(--color-viaggio)]",
                    )}
                  >
                    Capítulo {index + 1}
                  </p>
                  <h2 className="type-headline mt-4 text-balance">{chapter.title}</h2>
                  {chapter.subtitle ? (
                    <p
                      className={cn(
                        "type-kiosk-lead mt-6 max-w-2xl",
                        isDark ? "text-white/65" : "text-[var(--text-secondary-on-light)]",
                      )}
                    >
                      {chapter.subtitle}
                    </p>
                  ) : null}

                  <div className="mt-12 space-y-8">
                    {chapter.blocks
                      .sort((a, b) => a.sortOrder - b.sortOrder)
                      .map((block) => (
                        <ContentBlockRenderer
                          key={block.id}
                          block={block}
                          vehicleSlug={story.vehicleSlug}
                          persona={persona}
                        />
                      ))}
                  </div>

                  {index === story.chapters.length - 1 ? (
                    <div
                      className={cn(
                        "mt-10 rounded-2xl border p-6",
                        isDark ? "border-white/10 bg-black/30" : "border-black/10 bg-white/80",
                      )}
                    >
                      <p className="text-sm font-medium uppercase tracking-wider opacity-60">
                        Showroom Santa Cruz
                      </p>
                      <p className="mt-2 text-lg">{dealership.address}</p>
                      <p className="mt-1 text-sm opacity-70">{dealership.hours.weekdays}</p>
                    </div>
                  ) : null}
                </motion.div>
              </div>
            </section>
          );
        })}
      </div>

      <div className="border-t border-white/10 bg-[var(--canvas-soft)]">
        <TouchNav
          backHref={backHref}
          backLabel="Preguntas frecuentes"
          nextHref={tourHref}
          nextLabel="Tour con Carlos"
        />
        <div className="px-6 pb-8 text-center md:px-[var(--spacing-kiosk)]">
          <Link
            href={`https://maps.google.com/?q=${dealership.coordinates.lat},${dealership.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--color-accent-trust)] underline-offset-4 hover:underline"
          >
            Ver ubicación en mapa
          </Link>
        </div>
      </div>
    </div>
  );
}
