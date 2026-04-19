import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { createCampaign } from "@/lib/store";

const deliverableSchema = z.object({
  kind: z.enum(["post", "reel", "story"]),
  count: z.number().int().min(1).max(20),
});

const bodySchema = z.object({
  brand: z.string().min(1).max(80),
  title: z.string().min(1).max(120),
  tagline: z.string().min(1).max(200),
  brief: z.string().min(20).max(4000),
  payoutCents: z.number().int().min(0),
  currency: z.enum(["USD", "EUR", "GBP"]),
  deadline: z.string().nullable(),
  deliverables: z.array(deliverableSchema).min(1),
  status: z.enum(["open", "draft"]),
  coverTone: z.enum(["forest", "vermillion", "ochre", "ink"]),
});

export async function POST(req: NextRequest) {
  await requireAdmin();
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues.map((i) => i.message).join(", ") },
      { status: 400 },
    );
  }
  const campaign = await createCampaign(parsed.data);
  return NextResponse.json({ ok: true, campaignId: campaign.id });
}
