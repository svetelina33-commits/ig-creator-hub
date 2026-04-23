import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/session";
import {
  addGoogleDelegate,
  findCreatorById,
  removeGoogleDelegate,
} from "@/lib/store";
import { sendViaCreatorGmail } from "@/lib/google";

const AddBody = z.object({
  email: z.string().email(),
  notify: z.boolean().optional(),
});

const DeleteBody = z.object({
  email: z.string().email(),
});

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session.creatorId) {
    return NextResponse.json({ error: "not_signed_in" }, { status: 401 });
  }
  const json = await req.json().catch(() => null);
  const parsed = AddBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }
  const creator = await findCreatorById(session.creatorId);
  if (!creator?.google) {
    return NextResponse.json({ error: "gmail_not_connected" }, { status: 400 });
  }
  const email = parsed.data.email.trim().toLowerCase();
  if (email === creator.google.email.toLowerCase()) {
    return NextResponse.json({ error: "cannot_delegate_to_self" }, { status: 400 });
  }
  await addGoogleDelegate(creator.id, email);

  if (parsed.data.notify) {
    try {
      await sendViaCreatorGmail(creator.id, {
        to: email,
        subject: `${creator.google.name ?? creator.google.email} is giving you Gmail delegate access`,
        text: delegateInviteText({
          ownerEmail: creator.google.email,
          ownerName: creator.google.name,
          delegateEmail: email,
        }),
        html: delegateInviteHtml({
          ownerEmail: creator.google.email,
          ownerName: creator.google.name,
          delegateEmail: email,
        }),
      });
    } catch (err) {
      // Surface the failure but don't roll back — the delegate record is useful either way.
      return NextResponse.json({
        ok: true,
        notified: false,
        warning: err instanceof Error ? err.message : "notify_failed",
      });
    }
  }

  return NextResponse.json({ ok: true, notified: Boolean(parsed.data.notify) });
}

export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session.creatorId) {
    return NextResponse.json({ error: "not_signed_in" }, { status: 401 });
  }
  const json = await req.json().catch(() => null);
  const parsed = DeleteBody.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_input" }, { status: 400 });
  }
  await removeGoogleDelegate(session.creatorId, parsed.data.email);
  return NextResponse.json({ ok: true });
}

function delegateInviteText(args: {
  ownerEmail: string;
  ownerName?: string;
  delegateEmail: string;
}): string {
  const owner = args.ownerName ? `${args.ownerName} (${args.ownerEmail})` : args.ownerEmail;
  return [
    `Hi,`,
    ``,
    `${owner} would like to give you Gmail delegate access, so you can send and read email on their behalf from your own Gmail account.`,
    ``,
    `Gmail handles this natively — your account (${args.delegateEmail}) will appear as a sub-account in ${args.ownerEmail}'s Gmail. To set this up, ${args.ownerEmail} needs to follow these steps:`,
    ``,
    `1. Open https://mail.google.com/mail/u/0/#settings/accounts`,
    `2. Under "Grant access to your account", click "Add another account"`,
    `3. Enter your email: ${args.delegateEmail}`,
    `4. You'll receive a confirmation email from Google — click the link to accept`,
    ``,
    `Once confirmed, switch between accounts using your Gmail profile menu (top right).`,
    ``,
    `— Nexus Club`,
  ].join("\n");
}

function delegateInviteHtml(args: {
  ownerEmail: string;
  ownerName?: string;
  delegateEmail: string;
}): string {
  const owner = args.ownerName ? `${args.ownerName} (${args.ownerEmail})` : args.ownerEmail;
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:15px;color:#1a1a1a;line-height:1.6;">
  <p>Hi,</p>
  <p><strong>${owner}</strong> would like to give you Gmail delegate access, so you can send and read email on their behalf from your own Gmail account.</p>
  <p>Gmail handles this natively — your account (<code>${args.delegateEmail}</code>) will appear as a sub-account in <code>${args.ownerEmail}</code>'s Gmail. To set this up, <code>${args.ownerEmail}</code> needs to follow these steps:</p>
  <ol>
    <li>Open <a href="https://mail.google.com/mail/u/0/#settings/accounts">Gmail → Settings → Accounts</a></li>
    <li>Under <em>Grant access to your account</em>, click <strong>Add another account</strong></li>
    <li>Enter your email: <code>${args.delegateEmail}</code></li>
    <li>You'll receive a confirmation email from Google — click the link to accept</li>
  </ol>
  <p>Once confirmed, switch between accounts using your Gmail profile menu (top right).</p>
  <p style="color:#888;margin-top:24px;">— Nexus Club</p>
</div>`;
}
