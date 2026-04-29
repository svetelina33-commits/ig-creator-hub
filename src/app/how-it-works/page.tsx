import Link from "next/link";
import { getSession } from "@/lib/session";
import { findCreatorById } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RunningHead } from "@/components/Ornaments";
import { META_APPROVAL } from "@/lib/verification";

export const metadata = {
  title: "How it works · Nexus Club",
};

type Step = {
  n: string;
  kicker: string;
  title: string;
  body: string;
  note?: string;
};

const creatorSteps: Step[] = [
  {
    n: "I",
    kicker: "Apply",
    title: "Request a seat.",
    body: "Email and password, no portfolio required up front. A member of the editorial desk reviews every application — we write back within two business days.",
  },
  {
    n: "II",
    kicker: "Connect",
    title: "Link Instagram when you're ready.",
    body: "Meta's official OAuth, one tap on the consent screen. We never see your password and store only the long-lived access token, encrypted at rest. Revoke whenever.",
  },
  {
    n: "III",
    kicker: "Apply again",
    title: "Write the editor about a campaign.",
    body: "When a brief resonates, send a short note — why this fits your voice, any past work worth citing. Concise is better than polished. We read every word.",
  },
  {
    n: "IV",
    kicker: "Publish",
    title: "Once approved, we handle posting.",
    body: "Timing, captions, first-draft scheduling — all from the brief you agreed to. You see and approve anything that goes live under your handle.",
    note: `Posting requires an Instagram Business or Creator account. Authorized by ${META_APPROVAL.reviewer} · on the ${META_APPROVAL.programName} · letter № ${META_APPROVAL.partnerRef}.`,
  },
  {
    n: "V",
    kicker: "Paid",
    title: "Flat payout on delivery.",
    body: "Stated upfront in the brief. Paid within fifteen days of the campaign closing — no performance clauses, no clawbacks tied to metrics you don't control.",
  },
];

