"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Kind = "post" | "reel" | "story";
type Tone = "forest" | "vermillion" | "ochre" | "ink";
type Currency = "USD" | "EUR" | "GBP";

export default function PitchForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [tagline, setTagline] = useState("");
  const [brief, setBrief] = useState("");
  const [payout, setPayout] = useState("");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [deadline, setDeadline] = useState("");
  const [deliverables, setDeliverables] = useState<{ kind: Kind; count: number }[]>([
    { kind: "reel", count: 1 },
  ]);
  const [coverTone, setCoverTone] = useState<Tone>("forest");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function addDeliverable() {
    if (deliverables.length >= 6) return;
    setDeliverables([...deliverables, { kind: "post", count: 1 }]);
  }
  function updateDeliverable(i: number, patch: Partial<{ kind: Kind; count: number }>) {
    setDeliverables((ds) => ds.map((d, j) => (j === i ? { ...d, ...patch } : d)));
  }
  function removeDeliverable(i: number) {
    if (deliverables.length <= 1) return;
    setDeliverables((ds) => ds.filter((_, j) => j !== i));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const payoutCents = Math.round(Number(payout.replace(/[^\d.]/g, "")) * 100);
    try {
      const res = await fetch("/api/campaigns/pitch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          brand: brand.trim(),
          tagline: tagline.trim(),
          brief: brief.trim(),
          payoutCents,
          currency,
          deadline: deadline || null,
          deliverables,
          coverTone,
          requestNote: note.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "submit_failed");
        setLoading(false);
        return;
      }
      setSubmitted(true);
      setLoading(false);
      setTimeout(() => router.push("/dashboard"), 1800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "network_error");
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="glass rounded-2xl p-6 sm:p-8">
        <div className="small-caps text-[10px] tracking-[0.3em] text-forest">
          ● pitch received
        </div>
        <h2 className="mt-2 font-serif-display text-3xl text-ink">
          On the editor&apos;s desk.
        </h2>
        <p className="mt-3 text-[14px] leading-[1.65] text-ink-muted">
          We review pitches within 48 hours. If it fits the register it goes live and other
          members can apply — you&apos;ll be credited as the originator. Sit tight.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="glass rounded-2xl p-6 sm:p-8 space-y-5">
        <SectionLabel n="I" title="The brief" />
        <Field
          label="Campaign title"
          value={title}
          onChange={setTitle}
          placeholder="Eden Rituals, Autumn Dossier…"
          required
        />
        <Field
          label="Brand"
          value={brand}
          onChange={setBrand}
          placeholder="Aesop, Rhode, Hill House Home…"
          required
        />
        <Field
          label="Tagline"
          value={tagline}
          onChange={setTagline}
          placeholder="A quiet luxury edit for the cold months."
          required
        />
        <TextareaField
          label="Brief"
          value={brief}
          onChange={setBrief}
          placeholder="What would you make? One reel in natural light, feed post, carousel… Be specific about style, licensing, and tone."
          rows={6}
          minLength={20}
          required
        />
      </div>

      <div className="glass rounded-2xl p-6 sm:p-8 space-y-5">
        <SectionLabel n="II" title="Payout & timeline" />
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_120px_1fr] gap-4">
          <Field
            label="Proposed payout"
            value={payout}
            onChange={setPayout}
            placeholder="1200"
            required
            inputMode="decimal"
          />
          <label className="block">
            <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
              Currency
            </span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as Currency)}
              className="nc-input mt-2 w-full"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
          </label>
          <label className="block">
            <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
              Deadline
            </span>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="nc-input mt-2 w-full"
            />
          </label>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 sm:p-8 space-y-5">
        <SectionLabel n="III" title="Deliverables" />
        <div className="space-y-3">
          {deliverables.map((d, i) => (
            <div key={i} className="grid grid-cols-[1fr_100px_auto] gap-3 items-center">
              <select
                value={d.kind}
                onChange={(e) => updateDeliverable(i, { kind: e.target.value as Kind })}
                className="nc-input"
              >
                <option value="reel">Reel</option>
                <option value="post">Post</option>
                <option value="story">Story</option>
              </select>
              <input
                type="number"
                min={1}
                max={20}
                value={d.count}
                onChange={(e) =>
                  updateDeliverable(i, { count: Math.max(1, Number(e.target.value) || 1) })
                }
                className="nc-input"
              />
              <button
                type="button"
                onClick={() => removeDeliverable(i)}
                disabled={deliverables.length <= 1}
                className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-vermillion disabled:opacity-40 disabled:cursor-not-allowed px-2"
              >
                remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addDeliverable}
            disabled={deliverables.length >= 6}
            className="small-caps text-[10px] tracking-[0.25em] text-violet hover:text-ink disabled:opacity-40 disabled:cursor-not-allowed"
          >
            + add another deliverable
          </button>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 sm:p-8 space-y-5">
        <SectionLabel n="IV" title="Aesthetic + note to the editor" />
        <label className="block">
          <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
            Cover tone
          </span>
          <div className="mt-2 flex gap-2 flex-wrap">
            {(["forest", "vermillion", "ochre", "ink"] as Tone[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setCoverTone(t)}
                className={`small-caps text-[10px] tracking-[0.22em] px-4 py-2 rounded-full border transition-colors ${
                  coverTone === t
                    ? "border-violet/60 bg-violet/10 text-ink"
                    : "border-white/10 text-ink-muted hover:text-ink"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </label>
        <TextareaField
          label="Note (optional)"
          value={note}
          onChange={setNote}
          placeholder="Anything the editor should know — past work with the brand, scheduling constraints, why this pitch matters to you."
          rows={4}
        />
      </div>

      {error && (
        <div className="text-[13px] text-vermillion small-caps tracking-[0.2em]">
          ● {error}
        </div>
      )}

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <span className="text-[11px] text-ink-faint leading-[1.5]">
          The editor reviews every pitch. Decisions within 48 hours.
        </span>
        <button
          type="submit"
          disabled={loading}
          data-magnetic
          className="btn-primary nc-magnetic inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-[12px] disabled:opacity-60"
        >
          {loading && <span className="nc-spinner" aria-hidden />}
          {loading ? "Submitting pitch…" : "Submit pitch"}
          {!loading && <span aria-hidden>→</span>}
        </button>
      </div>
    </form>
  );
}

function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 pb-3 hairline-b">
      <span className="font-mono-numeric text-[11px] text-ink-faint">§{n}</span>
      <h2 className="font-serif-display text-2xl text-ink">{title}</h2>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  required,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  inputMode?: "decimal" | "numeric" | "text";
}) {
  return (
    <label className="block">
      <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">{label}</span>
      <input
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className="nc-input mt-2 w-full"
      />
    </label>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  rows,
  minLength,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  minLength?: number;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">{label}</span>
      <textarea
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows ?? 4}
        minLength={minLength}
        className="nc-input mt-2 w-full resize-y leading-[1.6]"
      />
    </label>
  );
}
