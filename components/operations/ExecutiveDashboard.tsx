import {
  executiveInsights,
  executiveKpis,
  executiveMeta,
  formatCurrencyUsd,
  managerUser,
  topCompetitors,
  topObjections,
  weeklyTrends,
} from "@/lib/demo/operations-data";
import { cn } from "@/lib/utils/cn";
import { MetricCard } from "./MetricCard";
import { OpsShell } from "./OpsShell";
import { TrendChart } from "./TrendChart";

const opsNav = [
  { href: "/staff", label: "Vendedor" },
  { href: "/manager", label: "Gerente" },
  { href: "/executive", label: "Dirección", active: true },
];

export function ExecutiveDashboard() {
  return (
    <OpsShell
      title="Reporte ejecutivo"
      subtitle={`${executiveMeta.period} · ${executiveMeta.preparedFor}`}
      userName={managerUser.name}
      userRole="Gerencia general"
      userInitials="GG"
      variant="dark"
      nav={opsNav}
      badge={
        <span className="hidden rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-white/60 sm:inline-flex">
          CPI-OS Intelligence
        </span>
      }
    >
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        <MetricCard
          label={executiveKpis.visits.label}
          value={executiveKpis.visits.value}
          delta={executiveKpis.visits.delta}
        />
        <MetricCard
          label={executiveKpis.leads.label}
          value={executiveKpis.leads.value}
          delta={executiveKpis.leads.delta}
        />
        <MetricCard
          label={executiveKpis.testDrives.label}
          value={executiveKpis.testDrives.value}
          delta={executiveKpis.testDrives.delta}
        />
        <MetricCard
          label={executiveKpis.sales.label}
          value={executiveKpis.sales.value}
          delta={executiveKpis.sales.delta}
        />
        <MetricCard
          label={executiveKpis.revenue.label}
          value={formatCurrencyUsd(executiveKpis.revenue.value)}
          delta={executiveKpis.revenue.delta}
          className="sm:col-span-2 xl:col-span-1 2xl:col-span-1"
        />
        <MetricCard
          label={executiveKpis.hotSla.label}
          value={`${executiveKpis.hotSla.value}%`}
          delta={executiveKpis.hotSla.delta}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)]">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-lg font-semibold">Tendencias semanales</h2>
          <p className="mb-6 text-sm text-white/50">
            Visitas, leads, pruebas y ventas atribuidas al showroom digital
          </p>
          <div className="grid gap-8 lg:grid-cols-2">
            <TrendChart data={weeklyTrends} metric="visits" label="Visitas digitales" />
            <TrendChart data={weeklyTrends} metric="leads" label="Leads capturados" />
            <TrendChart data={weeklyTrends} metric="testDrives" label="Pruebas de manejo" />
            <TrendChart data={weeklyTrends} metric="sales" label="Ventas atribuidas" />
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#c8a96e]/10 to-transparent p-5">
          <h2 className="text-lg font-semibold">Conclusiones de la semana</h2>
          <p className="mb-4 text-sm text-white/50">
            Inteligencia accionable para dirección
          </p>
          <ul className="space-y-3">
            {executiveInsights.map((insight) => (
              <li
                key={insight}
                className="flex gap-3 rounded-xl border border-white/8 bg-black/20 p-3 text-sm leading-relaxed text-white/85"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8a96e]" />
                {insight}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-lg font-semibold">Top objeciones</h2>
          <p className="mb-4 text-sm text-white/50">Frecuencia en sesiones de kiosco</p>
          <div className="space-y-3">
            {topObjections.map((objection, index) => (
              <div
                key={objection.label}
                className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/[0.04] px-4 py-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/8 text-xs font-semibold text-white/60">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{objection.label}</p>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/8">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-amber-500/80 to-amber-300/80"
                      style={{
                        width: `${(objection.count / topObjections[0].count) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold tabular-nums">{objection.count}</p>
                  <TrendArrow trend={objection.trend} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-lg font-semibold">Top competidores</h2>
          <p className="mb-4 text-sm text-white/50">
            Comparaciones registradas en kiosco
          </p>
          <div className="overflow-hidden rounded-xl border border-white/8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8 bg-white/[0.04] text-left text-white/50">
                  <th className="px-4 py-3 font-medium">Competidor</th>
                  <th className="px-4 py-3 font-medium text-right">Comp.</th>
                  <th className="px-4 py-3 font-medium text-right">Ganamos</th>
                  <th className="px-4 py-3 font-medium text-right">Perdimos</th>
                </tr>
              </thead>
              <tbody>
                {topCompetitors.map((competitor) => (
                  <tr
                    key={competitor.name}
                    className="border-b border-white/6 last:border-0"
                  >
                    <td className="px-4 py-3 font-medium">{competitor.name}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-white/80">
                      {competitor.comparisons}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-emerald-400">
                      {competitor.wins}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-rose-400">
                      {competitor.losses}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-rose-300/80">
              Patrón de pérdida detectado
            </p>
            <p className="mt-1 text-sm text-rose-100/90">
              Hyundai Tucson apareció en 2 comparaciones perdidas esta semana — precio
              de contado. Marketing debe preparar respuesta de valor, no solo precio.
            </p>
          </div>
        </section>
      </div>
    </OpsShell>
  );
}

function TrendArrow({ trend }: { trend: "up" | "down" | "stable" }) {
  const styles = {
    up: "text-rose-400",
    down: "text-emerald-400",
    stable: "text-white/40",
  };
  const labels = {
    up: "↑",
    down: "↓",
    stable: "→",
  };

  return (
    <span className={cn("text-xs font-medium", styles[trend])}>{labels[trend]}</span>
  );
}
