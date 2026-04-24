import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/session";
import {
  createSupportTicket,
  findCreatorById,
  listSupportTicketsForCreator,
} from "@/lib/store";

const Attachment = z.object({
  url: z
    .string()
    .url()
    .refine((u) => {
      try {
        const host = new URL(u).hostname;
        return host.endsWith(".public.blob.vercel-storage.com");
      } catch {
        return false;
      }
    }, "must be a vercel blob url"),
  pathname: z.string().min(1).max(512),
  name: z.string().min(1).max(256),
  contentType: z.string().min(1).max(128),
  size: z.number().int().nonnegative().max(10 * 1024 * 1024),
});

const Body = z.object({
  subject: z.string().trim().min(3).max(160),
  body: z.string().trim().min(10).max(8000),
  attachments: z.array(Attachment).max(5).optional(),
});

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.creatorId) {
    return NextResponse.json({ error: "not_signed_in" }, { status: 401 });
  }
  const creator = await findCreatorById(session.creatorId);
  if (!creator) {
    return NextResponse.json({ error: "not_signed_in" }, { status: 401 });
  }

  const json = await req.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "invalid_input", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const ticket = await createSupportTicket({
    creatorId: creator.id,
    creatorEmail: creator.email,
    subject: parsed.data.subject,
    body: parsed.data.body,
    attachments: parsed.data.attachments ?? [],
  });

  return NextResponse.json({ ok: true, id: ticket.id });
}

export async function GET() {
  const session = await getSession();
  if (!session.creatorId) {
    return NextResponse.json({ error: "not_signed_in" }, { status: 401 });
  }
  const tickets = await listSupportTicketsForCreator(session.creatorId);
  return NextResponse.json({ tickets });
}
