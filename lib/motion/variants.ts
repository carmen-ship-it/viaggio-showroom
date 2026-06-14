export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.96 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 1.02 },
};

export const slideFromRight = {
  initial: { opacity: 0, x: 48 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -48 },
};

export const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const cinematicEase = [0.22, 1, 0.36, 1] as const;

export const crossfade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const riseFromBottom = {
  initial: { opacity: 0, y: 48 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 24 },
};

export const transition = {
  fast: { duration: 0.3, ease: "easeOut" as const },
  normal: { duration: 0.4, ease: cinematicEase },
  slow: { duration: 0.6, ease: cinematicEase },
  reveal: { duration: 0.6, ease: cinematicEase },
  crossfade: { duration: 0.4, ease: "easeInOut" as const },
  spring: { type: "spring" as const, stiffness: 260, damping: 28 },
};
