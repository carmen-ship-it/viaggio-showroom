import { getDealership, getVehicle } from "@/lib/content";
import { generateVehicleStaticParams } from "@/lib/content/static-params";
import { routes } from "@/lib/navigation";
import type { WhatsAppContext } from "@/lib/whatsapp/buildWhatsAppLink";
import { WhatsAppHandoffScreen } from "@/components/screens/WhatsAppHandoffScreen";
import { VehiclePageShell } from "@/components/layout";

const VALID_INTENTS: NonNullable<WhatsAppContext["intent"]>[] = [
  "test_drive",
  "financing",
  "general",
  "family_share",
];

interface WhatsAppPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ intent?: string }>;
}

export function generateStaticParams() {
  return generateVehicleStaticParams();
}

export default async function WhatsAppPage({
  params,
  searchParams,
}: WhatsAppPageProps) {
  const { slug } = await params;
  const { intent: intentParam } = await searchParams;
  const vehicle = getVehicle(slug);
  const dealership = getDealership();

  const intent = VALID_INTENTS.includes(
    intentParam as NonNullable<WhatsAppContext["intent"]>,
  )
    ? (intentParam as NonNullable<WhatsAppContext["intent"]>)
    : "general";

  return (
    <VehiclePageShell
      slug={slug}
      screenId="S15"
      currentPath={routes.whatsapp(slug)}
    >
      <WhatsAppHandoffScreen
        vehicle={vehicle}
        dealership={dealership}
        backHref={routes.convert(slug)}
        intent={intent}
      />
    </VehiclePageShell>
  );
}
