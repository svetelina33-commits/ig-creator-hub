import React from "react";

/** Thin horizontal rule with a centered mark */
export function CenteredRule({ mark = "✦", className = "" }: { mark?: string; className?: string }) {
  return (
    <div className={`flex items-center gap-4 text-ink-faint ${className}`} aria-hidden>
      <span className="flex-1 h-px bg-hairline" />
      <span className="text-[10px]">{mark}</span>
      <span className="flex-1 h-px bg-hairline" />
    </div>
  );
}

/** A running-head strip with left/center/right triple */
export function RunningHead({
  left,
  center,
  right,
  className = "",
}: {
  left?: string;
  center?: string;
  right?: string;
  className?: string;
}) {
  return (
    <div
      className={`running-head flex items-center justify-between gap-4 ${className}`}
      aria-hidden
    >
      <span>{left}</span>
      {center && <span className="hidden sm:inline tracking-[0.5em]">{center}</span>}
      <span>{right}</span>
    </div>
  );
}

/** Large italicized section heading with a preceding kicker */
export function SectionHeading({
  kicker,
  title,
  children,
}: {
  kicker?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="mb-8">
      {kicker && (
        <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted mb-3">{kicker}</p>
      )}
      <h2 className="font-serif-display text-4xl sm:text-5xl leading-[0.95] text-ink">{title}</h2>
      {children && <div className="mt-4 text-ink-muted max-w-xl">{children}</div>}
    </header>
  );
}

/** Number + label stat card (for analytics tiles) */
export function StatTile({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: "forest" | "vermillion" | "ochre" | "ink";
}) {
  const accentColor = accent ? `text-${accent}` : "text-ink";
  return (
    <div className="hairline-top pt-4">
      <div className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">{label}</div>
      <div className={`mt-2 font-serif-display text-4xl ${accentColor} leading-none`}>{value}</div>
      {sub && (
        <div className="mt-2 font-mono-numeric text-[10px] tracking-[0.2em] text-ink-faint">
          {sub}
        </div>
      )}
    </div>
  );
}

/** Decorative frame (four corner ticks) — wraps children in an editorial frame */
export function CornerFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <span aria-hidden className="absolute top-0 left-0 w-3 h-3 border-t border-l border-ink" />
      <span aria-hidden className="absolute top-0 right-0 w-3 h-3 border-t border-r border-ink" />
      <span aria-hidden className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-ink" />
      <span aria-hidden className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-ink" />
      {children}
    </div>
  );
}

/** Tone chip — small pill showing the accent color + label */
export function ToneChip({
  tone,
  label,
}: {
  tone: "forest" | "vermillion" | "ochre" | "ink";
  label?: string;
}) {
  const bg = {
    forest: "bg-forest",
    vermillion: "bg-vermillion",
    ochre: "bg-ochre",
    ink: "bg-ink",
  }[tone];
  return (
    <span className="inline-flex items-center gap-2 small-caps text-[10px] tracking-[0.25em] text-ink-muted">
      <span className={`inline-block w-2 h-2 ${bg}`} aria-hidden />
      {label ?? tone}
    </span>
  );
}
