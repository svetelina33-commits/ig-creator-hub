import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RunningHead, CenteredRule } from "@/components/Ornaments";
import { NexusSeal } from "@/components/NexusSeal";
import { MetaSeal } from "@/components/MetaSeal";
import { META_APPROVAL } from "@/lib/verification";

export const metadata = {
  title: "Trust · Nexus Club",
  description:
    "Identity, data, payouts, conduct, disputes, disclosure, access — the standing documents that govern how the club operates, kept on one shelf.",
};

type Doc = {
  href: string;
  title: string;
  body: string;
  tag?: string;
};

const CHAPTERS: {
  code: string;
  kicker: string;
  title: React.ReactNode;
  preface: string;
  docs: Doc[];
}[] = [
  {
    code: "I",
    kicker: "Identity",
    title: (
      <>
        On the{" "}
        <span className="font-serif-italic text-gold/95">name</span> at the door.
      </>
    ),
    preface:
      "The agency is on Meta's Authorized Partners Register for the Instagram Graph API program. The credential is published in long form, with named scopes, named exclusions, and two revocation paths — because a checkmark badge would tell you nothing.",
    docs: [
      {
        href: "/verification",
        title: "Letter of Authorization",
        body:
          "The full credential — partner reference, granted scopes, deliberately excluded scopes, revocation paths, and the Issuer × Holder seal pair.",
        tag: `№ ${META_APPROVAL.partnerRef}`,
      },
    ],
  },
  {
    code: "II",
    kicker: "Data",
    title: (
      <>
        On the{" "}
        <span className="font-serif-italic text-gold/95">data</span>, plainly.
      </>
    ),
    preface:
      "We collect what the platform needs to do its work and nothing more. Tokens are encrypted at rest, sessions are HTTP-only, no third-party analytics or advertising cookies are set. The pages below are the accounting.",
    docs: [
      {
        href: "/privacy",
        title: "Privacy policy",
        body:
          "What we collect, what we deliberately do not collect, how Instagram and Gmail access work, and the rights you have in your data.",
      },
      {
        href: "/subprocessors",
        title: "Subprocessor list",
        body:
          "The vendors that touch member or brand data on our behalf — purpose, scope, region, and a link to each one's own privacy policy.",
      },
      {
        href: "/dpa",
        title: "Data processing addendum",
        body:
          "GDPR Article 28 processor terms for brands. Subject matter, instructions, security, subprocessors, transfers, breach notification, and audit.",
      },
      {
        href: "/security",
        title: "Security posture & disclosure",
        body:
          "Six things that are already true about how we protect data, the in-scope/out-of-scope research scope, and the responsible-disclosure inbox.",
      },
    ],
  },
  {
    code: "III",
    kicker: "Payouts",
    title: (
      <>
        On{" "}
        <span className="font-serif-italic text-forest">getting paid</span>.
      </>
    ),
    preface:
      "Payouts are flat, stated upfront, paid through Stripe Connect, and — when a brand is late — fronted from the agency's treasury on day fifteen. The standard is one creators do not have to chase.",
    docs: [
      {
        href: "/how-it-works",
        title: "Fee schedule, in plain language",
        body:
          "What the brand pays, what the creator receives, and what stays with the desk to keep the lights on. No performance clauses, no clawbacks.",
      },
      {
        href: "/disputes",
        title: "Day-fifteen agency-fronted payout",
        body:
          "The standing operating commitment: if a brand has not paid on day fifteen, the agency pays the member directly and pursues collection separately.",
        tag: "Standing commitment",
      },
    ],
  },
  {
    code: "IV",
    kicker: "Conduct",
    title: (
      <>
        On the{" "}
        <span className="font-serif-italic text-gold/95">manners</span> of the room.
      </>
    ),
    preface:
      "A members' club lives or dies by what its members do. Three documents — declarative, procedural, and adjudicative — describe how members, brands, and the desk hold themselves and each other to account.",
    docs: [
      {
        href: "/house-rules",
        title: "House rules",
        body:
          "The standing rules of the house — on the desk, on the work, on other members, on brands, on standing. Read once, kept on the back of every other page.",
      },
      {
        href: "/community-guidelines",
        title: "Community guidelines",
        body:
          "The lines that, crossed, end membership. Each named in writing, paired with the consequence — warning, suspension, or termination.",
      },
      {
        href: "/code-of-conduct",
        title: "Code of conduct",
        body:
          "The procedure when a line is reported crossed: receipt, triage, notice, answer, decision, appeal. Every step in writing, every record shared.",
      },
    ],
  },
  {
    code: "V",
    kicker: "Disputes",
    title: (
      <>
        On{" "}
        <span className="font-serif-italic text-vermillion/90">disagreement</span>.
      </>
    ),
    preface:
      "Disputes happen. The path below is the standing way the desk reads them — in writing, on the file, with mediation and arbitration as the further steps when direct exchange does not resolve.",
    docs: [
      {
        href: "/disputes",
        title: "Dispute resolution path",
        body:
          "Six steps from notice to arbitration, with the day-fifteen agency-fronted payout sitting in the middle as a standing commitment.",
      },
    ],
  },
  {
    code: "VI",
    kicker: "Disclosure",
    title: (
      <>
        On{" "}
        <span className="font-serif-italic text-gold/95">honest labelling</span>.
      </>
    ),
    preface:
      "The category is defined by sponsored work and sponsored work is governed by law. The Editorial Standards are the desk's standing rules on disclosure — by jurisdiction, in writing, before a brief opens.",
    docs: [
      {
        href: "/standards",
        title: "Editorial standards",
        body:
          "Five principles of honest labelling, the rule by jurisdiction (FTC · ASCI · ASA · UCPD · others), and how a brief is read before kickoff.",
      },
      {
        href: "/copyright",
        title: "Copyright policy",
        body:
          "Procedure for filing a §512 copyright notice, counter-notice, and the treatment of repeat infringers. Designated agent named.",
      },
    ],
  },
  {
    code: "VII",
    kicker: "Access",
    title: (
      <>
        On the door,{" "}
        <span className="font-serif-italic text-violet">held open</span>.
      </>
    ),
    preface:
      "A members' club is only a club if its door opens. We hold ourselves to WCAG 2.1 AA, and we publish the gaps we have not yet closed alongside the gaps we have.",
    docs: [
      {
        href: "/accessibility",
        title: "Accessibility statement",
        body:
          "What we already do, where we currently fall short, and the route to write to us when something blocks you.",
      },
      {
        href: "/curation",
        title: "How the desk reads",
        body:
          "Standing description of the door — what the editor reads in an application, what is read for, and what is not read for.",
      },
    ],
  },
];

