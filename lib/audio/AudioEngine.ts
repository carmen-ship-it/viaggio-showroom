import type { AudioChannel, AudioPlaybackState, AudioPreferences } from "@/types/audio";
import type { MediaAsset } from "@/types/media";
import {
  AMBIENT_FADE_MS,
  DEFAULT_CHANNEL_GAIN,
  HEADPHONE_MODE_GAIN,
  INTERACTION_DEBOUNCE_MS,
} from "./constants";
import { CHANNEL_POLICIES } from "./channels";
import { channelForAssetId, resolveAudioAsset, resolvePlaybackSrc } from "./resolve-audio";

interface ActiveTrack {
  assetId: string;
  channel: AudioChannel;
  element: HTMLAudioElement;
  state: AudioPlaybackState;
  wasPlayingBeforeHidden: boolean;
}

type EngineListener = () => void;

export class AudioEngine {
  private tracks = new Map<AudioChannel, ActiveTrack>();
  private elementPool = new Map<string, HTMLAudioElement>();
  private preferences: AudioPreferences;
  private manifestAssets: MediaAsset[] = [];
  private listeners = new Set<EngineListener>();
  private lastInteractionAt = 0;
  private visibilityBound = false;
  private availabilityCache = new Map<string, boolean>();

  constructor(preferences: AudioPreferences) {
    this.preferences = preferences;
  }

