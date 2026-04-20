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
            <h1 className="mt-8 font-serif-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-ink">
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
              <h2 className="font-serif-italic text-5xl text-ink">What we believe</h2>
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
            ].map((item, idx) => (
              <Reveal key={item.n} delay={idx * 100}>
                <article className="grid grid-cols-12 gap-6 hairline-top pt-8">
                  <div className="col-span-12 md:col-span-2">
                    <span className="font-mono-numeric text-[11px] text-ink-faint">
                      ARTICLE {item.n}
                    </span>
                  </div>
                  <div className="col-span-12 md:col-span-10">
                    <h3 className="font-serif-display text-3xl text-ink leading-tight">
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

        {/* ===== Colophon ===== */}
        <section className="mx-auto max-w-6xl py-20 hairline-top">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-4">
                <span className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                  Colophon
                </span>
                <h2 className="mt-3 font-serif-italic text-4xl text-ink">
                  Set in Fraunces<br />&amp; Figtree.
                </h2>
              </div>
              <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 text-[15px] leading-[1.7] text-ink-muted font-serif-book">
                <p>
                  Type is by Undercase (Fraunces) and Erik D. Kennedy (Figtree). Numerics set in
                  JetBrains Mono. Paper tone is a warm bone of our own mixing; ink is <em>
                    Nexus Green
                  </em> — dark forest with a hint of gunmetal.
                </p>
                <p>
                  Hosted on Vercel. Data in Neon Postgres. Email by Resend. All tiers free or at
                  cost — we keep Nexus Club lean so campaign payouts stay intact.
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
            <h2 className="mt-4 font-serif-display text-5xl sm:text-6xl text-ink leading-[0.95]">
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
