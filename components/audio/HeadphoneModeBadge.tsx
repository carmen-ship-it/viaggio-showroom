"use client";

import { cn } from "@/lib/utils/cn";
import { useAudio } from "@/lib/audio/AudioProvider";

interface HeadphoneModeBadgeProps {
  className?: string;
}

export function HeadphoneModeBadge({ className }: HeadphoneModeBadgeProps) {
  const { preferences } = useAudio();

  if (!preferences.headphoneMode) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent-trust)]/40 bg-[var(--color-accent-trust)]/15 px-3 py-1 text-xs font-medium text-[var(--color-accent-trust)]",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <HeadphoneIcon />
      Modo audífonos
    </span>
  );
}

function HeadphoneIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M3 18v-6a9 9 0 0118 0v6" />
      <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3v5zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3v5z" />
    </svg>
  );
}
