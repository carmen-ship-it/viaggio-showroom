"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { fadeUp, transition } from "@/lib/motion/variants";

interface StoryTransitionProps {
  children: React.ReactNode;
  className?: string;
  accent?: "trust" | "sofia" | "warm";
}

const accentColor = {
  trust: "text-[var(--color-accent-trust)]",
  sofia: "text-[var(--color-persona-sofia)]",
  warm: "text-[var(--color-accent-warm)]",
};

export function StoryTransition({
  children,
  className,
  accent = "warm",
}: StoryTransitionProps) {
  return (
    <motion.div
      className={cn("relative py-8 md:py-12", className)}
      initial={fadeUp.initial}
      whileInView={fadeUp.animate}
      viewport={{ once: true }}
      transition={transition.reveal}
    >
      <div
        className={cn("mx-auto max-w-2xl border-l-2 pl-6 md:pl-8", accentColor[accent])}
        style={{ borderColor: "currentColor", opacity: 0.6 }}
      >
        <p className="text-xl italic leading-relaxed text-white/75 md:text-2xl md:leading-relaxed">
          {children}
        </p>
      </div>
    </motion.div>
  );
}
