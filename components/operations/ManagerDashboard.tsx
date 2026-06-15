import {
  activeKioskSessions,
  conversionFunnel,
  dealershipMeta,
  managerUser,
  slaMetrics,
  staffRoster,
  temperatureDistribution,
  testDrivesToday,
} from "@/lib/demo/operations-data";
import { cn } from "@/lib/utils/cn";
import { ActiveHandoffsPanel } from "./ActiveHandoffsPanel";
import { FunnelChart } from "./FunnelChart";
import { MetricCard } from "./MetricCard";
import { OpsShell } from "./OpsShell";
import { TemperatureBadge } from "./TemperatureBadge";

const opsNav = [
  { href: "/staff", label: "Vendedor" },
  { href: "/manager", label: "Gerente", active: true },
  { href: "/executive", label: "Dirección" },
];

const statusLabels = {
  available: { label: "Disponible", color: "bg-emerald-400" },
  with_customer: { label: "Con cliente", color: "bg-blue-400" },
  test_drive: { label: "En prueba", color: "bg-violet-400" },
  break: { label: "Descanso", color: "bg-slate-400" },
} as const;

export function ManagerDashboard() {
  return (
    <OpsShell
      title="Tablero de mando"
      subtitle={`${dealershipMeta.shiftLabel} · Pulso del piso en tiempo real`}
      userName={managerUser.name}
      userRole={managerUser.role}
      userInitials={managerUser.initials}
      variant="dark"
      nav={opsNav}
      badge={
        slaMetrics.unattendedHandoffs === 0 ? (
          <span className="hidden rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-300 sm:inline-flex">
            Sin alertas rojas
          </span>
        ) : null
      }
    >
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Sesiones activas"
          value={activeKioskSessions.length}
          delta="2 kioscos"
          icon={<KioskIcon />}
        />
        <MetricCard
          label="Calientes esperando"
          value={slaMetrics.hotLeadsWaiting}
          delta={slaMetrics.hotLeadsWaiting > 0 ? "Atender < 2 min" : "Bajo control"}
          deltaPositive={slaMetrics.hotLeadsWaiting === 0}
          icon={<AlertIcon />}
        />
        <MetricCard
          label="Pruebas hoy"
          value={testDrivesToday.length}
          delta={`${testDrivesToday.filter((t) => t.status === "completada").length} completadas`}
          icon={<DriveIcon />}
        />
        <MetricCard
          label="Cumplimiento SLA"
          value={`${slaMetrics.slaCompliance}%`}
          delta={`Meta ${slaMetrics.slaTarget}`}
          icon={<ClockIcon />}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="space-y-6">
          <ActiveHandoffsPanel />

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Sesiones activas en kiosco</h2>
                <p className="text-sm text-white/50">
                  Profundidad y pantalla actual
                </p>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                En vivo
              </span>
            </div>
            <div className="space-y-3">
              {activeKioskSessions.map((session) => (
                <div
                  key={session.id}
                  className="rounded-xl border border-white/8 bg-white/[0.04] p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium">{session.customerLabel}</span>
                        <TemperatureBadge temperature={session.temperature} variant="dark" />
                      </div>
                      <p className="text-sm text-white/50">
                        {session.kioskLabel} · {session.vehicle} ·{" "}
                        {session.depthMinutes} min
                      </p>
                      <p className="text-sm text-white/70">{session.currentScreen}</p>
                    </div>
                    {session.staffAssigned ? (
                      <span className="rounded-lg bg-white/8 px-2.5 py-1 text-xs text-white/70">
                        {session.staffAssigned}
                      </span>
                    ) : (
                      <span className="rounded-lg bg-amber-500/15 px-2.5 py-1 text-xs font-medium text-amber-300">
                        Sin asignar
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="text-lg font-semibold">Actividad del equipo</h2>
            <p className="mb-4 text-sm text-white/50">
              Estado actual y desempeño del turno
            </p>
            <div className="space-y-3">
              {staffRoster.map((member) => {
                const status = statusLabels[member.status];
                return (
                  <div
                    key={member.id}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/8 bg-white/[0.04] px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-semibold">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="flex items-center gap-1.5 text-xs text-white/50">
                          <span className={cn("h-1.5 w-1.5 rounded-full", status.color)} />
                          {status.label}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-6 text-right text-sm">
                      <div>
                        <p className="text-white/40">Leads</p>
                        <p className="font-semibold tabular-nums">{member.leadsHandled}</p>
                      </div>
                      <div>
                        <p className="text-white/40">Respuesta</p>
                        <p className="font-semibold tabular-nums">
                          {member.avgResponseSeconds > 0
                            ? `${member.avgResponseSeconds}s`
                            : "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-white/40">SLA</p>
                        <p
                          className={cn(
                            "font-semibold tabular-nums",
                            member.slaCompliance >= 95
                              ? "text-emerald-400"
                              : "text-amber-400",
                          )}
                        >
                          {member.slaCompliance}%
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="text-lg font-semibold">Embudo de conversión</h2>
            <p className="mb-4 text-sm text-white/50">Hoy · showroom digital</p>
            <FunnelChart stages={conversionFunnel} />
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="text-lg font-semibold">Métricas SLA</h2>
            <p className="mb-4 text-sm text-white/50">
              Tiempo de respuesta a leads calientes
            </p>
            <dl className="space-y-4">
              <SlaRow label="Tiempo promedio caliente" value={slaMetrics.avgHotResponse} />
              <SlaRow label="Meta de respuesta" value={slaMetrics.slaTarget} />
              <SlaRow
                label="Cumplimiento"
                value={`${slaMetrics.slaCompliance}%`}
                highlight
              />
              <SlaRow
                label="Handoffs sin atender"
                value={String(slaMetrics.unattendedHandoffs)}
                alert={slaMetrics.unattendedHandoffs > 0}
              />
            </dl>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="text-lg font-semibold">Distribución de temperatura</h2>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <TempDist label="Caliente" count={temperatureDistribution.hot} color="emerald" />
              <TempDist label="Tibio" count={temperatureDistribution.warm} color="amber" />
              <TempDist label="Frío" count={temperatureDistribution.cold} color="slate" />
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <h2 className="text-lg font-semibold">Pruebas de manejo hoy</h2>
            <div className="mt-4 space-y-3">
              {testDrivesToday.map((drive) => (
                <div
                  key={`${drive.time}-${drive.customer}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/8 bg-white/[0.04] px-3 py-2.5"
                >
                  <div>
                    <p className="font-medium">{drive.time} · {drive.customer}</p>
                    <p className="text-xs text-white/50">
                      {drive.vehicle} · {drive.advisor}
                    </p>
                  </div>
                  <DriveStatus status={drive.status} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </OpsShell>
  );
}

function SlaRow({
  label,
  value,
  highlight,
  alert,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  alert?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/6 pb-3 last:border-0 last:pb-0">
      <dt className="text-sm text-white/50">{label}</dt>
      <dd
        className={cn(
          "text-sm font-semibold tabular-nums",
          alert && "text-rose-400",
          highlight && !alert && "text-emerald-400",
          !highlight && !alert && "text-white",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

function TempDist({
  label,
  count,
  color,
}: {
  label: string;
  count: number;
  color: "emerald" | "amber" | "slate";
}) {
  const colors = {
    emerald: "text-emerald-400 bg-emerald-500/15 border-emerald-500/20",
    amber: "text-amber-400 bg-amber-500/15 border-amber-500/20",
    slate: "text-slate-400 bg-slate-500/15 border-slate-500/20",
  };

  return (
    <div className={cn("rounded-xl border p-3 text-center", colors[color])}>
      <p className="text-2xl font-semibold tabular-nums">{count}</p>
      <p className="text-xs font-medium">{label}</p>
    </div>
  );
}

function DriveStatus({
  status,
}: {
  status: "confirmada" | "en_curso" | "completada";
}) {
  const styles = {
    confirmada: "bg-blue-500/15 text-blue-300",
    en_curso: "bg-violet-500/15 text-violet-300",
    completada: "bg-emerald-500/15 text-emerald-300",
  };
  const labels = {
    confirmada: "Confirmada",
    en_curso: "En curso",
    completada: "Completada",
  };

  return (
    <span className={cn("rounded-md px-2 py-1 text-xs font-medium", styles[status])}>
      {labels[status]}
    </span>
  );
}

function KioskIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 20h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 8v5m0 3h.01M10.3 4.5h3.4L20 18H4L10.3 4.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DriveIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 16l1.5-5h11L19 16M7 16v2m10-2v2M6 11h12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
