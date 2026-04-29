import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RunningHead } from "@/components/Ornaments";

export const metadata = {
  title: "Community Guidelines · Nexus Club",
  description:
    "The lines that, crossed, end membership. Specific behaviours, named in writing, with consequences attached.",
};

type Line = {
  n: string;
  title: string;
  body: string;
  consequence: "warning" | "suspension" | "termination";
};

const LINES: Line[] = [
  {
    n: "01",
    title: "Harassment",
    body:
      "Targeted abuse, threats, sustained derogatory contact, or doxxing of any member, brand contact, or member of the desk. The standard is the recipient's reasonable read, not the sender's stated intent.",
    consequence: "termination",
  },
  {
    n: "02",
    title: "Plagiarism",
    body:
      "Passing off another person's work — copy, image, video, audio, idea documented elsewhere — as your own in an application, pitch, or campaign deliverable.",
    consequence: "termination",
  },
  {
    n: "03",
    title: "Undisclosed advertising",
    body:
      "Publishing a paid campaign post without the disclosure required by the holder's jurisdiction (FTC in the United States, ASCI in India, ASA in the United Kingdom, equivalents elsewhere). Hidden disclosures — buried in a hashtag stack, set in a thinner colour, placed below the fold — are treated as undisclosed.",
    consequence: "termination",
  },
  {
    n: "04",
    title: "Impersonation",
    body:
      "Holding yourself out as another person, brand, or member; misrepresenting a relationship to a brand or to the desk; presenting AI-generated likeness as a real person without disclosure.",
    consequence: "termination",
  },
  {
    n: "05",
    title: "Account sharing",
    body:
      "Allowing a third party — agent, manager, lawyer, partner — to operate your Nexus Club account under your credentials. Authorized representatives speak on the side; they do not sign in.",
    consequence: "suspension",
  },
  {
    n: "06",
    title: "Solicitation",
    body:
      "Using the directory, dispatches, or campaign threads as a list to recruit members, sell unrelated services, pitch outside-of-club deals, or promote third-party platforms.",
    consequence: "warning",
  },
  {
    n: "07",
    title: "Member-detail disclosure",
    body:
      "Sharing other members' details — names, handles, application material, payout figures, draft briefs, brand contracts — in press, on social, or in any public domain. The non-disclosure clause in the Terms applies in full force.",
    consequence: "termination",
  },
  {
    n: "08",
    title: "Platform abuse",
    body:
      "Probing, scraping, or attempting unauthorized access to the platform; abusing rate limits; bulk-pulling content beyond the rate of an attentive reader. Security research is welcome under the disclosure policy.",
    consequence: "termination",
  },
  {
    n: "09",
    title: "Illegality",
    body:
      "Activity unlawful in the holder's jurisdiction — including content depicting the sexual exploitation of minors, sale of controlled goods without authorization, fraud, and the spread of malware — terminates membership immediately and is reported to the appropriate authority.",
    consequence: "termination",
  },
];

const CONSEQUENCE_TONE: Record<
  Line["consequence"],
  { tag: string; bg: string; ring: string; dot: string; copy: string }
> = {
  warning: {
    tag: "Warning",
    bg: "rgba(243, 193, 121, 0.06)",
    ring: "rgba(243, 193, 121, 0.28)",
    dot: "rgba(243, 193, 121, 0.95)",
    copy: "First instance: written warning. Repeat: suspension.",
  },
  suspension: {
    tag: "Suspension",
    bg: "rgba(125, 90, 255, 0.06)",
    ring: "rgba(125, 90, 255, 0.28)",
    dot: "rgba(125, 90, 255, 0.95)",
    copy: "Membership paused pending review. Restoration possible on the record.",
  },
  termination: {
    tag: "Termination",
    bg: "rgba(255, 94, 103, 0.06)",
    ring: "rgba(255, 94, 103, 0.28)",
    dot: "rgba(255, 94, 103, 0.95)",
    copy: "Membership ends. Appeal is open per the Code of Conduct.",
  },
};

