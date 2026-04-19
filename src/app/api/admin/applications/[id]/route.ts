import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth";
import { decideApplication } from "@/lib/store";

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
  await decideApplication(id, parsed.data.decision);
  return NextResponse.json({ ok: true });
}
