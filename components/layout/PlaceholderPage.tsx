import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface PlaceholderPageProps {
  title: string;
  description?: string;
  screenId?: string;
  meta?: Record<string, string | number | undefined>;
  children?: ReactNode;
  className?: string;
}

export function PlaceholderPage({
  title,
  description,
  screenId,
  meta,
  children,
  className,
}: PlaceholderPageProps) {
  return (
    <section className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-medium">{title}</h2>
          {screenId ? (
            <span className="rounded bg-[var(--color-surface-muted)] px-2 py-1 text-xs">
              Foundation · {screenId}
            </span>
          ) : null}
        </div>
        {description ? (
          <p className="max-w-3xl text-[var(--color-foreground-muted)]">
            {description}
          </p>
        ) : null}
      </div>

      {meta && Object.keys(meta).length > 0 ? (
        <dl className="grid max-w-3xl gap-3 rounded border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-sm">
          {Object.entries(meta).map(([key, value]) =>
            value !== undefined ? (
              <div key={key} className="grid grid-cols-[140px_1fr] gap-2">
                <dt className="text-[var(--color-foreground-muted)]">{key}</dt>
                <dd>{String(value)}</dd>
              </div>
            ) : null,
          )}
        </dl>
      ) : null}

      {children}
    </section>
  );
}