  subscribe(listener: EngineListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener();
    }
  }

  setPreferences(preferences: AudioPreferences): void {
    this.preferences = preferences;
    this.applyVolumeToAll();
    if (preferences.masterMuted) {
      this.pauseAll();
    }
    this.notify();
  }

  setManifestAssets(assets: MediaAsset[]): void {
    this.manifestAssets = assets;
    this.availabilityCache.clear();
  }

  getChannelState(channel: AudioChannel): AudioPlaybackState {
    return this.tracks.get(channel)?.state ?? "idle";
  }

  getActiveAssetId(channel: AudioChannel): string | null {
    return this.tracks.get(channel)?.assetId ?? null;
  }

  isNarrationPlaying(): boolean {
    return this.getChannelState("narration") === "playing";
  }

  private bindVisibility(): void {
    if (this.visibilityBound || typeof document === "undefined") return;
    this.visibilityBound = true;
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.handlePageHidden();
      } else {
        this.handlePageVisible();
      }
    });
  }

  private handlePageHidden(): void {
    for (const track of this.tracks.values()) {
      const policy = CHANNEL_POLICIES[track.channel];
      if (!policy.pauseOnHidden) continue;
      track.wasPlayingBeforeHidden = track.state === "playing";
      if (track.wasPlayingBeforeHidden) {
        track.element.pause();
        track.state = "paused";
      }
    }
    this.notify();
  }

  private handlePageVisible(): void {
    if (this.preferences.masterMuted) return;
    for (const track of this.tracks.values()) {
      const policy = CHANNEL_POLICIES[track.channel];
      if (!policy.pauseOnHidden) continue;
      if (track.wasPlayingBeforeHidden) {
        void track.element.play().then(() => {
          track.state = "playing";
          this.notify();
        }).catch(() => {
          track.state = "paused";
        });
      }
    }
  }

  private getOrCreateElement(assetId: string, src: string, loop: boolean): HTMLAudioElement {
    const key = `${assetId}::${src}`;
    let element = this.elementPool.get(key);
    if (!element) {
      element = new Audio();
      element.preload = "metadata";
      element.src = src;
      element.loop = loop;
      this.elementPool.set(key, element);
    }
    return element;
  }

  private computeGain(channel: AudioChannel): number {
    if (this.preferences.masterMuted) return 0;

    let gain = DEFAULT_CHANNEL_GAIN[channel];

    if (this.preferences.headphoneMode) {
      gain *= HEADPHONE_MODE_GAIN[channel];
    }

    switch (channel) {
      case "ambient":
        gain *= this.preferences.ambientVolume;
        break;
      case "narration":
        gain *= this.preferences.narrationVolume;
        break;
      case "interaction":
        if (!this.preferences.interactionSoundsEnabled) return 0;
        gain *= this.preferences.interactionVolume;
        break;
    }

    return Math.min(1, Math.max(0, gain));
  }

  private applyVolume(track: ActiveTrack): void {
    track.element.volume = this.computeGain(track.channel);
    track.element.muted = this.preferences.masterMuted;
  }

  private applyVolumeToAll(): void {
    for (const track of this.tracks.values()) {
      this.applyVolume(track);
    }
  }

  private async probeAvailability(src: string): Promise<boolean> {
    if (this.availabilityCache.has(src)) {
      return this.availabilityCache.get(src)!;
    }

    try {
      const response = await fetch(src, { method: "HEAD" });
      const available = response.ok;
      this.availabilityCache.set(src, available);
      return available;
    } catch {
      this.availabilityCache.set(src, false);
      return false;
    }
  }

  async playAsset(
    assetId: string,
    options: { channel?: AudioChannel; fadeIn?: boolean } = {},
  ): Promise<boolean> {
    this.bindVisibility();

    const resolved = resolveAudioAsset(assetId, this.manifestAssets);
    if (!resolved) return false;

    const channel = options.channel ?? resolved.channel ?? channelForAssetId(assetId);
    const policy = CHANNEL_POLICIES[channel];

    if (channel === "interaction") {
      const now = Date.now();
      if (now - this.lastInteractionAt < INTERACTION_DEBOUNCE_MS) return false;
      this.lastInteractionAt = now;
    }

    const available = await this.probeAvailability(resolved.src);
    let playbackSrc = resolved.src;
    if (!available) {
      const wavSrc = resolvePlaybackSrc(resolved.src);
      if (wavSrc && (await this.probeAvailability(wavSrc))) {
        playbackSrc = wavSrc;
      } else {
        const existing = this.tracks.get(channel);
        if (existing?.assetId === assetId) {
          existing.state = "unavailable";
          this.notify();
        }
        return false;
      }
    }

    if (policy.exclusive) {
      this.stopChannel(channel, { keepElement: false });
    }

    const element = this.getOrCreateElement(assetId, playbackSrc, resolved.loop);
    const track: ActiveTrack = {
      assetId,
      channel,
      element,
      state: "loading",
      wasPlayingBeforeHidden: false,
    };

    element.onended = () => {
      if (!resolved.loop) {
        track.state = "idle";
        this.notify();
      }
    };

    element.onerror = () => {
      track.state = "unavailable";
      this.notify();
    };

    this.tracks.set(channel, track);
    this.applyVolume(track);

    if (options.fadeIn && channel === "ambient") {
      const target = this.computeGain(channel);
      element.volume = 0;
      try {
        await element.play();
        track.state = "playing";
        this.fadeVolume(element, 0, target, AMBIENT_FADE_MS);
      } catch {
        track.state = "unavailable";
      }
    } else {
      try {
        await element.play();
        track.state = "playing";
      } catch {
        track.state = "unavailable";
      }
    }

    this.notify();
    return track.state === "playing";
  }

  private fadeVolume(
    element: HTMLAudioElement,
    from: number,
    to: number,
    durationMs: number,
  ): void {
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      element.volume = from + (to - from) * t;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  pauseChannel(channel: AudioChannel): void {
    const track = this.tracks.get(channel);
    if (!track || track.state !== "playing") return;
    track.element.pause();
    track.state = "paused";
    this.notify();
  }

  resumeChannel(channel: AudioChannel): void {
    if (this.preferences.masterMuted) return;
    const track = this.tracks.get(channel);
    if (!track || track.state !== "paused") return;
    void track.element.play().then(() => {
      track.state = "playing";
      this.notify();
    });
  }

  toggleChannel(channel: AudioChannel): void {
    const state = this.getChannelState(channel);
    if (state === "playing") {
      this.pauseChannel(channel);
    } else if (state === "paused") {
      this.resumeChannel(channel);
    }
  }

  stopChannel(channel: AudioChannel, options: { keepElement?: boolean } = {}): void {
    const track = this.tracks.get(channel);
    if (!track) return;
    track.element.pause();
    track.element.currentTime = 0;
    if (!options.keepElement) {
      track.element.onended = null;
      track.element.onerror = null;
    }
    this.tracks.delete(channel);
    this.notify();
  }

  pauseAll(): void {
    for (const channel of this.tracks.keys()) {
      this.pauseChannel(channel);
    }
  }

  stopAll(): void {
    for (const channel of [...this.tracks.keys()]) {
      this.stopChannel(channel);
    }
  }

  playInteraction(assetId: string): void {
    if (this.preferences.masterMuted || !this.preferences.interactionSoundsEnabled) {
      return;
    }
    void this.playAsset(assetId, { channel: "interaction" });
  }

  destroy(): void {
    this.stopAll();
    for (const element of this.elementPool.values()) {
      element.src = "";
    }
    this.elementPool.clear();
    this.listeners.clear();
  }
}