export default async function HowItWorksPage() {
  const session = await getSession();
  const creator = session.creatorId ? await findCreatorById(session.creatorId) : null;
  const admin = await isAdmin();

  return (
    <>
      <Masthead email={creator?.email} isAdmin={admin} />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />
        <section className="mx-auto max-w-6xl pt-14 sm:pt-20 pb-16 relative">
          <Reveal>
            <RunningHead left="HOW IT WORKS" center="· · ·" right="FOR CREATORS" />
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-8 font-serif-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-ink">
              Five steps,
              <br />
              <span className="font-serif-italic">the editor,</span>
              <br /> and your handle.
            </h1>
          </Reveal>
          <Reveal delay={280}>
            <p className="mt-10 max-w-2xl text-[17px] leading-[1.7] text-ink-muted font-serif-book">
              No bidding wars, no platform take-rate, no algorithmic matching. A small editorial
              desk reads every application and matches creators to campaigns the way a magazine
              commissions a writer.
            </p>
          </Reveal>
        </section>

        {/* Steps */}
        <section className="mx-auto max-w-6xl pb-24">
          <div className="relative">
            {creatorSteps.map((s, idx) => (
              <Reveal key={s.n} delay={idx * 80} className="relative">
                <article className="grid grid-cols-12 gap-6 hairline-top py-12">
                  <div className="col-span-12 md:col-span-3">
                    <div className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                      Step {s.n}
                    </div>
                    <div className="mt-2 font-serif-display text-[5rem] leading-none text-violet">
                      {s.n}
                    </div>
                    <div className="mt-2 font-serif-italic text-2xl text-ink">{s.kicker}</div>
                  </div>
                  <div className="col-span-12 md:col-span-9 md:pl-10 md:border-l md:border-hairline">
                    <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-ink leading-tight max-w-xl">
                      {s.title}
                    </h2>
                    <p className="mt-4 text-[17px] leading-[1.75] text-ink-muted max-w-2xl font-serif-book">
                      {s.body}
                    </p>
                    {s.note && (
                      <span
                        className="mt-5 inline-flex items-start gap-2.5 px-3.5 py-2 rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(231,206,148,0.04), rgba(231,206,148,0.08), rgba(231,206,148,0.04))",
                          boxShadow: "inset 0 0 0 1px rgba(231,206,148,0.25)",
                        }}
                      >
                        <span
                          aria-hidden
                          className="mt-[6px] block w-1 h-1 rounded-full bg-gold shrink-0"
                          style={{ boxShadow: "0 0 6px rgba(231,206,148,0.55)" }}
                        />
                        <span className="text-[11px] small-caps tracking-[0.2em] text-gold/90 leading-[1.5]">
                          {s.note}
                        </span>
                      </span>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* For brands */}
        <section className="mx-auto max-w-6xl py-20 hairline-top">
          <Reveal>
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-4">
                <span className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                  For brands
                </span>
                <h2 className="mt-3 font-serif-italic text-3xl sm:text-4xl md:text-5xl text-ink leading-[0.95]">
                  Commissioning
                  <br />a campaign.
                </h2>
              </div>
              <div className="col-span-12 md:col-span-8 space-y-6">
                <p className="text-[17px] leading-[1.75] text-ink-muted font-serif-book">
                  We currently operate as a single-editor desk. Brand partnerships are by
                  introduction — write directly to <a className="text-forest underline underline-offset-4" href="mailto:brands@thenexusclub.org">brands@thenexusclub.org</a> with a rough brief, budget, and timing. We'll confirm fit and open a campaign on your behalf. The standing terms are at <Link href="/terms-brands" className="text-forest underline underline-offset-4">/terms-brands</Link>; the data addendum is at <Link href="/dpa" className="text-forest underline underline-offset-4">/dpa</Link>.
                </p>
                <p className="text-[17px] leading-[1.75] text-ink-muted font-serif-book">
                  Fees are a flat commission on the final payout — no retainer, no minimums.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* On the ledger — fee schedule transparency */}
        <section className="mx-auto max-w-6xl py-20 hairline-top">
          <Reveal>
            <div className="grid grid-cols-12 gap-8 mb-10">
              <div className="col-span-12 md:col-span-4">
                <span className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                  On the ledger
                </span>
                <h2 className="mt-3 font-serif-italic text-3xl sm:text-4xl md:text-5xl text-ink leading-[0.95]">
                  Where the
                  <br />
                  money goes.
                </h2>
              </div>
              <div className="col-span-12 md:col-span-8">
                <p className="text-[16.5px] leading-[1.75] text-ink-muted font-serif-book">
                  Most marketplaces will not tell you this on a marketing page. We
                  will. The standing form of a campaign payout is the table below — the
                  brand pays one number, the creator receives the larger part, the
                  desk keeps the smaller part. There is no platform take-rate hidden
                  behind it; what you read is what runs.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div
              className="rounded-3xl overflow-hidden nc-ledger"
              style={{
                background:
                  "linear-gradient(180deg, rgba(20,18,28,0.6) 0%, rgba(12,11,16,0.78) 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(125,90,255,0.18)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-hairline">
                <div className="p-7 sm:p-8">
                  <div className="small-caps text-[10px] tracking-[0.3em] text-ink-faint">
                    The brand pays
                  </div>
                  <div className="mt-3 font-serif-display text-5xl text-ink leading-none">
                    100<span className="text-ink-faint text-3xl align-top">%</span>
                  </div>
                  <p className="mt-4 text-[14px] leading-[1.65] text-ink-muted font-serif-book">
                    A single, flat fee, agreed in writing in the brief. Net-fifteen.
                    No retainer, no minimums, no hidden platform tax.
                  </p>
                </div>
                <div className="p-7 sm:p-8 relative">
                  <div className="small-caps text-[10px] tracking-[0.3em] text-forest">
                    The creator receives
                  </div>
                  <div
                    className="mt-3 font-serif-display text-5xl leading-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(95,225,214,0.95) 0%, rgba(60,196,184,0.6) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    85<span className="opacity-70 text-3xl align-top">%</span>
                  </div>
                  <p className="mt-4 text-[14px] leading-[1.65] text-ink-muted font-serif-book">
                    Stated upfront in the brief. Paid via Stripe Connect. Day-fifteen
                    fronting from the agency where a brand is late.
                  </p>
                </div>
                <div className="p-7 sm:p-8">
                  <div className="small-caps text-[10px] tracking-[0.3em] text-ink-faint">
                    The desk keeps
                  </div>
                  <div className="mt-3 font-serif-display text-5xl text-ink-soft leading-none">
                    15<span className="text-ink-faint text-3xl align-top">%</span>
                  </div>
                  <p className="mt-4 text-[14px] leading-[1.65] text-ink-muted font-serif-book">
                    The agency margin — pays the editorial desk, the publishing layer,
                    the day-fifteen fronting, the disputes path, and the lights.
                  </p>
                </div>
              </div>

              <div
                className="px-7 sm:px-8 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(0,0,0,0.18)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="block w-1.5 h-1.5 rounded-full bg-violet"
                    style={{ boxShadow: "0 0 8px rgba(125,90,255,0.55)" }}
                  />
                  <span className="small-caps text-[10px] tracking-[0.32em] text-ink-soft">
                    Payouts via Stripe Connect
                  </span>
                </div>
                <span className="font-mono-numeric text-[10.5px] tracking-[0.18em] text-ink-faint">
                  W-9 / W-8BEN collected before first payout · 1099-NEC issued in January
                </span>
              </div>
            </div>

            <p className="mt-6 max-w-3xl text-[13.5px] leading-[1.7] text-ink-faint font-serif-book">
              Where a campaign sits outside the standing margin — extended use rights,
              high-cost production, exclusive long-form windows — the brief names the
              alternative split in writing. Members see the figure they will receive
              before the campaign opens; brands see the same figure they will pay.
              There is no third number on either side of either page.
            </p>
          </Reveal>
        </section>

        <section className="mx-auto max-w-4xl py-20 text-center">
          <Reveal>
            <h2 className="font-serif-display text-5xl sm:text-6xl text-ink leading-[0.95]">
              Ready for
              <br />
              <span className="font-serif-italic">Step One?</span>
            </h2>
            <Link
              href="/#apply"
              className="mt-10 btn-primary inline-flex items-center gap-3 px-7 py-4 rounded-full text-[13px] tracking-wide"
            >
              Apply for membership
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
