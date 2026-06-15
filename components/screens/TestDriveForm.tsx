"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import type { TestDriveFormContent } from "@/lib/content/shared";
import type { Dealership } from "@/types/dealership";
import type { Vehicle } from "@/types/vehicle";
import { MediaSurface } from "@/components/media/MediaSurface";
import { TouchNav } from "@/components/cinematic/TouchNav";
import { formatScreenLabel, shouldUseKioskShortForm, demoModeConfig, kioskViewportShellClass } from "@/lib/config/demo-mode";
import { routes } from "@/lib/navigation/routes";
import { fadeUp, transition } from "@/lib/motion/variants";
import { cn } from "@/lib/utils/cn";
import {
  type ChildSeatOption,
  useSession,
} from "@/lib/session/SessionProvider";

type TimeSlot = "morning" | "afternoon" | "weekend";
type RoutePreference = "city" | "doble_via" | "both";

interface TestDriveFormProps {
  vehicle: Vehicle;
  dealership: Dealership;
  formContent: TestDriveFormContent;
  backHref?: string;
  variant?: "page" | "sheet";
  onClose?: () => void;
  onSuccess?: () => void;
}

function buildDayOptions(count = 14): { value: string; label: string }[] {
  const options: { value: string; label: string }[] = [];
  const formatter = new Intl.DateTimeFormat("es-BO", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  for (let i = 1; i <= count; i += 1) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    if (date.getDay() === 0) continue;
    const iso = date.toISOString().slice(0, 10);
    options.push({ value: iso, label: formatter.format(date) });
  }

  return options;
}

const TIME_SLOT_IDS: TimeSlot[] = ["morning", "afternoon", "weekend"];
const ROUTE_IDS: RoutePreference[] = ["city", "doble_via", "both"];
const CHILD_SEAT_IDS: ChildSeatOption[] = ["yes", "no", "unknown"];

