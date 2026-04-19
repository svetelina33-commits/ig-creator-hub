import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { disconnectInstagram } from "@/lib/store";

export async function POST() {
  const session = await getSession();
  if (!session.creatorId) {
    return NextResponse.json({ error: "not_signed_in" }, { status: 401 });
  }
  await disconnectInstagram(session.creatorId);
  return NextResponse.json({ ok: true });
}
