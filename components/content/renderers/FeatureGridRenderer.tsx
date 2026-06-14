"use client";

import { motion } from "framer-motion";
import { staggerContainer, fadeUp, transition } from "@/lib/motion/variants";
import type { FeatureGridBlockData } from "@/types/blocks";
import type { ContentTone } from "@/types/content-tone";
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
  tone?: ContentTone;
}

export function FeatureGridRenderer({
  data,
  className,
  tone = "dark",
}: FeatureGridRendererProps) {
  const isLight = tone === "light";
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
          className={cn(
            "rounded-2xl border p-6",
            isLight
              ? "border-black/10 bg-white shadow-md shadow-black/5"
              : "border-white/8 bg-white/[0.03] backdrop-blur-sm",
          )}
          variants={fadeUp}
          transition={transition.normal}
        >
          <span className="mb-4 block text-2xl" aria-hidden>
            {ICONS[feature.icon] ?? ICONS.default}
          </span>
          <h3
            className={cn(
              "text-lg font-semibold",
              isLight ? "text-[var(--text-on-light)]" : "font-medium text-white",
            )}
          >
            {feature.title}
          </h3>
          <p
            className={cn(
              "mt-3 text-base leading-relaxed",
              isLight ? "text-[var(--text-secondary-on-light)]" : "text-white/60",
            )}
          >
            {feature.description}
          </p>
        </motion.article>
      ))}
    </motion.div>
  );
}
