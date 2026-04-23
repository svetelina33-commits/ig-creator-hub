"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Delegate = { email: string; invitedAt: string };

type Props = {
  isAdmin: boolean;
  connection: {
    email: string;
    name?: string;
    scopes: string[];
    connectedAt: string;
    delegates: Delegate[];
  } | null;
};

export default function DashboardGmailCard({ isAdmin, connection }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);
  const [delegatesOpen, setDelegatesOpen] = useState(false);

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

          {isAdmin && (
            <ComposePanel
              open={composeOpen}
              onToggle={() => setComposeOpen((v) => !v)}
              fromEmail={connection.email}
            />
          )}

          <DelegatesPanel
            open={delegatesOpen}
            onToggle={() => setDelegatesOpen((v) => !v)}
            delegates={connection.delegates}
            ownerEmail={connection.email}
          />

          <div className="pt-1 flex items-center justify-between">
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
            href="/connect/gmail"
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

function ComposePanel({
  open,
  onToggle,
  fromEmail,
}: {
  open: boolean;
  onToggle: () => void;
  fromEmail: string;
}) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<
    | { kind: "ok"; id: string }
    | { kind: "err"; message: string }
    | null
  >(null);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/api/gmail/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, body }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ kind: "ok", id: data.id });
        setTo("");
        setSubject("");
        setBody("");
      } else {
        setResult({ kind: "err", message: data.error ?? "send_failed" });
      }
    } catch (err) {
      setResult({
        kind: "err",
        message: err instanceof Error ? err.message : "network_error",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="pt-2">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 text-[11px] small-caps tracking-[0.25em] text-ink-muted hover:text-ink transition-colors"
      >
        <span>{open ? "− Close compose" : "+ Send a message"}</span>
      </button>

      {open && (
        <form onSubmit={send} className="mt-4 space-y-3">
          <div className="flex items-baseline gap-3 text-[11px] small-caps tracking-[0.2em] text-ink-faint">
            <span>From</span>
            <span className="font-mono-numeric text-[11px] text-ink-soft normal-case tracking-normal">
              {fromEmail}
            </span>
          </div>
          <input
            type="email"
            required
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="to@example.com"
            className="nc-input w-full"
            disabled={sending}
          />
          <input
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            className="nc-input w-full"
            disabled={sending}
          />
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Message"
            rows={6}
            className="nc-input w-full resize-y"
            disabled={sending}
          />
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={sending || !to || !subject || !body}
              className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] tracking-wide disabled:opacity-50"
            >
              {sending ? "Sending…" : "Send"}
              {!sending && <span aria-hidden>→</span>}
            </button>
            {result?.kind === "ok" && (
              <span className="small-caps text-[10px] tracking-[0.25em] text-forest">
                ● sent · {result.id.slice(0, 10)}…
              </span>
            )}
            {result?.kind === "err" && (
              <span className="small-caps text-[10px] tracking-[0.25em] text-vermillion">
                failed · {result.message}
              </span>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

function DelegatesPanel({
  open,
  onToggle,
  delegates,
  ownerEmail,
}: {
  open: boolean;
  onToggle: () => void;
  delegates: Delegate[];
  ownerEmail: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [notify, setNotify] = useState(true);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setNote(null);
    try {
      const res = await fetch("/api/gmail/delegates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, notify }),
      });
      const data = await res.json();
      if (res.ok) {
        setEmail("");
        setNote(
          data.notified
            ? "Saved — setup email sent"
            : data.warning
              ? `Saved — email not sent (${data.warning})`
              : "Saved",
        );
        router.refresh();
      } else {
        setNote(`Failed · ${data.error ?? "unknown"}`);
      }
    } catch (err) {
      setNote(err instanceof Error ? err.message : "network_error");
    } finally {
      setBusy(false);
    }
  }

  async function remove(target: string) {
    setBusy(true);
    setNote(null);
    try {
      await fetch("/api/gmail/delegates", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: target }),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="pt-2">
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center gap-2 text-[11px] small-caps tracking-[0.25em] text-ink-muted hover:text-ink transition-colors"
      >
        <span>
          {open ? "− Close team access" : `+ Team access · ${delegates.length.toString().padStart(2, "0")}`}
        </span>
      </button>

      {open && (
        <div className="mt-4 space-y-4">
          <p className="text-[13px] leading-[1.6] text-ink-muted">
            Give your team the same view of this Gmail your account has — through Google's native
            delegation. Each delegate opens <em>{ownerEmail}</em> from their own Gmail window,
            labelled "on behalf of".
          </p>

          <ol className="text-[12px] leading-[1.7] text-ink-soft pl-4 list-decimal space-y-1">
            <li>Add the teammate below — we'll email them the step-by-step.</li>
            <li>
              Then open{" "}
              <a
                href="https://mail.google.com/mail/u/0/#settings/accounts"
                target="_blank"
                rel="noreferrer"
                className="link-ed"
              >
                Gmail → Settings → Accounts
              </a>
              , find <em>Grant access to your account</em>, and paste each email.
            </li>
            <li>Google sends a confirmation; teammate clicks accept.</li>
            <li>From their own Gmail they'll switch into your inbox via the profile menu.</li>
          </ol>

          <form onSubmit={add} className="space-y-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="teammate@example.com"
              className="nc-input w-full"
              disabled={busy}
            />
            <label className="flex items-center gap-2 text-[11px] small-caps tracking-[0.2em] text-ink-muted cursor-pointer">
              <input
                type="checkbox"
                checked={notify}
                onChange={(e) => setNotify(e.target.checked)}
                disabled={busy}
                className="accent-violet"
              />
              Email setup instructions
            </label>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={busy || !email}
                className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] tracking-wide disabled:opacity-50"
              >
                {busy ? "Saving…" : "Add delegate"}
                {!busy && <span aria-hidden>→</span>}
              </button>
              {note && (
                <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
                  {note}
                </span>
              )}
            </div>
          </form>

          {delegates.length > 0 && (
            <ul className="mt-4 divide-y divide-white/10 hairline-top">
              {delegates.map((d) => (
                <li
                  key={d.email}
                  className="py-3 flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="font-mono-numeric text-[13px] text-ink">{d.email}</div>
                    <div className="small-caps text-[10px] tracking-[0.25em] text-ink-faint mt-0.5">
                      added{" "}
                      {new Date(d.invitedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(d.email)}
                    disabled={busy}
                    className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-vermillion disabled:opacity-60 transition-colors"
                  >
                    remove
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="pt-2 text-[11px] small-caps tracking-[0.2em] text-ink-faint">
            Gmail allows up to 10 delegates per account
          </div>
        </div>
      )}
    </div>
  );
}
