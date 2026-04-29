import Link from "next/link";
import { MetaCredential } from "./MetaCredential";

/* Homepage placement of the credential card.
   Slots between the manifesto and "Now commissioning". */
export function VerificationStrip() {
  return (
    <section className="px-5 sm:px-10 pt-12 pb-8 sm:pb-14">
      <div className="mx-auto max-w-7xl">
        {/* Editorial flourish — fades from transparent to gold-tinged
            hairline with a small diamond ornament centered. Reads as
            a chapter break before the credential card. */}
        <div className="nc-flourish-gold relative mb-10" aria-hidden>
          <span className="nc-flourish-gold-mark" />
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
