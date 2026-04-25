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
  const [acknowledged, setAcknowledged] = useState(false);
  const [continuing, setContinuing] = useState(false);

  function handleContinue(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    if (!acknowledged) return;
    setContinuing(true);
    window.location.href = startUrl;
  }
  return (
    <div className="glass rounded-2xl p-5 sm:p-8 space-y-7 nc-rise">
      <div>
        <span className="small-caps text-[11px] tracking-[0.22em] text-amber">
          Step 02 · before you go to Google
        </span>
        <h2 className="mt-3 font-serif-display text-3xl sm:text-4xl text-ink leading-[1.02] sm:leading-[1.05]">
          <span className="font-serif-italic text-ink-soft block sm:inline">A moment —</span>{" "}
          <span className="block sm:inline">three things worth reading<span className="text-violet">.</span></span>
        </h2>

        <div className="mt-5 space-y-3.5 text-[14.5px] leading-[1.65] sm:leading-[1.7] text-ink-muted max-w-2xl">
          <p className="nc-dropcap-sm">
            You&apos;re about to leave Nexus Club for Google&apos;s own consent screen.
          </p>
          <aside className="nc-pullquote my-4">
            Google hasn&apos;t verified this app.
          </aside>
          <p>
            That&apos;s the line you&apos;ll see — and it&apos;s normal. Google&apos;s
            verification queue runs <span className="text-ink">1–6 weeks</span> and we&apos;re
            in it. <span className="font-serif-italic text-ink-soft">The warning is standard;
            the connection is safe.</span>
          </p>
        </div>
      </div>

      <GoogleConsentPreview />

      <div className="space-y-1">
        <div className="flex items-center justify-between gap-3 mb-4">
          <span className="small-caps text-[11px] tracking-[0.22em] text-ink-muted">
            What you&apos;re granting
          </span>
          <span className="font-mono-numeric text-[9.5px] tracking-[0.22em] text-ink-faint">
            04 · LINE BY LINE
          </span>
        </div>

        <ScopeRow
          delay={0}
          state="granted"
          title="Your name and email"
          body="So we know which account is connected — this is also the address your payout is released to."
        />
        <ScopeRow
          delay={350}
          state="granted"
          title="Send email on your behalf"
          body="Used only for campaign confirmations you&apos;ve approved. Nothing goes out automatically."
        />
        <ScopeRow
          delay={700}
          state="granted"
          title="Read campaign-related mail"
          body="Scoped to campaign threads only — brand replies, payment receipts, delivery confirmations. Personal mail is never opened."
        />
        <ScopeRow
          delay={1050}
          state="denied"
          title="See your password"
          body="Google handles sign-in on their own screen. Your password never reaches us — that&apos;s a Google rule, not a Nexus one."
        />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
        <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-white/5 flex items-center justify-between gap-3">
          <span className="font-serif-italic text-ink-soft text-[13.5px]">
            On the warning screen
          </span>
          <span className="font-mono-numeric text-[9.5px] tracking-[0.22em] text-ink-faint">
            01 TAP
          </span>
        </div>

        <div className="px-3 sm:px-5 pt-4 pb-2">
          <GoogleWarningPreview />
        </div>

        <ol className="divide-y divide-white/5 border-t border-white/5">
          <li className="px-4 sm:px-5 py-3.5 flex items-baseline gap-3">
            <span className="font-mono-numeric text-[10px] tracking-[0.22em] text-ink-faint shrink-0 w-6">
              01
            </span>
            <span className="text-[13.5px] leading-[1.55] text-ink-muted">
              tap{" "}
              <span className="text-ink font-medium">Continue</span>
              <span className="text-ink-faint">
                {" "}— not <em className="font-serif-italic">Back to safety</em>, even though it
                looks brighter
              </span>
            </span>
          </li>
        </ol>

        <div className="px-4 sm:px-5 py-3 border-t border-white/5 text-[11.5px] leading-[1.55] text-ink-faint">
          <span className="text-ink-muted">Google highlights the cautious option by default.</span>{" "}
          Not dramatic — just their wording for apps still under review.
        </div>
        <div className="px-4 sm:px-5 py-3 border-t border-white/5 bg-white/[0.01] text-[11.5px] leading-[1.55] text-ink-faint">
          Tokens AES-256-GCM at rest · revoke anytime →{" "}
          <a
            href="https://myaccount.google.com/permissions"
            target="_blank"
            rel="noreferrer"
            className="link-ed break-all"
          >
            myaccount.google.com/permissions
          </a>
        </div>
      </div>

      <label className="flex items-start gap-3 cursor-pointer select-none group rounded-xl border border-white/10 bg-white/[0.015] hover:bg-white/[0.03] px-4 py-3.5 transition-colors">
        <input
          type="checkbox"
          checked={acknowledged}
          onChange={(e) => setAcknowledged(e.target.checked)}
          className="mt-[3px] accent-violet w-[18px] h-[18px] shrink-0 cursor-pointer"
        />
        <span className="text-[13.5px] leading-[1.55] text-ink-soft group-hover:text-ink transition-colors">
          <span className="font-serif-italic text-ink">I&apos;ve read this.</span>{" "}
          I know Google will flag the app as unverified, and I know exactly what permissions
          I&apos;m granting.
        </span>
      </label>

      <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
        <button
          type="button"
          onClick={onBack}
          className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-ink"
        >
          ← Back
        </button>
        <div className="flex items-center gap-3">
          {!acknowledged && (
            <span className="small-caps text-[10px] tracking-[0.22em] text-ink-faint">
              Tick the box to continue
            </span>
          )}
          <a
            href={startUrl}
            onClick={handleContinue}
            aria-disabled={!acknowledged || continuing}
            className={`btn-primary inline-flex items-center gap-3 px-6 py-3 rounded-full text-[13px] ${
              !acknowledged || continuing
                ? "opacity-40 cursor-not-allowed pointer-events-none"
                : ""
            }`}
          >
            <GoogleGlyph size={16} />
            {continuing ? "Redirecting…" : "Continue to Google"}
            {!continuing && <span aria-hidden>→</span>}
          </a>
        </div>
      </div>
    </div>
  );
}