export default function TrustPage() {
  return (
    <>
      <Masthead />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />
        <span className="ambient-glow-2" aria-hidden />

        {/* ───── Masthead ───── */}
        <section className="mx-auto max-w-7xl pt-12 sm:pt-20 pb-16 relative">
          <Reveal>
            <RunningHead
              left="THE NEXUS CLUB"
              center="· TRUST ·"
              right={`LETTER № ${META_APPROVAL.partnerRef}`}
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end">
            <div className="lg:col-span-7">
              <Reveal delay={120}>
                <h1 className="font-serif-display text-[clamp(3rem,8.4vw,7.4rem)] leading-[0.9] text-ink">
                  What we will
                  <br />
                  not do,{" "}
                  <span className="font-serif-italic text-violet">in writing.</span>
                </h1>
              </Reveal>
              <Reveal delay={300}>
                <p className="mt-9 max-w-2xl text-[19px] leading-[1.7] text-ink-muted font-serif-book drop-cap">
                  Trust, at this club, is not a badge — it is a stack of standing
                  documents kept on one shelf. Identity, data, payouts, conduct,
                  disputes, disclosure, access. Each is read by the desk before it is
                  asked of a member or a brand. Each is published, dated, and revised
                  in the open. The list below is the shelf; click any spine to read
                  the page.
                </p>
              </Reveal>
            </div>
            <Reveal delay={200} className="lg:col-span-5 flex justify-center lg:justify-end">
              <div
                className="nc-card relative rounded-3xl px-8 py-7 max-w-md w-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(28,22,40,0.7) 0%, rgba(14,12,20,0.85) 100%)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(125,90,255,0.18), 0 30px 60px -30px rgba(125,90,255,0.4)",
                }}
              >
                <div className="flex items-center justify-between gap-3 mb-5">
                  <NexusSeal size="sm" />
                  <span className="font-serif-italic text-gold/55 text-lg">×</span>
                  <MetaSeal size="sm" />
                </div>
                <div className="small-caps text-[10px] tracking-[0.32em] text-violet/85 mb-2">
                  Volume I · MMXXVI
                </div>
                <div className="font-serif-display text-2xl text-ink leading-tight">
                  Seven chapters, one shelf.
                </div>
                <p className="mt-4 text-[13.5px] leading-[1.7] text-ink-muted font-serif-book">
                  Identity · Data · Payouts · Conduct · Disputes · Disclosure · Access.
                  Every chapter on this page links to the document that runs it. Nothing
                  here is summary; everything here is the source.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <CenteredRule className="mx-auto max-w-7xl" />

        {/* ───── Chapters ───── */}
        <section className="mx-auto max-w-7xl pb-24 pt-16">
          {CHAPTERS.map((chapter, idx) => (
            <Reveal key={chapter.code} delay={idx * 60}>
              <article className="grid grid-cols-12 gap-6 md:gap-12 hairline-top pt-12 pb-14">
                <header className="col-span-12 md:col-span-4">
                  <div className="small-caps text-[10px] tracking-[0.3em] text-gold/85">
                    Chapter §{chapter.code}
                  </div>
                  <div className="mt-1 font-mono-numeric text-[10px] tracking-[0.22em] text-ink-faint uppercase">
                    {chapter.kicker}
                  </div>
                  <h2 className="mt-3 font-serif-display text-3xl sm:text-4xl text-ink leading-[1.05]">
                    {chapter.title}
                  </h2>
                  <p className="mt-5 text-[14.5px] leading-[1.7] text-ink-muted font-serif-italic max-w-md">
                    {chapter.preface}
                  </p>
                </header>
                <div className="col-span-12 md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {chapter.docs.map((doc, di) => (
                    <Link
                      key={doc.href}
                      href={doc.href}
                      className="nc-card group rounded-2xl p-6 transition-all duration-300"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(20,18,28,0.5) 0%, rgba(12,11,16,0.7) 100%)",
                        boxShadow:
                          "inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 1px rgba(255,255,255,0.06)",
                      }}
                    >
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="font-mono-numeric text-[10px] tracking-[0.22em] text-violet/70">
                          §{chapter.code}·{String(di + 1).padStart(2, "0")}
                        </span>
                        {doc.tag && (
                          <span className="font-mono-numeric text-[9.5px] tracking-[0.22em] text-gold/85 uppercase">
                            {doc.tag}
                          </span>
                        )}
                      </div>
                      <div className="font-serif-display text-xl text-ink leading-tight group-hover:text-violet transition-colors">
                        {doc.title}.
                      </div>
                      <p className="mt-3 text-[14px] leading-[1.7] text-ink-muted font-serif-book">
                        {doc.body}
                      </p>
                      <div className="mt-5 small-caps text-[10px] tracking-[0.3em] text-ink-faint group-hover:text-violet transition-colors flex items-center gap-2">
                        Read in full
                        <span aria-hidden className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </section>

        <CenteredRule className="mx-auto max-w-7xl" />

        {/* ───── Why this is published ───── */}
        <section className="mx-auto max-w-4xl pt-16 pb-24">
          <Reveal>
            <header className="mb-8">
              <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                — a closing reading —
              </p>
              <h2 className="mt-4 font-serif-display text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.05]">
                Why we publish all of{" "}
                <span className="font-serif-italic">this.</span>
              </h2>
            </header>
            <div className="space-y-5 text-[16.5px] leading-[1.78] text-ink-muted font-serif-book">
              <p>
                Most of the category does not. Direct competitors keep their terms one
                level deeper than they need to be, their data practices on the back of
                a sales call, and their dispute path on a quiet line of an AGB. The
                pattern is not new; the pattern is what made the category feel like a
                bidding war in the first place.
              </p>
              <p>
                We took the opposite line because the small club we want to run is the
                one a member can read in advance. The desk does not have a private
                policy that says something different than the public one. There is no
                tier of member with a different DPA. There is no campaign clause that
                the brief contradicts. Everything that runs the club is on this shelf.
                If a document is not here, it is not running anything.
              </p>
              <p>
                If something on the shelf reads opaquely, write to us — we will
                rewrite the page or the line, and re-issue with the new revision date.
                Trust is a writing problem before it is a security problem; we want to
                be the desk that holds the writing to a high standard.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ───── Coda ───── */}
        <section className="mx-auto max-w-3xl pb-24 text-center">
          <Reveal>
            <p className="small-caps text-[10px] tracking-[0.32em] text-ink-faint">
              — to write to the desk —
            </p>
            <p className="mt-6 font-serif-italic text-2xl text-ink-muted">
              <a className="link-ed" href="mailto:support@thenexusclub.org">
                support@thenexusclub.org
              </a>
            </p>
            <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/about"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-[12.5px]"
              >
                The manifesto
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/help"
                className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12.5px]"
              >
                Help center
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
