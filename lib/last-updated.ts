import { execSync } from "node:child_process";

/* FR-23: footer date from the latest git commit. Evaluated once at build time
   on the server; falls back to the build date when git isn't available
   (e.g. a fresh clone with no commits). */
function readCommitDate(): Date {
  try {
    const out = execSync("git log -1 --format=%cI", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    if (out) return new Date(out);
  } catch {
    /* no git history yet */
  }
  return new Date();
}

const date = readCommitDate();

export const lastUpdated = {
  iso: date.toISOString().slice(0, 10),
  label: date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }),
};
