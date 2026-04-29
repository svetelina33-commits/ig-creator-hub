import Link from "next/link";
import { MetaSeal } from "./MetaSeal";
import { META_APPROVAL } from "@/lib/verification";

type Variant = "compact" | "full";

type Props = {
  variant?: Variant;
  className?: string;
};

/* ════════════════════════════════════════════════════════════════════════════
   MetaCredential — the registered-firm credential card.
   Posture: gold-stamped, banknote-engraved, document-grade density.
   Used on the home page (compact) and as the hero of /verification (full).
   ════════════════════════════════════════════════════════════════════════════ */
export function MetaCredential({ variant = "full", className = "" }: Props) {
  const isFull = variant === "full";

  return (
    <article
      className={`relative overflow-hidden rounded-[18px] ${className}`}
      style={{
        background:
          "linear-gradient(180deg, rgba(28,22,14,0.85) 0%, rgba(14,12,10,0.92) 50%, rgba(9,9,12,0.95) 100%)",
        boxShadow:
          "inset 0 1px 0 rgba(231,206,148,0.18), 0 30px 80px -30px rgba(0,0,0,0.8), 0 0 0 1px rgba(231,206,148,0.18)",
      }}
    >
      {/* Guilloché engraving — the banknote tell */}
      <Guilloche />

      {/* Soft gold ambient at upper-left (raking light) */}
      <span
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 40% at 8% 0%, rgba(231,206,148,0.16), transparent 60%), radial-gradient(ellipse 70% 50% at 100% 110%, rgba(231,206,148,0.08), transparent 65%)",
        }}
      />

      {/* ───────── Top header strip ───────── */}
      <header
        className="relative px-5 sm:px-8 py-3 flex items-center justify-between gap-4 flex-wrap"
        style={{
          borderBottom: "1px solid rgba(231,206,148,0.22)",
          background:
            "linear-gradient(90deg, rgba(231,206,148,0) 0%, rgba(231,206,148,0.08) 50%, rgba(231,206,148,0) 100%)",
        }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <DiamondMark />
          <span className="font-mono-numeric text-[9.5px] sm:text-[10px] tracking-[0.32em] text-gold/90 uppercase truncate">
            Instagram Graph API
            <span className="text-gold/40 mx-2">·</span>
            Authorized Partner Register
            <span className="text-gold/40 mx-2 hidden sm:inline">·</span>
            <span className="hidden sm:inline">{META_APPROVAL.yearRoman}</span>
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="block w-1.5 h-1.5 rounded-full bg-gold"
            style={{ boxShadow: "0 0 6px rgba(231,206,148,0.7)" }}
          />
          <span className="font-mono-numeric text-[9.5px] tracking-[0.32em] text-gold/85 uppercase">
            Issued · {META_APPROVAL.approvedOnDisplay}
          </span>
        </div>
      </header>

      {/* ───────── Hero block ───────── */}
      <section
        className={`relative px-5 sm:px-8 ${isFull ? "py-9 sm:py-12" : "py-7 sm:py-9"}`}
      >
        <div
          className={`grid grid-cols-1 ${
            isFull ? "lg:grid-cols-12" : "md:grid-cols-12"
          } gap-7 lg:gap-10 items-center`}
        >
          {/* Seal anchor */}
          <div
            className={`${
              isFull ? "lg:col-span-3" : "md:col-span-3"
            } flex justify-center md:justify-start`}
          >
            <MetaSeal size={isFull ? "xl" : "lg"} />
          </div>

          {/* Headline + agency name */}
          <div
            className={`${
              isFull ? "lg:col-span-9" : "md:col-span-9"
            } min-w-0`}
          >
            <div className="font-mono-numeric text-[10px] tracking-[0.32em] text-gold/80 uppercase mb-3 flex items-center gap-2">
              <span aria-hidden>◆</span>
              <span>Authorized · Partner</span>
              <span aria-hidden className="text-gold/30">·</span>
              <span className="text-ink-faint">№ {META_APPROVAL.partnerRef}</span>
            </div>

            <h2
              className={`font-serif-display ${
                isFull
                  ? "text-[clamp(2.4rem,4.4vw,4.6rem)]"
                  : "text-[clamp(2rem,3.2vw,3.2rem)]"
              } text-ink leading-[0.95] tracking-tight`}
            >
              <span className="font-serif-italic text-gold/95">
                {META_APPROVAL.holderName}
              </span>
            </h2>

            <p
              className={`mt-4 ${
                isFull ? "text-[15px]" : "text-[13.5px]"
              } leading-[1.65] text-ink-soft font-serif-book max-w-2xl`}
            >
              is on the {META_APPROVAL.programName} of{" "}
              <span className="font-serif-italic text-ink">Meta&apos;s</span>{" "}
              {META_APPROVAL.apiName} program.
              {isFull && (
                <>
                  {" "}
                  Issued under {META_APPROVAL.programLong} on{" "}
                  {META_APPROVAL.approvedOnDisplay}, and recorded against the
                  reference number listed below.
                </>
              )}
            </p>

            {!isFull && (
              <p className="mt-3 small-caps text-[10px] tracking-[0.28em] text-ink-faint">
                Issued by {META_APPROVAL.reviewer}
                <span className="text-ink-ghost mx-2">·</span>
                Holder: {META_APPROVAL.holderEntity}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ───────── Credential grid ───────── */}
      <section
        className="relative grid grid-cols-2 md:grid-cols-3 gap-px"
        style={{
          background: "rgba(231,206,148,0.15)",
          borderTop: "1px solid rgba(231,206,148,0.22)",
          borderBottom: "1px solid rgba(231,206,148,0.22)",
        }}
      >
        <Field
          kicker="Holder"
          value={META_APPROVAL.holderName}
          sub={META_APPROVAL.holderJurisdiction}
        />
        <Field
          kicker="Issuer"
          value={META_APPROVAL.issuer.name}
          sub={META_APPROVAL.issuer.program}
        />
        <Field
          kicker="Reference"
          value={`№ ${META_APPROVAL.partnerRef}`}
          sub={META_APPROVAL.programName}
          mono
          accent
        />
        {isFull && (
          <>
            <Field
              kicker="Programme"
              value={`${META_APPROVAL.apiName} · ${META_APPROVAL.apiVersion}+`}
              sub={META_APPROVAL.loginType}
              mono
            />
            <Field
              kicker="Issued"
              value={META_APPROVAL.approvedOnDisplay}
              sub={META_APPROVAL.approvedOnRoman}
              mono
            />
            <Field
              kicker="Scope"
              value="Business · Comments · Publish"
              sub={`${META_APPROVAL.scopes.length} permissions on file`}
            />
          </>
        )}
      </section>

      {/* ───────── Bottom action strip ───────── */}
      <footer
        className="relative px-5 sm:px-8 py-3.5 flex items-center justify-between gap-4 flex-wrap"
        style={{
          background:
            "linear-gradient(90deg, rgba(231,206,148,0) 0%, rgba(231,206,148,0.05) 50%, rgba(231,206,148,0) 100%)",
        }}
      >
        <div className="flex items-center gap-3 small-caps text-[10px] tracking-[0.3em] text-ink-faint">
          <span aria-hidden className="font-mono-numeric tracking-[0.18em] text-gold/70">
            00·{META_APPROVAL.partnerRef}·{META_APPROVAL.yearRoman}
          </span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={META_APPROVAL.metaPermissionsRef}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 small-caps text-[10px] tracking-[0.3em] text-gold/85 hover:text-gold transition-colors"
          >
            Verify this credential
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              ↗
            </span>
          </a>
          <span aria-hidden className="text-gold/25">·</span>
          <Link
            href={isFull ? "/how-it-works" : "/verification"}
            className="group flex items-center gap-2 small-caps text-[10px] tracking-[0.3em] text-ink-muted hover:text-ink-soft transition-colors"
          >
            {isFull ? "How it works" : "Read the letter"}
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </footer>
    </article>
  );
}

