"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Persona } from "@/types/persona";
import type { VisitorPath } from "@/lib/session/SessionProvider";
import {
  demoPrimaryCtaClass,
  shouldDisableExplorationBranches,
  shouldHighlightPrimaryCta,
} from "@/lib/config/demo-mode";
import { HeroMedia } from "@/components/media/HeroMedia";
import { PersonaAvatar } from "@/components/media/PersonaAvatar";
import { fadeUp, staggerContainer, transition } from "@/lib/motion/variants";
import { cn } from "@/lib/utils/cn";

interface WelcomeScreenProps {
  dealershipName: string;
  vehicleName: string;
  vehicleTagline: string;
  personas: Persona[];
  onContinue: (path: VisitorPath) => void;
}

export function WelcomeScreen({
  dealershipName,
  vehicleName,
  vehicleTagline,
  personas,
  onContinue,
}: WelcomeScreenProps) {
  const [path, setPath] = useState<VisitorPath>("first_time");
  const lockFirstTimePath = shouldDisableExplorationBranches();
  const activePath: VisitorPath = lockFirstTimePath ? "first_time" : path;

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-20 md:px-[var(--spacing-kiosk)]">
      <HeroMedia
        mediaId="gs4-max-hero-ambient"
        className="absolute inset-0 opacity-[0.18]"
        overlay={false}
        animate={false}
        showAmbientLayer={false}
      />
      <div className="pointer-events-none absolute inset-0 bg-[var(--canvas-deep)]/75 backdrop-blur-sm" />

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative z-10 mx-auto w-full max-w-3xl"
      >
        <motion.p
          variants={fadeUp}
          transition={transition.normal}
          className="type-label text-[var(--color-accent)]"
        >
          Bienvenido a {dealershipName}
        </motion.p>
        <motion.h1
          variants={fadeUp}
          transition={transition.normal}
          className="type-display mt-5 text-white"
        >
          {vehicleName}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          transition={transition.normal}
          className="type-kiosk-lead mt-6 max-w-2xl text-white/65"
        >
          {vehicleTagline}
        </motion.p>

        <motion.div
          variants={fadeUp}
          transition={transition.normal}
          className="mt-12 grid gap-4 sm:grid-cols-2"
        >
          <button
            type="button"
            onClick={() => setPath("first_time")}
            className={`min-h-[80px] rounded-2xl border px-7 py-5 text-left transition-all ${
              activePath === "first_time"
                ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10"
                : "border-white/10 bg-white/[0.03] hover:border-white/20"
            }`}
          >
            <p className="text-lg font-medium">Primera vez con GAC</p>
            <p className="mt-2 text-base text-white/50">
              Te guiamos desde confianza hasta deseo
            </p>
          </button>
          {!lockFirstTimePath ? (
            <button
              type="button"
              onClick={() => setPath("pre_researched")}
              className={`min-h-[80px] rounded-2xl border px-7 py-5 text-left transition-all ${
                activePath === "pre_researched"
                  ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20"
              }`}
            >
              <p className="text-lg font-medium">Ya investigué online</p>
              <p className="mt-2 text-base text-white/50">
                Ir directo al vehículo y comparar
              </p>
            </button>
          ) : null}
        </motion.div>

        {!lockFirstTimePath ? (
          <motion.p
            variants={fadeUp}
            transition={transition.normal}
            className="mt-10 flex flex-wrap items-center gap-4 text-sm text-white/40"
          >
            <span>Tus guías:</span>
            {personas.map((p) => (
              <span key={p.id} className="inline-flex items-center gap-2">
                <PersonaAvatar persona={p} size="sm" />
                <span>{p.name}</span>
              </span>
            ))}
          </motion.p>
        ) : null}

        <motion.button
          type="button"
          variants={fadeUp}
          transition={transition.normal}
          whileTap={{ scale: 0.98 }}
          onClick={() => onContinue(activePath)}
          className={cn(
            "mt-12 min-h-[64px] w-full rounded-full bg-[var(--color-accent)] px-10 py-4 text-lg font-semibold text-[var(--color-background)] sm:w-auto",
            shouldHighlightPrimaryCta() && demoPrimaryCtaClass,
          )}
        >
          Empezar experiencia
        </motion.button>
      </motion.div>
    </div>
  );
}
