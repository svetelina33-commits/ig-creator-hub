import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RunningHead, CenteredRule } from "@/components/Ornaments";

export const metadata = {
  title: "Editorial Standards · Nexus Club",
  description:
    "How the desk reads briefs, how disclosure is required, where it must sit, and what is not enough — by jurisdiction.",
};

const JURISDICTIONS: {
  region: string;
  authority: string;
  rule: string;
  source: string;
  href: string;
}[] = [
  {
    region: "United States",
    authority: "Federal Trade Commission · 16 CFR Part 255",
    rule:
      "Any material connection — paid post, free product, affiliate link, family or employment tie — must be disclosed clearly and conspicuously, near the top of the post, in the same language as the post.",
    source: "FTC Endorsement Guides",
    href: "https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers",
  },
  {
    region: "India",
    authority: "Advertising Standards Council of India · 2021 Guidelines",
    rule:
      "Disclosure label must be upfront, prominent, in the same language as the post. Acceptable labels include #ad, #sponsored, #collab, #PaidPartnership; #thanks, #ambassador alone are not enough.",
    source: "ASCI Guidelines for Influencer Advertising",
    href: "https://www.ascionline.in/the-asci-code/influencer-guidelines/",
  },
  {
    region: "United Kingdom",
    authority:
      "Advertising Standards Authority · CAP Code · Competition and Markets Authority",
    rule:
      "Disclosure must be obvious from the start. The label #ad is the recognised standard. Buried disclosures in a hashtag stack do not meet the test.",
    source: "ASA Influencers' Guide",
    href: "https://www.asa.org.uk/resource/influencers-guide.html",
  },
  {
    region: "European Union",
    authority: "Unfair Commercial Practices Directive · per-state regulators",
    rule:
      "Commercial communication must be identifiable as such. Member states (Germany, France, Italy, Spain) may impose specific labelling — when working in-country, the local rule governs.",
    source: "UCPD 2005/29/EC",
    href: "https://commission.europa.eu/law/law-topic/consumer-protection-law/unfair-commercial-practices-law_en",
  },
  {
    region: "Canada",
    authority: "Ad Standards · Influencer Marketing Disclosure Guidelines",
    rule:
      "Material connection must be disclosed clearly, prominently, and in the same language as the post. #ad / #sponsored / #PaidPromo are accepted.",
    source: "Ad Standards Disclosure Guidelines",
    href: "https://adstandards.ca/preclearance/influencer-marketing-disclosure-guidelines/",
  },
  {
    region: "Australia",
    authority: "Australian Association of National Advertisers · AANA Code",
    rule:
      "Sponsored content must be obviously distinguishable as advertising. ACCC guidance on misleading practices applies in parallel.",
    source: "AANA Code of Ethics",
    href: "https://aana.com.au/self-regulation/codes-guidelines/code-of-ethics/",
  },
];

