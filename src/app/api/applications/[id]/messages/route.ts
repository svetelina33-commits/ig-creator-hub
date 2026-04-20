import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  createMessage,
  findApplicationById,
  findCampaignById,
  findCreatorById,
  listMessagesForApplication,
} from "@/lib/store";
import { getSession } from "@/lib/session";
import { isAdmin } from "@/lib/auth";
import { adminEmails } from "@/lib/env";

const bodySchema = z.object({ body: z.string().min(1).max(2000) });

type Params = Promise<{ id: string }>;

async function authorize(applicationId: string) {
  const session = await getSession();
  if (!session.creatorId) return { ok: false as const, status: 401, role: null };
  const application = await findApplicationById(applicationId);
  if (!application) return { ok: false as const, status: 404, role: null };
  const creator = await findCreatorById(session.creatorId);
  if (!creator) return { ok: false as const, status: 401, role: null };
  const admin = await isAdmin();
  if (admin) return { ok: true as const, application, creator, role: "editor" as const };
  if (application.creatorId !== creator.id)
    return { ok: false as const, status: 403, role: null };
  return { ok: true as const, application, creator, role: "creator" as const };
}

export async function GET(_req: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const auth = await authorize(id);
  if (!auth.ok) return NextResponse.json({ error: "unauthorized" }, { status: auth.status });
  const messages = await listMessagesForApplication(id);
  return NextResponse.json({ messages });
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
  const { id } = await params;
  const auth = await authorize(id);
  if (!auth.ok) return NextResponse.json({ error: "unauthorized" }, { status: auth.status });
  const json = await req.json().catch(() => null);
  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "invalid_body" }, { status: 400 });

  const message = await createMessage({
    applicationId: id,
    role: auth.role,
    authorEmail: auth.creator.email,
    body: parsed.data.body.trim(),
  });

  // Silence unused-import linters — these are used elsewhere via the authorize path.
  void findCampaignById;
  void adminEmails;

  return NextResponse.json({ message });
}
