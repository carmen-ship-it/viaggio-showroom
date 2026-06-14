"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

interface MediaLoadingShimmerProps {
  className?: string;
  variant?: "dark" | "light";
}

export function MediaLoadingShimmer({
  className,
  variant = "dark",
}: MediaLoadingShimmerProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div
        className={cn(
          "absolute inset-0",
          variant === "light" ? "bg-[var(--canvas-light)]" : "bg-[var(--color-surface)]",
          className,
        )}
        aria-hidden
      />
    );
  }

  return (
    <motion.div
      className={cn(
        "absolute inset-0 overflow-hidden",
        variant === "light" ? "bg-[var(--canvas-light)]" : "bg-[var(--color-surface)]",
        className,
      )}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      aria-hidden
    >
      <div className="media-shimmer absolute inset-0" />
    </motion.div>
  );
}
