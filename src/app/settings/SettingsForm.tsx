"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { CreatorProfile } from "@/lib/store";

const ACCENTS = ["forest", "vermillion", "ochre", "ink"] as const;
type Accent = (typeof ACCENTS)[number];

const ACCENT_META: Record<
  Accent,
  { label: string; tone: string; meaning: string; spot: string; swatch: string; ring: string }
> = {
  forest: {
    label: "Forest",
    tone: "Calm, deliberate.",
    meaning: "The restraint register — quiet authority, the documentarian eye.",
    spot: "rgba(95, 225, 214, 0.30)",
    swatch: "bg-forest",
    ring: "border-forest",
  },
  vermillion: {
    label: "Vermillion",
    tone: "Bold, strong-voiced.",
    meaning: "The opinionated register — the maker who takes a side, on the record.",
    spot: "rgba(255, 94, 103, 0.28)",
    swatch: "bg-vermillion",
    ring: "border-vermillion",
  },
  ochre: {
    label: "Ochre",
    tone: "Warm, romantic.",
    meaning: "The narrative register — golden-hour, lived-in, slow to speak.",
    spot: "rgba(243, 193, 121, 0.30)",
    swatch: "bg-ochre",
    ring: "border-ochre",
  },
  ink: {
    label: "Ink",
    tone: "Restrained, formal.",
    meaning: "The classical register — the masthead, the museum label, no flourish.",
    spot: "rgba(255, 255, 255, 0.18)",
    swatch: "bg-white/70",
    ring: "border-white/40",
  },
};

type Props = {
  existing: CreatorProfile | null;
  defaultDisplayName: string;
  email: string;
  memberRef: string;
};

