import { temperatureLabels, type LeadTemperature } from "@/lib/demo/operations-data";
import { cn } from "@/lib/utils/cn";
import { temperatureStyles, temperatureStylesDark } from "./ops-theme";

interface TemperatureBadgeProps {
  temperature: LeadTemperature;
  variant?: "light" | "dark";
  pulse?: boolean;
  className?: string;
}

export function TemperatureBadge({
  temperature,
  variant = "light",
  pulse = false,
  className,
}: TemperatureBadgeProps) {
  const styles =
    variant === "dark" ? temperatureStylesDark[temperature] : temperatureStyles[temperature];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold tracking-wide",
        styles.bg,
        styles.text,
        styles.border,
        pulse && temperature === "hot" && "animate-pulse",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", styles.dot)} />
      {temperatureLabels[temperature]}
    </span>
  );
}
