import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createCreator } from "@/lib/store";
import { getSession } from "@/lib/session";

const bodySchema = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  const creator = await createCreator(parsed.data.email);
  const session = await getSession();
  session.creatorId = creator.id;
  session.email = creator.email;
  await session.save();
  return NextResponse.json({ ok: true, creatorId: creator.id });
}
