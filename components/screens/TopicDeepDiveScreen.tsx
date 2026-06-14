"use client";

import { useEffect } from "react";
import type { Topic } from "@/types/content";
import type { Persona } from "@/types/persona";
import { TopicRenderer } from "@/components/content/TopicRenderer";
import { TouchNav } from "@/components/cinematic/TouchNav";
import { formatScreenLabel } from "@/lib/config/demo-mode";
import { useSession } from "@/lib/session/SessionProvider";

interface TopicDeepDiveScreenProps {
  topic: Topic;
  persona: Persona;
  topicId: string;
  backHref: string;
  backLabel?: string;
  nextHref: string;
  nextLabel: string;
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

  useEffect(() => {
    recordTopicVisit(topicId);
    recordTrustSignal("topic_view");
  }, [topicId, recordTopicVisit, recordTrustSignal]);

  return (
    <div className="flex min-h-screen max-h-screen flex-col overflow-hidden">
      <div className="min-h-0 flex-1 overflow-y-auto px-6 py-16 md:px-[var(--spacing-kiosk)] md:py-20">
        <p className="type-label text-[var(--color-accent-trust)]">
          {formatScreenLabel("S08 · Tema")}
        </p>
        <h1 className="type-headline mt-5 text-white">{topic.title}</h1>
        <div className="mt-12">
          <TopicRenderer topic={topic} persona={persona} heroFullBleed />
        </div>
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
