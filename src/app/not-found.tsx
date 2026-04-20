import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Masthead />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />
        <section className="mx-auto max-w-5xl pt-20 sm:pt-28 pb-24 text-center relative">
          <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
            Error № 404
          </p>
          <h1 className="mt-4 font-serif-display text-[clamp(4rem,14vw,12rem)] leading-[0.85] text-ink">
            A <span className="font-serif-italic text-violet">misprint</span>.
          </h1>
          <p className="mt-8 max-w-xl mx-auto font-serif-book text-[17px] leading-[1.7] text-ink-muted">
            This page isn't in the edition. A link may be outdated, or the piece was pulled
            before we went to press.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/"
              className="btn-primary inline-flex items-center gap-3 px-7 py-4 rounded-full text-[12px] tracking-wide"
            >
              Return to the cover
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/campaigns"
              className="btn-ghost inline-flex items-center gap-2 px-6 py-3 rounded-full text-[12px]"
            >
              Open commissions
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
