"use client";

import { motion } from "framer-motion";
import { fadeUp, transition } from "@/lib/motion/variants";
import { buildNarrationAssetId } from "@/lib/audio/resolve-audio";
import { NarrationControls } from "@/components/audio/NarrationControls";
import type { NarrationBlockData } from "@/types/blocks";
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
}

export function NarrationRenderer({
  data,
  personaId,
  personaName,
  personaRole,
  className,
}: NarrationRendererProps) {
  const accent = personaId ? PERSONA_COLORS[personaId] : "var(--color-accent)";
  const narrationAssetId = personaId
    ? buildNarrationAssetId(personaId, { audioAssetId: data.audioAssetId })
    : data.audioAssetId ?? null;

  return (
    <motion.blockquote
      className={cn(
        "relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8",
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
            <p className="text-sm font-medium">{personaName}</p>
            {personaRole ? (
              <p className="text-xs text-white/50">{personaRole}</p>
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
      <p className="text-lg leading-relaxed text-white/85 md:text-xl">{data.text}</p>
      {narrationAssetId ? (
        <div className="mt-4">
          <NarrationControls assetId={narrationAssetId} />
        </div>
      ) : null}
    </motion.blockquote>
  );
}
