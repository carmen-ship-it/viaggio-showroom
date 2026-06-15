import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface MetricCardProps {
  label: string;
  value: string | number;
  delta?: string;
  deltaPositive?: boolean;
  icon?: ReactNode;
  variant?: "light" | "dark";
  className?: string;
  children?: ReactNode;
}

export function MetricCard({
  label,
  value,
  delta,
  deltaPositive = true,
  icon,
  variant = "dark",
  className,
  children,
}: MetricCardProps) {
  const isLight = variant === "light";

  return (
    <div
      className={cn(
        "rounded-2xl border p-5",
        isLight
          ? "border-black/8 bg-white shadow-sm shadow-black/5"
          : "border-white/10 bg-white/[0.04] backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p
            className={cn(
              "text-xs font-medium uppercase tracking-[0.14em]",
              isLight ? "text-slate-500" : "text-white/50",
            )}
          >
            {label}
          </p>
          <p
            className={cn(
              "text-3xl font-semibold tracking-tight",
              isLight ? "text-slate-900" : "text-white",
            )}
          >
            {value}
          </p>
          {delta ? (
            <p
              className={cn(
                "text-sm font-medium",
                deltaPositive
                  ? isLight
                    ? "text-emerald-600"
                    : "text-emerald-400"
                  : isLight
                    ? "text-rose-600"
                    : "text-rose-400",
              )}
            >
              {delta}
            </p>
          ) : null}
        </div>
        {icon ? (
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-xl",
              isLight ? "bg-slate-100 text-slate-600" : "bg-white/8 text-white/70",
            )}
          >
            {icon}
          </div>
        ) : null}
      </div>
      {children}
    </div>
  );
}