export default function SettingsForm({ existing, defaultDisplayName, email, memberRef }: Props) {
  const router = useRouter();
  const [slug, setSlug] = useState(existing?.slug ?? "");
  const [displayName, setDisplayName] = useState(existing?.displayName ?? defaultDisplayName);
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

  const filledLinks = useMemo(
    () => links.filter((l) => l.label.trim() && l.url.trim()),
    [links],
  );

  const completeness = useMemo(() => {
    const checks = [
      displayName.trim().length > 0,
      slug.trim().length > 0,
      bio.trim().length >= 60,
      city.trim().length > 0,
      niches.length > 0,
      filledLinks.length > 0,
      isPublic,
    ];
    const done = checks.filter(Boolean).length;
    return { done, total: checks.length, pct: Math.round((done / checks.length) * 100) };
  }, [displayName, slug, bio, city, niches, filledLinks.length, isPublic]);

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
        portfolioLinks: filledLinks,
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
    <div className="grid grid-cols-12 gap-6 lg:gap-10">
      {/* ============ LEFT · FORM ============ */}
      <form onSubmit={submit} className="col-span-12 lg:col-span-7 space-y-8">

        {/* §I IDENTITY */}
        <SectionCard
          number="I"
          title="Identity"
          italic="who, where to find"
          kicker="Two lines a brand reads first — your name and the address of your colophon."
          spot="violet"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <Field
              label="Display name"
              hint="As you'd like it set in print"
              value={displayName}
              onChange={setDisplayName}
              placeholder="Indira Mehta"
              size="lg"
            />
            <Field
              label="Handle"
              hint="Lowercase, hyphens, no spaces"
              value={slug}
              onChange={(v) => setSlug(v.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
              placeholder="your-name"
              prefix="/creators/"
              size="md"
            />
          </div>
        </SectionCard>

        {/* §II VOICE */}
        <SectionCard
          number="II"
          title="Voice"
          italic="how you write"
          kicker="Two or three sentences. Lead with what you make and how. Sixty characters reads as a stub; a hundred and forty as a paragraph."
          spot="forest"
        >
          <TextArea
            label="The standing line"
            hint="Editors read this when assigning. Brands read it when commissioning."
            value={bio}
            onChange={setBio}
            placeholder="Two or three sentences on what you make and how you work — lead with the work, the register comes through."
            max={600}
          />
        </SectionCard>

        {/* §III PLACE & ACCENT */}
        <SectionCard
          number="III"
          title="Place & accent"
          italic="the city, the register"
          kicker="Where you write from, and the hue we'll set your page in."
          spot="ochre"
        >
          <div className="space-y-7">
            <Field
              label="City"
              hint="A line of place — Singapore, Mumbai, Brooklyn"
              value={city}
              onChange={setCity}
              placeholder="Singapore"
              size="md"
            />
            <AccentPicker value={accent} onChange={setAccent} />
          </div>
        </SectionCard>

        {/* §IV NICHES */}
        <SectionCard
          number="IV"
          title="Niches"
          italic="what you cover"
          kicker="Up to six. These are the rooms a brief lands in. Press enter to add."
          spot="vermillion"
        >
          <Label>Standing terms</Label>
          <div className="mt-3 flex flex-wrap gap-2">
            {niches.map((n, i) => (
              <button
                type="button"
                key={`${n}-${i}`}
                onClick={() => removeNiche(i)}
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] small-caps text-[11px] tracking-[0.2em] text-ink hover:text-vermillion hover:border-vermillion transition-colors"
              >
                <span className="font-mono-numeric text-[9px] text-ink-faint group-hover:text-vermillion">
                  №{String(i + 1).padStart(2, "0")}
                </span>
                {n}
                <span className="opacity-50 group-hover:opacity-100">×</span>
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
                  placeholder={niches.length === 0 ? "fashion, food, slow travel…" : "Add another…"}
                  className="nc-input text-sm px-3 py-1.5"
                />
                <button
                  type="button"
                  onClick={addNiche}
                  className="text-[11px] small-caps tracking-[0.22em] text-ink-muted hover:text-forest transition-colors"
                >
                  + add
                </button>
              </div>
            )}
          </div>
          <div className="mt-3 font-mono-numeric text-[10px] text-ink-faint tracking-[0.2em]">
            {niches.length.toString().padStart(2, "0")} / 06
          </div>
        </SectionCard>

        {/* §V PORTFOLIO */}
        <SectionCard
          number="V"
          title="Portfolio"
          italic="elsewhere on the record"
          kicker="The work that already speaks for you. Up to six links — a website, a press feature, a portfolio."
          spot="violet"
        >
          <div className="flex items-baseline justify-between mb-4">
            <Label>Outside writing</Label>
            {links.length < 6 && (
              <button
                type="button"
                onClick={addLink}
                className="text-[11px] small-caps tracking-[0.22em] text-violet hover:text-ink transition-colors"
              >
                + Add link
              </button>
            )}
          </div>
          {links.length === 0 ? (
            <p className="text-[14px] text-ink-faint font-serif-italic">
              No links yet — your masthead, a portfolio site, or a press feature reads well here.
            </p>
          ) : (
            <ul className="space-y-3">
              {links.map((l, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 group"
                >
                  <span className="font-mono-numeric text-[10px] text-ink-faint w-6 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <input
                    placeholder="Label"
                    value={l.label}
                    onChange={(e) => updateLink(i, "label", e.target.value)}
                    className="w-32 px-2 py-1.5 border-b border-hairline-strong bg-transparent text-[13px] focus:outline-none focus:border-violet small-caps tracking-[0.15em] transition-colors"
                  />
                  <input
                    placeholder="https://..."
                    value={l.url}
                    onChange={(e) => updateLink(i, "url", e.target.value)}
                    className="flex-1 px-2 py-1.5 border-b border-hairline-strong bg-transparent text-[13px] font-mono-numeric text-ink-soft focus:outline-none focus:border-violet transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => removeLink(i)}
                    className="text-[10px] small-caps tracking-[0.2em] text-ink-faint hover:text-vermillion transition-colors opacity-0 group-hover:opacity-100"
                  >
                    remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-3 font-mono-numeric text-[10px] text-ink-faint tracking-[0.2em]">
            {filledLinks.length.toString().padStart(2, "0")} / 06 filed
          </div>
        </SectionCard>

        {/* §VI PUBLISH */}
        <SectionCard
          number="VI"
          title="Publish"
          italic="put it on the record"
          kicker="Go public, or keep your colophon a private draft until you're ready."
          spot={accent}
        >
          <label className="flex items-start justify-between gap-6 cursor-pointer group">
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="font-serif-display text-2xl text-ink">
                  Publish your colophon
                </span>
                <span
                  className={`small-caps text-[10px] tracking-[0.25em] px-2.5 py-1 rounded-full border transition-colors ${
                    isPublic
                      ? "text-forest border-forest/40 bg-forest/[0.06]"
                      : "text-ink-faint border-white/10 bg-white/[0.03]"
                  }`}
                >
                  {isPublic ? "● ON RECORD" : "○ DRAFT"}
                </span>
              </div>
              <p className="mt-2 text-[14px] text-ink-muted leading-[1.7] font-serif-book max-w-md">
                {isPublic
                  ? "Brands and editors can find you at "
                  : "Once filed, your page will appear at "}
                <code className="font-mono-numeric text-violet text-[12.5px]">
                  /creators/{slug || "your-handle"}
                </code>
                . Toggle off any time to take it back behind the curtain.
              </p>
            </div>
            <span className="relative shrink-0 mt-1.5">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="peer sr-only"
              />
              <span
                aria-hidden
                className="block w-12 h-6 rounded-full bg-white/8 border border-white/15 peer-checked:bg-forest/30 peer-checked:border-forest/40 transition-colors"
              />
              <span
                aria-hidden
                className="absolute top-[3px] left-[3px] w-[18px] h-[18px] rounded-full bg-ink-soft peer-checked:bg-forest peer-checked:translate-x-[24px] transition-transform duration-200 ease-out shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
              />
            </span>
          </label>
        </SectionCard>

        {/* SAVE */}
        <div className="hairline-top pt-7 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-baseline gap-3 text-[10px] small-caps tracking-[0.25em] text-ink-faint">
            <span className="font-mono-numeric tracking-[0.15em]">№ {memberRef}</span>
            <span aria-hidden>·</span>
            <span className="font-mono-numeric normal-case tracking-[0.05em] lowercase">{email}</span>
          </div>
          <div className="flex items-center gap-4">
            {error && (
              <span className="text-[11px] text-vermillion small-caps tracking-[0.2em]">
                ● {error}
              </span>
            )}
            {saved && !error && (
              <span className="text-[11px] text-forest small-caps tracking-[0.2em] flex items-center gap-1.5">
                <span aria-hidden>●</span> On record
              </span>
            )}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary inline-flex items-center gap-3 px-7 py-3 rounded-full text-[12px] tracking-[0.2em] small-caps disabled:opacity-60"
            >
              {loading ? "Filing…" : "File the colophon"}
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </form>

      {/* ============ RIGHT · LIVE PREVIEW ============ */}
      <aside className="col-span-12 lg:col-span-5">
        <div className="lg:sticky lg:top-24 space-y-5">

          {/* Completeness meter */}
          <div>
            <div className="flex items-baseline justify-between gap-3 mb-2">
              <span className="small-caps text-[10px] tracking-[0.3em] text-ink-faint">
                Drafting · {completeness.done}/{completeness.total} on file
              </span>
              <span className="font-mono-numeric text-[11px] text-ink-soft tracking-[0.1em]">
                {completeness.pct.toString().padStart(2, "0")}%
              </span>
            </div>
            <div className="h-[2px] bg-white/8 relative overflow-hidden rounded-full">
              <div
                className="absolute inset-y-0 left-0 transition-[width] duration-700 ease-out"
                style={{
                  width: `${completeness.pct}%`,
                  background:
                    "linear-gradient(90deg, rgba(125,90,255,0.95) 0%, rgba(95,225,214,0.95) 100%)",
                  boxShadow: "0 0 12px rgba(125,90,255,0.5)",
                }}
              />
            </div>
          </div>

          {/* Preview header */}
          <div className="flex items-baseline justify-between gap-3 pt-2">
            <span className="small-caps text-[10px] tracking-[0.3em] text-ink-faint">
              Live preview
            </span>
            <span
              className={`small-caps text-[10px] tracking-[0.25em] ${
                isPublic ? "text-forest" : "text-ink-faint"
              }`}
            >
              {isPublic ? "● PUBLIC" : "○ DRAFT"}
            </span>
          </div>

          {/* Preview card */}
          <div
            className="nc-card relative rounded-2xl"
            style={{ ["--nc-spot" as string]: ACCENT_META[accent].spot } as React.CSSProperties}
          >
            <div className="glass rounded-2xl px-7 py-8 sm:px-8 sm:py-9 relative">
              {/* corner brackets */}
              <span aria-hidden className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/30" />
              <span aria-hidden className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/30" />
              <span aria-hidden className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/30" />
              <span aria-hidden className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/30" />

              {/* masthead */}
              <div className="flex items-baseline justify-between gap-4 mb-7">
                <span className="small-caps text-[9.5px] tracking-[0.32em] text-ink-faint">
                  Member · Page № {memberRef.slice(-4)}
                </span>
                <span className="font-mono-numeric text-[9.5px] text-ink-faint tracking-[0.18em]">
                  VOL. I
                </span>
              </div>

              {/* city */}
              <div className="small-caps text-[10px] tracking-[0.28em] text-ink-muted">
                {city.trim() || "—"}
              </div>

              {/* name */}
              <div className="mt-2 font-serif-display text-[clamp(1.85rem,4.5vw,2.5rem)] text-ink leading-[1.05] break-words">
                {displayName.trim() || (
                  <span className="text-ink-faint italic">Your name here</span>
                )}
              </div>

              {/* accent line */}
              <div className="mt-3 inline-flex items-center gap-2.5">
                <span
                  aria-hidden
                  className={`inline-block w-2.5 h-2.5 rounded-sm ${ACCENT_META[accent].swatch}`}
                />
                <span className="small-caps text-[10px] tracking-[0.25em] text-ink-soft">
                  {ACCENT_META[accent].label} · {ACCENT_META[accent].tone}
                </span>
              </div>

              {/* bio */}
              {bio.trim() ? (
                <p className="mt-5 font-serif-italic text-[14.5px] leading-[1.7] text-ink-soft line-clamp-5">
                  &ldquo;{bio}&rdquo;
                </p>
              ) : (
                <p className="mt-5 font-serif-italic text-[13.5px] leading-[1.7] text-ink-faint">
                  Your standing line will sit here, set in italic Newsreader. Two or three sentences carries best.
                </p>
              )}

              {/* niches */}
              {niches.length > 0 && (
                <div className="mt-6 hairline-top pt-4">
                  <div className="small-caps text-[9px] tracking-[0.28em] text-ink-faint mb-2">
                    Niches
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {niches.map((n, i) => (
                      <span
                        key={`${n}-${i}`}
                        className="px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.04] small-caps text-[9px] tracking-[0.2em] text-ink-soft"
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* portfolio */}
              {filledLinks.length > 0 && (
                <div className="mt-5 hairline-top pt-4">
                  <div className="small-caps text-[9px] tracking-[0.28em] text-ink-faint mb-3">
                    Portfolio · {filledLinks.length.toString().padStart(2, "0")}
                  </div>
                  <ul className="space-y-1.5">
                    {filledLinks.slice(0, 4).map((l, i) => (
                      <li
                        key={i}
                        className="flex items-baseline gap-3 text-[11.5px]"
                      >
                        <span className="font-mono-numeric text-ink-faint shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="small-caps tracking-[0.18em] text-ink shrink-0">
                          {l.label}
                        </span>
                        <span className="font-mono-numeric text-ink-faint truncate">
                          {l.url.replace(/^https?:\/\/(www\.)?/, "")}
                        </span>
                      </li>
                    ))}
                    {filledLinks.length > 4 && (
                      <li className="text-[10px] small-caps tracking-[0.25em] text-ink-faint italic">
                        + {filledLinks.length - 4} more
                      </li>
                    )}
                  </ul>
                </div>
              )}

              {/* end matter */}
              <div className="mt-7 hairline-top pt-3 flex items-center justify-between text-[9.5px] small-caps tracking-[0.32em] text-ink-faint">
                <span aria-hidden>—</span>
                <span>End of page</span>
                <span aria-hidden>—</span>
              </div>
            </div>
          </div>

          <p className="text-[11.5px] text-ink-faint font-serif-italic leading-[1.7] max-w-sm">
            What you see is the page brands land on. Save to file changes — your live page
            updates the moment you do.
          </p>
        </div>
      </aside>
    </div>
  );
}

/* ─────────────── Section card ─────────────── */

function SectionCard({
  number,
  title,
  italic,
  kicker,
  spot,
  children,
}: {
  number: string;
  title: string;
  italic?: string;
  kicker?: string;
  spot: "violet" | "forest" | "vermillion" | "ochre" | "ink";
  children: React.ReactNode;
}) {
  return (
    <article className={`nc-card spot-${spot} relative rounded-2xl`}>
      <div className="glass rounded-2xl px-6 py-7 sm:px-8 sm:py-8 relative">
        <header className="mb-6">
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <div className="flex items-baseline gap-4">
              <span className="font-mono-numeric text-[11px] text-ink-faint tracking-[0.18em]">
                §{number}
              </span>
              <h2 className="font-serif-display text-2xl sm:text-[26px] text-ink leading-tight">
                {title}
                {italic && (
                  <span className="font-serif-italic text-ink-soft text-[20px] sm:text-[22px] ml-2">
                    , {italic}
                  </span>
                )}
              </h2>
            </div>
          </div>
          {kicker && (
            <p className="mt-3 text-[13.5px] leading-[1.65] text-ink-muted font-serif-book max-w-xl">
              {kicker}
            </p>
          )}
        </header>
        <div className="hairline-top pt-6">{children}</div>
      </div>
    </article>
  );
}

/* ─────────────── Field ─────────────── */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="small-caps text-[10px] tracking-[0.28em] text-ink-muted">{children}</span>
  );
}

function Field({
  label,
  hint,
  value,
  onChange,
  placeholder,
  prefix,
  size = "md",
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  prefix?: string;
  size?: "md" | "lg";
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-3 mb-2.5">
        <Label>{label}</Label>
        {hint && (
          <span className="font-serif-italic text-[11px] text-ink-faint hidden sm:block">
            {hint}
          </span>
        )}
      </div>
      <div className="nc-input flex items-center px-3 py-2.5 rounded-md bg-white/[0.025] border border-white/[0.08] focus-within:border-violet/50 transition-colors">
        {prefix && (
          <span className="font-mono-numeric text-[11.5px] text-ink-faint mr-1.5 select-none">
            {prefix}
          </span>
        )}
        <input
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`flex-1 bg-transparent ${
            size === "lg"
              ? "text-[20px] sm:text-[22px] font-serif-display"
              : "text-[15.5px] font-serif-display"
          } text-ink placeholder:text-ink-faint focus:outline-none`}
        />
      </div>
    </label>
  );
}

function TextArea({
  label,
  hint,
  value,
  onChange,
  placeholder,
  max,
}: {
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  max: number;
}) {
  const remaining = max - value.length;
  const past = remaining < 60;
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-3 mb-2.5">
        <Label>{label}</Label>
        {hint && (
          <span className="font-serif-italic text-[11px] text-ink-faint hidden sm:block">
            {hint}
          </span>
        )}
      </div>
      <div className="nc-input rounded-md bg-white/[0.025] border border-white/[0.08] focus-within:border-violet/50 transition-colors">
        <textarea
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, max))}
          placeholder={placeholder}
          className="block w-full bg-transparent px-4 py-3 text-[15px] leading-[1.7] font-serif-book text-ink placeholder:text-ink-faint focus:outline-none resize-none"
        />
      </div>
      <div className="mt-1.5 flex items-center justify-between font-mono-numeric text-[10px] tracking-[0.15em]">
        <span className={value.length < 60 ? "text-ink-faint" : "text-ink-muted"}>
          {value.length < 60
            ? "needs a few more lines"
            : value.length < 200
              ? "reads as a paragraph"
              : "well-set"}
        </span>
        <span className={past ? "text-vermillion" : "text-ink-faint"}>
          {value.length} / {max}
        </span>
      </div>
    </label>
  );
}

function AccentPicker({ value, onChange }: { value: Accent; onChange: (v: Accent) => void }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-3">
        <Label>The register</Label>
        <span className="font-serif-italic text-[11px] text-ink-faint hidden sm:block">
          choose one — drives your page&apos;s halo
        </span>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {ACCENTS.map((a) => {
          const meta = ACCENT_META[a];
          const selected = value === a;
          return (
            <li key={a}>
              <button
                type="button"
                onClick={() => onChange(a)}
                aria-pressed={selected}
                className={`group w-full text-left rounded-xl border px-4 py-3.5 transition-all ${
                  selected
                    ? `${meta.ring} bg-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]`
                    : "border-white/[0.08] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className={`relative inline-block rounded-sm transition-all ${meta.swatch} ${
                      selected ? "w-3.5 h-3.5" : "w-3 h-3 opacity-80"
                    }`}
                  >
                    {selected && (
                      <span
                        className="absolute inset-0 rounded-sm"
                        style={{ boxShadow: `0 0 12px ${meta.spot}` }}
                      />
                    )}
                  </span>
                  <span
                    className={`small-caps text-[11px] tracking-[0.22em] ${
                      selected ? "text-ink" : "text-ink-soft group-hover:text-ink"
                    }`}
                  >
                    {meta.label}
                  </span>
                  <span className="ml-auto font-serif-italic text-[11.5px] text-ink-faint">
                    {meta.tone}
                  </span>
                </div>
                {selected && (
                  <p className="mt-2 pl-6 font-serif-italic text-[12.5px] leading-[1.55] text-ink-muted">
                    {meta.meaning}
                  </p>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
