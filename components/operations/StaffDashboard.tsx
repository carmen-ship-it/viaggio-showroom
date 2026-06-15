"use client";

import { useEffect, useMemo, useState } from "react";
import {
  dealershipMeta,
  formatWaitTimer,
  operationsLeads,
  personaLabels,
  sortLeadsByPriority,
  staffUser,
  type OperationsLead,
} from "@/lib/demo/operations-data";
import {
  getElapsedSeconds,
  type LiveHandoff,
} from "@/lib/demo/handoff-store";
import { useHandoffStore } from "@/lib/demo/use-handoff-store";
import { cn } from "@/lib/utils/cn";
import { OpsShell } from "./OpsShell";
import { TemperatureBadge } from "./TemperatureBadge";

const opsNav = [
  { href: "/staff", label: "Vendedor", active: true },
  { href: "/manager", label: "Gerente" },
  { href: "/executive", label: "Dirección" },
];

export function StaffDashboard() {
  const { activeHandoffs, pendingHandoffs, claim, now } = useHandoffStore();
  const [leads, setLeads] = useState(operationsLeads);
  const [selectedId, setSelectedId] = useState(operationsLeads[0]?.id ?? "");
  const [claimedIds, setClaimedIds] = useState<Set<string>>(new Set());
  const [timers, setTimers] = useState<Record<string, number>>(() =>
    Object.fromEntries(operationsLeads.map((l) => [l.id, l.waitSeconds])),
  );

  const liveHandoffLeads = useMemo(
    () => activeHandoffs.map((handoff) => handoffToLead(handoff, now)),
    [activeHandoffs, now],
  );

  const mergedLeads = useMemo(() => {
    const liveIds = new Set(liveHandoffLeads.map((l) => l.customerName));
    const staticLeads = leads.filter((l) => !liveIds.has(l.customerName));
    return sortLeadsByPriority([...liveHandoffLeads, ...staticLeads]);
  }, [leads, liveHandoffLeads]);

  const sortedLeads = mergedLeads;
  const selected = sortedLeads.find((l) => l.id === selectedId) ?? sortedLeads[0];

  const topPendingHandoff = pendingHandoffs[0];

  useEffect(() => {
    if (topPendingHandoff && !selectedId.startsWith("live-")) {
      setSelectedId(`live-${topPendingHandoff.id}`);
    }
  }, [topPendingHandoff, selectedId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) => {
        const next = { ...prev };
        for (const lead of sortedLeads) {
          const isLive = lead.id.startsWith("live-");
          const isClaimed = claimedIds.has(lead.id) || Boolean(lead.claimedBy);
          if (lead.temperature === "hot" && !isClaimed) {
            if (isLive) {
              const handoffId = lead.id.replace("live-", "");
              const handoff = activeHandoffs.find((h) => h.id === handoffId);
              if (handoff) {
                next[lead.id] = getElapsedSeconds(handoff, Date.now());
              }
            } else if (lead.waitSeconds > 0) {
              next[lead.id] = (prev[lead.id] ?? lead.waitSeconds) + 1;
            }
          }
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [sortedLeads, claimedIds, activeHandoffs]);

  function handleClaim(lead: OperationsLead) {
    if (lead.id.startsWith("live-")) {
      const handoffId = lead.id.replace("live-", "");
      claim(handoffId, staffUser.name);
    }

    setClaimedIds((prev) => new Set(prev).add(lead.id));
    setLeads((prev) =>
      prev.map((l) =>
        l.id === lead.id ? { ...l, claimedBy: staffUser.name } : l,
      ),
    );
  }

  const hotWaiting = sortedLeads.filter(
    (l) => l.temperature === "hot" && !claimedIds.has(l.id) && !l.claimedBy,
  ).length;

  return (
    <OpsShell
      title="Panel de piso"
      subtitle={`${dealershipMeta.shiftLabel} · Cola priorizada por temperatura`}
      userName={staffUser.name}
      userRole={staffUser.role}
      userInitials={staffUser.initials}
      variant="light"
      nav={opsNav}
      badge={
        hotWaiting > 0 ? (
          <span className="hidden rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white sm:inline-flex">
            {hotWaiting} caliente{hotWaiting > 1 ? "s" : ""} esperando
          </span>
        ) : null
      }
    >
      {topPendingHandoff ? (
        <LiveHandoffAlert handoff={topPendingHandoff} now={now} />
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        <section className="space-y-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Cola de leads</h2>
              <p className="text-sm text-slate-500">
                {sortedLeads.length} visitas activas · ordenadas por prioridad
              </p>
            </div>
            <div className="flex gap-2 text-xs font-medium">
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-emerald-700">
                Caliente
              </span>
              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-amber-800">
                Tibio
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-slate-600">
                Frío
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {sortedLeads.map((lead) => {
              const isSelected = lead.id === selected?.id;
              const isClaimed = claimedIds.has(lead.id) || Boolean(lead.claimedBy);
              const wait = timers[lead.id] ?? lead.waitSeconds;
              const showTimer =
                lead.temperature === "hot" &&
                !isClaimed &&
                (lead.id.startsWith("live-") || lead.waitSeconds > 0);
              const isLive = lead.id.startsWith("live-");

              return (
                <button
                  key={lead.id}
                  type="button"
                  onClick={() => setSelectedId(lead.id)}
                  className={cn(
                    "w-full rounded-2xl border bg-white p-4 text-left shadow-sm transition-all",
                    isLive && !isClaimed && "border-rose-300 bg-rose-50/60 ring-2 ring-rose-500/20 animate-pulse",
                    isSelected
                      ? "border-slate-900 ring-2 ring-slate-900/10"
                      : !isLive && "border-black/8 hover:border-slate-300",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-slate-900">
                          {lead.customerName}
                        </h3>
                        <TemperatureBadge
                          temperature={lead.temperature}
                          pulse={lead.temperature === "hot" && !isClaimed}
                        />
                        {isLive && !isClaimed ? (
                          <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                            Handoff en vivo
                          </span>
                        ) : null}
                        {isClaimed ? (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                            {lead.claimedBy ?? staffUser.name}
                          </span>
                        ) : null}
                      </div>
                      {lead.notes ? (
                        <p className="text-sm font-medium text-rose-700">{lead.notes}</p>
                      ) : null}
                      <p className="text-sm text-slate-500">
                        {lead.kioskId} · {lead.sessionMinutes} min ·{" "}
                        {lead.vehicleViewed}
                      </p>
                      {lead.requestedActions.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {lead.requestedActions.map((action) => (
                            <span
                              key={action.id}
                              className={cn(
                                "rounded-md px-2 py-0.5 text-xs font-medium",
                                action.urgent
                                  ? "bg-rose-50 text-rose-700"
                                  : "bg-slate-100 text-slate-600",
                              )}
                            >
                              {action.label}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    {showTimer ? (
                      <div className="text-right">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                          Espera
                        </p>
                        <p
                          className={cn(
                            "font-mono text-2xl font-semibold tabular-nums",
                            !isClaimed && wait >= 90
                              ? "text-rose-600"
                              : "text-emerald-600",
                          )}
                        >
                          {formatWaitTimer(wait)}
                        </p>
                      </div>
                    ) : null}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {selected ? (
          <aside className="space-y-4 lg:sticky lg:top-36 lg:self-start">
            <HandoffReport
              lead={selected}
              isClaimed={claimedIds.has(selected.id) || Boolean(selected.claimedBy)}
              onClaim={() => handleClaim(selected)}
            />
          </aside>
        ) : null}
      </div>
    </OpsShell>
  );
}

function handoffToLead(handoff: LiveHandoff, now: number): OperationsLead {
  const elapsed = getElapsedSeconds(handoff, now);
  return {
    id: `live-${handoff.id}`,
    customerName: handoff.customerName,
    temperature: handoff.temperature,
    kioskId: handoff.kioskId,
    vehicleViewed: handoff.vehicle,
    comparisonViewed: handoff.comparisonViewed,
    financingViewed: handoff.financingViewed,
    persona: handoff.persona,
    topicsExplored: handoff.topicsExplored,
    objections: handoff.objections,
    suggestedOpening: handoff.suggestedOpening,
    requestedActions: [
      { id: "advisor", label: "Quiero hablar con un asesor ahora", urgent: true },
    ],
    waitSeconds: elapsed,
    sessionMinutes: handoff.sessionMinutes,
    claimedBy: handoff.claimedBy,
    notes:
      handoff.status === "pending"
        ? handoff.interestSummary
        : undefined,
  };
}

function LiveHandoffAlert({ handoff, now }: { handoff: LiveHandoff; now: number }) {
  const elapsed = getElapsedSeconds(handoff, now);

  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-rose-300 bg-gradient-to-r from-rose-600 to-rose-500 p-5 text-white shadow-lg shadow-rose-500/25 animate-pulse">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/80">
            Handoff caliente
          </p>
          <p className="mt-1 text-xl font-semibold">
            {handoff.customerName} · {handoff.kioskId}
          </p>
          <p className="mt-1 text-sm text-white/85">{handoff.interestSummary}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-medium uppercase tracking-wider text-white/70">
            Esperando
          </p>
          <p className="font-mono text-4xl font-bold tabular-nums">
            {formatWaitTimer(elapsed)}
          </p>
        </div>
      </div>
    </div>
  );
}

interface HandoffReportProps {
  lead: OperationsLead;
  isClaimed: boolean;
  onClaim: () => void;
}

function HandoffReport({ lead, isClaimed, onClaim }: HandoffReportProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/8 bg-white shadow-lg shadow-black/5">
      <div className="border-b border-black/6 bg-slate-50 px-5 py-4">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
          Informe de handoff
        </p>
        <h3 className="mt-1 text-lg font-semibold text-slate-900">
          {lead.customerName}
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          <TemperatureBadge temperature={lead.temperature} />
          <span className="rounded-full bg-slate-200/80 px-2.5 py-1 text-xs font-medium text-slate-700">
            Perfil {personaLabels[lead.persona]}
          </span>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <ReportRow label="Vehículo visto" value={lead.vehicleViewed} />
        {lead.comparisonViewed ? (
          <ReportRow label="Comparación vista" value={lead.comparisonViewed} highlight />
        ) : null}
        {lead.financingViewed ? (
          <ReportRow label="Financiamiento visto" value={lead.financingViewed} highlight />
        ) : null}

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
            Temas explorados
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {lead.topicsExplored.map((topic) => (
              <span
                key={topic}
                className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {lead.objections.length > 0 ? (
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
              Objeciones detectadas
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {lead.objections.map((objection) => (
                <span
                  key={objection}
                  className="rounded-md bg-amber-50 px-2 py-1 text-xs font-medium text-amber-900"
                >
                  {objection}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {lead.requestedActions.length > 0 ? (
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
              Acciones solicitadas
            </p>
            <ul className="mt-2 space-y-1.5">
              {lead.requestedActions.map((action) => (
                <li
                  key={action.id}
                  className={cn(
                    "flex items-center gap-2 text-sm",
                    action.urgent ? "font-medium text-rose-700" : "text-slate-700",
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      action.urgent ? "bg-rose-500" : "bg-slate-400",
                    )}
                  />
                  {action.label}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="rounded-xl bg-slate-900 p-4 text-white">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
            Línea sugerida de apertura
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/90">
            &ldquo;{lead.suggestedOpening}&rdquo;
          </p>
        </div>

        {!isClaimed && lead.temperature !== "cold" ? (
          <button
            type="button"
            onClick={onClaim}
            className="w-full rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 active:scale-[0.99]"
          >
            Reclamar lead
          </button>
        ) : isClaimed ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-emerald-800">
            Lead reclamado · En atención
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ReportRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-sm",
          highlight ? "font-medium text-slate-900" : "text-slate-700",
        )}
      >
        {value}
      </p>
    </div>
  );
}
