import { cn } from "@/lib/utils/cn";

interface FunnelChartProps {
  stages: Array<{ label: string; count: number; rate?: number }>;
  variant?: "light" | "dark";
  className?: string;
}

export function FunnelChart({
  stages,
  variant = "dark",
  className,
}: FunnelChartProps) {
  const max = Math.max(...stages.map((s) => s.count), 1);
  const isLight = variant === "light";

  return (
    <div className={cn("space-y-3", className)}>
      {stages.map((stage, index) => {
        const width = Math.max((stage.count / max) * 100, 12);
        return (
          <div key={stage.label} className="space-y-1.5">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className={isLight ? "text-slate-700" : "text-white/80"}>
                {stage.label}
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "font-semibold tabular-nums",
                    isLight ? "text-slate-900" : "text-white",
                  )}
                >
                  {stage.count}
                </span>
                {stage.rate !== undefined && index > 0 ? (
                  <span className={isLight ? "text-slate-400" : "text-white/40"}>
                    {stage.rate}%
                  </span>
                ) : null}
              </div>
            </div>
            <div
              className={cn(
                "h-2.5 overflow-hidden rounded-full",
                isLight ? "bg-slate-100" : "bg-white/8",
              )}
            >
              <div
                className={cn(
                  "h-full rounded-full transition-all",
                  isLight ? "bg-slate-900" : "bg-gradient-to-r from-[#c8a96e] to-[#e8d4a8]",
                )}
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
