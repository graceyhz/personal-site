/* §8.3 tags: surface fill, border hairline, muted text. Quiet by default. */
export function StackChip({ children }: { children: string }) {
  return (
    <span className="rounded-chip border border-border bg-surface px-2 py-0.5 font-mono text-xs text-ink-muted">
      {children}
    </span>
  );
}