function ChipSelect<T extends string>({
  options,
  value,
  onChange,
  light = false,
}: {
  options: { id: T; label: string }[];
  value: T | "";
  onChange: (value: T) => void;
  light?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          className={cn(
            "min-h-[44px] rounded-full border px-4 py-2 text-sm transition-colors",
            value === option.id
              ? light
                ? "border-[var(--canvas-deep)] bg-[var(--canvas-deep)] text-white"
                : "border-[var(--color-accent-trust)] bg-[var(--color-accent-trust)]/15"
              : light
                ? "border-black/15 bg-white"
                : "border-white/15 bg-black/20",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.startsWith("591")) {
    const rest = digits.slice(3);
    if (rest.length <= 3) return `+591 ${rest}`;
    if (rest.length <= 6) return `+591 ${rest.slice(0, 3)} ${rest.slice(3)}`;
    return `+591 ${rest.slice(0, 3)} ${rest.slice(3, 6)} ${rest.slice(6, 9)}`;
  }
  if (digits.length <= 3) return digits ? `+591 ${digits}` : "";
  if (digits.length <= 6) return `+591 ${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `+591 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
}

export function TestDriveForm({
  vehicle,
  dealership,
  formContent,
  backHref,
  variant = "page",
  onClose,
  onSuccess,
}: TestDriveFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    testDriveDraft,
    setTestDriveDraft,
    setCustomerName,
    recordTrustSignal,
    topicsVisited,
    compareTarget,
    financingSelection,
  } = useSession();

  const [name, setName] = useState(
    shouldUseKioskShortForm() ? demoModeConfig.demoPrefillCustomerName : "",
  );
  const [phone, setPhone] = useState(
    shouldUseKioskShortForm() ? demoModeConfig.demoPrefillCustomerPhone : "",
  );
  const [email, setEmail] = useState(testDriveDraft.email ?? "");
  const [preferredDay, setPreferredDay] = useState("");
  const [timeSlot, setTimeSlot] = useState<TimeSlot | "">(
    (testDriveDraft.preferredTime as TimeSlot) ?? "",
  );
  const [childrenAttending, setChildrenAttending] = useState(
    testDriveDraft.childrenAttending ?? false,
  );
  const [spouseAttending, setSpouseAttending] = useState(
    testDriveDraft.spouseAttending ?? false,
  );
  const [childSeat, setChildSeat] = useState<ChildSeatOption | "">(
    testDriveDraft.childSeat ?? "",
  );
  const [routePreference, setRoutePreference] = useState<RoutePreference | "">(
    (testDriveDraft.routePreference as RoutePreference) ?? "",
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const dayOptions = useMemo(() => buildDayOptions(), []);
  const kioskShortForm = shouldUseKioskShortForm() && variant === "page";

  const timeSlots = useMemo(
    () =>
      TIME_SLOT_IDS.map((id) => ({
        id,
        label: formContent.timeSlots[id],
      })),
    [formContent.timeSlots],
  );

  const routeOptions = useMemo(
    () =>
      ROUTE_IDS.map((id) => ({
        id,
        label: formContent.routes[id],
      })),
    [formContent.routes],
  );

  const childSeatOptions = useMemo(
    () =>
      CHILD_SEAT_IDS.map((id) => ({
        id,
        label: formContent.fields.childSeat.options[id],
      })),
    [formContent.fields.childSeat.options],
  );

  useEffect(() => {
    if (searchParams.get("time") === "weekend") setTimeSlot("weekend");
    if (searchParams.get("route") === "doble_via") setRoutePreference("doble_via");
  }, [searchParams]);

  useEffect(() => {
    if (!childrenAttending) setChildSeat("");
  }, [childrenAttending]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const draft = {
      spouseAttending,
      childrenAttending,
      childSeat: childrenAttending ? childSeat || undefined : undefined,
      preferredTime: timeSlot || undefined,
      routePreference: routePreference || undefined,
      email: email.trim() || undefined,
    };

    setCustomerName(name);
    setTestDriveDraft(draft);
    recordTrustSignal("test_drive_requested");

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "test_drive",
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || undefined,
          vehicleSlug: vehicle.slug,
          preferredDate: preferredDay || undefined,
          preferredTime: timeSlot || undefined,
          spouseAttending,
          childrenAttending,
          childSeat: childrenAttending ? childSeat || undefined : undefined,
          routePreference: routePreference || undefined,
          sessionContext: {
            topicsVisited,
            compareTarget,
            financingSelection,
          },
        }),
      });
    } catch {
      // MVP: proceed with on-screen confirmation even if API unreachable
    }

    setSubmitting(false);
    setSubmitted(true);
    onSuccess?.();
    router.push(`${routes.whatsapp(vehicle.slug)}?intent=test_drive`);
  };

  const isSheet = variant === "sheet";
  const light = !isSheet;

  const confirmationHeadline = formContent.confirmation.headline
    .replace("{name}", name)
    .replace("{phone}", phone)
    .replace("{vehicle}", vehicle.modelName);

  const formContentBody = submitted ? (
    <motion.div
      className={cn(
        "rounded-2xl p-8 text-center",
        light
          ? "border border-[var(--color-accent-trust)]/30 bg-[var(--color-accent-trust)]/8"
          : "border border-[var(--color-accent-trust)]/30 bg-[var(--color-accent-trust)]/10",
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <p className="text-3xl text-[var(--color-accent-trust)]">✓</p>
      <p className="mt-4 text-xl font-medium">{confirmationHeadline}</p>
      <p
        className={cn(
          "mt-3 text-sm",
          light ? "text-[var(--text-secondary-on-light)]" : "text-white/60",
        )}
      >
        {formContent.confirmation.helper}
      </p>
      {(spouseAttending || childrenAttending || routePreference) && (
        <div
          className={cn(
            "mt-6 rounded-xl border p-4 text-left text-sm",
            light ? "border-black/10 bg-white/80" : "border-white/10 bg-black/20",
          )}
        >
          <p className="font-medium">Resumen de tu solicitud</p>
          <ul className="mt-2 space-y-1 text-[var(--text-secondary-on-light)]">
            {spouseAttending ? <li>· Cónyuge / pareja asiste</li> : null}
            {childrenAttending ? (
              <li>
                · Hijos asisten
                {childSeat
                  ? ` · Silla infantil: ${formContent.fields.childSeat.options[childSeat as ChildSeatOption]}`
                  : ""}
              </li>
            ) : null}
            {routePreference ? (
              <li>· Ruta: {formContent.routes[routePreference]}</li>
            ) : null}
            {timeSlot ? <li>· Horario: {formContent.timeSlots[timeSlot]}</li> : null}
          </ul>
        </div>
      )}
      {!spouseAttending ? (
        <Link
          href={routes.share(vehicle.slug)}
          className="mt-6 inline-block min-h-[48px] rounded-full border border-[var(--color-viaggio)] px-6 py-3 text-sm font-medium text-[var(--color-viaggio)]"
        >
          {formContent.confirmation.sharePrompt}
        </Link>
      ) : null}
      <Link
        href={routes.whatsapp(vehicle.slug)}
        className="mt-3 block min-h-[48px] rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white"
      >
        {formContent.confirmation.whatsappConfirm}
      </Link>
    </motion.div>
  ) : (
    <form onSubmit={handleSubmit} className={cn("space-y-5", kioskShortForm && "flex flex-col")}>
      <label className="block">
        <span
          className={cn(
            "mb-2 block text-sm",
            light ? "text-[var(--text-secondary-on-light)]" : "text-white/50",
          )}
        >
          {formContent.fields.name.label}
        </span>
        <input
          type="text"
          required
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={cn(
            "min-h-[56px] w-full rounded-xl border px-4 text-base outline-none",
            light
              ? "border-black/15 bg-white focus:border-[var(--canvas-deep)]"
              : "border-white/15 bg-black/30 focus:border-[var(--color-accent-trust)]",
          )}
          placeholder={formContent.fields.name.placeholder}
        />
      </label>

      <label className="block">
        <span
          className={cn(
            "mb-2 block text-sm",
            light ? "text-[var(--text-secondary-on-light)]" : "text-white/50",
          )}
        >
          {formContent.fields.phone.label}
        </span>
        <input
          type="tel"
          required
          inputMode="tel"
          autoComplete="off"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          className={cn(
            "min-h-[56px] w-full rounded-xl border px-4 text-base outline-none",
            light
              ? "border-black/15 bg-white focus:border-[var(--canvas-deep)]"
              : "border-white/15 bg-black/30 focus:border-[var(--color-accent-trust)]",
          )}
          placeholder={formContent.fields.phone.placeholder}
        />
      </label>

      <div>
        <span
          className={cn(
            "mb-2 block text-sm",
            light ? "text-[var(--text-secondary-on-light)]" : "text-white/50",
          )}
        >
          {formContent.fields.preferredDay.label}
        </span>
        <select
          required={kioskShortForm}
          value={preferredDay}
          onChange={(e) => setPreferredDay(e.target.value)}
          className={cn(
            "min-h-[56px] w-full rounded-xl border px-4 text-base outline-none",
            light
              ? "border-black/15 bg-white focus:border-[var(--canvas-deep)]"
              : "border-white/15 bg-black/30 focus:border-[var(--color-accent-trust)]",
          )}
        >
          <option value="">{kioskShortForm ? "Elegí un día" : "Elegí un día (opcional)"}</option>
          {dayOptions.map((day) => (
            <option key={day.value} value={day.value}>
              {day.label}
            </option>
          ))}
        </select>
      </div>

      {!kioskShortForm ? (
        <>
      <label className="block">
        <span
          className={cn(
            "mb-2 block text-sm",
            light ? "text-[var(--text-secondary-on-light)]" : "text-white/50",
          )}
        >
          {formContent.fields.email.label}
        </span>
        <input
          type="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cn(
            "min-h-[56px] w-full rounded-xl border px-4 text-base outline-none",
            light
              ? "border-black/15 bg-white focus:border-[var(--canvas-deep)]"
              : "border-white/15 bg-black/30 focus:border-[var(--color-accent-trust)]",
          )}
          placeholder={formContent.fields.email.placeholder}
        />
        <span
          className={cn(
            "mt-1 block text-xs",
            light ? "text-[var(--text-secondary-on-light)]" : "text-white/40",
          )}
        >
          {formContent.fields.email.helper}
        </span>
      </label>

      <div>
        <span
          className={cn(
            "mb-2 block text-sm",
            light ? "text-[var(--text-secondary-on-light)]" : "text-white/50",
          )}
        >
          {formContent.fields.timeSlot.label}
        </span>
        <ChipSelect
          options={timeSlots}
          value={timeSlot}
          onChange={setTimeSlot}
          light={light}
        />
      </div>

      <div>
        <span
          className={cn(
            "mb-2 block text-sm",
            light ? "text-[var(--text-secondary-on-light)]" : "text-white/50",
          )}
        >
          {formContent.fields.attendees.label}
        </span>
        <div className="space-y-3">
          <label className="flex min-h-[48px] items-center gap-3">
            <input
              type="checkbox"
              checked={spouseAttending}
              onChange={(e) => setSpouseAttending(e.target.checked)}
              className="h-5 w-5 rounded"
            />
            <span>{formContent.fields.spouse.label}</span>
          </label>
          <label className="flex min-h-[48px] items-center gap-3">
            <input
              type="checkbox"
              checked={childrenAttending}
              onChange={(e) => setChildrenAttending(e.target.checked)}
              className="h-5 w-5 rounded"
            />
            <span>{formContent.fields.children.label}</span>
          </label>
        </div>
      </div>

      {childrenAttending ? (
        <div>
          <span
            className={cn(
              "mb-2 block text-sm",
              light ? "text-[var(--text-secondary-on-light)]" : "text-white/50",
            )}
          >
            {formContent.fields.childSeat.label}
          </span>
          <ChipSelect
            options={childSeatOptions}
            value={childSeat}
            onChange={setChildSeat}
            light={light}
          />
        </div>
      ) : null}

      <div>
        <span
          className={cn(
            "mb-2 block text-sm",
            light ? "text-[var(--text-secondary-on-light)]" : "text-white/50",
          )}
        >
          {formContent.fields.route.label}
        </span>
        <ChipSelect
          options={routeOptions}
          value={routePreference}
          onChange={setRoutePreference}
          light={light}
        />
      </div>

      <p
        className={cn(
          "text-sm",
          light ? "text-[var(--text-secondary-on-light)]" : "text-white/50",
        )}
      >
        {formContent.subtitle}
      </p>
        </>
      ) : (
        <p className="text-sm text-[var(--text-secondary-on-light)]">
          El resto lo confirmamos por WhatsApp — sin formulario largo en piso.
        </p>
      )}

      <motion.button
        type="submit"
        disabled={submitting}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "sticky bottom-4 z-20 min-h-[56px] w-full rounded-full text-base font-semibold disabled:opacity-60 shadow-lg",
          light
            ? "bg-[var(--canvas-deep)] text-white shadow-black/15"
            : "bg-[var(--color-accent-trust)] text-white",
        )}
      >
        {submitting ? "Enviando…" : formContent.submit}
      </motion.button>
    </form>
  );

  if (isSheet) {
    return (
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--text-secondary-on-light)]">
              {formatScreenLabel("S14 · Prueba de manejo")}
            </p>
            <h2 className="mt-1 text-2xl font-light">{formContent.title}</h2>
          </div>
          {onClose ? (
            <button
              type="button"
              onClick={onClose}
              className="text-sm text-[var(--text-secondary-on-light)] underline"
            >
              Cancelar
            </button>
          ) : null}
        </div>
        {formContentBody}
      </div>
    );
  }

  return (
    <div className={cn("relative bg-[var(--canvas-light)] text-[var(--text-on-light)]", kioskViewportShellClass())}>
      <MediaSurface
        mediaId={vehicle.heroMediaId ?? `${vehicle.slug}-hero`}
        className="absolute inset-0 opacity-[0.12]"
        animate={false}
      />
      <motion.div
        className={cn(
          "relative z-10 mx-auto flex max-w-xl flex-col px-6",
          kioskShortForm ? "h-full justify-center py-8" : "py-10 md:py-12",
        )}
        initial={fadeUp.initial}
        animate={fadeUp.animate}
        transition={transition.normal}
      >
        <p className="type-label text-[var(--color-accent-trust)]">
          {formatScreenLabel("S14 · Prueba de manejo")}
        </p>
        <h1 className={cn("type-headline text-[var(--text-on-light)]", kioskShortForm ? "mt-3" : "mt-5")}>
          {kioskShortForm ? "Agendá en 30 segundos" : formContent.title}
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary-on-light)]">
          {vehicle.modelName} · {dealership.city}
        </p>
        <div className="mt-10">{formContentBody}</div>
      </motion.div>
      {backHref ? (
        <TouchNav
          backHref={backHref}
          backLabel="Volver"
          variant="light"
          className="sticky bottom-0 z-10 border-t border-black/10 bg-white/95 backdrop-blur-xl"
        />
      ) : null}
    </div>
  );
}

export function TestDriveFormSheet({
  vehicle,
  dealership,
  formContent,
  onClose,
}: {
  vehicle: Vehicle;
  dealership: Dealership;
  formContent: TestDriveFormContent;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        aria-label="Cerrar"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-[var(--canvas-light)] px-6 pb-10 pt-6 shadow-2xl md:px-10"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-black/15" />
        <TestDriveForm
          vehicle={vehicle}
          dealership={dealership}
          formContent={formContent}
          variant="sheet"
          onClose={onClose}
        />
      </motion.div>
    </motion.div>
  );
}
