"use client";

import { motion } from "framer-motion";
import { getFallbackSpec } from "@/lib/media/placeholder-library";
import { shouldHideDeveloperTools } from "@/lib/config/demo-mode";
import { FallbackArtwork } from "@/components/media/fallback-art/FallbackArtwork";
import { cn } from "@/lib/utils/cn";

export interface FallbackMediaProps {
  mediaId: string;
  className?: string;
  overlay?: boolean;
  showCaption?: boolean;
  showLabel?: boolean;
  animate?: boolean;
  variant?: "dark" | "light";
}

export function FallbackMedia({
  mediaId,
  className,
  overlay = true,
  showCaption = true,
  showLabel = false,
  animate = true,
  variant = "dark",
}: FallbackMediaProps) {
  const spec = getFallbackSpec(mediaId);
  const isLight = variant === "light";
  const hideCaptions = shouldHideDeveloperTools();
  const showDevCaption = showCaption && !hideCaptions;
  const showDevLabel = showLabel && !hideCaptions;
  const isHeroTreatment =
    spec.treatment === "cinematic-hero" ||
    spec.treatment === "exterior-vehicle" ||
    spec.treatment === "ambient-video";

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ background: spec.gradient }}
      role="img"
      aria-label={spec.caption}
    >
      {animate ? (
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 30% 40%, ${spec.accent}33 0%, transparent 55%)`,
          }}
          animate={{ opacity: isHeroTreatment ? [0.35, 0.55, 0.35] : [0.2, 0.38, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}

      {isHeroTreatment ? (
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(ellipse at 50% 55%, ${spec.accent}22 0%, transparent 65%)`,
          }}
        />
      ) : null}

      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center p-8">
        <FallbackArtwork
          spec={spec}
          className={cn(
            "h-auto w-full opacity-80",
            isHeroTreatment ? "max-w-4xl opacity-90" : "max-w-2xl",
          )}
        />
      </div>

      {overlay ? (
        <div
          className={cn(
            "absolute inset-0",
            isLight
              ? "bg-gradient-to-t from-[#f5f5f7] via-transparent to-[#f5f5f7]/50"
              : "bg-gradient-to-t from-[var(--canvas-deep)] via-transparent to-[var(--canvas-deep)]/40",
          )}
        />
      ) : null}

      {(showDevCaption || showDevLabel) ? (
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6">
          {showDevLabel ? (
            <p
              className={cn(
                "text-[10px] font-medium uppercase tracking-[0.2em]",
                isLight ? "text-black/35" : "text-white/40",
              )}
            >
              {spec.label}
            </p>
          ) : null}
          {showDevCaption ? (
            <p
              className={cn(
                "mt-1 max-w-lg text-xs leading-relaxed md:text-sm",
                isLight ? "text-black/50" : "text-white/55",
              )}
            >
              {spec.caption}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
