import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { findCampaignById, updateCampaignStatus } from "@/lib/store";

const bodySchema = z.object({
  status: z.enum(["draft", "open", "closed"]),
});

type Params = Promise<{ id: string }>;

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  await requireAdmin();
  const { id } = await params;
  const campaign = await findCampaignById(id);
  if (!campaign) {
    return NextResponse.json({ error: "campaign_not_found" }, { status: 404 });
  }
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_status" }, { status: 400 });
  }
  await updateCampaignStatus(campaign.id, parsed.data.status);
  return NextResponse.json({ ok: true });
}
