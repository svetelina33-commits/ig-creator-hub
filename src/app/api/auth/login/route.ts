import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { findCreatorByEmail } from "@/lib/store";
import { verifyPassword } from "@/lib/password";
import { getSession } from "@/lib/session";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
  }
  const creator = await findCreatorByEmail(parsed.data.email.toLowerCase());
  if (!creator || !creator.passwordHash) {
    return NextResponse.json(
      { error: "We couldn't find that account. Check your email, or sign up." },
      { status: 401 },
    );
  }
  const ok = await verifyPassword(parsed.data.password, creator.passwordHash);
  if (!ok) {
    return NextResponse.json({ error: "Wrong password." }, { status: 401 });
  }
  const session = await getSession();
  session.creatorId = creator.id;
  session.email = creator.email;
  await session.save();
  return NextResponse.json({ ok: true });
}
