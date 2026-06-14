"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { TestDriveLogistics } from "@/lib/content/shared";
import type { Vehicle } from "@/types/vehicle";
import { MediaSurface } from "@/components/media/MediaSurface";
import { TouchNav } from "@/components/cinematic/TouchNav";
import { formatScreenLabel } from "@/lib/config/demo-mode";
import { routes } from "@/lib/navigation/routes";
import { fadeUp, staggerContainer, transition } from "@/lib/motion/variants";
import { useSession } from "@/lib/session/SessionProvider";
import { useEffect } from "react";

interface TestDriveLogisticsScreenProps {
  logistics: TestDriveLogistics;
  vehicle: Vehicle;
  backHref: string;
}

export function TestDriveLogisticsScreen({
  logistics,
  vehicle,
  backHref,
}: TestDriveLogisticsScreenProps) {
  const { recordTrustSignal } = useSession();

  useEffect(() => {
    recordTrustSignal("test_drive_logistics");
  }, [recordTrustSignal]);

  const zones: {
    id: string;
    title: string;
    body: string;
    mediaId?: string;
    steps?: string[];
  }[] = [
    {
      id: "duration",
      title: logistics.duration.headline,
      body: logistics.duration.description,
    },
    {
      id: "family",
      title: logistics.familyWelcome.headline,
      body: `${logistics.familyWelcome.description} ${logistics.familyWelcome.childrenNote}`,
    },
    {
      id: "spouse",
      title: logistics.spouse.headline,
      body: logistics.spouse.description,
    },
    {
      id: "route",
      title: logistics.route.headline,
      body: logistics.route.description,
      mediaId: logistics.route.mediaId,
    },
    {
      id: "bring",
      title: logistics.bring.headline,
      body: logistics.bring.items.join(" · "),
    },
    {
      id: "scheduling",
      title: logistics.scheduling.headline,
      body: `${logistics.scheduling.weekday}. ${logistics.scheduling.weekend}. ${logistics.scheduling.note}`,
    },
    {
      id: "prep",
      title: logistics.vehiclePrep.headline,
      body: logistics.vehiclePrep.description,
    },
    {
      id: "expect",
      title: logistics.whatToExpect.headline,
      body: logistics.whatToExpect.steps.join(" · "),
      steps: logistics.whatToExpect.steps,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[var(--canvas-soft)]">
      <div className="relative min-h-[38vh] overflow-hidden">
        <MediaSurface
          mediaId={logistics.heroMediaId}
          className="absolute inset-0"
        />
        <div className="relative z-10 flex min-h-[38vh] flex-col justify-end px-6 pb-10 pt-24 md:px-12">
          <motion.p
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={transition.normal}
            className="text-xs uppercase tracking-[0.35em] text-[var(--color-accent-trust)]"
          >
            {formatScreenLabel("S34 · Logística familiar")}
          </motion.p>
          <motion.h1
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...transition.normal, delay: 0.08 }}
            className="mt-2 max-w-3xl text-4xl font-light md:text-5xl"
          >
            {logistics.title}
          </motion.h1>
          <motion.p
            initial={fadeUp.initial}
            animate={fadeUp.animate}
            transition={{ ...transition.normal, delay: 0.12 }}
            className="mt-4 max-w-2xl text-lg text-white/70"
          >
            {logistics.subtitle}
          </motion.p>
        </div>
      </div>

      <motion.div
        className="grid flex-1 gap-4 px-6 py-10 md:grid-cols-2 md:px-12 md:py-14"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {zones.map((zone) => (
          <motion.article
            key={zone.id}
            variants={fadeUp}
            transition={transition.normal}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm"
          >
            <h2 className="text-xl font-medium text-[var(--color-accent-warm)]">
              {zone.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/75">{zone.body}</p>
            {zone.steps ? (
              <ol className="mt-4 space-y-2">
                {zone.steps.map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm text-white/70">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-trust)]/20 text-xs font-medium text-[var(--color-accent-trust)]">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            ) : null}
            {zone.mediaId ? (
              <div className="relative mt-4 h-32 overflow-hidden rounded-xl">
                <MediaSurface mediaId={zone.mediaId} className="absolute inset-0" animate={false} />
              </div>
            ) : null}
          </motion.article>
        ))}
      </motion.div>

      <div className="border-t border-white/10 bg-black/40 px-6 py-5">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row">
          <Link
            href={routes.testDrive(vehicle.slug)}
            className="min-h-[52px] flex-1 rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-[var(--canvas-deep)]"
          >
            Agendar ahora
          </Link>
          <Link
            href={routes.share(vehicle.slug)}
            className="min-h-[52px] rounded-full border border-white/20 px-6 py-3 text-center text-sm"
          >
            Mandáselo a tu pareja
          </Link>
        </div>
      </div>

      <TouchNav backHref={backHref} backLabel="Volver" />
    </div>
  );
}
