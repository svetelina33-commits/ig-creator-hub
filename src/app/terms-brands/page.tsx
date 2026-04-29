import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Terms · Brands · Nexus Club",
  description:
    "The standing terms a brand agrees to when commissioning a campaign through The Nexus Club. Editorial in voice, exact in obligation.",
};

export default function TermsBrandsPage() {
  return (
    <>
      <Masthead />
      <main className="px-6 sm:px-10">
        <article className="mx-auto max-w-3xl py-12 sm:py-16">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                Colophon · Brand Terms
              </p>
              <h1 className="mt-3 font-serif-display text-5xl sm:text-6xl leading-none">
                For{" "}
                <span className="font-serif-italic">brands</span>, in writing.
              </h1>
            </div>
            <span className="font-mono-numeric text-[11px] text-ink-faint">
              Rev. 2026-04-30
            </span>
          </div>

          <p className="mb-10 text-[16px] leading-[1.75] text-ink-muted font-serif-book">
            These terms are the standing form of the agreement a brand signs when it
            commissions a campaign through Nexus Club. They sit alongside, and are
            referenced by, the per-campaign brief. Where a brief and these terms
            disagree, the brief governs the campaign at hand; these terms govern
            everything not written into the brief.
          </p>

          <div className="space-y-8 text-[16px] leading-[1.75] text-ink">
            <Section n="I" title="Who you are signing with">
              <p>
                The Nexus Club Agency is the editorial and commercial counterparty.
                Members on the platform are independent creators, not employees of the
                agency, and your contract for any campaign is with the agency unless a
                brief states otherwise. Members are bound to the agency through their
                membership and to the campaign through the brief.
              </p>
            </Section>

            <Section n="II" title="What a campaign is">
              <p>
                A campaign is the deliverable described in the brief — posts, stories,
                reels, captions, comments, replies — bound to the publishing window the
                brief names. Anything not named in the brief is not in scope. Re-scoping
                mid-flight is in writing only and is paid against the agreed margin.
              </p>
            </Section>

            <Section n="III" title="Payment & schedule">
              <p>
                Campaign fees are flat and stated in the brief. Invoicing is on
                kickoff; payment is due net-fifteen unless the brief names another
                window. The schedule below is the standing form:
              </p>
              <ol className="mt-3 space-y-2 list-decimal list-outside pl-5 text-ink-muted">
                <li>Brief signed → invoice issued (day 0).</li>
                <li>Member confirms receipt and opens the publishing window (day 1–3).</li>
                <li>Campaign delivers per the brief (within the named window).</li>
                <li>
                  Payment due to the agency — net-fifteen from invoice, unless the
                  brief shortens or extends the window.
                </li>
              </ol>
              <p className="mt-3">
                If a brand's payment is delayed beyond day fifteen, the agency fronts
                the member's stated payout from its own treasury per the{" "}
                <Link href="/disputes" className="link-ed">
                  disputes policy
                </Link>{" "}
                — the member is paid on time regardless. Brand-side late payment may
                accrue interest at the prevailing commercial rate after a written
                grace period; outright non-payment terminates standing on the brand
                side and is a matter for the agency's collection counsel.
              </p>
            </Section>

            <Section n="IV" title="Disclosure compliance">
              <p>
                Posts published through Nexus Club carry the disclosure required by the
                holder's jurisdiction, plainly and above the fold, per our{" "}
                <Link href="/standards" className="link-ed">
                  Editorial Standards
                </Link>
                . Brands agree not to ask a member to bury, weaken, omit, or backdate a
                disclosure. A request to do so is a breach of these terms and ends the
                campaign without refund.
              </p>
            </Section>

            <Section n="V" title="IP &amp; licence">
              <p>
                The member retains copyright in the work they create. The brand
                receives a perpetual, non-exclusive licence to use the campaign
                deliverables for the purposes named in the brief — typically: the
                campaign post itself; reposting on the brand's owned channels for
                ninety days; case-study use with attribution. Paid media uses, dark
                posts, and likeness usage outside owned channels are negotiated
                separately and named in the brief.
              </p>
            </Section>

            <Section n="VI" title="Exclusivity">
              <p>
                Where the brief asks for category exclusivity, it must name a category,
                a window, and a geography. Open-ended or industry-wide exclusivity is
                not in scope. Reasonable category exclusivity for the publishing
                window is the standing default; outside the window, members are free
                to take other work.
              </p>
            </Section>

            <Section n="VII" title="Removal &amp; takedown">
              <p>
                Posts that have been published as part of a campaign cannot be silently
                un-published by either party after the window closes. Removal requested
                by the brand is a chargeable change order; removal initiated by the
                member follows the disputes path. Removal compelled by law (a regulator,
                a court order) is recorded and communicated to both parties.
              </p>
            </Section>

            <Section n="VIII" title="Confidentiality">
              <p>
                Briefs, member identities prior to public assignment, payout figures,
                and brand-supplied assets are confidential. The brand shall not share
                member identities outside the small set of brand-side approvers named
                in the brief. The same expectation runs in the other direction —
                members are bound by the{" "}
                <Link href="/terms" className="link-ed">
                  member non-disclosure clause
                </Link>{" "}
                in the creator-side terms.
              </p>
            </Section>

            <Section n="IX" title="Indemnity">
              <p>
                The brand indemnifies the agency and the member against claims arising
                from brand-supplied assets, brand-required claims, and the brand's
                use of the campaign deliverables outside the licence granted. The
                agency indemnifies the brand against claims arising from the agency's
                breach of these terms. Each side is responsible for its own
                wrongdoing; neither indemnifies the other against its own.
              </p>
            </Section>

            <Section n="X" title="Term &amp; termination">
              <p>
                These terms govern from signature of the first brief through the
                completion of the last live campaign. Either party may decline to
                sign further briefs at any time. Termination of an in-flight campaign
                follows the dispute and removal sections above.
              </p>
            </Section>

            <Section n="XI" title="Disputes">
              <p>
                Disagreements travel the path described in the{" "}
                <Link href="/disputes" className="link-ed">
                  Disputes policy
                </Link>
                : written notice, direct exchange, editorial review, optional
                mediation, then binding arbitration in a recognised forum named in
                the brief. Nothing in these terms removes either party's right to
                seek injunctive relief in a court of competent jurisdiction.
              </p>
            </Section>

            <Section n="XII" title="Liability">
              <p>
                Neither party is liable for indirect, consequential, or punitive
                damages. Direct liability for any campaign is capped at the fees paid
                or payable for that campaign. The cap does not apply to liability for
                gross negligence, wilful misconduct, breach of confidentiality, or
                indemnification obligations.
              </p>
            </Section>

            <Section n="XIII" title="Contact">
              <p>
                Brand-side questions, prospective briefs, or amendment requests:{" "}
                <a className="link-ed" href="mailto:brands@thenexusclub.org">
                  brands@thenexusclub.org
                </a>
                . Disputes:{" "}
                <a className="link-ed" href="mailto:disputes@thenexusclub.org">
                  disputes@thenexusclub.org
                </a>
                . Notices and corrective actions on these terms are dated and
                published at this URL; brands on a long-running engagement receive
                written notice of material changes.
              </p>
            </Section>
          </div>

          <div className="mt-16 hairline-top pt-6 flex items-center justify-between text-[11px] small-caps tracking-[0.25em] text-ink-muted">
            <Link href="/terms" className="hover:text-ink">
              ← Creator terms
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
