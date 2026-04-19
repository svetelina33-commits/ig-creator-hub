export function Footer() {
  return (
    <footer className="mt-24 px-6 sm:px-10 pb-12 hairline-top">
      <div className="mx-auto max-w-6xl pt-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-[11px] small-caps text-ink-muted">
        <div>
          <span className="font-serif-italic text-base text-ink normal-case tracking-normal">
            Nexus Club
          </span>
          <span className="mx-3 text-ink-faint">·</span>
          <span>A private network for creators with a voice.</span>
        </div>
        <div className="flex items-center gap-5 font-mono-numeric">
          <a href="/terms" className="hover:text-forest">TERMS</a>
          <a href="/privacy" className="hover:text-forest">PRIVACY</a>
          <a href="mailto:arcrxx@gmail.com" className="hover:text-forest">CONTACT</a>
          <span className="text-ink-faint">EST. 2026</span>
        </div>
      </div>
    </footer>
  );
}
