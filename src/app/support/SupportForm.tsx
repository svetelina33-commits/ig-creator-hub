"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SupportForm() {
  const router = useRouter();
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<
    | { kind: "ok"; id: string }
    | { kind: "err"; message: string }
    | null
  >(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setResult(null);
    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: subject.trim(), body: body.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ kind: "ok", id: data.id });
        setSubject("");
        setBody("");
        router.refresh();
      } else {
        setResult({
          kind: "err",
          message:
            data.error === "invalid_input"
              ? "Subject must be 3+ characters; message 10+ characters."
              : data.error ?? "send_failed",
        });
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
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-6 sm:p-8 space-y-5">
      <div className="small-caps text-[11px] tracking-[0.22em] text-ink-muted">
        New message to the desk
      </div>

      <label className="block">
        <span className="small-caps text-[10px] tracking-[0.22em] text-ink-muted">
          Subject
        </span>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. Payout hasn't arrived"
          required
          minLength={3}
          maxLength={160}
          className="nc-input mt-2 w-full"
          disabled={sending}
        />
      </label>

      <label className="block">
        <span className="small-caps text-[10px] tracking-[0.22em] text-ink-muted">
          Message
        </span>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Tell us what's going on. Dates, campaign IDs, screenshots-in-text — all help us resolve it faster."
          required
          minLength={10}
          maxLength={8000}
          rows={8}
          className="nc-input mt-2 w-full resize-y leading-[1.6]"
          disabled={sending}
        />
        <div className="mt-1.5 font-mono-numeric text-[10px] tracking-[0.2em] text-ink-faint text-right">
          {body.length.toString().padStart(4, "0")} / 8000
        </div>
      </label>

      <div className="flex items-center gap-4 flex-wrap pt-1">
        <button
          type="submit"
          disabled={sending || subject.trim().length < 3 || body.trim().length < 10}
          className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] tracking-wide disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {sending ? "Sending…" : "Send to the desk"}
          {!sending && <span aria-hidden>→</span>}
        </button>
        {result?.kind === "ok" && (
          <span className="small-caps text-[10px] tracking-[0.22em] text-forest">
            ● sent · thread {result.id.slice(0, 10)}
          </span>
        )}
        {result?.kind === "err" && (
          <span className="small-caps text-[10px] tracking-[0.22em] text-vermillion">
            failed · {result.message}
          </span>
        )}
      </div>
    </form>
  );
}
