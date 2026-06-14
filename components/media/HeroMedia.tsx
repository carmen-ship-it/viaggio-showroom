"use client";

import { motion } from "framer-motion";
import { MediaSurface } from "@/components/media/MediaSurface";
import { FallbackMedia } from "@/components/media/FallbackMedia";
import { useMediaContext } from "@/components/media/MediaProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

interface HeroMediaProps {
  mediaId: string;
  ambientMediaId?: string;
  className?: string;
  overlay?: boolean;
  animate?: boolean;
  loop?: boolean;
  showAmbientLayer?: boolean;
}

export function HeroMedia({
  mediaId,
  ambientMediaId,
  className,
  overlay = true,
  animate = true,
  loop = true,
  showAmbientLayer = true,
}: HeroMediaProps) {
  const reducedMotion = useReducedMotion();
  const context = useMediaContext();
  const primaryId =
    reducedMotion && ambientMediaId ? ambientMediaId : mediaId;

  if (!context) {
    return (
      <FallbackMedia
        mediaId={primaryId}
        className={className}
        overlay={overlay}
        animate={animate && !reducedMotion}
      />
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {showAmbientLayer && ambientMediaId && !reducedMotion ? (
        <MediaSurface
          mediaId={ambientMediaId}
          className="absolute inset-0 scale-105 opacity-50 blur-sm"
          overlay={false}
          animate={animate}
          loop={loop}
          autoPlay
          muted
        />
      ) : null}

      <MediaSurface
        mediaId={primaryId}
        className="absolute inset-0"
        overlay={overlay}
        animate={animate && !reducedMotion}
        loop={loop}
        autoPlay
        muted
        preferPosterOnReducedMotion
      />

      {overlay ? (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--canvas-deep) 0%, transparent 50%, rgba(10,12,16,0.35) 100%)",
          }}
        />
      ) : null}

      {!reducedMotion && animate ? (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 50% 60%, rgba(200,169,110,0.15) 0%, transparent 60%)",
          }}
          animate={{ opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
    </div>
  );
}
