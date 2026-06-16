"use client";

import { motion } from "framer-motion";
import type { MemoryChip } from "@/lib/session/session-intelligence";
import { fadeUp, staggerContainer, transition } from "@/lib/motion/variants";
import { cn } from "@/lib/utils/cn";

const CATEGORY_STYLES: Record<MemoryChip["category"], string> = {
  topic: "border-white/15 bg-white/10 text-white/85",
  compare: "border-[var(--color-accent)]/40 bg-[var(--color-accent)]/15 text-white",
  financing: "border-emerald-400/30 bg-emerald-500/10 text-emerald-100",
  objection: "border-amber-400/35 bg-amber-500/10 text-amber-100",
  trust: "border-[var(--color-accent-trust)]/40 bg-[var(--color-accent-trust)]/15 text-[var(--color-accent-trust)]",
};

interface SessionMemoryPanelProps {
  chips: MemoryChip[];
  memoryCount: number;
  variant?: "customer" | "modal";
  className?: string;
}

export function SessionMemoryPanel({
  chips,
  memoryCount,
  variant = "customer",
  className,
}: SessionMemoryPanelProps) {
  const isModal = variant === "modal";

  return (
    <div
      className={cn(
        "rounded-2xl border backdrop-blur-md",
        isModal
          ? "border-[var(--color-accent-trust)]/25 bg-[var(--color-accent-trust)]/8"
          : "border-white/10 bg-white/[0.04]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4 px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="inline-flex h-2 w-2 animate-pulse rounded-full bg-[var(--color-accent-trust)]"
              aria-hidden
            />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-trust)]">
              CPI-OS recuerda
            </p>
          </div>
          <p
            className={cn(
              "mt-1 font-medium text-white",
              isModal ? "text-base" : "text-sm",
            )}
          >
            {memoryCount > 0
              ? `${memoryCount} señales de tu recorrido`
              : "Aprendiendo de tu recorrido"}
          </p>
        </div>
        <IntelligencePulseIcon />
      </div>

      {chips.length > 0 ? (
        <motion.ul
          className="flex flex-wrap gap-2 px-5 pb-5"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {chips.map((chip, index) => (
            <motion.li
              key={chip.id}
              variants={fadeUp}
              transition={{ ...transition.normal, delay: index * 0.08 }}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.1em]",
                CATEGORY_STYLES[chip.category],
              )}
            >
              {chip.label}
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <p className="px-5 pb-5 text-sm text-white/50">
          Seguí explorando — el sistema registra lo que te importa.
        </p>
      )}
    </div>
  );
}

function IntelligencePulseIcon() {
  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--color-accent-trust)]/30 bg-[var(--color-accent-trust)]/10"
      aria-hidden
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-[var(--color-accent-trust)]"
        />
        <circle
          cx="12"
          cy="12"
          r="3.5"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-[var(--color-accent-trust)]"
        />
      </svg>
    </div>
  );
}
