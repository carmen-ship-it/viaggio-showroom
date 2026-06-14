"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics/trackEvent";
import { formatScreenId } from "@/lib/config/demo-mode";
import { useA11y, type TextScale } from "@/lib/a11y/A11yProvider";
import { routes } from "@/lib/navigation/routes";
import { cn } from "@/lib/utils/cn";

const TEXT_SCALES: TextScale[] = ["S", "M", "L"];

export function SettingsOverlay() {
  const router = useRouter();
  const {
    settingsOpen,
    closeSettings,
    textScale,
    setTextScale,
    highContrast,
    setHighContrast,
    reduceMotion,
    setReduceMotion,
  } = useA11y();

  const handleRestart = () => {
    trackEvent({ type: "session_start", metadata: { action: "restart" } });
    closeSettings();
    router.push(routes.home());
    router.refresh();
  };

  return (
    <AnimatePresence>
      {settingsOpen ? (
        <>
          <motion.button
            type="button"
            aria-label="Cerrar ajustes"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSettings}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="settings-title"
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-[var(--canvas-light)] text-[var(--text-on-light)] shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-black/8 px-6 py-5">
              <div>
                {formatScreenId("S19") ? (
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary-on-light)]">
                    {formatScreenId("S19")}
                  </p>
                ) : null}
                <h2 id="settings-title" className="text-2xl font-medium">
                  Ajustes
                </h2>
              </div>
              <button
                type="button"
                onClick={closeSettings}
                className="min-h-[44px] rounded-full px-4 text-sm font-medium"
              >
                Listo
              </button>
            </div>

            <div className="flex-1 space-y-8 overflow-y-auto px-6 py-8">
              <section>
                <p className="text-sm font-medium">Tamaño de texto</p>
                <div className="mt-3 flex gap-2">
                  {TEXT_SCALES.map((scale) => (
                    <button
                      key={scale}
                      type="button"
                      onClick={() => {
                        setTextScale(scale);
                        trackEvent({
                          type: "a11y_settings_changed",
                          metadata: { textScale: scale },
                        });
                      }}
                      className={cn(
                        "min-h-[48px] flex-1 rounded-xl border text-sm font-medium",
                        textScale === scale
                          ? "border-[var(--canvas-deep)] bg-[var(--canvas-deep)] text-white"
                          : "border-black/10 bg-white",
                      )}
                    >
                      {scale}
                    </button>
                  ))}
                </div>
                <p
                  className="mt-4 rounded-xl border border-black/8 bg-white p-4 text-[var(--text-on-light)]"
                  style={{ fontSize: "var(--preview-body-size, 1.125rem)" }}
                >
                  Vista previa: Conocé el GAC GS4 MAX a tu ritmo.
                </p>
              </section>

              <ToggleRow
                label="Alto contraste"
                description="Mejor lectura a distancia"
                checked={highContrast}
                onChange={(checked) => {
                  setHighContrast(checked);
                  trackEvent({
                    type: "a11y_settings_changed",
                    metadata: { highContrast: checked },
                  });
                }}
              />

              <ToggleRow
                label="Reducir movimiento"
                description="Menos animaciones en pantalla"
                checked={reduceMotion}
                onChange={(checked) => {
                  setReduceMotion(checked);
                  trackEvent({
                    type: "a11y_settings_changed",
                    metadata: { reduceMotion: checked },
                  });
                }}
              />
            </div>

            <div className="border-t border-black/8 px-6 py-6">
              <button
                type="button"
                onClick={handleRestart}
                className="min-h-[52px] w-full rounded-full border border-red-500/30 bg-red-500/10 text-sm font-medium text-red-700"
              >
                Reiniciar sesión
              </button>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex min-h-[64px] w-full items-center justify-between rounded-2xl border border-black/8 bg-white px-5 py-4 text-left"
    >
      <span>
        <span className="block font-medium">{label}</span>
        <span className="mt-1 block text-sm text-[var(--text-secondary-on-light)]">
          {description}
        </span>
      </span>
      <span
        className={cn(
          "relative h-8 w-14 shrink-0 rounded-full transition-colors",
          checked ? "bg-[var(--color-accent-trust)]" : "bg-black/10",
        )}
      >
        <span
          className={cn(
            "absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-transform",
            checked ? "left-7" : "left-1",
          )}
        />
      </span>
    </button>
  );
}
