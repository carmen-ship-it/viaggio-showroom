"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FaqItem } from "@/types/trust";
import type { Persona } from "@/types/persona";
import { PersonaPortrait } from "@/components/persona/PersonaPortrait";
import { WarrantyVisualCard } from "@/components/media/TrustMediaFramework";
import { useSession } from "@/lib/session/SessionProvider";
import { TouchNav } from "@/components/cinematic/TouchNav";
import { routes } from "@/lib/navigation/routes";
import { shouldHideDeveloperTools } from "@/lib/config/demo-mode";
import { transition } from "@/lib/motion/variants";
import { cn } from "@/lib/utils/cn";

interface FAQScreenProps {
  title: string;
  subtitle?: string;
  items: FaqItem[];
  persona: Persona;
  vehicleSlug: string;
  nextHref: string;
  nextLabel?: string;
  backHref: string;
}

export function FAQScreen({
  title,
  subtitle,
  items,
  persona,
  vehicleSlug,
  nextHref,
  nextLabel = "Historia Viaggio & GAC",
  backHref,
}: FAQScreenProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const { recordTrustSignal, trustSignals, canShowCompareCta } = useSession();

  const toggle = (id: string) => {
    setOpenId((prev) => {
      const next = prev === id ? null : id;
      if (next) recordTrustSignal("faq_open");
      return next;
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[var(--canvas-soft)]">
      <div className="flex flex-1 flex-col gap-8 px-6 py-10 lg:flex-row lg:px-12 lg:py-14">
        <aside className="lg:w-[35%] lg:shrink-0">
          <PersonaPortrait persona={persona} size="lg" className="lg:sticky lg:top-24" />
        </aside>

        <div className="flex-1">
          <p className="type-label text-[var(--color-accent-trust)]">
            Confianza
          </p>
          <h1 className="type-headline mt-4 text-white">{title}</h1>
          {subtitle ? (
            <p className="type-kiosk-lead mt-5 max-w-2xl text-white/60">{subtitle}</p>
          ) : null}

          <ul className="mt-10 space-y-4">
            {items.map((item) => {
              const isOpen = openId === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    className={cn(
                      "flex min-h-[76px] w-full items-center justify-between rounded-2xl border px-6 py-5 text-left transition-colors",
                      isOpen
                        ? "border-[var(--color-accent-trust)]/40 bg-[var(--canvas-light)] text-[var(--text-on-light)]"
                        : "border-white/10 bg-white/[0.04] hover:border-white/20",
                    )}
                    aria-expanded={isOpen}
                  >
                    <span className="pr-4 text-xl font-medium">{item.question}</span>
                    <span
                      className={cn(
                        "text-2xl transition-transform",
                        isOpen && "rotate-45",
                      )}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={transition.fast}
                        className="overflow-hidden"
                      >
                        <div className="rounded-b-2xl border border-t-0 border-white/10 bg-[var(--canvas-light)] px-5 py-5 text-[var(--text-on-light)]">
                          <p className="text-lg leading-relaxed">{item.answer}</p>
                          {item.id === "garantia" || item.question.toLowerCase().includes("garantía") ? (
                            <div className="mt-5">
                              <WarrantyVisualCard compact />
                            </div>
                          ) : null}
                          {item.proofSuggestion ? (
                            <p className="mt-4 text-sm text-[var(--text-secondary-on-light)]">
                              <span className="font-medium">Profundizar:</span>{" "}
                              {item.proofSuggestion}
                            </p>
                          ) : null}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {trustSignals >= 2 && !shouldHideDeveloperTools() ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 text-sm text-[var(--color-accent-trust)]"
            >
              Seguís construyendo confianza — {trustSignals} señales registradas.
            </motion.p>
          ) : null}
          {canShowCompareCta && !shouldHideDeveloperTools() ? (
            <Link
              href={routes.compare(vehicleSlug)}
              className="mt-6 inline-flex min-h-[48px] items-center rounded-full border border-[var(--color-accent-trust)]/40 px-5 text-sm text-[var(--color-accent-trust)]"
            >
              Comparar con Corolla Cross →
            </Link>
          ) : null}
        </div>
      </div>

      <TouchNav backHref={backHref} backLabel="Volver al hero" nextHref={nextHref} nextLabel={nextLabel} />
    </div>
  );
}
