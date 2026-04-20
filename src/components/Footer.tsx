export function Footer() {
  return (
    <footer className="mt-32 px-6 sm:px-10 pb-12">
      <div className="mx-auto max-w-7xl">
        <div className="glass rounded-3xl px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-[11px] small-caps text-ink-muted">
          <div className="flex items-baseline gap-3">
            <span className="font-serif-italic text-xl text-ink normal-case tracking-normal">
              Nexus Club
            </span>
            <span className="hidden sm:inline text-ink-faint">·</span>
            <span className="hidden sm:inline">A private network for creators with a voice.</span>
          </div>
          <div className="flex items-center gap-4 sm:gap-5 font-mono-numeric flex-wrap text-[10px]">
            <a href="/about" className="hover:text-ink transition-colors">ABOUT</a>
            <a href="/how-it-works" className="hover:text-ink transition-colors">HOW IT WORKS</a>
            <a href="/dispatches" className="hover:text-ink transition-colors">DISPATCHES</a>
            <a href="/terms" className="hover:text-ink transition-colors">TERMS</a>
            <a href="/privacy" className="hover:text-ink transition-colors">PRIVACY</a>
            <a href="mailto:arcrxx@gmail.com" className="hover:text-ink transition-colors">CONTACT</a>
            <span className="text-ink-faint">EST. 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
