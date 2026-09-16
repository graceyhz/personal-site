import { ContactLinks } from "@/components/contact-links";
import { Container } from "@/components/container";
import { lastUpdated } from "@/lib/last-updated";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border py-8 sm:mt-32">
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <ContactLinks />
        <p className="font-mono text-xs text-ink-muted">
          last updated{" "}
          <time dateTime={lastUpdated.iso}>{lastUpdated.label}</time>
        </p>
      </Container>
    </footer>
  );
}
