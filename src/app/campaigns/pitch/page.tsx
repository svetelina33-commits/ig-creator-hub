import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { findCreatorById } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { AmbientOrbs } from "@/components/AmbientOrbs";
import PitchForm from "./PitchForm";

export const metadata = { title: "Pitch a campaign · Nexus Club" };

export default async function PitchPage() {
  const session = await getSession();
  if (!session.creatorId) redirect("/login");
  const creator = await findCreatorById(session.creatorId);
  if (!creator) redirect("/login");
  const admin = await isAdmin();

  return (
    <>
      <Masthead email={creator.email} isAdmin={admin} />
      <main className="px-5 sm:px-10 relative overflow-hidden">
        <AmbientOrbs />
        <div className="mx-auto max-w-3xl py-12 sm:py-16 relative">
          <div className="mb-6 flex items-baseline gap-3 text-[11px] small-caps tracking-[0.25em] text-ink-muted">
            <Link href="/campaigns" className="hover:text-ink">
              ← All briefs
            </Link>
          </div>

          <div className="mb-10">
            <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
              Creator · Pitch
            </p>
            <h1 className="mt-3 font-serif-display text-4xl sm:text-6xl leading-[1.02] text-ink">
              Pitch your own <span className="font-serif-italic text-violet">campaign</span>.
            </h1>
            <p className="mt-4 text-[14px] leading-[1.65] text-ink-muted max-w-xl">
              Tell us which brand you&apos;d like to work with and what you&apos;d make. The editor
              reviews every pitch. If it fits the register, we go live on the brief — other
              members can apply too, and you&apos;re credited as the originator.
            </p>
          </div>

          <PitchForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
