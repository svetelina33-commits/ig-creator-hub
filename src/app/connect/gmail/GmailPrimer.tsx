"use client";

import Link from "next/link";
import { useState } from "react";

const OAUTH_START = "/api/auth/google/start";

export default function GmailPrimer() {
  const [acknowledged, setAcknowledged] = useState(false);
  const [continuing, setContinuing] = useState(false);

  function handleContinue() {
    if (!acknowledged) return;
    setContinuing(true);
    window.location.href = OAUTH_START;
  }

  return (
    <div className="mt-8 space-y-5">
      <label className="flex items-start gap-3 cursor-pointer select-none group rounded-xl border border-white/10 bg-white/[0.015] hover:bg-white/[0.03] px-4 py-3.5 transition-colors">
        <input
          type="checkbox"
          checked={acknowledged}
          onChange={(e) => setAcknowledged(e.target.checked)}
          className="mt-[3px] accent-violet w-[18px] h-[18px] shrink-0 cursor-pointer"
        />
        <span className="text-[13.5px] leading-[1.55] text-ink-soft group-hover:text-ink transition-colors">
          <span className="font-serif-italic text-ink">I've read this</span> before connecting
          my Gmail — I understand Google will show an unverified-app notice and I know exactly
          what permissions I'm granting.
        </span>
      </label>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Link
          href="/dashboard"
          className="small-caps text-[11px] tracking-[0.2em] text-ink-muted hover:text-ink transition-colors"
        >
          ← Cancel, back to dashboard
        </Link>
        <div className="flex items-center gap-3">
          {!acknowledged && (
            <span className="small-caps text-[10px] tracking-[0.22em] text-ink-faint">
              Tick the box to continue
            </span>
          )}
          <button
            type="button"
            onClick={handleContinue}
            disabled={!acknowledged || continuing}
            className="btn-primary inline-flex items-center gap-3 px-7 py-4 rounded-full text-[13px] tracking-wide disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <GoogleGlyph />
            {continuing ? "Redirecting…" : "Continue to Google"}
            {!continuing && <span aria-hidden>→</span>}
          </button>
        </div>
      </div>
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 18 18"
      className="w-[16px] h-[16px] shrink-0"
      style={{ background: "white", padding: 1, borderRadius: 999 }}
    >
      <path
        fill="#4285F4"
        d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.874 2.684-6.615Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A9 9 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A9 9 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
      />
    </svg>
  );
}
