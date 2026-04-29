"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Searchable = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  href: string;
  haystack: string;
};

export function HelpSearch({ articles }: { articles: Searchable[] }) {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    return articles
      .filter((a) => a.haystack.includes(query))
      .slice(0, 8);
  }, [q, articles]);

  return (
    <div className="relative">
      <div
        className="flex items-center gap-3 px-5 py-4 rounded-2xl"
        style={{
          background: "rgba(20,18,14,0.7)",
          boxShadow:
            "inset 0 0 0 1px rgba(231,206,148,0.18), 0 20px 60px -30px rgba(0,0,0,0.7)",
        }}
      >
        <SearchGlyph />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search the help center — try &quot;Instagram&quot; or &quot;payout&quot;"
          className="flex-1 bg-transparent border-0 outline-none text-[15px] text-ink placeholder:text-ink-faint"
          aria-label="Search help articles"
        />
        {q.length > 0 && (
          <button
            type="button"
            onClick={() => setQ("")}
            className="small-caps text-[10px] tracking-[0.28em] text-ink-faint hover:text-ink-muted"
          >
            Clear
          </button>
        )}
      </div>

      {results.length > 0 && (
        <ul
          className="absolute left-0 right-0 mt-2 z-30 rounded-2xl overflow-hidden divide-y divide-white/5"
          style={{
            background: "rgba(14,12,10,0.96)",
            backdropFilter: "blur(20px)",
            boxShadow:
              "inset 0 0 0 1px rgba(231,206,148,0.22), 0 30px 80px -20px rgba(0,0,0,0.85)",
          }}
        >
          {results.map((r) => (
            <li key={r.slug}>
              <Link
                href={r.href}
                className="block px-5 py-3.5 hover:bg-white/[0.03] transition-colors group"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[14.5px] text-ink leading-tight">
                      {r.title}
                    </div>
                    <div className="mt-0.5 text-[12.5px] text-ink-muted line-clamp-1 leading-[1.5]">
                      {r.excerpt}
                    </div>
                  </div>
                  <span className="small-caps text-[9px] tracking-[0.32em] text-gold/70 shrink-0 group-hover:text-gold transition-colors">
                    {r.category}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {q.trim().length > 0 && results.length === 0 && (
        <div
          className="absolute left-0 right-0 mt-2 z-30 rounded-2xl px-5 py-4 text-[13px] text-ink-muted"
          style={{
            background: "rgba(14,12,10,0.96)",
            boxShadow: "inset 0 0 0 1px rgba(231,206,148,0.22)",
          }}
        >
          No articles match{" "}
          <span className="text-ink">&ldquo;{q.trim()}&rdquo;</span>. Try a different
          word, or write to{" "}
          <a
            href="mailto:support@thenexusclub.org"
            className="text-gold/90 underline underline-offset-4 decoration-gold/40 hover:decoration-gold"
          >
            support
          </a>
          .
        </div>
      )}
    </div>
  );
}

function SearchGlyph() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className="shrink-0 text-gold/70"
    >
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M16 16l4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
