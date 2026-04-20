import Link from "next/link";
import { notFound } from "next/navigation";
import { findCreatorByProfileSlug, listApplicationsForCreator } from "@/lib/store";
import { getSession } from "@/lib/session";
import { findCreatorById } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RunningHead } from "@/components/Ornaments";

type Params = Promise<{ slug: string }>;

const accentColor: Record<string, string> = {
  forest: "text-forest",
  vermillion: "text-vermillion",
  ochre: "text-ochre",
  ink: "text-ink",
};
const accentBg: Record<string, string> = {
  forest: "bg-forest",
  vermillion: "bg-vermillion",
  ochre: "bg-ochre",
  ink: "bg-ink",
};

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const c = await findCreatorByProfileSlug(slug);
  if (!c?.profile) return { title: "Creator · Nexus Club" };
  return {
    title: `${c.profile.displayName} · Nexus Club`,
    description: c.profile.bio.slice(0, 160) || `${c.profile.displayName} on Nexus Club`,
  };
}

export default async function CreatorProfilePage({ params }: { params: Params }) {
  const { slug } = await params;
  const creator = await findCreatorByProfileSlug(slug);
  if (!creator || !creator.profile || !creator.profile.isPublic) notFound();

  const session = await getSession();
  const me = session.creatorId ? await findCreatorById(session.creatorId) : null;
  const admin = await isAdmin();
  const apps = await listApplicationsForCreator(creator.id);
  const approvedCount = apps.filter((a) => a.status === "approved").length;

  const p = creator.profile;
  const accent = accentColor[p.accent];
  const bg = accentBg[p.accent];

  return (
    <>
      <Masthead email={me?.email} isAdmin={admin} />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />
        {/* Hero */}
        <section className="mx-auto max-w-6xl pt-14 pb-16 relative">
          <Reveal>
            <RunningHead left="MEMBER PROFILE" center="· NEXUS CLUB ·" right={`@${p.slug}`} />
          </Reveal>
          <Reveal delay={120} className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-9">
                <div className="flex items-center gap-4 mb-5">
                  <span className={`inline-block w-16 h-px ${bg}`} />
                  <span className="small-caps text-[11px] tracking-[0.3em] text-ink-muted">
                    {p.city || "—"}
                  </span>
                </div>
                <h1 className="font-serif-display text-[clamp(3rem,9vw,8rem)] leading-[0.88] text-ink">
                  {p.displayName}
                  <span className={accent}>.</span>
                </h1>
              </div>
              <div className="lg:col-span-3 lg:border-l lg:border-hairline lg:pl-8 space-y-3">
                {creator.instagram && (
                  <div>
                    <div className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                      Instagram
                    </div>
                    <div className="mt-1 font-serif-italic text-xl text-ink">
                      @{creator.instagram.username}
                    </div>
                  </div>
                )}
                <div>
                  <div className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                    Member since
                  </div>
                  <div className="mt-1 font-mono-numeric text-sm text-ink">
                    {new Date(creator.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <div>
                  <div className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                    Campaigns completed
                  </div>
                  <div className={`mt-1 font-mono-numeric text-2xl ${accent}`}>
                    {String(approvedCount).padStart(2, "0")}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Bio + niches */}
        <section className="mx-auto max-w-6xl pb-16 hairline-top">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12">
            <Reveal className="lg:col-span-5">
              <span className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                On the work
              </span>
              <p className="mt-4 font-serif-book text-[19px] leading-[1.75] text-ink drop-cap">
                {p.bio || "—"}
              </p>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-7 lg:pl-8 lg:border-l lg:border-hairline space-y-10">
              {p.niches.length > 0 && (
                <div>
                  <div className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                    Niches
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.niches.map((n) => (
                      <span
                        key={n}
                        className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 small-caps text-[11px] tracking-[0.2em] text-ink"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {p.portfolioLinks.length > 0 && (
                <div>
                  <div className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                    Portfolio
                  </div>
                  <ul className="mt-3 divide-y divide-hairline">
                    {p.portfolioLinks.map((l, i) => (
                      <li key={i} className="py-3">
                        <a
                          href={l.url}
                          target="_blank"
                          rel="noreferrer nofollow"
                          className="dot-leader flex items-baseline gap-3 group"
                        >
                          <span className="font-serif-display text-lg text-ink group-hover:text-forest">
                            {l.label}
                          </span>
                          <span className="ml-auto pl-2 font-mono-numeric text-[11px] text-ink-faint">
                            {new URL(l.url).hostname} →
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Reveal>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="mx-auto max-w-4xl py-20 hairline-top text-center">
          <Reveal>
            <p className="font-serif-italic text-3xl text-ink-muted">
              Interested in commissioning {p.displayName}?
            </p>
            <a
              href="mailto:arcrxx@gmail.com?subject=Commission%20inquiry"
              className="mt-8 btn-primary inline-flex items-center gap-3 px-7 py-4 rounded-full text-[13px] tracking-wide"
            >
              Write the editor
              <span aria-hidden>→</span>
            </a>
          </Reveal>
        </section>

        {me?.id === creator.id && (
          <div className="mx-auto max-w-6xl pb-10 small-caps text-[10px] tracking-[0.25em] text-ink-faint">
            <Link href="/settings" className="hover:text-forest">
              ← edit your profile
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
