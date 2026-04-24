"use client";

import Link from "next/link";
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
                ● concierge ready
              </span>
              <span className="small-caps text-[10px] tracking-[0.25em] text-ink-faint">
                · handle on file
              </span>
            </div>
            <div className="font-serif-display text-3xl text-ink">@{connection.username}</div>
            <div className="mt-1 small-caps text-[10px] tracking-[0.25em] text-ink-muted">
              on file since{" "}
              {new Date(connection.connectedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
          <span className="stamp-ig">Publishing desk</span>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.015] px-4 py-3 text-[12.5px] leading-[1.6] text-ink-muted">
          <span className="font-serif-italic text-ink-soft">Access begins</span> when your
          next campaign contract is signed and closes automatically on final delivery —
          never retained between campaigns.
        </div>

        <div className="flex items-center gap-4 pt-1">
          <button
            onClick={disconnect}
            disabled={busy}
            className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-vermillion disabled:opacity-60 transition-colors"
          >
            Remove handle
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
            padding: 3px 10px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: var(--ink-muted);
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
          <span className="small-caps text-[10px] tracking-[0.25em] text-forest">
            ● reserved at signing
          </span>
          <span className="small-caps text-[10px] tracking-[0.25em] text-ink-faint">
            · opt-in per campaign
          </span>
        </div>
        <h3 className="font-serif-display text-3xl text-ink leading-tight">
          Handed to the <span className="font-serif-italic text-ink-soft">desk</span>.
        </h3>
        <p className="mt-2 small-caps text-[10px] tracking-[0.28em] text-ink-faint">
          A publisher on call · for the campaign window only
        </p>
      </div>

      <p className="text-[14.5px] leading-[1.7] text-ink-muted">
        When you sign a Nexus campaign contract, you hand temporary access to a
        dedicated publishing editor from our desk. They schedule every post, polish
        every caption, and keep the reply window warm — in <em>your</em> voice, on
        <em> your</em> cadence. The window opens when ink dries on the contract and
        closes the moment the campaign delivers.
      </p>

      <ol className="space-y-3 text-[12.5px] text-ink-muted">
        <Step n="I" title="Contract first">
          Every campaign brief names the handover window and termination date in
          writing. Access is scoped, signed, and legally time-boxed — not ongoing.
        </Step>
        <Step n="II" title="A named editor, not an algorithm">
          Your campaign is assigned to one desk editor — a human, briefed on your
          tone, trained in platform policy, bonded under NDA.
        </Step>
        <Step n="III" title="Audit log, end-to-end">
          Every post, story, and reply sent during the window is logged. You receive
          a signed post-campaign brief with the full action record.
        </Step>
        <Step n="IV" title="Revocable, always">
          You can close the window from your own device at any moment — standard
          Instagram security. No hostage-taking, no lock-in.
        </Step>
      </ol>

      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] px-5 py-4">
        <div className="small-caps text-[10px] tracking-[0.28em] text-ink-faint mb-1.5">
          Next step
        </div>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-[13.5px] text-ink-soft leading-[1.55] max-w-lg">
            The concierge activates the moment you counter-sign your first campaign
            contract. Until then there&apos;s nothing to configure.
          </p>
          <Link
            href="/campaigns"
            className="btn-primary inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[12px] tracking-wide shrink-0"
          >
            Browse open campaigns
            <span aria-hidden>→</span>
          </Link>
        </div>
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

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="grid grid-cols-[auto_1fr] gap-4 items-baseline leading-[1.6]">
      <span className="font-mono-numeric text-[10px] tracking-[0.22em] text-ink-faint pt-0.5 w-6 text-right">
        §{n}
      </span>
      <div>
        <div className="text-ink text-[13.5px] mb-0.5">{title}</div>
        <div className="text-ink-muted text-[12.5px]">{children}</div>
      </div>
    </li>
  );
}
