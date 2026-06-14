import Link from "next/link";
import type { NavItem } from "@/types/navigation";
import { cn } from "@/lib/utils/cn";

interface ShowroomNavProps {
  sections: { id: string; title: string; items: NavItem[] }[];
  currentPath?: string;
  className?: string;
}

export function ShowroomNav({
  sections,
  currentPath,
  className,
}: ShowroomNavProps) {
  return (
    <nav
      aria-label="Navegación del showroom"
      className={cn("border-b border-[var(--color-border)]", className)}
    >
      {sections.map((section) => (
        <div key={section.id} className="px-4 py-3">
          <p className="mb-2 text-xs uppercase tracking-wide text-[var(--color-foreground-muted)]">
            {section.title}
          </p>
          <ul className="flex flex-wrap gap-2">
            {section.items.map((item) => {
              const isActive = currentPath === item.href;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-block rounded px-3 py-1 text-sm",
                      isActive
                        ? "bg-[var(--color-accent)] text-[var(--color-background)]"
                        : "bg-[var(--color-surface-muted)] text-[var(--color-foreground)]",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
