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
  { href: "/about", label: "Pitch" },
];

export function Nav() {
  const path = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--paper)_90%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 text-[var(--ink)]">
          <Mark />
          <span className="font-[family-name:var(--font-display)] text-xl tracking-tight">
            SightLine
          </span>
        </Link>
        <nav className="-mr-1 flex items-center gap-0.5 overflow-x-auto text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map((link) => {
            const active = path === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 rounded-full px-3 py-1.5 transition ${
                  active
                    ? "bg-[var(--sand)] text-[var(--ink)]"
                    : "text-[var(--mute)] hover:bg-[var(--sand)] hover:text-[var(--ink)]"
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
