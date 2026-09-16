import Link from "next/link";
import { Container } from "@/components/container";
import { NavLinks } from "@/components/nav-links";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="border-b border-border">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg font-medium lowercase tracking-tight text-ink transition-colors duration-150 hover:text-accent"
        >
          {site.wordmark}
        </Link>
        <nav aria-label="Primary">
          <NavLinks />
        </nav>
      </Container>
    </header>
  );
}
