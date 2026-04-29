import Link from "next/link";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { getSession } from "@/lib/session";
import { findCreatorById } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import {
  CATEGORIES,
  articlesByCategory,
  findCategory,
  type CategorySlug,
} from "@/lib/help-articles";

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const cat = findCategory(category);
  if (!cat) return { title: "Help Center · Nexus Club" };
  return {
    title: `${cat.name} · Help Center · Nexus Club`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = findCategory(category);
  if (!cat) notFound();

  const session = await getSession();
  const creator = session.creatorId ? await findCreatorById(session.creatorId) : null;
  const admin = await isAdmin();

  const articles = articlesByCategory(cat.slug as CategorySlug);
  const tier1 = articles.filter((a) => a.tier === 1);
  const others = articles.filter((a) => a.tier !== 1);

  return (
    <>
      <Masthead email={creator?.email} isAdmin={admin} />
      <main className="px-5 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />

        {/* Breadcrumb + masthead */}
        <section className="mx-auto max-w-5xl pt-12 sm:pt-20 pb-12">
          <Reveal>
            <div className="flex items-center justify-between gap-4 small-caps text-[10px] tracking-[0.32em] text-ink-faint">
              <Link
                href="/help"
                className="hover:text-ink-soft transition-colors inline-flex items-center gap-2"
              >
                <span aria-hidden>←</span>
                Help Center
              </Link>
              <span className="hidden sm:inline tracking-[0.55em]">·</span>
              <span>
                §{cat.number} · {articles.length} articles
              </span>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-9">
              <Reveal delay={120}>
                <span
                  className="font-serif-display text-[clamp(4.5rem,11vw,8.5rem)] leading-[0.9] tracking-tight block mb-4"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(243,224,178,0.95) 0%, rgba(208,155,79,0.55) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  §{cat.number}
                </span>
              </Reveal>
              <Reveal delay={240}>
                <h1 className="font-serif-display text-[clamp(2.4rem,5.6vw,4.4rem)] leading-[0.95] tracking-tight text-ink">
                  {cat.name}
                  <span className="text-gold/95">.</span>
                </h1>
              </Reveal>
              <Reveal delay={360}>
                <p className="mt-3 small-caps text-[10px] tracking-[0.32em] text-gold/65">
                  {cat.kicker}
                </p>
              </Reveal>
              <Reveal delay={480}>
                <p className="mt-7 max-w-2xl text-[16px] leading-[1.7] text-ink-muted font-serif-book">
                  {cat.description}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Tier 1 — featured */}
        {tier1.length > 0 && (
          <section className="mx-auto max-w-5xl pb-12">
            <Reveal>
              <div className="flex items-baseline justify-between gap-4 mb-5">
                <span className="small-caps text-[10px] tracking-[0.3em] text-gold/70">
                  ◆ Most-read in this section
                </span>
              </div>
            </Reveal>
            <ul className="space-y-3">
              {tier1.map((article, i) => (
                <Reveal key={article.slug} delay={i * 40}>
                  <li>
                    <ArticleRow
                      slug={article.slug}
                      title={article.title}
                      excerpt={article.excerpt}
                      categorySlug={cat.slug}
                      featured
                    />
                  </li>
                </Reveal>
              ))}
            </ul>
          </section>
        )}

        {/* Other articles */}
        {others.length > 0 && (
          <section className="mx-auto max-w-5xl pb-16">
            <Reveal>
              <div className="flex items-baseline justify-between gap-4 mb-5 pt-8 hairline-top">
                <span className="small-caps text-[10px] tracking-[0.3em] text-ink-faint pt-6">
                  More in {cat.name.toLowerCase()}
                </span>
              </div>
            </Reveal>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {others.map((article, i) => (
                <Reveal key={article.slug} delay={i * 30}>
                  <li>
                    <ArticleRow
                      slug={article.slug}
                      title={article.title}
                      excerpt={article.excerpt}
                      categorySlug={cat.slug}
                    />
                  </li>
                </Reveal>
              ))}
            </ul>
          </section>
        )}

        {/* Other categories */}
        <section className="mx-auto max-w-5xl py-14 hairline-top">
          <span className="small-caps text-[10px] tracking-[0.3em] text-ink-faint">
            Other sections
          </span>
          <ul className="mt-5 flex flex-wrap gap-2">
            {CATEGORIES.filter((c) => c.slug !== cat.slug).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/help/${c.slug}`}
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[12px] text-ink-muted hover:text-ink-soft transition-colors"
                  style={{
                    background: "rgba(20,18,14,0.7)",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07)",
                  }}
                >
                  <span className="font-mono-numeric text-[10px] tracking-[0.2em] text-gold/65">
                    §{c.number}
                  </span>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Still need help */}
        <section className="mx-auto max-w-3xl py-16 text-center">
          <p className="small-caps text-[10px] tracking-[0.3em] text-gold/65">
            Still stuck?
          </p>
          <h2 className="mt-3 font-serif-display text-[32px] sm:text-[40px] leading-[1] text-ink">
            Write to <span className="font-serif-italic text-gold/95">the editor.</span>
          </h2>
          <div className="mt-7 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/support"
              className="btn-primary inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-[13px] tracking-wide"
            >
              Open a support thread
              <span aria-hidden>→</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function ArticleRow({
  slug,
  title,
  excerpt,
  categorySlug,
  featured,
}: {
  slug: string;
  title: string;
  excerpt: string;
  categorySlug: string;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/help/${categorySlug}/${slug}`}
      className="group block rounded-2xl px-5 sm:px-7 py-5 transition-colors"
      style={{
        background: "rgba(14,12,10,0.78)",
        boxShadow: featured
          ? "inset 0 0 0 1px rgba(231,206,148,0.22), 0 0 0 1px rgba(231,206,148,0.08)"
          : "inset 0 0 0 1px rgba(255,255,255,0.07)",
      }}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3
          className={`font-serif-display ${
            featured ? "text-[22px] sm:text-[24px]" : "text-[18px] sm:text-[20px]"
          } text-ink leading-[1.2] tracking-tight`}
        >
          {title}
        </h3>
        <span
          aria-hidden
          className="font-mono-numeric text-[11px] text-ink-faint group-hover:text-gold transition-colors shrink-0"
        >
          →
        </span>
      </div>
      <p className="mt-2 text-[13.5px] leading-[1.55] text-ink-muted font-serif-book line-clamp-2">
        {excerpt}
      </p>
    </Link>
  );
}
