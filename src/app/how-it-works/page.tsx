import Link from "next/link";
import { getSession } from "@/lib/session";
import { findCreatorById } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RunningHead } from "@/components/Ornaments";

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
    note: "Posting requires Instagram Business or Creator account. Meta App Review approval in progress.",
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
                      <p className="mt-4 text-[12px] small-caps tracking-[0.2em] text-vermillion">
                        · {s.note}
                      </p>
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
                  introduction — write directly to <a className="text-forest underline underline-offset-4" href="mailto:yashpanchalsx@gmail.com">yashpanchalsx@gmail.com</a> with a rough brief, budget, and timing. We'll confirm fit and open a campaign on your behalf.
                </p>
                <p className="text-[17px] leading-[1.75] text-ink-muted font-serif-book">
                  Fees are a flat commission on the final payout — no retainer, no minimums.
                </p>
              </div>
            </div>
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
