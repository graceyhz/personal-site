"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";

export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-6 text-sm lowercase">
      {nav.map(({ href, label }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={`transition-colors duration-150 hover:text-accent-text ${
                active ? "text-ink" : "text-ink-muted"
              }`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
