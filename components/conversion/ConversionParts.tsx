"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer, transition } from "@/lib/motion/variants";
import {
  demoPrimaryCtaClass,
  shouldHighlightPrimaryCta,
} from "@/lib/config/demo-mode";
import { cn } from "@/lib/utils/cn";

interface ConversionPathCardProps {
  href?: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  highlightPrimary?: boolean;
  variant?: "light" | "dark";
  size?: "default" | "focus" | "focusPrimary";
}

export function ConversionPathCard({
  href,
  icon,
  title,
  description,
  onClick,
  highlightPrimary = false,
  variant = "light",
  size = "default",
}: ConversionPathCardProps) {
  const isDark = variant === "dark";

  const className = cn(
    "group flex flex-col justify-between rounded-2xl border p-7 transition-all",
    size === "focusPrimary" ? "min-h-[220px]" : size === "focus" ? "min-h-[180px]" : "min-h-[160px]",
    isDark
      ? "border-white/10 bg-white/[0.04] text-white backdrop-blur-xl hover:border-white/20 hover:bg-white/[0.06]"
      : "border-black/8 bg-white text-[var(--text-on-light)] shadow-sm hover:shadow-md",
    highlightPrimary && "border-[var(--color-accent)]/40 ring-1 ring-[var(--color-accent)]/20",
    highlightPrimary &&
      shouldHighlightPrimaryCta() &&
      demoPrimaryCtaClass,
  );

  const content = (
    <>
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl",
          isDark
            ? "bg-[var(--color-accent-trust)]/15 text-[var(--color-accent-trust)]"
            : "bg-[var(--canvas-soft)] text-white",
        )}
      >
        {icon}
      </div>
      <div className="mt-5">
        <h3 className={cn("font-medium", size === "focusPrimary" ? "text-2xl" : "text-xl")}>
          {title}
        </h3>
        <p
          className={cn(
            "mt-2 text-base leading-relaxed",
            isDark ? "text-white/60" : "text-[var(--text-secondary-on-light)]",
          )}
        >
          {description}
        </p>
      </div>
    </>
  );

  if (onClick) {
    return (
      <motion.button
        type="button"
        onClick={onClick}
        className={cn(className, "text-left")}
        whileTap={{ scale: 0.98 }}
      >
        {content}
      </motion.button>
    );
  }

  if (!href) {
    return null;
  }

  return (
    <motion.div whileTap={{ scale: 0.98 }}>
      <Link href={href} className={className}>
        {content}
      </Link>
    </motion.div>
  );
}

interface SessionRecapProps {
  chips: { id: string; label: string }[];
}

export function SessionRecap({ chips }: SessionRecapProps) {
  if (chips.length === 0) {
    return (
      <p className="text-sm text-white/50">
        Exploraste el GS4 MAX — elegí cómo querés continuar.
      </p>
    );
  }

  return (
    <motion.ul
      className="flex flex-wrap gap-2"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      {chips.map((chip, index) => (
        <motion.li
          key={chip.id}
          variants={fadeUp}
          transition={{ ...transition.normal, delay: index * 0.12 }}
          className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.12em] text-white/80 backdrop-blur-sm"
        >
          {chip.label}
        </motion.li>
      ))}
    </motion.ul>
  );
}

export function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ChatIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 18l-2 3V6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H9l-2 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShareIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="18" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="19" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 11l7-4M8.5 13l7 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function FinanceIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="6" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 10h18M7 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AdvisorIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17 8.5l1.5 1.5L21 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
