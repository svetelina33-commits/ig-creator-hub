import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Terms of Service · Nexus Club",
};

export default function TermsPage() {
  return (
    <>
      <Masthead />
      <main className="px-6 sm:px-10">
        <article className="mx-auto max-w-3xl py-12 sm:py-16">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                Colophon · Terms
              </p>
              <h1 className="mt-3 font-serif-display text-5xl sm:text-6xl leading-none">
                <span className="font-serif-italic">Terms</span> of service.
              </h1>
            </div>
            <span className="font-mono-numeric text-[11px] text-ink-faint">
              Rev. 2026-04-20
            </span>
          </div>

          <div className="space-y-8 text-[16px] leading-[1.75] text-ink">
            <Section n="I" title="Who we are">
              <p>
                Nexus Club is a curated matchmaking layer between brands that commission
                creator work and creators who accept it. Operated at{" "}
                <a className="text-forest underline underline-offset-4" href="mailto:arcrxx@gmail.com">
                  arcrxx@gmail.com
                </a>
                .
              </p>
            </Section>

            <Section n="II" title="Membership">
              <p>
                Membership is free. You are responsible for what you post, for maintaining
                your Instagram account in good standing with Meta's own terms, and for any
                contracts you enter into directly with brands via Nexus Club.
              </p>
            </Section>

            <Section n="III" title="Instagram publishing rights">
              <p>
                When you are approved for a campaign and have connected Instagram, you
                grant Nexus Club the limited right to publish content to your Instagram
                account <em>for that campaign</em>, using the access token Meta issued
                with your consent. Publishing is logged to your dashboard and you may
                revoke access at any time.
              </p>
            </Section>

            <Section n="IV" title="What we won't do">
              <p>
                We will never capture your Instagram password, post content you haven't
                approved, or use your token for campaigns you haven't been approved for.
                If any posting issue arises, we pause the automation until you confirm.
              </p>
            </Section>

            <Section n="V" title="Payouts">
              <p>
                Campaign payouts are stated upfront per brief. Payment is owed by the
                commissioning brand and disbursed per the terms agreed in the brief.
              </p>
            </Section>

            <Section n="VI" title="Termination">
              <p>
                Either party may end membership at any time. Delete your account from
                your dashboard or write to{" "}
                <a className="text-forest underline underline-offset-4" href="mailto:arcrxx@gmail.com">
                  arcrxx@gmail.com
                </a>
                . Active campaigns you've committed to should be completed before leaving.
              </p>
            </Section>

            <Section n="VII" title="Liability">
              <p>
                The service is provided as-is. We make no warranty that the platform will
                be uninterrupted or error-free. Our liability is limited to the greatest
                extent permitted by law.
              </p>
            </Section>
          </div>

          <div className="mt-16 hairline-top pt-6 text-[11px] small-caps tracking-[0.25em] text-ink-muted">
            <Link href="/privacy" className="hover:text-forest">
              ← Read the privacy policy
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <header className="flex items-baseline gap-4 mb-3">
        <span className="font-mono-numeric text-[11px] text-ink-faint">§{n}</span>
        <h2 className="font-serif-display text-2xl text-ink">{title}</h2>
      </header>
      <div className="pl-8 text-ink-muted space-y-3">{children}</div>
    </section>
  );
}
