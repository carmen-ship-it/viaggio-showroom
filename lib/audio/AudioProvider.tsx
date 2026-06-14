"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { AudioChannel, AudioPlaybackState, AudioPreferences } from "@/types/audio";
import { trackEvent } from "@/lib/analytics/trackEvent";
import {
  clearAllHostSessionKeys,
  clearAudioUnlocked,
  isAudioUnlockedPersisted,
  persistAudioUnlocked,
} from "./audio-session";
import { DEFAULT_AUDIO_PREFERENCES } from "./constants";
import { SHOWROOM_AMBIENT_ASSET_ID } from "./host-narration";
import { AudioEngine } from "./AudioEngine";

interface AudioContextValue {
  audioUnlocked: boolean;
  needsUnlockPrompt: boolean;
  unlockAudio: () => Promise<void>;
  preferences: AudioPreferences;
  setMasterMuted: (muted: boolean) => void;
  toggleMute: () => void;
  setAmbientVolume: (volume: number) => void;
  setNarrationVolume: (volume: number) => void;
  setInteractionVolume: (volume: number) => void;
  setNarrationAutoPlay: (enabled: boolean) => void;
  setInteractionSoundsEnabled: (enabled: boolean) => void;
  setHeadphoneMode: (enabled: boolean) => void;
  playAmbient: (assetId: string) => Promise<boolean>;
  ensureShowroomAmbient: () => Promise<boolean>;
  pauseAmbient: () => void;
  stopAmbient: () => void;
  fadeOutAmbient: () => Promise<void>;
  playNarration: (assetId: string) => Promise<boolean>;
  playHostNarration: (assetId: string) => Promise<boolean>;
  pauseNarration: () => void;
  resumeNarration: () => void;
  stopNarration: () => void;
  toggleNarration: () => void;
  playInteraction: (assetId: string) => void;
  stopAll: () => void;
  resetAudioSession: () => void;
  getChannelState: (channel: AudioChannel) => AudioPlaybackState;
  getActiveNarrationAssetId: () => string | null;
  isNarrationPlaying: () => boolean;
}

const AudioContext = createContext<AudioContextValue | null>(null);

function applyDocumentAudioAttributes(preferences: AudioPreferences): void {
  document.documentElement.dataset.audioMuted = preferences.masterMuted ? "true" : "false";
  document.documentElement.dataset.headphoneMode = preferences.headphoneMode ? "true" : "false";
}

function updatePreferences(
  engine: AudioEngine,
  current: AudioPreferences,
  patch: Partial<AudioPreferences>,
  setState: (prefs: AudioPreferences) => void,
): AudioPreferences {
  const next = { ...current, ...patch };
  engine.setPreferences(next);
  setState(next);
  applyDocumentAudioAttributes(next);
  return next;
}

