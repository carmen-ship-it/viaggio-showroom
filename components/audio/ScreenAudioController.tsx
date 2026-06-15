"use client";

import { usePathname } from "next/navigation";
import type { HostScreenId } from "@/lib/audio/host-narration";
import { useHostNarration } from "@/lib/audio/useHostNarration";

function resolveTourId(path: string): string | undefined {
  const segment = path.split("/").pop();
  if (!segment) return undefined;
  if (path.includes("/journey/")) {
    if (segment === "diego") return "family";
    if (segment === "sofia") return "desire";
    return "trust";
  }
  return segment;
}

const HOST_ROUTE_SCREENS: Array<{
  screenId: HostScreenId;
  match: (path: string) => boolean;
  tourId?: (path: string) => string | undefined;
  topicId?: (path: string) => string | undefined;
}> = [
  {
    screenId: "S03",
    match: (p) => p === "/vehicles",
  },
  {
    screenId: "S25",
    match: (p) => /\/vehicles\/[^/]+\/trust\/faq$/.test(p),
  },
  {
    screenId: "S22",
    match: (p) => /\/vehicles\/[^/]+\/hero$/.test(p),
  },
  {
    screenId: "S06",
    match: (p) => /\/vehicles\/[^/]+\/(tour|journey)\/[^/]+$/.test(p),
    tourId: resolveTourId,
  },
  {
    screenId: "S08",
    match: (p) => /\/vehicles\/[^/]+\/themes\/[^/]+\/[^/]+$/.test(p),
    topicId: (p) => p.split("/").pop(),
  },
  {
    screenId: "S12",
    match: (p) => /\/vehicles\/[^/]+\/compare\/[^/]+$/.test(p),
  },
  {
    screenId: "S26",
    match: (p) => /\/vehicles\/[^/]+\/economics\/financing$/.test(p),
  },
  {
    screenId: "S13",
    match: (p) => /\/vehicles\/[^/]+\/convert$/.test(p),
  },
  {
    screenId: "S15",
    match: (p) => /\/vehicles\/[^/]+\/whatsapp$/.test(p),
  },
];

/** Route-driven host narration for screens outside ExperienceEntry. */
export function ScreenAudioController() {
  const pathname = usePathname() ?? "";
  const config = HOST_ROUTE_SCREENS.find((entry) => entry.match(pathname));

  useHostNarration({
    screenId: config?.screenId ?? "S03",
    enabled: Boolean(config),
    tourId: config?.tourId?.(pathname),
    topicId: config?.topicId?.(pathname),
  });

  return null;
}
