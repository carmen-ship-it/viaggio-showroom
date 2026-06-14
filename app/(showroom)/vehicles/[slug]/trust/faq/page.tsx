import { getPersona, getVehicle } from "@/lib/content";
import { getVehicleFaq, faqExists } from "@/lib/content/trust";
import { generateVehicleStaticParams } from "@/lib/content/static-params";
import { CinematicShell } from "@/components/cinematic";
import { FAQScreen } from "@/components/screens/FAQScreen";
import { routes } from "@/lib/navigation";

interface FaqPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const vehicles = await generateVehicleStaticParams();
  return vehicles.filter((v) => faqExists(v.slug));
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { slug } = await params;
  const faq = getVehicleFaq(slug);
  const persona = getPersona(faq.introPersonaId);
  getVehicle(slug);

  return (
    <CinematicShell screenId="S25" hideChrome>
      <FAQScreen
        title={faq.title}
        subtitle={faq.subtitle}
        items={faq.items}
        persona={persona}
        vehicleSlug={slug}
        backHref={routes.vehicleHero(slug)}
        nextHref={routes.trustStory(slug)}
        nextLabel="Historia Viaggio & GAC"
      />
    </CinematicShell>
  );
}
