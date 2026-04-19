"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: string;
  status: "draft" | "open" | "closed";
};

export default function AdminCampaignActions({ id, status }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function setStatus(next: "open" | "closed" | "draft") {
    setBusy(true);
    await fetch(`/api/admin/campaigns/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: next }),
    });
    setBusy(false);
    router.refresh();
  }

  return (
    <div className="hairline-top hairline-bottom py-4 flex items-center gap-2 flex-wrap">
      <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted mr-2">
        Status
      </span>
      {(["draft", "open", "closed"] as const).map((s) => (
        <button
          key={s}
          disabled={busy || s === status}
          onClick={() => setStatus(s)}
          className={`small-caps text-[11px] tracking-[0.2em] px-3 py-1.5 border transition-colors ${
            s === status
              ? "bg-ink text-paper border-ink"
              : "text-ink-muted border-hairline hover:border-ink hover:text-ink"
          } disabled:cursor-default`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}
