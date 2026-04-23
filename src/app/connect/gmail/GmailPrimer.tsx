"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const SKIP_KEY = "nc_skip_gmail_explainer";
const OAUTH_START = "/api/auth/google/start";

export default function GmailPrimer() {
  const [autoSkipping, setAutoSkipping] = useState(false);
  const [rememberDecision, setRememberDecision] = useState(false);
  const [continuing, setContinuing] = useState(false);

  /**
   * If the user previously ticked "don't show this again," forward to Google
   * immediately. We still render a loading/override strip so they can cancel
   * the decision if they change their mind.
   */
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (window.localStorage.getItem(SKIP_KEY) === "1") {
        setAutoSkipping(true);
        window.location.href = OAUTH_START;
      }
    } catch {
      // localStorage blocked — fall through to show the primer.
    }
  }, []);

  function handleContinue() {
    setContinuing(true);
    try {
      if (rememberDecision && typeof window !== "undefined") {
        window.localStorage.setItem(SKIP_KEY, "1");
      }
    } catch {}
    window.location.href = OAUTH_START;
  }

  function cancelAutoSkip() {
    try {
      window.localStorage.removeItem(SKIP_KEY);
    } catch {}
    setAutoSkipping(false);
  }

  if (autoSkipping) {
    return (
      <div className="mt-10 flex items-center gap-4 text-[12.5px] text-ink-muted">
        <svg aria-hidden viewBox="0 0 20 20" className="w-4 h-4 animate-spin text-violet">
          <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.25" />
          <path
            d="M 10 3 A 7 7 0 0 1 17 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        Sending you to Google.{" "}
        <button
          type="button"
          onClick={cancelAutoSkip}
          className="underline underline-offset-4 hover:text-ink"
        >
          Wait, show the primer again
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-5">
      <label className="flex items-center gap-3 cursor-pointer select-none group">
        <input
          type="checkbox"
          checked={rememberDecision}
          onChange={(e) => setRememberDecision(e.target.checked)}
          className="accent-violet w-4 h-4"
        />
        <span className="text-[12.5px] small-caps tracking-[0.22em] text-ink-muted group-hover:text-ink-soft transition-colors">
          Don't show this again
        </span>
      </label>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Link
          href="/dashboard"
          className="small-caps text-[11px] tracking-[0.2em] text-ink-muted hover:text-ink transition-colors"
        >
          ← Cancel, back to dashboard
        </Link>
        <button
          type="button"
          onClick={handleContinue}
          disabled={continuing}
          className="btn-primary inline-flex items-center gap-3 px-7 py-4 rounded-full text-[13px] tracking-wide disabled:opacity-70"
        >
          <GoogleGlyph />
          {continuing ? "Redirecting…" : "Continue to Google"}
          {!continuing && <span aria-hidden>→</span>}
        </button>
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
