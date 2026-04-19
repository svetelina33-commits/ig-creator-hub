import Link from "next/link";
import { notFound } from "next/navigation";
import {
  findApplication,
  findCampaignById,
  findCreatorById,
  formatMoney,
} from "@/lib/store";
import { getSession } from "@/lib/session";
import { isAdmin } from "@/lib/auth";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import ApplyBlock from "./ApplyBlock";

type Params = Promise<{ id: string }>;

export default async function CampaignDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const campaign = await findCampaignById(id);
  if (!campaign) notFound();

  const session = await getSession();
  const creator = session.creatorId ? await findCreatorById(session.creatorId) : null;
  const admin = await isAdmin();
  const existing =
    creator != null ? await findApplication(creator.id, campaign.id) : null;

  return (
    <>
      <Masthead email={creator?.email} isAdmin={admin} />
      <main className="px-6 sm:px-10">
        <div className="mx-auto max-w-5xl py-10 sm:py-14">
          <div className="text-[12px] small-caps tracking-[0.25em] text-ink-muted mb-8">
            <Link href="/campaigns" className="hover:text-forest">
              ← Back to the desk
            </Link>
          </div>

          <article className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <header className="lg:col-span-8">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-block h-[2px] w-12 ${toneBg(campaign.coverTone)}`}
                />
                <span className="small-caps text-[11px] tracking-[0.3em] text-ink-muted">
                  {campaign.brand}
                </span>
              </div>
              <h1 className="mt-6 font-serif-display text-5xl sm:text-7xl leading-[0.95] text-ink">
                {campaign.title}
              </h1>
              <p className="mt-6 font-serif-italic text-2xl sm:text-3xl text-ink-muted leading-snug max-w-2xl">
                {campaign.tagline}
              </p>

              <div className="mt-10 hairline-top hairline-bottom py-6">
                <p className="text-[16px] leading-[1.8] text-ink whitespace-pre-line">
                  {campaign.brief}
                </p>
              </div>

              <div className="mt-8">
                <ApplyBlock
                  campaignId={campaign.id}
                  signedIn={creator != null}
                  existingStatus={existing?.status ?? null}
                />
              </div>
            </header>

            {/* Sidebar */}
            <aside className="lg:col-span-4 lg:pl-8 lg:border-l lg:border-hairline">
              <div className="space-y-8">
                <Stat label="Payout" value={formatMoney(campaign.payoutCents, campaign.currency)} />
                <Stat
                  label="Deadline"
                  value={
                    campaign.deadline
                      ? new Date(campaign.deadline).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Rolling"
                  }
                />
                <div>
                  <span className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                    Deliverables
                  </span>
                  <ul className="mt-3 space-y-2">
                    {campaign.deliverables.map((d, i) => (
                      <li
                        key={i}
                        className="dot-leader flex items-baseline gap-2 text-[14px]"
                      >
                        <span className="capitalize">{d.kind}</span>
                        <span className="ml-auto pl-2 font-mono-numeric text-ink">
                          ×{String(d.count).padStart(2, "0")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 border-t border-hairline text-[11px] small-caps tracking-[0.25em] text-ink-faint">
                  Issued{" "}
                  {new Date(campaign.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </aside>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">{label}</span>
      <div className="mt-2 font-serif-display text-3xl text-ink">{value}</div>
    </div>
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
