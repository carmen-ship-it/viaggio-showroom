export type NavItemKind =
  | "home"
  | "vehicles"
  | "vehicle-hub"
  | "theme"
  | "topic"
  | "tour"
  | "journey"
  | "trust"
  | "economics"
  | "convert";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  kind: NavItemKind;
  screenId?: string;
  personaId?: string;
  themeId?: string;
  tourId?: string;
  priority?: number;
}

export interface NavSection {
  id: string;
  title: string;
  items: NavItem[];
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
