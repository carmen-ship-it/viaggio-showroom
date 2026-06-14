"use client";

import { motion } from "framer-motion";
import { fadeUp, transition } from "@/lib/motion/variants";
import { NarrationControls } from "@/components/audio/NarrationControls";
import type { NarrationBlockData } from "@/types/blocks";
import type { ContentTone } from "@/types/content-tone";
import type { PersonaId } from "@/types/persona";
import { cn } from "@/lib/utils/cn";

const PERSONA_COLORS: Record<PersonaId, string> = {
  carlos: "var(--color-persona-carlos)",
  sofia: "var(--color-persona-sofia)",
  diego: "var(--color-persona-diego)",
};

interface NarrationRendererProps {
  data: NarrationBlockData;
  personaId?: PersonaId;
  personaName?: string;
  personaRole?: string;
  className?: string;
  tone?: ContentTone;
}

export function NarrationRenderer({
  data,
  personaId,
  personaName,
  personaRole,
  className,
  tone = "dark",
}: NarrationRendererProps) {
  const isLight = tone === "light";
  const accent = personaId ? PERSONA_COLORS[personaId] : "var(--color-accent)";
  const narrationAssetId =
    data.audioAssetId?.startsWith("audio-narration-host") === true
      ? data.audioAssetId
      : null;

  return (
    <motion.blockquote
      className={cn(
        "relative rounded-2xl border p-6 md:p-8",
        isLight
          ? "border-black/10 bg-white shadow-md shadow-black/5"
          : "border-white/10 bg-white/[0.03]",
        className,
      )}
      initial={fadeUp.initial}
      whileInView={fadeUp.animate}
      viewport={{ once: true, margin: "-10%" }}
      transition={transition.normal}
      style={{ borderLeftColor: accent, borderLeftWidth: 3 }}
    >
      {personaName ? (
        <footer className="mb-4 flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white"
            style={{ backgroundColor: accent }}
          >
            {personaName.charAt(0)}
          </div>
          <div>
            <p
              className={cn(
                "text-sm font-semibold",
                isLight ? "text-[var(--text-on-light)]" : "font-medium text-white",
              )}
            >
              {personaName}
            </p>
            {personaRole ? (
              <p
                className={cn(
                  "text-xs",
                  isLight ? "text-[var(--text-secondary-on-light)]" : "text-white/50",
                )}
              >
                {personaRole}
              </p>
            ) : null}
          </div>
        </footer>
      ) : null}
      {data.emphasis ? (
        <p
          className="mb-3 text-sm font-semibold uppercase tracking-wider"
          style={{ color: accent }}
        >
          {data.emphasis}
        </p>
      ) : null}
      <p
        className={cn(
          "text-lg leading-relaxed md:text-xl",
          isLight ? "text-[var(--text-on-light)]" : "text-white/85",
        )}
      >
        {data.text}
      </p>
      {narrationAssetId ? (
        <div className="mt-4">
          <NarrationControls assetId={narrationAssetId} tone={tone} />
        </div>
      ) : null}
    </motion.blockquote>
  );
}
