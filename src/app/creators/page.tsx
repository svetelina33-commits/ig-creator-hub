import Link from "next/link";
import { getSession } from "@/lib/session";
import { findCreatorById, listPublicCreators } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RunningHead } from "@/components/Ornaments";
import {
  FEATURED_DIRECTORY,
  featuredPageCount,
  type FeaturedCategory,
  type FeaturedPage,
} from "@/lib/featured-pages";

export const metadata = { title: "Members · Nexus Club" };

export default async function CreatorsIndexPage() {
  const session = await getSession();
  const me = session.creatorId ? await findCreatorById(session.creatorId) : null;
  const admin = await isAdmin();
  const members = await listPublicCreators();
  const featuredTotal = featuredPageCount();

  return (
    <>
      <Masthead email={me?.email} isAdmin={admin} />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />
        <section className="mx-auto max-w-6xl pt-14 sm:pt-20 pb-12 relative">
          <Reveal>
            <RunningHead
              left="THE ROSTER · FEATURED"
              center="· VOL. I ·"
              right={`${String(featuredTotal).padStart(2, "0")} PAGES`}
            />
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-8 font-serif-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-ink">
              The <span className="font-serif-italic">roster</span>
              <span className="text-violet">.</span>
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-[15.5px] leading-[1.7] text-ink-muted">
              Pages we're watching — the reference standard by niche. Not members, but the
              accounts setting the bar in every register we commission against. Click through
              to study the source.
            </p>
          </Reveal>
        </section>

        {/* Featured directory — external Instagram pages, categorized */}
        <section className="mx-auto max-w-6xl pb-16 space-y-14">
          {FEATURED_DIRECTORY.map((cat, i) => (
            <CategoryBlock key={cat.id} category={cat} delay={i * 80} />
          ))}
        </section>

        {/* Actual signed-up members — only rendered if any have published */}
        {members.length > 0 && (
          <section className="mx-auto max-w-6xl pb-24 pt-12 hairline-top">
            <Reveal>
              <div className="mb-8 flex items-baseline justify-between gap-4">
                <div>
                  <p className="small-caps text-[11px] tracking-[0.22em] text-ink-muted">
                    Members on file
                  </p>
                  <h2 className="mt-2 font-serif-display text-4xl text-ink">
                    Published <span className="font-serif-italic text-ink-soft">creators</span>
                  </h2>
                </div>
                <span className="small-caps text-[11px] tracking-[0.22em] text-forest">
                  ● {members.length.toString().padStart(2, "0")} public
                </span>
              </div>
            </Reveal>

            <ul className="glass rounded-2xl divide-y divide-white/10 overflow-hidden">
              {members.map((m, i) => (
                <Reveal key={m.id} delay={i * 60} as="li">
                  <Link
                    href={`/creators/${m.profile!.slug}`}
                    className="grid grid-cols-12 gap-6 px-5 py-6 group hover:bg-white/5 transition-colors"
                  >
                    <div className="col-span-12 md:col-span-1 font-mono-numeric text-[11px] text-ink-faint pt-2">
                      №{String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <div className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
                        {m.profile!.city || "—"}
                      </div>
                      <div className="mt-1 font-serif-display text-3xl text-ink group-hover:text-forest transition-colors leading-tight">
                        {m.profile!.displayName}
                      </div>
                      {m.profile!.bio && (
                        <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-ink-muted font-serif-book line-clamp-2">
                          {m.profile!.bio}
                        </p>
                      )}
                    </div>
                    <div className="col-span-6 md:col-span-3 pt-2">
                      <div className="flex flex-wrap gap-1">
                        {m.profile!.niches.slice(0, 3).map((n) => (
                          <span
                            key={n}
                            className="small-caps text-[10px] tracking-[0.2em] text-ink-muted border border-white/10 bg-white/5 rounded-full px-2.5 py-1"
                          >
                            {n}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-6 md:col-span-2 text-right pt-2 font-mono-numeric text-[11px] text-ink-faint">
                      @{m.profile!.slug} →
                    </div>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}

const ACCENT_COLOR: Record<FeaturedCategory["accent"], string> = {
  forest: "text-forest",
  vermillion: "text-vermillion",
  ochre: "text-ochre",
  ink: "text-violet",
};

const ACCENT_DOT: Record<FeaturedCategory["accent"], string> = {
  forest: "bg-forest",
  vermillion: "bg-vermillion",
  ochre: "bg-ochre",
  ink: "bg-violet",
};

function CategoryBlock({
  category,
  delay,
}: {
  category: FeaturedCategory;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <header className="mb-5 flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2.5">
            <span
              className={`inline-block w-1.5 h-1.5 rounded-full ${ACCENT_DOT[category.accent]}`}
              aria-hidden
            />
            <span className="small-caps text-[10.5px] tracking-[0.28em] text-ink-muted">
              {category.kicker}
            </span>
          </div>
          <h2 className="mt-2 font-serif-display text-3xl sm:text-4xl text-ink">
            {category.title}
          </h2>
        </div>
        <span className="font-mono-numeric text-[11px] tracking-[0.2em] text-ink-faint">
          № {String(category.pages.length).padStart(2, "0")} PAGES
        </span>
      </header>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.pages.map((page) => (
          <li key={page.handle}>
            <FeaturedCard page={page} accent={category.accent} />
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

function FeaturedCard({
  page,
  accent,
}: {
  page: FeaturedPage;
  accent: FeaturedCategory["accent"];
}) {
  return (
    <a
      href={`https://instagram.com/${page.handle}`}
      target="_blank"
      rel="noreferrer noopener"
      className="nc-card glass glass-hover rounded-2xl p-5 h-full flex flex-col gap-4 group block"
    >
      <div className="flex items-start justify-between gap-3">
        <InstagramGlyph accent={accent} />
        <span className="small-caps text-[9.5px] tracking-[0.22em] text-ink-faint group-hover:text-ink-muted transition-colors">
          {page.followers ? `● ${page.followers}` : "view on IG"}
        </span>
      </div>

      <div className="flex-1">
        <div className="font-serif-display text-[22px] leading-[1.15] text-ink">
          {page.name}
        </div>
        <div className={`mt-1 font-mono-numeric text-[12px] ${ACCENT_COLOR[accent]}`}>
          @{page.handle}
        </div>
        <p className="mt-3 text-[13px] leading-[1.6] text-ink-muted">{page.description}</p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <span className="small-caps text-[10px] tracking-[0.22em] text-ink-muted group-hover:text-ink transition-colors">
          Open on Instagram
        </span>
        <span
          aria-hidden
          className="small-caps text-[10px] text-ink-faint group-hover:text-ink group-hover:translate-x-0.5 transition-all"
        >
          ↗
        </span>
      </div>
    </a>
  );
}

/**
 * Minimal line-art Instagram mark — editorial, not the glossy gradient
 * brand logo (which would clash with the dark typographic surface).
 */
function InstagramGlyph({ accent }: { accent: FeaturedCategory["accent"] }) {
  const stroke = {
    forest: "rgba(95, 225, 214, 0.9)",
    vermillion: "rgba(255, 138, 147, 0.9)",
    ochre: "rgba(243, 193, 121, 0.9)",
    ink: "rgba(155, 123, 255, 0.9)",
  }[accent];
  return (
    <span
      aria-hidden
      className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-white/10 bg-white/[0.02]"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.9" fill={stroke} stroke="none" />
      </svg>
    </span>
  );
}
