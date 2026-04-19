import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import {
  listApplicationsForCampaign,
  listCampaigns,
  formatMoney,
} from "@/lib/store";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";

export default async function AdminHome() {
  const admin = await requireAdmin();
  const campaigns = await listCampaigns();

  const counts = await Promise.all(
    campaigns.map(async (c) => {
      const apps = await listApplicationsForCampaign(c.id);
      return {
        campaign: c,
        total: apps.length,
        pending: apps.filter((a) => a.status === "pending").length,
        approved: apps.filter((a) => a.status === "approved").length,
      };
    }),
  );

  return (
    <>
      <Masthead email={admin.email} isAdmin />
      <main className="px-6 sm:px-10">
        <div className="mx-auto max-w-6xl py-12 sm:py-16">
          <div className="flex items-end justify-between gap-4 mb-12">
            <div>
              <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                Private · editor-in-chief
              </p>
              <h1 className="mt-3 font-serif-display text-6xl leading-none">
                The <span className="font-serif-italic">Atelier</span>
              </h1>
            </div>
            <Link
              href="/admin/campaigns/new"
              className="inline-flex items-center gap-3 bg-ink text-paper px-5 py-3 text-[12px] small-caps tracking-[0.2em] hover:bg-forest transition-colors"
            >
              New campaign
              <span aria-hidden>+</span>
            </Link>
          </div>

          <section>
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="font-serif-display text-2xl text-ink">All commissions</h2>
              <span className="font-mono-numeric text-[11px] text-ink-faint">
                {String(campaigns.length).padStart(2, "0")} total
              </span>
            </div>

            {campaigns.length === 0 ? (
              <div className="hairline-top pt-10 text-ink-muted italic">
                No campaigns yet. Start with a first brief.
              </div>
            ) : (
              <div className="hairline-top">
                <ul className="divide-y divide-hairline">
                  {counts.map(({ campaign, total, pending, approved }) => (
                    <li key={campaign.id}>
                      <Link
                        href={`/admin/campaigns/${campaign.id}`}
                        className="grid grid-cols-12 gap-4 py-6 group hover:bg-paper-raised/60 transition-colors -mx-4 px-4"
                      >
                        <div className="col-span-12 sm:col-span-5">
                          <div className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
                            {campaign.brand}
                          </div>
                          <div className="mt-1 font-serif-display text-2xl text-ink group-hover:text-forest transition-colors">
                            {campaign.title}
                          </div>
                        </div>
                        <div className="col-span-4 sm:col-span-2 text-[12px] text-ink-muted pt-2">
                          <StatusTag status={campaign.status} />
                        </div>
                        <div className="col-span-4 sm:col-span-3 text-[12px] pt-2">
                          <div className="font-mono-numeric text-ink">
                            {String(total).padStart(2, "0")} applications
                          </div>
                          <div className="mt-0.5 small-caps text-[10px] tracking-[0.2em] text-ink-muted">
                            {pending} pending · {approved} approved
                          </div>
                        </div>
                        <div className="col-span-4 sm:col-span-2 text-right pt-2 font-mono-numeric text-sm text-ink">
                          {formatMoney(campaign.payoutCents, campaign.currency)}
                        </div>
                      </Link>
                    </li>
                  ))}
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

function StatusTag({ status }: { status: "draft" | "open" | "closed" }) {
  const map = {
    draft: "text-ink-muted",
    open: "text-forest",
    closed: "text-ink-faint",
  } as const;
  return (
    <span className={`small-caps text-[10px] tracking-[0.25em] ${map[status]}`}>
      ● {status}
    </span>
  );
}
