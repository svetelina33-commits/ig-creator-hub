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
        <section className="relative px-6 sm:px-10 pt-20 sm:pt-28 pb-20 sm:pb-28">
          <span className="ambient-glow" aria-hidden />
          <div className="mx-auto max-w-7xl relative">
            <Reveal className="mb-8">
              <RunningHead
                left="AN EDITORIAL — FOR CREATORS"
                center="· · ·"
                right={`VOL. I · NO. ${String(openCount || 1).padStart(4, "0")}`}
              />
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-8 relative">
                <Reveal delay={60}>
                  <h1 className="font-serif-display text-[clamp(3.5rem,10vw,9.5rem)] leading-[0.92] text-ink">
                    The quiet
                    <br />
                    <span className="font-serif-italic text-ink-soft">members'</span>
                    <br />
                    club for creators<span className="text-violet">.</span>
                  </h1>
                </Reveal>
                <Reveal delay={240}>
                  <p className="mt-10 max-w-xl text-[17px] leading-[1.7] text-ink-muted font-serif-book">
                    A small, curated network where creators with a distinctive voice meet brand
                    campaigns that respect them. No bidding wars. No spam. No quotas. Only work
                    you'd sign your name to.
                  </p>
                </Reveal>
                <Reveal delay={400}>
                  <div className="mt-10 flex items-center gap-4 flex-wrap">
                    <Link
                      href="#apply"
                      className="btn-primary inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-[13px] font-medium tracking-wide"
                    >
                      Apply for membership
                      <span aria-hidden>→</span>
                    </Link>
                    <Link
                      href="/how-it-works"
                      className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px]"
                    >
                      How it works
                    </Link>
                  </div>
                </Reveal>
              </div>

              <aside className="lg:col-span-4 lg:pl-2">
                <Reveal delay={200}>
                  <div className="glass rounded-2xl p-5 space-y-4">
                    <div className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                      Volume I · stats
                    </div>
                    <div className="space-y-3.5">
                      <Row label="Open commissions" value={String(openCount).padStart(2, "0")} />
                      <Row label="Members on file" value={String(memberCount).padStart(2, "0")} />
                      <Row
                        label="Commissioned"
                        value={formatMoney(totalPayout, "USD")}
                        accent
                      />
                    </div>
                  </div>
                </Reveal>
                {open[0] && (
                  <Reveal delay={340} className="mt-5">
                    <Link href={`/campaigns/${open[0].id}`} className="block group">
                      <div className="rounded-2xl overflow-hidden glass glass-hover">
                        <CampaignCover campaign={open[0]} variant="tall" className="rounded-none" />
                        <div className="p-4 flex items-baseline justify-between">
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
                      </div>
                    </Link>
                  </Reveal>
                )}
              </aside>
            </div>
          </div>
        </section>

        <CenteredRule className="mx-auto max-w-7xl px-6 sm:px-10" />

        {/* ===== MARQUEE ===== */}
        {open.length > 0 && (
          <section className="py-10 overflow-hidden">
            <div className="nc-marquee whitespace-nowrap">
              {[...open, ...open, ...open].map((c, i) => (
                <span
                  key={`${c.id}-${i}`}
                  className="inline-flex items-center gap-6 px-10 font-serif-italic text-3xl text-ink-soft"
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

        <CenteredRule className="mx-auto max-w-7xl px-6 sm:px-10" />

        {/* ===== MANIFESTO ===== */}
        <section className="px-6 sm:px-10 py-24 relative">
          <span className="ambient-glow-2" aria-hidden />
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10">
            <Reveal className="lg:col-span-4">
              <span className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                Dispatch · I
              </span>
              <h2 className="mt-3 font-serif-display text-5xl text-ink leading-[0.95]">
                A different
                <br />
                <span className="font-serif-italic text-forest">arrangement.</span>
              </h2>
            </Reveal>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5">
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
                  <div className="glass rounded-2xl p-6 h-full">
                    <header className="flex items-baseline gap-4">
                      <span className="font-mono-numeric text-[11px] text-ink-faint">{item.n}</span>
                      <h3 className="font-serif-display text-2xl text-ink">{item.t}</h3>
                    </header>
                    <p className="mt-4 text-[14.5px] leading-[1.7] text-ink-muted">
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
                className="hidden sm:inline-flex items-center gap-2 btn-ghost px-4 py-2 rounded-full text-[12px]"
              >
                View all
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
            {open.length === 0 ? (
              <p className="text-ink-muted italic">No open commissions this week.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {open.slice(0, 3).map((c, idx) => (
                  <Reveal key={c.id} delay={idx * 120}>
                    <Link href={`/campaigns/${c.id}`} className="nc-card block group">
                      <div className="glass glass-hover rounded-2xl overflow-hidden">
                        <CampaignCover campaign={c} variant="rectangle" className="rounded-none" />
                        <div className="p-5">
                          <ToneChip tone={c.coverTone} label={c.brand} />
                          <div className="mt-2.5 font-serif-display text-2xl text-ink leading-tight">
                            {c.title}
                          </div>
                          <p className="mt-2 text-[13px] text-ink-muted line-clamp-2 leading-relaxed">
                            {c.tagline}
                          </p>
                          <div className="mt-5 flex items-center justify-between text-[11px] text-ink-muted">
                            <span className="small-caps tracking-[0.2em]">
                              {c.deliverables.map((d) => `${d.count}×${d.kind}`).join(" · ")}
                            </span>
                            <span className="font-mono-numeric text-sm text-ink">
                              {formatMoney(c.payoutCents, c.currency)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ===== APPLY ===== */}
        <section id="apply" className="px-6 sm:px-10 py-24 relative">
          <span className="ambient-glow" aria-hidden />
          <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <Reveal className="lg:col-span-5">
              <span className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                Join · membership · free
              </span>
              <h2 className="mt-3 font-serif-display text-5xl text-ink leading-[0.95]">
                <span className="font-serif-italic text-violet">Reserve</span>
                <br /> your seat.
              </h2>
              <p className="mt-6 text-[15px] text-ink-muted max-w-md leading-relaxed">
                Create your account, then link Instagram when you're ready. The editor reviews
                applications personally — expect a note back within two business days.
              </p>
            </Reveal>
            <Reveal delay={160} className="lg:col-span-7">
              <div className="glass rounded-2xl p-6 sm:p-8">
                <SignupForm />
                <p className="mt-5 text-[11px] leading-relaxed text-ink-faint">
                  Membership is free. Instagram is connected via Meta's official OAuth — we never
                  see your password. Revoke access anytime.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-[14px] text-ink-muted">{label}</span>
      <span
        className={`font-mono-numeric text-xl ${accent ? "text-forest" : "text-ink"}`}
      >
        {value}
      </span>
    </div>
  );
}
