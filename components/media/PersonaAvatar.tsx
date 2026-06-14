"use client";

import { motion } from "framer-motion";
import type { Persona } from "@/types/persona";
import { getFallbackSpec } from "@/lib/media/placeholder-library";
import { PersonaIllustration } from "@/components/media/fallback-art/FallbackArtwork";
import { MediaImage } from "@/components/media/MediaImage";
import { cn } from "@/lib/utils/cn";

interface PersonaAvatarProps {
  persona: Persona;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showRing?: boolean;
  useManifest?: boolean;
}

const SIZES = {
  sm: "h-16 w-16",
  md: "h-24 w-24",
  lg: "h-32 w-32",
  xl: "h-40 w-40",
};

const ILLUSTRATION_SIZES = {
  sm: "h-14 w-14",
  md: "h-20 w-20",
  lg: "h-28 w-28",
  xl: "h-36 w-36",
};

export function PersonaAvatar({
  persona,
  size = "md",
  className,
  showRing = true,
  useManifest = true,
}: PersonaAvatarProps) {
  const spec = getFallbackSpec(persona.avatarMediaId);
  const accent = persona.colorAccent ?? spec.accent;

  if (useManifest) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-full shadow-xl",
          SIZES[size],
          showRing && "ring-2 ring-white/15",
          className,
        )}
      >
        <MediaImage
          mediaId={persona.avatarMediaId}
          className="h-full w-full"
          overlay={false}
          animate={false}
          objectFit="cover"
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(135deg, transparent 40%, ${accent}22 100%)`,
          }}
        />
      </div>
    );
  }

  return (
    <motion.div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-full shadow-xl",
        SIZES[size],
        showRing && "ring-2 ring-white/15",
        className,
      )}
      style={{ background: spec.gradient }}
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.45 }}
      role="img"
      aria-label={spec.caption}
    >
      <PersonaIllustration
        name={persona.name}
        accent={accent}
        className={ILLUSTRATION_SIZES[size]}
      />
    </motion.div>
  );
}
