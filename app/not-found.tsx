import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="pt-24 sm:pt-32">
      <p className="origin-left -rotate-2 font-hand text-2xl text-pen">404, a torn-out page</p>
      <h1 className="mt-2 text-3xl sm:text-4xl">Nothing here.</h1>
      <p className="mt-4 max-w-[60ch] text-ink-muted">
        That page doesn&apos;t exist, or it moved.
      </p>
      <ul className="mt-8 flex gap-6 text-sm lowercase">
        <li>
          <Link href="/" className="text-accent-text underline-offset-4 hover:underline">
            home
          </Link>
        </li>
        <li>
          <Link href="/work" className="text-accent-text underline-offset-4 hover:underline">
            work
          </Link>
        </li>
      </ul>
    </Container>
  );
}
