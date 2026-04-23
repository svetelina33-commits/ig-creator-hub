import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { findCreatorById } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import {
  availableCents,
  getEarningsFor,
  formatMoneyCents,
  type EarningsSummary,
} from "@/lib/earnings";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { CountUp } from "@/components/CountUp";

export const metadata = { title: "Withdraw · Nexus Club" };

export default async function EarningsPage() {
  const session = await getSession();
  if (!session.creatorId) redirect("/");
  const creator = await findCreatorById(session.creatorId);
  if (!creator) redirect("/");

  const [admin, earnings] = await Promise.all([
    isAdmin(),
    getEarningsFor(creator.id),
  ]);

  const availableTotal = availableCents(earnings);
  const lifetime = formatMoneyCents(availableTotal, earnings.currency);
  const available = formatMoneyCents(availableTotal, earnings.currency);
  const hold = formatMoneyCents(earnings.holdCents, earnings.currency);
  const paid = formatMoneyCents(earnings.paidCents, earnings.currency);
  const review = formatMoneyCents(earnings.underReviewCents, earnings.currency);

  return (
    <>
      <Masthead email={creator.email} isAdmin={admin} />
      <main className="px-6 sm:px-10 relative">
        <div className="mx-auto max-w-7xl py-12 sm:py-16 relative">
          <div className="mb-12 flex items-end justify-between gap-6 flex-wrap">
            <div>
              <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                Member · Withdrawal
              </p>
              <h1 className="mt-3 font-serif-display text-5xl sm:text-6xl leading-none text-ink">
                Your <span className="font-serif-italic text-ink-soft">account</span>
                <span className="text-violet">.</span>
              </h1>
              <p className="mt-3 text-[13px] text-ink-muted max-w-md leading-[1.6]">
                Everything about the money — what&apos;s available, what&apos;s in holding, what
                the editor is still reviewing, and where the fees came from.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/dashboard" className="btn-ghost px-4 py-2 rounded-full text-[11px]">
                ← Desk
              </Link>
              {availableTotal > 0 ? (
                <Link
                  href="/earnings/withdraw"
                  className="btn-primary inline-flex items-center gap-3 px-6 py-3 rounded-full text-[12px]"
                >
                  Withdraw · {available.symbol}
                  {available.whole}
                  <span aria-hidden>→</span>
                </Link>
              ) : (
                <Link
                  href="/campaigns"
                  className="btn-primary inline-flex items-center gap-3 px-5 py-2.5 rounded-full text-[12px]"
                >
                  Browse briefs
                  <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          </div>

          <section className="glass rounded-2xl p-8 sm:p-10 mb-6 relative overflow-hidden">
            <div className="flex items-baseline justify-between mb-1 flex-wrap gap-3">
              <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
                Available to withdraw
              </span>
              <div className="flex items-center gap-2 small-caps text-[10px] tracking-[0.2em]">
                {creator.payout ? (
                  <span className="text-forest">● payout method connected</span>
                ) : (
                  <Link href="/settings/payouts" className="text-amber hover:text-ink">
                    ● connect a payout method →
                  </Link>
                )}
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2 leading-none whitespace-nowrap overflow-hidden">
              <span className="font-serif-display text-3xl sm:text-5xl text-ink-muted">
                {available.symbol}
              </span>
              <span className="font-serif-display text-[clamp(3rem,14vw,9rem)] text-ink font-mono-numeric">
                <CountUp value={Math.floor(availableTotal / 100)} />
              </span>
              <span className="font-serif-display text-2xl sm:text-3xl text-ink-muted font-mono-numeric">
                .{available.cents}
              </span>
            </div>
            <div className="mt-2 text-[12px] text-ink-muted max-w-lg leading-[1.5]">
              Lifetime{" "}
              <span className="font-mono-numeric text-ink-soft">
                {lifetime.symbol}
                {lifetime.whole}.{lifetime.cents}
              </span>{" "}
              · withdrawable once you verify identity at withdrawal.
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <StatTile
                label="Cleared · paid"
                desc="Brand has settled, funds left our account"
                symbol={paid.symbol}
                whole={paid.whole}
                cents={paid.cents}
                tone="forest"
                dot
              />
              <StatTile
                label="In holding"
                desc="Editor approved · awaiting brand settlement"
                symbol={hold.symbol}
                whole={hold.whole}
                cents={hold.cents}
                tone="violet"
              />
              <StatTile
                label="Under review"
                desc="Max if approved · editor reviewing within 12h"
                symbol={review.symbol}
                whole={review.whole}
                cents={review.cents}
                tone="amber"
              />
              <StatTile
                label="Declined · lifetime"
                desc={`${earnings.declinedCount.toString().padStart(2, "0")} application(s)`}
                symbol=""
                whole={String(earnings.declinedCount).padStart(2, "0")}
                cents=""
                tone="ink"
              />
            </div>

            <div className="lg:col-span-5 glass rounded-2xl p-6 sm:p-8 flex flex-col">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
                    Last 6 months
                  </span>
                  <h2 className="mt-2 font-serif-display text-2xl text-ink">Cadence</h2>
                </div>
                <div className="flex items-center gap-3 small-caps text-[9px] tracking-[0.25em] text-ink-muted">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-forest inline-block" /> paid
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-violet inline-block" /> in hold
                  </span>
                </div>
              </div>
              <EarningsBarChart monthly={earnings.monthly} currency={earnings.currency} />
            </div>
          </section>

          <PayoutMethodCard payout={creator.payout ?? null} verified={Boolean(creator.google)} />

          <FundsInMotion rows={earnings.rows} currency={earnings.currency} />
        </div>
      </main>
      <Footer />
    </>
  );
}

function StatTile({
  label,
  desc,
  symbol,
  whole,
  cents,
  tone,
  dot,
}: {
  label: string;
  desc: string;
  symbol: string;
  whole: string;
  cents: string;
  tone: "forest" | "violet" | "amber" | "ink";
  dot?: boolean;
}) {
  const colorMap = {
    forest: "text-forest",
    violet: "text-violet",
    amber: "text-amber",
    ink: "text-ink",
  };
  return (
    <div className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex items-center gap-2 small-caps text-[10px] tracking-[0.25em] text-ink-muted">
        {dot && <span className={`signal-dot ${colorMap[tone]}`} />}
        <span>{label}</span>
      </div>
      <div className="mt-3 flex items-baseline gap-1 leading-none flex-wrap">
        {symbol && (
          <span className={`font-serif-display text-lg ${colorMap[tone]} opacity-80`}>
            {symbol}
          </span>
        )}
        <span className={`font-serif-display text-4xl sm:text-5xl ${colorMap[tone]} font-mono-numeric`}>
          {whole}
        </span>
        {cents && (
          <span
            className={`font-serif-display text-lg ${colorMap[tone]} font-mono-numeric opacity-70`}
          >
            .{cents}
          </span>
        )}
      </div>
      <p className="mt-2 text-[11.5px] leading-[1.5] text-ink-muted">{desc}</p>
    </div>
  );
}

function EarningsBarChart({
  monthly,
  currency,
}: {
  monthly: EarningsSummary["monthly"];
  currency: "USD" | "EUR" | "GBP";
}) {
  const max = Math.max(1, ...monthly.map((m) => m.paidCents + m.approvedCents));
  const symbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : "£";
  return (
    <div className="flex-1 flex items-end gap-3 mt-6 h-40">
      {monthly.map((m) => {
        const paidPct = (m.paidCents / max) * 100;
        const approvedPct = (m.approvedCents / max) * 100;
        const total = m.paidCents + m.approvedCents;
        const label = shortMonth(m.month);
        const value = total === 0 ? "—" : `${symbol}${Math.floor(total / 100).toLocaleString("en-US")}`;
        const delay = 120 + monthly.indexOf(m) * 90;
        return (
          <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full flex-1 flex flex-col-reverse gap-0.5">
              <div
                className="nc-bar w-full bg-forest/60 rounded-sm"
                style={{ height: `${paidPct}%`, animationDelay: `${delay}ms` }}
              />
              <div
                className="nc-bar w-full bg-violet/50 rounded-sm"
                style={{ height: `${approvedPct}%`, animationDelay: `${delay + 80}ms` }}
              />
            </div>
            <div className="small-caps text-[9px] tracking-[0.2em] text-ink-faint">{label}</div>
            <div className="font-mono-numeric text-[10px] text-ink-muted">{value}</div>
          </div>
        );
      })}
    </div>
  );
}

function PayoutMethodCard({
  payout,
  verified,
}: {
  payout: import("@/lib/store").PayoutMethod | null;
  verified: boolean;
}) {
  if (!payout) {
    return (
      <section className="glass rounded-2xl p-6 sm:p-8 flex items-center gap-8 flex-wrap mb-8">
        <div className="flex-1 min-w-[280px]">
          <span className="small-caps text-[10px] tracking-[0.3em] text-amber">
            Step 01 · payout method
          </span>
          <h2 className="mt-2 font-serif-display text-3xl text-ink">
            Where should we send the fees?
          </h2>
          <p className="mt-2 text-[13px] text-ink-muted max-w-md leading-[1.6]">
            Pick PayPal, Stripe, or a bank account. Stored encrypted at rest. You can swap any time.
          </p>
        </div>
        <Link
          href="/settings/payouts"
          className="btn-primary inline-flex items-center gap-3 px-5 py-3 rounded-full text-[12px] tracking-wide"
        >
          Connect payout method
          <span aria-hidden>→</span>
        </Link>
      </section>
    );
  }

  const kindLabel =
    payout.kind === "paypal" ? "PayPal" : payout.kind === "stripe" ? "Stripe" : "Bank account";

  return (
    <section className="glass rounded-2xl p-6 sm:p-7 mb-8 flex items-center gap-8 flex-wrap">
      <div className="flex-1 min-w-[280px]">
        <div className="small-caps text-[10px] tracking-[0.3em] text-ink-muted mb-2">
          Payout method · <span className="text-forest">● connected</span>
          {!verified && (
            <span className="text-amber ml-3">● identity not yet verified</span>
          )}
        </div>
        <div className="font-serif-display text-2xl text-ink">{kindLabel}</div>
        <div className="mt-1 font-mono-numeric text-[12px] text-ink-muted">{payout.label}</div>
        <div className="mt-1 small-caps text-[10px] tracking-[0.25em] text-ink-faint">
          Since{" "}
          {new Date(payout.connectedAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>
      <Link
        href="/settings/payouts"
        className="btn-ghost px-4 py-2 rounded-full text-[11px]"
      >
        Manage →
      </Link>
    </section>
  );
}

function FundsInMotion({
  rows,
  currency,
}: {
  rows: import("@/lib/earnings").EarningRow[];
  currency: "USD" | "EUR" | "GBP";
}) {
  return (
    <section className="mt-2">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <span className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
            §III · Funds in motion
          </span>
          <h2 className="mt-2 font-serif-display text-3xl text-ink">Every transaction</h2>
        </div>
        <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
          {rows.length.toString().padStart(2, "0")} entries
        </span>
      </div>
      {rows.length === 0 ? (
        <div className="glass rounded-2xl p-8 text-ink-muted text-[14px]">
          No entries yet. Apply to a brief to start — the fee lands here once the editor reviews.
        </div>
      ) : (
        <div className="glass rounded-2xl overflow-hidden">
          <div className="hidden sm:grid grid-cols-12 px-5 py-3 small-caps text-[10px] tracking-[0.25em] text-ink-faint border-b border-white/10">
            <div className="col-span-5">Brief</div>
            <div className="col-span-2">Brand</div>
            <div className="col-span-2">State</div>
            <div className="col-span-3 text-right">Amount</div>
          </div>
          <ul className="divide-y divide-white/5">
            {rows.map((r) => {
              const money = formatMoneyCents(r.amountCents, r.currency);
              return (
                <li key={r.applicationId}>
                  <Link
                    href={`/applications/${r.applicationId}`}
                    className="flex flex-col gap-2 sm:grid sm:grid-cols-12 sm:items-center sm:gap-3 px-5 py-4 hover:bg-white/[0.03] transition-colors"
                  >
                    <div className="sm:col-span-5 min-w-0">
                      <div className="flex items-center justify-between gap-3 sm:block">
                        <div className="text-[14px] text-ink truncate">{r.campaign.title}</div>
                        <div className="font-mono-numeric text-ink tabular-nums text-[14px] sm:hidden whitespace-nowrap">
                          {money.symbol}
                          {money.whole}
                          <span className="text-ink-muted">.{money.cents}</span>
                        </div>
                      </div>
                      <div className="mt-0.5 font-mono-numeric text-[10px] text-ink-faint">
                        Applied{" "}
                        {new Date(r.appliedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                        {r.paidAt && (
                          <>
                            {" · paid "}
                            {new Date(r.paidAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 sm:contents">
                      <div className="sm:col-span-2 small-caps text-[10px] tracking-[0.2em] text-ink-muted">
                        {r.campaign.brand}
                      </div>
                      <div className="sm:col-span-2">
                        <StateStamp state={r.state} />
                      </div>
                      <div className="hidden sm:block sm:col-span-3 text-right font-mono-numeric text-ink tabular-nums">
                        {money.symbol}
                        {money.whole}
                        <span className="text-ink-muted">.{money.cents}</span>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="px-5 py-3 border-t border-white/10 text-[10px] small-caps tracking-[0.25em] text-ink-faint flex items-center justify-between">
            <span>Currency · {currency}</span>
            <span>Updated now</span>
          </div>
        </div>
      )}
    </section>
  );
}

function StateStamp({ state }: { state: "pending_approval" | "approved_unpaid" | "paid" | "declined" }) {
  const map = {
    pending_approval: { label: "under review · 12h", tone: "text-amber" },
    approved_unpaid: { label: "● in holding", tone: "text-violet" },
    paid: { label: "● paid", tone: "text-forest" },
    declined: { label: "declined", tone: "text-vermillion" },
  } as const;
  const { label, tone } = map[state];
  return <span className={`small-caps text-[10px] tracking-[0.25em] ${tone}`}>{label}</span>;
}

function shortMonth(key: string): string {
  const [, m] = key.split("-");
  return ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][
    Number(m) - 1
  ];
}
