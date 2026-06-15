import type { WeeklyTrendPoint } from "@/lib/demo/operations-data";
import { cn } from "@/lib/utils/cn";

interface TrendChartProps {
  data: WeeklyTrendPoint[];
  metric: keyof Pick<WeeklyTrendPoint, "visits" | "leads" | "testDrives" | "sales">;
  label: string;
  className?: string;
}

const metricColors: Record<TrendChartProps["metric"], string> = {
  visits: "from-blue-400 to-blue-500",
  leads: "from-[#c8a96e] to-[#e8d4a8]",
  testDrives: "from-emerald-400 to-emerald-500",
  sales: "from-violet-400 to-violet-500",
};

export function TrendChart({ data, metric, label, className }: TrendChartProps) {
  const max = Math.max(...data.map((d) => d[metric]), 1);

  return (
    <div className={cn("space-y-4", className)}>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-white/50">
        {label}
      </p>
      <div className="flex h-36 items-end justify-between gap-2">
        {data.map((point) => {
          const value = point[metric];
          const height = Math.max((value / max) * 100, 8);
          return (
            <div key={point.day} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-medium tabular-nums text-white/70">
                {value}
              </span>
              <div className="flex w-full flex-1 items-end">
                <div
                  className={cn(
                    "w-full rounded-t-lg bg-gradient-to-t",
                    metricColors[metric],
                  )}
                  style={{ height: `${height}%` }}
                />
              </div>
              <span className="text-[11px] text-white/40">{point.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
