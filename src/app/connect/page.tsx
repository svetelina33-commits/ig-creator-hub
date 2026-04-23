import Link from "next/link";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Continue with Google · Nexus Club",
};

export default function ConnectPrimer() {
  return (
    <>
      <Masthead />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />
        <div className="mx-auto max-w-3xl py-16 sm:py-24 relative">
          <div className="mb-10">
            <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
              Continue with Google
            </p>
            <h1 className="mt-3 font-serif-display text-5xl sm:text-6xl text-ink leading-[1.02]">
              <span className="font-serif-italic text-ink-soft">One tap,</span>
              <br />
              and you&apos;re in.
            </h1>
            <p className="mt-5 text-[15px] leading-[1.7] text-ink-muted max-w-xl">
              Nexus Club signs you in through Google. You&apos;ll see Google&apos;s own consent
              screen — that&apos;s normal, it&apos;s how Google confirms the handover is safe.
              Here&apos;s what you&apos;ll be asked to allow:
            </p>
          </div>

          <div className="glass rounded-2xl p-6 sm:p-8 space-y-5">
            <PermissionRow
              number="I"
              title="Sign you in"
              body="Your name and email address, so we know who you are."
            />
            <PermissionRow
              number="II"
              title="Send email on your behalf"
              body="For campaigns you&apos;ve been approved for — never otherwise. You can revoke access from Google anytime."
            />
            <PermissionRow
              number="III"
              title="Read your Gmail"
              body="So replies to campaign emails appear in your Nexus Club dashboard. We never sell, share, or train on your inbox."
            />

            <div className="hairline-top pt-5 text-[12px] leading-[1.7] text-ink-muted">
              All of it runs through Google&apos;s official OAuth — we never see your password,
              and every token is encrypted at rest. You can disconnect any time from your
              dashboard or at{" "}
              <a
                href="https://myaccount.google.com/permissions"
                target="_blank"
                rel="noreferrer"
                className="link-ed"
              >
                myaccount.google.com/permissions
              </a>
              .
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between gap-4 flex-wrap">
            <Link
              href="/"
              className="small-caps text-[11px] tracking-[0.2em] text-ink-muted hover:text-ink"
            >
              ← Back
            </Link>
            <a
              href="/api/auth/google/start"
              className="btn-primary inline-flex items-center gap-3 px-7 py-4 rounded-full text-[13px] tracking-wide"
            >
              <GoogleGlyph />
              Continue to Google
              <span aria-hidden>→</span>
            </a>
          </div>

          <p className="mt-6 text-[11px] leading-[1.6] text-ink-faint max-w-md">
            By continuing you agree to our{" "}
            <Link href="/terms" className="link-ed">terms</Link> and{" "}
            <Link href="/privacy" className="link-ed">privacy policy</Link>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

function PermissionRow({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-mono-numeric text-[11px] text-ink-faint shrink-0">§{number}</span>
      <div className="min-w-0">
        <div className="font-serif-display text-xl text-ink">{title}</div>
        <div className="mt-1 text-[13.5px] leading-[1.6] text-ink-muted">{body}</div>
      </div>
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 18 18"
      className="w-[16px] h-[16px] shrink-0"
      style={{ background: "white", padding: 1, borderRadius: 999 }}
    >
      <path
        fill="#4285F4"
        d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.874 2.684-6.615Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A9 9 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A9 9 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
      />
    </svg>
  );
}
