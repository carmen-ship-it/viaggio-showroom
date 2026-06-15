import type { LeadTemperature } from "@/lib/demo/operations-data";

export const temperatureStyles: Record<
  LeadTemperature,
  { bg: string; text: string; border: string; dot: string; ring: string }
> = {
  hot: {
    bg: "bg-emerald-50",
    text: "text-emerald-800",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/30",
  },
  warm: {
    bg: "bg-amber-50",
    text: "text-amber-900",
    border: "border-amber-200",
    dot: "bg-amber-500",
    ring: "ring-amber-500/30",
  },
  cold: {
    bg: "bg-slate-100",
    text: "text-slate-600",
    border: "border-slate-200",
    dot: "bg-slate-400",
    ring: "ring-slate-400/30",
  },
};

export const temperatureStylesDark: Record<
  LeadTemperature,
  { bg: string; text: string; border: string; dot: string }
> = {
  hot: {
    bg: "bg-emerald-500/15",
    text: "text-emerald-300",
    border: "border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  warm: {
    bg: "bg-amber-500/15",
    text: "text-amber-300",
    border: "border-amber-500/30",
    dot: "bg-amber-400",
  },
  cold: {
    bg: "bg-slate-500/15",
    text: "text-slate-400",
    border: "border-slate-500/30",
    dot: "bg-slate-500",
  },
};
