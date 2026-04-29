import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RunningHead } from "@/components/Ornaments";
import { HelpSearch } from "@/components/HelpSearch";
import { getSession } from "@/lib/session";
import { findCreatorById } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import {
  CATEGORIES,
  ARTICLES,
  popularArticles,
  searchableArticles,
} from "@/lib/help-articles";

export const metadata = {
  title: "Help Center · Nexus Club",
  description:
    "Articles, walkthroughs, and answers to the questions members ask most — from connecting Instagram to understanding payouts.",
};

export default async function HelpCenterPage() {
  const session = await getSession();
  const creator = session.creatorId ? await findCreatorById(session.creatorId) : null;
  const admin = await isAdmin();

  const popular = popularArticles(6);
  const searchData = searchableArticles();

  return (
    <>
      <Masthead email={creator?.email} isAdmin={admin} />
      <main className="px-5 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />

        {/* ════════════ Masthead + search ════════════ */}
        <section className="mx-auto max-w-6xl pt-12 sm:pt-20 pb-12 relative">
          <Reveal>
            <RunningHead
              left="HELP CENTER"
              center="· · ·"
              right={`${ARTICLES.length} ARTICLES · ${CATEGORIES.length} SECTIONS`}
            />
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-10 font-serif-display text-[clamp(2.8rem,7vw,6rem)] leading-[0.92] tracking-tight text-ink">
              How can <span className="font-serif-italic text-gold/95">we help.</span>
            </h1>
          </Reveal>

          <Reveal delay={260}>
            <p className="mt-6 max-w-2xl text-[16px] leading-[1.7] text-ink-muted font-serif-book">
              Articles, walkthroughs, and answers to the questions members ask most — from
              connecting Instagram to understanding payouts. Search below, or browse the
              twelve sections.
            </p>
          </Reveal>

          <Reveal delay={400}>
            <div className="mt-10 max-w-3xl">
              <HelpSearch articles={searchData} />
            </div>
          </Reveal>
        </section>

        {/* ════════════ Popular articles ════════════ */}
        <section className="mx-auto max-w-6xl pb-16">
          <Reveal>
            <div className="flex items-baseline justify-between gap-4 mb-6">
              <div className="flex items-baseline gap-3">
                <span className="font-mono-numeric text-[10px] tracking-[0.3em] text-gold/70">
                  ◆
                </span>
                <h2 className="small-caps text-[12px] tracking-[0.3em] text-ink-muted">
                  Most-read articles
                </h2>
              </div>
              <span className="small-caps text-[10px] tracking-[0.28em] text-ink-faint">
                Top {popular.length}
              </span>
            </div>
          </Reveal>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {popular.map((article, i) => {
              const cat = CATEGORIES.find((c) => c.slug === article.category)!;
              return (
                <Reveal key={article.slug} delay={i * 60}>
                  <li>
                    <Link
                      href={`/help/${article.category}/${article.slug}`}
                      className="group block h-full rounded-2xl p-5 sm:p-6 transition-all duration-500"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(20,18,14,0.7) 0%, rgba(12,11,9,0.85) 100%)",
                        boxShadow:
                          "inset 0 1px 0 rgba(231,206,148,0.08), 0 0 0 1px rgba(231,206,148,0.12)",
                      }}
                    >
                      <div className="flex items-baseline justify-between gap-3 mb-4">
                        <span className="small-caps text-[9.5px] tracking-[0.3em] text-gold/70">
                          §{cat.number} · {cat.name}
                        </span>
                        <span
                          aria-hidden
                          className="font-mono-numeric text-[10px] text-ink-faint group-hover:text-gold transition-colors"
                        >
                          ↗
                        </span>
                      </div>
                      <h3 className="font-serif-display text-[20px] sm:text-[22px] text-ink leading-[1.2] tracking-tight">
                        {article.title}
                      </h3>
                      <p className="mt-3 text-[13px] leading-[1.6] text-ink-muted font-serif-book line-clamp-3">
                        {article.excerpt}
                      </p>
                    </Link>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </section>

        {/* ════════════ All categories ════════════ */}
        <section className="mx-auto max-w-6xl pb-20 pt-10 hairline-top">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-4 items-end mb-10">
              <div className="md:col-span-7">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono-numeric text-[10px] tracking-[0.3em] text-gold/70">
                    ◆
                  </span>
                  <span className="small-caps text-[10px] tracking-[0.3em] text-ink-faint">
                    All sections
                  </span>
                </div>
                <h2 className="mt-3 font-serif-display text-[34px] sm:text-[42px] text-ink leading-[1.05] tracking-tight max-w-xl">
                  Every <span className="font-serif-italic">topic</span>, in one place.
                </h2>
              </div>
              <div className="md:col-span-5 md:flex md:justify-end md:pb-2">
                <p className="max-w-sm text-[13.5px] leading-[1.65] text-ink-muted font-serif-book md:text-right">
                  Twelve sections, organised the way the editor commissions —
                  from the application desk through to the day-fifteen payout.
                </p>
              </div>
            </div>
          </Reveal>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline rounded-2xl overflow-hidden">
            {CATEGORIES.map((cat, i) => {
              const count = ARTICLES.filter((a) => a.category === cat.slug).length;
              return (
                <Reveal key={cat.slug} as="li" delay={i * 40} className="h-full">
                  <Link
                    href={`/help/${cat.slug}`}
                    className="group block h-full px-6 sm:px-8 py-6 transition-colors hover:bg-white/[0.018]"
                    style={{ background: "rgba(14,12,10,0.85)" }}
                  >
                    <div className="grid grid-cols-[auto_1fr_auto] gap-5 items-baseline h-full">
                      <span
                        className="font-serif-display text-[44px] leading-none tracking-tight"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(243,224,178,0.95) 0%, rgba(208,155,79,0.55) 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {cat.number}
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-serif-display text-[22px] sm:text-[24px] text-ink leading-[1.2]">
                          {cat.name}
                        </h3>
                        <p className="mt-1 small-caps text-[10px] tracking-[0.3em] text-gold/65">
                          {cat.kicker}
                        </p>
                        <p className="mt-3 text-[13.5px] leading-[1.55] text-ink-muted font-serif-book max-w-md">
                          {cat.description}
                        </p>
                      </div>
                      <span className="font-mono-numeric text-[10px] tracking-[0.2em] text-ink-faint group-hover:text-gold transition-colors">
                        {String(count).padStart(2, "0")} →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </section>

        {/* ════════════ Still need help ════════════ */}
        <section className="mx-auto max-w-4xl py-20 text-center">
          <Reveal>
            <span className="small-caps text-[10px] tracking-[0.32em] text-gold/70">
              Couldn&apos;t find it?
            </span>
            <h2 className="mt-3 font-serif-display text-[40px] sm:text-[52px] leading-[0.96] text-ink">
              Write to <span className="font-serif-italic text-gold/95">the editor.</span>
            </h2>
            <p className="mt-5 max-w-xl mx-auto text-[15px] leading-[1.7] text-ink-muted font-serif-book">
              The desk reads every message. Replies typically land within twenty-four to
              forty-eight hours. There&apos;s no AI behind the support address — only people.
            </p>
            <div className="mt-9 flex items-center justify-center gap-4 flex-wrap">
              <Link
                href="/support"
                className="btn-primary inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-[13px] tracking-wide"
              >
                Open a support thread
                <span aria-hidden>→</span>
              </Link>
              <a
                href="mailto:support@thenexusclub.org"
                className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px]"
              >
                Email support@thenexusclub.org
              </a>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
