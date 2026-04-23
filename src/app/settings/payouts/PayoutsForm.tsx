"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { PayoutMethod } from "@/lib/store";

type Kind = "paypal" | "stripe" | "bank";

export default function PayoutsForm({ existing }: { existing: PayoutMethod | null }) {
  const router = useRouter();
  const [kind, setKind] = useState<Kind>(existing?.kind ?? "paypal");
  const [email, setEmail] = useState(existing?.kind === "paypal" ? existing.detailsPublic.email ?? "" : "");
  const [stripeAccount, setStripeAccount] = useState(
    existing?.kind === "stripe" ? existing.detailsPublic.accountId ?? "" : "",
  );
  const [bankName, setBankName] = useState(existing?.kind === "bank" ? existing.detailsPublic.bankName ?? "" : "");
  const [holderName, setHolderName] = useState(
    existing?.kind === "bank" ? existing.detailsPublic.holderName ?? "" : "",
  );
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");

  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setDone(null);
    setError(null);
    try {
      const payload = buildPayload(kind, {
        email,
        stripeAccount,
        bankName,
        holderName,
        accountNumber,
        routingNumber,
      });
      const res = await fetch("/api/payouts/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        setDone("Saved");
        router.refresh();
      } else {
        setError(data.error ?? "save_failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "network_error");
    } finally {
      setSaving(false);
    }
  }

  async function onDisconnect() {
    if (!confirm("Disconnect the current payout method?")) return;
    setSaving(true);
    setError(null);
    try {
      await fetch("/api/payouts/disconnect", { method: "POST" });
      setDone("Disconnected");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "network_error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSave} className="space-y-8">
      {/* Tabs with sliding indicator */}
      <div className="nc-tabpill grid grid-cols-3 gap-2 glass rounded-full p-1.5">
        <div
          className="nc-tabpill-indicator"
          style={{
            width: "calc((100% - 20px) / 3)",
            transform: `translateX(calc(${["paypal", "stripe", "bank"].indexOf(kind)} * (100% + 8px)))`,
          }}
        />
        {(["paypal", "stripe", "bank"] as Kind[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            className={`small-caps text-[11px] tracking-[0.2em] py-3 rounded-full transition-colors ${
              kind === k ? "text-white" : "text-ink-muted hover:text-ink"
            }`}
          >
            {k === "paypal" ? "PayPal" : k === "stripe" ? "Stripe" : "Bank"}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div className="glass rounded-2xl p-6 sm:p-8">
        {kind === "paypal" && (
          <div className="space-y-5">
            <div>
              <div className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
                PayPal · simplest
              </div>
              <p className="mt-2 text-[13px] text-ink-muted leading-[1.65]">
                Campaign fees arrive in your PayPal balance within 1–3 business days of settlement.
                No fees on our end. Your PayPal account may apply its own receiving fees for
                cross-border transfers.
              </p>
            </div>
            <Field
              label="PayPal email"
              value={email}
              onChange={setEmail}
              type="email"
              required
              placeholder="you@paypal.com"
            />
          </div>
        )}

        {kind === "stripe" && (
          <div className="space-y-5">
            <div>
              <div className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
                Stripe · fastest
              </div>
              <p className="mt-2 text-[13px] text-ink-muted leading-[1.65]">
                Paste your Stripe Connect account ID (<code className="font-mono-numeric text-ink-soft">acct_…</code>).
                Payouts hit your connected bank typically next business day. If you don&apos;t have
                one yet, create it at{" "}
                <a
                  className="link-ed"
                  href="https://dashboard.stripe.com/register"
                  target="_blank"
                  rel="noreferrer"
                >
                  dashboard.stripe.com/register
                </a>
                .
              </p>
            </div>
            <Field
              label="Stripe account ID"
              value={stripeAccount}
              onChange={setStripeAccount}
              required
              placeholder="acct_1A2b3C…"
              mono
            />
          </div>
        )}

        {kind === "bank" && (
          <div className="space-y-5">
            <div>
              <div className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
                Bank account · direct
              </div>
              <p className="mt-2 text-[13px] text-ink-muted leading-[1.65]">
                ACH/SEPA transfer, 2–5 business days. The account + routing numbers are encrypted
                at rest — they never leave the database in plaintext and only the last four digits
                are shown back to you.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Bank name"
                value={bankName}
                onChange={setBankName}
                required
                placeholder="Chase, HSBC…"
              />
              <Field
                label="Account holder name"
                value={holderName}
                onChange={setHolderName}
                required
                placeholder="Legal name on the account"
              />
              <Field
                label="Account number"
                value={accountNumber}
                onChange={setAccountNumber}
                required
                placeholder="encrypted on save"
                mono
              />
              <Field
                label="Routing / IBAN"
                value={routingNumber}
                onChange={setRoutingNumber}
                required
                placeholder="encrypted on save"
                mono
              />
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-4">
          {existing && (
            <button
              type="button"
              onClick={onDisconnect}
              disabled={saving}
              className="text-[11px] small-caps tracking-[0.2em] text-ink-muted hover:text-vermillion disabled:opacity-60 transition-colors"
            >
              Disconnect
            </button>
          )}
          {done && (
            <span className="small-caps text-[10px] tracking-[0.25em] text-forest">● {done}</span>
          )}
          {error && (
            <span className="small-caps text-[10px] tracking-[0.25em] text-vermillion">
              ● {error}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={saving}
          className="btn-primary inline-flex items-center gap-3 px-5 py-3 rounded-full text-[12px] tracking-wide"
        >
          {saving ? "Saving…" : existing ? "Update method" : "Save method"}
          {!saving && <span aria-hidden>→</span>}
        </button>
      </div>
    </form>
  );
}

function buildPayload(
  kind: Kind,
  v: {
    email: string;
    stripeAccount: string;
    bankName: string;
    holderName: string;
    accountNumber: string;
    routingNumber: string;
  },
): {
  kind: Kind;
  label: string;
  detailsPublic: Record<string, string>;
  detailsPrivate: Record<string, string>;
} {
  if (kind === "paypal") {
    return {
      kind,
      label: v.email || "—",
      detailsPublic: { email: v.email },
      detailsPrivate: {},
    };
  }
  if (kind === "stripe") {
    return {
      kind,
      label: v.stripeAccount,
      detailsPublic: { accountId: v.stripeAccount },
      detailsPrivate: {},
    };
  }
  const last4 = v.accountNumber.replace(/\s+/g, "").slice(-4);
  return {
    kind,
    label: `${v.bankName} · ••••${last4}`,
    detailsPublic: {
      bankName: v.bankName,
      holderName: v.holderName,
      accountLast4: last4,
    },
    detailsPrivate: {
      accountNumber: v.accountNumber,
      routingNumber: v.routingNumber,
    },
  };
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
  mono,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: "text" | "email";
  required?: boolean;
  placeholder?: string;
  mono?: boolean;
}) {
  return (
    <label className="block">
      <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className={`nc-input mt-2 w-full ${mono ? "font-mono-numeric" : ""}`}
      />
    </label>
  );
}
