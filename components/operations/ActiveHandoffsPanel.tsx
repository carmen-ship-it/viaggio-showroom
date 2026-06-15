"use client";

import {
  formatWaitTimer,
  staffUser,
} from "@/lib/demo/operations-data";
import {
  getElapsedSeconds,
  getSlaRemainingSeconds,
  HANDOFF_SLA_SECONDS,
  isSlaBreached,
  type LiveHandoff,
} from "@/lib/demo/handoff-store";
import { useHandoffStore } from "@/lib/demo/use-handoff-store";
import { TemperatureBadge } from "./TemperatureBadge";
import { cn } from "@/lib/utils/cn";

export function ActiveHandoffsPanel() {
  const { activeHandoffs, pendingHandoffs, now } = useHandoffStore();
  const unattended = pendingHandoffs.length;

  if (activeHandoffs.length === 0) {
    return (
      <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Handoffs activos</h2>
            <p className="text-sm text-white/50">
              Sin solicitudes de asesor en vivo
            </p>
          </div>
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            Cola limpia
          </span>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn(
        "rounded-2xl border p-5",
        unattended > 0
          ? "border-rose-500/30 bg-rose-500/[0.06]"
          : "border-white/10 bg-white/[0.03]",
      )}
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Handoffs activos</h2>
          <p className="text-sm text-white/50">
            SLA objetivo · {Math.floor(HANDOFF_SLA_SECONDS / 60)} min primer contacto
          </p>
        </div>
        {unattended > 0 ? (
          <span className="animate-pulse rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white">
            {unattended} sin asignar
          </span>
        ) : (
          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
            Todos asignados
          </span>
        )}
      </div>

      <div className="space-y-3">
        {activeHandoffs.map((handoff) => (
          <HandoffRow key={handoff.id} handoff={handoff} now={now} />
        ))}
      </div>
    </section>
  );
}

function HandoffRow({ handoff, now }: { handoff: LiveHandoff; now: number }) {
  const elapsed = getElapsedSeconds(handoff, now);
  const remaining = getSlaRemainingSeconds(handoff, now);
  const breached = isSlaBreached(handoff, now);
  const isPending = handoff.status === "pending";

  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-4",
        isPending && breached
          ? "border-rose-500/40 bg-rose-500/10"
          : isPending
            ? "border-amber-500/30 bg-amber-500/[0.07]"
            : "border-white/8 bg-white/[0.04]",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium">{handoff.customerName}</span>
            <TemperatureBadge temperature={handoff.temperature} variant="dark" pulse={isPending} />
            {isPending ? (
              <span className="rounded-md bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-300">
                Handoff caliente
              </span>
            ) : null}
          </div>
          <p className="text-sm text-white/55">
            {handoff.kioskId} · {handoff.vehicle}
          </p>
          <p className="text-sm text-white/75">{handoff.interestSummary}</p>
        </div>

        <div className="text-right">
          {isPending ? (
            <>
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">
                SLA restante
              </p>
              <p
                className={cn(
                  "font-mono text-2xl font-semibold tabular-nums",
                  breached ? "text-rose-400" : "text-emerald-400",
                )}
              >
                {formatWaitTimer(remaining)}
              </p>
              <p className="mt-1 text-xs text-white/45">
                Esperando {formatWaitTimer(elapsed)}
              </p>
            </>
          ) : (
            <>
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">
                Asignado a
              </p>
              <p className="mt-1 text-sm font-semibold text-emerald-300">
                {handoff.claimedBy ?? staffUser.name}
              </p>
              <p className="mt-1 text-xs text-white/45">
                Respondió en {formatWaitTimer(elapsed)}
              </p>
            </>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-white/6 pt-3">
        <AssignmentPill
          label="Estado"
          value={
            isPending
              ? "Sin asignar"
              : `${handoff.claimedBy ?? staffUser.name} reclamó`
          }
          alert={isPending}
        />
        <AssignmentPill label="Meta SLA" value="≤ 2:00" />
        <AssignmentPill
          label="Cumplimiento"
          value={isPending ? (breached ? "Fuera de SLA" : "En curso") : "Dentro de SLA"}
          alert={isPending && breached}
          success={!isPending || !breached}
        />
      </div>
    </div>
  );
}

function AssignmentPill({
  label,
  value,
  alert,
  success,
}: {
  label: string;
  value: string;
  alert?: boolean;
  success?: boolean;
}) {
  return (
    <span
      className={cn(
        "rounded-lg px-2.5 py-1 text-xs",
        alert && "bg-rose-500/15 font-medium text-rose-300",
        success && !alert && "bg-emerald-500/15 font-medium text-emerald-300",
        !alert && !success && "bg-white/8 text-white/60",
      )}
    >
      {label}: {value}
    </span>
  );
}
