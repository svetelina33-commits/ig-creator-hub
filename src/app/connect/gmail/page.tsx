import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { findCreatorById } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { RunningHead } from "@/components/Ornaments";
import GmailPrimer from "./GmailPrimer";

export const metadata = {
  title: "Connect Gmail · Nexus Club",
};

export default async function ConnectGmailPage() {
  const session = await getSession();
  if (!session.creatorId) redirect("/login");
  const creator = await findCreatorById(session.creatorId);
  if (!creator) redirect("/login");
  const admin = await isAdmin();

  return (
    <>
      <Masthead email={creator.email} isAdmin={admin} />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />
        <div className="mx-auto max-w-3xl py-14 sm:py-20 relative">
          <RunningHead
            left="AUTHORIZATION"
            center="· GMAIL SEND ·"
            right="§ ONE STEP"
          />

          <header className="mt-10 mb-8">
            <p className="small-caps text-[11px] tracking-[0.22em] text-ink-muted mb-4">
              Before we hand off to Google
            </p>
            <h1 className="font-serif-display text-5xl sm:text-6xl leading-[1.02] text-ink">
              <span className="font-serif-italic text-ink-soft">A moment —</span>
              <br />
              three things worth reading<span className="text-violet">.</span>
            </h1>
            <p className="mt-6 text-[15.5px] leading-[1.75] text-ink-muted max-w-xl">
              You're about to leave Nexus Club for Google's own consent screen. Because we're
              a small, independent platform, Google will likely flag us as{" "}
              <em className="font-serif-italic text-ink-soft">
                "Google hasn't verified this app."
              </em>{" "}
              That's normal — their verification queue runs 1–6 weeks and we're in it. The
              warning is standard; the connection is safe.
            </p>
          </header>

          <div className="glass rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="small-caps text-[11px] tracking-[0.22em] text-ink-muted">
              What you're granting
            </div>

            <ScopeRow
              state="granted"
              title="Send email on your behalf"
              body={
                <>
                  So campaign confirmations and payout notifications go from{" "}
                  <em className="font-serif-italic">your</em> Gmail — creators see a real
                  person, not a no-reply robot.
                </>
              }
            />
            <ScopeRow
              state="denied"
              title="Read your inbox"
              body={
                <>
                  Never. We don't request this scope and couldn't read a single message if we
                  tried — Google wouldn't permit it.
                </>
              }
            />
            <ScopeRow
              state="denied"
              title="See your password"
              body={
                <>
                  Google handles sign-in from their own screen. Nexus Club never sees, stores,
                  or transmits your password.
                </>
              }
            />

            <div className="hairline-top pt-5 text-[13px] leading-[1.7] text-ink-muted">
              <span className="font-serif-italic text-ink-soft">On the warning screen:</span>{" "}
              click <span className="text-ink">Advanced</span>, then{" "}
              <span className="text-ink">Go to Nexus Club (unsafe)</span>. Not dramatic in
              practice — just Google's wording.
            </div>

            <div className="text-[12.5px] leading-[1.65] text-ink-faint">
              You can revoke access any time at{" "}
              <a
                href="https://myaccount.google.com/permissions"
                target="_blank"
                rel="noreferrer"
                className="link-ed"
              >
                myaccount.google.com/permissions
              </a>
              . Refresh tokens are encrypted at rest (AES-256-GCM) and never leave our
              servers.
            </div>
          </div>

          <GmailPrimer />

          <p className="mt-6 text-[11.5px] leading-[1.65] text-ink-faint max-w-md">
            By continuing you agree to our{" "}
            <Link href="/terms" className="link-ed">
              terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="link-ed">
              privacy policy
            </Link>
            . This consent applies only to your Gmail account; it doesn't grant access to
            other Google services.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

function ScopeRow({
  state,
  title,
  body,
}: {
  state: "granted" | "denied";
  title: string;
  body: React.ReactNode;
}) {
  const granted = state === "granted";
  return (
    <div className="flex items-start gap-4">
      <span
        className={`mt-0.5 shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full border ${
          granted
            ? "border-forest/50 bg-forest/[0.08] text-forest"
            : "border-white/15 bg-white/[0.02] text-ink-muted"
        }`}
        aria-hidden
      >
        {granted ? (
          <svg viewBox="0 0 14 14" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 7.5 L6 10.5 L11 4" />
          </svg>
        ) : (
          <svg viewBox="0 0 14 14" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="4" y1="4" x2="10" y2="10" />
            <line x1="10" y1="4" x2="4" y2="10" />
          </svg>
        )}
      </span>
      <div className="min-w-0">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="font-serif-display text-[19px] text-ink">{title}</span>
          <span
            className={`small-caps text-[9.5px] tracking-[0.25em] ${
              granted ? "text-forest" : "text-ink-faint"
            }`}
          >
            {granted ? "● granted" : "○ not requested"}
          </span>
        </div>
        <p className="mt-1.5 text-[13.5px] leading-[1.65] text-ink-muted">{body}</p>
      </div>
    </div>
  );
}
