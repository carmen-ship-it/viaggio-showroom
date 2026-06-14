"use client";

import type { Persona } from "@/types/persona";
import { PersonaAvatar } from "@/components/media/PersonaAvatar";
import { cn } from "@/lib/utils/cn";

interface PersonaPortraitProps {
  persona: Persona;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function PersonaPortrait({
  persona,
  className,
  size = "md",
}: PersonaPortraitProps) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <PersonaAvatar persona={persona} size={size} />
      <p className="mt-4 text-lg font-medium">{persona.name}</p>
      <p className="text-sm text-white/50">{persona.role}</p>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/65">
        {persona.introLine}
      </p>
    </div>
  );
}
