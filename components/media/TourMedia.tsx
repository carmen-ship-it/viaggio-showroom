"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MediaSurface } from "@/components/media/MediaSurface";
import { FallbackMedia } from "@/components/media/FallbackMedia";
import { useMediaContext } from "@/components/media/MediaProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { crossfade, transition } from "@/lib/motion/variants";
import { cn } from "@/lib/utils/cn";

interface TourMediaProps {
  mediaId: string;
  className?: string;
  title?: string;
  transitionLine?: string;
  showStepCaption?: boolean;
  overlay?: boolean;
}

export function TourMedia({
  mediaId,
  className,
  title,
  transitionLine,
  showStepCaption = true,
  overlay = true,
}: TourMediaProps) {
  const context = useMediaContext();
  const reducedMotion = useReducedMotion();

  if (!context) {
    return (
      <div className={cn("relative overflow-hidden rounded-2xl", className)}>
        <FallbackMedia mediaId={mediaId} className="absolute inset-0 min-h-[inherit]" />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={mediaId}
          className="absolute inset-0 min-h-[inherit]"
          initial={reducedMotion ? false : crossfade.initial}
          animate={crossfade.animate}
          exit={reducedMotion ? undefined : crossfade.exit}
          transition={transition.crossfade}
        >
          <MediaSurface
            mediaId={mediaId}
            className="absolute inset-0 min-h-[inherit]"
            overlay={false}
            loop
            autoPlay
            muted
            preferPosterOnReducedMotion
          />
        </motion.div>
      </AnimatePresence>

      {overlay ? (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      ) : null}

      {showStepCaption && (title || transitionLine) ? (
        <div className="relative z-10 flex min-h-[inherit] items-end p-6 md:p-8">
          <div>
            {transitionLine ? (
              <p className="mb-2 text-sm italic text-white/55">{transitionLine}</p>
            ) : null}
            {title ? (
              <h2 className="text-3xl font-light md:text-4xl">{title}</h2>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
