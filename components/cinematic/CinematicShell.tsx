"use client";

import type { ReactNode } from "react";
import { shouldHideDeveloperTools } from "@/lib/config/demo-mode";
import { cn } from "@/lib/utils/cn";

interface CinematicShellProps {
  children: ReactNode;
  screenId?: string;
  className?: string;
  hideChrome?: boolean;
}

export function CinematicShell({
  children,
  screenId,
  className,
  hideChrome = false,
}: CinematicShellProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-[var(--color-background)] text-[var(--color-foreground)]",
        className,
      )}
    >
      {!hideChrome && screenId && !shouldHideDeveloperTools() ? (
        <div className="pointer-events-none absolute right-4 top-4 z-50 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-widest text-white/40 backdrop-blur-sm">
          {screenId}
        </div>
      ) : null}
      {children}
    </div>
  );
}
