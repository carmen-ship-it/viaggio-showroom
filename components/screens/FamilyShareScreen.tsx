"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import type { ShareSummary } from "@/lib/content/shared";
import type { Dealership } from "@/types/dealership";
import type { Vehicle } from "@/types/vehicle";
import { MediaSurface } from "@/components/media/MediaSurface";
import { TouchNav } from "@/components/cinematic/TouchNav";
import {
  formatScreenLabel,
  shouldHidePlaceholderWarnings,
} from "@/lib/config/demo-mode";
import { routes } from "@/lib/navigation/routes";
import { fadeUp, staggerContainer, transition } from "@/lib/motion/variants";
import { useSession } from "@/lib/session/SessionProvider";

interface FamilyShareScreenProps {
  summary: ShareSummary;
  vehicle: Vehicle;
  dealership: Dealership;
  backHref: string;
  compact?: boolean;
}

function createShareToken(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function FamilyShareScreen({
  summary,
  vehicle,
  dealership,
  backHref,
  compact = false,
}: FamilyShareScreenProps) {
  const { topicsVisited, recordTrustSignal } = useSession();
  const [token, setToken] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    recordTrustSignal("share_initiated");
    const stored = localStorage.getItem(`viaggio-share-${vehicle.slug}`);
    if (stored) {
      setToken(stored);
    } else {
      const newToken = createShareToken();
      localStorage.setItem(`viaggio-share-${vehicle.slug}`, newToken);
      setToken(newToken);
    }
  }, [vehicle.slug, recordTrustSignal]);

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined" || !token) return "";
    return `${window.location.origin}${routes.shareToken(vehicle.slug, token)}`;
  }, [token, vehicle.slug]);

  const whatsappMessage = encodeURIComponent(
    `${summary.whatsappTemplate}\n${shareUrl}`,
  );
  const whatsappHref = `https://wa.me/${dealership.whatsapp.replace(/\D/g, "")}?text=${whatsappMessage}`;

  const copyLink = useCallback(async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [shareUrl]);

  const diegoHighlight =
    topicsVisited.length > 0
      ? `Exploraste: ${topicsVisited.slice(0, 3).join(", ")}`
      : "Espacio, seguridad y garantía para decidir en familia";

  return (
    <div
      className={
        compact
          ? "min-h-screen bg-[var(--canvas-light)] text-[var(--text-on-light)]"
          : "flex min-h-screen flex-col bg-[var(--canvas-soft)]"
      }
    >
      {!compact ? (
        <div className="relative min-h-[32vh] overflow-hidden">
          <MediaSurface
            mediaId={vehicle.heroMediaId ?? `${vehicle.slug}-hero`}
            className="absolute inset-0"
          />
          <div className="relative z-10 flex min-h-[32vh] flex-col justify-end px-6 pb-8 pt-20 md:px-12">
            <motion.p
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={transition.normal}
              className="text-xs uppercase tracking-[0.35em] text-[var(--color-accent-trust)]"
            >
              {formatScreenLabel("S33 · Compartir en familia")}
            </motion.p>
            <motion.h1
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...transition.normal, delay: 0.08 }}
              className="mt-2 text-3xl font-light md:text-5xl"
            >
              {summary.headline}
            </motion.h1>
            <motion.p
              initial={fadeUp.initial}
              animate={fadeUp.animate}
              transition={{ ...transition.normal, delay: 0.12 }}
              className="mt-3 max-w-xl text-lg text-white/70"
            >
              {summary.subheadline}
            </motion.p>
          </div>
        </div>
      ) : (
        <header className="border-b border-black/10 px-6 py-8">
          <p className="text-xs uppercase tracking-widest text-[var(--color-viaggio)]">
            Viaggio Motors · {vehicle.modelName}
          </p>
          <h1 className="mt-2 text-2xl font-light">{summary.headline}</h1>
        </header>
      )}

      <motion.div
        className={`mx-auto w-full max-w-2xl space-y-6 ${compact ? "px-6 py-8" : "flex-1 px-6 py-10 md:px-12"}`}
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {!compact ? (
          <motion.p
            variants={fadeUp}
            transition={transition.normal}
            className="text-sm text-white/50"
          >
            {diegoHighlight}
          </motion.p>
        ) : null}

        {summary.bullets.map((bullet) => (
          <motion.div
            key={bullet.id}
            variants={fadeUp}
            transition={transition.normal}
            className={
              compact
                ? "rounded-xl border border-black/10 bg-white p-5 shadow-sm"
                : "rounded-2xl border border-white/10 bg-white/[0.04] p-6"
            }
          >
            <h2 className="text-lg font-medium">{bullet.title}</h2>
            <p
              className={
                compact
                  ? "mt-2 text-[var(--text-secondary-on-light)]"
                  : "mt-2 text-white/70"
              }
            >
              {bullet.description}
            </p>
          </motion.div>
        ))}

        {!compact ? (
          <>
            <motion.div
              variants={fadeUp}
              transition={transition.normal}
              className="rounded-2xl border border-white/10 bg-[var(--canvas-light)] p-6 text-[var(--text-on-light)]"
            >
              <p className="text-sm font-medium">Vista previa del mensaje</p>
              <p className="mt-3 text-base leading-relaxed text-[var(--text-secondary-on-light)]">
                {summary.whatsappTemplate}
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={transition.normal}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[52px] flex-1 rounded-full bg-[#25D366] px-6 py-3 text-center text-sm font-semibold text-white"
              >
                Enviar por WhatsApp
              </a>
              <button
                type="button"
                onClick={copyLink}
                className="min-h-[52px] rounded-full border border-white/20 px-6 py-3 text-sm"
              >
                {copied ? "¡Link copiado!" : "Copiar link"}
              </button>
            </motion.div>

            {token ? (
              <motion.div
                variants={fadeUp}
                transition={transition.normal}
                className="flex flex-col items-center rounded-2xl border border-white/10 bg-white p-8 text-[var(--text-on-light)]"
              >
                <div className="flex h-48 w-48 items-center justify-center rounded-xl border-2 border-dashed border-black/15 bg-black/[0.03]">
                  <div className="grid grid-cols-6 gap-0.5 p-3">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-[2px]"
                        style={{
                          backgroundColor:
                            (i + token.length) % 2 === 0 ? "#1D1D1F" : "#F5F5F7",
                        }}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-center text-sm text-[var(--text-secondary-on-light)]">
                  Escaneá o compartí el link para que tu pareja vea este resumen en el celular
                </p>
                <p className="mt-2 font-mono text-xs text-[var(--text-secondary-on-light)] break-all">
                  {shareUrl}
                </p>
              </motion.div>
            ) : null}

            {!shouldHidePlaceholderWarnings() ? (
              <motion.div
                variants={fadeUp}
                transition={transition.normal}
                className="rounded-2xl border border-dashed border-white/20 bg-white/[0.03] p-6"
              >
                <h2 className="text-lg font-medium">Continuar después</h2>
                <p className="mt-2 text-sm text-white/60">
                  Guardá este código para retomar la sesión en el kiosk o desde tu celular.
                  Próximamente: enlace de reanudación completo (S37).
                </p>
                <Link
                  href={routes.resume(vehicle.slug)}
                  className="mt-4 inline-block min-h-[44px] rounded-full border border-white/20 px-5 py-2 text-sm"
                >
                  Ver opciones de reanudación
                </Link>
              </motion.div>
            ) : null}
          </>
        ) : (
          <motion.div variants={fadeUp} transition={transition.normal} className="space-y-3 pt-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block min-h-[48px] rounded-full bg-[#25D366] px-6 py-3 text-center text-sm font-semibold text-white"
            >
              Tengo preguntas — WhatsApp Viaggio
            </a>
            <Link
              href={routes.testDriveInfo(vehicle.slug)}
              className="block min-h-[48px] rounded-full border border-[var(--color-viaggio)] px-6 py-3 text-center text-sm font-medium text-[var(--color-viaggio)]"
            >
              Quiero probarlo en familia
            </Link>
          </motion.div>
        )}

        <motion.footer
          variants={fadeUp}
          transition={transition.normal}
          className={
            compact
              ? "border-t border-black/10 pt-6 text-sm text-[var(--text-secondary-on-light)]"
              : "text-center text-sm text-white/45"
          }
        >
          <p>{dealership.name}</p>
          <p className="mt-1">{dealership.address}</p>
          <p className="mt-1">{dealership.hours.weekdays}</p>
        </motion.footer>
      </motion.div>

      {!compact ? (
        <TouchNav
          backHref={backHref}
          backLabel="Volver"
          nextHref={routes.testDriveInfo(vehicle.slug)}
          nextLabel="Agendar prueba familiar"
        />
      ) : null}
    </div>
  );
}
