import Link from "next/link";
import { requireCreator } from "@/lib/auth";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RunningHead, CenteredRule } from "@/components/Ornaments";
import SettingsForm from "./SettingsForm";

export const metadata = { title: "Settings · Nexus Club" };

export default async function SettingsPage() {
  const creator = await requireCreator();
  const existing = creator.profile ?? null;
  const memberRef = creator.id.replace(/[^a-zA-Z0-9]/g, "").slice(-6).toUpperCase().padStart(6, "0");

  return (
    <>
      <Masthead email={creator.email} />
      <main className="px-6 sm:px-10 relative overflow-x-clip">
        <span className="ambient-glow" aria-hidden />

        <section className="mx-auto max-w-6xl pt-10 sm:pt-14 pb-4 relative">
          <Reveal>
            <RunningHead
              left="MEMBER · COLOPHON"
              center="· EDITED IN HOUSE ·"
              right={`MEMBER № ${memberRef}`}
            />
          </Reveal>

          <div className="mt-8 text-[11px] small-caps tracking-[0.25em] text-ink-muted">
            <Link href="/dashboard" className="hover:text-ink transition-colors">
              ← Return to the desk
            </Link>
          </div>

          <Reveal delay={120}>
            <h1 className="mt-6 font-serif-display text-[clamp(2.6rem,7vw,5.75rem)] leading-[0.92] text-ink">
              Set your <span className="font-serif-italic">colophon</span>
              <span className="text-violet">.</span>
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <div className="mt-7 grid grid-cols-12 gap-6 items-start">
              <p className="col-span-12 md:col-span-7 font-serif-book text-[16.5px] leading-[1.7] text-ink-muted max-w-2xl">
                The page brands and editors find you on. We typeset it the way a masthead is
                set — name, voice, and register on the record. Keep it concise; this is the
                standing line of how you&apos;d like to be read.
              </p>
              <div className="col-span-12 md:col-span-5 md:pl-6 md:border-l md:border-white/10">
                <p className="small-caps text-[10px] tracking-[0.3em] text-ink-faint mb-2">
                  House note
                </p>
                <p className="font-serif-italic text-[13.5px] leading-[1.7] text-ink-soft max-w-sm">
                  Bios that name a point of view earn more callbacks than ones that name a
                  follower count. Lead with the work, and the rest follows.
                </p>
              </div>
            </div>
          </Reveal>
        </section>

        <CenteredRule className="mx-auto max-w-6xl mt-8 mb-10" />

        <section className="mx-auto max-w-6xl pb-24 relative">
          <SettingsForm
            existing={existing}
            defaultDisplayName={creator.email.split("@")[0]}
            email={creator.email}
            memberRef={memberRef}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
