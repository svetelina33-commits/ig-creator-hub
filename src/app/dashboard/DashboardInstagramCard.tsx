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

  return (
    <div className="hairline-top hairline-bottom py-6">
      {connection ? (
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-serif-display text-3xl text-ink">
                @{connection.username}
              </div>
              <div className="mt-1 small-caps text-[10px] tracking-[0.25em] text-ink-muted">
                {connection.accountType ?? "connected"} · since{" "}
                {new Date(connection.connectedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
            <span className="small-caps text-[10px] tracking-[0.25em] text-forest">
              ● live
            </span>
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
              className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-vermillion disabled:opacity-60"
            >
              Disconnect
            </button>
            <span className="text-hairline-strong">·</span>
            <button
              onClick={signOut}
              disabled={busy}
              className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-ink disabled:opacity-60"
            >
              Sign out
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <p className="text-[15px] leading-[1.6] text-ink-muted">
            Connect your Instagram to be eligible for approved campaigns. You'll be sent to
            Instagram's official consent screen — we never see your password.
          </p>
          <a
            href="/api/auth/instagram/start"
            className="inline-flex items-center gap-3 bg-ink text-paper px-5 py-3 text-[12px] small-caps tracking-[0.2em] hover:bg-forest transition-colors"
          >
            Connect Instagram
            <span aria-hidden>→</span>
          </a>
          <div className="pt-2 flex items-center gap-3 text-[11px] small-caps tracking-[0.2em] text-ink-faint">
            <span>Requires</span>
            <span className="text-ink-muted">Business</span>
            <span>or</span>
            <span className="text-ink-muted">Creator</span>
            <span>account</span>
          </div>
          <div className="pt-5 border-t border-hairline">
            <button
              onClick={signOut}
              disabled={busy}
              className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-ink disabled:opacity-60"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
