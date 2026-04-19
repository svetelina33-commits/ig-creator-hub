import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createHash, randomBytes } from "crypto";
import { findCreatorByEmail, setPasswordResetToken } from "@/lib/store";
import { sendEmail, passwordResetEmail } from "@/lib/email";
import { env } from "@/lib/env";

const bodySchema = z.object({ email: z.string().email() });

function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  const email = parsed.data.email.toLowerCase();
  const creator = await findCreatorByEmail(email);

  // Always respond success to avoid account enumeration.
  if (!creator) {
    return NextResponse.json({ ok: true });
  }

  const token = randomBytes(32).toString("base64url");
  const tokenHash = sha256(token);
  await setPasswordResetToken(creator.id, tokenHash, 60 * 60); // 60 minutes
  const resetUrl = `${env().APP_BASE_URL}/reset-password/${token}`;

  const email_ = passwordResetEmail(creator.email, resetUrl);
  await sendEmail({ to: creator.email, ...email_ });

  return NextResponse.json({ ok: true });
}
