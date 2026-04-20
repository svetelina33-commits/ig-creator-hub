"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  email?: string | null;
  isAdmin?: boolean;
  issue?: string;
};

export function Masthead({ email, isAdmin, issue }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="sticky top-0 z-40 px-4 sm:px-6 pt-4">
      <header
        className={`mx-auto max-w-7xl ${scrolled ? "glass-strong" : "glass"} rounded-full px-5 sm:px-6 py-2.5 transition-all duration-500`}
      >
        <div className="flex items-center justify-between gap-6">
          <Link href="/" className="flex items-baseline gap-2 group">
            <span className="font-serif-italic text-2xl leading-none text-ink">Nexus</span>
            <span className="font-serif-display small-caps text-[11px] leading-none text-ink-muted group-hover:text-ink transition-colors">
              Club
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-[13px] text-ink-soft">
            <NavLink href="/campaigns">Campaigns</NavLink>
            <NavLink href="/creators">Members</NavLink>
            <NavLink href="/how-it-works">How it works</NavLink>
            <NavLink href="/about">About</NavLink>
            <NavLink href="/dispatches">Dispatches</NavLink>
            {isAdmin && <NavLink href="/admin" accent>Atelier</NavLink>}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("nc:open-command"))}
              className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] text-ink-muted glass glass-hover"
              title="Open command palette"
            >
              <span>Search</span>
              <kbd className="font-mono-numeric text-[10px] px-1.5 py-0.5 bg-white/5 rounded">
                ⌘K
              </kbd>
            </button>
            {email ? (
              <Link
                href="/dashboard"
                className="text-[12px] px-3.5 py-1.5 rounded-full text-ink btn-ghost"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link href="/login" className="hidden sm:inline text-[12px] px-3 py-1.5 text-ink-soft hover:text-ink transition-colors">
                  Sign in
                </Link>
                <Link href="/#apply" className="text-[12px] px-4 py-1.5 rounded-full btn-primary">
                  Join
                </Link>
              </>
            )}
          </div>
        </div>
        {issue && (
          <div className="text-center running-head mt-1">{issue}</div>
        )}
      </header>
    </div>
  );
}

function NavLink({
  href,
  children,
  accent,
}: {
  href: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-1.5 rounded-full transition-colors ${
        accent ? "text-forest hover:text-ink" : "text-ink-soft hover:text-ink"
      } hover:bg-white/5`}
    >
      {children}
    </Link>
  );
}
