import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/session";
import { createCampaignRequest } from "@/lib/store";

const Body = z.object({
  title: z.string().min(2).max(120),
  brand: z.string().min(1).max(80),
  tagline: z.string().min(1).max(200),
  brief: z.string().min(20).max(5000),
  payoutCents: z.number().int().min(0).max(1_000_000_00),
  currency: z.enum(["USD", "EUR", "GBP"]),
  deadline: z.string().nullable(),
  deliverables: z
    .array(
      z.object({
        kind: z.enum(["post", "reel", "story"]),
        count: z.number().int().min(1).max(20),
      }),
    )
    .min(1)
    .max(6),
  coverTone: z.enum(["forest", "vermillion", "ochre", "ink"]),
  requestNote: z.string().max(2000).nullable().optional(),
});

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.creatorId) {
    return NextResponse.json({ error: "not_signed_in" }, { status: 401 });
  }
  const json = await req.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_input", issues: parsed.error.issues },
      { status: 400 },
    );
  }
  const campaign = await createCampaignRequest({
    creatorId: session.creatorId,
    ...parsed.data,
    requestNote: parsed.data.requestNote ?? null,
  });
  return NextResponse.json({ ok: true, id: campaign.id, slug: campaign.slug });
}
