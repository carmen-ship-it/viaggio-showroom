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
    <div ref={ref} className="flex flex-col gap-1 px-2 py-1 md:px-4">
      <span className="font-mono text-[32px] font-medium tabular-nums tracking-tight text-white md:text-[40px]">
        {display}
      </span>
      <span className="text-sm font-medium uppercase tracking-[0.08em] text-white/55">
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
      <GlassCard animate={false} variant="elevated" className="px-6 py-5 md:px-10 md:py-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-white/10">
          {stats.slice(0, 3).map((stat) => (
            <AnimatedStat key={stat.label} {...stat} />
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
