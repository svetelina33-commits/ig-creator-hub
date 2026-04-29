import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RunningHead, CenteredRule } from "@/components/Ornaments";
import { NexusSeal } from "@/components/NexusSeal";

export const metadata = {
  title: "Curation · Nexus Club",
  description:
    "How the desk reads applications, what gets a yes, what gets a later, and the rhythm of admission by Volume.",
};

const STEPS: { n: string; kicker: string; title: string; body: string }[] = [
  {
    n: "01",
    kicker: "Application",
    title: "The letter arrives.",
    body:
      "Members write three short answers, a handful of links to work they would point to, and the place they want to start. The form is short on purpose — what we are reading for can be answered briefly and read in a sitting. We acknowledge receipt within one business day.",
  },
  {
    n: "02",
    kicker: "First read",
    title: "The desk reads it on a single sitting.",
    body:
      "The application is read by an editor at the desk, in person, in one sitting, the way a magazine reads a pitch. There is no scoring rubric in the background, no algorithm ranking the queue, no automatic filter on follower counts or agency status. The first read is qualitative, complete, and slow.",
  },
  {
    n: "03",
    kicker: "Reading list",
    title: "A short list of work, requested.",
    body:
      "If the first read carries promise, the desk writes back and asks for three pieces of work the member would point to as their best — recent, but not necessarily polished. Drafts, behind-the-scenes, raw cuts are welcome. The reading list is the second read; it tells the desk how the member sees their own work.",
  },
  {
    n: "04",
    kicker: "Correspondence",
    title: "A short written exchange.",
    body:
      "Some applications go into a brief correspondence — never an interview, never a call. Two questions, an answer, sometimes a follow-up. The form is the form so that the work of admission stays in writing, where it can be returned to. Members keep the correspondence; we do too.",
  },
  {
    n: "05",
    kicker: "Decision",
    title: "A written decision arrives.",
    body:
      "The decision is one of three: yes, later, or not now. The decision is named, the reasoning is named, and the path back — when there is one — is named. The decision is dated and goes on the record. The desk replies within two business days of the last correspondence in the file.",
  },
  {
    n: "06",
    kicker: "Volume",
    title: "Members are invited in waves.",
    body:
      "New members are added by Volume. Each Volume opens with a brief editorial note and a small list of new names. Membership is sized to the desk's reading bandwidth, not to a growth target. The wave is small on purpose; the small wave is what the small club is.",
  },
];

const READ_FOR: { t: string; b: string }[] = [
  {
    t: "A point of view that survives a re-read.",
    b: "Most pitches read smaller on a second read; a few read larger. The latter is the one we want. Voice, framing, taste — the things that do not collapse under repeated reading.",
  },
  {
    t: "Work the member would sign their name to.",
    b: "Not the most viral piece, not the most paid, not the most recent. The piece the member would point to in five years and still recognise as theirs. Recognition is the test.",
  },
  {
    t: "Care about the form.",
    b: "Captions written like captions. Stories paced like stories. A reel that respects the runtime of a reel. Care about the form is the cheapest, surest signal of seriousness.",
  },
  {
    t: "A specific reader.",
    b: "Members who have a clear sense of who they are speaking to read better against briefs than members who are speaking to everyone. Specificity is generous; it lets the brief land.",
  },
];

const READ_NOT_FOR: { t: string; b: string }[] = [
  {
    t: "Follower count, alone.",
    b: "The single most-asked-about figure is the single least-weighted at the desk. We do not require a number. We do not bonus a number.",
  },
  {
    t: "Agency representation.",
    b: "Members come unrepresented and represented; both apply directly. Representation is not a credential at the door.",
  },
  {
    t: "A list of brands worked with.",
    b: "We read the work, not the logos around it. A member with one campaign they are proud of reads better than one with twenty they are not.",
  },
  {
    t: "Velocity.",
    b: "Short-form output speeds, daily-post cadence, frequency claims — we read for what the member made, not for how often they made it.",
  },
];

