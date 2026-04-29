"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { ApplicationRecord } from "@/lib/store";
import { Thread } from "@/components/Thread";

type Message = {
  id: string;
  role: "editor" | "creator";
  authorEmail: string;
  body: string;
  createdAt: string;
};

type Props = {
  application: ApplicationRecord;
  creatorEmail: string;
  instagramHandle: string | null;
};

export default function ApplicationRow({
  application,
  creatorEmail,
  instagramHandle,
}: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadedMessages, setLoadedMessages] = useState(false);

  useEffect(() => {
    if (!expanded || loadedMessages) return;
    (async () => {
      const res = await fetch(`/api/applications/${application.id}/messages`);
      if (res.ok) {
        const data = (await res.json()) as { messages: Message[] };
        setMessages(data.messages);
      }
      setLoadedMessages(true);
    })();
  }, [expanded, loadedMessages, application.id]);

  async function decide(decision: "approved" | "rejected") {
    setBusy(true);
    await fetch(`/api/admin/applications/${application.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision }),
    });
    setBusy(false);
    router.refresh();
  }

  const statusColor = {
    pending: "text-ink-muted",
    approved: "text-forest",
    rejected: "text-vermillion",
  }[application.status];

  return (
    <li className="px-5 py-5">
      <div className="grid grid-cols-12 gap-4 items-baseline">
        <div className="col-span-12 sm:col-span-5">
          <div className="font-serif-display text-xl text-ink">{creatorEmail}</div>
          {instagramHandle && (
            <div className="mt-1 small-caps text-[10px] tracking-[0.25em] text-ink-muted">
              @{instagramHandle}
            </div>
          )}
        </div>
        <div className="col-span-4 sm:col-span-2">
          <span className={`small-caps text-[11px] tracking-[0.25em] ${statusColor}`}>
            ● {application.status}
          </span>
        </div>
        <div className="col-span-4 sm:col-span-2 font-mono-numeric text-[11px] text-ink-faint">
          {new Date(application.appliedAt).toLocaleDateString("en-SG", {
            month: "short",
            day: "numeric",
          })}
        </div>
        <div className="col-span-4 sm:col-span-3 flex items-center justify-end gap-2">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-ink"
          >
            {expanded ? "Hide" : "Open"}
          </button>
          {application.status === "pending" && (
            <>
              <span className="text-hairline-strong">·</span>
              <button
                disabled={busy}
                onClick={() => decide("approved")}
                className="text-[11px] small-caps tracking-[0.2em] text-forest hover:underline underline-offset-4 disabled:opacity-60"
              >
                Approve
              </button>
              <span className="text-hairline-strong">·</span>
              <button
                disabled={busy}
                onClick={() => decide("rejected")}
                className="text-[11px] small-caps tracking-[0.2em] text-vermillion hover:underline underline-offset-4 disabled:opacity-60"
              >
                Decline
              </button>
            </>
          )}
        </div>
      </div>
      {expanded && (
        <div className="mt-5 pl-0 sm:pl-6 sm:border-l-2 border-hairline-strong space-y-6">
          <div>
            <div className="small-caps text-[10px] tracking-[0.25em] text-ink-muted mb-2">
              Original application note
            </div>
            <blockquote className="font-serif-italic text-[15px] text-ink leading-[1.7]">
              {application.note}
            </blockquote>
          </div>
          <div>
            <div className="small-caps text-[10px] tracking-[0.25em] text-ink-muted mb-3">
              Conversation
            </div>
            {loadedMessages ? (
              <Thread
                applicationId={application.id}
                youAre="editor"
                initialMessages={messages}
              />
            ) : (
              <p className="text-[12px] text-ink-faint font-serif-italic">Loading…</p>
            )}
          </div>
        </div>
      )}
    </li>
  );
}
