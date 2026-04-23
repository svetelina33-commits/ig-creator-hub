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
    <div className="glass rounded-2xl p-6 sm:p-8 space-y-6 nc-rise">
      <div>
        <span className="small-caps text-[10px] tracking-[0.3em] text-amber">
          Step 02 · before you go to Google
        </span>
        <h2 className="mt-2 font-serif-display text-3xl text-ink">
          Here&apos;s what <span className="font-serif-italic text-ink-soft">happens next</span>.
        </h2>
        <p className="mt-3 text-[14px] leading-[1.65] text-ink-muted max-w-2xl">
          We&apos;ll send you to Google&apos;s official consent screen. You&apos;ll see exactly
          what we&apos;re requesting and can approve or cancel. Nothing happens on our side
          until you approve.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DemoStep
          n="01"
          title="Google shows the consent screen"
          body="Google lists the permissions Nexus Club is asking for, with your account name and our app name. It&apos;s their UI — not ours."
        />
        <DemoStep
          n="02"
          title="You approve"
          body="If you approve, Google sends us a short-lived token that represents this consent. You can revoke it anytime from your Google account settings."
        />
        <DemoStep
          n="03"
          title="We confirm and return"
          body="We store your Gmail address tied to this account and bring you back here to confirm the withdrawal. Nothing else leaves Google."
        />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
        <div className="small-caps text-[10px] tracking-[0.3em] text-ink-muted mb-3">
          What Google will ask
        </div>
        <ul className="space-y-2 text-[13px] leading-[1.55] text-ink-soft">
          <PermissionLine>
            <strong className="text-ink">Your name and email.</strong> So we know which account
            is connected.
          </PermissionLine>
          <PermissionLine>
            <strong className="text-ink">Send email on your behalf.</strong> Used for campaign
            replies routed through your Gmail — only when you approve a campaign.
          </PermissionLine>
          <PermissionLine>
            <strong className="text-ink">Read your inbox.</strong> So replies to campaign emails
            appear in your Nexus dashboard. We never sell, share, or train on your inbox.
          </PermissionLine>
        </ul>
        <div className="mt-4 pt-4 border-t border-white/10 text-[11.5px] leading-[1.5] text-ink-muted">
          Google&apos;s OAuth flow means <strong className="text-ink">we never see your
          password</strong>. Tokens are encrypted at rest with AES-256-GCM. Revoke anytime at{" "}
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

function DemoStep({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
      <div className="font-mono-numeric text-[11px] text-violet mb-1">{n}</div>
      <div className="font-serif-display text-xl text-ink leading-tight">{title}</div>
      <p className="mt-2 text-[12.5px] leading-[1.5] text-ink-muted">{body}</p>
    </div>
  );
}

function PermissionLine({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-baseline gap-3 leading-[1.55]">
      <span className="text-amber text-[10px] mt-0.5 shrink-0">◆</span>
      <span>{children}</span>
    </li>
  );
}
