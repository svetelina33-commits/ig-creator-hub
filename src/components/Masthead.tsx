"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  email?: string | null;
  isAdmin?: boolean;
  issue?: string;
};

export function Masthead({ email, isAdmin, issue }: Props) {
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    );
  }, []);

  return (
    <header className="px-6 sm:px-10 pt-6 pb-5 hairline-bottom relative z-40">
      <div className="mx-auto max-w-7xl">
        {/* Top running head */}
        <div className="running-head flex items-center justify-between gap-6">
          <span className="font-mono-numeric">{today || "\u00A0"}</span>
          <span className="hidden sm:block tracking-[0.4em]">Nº 0001 · THE DESK</span>
          <span className="font-mono-numeric">{issue ?? "VOL. I · 2026"}</span>
        </div>

        {/* Main masthead row */}
        <div className="mt-4 flex items-end justify-between gap-6">
          <Link href="/" className="group flex items-baseline gap-3">
            <span className="font-serif-italic text-5xl sm:text-6xl leading-none text-ink">
              Nexus
            </span>
            <span className="font-serif-display text-xl sm:text-2xl leading-none small-caps text-ink">
              Club
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7 text-[13px] text-ink">
            <Link className="hover:text-forest transition-colors" href="/campaigns">
              Campaigns
            </Link>
            <Link className="hover:text-forest transition-colors" href="/how-it-works">
              How it works
            </Link>
            <Link className="hover:text-forest transition-colors" href="/about">
              About
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
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent("nc:open-command"));
              }}
              className="hidden lg:inline-flex items-center gap-2 px-2 py-1 text-[11px] small-caps tracking-[0.2em] text-ink-faint border border-hairline hover:border-ink-muted hover:text-ink transition-colors"
              title="Open command palette"
            >
              <kbd className="font-mono-numeric text-[10px]">⌘K</kbd>
              Search
            </button>
          </nav>

          {/* Mobile nav */}
          <nav className="md:hidden flex items-center gap-4 text-[12px] text-ink">
            <Link className="hover:text-forest" href="/campaigns">
              Campaigns
            </Link>
            {email ? (
              <Link className="hover:text-forest" href="/dashboard">
                Dashboard
              </Link>
            ) : (
              <Link className="hover:text-forest" href="/login">
                Sign in
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
