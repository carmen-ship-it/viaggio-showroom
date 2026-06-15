"use client";

import { useEffect } from "react";
import type { Topic } from "@/types/content";
import type { Persona } from "@/types/persona";
import type { FeatureGridBlockData, HeroBlockData, NarrationBlockData } from "@/types/blocks";
import { MediaSurface } from "@/components/media/MediaSurface";
import { TopicRenderer } from "@/components/content/TopicRenderer";
import { TouchNav } from "@/components/cinematic/TouchNav";
import {
  formatScreenLabel,
  kioskViewportShellClass,
  shouldUseTopicCompactLayout,
} from "@/lib/config/demo-mode";
import { useSession } from "@/lib/session/SessionProvider";
import { cn } from "@/lib/utils/cn";

interface TopicDeepDiveScreenProps {
  topic: Topic;
  persona: Persona;
  topicId: string;
  backHref: string;
  backLabel?: string;
  nextHref: string;
  nextLabel: string;
}

function getBlockData<T>(topic: Topic, type: string): T | null {
  const block = topic.blocks.find((b) => b.type === type);
  return (block?.data as T) ?? null;
}

export function TopicDeepDiveScreen({
  topic,
  persona,
  topicId,
  backHref,
  backLabel = "Volver",
  nextHref,
  nextLabel,
}: TopicDeepDiveScreenProps) {
  const { recordTopicVisit, recordTrustSignal } = useSession();
  const compact = shouldUseTopicCompactLayout();

  useEffect(() => {
    recordTopicVisit(topicId);
    recordTrustSignal("topic_view");
  }, [topicId, recordTopicVisit, recordTrustSignal]);

  const hero = getBlockData<HeroBlockData>(topic, "hero");
  const narration = getBlockData<NarrationBlockData>(topic, "narration");
  const features = getBlockData<FeatureGridBlockData>(topic, "feature_grid");

  const narrationLead = narration?.text
    ? narration.text.split(/(?<=[.!?])\s+/).slice(0, 2).join(" ")
    : null;

  return (
    <div className={cn("flex flex-col bg-[var(--canvas-deep)]", kioskViewportShellClass())}>
      <div
        className={cn(
          "flex min-h-0 flex-1 flex-col px-6 md:px-[var(--spacing-kiosk)]",
          compact ? "justify-center py-6" : "overflow-y-auto py-16 md:py-20",
        )}
      >
        <p className="type-label text-[var(--color-accent-trust)]">
          {formatScreenLabel("S08 · Tema")}
        </p>
        <h1 className={cn("type-headline text-white", compact ? "mt-3" : "mt-5")}>
          {topic.title}
        </h1>

        {compact && hero?.mediaId ? (
          <div className="relative mt-3 aspect-[21/9] max-h-[150px] overflow-hidden rounded-2xl border border-white/10">
            <MediaSurface mediaId={hero.mediaId} className="absolute inset-0" overlay />
          </div>
        ) : null}

        {compact && narrationLead ? (
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/70">
            {narrationLead}
          </p>
        ) : null}

        {compact && features?.features?.length ? (
          <div className="mt-4 grid grid-cols-2 gap-2">
            {features.features.slice(0, 4).map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
              >
                <p className="text-sm font-semibold text-white">{feature.title}</p>
                <p className="mt-1 text-xs leading-snug text-white/55">
                  {feature.description.split(/(?<=[.!?])\s+/)[0]}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12">
            <TopicRenderer topic={topic} persona={persona} heroFullBleed />
          </div>
        )}
      </div>
      <TouchNav
        backHref={backHref}
        backLabel={backLabel}
        nextHref={nextHref}
        nextLabel={nextLabel}
        className="shrink-0 border-t border-white/10 bg-[var(--canvas-deep)]/95 backdrop-blur-xl"
      />
    </div>
  );
}
