"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Persona } from "@/types/persona";
import type { Vehicle } from "@/types/vehicle";
import { CinematicShell } from "@/components/cinematic/CinematicShell";
import { PageTransition } from "@/components/cinematic/PageTransition";
import { GlobalHeader } from "@/components/layout/GlobalHeader";
import { useSession, type VisitorPath } from "@/lib/session/SessionProvider";
import { useAudio } from "@/lib/audio/AudioProvider";
import { useHostNarration } from "@/lib/audio/useHostNarration";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { demoModeConfig } from "@/lib/config/demo-mode";
import { AttractLoop } from "./AttractLoop";
import { WelcomeScreen } from "./WelcomeScreen";
import { routes } from "@/lib/navigation/routes";

type EntryPhase = "attract" | "welcome";

interface ExperienceEntryProps {
  attractMediaId: string;
  tagline: string;
  brand: string;
  dealershipName: string;
  vehicle: Vehicle;
  personas: Persona[];
  defaultVehicleSlug: string;
}

export function ExperienceEntry({
  attractMediaId,
  tagline,
  brand,
  dealershipName,
  vehicle,
  personas,
  defaultVehicleSlug,
}: ExperienceEntryProps) {
  const router = useRouter();
  const { setVisitorPath } = useSession();
  const { unlockAudio, stopNarration } = useAudio();
  const [phase, setPhase] = useState<EntryPhase>("attract");

  useHostNarration({
    screenId: "S01",
    enabled: phase === "attract",
    allowReplay: true,
  });

  useHostNarration({
    screenId: "S02",
    enabled: phase === "welcome",
  });

  const handleAttractStart = () => {
    void unlockAudio();
    stopNarration();
    trackEvent({ type: "session_start", metadata: { phase: "attract_touch", audioUnlock: true } });
    setPhase("welcome");
  };

  const handleContinue = (path: VisitorPath) => {
    const resolvedPath =
      demoModeConfig.enabled && demoModeConfig.forceVisitorPath
        ? demoModeConfig.forceVisitorPath
        : path;
    setVisitorPath(resolvedPath);
    trackEvent({ type: "session_start", metadata: { visitorPath: resolvedPath } });
    if (resolvedPath === "pre_researched") {
      router.push(routes.personaExperience(defaultVehicleSlug, "sofia"));
      return;
    }
    router.push(routes.vehicles());
  };

  return (
    <CinematicShell screenId={phase === "attract" ? "S01" : "S02"} hideChrome>
      <GlobalHeader
        brand={brand}
        dealershipName={dealershipName}
        showLogos={phase !== "attract"}
      />
      <PageTransition transitionKey={phase} className="flex min-h-0 flex-1 flex-col">
        {phase === "attract" ? (
          <AttractLoop
            mediaId={attractMediaId}
            tagline={tagline}
            brand={brand}
            vehicleModelName={vehicle.modelName}
            priceFromLabel={
              vehicle.keyStats?.find((s) => s.icon === "price")?.value ??
              (vehicle.priceFrom ? `$us ${vehicle.priceFrom.toLocaleString("es-BO")}` : undefined)
            }
            onStart={handleAttractStart}
          />
        ) : (
          <WelcomeScreen
            dealershipName={dealershipName}
            vehicleName={vehicle.modelName}
            vehicleTagline={vehicle.tagline}
            personas={personas}
            onContinue={handleContinue}
            onBack={() => {
              stopNarration();
              setPhase("attract");
            }}
          />
        )}
      </PageTransition>
    </CinematicShell>
  );
}