export default function CurationPage() {
  return (
    <>
      <Masthead />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />
        <span className="ambient-glow-2" aria-hidden />

        {/* ───── Masthead ───── */}
        <section className="mx-auto max-w-6xl pt-12 sm:pt-20 pb-16 relative">
          <Reveal>
            <RunningHead
              left="THE NEXUS CLUB"
              center="· CURATION ·"
              right="VOL. I · MMXXVI"
            />
          </Reveal>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            <div className="lg:col-span-8">
              <Reveal delay={120}>
                <h1 className="font-serif-display text-[clamp(3rem,8.4vw,7.4rem)] leading-[0.9] text-ink">
                  How the desk
                  <br />
                  <span className="font-serif-italic text-violet">reads.</span>
                </h1>
              </Reveal>
              <Reveal delay={300}>
                <p className="mt-9 max-w-2xl text-[19px] leading-[1.7] text-ink-muted font-serif-book drop-cap">
                  A members' club is the editor at the door. This is the standing
                  description of the door — what the desk reads in an application, what
                  it reads for, what it does not read for, and the pace at which a
                  decision arrives. The door is not a queue with numbers; it is a
                  reading, in writing, at the speed of a careful editor.
                </p>
              </Reveal>
            </div>
            <Reveal delay={200} className="lg:col-span-4 flex justify-center lg:justify-end">
              <div className="hidden lg:block opacity-90">
                <NexusSeal size="lg" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ───── Tenets ───── */}
        <section className="mx-auto max-w-6xl pb-20 hairline-top pt-12">
          <Reveal>
            <header className="grid grid-cols-12 gap-6 mb-10">
              <div className="col-span-12 md:col-span-3">
                <div className="small-caps text-[10px] tracking-[0.3em] text-gold/85">
                  § I · Tenets
                </div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.05] max-w-3xl">
                  Three tenets, kept{" "}
                  <span className="font-serif-italic">on the desk.</span>
                </h2>
              </div>
            </header>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                k: "I",
                t: "A person reads.",
                b: "Every application is read by an editor on the desk. Not a model. Not a queue triage. The first read is the same as the last read: qualitative, complete, in writing.",
              },
              {
                k: "II",
                t: "The standard is the work.",
                b: "We read for voice, point of view, and care about the form — the things a working desk would itself care about. We do not weigh follower counts, agency status, or brand logos at the door.",
              },
              {
                k: "III",
                t: "The pace is honest.",
                b: "Acknowledgement in one business day. Decision within two of the last correspondence in the file. New members invited by Volume — small waves, paced to reading bandwidth, not to growth.",
              },
            ].map((p, idx) => (
              <Reveal key={p.k} delay={idx * 70}>
                <article
                  className="nc-card rounded-2xl p-6 h-full"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(20,18,28,0.6) 0%, rgba(12,11,16,0.78) 100%)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 1px rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="small-caps text-[10px] tracking-[0.3em] text-gold/75">
                      Tenet § {p.k}
                    </span>
                    <span className="font-mono-numeric text-[10px] text-ink-faint">
                      —
                    </span>
                  </div>
                  <div className="font-serif-display text-2xl text-ink leading-tight">
                    {p.t}
                  </div>
                  <p className="mt-4 text-[14.5px] leading-[1.7] text-ink-muted font-serif-book">
                    {p.b}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <CenteredRule className="mx-auto max-w-6xl" />

        {/* ───── Procedure ───── */}
        <section className="mx-auto max-w-6xl pb-24 pt-16">
          <Reveal>
            <header className="grid grid-cols-12 gap-6 mb-12">
              <div className="col-span-12 md:col-span-3">
                <div className="small-caps text-[10px] tracking-[0.3em] text-gold/85">
                  § II · Procedure
                </div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.05] max-w-3xl">
                  Six steps, all in{" "}
                  <span className="font-serif-italic">writing.</span>
                </h2>
                <p className="mt-5 max-w-2xl text-[15.5px] leading-[1.7] text-ink-muted font-serif-book">
                  Below is the standing procedure. Some applications travel through every
                  step; some skip step three or four because the work in step two has
                  already answered the question. The procedure scales to the application;
                  the application does not scale to the procedure.
                </p>
              </div>
            </header>
          </Reveal>

          <ol className="space-y-12">
            {STEPS.map((s, idx) => (
              <Reveal key={s.n} delay={idx * 60}>
                <li className="grid grid-cols-12 gap-6 md:gap-10 hairline-top pt-10">
                  <div className="col-span-12 md:col-span-4">
                    <div className="small-caps text-[10px] tracking-[0.3em] text-violet/80">
                      Step {s.n}
                    </div>
                    <div
                      className="mt-2 font-serif-display text-[5.6rem] leading-none tracking-tight"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(160,135,255,0.95) 0%, rgba(106,71,230,0.55) 100%)",
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
                  <div className="col-span-12 md:col-span-8">
                    <h3 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-ink leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-5 text-[16.5px] leading-[1.75] text-ink-muted font-serif-book max-w-2xl">
                      {s.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        <CenteredRule className="mx-auto max-w-6xl" />

        {/* ───── Read for / not for ───── */}
        <section className="mx-auto max-w-6xl pb-24 pt-16">
          <Reveal>
            <header className="grid grid-cols-12 gap-6 mb-10">
              <div className="col-span-12 md:col-span-3">
                <div className="small-caps text-[10px] tracking-[0.3em] text-gold/85">
                  § III · Standard
                </div>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.05]">
                  What the desk{" "}
                  <span className="font-serif-italic">reads for.</span>
                </h2>
              </div>
            </header>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <Reveal delay={80}>
              <div>
                <div className="flex items-baseline gap-3 mb-5">
                  <span
                    aria-hidden
                    className="block w-2 h-2 rounded-full"
                    style={{
                      background: "var(--forest)",
                      boxShadow: "0 0 10px var(--forest-glow)",
                    }}
                  />
                  <span className="small-caps text-[10px] tracking-[0.32em] text-forest">
                    For —
                  </span>
                </div>
                <ul className="space-y-7">
                  {READ_FOR.map((r) => (
                    <li key={r.t} className="hairline-top pt-5">
                      <div className="font-serif-display text-xl text-ink leading-snug">
                        {r.t}
                      </div>
                      <p className="mt-2.5 text-[15px] leading-[1.7] text-ink-muted font-serif-book">
                        {r.b}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={160}>
              <div>
                <div className="flex items-baseline gap-3 mb-5">
                  <span
                    aria-hidden
                    className="block w-2 h-2 rounded-full"
                    style={{
                      background: "var(--vermillion)",
                      boxShadow: "0 0 10px rgba(255,94,103,0.45)",
                    }}
                  />
                  <span className="small-caps text-[10px] tracking-[0.32em] text-vermillion/90">
                    Not for —
                  </span>
                </div>
                <ul className="space-y-7">
                  {READ_NOT_FOR.map((r) => (
                    <li key={r.t} className="hairline-top pt-5">
                      <div className="font-serif-display text-xl text-ink leading-snug">
                        {r.t}
                      </div>
                      <p className="mt-2.5 text-[15px] leading-[1.7] text-ink-muted font-serif-book">
                        {r.b}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <CenteredRule className="mx-auto max-w-6xl" />

        {/* ───── On 'later', and on numbers ───── */}
        <section className="mx-auto max-w-4xl pb-24 pt-20">
          <Reveal>
            <header className="mb-10">
              <div className="small-caps text-[10px] tracking-[0.3em] text-gold/85">
                § IV · On the answer
              </div>
              <h2 className="mt-3 font-serif-display text-3xl sm:text-4xl md:text-5xl text-ink leading-[1.05]">
                A note on{" "}
                <span className="font-serif-italic">‘later’</span>, and on numbers.
              </h2>
            </header>
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-5 text-[16.5px] leading-[1.78] text-ink-muted font-serif-book">
              <p>
                <em className="font-serif-italic text-ink">Later</em> is a real
                outcome at this desk. It does not mean a quiet no, and it does not mean
                a deferred yes; it means the application reads with promise that the
                current Volume cannot do justice to. Later applications are held in a
                smaller queue, re-read at the start of each Volume, and either move
                forward or are written to with a final answer.
              </p>
              <p>
                We are often asked for an acceptance rate. We do not publish one. The
                queue is curated by Volume, not by quota; the rate would change
                meaningfully across Volumes and would imply a competitive frame the
                desk does not work in. If you want to know whether the desk thinks a
                particular profile would fit, the application is the way to ask. We
                read every one.
              </p>
              <p>
                We do publish the rhythm. Acknowledgement in one business day. First
                read within five. If the application travels through correspondence,
                the decision arrives within two business days of the last letter in the
                file. New members are invited in waves at the open of each Volume — the
                next wave is dated in the dispatches.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ───── CTA ───── */}
        <section className="mx-auto max-w-4xl py-20 text-center">
          <Reveal>
            <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
              — to write to the desk —
            </p>
            <h2 className="mt-4 font-serif-display text-5xl sm:text-6xl text-ink leading-[0.95]">
              The application is{" "}
              <span className="font-serif-italic">how the desk</span>
              <br />
              hears from you first.
            </h2>
            <div className="mt-10 flex items-center justify-center gap-3 flex-wrap">
              <Link
                href="/#apply"
                className="btn-primary inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-[13px] tracking-wide"
              >
                Request membership
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/about"
                className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px]"
              >
                Read the manifesto
              </Link>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
