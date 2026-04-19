import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createCreator, findCreatorByEmail } from "@/lib/store";
import { getSession } from "@/lib/session";
import { hashPassword, validatePasswordStrength } from "@/lib/password";
import { sendEmail, welcomeEmail } from "@/lib/email";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
});

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
  }

  const email = parsed.data.email.toLowerCase();
  const strengthIssue = validatePasswordStrength(parsed.data.password);
  if (strengthIssue) {
    return NextResponse.json({ error: strengthIssue }, { status: 400 });
  }

  const existing = await findCreatorByEmail(email);
  if (existing && existing.passwordHash) {
    return NextResponse.json(
      { error: "An account with this email already exists. Try signing in." },
      { status: 409 },
    );
  }

  const passwordHash = await hashPassword(parsed.data.password);
  const creator = await createCreator(email, passwordHash);
  // If a creator existed without a password (early access), set it now.
  if (existing && !existing.passwordHash) {
    const { setCreatorPasswordHash } = await import("@/lib/store");
    await setCreatorPasswordHash(existing.id, passwordHash);
  }

  const session = await getSession();
  session.creatorId = creator.id;
  session.email = creator.email;
  await session.save();

  const welcome = welcomeEmail(creator.email);
  await sendEmail({ to: creator.email, ...welcome });

  return NextResponse.json({ ok: true, creatorId: creator.id });
}
