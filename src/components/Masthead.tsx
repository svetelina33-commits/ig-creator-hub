import Link from "next/link";

type Props = {
  email?: string | null;
  isAdmin?: boolean;
  issue?: string;
};

export function Masthead({ email, isAdmin, issue = "VOL. I · 2026" }: Props) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return (
    <header className="px-6 sm:px-10 pt-8 pb-6 hairline-bottom">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-6 text-[10px] small-caps text-ink-muted">
          <span className="font-mono-numeric tracking-widest">{today}</span>
          <span className="hidden sm:block tracking-[0.4em]">Nº 0001</span>
          <span className="font-mono-numeric tracking-widest">{issue}</span>
        </div>
        <div className="mt-4 flex items-end justify-between gap-6">
          <Link href="/" className="group flex items-baseline gap-3">
            <span className="font-serif-italic text-5xl sm:text-6xl leading-none text-ink">
              Nexus
            </span>
            <span className="font-serif-display text-xl sm:text-2xl leading-none small-caps text-ink">
              Club
            </span>
          </Link>
          <nav className="hidden sm:flex items-center gap-7 text-[13px] text-ink">
            <Link className="hover:text-forest transition-colors" href="/campaigns">
              Campaigns
            </Link>
            {email ? (
              <Link className="hover:text-forest transition-colors" href="/dashboard">
                Dashboard
              </Link>
            ) : (
              <Link className="hover:text-forest transition-colors" href="/login">
                Sign in
              </Link>
            )}
            {isAdmin && (
              <Link className="hover:text-forest transition-colors" href="/admin">
                Atelier
              </Link>
            )}
            {email && (
              <span className="text-ink-faint text-[11px] small-caps font-mono-numeric">
                {email}
              </span>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
