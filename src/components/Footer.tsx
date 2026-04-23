import { NexusSeal } from "@/components/NexusSeal";

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
        </div>

        <div className="glass rounded-3xl px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 text-ink-muted">
          <span className="font-mono-numeric text-[12px] tracking-[0.18em] text-ink-faint">
            EST. MMXXVI · VOL. I
          </span>
          <div className="flex items-center gap-5 sm:gap-7 font-mono-numeric flex-wrap text-[12px] tracking-[0.14em]">
            <a href="/about" className="hover:text-ink transition-colors">ABOUT</a>
            <a href="/how-it-works" className="hover:text-ink transition-colors">HOW IT WORKS</a>
            <a href="/dispatches" className="hover:text-ink transition-colors">DISPATCHES</a>
            <a href="/terms" className="hover:text-ink transition-colors">TERMS</a>
            <a href="/privacy" className="hover:text-ink transition-colors">PRIVACY</a>
            <a href="mailto:yashpanchalsx@gmail.com" className="hover:text-ink transition-colors">CONTACT</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
