import { getPersona, getTopic } from "@/lib/content";
import { generateVehicleStaticParams } from "@/lib/content/static-params";
import { getThemeIds, getTopicIdsForTheme } from "@/lib/content";
import { routes } from "@/lib/navigation";
import { CinematicShell } from "@/components/cinematic";
import { FamilySafetyTopicScreen } from "@/components/screens/FamilySafetyTopicScreen";
import { TopicDeepDiveScreen } from "@/components/screens/TopicDeepDiveScreen";

interface TopicPageProps {
  params: Promise<{ slug: string; themeId: string; topicId: string }>;
}

export async function generateStaticParams() {
  const vehicles = await generateVehicleStaticParams();

  return vehicles.flatMap(({ slug }) =>
    getThemeIds(slug).flatMap((themeId) =>
      getTopicIdsForTheme(slug, themeId).map((topicId) => ({
        slug,
        themeId,
        topicId,
      })),
    ),
  );
}

export default async function TopicPage({ params }: TopicPageProps) {
  const { slug, themeId, topicId } = await params;
  const topic = getTopic(slug, themeId, topicId);

  if (topicId === "family-safety") {
    const diego = getPersona("diego");
    const carlos = getPersona("carlos");

    return (
      <CinematicShell screenId="S08" hideChrome>
        <FamilySafetyTopicScreen
          topic={topic}
          diego={diego}
          carlos={carlos}
          backHref={routes.vehicleHero(slug)}
        />
      </CinematicShell>
    );
  }

  const persona = getPersona(topic.personaId);

  const backHref =
    topicId === "adas"
      ? routes.tour(slug, "trust")
      : routes.vehicleHero(slug);
  const backLabel =
    topicId === "adas" ? "Tour con Carlos" : "Volver al hero";
  const nextHref =
    topicId === "adas"
      ? routes.compare(slug)
      : routes.convert(slug);
  const nextLabel =
    topicId === "adas" ? "Comparar con Corolla Cross" : "Dar el siguiente paso";

  return (
    <CinematicShell screenId="S08" hideChrome>
      <TopicDeepDiveScreen
        topic={topic}
        persona={persona}
        topicId={topicId}
        backHref={backHref}
        backLabel={backLabel}
        nextHref={nextHref}
        nextLabel={nextLabel}
      />
    </CinematicShell>
  );
}
