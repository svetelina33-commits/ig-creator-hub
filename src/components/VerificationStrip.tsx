import Link from "next/link";
import { MetaSeal } from "./MetaSeal";
import { META_APPROVAL } from "@/lib/verification";

/* Editorial trust strip — three-column ledger anchored by the MetaSeal.
   Slots between the manifesto and the "Now commissioning" slider on the
   home page. Click-through to /verification for the full certificate. */
export function VerificationStrip() {
  return (
    <section className="px-5 sm:px-10 pb-6 sm:pb-10 pt-2">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/verification"
          className="group block focus:outline-none focus-visible:ring-1 focus-visible:ring-forest/40 rounded-2xl"
        >
          <div className="glass glass-hover rounded-2xl px-5 sm:px-8 py-6 sm:py-7 relative overflow-hidden">
            {/* Faint forest-cyan gutter on the leading edge — a quiet 'live' tell */}
            <span
              aria-hidden
              className="absolute left-0 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-forest/45 to-transparent"
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              {/* Anchor: seal + title */}
              <div className="lg:col-span-5 flex items-center gap-5">
                <MetaSeal size="md" />
                <div className="min-w-0">
                  <div className="small-caps text-[10px] tracking-[0.32em] text-forest">
                    ◆ Verified · in good standing
                  </div>
                  <div className="mt-1.5 font-serif-display text-[28px] sm:text-[32px] text-ink leading-[1.04]">
                    Approved by{" "}
                    <span className="font-serif-italic text-ink-soft">Meta</span>{" "}
                    App Review.
                  </div>
                  <div className="mt-1.5 small-caps text-[10px] tracking-[0.28em] text-ink-muted">
                    {META_APPROVAL.loginType}
                    <span className="text-ink-faint mx-2">·</span>
                    Ref. {META_APPROVAL.partnerRef}
                  </div>
                </div>
              </div>

              {/* Vertical divider — desktop only */}
              <span
                aria-hidden
                className="hidden lg:block lg:col-span-px h-16 w-px bg-hairline-strong justify-self-center"
              />

              {/* Three-column ledger of integration claims */}
              <ul className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                <Field
                  index="01"
                  kicker="Integration"
                  body="Official Instagram Graph API. Authentication via Meta's own consent screen — never credential capture."
                />
                <Field
                  index="02"
                  kicker="Posture"
                  body="Tokens encrypted at rest with AES-256-GCM. TLS 1.3 in flight. Zero password storage, ever."
                />
                <Field
                  index="03"
                  kicker="Revocation"
                  body="One tap from your Instagram security settings. Access closes automatically at campaign delivery."
                />
              </ul>

              {/* CTA — desktop trailing arrow */}
              <div className="lg:col-span-12 flex items-center justify-end gap-2 small-caps text-[10px] tracking-[0.3em] text-ink-muted group-hover:text-forest transition-colors pt-2 lg:pt-0">
                <span>Read the certificate</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

function Field({
  index,
  kicker,
  body,
}: {
  index: string;
  kicker: string;
  body: string;
}) {
  return (
    <li className="relative">
      <div className="flex items-baseline gap-3 mb-1.5">
        <span className="font-mono-numeric text-[9.5px] tracking-[0.22em] text-ink-faint">
          §{index}
        </span>
        <span className="small-caps text-[10px] tracking-[0.28em] text-ink-soft">
          {kicker}
        </span>
      </div>
      <p className="text-[12.5px] leading-[1.55] text-ink-muted font-serif-book">
        {body}
      </p>
    </li>
  );
}
