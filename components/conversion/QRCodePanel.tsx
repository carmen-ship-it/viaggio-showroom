"use client";

import { QRCodeSVG } from "qrcode.react";
import { cn } from "@/lib/utils/cn";

interface QRCodePanelProps {
  value: string;
  label: string;
  hint?: string;
  step?: number;
  size?: number;
  variant?: "light" | "dark";
  className?: string;
}

export function QRCodePanel({
  value,
  label,
  hint,
  step,
  size = 280,
  variant = "light",
  className,
}: QRCodePanelProps) {
  const isLight = variant === "light";

  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-3xl p-8",
        isLight
          ? "border border-black/8 bg-white shadow-[0_24px_64px_-32px_rgba(0,0,0,0.18)]"
          : "border border-white/12 bg-white/[0.04] backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex w-full items-center gap-3">
        {step ? (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-trust)] text-sm font-semibold text-white">
            {step}
          </span>
        ) : null}
        <p
          className={cn(
            "text-sm font-medium uppercase tracking-[0.15em]",
            isLight ? "text-[var(--text-secondary-on-light)]" : "text-white/70",
          )}
        >
          {label}
        </p>
      </div>
      <div
        className={cn(
          "mt-6 flex items-center justify-center rounded-2xl p-5",
          isLight ? "bg-white ring-1 ring-black/6" : "bg-white ring-1 ring-white/10",
        )}
      >
        <QRCodeSVG
          value={value}
          size={size}
          level="M"
          marginSize={2}
          bgColor="#FFFFFF"
          fgColor="#1D1D1F"
          title={label}
        />
      </div>
      {hint ? (
        <p
          className={cn(
            "mt-6 max-w-xs text-center text-sm leading-relaxed",
            isLight ? "text-[var(--text-secondary-on-light)]" : "text-white/60",
          )}
        >
          {hint}
        </p>
      ) : null}
    </div>
  );
}
