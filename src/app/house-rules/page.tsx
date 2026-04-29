import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RunningHead } from "@/components/Ornaments";

export const metadata = {
  title: "House Rules · Nexus Club",
  description:
    "The standing rules of the house — on the desk, on the work, on other members, on brands, on standing. Read once, kept on the back of every other page.",
};

type Article = { n: string; body: string };
type Chapter = {
  code: string;
  title: string;
  preface?: string;
  articles: Article[];
};

const CHAPTERS: Chapter[] = [
  {
    code: "I",
    title: "On the desk",
    preface:
      "The desk is the editorial half of the club. Where most platforms have an algorithm, Nexus Club has a person who reads.",
    articles: [
      {
        n: "01",
        body:
          "The desk reads everything. Membership applications, campaign briefs, withdrawal requests, support tickets — the editor reads each in person, with their full attention.",
      },
      {
        n: "02",
        body:
          "Decisions arrive in writing within two business days. We name the decision, name the reason, and name the path to disagree.",
      },
      {
        n: "03",
        body:
          "The desk is not an algorithm. There are no quotas, no metrics-driven cuts, no ranking the member cannot see.",
      },
    ],
  },
  {
    code: "II",
    title: "On the work",
    preface:
      "The work is the reason the club exists. The rules around it are the rules a working desk would set for its own room.",
    articles: [
      {
        n: "01",
        body:
          "Work commissioned through Nexus Club must be work the member would sign their name to. Pitches written in haste, briefs answered with template paragraphs, posts drafted by a tool without disclosure — these are not the work this club is for.",
      },
      {
        n: "02",
        body:
          "Advertising disclosure follows the law of the holder's jurisdiction. #ad, #sponsored, “in partnership with” — whichever the rule requires, plainly placed and never buried.",
      },
      {
        n: "03",
        body:
          "A campaign that has gone live cannot be undone, but it can be answered. If a brief drifts, write to the desk — there is a formal route in the disputes policy.",
      },
      {
        n: "04",
        body:
          "Member work remains the member's. The license granted to a brand is the license written into the brief; nothing more, nothing wider, nothing longer.",
      },
    ],
  },
  {
    code: "III",
    title: "On other members",
    preface:
      "The quiet of the club is the protection of the member. The rules below are the article that earns the word ‘private’ in our description.",
    articles: [
      {
        n: "01",
        body:
          "Members do not share other members' details — names, handles, application notes, payout figures, draft briefs, brand contracts — in press, in social, in any public domain. The quiet of the club is the protection of the member.",
      },
      {
        n: "02",
        body:
          "Disagreements between members travel through the desk, not through public posts. We answer.",
      },
      {
        n: "03",
        body:
          "Members who use the directory or the dispatches as a list to spam, recruit from, or sell into are removed.",
      },
      {
        n: "04",
        body:
          "Members may, at their discretion, speak about their own membership and their own work. They may not speak for the club.",
      },
    ],
  },
  {
    code: "IV",
    title: "On brands",
    preface:
      "Brands sit on the same desk as members and are held to a parallel standard. The rules below are the conditions of standing on the brand side.",
    articles: [
      {
        n: "01",
        body:
          "Brands commissioning campaigns through Nexus Club agree to flat, stated payouts. Performance-tied retroactive cuts are not in scope.",
      },
      {
        n: "02",
        body:
          "Brand assets shared in a brief are seen by the assigned member and the desk only. They are not shared further.",
      },
      {
        n: "03",
        body:
          "A brand that asks a member to misrepresent a relationship — to publish without disclosure, to delete a disclosure, to backdate a campaign — terminates its standing. We will say this in writing.",
      },
    ],
  },
  {
    code: "V",
    title: "On standing",
    preface:
      "Standing is the simple word for: are you in good order with the club. Most members are, all the time.",
    articles: [
      {
        n: "01",
        body:
          "Loss of standing follows a written notice and a fair window to answer. Suspension is the first step. Expulsion is the last and is rare.",
      },
      {
        n: "02",
        body:
          "Conduct prejudicial to the reputation and character of the club, or to the safety of any member, is grounds for review. The desk decides on the record. Appeal is open.",
      },
      {
        n: "03",
        body:
          "A member who leaves — voluntarily, or after a finding — keeps their work. Their authorization to publish through Nexus Club ends; everything they made is theirs.",
      },
    ],
  },
];

