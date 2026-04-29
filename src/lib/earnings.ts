import {
  findCampaignsByIds,
  listApplicationsForCreator,
  type ApplicationRecord,
  type CampaignRecord,
} from "./store";

export type EarningRow = {
  applicationId: string;
  campaign: Pick<CampaignRecord, "id" | "title" | "brand" | "currency" | "payoutCents" | "coverTone">;
  amountCents: number;
  currency: CampaignRecord["currency"];
  state: "pending_approval" | "approved_unpaid" | "paid" | "declined";
  appliedAt: string;
  decidedAt: string | null;
  paidAt: string | null;
};

export type EarningsSummary = {
  paidCents: number;
  holdCents: number;
  underReviewCents: number;
  declinedCount: number;
  approvedCount: number;
  currency: CampaignRecord["currency"];
  rows: EarningRow[];
  monthly: { month: string; paidCents: number; approvedCents: number }[];
};

export function availableCents(s: Pick<EarningsSummary, "paidCents" | "holdCents">): number {
  return s.paidCents + s.holdCents;
}

export async function getEarningsFor(creatorId: string): Promise<EarningsSummary> {
  const applications = await listApplicationsForCreator(creatorId);
  const campaigns = await findCampaignsByIds([
    ...new Set(applications.map((a) => a.campaignId)),
  ]);
  const campaignById = new Map(campaigns.map((c) => [c.id, c]));
  const rows = applications
    .map((a) => buildRow(a, campaignById.get(a.campaignId)))
    .filter((r): r is EarningRow => r !== null);

  let paidCents = 0;
  let holdCents = 0;
  let underReviewCents = 0;
  let paidCount = 0;
  let approvedUnpaidCount = 0;
  let declinedCount = 0;
  for (const r of rows) {
    if (r.state === "paid") { paidCents += r.amountCents; paidCount++; }
    else if (r.state === "approved_unpaid") { holdCents += r.amountCents; approvedUnpaidCount++; }
    else if (r.state === "pending_approval") { underReviewCents += r.amountCents; }
    else if (r.state === "declined") { declinedCount++; }
  }

  // Fallback to USD when the creator has no rows yet — display-only, no money moves.
  const currency: CampaignRecord["currency"] = rows[0]?.currency ?? "USD";

  return {
    paidCents,
    holdCents,
    underReviewCents,
    declinedCount,
    approvedCount: paidCount + approvedUnpaidCount,
    currency,
    rows: rows.sort((a, b) => (b.appliedAt > a.appliedAt ? 1 : -1)),
    monthly: buildMonthlyBuckets(rows),
  };
}

function buildRow(a: ApplicationRecord, campaign: CampaignRecord | undefined): EarningRow | null {
  if (!campaign) return null;
  const state: EarningRow["state"] =
    a.status === "rejected"
      ? "declined"
      : a.status === "pending"
        ? "pending_approval"
        : a.paidAt
          ? "paid"
          : "approved_unpaid";
  return {
    applicationId: a.id,
    campaign: {
      id: campaign.id,
      title: campaign.title,
      brand: campaign.brand,
      currency: campaign.currency,
      payoutCents: campaign.payoutCents,
      coverTone: campaign.coverTone,
    },
    amountCents: a.paidAmountCents ?? campaign.payoutCents,
    currency: campaign.currency,
    state,
    appliedAt: a.appliedAt,
    decidedAt: a.decidedAt,
    paidAt: a.paidAt,
  };
}

function buildMonthlyBuckets(rows: EarningRow[]): EarningsSummary["monthly"] {
  const buckets = new Map<string, { paidCents: number; approvedCents: number }>();
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1));
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
    buckets.set(key, { paidCents: 0, approvedCents: 0 });
  }
  for (const r of rows) {
    const ref = r.paidAt ?? r.decidedAt ?? r.appliedAt;
    const d = new Date(ref);
    const key = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
    const b = buckets.get(key);
    if (!b) continue;
    if (r.state === "paid") b.paidCents += r.amountCents;
    else if (r.state === "approved_unpaid") b.approvedCents += r.amountCents;
  }
  return Array.from(buckets.entries()).map(([month, v]) => ({ month, ...v }));
}

export function formatMoneyCents(
  cents: number,
  currency: CampaignRecord["currency"],
): { symbol: string; whole: string; cents: string } {
  const symbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : "£";
  const abs = Math.abs(cents);
  const whole = Math.floor(abs / 100).toLocaleString("en-SG");
  const c = String(abs % 100).padStart(2, "0");
  return { symbol, whole, cents: c };
}
