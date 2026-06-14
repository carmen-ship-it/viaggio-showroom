"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp, transition } from "@/lib/motion/variants";
import type { StatCalloutBlockData } from "@/types/blocks";
import type { ContentTone } from "@/types/content-tone";
import { cn } from "@/lib/utils/cn";

interface StatCalloutRendererProps {
  data: StatCalloutBlockData;
  className?: string;
  tone?: ContentTone;
}

export function StatCalloutRenderer({
  data,
  className,
  tone = "dark",
}: StatCalloutRendererProps) {
  const isLight = tone === "light";
  return (
    <motion.div
      className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      {data.stats.map((stat, index) => (
        <motion.div
          key={`${stat.label}-${index}`}
          className={cn(
            "rounded-2xl border px-5 py-6 text-center",
            isLight
              ? "border-[var(--color-viaggio)]/20 bg-white shadow-md shadow-black/5"
              : "border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5",
          )}
          variants={fadeUp}
          transition={transition.normal}
        >
          <p
            className={cn(
              "text-3xl font-semibold md:text-4xl",
              isLight ? "text-[var(--color-viaggio)]" : "font-light text-[var(--color-accent)]",
            )}
          >
            {stat.value}
          </p>
          <p
            className={cn(
              "mt-2 text-xs font-medium uppercase tracking-widest",
              isLight ? "text-[var(--text-secondary-on-light)]" : "text-white/50",
            )}
          >
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
