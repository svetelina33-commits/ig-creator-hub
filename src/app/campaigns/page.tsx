import Link from "next/link";
import { getSession } from "@/lib/session";
import { findCreatorById, listCampaigns, formatMoney } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";

export default async function CampaignsPage() {
  const session = await getSession();
  const creator = session.creatorId ? await findCreatorById(session.creatorId) : null;
  const admin = await isAdmin();
  const campaigns = await listCampaigns({ status: "open" });

  return (
    <>
      <Masthead email={creator?.email} isAdmin={admin} />
      <main className="px-6 sm:px-10">
        <div className="mx-auto max-w-6xl py-12 sm:py-16">
          <div className="flex items-end justify-between gap-4 mb-12">
            <div>
              <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                Volume I · The Desk
              </p>
              <h1 className="mt-3 font-serif-display text-5xl sm:text-7xl leading-none text-ink">
                <span className="font-serif-italic">Open</span> commissions
              </h1>
            </div>
            <span className="hidden sm:block font-mono-numeric text-[11px] tracking-widest text-ink-faint">
              {String(campaigns.length).padStart(2, "0")} · current
            </span>
          </div>

          {campaigns.length === 0 ? (
            <div className="hairline-top pt-10 text-ink-muted italic">
              Nothing on the docket this week. We'll have new briefs shortly.
            </div>
          ) : (
            <div className="hairline-top">
              <ul className="divide-y divide-hairline">
                {campaigns.map((c, i) => (
                  <li key={c.id}>
                    <Link
                      href={`/campaigns/${c.id}`}
                      className="group grid grid-cols-12 gap-5 py-8 hover:bg-paper-raised/60 transition-colors -mx-4 px-4 rounded"
                    >
                      <div className="col-span-12 sm:col-span-1 font-mono-numeric text-[11px] text-ink-faint pt-1">
                        №{String(i + 1).padStart(2, "0")}
                      </div>
                      <div className="col-span-12 sm:col-span-6">
                        <div className="flex items-center gap-3">
                          <span
                            className={`inline-block h-[2px] w-8 ${toneBg(c.coverTone)}`}
                            aria-hidden
                          />
                          <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
                            {c.brand}
                          </span>
                        </div>
                        <div className="mt-2 font-serif-display text-3xl sm:text-4xl text-ink group-hover:text-forest transition-colors leading-tight">
                          {c.title}
                        </div>
                        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink-muted">
                          {c.tagline}
                        </p>
                      </div>
                      <div className="col-span-6 sm:col-span-3 text-[12px] text-ink-muted pt-2 space-y-1">
                        <div className="small-caps tracking-[0.2em]">Deliverables</div>
                        <div>
                          {c.deliverables.map((d, k) => (
                            <div key={k}>
                              <span className="font-mono-numeric">
                                {String(d.count).padStart(2, "0")}
                              </span>{" "}
                              × {d.kind}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="col-span-6 sm:col-span-2 text-right pt-2">
                        <div className="font-mono-numeric text-xl text-ink">
                          {formatMoney(c.payoutCents, c.currency)}
                        </div>
                        {c.deadline && (
                          <div className="mt-1 small-caps text-[10px] tracking-[0.2em] text-ink-muted">
                            by{" "}
                            {new Date(c.deadline).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
