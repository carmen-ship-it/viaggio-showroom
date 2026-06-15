import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { dealershipMeta } from "@/lib/demo/operations-data";

interface OpsShellProps {
  title: string;
  subtitle: string;
  userName: string;
  userRole: string;
  userInitials: string;
  variant?: "light" | "dark";
  nav?: Array<{ href: string; label: string; active?: boolean }>;
  badge?: ReactNode;
  children: ReactNode;
}

export function OpsShell({
  title,
  subtitle,
  userName,
  userRole,
  userInitials,
  variant = "dark",
  nav,
  badge,
  children,
}: OpsShellProps) {
  const isLight = variant === "light";

  return (
    <div
      className={cn(
        "min-h-screen",
        isLight ? "bg-[#f5f5f7] text-slate-900" : "bg-[#0a0c10] text-white",
      )}
    >
      <header
        className={cn(
          "sticky top-0 z-20 border-b backdrop-blur-xl",
          isLight
            ? "border-black/8 bg-[#f5f5f7]/90"
            : "border-white/8 bg-[#0a0c10]/90",
        )}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-4 lg:px-8">
          <div className="flex min-w-0 items-center gap-5">
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold",
                isLight ? "bg-slate-900 text-white" : "bg-white text-slate-900",
              )}
            >
              CPI
            </div>
            <div className="min-w-0">
              <p
                className={cn(
                  "text-[11px] font-medium uppercase tracking-[0.2em]",
                  isLight ? "text-slate-500" : "text-white/45",
                )}
              >
                {dealershipMeta.name} · {dealershipMeta.location}
              </p>
              <h1 className="truncate text-lg font-semibold tracking-tight">
                {title}
              </h1>
            </div>
          </div>

          {nav ? (
            <nav className="hidden items-center gap-1 md:flex">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    item.active
                      ? isLight
                        ? "bg-slate-900 text-white"
                        : "bg-white/12 text-white"
                      : isLight
                        ? "text-slate-600 hover:bg-black/5"
                        : "text-white/60 hover:bg-white/8 hover:text-white",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          ) : null}

          <div className="flex shrink-0 items-center gap-3">
            {badge}
            <div className="text-right">
              <p className="text-sm font-medium">{userName}</p>
              <p
                className={cn(
                  "text-xs",
                  isLight ? "text-slate-500" : "text-white/50",
                )}
              >
                {userRole}
              </p>
            </div>
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold",
                isLight ? "bg-slate-200 text-slate-700" : "bg-white/10 text-white",
              )}
            >
              {userInitials}
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[1440px] px-6 pb-3 lg:px-8">
          <p
            className={cn(
              "text-sm",
              isLight ? "text-slate-500" : "text-white/50",
            )}
          >
            {subtitle}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-6 py-6 lg:px-8 lg:py-8">
        {children}
      </main>
    </div>
  );
}
