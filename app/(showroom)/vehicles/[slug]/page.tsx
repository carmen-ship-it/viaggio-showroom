import Link from "next/link";
import { getThemes, getTours, getVehicle } from "@/lib/content";
import { generateVehicleStaticParams } from "@/lib/content/static-params";
import { CinematicShell } from "@/components/cinematic";
import { BackButton } from "@/components/cinematic/BackButton";
import { routes } from "@/lib/navigation";

interface VehiclePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return generateVehicleStaticParams();
}

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  const themes = getThemes(slug);
  const tours = getTours(slug);

  return (
    <CinematicShell screenId="S04">
      <div className="min-h-screen px-6 py-16 md:px-12">
        <BackButton href={routes.vehicleHero(slug)} label="Hero" />
        <h1 className="mt-8 text-4xl font-light">{vehicle.modelName}</h1>
        <p className="mt-2 text-white/60">{vehicle.tagline}</p>

        <section className="mt-12">
          <h2 className="mb-4 text-xs uppercase tracking-widest text-[var(--color-accent)]">
            Recorridos guiados
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href={routes.journey(slug, "carlos")}
              className="rounded-2xl border border-[var(--color-persona-carlos)]/30 bg-[var(--color-persona-carlos)]/10 p-6 transition-colors hover:bg-[var(--color-persona-carlos)]/20"
            >
              <p className="font-medium">Carlos · Confianza</p>
              <p className="mt-2 text-sm text-white/50">Tour de confianza</p>
            </Link>
            <Link
              href={routes.journey(slug, "sofia")}
              className="rounded-2xl border border-[var(--color-persona-sofia)]/30 bg-[var(--color-persona-sofia)]/10 p-6 transition-colors hover:bg-[var(--color-persona-sofia)]/20"
            >
              <p className="font-medium">Sofía · Deseo</p>
              <p className="mt-2 text-sm text-white/50">Tour de descubrimiento</p>
            </Link>
            <Link
              href={routes.journey(slug, "diego")}
              className="rounded-2xl border border-[var(--color-persona-diego)]/30 bg-[var(--color-persona-diego)]/10 p-6 transition-colors hover:bg-[var(--color-persona-diego)]/20"
            >
              <p className="font-medium">Diego · Familia</p>
              <p className="mt-2 text-sm text-white/50">Tour familiar</p>
            </Link>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-xs uppercase tracking-widest text-[var(--color-accent)]">
            Experiencias
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {themes.map((theme) => (
              <li key={theme.id}>
                <Link
                  href={routes.theme(slug, theme.id)}
                  className="block rounded-xl border border-white/10 px-5 py-4 transition-colors hover:border-white/25"
                >
                  {theme.title}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={routes.warranty(slug)}
                className="block rounded-xl border border-white/10 px-5 py-4 transition-colors hover:border-white/25"
              >
                Garantía profunda
              </Link>
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-xs uppercase tracking-widest text-[var(--color-accent)]">
            Tours disponibles
          </h2>
          <ul className="space-y-2 text-sm text-white/50">
            {tours.map((tour) => (
              <li key={tour.id}>
                {tour.title} · {tour.steps.length} pasos
              </li>
            ))}
          </ul>
        </section>
      </div>
    </CinematicShell>
  );
}
