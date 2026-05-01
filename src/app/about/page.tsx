import Link from "next/link";
import { getSession } from "@/lib/session";
import { findCreatorById } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { CenteredRule, RunningHead } from "@/components/Ornaments";

export const metadata = {
  title: "About · Nexus Club",
  description: "A curated network for creators with a distinctive voice.",
};

export default async function AboutPage() {
  const session = await getSession();
  const creator = session.creatorId ? await findCreatorById(session.creatorId) : null;
  const admin = await isAdmin();

  return (
    <>
      <Masthead email={creator?.email} isAdmin={admin} />

      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />
        {/* ===== Manifesto hero ===== */}
        <section className="mx-auto max-w-5xl pt-14 sm:pt-20 pb-20 relative">
          <Reveal>
            <RunningHead left="MANIFESTO" center="· NEXUS CLUB ·" right="VOL. I · 2026" />
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-8 font-serif-display text-[clamp(2.4rem,7.5vw,7rem)] leading-[0.95] sm:leading-[0.9] text-ink">
              A club is not a
              <br />
              <span className="font-serif-italic text-violet">marketplace</span>
              <span className="text-violet">.</span>
            </h1>
          </Reveal>
          <Reveal delay={280}>
            <p className="mt-10 font-serif-book text-[19px] leading-[1.7] text-ink max-w-2xl drop-cap">
              We started Nexus Club because the creator economy has become a bidding war. Brands
              post open call-outs; creators race to the bottom with rate cuts, speed-written
              pitches, and "for exposure" work. The result is a flood that rewards the loudest,
              not the ones with a point of view. That wasn't a club — it was a cattle call.
            </p>
          </Reveal>
          <Reveal delay={440}>
            <p className="mt-6 font-serif-book text-[19px] leading-[1.7] text-ink-muted max-w-2xl">
              So we built the opposite. A small network. Curated on both sides. Flat, stated
              payouts. An editor who actually reads applications. And a publishing layer that only
              touches your account after you've approved the brief and, if you wish, revoked
              access the moment it's done.
            </p>
          </Reveal>
        </section>

        <CenteredRule className="mx-auto max-w-6xl" />

        {/* ===== What we believe ===== */}
        <section className="mx-auto max-w-6xl py-20">
          <Reveal>
            <div className="flex items-baseline justify-between mb-12">
              <h2 className="font-serif-italic text-3xl sm:text-4xl md:text-5xl text-ink">What we believe</h2>
              <span className="font-mono-numeric text-[11px] text-ink-faint">§ II</span>
            </div>
          </Reveal>

          <div className="space-y-14">
            {[
              {
                n: "01",
                h: "Creative voice is the only moat.",
                b: "Followers buy a moment. A point of view earns a decade. We pick members by how they see — never by how many see them.",
              },
              {
                n: "02",
                h: "The editor should read your application.",
                b: "Not an algorithm. Not a procurement form. A human with taste, who writes back within two business days with a decision and a reason.",
              },
              {
                n: "03",
                h: "Posting is a consent, not a contract.",
                b: "Meta's OAuth, encrypted tokens, per-campaign publishing rights, revoke any time. We never see your password. If you leave, your posting access leaves with you.",
              },
              {
                n: "04",
                h: "Payouts are flat and upfront.",
                b: "No performance clauses. No clawbacks tied to metrics you don't control. What the brief says is what you're paid.",
              },
              {
                n: "05",
                h: "Quiet is a protection.",
                b: "We don't print members' names without their say-so. Members don't print other members' details without theirs. The non-disclosure clause that runs through this club is the article that earns the word 'private' — read it in the Terms, kept in the House Rules.",
              },
            ].map((item, idx) => (
              <Reveal key={item.n} delay={idx * 100}>
                <article className="grid grid-cols-12 gap-6 hairline-top pt-8">
                  <div className="col-span-12 md:col-span-2">
                    <span className="font-mono-numeric text-[11px] text-ink-faint">
                      ARTICLE {item.n}
                    </span>
                  </div>
                  <div className="col-span-12 md:col-span-10">
                    <h3 className="font-serif-display text-xl sm:text-2xl md:text-3xl text-ink leading-tight">
                      {item.h}
                    </h3>
                    <p className="mt-4 text-[17px] leading-[1.75] text-ink-muted max-w-2xl font-serif-book">
                      {item.b}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== Volume to date — place-based proof, honest counts ===== */}
        <section className="mx-auto max-w-6xl py-20 hairline-top">
          <Reveal>
            <div className="flex items-baseline justify-between mb-12">
              <h2 className="font-serif-italic text-3xl sm:text-4xl md:text-5xl text-ink leading-[0.95]">
                Volume to date.
              </h2>
              <span className="font-mono-numeric text-[11px] text-ink-faint">§ III</span>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="mb-10 max-w-2xl text-[15.5px] leading-[1.75] text-ink-muted font-serif-book">
              We do not publish creator-count metrics; the small club we want to run is
              the kind a number cannot describe. Below is what is on the shelf today —
              the documents the desk holds itself to, and the editorial volume in flight.
              The full transparency dispatch arrives at the close of Volume I.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { l: "Volume", v: "I", s: "MMXXVI · in flight", a: "ink" },
              { l: "Dispatches", v: "3", s: "Editor's notes published", a: "violet" },
              { l: "Trust chapters", v: "7", s: "On the standing shelf", a: "forest" },
              { l: "Authorization", v: "I", s: "Letter № NX-IGB-026", a: "gold" },
            ].map((t, i) => (
              <Reveal key={t.l} delay={i * 60}>
                <div
                  className="nc-card rounded-2xl p-6 h-full"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(20,18,28,0.55) 0%, rgba(12,11,16,0.7) 100%)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                    {t.l}
                  </div>
                  <div
                    className={`mt-3 font-serif-display text-5xl leading-none ${
                      t.a === "violet"
                        ? "text-violet"
                        : t.a === "forest"
                          ? "text-forest"
                          : t.a === "gold"
                            ? "text-violet"
                            : "text-ink"
                    }`}
                  >
                    {t.v}
                  </div>
                  <div className="mt-4 small-caps text-[9.5px] tracking-[0.28em] text-ink-faint">
                    {t.s}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== Colophon ===== */}
        <section className="mx-auto max-w-6xl py-20 hairline-top">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                <span className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                  Colophon
                </span>
                <h2 className="mt-3 font-serif-italic text-2xl sm:text-3xl md:text-4xl text-ink">
                  Set in Newsreader<br />&amp; Schibsted Grotesk.
                </h2>
              </div>
              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 text-[15px] leading-[1.7] text-ink-muted font-serif-book">
                <p>
                  Display set in Newsreader (Production Type, OFL) — an editorial serif
                  drawn for long-form reading, with an optical sizing axis from text to
                  display. Italic accents in Instrument Serif (Instrument Type, OFL). Body
                  in Schibsted Grotesk (Henrik Kubel for Schibsted, OFL) — a humanist
                  grotesque from the editorial identity of a Nordic news group. Numerics
                  in JetBrains Mono. Paper near-black; ink a warm bone.
                </p>
                <p>
                  Hosted on Vercel. Data in Neon Postgres, Singapore region. Email by Resend.
                  Payouts via Stripe Connect. The full subprocessor list — what each touches
                  and where it sits — is at{" "}
                  <Link href="/subprocessors" className="link-ed">/subprocessors</Link>.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Editor's signature — to be filled with the editor's name */}
          <Reveal delay={120}>
            <div className="mt-12 hairline-top pt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-7">
                <p className="text-[15px] leading-[1.7] text-ink-muted font-serif-book max-w-xl">
                  Every document on this site — terms, privacy, house rules, standards,
                  disputes, the Letter of Authorization — passes through one editor before
                  it is published. The desk is the same person who reads applications.
                  The signature below is theirs.
                </p>
              </div>
              <div className="md:col-span-5 md:text-right">
                <p className="small-caps text-[10px] tracking-[0.3em] text-ink-faint">
                  — from the desk —
                </p>
                {/*
                  EDITOR'S NAME — replace the placeholder below with the founding editor's
                  full name. A named editor is the single most premium addition to /about
                  per the credibility audit; a placeholder is shown until it is filled.
                */}
                <p className="mt-3 font-serif-italic text-3xl sm:text-4xl leading-tight">
                  <span
                    /* Violet gradient signature — the editor's name reads
                       as the colour signature of the publication, like ink
                       on letterhead. Light-violet → primary → deep, on a
                       diagonal so the stress lands on the descenders. */
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(176,154,255,0.98) 0%, rgba(125,90,255,0.95) 45%, rgba(99,70,216,0.85) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    [ the founding editor ]
                  </span>
                </p>
                <p className="mt-2 small-caps text-[10px] tracking-[0.3em] text-ink-faint">
                  Founding editor · The Nexus Club Agency
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ===== CTA ===== */}
        <section className="mx-auto max-w-4xl py-20 text-center">
          <Reveal>
            <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
              — an invitation —
            </p>
            <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl md:text-6xl text-ink leading-[0.95]">
              If this resonates,
              <br />
              <span className="font-serif-italic">apply.</span>
            </h2>
            <Link
              href="/#apply"
              className="mt-10 btn-primary inline-flex items-center gap-3 px-7 py-4 rounded-full text-[13px] tracking-wide"
            >
              Request membership
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
