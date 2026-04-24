"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  connection: {
    username: string;
    accountType?: string;
    connectedAt: string;
    tokenExpiresAt: string | null;
  } | null;
};

export default function DashboardInstagramCard({ connection }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function disconnect() {
    setBusy(true);
    await fetch("/api/auth/instagram/disconnect", { method: "POST" });
    setBusy(false);
    router.refresh();
  }

  async function signOut() {
    setBusy(true);
    await fetch("/api/auth/logout", { method: "POST" });
    setBusy(false);
    router.push("/");
    router.refresh();
  }

  if (connection) {
    return (
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="small-caps text-[10px] tracking-[0.25em] text-forest">
                ● verified
              </span>
              <span className="small-caps text-[10px] tracking-[0.25em] text-ink-faint">
                · eligible for campaigns
              </span>
            </div>
            <div className="font-serif-display text-3xl text-ink">@{connection.username}</div>
            <div className="mt-1 small-caps text-[10px] tracking-[0.25em] text-ink-muted">
              {connection.accountType ?? "connected"} · since{" "}
              {new Date(connection.connectedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
          <span className="stamp-ig">Instagram</span>
        </div>

        {connection.tokenExpiresAt && (
          <div className="dot-leader flex items-baseline gap-2 text-[11px] font-mono-numeric text-ink-muted">
            <span>Token renewal</span>
            <span className="ml-auto pl-2">
              {new Date(connection.tokenExpiresAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        )}

        <div className="flex items-center gap-4 pt-1">
          <button
            onClick={disconnect}
            disabled={busy}
            className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-vermillion disabled:opacity-60 transition-colors"
          >
            Disconnect
          </button>
          <span className="text-ink-faint">·</span>
          <button
            onClick={signOut}
            disabled={busy}
            className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-ink disabled:opacity-60 transition-colors"
          >
            Sign out
          </button>
        </div>

        <style jsx>{`
          .stamp-ig {
            display: inline-block;
            padding: 3px 8px;
            background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
            color: white;
            font-size: 9px;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            border-radius: 999px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="small-caps text-[10px] tracking-[0.25em] text-amber">
            ● not verified yet
          </span>
          <span className="small-caps text-[10px] tracking-[0.25em] text-ink-faint">
            · action required
          </span>
        </div>
        <h3 className="font-serif-display text-3xl text-ink leading-tight">
          Verify your creator <span className="font-serif-italic text-ink-soft">identity</span>.
        </h3>
      </div>

      <p className="text-[14px] leading-[1.65] text-ink-muted">
        We ask every creator to verify via Instagram&apos;s official check — it&apos;s the
        fastest way to confirm you&apos;re a real creator with a real audience. Without it you
        won&apos;t appear in brand shortlists.
      </p>

      <ul className="space-y-2.5 text-[12.5px] text-ink-muted">
        <Reason>
          <strong className="text-ink">Confirms the handle is yours</strong> · Meta&apos;s own
          OAuth, no passwords touch our servers
        </Reason>
        <Reason>
          <strong className="text-ink">Reads your account signals</strong> · type, size, and
          niche — so we match you to the right briefs
        </Reason>
        <Reason>
          <strong className="text-ink">Unlocks eligibility</strong> · verified creators are the
          only ones visible to brands running campaigns
        </Reason>
      </ul>

      <div className="flex items-center gap-5 pt-1 flex-wrap">
        <span
          aria-disabled
          className="inline-flex items-center gap-3 px-5 py-3 rounded-full text-[12px] tracking-wide border border-white/10 bg-white/[0.02] text-ink-muted cursor-not-allowed select-none"
          title="Instagram connection is temporarily unavailable"
        >
          <InstagramGlyph />
          Verification opens soon
        </span>
        <span className="small-caps text-[10px] tracking-[0.25em] text-amber">
          ● in maintenance · back shortly
        </span>
      </div>

      <div className="pt-5 border-t border-white/10">
        <button
          onClick={signOut}
          disabled={busy}
          className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-ink disabled:opacity-60 transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

function Reason({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-baseline gap-3 leading-[1.55]">
      <span className="text-amber text-[10px] mt-0.5 shrink-0">◆</span>
      <span>{children}</span>
    </li>
  );
}

function InstagramGlyph() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="w-[14px] h-[14px] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}
