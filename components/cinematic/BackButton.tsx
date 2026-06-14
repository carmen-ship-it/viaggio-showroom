"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

interface BackButtonProps {
  href?: string;
  onClick?: () => void;
  label?: string;
  className?: string;
}

export function BackButton({
  href,
  onClick,
  label = "Volver",
  className,
}: BackButtonProps) {
  const classes = cn(
    "inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white",
    className,
  );

  const content = (
    <>
      <span aria-hidden>←</span>
      {label}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={classes}
    >
      {content}
    </motion.button>
  );
}
