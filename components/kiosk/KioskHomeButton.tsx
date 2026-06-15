"use client";

import Link from "next/link";
import { routes } from "@/lib/navigation/routes";
import { cn } from "@/lib/utils/cn";

interface KioskHomeButtonProps {
  className?: string;
  variant?: "floating" | "inline";
}

export function KioskHomeButton({
  className,
  variant = "floating",
}: KioskHomeButtonProps) {
  const base =
    variant === "floating"
      ? "fixed right-6 top-6 z-40 min-h-[56px] min-w-[56px] rounded-full border border-white/20 bg-black/45 px-5 text-base font-semibold text-white backdrop-blur-md hover:bg-black/60 md:right-[var(--spacing-kiosk)]"
      : "min-h-[56px] rounded-full border border-white/20 bg-white/10 px-6 text-base font-semibold text-white backdrop-blur-md hover:bg-white/15";

  return (
    <Link href={routes.home()} className={cn(base, "inline-flex items-center justify-center", className)}>
      Inicio
    </Link>
  );
}
