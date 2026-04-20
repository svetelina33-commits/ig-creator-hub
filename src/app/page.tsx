import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { listCampaigns, listCreators, formatMoney } from "@/lib/store";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { CampaignCover } from "@/components/CampaignCover";
import { Reveal } from "@/components/Reveal";
import { CenteredRule, RunningHead, ToneChip } from "@/components/Ornaments";
import SignupForm from "./SignupForm";

export default async function Home() {
  const session = await getSession();
  if (session.creatorId) redirect("/dashboard");

  const [open, allCreators] = await Promise.all([
    listCampaigns({ status: "open" }),
    listCreators(),
  ]);
  const openCount = open.length;
  const memberCount = allCreators.length;
  const totalPayout = open.reduce((acc, c) => acc + c.payoutCents, 0);

  return (
    <>
      <Masthead />

      <main>
        {/* ===== HERO ===== */}
        <section className="relative px-6 sm:px-10 pt-14 sm:pt-20 pb-16 sm:pb-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-8 relative">
                <Reveal className="mb-6">
                  <RunningHead
                    left="AN EDITORIAL — FOR CREATORS"
                    center="· · ·"
                    right={`VOL. I · NO. ${String(openCount || 1).padStart(4, "0")}`}
                  />
                </Reveal>
                <Reveal delay={120}>
                  <h1 className="font-serif-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.88] text-ink">
                    The quiet
                    <br />
                    <span className="font-serif-italic">members'</span> club
                    <br />
                    for creators
                    <span className="text-forest">.</span>
                  </h1>
                </Reveal>
                <Reveal delay={300}>
                  <p className="mt-8 max-w-xl text-[17px] leading-[1.7] text-ink-muted font-serif-book">
                    A small, curated network where creators with a distinctive voice meet brand
                    campaigns that respect them. No bidding wars. No spam. No quotas. Only work
                    you'd sign your name to.
                  </p>
                </Reveal>
                <Reveal delay={440}>
                  <div className="mt-10 flex items-center gap-5 flex-wrap">
                    <Link
                      href="#apply"
                      className="nc-press inline-flex items-center gap-3 bg-ink text-paper px-7 py-4 text-[13px] small-caps tracking-[0.2em] hover:bg-forest transition-colors"
                    >
                      Apply for membership
                      <span aria-hidden>→</span>
                    </Link>
                    <Link
                      href="/how-it-works"
                      className="text-[13px] small-caps tracking-[0.2em] text-ink hover:text-forest underline underline-offset-[6px] decoration-hairline-strong hover:decoration-forest transition-colors"
                    >
                      How it works
                    </Link>
                  </div>
                </Reveal>
              </div>

              {/* Right column — stat tiles + cover preview */}
              <aside className="lg:col-span-4 lg:pl-8 lg:border-l lg:border-hairline">
                <Reveal delay={240} className="space-y-8">
                  <div>
                    <div className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                      This volume
                    </div>
                    <div className="mt-3 space-y-4">
                      <div className="flex items-baseline justify-between">
                        <span className="font-serif-book text-[15px] text-ink-muted">
                          Open commissions
                        </span>
                        <span className="font-mono-numeric text-2xl text-ink">
                          {String(openCount).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="font-serif-book text-[15px] text-ink-muted">
                          Members on file
                        </span>
                        <span className="font-mono-numeric text-2xl text-ink">
                          {String(memberCount).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="flex items-baseline justify-between">
                        <span className="font-serif-book text-[15px] text-ink-muted">
                          Commissioned
                        </span>
                        <span className="font-mono-numeric text-2xl text-forest">
                          {formatMoney(totalPayout, "USD")}
                        </span>
                      </div>
                    </div>
                  </div>
                  {open[0] && (
                    <div>
                      <div className="small-caps text-[10px] tracking-[0.3em] text-ink-muted mb-3">
                        From the cover
                      </div>
                      <Link
                        href={`/campaigns/${open[0].id}`}
                        className="block group"
                      >
                        <CampaignCover campaign={open[0]} variant="tall" />
                        <div className="mt-3 flex items-baseline justify-between">
                          <div>
                            <div className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
                              {open[0].brand}
                            </div>
                            <div className="font-serif-display text-xl text-ink group-hover:text-forest transition-colors">
                              {open[0].title}
                            </div>
                          </div>
                          <span className="font-mono-numeric text-sm text-ink">
                            {formatMoney(open[0].payoutCents, open[0].currency)}
                          </span>
                        </div>
                      </Link>
                    </div>
                  )}
                </Reveal>
              </aside>
            </div>
          </div>

          {/* Vertical ink mark on the far right */}
          <div
            aria-hidden
            className="hidden lg:block absolute right-10 top-40 writing-vertical small-caps text-[10px] tracking-[0.5em] text-ink-faint"
            style={{ writingMode: "vertical-rl" as const, transform: "rotate(180deg)" }}
          >
            NEXUS CLUB · EST. 2026 · PRIVATE EDITORIAL
          </div>
        </section>

        <CenteredRule className="mx-auto max-w-7xl px-6 sm:px-10" />

        {/* ===== MARQUEE of open brands ===== */}
        {open.length > 0 && (
          <section className="py-8 overflow-hidden hairline-bottom">
            <div className="nc-marquee whitespace-nowrap">
              {[...open, ...open, ...open].map((c, i) => (
                <span
                  key={`${c.id}-${i}`}
                  className="inline-flex items-center gap-6 px-8 font-serif-italic text-2xl text-ink"
                >
                  {c.brand}
                  <span className="font-mono-numeric text-[10px] tracking-[0.3em] text-ink-faint">
                    № {String((i % open.length) + 1).padStart(3, "0")}
                  </span>
                </span>
              ))}
            </div>
          </section>
        )}

        {/* ===== MANIFESTO ===== */}
        <section className="px-6 sm:px-10 py-24">
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10">
            <Reveal className="lg:col-span-4">
              <span className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                Dispatch · I
              </span>
              <h2 className="mt-3 font-serif-display text-5xl text-ink leading-[0.95]">
                A different
                <br />
                <span className="font-serif-italic">arrangement.</span>
              </h2>
            </Reveal>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  n: "01",
                  t: "A curated roster",
                  b: "Members are reviewed — we look for a distinct point of view, not follower counts. Small brand rolls mean every campaign is meaningful.",
                },
                {
                  n: "02",
                  t: "Direct to the work",
                  b: "Campaigns post openly; apply with a short note. Approvals are fast. Payouts are flat and stated upfront.",
                },
                {
                  n: "03",
                  t: "Consensual publishing",
                  b: "Instagram links via Meta's official OAuth so approved campaigns can publish with your permission. You revoke access at any time.",
                },
              ].map((item, idx) => (
                <Reveal key={item.n} delay={idx * 120}>
                  <div>
                    <header className="flex items-baseline gap-4">
                      <span className="font-mono-numeric text-[11px] text-ink-faint">{item.n}</span>
                      <h3 className="font-serif-display text-2xl text-ink">{item.t}</h3>
                    </header>
                    <p className="mt-4 text-[15px] leading-[1.7] text-ink-muted font-serif-book">
                      {item.b}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== OPEN CAMPAIGNS ===== */}
        <section className="px-6 sm:px-10 pb-24">
          <div className="mx-auto max-w-7xl">
            <Reveal className="flex items-end justify-between gap-4 mb-10">
              <div>
                <span className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                  From the desk · Current commissions
                </span>
                <h2 className="mt-2 font-serif-italic text-5xl text-ink">Now commissioning</h2>
              </div>
              <Link
                href="/campaigns"
                className="hidden sm:inline-block text-[13px] small-caps tracking-[0.2em] text-forest hover:text-forest-deep"
              >
                View all →
              </Link>
            </Reveal>
            {open.length === 0 ? (
              <p className="hairline-top pt-10 text-ink-muted italic">
                No open commissions this week. Check back soon.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {open.slice(0, 3).map((c, idx) => (
                  <Reveal key={c.id} delay={idx * 120}>
                    <Link
                      href={`/campaigns/${c.id}`}
                      className="nc-card block group"
                    >
                      <CampaignCover campaign={c} variant="rectangle" />
                      <div className="mt-4">
                        <ToneChip tone={c.coverTone} label={c.brand} />
                        <div className="mt-2 font-serif-display text-2xl text-ink group-hover:text-forest transition-colors leading-tight">
                          {c.title}
                        </div>
                        <p className="mt-2 text-[13px] text-ink-muted line-clamp-2 font-serif-book leading-relaxed">
                          {c.tagline}
                        </p>
                        <div className="mt-4 flex items-center justify-between text-[11px] text-ink-muted">
                          <span className="small-caps tracking-[0.2em]">
                            {c.deliverables.map((d) => `${d.count}×${d.kind}`).join(" · ")}
                          </span>
                          <span className="font-mono-numeric text-sm text-ink">
                            {formatMoney(c.payoutCents, c.currency)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
            <Link
              href="/campaigns"
              className="mt-8 inline-block sm:hidden text-[13px] small-caps tracking-[0.2em] text-forest"
            >
              View all →
            </Link>
          </div>
        </section>

        {/* ===== APPLY ===== */}
        <section id="apply" className="px-6 sm:px-10 py-24 hairline-top">
          <div className="mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <Reveal className="lg:col-span-5">
              <span className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                Join · membership · free
              </span>
              <h2 className="mt-3 font-serif-display text-5xl text-ink leading-[0.95]">
                <span className="font-serif-italic">Reserve</span>
                <br /> your seat.
              </h2>
              <p className="mt-6 text-[15px] text-ink-muted max-w-md font-serif-book leading-relaxed">
                Create your account, then link Instagram when you're ready. The editor reviews
                applications personally — expect a note back within two business days.
              </p>
            </Reveal>
            <Reveal delay={160} className="lg:col-span-7 lg:pl-10 lg:border-l lg:border-hairline">
              <SignupForm />
              <p className="mt-5 text-[11px] leading-relaxed text-ink-faint">
                Membership is free. Instagram is connected via Meta's official OAuth — we never see
                your password. Revoke access anytime from Instagram settings.
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
