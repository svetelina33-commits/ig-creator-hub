"use client";

import { useState } from "react";
import { GoogleGlyph } from "@/components/GoogleGlyph";

export default function ConnectEmailStep() {
  const [agreed, setAgreed] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const startUrl =
    "/api/auth/google/start?return_to=" +
    encodeURIComponent("/earnings/withdraw?step=3");

  if (showDemo) {
    return <DemoScreen startUrl={startUrl} onBack={() => setShowDemo(false)} />;
  }

  return (
    <div className="glass rounded-2xl p-6 sm:p-8 space-y-6">
      <div>
        <span className="small-caps text-[10px] tracking-[0.3em] text-amber">
          Step 02 · connect your Gmail
        </span>
        <h2 className="mt-2 font-serif-display text-3xl text-ink">
          Connect your <span className="font-serif-italic text-ink-soft">Gmail</span>.
        </h2>
        <p className="mt-3 text-[14px] leading-[1.65] text-ink-muted">
          To release a payout we link the Gmail account connected to your Instagram. This is how
          banks, brands, and our legal team confirm the fee is going to the rightful owner of
          the handle — the same check any professional payment processor runs before moving
          money.
        </p>
      </div>

      <div className="rounded-xl border border-amber/30 bg-amber/[0.04] p-5">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="font-mono-numeric text-[10px] tracking-[0.25em] text-amber">
            PLEASE READ
          </span>
          <span className="hairline-ticked flex-1 mt-3" />
        </div>
        <p className="text-[13.5px] leading-[1.65] text-ink-muted">
          Connect the <strong className="text-ink">Gmail account that&apos;s linked to your
          Instagram</strong>. Matching the two creates a verified chain of ownership — Instagram
          → Gmail → payout — so campaign fees can only be released to the real creator behind
          the handle.
        </p>
        <p className="mt-3 text-[13.5px] leading-[1.65] text-ink-muted">
          This runs through Google&apos;s official OAuth flow. We never see your password. You
          can revoke the connection any time at{" "}
          <a
            href="https://myaccount.google.com/permissions"
            target="_blank"
            rel="noreferrer"
            className="link-ed"
          >
            myaccount.google.com/permissions
          </a>
          .
        </p>

        <label className="mt-5 flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-[2px] accent-violet w-[20px] h-[20px] shrink-0 cursor-pointer"
          />
          <span className="text-[13px] leading-[1.55] text-ink">
            I understand — I&apos;ll connect the Gmail that&apos;s linked to my Instagram
            account. If it doesn&apos;t match, the withdrawal won&apos;t release.
          </span>
        </label>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="button"
          onClick={() => setShowDemo(true)}
          disabled={!agreed}
          className="btn-primary inline-flex items-center gap-3 px-5 py-3 rounded-full text-[12px] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <GoogleGlyph size={16} />
          Connect Gmail
          <span aria-hidden>→</span>
        </button>
        <span className="small-caps text-[10px] tracking-[0.25em] text-ink-faint">
          {agreed ? "Ready to continue" : "Tick the box above to proceed"}
        </span>
      </div>
    </div>
  );
}

function DemoScreen({ startUrl, onBack }: { startUrl: string; onBack: () => void }) {
  return (
    <div className="glass rounded-2xl p-6 sm:p-8 space-y-7 nc-rise">
      <div>
        <span className="small-caps text-[11px] tracking-[0.22em] text-amber">
          Step 02 · before you go to Google
        </span>
        <h2 className="mt-3 font-serif-display text-4xl text-ink leading-[1.05]">
          <span className="font-serif-italic text-ink-soft">A moment —</span>{" "}
          three things worth reading<span className="text-violet">.</span>
        </h2>
        <p className="mt-4 text-[14.5px] leading-[1.7] text-ink-muted max-w-2xl">
          You&apos;re about to leave Nexus Club for Google&apos;s own consent screen. Because
          we&apos;re a small, independent platform, Google will likely flag us as{" "}
          <em className="font-serif-italic text-ink-soft">
            &ldquo;Google hasn&apos;t verified this app.&rdquo;
          </em>{" "}
          That&apos;s normal — their verification queue runs 1–6 weeks and we&apos;re in it. The
          warning is standard; the connection is safe.
        </p>
      </div>

      <div className="space-y-1">
        <div className="small-caps text-[11px] tracking-[0.22em] text-ink-muted mb-4">
          What you&apos;re granting
        </div>

        <ScopeRow
          state="granted"
          title="Your name and email"
          body="So we know which account is connected — this is also the address your payout is released to."
        />
        <ScopeRow
          state="granted"
          title="Send email on your behalf"
          body="Used only for campaign confirmations you&apos;ve approved. Nothing goes out automatically."
        />
        <ScopeRow
          state="denied"
          title="Read your inbox"
          body="Never. We don&apos;t request this scope and couldn&apos;t read a single message if we tried."
        />
        <ScopeRow
          state="denied"
          title="See your password"
          body="Google handles sign-in from their own screen. Nexus Club never sees, stores, or transmits your password."
        />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-[13px] leading-[1.7] text-ink-muted">
        <div className="font-serif-italic text-ink-soft mb-1.5">
          On the warning screen:
        </div>
        click <span className="text-ink">Advanced</span>, then{" "}
        <span className="text-ink">Go to Nexus Club (unsafe)</span>. Not dramatic in practice —
        just Google&apos;s wording for apps still under review.
        <div className="mt-4 pt-4 border-t border-white/10 text-[12px] leading-[1.6] text-ink-faint">
          Tokens are encrypted at rest (AES-256-GCM) and never leave our servers. Revoke anytime
          at{" "}
          <a
            href="https://myaccount.google.com/permissions"
            target="_blank"
            rel="noreferrer"
            className="link-ed"
          >
            myaccount.google.com/permissions
          </a>
          .
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
        <button
          type="button"
          onClick={onBack}
          className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-ink"
        >
          ← Back
        </button>
        <a
          href={startUrl}
          className="btn-primary inline-flex items-center gap-3 px-6 py-3 rounded-full text-[13px]"
        >
          <GoogleGlyph size={16} />
          Continue to Google
          <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}

function ScopeRow({
  state,
  title,
  body,
}: {
  state: "granted" | "denied";
  title: string;
  body: string;
}) {
  const granted = state === "granted";
  return (
    <div className="flex items-start gap-4 py-3 border-b border-white/5 last:border-b-0">
      <span
        className={`mt-0.5 shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full border ${
          granted
            ? "border-forest/50 bg-forest/[0.08] text-forest"
            : "border-white/15 bg-white/[0.02] text-ink-muted"
        }`}
        aria-hidden
      >
        {granted ? (
          <svg
            viewBox="0 0 14 14"
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 7.5 L6 10.5 L11 4" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 14 14"
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <line x1="4" y1="4" x2="10" y2="10" />
            <line x1="10" y1="4" x2="4" y2="10" />
          </svg>
        )}
      </span>
      <div className="min-w-0">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="font-serif-display text-[18px] text-ink">{title}</span>
          <span
            className={`small-caps text-[9.5px] tracking-[0.22em] ${
              granted ? "text-forest" : "text-ink-faint"
            }`}
          >
            {granted ? "● granted" : "○ not requested"}
          </span>
        </div>
        <p className="mt-1 text-[13px] leading-[1.6] text-ink-muted">{body}</p>
      </div>
    </div>
  );
}
