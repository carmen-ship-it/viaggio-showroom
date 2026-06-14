"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp, transition } from "@/lib/motion/variants";
import type { StatCalloutBlockData } from "@/types/blocks";
import { cn } from "@/lib/utils/cn";

interface StatCalloutRendererProps {
  data: StatCalloutBlockData;
  className?: string;
}

export function StatCalloutRenderer({ data, className }: StatCalloutRendererProps) {
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
          className="rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 px-5 py-6 text-center"
          variants={fadeUp}
          transition={transition.normal}
        >
          <p className="text-3xl font-light text-[var(--color-accent)] md:text-4xl">
            {stat.value}
          </p>
          <p className="mt-2 text-xs uppercase tracking-widest text-white/50">
            {stat.label}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}
