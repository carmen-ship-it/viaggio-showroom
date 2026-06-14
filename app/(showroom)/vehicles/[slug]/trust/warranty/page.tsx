import {
  getDealership,
  getPersona,
  getTopicsForTheme,
  getVehicle,
  tryGetTopic,
} from "@/lib/content";
import { generateVehicleStaticParams } from "@/lib/content/static-params";
import { topicExists } from "@/lib/content/availability";
import { routes } from "@/lib/navigation";
import { CinematicShell } from "@/components/cinematic";
import { BackButton } from "@/components/cinematic/BackButton";
import { TrustSectionRenderer } from "@/components/content/renderers/TrustSectionRenderer";
import { CTARenderer } from "@/components/content/renderers/CTARenderer";
import type { TrustSectionBlockData } from "@/types/blocks";

interface WarrantyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const vehicles = await generateVehicleStaticParams();

  return vehicles
    .filter((vehicle) => topicExists(vehicle.slug, "warranty-terms"))
    .map((vehicle) => ({ slug: vehicle.slug }));
}

export default async function WarrantyPage({ params }: WarrantyPageProps) {
  const { slug } = await params;
  const vehicle = getVehicle(slug);
  const dealership = getDealership();
  const warrantyTopic = tryGetTopic(slug, "warranty-service", "warranty-terms");
  const serviceTopic = tryGetTopic(slug, "warranty-service", "viaggio-service");
  const warrantyTopics = getTopicsForTheme(slug, "warranty-service");
  const persona = getPersona("carlos");

  const trustData: TrustSectionBlockData = {
    title: "Garantía y servicio GAC",
    subtitle: `${dealership.name} · ${dealership.city}`,
    variant: "warranty",
    items: [
      { icon: "🛡️", label: "Cobertura", value: "5 años / 150.000 km" },
      { icon: "🔧", label: "Servicio", value: dealership.name },
      { icon: "📍", label: "Ubicación", value: dealership.city },
    ],
  };

  return (
    <CinematicShell screenId="S29">
      <div className="min-h-screen px-6 py-16 md:px-12">
        <BackButton href={routes.vehicleHero(slug)} label="Hero" />
        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-[var(--color-accent)]">
          Experiencia de garantía
        </p>
        <h1 className="mt-3 text-4xl font-light md:text-5xl">
          {vehicle.modelName}
        </h1>

        <div className="mt-10 space-y-12">
          {warrantyTopic ? (
            <TrustSectionRenderer
              blocks={warrantyTopic.blocks}
              persona={persona}
              explicitData={trustData}
              vehicleSlug={slug}
            />
          ) : null}

          {serviceTopic ? (
            <TrustSectionRenderer
              blocks={serviceTopic.blocks}
              persona={persona}
              explicitData={{
                title: "Servicio en Viaggio",
                variant: "service",
                items: [
                  { icon: "🔧", label: "Taller", value: "Certificación GAC" },
                  { icon: "📦", label: "Repuestos", value: "Stock local" },
                  { icon: "⏱️", label: "Horario", value: dealership.hours.weekdays },
                ],
              }}
              vehicleSlug={slug}
            />
          ) : null}

          {warrantyTopics.length === 0 ? (
            <p className="text-white/50">Contenido de garantía pendiente.</p>
          ) : null}
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <CTARenderer
            data={{ action: "test_drive", label: "Agendar prueba de manejo" }}
            vehicleSlug={slug}
            variant="primary"
          />
          <CTARenderer
            data={{
              action: "tour",
              label: "Tour de confianza con Carlos",
              targetId: "trust",
            }}
            vehicleSlug={slug}
            variant="secondary"
          />
        </div>
      </div>
    </CinematicShell>
  );
}
