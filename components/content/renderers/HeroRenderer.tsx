"use client";

import { motion } from "framer-motion";
import { MediaSurface } from "@/components/media/MediaSurface";
import { fadeUp, transition } from "@/lib/motion/variants";
import type { HeroBlockData } from "@/types/blocks";
import { cn } from "@/lib/utils/cn";

interface HeroRendererProps {
  data: HeroBlockData;
  fullBleed?: boolean;
  className?: string;
}

export function HeroRenderer({ data, fullBleed = false, className }: HeroRendererProps) {
  return (
    <motion.section
      className={cn(
        "relative overflow-hidden rounded-2xl",
        fullBleed ? "min-h-[50vh] rounded-none" : "min-h-[280px]",
        className,
      )}
      initial={fadeUp.initial}
      whileInView={fadeUp.animate}
      viewport={{ once: true, margin: "-10%" }}
      transition={transition.normal}
    >
      <MediaSurface mediaId={data.mediaId} className="absolute inset-0" />
      <div className="relative z-10 flex h-full min-h-[inherit] flex-col justify-end p-8 md:p-12">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[var(--color-accent)]">
          Experiencia
        </p>
        <h2 className="max-w-2xl text-3xl font-light tracking-tight md:text-5xl">
          {data.headline}
        </h2>
        {data.subheadline ? (
          <p className="mt-3 max-w-xl text-base text-white/70 md:text-lg">
            {data.subheadline}
          </p>
        ) : null}
      </div>
    </motion.section>
  );
}
