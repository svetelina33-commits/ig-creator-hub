"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  connection: {
    username: string;
    accountType?: string;
    connectedAt: string;
    tokenExpiresAt: string | null;
  } | null;
};

export default function DashboardInstagramCard({ connection }: Props) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function disconnect() {
    setBusy(true);
    await fetch("/api/auth/instagram/disconnect", { method: "POST" });
    setBusy(false);
    router.refresh();
  }

  async function signOut() {
    setBusy(true);
    await fetch("/api/auth/logout", { method: "POST" });
    setBusy(false);
    router.push("/");
    router.refresh();
  }

  if (connection) {
    return (
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="small-caps text-[10px] tracking-[0.25em] text-forest">
                ● concierge ready
              </span>
              <span className="small-caps text-[10px] tracking-[0.25em] text-ink-faint">
                · handle on file
              </span>
            </div>
            <div className="font-serif-display text-3xl text-ink">@{connection.username}</div>
            <div className="mt-1 small-caps text-[10px] tracking-[0.25em] text-ink-muted">
              on file since{" "}
              {new Date(connection.connectedAt).toLocaleDateString("en-SG", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
          <span className="stamp-ig">Publishing desk</span>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.015] px-4 py-3 text-[12.5px] leading-[1.6] text-ink-muted">
          <span className="font-serif-italic text-ink-soft">Access begins</span> when your
          next campaign contract is signed and closes automatically on final delivery —
          never retained between campaigns.
        </div>

        <div className="flex items-center gap-4 pt-1">
          <button
            onClick={disconnect}
            disabled={busy}
            className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-vermillion disabled:opacity-60 transition-colors"
          >
            Remove handle
          </button>
          <span className="text-ink-faint">·</span>
          <button
            onClick={signOut}
            disabled={busy}
            className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-ink disabled:opacity-60 transition-colors"
          >
            Sign out
          </button>
        </div>

        <style jsx>{`
          .stamp-ig {
            display: inline-block;
            padding: 3px 10px;
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: var(--ink-muted);
            font-size: 9px;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            border-radius: 999px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="small-caps text-[10px] tracking-[0.25em] text-forest">
            ● reserved at signing
          </span>
          <span className="small-caps text-[10px] tracking-[0.25em] text-ink-faint">
            · opt-in per campaign
          </span>
        </div>
        <h3 className="font-serif-display text-3xl text-ink leading-tight">
          Handed to the <span className="font-serif-italic text-ink-soft">desk</span>.
        </h3>
        <p className="mt-2 small-caps text-[10px] tracking-[0.28em] text-ink-faint">
          A publisher on call · for the campaign window only
        </p>
      </div>

      <div className="space-y-3.5 text-[14.5px] leading-[1.65] sm:leading-[1.7] text-ink-muted">
        <p className="nc-dropcap-sm">
          When you sign a Nexus campaign contract, you hand temporary access to a
          dedicated publishing editor from our desk.
        </p>
        <p>
          They schedule every post, polish every caption, and keep the reply window
          warm — in <em>your</em> voice, on <em>your</em> cadence.
        </p>
        <p className="font-serif-italic text-ink-soft">
          The window opens when ink dries on the contract — and closes the moment the
          campaign delivers.
        </p>
      </div>

      <NcRuleDot />

      <ol className="nc-stagger space-y-5 sm:space-y-3 text-[12.5px] text-ink-muted">
        <Step n="I" title="Contract first">
          Every campaign brief names the handover window and termination date in
          writing. Access is scoped, signed, and legally time-boxed — not ongoing.
        </Step>
        <Step n="II" title="A named editor, not an algorithm">
          Your campaign is assigned to one desk editor — a human, briefed on your
          tone, trained in platform policy, bonded under NDA.
        </Step>
        <Step n="III" title="Audit log, end-to-end">
          Every post, story, and reply sent during the window is logged. You receive
          a signed post-campaign brief with the full action record.
        </Step>
        <Step n="IV" title="Revocable, always">
          You can close the window from your own device at any moment — standard
          Instagram security. No hostage-taking, no lock-in.
        </Step>
        <Step n="V" title="Signal over screenshots">
          Screenshots and screen recordings can be doctored — they have been, on every
          platform that trusts them. The desk reads your reach, watch-time, and
          engagement direct from source. <em className="font-serif-italic text-ink-soft">Real audiences win; phantom
          reach gets nothing.</em>
        </Step>
      </ol>

      <NcRuleDot />

      <StandardsLedger />


      <div className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-white/[0.01] px-5 py-4">
        <div className="small-caps text-[10px] tracking-[0.28em] text-ink-faint mb-1.5">
          Next step
        </div>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-[13.5px] text-ink-soft leading-[1.55] max-w-lg">
            The concierge activates the moment you counter-sign your first campaign
            contract. Until then there&apos;s nothing to configure.
          </p>
          <Link
            href="/campaigns"
            className="btn-primary inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-[12px] tracking-wide shrink-0"
          >
            Browse open campaigns
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <div className="pt-5 border-t border-white/10">
        <button
          onClick={signOut}
          disabled={busy}
          className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-ink disabled:opacity-60 transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

function Step({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="relative grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-4 gap-y-1.5 sm:gap-y-0 items-baseline leading-[1.6] pl-0 sm:pl-0">
      {/* Mobile: large faint italic numeral as chapter mark; Desktop: small mono §I */}
      <span
        aria-hidden
        className="hidden sm:block font-mono-numeric text-[10px] tracking-[0.22em] text-ink-faint pt-0.5 w-6 text-right"
      >
        §{n}
      </span>
      <span
        aria-hidden
        className="sm:hidden font-serif-italic text-[28px] leading-none text-ink-faint/60 self-start pt-1 w-9 text-center select-none"
      >
        {n}
      </span>
      <div className="min-w-0">
        <div className="text-ink text-[14.5px] sm:text-[13.5px] font-serif-display sm:font-sans leading-snug mb-1 sm:mb-0.5">
          {title}
        </div>
        <div className="text-ink-muted text-[13px] sm:text-[12.5px] leading-[1.65] sm:leading-[1.6]">
          {children}
        </div>
      </div>
    </li>
  );
}

/* Hairline rule with a small centered glyph — magazine separator */
function NcRuleDot() {
  return (
    <div aria-hidden className="flex items-center gap-3 my-1">
      <span className="flex-1 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <span className="font-serif-italic text-ink-faint text-[14px] leading-none translate-y-[-1px]">
        ·
      </span>
      <span className="flex-1 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </div>
  );
}

const STANDARDS: { kicker: string; body: string; tone?: "gold" }[] = [
  { kicker: "Authorization", body: "Instagram Graph API Partner · Meta App Review", tone: "gold" },
  { kicker: "Contract", body: "eIDAS · ESIGN · UETA — enforceable in 110 jurisdictions" },
  { kicker: "Data", body: "GDPR · UK GDPR · DPDP · CCPA baseline" },
  { kicker: "Transit", body: "TLS 1.3 in flight · encrypted at rest" },
  { kicker: "Staff", body: "Desk editors NDA-bonded, identity-vetted" },
  { kicker: "Audit", body: "Timestamped action log delivered post-campaign" },
];

function StandardsLedger() {
  return (
    <div className="nc-ledger rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.025] via-white/[0.012] to-transparent overflow-hidden">
      <div className="px-4 sm:px-5 pt-4 pb-3 border-b border-white/5 flex items-center justify-between gap-3">
        <span className="small-caps text-[10px] tracking-[0.28em] text-ink-soft">
          Standards we hold
        </span>
        <span className="font-mono-numeric text-[9.5px] tracking-[0.2em] text-ink-faint">
          {STANDARDS.length.toString().padStart(2, "0")} · LEDGER
        </span>
      </div>

      {/* Mobile: horizontal swipe carousel — feels designed, not stacked */}
      <ul className="sm:hidden flex gap-0 overflow-x-auto snap-x snap-mandatory nc-no-scrollbar">
        {STANDARDS.map((s, i) => (
          <li
            key={s.kicker}
            className="snap-start shrink-0 w-[78%] px-4 py-4 border-r border-white/5 last:border-r-0"
            style={{ scrollSnapStop: "always" }}
          >
            <div className="flex items-baseline justify-between gap-3 mb-2">
              <span className="small-caps text-[9.5px] tracking-[0.28em] text-ink-faint">
                {s.kicker}
              </span>
              <span className="font-mono-numeric text-[9px] tracking-[0.2em] text-ink-ghost">
                {String(i + 1).padStart(2, "0")} / {String(STANDARDS.length).padStart(2, "0")}
              </span>
            </div>
            <div className={`text-[13.5px] leading-[1.45] font-serif-book ${s.tone === "gold" ? "text-gold" : "text-ink-soft"}`}>
              {s.tone === "gold" && <span aria-hidden className="mr-1.5">◆</span>}
              {s.body}
            </div>
          </li>
        ))}
      </ul>

      {/* Desktop: 2/3-column grid */}
      <ul className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 divide-white/5">
        {STANDARDS.map((s, i) => (
          <li
            key={s.kicker}
            className={`px-5 py-3.5 ${
              i % 3 !== 2 ? "lg:border-r lg:border-white/5" : ""
            } ${i % 2 !== 1 ? "sm:border-r sm:border-white/5" : ""}`}
          >
            <div className="small-caps text-[9.5px] tracking-[0.28em] text-ink-faint">
              {s.kicker}
            </div>
            <div className={`mt-1 text-[12.5px] leading-[1.45] ${s.tone === "gold" ? "text-gold" : "text-ink-soft"}`}>
              {s.tone === "gold" && <span aria-hidden className="mr-1.5">◆</span>}
              {s.body}
            </div>
          </li>
        ))}
      </ul>

      <div className="px-4 sm:px-5 py-2.5 border-t border-white/5 flex items-center justify-between gap-3">
        <span className="font-mono-numeric text-[9.5px] tracking-[0.2em] text-ink-faint">
          <span className="hidden sm:inline">NEXUS · CLUB · </span>STD-26.04
        </span>
        <span className="small-caps text-[9.5px] tracking-[0.28em] text-forest">
          ● ledger live
          <span className="sm:hidden text-ink-faint ml-2">· swipe →</span>
        </span>
      </div>
    </div>
  );
}
