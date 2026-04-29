import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Copyright Policy · Nexus Club",
  description:
    "How to file a copyright notice, how a counter-notice is handled, and how repeat infringers are treated.",
};

export default function CopyrightPage() {
  return (
    <>
      <Masthead />
      <main className="px-6 sm:px-10">
        <article className="mx-auto max-w-3xl py-12 sm:py-16">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                Colophon · Copyright
              </p>
              <h1 className="mt-3 font-serif-display text-5xl sm:text-6xl leading-none">
                <span className="font-serif-italic">Copyright</span>, kept honest.
              </h1>
            </div>
            <span className="font-mono-numeric text-[11px] text-ink-faint">
              Rev. 2026-04-30
            </span>
          </div>

          <p className="mb-10 text-[16px] leading-[1.75] text-ink-muted font-serif-book">
            We respect the rights of authors. The procedures below mirror the United
            States Digital Millennium Copyright Act (17 U.S.C. § 512) and apply equally
            to creators, brands, and any third party with a legitimate claim to a work.
            We answer in writing.
          </p>

          <div className="space-y-8 text-[16px] leading-[1.75] text-ink">
            <Section n="I" title="What this policy covers">
              <p>
                Anything published, hosted, or scheduled through the Nexus Club platform —
                campaign posts on Instagram, dispatches on this site, member profile
                copy, application material, brand assets in a brief. If you hold rights
                in a work that appears in any of these places without your authorization,
                this is the route to remove it.
              </p>
            </Section>

            <Section n="II" title="Filing a notice">
              <p>
                Send a written notice to our designated agent at{" "}
                <a className="link-ed" href="mailto:copyright@thenexusclub.org">
                  copyright@thenexusclub.org
                </a>
                . The notice must include, at minimum:
              </p>
              <ol className="mt-3 space-y-2 list-decimal list-outside pl-5 text-ink-muted">
                <li>
                  Identification of the copyrighted work claimed to have been infringed.
                </li>
                <li>
                  The exact location of the material on the platform — a URL is best.
                </li>
                <li>Your contact information: name, address, email, telephone.</li>
                <li>
                  A statement that you have a good-faith belief the use is not authorized
                  by the rights holder, an agent, or the law.
                </li>
                <li>
                  A statement, under penalty of perjury, that the information in the
                  notice is accurate and that you are the rights holder or are authorized
                  to act on the rights holder's behalf.
                </li>
                <li>Your physical or electronic signature.</li>
              </ol>
              <p className="mt-3">
                Knowingly material misrepresentations in a notice can expose the sender
                to liability under § 512(f). Please make sure the work and the use are
                what you believe they are.
              </p>
            </Section>

            <Section n="III" title="What happens after we receive a notice">
              <p>
                We act expeditiously. The material is removed or disabled, the member or
                brand who posted it is notified with a copy of the notice, and we record
                the matter in our internal log. Removal is not a finding of guilt — it is
                a reset to a state both parties can argue from in good faith.
              </p>
            </Section>

            <Section n="IV" title="Counter-notice">
              <p>
                If you believe material was removed in error, file a counter-notice with
                our designated agent at{" "}
                <a className="link-ed" href="mailto:copyright@thenexusclub.org">
                  copyright@thenexusclub.org
                </a>
                . The counter-notice must identify the material, include your contact
                information, a statement under penalty of perjury that you have a
                good-faith belief the removal was a mistake or misidentification, and your
                consent to the jurisdiction of the federal district court for your address.
              </p>
              <p className="mt-3">
                If we receive a valid counter-notice, we forward it to the original
                claimant. If the claimant does not file a court action within 10–14
                business days, the material is restored.
              </p>
            </Section>

            <Section n="V" title="Repeat infringers">
              <p>
                Membership and brand accounts that repeatedly infringe the rights of
                others are terminated. Repeat is a question of pattern, not count — three
                separate, valid notices, or a smaller number where the pattern is plain.
              </p>
            </Section>

            <Section n="VI" title="Designated agent">
              <p>
                Notices and counter-notices are read by the designated agent at the
                address below. Notices sent elsewhere — to the editor, to support, to a
                member directly — are forwarded but slow the process.
              </p>
              <div
                className="mt-5 rounded-2xl px-6 py-5"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(20,18,14,0.7) 0%, rgba(12,11,9,0.85) 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(231,206,148,0.08), 0 0 0 1px rgba(231,206,148,0.1)",
                }}
              >
                <div className="small-caps text-[10px] tracking-[0.3em] text-gold/75 mb-3">
                  Designated Agent
                </div>
                <div className="font-serif-display text-xl text-ink leading-tight">
                  c/o The Nexus Club Agency
                </div>
                <dl className="mt-4 space-y-2 text-[13px] text-ink-muted font-serif-book">
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="small-caps text-[10px] tracking-[0.3em] text-ink-faint">
                      Email
                    </dt>
                    <dd className="font-mono-numeric text-ink-soft">
                      copyright@thenexusclub.org
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <dt className="small-caps text-[10px] tracking-[0.3em] text-ink-faint">
                      Postal
                    </dt>
                    <dd className="font-serif-book text-ink-soft text-right">
                      Registered address on file
                      <br />
                      <span className="font-mono-numeric text-[11px] text-ink-faint">
                        — provided to claimants on written request
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </Section>
          </div>

          <div className="mt-16 hairline-top pt-6 flex items-center justify-between text-[11px] small-caps tracking-[0.25em] text-ink-muted">
            <Link href="/terms" className="hover:text-ink">
              ← Terms of service
            </Link>
            <Link href="/privacy" className="hover:text-ink">
              Privacy policy →
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
