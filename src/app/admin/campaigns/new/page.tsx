import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import NewCampaignForm from "./NewCampaignForm";

export default async function NewCampaignPage() {
  const admin = await requireAdmin();
  return (
    <>
      <Masthead email={admin.email} isAdmin />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />
        <div className="mx-auto max-w-3xl py-12 sm:py-16 relative">
          <div className="text-[12px] small-caps tracking-[0.25em] text-ink-muted mb-8">
            <Link href="/admin" className="hover:text-ink">
              ← Atelier
            </Link>
          </div>
          <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
            New commission
          </p>
          <h1 className="mt-3 font-serif-display text-5xl leading-none text-ink">
            Draft a <span className="font-serif-italic text-violet">brief</span>
          </h1>
          <p className="mt-4 text-[15px] text-ink-muted max-w-xl">
            Keep it tight. The tagline appears on the list page; the brief on the campaign page.
          </p>
          <div className="mt-10 glass rounded-2xl p-6 sm:p-8">
            <NewCampaignForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
