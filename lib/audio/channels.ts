import type { AudioChannel } from "@/types/audio";

export interface ChannelPolicy {
  channel: AudioChannel;
  /** Whether this channel loops (ambient only). */
  loop: boolean;
  /** Pause when document is hidden (auto-pause support). */
  pauseOnHidden: boolean;
  /** Stop other narration when a new track starts on this channel. */
  exclusive: boolean;
}

export const CHANNEL_POLICIES: Record<AudioChannel, ChannelPolicy> = {
  ambient: {
    channel: "ambient",
    loop: true,
    pauseOnHidden: true,
    exclusive: false,
  },
  narration: {
    channel: "narration",
    loop: false,
    pauseOnHidden: true,
    exclusive: true,
  },
  interaction: {
    channel: "interaction",
    loop: false,
    pauseOnHidden: false,
    exclusive: false,
  },
};
