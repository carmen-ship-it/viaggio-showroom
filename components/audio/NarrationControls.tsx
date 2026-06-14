"use client";

import { cn } from "@/lib/utils/cn";
import { useAudio } from "@/lib/audio/AudioProvider";

interface NarrationControlsProps {
  assetId: string | null;
  className?: string;
  compact?: boolean;
}

export function NarrationControls({ assetId, className, compact = false }: NarrationControlsProps) {
  const {
    preferences,
    playNarration,
    pauseNarration,
    resumeNarration,
    getChannelState,
    getActiveNarrationAssetId,
  } = useAudio();

  if (!assetId || preferences.masterMuted) return null;

  const activeId = getActiveNarrationAssetId();
  const isThisTrack = activeId === assetId;
  const state = isThisTrack ? getChannelState("narration") : "idle";
  const isPlaying = state === "playing";
  const isPaused = state === "paused";

  const handleToggle = () => {
    if (isPlaying) {
      pauseNarration();
    } else if (isPaused && isThisTrack) {
      resumeNarration();
    } else {
      void playNarration(assetId);
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isPlaying ? "Pausar narración" : "Reproducir narración"}
      className={cn(
        "inline-flex min-h-[44px] items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 text-sm font-medium text-white/80 backdrop-blur-sm transition-colors hover:bg-white/10",
        compact && "min-h-[40px] px-3 text-xs",
        className,
      )}
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
      <span>{isPlaying ? "Pausar voz" : "Escuchar voz"}</span>
    </button>
  );
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
    </svg>
  );
}
