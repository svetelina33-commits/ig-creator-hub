import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Masthead />
      <main className="px-6 sm:px-10">
        <section className="mx-auto max-w-5xl pt-20 sm:pt-28 pb-24 text-center">
          <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
            Error № 404
          </p>
          <h1 className="mt-4 font-serif-display text-[clamp(4rem,14vw,12rem)] leading-[0.85] text-ink">
            A <span className="font-serif-italic">misprint</span>.
          </h1>
          <p className="mt-8 max-w-xl mx-auto font-serif-book text-[17px] leading-[1.7] text-ink-muted">
            This page isn't in the edition. A link may be outdated, or the piece was pulled
            before we went to press.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/"
              className="inline-flex items-center gap-3 bg-ink text-paper px-7 py-4 text-[12px] small-caps tracking-[0.2em] hover:bg-forest transition-colors"
            >
              Return to the cover
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/campaigns"
              className="text-[12px] small-caps tracking-[0.2em] text-forest underline underline-offset-[6px] decoration-hairline-strong hover:decoration-forest"
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
