"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { fadeUp, transition } from "@/lib/motion/variants";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "inset" | "elevated";
  accent?: "warm" | "trust" | "sofia" | "carlos" | "none";
  animate?: boolean;
}

const accentBorder = {
  warm: "border-l-[var(--color-accent-warm)]",
  trust: "border-l-[var(--color-accent-trust)]",
  sofia: "border-l-[var(--color-persona-sofia)]",
  carlos: "border-l-[var(--color-accent-trust)]",
  none: "",
};

export function GlassCard({
  children,
  className,
  variant = "default",
  accent = "none",
  animate = true,
}: GlassCardProps) {
  const base = cn(
    "rounded-2xl border backdrop-blur-xl",
    variant === "inset"
      ? "border-white/8 bg-[var(--surface-glass)]"
      : variant === "elevated"
        ? "border-white/12 bg-white/[0.1] shadow-2xl shadow-black/30"
        : "border-white/10 bg-[var(--surface-glass)]",
    accent !== "none" && "border-l-[3px]",
    accent !== "none" && accentBorder[accent],
    className,
  );

  if (!animate) {
    return <div className={base}>{children}</div>;
  }

  return (
    <motion.div
      className={base}
      initial={fadeUp.initial}
      whileInView={fadeUp.animate}
      viewport={{ once: true, margin: "-40px" }}
      transition={transition.reveal}
    >
      {children}
    </motion.div>
  );
}
