"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { shouldEnableHeroHotspotsInDemo } from "@/lib/config/demo-mode";
import { cn } from "@/lib/utils/cn";

interface HotSpotMarkerProps {
  href: string;
  label: string;
  index?: number;
  className?: string;
  kioskMode?: boolean;
}

export function HotSpotMarker({
  href,
  label,
  index = 0,
  className,
  kioskMode = false,
}: HotSpotMarkerProps) {
  const reduced = useReducedMotion();
  const executiveKiosk = kioskMode || shouldEnableHeroHotspotsInDemo();
  const markerSize = executiveKiosk ? "h-16 w-16" : "h-11 w-11";
  const ringSize = executiveKiosk ? "h-16 w-16" : "h-14 w-14";

  return (
    <motion.div
      className={cn("pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2", className)}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.5 + index * 0.1 }}
    >
      <Link href={href} className="group flex flex-col items-center gap-2">
        <span className={cn("relative flex items-center justify-center", ringSize)}>
          {!reduced ? (
            <motion.span
              className="absolute inset-0 rounded-full border border-white/40"
              animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : null}
          <span
            className={cn(
              "relative flex items-center justify-center rounded-full border border-white/30 bg-[var(--surface-glass)] text-lg font-light backdrop-blur-md transition-colors group-hover:border-[var(--color-accent-warm)] group-hover:bg-white/15",
              markerSize,
            )}
          >
            +
          </span>
        </span>
        <span
          className={cn(
            "rounded-full bg-black/55 px-3 py-1 text-[12px] font-medium uppercase tracking-[0.08em] text-white/90 backdrop-blur-md",
            executiveKiosk ? "opacity-100" : "opacity-0 transition-opacity group-hover:opacity-100 md:opacity-80",
          )}
        >
          {label}
        </span>
      </Link>
    </motion.div>
  );
}
