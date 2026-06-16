"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { FaqItem } from "@/types/trust";
import type { Persona } from "@/types/persona";
import { PersonaPortrait } from "@/components/persona/PersonaPortrait";
import { WarrantyVisualCard } from "@/components/media/TrustMediaFramework";
import { useSession } from "@/lib/session/SessionProvider";
import { mapFaqItemToTopic } from "@/lib/session/session-intelligence";
import { TouchNav } from "@/components/cinematic/TouchNav";
import { routes } from "@/lib/navigation/routes";
import {
  kioskViewportShellClass,
  shouldHideDeveloperTools,
  shouldUseFaqCompactLayout,
} from "@/lib/config/demo-mode";
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

function kioskFaqLead(answer: string): string {
  const first = answer.split(/(?<=[.!?])\s+/)[0] ?? answer;
  return first.length > 160 ? `${first.slice(0, 157).trim()}…` : first;
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
  const { recordTrustSignal, recordTopicVisit, trustSignals, canShowCompareCta } =
    useSession();
  const compact = shouldUseFaqCompactLayout();
  const displayItems = compact ? items.slice(0, 2) : items;

  useEffect(() => {
    if (!compact) return;
    recordTrustSignal("faq_view");
    displayItems.forEach((item) => {
      const mapped = mapFaqItemToTopic(item.id);
      if (mapped) recordTopicVisit(mapped.topicId);
    });
  }, [compact, displayItems, recordTrustSignal, recordTopicVisit]);

  const toggle = (id: string) => {
    setOpenId((prev) => {
      const next = prev === id ? null : id;
      if (next) recordTrustSignal("faq_open");
      return next;
    });
  };

  return (
    <div className={cn("flex flex-col bg-[var(--canvas-soft)]", kioskViewportShellClass())}>
      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col gap-6 px-6 lg:flex-row lg:px-[var(--spacing-kiosk)]",
          compact ? "py-8 lg:py-10" : "py-10 lg:py-14",
        )}
      >
        <aside className={cn(compact ? "lg:w-[28%]" : "lg:w-[35%]", "lg:shrink-0")}>
          <PersonaPortrait persona={persona} size={compact ? "md" : "lg"} />
        </aside>

        <div className="flex min-h-0 flex-1 flex-col">
          <p className="type-label text-[var(--color-accent-trust)]">Confianza</p>
          <h1 className={cn("type-headline text-white", compact ? "mt-3" : "mt-4")}>
            {title}
          </h1>
          {subtitle ? (
            <p
              className={cn(
                "type-kiosk-lead max-w-2xl text-white/60",
                compact ? "mt-3 text-base" : "mt-5",
              )}
            >
              {compact ? "Las dos dudas que más escuchamos en piso." : subtitle}
            </p>
          ) : null}

          {compact ? (
            <ul className="mt-6 space-y-4">
              {displayItems.map((item) => (
                <li
                  key={item.id}
                  className="rounded-2xl border border-[var(--color-accent-trust)]/30 bg-[var(--canvas-light)] px-5 py-4 text-[var(--text-on-light)]"
                >
                  <p className="text-lg font-medium leading-snug">{item.question}</p>
                  <p className="mt-3 text-base leading-relaxed">
                    {kioskFaqLead(item.answer)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mt-10 space-y-4">
              {displayItems.map((item) => {
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
                      <span className="pr-4 text-xl font-medium leading-snug text-balance">
                        {item.question}
                      </span>
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
                            {item.id === "garantia" ||
                            item.question.toLowerCase().includes("garantía") ? (
                              <div className="mt-5">
                                <WarrantyVisualCard compact />
                              </div>
                            ) : null}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          )}

          {compact && trustSignals >= 1 ? (
            <p className="mt-5 flex items-center gap-2 text-sm text-[var(--color-accent-trust)]">
              <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-[var(--color-accent-trust)]" />
              CPI-OS registró tus preguntas de confianza
            </p>
          ) : null}

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

      <TouchNav
        backHref={backHref}
        backLabel="Volver al hero"
        nextHref={nextHref}
        nextLabel={nextLabel}
        className="shrink-0"
      />
    </div>
  );
}