/* ════════════ subordinate parts ════════════ */

function Field({
  kicker,
  value,
  sub,
  mono,
  accent,
}: {
  kicker: string;
  value: string;
  sub: string;
  mono?: boolean;
  accent?: boolean;
}) {
  const valueClass = `${
    mono ? "font-mono-numeric tracking-[0.04em]" : "font-serif-book"
  } ${accent ? "text-gold" : "text-ink"}`;
  return (
    <div
      className="px-5 sm:px-7 py-4 sm:py-5"
      style={{ background: "rgba(14,12,10,0.85)" }}
    >
      <div className="small-caps text-[9.5px] tracking-[0.32em] text-gold/65 mb-1.5">
        {kicker}
      </div>
      <div className={`text-[14.5px] leading-[1.4] ${valueClass}`}>{value}</div>
      <div className="mt-1 small-caps text-[9px] tracking-[0.28em] text-ink-faint">
        {sub}
      </div>
    </div>
  );
}

/* Tiny diamond mark used in the header strip — references the seal vocabulary
   without reproducing any third-party brand. */
function DiamondMark() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden
      className="shrink-0"
    >
      <g transform="translate(7,7)">
        <rect
          x="-4"
          y="-4"
          width="8"
          height="8"
          transform="rotate(45)"
          fill="none"
          stroke="rgba(231,206,148,0.85)"
          strokeWidth="0.7"
        />
        <rect
          x="-2"
          y="-2"
          width="4"
          height="4"
          transform="rotate(45)"
          fill="rgba(231,206,148,0.85)"
        />
      </g>
    </svg>
  );
}

/* Banknote-grade guilloché etched into the card. SVG pattern of phase-shifted
   sine waves at low opacity — the single detail that tips the design from
   "trying to look legit" to "actually looks like a printed credential." */
function Guilloche() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.85 }}
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="nc-guilloche-mc"
          x="0"
          y="0"
          width="60"
          height="14"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0,7 Q15,0 30,7 T60,7"
            fill="none"
            stroke="rgba(231,206,148,0.075)"
            strokeWidth="0.7"
          />
          <path
            d="M0,9 Q15,2 30,9 T60,9"
            fill="none"
            stroke="rgba(231,206,148,0.05)"
            strokeWidth="0.6"
          />
          <path
            d="M0,5 Q15,12 30,5 T60,5"
            fill="none"
            stroke="rgba(231,206,148,0.04)"
            strokeWidth="0.5"
          />
        </pattern>
        <pattern
          id="nc-guilloche-mc-fine"
          x="0"
          y="0"
          width="3"
          height="3"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1.5" cy="1.5" r="0.18" fill="rgba(231,206,148,0.04)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#nc-guilloche-mc-fine)" />
      <rect width="100%" height="100%" fill="url(#nc-guilloche-mc)" />
    </svg>
  );
}
