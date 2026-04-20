import Link from "next/link";
import { requireCreator } from "@/lib/auth";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import SettingsForm from "./SettingsForm";

export const metadata = { title: "Settings · Nexus Club" };

export default async function SettingsPage() {
  const creator = await requireCreator();
  const existing = creator.profile ?? null;

  return (
    <>
      <Masthead email={creator.email} />
      <main className="px-6 sm:px-10">
        <div className="mx-auto max-w-3xl py-12 sm:py-16">
          <div className="text-[12px] small-caps tracking-[0.25em] text-ink-muted mb-8">
            <Link href="/dashboard" className="hover:text-forest">
              ← Dashboard
            </Link>
          </div>
          <p className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
            Member · Profile
          </p>
          <h1 className="mt-3 font-serif-display text-5xl leading-none">
            Your <span className="font-serif-italic">colophon.</span>
          </h1>
          <p className="mt-4 max-w-xl text-[15px] text-ink-muted font-serif-book">
            A public page for your work. Keep it concise — editors read these when assigning
            campaigns, and brands browse them when commissioning.
          </p>
          <div className="mt-10 hairline-top pt-10">
            <SettingsForm existing={existing} defaultDisplayName={creator.email.split("@")[0]} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
