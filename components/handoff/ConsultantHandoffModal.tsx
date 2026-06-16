"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SessionMemoryPanel } from "@/components/kiosk/SessionMemoryPanel";
import { formatWaitTimer } from "@/lib/demo/operations-data";
import {
  getElapsedSeconds,
  type LiveHandoff,
} from "@/lib/demo/handoff-store";
import type { MemoryChip } from "@/lib/session/session-intelligence";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { routes } from "@/lib/navigation/routes";
import { cn } from "@/lib/utils/cn";

interface ConsultantHandoffModalProps {
  open: boolean;
  handoff: LiveHandoff | null;
  now?: number;
  onContinueExploring: () => void;
  onCancelRequest?: () => void;
}

export function ConsultantHandoffModal({
  open,
  handoff,
  now = Date.now(),
  onContinueExploring,
  onCancelRequest,
}: ConsultantHandoffModalProps) {
  useEffect(() => {
    if (open && handoff) {
      trackEvent({
        type: "consultant_handoff",
        metadata: { handoffId: handoff.id, source: "s36-modal" },
      });
    }
  }, [open, handoff]);

  const elapsed = handoff ? getElapsedSeconds(handoff, now) : 0;
  const isClaimed = handoff?.status === "claimed";

  const displayChips = useMemo((): MemoryChip[] => {
    if (!handoff) return [];
    const chips: MemoryChip[] = handoff.topicsExplored.map((topic, index) => ({
      id: `topic-${index}`,
      label: topic,
      category: "topic",
    }));

    if (handoff.comparisonViewed) {
      chips.push({
        id: "compare",
        label: `vs ${handoff.comparisonViewed}`,
        category: "compare",
      });
    }

    if (handoff.financingViewed) {
      chips.push({
        id: "financing",
        label: handoff.financingViewed,
        category: "financing",
      });
    }

    handoff.objections.forEach((objection, index) => {
      chips.push({
        id: `objection-${index}`,
        label: objection,
        category: "objection",
      });
    });

    return chips;
  }, [handoff]);

  return (
    <AnimatePresence>
      {open && handoff ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-6 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="s36-handoff-title"
        >
          <motion.div
            className="w-full max-w-2xl overflow-hidden rounded-3xl border border-white/15 bg-[#12141a] shadow-2xl shadow-black/50"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-8 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-trust)]">
                CPI-OS · Asesor en camino
              </p>
              <Link
                href={routes.home()}
                className="inline-flex min-h-[52px] min-w-[120px] items-center justify-center rounded-full border border-white/15 px-5 text-base font-semibold text-white active:scale-[0.98]"
              >
                Inicio
              </Link>
            </div>

            <div className="border-b border-white/10 bg-gradient-to-br from-[var(--color-accent-trust)]/25 via-[var(--color-accent-trust)]/5 to-transparent px-8 py-8">
              <h2
                id="s36-handoff-title"
                className="text-3xl font-semibold leading-tight text-white md:text-4xl"
              >
                {isClaimed
                  ? `${handoff.claimedBy} ya conoce tu recorrido`
                  : "Tu asesor llegará preparado"}
              </h2>
              <p className="mt-4 text-xl leading-relaxed text-white/70">
                {isClaimed
                  ? "El sistema compartió lo que exploraste — podés seguir mirando o esperarnos acá."
                  : "CPI-OS ya envió tu recorrido al piso de ventas. Un consultor Viaggio viene en menos de 2 minutos."}
              </p>
            </div>

            <div className="space-y-5 px-8 py-7">
              <SessionMemoryPanel
                chips={displayChips}
                memoryCount={displayChips.length}
                variant="modal"
              />

              <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-5">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
                    Tiempo de espera
                  </p>
                  <p
                    className={cn(
                      "mt-1 font-mono text-4xl font-semibold tabular-nums",
                      isClaimed ? "text-emerald-400" : "text-white",
                    )}
                  >
                    {formatWaitTimer(elapsed)}
                  </p>
                </div>
                <div
                  className={cn(
                    "flex h-16 w-16 items-center justify-center rounded-full",
                    isClaimed
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-rose-500/15 text-rose-400 animate-pulse",
                  )}
                >
                  <AdvisorPulseIcon claimed={isClaimed} />
                </div>
              </div>

              {handoff.suggestedOpening ? (
                <div className="rounded-2xl border border-white/8 bg-slate-900/80 px-6 py-5">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
                    Lo que el asesor ya sabe
                  </p>
                  <p className="mt-3 text-base leading-relaxed text-white/85">
                    &ldquo;{handoff.suggestedOpening}&rdquo;
                  </p>
                </div>
              ) : null}

              <button
                type="button"
                onClick={onContinueExploring}
                className="w-full min-h-[64px] rounded-2xl border border-white/15 bg-white/[0.06] px-6 py-4 text-lg font-semibold text-white active:scale-[0.99]"
              >
                Seguir explorando
              </button>

              {onCancelRequest ? (
                <button
                  type="button"
                  onClick={onCancelRequest}
                  className="w-full min-h-[52px] rounded-2xl border border-white/10 px-6 py-3 text-base font-medium text-white/55 active:scale-[0.99]"
                >
                  Cancelar solicitud
                </button>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function AdvisorPulseIcon({ claimed }: { claimed: boolean }) {
  if (claimed) {
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M5 13l4 4L19 7"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
