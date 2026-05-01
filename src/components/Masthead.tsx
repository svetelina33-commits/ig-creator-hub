"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { NexusSeal } from "@/components/NexusSeal";

type Props = {
  email?: string | null;
  isAdmin?: boolean;
  issue?: string;
};

export function Masthead({ email, isAdmin, issue }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <div className="sticky top-0 z-40 px-3 sm:px-6 pt-3 sm:pt-4">
        <header
          className={`mx-auto max-w-7xl ${scrolled ? "glass-strong" : "glass"} rounded-full px-4 sm:px-6 py-2.5 transition-all duration-500`}
        >
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 group shrink-0"
              aria-label="Nexus Club — home"
            >
              <NexusSeal size="sm" showText={false} />
              <span className="flex items-baseline gap-2">
                <span className="font-serif-italic text-xl sm:text-2xl leading-none text-ink">
                  Nexus
                </span>
                <span className="font-serif-display small-caps text-[11px] leading-none text-ink-muted group-hover:text-ink transition-colors">
                  Club
                </span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1 text-[13px] text-ink-soft">
              <NavLink href="/campaigns">Campaigns</NavLink>
              <NavLink href="/creators">Members</NavLink>
              {email && <NavLink href="/earnings">Withdraw</NavLink>}
              <NavLink href="/how-it-works">How it works</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/trust">Trust</NavLink>
              <NavLink href="/dispatches">Dispatches</NavLink>
              {email && <NavLink href="/support">Support</NavLink>}
              {isAdmin && (
                <NavLink href="/admin" accent>
                  Atelier
                </NavLink>
              )}
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

              {/* Desktop CTA */}
              <div className="hidden md:flex items-center gap-2">
                {email ? (
                  <Link
                    href="/dashboard"
                    className="text-[12px] px-3.5 py-1.5 rounded-full text-ink btn-ghost"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-[12px] px-3 py-1.5 text-ink-soft hover:text-ink transition-colors"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/#apply"
                      className="text-[12px] px-4 py-1.5 rounded-full btn-primary"
                    >
                      Join
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button
                type="button"
                aria-label="Open menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                className="md:hidden w-11 h-11 rounded-full glass inline-flex items-center justify-center"
              >
                <HamburgerIcon open={menuOpen} />
              </button>
            </div>
          </div>
          {issue && <div className="text-center running-head mt-1">{issue}</div>}
        </header>
      </div>

      {mounted &&
        createPortal(
          <MobileMenuOverlay
            open={menuOpen}
            email={email}
            isAdmin={isAdmin}
            onClose={() => setMenuOpen(false)}
          />,
          document.body,
        )}
    </>
  );
}

function MobileMenuOverlay({
  open,
  email,
  isAdmin,
  onClose,
}: {
  open: boolean;
  email?: string | null;
  isAdmin?: boolean;
  onClose: () => void;
}) {
  return (
    <div
      className="md:hidden"
      aria-hidden={!open}
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1000,
        visibility: open ? "visible" : "hidden",
        pointerEvents: open ? "auto" : "none",
      }}
    >
      <div
        onClick={onClose}
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(4, 4, 8, 0.78)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          opacity: open ? 1 : 0,
          transition: "opacity 280ms ease",
        }}
      />
      <div
        className="flex flex-col"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(24rem, 100%)",
          maxWidth: "100vw",
          padding: "1.5rem 1.5rem 2.5rem",
          backgroundColor: "#0A0A0E",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "-24px 0 60px rgba(0,0,0,0.6)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="flex items-center justify-between mb-10">
          <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
            <NexusSeal size="sm" showText={false} />
            <span className="flex items-baseline gap-2">
              <span className="font-serif-italic text-2xl leading-none text-ink">Nexus</span>
              <span className="font-serif-display small-caps text-[11px] leading-none text-ink-muted">
                Club
              </span>
            </span>
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="w-11 h-11 rounded-full glass inline-flex items-center justify-center"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex flex-col divide-y divide-white/5">
          {[
            { href: "/campaigns", label: "Campaigns" },
            { href: "/creators", label: "Members" },
            ...(email ? [{ href: "/earnings", label: "Withdraw" }] : []),
            { href: "/how-it-works", label: "How it works" },
            { href: "/about", label: "About" },
            { href: "/trust", label: "Trust" },
            { href: "/dispatches", label: "Dispatches" },
            ...(email ? [{ href: "/support", label: "Support" }] : []),
            ...(isAdmin ? [{ href: "/admin", label: "Atelier", accent: true }] : []),
          ].map((item, i) => (
            <div
              key={item.href}
              className={open ? "nc-menu-item" : ""}
              style={{ animationDelay: open ? `${80 + i * 55}ms` : undefined }}
            >
              <MobileLink href={item.href} onNavigate={onClose} accent={item.accent}>
                {item.label}
              </MobileLink>
            </div>
          ))}
        </nav>

        <div className="mt-auto pt-8">
          {email ? (
            <Link
              href="/dashboard"
              onClick={onClose}
              className="btn-primary w-full justify-center px-6 py-4 rounded-full text-[13px]"
            >
              Dashboard
              <span aria-hidden>→</span>
            </Link>
          ) : (
            <div className="space-y-3">
              <Link
                href="/#apply"
                onClick={onClose}
                className="btn-primary w-full justify-center px-6 py-4 rounded-full text-[13px]"
              >
                Apply for membership
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/login"
                onClick={onClose}
                className="btn-ghost w-full justify-center px-6 py-3.5 rounded-full text-[13px]"
              >
                Sign in
              </Link>
            </div>
          )}
        </div>
      </div>
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
      className={`nc-navlink px-3 py-1.5 rounded-full transition-colors ${
        accent ? "text-forest hover:text-ink" : "text-ink-soft hover:text-ink"
      }`}
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  children,
  onNavigate,
  accent,
}: {
  href: string;
  children: React.ReactNode;
  onNavigate: () => void;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`py-4 flex items-center justify-between font-serif-display text-[22px] leading-tight transition-colors ${
        accent ? "text-forest" : "text-ink hover:text-violet"
      }`}
    >
      <span>{children}</span>
      <span aria-hidden className="text-ink-faint text-[16px]">
        →
      </span>
    </Link>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <line
        x1="2"
        y1="5"
        x2="14"
        y2="5"
        style={{
          transform: open ? "translateY(3px) rotate(45deg)" : "none",
          transformOrigin: "center",
          transition: "transform 200ms ease",
        }}
      />
      <line
        x1="2"
        y1="11"
        x2="14"
        y2="11"
        style={{
          transform: open ? "translateY(-3px) rotate(-45deg)" : "none",
          transformOrigin: "center",
          transition: "transform 200ms ease",
        }}
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="w-4 h-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <line x1="3" y1="3" x2="13" y2="13" />
      <line x1="13" y1="3" x2="3" y2="13" />
    </svg>
  );
}
