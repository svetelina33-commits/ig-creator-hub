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
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />
        <div className="mx-auto max-w-6xl py-12 sm:py-14 relative">
          <Reveal>
            <RunningHead
              left="CAMPAIGN BRIEF"
              center={campaign.brand.toUpperCase()}
              right={`№ ${campaign.id.replace("cmp_", "").toUpperCase()}`}
            />
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-4 text-[12px] small-caps tracking-[0.25em] text-ink-muted">
              <Link href="/campaigns" className="hover:text-ink">
                ← Back to the desk
              </Link>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <header className="lg:col-span-7">
                <ToneChip tone={campaign.coverTone} label={campaign.brand} />
                <h1 className="mt-6 font-serif-display text-[clamp(3rem,8vw,7rem)] leading-[0.92] text-ink">
                  {campaign.title}
                  <span className="text-violet">.</span>
                </h1>
                <p className="mt-6 font-serif-italic text-2xl sm:text-3xl text-ink-soft leading-snug max-w-2xl">
                  {campaign.tagline}
                </p>
              </header>

              <div className="lg:col-span-5 lg:pl-4">
                <div className="glass rounded-2xl p-2">
                  <CampaignCover campaign={campaign} variant="square" className="rounded-xl" />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <article className="lg:col-span-8 space-y-6">
              <Reveal>
                <div className="glass rounded-2xl p-6 sm:p-8">
                  <div className="small-caps text-[10px] tracking-[0.3em] text-ink-muted mb-4">
                    The brief
                  </div>
                  <div className="text-[17px] leading-[1.85] text-ink whitespace-pre-line max-w-2xl">
                    {campaign.brief}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div className="glass rounded-2xl p-6 sm:p-8">
                  <div className="small-caps text-[10px] tracking-[0.3em] text-ink-muted mb-5">
                    The flow
                  </div>
                  <ol className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <Step n="01" title="Apply" body="Drop a short note. The editor reads every one." />
                    <Step n="02" title="Shortlist" body="Verified creators matching the brief get approved." />
                    <Step n="03" title="Deliver" body="Post on Instagram · we publish with your consent." />
                    <Step n="04" title="Paid" body="Fee clears to your payout method once the brand confirms." />
                  </ol>
                </div>
              </Reveal>
              <Reveal delay={160}>
                <div className="glass rounded-2xl p-6 sm:p-8">
                  <ApplyBlock
                    campaignId={campaign.id}
                    signedIn={creator != null}
                    existingStatus={existing?.status ?? null}
                  />
                </div>
              </Reveal>
            </article>

            <aside className="lg:col-span-4">
              <Reveal delay={140}>
                <div className="glass rounded-2xl p-6 space-y-7">
                  <Stat label="Payout" value={formatMoney(campaign.payoutCents, campaign.currency)} accent="forest" />
                  <div>
                    <span className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                      Deadline
                    </span>
                    <div className="mt-2 font-serif-display text-3xl text-ink">
                      {campaign.deadline
                        ? new Date(campaign.deadline).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Rolling"}
                    </div>
                    {campaign.deadline && (
                      <div className="mt-1 small-caps text-[10px] tracking-[0.25em] text-violet">
                        {daysUntil(campaign.deadline)} remain
                      </div>
                    )}
                  </div>
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
                  <div className="pt-5 border-t border-white/10 text-[11px] small-caps tracking-[0.25em] text-ink-faint space-y-1">
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
                </div>
              </Reveal>
            </aside>
          </div>

          {/* ===== Pitch your own — alternate path ===== */}
          <Reveal delay={200}>
            <section className="mt-14">
              <Link
                href="/campaigns/pitch"
                className="group relative block rounded-3xl overflow-hidden border border-violet/25 bg-violet/[0.04] glass-hover"
              >
                <div className="relative px-6 sm:px-10 py-10 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-8">
                    <span className="small-caps text-[10px] tracking-[0.3em] text-violet">
                      ◆ Another register · From creators
                    </span>
                    <h3 className="mt-3 font-serif-display text-3xl sm:text-4xl text-ink leading-[1.05]">
                      Not quite the brief?{" "}
                      <span className="font-serif-italic text-violet">Pitch your own.</span>
                    </h3>
                    <p className="mt-3 text-[14px] leading-[1.65] text-ink-muted max-w-2xl">
                      Have a brand and an idea in mind? Write the brief yourself — payout,
                      deliverables, timeline. The editor reviews; if it fits the register, we
                      make it live for the network.
                    </p>
                  </div>
                  <div className="lg:col-span-4 flex lg:justify-end">
                    <span className="btn-primary inline-flex items-center gap-3 px-6 py-3 rounded-full text-[12px] small-caps tracking-[0.2em]">
                      Submit a pitch
                      <span aria-hidden>→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </section>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <li>
      <div className="font-mono-numeric text-[10px] text-violet">{n}</div>
      <div className="mt-1 font-serif-display text-lg text-ink">{title}</div>
      <p className="mt-1 text-[12px] text-ink-muted leading-[1.5]">{body}</p>
    </li>
  );
}

function daysUntil(deadline: string): string {
  const diff = new Date(deadline).getTime() - Date.now();
  const days = Math.max(0, Math.ceil(diff / 86400000));
  return `${days.toString().padStart(2, "0")} DAYS`;
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: "forest" | "violet" | "vermillion" | "ochre" | "ink";
}) {
  const color = accent
    ? {
        forest: "text-forest",
        violet: "text-violet",
        vermillion: "text-vermillion",
        ochre: "text-ochre",
        ink: "text-ink",
      }[accent]
    : "text-ink";
  return (
    <div>
      <span className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">{label}</span>
      <div className={`mt-2 font-serif-display text-3xl ${color}`}>{value}</div>
    </div>
  );
}
