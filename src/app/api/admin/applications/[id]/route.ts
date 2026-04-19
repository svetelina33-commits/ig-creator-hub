import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import {
  decideApplication,
  findApplicationById,
  findCampaignById,
  findCreatorById,
} from "@/lib/store";
import { sendEmail, applicationDecidedEmail } from "@/lib/email";

const bodySchema = z.object({
  decision: z.enum(["approved", "rejected"]),
});

type Params = Promise<{ id: string }>;

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  await requireAdmin();
  const { id } = await params;
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_decision" }, { status: 400 });
  }

  const application = await findApplicationById(id);
  if (!application) {
    return NextResponse.json({ error: "application_not_found" }, { status: 404 });
  }
  await decideApplication(id, parsed.data.decision);

  const [creator, campaign] = await Promise.all([
    findCreatorById(application.creatorId),
    findCampaignById(application.campaignId),
  ]);
  if (creator && campaign) {
    const email_ = applicationDecidedEmail(creator.email, campaign.title, parsed.data.decision);
    await sendEmail({ to: creator.email, ...email_ });
  }

  return NextResponse.json({ ok: true });
}
