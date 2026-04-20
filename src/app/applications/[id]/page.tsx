import Link from "next/link";
import { notFound } from "next/navigation";
import { requireCreator } from "@/lib/auth";
import {
  findApplicationById,
  findCampaignById,
  formatMoney,
  listMessagesForApplication,
} from "@/lib/store";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Thread } from "@/components/Thread";
import { CampaignCover } from "@/components/CampaignCover";

type Params = Promise<{ id: string }>;

export default async function CreatorApplicationDetail({ params }: { params: Params }) {
  const creator = await requireCreator();
  const { id } = await params;
  const application = await findApplicationById(id);
  if (!application) notFound();
  if (application.creatorId !== creator.id) notFound();
  const campaign = await findCampaignById(application.campaignId);
  if (!campaign) notFound();
  const messages = await listMessagesForApplication(application.id);

  const statusMap = {
    pending: { label: "Under review", color: "text-ink-muted" },
    approved: { label: "Approved", color: "text-forest" },
    rejected: { label: "Declined", color: "text-vermillion" },
  } as const;
  const statusUI = statusMap[application.status];

  return (
    <>
      <Masthead email={creator.email} />
      <main className="px-6 sm:px-10">
        <div className="mx-auto max-w-4xl py-12">
          <div className="text-[12px] small-caps tracking-[0.25em] text-ink-muted mb-8">
            <Link href="/dashboard" className="hover:text-forest">
              ← Dashboard
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-8 items-start">
            <div className="sm:col-span-3">
              <div className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                {campaign.brand}
              </div>
              <h1 className="mt-2 font-serif-display text-5xl text-ink leading-[0.95]">
                {campaign.title}
              </h1>
              <p className="mt-4 font-serif-italic text-xl text-ink-muted">
                {campaign.tagline}
              </p>
              <div className={`mt-5 small-caps text-[11px] tracking-[0.25em] ${statusUI.color}`}>
                ● {statusUI.label}
              </div>
              <div className="mt-1 font-mono-numeric text-[11px] text-ink-faint">
                Applied {new Date(application.appliedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </div>
              <div className="mt-6">
                <Link
                  href={`/campaigns/${campaign.id}`}
                  className="text-[11px] small-caps tracking-[0.2em] text-forest hover:text-forest-deep"
                >
                  View full brief →
                </Link>
              </div>
            </div>
            <div className="sm:col-span-2">
              <CampaignCover campaign={campaign} variant="square" />
              <div className="mt-3 flex items-center justify-between text-[11px] text-ink-muted">
                <span className="small-caps tracking-[0.2em]">Payout</span>
                <span className="font-mono-numeric text-ink">
                  {formatMoney(campaign.payoutCents, campaign.currency)}
                </span>
              </div>
            </div>
          </div>

          <section className="mt-12 hairline-top pt-10">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-serif-display text-2xl text-ink">The thread</h2>
              <span className="small-caps text-[10px] tracking-[0.25em] text-ink-faint">
                editor ↔ you
              </span>
            </div>
            {/* Original application note */}
            <div className="mb-6 border border-hairline bg-paper-sunken/60 p-4">
              <div className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
                Your application note
              </div>
              <p className="mt-2 text-[15px] text-ink whitespace-pre-wrap font-serif-book leading-relaxed">
                {application.note}
              </p>
            </div>
            <Thread
              applicationId={application.id}
              youAre="creator"
              initialMessages={messages}
            />
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
