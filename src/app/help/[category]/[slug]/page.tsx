import Link from "next/link";
import { notFound } from "next/navigation";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { HelpArticleBody } from "@/components/HelpArticleBody";
import { getSession } from "@/lib/session";
import { findCreatorById } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import {
  findArticle,
  findCategory,
  relatedArticles,
} from "@/lib/help-articles";

type Props = { params: Promise<{ category: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { category, slug } = await params;
  const article = findArticle(category, slug);
  if (!article) return { title: "Help Center · Nexus Club" };
  return {
    title: `${article.title} · Help Center · Nexus Club`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { category, slug } = await params;
  const article = findArticle(category, slug);
  const cat = findCategory(category);
  if (!article || !cat) notFound();

  const session = await getSession();
  const creator = session.creatorId ? await findCreatorById(session.creatorId) : null;
  const admin = await isAdmin();

  const related = relatedArticles(article);

  return (
    <>
      <Masthead email={creator?.email} isAdmin={admin} />
      <main className="px-5 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />

        {/* Breadcrumb */}
        <section className="mx-auto max-w-3xl pt-12 sm:pt-16 pb-6">
          <Reveal>
            <nav className="flex items-center gap-2 small-caps text-[10px] tracking-[0.3em] text-ink-faint flex-wrap">
              <Link
                href="/help"
                className="hover:text-ink-soft transition-colors"
              >
                Help Center
              </Link>
              <span aria-hidden className="text-ink-ghost">/</span>
              <Link
                href={`/help/${cat.slug}`}
                className="hover:text-ink-soft transition-colors"
              >
                §{cat.number} · {cat.name}
              </Link>
            </nav>
          </Reveal>
        </section>

        {/* Article header */}
        <article className="mx-auto max-w-3xl pb-16">
          <Reveal>
            <header className="mb-10">
              <h1 className="font-serif-display text-[clamp(2.2rem,5.4vw,3.8rem)] leading-[1] tracking-tight text-ink">
                {article.title}
              </h1>
              <p className="mt-5 text-[16.5px] leading-[1.65] text-ink-muted font-serif-italic max-w-2xl">
                {article.excerpt}
              </p>
              <div className="mt-6 flex items-center gap-4 small-caps text-[10px] tracking-[0.28em] text-ink-faint">
                <span>§{cat.number} · {cat.name}</span>
                {article.updatedOn && (
                  <>
                    <span aria-hidden className="text-ink-ghost">·</span>
                    <span>
                      Updated{" "}
                      {new Date(article.updatedOn).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </>
                )}
              </div>
            </header>
          </Reveal>

          <Reveal delay={120}>
            <div className="hairline-top pt-10">
              <HelpArticleBody blocks={article.body} />
            </div>
          </Reveal>

          {/* In-article still-need-help */}
          <Reveal delay={240}>
            <aside
              className="mt-14 rounded-2xl px-6 py-7"
              style={{
                background:
                  "linear-gradient(180deg, rgba(20,18,14,0.7) 0%, rgba(12,11,9,0.85) 100%)",
                boxShadow:
                  "inset 0 1px 0 rgba(231,206,148,0.1), 0 0 0 1px rgba(231,206,148,0.16)",
              }}
            >
              <div className="flex items-baseline justify-between gap-4 flex-wrap">
                <div>
                  <span className="small-caps text-[10px] tracking-[0.3em] text-gold/70">
                    Was this helpful?
                  </span>
                  <p className="mt-2 font-serif-display text-[20px] sm:text-[22px] text-ink leading-tight">
                    If not, write to <span className="font-serif-italic">the editor.</span>
                  </p>
                  <p className="mt-1.5 text-[13px] text-ink-muted leading-[1.55]">
                    Real people read every message — replies typically within 24–48 hours.
                  </p>
                </div>
                <Link
                  href="/support"
                  className="btn-primary inline-flex items-center gap-3 px-6 py-3 rounded-full text-[13px] tracking-wide whitespace-nowrap"
                >
                  Open a support thread
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </aside>
          </Reveal>
        </article>

        {/* Related articles */}
        {related.length > 0 && (
          <section className="mx-auto max-w-3xl py-12 hairline-top">
            <Reveal>
              <span className="small-caps text-[10px] tracking-[0.3em] text-gold/70 block mb-5">
                ◆ Related articles
              </span>
            </Reveal>
            <ul className="space-y-3">
              {related.map((r, i) => {
                const rcat = findCategory(r.category)!;
                return (
                  <Reveal key={r.slug} delay={i * 40}>
                    <li>
                      <Link
                        href={`/help/${r.category}/${r.slug}`}
                        className="group block rounded-xl px-5 py-4 transition-colors"
                        style={{
                          background: "rgba(14,12,10,0.78)",
                          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.07)",
                        }}
                      >
                        <div className="flex items-baseline justify-between gap-3 mb-1.5">
                          <span className="small-caps text-[9.5px] tracking-[0.3em] text-gold/65">
                            §{rcat.number} · {rcat.name}
                          </span>
                          <span
                            aria-hidden
                            className="font-mono-numeric text-[10px] text-ink-faint group-hover:text-gold transition-colors"
                          >
                            →
                          </span>
                        </div>
                        <h3 className="font-serif-display text-[18px] text-ink leading-[1.25]">
                          {r.title}
                        </h3>
                        <p className="mt-1 text-[12.5px] leading-[1.55] text-ink-muted line-clamp-2">
                          {r.excerpt}
                        </p>
                      </Link>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </section>
        )}

        {/* Back to category */}
        <section className="mx-auto max-w-3xl py-10 text-center">
          <Link
            href={`/help/${cat.slug}`}
            className="inline-flex items-center gap-2 small-caps text-[10px] tracking-[0.3em] text-ink-muted hover:text-ink-soft transition-colors"
          >
            <span aria-hidden>←</span>
            All articles in §{cat.number} {cat.name}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
