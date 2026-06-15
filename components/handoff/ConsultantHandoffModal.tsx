"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { formatWaitTimer } from "@/lib/demo/operations-data";
import {
  getElapsedSeconds,
  type LiveHandoff,
} from "@/lib/demo/handoff-store";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { cn } from "@/lib/utils/cn";

interface ConsultantHandoffModalProps {
  open: boolean;
  handoff: LiveHandoff | null;
  now?: number;
  onContinueExploring: () => void;
}

export function ConsultantHandoffModal({
  open,
  handoff,
  now = Date.now(),
  onContinueExploring,
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

  return (
    <AnimatePresence>
      {open && handoff ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="s36-handoff-title"
        >
          <motion.div
            className="w-full max-w-xl overflow-hidden rounded-3xl border border-white/15 bg-[#12141a] shadow-2xl shadow-black/50"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <div className="border-b border-white/10 bg-gradient-to-br from-[var(--color-accent-trust)]/20 via-transparent to-transparent px-8 py-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-trust)]">
                Asesor en camino
              </p>
              <h2
                id="s36-handoff-title"
                className="mt-3 text-3xl font-semibold leading-tight text-white md:text-4xl"
              >
                {isClaimed
                  ? `${handoff.claimedBy} viene hacia vos`
                  : "Un asesor llegará en menos de 2 minutos."}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-white/65">
                {isClaimed
                  ? "Ya tenemos tu recorrido — podés seguir mirando la pantalla o esperarnos acá."
                  : "Un consultor de Viaggio te atiende en breve. Podés esperar acá o seguir explorando sin perder tu sesión."}
              </p>
            </div>

            <div className="space-y-5 px-8 py-7">
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
                    Tiempo de espera
                  </p>
                  <p
                    className={cn(
                      "mt-1 font-mono text-3xl font-semibold tabular-nums",
                      isClaimed ? "text-emerald-400" : "text-white",
                    )}
                  >
                    {formatWaitTimer(elapsed)}
                  </p>
                </div>
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full",
                    isClaimed
                      ? "bg-emerald-500/15 text-emerald-400"
                      : "bg-rose-500/15 text-rose-400 animate-pulse",
                  )}
                >
                  <AdvisorPulseIcon claimed={isClaimed} />
                </div>
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4">
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/45">
                  Tu recorrido quedó registrado
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {handoff.interestSummary}
                </p>
              </div>

              <button
                type="button"
                onClick={onContinueExploring}
                className="w-full rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-4 text-base font-medium text-white transition hover:bg-white/10 active:scale-[0.99]"
              >
                Seguir explorando
              </button>
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
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
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