export default function HouseRulesPage() {
  return (
    <>
      <Masthead />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />

        {/* ───── Masthead ───── */}
        <section className="mx-auto max-w-5xl pt-12 sm:pt-20 pb-12 relative">
          <Reveal>
            <RunningHead
              left="THE NEXUS CLUB"
              center="· HOUSE RULES ·"
              right="VOL. I · MMXXVI"
            />
          </Reveal>
          <div className="mt-8 grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-9">
              <Reveal delay={120}>
                <h1 className="font-serif-display text-[clamp(3rem,8.4vw,7.2rem)] leading-[0.9] text-ink">
                  House
                  <br />
                  <span className="font-serif-italic">rules.</span>
                </h1>
              </Reveal>
              <Reveal delay={300}>
                <p className="mt-8 max-w-2xl text-[18px] leading-[1.7] text-ink-muted font-serif-book drop-cap">
                  These are the standing rules of the house. They are short on number
                  and long on intent — written so they may be read once, then kept on
                  the back of every other page in the club. They apply to members, to
                  brands, and to the desk equally. They are not a contract; the
                  contract is the Terms. They are the manners of the room.
                </p>
              </Reveal>
            </div>
            <div className="col-span-12 md:col-span-3 md:text-right">
              <Reveal delay={420}>
                <span className="font-mono-numeric text-[11px] text-ink-faint">
                  Rev. 2026-04-30
                </span>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ───── Chapters ───── */}
        <section className="mx-auto max-w-5xl pb-24">
          {CHAPTERS.map((c, idx) => (
            <Reveal key={c.code} delay={idx * 60}>
              <article className="grid grid-cols-12 gap-6 md:gap-10 hairline-top pt-12 pb-14">
                <header className="col-span-12 md:col-span-3">
                  <div className="small-caps text-[10px] tracking-[0.3em] text-gold/85">
                    Chapter §{c.code}
                  </div>
                  <h2 className="mt-3 font-serif-display text-3xl sm:text-4xl text-ink leading-[1.05]">
                    {c.title}.
                  </h2>
                  {c.preface && (
                    <p className="mt-4 text-[14.5px] leading-[1.65] text-ink-muted font-serif-italic">
                      {c.preface}
                    </p>
                  )}
                </header>
                <ol className="col-span-12 md:col-span-9 space-y-7 md:pl-6 md:border-l md:border-hairline">
                  {c.articles.map((a) => (
                    <li
                      key={a.n}
                      className="grid grid-cols-[auto_1fr] gap-5 sm:gap-6"
                    >
                      <span className="font-mono-numeric text-[11px] tracking-[0.18em] text-gold/60 pt-[7px]">
                        §{c.code}·{a.n}
                      </span>
                      <p className="text-[16.5px] leading-[1.75] text-ink-soft font-serif-book">
                        {a.body}
                      </p>
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>
          ))}
        </section>

        {/* ───── Coda ───── */}
        <section className="mx-auto max-w-3xl pb-24">
          <Reveal>
            <div className="hairline-top pt-10 text-center">
              <p className="small-caps text-[10px] tracking-[0.32em] text-ink-faint">
                — kept by the desk —
              </p>
              <p className="mt-6 font-serif-italic text-2xl sm:text-3xl text-ink-soft leading-snug">
                A members' club is its rules read aloud,
                <br />
                and then mostly forgotten,
                <br />
                because everyone agreed.
              </p>
              <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
                <Link
                  href="/community-guidelines"
                  className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12.5px]"
                >
                  Community guidelines
                </Link>
                <Link
                  href="/code-of-conduct"
                  className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12.5px]"
                >
                  Code of conduct
                </Link>
                <Link
                  href="/disputes"
                  className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12.5px]"
                >
                  Disputes
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
