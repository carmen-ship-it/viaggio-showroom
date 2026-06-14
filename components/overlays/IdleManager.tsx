"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { formatScreenLabel } from "@/lib/config/demo-mode";
import { routes } from "@/lib/navigation/routes";
import { cn } from "@/lib/utils/cn";

const IDLE_PROMPT_MS = 3 * 60 * 1000;
const IDLE_RESET_MS = 5 * 60 * 1000;

export function IdleManager() {
  const router = useRouter();
  const [showPrompt, setShowPrompt] = useState(false);
  const promptTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (promptTimer.current) clearTimeout(promptTimer.current);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    promptTimer.current = null;
    resetTimer.current = null;
  }, []);

  const resetToAttract = useCallback(() => {
    trackEvent({ type: "session_start", metadata: { action: "idle_reset" } });
    setShowPrompt(false);
    clearTimers();
    router.push(routes.home());
    router.refresh();
  }, [clearTimers, router]);

  const scheduleIdle = useCallback(() => {
    clearTimers();
    setShowPrompt(false);
    promptTimer.current = setTimeout(() => {
      setShowPrompt(true);
      trackEvent({ type: "idle_prompt_shown" });
      resetTimer.current = setTimeout(resetToAttract, IDLE_RESET_MS - IDLE_PROMPT_MS);
    }, IDLE_PROMPT_MS);
  }, [clearTimers, resetToAttract]);

  const continueSession = useCallback(() => {
    trackEvent({ type: "idle_prompt_dismissed" });
    scheduleIdle();
  }, [scheduleIdle]);

  useEffect(() => {
    scheduleIdle();

    const events = ["pointerdown", "keydown", "touchstart", "scroll"] as const;
    const onActivity = () => {
      if (!showPrompt) scheduleIdle();
    };

    for (const event of events) {
      window.addEventListener(event, onActivity, { passive: true });
    }

    return () => {
      clearTimers();
      for (const event of events) {
        window.removeEventListener(event, onActivity);
      }
    };
  }, [scheduleIdle, clearTimers, showPrompt]);

  return (
    <AnimatePresence>
      {showPrompt ? (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="idle-title"
            className="fixed left-1/2 top-1/2 z-[61] w-[min(480px,calc(100vw-3rem))] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-[var(--canvas-light)] p-8 text-center text-[var(--text-on-light)] shadow-2xl"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary-on-light)]">
              {formatScreenLabel("S20 · Privacidad")}
            </p>
            <h2 id="idle-title" className="mt-3 text-3xl font-light">
              ¿Seguís ahí?
            </h2>
            <p className="mt-4 text-lg text-[var(--text-secondary-on-light)]">
              La sesión se reinicia para tu privacidad si no hay actividad.
            </p>
            <button
              type="button"
              onClick={continueSession}
              className={cn(
                "mt-8 min-h-[56px] w-full rounded-full bg-[var(--canvas-deep)] text-base font-semibold text-white",
              )}
            >
              Sí, continuar
            </button>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
