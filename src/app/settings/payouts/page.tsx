import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { findCreatorById } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import PayoutsForm from "./PayoutsForm";

export const metadata = { title: "Payouts · Nexus Club" };

export default async function PayoutsPage() {
  const session = await getSession();
  if (!session.creatorId) redirect("/");
  const creator = await findCreatorById(session.creatorId);
  if (!creator) redirect("/");
  const admin = await isAdmin();

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
              Settings · Payouts
            </p>
            <h1 className="mt-3 font-serif-display text-4xl sm:text-6xl leading-[1.05] text-ink">
              Where should <span className="font-serif-italic text-ink-soft">we send</span> the fees?
            </h1>
            <p className="mt-4 text-[14px] text-ink-muted max-w-xl leading-[1.65]">
              Pick one. Sensitive fields are encrypted at rest with AES-256-GCM. You can swap the
              method any time — it applies to the next cleared payout.
            </p>
          </div>

          <PayoutsForm existing={creator.payout ?? null} />
        </div>
      </main>
      <Footer />
    </>
  );
}
