"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useAudio } from "@/lib/audio/AudioProvider";
import { ATTRACT_AUDIO_UNLOCK_PATH } from "@/lib/audio/constants";
import { cn } from "@/lib/utils/cn";

export function AudioUnlockOverlay() {
  const pathname = usePathname() ?? "";
  const { needsUnlockPrompt, unlockAudio } = useAudio();

  if (!needsUnlockPrompt) return null;
  if (pathname === ATTRACT_AUDIO_UNLOCK_PATH) return null;

  const handleUnlock = () => {
    void unlockAudio();
  };

  return (
    <motion.button
      type="button"
      aria-label="Toque para comenzar la experiencia con sonido"
      className={cn(
        "fixed inset-0 z-[100] flex cursor-pointer items-center justify-center",
        "bg-[var(--canvas-deep)]/72 backdrop-blur-md",
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onPointerDown={handleUnlock}
    >
      <div className="mx-6 max-w-md text-center">
        <p className="type-label text-[var(--color-accent-warm)]">Viaggio Motors</p>
        <h2 className="type-headline mt-4 text-white">
          Toque para comenzar la experiencia
        </h2>
        <p className="type-body mt-4 text-white/60">
          Música ambiental y guía de voz premium. Podés silenciar en cualquier momento.
        </p>
        <span className="mt-10 inline-flex min-h-[56px] items-center rounded-full border border-white/25 bg-white/10 px-10 text-base font-medium text-white backdrop-blur-md">
          Comenzar
        </span>
      </div>
    </motion.button>
  );
}