export function AudioProvider({ children }: { children: ReactNode }) {
  const engineRef = useRef<AudioEngine | null>(null);
  const ambientStartedRef = useRef(false);
  const [preferences, setPreferences] = useState<AudioPreferences>(DEFAULT_AUDIO_PREFERENCES);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [needsUnlockPrompt, setNeedsUnlockPrompt] = useState(true);
  const [, setTick] = useState(0);

  if (!engineRef.current && typeof window !== "undefined") {
    engineRef.current = new AudioEngine(DEFAULT_AUDIO_PREFERENCES);
  }

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    applyDocumentAudioAttributes(preferences);
    return engine.subscribe(() => setTick((t) => t + 1));
  }, [preferences]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isAudioUnlockedPersisted()) {
      setAudioUnlocked(true);
      setNeedsUnlockPrompt(false);
      return;
    }

    const probe = new Audio();
    probe.src =
      "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAA=";
    probe.volume = 0.001;
    void probe.play().then(() => {
      setAudioUnlocked(true);
      setNeedsUnlockPrompt(false);
      persistAudioUnlocked();
    }).catch(() => {
      setNeedsUnlockPrompt(true);
    });
  }, []);

  useEffect(() => {
    return () => engineRef.current?.destroy();
  }, []);

  const engine = engineRef.current;

  const unlockAudio = useCallback(async () => {
    if (!engine) return;
    setAudioUnlocked(true);
    setNeedsUnlockPrompt(false);
    persistAudioUnlocked();
    trackEvent({ type: "audio_unlocked" });
  }, [engine]);

  const resetAudioSession = useCallback(() => {
    ambientStartedRef.current = false;
    engine?.stopAll();
    clearAllHostSessionKeys();
    clearAudioUnlocked();
    setAudioUnlocked(false);
    setNeedsUnlockPrompt(true);
  }, [engine]);

  const setMasterMuted = useCallback(
    (muted: boolean) => {
      if (!engine) return;
      updatePreferences(engine, preferences, { masterMuted: muted }, setPreferences);
      trackEvent({
        type: "audio_settings_changed",
        metadata: { masterMuted: muted },
      });
      if (muted) engine.pauseAll();
    },
    [engine, preferences],
  );

  const toggleMute = useCallback(() => {
    setMasterMuted(!preferences.masterMuted);
  }, [preferences.masterMuted, setMasterMuted]);

  const setAmbientVolume = useCallback(
    (volume: number) => {
      if (!engine) return;
      updatePreferences(engine, preferences, { ambientVolume: volume }, setPreferences);
      trackEvent({ type: "audio_settings_changed", metadata: { ambientVolume: volume } });
    },
    [engine, preferences],
  );

  const setNarrationVolume = useCallback(
    (volume: number) => {
      if (!engine) return;
      updatePreferences(engine, preferences, { narrationVolume: volume }, setPreferences);
      trackEvent({ type: "audio_settings_changed", metadata: { narrationVolume: volume } });
    },
    [engine, preferences],
  );

  const setInteractionVolume = useCallback(
    (volume: number) => {
      if (!engine) return;
      updatePreferences(engine, preferences, { interactionVolume: volume }, setPreferences);
    },
    [engine, preferences],
  );

  const setNarrationAutoPlay = useCallback(
    (enabled: boolean) => {
      if (!engine) return;
      updatePreferences(engine, preferences, { narrationAutoPlay: enabled }, setPreferences);
      trackEvent({ type: "audio_settings_changed", metadata: { narrationAutoPlay: enabled } });
    },
    [engine, preferences],
  );

  const setInteractionSoundsEnabled = useCallback(
    (enabled: boolean) => {
      if (!engine) return;
      updatePreferences(engine, preferences, { interactionSoundsEnabled: enabled }, setPreferences);
    },
    [engine, preferences],
  );

  const setHeadphoneMode = useCallback(
    (enabled: boolean) => {
      if (!engine) return;
      updatePreferences(engine, preferences, { headphoneMode: enabled }, setPreferences);
      trackEvent({ type: "audio_settings_changed", metadata: { headphoneMode: enabled } });
    },
    [engine, preferences],
  );

  const playAmbient = useCallback(
    async (assetId: string) => {
      if (!engine || !audioUnlocked || preferences.masterMuted) return false;
      const ok = await engine.ensureAmbientPlaying(assetId);
      if (ok && !ambientStartedRef.current) {
        ambientStartedRef.current = true;
        trackEvent({ type: "ambient_start", metadata: { assetId } });
      }
      return ok;
    },
    [engine, audioUnlocked, preferences.masterMuted],
  );

  const ensureShowroomAmbient = useCallback(async () => {
    return playAmbient(SHOWROOM_AMBIENT_ASSET_ID);
  }, [playAmbient]);

  const pauseAmbient = useCallback(() => {
    engine?.pauseChannel("ambient");
  }, [engine]);

  const stopAmbient = useCallback(() => {
    engine?.stopChannel("ambient");
    ambientStartedRef.current = false;
  }, [engine]);

  const fadeOutAmbient = useCallback(async () => {
    if (!engine) return;
    await engine.fadeOutAmbient();
    ambientStartedRef.current = false;
  }, [engine]);

  const playNarration = useCallback(
    async (assetId: string) => {
      if (!engine || !audioUnlocked || preferences.masterMuted) return false;
      const ok = await engine.playAsset(assetId, { channel: "narration" });
      if (ok) {
        trackEvent({ type: "narration_start", metadata: { assetId } });
      }
      return ok;
    },
    [engine, audioUnlocked, preferences.masterMuted],
  );

  const playHostNarration = useCallback(
    async (assetId: string) => {
      return playNarration(assetId);
    },
    [playNarration],
  );

  const pauseNarration = useCallback(() => {
    engine?.pauseChannel("narration");
    trackEvent({ type: "narration_pause" });
  }, [engine]);

  const resumeNarration = useCallback(() => {
    if (preferences.masterMuted || !audioUnlocked) return;
    engine?.resumeChannel("narration");
    trackEvent({ type: "narration_resume" });
  }, [engine, preferences.masterMuted, audioUnlocked]);

  const toggleNarration = useCallback(() => {
    engine?.toggleChannel("narration");
  }, [engine]);

  const stopNarration = useCallback(() => {
    engine?.stopChannel("narration");
  }, [engine]);

  const playInteraction = useCallback(
    (assetId: string) => {
      if (!audioUnlocked) return;
      engine?.playInteraction(assetId);
    },
    [engine, audioUnlocked],
  );

  const stopAll = useCallback(() => {
    engine?.stopAll();
  }, [engine]);

  const getChannelState = useCallback(
    (channel: AudioChannel) => engine?.getChannelState(channel) ?? "idle",
    [engine],
  );

  const getActiveNarrationAssetId = useCallback(
    () => engine?.getActiveAssetId("narration") ?? null,
    [engine],
  );

  const isNarrationPlaying = useCallback(
    () => engine?.isNarrationPlaying() ?? false,
    [engine],
  );

  const value = useMemo<AudioContextValue>(
    () => ({
      audioUnlocked,
      needsUnlockPrompt,
      unlockAudio,
      preferences,
      setMasterMuted,
      toggleMute,
      setAmbientVolume,
      setNarrationVolume,
      setInteractionVolume,
      setNarrationAutoPlay,
      setInteractionSoundsEnabled,
      setHeadphoneMode,
      playAmbient,
      ensureShowroomAmbient,
      pauseAmbient,
      stopAmbient,
      fadeOutAmbient,
      playNarration,
      playHostNarration,
      pauseNarration,
      resumeNarration,
      stopNarration,
      toggleNarration,
      playInteraction,
      stopAll,
      resetAudioSession,
      getChannelState,
      getActiveNarrationAssetId,
      isNarrationPlaying,
    }),
    [
      audioUnlocked,
      needsUnlockPrompt,
      unlockAudio,
      preferences,
      setMasterMuted,
      toggleMute,
      setAmbientVolume,
      setNarrationVolume,
      setInteractionVolume,
      setNarrationAutoPlay,
      setInteractionSoundsEnabled,
      setHeadphoneMode,
      playAmbient,
      ensureShowroomAmbient,
      pauseAmbient,
      stopAmbient,
      fadeOutAmbient,
      playNarration,
      playHostNarration,
      pauseNarration,
      resumeNarration,
      stopNarration,
      toggleNarration,
      playInteraction,
      stopAll,
      resetAudioSession,
      getChannelState,
      getActiveNarrationAssetId,
      isNarrationPlaying,
    ],
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return ctx;
}

export function useAudioOptional(): AudioContextValue | null {
  return useContext(AudioContext);
}
