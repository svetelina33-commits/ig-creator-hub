import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import {
  findCampaignsByIds,
  findCreatorById,
  listApplicationsForCreator,
  listCampaigns,
  formatMoney,
} from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { CampaignCover } from "@/components/CampaignCover";
import { ToneChip } from "@/components/Ornaments";
import DashboardInstagramCard from "./DashboardInstagramCard";

type SearchParams = Promise<{
  ig?: string;
  ig_error?: string;
  nc_error?: string;
}>;

export default async function DashboardPage({ searchParams }: { searchParams: SearchParams }) {
  const session = await getSession();
  if (!session.creatorId) redirect("/");
  const creator = await findCreatorById(session.creatorId);
  if (!creator) redirect("/");

  const [admin, applications, openCampaigns] = await Promise.all([
    isAdmin(),
    listApplicationsForCreator(creator.id),
    listCampaigns({ status: "open" }),
  ]);

  const campaigns = await findCampaignsByIds([
    ...new Set(applications.map((a) => a.campaignId)),
  ]);
  const campaignById = new Map(campaigns.map((c) => [c.id, c]));
  const withCampaigns = applications.map((a) => ({
    application: a,
    campaign: campaignById.get(a.campaignId) ?? null,
  }));

  const params = await searchParams;

  return (
    <>
      <Masthead email={creator.email} isAdmin={admin} />
      <main className="px-6 sm:px-10 relative overflow-hidden">
        <div className="mx-auto max-w-7xl py-12 sm:py-16 relative">
          <div className="mb-10 flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                Member · Desk
              </p>
              <h1 className="mt-3 font-serif-display text-4xl sm:text-6xl leading-[1.05] text-ink break-words">
                <span className="font-serif-italic text-ink-soft">Good day,</span>{" "}
                {creator.profile?.displayName ?? creator.email.split("@")[0]}
                <span className="text-violet">.</span>
              </h1>
            </div>
            <div className="flex items-center gap-3 text-[11px] small-caps tracking-[0.25em]">
              <Link href="/settings" className="btn-ghost px-4 py-2 rounded-full">
                Edit profile
              </Link>
              {creator.profile?.isPublic && (
                <Link
                  href={`/creators/${creator.profile.slug}`}
                  className="btn-ghost px-4 py-2 rounded-full"
                >
                  Public page
                </Link>
              )}
            </div>
          </div>

          {(params.ig === "connected" || params.ig_error || params.nc_error) && (
            <div className="mb-8 space-y-2">
              {params.ig === "connected" && (
                <div className="glass rounded-xl px-4 py-2.5 small-caps text-[11px] tracking-[0.25em] text-forest">
                  ● Instagram connection confirmed
                </div>
              )}
              {params.ig_error && (
                <div className="glass rounded-xl px-4 py-2.5 small-caps text-[11px] tracking-[0.25em] text-vermillion">
                  Instagram connection failed · {params.ig_error}
                </div>
              )}
              {params.nc_error === "admin_only" && (
                <div className="glass rounded-xl px-4 py-2.5 small-caps text-[11px] tracking-[0.25em] text-vermillion">
                  Atelier is reserved for the editor-in-chief
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Instagram */}
            <section className="lg:col-span-12">
              <SectionHeader number="I" title="Publishing" kicker="Concierge" />
              <div className="glass rounded-2xl p-4 sm:p-6">
                <DashboardInstagramCard
                  connection={
                    creator.instagram
                      ? {
                          username: creator.instagram.username,
                          accountType: creator.instagram.accountType,
                          connectedAt: creator.instagram.connectedAt,
                          tokenExpiresAt: creator.instagram.tokenExpiresAt,
                        }
                      : null
                  }
                />
              </div>
            </section>

            {/* Applications */}
            <section className="lg:col-span-12 mt-4">
              <SectionHeader
                number="II"
                title="Your applications"
                kicker={`${applications.length.toString().padStart(2, "0")} on file`}
              />
              {applications.length === 0 ? (
                <div className="glass rounded-2xl p-6 text-ink-muted">
                  <p className="text-[15px]">
                    Nothing in the outbox yet.{" "}
                    <Link href="/campaigns" className="link-ed">
                      Browse open campaigns
                    </Link>{" "}
                    to put your name down.
                  </p>
                </div>
              ) : (
                <ul className="glass rounded-2xl divide-y divide-white/10 overflow-hidden">
                  {withCampaigns.map(({ application, campaign }) =>
                    campaign ? (
                      <li key={application.id}>
                        <Link
                          href={`/applications/${application.id}`}
                          className="flex items-start justify-between gap-4 px-5 py-4 group hover:bg-white/5 transition-colors"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
                              {campaign.brand}
                            </div>
                            <div className="mt-1 font-serif-display text-xl text-ink group-hover:text-forest transition-colors break-words">
                              {campaign.title}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <StatusPill status={application.status} />
                            <div className="mt-1 font-mono-numeric text-[10px] text-ink-faint whitespace-nowrap">
                              {new Date(application.appliedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                        </Link>
                      </li>
                    ) : null,
                  )}
                </ul>
              )}
            </section>
          </div>

          {/* Open campaigns preview */}
          <section className="mt-16 -mx-6 sm:-mx-10">
            <div className="flex items-end justify-between gap-4 mb-6 px-6 sm:px-10">
              <div>
                <span className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                  The desk
                </span>
                <h2 className="mt-2 font-serif-italic text-2xl sm:text-4xl text-ink">Open commissions</h2>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href="/campaigns/pitch"
                  className="btn-primary px-4 py-2 rounded-full text-[12px]"
                >
                  Pitch yours +
                </Link>
                <Link href="/campaigns" className="btn-ghost px-4 py-2 rounded-full text-[12px]">
                  View all →
                </Link>
              </div>
            </div>
            <div className="nc-slider-wrap">
              <div className="nc-slider">
                <ul className="nc-slider-track">
                  {openCampaigns.map((c) => (
                    <li key={c.id} className="nc-slider-item">
                      <Link
                        href={`/campaigns/${c.id}`}
                        className="nc-card group block h-full"
                      >
                        <div className="glass glass-hover rounded-2xl overflow-hidden h-full flex flex-col">
                          <CampaignCover
                            campaign={c}
                            variant="rectangle"
                            className="rounded-none"
                          />
                          <div className="p-5 flex-1 flex flex-col">
                            <ToneChip tone={c.coverTone} label={c.brand} />
                            <div className="mt-2 font-serif-display text-2xl leading-tight text-ink">
                              {c.title}
                            </div>
                            <p className="mt-2 text-[13px] text-ink-muted line-clamp-2">
                              {c.tagline}
                            </p>
                            <div className="mt-auto pt-5 flex items-center justify-between text-[12px] text-ink-muted">
                              <span className="font-mono-numeric tracking-[0.05em] uppercase">
                                {c.deliverables.map((d) => `${d.count}×${d.kind}`).join(" · ")}
                              </span>
                              <span className="font-mono-numeric text-ink">
                                {formatMoney(c.payoutCents, c.currency)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function SectionHeader({
  number,
  title,
  kicker,
}: {
  number: string;
  title: string;
  kicker: string;
}) {
  return (
    <div className="mb-4 flex items-baseline justify-between gap-4">
      <div className="flex items-baseline gap-4">
        <span className="font-mono-numeric text-[11px] tracking-widest text-ink-faint">
          §{number}
        </span>
        <h2 className="font-serif-display text-2xl text-ink">{title}</h2>
      </div>
      <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">{kicker}</span>
    </div>
  );
}

function StatusPill({ status }: { status: "pending" | "approved" | "rejected" }) {
  const map = {
    pending: { label: "under review", color: "text-ink-muted" },
    approved: { label: "approved", color: "text-forest" },
    rejected: { label: "declined", color: "text-vermillion" },
  } as const;
  const { label, color } = map[status];
  return <span className={`small-caps text-[10px] tracking-[0.25em] ${color}`}>{label}</span>;
}
