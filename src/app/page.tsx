import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { listCampaigns, listCreators, formatMoney } from "@/lib/store";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { CampaignCover } from "@/components/CampaignCover";
import { Reveal } from "@/components/Reveal";
import { CenteredRule, RunningHead, ToneChip } from "@/components/Ornaments";
import { AmbientOrbs } from "@/components/AmbientOrbs";
import { NexusSeal } from "@/components/NexusSeal";
import { VerificationStrip } from "@/components/VerificationStrip";
import { AuthorizedBadge } from "@/components/AuthorizedBadge";
import { spotClass } from "@/lib/spot";
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
        <section className="relative px-5 sm:px-10 pt-12 sm:pt-28 pb-16 sm:pb-28 overflow-x-clip">
          <AmbientOrbs />
          <div className="mx-auto max-w-7xl relative">
            {/* Credential badge as the first-impression trust signal —
                sits above the running head so a reader registers
                "authorized partner" before the headline lands. */}
            <Reveal className="mb-8">
              <AuthorizedBadge />
            </Reveal>
            <Reveal className="mb-8">
              <RunningHead
                left="AN EDITORIAL — FOR CREATORS"
                center="· · ·"
                right={`VOL. I · NO. ${String(openCount || 1).padStart(4, "0")}`}
              />
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-8 relative">
                <h1 className="font-serif-display text-[clamp(2.6rem,8.5vw,9.5rem)] leading-[0.92] sm:leading-[0.88] text-ink">
                  <span className="nc-word-in" style={{ animationDelay: "60ms" }}>The</span>{" "}
                  <span className="nc-word-in" style={{ animationDelay: "160ms" }}>quiet</span>{" "}
                  <span
                    className="nc-word-in font-serif-italic text-ink-soft"
                    style={{ animationDelay: "260ms" }}
                  >
                    members&apos;
                  </span>{" "}
                  <span className="nc-word-in" style={{ animationDelay: "360ms" }}>club</span>{" "}
                  <span className="nc-word-in" style={{ animationDelay: "440ms" }}>for</span>{" "}
                  <span className="nc-word-in" style={{ animationDelay: "520ms" }}>
                    creators<span className="text-violet">.</span>
                  </span>
                </h1>
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
                      data-magnetic
                      className="btn-primary nc-magnetic inline-flex items-center gap-3 px-7 py-4 sm:py-3.5 rounded-full text-[13px] font-medium tracking-wide min-h-[44px]"
                    >
                      Apply for membership
                      <span aria-hidden>→</span>
                    </Link>
                    <Link
                      href="/how-it-works"
                      className="btn-ghost inline-flex items-center gap-2 px-6 py-3.5 sm:py-3 rounded-full text-[13px] min-h-[44px]"
                    >
                      How it works
                    </Link>
                  </div>
                </Reveal>
              </div>

              <aside className="lg:col-span-4 lg:pl-2">
                <Reveal delay={200}>
                  <div className="glass rounded-2xl p-5 space-y-4 relative overflow-hidden">
                    <div className="flex items-center gap-2.5 small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                      <span aria-hidden className="opacity-70 shrink-0">
                        <NexusSeal size="xs" spin={false} />
                      </span>
                      <span>Volume I · stats</span>
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

            <div className="hidden sm:flex justify-center mt-20">
              <div className="nc-scroll-cue">
                <span className="small-caps text-[9px] tracking-[0.35em] text-ink-faint">
                  Scroll
                </span>
                <span className="nc-scroll-cue-track" />
              </div>
            </div>
          </div>
        </section>

        <CenteredRule className="mx-auto max-w-7xl px-6 sm:px-10" />

        {/* ===== MARQUEE ===== */}
        {open.length > 0 && (
          <section className="py-8 sm:py-10 overflow-hidden">
            <div className="nc-marquee whitespace-nowrap">
              {[...open, ...open, ...open].map((c, i) => (
                <span
                  key={`${c.id}-${i}`}
                  className="inline-flex items-center gap-3 sm:gap-6 px-5 sm:px-10 font-serif-italic text-xl sm:text-3xl text-ink-soft"
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

        {/* ===== MANIFESTO =====
            overflow-x-clip prevents horizontal scroll without trapping the
            ambient-glow-2 forest-tinted halo at the section bottom. The
            glow's natural radial fade now dissolves past the section
            boundary instead of getting clipped into a hard shadow line. */}
        <section className="px-5 sm:px-10 py-14 sm:py-24 relative overflow-x-clip">
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

        {/* ===== VERIFICATION STRIP ===== */}
        <VerificationStrip />

        {/* ===== OPEN CAMPAIGNS — horizontal slider ===== */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-10">
            <Reveal className="flex items-end justify-between gap-4 mb-8 flex-wrap">
              <div>
                <span className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                  From the desk · Current commissions
                </span>
                <h2 className="mt-2 font-serif-italic text-4xl sm:text-5xl text-ink">
                  Now commissioning
                </h2>
                <p className="mt-2 text-[13px] text-ink-muted">
                  {open.length.toString().padStart(2, "0")} open briefs · swipe to browse
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/campaigns/pitch"
                  data-magnetic
                  className="btn-primary nc-magnetic inline-flex items-center gap-2 px-5 py-3 sm:py-2.5 rounded-full text-[12px] min-h-[40px]"
                >
                  Pitch your own
                  <span aria-hidden>+</span>
                </Link>
                <Link
                  href="/campaigns"
                  className="btn-ghost inline-flex items-center gap-2 px-4 py-3 sm:py-2.5 rounded-full text-[12px] min-h-[40px]"
                >
                  View all
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </Reveal>
          </div>

          {open.length === 0 ? (
            <p className="px-6 text-ink-muted italic">No open commissions this week.</p>
          ) : (
            <div className="nc-slider-wrap">
              <div className="nc-slider">
                <ul className="nc-slider-track">
                {open.map((c) => (
                  <li key={c.id} className="nc-slider-item">
                    <Link
                      href={`/campaigns/${c.id}`}
                      className={`nc-card ${spotClass(c.coverTone)} block group h-full`}
                    >
                      <div className="glass glass-hover rounded-2xl overflow-hidden h-full flex flex-col">
                        <CampaignCover
                          campaign={c}
                          variant="rectangle"
                          className="rounded-none"
                        />
                        <div className="p-5 flex-1 flex flex-col">
                          <ToneChip tone={c.coverTone} label={c.brand} />
                          <div className="mt-2.5 font-serif-display text-2xl text-ink leading-tight">
                            {c.title}
                          </div>
                          <p className="mt-2 text-[13px] text-ink-muted line-clamp-2 leading-relaxed">
                            {c.tagline}
                          </p>
                          <div className="mt-auto pt-5 flex items-center justify-between text-[12px] text-ink-muted">
                            <span className="font-mono-numeric tracking-[0.05em] uppercase">
                              {c.deliverables.map((d) => `${d.count}×${d.kind}`).join(" · ")}
                            </span>
                            <span className="font-mono-numeric text-sm text-ink">
                              {formatMoney(c.payoutCents, c.currency)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
                {/* Pitch-your-own trailing card */}
                <li className="nc-slider-item">
                  <Link
                    href="/campaigns/pitch"
                    className="nc-card spot-violet block h-full group"
                  >
                    <div className="glass glass-hover rounded-2xl h-full p-6 flex flex-col justify-between border border-violet/25 bg-violet/[0.04]">
                      <div>
                        <span className="small-caps text-[10px] tracking-[0.3em] text-violet">
                          ◆ New · From creators
                        </span>
                        <h3 className="mt-4 font-serif-display text-3xl text-ink leading-tight">
                          Pitch your own <span className="font-serif-italic">campaign</span>.
                        </h3>
                        <p className="mt-3 text-[13.5px] leading-[1.6] text-ink-muted">
                          Got a brand in mind? Write the brief yourself — payout, deliverables,
                          timeline. We review and, if it fits the register, make it live for the
                          network.
                        </p>
                      </div>
                      <div className="mt-6 flex items-center gap-2 small-caps text-[11px] tracking-[0.22em] text-violet">
                        Submit a pitch
                        <span aria-hidden>→</span>
                      </div>
                    </div>
                  </Link>
                </li>
              </ul>
              </div>
            </div>
          )}
        </section>

        {/* ===== APPLY ===== */}
        <section id="apply" className="px-5 sm:px-10 py-14 sm:py-24 relative overflow-x-clip">
          <span className="ambient-glow" aria-hidden />
          <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <Reveal className="lg:col-span-5">
              <span className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                Join · membership · free
              </span>
              <h2 className="mt-3 font-serif-display text-4xl sm:text-5xl text-ink leading-[0.95]">
                <span className="font-serif-italic text-violet">Reserve</span>
                <br /> your seat.
              </h2>
              <p className="mt-6 text-[15px] text-ink-muted max-w-md leading-relaxed">
                Create your account, then link Instagram when you&apos;re ready. The editor
                reviews applications personally — expect a note back within two business days.
              </p>
            </Reveal>
            <Reveal delay={160} className="lg:col-span-7">
              <div className="glass rounded-2xl p-6 sm:p-8">
                <SignupForm />
                <p className="mt-5 text-[11px] leading-relaxed text-ink-faint">
                  Membership is free. We never sell or share your data. Revoke access anytime.
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
