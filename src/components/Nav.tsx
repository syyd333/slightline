"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mark } from "./Mark";

const links = [
  { href: "/map", label: "Map" },
  { href: "/planner", label: "Planner" },
  { href: "/search", label: "Search" },
  { href: "/incidents", label: "Incidents" },
  { href: "/logs", label: "Logs" },
];

export function Nav() {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_86%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 text-[var(--ink)]">
          <Mark />
          <span className="font-[family-name:var(--font-display)] text-xl tracking-tight">
            SightLine
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          {links.map((link) => {
            const active = path === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-1.5 transition ${
                  active
                    ? "bg-[var(--paper)] text-[var(--ink)] shadow-sm"
                    : "text-[var(--mute)] hover:text-[var(--ink)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
