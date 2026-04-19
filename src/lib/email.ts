import { Resend } from "resend";
import { env } from "./env";

type SendArgs = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

let resendClient: Resend | null = null;

function client(): Resend | null {
  const key = env().RESEND_API_KEY;
  if (!key) return null;
  if (!resendClient) resendClient = new Resend(key);
  return resendClient;
}

export async function sendEmail(args: SendArgs): Promise<{ sent: boolean; reason?: string }> {
  const c = client();
  if (!c) {
    // Dev fallback — log instead of sending so flows still work without Resend.
    console.log("\n────── email (console fallback, no RESEND_API_KEY set) ──────");
    console.log("to:     ", args.to);
    console.log("subject:", args.subject);
    console.log(args.text);
    console.log("──────────────────────────────────────────────────────────────\n");
    return { sent: false, reason: "no_resend_key" };
  }
  try {
    await c.emails.send({
      from: env().EMAIL_FROM,
      to: args.to,
      subject: args.subject,
      html: args.html,
      text: args.text,
    });
    return { sent: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown_error";
    console.error("Resend send failed:", message);
    return { sent: false, reason: message };
  }
}

// Shared email shell — Nexus Club editorial styling for HTML.
function shell(body: string): string {
  return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#F0EBE0;font-family:ui-serif,Georgia,'Times New Roman',serif;color:#14130F">
  <div style="max-width:560px;margin:0 auto;padding:40px 32px">
    <div style="font-family:ui-sans-serif,system-ui,sans-serif;font-size:10px;letter-spacing:0.3em;text-transform:uppercase;color:#5A564E;margin-bottom:8px">
      Nexus Club · Vol. I · 2026
    </div>
    <div style="font-size:40px;font-style:italic;font-weight:500;line-height:1;color:#14130F;margin:0 0 28px 0">
      Nexus
      <span style="font-style:normal;font-size:20px;letter-spacing:0.12em;text-transform:uppercase;vertical-align:middle;margin-left:8px">Club</span>
    </div>
    <div style="font-family:ui-serif,Georgia,serif;font-size:17px;line-height:1.7;color:#14130F">
      ${body}
    </div>
    <div style="border-top:1px solid rgba(20,19,15,0.15);margin-top:40px;padding-top:16px;font-family:ui-sans-serif,system-ui,sans-serif;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:#8A8579">
      A private network for creators with a voice.
    </div>
  </div>
</body>
</html>`;
}

// ---------- Templates ----------

export function welcomeEmail(email: string): { subject: string; html: string; text: string } {
  const subject = "Welcome to Nexus Club";
  const text = `Welcome to Nexus Club.

Your seat is reserved. Browse open commissions when you're ready:
${env().APP_BASE_URL}/campaigns

Connect your Instagram (Business or Creator account) from your dashboard to be eligible for campaign approvals.

— The editor`;
  const html = shell(`
    <p>Welcome, <em>${email}</em>.</p>
    <p>Your seat is reserved. A handful of campaigns are commissioning now; browse them when you have a moment.</p>
    <p style="margin-top:28px">
      <a href="${env().APP_BASE_URL}/campaigns" style="display:inline-block;background:#14130F;color:#F0EBE0;padding:12px 20px;text-decoration:none;font-family:ui-sans-serif,system-ui,sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase">
        Open commissions →
      </a>
    </p>
    <p>When you're ready, connect Instagram from your dashboard so we can publish on your behalf once a brief is approved.</p>
    <p style="margin-top:32px;color:#5A564E">— The editor</p>
  `);
  return { subject, html, text };
}

export function applicationReceivedEmail(
  email: string,
  campaignTitle: string,
): { subject: string; html: string; text: string } {
  const subject = `Application received — ${campaignTitle}`;
  const text = `Your application for "${campaignTitle}" is with the editor. Typical turnaround is 48 hours — we'll email you the decision.

— The editor`;
  const html = shell(`
    <p>Thank you, <em>${email}</em>.</p>
    <p>Your application for <strong style="font-style:italic">${campaignTitle}</strong> is with the editor.</p>
    <p>Typical turnaround is 48 hours — we'll write again with a decision.</p>
    <p style="margin-top:28px;color:#5A564E">— The editor</p>
  `);
  return { subject, html, text };
}

export function applicationDecidedEmail(
  email: string,
  campaignTitle: string,
  decision: "approved" | "rejected",
): { subject: string; html: string; text: string } {
  if (decision === "approved") {
    const subject = `You've been approved — ${campaignTitle}`;
    const text = `You've been approved for "${campaignTitle}". Sign in to your dashboard for the brief and next steps:
${env().APP_BASE_URL}/dashboard

— The editor`;
    const html = shell(`
      <p>A quiet delight to share: you've been approved for <strong style="font-style:italic">${campaignTitle}</strong>.</p>
      <p>Sign in for the brief and next steps.</p>
      <p style="margin-top:28px">
        <a href="${env().APP_BASE_URL}/dashboard" style="display:inline-block;background:#1F4A3C;color:#F0EBE0;padding:12px 20px;text-decoration:none;font-family:ui-sans-serif,system-ui,sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase">
          Open dashboard →
        </a>
      </p>
      <p style="margin-top:32px;color:#5A564E">— The editor</p>
    `);
    return { subject, html, text };
  }
  const subject = `Not this one — ${campaignTitle}`;
  const text = `We chose a different fit for "${campaignTitle}". Plenty of campaigns still to come — thank you for writing.

— The editor`;
  const html = shell(`
    <p>Regretfully, we chose a different fit for <strong style="font-style:italic">${campaignTitle}</strong>.</p>
    <p>Your writing was considered carefully. Plenty of other campaigns ahead.</p>
    <p style="margin-top:32px;color:#5A564E">— The editor</p>
  `);
  return { subject, html, text };
}

export function passwordResetEmail(
  email: string,
  resetUrl: string,
): { subject: string; html: string; text: string } {
  const subject = "Reset your Nexus Club password";
  const text = `Someone requested a password reset for ${email}.

Open this link to choose a new one (valid for 60 minutes):
${resetUrl}

If this wasn't you, ignore this note.

— The editor`;
  const html = shell(`
    <p>Someone requested a password reset for <em>${email}</em>.</p>
    <p>The link below is good for 60 minutes.</p>
    <p style="margin-top:28px">
      <a href="${resetUrl}" style="display:inline-block;background:#14130F;color:#F0EBE0;padding:12px 20px;text-decoration:none;font-family:ui-sans-serif,system-ui,sans-serif;font-size:11px;letter-spacing:0.2em;text-transform:uppercase">
        Choose a new password →
      </a>
    </p>
    <p style="margin-top:24px;font-size:14px;color:#5A564E">If this wasn't you, ignore this note.</p>
    <p style="margin-top:32px;color:#5A564E">— The editor</p>
  `);
  return { subject, html, text };
}
