import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/session";
import { savePayoutMethod } from "@/lib/store";

const Body = z.object({
  kind: z.enum(["paypal", "stripe", "bank"]),
  label: z.string().min(1).max(200),
  detailsPublic: z.record(z.string(), z.string()),
  detailsPrivate: z.record(z.string(), z.string()),
});

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.creatorId) {
    return NextResponse.json({ error: "not_signed_in" }, { status: 401 });
  }
  const json = await req.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }
  await savePayoutMethod(session.creatorId, parsed.data);
  return NextResponse.json({ ok: true });
}
