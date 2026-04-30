import Link from "next/link";
import { META_APPROVAL } from "@/lib/verification";

/**
 * Rectangular authorized-partner emblem.
 * Postage-seal anatomy: framed Instagram glyph on the left, minimal
 * stacked typography on the right, four corner brackets, animated
 * gold shimmer along the top edge, and a faint Roman-year watermark
 * in the upper-right that rewards close inspection. Used in the hero
 * (as a first-impression trust signal) and in the footer (as the
 * closing credential anchor).
 */
export function AuthorizedBadge() {
  return (
    <Link
      href="/verification"
      className="nc-badge group relative inline-flex items-stretch gap-0 rounded-xl transition-all duration-500 hover:-translate-y-px"
    >
      <span className="nc-badge-shimmer" aria-hidden />
      <span className="nc-badge-corner nc-badge-corner-tl" aria-hidden />
      <span className="nc-badge-corner nc-badge-corner-tr" aria-hidden />
      <span className="nc-badge-corner nc-badge-corner-bl" aria-hidden />
      <span className="nc-badge-corner nc-badge-corner-br" aria-hidden />

      <span aria-hidden className="nc-badge-watermark">
        {META_APPROVAL.yearRoman}
      </span>

      <span className="nc-badge-emblem relative">
        {/* Stroke alpha lowered from 0.95 → 0.65 so the glyph reads as
            etched rather than printed. Hover bumps it back up via the
            drop-shadow filter on the parent. */}
        <svg width="26" height="26" viewBox="0 0 14 14" aria-hidden>
          <rect
            x="1.5"
            y="1.5"
            width="11"
            height="11"
            rx="3"
            ry="3"
            fill="none"
            stroke="rgba(231,206,148,0.65)"
            strokeWidth="0.85"
          />
          <circle
            cx="7"
            cy="7"
            r="2.7"
            fill="none"
            stroke="rgba(231,206,148,0.65)"
            strokeWidth="0.85"
          />
          <circle cx="10.4" cy="3.6" r="0.6" fill="rgba(231,206,148,0.65)" />
        </svg>
      </span>

      <span aria-hidden className="nc-badge-divide" />

      <span className="nc-badge-body relative z-[1]">
        <span className="small-caps text-[10.5px] tracking-[0.34em] text-gold/80 leading-none group-hover:text-gold transition-colors">
          Authorized
        </span>
        <span className="small-caps text-[10.5px] tracking-[0.34em] text-gold/55 leading-none mt-1.5 group-hover:text-gold/80 transition-colors">
          Partner
        </span>
        <span className="font-mono-numeric text-[9.5px] tracking-[0.18em] text-gold/35 leading-none mt-3 group-hover:text-gold/70 transition-colors">
          № {META_APPROVAL.partnerRef}
        </span>
      </span>
    </Link>
  );
}
