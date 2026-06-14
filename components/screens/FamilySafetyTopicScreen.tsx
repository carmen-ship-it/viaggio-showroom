"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Topic } from "@/types/content";
import type { Persona } from "@/types/persona";
import { MediaSurface } from "@/components/media/MediaSurface";
import { ContentBlockRenderer } from "@/components/content/ContentBlockRenderer";
import { TouchNav } from "@/components/cinematic/TouchNav";
import { routes } from "@/lib/navigation/routes";
import { fadeUp, staggerContainer, transition } from "@/lib/motion/variants";
import { useSession } from "@/lib/session/SessionProvider";
import { useEffect } from "react";

interface FamilySafetyTopicScreenProps {
  topic: Topic;
  diego: Persona;
  carlos: Persona;
  backHref: string;
}

export function FamilySafetyTopicScreen({
  topic,
  diego,
  carlos,
  backHref,
}: FamilySafetyTopicScreenProps) {
  const { recordTrustSignal, recordTopicVisit } = useSession();
  const sorted = [...topic.blocks].sort((a, b) => a.sortOrder - b.sortOrder);
  const hero = sorted.find((b) => b.type === "hero");
  const diegoBlocks = sorted.filter(
    (b) => b.type !== "hero" && b.personaId === "diego",
  );
  const carlosBlocks = sorted.filter(
    (b) =>
      b.type !== "hero" &&
      b.personaId === "carlos" &&
      b.type !== "cta",
  );
  const ctaBlocks = sorted.filter((b) => b.type === "cta");

  useEffect(() => {
    recordTopicVisit(topic.id);
    recordTrustSignal("family_safety");
  }, [topic.id, recordTopicVisit, recordTrustSignal]);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--canvas-soft)]">
      {hero ? (
        <div className="relative min-h-[45vh] overflow-hidden">
          <MediaSurface
            mediaId={(hero.data as { mediaId?: string })?.mediaId ?? "gs4-max-family-safety-hero"}
            className="absolute inset-0"
          />
          <div className="relative z-10 flex min-h-[45vh] flex-col justify-end px-6 pb-10 pt-24 md:px-12">
            <motion.p
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={transition.normal}
              className="text-xs uppercase tracking-[0.35em] text-[#D4C4B0]"
            >
              Diego · Seguridad familiar
            </motion.p>
            <motion.h1
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...transition.normal, delay: 0.08 }}
              className="mt-2 max-w-3xl text-4xl font-light md:text-5xl"
            >
              {(hero.data as { headline?: string })?.headline ?? topic.title}
            </motion.h1>
            {(hero.data as { subheadline?: string })?.subheadline ? (
              <motion.p
                initial={fadeUp.initial}
                animate={fadeUp.animate}
                transition={{ ...transition.normal, delay: 0.12 }}
                className="mt-4 max-w-2xl text-lg text-white/70"
              >
                {(hero.data as { subheadline?: string }).subheadline}
              </motion.p>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="flex-1 px-6 py-10 md:px-12 md:py-14">
        <motion.section
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mx-auto max-w-4xl space-y-8"
        >
          <motion.div variants={fadeUp} transition={transition.normal}>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#D4C4B0]">
              Acto 1 · {diego.name}
            </p>
            {diegoBlocks
              .filter((b) => b.type !== "cta")
              .map((block) => (
                <ContentBlockRenderer
                  key={block.id}
                  block={block}
                  vehicleSlug={topic.vehicleSlug}
                  themeId={topic.themeId}
                  persona={diego}
                />
              ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ ...transition.normal, delay: 0.2 }}
            className="rounded-3xl border border-[var(--color-accent-trust)]/20 bg-[var(--canvas-deep)]/60 p-6 md:p-10"
          >
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[var(--color-accent-trust)]">
              Acto 2 · {carlos.name}
            </p>
            {carlosBlocks.map((block) => (
              <ContentBlockRenderer
                key={block.id}
                block={block}
                vehicleSlug={topic.vehicleSlug}
                themeId={topic.themeId}
                persona={carlos}
              />
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={transition.normal}
            className="flex flex-wrap gap-4"
          >
            {ctaBlocks.map((block) => (
              <ContentBlockRenderer
                key={block.id}
                block={block}
                vehicleSlug={topic.vehicleSlug}
                themeId={topic.themeId}
                persona={diego}
              />
            ))}
            <Link
              href={routes.journey(topic.vehicleSlug, "diego")}
              className="inline-flex min-h-[52px] items-center rounded-full border border-white/20 px-8 py-3 text-sm transition-colors hover:border-[#D4C4B0]"
            >
              Tour familiar con Diego →
            </Link>
          </motion.div>
        </motion.section>
      </div>

      <TouchNav
        backHref={backHref}
        backLabel="Volver"
        nextHref={routes.testDriveInfo(topic.vehicleSlug)}
        nextLabel="Prueba con tu familia"
      />
    </div>
  );
}
