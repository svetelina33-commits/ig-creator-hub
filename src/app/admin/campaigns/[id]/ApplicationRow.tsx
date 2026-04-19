"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ApplicationRecord } from "@/lib/store";

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
    <li className="py-5">
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
          {new Date(application.appliedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })}
        </div>
        <div className="col-span-4 sm:col-span-3 flex items-center justify-end gap-2">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-ink"
          >
            {expanded ? "Hide" : "Read note"}
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
        <blockquote className="mt-4 pl-6 border-l-2 border-hairline-strong font-serif-italic text-[15px] text-ink leading-[1.7]">
          {application.note}
        </blockquote>
      )}
    </li>
  );
}
