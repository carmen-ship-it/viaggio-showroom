"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FallbackMedia } from "@/components/media/FallbackMedia";
import { MediaLoadingShimmer } from "@/components/media/MediaLoadingShimmer";
import { useMediaContext } from "@/components/media/MediaProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { crossfade, transition } from "@/lib/motion/variants";
import { cn } from "@/lib/utils/cn";

interface MediaImageProps {
  mediaId: string;
  className?: string;
  overlay?: boolean;
  showLabel?: boolean;
  animate?: boolean;
  objectFit?: "cover" | "contain";
}

export function MediaImage({
  mediaId,
  className,
  overlay = true,
  showLabel = false,
  animate = true,
  objectFit = "cover",
}: MediaImageProps) {
  const context = useMediaContext();
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(mediaId);
  const [failedIds, setFailedIds] = useState<Set<string>>(() => new Set());
  const [loadedIds, setLoadedIds] = useState<Set<string>>(() => new Set());
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setActiveId(mediaId);
  }, [mediaId]);

  const resolved = context?.resolve(activeId);
  const src = resolved?.src;

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoadedIds((prev) => new Set(prev).add(activeId));
    }
  }, [activeId, src]);

  const showPlaceholder = !context || !resolved || !src || failedIds.has(activeId);
  const isLoading = !showPlaceholder && !loadedIds.has(activeId);

  const handleError = useCallback(() => {
    setFailedIds((prev) => new Set(prev).add(activeId));
    setLoadedIds((prev) => {
      const next = new Set(prev);
      next.delete(activeId);
      return next;
    });

    const nextFallback = resolved?.fallbackId;
    if (nextFallback && nextFallback !== activeId && !failedIds.has(nextFallback)) {
      setActiveId(nextFallback);
    }
  }, [activeId, failedIds, resolved?.fallbackId]);

  const handleLoad = useCallback(() => {
    setLoadedIds((prev) => new Set(prev).add(activeId));
  }, [activeId]);

  if (showPlaceholder) {
    return (
      <FallbackMedia
        mediaId={mediaId}
        className={className}
        overlay={overlay}
        showLabel={showLabel}
        showCaption={!showLabel}
        animate={animate}
      />
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-[var(--color-surface)]", className)}>
      <AnimatePresence mode="sync">
        {isLoading ? (
          <MediaLoadingShimmer key={`shimmer-${activeId}`} />
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeId}-${src}`}
          className="absolute inset-0"
          initial={reducedMotion ? false : crossfade.initial}
          animate={crossfade.animate}
          exit={reducedMotion ? undefined : crossfade.exit}
          transition={transition.crossfade}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={src}
            alt={resolved.alt}
            className={cn(
              "absolute inset-0 h-full w-full",
              objectFit === "cover" ? "object-cover" : "object-contain",
            )}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
            decoding="async"
          />
        </motion.div>
      </AnimatePresence>

      {overlay ? (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-[var(--color-background)]/40" />
      ) : null}
      {showLabel ? (
        <div className="absolute bottom-4 left-4 rounded bg-black/40 px-2 py-1 text-[10px] uppercase tracking-widest text-white/50">
          {mediaId.replace(/[-_]/g, " ")}
        </div>
      ) : null}
    </div>
  );
}