export default function StandardsPage() {
  return (
    <>
      <Masthead />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />

        {/* ───── Masthead ───── */}
        <section className="mx-auto max-w-6xl pt-12 sm:pt-20 pb-12 relative">
          <Reveal>
            <RunningHead
              left="THE NEXUS CLUB"
              center="· EDITORIAL STANDARDS ·"
              right="VOL. I · MMXXVI"
            />
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-8 font-serif-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-ink">
              The standards
              <br />
              <span className="font-serif-italic">of the desk.</span>
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-9 max-w-2xl text-[18px] leading-[1.7] text-ink-muted font-serif-book drop-cap">
              The club is defined by sponsored work, and sponsored work is governed by
              law. This document records the standing rules the desk follows when
              reading briefs and when guiding members through disclosure — so that the
              member is in good standing with the regulator of their jurisdiction, and
              so the brand knows what the post will look like before it goes live.
            </p>
          </Reveal>
          <Reveal delay={420}>
            <p className="mt-5 small-caps text-[10px] tracking-[0.32em] text-ink-faint">
              Rev. 2026-04-30 · Read in conjunction with the House Rules
            </p>
          </Reveal>
        </section>

        <CenteredRule className="mx-auto max-w-6xl" />

        {/* ───── §I Disclosure principles ───── */}
        <section className="mx-auto max-w-6xl pt-16 pb-20">
          <Reveal>
            <header className="grid grid-cols-12 gap-6 mb-10">
              <div className="col-span-12 md:col-span-3">
                <div className="small-caps text-[10px] tracking-[0.3em] text-gold/85">
                  § I · Disclosure
                </div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.05]">
                  Five principles of{" "}
                  <span className="font-serif-italic">honest labelling.</span>
                </h2>
              </div>
            </header>
          </Reveal>

          <ol className="space-y-9">
            {[
              {
                n: "01",
                t: "If there is a connection, there is a disclosure.",
                b: "Payment, gift, free product, free trip, affiliate link, family or employment tie — any of these is a material connection. Where there is one, there is a disclosure. The standard is the recipient's reasonable read, not the sender's stated intent.",
              },
              {
                n: "02",
                t: "Disclosure goes above the fold.",
                b: "The label sits at the top of the post — first line of the caption, first frame of the video, before the call to action. Disclosure that requires the reader to expand a caption, swipe to the end, or hover a hashtag does not meet the test.",
              },
              {
                n: "03",
                t: "Disclosure is in the same language as the post.",
                b: "An English caption requires an English disclosure. A Hindi caption requires a Hindi disclosure. The label belongs to the audience the post is written for; it does not get translated to the regulator's first language.",
              },
              {
                n: "04",
                t: "Disclosure is plain.",
                b: "#ad, #sponsored, #PaidPartnership, “in partnership with” — clear words clear of ambiguity. #thanks, #ambassador, #collab without a brand name, hashtags set in a thinner colour or buried in a stack of unrelated tags — these do not meet the test.",
              },
              {
                n: "05",
                t: "Synthetic content is labelled.",
                b: "Where AI-generated voice, likeness, or visual material appears in a post, it carries a label noting so — even when the synthesis is in the brief. The label sits with the disclosure, in the same plain words.",
              },
            ].map((p, idx) => (
              <Reveal key={p.n} delay={idx * 60}>
                <li className="grid grid-cols-12 gap-5 md:gap-8 hairline-top pt-7">
                  <div className="col-span-12 md:col-span-2">
                    <span className="font-mono-numeric text-[12px] tracking-[0.16em] text-violet/85">
                      § I·{p.n}
                    </span>
                  </div>
                  <div className="col-span-12 md:col-span-10">
                    <h3 className="font-serif-display text-2xl text-ink leading-tight">
                      {p.t}
                    </h3>
                    <p className="mt-3 text-[15.5px] leading-[1.75] text-ink-muted font-serif-book max-w-3xl">
                      {p.b}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        <CenteredRule className="mx-auto max-w-6xl" />

        {/* ───── §II Jurisdictions ───── */}
        <section className="mx-auto max-w-6xl pt-16 pb-20">
          <Reveal>
            <header className="grid grid-cols-12 gap-6 mb-10">
              <div className="col-span-12 md:col-span-3">
                <div className="small-caps text-[10px] tracking-[0.3em] text-gold/85">
                  § II · Jurisdiction
                </div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.05]">
                  By regulator,{" "}
                  <span className="font-serif-italic">in writing.</span>
                </h2>
                <p className="mt-5 max-w-2xl text-[15px] leading-[1.7] text-ink-muted font-serif-book">
                  The standing rule is the rule of the holder's jurisdiction — where the
                  member is based and the audience is being addressed. The desk reads
                  briefs against the rule below before the campaign opens.
                </p>
              </div>
            </header>
          </Reveal>

          <ul className="space-y-5">
            {JURISDICTIONS.map((j, idx) => (
              <Reveal key={j.region} delay={idx * 50}>
                <li
                  className="rounded-2xl px-6 py-6 sm:px-8 sm:py-7"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(20,18,28,0.55) 0%, rgba(12,11,18,0.7) 100%)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="grid grid-cols-12 gap-4 sm:gap-6 items-start">
                    <div className="col-span-12 sm:col-span-4">
                      <div className="small-caps text-[10px] tracking-[0.3em] text-violet/80">
                        Jurisdiction
                      </div>
                      <div className="mt-1.5 font-serif-display text-2xl text-ink leading-tight">
                        {j.region}.
                      </div>
                      <div className="mt-2 font-mono-numeric text-[10.5px] tracking-[0.16em] text-ink-faint leading-[1.5]">
                        {j.authority}
                      </div>
                    </div>
                    <div className="col-span-12 sm:col-span-8">
                      <p className="text-[15px] leading-[1.7] text-ink-soft font-serif-book">
                        {j.rule}
                      </p>
                      <a
                        href={j.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block font-mono-numeric text-[10.5px] tracking-[0.16em] text-ink-faint hover:text-violet transition-colors"
                      >
                        {j.source} →
                      </a>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={400}>
            <p className="mt-8 text-[13.5px] leading-[1.7] text-ink-faint font-serif-book max-w-3xl">
              The list above is illustrative, not exhaustive. The regulator that
              governs is the regulator of the holder's jurisdiction. If you are working
              outside a region named here and want a written read on the local rule
              before a brief opens, write to{" "}
              <a className="link-ed" href="mailto:standards@thenexusclub.org">
                standards@thenexusclub.org
              </a>
              .
            </p>
          </Reveal>
        </section>

        <CenteredRule className="mx-auto max-w-6xl" />

        {/* ───── §III Editorial standards for briefs ───── */}
        <section className="mx-auto max-w-6xl pt-16 pb-24">
          <Reveal>
            <header className="grid grid-cols-12 gap-6 mb-12">
              <div className="col-span-12 md:col-span-3">
                <div className="small-caps text-[10px] tracking-[0.3em] text-gold/85">
                  § III · Briefs
                </div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.05]">
                  How a brief is{" "}
                  <span className="font-serif-italic">read.</span>
                </h2>
              </div>
            </header>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                t: "The voice is the member's.",
                b: "A brief specifies a campaign — the message, the window, the deliverables. It does not specify the voice. Members write captions in their voice; brands cannot demand the use of a script the member would not say in their own words.",
              },
              {
                t: "Performance is named, not retroactively measured.",
                b: "What the brief states is what the brief is. Posts are not retroactively scored against view counts to alter pay; that clause is one we refuse to read past, on either side of the desk.",
              },
              {
                t: "Mid-flight changes are written.",
                b: "If a brief drifts after kickoff — new asks, new windows, new approvers — the change is written, the member confirms, and the dispute path is open if the change is unworkable. No silent re-scoping.",
              },
              {
                t: "Approval is named.",
                b: "The brief names a single brand-side approver per campaign. Members do not chase approvals through three desks. Where the named approver is unreachable, the desk steps in.",
              },
              {
                t: "Exclusivity is bounded.",
                b: "Category exclusivity, where requested, names a category, names a window, names a geography. Open-ended exclusivity is not in scope; a brief that asks for one is sent back.",
              },
              {
                t: "Removal is written.",
                b: "Posts published as part of a campaign are not silently un-published by either party after the window closes. Removal — for any reason — is named, dated, and recorded with the audit log.",
              },
            ].map((p, i) => (
              <Reveal key={p.t} delay={i * 60}>
                <article
                  className="rounded-2xl p-6 h-full"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(20,18,24,0.55) 0%, rgba(12,11,16,0.7) 100%)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="font-serif-display text-xl text-ink leading-tight">
                    {p.t}
                  </div>
                  <p className="mt-3 text-[14.5px] leading-[1.7] text-ink-muted font-serif-book">
                    {p.b}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───── Coda ───── */}
        <section className="mx-auto max-w-3xl pb-24 text-center">
          <Reveal>
            <p className="small-caps text-[10px] tracking-[0.32em] text-ink-faint">
              — to write to the desk —
            </p>
            <p className="mt-6 font-serif-italic text-2xl text-ink-muted">
              <a className="link-ed" href="mailto:standards@thenexusclub.org">
                standards@thenexusclub.org
              </a>
            </p>
            <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/disputes"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-[12.5px]"
              >
                Disputes
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/house-rules"
                className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12.5px]"
              >
                House rules
              </Link>
              <Link
                href="/community-guidelines"
                className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12.5px]"
              >
                Community guidelines
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
