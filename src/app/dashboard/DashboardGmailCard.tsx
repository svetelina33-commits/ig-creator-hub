"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  connection: {
    email: string;
    name?: string;
    scopes: string[];
    connectedAt: string;
  } | null;
};

export default function DashboardGmailCard({ connection }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function disconnect() {
    setBusy(true);
    await fetch("/api/auth/google/disconnect", { method: "POST" });
    setBusy(false);
    router.refresh();
  }

  return (
    <div>
      {connection ? (
        <div className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-serif-display text-3xl text-ink">
                {connection.email}
              </div>
              <div className="mt-1 small-caps text-[10px] tracking-[0.25em] text-ink-muted">
                {connection.name ?? "connected"} · since{" "}
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
          <div className="dot-leader flex items-baseline gap-2 text-[11px] font-mono-numeric text-ink-muted">
            <span>Granted</span>
            <span className="ml-auto pl-2 text-ink-soft">
              {connection.scopes
                .map((s) => s.split("/").pop()!.replace(/^gmail\./, "gmail."))
                .join(" · ")}
            </span>
          </div>
          <div className="pt-1">
            <button
              onClick={disconnect}
              disabled={busy}
              className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-vermillion disabled:opacity-60 transition-colors"
            >
              Disconnect Gmail
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <p className="text-[15px] leading-[1.6] text-ink-muted">
            Connect Gmail so campaign emails go out from your own address. You'll see Google's
            official consent screen — scopes requested: <em>send email</em>.
          </p>
          <a
            href="/api/auth/google/start"
            className="btn-primary inline-flex items-center gap-3 px-5 py-3 rounded-full text-[12px] tracking-wide"
          >
            Connect Gmail
            <span aria-hidden>→</span>
          </a>
          <div className="pt-2 flex items-center gap-3 text-[11px] small-caps tracking-[0.2em] text-ink-faint">
            <span>Any Google account · revoke anytime from Google</span>
          </div>
        </div>
      )}
    </div>
  );
}
