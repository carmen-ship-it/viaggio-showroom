"use client";

import { motion } from "framer-motion";
import { MediaSurface } from "@/components/media/MediaSurface";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

interface KenBurnsBackgroundProps {
  mediaId: string;
  className?: string;
  overlay?: boolean;
  showLabel?: boolean;
}

export function KenBurnsBackground({
  mediaId,
  className,
  overlay = false,
  showLabel = false,
}: KenBurnsBackgroundProps) {
  const reduced = useReducedMotion();

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 scale-105"
        animate={
          reduced
            ? undefined
            : {
                scale: [1.05, 1.12, 1.05],
                x: ["0%", "2%", "0%"],
                y: ["0%", "-1%", "0%"],
              }
        }
        transition={
          reduced
            ? undefined
            : { duration: 24, repeat: Infinity, ease: "linear" }
        }
      >
        <MediaSurface
          mediaId={mediaId}
          className="h-full w-full"
          overlay={overlay}
          showLabel={showLabel}
          animate={!reduced}
          loop
          autoPlay
          muted
          preferPosterOnReducedMotion
        />
      </motion.div>
    </div>
  );
}
