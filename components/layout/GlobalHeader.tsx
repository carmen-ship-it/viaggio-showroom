"use client";

import Link from "next/link";
import { CoBrandLockup } from "@/components/media/LogoPlaceholder";
import {
  shouldDisableExplorationBranches,
  shouldHideMuteInDemo,
  shouldHideSettings,
  shouldShowKioskHome,
} from "@/lib/config/demo-mode";
import { routes } from "@/lib/navigation/routes";
import { MuteButton } from "@/components/audio/MuteButton";
import { HeadphoneModeBadge } from "@/components/audio/HeadphoneModeBadge";
import { useA11y } from "@/lib/a11y/A11yProvider";

interface GlobalHeaderProps {
  brand: string;
  dealershipName: string;
  vehicleName?: string;
  showLogos?: boolean;
  showSettings?: boolean;
}

export function GlobalHeader({
  brand,
  dealershipName,
  vehicleName,
  showLogos = true,
  showSettings = true,
}: GlobalHeaderProps) {
  const { openSettings } = useA11y();
  const lockNavigation = shouldDisableExplorationBranches();
  const hideSettings = shouldHideSettings();
  const showKioskHome = shouldShowKioskHome();
  const hideMute = shouldHideMuteInDemo();

  const brandBlock = (
    <>
      {showLogos ? <CoBrandLockup className="mb-1" /> : null}
      <span className="text-[10px] uppercase tracking-[0.25em] text-white/45">
        {brand}
      </span>
      <span className="text-sm font-medium text-white/90">{dealershipName}</span>
    </>
  );

  return (
    <header className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-6 py-5 md:px-[var(--spacing-kiosk)]">
      {lockNavigation && !showKioskHome ? (
        <div className="flex min-w-0 flex-col gap-1">{brandBlock}</div>
      ) : (
        <Link href={routes.home()} className="flex min-w-0 flex-col gap-1">
          {brandBlock}
        </Link>
      )}
      <div className="flex items-center gap-3 md:gap-4">
        {showKioskHome ? (
          <Link
            href={routes.home()}
            className="min-h-[56px] rounded-full border border-white/20 bg-white/10 px-6 text-base font-semibold text-white backdrop-blur-md hover:bg-white/15 inline-flex items-center"
          >
            Inicio
          </Link>
        ) : null}
        <HeadphoneModeBadge className="hidden md:inline-flex" />
        {vehicleName ? (
          <span className="hidden text-sm text-white/50 md:block">{vehicleName}</span>
        ) : null}
        {!hideMute ? <MuteButton /> : null}
        {showSettings && !hideSettings ? (
          <button
            type="button"
            onClick={openSettings}
            aria-label="Abrir ajustes de accesibilidad"
            className="min-h-[44px] min-w-[44px] rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white/80 backdrop-blur-sm"
          >
            Ajustes
          </button>
        ) : null}
      </div>
    </header>
  );
}
