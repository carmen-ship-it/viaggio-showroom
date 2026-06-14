"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FallbackMedia } from "@/components/media/FallbackMedia";
import { MediaImage } from "@/components/media/MediaImage";
import { MediaLoadingShimmer } from "@/components/media/MediaLoadingShimmer";
import { useMediaContext } from "@/components/media/MediaProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { crossfade, transition } from "@/lib/motion/variants";
import { cn } from "@/lib/utils/cn";

type VideoMode = "video" | "poster" | "fallback-image" | "placeholder";

interface MediaVideoProps {
  mediaId: string;
  className?: string;
  overlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  playsInline?: boolean;
  objectFit?: "cover" | "contain";
  preferPosterOnReducedMotion?: boolean;
}

export function MediaVideo({
  mediaId,
  className,
  overlay = true,
  loop = true,
  muted = true,
  autoPlay = true,
  playsInline = true,
  objectFit = "cover",
  preferPosterOnReducedMotion = true,
}: MediaVideoProps) {
  const context = useMediaContext();
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<VideoMode>("video");
  const [failedPoster, setFailedPoster] = useState(false);
  const [mediaLoaded, setMediaLoaded] = useState(false);

  const resolved = context?.resolve(mediaId);
  const fallbackId = resolved?.fallbackId;

  const posterAvailable = useMemo(() => {
    if (!resolved?.posterSrc) return false;
    return context?.availability[`${mediaId}__poster`] ?? true;
  }, [context?.availability, mediaId, resolved?.posterSrc]);

  useEffect(() => {
    setMediaLoaded(false);
  }, [mediaId, mode, resolved?.src, resolved?.posterSrc]);

  useEffect(() => {
    if (!context || !resolved) {
      setMode("placeholder");
      return;
    }

    if (preferPosterOnReducedMotion && reducedMotion) {
      if (posterAvailable && resolved.posterSrc) {
        setMode("poster");
        return;
      }
      if (fallbackId) {
        setMode("fallback-image");
        return;
      }
      setMode("placeholder");
      return;
    }

    if (resolved.status === "placeholder" || !resolved.src) {
      if (fallbackId) {
        setMode("fallback-image");
      } else {
        setMode("placeholder");
      }
      return;
    }

    setMode("video");
  }, [
    context,
    resolved,
    fallbackId,
    posterAvailable,
    preferPosterOnReducedMotion,
    reducedMotion,
  ]);

  const handleVideoError = useCallback(() => {
    if (posterAvailable && resolved?.posterSrc && !failedPoster) {
      setMode("poster");
      return;
    }
    if (fallbackId) {
      setMode("fallback-image");
      return;
    }
    setMode("placeholder");
  }, [failedPoster, fallbackId, posterAvailable, resolved?.posterSrc]);

  if (!context || !resolved) {
    return (
      <FallbackMedia
        mediaId={mediaId}
        className={className}
        overlay={overlay}
        animate={!reducedMotion}
      />
    );
  }

  if (mode === "placeholder") {
    return (
      <FallbackMedia
        mediaId={mediaId}
        className={className}
        overlay={overlay}
        animate={!reducedMotion}
      />
    );
  }

  if (mode === "fallback-image" && fallbackId) {
    return (
      <MediaImage
        mediaId={fallbackId}
        className={className}
        overlay={overlay}
        animate={!reducedMotion}
        objectFit={objectFit}
      />
    );
  }

  if (mode === "poster" && resolved.posterSrc) {
    return (
      <div className={cn("relative overflow-hidden bg-[var(--color-surface)]", className)}>
        <AnimatePresence mode="sync">
          {!mediaLoaded ? <MediaLoadingShimmer key="poster-shimmer" /> : null}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div
            key={resolved.posterSrc}
            className="absolute inset-0"
            initial={reducedMotion ? false : crossfade.initial}
            animate={crossfade.animate}
            exit={reducedMotion ? undefined : crossfade.exit}
            transition={transition.crossfade}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resolved.posterSrc}
              alt={resolved.alt}
              className={cn(
                "absolute inset-0 h-full w-full",
                objectFit === "cover" ? "object-cover" : "object-contain",
              )}
              onLoad={() => setMediaLoaded(true)}
              onError={() => {
                setFailedPoster(true);
                if (fallbackId) {
                  setMode("fallback-image");
                } else {
                  setMode("placeholder");
                }
              }}
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </AnimatePresence>
        {overlay ? (
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-[var(--color-background)]/40" />
        ) : null}
      </div>
    );
  }

  if (!resolved.src) {
    return (
      <FallbackMedia
        mediaId={mediaId}
        className={className}
        overlay={overlay}
        animate={!reducedMotion}
      />
    );
  }

  return (
    <div className={cn("relative overflow-hidden bg-[var(--color-surface)]", className)}>
      <AnimatePresence mode="sync">
        {!mediaLoaded ? <MediaLoadingShimmer key="video-shimmer" /> : null}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.div
          key={resolved.src}
          className="absolute inset-0"
          initial={reducedMotion ? false : crossfade.initial}
          animate={crossfade.animate}
          exit={reducedMotion ? undefined : crossfade.exit}
          transition={transition.crossfade}
        >
          <video
            ref={videoRef}
            src={resolved.src}
            poster={resolved.posterSrc}
            className={cn(
              "absolute inset-0 h-full w-full",
              objectFit === "cover" ? "object-cover" : "object-contain",
            )}
            loop={loop}
            muted={muted}
            autoPlay={autoPlay}
            playsInline={playsInline}
            onLoadedData={() => setMediaLoaded(true)}
            onError={handleVideoError}
          />
        </motion.div>
      </AnimatePresence>
      {overlay ? (
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-[var(--color-background)]/40" />
      ) : null}
    </div>
  );
}
