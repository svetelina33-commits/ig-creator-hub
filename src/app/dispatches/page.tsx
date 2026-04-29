import Link from "next/link";
import { getSession } from "@/lib/session";
import { findCreatorById } from "@/lib/store";
import { isAdmin } from "@/lib/auth";
import { Masthead } from "@/components/Masthead";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { RunningHead } from "@/components/Ornaments";

export const metadata = {
  title: "Dispatches · Nexus Club",
};

type Dispatch = {
  slug: string;
  date: string;
  kicker: string;
  title: string;
  excerpt: string;
  readMinutes: number;
};

const DISPATCHES: Dispatch[] = [
  {
    slug: "volume-one",
    date: "2026-04-18",
    kicker: "Editor's Note",
    title: "Volume I.",
    excerpt:
      "A quiet opening. Three campaigns on the desk. A small roster arriving in waves. A note on what we expect of ourselves, and what we hope members expect of us.",
    readMinutes: 4,
  },
  {
    slug: "flat-payouts",
    date: "2026-04-12",
    kicker: "Essay",
    title: "On flat payouts.",
    excerpt:
      "Why performance clauses corrode creative work, and why the clause we refuse to sign is the one we refuse to ask creators to sign either.",
    readMinutes: 6,
  },
  {
    slug: "oauth-is-a-handshake",
    date: "2026-04-07",
    kicker: "Craft",
    title: "OAuth is a handshake.",
    excerpt:
      "Our publishing layer is built on Meta's official OAuth. Here is what that means, why it matters, and why we'd rather take the long path than the shortcut.",
    readMinutes: 5,
  },
];

export default async function DispatchesPage() {
  const session = await getSession();
  const creator = session.creatorId ? await findCreatorById(session.creatorId) : null;
  const admin = await isAdmin();

  return (
    <>
      <Masthead email={creator?.email} isAdmin={admin} />
      <main className="px-6 sm:px-10 relative">
        <span className="ambient-glow" aria-hidden />
        <section className="mx-auto max-w-6xl pt-14 sm:pt-20 pb-10 relative">
          <Reveal>
            <RunningHead left="DISPATCHES" center="· EDITORIAL ·" right="VOL. I" />
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-8 font-serif-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-ink">
              Notes from the<br />
              <span className="font-serif-italic">editor's desk</span>.
            </h1>
          </Reveal>
        </section>

        <section className="mx-auto max-w-6xl pb-24 hairline-top">
          <ul className="divide-y divide-hairline">
            {DISPATCHES.map((d, idx) => (
              <Reveal key={d.slug} delay={idx * 100} as="li">
                <article className="grid grid-cols-12 gap-6 py-10 group">
                  <div className="col-span-12 md:col-span-3">
                    <div className="small-caps text-[10px] tracking-[0.3em] text-ink-muted">
                      {d.kicker}
                    </div>
                    <div className="mt-2 font-mono-numeric text-[11px] text-ink-faint">
                      {new Date(d.date).toLocaleDateString("en-SG", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="mt-1 font-mono-numeric text-[10px] text-ink-faint">
                      {d.readMinutes} MIN READ
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-9">
                    <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-ink group-hover:text-forest transition-colors leading-tight">
                      {d.title}
                    </h2>
                    <p className="mt-4 max-w-2xl text-[17px] leading-[1.75] text-ink-muted font-serif-book">
                      {d.excerpt}
                    </p>
                    <div className="mt-4 small-caps text-[10px] tracking-[0.25em] text-ink-faint">
                      · forthcoming ·
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </section>

        <section className="mx-auto max-w-4xl py-20 text-center hairline-top">
          <Reveal>
            <p className="font-serif-italic text-3xl text-ink-muted">
              Subscribe to receive each dispatch in your inbox.
            </p>
            <Link
              href="/#apply"
              className="mt-8 btn-primary inline-flex items-center gap-3 px-7 py-4 rounded-full text-[13px] tracking-wide"
            >
              Join Nexus Club
              <span aria-hidden>→</span>
            </Link>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
