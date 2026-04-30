import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RunningHead } from "@/components/Ornaments";
import { EmailLink } from "@/components/EmailLink";

export const metadata = {
  title: "Disputes · Nexus Club",
  description:
    "How the desk handles disagreements — between member and brand, between member and the desk. Escalation path, mediation, and the day-fifteen agency-fronted payout.",
};

const PATH: { n: string; kicker: string; title: string; body: string }[] = [
  {
    n: "01",
    kicker: "Notice",
    title: "Write to the desk.",
    body:
      "Disputes start at disputes@thenexusclub.org. Describe the campaign, the parties, the moment the disagreement opened, and what you would consider an answer. The desk acknowledges within one business day. Anonymous notices are read but cannot generate a response back.",
  },
  {
    n: "02",
    kicker: "Direct exchange",
    title: "An exchange in writing, kept on the desk.",
    body:
      "The desk opens a written thread between the parties — copied to the editor, kept on the file. Many disputes resolve here within a few exchanges, because the format slows the conversation and surfaces what the disagreement is actually about.",
  },
  {
    n: "03",
    kicker: "Editorial review",
    title: "A standing review by the desk.",
    body:
      "If the exchange does not resolve, the editor reviews the campaign brief, the action log, and the correspondence in full. The review produces a written reading: what the brief said, what was delivered, where each party's position sits against the file. The reading is shared with both parties.",
  },
  {
    n: "04",
    kicker: "Day-fifteen guarantee",
    title: "If a brand has not paid by day fifteen, the desk pays.",
    body:
      "On payouts disputes specifically — a campaign delivered, the window closed, and payment outstanding more than fifteen days — the agency fronts the stated payout from its own treasury and pursues collection separately. The member is paid the brief amount, on time, regardless of brand-side delay. This is not insurance; it is a standing operating commitment.",
  },
  {
    n: "05",
    kicker: "Mediation",
    title: "Optional, in writing.",
    body:
      "Where the parties prefer a third reader, the desk will appoint a mediator from outside the standing roster — an independent reader with creator-economy or commercial experience — and pay their fee. Mediation findings are recommendatory, not binding; the parties remain free to escalate.",
  },
  {
    n: "06",
    kicker: "Arbitration",
    title: "Binding, where chosen.",
    body:
      "Disputes that cannot resolve through the steps above proceed to binding arbitration under the rules of a recognised forum (AAA in the United States; SIAC in Singapore; LCIA in the United Kingdom; equivalents elsewhere by agreement). The seat, language, and fee allocation are named in the brief. Nothing here removes any party's right to seek injunctive relief in a court of competent jurisdiction.",
  },
];

