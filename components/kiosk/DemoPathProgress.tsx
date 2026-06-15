"use client";

import { usePathname } from "next/navigation";
import { getExecutiveDemoPathProgress, shouldShowDemoPathProgress } from "@/lib/config/demo-mode";

export function DemoPathProgress() {
  const pathname = usePathname() ?? "";
  if (!shouldShowDemoPathProgress()) return null;

  const progress = getExecutiveDemoPathProgress(pathname);
  if (!progress || progress.step <= 1) return null;

  const pct = Math.round((progress.step / progress.total) * 100);

  return (
    <div
      className="pointer-events-none fixed left-1/2 top-6 z-40 w-[min(420px,calc(100vw-8rem))] -translate-x-1/2"
      aria-hidden
    >
      <div className="rounded-full border border-white/15 bg-black/50 px-5 py-2.5 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-[0.14em] text-white/70">
          <span>
            Paso {progress.step} de {progress.total}
          </span>
          <span className="text-white/45">{progress.label}</span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[var(--color-accent-warm)] transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
