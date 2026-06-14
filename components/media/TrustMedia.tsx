"use client";

import { MediaSurface } from "@/components/media/MediaSurface";
import { FallbackMedia } from "@/components/media/FallbackMedia";
import { useMediaContext } from "@/components/media/MediaProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils/cn";

interface TrustMediaProps {
  mediaId: string;
  variant?: "dark" | "light";
  className?: string;
  opacity?: number;
  animate?: boolean;
  overlay?: boolean;
}

export function TrustMedia({
  mediaId,
  variant = "dark",
  className,
  opacity = 0.4,
  animate = true,
  overlay = true,
}: TrustMediaProps) {
  const reducedMotion = useReducedMotion();
  const context = useMediaContext();
  const isDark = variant === "dark";

  if (!context) {
    return (
      <FallbackMedia
        mediaId={mediaId}
        className={cn("absolute inset-0", className)}
        overlay={overlay}
        animate={animate && !reducedMotion}
      />
    );
  }

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{ opacity }}
    >
      <MediaSurface
        mediaId={mediaId}
        className="absolute inset-0"
        overlay={false}
        animate={animate && !reducedMotion}
        autoPlay={!reducedMotion}
        muted
        loop
        preferPosterOnReducedMotion
      />
      {overlay ? (
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? "linear-gradient(to bottom, rgba(10,12,16,0.55) 0%, rgba(10,12,16,0.75) 100%)"
              : "linear-gradient(to bottom, rgba(245,245,247,0.4) 0%, rgba(245,245,247,0.85) 100%)",
          }}
        />
      ) : null}
    </div>
  );
}