export default function CommunityGuidelinesPage() {
  return (
    <>
      <Masthead />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />

        <section className="mx-auto max-w-5xl pt-12 sm:pt-20 pb-12 relative">
          <Reveal>
            <RunningHead
              left="THE NEXUS CLUB"
              center="· COMMUNITY GUIDELINES ·"
              right="VOL. I · MMXXVI"
            />
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-8 font-serif-display text-[clamp(3rem,8vw,6.6rem)] leading-[0.9] text-ink">
              The lines,
              <br />
              <span className="font-serif-italic">named.</span>
            </h1>
          </Reveal>
          <Reveal delay={280}>
            <p className="mt-8 max-w-2xl text-[18px] leading-[1.7] text-ink-muted font-serif-book">
              The House Rules describe the place. These guidelines name the lines that,
              crossed, end membership. Each is paired with the consequence so a member
              knows where they stand before the record is opened, not after. Where a
              line is crossed, the path is the Code of Conduct.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <p className="mt-5 small-caps text-[10px] tracking-[0.32em] text-ink-faint">
              Rev. 2026-04-30 · 9 articles
            </p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-5xl pb-24 hairline-top">
          <ul className="divide-y divide-hairline">
            {LINES.map((line, idx) => {
              const tone = CONSEQUENCE_TONE[line.consequence];
              return (
                <Reveal key={line.n} delay={idx * 50} as="li">
                  <article className="grid grid-cols-12 gap-5 md:gap-8 py-9">
                    <div className="col-span-12 md:col-span-2">
                      <span className="font-mono-numeric text-[11px] tracking-[0.18em] text-ink-faint">
                        § {line.n}
                      </span>
                    </div>
                    <div className="col-span-12 md:col-span-7">
                      <h2 className="font-serif-display text-2xl text-ink leading-tight">
                        {line.title}.
                      </h2>
                      <p className="mt-3 text-[15.5px] leading-[1.7] text-ink-muted font-serif-book max-w-2xl">
                        {line.body}
                      </p>
                    </div>
                    <div className="col-span-12 md:col-span-3">
                      <div
                        className="rounded-2xl p-4"
                        style={{
                          background: tone.bg,
                          boxShadow: `inset 0 0 0 1px ${tone.ring}`,
                        }}
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          <span
                            aria-hidden
                            className="block w-1.5 h-1.5 rounded-full"
                            style={{
                              background: tone.dot,
                              boxShadow: `0 0 8px ${tone.dot}`,
                            }}
                          />
                          <span className="small-caps text-[10px] tracking-[0.3em] text-ink-soft">
                            {tone.tag}
                          </span>
                        </div>
                        <p className="text-[12.5px] leading-[1.55] text-ink-muted font-serif-book">
                          {tone.copy}
                        </p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </section>

        <section className="mx-auto max-w-3xl pb-24 hairline-top pt-12">
          <Reveal>
            <div className="text-center">
              <p className="small-caps text-[10px] tracking-[0.32em] text-ink-faint">
                — to report —
              </p>
              <h2 className="mt-4 font-serif-display text-3xl sm:text-4xl text-ink">
                If a line is{" "}
                <span className="font-serif-italic text-vermillion/85">crossed</span>.
              </h2>
              <p className="mt-5 max-w-xl mx-auto text-[15.5px] leading-[1.7] text-ink-muted font-serif-book">
                Write to{" "}
                <a className="link-ed" href="mailto:conduct@thenexusclub.org">
                  conduct@thenexusclub.org
                </a>
                . Include what happened, where, and (if a member or campaign was
                involved) the handle or campaign reference. Reports are read by the desk
                and answered.
              </p>
              <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
                <Link
                  href="/code-of-conduct"
                  className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-[12.5px]"
                >
                  Code of conduct
                  <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/house-rules"
                  className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12.5px]"
                >
                  House rules
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
