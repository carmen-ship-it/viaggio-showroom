"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { crossfade, fadeUp, transition } from "@/lib/motion/variants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useInteractionSound } from "@/lib/audio/useInteractionSound";

interface PageTransitionProps {
  children: ReactNode;
  transitionKey: string;
  className?: string;
  variant?: "fade-up" | "crossfade";
}

export function PageTransition({
  children,
  transitionKey,
  className,
  variant = "crossfade",
}: PageTransitionProps) {
  const reducedMotion = useReducedMotion();
  const { playTransition } = useInteractionSound();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!reducedMotion) {
      playTransition();
    }
  }, [transitionKey, reducedMotion, playTransition]);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const motionVariant = variant === "fade-up" ? fadeUp : crossfade;
  const motionTransition =
    variant === "fade-up" ? transition.normal : transition.crossfade;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={transitionKey}
        className={className}
        initial={motionVariant.initial}
        animate={motionVariant.animate}
        exit={motionVariant.exit}
        transition={motionTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
