import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/session";
import {
  createApplication,
  findCampaignById,
  findCreatorById,
} from "@/lib/store";
import { sendEmail, applicationReceivedEmail } from "@/lib/email";

const bodySchema = z.object({
  note: z.string().min(20).max(800),
});

type Params = Promise<{ id: string }>;

export async function POST(
  req: NextRequest,
  { params }: { params: Params },
) {
  const session = await getSession();
  if (!session.creatorId) {
    return NextResponse.json({ error: "not_signed_in" }, { status: 401 });
  }
  const { id } = await params;
  const campaign = await findCampaignById(id);
  if (!campaign) {
    return NextResponse.json({ error: "campaign_not_found" }, { status: 404 });
  }
  if (campaign.status !== "open") {
    return NextResponse.json({ error: "campaign_closed" }, { status: 400 });
  }
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_note" }, { status: 400 });
  }
  const application = await createApplication({
    creatorId: session.creatorId,
    campaignId: campaign.id,
    note: parsed.data.note,
  });
  const creator = await findCreatorById(session.creatorId);
  if (creator) {
    const email_ = applicationReceivedEmail(creator.email, campaign.title);
    await sendEmail({ to: creator.email, ...email_ });
  }
  return NextResponse.json({ ok: true, applicationId: application.id });
}
