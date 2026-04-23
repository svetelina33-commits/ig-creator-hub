"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WithdrawForm({
  payoutLabel,
  payoutKind,
  amountCents,
  currency,
  googleEmail,
}: {
  payoutLabel: string;
  payoutKind: "paypal" | "stripe" | "bank";
  amountCents: number;
  currency: "USD" | "EUR" | "GBP";
  googleEmail: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const symbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : "£";
  const whole = Math.floor(amountCents / 100).toLocaleString("en-US");
  const cents = String(amountCents % 100).padStart(2, "0");

  const kindLabel =
    payoutKind === "paypal" ? "PayPal" : payoutKind === "stripe" ? "Stripe" : "Bank account";

  async function submit() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/payouts/withdraw", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setDone(true);
        router.refresh();
      } else {
        setError(data.error ?? "request_failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "network_error");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="glass rounded-2xl p-6 sm:p-8 space-y-5">
        <div className="flex items-start gap-5">
          <SuccessCheck />
          <div className="flex-1 min-w-0">
            <span className="small-caps text-[10px] tracking-[0.3em] text-forest">
              ● queued · awaiting release
            </span>
            <h2 className="mt-2 font-serif-display text-3xl text-ink">
              Withdrawal request received.
            </h2>
            <p className="mt-3 text-[14px] leading-[1.65] text-ink-muted">
              The editor has been notified. Once the brand funds clear in our account, your
              withdrawal is released to your {kindLabel} and settles within 1–5 business days
              depending on method. Every step posts back to your ledger.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/earnings" className="btn-primary px-5 py-2.5 rounded-full text-[12px]">
            Back to ledger →
          </Link>
          <Link
            href="/dashboard"
            className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-ink"
          >
            Dashboard →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 sm:p-8 space-y-6">
      <div>
        <span className="small-caps text-[10px] tracking-[0.3em] text-violet">
          Step 03 · confirm
        </span>
        <h2 className="mt-2 font-serif-display text-3xl text-ink">Review and release.</h2>
        <p className="mt-3 text-[14px] leading-[1.65] text-ink-muted">
          Everything lines up. One click sends the request to the editor. Funds release when the
          brand settles.
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-black/20 p-5 space-y-3 font-mono-numeric text-[13px]">
        <SummaryRow label="Amount">
          <span className="text-ink text-[16px]">
            {symbol}
            {whole}
            <span className="text-ink-muted">.{cents}</span>
          </span>
        </SummaryRow>
        <SummaryRow label="Method">{kindLabel}</SummaryRow>
        <SummaryRow label="Routing to" longValue>
          {payoutLabel}
        </SummaryRow>
        <SummaryRow label="Verified as" longValue>
          {googleEmail}
        </SummaryRow>
        <SummaryRow label="ETA">
          {payoutKind === "paypal" ? "1–3 days" : payoutKind === "stripe" ? "next business day" : "2–5 days"}
        </SummaryRow>
      </div>

      {error && (
        <div className="small-caps text-[10px] tracking-[0.25em] text-vermillion">● {error}</div>
      )}

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <Link
          href="/earnings"
          className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-ink"
        >
          Cancel
        </Link>
        <button
          onClick={submit}
          disabled={loading}
          data-magnetic
          className="btn-primary nc-magnetic inline-flex items-center gap-3 px-6 py-3 rounded-full text-[12px] disabled:opacity-60"
        >
          {loading ? <span className="nc-spinner" aria-hidden /> : null}
          {loading ? "Submitting…" : "Request withdrawal"}
          {!loading && <span aria-hidden>→</span>}
        </button>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  children,
  longValue,
}: {
  label: string;
  children: React.ReactNode;
  longValue?: boolean;
}) {
  if (longValue) {
    return (
      <div className="flex flex-col gap-0.5 sm:dot-leader sm:flex-row sm:items-baseline sm:gap-2">
        <span className="text-ink-muted">{label}</span>
        <span className="sm:ml-auto sm:pl-2 text-ink break-all">{children}</span>
      </div>
    );
  }
  return (
    <div className="dot-leader flex items-baseline gap-2">
      <span className="text-ink-muted">{label}</span>
      <span className="ml-auto pl-2 text-ink">{children}</span>
    </div>
  );
}

function SuccessCheck() {
  return (
    <svg
      viewBox="0 0 66 66"
      width="56"
      height="56"
      aria-hidden
      className="shrink-0"
    >
      <circle
        cx="33"
        cy="33"
        r="26"
        fill="none"
        stroke="var(--forest)"
        strokeWidth="2"
        className="nc-check-circle"
      />
      <path
        d="M22 34 L30 42 L46 26"
        fill="none"
        stroke="var(--forest)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="nc-check-tick"
      />
    </svg>
  );
}
