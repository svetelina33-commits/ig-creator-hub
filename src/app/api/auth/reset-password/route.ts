import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createHash } from "crypto";
import {
  findCreatorByResetToken,
  setCreatorPasswordHash,
} from "@/lib/store";
import { hashPassword, validatePasswordStrength } from "@/lib/password";

const bodySchema = z.object({
  token: z.string().min(16),
  password: z.string().min(8).max(128),
});

function sha256(input: string): string {
  return createHash("sha256").update(input).digest("hex");
}

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const issue = validatePasswordStrength(parsed.data.password);
  if (issue) {
    return NextResponse.json({ error: issue }, { status: 400 });
  }
  const creator = await findCreatorByResetToken(sha256(parsed.data.token));
  if (!creator) {
    return NextResponse.json(
      { error: "This link has expired. Request another." },
      { status: 400 },
    );
  }
  const passwordHash = await hashPassword(parsed.data.password);
  await setCreatorPasswordHash(creator.id, passwordHash);
  return NextResponse.json({ ok: true });
}
