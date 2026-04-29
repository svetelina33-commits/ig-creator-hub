import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import {
  listApplicationsForCampaign,
  listCampaigns,
  listCreators,
  formatMoney,
} from "@/lib/store";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RunningHead, StatTile } from "@/components/Ornaments";

export default async function AdminHome() {
  const admin = await requireAdmin();
  const [campaigns, creators] = await Promise.all([listCampaigns(), listCreators()]);

  const allApps = (
    await Promise.all(campaigns.map((c) => listApplicationsForCampaign(c.id)))
  ).flat();

  const open = campaigns.filter((c) => c.status === "open");
  const pending = allApps.filter((a) => a.status === "pending");
  const approvedThisWeek = allApps.filter(
    (a) =>
      a.status === "approved" &&
      a.decidedAt &&
      new Date(a.decidedAt).getTime() > Date.now() - 7 * 86400 * 1000,
  );
  const outstandingPayout = campaigns
    .filter((c) => c.status === "open")
    .reduce((acc, c) => acc + c.payoutCents, 0);

  // Counts per-campaign for the table below.
  const byCampaign = new Map<string, { total: number; pending: number; approved: number }>();
  for (const c of campaigns) {
    const apps = allApps.filter((a) => a.campaignId === c.id);
    byCampaign.set(c.id, {
      total: apps.length,
      pending: apps.filter((a) => a.status === "pending").length,
      approved: apps.filter((a) => a.status === "approved").length,
    });
  }

  return (
    <>
      <Masthead email={admin.email} isAdmin />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />
        <div className="mx-auto max-w-7xl py-12 sm:py-16 relative">
          <Reveal>
            <RunningHead
              left="PRIVATE · EDITOR-IN-CHIEF"
              center="· THE ATELIER ·"
              right={`VOL. I · ${new Date().toLocaleDateString("en-SG", { month: "short", year: "numeric" }).toUpperCase()}`}
            />
          </Reveal>

          <Reveal delay={120} className="mt-8 flex items-end justify-between gap-6 flex-wrap">
            <div>
              <h1 className="font-serif-display text-[clamp(3rem,7vw,6rem)] leading-[0.92] text-ink">
                The <span className="font-serif-italic">Atelier</span>.
              </h1>
              <p className="mt-3 font-serif-book text-[15px] text-ink-muted max-w-xl">
                Commissioning, correspondence, and the roster — all in one place.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/admin/creators"
                className="btn-ghost inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[12px] small-caps tracking-[0.2em]"
              >
                Members
              </Link>
              <Link
                href="/admin/campaigns/new"
                className="btn-primary inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-[12px] small-caps tracking-[0.2em]"
              >
                New campaign
                <span aria-hidden>+</span>
              </Link>
            </div>
          </Reveal>

          {/* Stats */}
          <section className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <Reveal delay={80}>
              <StatTile label="Open campaigns" value={String(open.length).padStart(2, "0")} sub={`${campaigns.length} TOTAL`} />
            </Reveal>
            <Reveal delay={140}>
              <StatTile
                label="Pending review"
                value={String(pending.length).padStart(2, "0")}
                sub={pending.length > 0 ? "REQUIRES ATTENTION" : "ALL CAUGHT UP"}
                accent={pending.length > 0 ? "vermillion" : "violet"}
              />
            </Reveal>
            <Reveal delay={200}>
              <StatTile
                label="Approved this week"
                value={String(approvedThisWeek.length).padStart(2, "0")}
                sub="LAST SEVEN DAYS"
                accent="forest"
              />
            </Reveal>
            <Reveal delay={260}>
              <StatTile
                label="Committed payouts"
                value={formatMoney(outstandingPayout, "USD")}
                sub={`${creators.length} MEMBERS ON FILE`}
                accent="ochre"
              />
            </Reveal>
          </section>

          {/* Campaigns table */}
          <section className="mt-16">
            <Reveal>
              <div className="flex items-baseline justify-between mb-5">
                <h2 className="font-serif-italic text-3xl text-ink">All commissions</h2>
                <span className="font-mono-numeric text-[11px] text-ink-faint">
                  {String(campaigns.length).padStart(2, "0")} TOTAL
                </span>
              </div>
            </Reveal>

            {campaigns.length === 0 ? (
              <div className="glass rounded-2xl p-8 text-ink-muted">
                No campaigns yet. Start with a first brief.
              </div>
            ) : (
              <div className="glass rounded-2xl overflow-hidden">
                <ul className="divide-y divide-white/10">
                  {campaigns.map((campaign, i) => {
                    const counts = byCampaign.get(campaign.id)!;
                    return (
                      <Reveal key={campaign.id} delay={i * 60} as="li">
                        <Link
                          href={`/admin/campaigns/${campaign.id}`}
                          className="grid grid-cols-12 gap-4 px-5 py-5 group hover:bg-white/5 transition-colors"
                        >
                          <div className="col-span-12 sm:col-span-1 font-mono-numeric text-[11px] text-ink-faint pt-2">
                            №{String(i + 1).padStart(2, "0")}
                          </div>
                          <div className="col-span-12 sm:col-span-5">
                            <div className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
                              {campaign.brand}
                            </div>
                            <div className="mt-1 font-serif-display text-2xl text-ink group-hover:text-forest transition-colors leading-tight">
                              {campaign.title}
                            </div>
                          </div>
                          <div className="col-span-4 sm:col-span-2 text-[12px] text-ink-muted pt-2">
                            <StatusTag status={campaign.status} />
                          </div>
                          <div className="col-span-4 sm:col-span-2 text-[12px] pt-2">
                            <div className="font-mono-numeric text-ink">
                              {String(counts.total).padStart(2, "0")} applications
                            </div>
                            <div className="mt-0.5 small-caps text-[10px] tracking-[0.2em] text-ink-muted">
                              {counts.pending} pending · {counts.approved} approved
                            </div>
                          </div>
                          <div className="col-span-4 sm:col-span-2 text-right pt-2 font-mono-numeric text-sm text-ink">
                            {formatMoney(campaign.payoutCents, campaign.currency)}
                          </div>
                        </Link>
                      </Reveal>
                    );
                  })}
                </ul>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function StatusTag({ status }: { status: "draft" | "open" | "closed" | "requested" }) {
  const map = {
    draft: "text-ink-muted",
    open: "text-forest",
    closed: "text-ink-faint",
    requested: "text-violet",
  } as const;
  return (
    <span className={`small-caps text-[10px] tracking-[0.25em] ${map[status]}`}>
      ● {status}
    </span>
  );
}
