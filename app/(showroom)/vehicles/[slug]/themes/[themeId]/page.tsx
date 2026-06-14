import { getPersona, getTheme, getTopicsForTheme } from "@/lib/content";
import { generateVehicleStaticParams } from "@/lib/content/static-params";
import { getThemeIds } from "@/lib/content";
import { routes } from "@/lib/navigation";
import { CinematicShell } from "@/components/cinematic";
import { BackButton } from "@/components/cinematic/BackButton";
import { ThemeExperience } from "@/components/content";

const THEME_SCREEN_IDS: Record<string, string> = {
  safety: "S08",
  technology: "S08",
  "warranty-service": "S29",
};

interface ThemePageProps {
  params: Promise<{ slug: string; themeId: string }>;
}

export async function generateStaticParams() {
  const vehicles = await generateVehicleStaticParams();

  return vehicles.flatMap(({ slug }) =>
    getThemeIds(slug).map((themeId) => ({ slug, themeId })),
  );
}

export default async function ThemePage({ params }: ThemePageProps) {
  const { slug, themeId } = await params;
  const theme = getTheme(slug, themeId);
  const topics = getTopicsForTheme(slug, themeId);
  const persona = getPersona(theme.primaryPersonaId);
  const screenId = THEME_SCREEN_IDS[themeId] ?? "S07";

  return (
    <CinematicShell screenId={screenId}>
      <div className="absolute left-6 top-6 z-20">
        <BackButton href={routes.vehicleHero(slug)} label="Hero" />
      </div>
      <ThemeExperience
        theme={theme}
        topics={topics}
        persona={persona}
        vehicleSlug={slug}
        isTrustTheme={themeId === "warranty-service"}
      />
    </CinematicShell>
  );
}
