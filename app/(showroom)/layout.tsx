import type { ReactNode } from "react";
import { A11yProvider } from "@/lib/a11y/A11yProvider";
import { AudioProvider } from "@/lib/audio/AudioProvider";
import { SessionProvider } from "@/lib/session/SessionProvider";
import { AudioExperienceRoot } from "@/components/audio/AudioExperienceRoot";
import { ScreenAudioController } from "@/components/audio/ScreenAudioController";
import { IdleManager } from "@/components/overlays/IdleManager";
import { SettingsOverlay } from "@/components/overlays/SettingsOverlay";

export default function ShowroomLayout({ children }: { children: ReactNode }) {
  return (
    <A11yProvider>
      <SessionProvider>
        <AudioProvider>
          <AudioExperienceRoot>
            <ScreenAudioController />
            {children}
            <SettingsOverlay />
            <IdleManager />
          </AudioExperienceRoot>
        </AudioProvider>
      </SessionProvider>
    </A11yProvider>
  );
}
