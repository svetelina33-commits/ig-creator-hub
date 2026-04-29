"use client";

import { useEffect, useRef, useState } from "react";

type Message = {
  id: string;
  role: "editor" | "creator";
  authorEmail: string;
  body: string;
  createdAt: string;
};

type Props = {
  applicationId: string;
  youAre: "editor" | "creator";
  initialMessages: Message[];
};

export function Thread({ applicationId, youAre, initialMessages }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages.length]);

  async function send(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!body.trim()) return;
    setSending(true);
    setError(null);
    const res = await fetch(`/api/applications/${applicationId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body }),
    });
    setSending(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "Could not send.");
      return;
    }
    const { message } = (await res.json()) as { message: Message };
    setMessages((prev) => [...prev, message]);
    setBody("");
  }

  return (
    <div className="space-y-5">
      {messages.length === 0 ? (
        <p className="text-[14px] text-ink-faint font-serif-italic">
          No notes yet.{" "}
          {youAre === "editor"
            ? "Write the creator first."
            : "The editor will write if there's a question."}
        </p>
      ) : (
        <ul className="space-y-4">
          {messages.map((m) => (
            <li
              key={m.id}
              className={`flex ${m.role === youAre ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  m.role === youAre
                    ? "bg-violet/15 border border-violet/25"
                    : "glass"
                }`}
              >
                <div className="small-caps text-[10px] tracking-[0.25em] text-ink-muted flex items-baseline justify-between gap-4">
                  <span>{m.role === "editor" ? "Editor" : "Creator"}</span>
                  <span className="font-mono-numeric text-ink-faint">
                    {new Date(m.createdAt).toLocaleString("en-SG", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="mt-2 text-[15px] leading-[1.6] text-ink whitespace-pre-wrap">
                  {m.body}
                </p>
              </div>
            </li>
          ))}
          <div ref={endRef} />
        </ul>
      )}

      <form onSubmit={send} className="pt-2">
        <textarea
          rows={3}
          value={body}
          onChange={(e) => setBody(e.target.value.slice(0, 2000))}
          placeholder={
            youAre === "editor"
              ? "Write a note to the creator…"
              : "Reply to the editor…"
          }
          className="nc-input w-full text-[15px] leading-[1.6] resize-y"
        />
        <div className="mt-3 flex items-center justify-between flex-wrap gap-3">
          <span className="font-mono-numeric text-[10px] text-ink-faint">
            {body.length} / 2000
          </span>
          {error && <span className="text-[13px] text-vermillion">{error}</span>}
          <button
            type="submit"
            disabled={sending || !body.trim()}
            className="btn-primary inline-flex items-center gap-2 px-5 py-2 rounded-full text-[11px] tracking-wide disabled:opacity-50"
          >
            {sending ? "Sending…" : "Send"}
            <span aria-hidden>→</span>
          </button>
        </div>
      </form>
    </div>
  );
}
