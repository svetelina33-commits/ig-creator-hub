import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { disconnectPayoutMethod } from "@/lib/store";

export async function POST() {
  const session = await getSession();
  if (!session.creatorId) {
    return NextResponse.json({ error: "not_signed_in" }, { status: 401 });
  }
  await disconnectPayoutMethod(session.creatorId);
  return NextResponse.json({ ok: true });
}
