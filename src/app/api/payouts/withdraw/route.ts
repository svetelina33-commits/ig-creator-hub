import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { createWithdrawalRequest, findCreatorById } from "@/lib/store";
import { availableCents, getEarningsFor } from "@/lib/earnings";

export async function POST() {
  const session = await getSession();
  if (!session.creatorId) {
    return NextResponse.json({ error: "not_signed_in" }, { status: 401 });
  }
  const creator = await findCreatorById(session.creatorId);
  if (!creator) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  if (!creator.payout) {
    return NextResponse.json({ error: "no_payout_method" }, { status: 412 });
  }
  if (!creator.google) {
    return NextResponse.json({ error: "not_verified" }, { status: 412 });
  }

  const earnings = await getEarningsFor(creator.id);
  const amount = availableCents(earnings);
  if (amount <= 0) {
    return NextResponse.json({ error: "no_funds_available" }, { status: 412 });
  }

  const { id } = await createWithdrawalRequest({
    creatorId: creator.id,
    amountCents: amount,
    currency: earnings.currency,
    payoutMethod: creator.payout.kind,
    payoutLabel: creator.payout.label,
    googleEmail: creator.google.email,
  });
  return NextResponse.json({ ok: true, id });
}
