import Link from "next/link";
import { MetaCredential } from "./MetaCredential";

/* Homepage placement of the credential card.
   Slots between the manifesto and "Now commissioning". */
export function VerificationStrip() {
  return (
    <section className="px-5 sm:px-10 pt-12 pb-8 sm:pb-14">
      <div className="mx-auto max-w-7xl">
        {/* Editorial flourish — symmetric fade-in/out from both edges
            with a centered diamond ornament. Flex layout guarantees the
            diamond sits at the optical centre regardless of parent
            stacking-context quirks. */}
        <div
          aria-hidden
          className="mb-10 flex items-center justify-center gap-4"
        >
          <span className="nc-flourish-segment-left flex-1" />
          <span className="nc-flourish-diamond" />
          <span className="nc-flourish-segment-right flex-1" />
        </div>

        <div className="flex items-baseline justify-between gap-4 mb-5">
          <span className="small-caps text-[10px] tracking-[0.3em] text-ink-faint">
            On record · authorized partner
          </span>
          <Link
            href="/verification"
            className="small-caps text-[10px] tracking-[0.3em] text-ink-muted hover:text-gold transition-colors"
          >
            View letter →
          </Link>
        </div>
        <Link
          href="/verification"
          className="block group transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1"
        >
          <MetaCredential variant="compact" />
        </Link>
      </div>
    </section>
  );
}
