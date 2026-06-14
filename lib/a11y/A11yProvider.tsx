"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type TextScale = "S" | "M" | "L";

interface A11yContextValue {
  textScale: TextScale;
  setTextScale: (scale: TextScale) => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  reduceMotion: boolean;
  setReduceMotion: (enabled: boolean) => void;
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
}

const A11yContext = createContext<A11yContextValue | null>(null);

function applyDocumentAttributes(
  textScale: TextScale,
  highContrast: boolean,
  reduceMotion: boolean,
): void {
  document.documentElement.dataset.textScale = textScale.toLowerCase();
  document.documentElement.dataset.highContrast = highContrast ? "true" : "false";
  document.documentElement.dataset.reduceMotion = reduceMotion ? "true" : "false";
}

export function A11yProvider({ children }: { children: ReactNode }) {
  const [textScale, setTextScaleState] = useState<TextScale>("M");
  const [highContrast, setHighContrastState] = useState(false);
  const [reduceMotion, setReduceMotionState] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    applyDocumentAttributes(textScale, highContrast, reduceMotion);
  }, [textScale, highContrast, reduceMotion]);

  const setTextScale = useCallback((scale: TextScale) => {
    setTextScaleState(scale);
  }, []);

  const setHighContrast = useCallback((enabled: boolean) => {
    setHighContrastState(enabled);
  }, []);

  const setReduceMotion = useCallback((enabled: boolean) => {
    setReduceMotionState(enabled);
  }, []);

  const value = useMemo(
    () => ({
      textScale,
      setTextScale,
      highContrast,
      setHighContrast,
      reduceMotion,
      setReduceMotion,
      settingsOpen,
      openSettings: () => setSettingsOpen(true),
      closeSettings: () => setSettingsOpen(false),
    }),
    [textScale, setTextScale, highContrast, setHighContrast, reduceMotion, setReduceMotion, settingsOpen],
  );

  return <A11yContext.Provider value={value}>{children}</A11yContext.Provider>;
}

export function useA11y(): A11yContextValue {
  const ctx = useContext(A11yContext);
  if (!ctx) {
    throw new Error("useA11y must be used within A11yProvider");
  }
  return ctx;
}
