"use client";

import type { ContentBlock } from "@/types/content";
import type { Persona } from "@/types/persona";
import type {
  HeroBlockData,
  NarrationBlockData,
  FeatureGridBlockData,
  StatCalloutBlockData,
  CtaBlockData,
} from "@/types/blocks";
import { HeroRenderer } from "./renderers/HeroRenderer";
import { NarrationRenderer } from "./renderers/NarrationRenderer";
import { FeatureGridRenderer } from "./renderers/FeatureGridRenderer";
import { StatCalloutRenderer } from "./renderers/StatCalloutRenderer";
import { CTARenderer } from "./renderers/CTARenderer";

interface ContentBlockRendererProps {
  block: ContentBlock;
  vehicleSlug: string;
  themeId?: string;
  persona?: Persona;
  heroFullBleed?: boolean;
}

export function ContentBlockRenderer({
  block,
  vehicleSlug,
  themeId,
  persona,
  heroFullBleed,
}: ContentBlockRendererProps) {
  const blockPersonaId = block.personaId ?? persona?.id;
  const blockPersona =
    blockPersonaId && blockPersonaId !== persona?.id
      ? { id: blockPersonaId, name: blockPersonaId === "carlos" ? "Carlos" : blockPersonaId === "diego" ? "Diego" : "Sofía", role: blockPersonaId === "carlos" ? "Confianza" : blockPersonaId === "diego" ? "Familia" : "Deseo" }
      : persona;

  switch (block.type) {
    case "hero":
      return (
        <HeroRenderer
          data={block.data as unknown as HeroBlockData}
          fullBleed={heroFullBleed}
        />
      );
    case "narration":
      return (
        <NarrationRenderer
          data={block.data as unknown as NarrationBlockData}
          personaId={blockPersonaId}
          personaName={blockPersona?.name}
          personaRole={blockPersona?.role}
        />
      );
    case "feature_grid":
      return (
        <FeatureGridRenderer data={block.data as unknown as FeatureGridBlockData} />
      );
    case "stat_callout":
      return (
        <StatCalloutRenderer data={block.data as unknown as StatCalloutBlockData} />
      );
    case "cta":
      return (
        <CTARenderer
          data={block.data as unknown as CtaBlockData}
          vehicleSlug={vehicleSlug}
          themeId={themeId}
        />
      );
    default:
      return null;
  }
}