function ScopeRow({
  state,
  title,
  body,
  delay = 0,
}: {
  state: "granted" | "denied";
  title: string;
  body: string;
  delay?: number;
}) {
  const granted = state === "granted";
  return (
    <div className="flex items-start gap-4 py-3 border-b border-white/5 last:border-b-0">
      <span
        className={`mt-0.5 shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-md border nc-checkbox-pulse ${
          granted
            ? "border-forest/50 bg-forest/[0.08] text-forest"
            : "border-vermillion/30 bg-vermillion/[0.04] text-vermillion/80"
        }`}
        style={{ animationDelay: `${delay}ms` }}
        aria-hidden
      >
        {granted ? (
          <svg
            viewBox="0 0 14 14"
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              className="nc-tick-path"
              style={{ animationDelay: `${delay}ms` }}
              d="M3 7.5 L6 10.5 L11 4"
            />
          </svg>
        ) : (
          <svg
            viewBox="0 0 14 14"
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
          >
            <line
              className="nc-x-path"
              style={{ animationDelay: `${delay}ms` }}
              x1="4"
              y1="4"
              x2="10"
              y2="10"
            />
            <line
              className="nc-x-path"
              style={{ animationDelay: `${delay + 80}ms` }}
              x1="10"
              y1="4"
              x2="4"
              y2="10"
            />
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

/* ────────────────────────────────────────────────────────────
 * GoogleConsentPreview — a faithful, animated preview of the
 * exact scope-selection screen Google shows after authentication.
 * Shows the user which boxes Nexus actually requests (ticked)
 * and which it deliberately doesn't (left empty).
 * ──────────────────────────────────────────────────────────── */

function GoogleConsentPreview() {
  return (
    <figure className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.025] via-white/[0.01] to-transparent overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-b border-white/8 bg-black/30">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-vermillion/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-forest/60" />
        </div>
        <div className="font-mono-numeric text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.18em] text-ink-faint truncate min-w-0">
          <span className="hidden sm:inline">accounts.google.com / oauth2 / consent</span>
          <span className="sm:hidden">accounts.google.com</span>
        </div>
        <span className="small-caps text-[8.5px] sm:text-[9px] tracking-[0.22em] sm:tracking-[0.28em] text-amber shrink-0">
          ● live
        </span>
      </div>

      {/* Caption */}
      <div className="px-4 sm:px-5 pt-4 pb-1.5 flex items-center justify-between gap-3 flex-wrap">
        <span className="small-caps text-[10px] tracking-[0.22em] text-ink-muted">
          What Google will show you
        </span>
        <span className="font-mono-numeric text-[9.5px] tracking-[0.22em] text-ink-faint">
          One click · all three scopes accepted
        </span>
      </div>

      {/* Inner faux-Google panel */}
      <div className="mx-3 sm:mx-4 mb-4 rounded-lg border border-white/8 bg-[#0c0c0e] divide-y divide-white/[0.06]">
        <GoogleRow
          icon={<SelectAllGlyph />}
          label="Select all"
          checked
          loop
          muted
          delay={0}
        />
        <GoogleRow
          icon={<GmailMGlyph />}
          label="View your email messages and settings."
          learnMore
          checked={false}
          delay={150}
        />
        <GoogleRow
          icon={<BlueDot />}
          label="Send email on your behalf."
          learnMore
          checked={false}
          delay={300}
        />
      </div>

      <figcaption className="px-4 sm:px-5 pb-4 -mt-1 text-[12px] leading-[1.6] text-ink-faint">
        Tick <strong className="text-ink-soft">Select all</strong> on Google&apos;s screen — that
        accepts the three scopes Nexus uses to verify your campaign communications end-to-end.
        Your password stays inside Google&apos;s sign-in flow and never reaches our servers.
      </figcaption>
    </figure>
  );
}

function GoogleRow({
  icon,
  label,
  learnMore,
  checked,
  muted,
  loop,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  learnMore?: boolean;
  checked: boolean;
  muted?: boolean;
  loop?: boolean;
  delay?: number;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className={`shrink-0 ${muted ? "w-5" : ""}`} aria-hidden>
        {icon}
      </span>
      <span
        className={`flex-1 text-[12.5px] leading-[1.5] ${
          muted ? "text-ink-soft" : "text-ink"
        }`}
        style={{ fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif" }}
      >
        {label}
        {learnMore && (
          <>
            {" "}
            <span className="text-[#8ab4f8]">Learn more</span>
          </>
        )}
      </span>
      <GoogleCheckbox checked={checked} delay={delay} loop={loop} />
    </div>
  );
}

function GoogleCheckbox({
  checked,
  delay,
  loop,
}: {
  checked: boolean;
  delay: number;
  loop?: boolean;
}) {
  if (!checked) {
    return (
      <span
        aria-hidden
        className="shrink-0 w-[18px] h-[18px] rounded-[3px] border-[1.5px] border-white/35"
      />
    );
  }
  return (
    <span
      aria-hidden
      className={`shrink-0 w-[18px] h-[18px] rounded-[3px] border-[1.5px] inline-flex items-center justify-center ${
        loop
          ? "nc-checkbox-loop"
          : "nc-checkbox-pulse border-[#8ab4f8] bg-[#8ab4f8]/15"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <svg
        viewBox="0 0 14 14"
        className="w-[12px] h-[12px] text-[#8ab4f8]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          className={loop ? "nc-tick-loop" : "nc-tick-path"}
          style={{ animationDelay: `${delay}ms` }}
          d="M3 7.5 L6 10.5 L11 4"
        />
      </svg>
    </span>
  );
}

function SelectAllGlyph() {
  return null;
}

function BlueDot() {
  return <span className="block w-[18px] h-[18px] rounded-full bg-[#4285f4]" />;
}

function GmailMGlyph() {
  return (
    <svg viewBox="0 0 24 18" className="w-[22px] h-[16px]">
      <path d="M2 2 L2 16 L6 16 L6 6 L12 11 L18 6 L18 16 L22 16 L22 2 L18 2 L12 7 L6 2 Z" fill="#ea4335" />
      <path d="M2 2 L2 16 L6 16 L6 6 L2 2 Z" fill="#c5221f" />
      <path d="M22 2 L22 16 L18 16 L18 6 L22 2 Z" fill="#fbbc04" />
      <path d="M6 6 L12 11 L18 6 L18 2 L12 7 L6 2 Z" fill="#34a853" />
      <path d="M2 2 L6 6 L6 2 Z" fill="#4285f4" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────
 * GoogleWarningPreview — faithful mock of the actual screen
 * Google shows for unverified apps in test-users mode
 * (accounts.google.com/signin/oauth/warning). The 'Continue'
 * button gets a subtle pulse to direct the user to the right
 * choice; 'Back to safety' is shown in Google's highlighted
 * style as it appears in production.
 * ──────────────────────────────────────────────────────────── */

function GoogleWarningPreview() {
  return (
    <figure className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.02] via-white/[0.008] to-transparent overflow-hidden">
      {/* Mac chrome */}
      <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-2.5 border-b border-white/8 bg-black/30">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-vermillion/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-forest/60" />
        </div>
        <div className="font-mono-numeric text-[9px] sm:text-[10px] tracking-[0.12em] sm:tracking-[0.18em] text-ink-faint truncate min-w-0">
          <span className="hidden sm:inline">accounts.google.com / signin / oauth / warning</span>
          <span className="sm:hidden">accounts.google.com</span>
        </div>
        <span className="small-caps text-[8.5px] sm:text-[9px] tracking-[0.22em] sm:tracking-[0.28em] text-amber shrink-0">
          ● live
        </span>
      </div>

      {/* Inner Google modal */}
      <div className="mx-3 sm:mx-4 my-4 rounded-lg border border-white/8 bg-[#0c0c0e] px-5 py-6 sm:px-7 sm:py-7">
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-7 gap-y-3 items-start">
          <GLogoMark />
          <div className="space-y-3">
            <h4
              className="text-[20px] sm:text-[22px] leading-[1.18] text-ink"
              style={{
                fontFamily:
                  "'Google Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
                fontWeight: 500,
              }}
            >
              Google hasn&apos;t verified this app
            </h4>
            <p
              className="text-[12.5px] sm:text-[13px] leading-[1.55] text-ink-muted"
              style={{
                fontFamily:
                  "'Google Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
              }}
            >
              You&apos;ve been given access to an app that&apos;s currently being tested. You
              should only continue if you know{" "}
              <span className="text-[#8ab4f8]">the developer</span> that invited you.
            </p>
          </div>
        </div>

        {/* Buttons row */}
        <div className="mt-6 flex items-center justify-end gap-3">
          {/* Continue — Nexus highlights this one */}
          <span
            aria-hidden
            className="relative inline-flex items-center px-3 py-2 text-[13px] text-[#8ab4f8] rounded-full"
            style={{
              fontFamily:
                "'Google Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 500,
            }}
          >
            <span
              className="absolute inset-0 rounded-full nc-warn-pulse"
              style={{
                border: "1.5px solid rgba(125, 90, 255, 0.55)",
                boxShadow: "0 0 0 0 rgba(125, 90, 255, 0)",
              }}
            />
            <span className="relative">Continue</span>
          </span>
          {/* Back to safety — Google's default highlighted CTA */}
          <span
            aria-hidden
            className="inline-flex items-center px-4 py-2 text-[13px] rounded-full bg-[#a8c7fa] text-[#062e6f]"
            style={{
              fontFamily:
                "'Google Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
              fontWeight: 500,
            }}
          >
            Back to safety
          </span>
        </div>
      </div>

      <figcaption className="px-4 sm:px-5 pb-4 -mt-1 text-[11.5px] leading-[1.55] text-ink-faint">
        Tap <strong className="text-ink-soft">Continue</strong>. The brighter{" "}
        <em className="font-serif-italic">Back to safety</em> button is Google&apos;s nudge for
        the cautious choice — the right one for our flow is on the left.
      </figcaption>
    </figure>
  );
}

function GLogoMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="w-9 h-9 sm:w-10 sm:h-10 shrink-0"
      aria-hidden
    >
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}
