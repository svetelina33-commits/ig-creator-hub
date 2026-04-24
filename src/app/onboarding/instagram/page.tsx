import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { findCreatorById } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Connect Instagram · Nexus Club",
};

type SearchParams = Promise<{ ig_error?: string }>;

export default async function OnboardingInstagramPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const session = await getSession();
  if (!session.creatorId) redirect("/");
  const creator = await findCreatorById(session.creatorId);
  if (!creator) redirect("/");
  if (creator.instagram) redirect("/dashboard");

  const admin = await isAdmin();
  const params = await searchParams;

  return (
    <>
      <Masthead email={creator.email} isAdmin={admin} />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />
        <div className="mx-auto max-w-3xl py-16 sm:py-24 relative">
          <div className="mb-10">
            <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
              Step · 02 of 02 · final
            </p>
            <h1 className="mt-3 font-serif-display text-5xl sm:text-6xl text-ink leading-[1.02]">
              <span className="font-serif-italic text-ink-soft">Link your</span>
              <br />
              Instagram.
            </h1>
            <p className="mt-5 text-[15px] leading-[1.7] text-ink-muted max-w-xl">
              Nexus Club is a curated club, not an open list. To accept you into the register and
              show your name to brands, we verify one thing: that you&apos;re a real creator with
              a real audience. Instagram is how we do that — it takes one tap.
            </p>
          </div>

          {params.ig_error && (
            <div className="mb-6 glass rounded-xl px-4 py-3 small-caps text-[11px] tracking-[0.25em] text-vermillion">
              Instagram connection failed · {params.ig_error}
            </div>
          )}

          <div className="glass rounded-2xl p-6 sm:p-8 space-y-5">
            <ReasonRow
              number="I"
              title="Prove the account is yours"
              body="Meta&apos;s own OAuth confirms the handle belongs to the person signing up. No scraping, no screenshots, no exceptions."
            />
            <ReasonRow
              number="II"
              title="Match creators to briefs fairly"
              body="Account type and audience shape which campaigns you&apos;re shortlisted for. Beauty briefs go to beauty creators — not whoever applied first."
            />
            <ReasonRow
              number="III"
              title="Publish with your explicit consent"
              body="When a brand approves your application, we use this connection to post the deliverable on your behalf — once, for that campaign only. Revoke any time."
            />

            <div className="hairline-top pt-5 text-[12px] leading-[1.7] text-ink-muted">
              Required for a <em>business</em> or <em>creator</em> Instagram account. Personal
              accounts can&apos;t be approved by Meta&apos;s API. Switch in Instagram → Settings
              → Account type → <em>Switch to Professional</em> (free, takes 10 seconds, reversible).
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between gap-4 flex-wrap">
            <a
              href="/api/auth/logout"
              className="small-caps text-[11px] tracking-[0.2em] text-ink-muted hover:text-vermillion transition-colors"
            >
              ← Not now, sign out
            </a>
            <span
              aria-disabled
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full text-[13px] tracking-wide border border-white/10 bg-white/[0.02] text-ink-muted cursor-not-allowed select-none"
              title="Instagram connection is temporarily unavailable"
            >
              <InstagramGlyph />
              Temporarily unavailable
            </span>
          </div>

          <p className="mt-4 small-caps text-[10px] tracking-[0.22em] text-amber text-right">
            ● connection flow in maintenance · back shortly
          </p>

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

function ReasonRow({
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

function InstagramGlyph() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="w-[16px] h-[16px] shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  );
}
