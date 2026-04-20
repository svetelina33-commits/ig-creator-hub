"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  campaignId: string;
  signedIn: boolean;
  existingStatus: "pending" | "approved" | "rejected" | null;
};

export default function ApplyBlock({ campaignId, signedIn, existingStatus }: Props) {
  const router = useRouter();
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!signedIn) {
    return (
      <div>
        <p className="text-[14px] text-ink-muted">
          <Link href="/" className="link-ed">
            Join Nexus Club
          </Link>{" "}
          to put your name down for this campaign.
        </p>
      </div>
    );
  }

  if (existingStatus) {
    const map = {
      pending: {
        title: "Your application is with the editor.",
        body: "We'll notify you via email. Typical turnaround is 48 hours.",
        color: "text-ink-soft",
      },
      approved: {
        title: "You've been approved.",
        body: "Check your email — a brief and next steps will follow shortly.",
        color: "text-forest",
      },
      rejected: {
        title: "Not this one, regretfully.",
        body: "The editor chose a different fit. Plenty of campaigns still to come.",
        color: "text-vermillion",
      },
    } as const;
    const content = map[existingStatus];
    return (
      <div>
        <div className="small-caps text-[11px] tracking-[0.25em] text-ink-muted">
          Your application
        </div>
        <div className={`mt-3 font-serif-display text-2xl ${content.color}`}>
          {content.title}
        </div>
        <p className="mt-2 text-[14px] text-ink-muted">{content.body}</p>
      </div>
    );
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch(`/api/campaigns/${campaignId}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "Something went wrong.");
      return;
    }
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="small-caps text-[11px] tracking-[0.25em] text-ink-muted">
        Write the editor
      </div>
      <label className="block">
        <span className="sr-only">Your note</span>
        <textarea
          required
          minLength={20}
          maxLength={800}
          rows={5}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="A few sentences on why this brief suits your work. References appreciated."
          className="nc-input w-full text-[15px] leading-[1.6] resize-y"
        />
      </label>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <span className="font-mono-numeric text-[11px] text-ink-faint">
          {note.length.toString().padStart(3, "0")} / 800
        </span>
        {error && <span className="text-[13px] text-vermillion">{error}</span>}
        <button
          type="submit"
          disabled={loading || note.length < 20}
          className="btn-primary inline-flex items-center gap-3 px-6 py-3 rounded-full text-[12px] tracking-wide disabled:opacity-50"
        >
          {loading ? "Sending…" : "Submit application"}
          <span aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
}
