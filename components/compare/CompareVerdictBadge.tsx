"use client";

import type { CompareVerdict } from "@/lib/content/compare";
import { cn } from "@/lib/utils/cn";

const VERDICT_CONFIG: Record<
  CompareVerdict,
  { label: string; srLabel: string; className: string }
> = {
  anchor_wins: {
    label: "Nosotros ganamos",
    srLabel: "Ventaja GS4 MAX",
    className:
      "border-[var(--color-accent-trust)]/40 bg-[var(--color-accent-trust)]/15 text-[var(--color-accent-trust)]",
  },
  target_wins: {
    label: "Ellos ganan",
    srLabel: "Ventaja competidor",
    className:
      "border-[var(--color-accent-neutral)]/50 bg-[var(--color-accent-neutral)]/20 text-white/90",
  },
  tie: {
    label: "Empate",
    srLabel: "Equivalente",
    className:
      "border-white/25 bg-white/[0.1] text-white/90",
  },
};

interface CompareVerdictBadgeProps {
  verdict: CompareVerdict;
  size?: "sm" | "md";
  className?: string;
}

export function CompareVerdictBadge({
  verdict,
  size = "md",
  className,
}: CompareVerdictBadgeProps) {
  const config = VERDICT_CONFIG[verdict];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium",
        size === "sm" ? "px-2.5 py-0.5 text-[11px]" : "px-3 py-1 text-xs",
        config.className,
        className,
      )}
    >
      <span className="sr-only">{config.srLabel}: </span>
      {config.label}
    </span>
  );
}

export function getVerdictPreview(
  dimensions: { category: string; rows: { verdict: CompareVerdict }[] }[],
  category: string,
): CompareVerdict | null {
  const dimension = dimensions.find((d) => d.category === category);
  if (!dimension || dimension.rows.length === 0) return null;

  const counts = dimension.rows.reduce(
    (acc, row) => {
      acc[row.verdict] += 1;
      return acc;
    },
    { anchor_wins: 0, target_wins: 0, tie: 0 },
  );

  if (counts.anchor_wins > counts.target_wins && counts.anchor_wins >= counts.tie) {
    return "anchor_wins";
  }
  if (counts.target_wins > counts.anchor_wins && counts.target_wins >= counts.tie) {
    return "target_wins";
  }
  return "tie";
}
