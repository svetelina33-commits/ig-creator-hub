"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const tones = ["forest", "vermillion", "ochre", "ink"] as const;
type Tone = (typeof tones)[number];

export default function NewCampaignForm() {
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [brief, setBrief] = useState("");
  const [payout, setPayout] = useState("1000");
  const [currency, setCurrency] = useState<"USD" | "EUR" | "GBP">("USD");
  const [deadline, setDeadline] = useState("");
  const [posts, setPosts] = useState(1);
  const [reels, setReels] = useState(0);
  const [stories, setStories] = useState(0);
  const [status, setStatus] = useState<"open" | "draft">("open");
  const [tone, setTone] = useState<Tone>("forest");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const deliverables = [
      posts > 0 ? { kind: "post" as const, count: posts } : null,
      reels > 0 ? { kind: "reel" as const, count: reels } : null,
      stories > 0 ? { kind: "story" as const, count: stories } : null,
    ].filter((d): d is { kind: "post" | "reel" | "story"; count: number } => d !== null);

    const res = await fetch("/api/admin/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        brand,
        title,
        tagline,
        brief,
        payoutCents: Math.round(parseFloat(payout) * 100),
        currency,
        deadline: deadline || null,
        deliverables,
        status,
        coverTone: tone,
      }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "Something went wrong.");
      return;
    }
    const data = (await res.json()) as { campaignId: string };
    router.push(`/admin/campaigns/${data.campaignId}`);
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <TextField label="Brand" value={brand} onChange={setBrand} placeholder="Maison Ophir" />
        <TextField
          label="Title"
          value={title}
          onChange={setTitle}
          placeholder="Autumn Dossier"
        />
      </div>

      <TextField
        label="Tagline"
        value={tagline}
        onChange={setTagline}
        placeholder="One editorial line describing the campaign."
      />

      <label className="block">
        <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
          Full brief
        </span>
        <textarea
          required
          rows={6}
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          placeholder="What the creator needs to know: moodboard, do's and don'ts, licensing, etc."
          className="mt-2 w-full bg-paper-raised/60 border border-hairline p-4 text-[15px] text-ink focus:outline-none focus:border-forest"
        />
      </label>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        <NumberField label="Posts" value={posts} onChange={setPosts} />
        <NumberField label="Reels" value={reels} onChange={setReels} />
        <NumberField label="Stories" value={stories} onChange={setStories} />
        <DateField label="Deadline" value={deadline} onChange={setDeadline} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <label className="block">
          <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
            Payout
          </span>
          <input
            type="number"
            min="0"
            step="1"
            value={payout}
            onChange={(e) => setPayout(e.target.value)}
            className="mt-2 w-full bg-transparent border-b border-hairline-strong text-2xl font-serif-display pb-2 text-ink focus:outline-none focus:border-forest"
          />
        </label>
        <label className="block">
          <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
            Currency
          </span>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as typeof currency)}
            className="mt-2 w-full bg-transparent border-b border-hairline-strong text-2xl font-serif-display pb-2 text-ink focus:outline-none focus:border-forest"
          >
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
          </select>
        </label>
        <label className="block">
          <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
            Status
          </span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as typeof status)}
            className="mt-2 w-full bg-transparent border-b border-hairline-strong text-2xl font-serif-display pb-2 text-ink focus:outline-none focus:border-forest"
          >
            <option value="open">open</option>
            <option value="draft">draft</option>
          </select>
        </label>
      </div>

      <div>
        <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
          Cover accent
        </span>
        <div className="mt-3 flex gap-3">
          {tones.map((t) => (
            <button
              type="button"
              key={t}
              onClick={() => setTone(t)}
              className={`px-4 py-2 small-caps text-[11px] tracking-[0.2em] border transition-colors ${
                tone === t
                  ? "bg-ink text-paper border-ink"
                  : "text-ink border-hairline hover:border-ink"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <span className={`inline-block h-2 w-2 ${toneBg(t)}`} />
                {t}
              </span>
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-vermillion">{error}</p>}

      <div className="flex items-center justify-end gap-4 pt-4 hairline-top">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-3 bg-ink text-paper px-6 py-3 text-[12px] small-caps tracking-[0.2em] hover:bg-forest disabled:opacity-60"
        >
          {loading ? "Publishing…" : "Publish campaign"}
          <span aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">{label}</span>
      <input
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full bg-transparent border-b border-hairline-strong text-xl font-serif-display pb-2 text-ink focus:outline-none focus:border-forest"
      />
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="block">
      <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">{label}</span>
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
        className="mt-2 w-full bg-transparent border-b border-hairline-strong text-xl font-serif-display pb-2 text-ink focus:outline-none focus:border-forest"
      />
    </label>
  );
}

function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">{label}</span>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full bg-transparent border-b border-hairline-strong text-base pb-2 text-ink focus:outline-none focus:border-forest"
      />
    </label>
  );
}

function toneBg(tone: Tone): string {
  return {
    forest: "bg-forest",
    vermillion: "bg-vermillion",
    ochre: "bg-ochre",
    ink: "bg-ink",
  }[tone];
}
