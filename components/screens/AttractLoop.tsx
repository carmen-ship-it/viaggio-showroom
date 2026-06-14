"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { HeroMedia } from "@/components/media/HeroMedia";
import { FallbackArtwork } from "@/components/media/fallback-art/FallbackArtwork";
import { getFallbackSpec } from "@/lib/media/placeholder-library";

interface AttractLoopProps {
  mediaId: string;
  tagline: string;
  brand: string;
  vehicleModelName: string;
  onStart: () => void;
}

export function AttractLoop({
  mediaId,
  tagline,
  brand,
  vehicleModelName,
  onStart,
}: AttractLoopProps) {
  const heroSpec = getFallbackSpec(mediaId);
  const startedRef = useRef(false);

  const handleStart = () => {
    if (startedRef.current) return;
    startedRef.current = true;
    onStart();
  };

  return (
    <button
      type="button"
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        handleStart();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        handleStart();
      }}
      className="relative h-screen w-full cursor-pointer overflow-hidden text-left"
      aria-label="Tocá para empezar"
    >
      <HeroMedia
        mediaId={mediaId}
        ambientMediaId="gs4-max-hero-ambient"
        className="absolute inset-0"
        loop
        overlay={false}
        showAmbientLayer
      />
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40"
        aria-hidden
      >
        <FallbackArtwork spec={heroSpec} className="h-auto w-full max-w-5xl" />
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-between px-8 py-14 md:px-[var(--spacing-kiosk)] md:py-16">
        <header className="text-center">
          <p className="type-eyebrow text-white/50">{brand}</p>
        </header>

        <div className="max-w-5xl text-center">
          <p className="type-label text-[var(--color-accent-warm)]">
            {vehicleModelName}
          </p>
          <h1 className="type-display mt-6 text-white">
            {tagline}
          </h1>
        </div>

        <motion.div
          className="flex flex-col items-center gap-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="min-h-[56px] rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-base font-medium tracking-wide backdrop-blur-md inline-flex items-center">
            Tocá para empezar
          </span>
        </motion.div>
      </div>
    </button>
  );
}
