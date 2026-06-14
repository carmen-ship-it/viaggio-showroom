"use client";

import type { Topic } from "@/types/content";
import type { Persona } from "@/types/persona";
import { ContentBlockRenderer } from "./ContentBlockRenderer";
import { cn } from "@/lib/utils/cn";

interface TopicRendererProps {
  topic: Topic;
  persona?: Persona;
  heroFullBleed?: boolean;
  className?: string;
}

export function TopicRenderer({
  topic,
  persona,
  heroFullBleed,
  className,
}: TopicRendererProps) {
  const sortedBlocks = [...topic.blocks].sort((a, b) => a.sortOrder - b.sortOrder);
  const guide = persona;

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      {sortedBlocks.map((block) => (
        <ContentBlockRenderer
          key={block.id}
          block={block}
          vehicleSlug={topic.vehicleSlug}
          themeId={topic.themeId}
          persona={guide}
          heroFullBleed={heroFullBleed}
        />
      ))}
    </div>
  );
}
