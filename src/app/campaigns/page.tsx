import Link from "next/link";
import { getSession } from "@/lib/session";
import { findCreatorById, listCampaigns, formatMoney } from "@/lib/store";
import type { CampaignRecord } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { CampaignCover } from "@/components/CampaignCover";
import { Reveal } from "@/components/Reveal";
import { RunningHead, ToneChip } from "@/components/Ornaments";

type SearchParams = Promise<{
  q?: string;
  tone?: string;
  deliv?: string;
  sort?: string;
}>;

export default async function CampaignsPage({ searchParams }: { searchParams: SearchParams }) {
  const session = await getSession();
  const creator = session.creatorId ? await findCreatorById(session.creatorId) : null;
  const admin = await isAdmin();

  const params = await searchParams;
  const q = params.q?.toLowerCase() ?? "";
  const tone = params.tone ?? "";
  const deliv = params.deliv ?? "";
  const sort = params.sort ?? "recent";

  const all = await listCampaigns({ status: "open" });
  let campaigns = all.filter((c) => {
    if (tone && c.coverTone !== tone) return false;
    if (deliv && !c.deliverables.some((d) => d.kind === deliv)) return false;
    if (q && ![c.title, c.brand, c.tagline, c.brief].some((s) => s.toLowerCase().includes(q)))
      return false;
    return true;
  });
  if (sort === "payout-desc") {
    campaigns = [...campaigns].sort((a, b) => b.payoutCents - a.payoutCents);
  } else if (sort === "payout-asc") {
    campaigns = [...campaigns].sort((a, b) => a.payoutCents - b.payoutCents);
  } else if (sort === "deadline") {
    campaigns = [...campaigns].sort((a, b) => {
      const ax = a.deadline ? new Date(a.deadline).getTime() : Infinity;
      const bx = b.deadline ? new Date(b.deadline).getTime() : Infinity;
      return ax - bx;
    });
  }

  return (
    <>
      <Masthead email={creator?.email} isAdmin={admin} />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />
        <section className="mx-auto max-w-7xl pt-14 sm:pt-20 pb-10 relative">
          <Reveal>
            <RunningHead
              left="THE DESK"
              center="· OPEN COMMISSIONS ·"
              right={`${String(all.length).padStart(2, "0")} LIVE`}
            />
          </Reveal>
          <Reveal delay={80} className="mt-8 flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h1 className="font-serif-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-ink">
                <span className="font-serif-italic text-violet">Now</span> commissioning.
              </h1>
              {campaigns.length !== all.length && (
                <p className="mt-3 font-mono-numeric text-[11px] tracking-widest text-ink-faint">
                  {String(campaigns.length).padStart(2, "0")} MATCH CURRENT FILTERS
                </p>
              )}
            </div>
            <div className="flex items-center gap-3 pb-2">
              <Link
                href="/campaigns/pitch"
                className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px]"
              >
                Pitch yours
                <span aria-hidden>+</span>
              </Link>
              <span className="hidden sm:inline small-caps text-[10px] tracking-[0.25em] text-ink-muted max-w-[220px] leading-[1.5]">
                Got a brand in mind? Write the brief yourself.
              </span>
            </div>
          </Reveal>
        </section>

        <FilterBar q={params.q ?? ""} tone={tone} deliv={deliv} sort={sort} />

        <section className="mx-auto max-w-7xl pb-24 mt-10">
          {campaigns.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-ink-muted">
              No campaigns match these filters.{" "}
              <Link href="/campaigns" className="link-ed">
                Clear filters
              </Link>
              .
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((c, idx) => (
                <Reveal key={c.id} delay={idx * 70}>
                  <CampaignGridCard c={c} />
                </Reveal>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

function FilterBar({
  q,
  tone,
  deliv,
  sort,
}: {
  q: string;
  tone: string;
  deliv: string;
  sort: string;
}) {
  return (
    <section className="mx-auto max-w-7xl">
      <form method="get" className="glass rounded-2xl p-4 flex flex-wrap items-end gap-4">
        <label className="flex-1 min-w-[200px]">
          <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">Search</span>
          <input
            name="q"
            defaultValue={q}
            placeholder="Brand, title, or keyword"
            className="nc-input mt-2 w-full"
          />
        </label>
        <Select
          name="tone"
          label="Tone"
          value={tone}
          options={[
            ["", "Any"],
            ["forest", "Forest"],
            ["vermillion", "Vermillion"],
            ["ochre", "Ochre"],
            ["ink", "Ink"],
          ]}
        />
        <Select
          name="deliv"
          label="Deliverable"
          value={deliv}
          options={[
            ["", "Any"],
            ["post", "Post"],
            ["reel", "Reel"],
            ["story", "Story"],
          ]}
        />
        <Select
          name="sort"
          label="Sort"
          value={sort}
          options={[
            ["recent", "Most recent"],
            ["payout-desc", "Payout — high → low"],
            ["payout-asc", "Payout — low → high"],
            ["deadline", "Deadline — soonest"],
          ]}
        />
        <button
          type="submit"
          className="btn-primary px-5 py-2.5 rounded-full text-[11px] small-caps tracking-[0.2em]"
        >
          Apply
        </button>
        {(q || tone || deliv || sort !== "recent") && (
          <Link
            href="/campaigns"
            className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-vermillion"
          >
            Clear
          </Link>
        )}
      </form>
    </section>
  );
}

function Select({
  name,
  label,
  value,
  options,
}: {
  name: string;
  label: string;
  value: string;
  options: [string, string][];
}) {
  return (
    <label className="min-w-[140px]">
      <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">{label}</span>
      <select name={name} defaultValue={value} className="nc-input mt-2 w-full">
        {options.map(([v, l]) => (
          <option key={v} value={v} className="bg-paper-raised text-ink">
            {l}
          </option>
        ))}
      </select>
    </label>
  );
}

function CampaignGridCard({ c }: { c: CampaignRecord }) {
  return (
    <Link href={`/campaigns/${c.id}`} className="nc-card block group">
      <div className="glass glass-hover rounded-2xl overflow-hidden">
        <CampaignCover campaign={c} variant="rectangle" className="rounded-none" />
        <div className="p-5 space-y-2">
          <ToneChip tone={c.coverTone} label={c.brand} />
          <div className="font-serif-display text-2xl text-ink leading-tight">{c.title}</div>
          <p className="text-[13px] text-ink-muted line-clamp-2 leading-relaxed">{c.tagline}</p>
          <div className="pt-3 flex items-center justify-between text-[11px] text-ink-muted">
            <span className="small-caps tracking-[0.2em]">
              {c.deliverables.map((d) => `${d.count}×${d.kind}`).join(" · ")}
            </span>
            <span className="font-mono-numeric text-sm text-ink">
              {formatMoney(c.payoutCents, c.currency)}
            </span>
          </div>
          {c.deadline && (
            <div className="font-mono-numeric text-[10px] text-ink-faint">
              DEADLINE ·{" "}
              {new Date(c.deadline)
                .toLocaleDateString("en-US", { month: "short", day: "numeric" })
                .toUpperCase()}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
