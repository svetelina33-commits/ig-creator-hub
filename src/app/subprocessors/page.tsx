import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Subprocessors · Nexus Club",
  description:
    "The vendors that touch member or brand data on our behalf — what they do, what they see, where they sit.",
};

type Sub = {
  name: string;
  purpose: string;
  touches: string;
  region: string;
  href: string;
};

const SUBS: Sub[] = [
  {
    name: "Vercel",
    purpose: "Application hosting, edge runtime, build pipeline.",
    touches:
      "Every page request transits Vercel's edge. No content is stored beyond the cache window stated in the privacy policy.",
    region: "Global edge · primary US/EU",
    href: "https://vercel.com/legal/privacy-policy",
  },
  {
    name: "Neon",
    purpose: "Primary application database (Postgres, serverless).",
    touches:
      "Member records, encrypted access tokens, applications, campaigns, support tickets, withdrawal requests.",
    region: "AWS · ap-south-1 (primary), backups in same region",
    href: "https://neon.com/privacy-policy",
  },
  {
    name: "Resend",
    purpose: "Transactional email delivery.",
    touches:
      "Recipient email address and the body of welcomes, application updates, and password-reset notices we send.",
    region: "US",
    href: "https://resend.com/legal/privacy-policy",
  },
  {
    name: "Vercel Blob",
    purpose: "File storage for support-ticket attachments.",
    touches: "Files a member voluntarily attaches when filing a support ticket.",
    region: "AWS · multi-region via Vercel",
    href: "https://vercel.com/legal/privacy-policy",
  },
  {
    name: "Stripe",
    purpose: "Payouts to creator bank accounts (when enabled).",
    touches:
      "Name, government ID, banking detail you submit through Stripe's own onboarding. Nexus Club never sees the bank account number itself.",
    region: "Global · processed per Stripe Connect terms",
    href: "https://stripe.com/privacy",
  },
  {
    name: "Google",
    purpose: "OAuth authentication for Gmail send (creator-side, optional).",
    touches:
      "OAuth tokens with the gmail.send scope. We cannot read the inbox, drafts, or sent folder.",
    region: "Global · per Google Cloud terms",
    href: "https://policies.google.com/privacy",
  },
  {
    name: "Meta Platforms",
    purpose:
      "Instagram Graph API authorization for campaign publishing (creator-side, opt-in per campaign).",
    touches:
      "OAuth tokens scoped to instagram_business_basic, instagram_business_manage_comments, instagram_business_content_publish — for the campaign window only.",
    region: "Global · per Meta platform terms",
    href: "https://www.facebook.com/privacy/policy/",
  },
];

export default function SubprocessorsPage() {
  return (
    <>
      <Masthead />
      <main className="px-6 sm:px-10">
        <article className="mx-auto max-w-4xl py-12 sm:py-16">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                Colophon · Subprocessors
              </p>
              <h1 className="mt-3 font-serif-display text-5xl sm:text-6xl leading-none">
                The hands{" "}
                <span className="font-serif-italic">that touch the desk.</span>
              </h1>
            </div>
            <span className="font-mono-numeric text-[11px] text-ink-faint">
              Rev. 2026-04-30
            </span>
          </div>

          <p className="mb-12 text-[16px] leading-[1.75] text-ink-muted font-serif-book max-w-2xl">
            We use a small set of trusted vendors to run the platform. Each is named
            below with what it does, what it sees, and where it sits. New subprocessors
            are added to this list before they are wired in — never after.
          </p>

          <ul className="space-y-6">
            {SUBS.map((s, i) => (
              <li
                key={s.name}
                className="rounded-2xl px-6 py-6 sm:px-8 sm:py-7 hairline-top first:hairline-top-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(20,18,24,0.55) 0%, rgba(12,11,16,0.7) 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(255,255,255,0.06)",
                }}
              >
                <div className="grid grid-cols-12 gap-4 sm:gap-6 items-start">
                  <div className="col-span-12 sm:col-span-3">
                    <div className="small-caps text-[10px] tracking-[0.3em] text-ink-faint">
                      № {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-2 font-serif-display text-2xl text-ink leading-tight">
                      {s.name}
                    </div>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block font-mono-numeric text-[10.5px] tracking-[0.16em] text-ink-faint hover:text-violet transition-colors"
                    >
                      Privacy policy →
                    </a>
                  </div>
                  <div className="col-span-12 sm:col-span-9 space-y-3">
                    <p className="font-serif-italic text-[15px] text-ink-soft leading-snug">
                      {s.purpose}
                    </p>
                    <p className="text-[14.5px] leading-[1.7] text-ink-muted font-serif-book">
                      {s.touches}
                    </p>
                    <div className="pt-1">
                      <span className="small-caps text-[10px] tracking-[0.28em] text-ink-faint">
                        Region —
                      </span>{" "}
                      <span className="font-mono-numeric text-[12px] text-ink-soft tracking-[0.04em]">
                        {s.region}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <section className="mt-14 hairline-top pt-8">
            <div className="small-caps text-[10px] tracking-[0.3em] text-ink-faint mb-3">
              Notification
            </div>
            <p className="text-[15.5px] leading-[1.7] text-ink-muted font-serif-book max-w-2xl">
              Material additions to this list are dated above. If you are a brand on a
              Data Processing Addendum and wish to be notified before a new subprocessor
              is engaged, write to{" "}
              <a className="link-ed" href="mailto:dpa@thenexusclub.org">
                dpa@thenexusclub.org
              </a>{" "}
              and we will add you to the list.
            </p>
          </section>

          <div className="mt-16 hairline-top pt-6 flex items-center justify-between text-[11px] small-caps tracking-[0.25em] text-ink-muted">
            <Link href="/privacy" className="hover:text-ink">
              ← Privacy policy
            </Link>
            <Link href="/dpa" className="hover:text-ink">
              Data processing addendum →
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
