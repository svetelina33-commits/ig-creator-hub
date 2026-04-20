"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CreatorProfile } from "@/lib/store";

const ACCENTS = ["forest", "vermillion", "ochre", "ink"] as const;
type Accent = (typeof ACCENTS)[number];

type Props = {
  existing: CreatorProfile | null;
  defaultDisplayName: string;
};

export default function SettingsForm({ existing, defaultDisplayName }: Props) {
  const router = useRouter();
  const [slug, setSlug] = useState(existing?.slug ?? "");
  const [displayName, setDisplayName] = useState(
    existing?.displayName ?? defaultDisplayName,
  );
  const [bio, setBio] = useState(existing?.bio ?? "");
  const [city, setCity] = useState(existing?.city ?? "");
  const [niches, setNiches] = useState<string[]>(existing?.niches ?? []);
  const [nichesInput, setNichesInput] = useState("");
  const [links, setLinks] = useState<{ label: string; url: string }[]>(
    existing?.portfolioLinks ?? [],
  );
  const [accent, setAccent] = useState<Accent>(existing?.accent ?? "forest");
  const [isPublic, setIsPublic] = useState(existing?.isPublic ?? false);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addNiche() {
    const trimmed = nichesInput.trim();
    if (!trimmed || niches.includes(trimmed) || niches.length >= 6) return;
    setNiches([...niches, trimmed]);
    setNichesInput("");
  }
  function removeNiche(i: number) {
    setNiches(niches.filter((_, k) => k !== i));
  }
  function addLink() {
    if (links.length >= 6) return;
    setLinks([...links, { label: "", url: "" }]);
  }
  function updateLink(i: number, key: "label" | "url", value: string) {
    setLinks(links.map((l, k) => (k === i ? { ...l, [key]: value } : l)));
  }
  function removeLink(i: number) {
    setLinks(links.filter((_, k) => k !== i));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSaved(false);
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        displayName,
        bio,
        city,
        niches,
        portfolioLinks: links.filter((l) => l.label && l.url),
        accent,
        isPublic,
      }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error ?? "Could not save.");
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Field label="Display name" value={displayName} onChange={setDisplayName} />
        <Field
          label="Handle"
          value={slug}
          onChange={(v) => setSlug(v.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
          placeholder="your-name"
          prefix="/creators/"
        />
      </div>

      <TextArea
        label="Bio"
        value={bio}
        onChange={setBio}
        placeholder="Two or three sentences on what you make and how you work."
        max={600}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Field label="City" value={city} onChange={setCity} placeholder="Mumbai" />
        <AccentPicker value={accent} onChange={setAccent} />
      </div>

      <div>
        <Label>Niches</Label>
        <div className="mt-3 flex flex-wrap gap-2">
          {niches.map((n, i) => (
            <button
              type="button"
              key={`${n}-${i}`}
              onClick={() => removeNiche(i)}
              className="group px-3 py-1.5 border border-hairline-strong small-caps text-[11px] tracking-[0.2em] text-ink hover:text-vermillion hover:border-vermillion"
            >
              {n} <span className="ml-1 opacity-50 group-hover:opacity-100">×</span>
            </button>
          ))}
          {niches.length < 6 && (
            <div className="flex items-center gap-2">
              <input
                value={nichesInput}
                onChange={(e) => setNichesInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addNiche();
                  }
                }}
                placeholder="Add…"
                className="px-2 py-1.5 border-b border-hairline-strong bg-transparent text-sm focus:outline-none focus:border-forest"
              />
              <button
                type="button"
                onClick={addNiche}
                className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-forest"
              >
                add
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between">
          <Label>Portfolio links</Label>
          {links.length < 6 && (
            <button
              type="button"
              onClick={addLink}
              className="text-[11px] small-caps tracking-[0.2em] text-forest"
            >
              + Add link
            </button>
          )}
        </div>
        <div className="mt-3 space-y-3">
          {links.length === 0 && (
            <p className="text-[14px] text-ink-faint font-serif-italic">
              No links yet. Add your website, a portfolio, or a press feature.
            </p>
          )}
          {links.map((l, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                placeholder="Label"
                value={l.label}
                onChange={(e) => updateLink(i, "label", e.target.value)}
                className="w-32 px-2 py-1.5 border-b border-hairline-strong bg-transparent text-sm focus:outline-none focus:border-forest"
              />
              <input
                placeholder="https://..."
                value={l.url}
                onChange={(e) => updateLink(i, "url", e.target.value)}
                className="flex-1 px-2 py-1.5 border-b border-hairline-strong bg-transparent text-sm focus:outline-none focus:border-forest"
              />
              <button
                type="button"
                onClick={() => removeLink(i)}
                className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-vermillion"
              >
                remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="hairline-top pt-6">
        <label className="flex items-center justify-between gap-4 cursor-pointer">
          <div>
            <div className="font-serif-display text-2xl text-ink">Publish your profile</div>
            <p className="text-[14px] text-ink-muted font-serif-book">
              Make your page discoverable at <code className="font-mono-numeric">/creators/{slug || "your-handle"}</code>.
            </p>
          </div>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="w-5 h-5 accent-forest"
          />
        </label>
      </div>

      {error && <p className="text-sm text-vermillion">{error}</p>}
      {saved && !error && (
        <p className="text-sm text-forest small-caps tracking-[0.2em]">● Saved</p>
      )}

      <div className="flex items-center justify-end gap-4 pt-4 hairline-top">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-3 bg-ink text-paper px-6 py-3 text-[12px] small-caps tracking-[0.2em] hover:bg-forest disabled:opacity-60"
        >
          {loading ? "Saving…" : "Save profile"}
          <span aria-hidden>→</span>
        </button>
      </div>
    </form>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">{children}</span>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  prefix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  prefix?: string;
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <div className="mt-2 flex items-center border-b border-hairline-strong focus-within:border-forest">
        {prefix && (
          <span className="font-mono-numeric text-[11px] text-ink-faint mr-2">{prefix}</span>
        )}
        <input
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent pb-2 text-xl font-serif-display text-ink placeholder:text-ink-faint focus:outline-none"
        />
      </div>
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
  max,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  max: number;
}) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <textarea
        rows={4}
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, max))}
        placeholder={placeholder}
        className="mt-2 w-full bg-paper-raised/60 border border-hairline p-4 text-[15px] text-ink focus:outline-none focus:border-forest"
      />
      <div className="mt-1 font-mono-numeric text-[10px] text-ink-faint text-right">
        {value.length} / {max}
      </div>
    </label>
  );
}

function AccentPicker({ value, onChange }: { value: Accent; onChange: (v: Accent) => void }) {
  return (
    <div>
      <Label>Profile accent</Label>
      <div className="mt-3 flex gap-3">
        {ACCENTS.map((a) => (
          <button
            type="button"
            key={a}
            onClick={() => onChange(a)}
            className={`px-4 py-2 small-caps text-[11px] tracking-[0.2em] border transition-colors ${
              value === a
                ? "bg-ink text-paper border-ink"
                : "text-ink border-hairline hover:border-ink"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <span className={`inline-block w-2 h-2 ${toneBg(a)}`} />
              {a}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function toneBg(a: Accent): string {
  return {
    forest: "bg-forest",
    vermillion: "bg-vermillion",
    ochre: "bg-ochre",
    ink: "bg-ink",
  }[a];
}
