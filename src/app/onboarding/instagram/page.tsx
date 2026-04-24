import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { findCreatorById } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Publishing concierge · Nexus Club",
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
              <span className="font-serif-italic text-ink-soft">Meet your</span>
              <br />
              publishing desk.
            </h1>
            <p className="mt-5 text-[15px] leading-[1.7] text-ink-muted max-w-xl">
              Nexus Club is a managed programme, not a marketplace. When you sign a
              campaign, a dedicated editor from our publishing desk handles the posts
              and replies for you — in your voice, on your cadence — for the campaign
              window only. No feeds to plan, no captions to polish, no 3&thinsp;a.m.
              reply windows to miss.
            </p>
          </div>

          {params.ig_error && (
            <div className="mb-6 glass rounded-xl px-4 py-3 small-caps text-[11px] tracking-[0.25em] text-vermillion">
              Onboarding error · {params.ig_error}
            </div>
          )}

          <div className="glass rounded-2xl p-6 sm:p-8 space-y-5">
            <ReasonRow
              number="I"
              title="Contract opens the window"
              body="Every campaign brief names the handover start and the termination date in writing. Access is legally time-boxed — it does not persist between campaigns."
            />
            <ReasonRow
              number="II"
              title="A named editor, not a bot"
              body="Your campaign is assigned to one publishing editor at the desk — a human, briefed on your tone, trained in platform policy, bonded under NDA."
            />
            <ReasonRow
              number="III"
              title="Audit log, end-to-end"
              body="Every post, story, and reply sent during the window is recorded. You receive a signed post-campaign brief with the full action record."
            />
            <ReasonRow
              number="IV"
              title="Revocable from your device"
              body="The window is yours to close at any moment, from the Instagram app — standard security, no lock-in, no disputes."
            />

            <div className="hairline-top pt-5 text-[12px] leading-[1.7] text-ink-muted">
              Works best with a <em>business</em> or <em>creator</em> Instagram account so
              we can post on your behalf cleanly. Switch in Instagram → Settings → Account
              type → <em>Switch to Professional</em> (free, takes 10 seconds, reversible).
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between gap-4 flex-wrap">
            <a
              href="/api/auth/logout"
              className="small-caps text-[11px] tracking-[0.2em] text-ink-muted hover:text-vermillion transition-colors"
            >
              ← Not now, sign out
            </a>
            <Link
              href="/dashboard"
              className="btn-primary inline-flex items-center gap-3 px-7 py-4 rounded-full text-[13px] tracking-wide"
            >
              Continue to the desk
              <span aria-hidden>→</span>
            </Link>
          </div>

          <p className="mt-4 small-caps text-[10px] tracking-[0.22em] text-ink-faint text-right">
            ● handover activates with your first signed campaign
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

