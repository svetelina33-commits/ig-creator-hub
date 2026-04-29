import Link from "next/link";
import { NexusSeal } from "@/components/NexusSeal";
import { META_APPROVAL } from "@/lib/verification";

export function Footer() {
  return (
    <footer className="mt-32 px-6 sm:px-10 pb-12">
      <div className="mx-auto max-w-7xl">
        <div className="nc-flourish mb-12" aria-hidden />

        {/* Centerpiece seal */}
        <div className="flex flex-col items-center text-center gap-5 mb-10">
          <NexusSeal size="lg" />
          <div className="space-y-2">
            <p className="font-serif-italic text-2xl text-ink">
              Nexus <span className="font-serif-display small-caps text-[13px] tracking-[0.3em] text-ink-muted align-middle ml-1">Club</span>
            </p>
            <p className="small-caps text-[10px] tracking-[0.35em] text-ink-muted">
              A private network for creators with a voice
            </p>
          </div>

          {/* Authorized partner stamp — links to the Letter of Authorization */}
          <Link
            href="/verification"
            className="mt-3 inline-flex items-center gap-2.5 px-4 py-2 rounded-full group transition-colors"
            style={{
              background: "linear-gradient(90deg, rgba(231,206,148,0.04), rgba(231,206,148,0.08), rgba(231,206,148,0.04))",
              boxShadow: "inset 0 0 0 1px rgba(231,206,148,0.22)",
            }}
          >
            <span
              aria-hidden
              className="block w-1.5 h-1.5 rounded-full bg-gold"
              style={{ boxShadow: "0 0 8px rgba(231,206,148,0.55)" }}
            />
            <span className="small-caps text-[10px] tracking-[0.32em] text-gold/85 group-hover:text-gold transition-colors">
              Authorized · Instagram Graph API Partner
              <span className="text-gold/40 mx-1.5">·</span>
              <span className="font-mono-numeric tracking-[0.18em]">
                № {META_APPROVAL.partnerRef}
              </span>
            </span>
          </Link>
        </div>

        <div className="glass rounded-3xl px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 text-ink-muted">
          <span className="font-mono-numeric text-[12px] tracking-[0.18em] text-ink-faint">
            EST. MMXXVI · VOL. I
          </span>
          <div className="flex items-center gap-5 sm:gap-7 font-mono-numeric flex-wrap text-[12px] tracking-[0.14em]">
            <a href="/about" className="hover:text-ink transition-colors">ABOUT</a>
            <a href="/how-it-works" className="hover:text-ink transition-colors">HOW IT WORKS</a>
            <a href="/dispatches" className="hover:text-ink transition-colors">DISPATCHES</a>
            <a href="/help" className="hover:text-ink transition-colors">HELP</a>
            <a href="/support" className="hover:text-ink transition-colors">SUPPORT</a>
            <a href="/terms" className="hover:text-ink transition-colors">TERMS</a>
            <a href="/privacy" className="hover:text-ink transition-colors">PRIVACY</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
