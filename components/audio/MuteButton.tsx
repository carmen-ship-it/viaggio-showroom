"use client";

import { cn } from "@/lib/utils/cn";
import { useAudio } from "@/lib/audio/AudioProvider";

interface MuteButtonProps {
  className?: string;
  variant?: "dark" | "light";
}

export function MuteButton({ className, variant = "dark" }: MuteButtonProps) {
  const { preferences, toggleMute } = useAudio();
  const muted = preferences.masterMuted;

  return (
    <button
      type="button"
      onClick={toggleMute}
      aria-label={muted ? "Activar sonido" : "Silenciar"}
      aria-pressed={muted}
      className={cn(
        "min-h-[44px] min-w-[44px] rounded-full border px-3 text-sm backdrop-blur-sm transition-colors",
        variant === "dark"
          ? "border-white/15 bg-white/5 text-white/80 hover:bg-white/10"
          : "border-black/10 bg-white text-[var(--text-on-light)] hover:bg-black/5",
        className,
      )}
    >
      {muted ? (
        <span className="inline-flex items-center gap-1.5">
          <MuteIcon muted />
          <span className="hidden sm:inline">Silenciado</span>
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5">
          <MuteIcon muted={false} />
          <span className="hidden sm:inline">Sonido</span>
        </span>
      )}
    </button>
  );
}

function MuteIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {muted ? (
        <>
          <path d="M11 5L6 9H3v6h3l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </>
      ) : (
        <>
          <path d="M11 5L6 9H3v6h3l5 4V5z" />
          <path d="M19.07 4.93a10 10 0 010 14.14" />
          <path d="M15.54 8.46a5 5 0 010 7.07" />
        </>
      )}
    </svg>
  );
}
