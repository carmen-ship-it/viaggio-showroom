"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  demoPrimaryCtaClass,
  shouldHighlightPrimaryCta,
} from "@/lib/config/demo-mode";
import { cn } from "@/lib/utils/cn";

interface TouchNavProps {
  backHref?: string;
  backLabel?: string;
  onBack?: () => void;
  nextHref?: string;
  nextLabel?: string;
  onNext?: () => void;
  className?: string;
}

export function TouchNav({
  backHref,
  backLabel = "Atrás",
  onBack,
  nextHref,
  nextLabel = "Continuar",
  onNext,
  className,
}: TouchNavProps) {
  const backClasses =
    "min-h-[56px] min-w-[132px] rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-base font-medium backdrop-blur-md transition-colors hover:bg-white/10 inline-flex items-center justify-center";

  const nextClasses = cn(
    "min-h-[56px] min-w-[180px] rounded-full bg-[var(--color-accent)] px-9 py-3.5 text-base font-semibold text-[var(--color-background)] shadow-lg shadow-[var(--color-accent)]/25 inline-flex items-center justify-center",
    shouldHighlightPrimaryCta() && (nextHref || onNext) && demoPrimaryCtaClass,
  );

  return (
    <nav
      className={cn(
        "flex items-center justify-between gap-6 px-6 py-6 md:px-[var(--spacing-kiosk)]",
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
          onClick={onBack}
          whileTap={{ scale: 0.97 }}
          className={backClasses}
        >
          {backLabel}
        </motion.button>
      ) : (
        <div />
      )}

      {nextHref ? (
        <Link href={nextHref} className={nextClasses}>
          {nextLabel}
        </Link>
      ) : onNext ? (
        <motion.button
          type="button"
          onClick={onNext}
          whileTap={{ scale: 0.97 }}
          className={nextClasses}
        >
          {nextLabel}
        </motion.button>
      ) : null}
    </nav>
  );
}
