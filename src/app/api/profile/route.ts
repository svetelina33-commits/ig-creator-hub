import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/session";
import { findCreatorById, updateCreatorProfile } from "@/lib/store";

const schema = z.object({
  slug: z
    .string()
    .min(2)
    .max(40)
    .regex(/^[a-z0-9][a-z0-9-]*[a-z0-9]$/, "Lowercase letters, digits and dashes only"),
  displayName: z.string().min(1).max(80),
  bio: z.string().max(600),
  city: z.string().max(80),
  niches: z.array(z.string().min(1).max(40)).max(6),
  portfolioLinks: z
    .array(z.object({ label: z.string().min(1).max(40), url: z.string().url() }))
    .max(6),
  accent: z.enum(["forest", "vermillion", "ochre", "ink"]),
  isPublic: z.boolean(),
});

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.creatorId) {
    return NextResponse.json({ error: "not_signed_in" }, { status: 401 });
  }
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    const msg = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
    return NextResponse.json({ error: msg }, { status: 400 });
  }
  const creator = await findCreatorById(session.creatorId);
  if (!creator) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  await updateCreatorProfile(creator.id, {
    ...parsed.data,
    updatedAt: new Date().toISOString(),
  });
  return NextResponse.json({ ok: true });
}
