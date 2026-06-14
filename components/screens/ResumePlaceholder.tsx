"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatScreenLabel } from "@/lib/config/demo-mode";
import { routes } from "@/lib/navigation/routes";
import { fadeUp, transition } from "@/lib/motion/variants";

interface ResumePlaceholderProps {
  slug: string;
  vehicleName: string;
}

export function ResumePlaceholder({ slug, vehicleName }: ResumePlaceholderProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--canvas-soft)] px-6 text-center">
      <motion.div
        className="max-w-md"
        initial={fadeUp.initial}
        animate={fadeUp.animate}
        transition={transition.normal}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-accent-trust)]">
          {formatScreenLabel("S37 · Reanudar sesión")}
        </p>
        <h1 className="mt-4 text-3xl font-light">Continuar donde quedaste</h1>
        <p className="mt-4 text-white/65">
          Próximamente podrás retomar tu exploración del {vehicleName} desde el
          celular o al volver al showroom. Por ahora, volvé al hub de conversión.
        </p>
        <Link
          href={routes.convert(slug)}
          className="mt-8 inline-block min-h-[52px] rounded-full bg-white px-8 py-3 text-sm font-semibold text-[var(--canvas-deep)]"
        >
          Ir al hub de conversión
        </Link>
      </motion.div>
    </div>
  );
}
