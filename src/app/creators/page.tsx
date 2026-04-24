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
        {category.pages.map((page, i) => (
          <li key={page.handle}>
            <FeaturedCard page={page} accent={category.accent} index={i} />
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

const ACCENT_HEX: Record<FeaturedCategory["accent"], string> = {
  forest: "#5FE1D6",
  vermillion: "#FF8A93",
  ochre: "#F3C179",
  ink: "#9B7BFF",
};

function FeaturedCard({
  page,
  accent,
  index,
}: {
  page: FeaturedPage;
  accent: FeaturedCategory["accent"];
  index: number;
}) {
  const href = `https://www.instagram.com/${page.handle}/`;
  const accentHex = ACCENT_HEX[accent];

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="nc-card glass glass-hover rounded-2xl h-full group block overflow-hidden relative"
    >
      {/* Accent hairline at top — gets brighter on hover */}
      <span
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px opacity-40 group-hover:opacity-90 transition-opacity"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accentHex} 40%, ${accentHex} 60%, transparent 100%)`,
        }}
      />

      <div className="p-5 h-full flex flex-col gap-5">
        {/* Header: IG logo + editorial number */}
        <div className="flex items-start justify-between gap-3">
          <InstagramGlyph accent={accent} />
          <span className="font-mono-numeric text-[10px] tracking-[0.22em] text-ink-faint">
            № {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Name + handle + verified */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-serif-display text-[24px] leading-[1.1] text-ink">
              {page.name}
            </h3>
            {page.verified && <VerifiedTick accent={accent} />}
          </div>

          <div className="mt-1.5 flex items-center gap-2.5 flex-wrap">
            <span
              className="font-mono-numeric text-[12px] tracking-[0.02em]"
              style={{ color: accentHex }}
            >
              @{page.handle}
            </span>
            {page.followers && (
              <>
                <span className="text-ink-ghost text-[10px]">·</span>
                <span className="font-mono-numeric text-[11px] text-ink-muted">
                  {page.followers}
                </span>
              </>
            )}
          </div>

          <p className="mt-3.5 text-[13px] leading-[1.6] text-ink-muted font-serif-book">
            {page.description}
          </p>
        </div>

        {/* Footer CTA */}
        <div className="flex items-center justify-between pt-3.5 border-t border-white/[0.06]">
          <span className="small-caps text-[10px] tracking-[0.22em] text-ink-muted group-hover:text-ink transition-colors">
            Open on Instagram
          </span>
          <span
            aria-hidden
            className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-white/10 bg-white/[0.02] group-hover:border-white/30 group-hover:bg-white/5 transition-all"
            style={{ color: accentHex }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M3 9 L9 3 M5 3 L9 3 L9 7" />
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

/**
 * Instagram wordmark/glyph — recognizable camera shape in accent color,
 * on a subtle inset plate. Closer to the brand silhouette than the
 * previous line-art glyph (user feedback: "it doesn't look like IG").
 */
function InstagramGlyph({ accent }: { accent: FeaturedCategory["accent"] }) {
  const color = ACCENT_HEX[accent];
  return (
    <span
      aria-hidden
      className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-white/10"
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, ${color}12 100%)`,
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        {/* Outer rounded square */}
        <rect
          x="2.5"
          y="2.5"
          width="19"
          height="19"
          rx="5.5"
          stroke={color}
          strokeWidth="1.6"
          fill="none"
        />
        {/* Camera lens */}
        <circle cx="12" cy="12" r="4.3" stroke={color} strokeWidth="1.6" fill="none" />
        <circle cx="12" cy="12" r="2.4" fill={color} opacity="0.25" />
        {/* Viewfinder dot (solid) */}
        <circle cx="17.4" cy="6.6" r="1.25" fill={color} />
      </svg>
    </span>
  );
}

function VerifiedTick({ accent }: { accent: FeaturedCategory["accent"] }) {
  const color = ACCENT_HEX[accent];
  return (
    <span
      aria-hidden
      title="Verified on Instagram"
      className="inline-flex items-center justify-center w-4 h-4 shrink-0"
    >
      <svg viewBox="0 0 16 16" width="16" height="16" fill={color}>
        <path d="M8 0.5 L9.9 2 L12.3 1.4 L13.1 3.8 L15.4 4.9 L14.8 7.3 L15.5 9.6 L13.3 10.9 L12.7 13.3 L10.3 12.9 L8 14.5 L5.7 12.9 L3.3 13.3 L2.7 10.9 L0.5 9.6 L1.2 7.3 L0.6 4.9 L2.9 3.8 L3.7 1.4 L6.1 2 Z" opacity="0.95" />
        <path d="M5 8.2 L7 10.2 L11 6" stroke="#09090C" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
