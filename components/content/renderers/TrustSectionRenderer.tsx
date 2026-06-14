"use client";

import { motion } from "framer-motion";
import { NarrationRenderer } from "./NarrationRenderer";
import { StatCalloutRenderer } from "./StatCalloutRenderer";
import { FeatureGridRenderer } from "./FeatureGridRenderer";
import { fadeUp, transition } from "@/lib/motion/variants";
import type { ContentBlock } from "@/types/content";
import type {
  NarrationBlockData,
  StatCalloutBlockData,
  FeatureGridBlockData,
  TrustSectionBlockData,
} from "@/types/blocks";
import type { Persona } from "@/types/persona";
import { cn } from "@/lib/utils/cn";

interface TrustSectionRendererProps {
  blocks: ContentBlock[];
  persona?: Persona;
  explicitData?: TrustSectionBlockData;
  vehicleSlug: string;
  className?: string;
}

function isTrustSectionData(data: unknown): data is TrustSectionBlockData {
  return (
    typeof data === "object" &&
    data !== null &&
    "title" in data &&
    "items" in data &&
    Array.isArray((data as TrustSectionBlockData).items)
  );
}

export function TrustSectionRenderer({
  blocks,
  persona,
  explicitData,
  className,
}: TrustSectionRendererProps) {
  const trustBlock = blocks.find(
    (b) => b.type === "feature_grid" && isTrustSectionData(b.data),
  );
  const trustData = explicitData ?? (trustBlock?.data as TrustSectionBlockData | undefined);

  const narration = blocks.find((b) => b.type === "narration");
  const stats = blocks.find((b) => b.type === "stat_callout");
  const features = blocks.find(
    (b) => b.type === "feature_grid" && !isTrustSectionData(b.data),
  );

  const variant = trustData?.variant ?? "default";
  const variantLabel =
    variant === "warranty"
      ? "Garantía GAC"
      : variant === "service"
        ? "Servicio Viaggio"
        : variant === "heritage"
          ? "Respaldo global"
          : "Confianza";

  return (
    <motion.section
      className={cn(
        "relative overflow-hidden rounded-3xl border border-[var(--color-accent)]/15 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-background)] p-6 md:p-10",
        className,
      )}
      initial={fadeUp.initial}
      whileInView={fadeUp.animate}
      viewport={{ once: true }}
      transition={transition.slow}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--color-accent)]/5 blur-3xl" />

      <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[var(--color-accent)]">
        {variantLabel}
      </p>
      {trustData?.title ? (
        <h2 className="mb-6 text-2xl font-light md:text-4xl">{trustData.title}</h2>
      ) : null}
      {trustData?.subtitle ? (
        <p className="mb-8 max-w-2xl text-white/60">{trustData.subtitle}</p>
      ) : null}

      {trustData?.items?.length ? (
        <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {trustData.items.map((item, index) => (
            <div
              key={`${item.label}-${index}`}
              className="rounded-xl border border-white/8 bg-black/20 px-4 py-4"
            >
              {item.icon ? (
                <span className="mb-2 block text-lg" aria-hidden>
                  {item.icon}
                </span>
              ) : null}
              <p className="text-xs uppercase tracking-wider text-white/40">
                {item.label}
              </p>
              <p className="mt-1 text-sm font-medium text-white/90">{item.value}</p>
            </div>
          ))}
        </div>
      ) : null}

      {narration ? (
        <NarrationRenderer
          data={narration.data as unknown as NarrationBlockData}
          personaId={narration.personaId ?? persona?.id}
          personaName={persona?.name}
          personaRole={persona?.role}
          className="mb-8"
        />
      ) : null}

      {stats ? (
        <StatCalloutRenderer
          data={stats.data as unknown as StatCalloutBlockData}
          className="mb-8"
        />
      ) : null}

      {features ? (
        <FeatureGridRenderer data={features.data as unknown as FeatureGridBlockData} />
      ) : null}
    </motion.section>
  );
}
