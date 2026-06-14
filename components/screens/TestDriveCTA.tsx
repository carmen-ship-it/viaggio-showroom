"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Vehicle } from "@/types/vehicle";
import { MediaSurface } from "@/components/media/MediaSurface";
import { TouchNav } from "@/components/cinematic/TouchNav";
import { formatScreenLabel } from "@/lib/config/demo-mode";
import { routes } from "@/lib/navigation/routes";
import { fadeUp, transition } from "@/lib/motion/variants";

interface TestDriveCTAProps {
  vehicle: Vehicle;
  dealershipName: string;
  city: string;
}

type AttendeeOption = "solo" | "pareja" | "hijos";
type TimeOption = "manana" | "tarde" | "fin_de_semana";
type ChildSeatOption = "si" | "no" | "no_se";

export function TestDriveCTA({
  vehicle,
  dealershipName,
  city,
}: TestDriveCTAProps) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attendees, setAttendees] = useState<AttendeeOption[]>([]);
  const [childrenCount, setChildrenCount] = useState(0);
  const [childSeat, setChildSeat] = useState<ChildSeatOption>("no_se");
  const [preferredTime, setPreferredTime] = useState<TimeOption>("manana");
  const [notes, setNotes] = useState("");

  const toggleAttendee = (option: AttendeeOption) => {
    setAttendees((prev) =>
      prev.includes(option)
        ? prev.filter((a) => a !== option)
        : [...prev, option],
    );
  };

  const withChildren = attendees.includes("hijos");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen">
      <MediaSurface
        mediaId={vehicle.heroMediaId ?? `${vehicle.slug}-hero`}
        className="absolute inset-0 opacity-40"
      />
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 py-16 md:px-16">
        <motion.div
          className="mx-auto w-full max-w-xl"
          initial={fadeUp.initial}
          animate={fadeUp.animate}
          transition={transition.normal}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-accent)]">
            {formatScreenLabel("S14 · Prueba de manejo")}
          </p>
          <h1 className="mt-3 text-4xl font-light md:text-5xl">
            Agendá con tu familia
          </h1>
          <p className="mt-4 text-white/60">
            Probá el {vehicle.modelName} en {dealershipName}, {city}. Un consultor
            te confirma por WhatsApp — sin presión.
          </p>

          {submitted ? (
            <motion.div
              className="mt-10 rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 p-8 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <p className="text-2xl">✓</p>
              <p className="mt-4 text-lg font-medium">¡Listo, {name || "gracias"}!</p>
              <p className="mt-2 text-sm text-white/60">
                Te escribimos al {phone || "teléfono indicado"} para confirmar tu
                prueba del GS4 MAX.
              </p>
              {attendees.includes("pareja") ? null : (
                <Link
                  href={routes.share(vehicle.slug)}
                  className="mt-6 inline-block text-sm text-[var(--color-accent-trust)] hover:underline"
                >
                  ¿Tu pareja no vino? Mandale el resumen →
                </Link>
              )}
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm text-white/50">Nombre</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="min-h-[52px] w-full rounded-xl border border-white/15 bg-black/30 px-4 text-base outline-none focus:border-[var(--color-accent)]"
                  placeholder="Tu nombre"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-white/50">
                  Teléfono / WhatsApp
                </span>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="min-h-[52px] w-full rounded-xl border border-white/15 bg-black/30 px-4 text-base outline-none focus:border-[var(--color-accent)]"
                  placeholder="+591 712 345 678"
                />
              </label>

              <fieldset>
                <legend className="mb-2 text-sm text-white/50">¿Quién asiste?</legend>
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      ["solo", "Solo yo"],
                      ["pareja", "Con pareja"],
                      ["hijos", "Con hijos"],
                    ] as const
                  ).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => toggleAttendee(value)}
                      className={`min-h-[44px] rounded-full border px-4 py-2 text-sm ${
                        attendees.includes(value)
                          ? "border-[var(--color-accent)] bg-[var(--color-accent)]/15"
                          : "border-white/15"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </fieldset>

              {withChildren ? (
                <>
                  <label className="block">
                    <span className="mb-2 block text-sm text-white/50">
                      Cantidad de menores
                    </span>
                    <select
                      value={childrenCount}
                      onChange={(e) => setChildrenCount(Number(e.target.value))}
                      className="min-h-[52px] w-full rounded-xl border border-white/15 bg-black/30 px-4 text-base outline-none"
                    >
                      {[0, 1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-sm text-white/50">
                      ¿Trae silla infantil?
                    </span>
                    <select
                      value={childSeat}
                      onChange={(e) => setChildSeat(e.target.value as ChildSeatOption)}
                      className="min-h-[52px] w-full rounded-xl border border-white/15 bg-black/30 px-4 text-base outline-none"
                    >
                      <option value="si">Sí</option>
                      <option value="no">No</option>
                      <option value="no_se">No sé</option>
                    </select>
                  </label>
                </>
              ) : null}

              <label className="block">
                <span className="mb-2 block text-sm text-white/50">
                  Horario preferido
                </span>
                <select
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value as TimeOption)}
                  className="min-h-[52px] w-full rounded-xl border border-white/15 bg-black/30 px-4 text-base outline-none"
                >
                  <option value="manana">Mañana</option>
                  <option value="tarde">Tarde</option>
                  <option value="fin_de_semana">Fin de semana</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-white/50">
                  Comentarios (opcional)
                </span>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-base outline-none focus:border-[var(--color-accent)]"
                  placeholder="Tu ruta habitual, color preferido..."
                />
              </label>

              <motion.button
                type="submit"
                whileTap={{ scale: 0.98 }}
                className="min-h-[56px] w-full rounded-full bg-[var(--color-accent)] text-base font-semibold text-[var(--color-background)]"
              >
                Confirmar prueba de manejo
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>

      <TouchNav
        backHref={routes.testDriveInfo(vehicle.slug)}
        backLabel="Logística familiar"
        className="relative z-10 border-t border-white/10"
      />
    </div>
  );
}
