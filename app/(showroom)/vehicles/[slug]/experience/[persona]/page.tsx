import {
  getDealership,
  getPersona,
  getVehicle,
} from "@/lib/content";
import {
  carlosTrustExists,
  getPersonaExperience,
  getVehicleFaq,
  getVehicleTrustStory,
  personaExperienceExists,
} from "@/lib/content/trust";
import { generateVehicleStaticParams } from "@/lib/content/static-params";
import { CinematicShell } from "@/components/cinematic";
import { CarlosTrustExperienceScreen } from "@/components/screens/CarlosTrustExperienceScreen";
import { SofiaExperienceScreen } from "@/components/screens/SofiaExperienceScreen";
import { routes } from "@/lib/navigation";
import { notFound } from "next/navigation";

interface PersonaExperiencePageProps {
  params: Promise<{ slug: string; persona: string }>;
}

export async function generateStaticParams() {
  const vehicles = await generateVehicleStaticParams();
  const params: { slug: string; persona: string }[] = [];

  for (const { slug } of vehicles) {
    if (personaExperienceExists(slug, "sofia")) {
      params.push({ slug, persona: "sofia" });
    }
    if (carlosTrustExists(slug)) {
      params.push({ slug, persona: "carlos" });
    }
  }

  return params;
}

export default async function PersonaExperiencePage({
  params,
}: PersonaExperiencePageProps) {
  const { slug, persona: personaSlug } = await params;

  if (personaSlug === "carlos") {
    if (!carlosTrustExists(slug)) notFound();

    const intro = getPersonaExperience(slug, "carlos");
    const faq = getVehicleFaq(slug);
    const story = getVehicleTrustStory(slug);
    const persona = getPersona(intro.personaId);
    const dealership = getDealership();
    getVehicle(slug);

    return (
      <CinematicShell screenId="S24" hideChrome>
        <CarlosTrustExperienceScreen
          intro={intro}
          faqTitle={faq.title}
          faqItems={faq.items}
          story={story}
          persona={persona}
          dealership={dealership}
          vehicleSlug={slug}
          backHref={routes.personaExperience(slug, "sofia")}
        />
      </CinematicShell>
    );
  }

  if (personaSlug === "sofia") {
    if (!personaExperienceExists(slug, "sofia")) notFound();

    const experience = getPersonaExperience(slug, "sofia");
    const persona = getPersona(experience.personaId);
    getVehicle(slug);

    return (
      <CinematicShell screenId="S25" hideChrome>
        <SofiaExperienceScreen
          experience={experience}
          persona={persona}
          vehicleSlug={slug}
          backHref={routes.vehicleHero(slug)}
        />
      </CinematicShell>
    );
  }

  notFound();
}
