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

/**
 * Deterministic hash so the same handle always renders the same avatar
 * across reloads.
 */
function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function FeaturedCard({
  page,
  accent,
  index,
}: {
  page: FeaturedPage;
  accent: FeaturedCategory["accent"];
  index: number;
}) {
  const accentHex = ACCENT_HEX[accent];
  const redactedHandle = redactHandle(page.handle);

  return (
    <div
      className="nc-card glass glass-hover rounded-2xl h-full block overflow-hidden relative group"
      /* Spot color tracks the creator's accent — `38` hex alpha (~22%)
         keeps the halo subtle. Each card's hover halo therefore matches
         its accent hairline up top. */
      style={{ ["--nc-spot" as string]: `${accentHex}38` } as React.CSSProperties}
    >
      {/* Accent hairline at top */}
      <span
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px opacity-60"
        style={{
          background: `linear-gradient(90deg, transparent 0%, ${accentHex} 40%, ${accentHex} 60%, transparent 100%)`,
        }}
      />

      <div className="p-5 h-full flex flex-col gap-5">
        {/* Header: generative avatar + editorial number */}
        <div className="flex items-start justify-between gap-3">
          <GenerativeAvatar seed={page.handle} name={page.name} accent={accent} />
          <span className="font-mono-numeric text-[10px] tracking-[0.22em] text-ink-faint">
            № {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Name + verified + redacted handle */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-serif-display text-[24px] leading-[1.1] text-ink">
              {page.name}
            </h3>
            {page.verified && <VerifiedTick accent={accent} />}
          </div>

          <div className="mt-1.5 flex items-center gap-2.5 flex-wrap">
            <span
              className="font-mono-numeric text-[12px] tracking-[0.1em] select-none"
              style={{ color: accentHex, filter: "blur(2.4px)" }}
              aria-hidden
              title="Handle redacted"
            >
              @{redactedHandle}
            </span>
          </div>

          <p className="mt-3.5 text-[13px] leading-[1.6] text-ink-muted font-serif-book">
            {page.description}
          </p>
        </div>

        {/* Footer: followers + verified badge */}
        <div className="flex items-center justify-between pt-3.5 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: accentHex }}
            />
            <span className="font-mono-numeric text-[11.5px] tracking-[0.08em] text-ink-soft">
              {page.followers ? `${page.followers} followers` : "private"}
            </span>
          </div>
          <span className="small-caps text-[9.5px] tracking-[0.25em] text-ink-faint">
            {page.verified ? "● verified" : "member"}
          </span>
        </div>
      </div>
    </div>
  );
}

function redactHandle(handle: string): string {
  // Keep the first char, replace the rest with ● (even for short handles).
  if (handle.length <= 2) return "●●●●●●";
  return handle[0] + "●".repeat(Math.min(8, handle.length - 1));
}

/**
 * Generative avatar — SVG composition seeded by the page handle, so each
 * card gets a unique premium-looking mark that's recognizably ours (not
 * scraped from Instagram). Accent color drives the glow / geometry tint.
 */
function GenerativeAvatar({
  seed,
  name,
  accent,
}: {
  seed: string;
  name: string;
  accent: FeaturedCategory["accent"];
}) {
  const color = ACCENT_HEX[accent];
  const h = hashSeed(seed);
  const monogram = deriveMonogram(name);

  // Seeded parameters for variety.
  const rotA = (h % 360);
  const rotB = ((h >> 3) % 360);
  const shapeSeed = (h >> 6) % 3;
  const uid = `av-${seed}`;

  return (
    <span
      aria-hidden
      className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl overflow-hidden"
      style={{
        background: `linear-gradient(${rotA}deg, ${color}28 0%, ${color}08 100%), radial-gradient(circle at 30% 20%, ${color}40 0%, transparent 55%)`,
        border: `1px solid ${color}35`,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <radialGradient id={`${uid}-glow`} cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill={`url(#${uid}-glow)`} />
        {/* Seeded geometry underlay — three families, deterministic */}
        {shapeSeed === 0 && (
          <g stroke={color} strokeWidth="0.6" fill="none" opacity="0.5" transform={`rotate(${rotB} 50 50)`}>
            <circle cx="50" cy="50" r="28" />
            <circle cx="50" cy="50" r="38" opacity="0.45" />
          </g>
        )}
        {shapeSeed === 1 && (
          <g stroke={color} strokeWidth="0.6" fill="none" opacity="0.45" transform={`rotate(${rotB} 50 50)`}>
            <path d="M 15 50 L 85 50 M 50 15 L 50 85" />
            <rect x="25" y="25" width="50" height="50" />
          </g>
        )}
        {shapeSeed === 2 && (
          <g stroke={color} strokeWidth="0.55" fill="none" opacity="0.5" transform={`rotate(${rotB} 50 50)`}>
            <polygon points="50,18 82,68 18,68" />
            <polygon points="50,82 82,32 18,32" opacity="0.35" />
          </g>
        )}
      </svg>
      <span
        className="relative font-serif-display text-[17px] leading-none"
        style={{ color, fontStyle: monogram.length === 1 ? "italic" : "normal", fontWeight: 500 }}
      >
        {monogram}
      </span>
    </span>
  );
}

function deriveMonogram(name: string): string {
  const clean = name.replace(/[^A-Za-z0-9 &]/g, "");
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "•";
  if (parts.length === 1) {
    const p = parts[0];
    return (p[0] + (p[1] ?? "")).toUpperCase();
  }
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function VerifiedTick({ accent }: { accent: FeaturedCategory["accent"] }) {
  const color = ACCENT_HEX[accent];
  return (
    <span
      aria-hidden
      title="Verified"
      className="inline-flex items-center justify-center w-4 h-4 shrink-0"
    >
      <svg viewBox="0 0 16 16" width="16" height="16" fill={color}>
        <path d="M8 0.5 L9.9 2 L12.3 1.4 L13.1 3.8 L15.4 4.9 L14.8 7.3 L15.5 9.6 L13.3 10.9 L12.7 13.3 L10.3 12.9 L8 14.5 L5.7 12.9 L3.3 13.3 L2.7 10.9 L0.5 9.6 L1.2 7.3 L0.6 4.9 L2.9 3.8 L3.7 1.4 L6.1 2 Z" opacity="0.95" />
        <path d="M5 8.2 L7 10.2 L11 6" stroke="#09090C" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
