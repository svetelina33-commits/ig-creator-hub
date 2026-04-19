import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import {
  findCampaignById,
  findCreatorById,
  formatMoney,
  listApplicationsForCampaign,
} from "@/lib/store";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import AdminCampaignActions from "./AdminCampaignActions";
import ApplicationRow from "./ApplicationRow";

type Params = Promise<{ id: string }>;

export default async function AdminCampaignPage({ params }: { params: Params }) {
  const admin = await requireAdmin();
  const { id } = await params;
  const campaign = await findCampaignById(id);
  if (!campaign) notFound();

  const applications = await listApplicationsForCampaign(campaign.id);
  const withCreators = await Promise.all(
    applications.map(async (a) => ({
      application: a,
      creator: await findCreatorById(a.creatorId),
    })),
  );

  return (
    <>
      <Masthead email={admin.email} isAdmin />
      <main className="px-6 sm:px-10">
        <div className="mx-auto max-w-5xl py-12 sm:py-16">
          <div className="text-[12px] small-caps tracking-[0.25em] text-ink-muted mb-8">
            <Link href="/admin" className="hover:text-forest">
              ← Atelier
            </Link>
          </div>

          <header className="flex items-start justify-between gap-6 mb-10">
            <div>
              <div className="flex items-center gap-3">
                <span className={`inline-block h-[2px] w-10 ${toneBg(campaign.coverTone)}`} />
                <span className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                  {campaign.brand}
                </span>
              </div>
              <h1 className="mt-4 font-serif-display text-5xl text-ink leading-[0.95]">
                {campaign.title}
              </h1>
              <p className="mt-3 font-serif-italic text-xl text-ink-muted max-w-xl">
                {campaign.tagline}
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="font-mono-numeric text-2xl text-ink">
                {formatMoney(campaign.payoutCents, campaign.currency)}
              </div>
              <div className="mt-1 small-caps text-[10px] tracking-[0.25em] text-ink-muted">
                {campaign.status}
              </div>
            </div>
          </header>

          <AdminCampaignActions id={campaign.id} status={campaign.status} />

          <section className="mt-12">
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="font-serif-display text-3xl text-ink">
                Applications{" "}
                <span className="font-serif-italic text-ink-muted">
                  ({applications.length})
                </span>
              </h2>
              <span className="font-mono-numeric text-[11px] text-ink-faint">
                {applications.filter((a) => a.status === "pending").length} pending
              </span>
            </div>

            {applications.length === 0 ? (
              <div className="hairline-top pt-8 text-ink-muted italic">
                No applications yet.
              </div>
            ) : (
              <div className="hairline-top">
                <ul className="divide-y divide-hairline">
                  {withCreators.map(({ application, creator }) => (
                    <ApplicationRow
                      key={application.id}
                      application={application}
                      creatorEmail={creator?.email ?? "unknown@—"}
                      instagramHandle={creator?.instagram?.username ?? null}
                    />
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

function toneBg(tone: "forest" | "vermillion" | "ochre" | "ink"): string {
  return {
    forest: "bg-forest",
    vermillion: "bg-vermillion",
    ochre: "bg-ochre",
    ink: "bg-ink",
  }[tone];
}
