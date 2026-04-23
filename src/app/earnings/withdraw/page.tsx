import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { findCreatorById } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import { availableCents, getEarningsFor, formatMoneyCents } from "@/lib/earnings";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import WithdrawForm from "./WithdrawForm";
import ConnectEmailStep from "./ConnectEmailStep";

export const metadata = { title: "Withdraw · Nexus Club" };

type SearchParams = Promise<{ step?: string }>;

export default async function WithdrawPage({ searchParams }: { searchParams: SearchParams }) {
  const session = await getSession();
  if (!session.creatorId) redirect("/");
  const creator = await findCreatorById(session.creatorId);
  if (!creator) redirect("/");

  const [admin, earnings, { step: stepParam }] = await Promise.all([
    isAdmin(),
    getEarningsFor(creator.id),
    searchParams,
  ]);
  const withdrawable = formatMoneyCents(
    availableCents(earnings),
    earnings.currency,
  );

  const hasPayout = Boolean(creator.payout);
  const hasGoogle = Boolean(creator.google);
  const step = resolveStep(stepParam, hasPayout, hasGoogle);

  return (
    <>
      <Masthead email={creator.email} isAdmin={admin} />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />
        <div className="mx-auto max-w-3xl py-12 sm:py-16 relative">
          <div className="mb-8 flex items-baseline gap-3 text-[11px] small-caps tracking-[0.25em] text-ink-muted">
            <Link href="/earnings" className="hover:text-ink">
              ← Ledger
            </Link>
          </div>

          <div className="mb-10">
            <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
              Member · Withdrawal
            </p>
            <h1 className="mt-3 font-serif-display text-5xl sm:text-6xl leading-none text-ink">
              Withdraw your <span className="font-serif-italic text-ink-soft">fees</span>.
            </h1>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="small-caps text-[10px] tracking-[0.25em] text-ink-muted">
                Available to withdraw
              </span>
              <span className="font-mono-numeric text-ink text-[15px]">
                {withdrawable.symbol}
                {withdrawable.whole}
                <span className="text-ink-muted">.{withdrawable.cents}</span>
              </span>
            </div>
          </div>

          {/* Stepper */}
          <div className="mb-8 grid grid-cols-3 gap-2">
            <Step n={1} title="Payout method" active={step === 1} done={hasPayout && step > 1} />
            <Step n={2} title="Connect email" active={step === 2} done={hasGoogle && step > 2} />
            <Step n={3} title="Confirm" active={step === 3} done={false} />
          </div>

          {step === 1 && <PayoutGate />}
          {step === 2 && <ConnectEmailStep />}
          {step === 3 && creator.payout && creator.google && (
            <WithdrawForm
              payoutLabel={creator.payout.label}
              payoutKind={creator.payout.kind}
              amountCents={availableCents(earnings)}
              currency={earnings.currency}
              googleEmail={creator.google.email}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function resolveStep(param: string | undefined, hasPayout: boolean, hasGoogle: boolean): 1 | 2 | 3 {
  if (!hasPayout) return 1;
  if (param === "3" && hasGoogle) return 3;
  return 2;
}

function Step({
  n,
  title,
  active,
  done,
}: {
  n: number;
  title: string;
  active: boolean;
  done: boolean;
}) {
  const state = done ? "done" : active ? "active" : "pending";
  const shortTitle =
    title === "Payout method" ? "Payout" : title === "Connect email" ? "Email" : title;
  return (
    <div
      className={`glass rounded-xl px-3 py-2.5 sm:px-4 sm:py-3 border ${
        state === "active"
          ? "border-violet/50"
          : state === "done"
            ? "border-forest/40"
            : "border-white/5"
      }`}
    >
      <div className="flex items-baseline gap-2">
        <span
          className={`font-mono-numeric text-[10px] ${
            state === "done" ? "text-forest" : state === "active" ? "text-violet" : "text-ink-faint"
          }`}
        >
          {state === "done" ? "●" : `0${n}`}
        </span>
        <span
          className={`small-caps text-[10px] tracking-[0.15em] sm:tracking-[0.22em] ${
            state === "done" ? "text-forest" : state === "active" ? "text-ink" : "text-ink-muted"
          }`}
        >
          <span className="sm:hidden">{shortTitle}</span>
          <span className="hidden sm:inline">{title}</span>
        </span>
      </div>
    </div>
  );
}

function PayoutGate() {
  return (
    <div className="glass rounded-2xl p-6 sm:p-8 space-y-5">
      <div>
        <span className="small-caps text-[10px] tracking-[0.3em] text-amber">
          Step 01 · required
        </span>
        <h2 className="mt-2 font-serif-display text-3xl text-ink">
          Tell us where to send the fees.
        </h2>
        <p className="mt-3 text-[14px] leading-[1.65] text-ink-muted">
          Pick PayPal, Stripe, or a bank account. Sensitive fields are encrypted at rest. You can
          swap the method later.
        </p>
      </div>
      <Link
        href="/settings/payouts"
        className="btn-primary inline-flex items-center gap-3 px-5 py-3 rounded-full text-[12px]"
      >
        Connect payout method
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

