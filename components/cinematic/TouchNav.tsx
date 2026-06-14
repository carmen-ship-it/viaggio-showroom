"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  demoPrimaryCtaClass,
  shouldHighlightPrimaryCta,
} from "@/lib/config/demo-mode";
import { useInteractionSound } from "@/lib/audio/useInteractionSound";
import { cn } from "@/lib/utils/cn";

interface TouchNavProps {
  backHref?: string;
  backLabel?: string;
  onBack?: () => void;
  nextHref?: string;
  nextLabel?: string;
  onNext?: () => void;
  className?: string;
  variant?: "dark" | "light";
}

export function TouchNav({
  backHref,
  backLabel = "Atrás",
  onBack,
  nextHref,
  nextLabel = "Continuar",
  onNext,
  className,
  variant = "dark",
}: TouchNavProps) {
  const { playNavBack, playStepAdvance } = useInteractionSound();
  const isLight = variant === "light";

  const handleBack = () => {
    playNavBack();
    onBack?.();
  };

  const handleNext = () => {
    playStepAdvance();
    onNext?.();
  };

  const backClasses = cn(
    "min-h-[56px] min-w-[132px] rounded-full border px-7 py-3.5 text-base font-medium inline-flex items-center justify-center transition-colors",
    isLight
      ? "border-black/15 bg-white text-[var(--text-on-light)] hover:border-black/25 hover:bg-[var(--canvas-light)]"
      : "border-white/15 bg-white/5 text-white backdrop-blur-md hover:bg-white/10",
  );

  const nextClasses = cn(
    "min-h-[56px] min-w-[180px] rounded-full px-9 py-3.5 text-base font-semibold inline-flex items-center justify-center",
    isLight
      ? "bg-[var(--canvas-deep)] text-white shadow-lg shadow-black/10"
      : "bg-[var(--color-accent)] text-[var(--color-background)] shadow-lg shadow-[var(--color-accent)]/25",
    shouldHighlightPrimaryCta() && (nextHref || onNext) && demoPrimaryCtaClass,
  );

  return (
    <nav
      className={cn(
        "flex items-center justify-between gap-6 px-6 py-6 md:px-[var(--spacing-kiosk)]",
        isLight && "border-t border-black/8 bg-white/95 backdrop-blur-xl",
        className,
      )}
    >
      {backHref ? (
        <Link href={backHref} className={backClasses}>
          {backLabel}
        </Link>
      ) : onBack ? (
        <motion.button
          type="button"
          onClick={handleBack}
          whileTap={{ scale: 0.97 }}
          className={backClasses}
        >
          {backLabel}
        </motion.button>
      ) : (
        <div />
      )}

      {nextHref ? (
        <Link href={nextHref} className={nextClasses} onClick={playStepAdvance}>
          {nextLabel}
        </Link>
      ) : onNext ? (
        <motion.button
          type="button"
          onClick={handleNext}
          whileTap={{ scale: 0.97 }}
          className={nextClasses}
        >
          {nextLabel}
        </motion.button>
      ) : null}
    </nav>
  );
}