export default function DisputesPage() {
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
              center="· DISPUTES ·"
              right="VOL. I · MMXXVI"
            />
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-8 font-serif-display text-[clamp(3rem,8vw,6.6rem)] leading-[0.9] text-ink">
              When the desk
              <br />
              <span className="font-serif-italic">is asked to read.</span>
            </h1>
          </Reveal>
          <Reveal delay={300}>
            <p className="mt-9 max-w-2xl text-[18px] leading-[1.7] text-ink-muted font-serif-book drop-cap">
              Disagreements happen — between member and brand, between member and the
              desk, between brand and brief. The path below is the standing way the
              desk reads them. The path is short, written down, and ends in a fair
              answer. Most disputes settle at step two, on the file.
            </p>
          </Reveal>
          <Reveal delay={420}>
            <p className="mt-5 small-caps text-[10px] tracking-[0.32em] text-ink-faint">
              Rev. 2026-04-30 · Six steps · One desk
            </p>
          </Reveal>
        </section>

        {/* ───── The path ───── */}
        <section className="mx-auto max-w-5xl pb-24 hairline-top pt-12">
          <Reveal>
            <header className="flex items-baseline justify-between mb-12">
              <h2 className="font-serif-italic text-3xl sm:text-4xl text-ink">
                The path.
              </h2>
              <span className="font-mono-numeric text-[11px] text-ink-faint">§ I</span>
            </header>
          </Reveal>

          <ol className="space-y-12">
            {PATH.map((s, idx) => {
              const isGuarantee = s.n === "04";
              return (
                <Reveal key={s.n} delay={idx * 60}>
                  <li className="grid grid-cols-12 gap-6 md:gap-10 hairline-top pt-10">
                    <div className="col-span-12 md:col-span-3">
                      <div
                        className={`small-caps text-[10px] tracking-[0.3em] ${
                          isGuarantee ? "text-forest" : "text-violet/85"
                        }`}
                      >
                        Step {s.n}
                      </div>
                      <div
                        className="mt-2 font-serif-display text-[5.2rem] leading-none tracking-tight"
                        style={{
                          background: isGuarantee
                            ? "linear-gradient(180deg, rgba(95,225,214,0.95) 0%, rgba(60,196,184,0.6) 100%)"
                            : "linear-gradient(180deg, rgba(176,154,255,0.92) 0%, rgba(99,70,216,0.6) 100%)",
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
                      {isGuarantee && (
                        <div
                          className="mt-5 inline-flex items-center gap-3 px-4 py-2.5 rounded-full"
                          style={{
                            background:
                              "linear-gradient(90deg, rgba(95,225,214,0.05), rgba(95,225,214,0.1), rgba(95,225,214,0.05))",
                            boxShadow:
                              "inset 0 0 0 1px rgba(95,225,214,0.28)",
                          }}
                        >
                          <span
                            aria-hidden
                            className="block w-1.5 h-1.5 rounded-full"
                            style={{
                              background: "var(--forest)",
                              boxShadow: "0 0 8px var(--forest-glow)",
                            }}
                          />
                          <span className="small-caps text-[10px] tracking-[0.3em] text-forest">
                            Standing commitment · day-15 payout
                          </span>
                        </div>
                      )}
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ol>
        </section>

        {/* ───── Time and pace ───── */}
        <section className="mx-auto max-w-5xl pb-20 hairline-top pt-14">
          <Reveal>
            <header className="grid grid-cols-12 gap-6 mb-10">
              <div className="col-span-12 md:col-span-3">
                <div className="small-caps text-[10px] tracking-[0.3em] text-violet/85">
                  § II · Pace
                </div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.05]">
                  Time the desk{" "}
                  <span className="font-serif-italic">holds itself to.</span>
                </h2>
              </div>
            </header>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { k: "01 day", l: "Receipt acknowledged" },
              { k: "05 days", l: "First written exchange opens" },
              { k: "10 days", l: "Editorial review, on the record" },
              { k: "15 days", l: "Day-fifteen agency-fronted payout, where applicable" },
              { k: "30 days", l: "Mediator appointed, if requested" },
              { k: "60 days", l: "Arbitration filed, if escalated" },
            ].map((t, i) => (
              <Reveal key={t.k} delay={i * 50}>
                <div
                  className="nc-card rounded-2xl p-5"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(20,18,28,0.55) 0%, rgba(12,11,16,0.7) 100%)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="font-serif-display text-3xl text-ink leading-none tracking-tight">
                    {t.k}
                  </div>
                  <div className="mt-3 small-caps text-[10px] tracking-[0.28em] text-ink-muted">
                    {t.l}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───── Coda ───── */}
        <section className="mx-auto max-w-3xl pb-24 text-center">
          <Reveal>
            <p className="small-caps text-[10px] tracking-[0.32em] text-ink-faint">
              — to open a dispute —
            </p>
            <p className="mt-6 font-serif-italic text-2xl text-ink-muted">
              <EmailLink
                email="disputes@thenexusclub.org"
                className="link-ed"
              />
            </p>
            <p className="mt-5 max-w-xl mx-auto text-[14.5px] leading-[1.7] text-ink-faint font-serif-book">
              Most disputes resolve at step two, on the file. The desk reads what was
              written and answers in writing. Nothing in this policy removes the right
              to seek remedies under the law.
            </p>
            <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/standards"
                className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12.5px]"
              >
                Editorial standards
              </Link>
              <Link
                href="/code-of-conduct"
                className="btn-ghost inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12.5px]"
              >
                Code of conduct
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
