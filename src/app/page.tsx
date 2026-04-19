import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { listCampaigns, formatMoney } from "@/lib/store";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import SignupForm from "./SignupForm";

export default async function Home() {
  const session = await getSession();
  if (session.creatorId) redirect("/dashboard");

  const open = (await listCampaigns({ status: "open" })).slice(0, 3);

  return (
    <>
      <Masthead />
      <main className="px-6 sm:px-10">
        <div className="mx-auto max-w-6xl">
          {/* Hero */}
          <section className="relative pt-16 sm:pt-24 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 relative">
                <p className="small-caps text-[11px] tracking-[0.3em] text-ink-muted nc-rise nc-rise-1">
                  An editorial · for · creators
                </p>
                <h1 className="mt-6 font-serif-display text-[clamp(3rem,9vw,8rem)] leading-[0.92] text-ink nc-rise nc-rise-2">
                  The quiet
                  <br />
                  <span className="font-serif-italic">members'</span> club
                  <br />
                  for creators
                  <span className="text-forest">.</span>
                </h1>
                <p className="mt-8 max-w-xl text-[17px] leading-[1.6] text-ink-muted nc-rise nc-rise-3">
                  Nexus Club is a small, curated network where creators with a distinctive voice
                  meet brand campaigns that respect them. No bidding wars, no spam, no posting
                  quotas — only work you'd sign your name to.
                </p>
              </div>

              <aside className="lg:col-span-5 lg:pl-10 lg:border-l lg:border-hairline nc-rise nc-rise-4">
                <div className="flex items-center gap-3 small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                  <span className="inline-block h-px w-6 bg-ink-faint" />
                  Apply for membership
                </div>
                <div className="mt-5">
                  <SignupForm />
                </div>
                <p className="mt-5 text-[11px] leading-relaxed text-ink-faint">
                  Membership is free. Instagram is connected via Meta's official OAuth — we never
                  see your password. Revoke access anytime from Instagram settings.
                </p>
              </aside>
            </div>

            {/* Masthead tagline strip */}
            <div className="mt-20 hairline-top pt-4 flex items-baseline justify-between gap-6 nc-rise nc-rise-5">
              <span className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                In this volume
              </span>
              <span className="font-mono-numeric text-[10px] tracking-widest text-ink-faint">
                001 — 004
              </span>
            </div>
          </section>

          {/* Three-column editorial grid */}
          <section className="pb-24 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
            <article>
              <header className="flex items-baseline gap-4">
                <span className="font-mono-numeric text-[11px] text-ink-faint">01</span>
                <h3 className="font-serif-display text-2xl text-ink">A curated roster</h3>
              </header>
              <p className="mt-4 text-[15px] leading-[1.65] text-ink-muted">
                Members are reviewed — we look for a strong point of view, not follower counts.
                Small brand rolls mean every campaign is meaningful.
              </p>
            </article>
            <article>
              <header className="flex items-baseline gap-4">
                <span className="font-mono-numeric text-[11px] text-ink-faint">02</span>
                <h3 className="font-serif-display text-2xl text-ink">Direct to the work</h3>
              </header>
              <p className="mt-4 text-[15px] leading-[1.65] text-ink-muted">
                Campaigns post openly; apply with a short note. Approvals are fast. Payouts are
                flat and stated upfront.
              </p>
            </article>
            <article>
              <header className="flex items-baseline gap-4">
                <span className="font-mono-numeric text-[11px] text-ink-faint">03</span>
                <h3 className="font-serif-display text-2xl text-ink">Connected, consensually</h3>
              </header>
              <p className="mt-4 text-[15px] leading-[1.65] text-ink-muted">
                Instagram links via Meta's official OAuth so approved campaigns can publish with
                your permission. You revoke access at any time.
              </p>
            </article>
          </section>

          {/* Featured campaigns preview */}
          <section className="pb-28">
            <div className="flex items-end justify-between gap-4 mb-8">
              <div>
                <span className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                  From the desk · Current campaigns
                </span>
                <h2 className="mt-2 font-serif-italic text-4xl sm:text-5xl text-ink">
                  Now commissioning
                </h2>
              </div>
              <Link
                href="/campaigns"
                className="hidden sm:inline-block text-[13px] small-caps tracking-[0.2em] text-forest hover:text-forest-deep"
              >
                View all →
              </Link>
            </div>
            <div className="hairline-top">
              {open.length === 0 ? (
                <p className="py-10 text-ink-muted italic">
                  No open commissions this week. Check back soon.
                </p>
              ) : (
                <ul className="divide-y divide-hairline">
                  {open.map((c, i) => (
                    <li key={c.id}>
                      <Link
                        href={`/campaigns/${c.id}`}
                        className="grid grid-cols-12 gap-4 py-6 group hover:bg-paper-raised/60 transition-colors -mx-4 px-4 rounded"
                      >
                        <span className="col-span-1 font-mono-numeric text-[11px] pt-1 text-ink-faint">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="col-span-11 sm:col-span-7">
                          <div className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
                            {c.brand}
                          </div>
                          <div className="mt-1 font-serif-display text-2xl text-ink group-hover:text-forest transition-colors">
                            {c.title}
                          </div>
                          <p className="mt-1 text-[13px] text-ink-muted line-clamp-1">
                            {c.tagline}
                          </p>
                        </div>
                        <div className="hidden sm:block col-span-2 pt-2 text-[12px] text-ink-muted">
                          {c.deliverables
                            .map((d) => `${d.count}× ${d.kind}`)
                            .join(" · ")}
                        </div>
                        <div className="col-span-12 sm:col-span-2 sm:text-right pt-2 font-mono-numeric text-sm text-ink">
                          {formatMoney(c.payoutCents, c.currency)}
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Link
              href="/campaigns"
              className="mt-4 inline-block sm:hidden text-[13px] small-caps tracking-[0.2em] text-forest"
            >
              View all →
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
