"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { routes } from "@/lib/navigation/routes";
import { fadeUp, transition } from "@/lib/motion/variants";
import type { CtaBlockData } from "@/types/blocks";
import { cn } from "@/lib/utils/cn";

interface CTARendererProps {
  data: CtaBlockData;
  vehicleSlug: string;
  themeId?: string;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
}

function resolveHref(
  data: CtaBlockData,
  vehicleSlug: string,
  themeId?: string,
): string | null {
  switch (data.action) {
    case "test_drive":
      return routes.testDriveInfo(vehicleSlug);
    case "test_drive_info":
      return routes.testDriveInfo(vehicleSlug);
    case "share":
      return routes.share(vehicleSlug);
    case "compare":
      return routes.compare(vehicleSlug);
    case "tour":
      return data.targetId
        ? routes.tour(vehicleSlug, data.targetId)
        : routes.vehicle(vehicleSlug);
    case "topic": {
      const resolvedTheme = data.targetThemeId ?? themeId;
      return data.targetId && resolvedTheme
        ? routes.topic(vehicleSlug, resolvedTheme, data.targetId)
        : routes.vehicle(vehicleSlug);
    }
    case "whatsapp":
      return routes.whatsapp(vehicleSlug);
    default:
      return routes.vehicle(vehicleSlug);
  }
}

export function CTARenderer({
  data,
  vehicleSlug,
  themeId,
  className,
  variant = "primary",
}: CTARendererProps) {
  const href = resolveHref(data, vehicleSlug, themeId);

  const classes = cn(
    "inline-flex min-h-[52px] items-center justify-center rounded-full px-8 py-3 text-sm font-semibold transition-all",
    variant === "primary" &&
      "bg-[var(--color-accent)] text-[var(--color-background)] shadow-lg shadow-[var(--color-accent)]/25",
    variant === "secondary" &&
      "border border-white/20 bg-white/5 text-white backdrop-blur-sm",
    variant === "ghost" && "text-[var(--color-accent)] underline-offset-4 hover:underline",
    className,
  );

  if (!href) {
    return (
      <motion.span
        className={cn(classes, "cursor-not-allowed opacity-50")}
        initial={fadeUp.initial}
        whileInView={fadeUp.animate}
        viewport={{ once: true }}
        transition={transition.normal}
      >
        {data.label}
      </motion.span>
    );
  }

  return (
    <motion.div
      initial={fadeUp.initial}
      whileInView={fadeUp.animate}
      viewport={{ once: true }}
      transition={transition.normal}
    >
      <Link href={href} className={classes}>
        {data.label}
      </Link>
    </motion.div>
  );
}
