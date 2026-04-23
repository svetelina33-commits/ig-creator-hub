import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/session";
import { isAdmin } from "@/lib/auth";
import { sendViaCreatorGmail } from "@/lib/google";

const Body = z.object({
  to: z.string().email(),
  subject: z.string().min(1).max(500),
  body: z.string().min(1).max(50000),
});

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.creatorId) {
    return NextResponse.json({ error: "not_signed_in" }, { status: 401 });
  }
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "admin_only" }, { status: 403 });
  }
  const json = await req.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }
  const { to, subject, body } = parsed.data;
  const text = body;
  const html = bodyToHtml(body);

  try {
    const result = await sendViaCreatorGmail(session.creatorId, { to, subject, html, text });
    return NextResponse.json({ ok: true, id: result.id, threadId: result.threadId });
  } catch (err) {
    const message = err instanceof Error ? err.message : "send_failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function bodyToHtml(plain: string): string {
  const escaped = plain
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const paragraphs = escaped
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 16px;line-height:1.6;">${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:15px;color:#1a1a1a;">${paragraphs}</div>`;
}
