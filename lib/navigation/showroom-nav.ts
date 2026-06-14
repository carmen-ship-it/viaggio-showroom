import {
  getThemes,
  getTours,
  getVehicle,
  getVehicleRegistry,
} from "@/lib/content";
import type { NavItem, NavSection } from "@/types/navigation";
import type { JourneyPersonaSlug } from "@/types/content";
import { routes } from "./routes";

const JOURNEY_LABELS: Record<JourneyPersonaSlug, string> = {
  carlos: "Recorrido con Carlos",
  sofia: "Recorrido con Sofía",
  diego: "Recorrido con Diego",
};

export function buildGlobalNav(): NavSection[] {
  const registry = getVehicleRegistry();

  return [
    {
      id: "global",
      title: "Showroom",
      items: [
        {
          id: "home",
          label: "Inicio",
          href: routes.home(),
          kind: "home",
          screenId: "S01",
          priority: 1,
        },
        {
          id: "vehicles",
          label: "Vehículos",
          href: routes.vehicles(),
          kind: "vehicles",
          screenId: "S03",
          priority: 2,
        },
        ...registry.vehicles.map((vehicle) => ({
          id: `vehicle-${vehicle.slug}`,
          label: vehicle.modelName,
          href: routes.vehicle(vehicle.slug),
          kind: "vehicle-hub" as const,
          screenId: "S04",
          priority: vehicle.launchPriority,
        })),
      ],
    },
  ];
}

export function buildVehicleNav(vehicleSlug: string): NavSection[] {
  const vehicle = getVehicle(vehicleSlug);
  const themes = getThemes(vehicleSlug);
  const tours = getTours(vehicleSlug);

  const experienceItems: NavItem[] = [
    {
      id: "hub",
      label: "Experiencia del vehículo",
      href: routes.vehicle(vehicleSlug),
      kind: "vehicle-hub",
      screenId: "S04",
      priority: 1,
    },
    {
      id: "safety",
      label: "Seguridad",
      href: routes.theme(vehicleSlug, "safety"),
      kind: "theme",
      themeId: "safety",
      screenId: "S07",
      priority: 2,
    },
    {
      id: "technology",
      label: "Tecnología",
      href: routes.theme(vehicleSlug, "technology"),
      kind: "theme",
      themeId: "technology",
      screenId: "S07",
      priority: 3,
    },
    {
      id: "warranty",
      label: "Garantía",
      href: routes.warranty(vehicleSlug),
      kind: "trust",
      screenId: "S29",
      priority: 4,
    },
    {
      id: "faq",
      label: "Preguntas frecuentes",
      href: routes.faq(vehicleSlug),
      kind: "trust",
      screenId: "S25",
      priority: 5,
    },
    {
      id: "financing",
      label: "Financiamiento",
      href: routes.financing(vehicleSlug),
      kind: "economics",
      screenId: "S26",
      priority: 6,
    },
    {
      id: "convert",
      label: "Próximo paso",
      href: routes.convert(vehicleSlug),
      kind: "convert",
      screenId: "S13",
      priority: 7,
    },
    {
      id: "test-drive-info",
      label: "Prueba familiar",
      href: routes.testDriveInfo(vehicleSlug),
      kind: "convert",
      screenId: "S34",
      priority: 8,
    },
    {
      id: "share",
      label: "Compartir en familia",
      href: routes.share(vehicleSlug),
      kind: "convert",
      screenId: "S33",
      priority: 9,
    },
    {
      id: "test-drive",
      label: "Agendar prueba",
      href: routes.testDrive(vehicleSlug),
      kind: "convert",
      screenId: "S14",
      priority: 10,
    },
  ];

  const journeyItems: NavItem[] = (
    ["carlos", "sofia", "diego"] as JourneyPersonaSlug[]
  ).map((persona, index) => ({
    id: `journey-${persona}`,
    label: JOURNEY_LABELS[persona],
    href: routes.journey(vehicleSlug, persona),
    kind: "journey",
    personaId: persona,
    screenId: "S06",
    priority: index + 1,
  }));

  const themeItems: NavItem[] = themes.map((theme) => ({
    id: `theme-${theme.id}`,
    label: theme.title,
    href: routes.theme(vehicleSlug, theme.id),
    kind: "theme",
    themeId: theme.id,
    personaId: theme.primaryPersonaId,
    screenId: "S07",
    priority: theme.sortOrder,
  }));

  const tourItems: NavItem[] = tours.map((tour, index) => ({
    id: `tour-${tour.id}`,
    label: tour.title,
    href: routes.tour(vehicleSlug, tour.id),
    kind: "tour",
    tourId: tour.id,
    personaId: tour.leadPersonaId,
    screenId: "S06",
    priority: index + 1,
  }));

  return [
    {
      id: "experience",
      title: vehicle.modelName,
      items: experienceItems,
    },
    {
      id: "journeys",
      title: "Recorridos guiados",
      items: journeyItems,
    },
    {
      id: "themes",
      title: "Explorar por tema",
      items: themeItems,
    },
    {
      id: "tours",
      title: "Tours",
      items: tourItems,
    },
  ];
}

export function buildBreadcrumbs(
  vehicleSlug: string,
  segments: { label: string; href?: string }[],
) {
  const vehicle = getVehicle(vehicleSlug);
  return [
    { label: "Inicio", href: routes.home() },
    { label: "Vehículos", href: routes.vehicles() },
    { label: vehicle.modelName, href: routes.vehicle(vehicleSlug) },
    ...segments,
  ];
}
