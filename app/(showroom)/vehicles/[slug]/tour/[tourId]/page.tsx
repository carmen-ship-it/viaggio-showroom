import { getPersona, getTopicById, getTour } from "@/lib/content";
import { generateVehicleStaticParams } from "@/lib/content/static-params";
import { getTourIds } from "@/lib/content";
import { MVP_TRUST_TOUR_STEP_COUNT } from "@/lib/tour/mvp";
import { CinematicShell } from "@/components/cinematic";
import { TourPlayer } from "@/components/screens/TourPlayer";
import { routes } from "@/lib/navigation";

interface TourPageProps {
  params: Promise<{ slug: string; tourId: string }>;
}

export async function generateStaticParams() {
  const vehicles = await generateVehicleStaticParams();

  return vehicles.flatMap(({ slug }) =>
    getTourIds(slug).map((tourId) => ({ slug, tourId })),
  );
}

export default async function TourPage({ params }: TourPageProps) {
  const { slug, tourId } = await params;
  const tour = getTour(slug, tourId);
  const persona = getPersona(tour.leadPersonaId);

  const mvpSteps =
    tourId === "trust"
      ? tour.steps.slice(0, MVP_TRUST_TOUR_STEP_COUNT)
      : tour.steps;

  const steps = mvpSteps.map((step) => ({
    stepId: step.id,
    title: step.title ?? step.id,
    topic: step.topicId ? getTopicById(slug, step.topicId) : null,
    mediaId: step.topicId
      ? getTopicById(slug, step.topicId)?.blocks.find((b) => b.type === "hero")
          ?.data?.mediaId as string | undefined
      : undefined,
  }));

  return (
    <CinematicShell screenId="S06" hideChrome>
      <TourPlayer
        tour={{ ...tour, steps: mvpSteps }}
        steps={steps}
        persona={persona}
        vehicleSlug={slug}
        backHref={routes.trustStory(slug)}
      />
    </CinematicShell>
  );
}
