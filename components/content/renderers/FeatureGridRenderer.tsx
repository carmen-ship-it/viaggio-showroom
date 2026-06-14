"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp, transition } from "@/lib/motion/variants";
import type { FeatureGridBlockData } from "@/types/blocks";
import { cn } from "@/lib/utils/cn";

const ICONS: Record<string, string> = {
  brake: "🛑",
  lane: "↔️",
  "camera-360": "📷",
  cruise: "🛣️",
  shield: "🛡️",
  fuel: "⛽",
  display: "📱",
  radar: "📡",
  space: "👨‍👩‍👧",
  ac: "❄️",
  cargo: "🧳",
  service: "🔧",
  warranty: "✓",
  chip: "💡",
  connect: "🔗",
  default: "◆",
};

interface FeatureGridRendererProps {
  data: FeatureGridBlockData;
  className?: string;
}

export function FeatureGridRenderer({ data, className }: FeatureGridRendererProps) {
  return (
    <motion.div
      className={cn("grid gap-4 sm:grid-cols-2", className)}
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-10%" }}
    >
      {data.features.map((feature, index) => (
        <motion.article
          key={`${feature.title}-${index}`}
          className="rounded-2xl border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm"
          variants={fadeUp}
          transition={transition.normal}
        >
          <span className="mb-4 block text-2xl" aria-hidden>
            {ICONS[feature.icon] ?? ICONS.default}
          </span>
          <h3 className="text-lg font-medium text-white">{feature.title}</h3>
          <p className="mt-3 text-base leading-relaxed text-white/60">
            {feature.description}
          </p>
        </motion.article>
      ))}
    </motion.div>
  );
}
