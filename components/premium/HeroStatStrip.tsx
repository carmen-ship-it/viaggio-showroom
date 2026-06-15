"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { VehicleKeyStat } from "@/types/vehicle";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { shouldHighlightPrimaryCta } from "@/lib/config/demo-mode";
import { fadeUp, transition } from "@/lib/motion/variants";
import { GlassCard } from "./GlassCard";

interface HeroStatStripProps {
  stats: VehicleKeyStat[];
  className?: string;
}

type ParsedStat = {
  prefix: string;
  num: number;
  suffix: string;
  animate: boolean;
  format: (n: number) => string;
};

function formatThousandsWithDot(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function parseStatValue(value: string): ParsedStat | null {
  const match = value.match(/^([^0-9]*)([\d.,]+)(.*)$/);
  if (!match) return null;

  const [, prefix, numPart, suffix] = match;

  // South American thousands: 42.900 → 42900 (not 42.9)
  if (/^\d{1,3}(\.\d{3})+$/.test(numPart)) {
    const num = parseInt(numPart.replace(/\./g, ""), 10);
    return {
      prefix,
      num,
      suffix,
      animate: true,
      format: (n) => `${prefix}${formatThousandsWithDot(n)}${suffix}`,
    };
  }

  const num = parseFloat(numPart.replace(/,/g, ""));
  if (Number.isNaN(num)) return null;

  const simpleSuffix = suffix === "" || /^\s*HP$/i.test(suffix);
  return {
    prefix,
    num,
    suffix,
    animate: simpleSuffix && Number.isInteger(num),
    format: (n) => `${prefix}${Math.round(n).toLocaleString("es-BO")}${suffix}`,
  };
}

function AnimatedStat({ value, label }: VehicleKeyStat) {
  const reduced = useReducedMotion();
  const kioskStatic = shouldHighlightPrimaryCta();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const parsed = parseStatValue(value);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!parsed?.animate || reduced || kioskStatic || !inView) {
      setDisplay(value);
      return;
    }

    const duration = 800;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      const current = Math.round(parsed.num * eased);
      setDisplay(parsed.format(current));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, parsed, reduced, kioskStatic, value]);

  return (
    <div ref={ref} className="flex min-w-0 flex-1 flex-col gap-1 px-2 py-1 md:px-3">
      <span className="font-mono text-[clamp(1.35rem,2.2vw,2.5rem)] font-medium tabular-nums leading-none tracking-tight text-white">
        {display}
      </span>
      <span className="text-xs font-medium uppercase leading-tight tracking-[0.06em] text-white/55 md:text-sm">
        {label}
      </span>
    </div>
  );
}

export function HeroStatStrip({ stats, className }: HeroStatStripProps) {
  if (stats.length === 0) return null;

  return (
    <motion.div
      className={className}
      initial={fadeUp.initial}
      animate={fadeUp.animate}
      transition={{ ...transition.reveal, delay: 0.35 }}
    >
      <GlassCard animate={false} variant="elevated" className="px-4 py-4 md:px-8 md:py-5">
        <div className="flex flex-wrap items-stretch justify-between gap-y-3 sm:flex-nowrap sm:divide-x sm:divide-white/10">
          {stats.slice(0, 3).map((stat) => (
            <AnimatedStat key={stat.label} {...stat} />
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
