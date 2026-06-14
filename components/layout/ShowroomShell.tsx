import type { ReactNode } from "react";
import { getDealership } from "@/lib/content";
import { shouldHideDeveloperTools } from "@/lib/config/demo-mode";
import { ShowroomNav } from "./ShowroomNav";
import type { NavSection } from "@/types/navigation";
import { cn } from "@/lib/utils/cn";

interface ShowroomShellProps {
  children: ReactNode;
  navSections?: NavSection[];
  currentPath?: string;
  vehicleName?: string;
  screenId?: string;
  className?: string;
}

export function ShowroomShell({
  children,
  navSections = [],
  currentPath,
  vehicleName,
  screenId,
  className,
}: ShowroomShellProps) {
  const dealership = getDealership();
  const hideDevChrome = shouldHideDeveloperTools();
  const visibleNavSections = hideDevChrome ? [] : navSections;
  const kioskBare = hideDevChrome;

  return (
    <div
      className={cn(
        "min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]",
        kioskBare && "bg-transparent",
        className,
      )}
    >
      {!kioskBare ? (
        <header className="border-b border-[var(--color-border)] px-4 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-[var(--color-foreground-muted)]">
                {dealership.brand}
              </p>
              <h1 className="text-lg font-medium">{dealership.name}</h1>
              {vehicleName ? (
                <p className="text-sm text-[var(--color-foreground-muted)]">
                  {vehicleName}
                </p>
              ) : null}
            </div>
            {screenId ? (
              <span className="rounded bg-[var(--color-surface-muted)] px-2 py-1 text-xs">
                {screenId}
              </span>
            ) : null}
          </div>
        </header>
      ) : null}

      {visibleNavSections.length > 0 ? (
        <ShowroomNav sections={visibleNavSections} currentPath={currentPath} />
      ) : null}

      <main className={cn(kioskBare ? "p-0" : "px-4 py-6")}>{children}</main>
    </div>
  );
}
