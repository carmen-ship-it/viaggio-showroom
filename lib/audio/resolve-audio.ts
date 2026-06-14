import type { PersonaId } from "@/types/persona";
import type { AudioChannel, ResolvedAudioAsset } from "@/types/audio";
import type { MediaAsset } from "@/types/media";
import { ALL_AUDIO_ASSETS, type AudioAssetDefinition } from "./assets";

function definitionToResolved(def: AudioAssetDefinition): ResolvedAudioAsset {
  return {
    assetId: def.id,
    src: def.src,
    channel: def.channel,
    loop: def.loop ?? def.channel === "ambient",
    available: false,
    label: def.label,
  };
}

function mediaAssetToResolved(asset: MediaAsset): ResolvedAudioAsset {
  return {
    assetId: asset.id,
    src: asset.src,
    channel: "narration",
    loop: false,
    available: false,
    label: asset.alt,
  };
}

export function getAudioDefinition(assetId: string): AudioAssetDefinition | undefined {
  return ALL_AUDIO_ASSETS.find((a) => a.id === assetId);
}

export function resolveAudioAsset(
  assetId: string,
  manifestAssets: MediaAsset[] = [],
): ResolvedAudioAsset | null {
  const fromRegistry = getAudioDefinition(assetId);
  if (fromRegistry) {
    return definitionToResolved(fromRegistry);
  }

  const fromManifest = manifestAssets.find(
    (a) => a.id === assetId && a.type === "audio",
  );
  if (fromManifest) {
    return mediaAssetToResolved(fromManifest);
  }

  return null;
}

/** Content-driven narration asset ID when block omits explicit audioAssetId. */
export function buildNarrationAssetId(
  personaId: PersonaId,
  options: { stepId?: string; topicId?: string; audioAssetId?: string },
): string | null {
  if (options.audioAssetId) return options.audioAssetId;
  if (options.stepId) return `audio-narration-${personaId}-${options.stepId}`;
  if (options.topicId) return `audio-narration-${personaId}-${options.topicId}`;
  return null;
}

export function resolveNarrationAsset(
  personaId: PersonaId,
  options: {
    audioAssetId?: string;
    stepId?: string;
    topicId?: string;
    vehicleSlug?: string;
  },
  manifestAssets: MediaAsset[] = [],
): ResolvedAudioAsset | null {
  const assetId = buildNarrationAssetId(personaId, options);
  if (!assetId) return null;
  return resolveAudioAsset(assetId, manifestAssets);
}

export function channelForAssetId(assetId: string): AudioChannel {
  const def = getAudioDefinition(assetId);
  if (def) return def.channel;
  if (assetId.startsWith("audio-ambient")) return "ambient";
  if (assetId.startsWith("audio-sfx")) return "interaction";
  if (assetId.startsWith("audio-narration-host")) return "narration";
  return "narration";
}

