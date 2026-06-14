import type { ReactNode } from "react";
import { A11yProvider } from "@/lib/a11y/A11yProvider";
import { SessionProvider } from "@/lib/session/SessionProvider";
import { IdleManager } from "@/components/overlays/IdleManager";
import { SettingsOverlay } from "@/components/overlays/SettingsOverlay";

export default function ShowroomLayout({ children }: { children: ReactNode }) {
  return (
    <A11yProvider>
      <SessionProvider>
        {children}
        <SettingsOverlay />
        <IdleManager />
      </SessionProvider>
    </A11yProvider>
  );
}
