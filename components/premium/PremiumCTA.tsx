"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type CTATier = "primary" | "secondary" | "tertiary" | "soft";

interface PremiumCTAProps {
  href?: string;
  onClick?: () => void;
  tier?: CTATier;
  children: React.ReactNode;
  className?: string;
  accent?: "warm" | "trust" | "sofia" | "white";
}

const tierStyles: Record<CTATier, string> = {
  primary:
    "min-h-[56px] md:min-h-[64px] rounded-full bg-white px-9 py-3.5 text-base md:text-lg font-semibold text-[var(--canvas-deep)] shadow-lg shadow-white/10 hover:bg-white/95",
  secondary:
    "min-h-[56px] md:min-h-[64px] rounded-full border border-white/20 bg-[var(--surface-glass)] px-8 py-3.5 text-base md:text-lg font-medium backdrop-blur-md hover:border-white/35 hover:bg-white/10",
  tertiary:
    "min-h-[52px] rounded-full px-6 py-2.5 text-base text-white/70 underline-offset-4 hover:text-white hover:underline",
  soft:
    "min-h-[56px] rounded-full border border-white/15 bg-white/[0.06] px-7 py-3 text-base backdrop-blur-md hover:bg-white/10",
};

const accentRing = {
  warm: "hover:border-[var(--color-accent-warm)]/50",
  trust: "hover:border-[var(--color-accent-trust)]/50",
  sofia: "hover:border-[var(--color-persona-sofia)]/50",
  white: "",
};

export function PremiumCTA({
  href,
  onClick,
  tier = "secondary",
  children,
  className,
  accent = "white",
}: PremiumCTAProps) {
  const classes = cn(
    "inline-flex items-center justify-center transition-colors duration-300",
    tierStyles[tier],
    tier === "secondary" && accentRing[accent],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
