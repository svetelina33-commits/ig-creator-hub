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
import { CampaignCover } from "@/components/CampaignCover";
import { Reveal } from "@/components/Reveal";
import { RunningHead, ToneChip } from "@/components/Ornaments";
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
        <div className="mx-auto max-w-6xl py-10 sm:py-14">
          <Reveal>
            <RunningHead
              left="CAMPAIGN BRIEF"
              center={campaign.brand.toUpperCase()}
              right={`№ ${campaign.id.replace("cmp_", "").toUpperCase()}`}
            />
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-4 text-[12px] small-caps tracking-[0.25em] text-ink-muted">
              <Link href="/campaigns" className="hover:text-forest">
                ← Back to the desk
              </Link>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <header className="lg:col-span-7">
                <ToneChip tone={campaign.coverTone} label={campaign.brand} />
                <h1 className="mt-6 font-serif-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-ink">
                  {campaign.title}
                  <span className="text-forest">.</span>
                </h1>
                <p className="mt-6 font-serif-italic text-2xl sm:text-3xl text-ink-muted leading-snug max-w-2xl">
                  {campaign.tagline}
                </p>
              </header>

              <div className="lg:col-span-5 lg:pl-4">
                <CampaignCover campaign={campaign} variant="square" />
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <article className="lg:col-span-8">
              <Reveal>
                <div className="hairline-top pt-8">
                  <div className="small-caps text-[10px] tracking-[0.3em] text-ink-muted mb-4">
                    The brief
                  </div>
                  <div className="text-[17px] leading-[1.85] text-ink whitespace-pre-line font-serif-book max-w-2xl">
                    {campaign.brief}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div className="mt-10">
                  <ApplyBlock
                    campaignId={campaign.id}
                    signedIn={creator != null}
                    existingStatus={existing?.status ?? null}
                  />
                </div>
              </Reveal>
            </article>

            <aside className="lg:col-span-4 lg:pl-8 lg:border-l lg:border-hairline">
              <Reveal delay={140} className="space-y-8">
                <Stat label="Payout" value={formatMoney(campaign.payoutCents, campaign.currency)} accent="forest" />
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
                <div className="pt-6 border-t border-hairline text-[11px] small-caps tracking-[0.25em] text-ink-faint space-y-1">
                  <div>
                    Issued{" "}
                    {new Date(campaign.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                  <div>Under the editor's care.</div>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "forest" | "vermillion" | "ochre" | "ink";
}) {
  const color = accent ? `text-${accent}` : "text-ink";
  return (
    <div>
      <span className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">{label}</span>
      <div className={`mt-2 font-serif-display text-3xl ${color}`}>{value}</div>
    </div>
  );
}
