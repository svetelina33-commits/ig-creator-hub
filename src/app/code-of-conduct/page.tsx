import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RunningHead } from "@/components/Ornaments";

export const metadata = {
  title: "Code of Conduct · Nexus Club",
  description:
    "The procedure that follows when a guideline is reported crossed — notice, record, decision, appeal.",
};

const STEPS: { n: string; kicker: string; title: string; body: string }[] = [
  {
    n: "01",
    kicker: "Receipt",
    title: "A report arrives.",
    body:
      "Reports come to conduct@thenexusclub.org. The desk acknowledges receipt within one business day. The acknowledgement is in writing and is dated. Anonymous reports are read but cannot generate a response back to the reporter.",
  },
  {
    n: "02",
    kicker: "Triage",
    title: "The desk reads the record.",
    body:
      "The editor reviews the report against the campaign log, application material, and any communications on file. Where the matter is plainly outside the guidelines — a misunderstanding, a disagreement that belongs in the disputes path, content the platform does not host — we say so and close the file in writing.",
  },
  {
    n: "03",
    kicker: "Notice",
    title: "The named member or brand receives a notice.",
    body:
      "A written notice describes what was reported, which guideline is in question, and the window to answer. The window is five business days unless the matter is urgent (safety, illegality), in which case standing may be paused for the duration of the review.",
  },
  {
    n: "04",
    kicker: "Answer",
    title: "An answer in writing.",
    body:
      "The member or brand answers in their own voice, in writing. They may attach evidence, refer to prior correspondence, name a witness. They may decline to answer; the record proceeds.",
  },
  {
    n: "05",
    kicker: "Decision",
    title: "The desk records a decision.",
    body:
      "The decision is in writing. It names the guideline, names the finding, and names the consequence — warning, suspension, termination. Reasoning is included. The record is held and is shared with the member or brand who was named.",
  },
  {
    n: "06",
    kicker: "Appeal",
    title: "An appeal is open.",
    body:
      "The member or brand may appeal in writing within fourteen days of the decision. An appeal is read by a different reader on the desk than the original. New facts open the appeal; disagreement with the finding alone does not. The appeal decision is final at the desk; nothing here removes the right to seek remedies elsewhere.",
  },
];

export default function CodeOfConductPage() {
  return (
    <>
      <Masthead />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />

        <section className="mx-auto max-w-5xl pt-12 sm:pt-20 pb-12 relative">
          <Reveal>
            <RunningHead
              left="THE NEXUS CLUB"
              center="· CODE OF CONDUCT ·"
              right="VOL. I · MMXXVI"
            />
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-8 font-serif-display text-[clamp(3rem,8vw,6.6rem)] leading-[0.9] text-ink">
              How a finding
              <br />
              <span className="font-serif-italic">is made.</span>
            </h1>
          </Reveal>
          <Reveal delay={280}>
            <p className="mt-8 max-w-2xl text-[18px] leading-[1.7] text-ink-muted font-serif-book">
              The Community Guidelines name the lines. This document is the procedure
              the desk follows when a line is reported crossed. The procedure is short
              on number and long on writing — every step leaves a record, every record is
              shared with the named party, every named party can answer.
            </p>
          </Reveal>
          <Reveal delay={400}>
            <p className="mt-5 small-caps text-[10px] tracking-[0.32em] text-ink-faint">
              Rev. 2026-04-30 · A standing procedure
            </p>
          </Reveal>
        </section>

        {/* ───── The procedure ───── */}
        <section className="mx-auto max-w-5xl pb-20 hairline-top pt-12">
          <Reveal>
            <header className="flex items-baseline justify-between mb-12">
              <h2 className="font-serif-italic text-3xl sm:text-4xl text-ink">
                The procedure.
              </h2>
              <span className="font-mono-numeric text-[11px] text-ink-faint">§ I</span>
            </header>
          </Reveal>
          <ol className="space-y-12">
            {STEPS.map((s, idx) => (
              <Reveal key={s.n} delay={idx * 70}>
                <li className="grid grid-cols-12 gap-6 md:gap-10 hairline-top pt-9">
                  <div className="col-span-12 md:col-span-3">
                    <div className="small-caps text-[10px] tracking-[0.3em] text-violet/85">
                      Step {s.n}
                    </div>
                    <div
                      className="mt-2 font-serif-display text-[4.6rem] leading-none tracking-tight"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(176,154,255,0.92) 0%, rgba(99,70,216,0.65) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {s.n}
                    </div>
                    <div className="mt-1 font-mono-numeric text-[10px] tracking-[0.22em] text-ink-faint uppercase">
                      {s.kicker}
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-9">
                    <h3 className="font-serif-display text-2xl sm:text-3xl text-ink leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-4 text-[16.5px] leading-[1.75] text-ink-muted font-serif-book max-w-2xl">
                      {s.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* ───── Principles ───── */}
        <section className="mx-auto max-w-5xl pb-20 hairline-top pt-14">
          <Reveal>
            <header className="flex items-baseline justify-between mb-10">
              <h2 className="font-serif-italic text-3xl sm:text-4xl text-ink">
                Principles, kept on the desk.
              </h2>
              <span className="font-mono-numeric text-[11px] text-ink-faint">§ II</span>
            </header>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                t: "Writing, not voice.",
                b: "Every step of the procedure is in writing. Voice memos, calls, hallway agreements — none of these create a record. If a matter has not been written down, it has not been recorded.",
              },
              {
                t: "Notice before consequence.",
                b: "A member or brand learns of a question being asked about them in the same letter that asks it. We do not investigate quietly and pronounce later.",
              },
              {
                t: "Proportion.",
                b: "The first instance of an unintended cross of the line is rarely a termination. The pattern matters. The intent matters. The harm matters. The procedure scales.",
              },
              {
                t: "Independence at appeal.",
                b: "The reader of the appeal is not the reader of the original decision. The desk has more than one reader for this reason.",
              },
              {
                t: "No confidential punishment.",
                b: "A finding that ends standing is recorded with the named party. We do not maintain quiet blacklists; we either say something in writing or we have nothing to say.",
              },
              {
                t: "Safety first.",
                b: "Where a member's safety, a brand contact's safety, or the platform's integrity is at risk, standing may be paused before answer. Pause is not finding; the procedure still runs.",
              },
            ].map((p, i) => (
              <Reveal key={p.t} delay={i * 60}>
                <article
                  className="nc-card rounded-2xl p-6"
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

        {/* ───── Closing ───── */}
        <section className="mx-auto max-w-3xl pb-24 text-center">
          <Reveal>
            <p className="small-caps text-[10px] tracking-[0.32em] text-ink-faint">
              — to write to the desk —
            </p>
            <p className="mt-6 font-serif-italic text-2xl text-ink-muted">
              <a className="link-ed" href="mailto:conduct@thenexusclub.org">
                conduct@thenexusclub.org
              </a>
            </p>
            <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/community-guidelines"
                className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12.5px]"
              >
                Community guidelines
              </Link>
              <Link
                href="/disputes"
                className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12.5px]"
              >
                Disputes
              </Link>
              <Link
                href="/house-rules"
                className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12.5px]"
              >
                House rules
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
