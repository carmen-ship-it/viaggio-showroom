import {
  getPersona,
  getTopicById,
  getTourForJourney,
  getVehicle,
} from "@/lib/content";
import { generateVehicleStaticParams } from "@/lib/content/static-params";
import { tourExists } from "@/lib/content/availability";
import type { JourneyPersonaSlug } from "@/types/content";
import { JOURNEY_TOUR_MAP } from "@/types/content";
import { routes } from "@/lib/navigation";
import { CinematicShell } from "@/components/cinematic";
import { TourPlayer } from "@/components/screens/TourPlayer";

const JOURNEYS: JourneyPersonaSlug[] = ["carlos", "sofia", "diego"];

const SCREEN_IDS: Record<JourneyPersonaSlug, string> = {
  carlos: "S06",
  sofia: "S25",
  diego: "S26",
};

const DIEGO_TRANSITIONS = [
  "",
  "El colegio es donde tu hijo vive el auto todos los días.",
  "Y cuando salen del colegio con hambre, casi siempre hay un desvío al super.",
  "Cuando la cajuela ya aguanta el super, un domingo en Buena Vista deja de ser estrés.",
  "Buena Vista es un día. A veces la familia pide dos.",
  "Tres horas de ruta y el aire deja de ser detalle.",
  "El confort enamora en diez minutos. La propiedad se prueba en doce meses.",
];

interface JourneyPageProps {
  params: Promise<{ slug: string; persona: JourneyPersonaSlug }>;
}

export async function generateStaticParams() {
  const vehicles = await generateVehicleStaticParams();

  return vehicles.flatMap(({ slug }) =>
    JOURNEYS.filter((persona) =>
      tourExists(slug, JOURNEY_TOUR_MAP[persona]),
    ).map((persona) => ({ slug, persona })),
  );
}

export default async function JourneyPage({ params }: JourneyPageProps) {
  const { slug, persona } = await params;
  const tour = getTourForJourney(slug, persona);
  const guide = getPersona(persona);
  getVehicle(slug);

  if (!tour) {
    return (
      <CinematicShell screenId={SCREEN_IDS[persona]}>
        <div className="flex min-h-screen items-center justify-center p-8 text-center text-white/60">
          Recorrido pendiente para este vehículo.
        </div>
      </CinematicShell>
    );
  }

  const steps = tour.steps.map((step, index) => ({
    stepId: step.id,
    title: step.title ?? step.id,
    topic: step.topicId ? getTopicById(slug, step.topicId) : null,
    mediaId: step.topicId
      ? (getTopicById(slug, step.topicId)?.blocks.find((b) => b.type === "hero")
          ?.data?.mediaId as string | undefined)
      : undefined,
    transitionLine:
      persona === "diego" ? DIEGO_TRANSITIONS[index] : undefined,
  }));

  const backHref =
    persona === "diego"
      ? routes.vehicleHero(slug)
      : persona === "carlos"
        ? routes.personaExperience(slug, "carlos")
        : routes.vehicleHero(slug);

  return (
    <CinematicShell screenId={SCREEN_IDS[persona]} hideChrome>
      <TourPlayer
        tour={tour}
        steps={steps}
        persona={guide}
        vehicleSlug={slug}
        backHref={backHref}
        variant={persona === "diego" ? "family" : "trust"}
      />
    </CinematicShell>
  );
}
