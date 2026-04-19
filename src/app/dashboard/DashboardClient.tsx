"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  email: string;
  connection: {
    username: string;
    accountType?: string;
    connectedAt: string;
    tokenExpiresAt: string | null;
  } | null;
  notice: string | null;
  error: string | null;
};

export default function DashboardClient({ email, connection, notice, error }: Props) {
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
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 py-12">
      <div className="mx-auto max-w-2xl space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Dashboard
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{email}</p>
          </div>
          <button
            onClick={signOut}
            disabled={busy}
            className="rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Sign out
          </button>
        </header>

        {notice && (
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
            {notice}
          </div>
        )}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
            Instagram connect failed: {error}
          </div>
        )}

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Instagram account
          </h2>
          {connection ? (
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-fuchsia-500 to-orange-400 text-white text-sm font-bold">
                  {connection.username.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-50">
                    @{connection.username}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {connection.accountType ?? "Connected"} · since{" "}
                    {new Date(connection.connectedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {connection.tokenExpiresAt && (
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Access token renews automatically. Valid through{" "}
                  {new Date(connection.tokenExpiresAt).toLocaleDateString()}.
                </p>
              )}
              <button
                onClick={disconnect}
                disabled={busy}
                className="mt-2 rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Disconnect Instagram
              </button>
            </div>
          ) : (
            <div className="mt-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Connect your Instagram Business or Creator account to be eligible
                for brand campaigns. You'll be sent to Instagram to approve
                access.
              </p>
              <a
                href="/api/auth/instagram/start"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-pink-500 via-fuchsia-500 to-orange-400 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:brightness-110"
              >
                Connect your Instagram account
              </a>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
