import Link from "next/link";
import { getVehicle } from "@/lib/content";
import { generateVehicleStaticParams } from "@/lib/content/static-params";
import { CinematicShell } from "@/components/cinematic";
import { MediaSurface } from "@/components/media/MediaSurface";
import { routes } from "@/lib/navigation";

interface VehiclePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return generateVehicleStaticParams();
}

const HUB_CARDS = [
  {
    title: "Experiencia inmersiva",
    description: "Hero cinematográfico con datos clave del GS4 MAX",
    href: (slug: string) => routes.vehicleHero(slug),
    accent: "warm",
  },
  {
    title: "¿Es confiable?",
    description: "Preguntas frecuentes con Carlos — marca china y garantía",
    href: (slug: string) => routes.faq(slug),
    accent: "trust",
  },
  {
    title: "Tour de confianza",
    description: "Recorrido guiado sin presión — 3 pasos esenciales",
    href: (slug: string) => routes.tour(slug, "trust"),
    accent: "trust",
  },
  {
    title: "Comparación honesta",
    description: "GS4 MAX vs competidores — también donde ellos ganan",
    href: (slug: string) => routes.compare(slug),
    accent: "neutral",
  },
  {
    title: "Cuota orientativa",
    description: "Referencia mensual por versión y plazo",
    href: (slug: string) => routes.financing(slug),
    accent: "warm",
  },
  {
    title: "Dar el siguiente paso",
    description: "Prueba de manejo, asesor o WhatsApp con contexto",
    href: (slug: string) => routes.convert(slug),
    accent: "trust",
  },
] as const;

export default async function VehiclePage({ params }: VehiclePageProps) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  const heroMediaId = vehicle.heroMediaId ?? `${vehicle.slug}-hero`;
  const priceStat = vehicle.keyStats?.find((s) => s.icon === "price");

  return (
    <CinematicShell screenId="S04">
      <div className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <MediaSurface mediaId={heroMediaId} className="h-full w-full opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--canvas-deep)] via-[var(--canvas-deep)]/92 to-[var(--canvas-deep)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-14 md:px-12 md:py-16">
          <p className="type-label text-[var(--color-accent-warm)]">Centro de decisión</p>
          <h1 className="type-headline mt-4 text-white">{vehicle.modelName}</h1>
          <p className="type-kiosk-lead mt-4 max-w-2xl text-white/65">{vehicle.tagline}</p>
          {priceStat ? (
            <p className="mt-4 font-mono text-lg text-[var(--color-accent-warm)]">
              Desde {priceStat.value}
            </p>
          ) : null}

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {HUB_CARDS.map((card) => (
              <Link
                key={card.title}
                href={card.href(slug)}
                className="group flex min-h-[148px] flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-colors hover:border-white/25 hover:bg-white/[0.07]"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                    {card.accent === "trust"
                      ? "Confianza"
                      : card.accent === "warm"
                        ? "Producto"
                        : "Comparar"}
                  </p>
                  <h2 className="mt-2 text-xl font-medium text-white">{card.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{card.description}</p>
                </div>
                <span className="mt-4 text-sm font-medium text-[var(--color-accent-warm)] transition-transform group-hover:translate-x-1">
                  Explorar →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </CinematicShell>
  );
}
